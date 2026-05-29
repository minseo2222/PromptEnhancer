const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

class FakeEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.bubbles = Boolean(options.bubbles);
    this.cancelable = Boolean(options.cancelable);
    this.key = options.key || "";
    this.target = null;
    this.defaultPrevented = false;
    this.propagationStopped = false;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }

  stopPropagation() {
    this.propagationStopped = true;
  }
}

class FakeClassList {
  constructor(element) {
    this.element = element;
  }

  add(className) {
    const classes = new Set(this.element.className.split(/\s+/).filter(Boolean));
    classes.add(className);
    this.element.className = Array.from(classes).join(" ");
  }

  contains(className) {
    return this.element.className.split(/\s+/).includes(className);
  }
}

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = {};
    this.eventListeners = {};
    this.className = "";
    this.id = "";
    this.type = "";
    this.value = "";
    this.disabled = false;
    this.isContentEditable = false;
    this.style = {
      setProperty(name, value) {
        this[name] = value;
      }
    };
    this.classList = new FakeClassList(this);
    this.textContent = "";
    this.rect = { top: 680, right: 760, bottom: 740, left: 240, width: 520, height: 60 };
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  replaceChildren(...children) {
    this.children.forEach((child) => {
      child.parentNode = null;
    });
    this.children = [];
    this.textContent = "";
    children.forEach((child) => this.appendChild(child));
  }

  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
    this.parentNode = null;
  }

  contains(target) {
    if (target === this) return true;
    return this.children.some((child) => child.contains && child.contains(target));
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (matchesSelector(current, selector)) return current;
      current = current.parentNode;
    }
    return null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
    if (name === "id") this.id = String(value);
    if (name === "class") this.className = String(value);
    if (name === "contenteditable") this.isContentEditable = String(value) === "true";
  }

  getAttribute(name) {
    if (name === "id") return this.id || null;
    if (name === "class") return this.className || null;
    return this.attributes[name] || null;
  }

  addEventListener(type, handler) {
    this.eventListeners[type] = this.eventListeners[type] || [];
    this.eventListeners[type].push(handler);
  }

  dispatchEvent(event) {
    event.target = event.target || this;
    (this.eventListeners[event.type] || []).forEach((handler) => handler.call(this, event));
    return !event.defaultPrevented;
  }

  focus() {
    if (global.document) {
      global.document.activeElement = this;
    }
  }

  querySelector(selector) {
    return queryAll(this, selector)[0] || null;
  }

  querySelectorAll(selector) {
    return queryAll(this, selector);
  }

  getBoundingClientRect() {
    return this.rect;
  }

  get offsetWidth() {
    return 420;
  }

  get offsetHeight() {
    return 260;
  }

  get innerText() {
    if (this.tagName === "BR") return "\n";
    return this.value || this.textContent || this.children.map((child) => child.innerText || child.textContent || "").join("");
  }

  set innerText(value) {
    this.textContent = value;
  }
}

class FakeTextAreaElement extends FakeElement {
  constructor() {
    super("textarea");
  }
}

class FakeInputElement extends FakeElement {
  constructor() {
    super("input");
  }
}

class FakeDocument {
  constructor() {
    this.body = new FakeElement("body");
    this.eventListeners = {};
    this.activeElement = null;
  }

  createElement(tagName) {
    if (tagName.toLowerCase() === "textarea") return new FakeTextAreaElement();
    if (tagName.toLowerCase() === "input") return new FakeInputElement();
    return new FakeElement(tagName);
  }

  createTextNode(text) {
    const node = new FakeElement("#text");
    node.textContent = String(text);
    return node;
  }

  createDocumentFragment() {
    return new FakeElement("#fragment");
  }

  createRange() {
    return { selectNodeContents() {} };
  }

  addEventListener(type, handler) {
    this.eventListeners[type] = this.eventListeners[type] || [];
    this.eventListeners[type].push(handler);
  }

  dispatchEvent(event) {
    event.target = event.target || this;
    (this.eventListeners[event.type] || []).forEach((handler) => handler.call(this, event));
    return !event.defaultPrevented;
  }

  querySelector(selector) {
    return this.body.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.body.querySelectorAll(selector);
  }

  execCommand() {
    return false;
  }
}

