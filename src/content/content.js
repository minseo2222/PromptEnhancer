(function () {
  "use strict";

  const DEBOUNCE_MS = 800;
  const UI_ROOT_CLASS = "cbs-root";
  const CHIP_ID = "cbs-clarify-chip";
  const POPOVER_ID = "cbs-clarify-popover";
  const COMPOSER_SELECTORS = [
    "#prompt-textarea",
    '[data-testid="composer-textarea"]',
    "textarea",
    '[contenteditable="true"]'
  ];

  const state = {
    enabled: true,
    showLocalBadge: true,
    composer: null,
    chip: null,
    popover: null,
    debounceTimer: null,
    observer: null,
    uiState: "idle",
    activeDraft: "",
    originalDraft: null,
    generatedPrompt: "",
    dismissedDraftFingerprint: "",
    popoverPlacement: null,
    popoverAnchorRect: null,
    domain: "generic",
    taskType: "brief.generic",
    questions: [],
    answers: {},
    contextLine: "",
    isProgrammaticInput: false
  };

  init();

  async function init() {
    const settings = await safeGetSettings();
    state.enabled = settings.enabled;
    state.showLocalBadge = settings.showLocalBadge;

    document.addEventListener("input", onDocumentInput, true);
    document.addEventListener("focusin", onDocumentFocus, true);
    document.addEventListener("keydown", onDocumentKeydown, true);
    window.addEventListener("resize", positionUi, { passive: true });
    window.addEventListener("scroll", positionUi, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", positionUi, { passive: true });
      window.visualViewport.addEventListener("scroll", positionUi, { passive: true });
    }
    startMutationObserver();
    listenForSettingsChanges();
    scheduleComposerCheck(250);
  }

  async function safeGetSettings() {
    try {
      return await window.CBSStorage.getSettings();
    } catch (_error) {
      return { ...window.CBSStorage.DEFAULT_SETTINGS };
    }
  }

  function listenForSettingsChanges() {
    if (typeof chrome === "undefined" || !chrome.storage || !chrome.storage.onChanged) {
      return;
    }

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "local") {
        return;
      }

      if (changes.enabled) {
        state.enabled = Boolean(changes.enabled.newValue);
      }

      if (changes.showLocalBadge) {
        state.showLocalBadge = Boolean(changes.showLocalBadge.newValue);
      }

      if (!state.enabled) {
        cleanupUi();
      } else {
        scheduleComposerCheck(100);
      }
    });
  }

  function startMutationObserver() {
    if (!document.body || state.observer) {
      return;
    }

    state.observer = new MutationObserver(() => {
      if (state.uiState === "idle" || state.uiState === "chip_visible") {
        scheduleComposerCheck(500);
      }
    });

    state.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function onDocumentInput(event) {
    if (state.isProgrammaticInput || isInsideExtensionUi(event.target)) {
      return;
    }

    const composer = findComposer();
    if (!composer || !isEventFromComposer(event, composer)) {
      return;
    }

    state.composer = composer;

    if (state.uiState === "questions_open" || state.uiState === "preview_open") {
      closeFlow({ schedule: false });
      scheduleComposerCheck(DEBOUNCE_MS);
      return;
    }

    if (state.uiState === "chip_visible") {
      removeChip();
    }

    scheduleComposerCheck(DEBOUNCE_MS);
  }

  function onDocumentFocus(event) {
    if (isInsideExtensionUi(event.target)) {
      return;
    }

    const composer = findComposer();
    if (composer && isEventFromComposer(event, composer)) {
      state.composer = composer;
      scheduleComposerCheck(DEBOUNCE_MS);
    }
  }

  function onDocumentKeydown(event) {
    if (event.key !== "Escape" || !state.popover) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (state.uiState === "inserted" || state.uiState === "error") {
      closeFlow();
      return;
    }

    cancelFlow();
  }

  function scheduleComposerCheck(delay) {
    if (!state.enabled) {
      cleanupUi();
      return;
    }

    window.clearTimeout(state.debounceTimer);
    state.debounceTimer = window.setTimeout(evaluateCurrentDraft, delay);
  }

  function evaluateCurrentDraft() {
    if (!state.enabled || state.uiState === "questions_open" || state.uiState === "preview_open") {
      return;
    }

    const composer = findComposer();
    state.composer = composer;

    if (!composer) {
      removeChip();
      return;
    }

    const draft = getComposerText(composer);
    const draftFingerprint = fingerprintDraft(draft);
    if (state.dismissedDraftFingerprint === draftFingerprint) {
      removeChip();
      return;
    }

    if (state.dismissedDraftFingerprint && state.dismissedDraftFingerprint !== draftFingerprint) {
      state.dismissedDraftFingerprint = "";
    }

    if (!window.CBSRuleEngine.shouldShowClarify(draft)) {
      removeChip();
      return;
    }

    renderClarifyChip(composer);
  }

  function findComposer() {
    const candidates = [];

    COMPOSER_SELECTORS.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (!candidates.includes(element) && isUsableComposerCandidate(element)) {
          candidates.push(element);
        }
      });
    });

    return candidates
      .map((element) => ({
        element,
        score: scoreComposerCandidate(element)
      }))
      .sort((left, right) => right.score - left.score)[0]?.element || null;
  }

  function isUsableComposerCandidate(element) {
    if (!element || isInsideExtensionUi(element)) {
      return false;
    }

    if (element instanceof HTMLTextAreaElement && element.disabled) {
      return false;
    }

    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    const editable = element instanceof HTMLTextAreaElement || element.isContentEditable;

    return (
      editable &&
      rect.width > 80 &&
      rect.height > 18 &&
      rect.bottom > 0 &&
      rect.top < window.innerHeight &&
      style.visibility !== "hidden" &&
      style.display !== "none" &&
      Number(style.opacity) !== 0
    );
  }

  function scoreComposerCandidate(element) {
    const rect = element.getBoundingClientRect();
    const bottomDistance = Math.abs(window.innerHeight - rect.bottom);
    const nearBottomBonus = rect.top > window.innerHeight * 0.35 ? 1000 : 0;
    const idBonus = element.id === "prompt-textarea" ? 500 : 0;
    const testIdBonus = element.getAttribute("data-testid") === "composer-textarea" ? 400 : 0;
    const textAreaBonus = element instanceof HTMLTextAreaElement ? 100 : 0;

    return nearBottomBonus + idBonus + testIdBonus + textAreaBonus - bottomDistance;
  }

  function getComposerText(element) {
    if (!element) {
      return "";
    }

    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
      return element.value || "";
    }

    return (element.innerText || element.textContent || "")
      .replace(/\u200b/g, "")
      .trim();
  }

  function setComposerText(element, text) {
    if (!element) {
      return false;
    }

    element.focus();

    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
      dispatchBeforeInputEvent(element);
      setNativeInputValue(element, text);
      dispatchInputEvents(element);
      return normalizedText(getComposerText(element)) === normalizedText(text);
    }

    if (element.isContentEditable) {
      dispatchBeforeInputEvent(element);
      const insertedWithCommand = replaceContentEditableSelection(element, text);
      if (!insertedWithCommand || normalizedText(getComposerText(element)) !== normalizedText(text)) {
        replaceContentEditableChildren(element, text);
      }

      dispatchInputEvents(element);
      return normalizedText(getComposerText(element)) === normalizedText(text);
    }

    return false;
  }

  function setNativeInputValue(element, value) {
    const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

    if (descriptor && descriptor.set) {
      descriptor.set.call(element, value);
    } else {
      element.value = value;
    }
  }

  function replaceContentEditableSelection(element, text) {
    try {
      element.focus();
      if (!document.execCommand("selectAll", false, null)) {
        selectContentEditableContents(element);
      }

      if (document.execCommand("insertText", false, text)) {
        return true;
      }
    } catch (_error) {
      // Fall through to the range-based attempt below.
    }

    try {
      selectContentEditableContents(element);
      return document.execCommand("insertText", false, text);
    } catch (_error) {
      return false;
    }
  }

  function selectContentEditableContents(element) {
    try {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (_error) {
      // Selection may fail on detached or temporarily hidden editors.
    }
  }

  function replaceContentEditableChildren(element, text) {
    const fragment = document.createDocumentFragment();
    const lines = String(text).split("\n");

    lines.forEach((line, index) => {
      if (index > 0) {
        fragment.appendChild(document.createElement("br"));
      }
      fragment.appendChild(document.createTextNode(line));
    });

    element.replaceChildren(fragment);
  }

  function dispatchBeforeInputEvent(element) {
    try {
      element.dispatchEvent(
        new InputEvent("beforeinput", {
          bubbles: true,
          cancelable: true,
          inputType: "insertText"
        })
      );
    } catch (_error) {
      element.dispatchEvent(new Event("beforeinput", { bubbles: true, cancelable: true }));
    }
  }

  function dispatchInputEvents(element) {
    try {
      element.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          cancelable: true,
          inputType: "insertText"
        })
      );
    } catch (_error) {
      element.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
    }

    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function renderClarifyChip(composer) {
    if (state.uiState !== "idle" && state.uiState !== "chip_visible" && state.uiState !== "inserted") {
      return;
    }

    if (!state.chip) {
      state.chip = document.createElement("button");
      state.chip.id = CHIP_ID;
      state.chip.className = `${UI_ROOT_CLASS} cbs-chip`;
      state.chip.type = "button";
      state.chip.setAttribute("aria-label", "Clarify prompt before sending");
      state.chip.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openQuestions();
      });
      document.body.appendChild(state.chip);
    }

    state.chip.replaceChildren();
    state.chip.appendChild(createElement("span", "cbs-chip-label", "Clarify"));

    if (state.showLocalBadge && getViewportMetrics().width > 480) {
      state.chip.appendChild(createElement("span", "cbs-local-badge", "Local"));
    }

    state.uiState = "chip_visible";
    positionElementNearComposer(state.chip, composer, "chip");
  }

  function openQuestions() {
    const composer = findComposer();
    if (!composer) {
      renderError("입력 중인 프롬프트를 찾지 못했어요.");
      return;
    }

    const draft = getComposerText(composer);
    if (!window.CBSRuleEngine.shouldShowClarify(draft)) {
      removeChip();
      return;
    }

    state.composer = composer;
    state.activeDraft = draft;
    state.originalDraft = null;
    state.generatedPrompt = "";
    state.popoverPlacement = resolvePopoverPlacement(composer);
    state.popoverAnchorRect = snapshotRect(composer.getBoundingClientRect());
    state.domain = window.CBSRuleEngine.classifyDomain(draft);
    state.taskType = window.CBSRuleEngine.classifyTaskType(draft);
    state.questions = window.CBSRuleEngine.getQuestionsForDraft(draft).slice(0, 2);
    state.answers = {};
    state.contextLine = "";
    state.uiState = "questions_open";

    ensurePopover();
    refreshPopover();
    focusFirstPopoverControl();
    positionUi();
  }

  function ensurePopover() {
    if (state.popover) {
      return;
    }

    state.popover = document.createElement("section");
    state.popover.id = POPOVER_ID;
    state.popover.className = `${UI_ROOT_CLASS} cbs-popover`;
    state.popover.setAttribute("aria-label", "Clarify Before Send questions");
    document.body.appendChild(state.popover);
  }

  function refreshPopover() {
    ensurePopover();
    state.popover.replaceChildren();
    state.popover.appendChild(renderPopoverHeader());

    if (!state.questions.length) {
      state.popover.appendChild(createElement("p", "cbs-muted", "이 초안에는 질문을 만들 수 없어요."));
      state.popover.appendChild(renderFooter(false));
      return;
    }

    const questionWrap = createElement("div", "cbs-question-list");
    state.questions.forEach((question, questionIndex) => {
      questionWrap.appendChild(renderQuestion(question, questionIndex));
    });
    state.popover.appendChild(questionWrap);

    if (areAllQuestionsAnswered()) {
      state.uiState = "preview_open";
      state.generatedPrompt = compileCurrentBrief();
      state.popover.appendChild(renderPreview());
    }

    state.popover.appendChild(renderFooter(areAllQuestionsAnswered()));
    positionUi();
  }

  function renderPopoverHeader() {
    const header = createElement("div", "cbs-popover-header");
    const textWrap = createElement("div", "cbs-popover-heading");
    textWrap.appendChild(createElement("strong", "cbs-title", "Clarify Before Send"));
    textWrap.appendChild(createElement("span", "cbs-subtitle", "답변 품질을 좌우하는 맥락만 먼저 정리합니다."));
    header.appendChild(textWrap);

    if (state.showLocalBadge) {
      header.appendChild(createElement("span", "cbs-mode-pill", "Local Only"));
    }

    return header;
  }

  function renderQuestion(question, questionIndex) {
    const group = createElement("div", "cbs-question");
    group.appendChild(createElement("div", "cbs-question-label", `Q${questionIndex + 1}. ${question.label}`));

    if (question.inputType === "context_line") {
      group.appendChild(renderContextLineInput(question));
      return group;
    }

    const options = createElement("div", "cbs-options");
    question.options.forEach((option) => {
      const button = createElement("button", "cbs-option", option);
      button.type = "button";
      button.setAttribute("aria-pressed", state.answers[question.slot] === option ? "true" : "false");

      if (state.answers[question.slot] === option) {
        button.classList.add("is-selected");
      }

      button.addEventListener("click", (event) => {
        event.preventDefault();
        state.answers[question.slot] = option;
        refreshPopover();
      });

      options.appendChild(button);
    });

    group.appendChild(options);
    return group;
  }

  function renderContextLineInput(question) {
    const wrap = createElement("div", "cbs-context-line-wrap");
    const input = document.createElement("input");
    input.className = "cbs-context-line-input";
    input.type = "text";
    input.inputMode = "text";
    input.autocomplete = "off";
    input.spellcheck = true;
    input.value = state.contextLine;
    input.placeholder = question.placeholder || question.label || "Add one line of context";
    input.setAttribute("aria-label", question.label || "One-line context");
    input.addEventListener("input", (event) => {
      state.contextLine = event.target.value || "";
      updatePreviewFromCurrentAnswers();
    });
    wrap.appendChild(input);

    return wrap;
  }

  function compileCurrentBrief() {
    return window.CBSBriefCompiler.compileBrief({
      draft: state.activeDraft,
      domain: state.domain,
      taskType: state.taskType,
      answers: state.answers,
      contextLine: state.contextLine
    });
  }

  function updatePreviewFromCurrentAnswers() {
    if (!state.popover || !areAllQuestionsAnswered()) {
      return;
    }

    state.uiState = "preview_open";
    state.generatedPrompt = compileCurrentBrief();
    const previewSection = state.popover.querySelector(".cbs-preview-section");
    if (previewSection) {
      populatePreviewSection(previewSection, { small: false });
    }
    positionUi();
  }

  function renderPreview() {
    const section = createElement("div", "cbs-preview-section");
    populatePreviewSection(section, { small: false });
    return section;
  }

  function populatePreviewSection(section, options = {}) {
    section.replaceChildren();
    section.appendChild(renderOriginalDraftSummary());
    section.appendChild(createElement("div", "cbs-section-title", "정리된 프롬프트"));
    section.appendChild(renderSectionChips(state.generatedPrompt));
    section.appendChild(renderPromptPreview(state.generatedPrompt, options));
  }

  function renderOriginalDraftSummary() {
    const draft = state.activeDraft || "";
    const maxInlineLength = 96;

    if (draft.length > maxInlineLength) {
      const details = document.createElement("details");
      details.className = "cbs-original-draft cbs-original-draft-details";
      details.appendChild(createElement("summary", "", `원문: ${draft.slice(0, maxInlineLength)}...`));
      details.appendChild(createElement("p", "", draft));
      return details;
    }

    return createElement("div", "cbs-original-draft", `원문: ${draft}`);
  }

  function renderSectionChips(prompt) {
    const parsed = parsePromptForPreview(prompt);
    const wrap = createElement("div", "cbs-section-chip-row");

    if (!parsed.sectionTitles.length) {
      return wrap;
    }

    wrap.appendChild(createElement("span", "cbs-section-chip-label", "정리됨"));
    parsed.sectionTitles.forEach((title) => {
      wrap.appendChild(createElement("span", "cbs-section-chip", title));
    });
    return wrap;
  }

  function renderPromptPreview(prompt, options = {}) {
    const parsed = parsePromptForPreview(prompt);

    if (!parsed.hasHeaders) {
      const fallback = createElement("pre", options.small ? "cbs-preview-text cbs-preview-text-small" : "cbs-preview-text");
      fallback.textContent = prompt || "";
      fallback.setAttribute("data-cbs-raw-prompt", prompt || "");
      return fallback;
    }

    const wrap = createElement(
      "div",
      options.small ? "cbs-preview-rendered cbs-preview-rendered-small" : "cbs-preview-rendered"
    );
    wrap.setAttribute("data-cbs-raw-prompt", prompt || "");

    parsed.blocks.forEach((block) => {
      if (block.type === "heading") {
        wrap.appendChild(createElement("h3", "cbs-preview-heading", block.text));
      } else if (block.type === "list") {
        const list = createElement("ul", "cbs-preview-list");
        block.items.forEach((item) => {
          list.appendChild(createElement("li", "", item));
        });
        wrap.appendChild(list);
      } else if (block.type === "paragraph") {
        wrap.appendChild(createElement("p", "cbs-preview-paragraph", block.text));
      } else if (block.type === "space") {
        wrap.appendChild(createElement("div", "cbs-preview-space", ""));
      }
    });

    return wrap;
  }

  function parsePromptForPreview(prompt) {
    const lines = String(prompt || "").split(/\r?\n/);
    const blocks = [];
    const sectionTitles = [];
    let currentList = null;
    let hasHeaders = false;

    lines.forEach((line) => {
      const headingMatch = line.match(/^#\s(.+)/);
      if (headingMatch) {
        currentList = null;
        hasHeaders = true;
        sectionTitles.push(headingMatch[1]);
        blocks.push({ type: "heading", text: headingMatch[1] });
        return;
      }

      if (line.startsWith("- ")) {
        if (!currentList) {
          currentList = { type: "list", items: [] };
          blocks.push(currentList);
        }
        currentList.items.push(line.slice(2));
        return;
      }

      currentList = null;

      if (!line.trim()) {
        blocks.push({ type: "space", text: "" });
        return;
      }

      blocks.push({ type: "paragraph", text: line });
    });

    return { hasHeaders, sectionTitles, blocks };
  }

  function renderFooter(canInsert) {
    const footer = createElement("div", "cbs-footer");
    const cancel = createElement("button", "cbs-secondary-button", "닫기");
    cancel.type = "button";
    cancel.addEventListener("click", cancelFlow);
    footer.appendChild(cancel);

    if (canInsert) {
      const insert = createElement("button", "cbs-primary-button", "입력창에 넣기");
      insert.type = "button";
      insert.addEventListener("click", insertGeneratedPrompt);
      footer.appendChild(insert);
    }

    return footer;
  }

  function insertGeneratedPrompt() {
    const composer = findComposer() || state.composer;
    if (!composer || !state.generatedPrompt) {
      renderInsertError();
      return;
    }

    state.originalDraft = getComposerText(composer);

    let inserted = false;
    state.isProgrammaticInput = true;
    try {
      inserted = setComposerText(composer, state.generatedPrompt);
    } finally {
      state.isProgrammaticInput = false;
    }

    if (!inserted) {
      renderInsertError();
      return;
    }

    state.uiState = "inserted";
    renderInsertedState();
  }

  function renderInsertedState() {
    ensurePopover();
    state.popover.replaceChildren();
    state.popover.appendChild(renderPopoverHeader());
    state.popover.appendChild(createElement("p", "cbs-success", "입력창에 넣었습니다. 자동 전송하지 않았고, 원문은 Undo로 복원할 수 있습니다."));

    state.popover.appendChild(renderPromptPreview(state.generatedPrompt, { small: true }));

    const footer = createElement("div", "cbs-footer");
    const undo = createElement("button", "cbs-primary-button", "Undo");
    undo.type = "button";
    undo.addEventListener("click", undoInsertion);
    footer.appendChild(undo);

    const done = createElement("button", "cbs-secondary-button", "닫기");
    done.type = "button";
    done.addEventListener("click", closeFlow);
    footer.appendChild(done);
    state.popover.appendChild(footer);
    positionUi();
  }

  function undoInsertion() {
    const composer = findComposer() || state.composer;
    if (!composer || state.originalDraft === null) {
      closeFlow();
      return;
    }

    state.isProgrammaticInput = true;
    try {
      setComposerText(composer, state.originalDraft);
    } finally {
      state.isProgrammaticInput = false;
    }

    state.originalDraft = null;
    state.generatedPrompt = "";
    state.activeDraft = "";
    closeFlow();
  }

  function renderInsertError() {
    ensurePopover();
    state.uiState = "error";
    state.popover.replaceChildren();
    state.popover.appendChild(renderPopoverHeader());
    state.popover.appendChild(
      createElement("p", "cbs-error", "입력창에 자동 삽입하지 못했어요. 아래 프롬프트를 복사해서 사용하세요.")
    );

    const preview = createElement("pre", "cbs-preview-text");
    preview.textContent = state.generatedPrompt || "";
    state.popover.appendChild(preview);

    const footer = createElement("div", "cbs-footer");
    const copy = createElement("button", "cbs-primary-button", "복사하기");
    copy.type = "button";
    copy.addEventListener("click", copyGeneratedPrompt);
    footer.appendChild(copy);

    const cancel = createElement("button", "cbs-secondary-button", "닫기");
    cancel.type = "button";
    cancel.addEventListener("click", cancelFlow);
    footer.appendChild(cancel);
    state.popover.appendChild(footer);
    positionUi();
  }

  async function copyGeneratedPrompt() {
    const text = state.generatedPrompt || "";
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showInlineStatus("복사되었습니다.");
    } catch (_error) {
      fallbackCopy(text);
      showInlineStatus("복사되었습니다.");
    }
  }

  function fallbackCopy(text) {
    const box = document.createElement("textarea");
    box.value = text;
    box.className = "cbs-copy-buffer";
    document.body.appendChild(box);
    box.select();
    document.execCommand("copy");
    box.remove();
  }

  function showInlineStatus(message) {
    if (!state.popover) {
      return;
    }

    const status = createElement("p", "cbs-success", message);
    state.popover.appendChild(status);
    positionUi();
  }

  function renderError(message) {
    ensurePopover();
    state.uiState = "error";
    state.popover.replaceChildren();
    state.popover.appendChild(renderPopoverHeader());
    state.popover.appendChild(createElement("p", "cbs-error", message));
    state.popover.appendChild(renderFooter(false));
    positionUi();
  }

  function areAllQuestionsAnswered() {
    return (
      state.questions.length > 0 &&
      state.questions.every((question) => question.inputType === "context_line" || Boolean(state.answers[question.slot]))
    );
  }

  function cancelFlow() {
    rememberDismissedDraft();
    removePopover();
    state.uiState = state.chip ? "chip_visible" : "idle";
    state.activeDraft = "";
    state.generatedPrompt = "";
    state.questions = [];
    state.answers = {};
    state.contextLine = "";
    state.originalDraft = null;
    state.popoverPlacement = null;
    state.popoverAnchorRect = null;
    state.taskType = "brief.generic";
  }

  function closeFlow(options = {}) {
    rememberDismissedDraft();
    removePopover();
    removeChip();
    state.uiState = "idle";
    state.activeDraft = "";
    state.generatedPrompt = "";
    state.questions = [];
    state.answers = {};
    state.contextLine = "";
    state.originalDraft = null;
    state.popoverPlacement = null;
    state.popoverAnchorRect = null;
    state.taskType = "brief.generic";
    if (options.schedule !== false) {
      scheduleComposerCheck(DEBOUNCE_MS);
    }
  }

  function cleanupUi() {
    removePopover();
    removeChip();
    state.uiState = "idle";
    state.activeDraft = "";
    state.originalDraft = null;
    state.generatedPrompt = "";
    state.questions = [];
    state.answers = {};
    state.contextLine = "";
    state.dismissedDraftFingerprint = "";
    state.popoverPlacement = null;
    state.popoverAnchorRect = null;
    state.taskType = "brief.generic";
  }

  function rememberDismissedDraft() {
    const draft = state.activeDraft || (state.composer ? getComposerText(state.composer) : "");
    if (draft) {
      state.dismissedDraftFingerprint = fingerprintDraft(draft);
    }
  }

  function removeChip() {
    if (state.chip) {
      state.chip.remove();
      state.chip = null;
    }

    if (state.uiState === "chip_visible") {
      state.uiState = "idle";
    }
  }

  function removePopover() {
    if (state.popover) {
      state.popover.remove();
      state.popover = null;
    }
  }

  function focusFirstPopoverControl() {
    if (!state.popover) {
      return;
    }

    const control = state.popover.querySelector("input") || state.popover.querySelector("button");
    if (control && typeof control.focus === "function") {
      control.focus();
    }
  }

  function positionUi() {
    const composer = state.composer || findComposer();
    if (state.chip) {
      positionElementNearComposer(state.chip, composer, "chip");
    }

    if (state.popover) {
      positionElementNearComposer(state.popover, composer, "popover");
    }
  }

  function positionElementNearComposer(element, composer, kind) {
    if (!element || !composer) {
      return;
    }

    const rect = composer.getBoundingClientRect();
    const viewport = getViewportMetrics();
    const margin = viewport.width < 480 ? 12 : 10;
    const viewportLeft = viewport.offsetLeft;
    const viewportTop = viewport.offsetTop;
    const viewportRight = viewport.offsetLeft + viewport.width;
    const viewportBottom = viewport.offsetTop + viewport.height;

    if (kind === "chip") {
      const chipWidth = element.offsetWidth || 88;
      const chipHeight = element.offsetHeight || 34;
      const desiredLeft = viewport.width < 480 ? viewportLeft + margin : rect.left + 8;
      const left = clamp(desiredLeft, viewportLeft + margin, viewportRight - chipWidth - margin);
      const aboveTop = rect.top - chipHeight - 8;
      const belowTop = rect.bottom + 8;
      const hasRoomAbove = aboveTop >= viewportTop + margin;
      const top = hasRoomAbove ? aboveTop : belowTop;

      element.style.left = `${left}px`;
      element.style.top = `${clamp(top, viewportTop + margin, viewportBottom - chipHeight - margin)}px`;
      return;
    }

    positionPopover(element, state.popoverAnchorRect || rect, viewport);
  }

  function positionPopover(element, rect, viewport) {
    const margin = 12;
    const gap = 12;
    const viewportTop = viewport.offsetTop;
    const viewportBottom = viewport.offsetTop + viewport.height;
    const placement = state.popoverPlacement || resolvePopoverPlacementFromRect(rect, viewport);
    const computedWidth = computePopoverWidth(rect, viewport);
    const left = computePopoverLeft(rect, viewport, computedWidth);
    const availableHeight =
      placement === "above"
        ? rect.top - viewportTop - margin - gap
        : viewportBottom - rect.bottom - margin - gap;
    const maxHeight = Math.min(560, Math.max(160, availableHeight), Math.max(160, viewport.height - margin * 2));
    const previewMaxHeight =
      viewport.height < 600
        ? clamp(maxHeight * 0.36, 120, 160)
        : clamp(maxHeight * 0.42, 180, 260);

    element.style.setProperty("--cbs-popover-width", `${Math.round(computedWidth)}px`);
    element.style.setProperty("--cbs-popover-max-height", `${Math.round(maxHeight)}px`);
    element.style.setProperty("--cbs-preview-max-height", `${Math.round(previewMaxHeight)}px`);
    element.style.left = `${left}px`;

    const popoverHeight = Math.min(element.offsetHeight || maxHeight, maxHeight);
    let top;

    if (placement === "above") {
      top = rect.top - gap - popoverHeight;
    } else {
      top = rect.bottom + gap;
    }

    element.style.top = `${clamp(top, viewportTop + margin, viewportBottom - popoverHeight - margin)}px`;
  }

  function computePopoverWidth(rect, viewport) {
    const availableWidth = Math.max(0, viewport.width - 24);
    if (viewport.width < 480) {
      return availableWidth;
    }

    return Math.min(520, Math.max(320, rect.width), availableWidth);
  }

  function computePopoverLeft(rect, viewport, width) {
    const margin = viewport.width < 480 ? 12 : 10;
    const viewportLeft = viewport.offsetLeft;
    const viewportRight = viewport.offsetLeft + viewport.width;

    if (viewport.width < 480) {
      return viewportLeft + 12;
    }

    return clamp(rect.left, viewportLeft + margin, viewportRight - width - margin);
  }

  function isEventFromComposer(event, composer) {
    return event.target === composer || composer.contains(event.target);
  }

  function isInsideExtensionUi(target) {
    return Boolean(target && target.closest && target.closest(`.${UI_ROOT_CLASS}`));
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined) {
      element.textContent = text;
    }
    return element;
  }

  function normalizedText(value) {
    return String(value || "")
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .trim();
  }

  function getViewportMetrics() {
    const viewport = window.visualViewport;
    return {
      width: viewport?.width || window.innerWidth,
      height: viewport?.height || window.innerHeight,
      offsetLeft: viewport?.offsetLeft || 0,
      offsetTop: viewport?.offsetTop || 0
    };
  }

  function snapshotRect(rect) {
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  }

  function resolvePopoverPlacement(composer) {
    return resolvePopoverPlacementFromRect(composer.getBoundingClientRect(), getViewportMetrics());
  }

  function resolvePopoverPlacementFromRect(rect, viewport) {
    const margin = 12;
    const viewportTop = viewport.offsetTop;
    const viewportBottom = viewport.offsetTop + viewport.height;
    const spaceAbove = rect.top - viewportTop - margin;
    const spaceBelow = viewportBottom - rect.bottom - margin;

    if (spaceAbove >= 260) {
      return "above";
    }

    if (spaceBelow > spaceAbove) {
      return "below";
    }

    return "above";
  }

  function fingerprintDraft(value) {
    const text = window.CBSRuleEngine.normalizeDraft(value).toLowerCase();
    let hash = 2166136261;

    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return `${text.length}:${hash >>> 0}`;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  window.CBSContent = {
    findComposer,
    getComposerText,
    setComposerText,
    dispatchInputEvents,
    parsePromptForPreview,
    renderPromptPreview
  };
})();
