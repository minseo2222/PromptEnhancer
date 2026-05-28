const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

let commandHandler = null;
let activeTab = { id: 7, url: "https://chatgpt.com/" };
const sentMessages = [];

global.chrome = {
  commands: {
    onCommand: {
      addListener(handler) {
        commandHandler = handler;
      }
    }
  },
  tabs: {
    query(queryInfo, callback) {
      assert.deepStrictEqual(queryInfo, { active: true, currentWindow: true });
      callback(activeTab ? [activeTab] : []);
    },
    sendMessage(tabId, message, callback) {
      sentMessages.push({ tabId, message });
      if (callback) callback();
    }
  },
  runtime: {
    lastError: null
  },
  storage: {
    local: {
      set() {
        assert.fail("background shortcut relay must not write storage");
      }
    }
  }
};
global.fetch = () => assert.fail("background shortcut relay must not call fetch");
global.XMLHttpRequest = function XMLHttpRequest() {
  assert.fail("background shortcut relay must not construct XMLHttpRequest");
};

vm.runInThisContext(fs.readFileSync(path.join(__dirname, "..", "src/background.js"), "utf8"), {
  filename: "src/background.js"
});

assert.ok(commandHandler, "background should register a commands listener");

commandHandler("other-command");
assert.strictEqual(sentMessages.length, 0, "unrelated commands should be ignored");

activeTab = { id: 8, url: "https://example.com/" };
commandHandler("cbs-trigger-clarify");
assert.strictEqual(sentMessages.length, 0, "unsupported tab should be ignored");

activeTab = { id: 12 };
commandHandler("cbs-trigger-clarify");
assert.strictEqual(sentMessages.length, 0, "tabs without a supported URL should be ignored");

activeTab = { id: 9, url: "https://chat.openai.com/c/abc" };
commandHandler("cbs-trigger-clarify");
assert.deepStrictEqual(sentMessages.pop(), {
  tabId: 9,
  message: { type: "cbs-trigger-clarify" }
});

activeTab = { id: 10, url: "https://claude.ai/chat/abc" };
commandHandler("cbs-trigger-clarify");
assert.deepStrictEqual(sentMessages.pop(), {
  tabId: 10,
  message: { type: "cbs-trigger-clarify" }
});

activeTab = { id: 11, url: "https://gemini.google.com/app" };
commandHandler("cbs-trigger-clarify");
assert.deepStrictEqual(sentMessages.pop(), {
  tabId: 11,
  message: { type: "cbs-trigger-clarify" }
});

process.stdout.write("background shortcut relay test ok\n");
