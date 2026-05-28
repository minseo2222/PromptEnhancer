(function () {
  "use strict";

  const COMMAND_TRIGGER_CLARIFY = "cbs-trigger-clarify";
  const MESSAGE_TRIGGER_CLARIFY = { type: "cbs-trigger-clarify" };
  const SUPPORTED_URL_PATTERN = /^https:\/\/(chatgpt\.com|chat\.openai\.com|claude\.ai|gemini\.google\.com)\//;

  chrome.commands.onCommand.addListener((command) => {
    if (command !== COMMAND_TRIGGER_CLARIFY) {
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs && tabs[0];
      if (!tab || typeof tab.id !== "number") {
        return;
      }

      if (!tab.url || !SUPPORTED_URL_PATTERN.test(tab.url)) {
        return;
      }

      chrome.tabs.sendMessage(tab.id, MESSAGE_TRIGGER_CLARIFY, () => {
        void chrome.runtime.lastError;
      });
    });
  });
})();
