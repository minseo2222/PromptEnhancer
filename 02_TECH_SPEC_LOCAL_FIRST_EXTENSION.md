# Technical Spec — Local-first Chrome Extension Prototype

## 1. Build Target

Build a Chrome Extension Manifest V3 prototype.

No backend.
No API key.
No external scripts.
No build step required.
No cloud AI.
No local LLM dependency in the main flow.

Use plain JavaScript, HTML, and CSS.

## 2. Supported Sites

Required:

- https://chatgpt.com/*
- https://chat.openai.com/*

Do not support Claude or Gemini in v0.

## 3. Manifest Requirements

Use Manifest V3.

Required permissions:
- storage

Required host permissions:
- https://chatgpt.com/*
- https://chat.openai.com/*

Do not request:
- tabs
- history
- cookies
- scripting unless strictly necessary
- activeTab unless strictly necessary
- https://*/*
- <all_urls>

## 4. Recommended manifest.json

Create:

manifest.json

with roughly:

{
  "manifest_version": 3,
  "name": "Clarify Before Send Prototype",
  "version": "0.0.1",
  "description": "Local-first intent clarifier for ChatGPT prompts.",
  "permissions": ["storage"],
  "host_permissions": [
    "https://chatgpt.com/*",
    "https://chat.openai.com/*"
  ],
  "action": {
    "default_title": "Clarify Before Send",
    "default_popup": "src/popup/popup.html"
  },
  "content_scripts": [
    {
      "matches": [
        "https://chatgpt.com/*",
        "https://chat.openai.com/*"
      ],
      "js": [
        "src/core/templates.js",
        "src/core/ruleEngine.js",
        "src/core/briefCompiler.js",
        "src/core/storage.js",
        "src/content/content.js"
      ],
      "css": ["src/content/content.css"],
      "run_at": "document_idle"
    }
  ]
}

## 5. Directory Structure

clarify-before-send-prototype/
  manifest.json
  README.md
  src/
    content/
      content.js
      content.css
    popup/
      popup.html
      popup.js
      popup.css
    core/
      templates.js
      ruleEngine.js
      briefCompiler.js
      storage.js
      localAiAdapter.stub.js
  docs/
    PRIVACY.md
    TEST_PLAN.md

## 6. Module Responsibilities

### src/content/content.js

Responsibilities:
- Detect ChatGPT composer.
- Read current draft text.
- Debounce typing.
- Decide whether to show Clarify chip.
- Render chip and popover.
- Pass draft to rule engine.
- Render questions.
- Collect selected answers.
- Generate preview using brief compiler.
- Insert final prompt into composer.
- Support undo.
- Handle fallback copy button if insertion fails.

Do not:
- Read chat history.
- Scrape full page.
- Send draft to any network endpoint.
- Store prompt text.
- Auto-send.

### src/content/content.css

Responsibilities:
- Style floating Clarify chip.
- Style popover.
- Style question buttons.
- Style preview box.
- Avoid breaking ChatGPT layout.

### src/core/templates.js

Responsibilities:
- Define domains.
- Define questions.
- Define option sets.
- Define role/output templates.

### src/core/ruleEngine.js

Responsibilities:
- shouldShowClarify(draft)
- classifyDomain(draft)
- detectMissingSlots(draft, domain)
- getQuestionsForDraft(draft)

Main path must be deterministic and fast.

### src/core/briefCompiler.js

Responsibilities:
- compileBrief({ draft, domain, answers })
- Return a clean final prompt string.
- Do not call any AI model.

### src/core/storage.js

Responsibilities:
- Store settings only.
- Store dismiss/session preferences only if needed.
- Do not store prompt text.
- Do not store generated prompt text.

### src/core/localAiAdapter.stub.js

Responsibilities:
- Provide a future-facing stub only.
- Do not use it in main v0 flow.

Example interface:

window.CBSLocalAIAdapter = {
  async isAvailable() {
    return Boolean(window.LanguageModel);
  },

  async suggestQuestions() {
    throw new Error("Local AI adapter is not implemented in v0.");
  }
};

## 7. ChatGPT Composer Detection

Implement a robust best-effort composer detector.

Try selectors in this order:
- #prompt-textarea
- [data-testid="composer-textarea"]
- textarea
- [contenteditable="true"]

The detector should prefer visible elements near the bottom of the viewport.

Implement helper functions:

- findComposer()
- getComposerText(element)
- setComposerText(element, text)
- dispatchInputEvents(element)

For textarea:
- use element.value

For contenteditable:
- use innerText/textContent carefully
- dispatch input event after setting text

If insertion fails:
- Show generated prompt in preview.
- Provide "복사하기" button.

## 8. Clarify Display Logic

Only show chip when:

- draft length >= 12 characters
- user is not actively typing
- shouldShowClarify(draft) returns true
- popover is not already open

Debounce:
- 800ms after last input

Do not show chip for:
- Empty text
- Very short text
- Simple translation request
- Simple spelling request
- Simple summarization request
- Casual short messages

## 9. UI States

States:

1. idle
2. chip_visible
3. questions_open
4. preview_open
5. inserted
6. error

## 10. Insertion and Undo

Before insertion:
- Keep original draft in memory only.

After insertion:
- Replace composer text with generated prompt.
- Show Undo button for current session.
- Do not persist original draft.

Undo:
- Restore original draft.
- Clear memory reference after undo or page reload.

## 11. No Network Rule

The extension must not make any network request for prompt processing.

Do not use:
- fetch()
- XMLHttpRequest
- external script tags
- remote model calls
- analytics SDKs

Exception:
- None in v0.

## 12. Optional Local AI Stub

Do not use local AI in v0 main path.

However, include a stub file with comments explaining future integration:

- Check LanguageModel availability.
- Use only after user action.
- Use strict timeout.
- Validate JSON.
- Fall back to templates.
- Never block the UI.

## 13. Popup

Popup should show:

Title:
Clarify Before Send

Status:
Local Only Mode

Text:
- 현재 입력 중인 draft만 분석합니다.
- 프롬프트 본문을 서버로 보내지 않습니다.
- 채팅 히스토리를 읽지 않습니다.
- 프롬프트 본문을 저장하지 않습니다.
- 자동 전송하지 않습니다.

Settings:
- Enable/disable extension on ChatGPT
- Show Local Only badge: on/off

Store settings in chrome.storage.local.

## 14. README

README must include:

- What this is
- What this is not
- How to load unpacked extension
- How to test on ChatGPT
- Privacy notes
- Known limitations
- Future roadmap