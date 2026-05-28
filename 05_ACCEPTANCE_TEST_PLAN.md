# Acceptance Criteria and Manual Test Plan

## 1. Prototype Completion Criteria

The prototype is complete when all critical tests pass.

## 2. Installation Test

Steps:

1. Open chrome://extensions
2. Enable Developer mode
3. Click "Load unpacked"
4. Select project root folder
5. Extension loads with no manifest errors
6. Extension icon appears
7. Popup opens

Pass criteria:
- No manifest error
- No console error on popup open
- Popup shows Local Only Mode

## 3. ChatGPT Injection Test

Steps:

1. Open https://chatgpt.com/
2. Start a new chat
3. Type: "우리 서비스 마케팅 전략 짜줘"
4. Wait about 1 second

Pass criteria:
- Clarify chip appears near the composer
- It does not cover the send button
- It does not interrupt typing

## 4. Clarification Flow Test

Steps:

1. Click Clarify chip
2. Select:
   - 신규 유저 획득
   - 1페이지 전략 문서
3. Preview appears

Pass criteria:
- 1–2 questions appear
- Questions are multiple-choice
- Preview contains:
  - B2B SaaS 그로스 전략가
  - 신규 유저 획득
  - 1페이지 전략 문서
  - 실행 방법 or 성공 지표

## 5. Insert Test

Steps:

1. Click "입력창에 넣기"

Pass criteria:
- Original draft is replaced by generated prompt
- Prompt appears inside ChatGPT composer
- Message is not automatically sent
- Undo button appears

## 6. Undo Test

Steps:

1. After insertion, click Undo

Pass criteria:
- Original draft is restored
- No prompt is sent
- No page reload happens

## 7. Simple Prompt Non-interference Test

Test these drafts:

- "이 문장 번역해줘"
- "이거 요약해줘"
- "맞춤법 고쳐줘"
- "안녕"

Pass criteria:
- Clarify chip should not appear, or should appear less aggressively only if manually triggered.
- v0 preferred behavior: do not show chip.

## 8. Domain Tests

### Product Planning

Input:
"새 기능 PRD 써줘"

Expected:
- Domain: product_planning
- Question mentions PRD purpose
- Output mentions 시니어 프로덕트 매니저

### Research

Input:
"경쟁사 분석해줘"

Expected:
- Domain: research
- Question asks research purpose
- Output mentions 시장 분석가 or 전략 리서처

### Email

Input:
"투자자에게 업데이트 메일 써줘"

Expected:
- Domain: writing_email
- Question asks message purpose or tone
- Output mentions 비즈니스 커뮤니케이션

### Personal Prioritization

Input:
"요즘 할 게 너무 많고 뭐부터 해야 할지 모르겠어. 정리 좀 해줘."

Expected:
- Domain: personal_prioritization
- Question asks desired help
- Output recommends prioritization or today plan

## 9. Privacy Test

Steps:

1. Open Chrome DevTools on ChatGPT tab
2. Use the extension
3. Check Network tab

Pass criteria:
- No extension-originated network calls for prompt processing
- No calls to OpenAI/Claude/Gemini APIs
- No analytics calls

## 10. Storage Test

Steps:

1. Use extension with several prompts
2. Inspect chrome.storage.local manually if possible

Pass criteria:
- Settings may be stored
- Prompt body must not be stored
- Generated prompt body must not be stored

## 11. Console Logging Test

Pass criteria:
- Console must not log original draft
- Console must not log generated prompt
- Error logs must not include prompt text

## 12. Permission Test

Pass criteria:
- manifest.json does not contain:
  - <all_urls>
  - https://*/*
  - history
  - cookies
  - tabs unless justified
  - webRequest
  - debugger

## 13. Known Limitations Allowed in v0

Allowed:
- Composer detection may be best effort.
- UI may be visually simple.
- No Claude/Gemini support.
- No server.
- No local LLM.
- No analytics.
- No polished onboarding.
- Korean-first templates only.
- Insertion fallback may require copy button if direct DOM insertion fails.

Not allowed:
- Broken extension load.
- Network call with prompt text.
- Auto-send.
- Prompt text storage.