You are a senior Chrome Extension engineer, privacy-focused product engineer, and pragmatic prototyping CTO.

Build the first working prototype of a Chrome Extension called:

Clarify Before Send

The extension helps ChatGPT users clarify vague prompts before sending them.

Important:
This is NOT a generic prompt enhancer.
This is an AI Intent Clarifier / Brief Builder.

The first prototype must be local-only and must not use any backend or external AI API.

## Product Goal

When a user writes a vague prompt in ChatGPT, such as:

"우리 서비스 마케팅 전략 짜줘"

the extension should show a small "Clarify" chip near the ChatGPT input.

When clicked, it should ask 1–2 multiple-choice questions, such as:

1. 목표는 무엇인가요?
- 신규 유저 획득
- 유료 전환율 개선
- 기존 유저 재방문
- 대표/투자자 보고용 정리
- 추천해줘

2. 원하는 결과물 형식은?
- 실행 체크리스트
- 1페이지 전략 문서
- 광고 캠페인 아이디어
- 시장/경쟁 분석 포함 보고서
- 추천해줘

Then it should generate a clearer final prompt and allow the user to insert it into the ChatGPT composer.

The extension must never auto-send.

## Hard Requirements

Build a working Chrome Extension Manifest V3 prototype.

Supported URLs:
- https://chatgpt.com/*
- https://chat.openai.com/*

Use:
- Plain JavaScript
- Plain HTML
- Plain CSS

Do not use:
- React
- Next.js
- Vite
- Bundlers
- External dependencies
- Backend
- OpenAI API
- Claude API
- Gemini API
- WebLLM
- Chrome Prompt API in the main flow
- Analytics SDKs
- Remote scripts

## Privacy Requirements

The prototype must be local-only.

Do not:
- Send prompt text to any server
- Store original prompt text
- Store generated prompt text
- Read chat history
- Scrape the full page
- Request <all_urls>
- Request https://*/*
- Use cookies/history/tabs permissions
- Log prompt text to console
- Auto-send messages

Only read:
- Current draft in the ChatGPT composer

Only store:
- Settings and UI preferences in chrome.storage.local

## Required Repository Structure

Create this structure:

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

## Implementation Details

### manifest.json

Use Manifest V3.

Required:
- permissions: ["storage"]
- host_permissions:
  - https://chatgpt.com/*
  - https://chat.openai.com/*
- content script runs on both domains
- popup exists

Do not add unnecessary permissions.

### src/content/content.js

Implement:

- findComposer()
- getComposerText(element)
- setComposerText(element, text)
- dispatchInputEvents(element)
- debounce input detection around 800ms
- renderClarifyChip()
- renderQuestionPopover()
- renderPreview()
- insertGeneratedPrompt()
- undoInsertion()

Composer detection should try:

1. #prompt-textarea
2. [data-testid="composer-textarea"]
3. textarea
4. [contenteditable="true"]

Prefer visible composer-like elements near the bottom of the page.

If insertion fails:
- Keep preview visible.
- Show copy button.

### src/core/ruleEngine.js

Implement:

- shouldShowClarify(draft)
- classifyDomain(draft)
- getQuestionsForDraft(draft)

Domains:
- marketing_strategy
- product_planning
- research
- writing_email
- personal_prioritization
- generic

Rules:
- Do not show clarify for drafts shorter than 12 characters.
- Do not show for simple translation, summarization, or spelling correction.
- Show for broad requests involving strategy, planning, research, PRD, email, prioritization, analysis, or decision-making.

### src/core/templates.js

Implement domain-specific question templates.

Each domain should have 1–2 questions.

Each question:
- Has a slot
- Has a label
- Has 4 useful options
- Has "추천해줘"

### src/core/briefCompiler.js

Implement:

compileBrief({ draft, domain, answers })

Return a structured Korean prompt.

Use this general format:

너는 [domain-specific expert role]이다.

목표:
[chosen goal]

맥락:
사용자의 원문 요청은 다음과 같다:
"[original draft]"

산출물 형식:
[chosen output format]

