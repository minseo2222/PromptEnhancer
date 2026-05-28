(function () {
  "use strict";

  const DEFAULT_SETTINGS = Object.freeze({
    enabled: true,
    showLocalBadge: true
  });

  const ALLOWED_SETTING_KEYS = Object.keys(DEFAULT_SETTINGS);

  function hasChromeStorage() {
    return Boolean(
      typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local &&
        chrome.storage.local.get &&
        chrome.storage.local.set
    );
  }

  function sanitizeSettings(partial) {
    const safe = {};
    Object.entries(partial || {}).forEach(([key, value]) => {
      if (ALLOWED_SETTING_KEYS.includes(key)) {
        safe[key] = Boolean(value);
      }
    });
    return safe;
  }

  async function getSettings() {
    if (!hasChromeStorage()) {
      return { ...DEFAULT_SETTINGS };
    }

    const stored = await chrome.storage.local.get(ALLOWED_SETTING_KEYS);
    return {
      ...DEFAULT_SETTINGS,
      ...sanitizeSettings(stored)
    };
  }

  async function saveSettings(partial) {
    const safe = sanitizeSettings(partial);

    if (!hasChromeStorage()) {
      return { ...DEFAULT_SETTINGS, ...safe };
    }

    await chrome.storage.local.set(safe);
    return getSettings();
  }

  async function isEnabled() {
    const settings = await getSettings();
    return settings.enabled;
  }

  window.CBSStorage = {
    DEFAULT_SETTINGS,
    getSettings,
    saveSettings,
    isEnabled
  };
})();
