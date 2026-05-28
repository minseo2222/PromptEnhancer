const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

class FakeEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.bubbles = Boolean(options.bubbles);
    this.cancelable = Boolean(options.cancelable);
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

  focus() {}

  querySelector(selector) {
    return queryAll(this, selector)[0] || null;
  }

  querySelectorAll(selector) {
    return queryAll(this, selector);
  }

  getBoundingClientRect() {
    return this.rect || { top: 680, right: 760, bottom: 740, left: 240, width: 520, height: 60 };
  }

  get offsetWidth() {
    return 420;
  }

  get offsetHeight() {
    return 260;
  }

  get innerText() {
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
  if (selector.startsWith("#")) return element.id === selector.slice(1);
  if (selector.startsWith(".")) return element.classList.contains(selector.slice(1));
  if (selector === "textarea") return element instanceof FakeTextAreaElement;
  if (selector === "input") return element instanceof FakeInputElement;
  if (selector === '[contenteditable="true"]') return element.isContentEditable;
  if (selector === '[data-testid="composer-textarea"]') return element.getAttribute("data-testid") === "composer-textarea";
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

async function main() {
  const document = new FakeDocument();
  const window = {
    document,
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

  const composer = document.createElement("textarea");
  composer.id = "prompt-textarea";
  composer.value = "콜드메일 작성해줘";
  composer.rect = { top: 680, right: 760, bottom: 740, left: 240, width: 520, height: 60 };
  document.body.appendChild(composer);

  for (const file of ["src/core/templates.js", "src/core/promptPatterns.js", "src/core/ruleEngine.js", "src/core/briefCompiler.js"]) {
    vm.runInThisContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), { filename: file });
  }

  const originalCompileBrief = window.CBSBriefCompiler.compileBrief;
  const compileCalls = [];
  window.CBSBriefCompiler.compileBrief = (input) => {
    compileCalls.push({ ...input });
    return originalCompileBrief(input);
  };

  vm.runInThisContext(fs.readFileSync(path.join(__dirname, "..", "src/content/content.js"), "utf8"), {
    filename: "src/content/content.js"
  });

  await new Promise((resolve) => setTimeout(resolve, 320));

  const chip = document.querySelector("#cbs-clarify-chip");
  assert.ok(chip, "Clarify chip should render for context_line draft");
  chip.dispatchEvent(new FakeEvent("click", { bubbles: true, cancelable: true }));

  const contextInput = document.querySelector(".cbs-context-line-input");
  assert.ok(contextInput, "context_line input should render");
  assert.ok(!document.querySelector(".cbs-option"), "context_line case should not render multiple-choice chips");

  const initialPreview = document.querySelector(".cbs-preview-text");
  assert.ok(initialPreview, "empty context should still render a graceful preview");
  assert.ok(initialPreview.textContent.includes("확인 필요"), "empty context preview should keep missing context explicit");

  const contextLine = "HR팀장에게 채용 자동화 SaaS 무료 데모를 제안하는 첫 콜드메일";
  contextInput.value = contextLine;
  contextInput.dispatchEvent(new FakeEvent("input", { bubbles: true }));

  const preview = document.querySelector(".cbs-preview-text");
  assert.ok(preview.textContent.includes(contextLine), "preview should include the one-line context");
  assert.ok(compileCalls.some((call) => call.contextLine === contextLine), "compileBrief should receive contextLine");

  assert.strictEqual(window.CBSContent.getComposerText(composer), "콜드메일 작성해줘", "draft should remain unchanged before insert");
  assert.ok(!compileCalls.some((call) => String(call.contextLine || "").includes("undefined")), "contextLine should be explicit");
  process.stdout.write("content context_line DOM test ok\n");
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