function matchesSelector(element, selector) {
  if (selector === "rich-textarea [contenteditable=\"true\"]") {
    return element.isContentEditable && Boolean(element.closest("rich-textarea"));
  }

  if (selector === "[data-testid=\"chat-input\"] [contenteditable=\"true\"]") {
    return element.isContentEditable && Boolean(element.closest("[data-testid=\"chat-input\"]"));
  }

  const tagClassAttr = selector.match(/^([a-z0-9-]+)?(?:\.([A-Za-z0-9_-]+))?(?:\[([^=\]*~^$|]+)([*]?=)"([^"]+)"\])?$/i);
  if (tagClassAttr) {
    const [, tagName, className, attrName, operator, attrValue] = tagClassAttr;
    if (tagName && element.tagName.toLowerCase() !== tagName.toLowerCase()) return false;
    if (className && !element.classList.contains(className)) return false;
    if (attrName) {
      const actual = element.getAttribute(attrName) || "";
      return operator === "*=" ? actual.includes(attrValue) : actual === attrValue;
    }
    if (tagName || className) return true;
  }

  if (selector.startsWith("#")) return element.id === selector.slice(1);
  if (selector.startsWith(".")) return element.classList.contains(selector.slice(1));
  if (selector === "textarea") return element instanceof FakeTextAreaElement;
  if (selector === "input") return element instanceof FakeInputElement;
  if (selector === "[contenteditable=\"true\"]") return element.isContentEditable;
  if (selector === "[data-testid=\"composer-textarea\"]") return element.getAttribute("data-testid") === "composer-textarea";
  return element.tagName.toLowerCase() === selector.toLowerCase();
}

function queryAll(root, selector) {
  const results = [];
  const visit = (element) => {
    if (matchesSelector(element, selector)) results.push(element);
    element.children.forEach(visit);
  };
  root.children.forEach(visit);
  return results;
}

function loadScript(relativePath) {
  vm.runInThisContext(fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8"), {
    filename: relativePath
  });
}

function setupPlatform(platformId) {
  const document = new FakeDocument();
  const hostByPlatform = {
    chatgpt: "chatgpt.com",
    claude: "claude.ai",
    gemini: "gemini.google.com",
    unsupported: "example.com"
  };
  const window = {
    document,
    location: { hostname: hostByPlatform[platformId] },
    innerWidth: 1200,
    innerHeight: 800,
    visualViewport: null,
    addEventListener() {},
    clearTimeout,
    setTimeout,
    getComputedStyle() {
      return { visibility: "visible", display: "block", opacity: "1" };
    },
    getSelection() {
      return { removeAllRanges() {}, addRange() {} };
    }
  };

  global.window = window;
  global.document = document;
  global.Event = FakeEvent;
  global.InputEvent = FakeEvent;
  global.MutationObserver = class {
    observe() {}
  };
  global.HTMLTextAreaElement = FakeTextAreaElement;
  global.HTMLInputElement = FakeInputElement;
  global.navigator = { clipboard: { writeText: async () => assert.fail("clipboard should not be used") } };
  global.fetch = () => assert.fail("fetch must not be called");
  global.XMLHttpRequest = function XMLHttpRequest() {
    assert.fail("XMLHttpRequest must not be constructed");
  };
  window.Event = FakeEvent;
  window.InputEvent = FakeEvent;
  window.MutationObserver = global.MutationObserver;
  window.HTMLTextAreaElement = FakeTextAreaElement;
  window.HTMLInputElement = FakeInputElement;
  window.navigator = global.navigator;
  window.fetch = global.fetch;
  window.XMLHttpRequest = global.XMLHttpRequest;
  window.CBSStorage = {
    DEFAULT_SETTINGS: { enabled: true, showLocalBadge: true },
    async getSettings() {
      return { enabled: true, showLocalBadge: true };
    }
  };

  const chrome = {
    runtime: {
      onMessage: {
        addListener() {}
      }
    },
    storage: {
      onChanged: {
        addListener() {}
      },
      local: {
        set() {
          assert.fail("content adapter tests must not write storage");
        }
      }
    }
  };
  global.chrome = chrome;
  window.chrome = chrome;

  const draft = "우리 서비스 마케팅 전략 짜줘";
  let composer;
  if (platformId === "chatgpt") {
    composer = document.createElement("textarea");
    composer.id = "prompt-textarea";
    composer.value = draft;
    document.body.appendChild(composer);
  } else if (platformId === "claude") {
    composer = document.createElement("div");
    composer.setAttribute("class", "ProseMirror");
    composer.setAttribute("contenteditable", "true");
    composer.setAttribute("role", "textbox");
    composer.setAttribute("aria-label", "Message Claude");
    composer.textContent = draft;
    document.body.appendChild(composer);
  } else if (platformId === "gemini") {
    const richTextArea = document.createElement("rich-textarea");
    composer = document.createElement("div");
    composer.setAttribute("contenteditable", "true");
    composer.setAttribute("role", "textbox");
    composer.setAttribute("aria-label", "Enter a prompt here");
    composer.textContent = draft;
    richTextArea.appendChild(composer);
    document.body.appendChild(richTextArea);
  } else {
    composer = document.createElement("textarea");
    composer.id = "prompt-textarea";
    composer.value = draft;
    document.body.appendChild(composer);
  }

  for (const file of ["src/core/templates.js", "src/core/promptPatterns.js", "src/core/ruleEngine.js", "src/core/briefCompiler.js"]) {
    loadScript(file);
  }
  loadScript("src/content/content.js");

  return { document, composer, draft, platformId };
}

