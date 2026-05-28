(function () {
  "use strict";

  const enabledInput = document.getElementById("enabled");
  const showLocalBadgeInput = document.getElementById("showLocalBadge");
  const feedbackLink = document.getElementById("feedbackLink");
  const status = document.getElementById("status");
  const FEEDBACK_URL = "https://example.com/clarify-before-send-feedback";

  init();

  async function init() {
    const settings = await window.CBSStorage.getSettings();
    enabledInput.checked = settings.enabled;
    showLocalBadgeInput.checked = settings.showLocalBadge;
    feedbackLink.href = FEEDBACK_URL;

    enabledInput.addEventListener("change", save);
    showLocalBadgeInput.addEventListener("change", save);
  }

  async function save() {
    await window.CBSStorage.saveSettings({
      enabled: enabledInput.checked,
      showLocalBadge: showLocalBadgeInput.checked
    });

    status.textContent = "Settings saved.";
    window.setTimeout(() => {
      status.textContent = "";
    }, 1200);
  }
})();
