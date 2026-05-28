# Privacy

Clarify Before Send v0는 local-only Chrome Extension입니다.

- 서버가 없습니다.
- backend API를 호출하지 않습니다.
- prompt text를 저장하지 않습니다.
- generated prompt를 저장하지 않습니다.
- context_line에 입력한 한 줄 맥락도 저장하거나 전송하지 않습니다.
- ChatGPT, Claude, Gemini chat history를 읽지 않습니다.
- 자동 전송하지 않습니다.
- host permission은 `https://chatgpt.com/*`, `https://chat.openai.com/*`, `https://claude.ai/*`, `https://gemini.google.com/*`만 사용합니다.
- `chrome.storage.local`에는 `enabled`, `showLocalBadge` 같은 설정만 저장합니다.

v0의 main flow는 rule engine과 template compiler만 사용합니다.