function answerAllMultipleChoiceQuestions(document) {
  for (let index = 0; index < 2; index += 1) {
    const group = document.querySelectorAll(".cbs-question")[index];
    const option = group && group.querySelector(".cbs-option");
    if (!option) return;
    option.dispatchEvent(new FakeEvent("click", { bubbles: true, cancelable: true }));
  }
}

async function testPlatform(platformId) {
  const { document, composer, draft } = setupPlatform(platformId);
  await new Promise((resolve) => setTimeout(resolve, 20));

  assert.strictEqual(window.CBSContent.getCurrentPlatform().id, platformId, `${platformId} should be selected`);
  assert.strictEqual(window.CBSContent.findComposer(), composer, `${platformId} composer should be detected`);

  window.CBSContent.triggerClarifyFromShortcut();
  assert.ok(document.querySelector("#cbs-clarify-popover"), `${platformId} should open clarify popover`);
  assert.strictEqual(window.CBSContent.getComposerText(composer), draft, `${platformId} must not auto-send or alter draft`);

  answerAllMultipleChoiceQuestions(document);
  const preview = document.querySelector(".cbs-preview-rendered") || document.querySelector(".cbs-preview-text");
  assert.ok(preview, `${platformId} should render preview before insert`);
  const rawPrompt = preview.getAttribute("data-cbs-raw-prompt") || preview.textContent;
  assert.ok(rawPrompt.includes("#"), `${platformId} raw preview should be structured`);

  const insertButton = document.querySelector(".cbs-primary-button");
  assert.ok(insertButton, `${platformId} insert button should render`);
  insertButton.dispatchEvent(new FakeEvent("click", { bubbles: true, cancelable: true }));
  assert.strictEqual(window.CBSContent.getComposerText(composer), rawPrompt, `${platformId} insert should write raw prompt`);

  const undoButton = document.querySelector(".cbs-primary-button");
  assert.ok(undoButton, `${platformId} undo button should render`);
  undoButton.dispatchEvent(new FakeEvent("click", { bubbles: true, cancelable: true }));
  assert.strictEqual(window.CBSContent.getComposerText(composer), draft, `${platformId} undo should restore draft`);
}

async function testUnsupportedHost() {
  const { document, composer, draft } = setupPlatform("unsupported");
  await new Promise((resolve) => setTimeout(resolve, 20));

  assert.strictEqual(window.CBSContent.getCurrentPlatform(), null, "unsupported host should not select a platform");
  assert.strictEqual(window.CBSContent.findComposer(), null, "unsupported host should safely return no composer");

  window.CBSContent.triggerClarifyFromShortcut();
  assert.ok(!document.querySelector("#cbs-clarify-popover"), "unsupported host should not open a popover");
  assert.strictEqual(window.CBSContent.getComposerText(composer), draft, "unsupported host should not alter draft text");
}

(async () => {
  for (const platformId of ["chatgpt", "claude", "gemini"]) {
    await testPlatform(platformId);
  }
  await testUnsupportedHost();
  process.stdout.write("platform adapter DOM tests ok\n");
})().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