답변에 포함할 것:
- 핵심 요약
- 구체적인 실행 방법
- 우선순위
- 필요한 경우 표 또는 체크리스트
- 다음 액션

제약:
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 모르는 정보는 가정했다고 명시한다.
- 필요한 경우 먼저 추가 질문을 제안한다.

### src/core/storage.js

Implement settings helpers:

- getSettings()
- saveSettings(partial)
- isEnabled()

Allowed settings:
- enabled
- showLocalBadge

Do not store prompt text.

### src/core/localAiAdapter.stub.js

Create a stub only.

Do not call it from the main flow.

Include comments explaining:

- Future adapter may check window.LanguageModel.
- Future adapter must use timeout.
- Future adapter must validate JSON.
- Future adapter must fall back to templates.
- Future adapter must never send prompt text to server.

### src/popup

Create a simple popup.

It should show:

Clarify Before Send

Local Only Mode

- 현재 입력 중인 draft만 분석합니다.
- 프롬프트 본문을 서버로 보내지 않습니다.
- 채팅 히스토리를 읽지 않습니다.
- 프롬프트 본문을 저장하지 않습니다.
- 자동 전송하지 않습니다.

Settings:
- Enable extension on ChatGPT
- Show Local Only badge

Save settings with chrome.storage.local.

### src/content/content.css

Style requirements:
- Small floating chip near composer
- Non-blocking popover
- Multiple-choice option buttons
- Preview box
- Insert / Cancel / Undo buttons
- Must not visually dominate ChatGPT UI
- Must have high z-index but avoid covering the send button

## UX Requirements

The extension should:

- Wait until user stops typing before showing chip.
- Never block the user.
- Never show a modal.
- Never auto-send.
- Ask no more than 2 questions in v0.
- Show preview before insertion.
- Allow cancel.
- Allow undo.
- Work even without local AI.

## Initial Test Inputs

Ensure these work:

1. "우리 서비스 마케팅 전략 짜줘"
Expected:
- marketing_strategy
- Questions about goal and output format
- Brief mentions B2B SaaS 그로스 전략가

2. "새 기능 PRD 써줘"
Expected:
- product_planning
- Questions about PRD purpose and included scope
- Brief mentions 시니어 프로덕트 매니저

3. "경쟁사 분석해줘"
Expected:
- research
- Questions about research purpose and output format
- Brief mentions 전략 리서처 or 시장 분석가

4. "투자자에게 업데이트 메일 써줘"
Expected:
- writing_email
- Questions about purpose and tone
- Brief mentions 비즈니스 커뮤니케이션 코치

5. "요즘 할 게 너무 많고 뭐부터 해야 할지 모르겠어. 정리 좀 해줘."
Expected:
- personal_prioritization
- Questions about desired help and output format
- Brief mentions 생산성 코치

These should not aggressively show clarify:

- "이 문장 번역해줘"
- "이거 요약해줘"
- "맞춤법 고쳐줘"
- "안녕"

## README Requirements

Create README.md with:

- Project name
- What it does
- What it does not do
- Installation instructions
- Manual test instructions
- Privacy notes
- Known limitations
- Future roadmap

## docs/PRIVACY.md

Create a short privacy document stating:

- Local-only in v0
- No server
- No prompt storage
- No chat history reading
- No auto-send
- ChatGPT host permissions only

## docs/TEST_PLAN.md

Create a manual test plan covering:

- Load unpacked
- ChatGPT injection
- Clarify flow
- Insert
- Undo
- Privacy/no network
- Permission check
- Storage check

## Completion Criteria

The task is complete when:

1. The extension loads with no manifest errors.
2. Popup works.
3. ChatGPT content script injects UI.
4. Clarify chip appears for vague prompts.
5. Questions appear after clicking chip.
6. Preview is generated.
7. Generated prompt can be inserted into ChatGPT composer.
8. Undo restores original draft.
9. No prompt text is stored.
10. No network calls are made for prompt processing.
11. README explains how to install and test.

Start by creating the files.
Then implement the extension.
Then provide a concise summary of what was built and how to test it.