# Privacy and Security Requirements

## 1. Core Privacy Promise

Default mode:

> No prompt leaves the browser.

The prototype must be local-only.

## 2. Data the Extension May Read

Allowed:
- Current draft text inside the ChatGPT composer
- Only when needed for the clarify flow
- Only on supported ChatGPT pages

Not allowed:
- Full chat history
- Sidebar conversation list
- User profile data
- Cookies
- Browser history
- Other websites
- Uploaded files
- Previous prompts
- Generated ChatGPT responses

## 3. Data the Extension May Store

Allowed in chrome.storage.local:
- User settings
- Whether extension is enabled
- UI preferences
- Dismiss count
- Local-only badge setting

Not allowed:
- Original prompt text
- Generated prompt text
- Chat history
- Page text
- User messages
- AI responses
- Sensitive information

## 4. Network Policy

v0 must not send prompt text anywhere.

Do not implement:
- Analytics
- Cloud AI
- Error logging with prompt content
- Remote config
- Tracking pixels
- External scripts

Do not call:
- OpenAI API
- Claude API
- Gemini API
- Any backend API
- Any third-party analytics API

## 5. Permission Policy

Use least privilege.

Required:
- storage
- host permissions for ChatGPT only

Forbidden:
- <all_urls>
- https://*/*
- history
- cookies
- tabs unless absolutely necessary
- webRequest
- debugger

## 6. User-facing Privacy Copy

Popup must include:

Local Only Mode

- 현재 입력 중인 문장만 분석합니다.
- 프롬프트 본문은 서버로 보내지 않습니다.
- 채팅 히스토리를 읽지 않습니다.
- 프롬프트 본문을 저장하지 않습니다.
- 최종 전송은 사용자가 직접 합니다.

## 7. Future Server AI Policy

Do not implement server AI in v0.

If implemented later:
- Must be explicit opt-in.
- Must show a warning.
- Must preview what will be sent.
- Must allow cancellation.
- Must not be automatic fallback.
- Must have sensitive-info warning.

## 8. Security-sensitive Implementation Rules

Do not use eval.
Do not use new Function.
Do not inject remote scripts.
Do not use innerHTML with untrusted user content unless escaped.
Prefer textContent for user-provided text.
Do not log prompt text to console.
Do not persist prompt text in storage.

## 9. Console Logging Policy

Allowed:
- Lifecycle logs without prompt text
- Error type only

Forbidden:
- console.log(draft)
- console.log(generatedPrompt)
- console.log(pageText)

## 10. Prototype Privacy Success Criteria

The prototype passes privacy requirements if:

- It works with no backend.
- It makes no network calls for prompt processing.
- It does not store prompt text.
- It only requests ChatGPT host permissions.
- It can be inspected easily because it uses plain JS/CSS/HTML.