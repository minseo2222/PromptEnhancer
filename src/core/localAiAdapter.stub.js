(function () {
  "use strict";

  /*
   * Future-only local AI adapter.
   *
   * v0 does not call this adapter. If a later version uses a browser-local model,
   * it must:
   * - check window.LanguageModel availability only after explicit user action,
   * - use a strict timeout,
   * - validate structured JSON before using it,
   * - fall back to deterministic templates,
   * - never send prompt text to a server.
   */
  window.CBSLocalAIAdapter = {
    async isAvailable() {
      return Boolean(window.LanguageModel);
    },

    async suggestQuestions() {
      throw new Error("Local AI adapter is not implemented in v0.");
    },

    async compileBrief() {
      throw new Error("Local AI adapter is not implemented in v0.");
    }
  };
})();
