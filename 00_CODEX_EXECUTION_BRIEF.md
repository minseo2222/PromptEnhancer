# Clarify Before Send — Codex Execution Brief

## 1. Project Summary

Build the first working prototype of a Chrome Extension called **Clarify Before Send**.

This extension runs on ChatGPT web pages and helps users clarify vague prompts before sending them.

The product is NOT a generic prompt enhancer.

It is an **AI Intent Clarifier / Brief Builder**.

Core flow:

1. User opens ChatGPT.
2. User types a vague or broad prompt in the composer.
3. Extension detects whether clarification may help.
4. Extension shows a small non-intrusive "Clarify" chip near the input area.
5. When the user clicks the chip, the extension asks 1–2 multiple-choice questions.
6. User selects options.
7. Extension generates a clearer final prompt / brief.
8. User can insert the improved prompt into the ChatGPT input.
9. User can undo.
10. The extension never auto-sends the prompt.

## 2. Prototype Goal

Build a working local-only Chrome Extension prototype that can be loaded via:

chrome://extensions → Developer mode → Load unpacked

The prototype must work on:

- https://chatgpt.com/*
- https://chat.openai.com/*

The prototype should not require a backend, API key, local LLM, cloud LLM, bundler, database, account system, or payment system.

## 3. Core Product Principle

The first prototype must prove one thing:

> A short choice-based clarification flow can turn a vague AI request into a clearer task brief without annoying the user.

## 4. Important Scope Constraint

Do NOT build a full SaaS product.

Do NOT build:
- Login
- Payment
- Team workspace
- Prompt library marketplace
- Server API
- Cloud AI integration
- Chat history analysis
- Claude support
- Gemini support
- Side panel
- Long onboarding
- Prompt scoring
- Analytics dashboard
- Background scraping

## 5. Required MVP Feature

Feature name:

Clarify Before Send

Required user flow:

Input:
"우리 서비스 마케팅 전략 짜줘"

Show chip:
"Clarify"

On click, show questions:

Q1. 목표는 무엇인가요?
- 신규 유저 획득
- 유료 전환율 개선
- 기존 유저 재방문
- 대표/투자자 보고용 정리
- 추천해줘

Q2. 원하는 결과물 형식은?
- 실행 체크리스트
- 1페이지 전략 문서
- 광고 캠페인 아이디어
- 시장/경쟁 분석 포함 보고서
- 추천해줘

Then generate preview:

"너는 B2B SaaS 그로스 전략가다..."

Buttons:
- 입력창에 넣기
- 취소
- Undo after insertion

## 6. Technical Philosophy

This prototype should be local-first, but not dependent on local AI.

Use this priority:

1. Rule-based detection
2. Template-based question generation
3. Template-based prompt compiler
4. Optional local AI adapter stub only, not required in the first working flow

Do not use Chrome Prompt API in the main path yet.
Do not use WebLLM.
Do not use OpenAI API.
Do not send prompt text to any server.

## 7. Recommended Implementation Style

Use plain JavaScript, HTML, and CSS.

Avoid React, Vite, Next.js, bundlers, build steps, and external dependencies for v0.

Reason:
The prototype should be easy to inspect, load, and test as an unpacked Chrome extension.

## 8. Expected Deliverable

Create a repository with this structure:

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
      ruleEngine.js
      briefCompiler.js
      templates.js
      storage.js
      localAiAdapter.stub.js
  docs/
    PRIVACY.md
    TEST_PLAN.md

## 9. Done Means

The prototype is done when:

- It loads as an unpacked Chrome extension.
- It injects a Clarify chip on ChatGPT pages.
- It detects draft text from the ChatGPT composer.
- It shows 1–2 multiple-choice questions for vague prompts.
- It generates a clearer final prompt.
- It can insert the generated prompt back into the composer.
- It supports undo.
- It stores no prompt text.
- It makes no network request for prompt processing.
- It has a popup explaining Local Only mode.