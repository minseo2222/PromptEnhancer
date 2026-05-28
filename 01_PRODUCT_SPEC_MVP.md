# MVP Product Spec — Clarify Before Send

## 1. Product Positioning

Clarify Before Send is a local-first Chrome Extension that helps users turn vague AI prompts into clear task briefs before sending them to ChatGPT.

It is not a prompt enhancer.

It is a brief builder.

Core positioning:

> AI에게 보내기 전, 애매한 요청을 명확한 업무 브리프로 바꿔주는 로컬 우선 크롬 익스텐션.

## 2. Primary User

Initial target user:

- Startup founder
- Marketer
- PM / PO
- Consultant
- Knowledge worker using ChatGPT daily

Initial use cases:

- Marketing strategy
- Product planning
- Research request
- Email/writing request
- Prioritization / thought organization

## 3. Primary User Story

As a ChatGPT user,
when I write a vague or broad prompt,
I want the extension to ask 1–2 simple multiple-choice questions,
so that I can send a clearer prompt and get a better answer with fewer follow-up messages.

## 4. Core UX Flow

### Step 1 — User types draft

Example:

"우리 서비스 마케팅 전략 짜줘"

### Step 2 — Extension quietly detects opportunity

The extension should not interrupt typing.

Rules:
- Wait until user stops typing for about 700–1000ms.
- Do not show anything for very short drafts.
- Do not show for simple commands like "번역해줘", "요약해줘", "맞춤법 고쳐줘".
- Show a small inline/floating chip only when clarification may help.

### Step 3 — Show chip

Chip copy:

"Clarify"

Optional helper text:

"목표만 정하면 더 정확해져요"

### Step 4 — User clicks chip

Show popover with 1–2 questions.

Default maximum:
- 2 questions

Hard maximum:
- 3 questions, but do not use 3 in v0.

### Step 5 — User selects answers

Each question should be multiple choice.

Every question should include:
- 4 useful options
- 1 "추천해줘" option

Do not force free text in v0.

### Step 6 — Generate preview

Show final improved prompt preview.

Preview should be readable, not too long.

### Step 7 — Insert or cancel

Buttons:
- 입력창에 넣기
- 취소

After insertion:
- Show Undo

### Step 8 — User sends manually

Never auto-send.

## 5. Key UX Rules

Do:
- Be small.
- Be calm.
- Be reversible.
- Be useful in under 10 seconds.
- Let the user ignore the extension.

Do not:
- Use blocking modals.
- Auto-send.
- Read chat history.
- Show prompt scores.
- Show long analysis.
- Ask more than 2 questions in v0.
- Trigger while the user is actively typing.
- Make the user wait for model loading.

## 6. Initial Domains

Support these domains in v0:

1. marketing_strategy
2. product_planning
3. research
4. writing_email
5. personal_prioritization
6. generic

## 7. Example 1 — Marketing Strategy

User draft:

"우리 서비스 마케팅 전략 짜줘"

Questions:

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

Output preview:

너는 B2B SaaS 그로스 전략가다.

목표:
신규 유저 획득을 위한 마케팅 전략을 제안한다.

산출물 형식:
1페이지 전략 문서로 작성하되, 실행 체크리스트를 포함한다.

답변에 포함할 것:
- 핵심 전략 요약
- 우선순위가 높은 채널
- 실행 방법
- 필요한 리소스
- 성공 지표
- 4주 실행 계획

## 8. Example 2 — Product Planning

User draft:

"새 기능 PRD 써줘"

Questions:

Q1. PRD의 목적은 무엇인가요?
- 내부 개발 착수용
- 대표/리더십 보고용
- 고객 문제 정의용
- 실험/검증 계획용
- 추천해줘

Q2. 포함할 범위는?
- 문제 정의와 목표
- 사용자 시나리오
- 요구사항과 우선순위
- 성공 지표와 릴리즈 계획
- 추천해줘

## 9. Example 3 — Thought Organization

User draft:

"요즘 할 게 너무 많고 뭐부터 해야 할지 모르겠어. 정리 좀 해줘."

Questions:

Q1. 지금 원하는 도움은 무엇에 가까운가요?
- 해야 할 일 우선순위 정리
- 감정/생각 정리
- 오늘 실행할 계획 만들기
- 장기 목표 다시 정리하기
- 추천해줘

Q2. 원하는 답변 방식은?
- 부담을 줄이는 짧은 정리
- 중요도/긴급도 표
- 오늘 할 일 3개 추천
- 단계별 실행 계획
- 추천해줘

## 10. Empty / Unsupported States

If no draft is found:
"입력 중인 프롬프트를 찾지 못했어요."

If draft is too short:
Do not show chip.

If draft seems simple:
Do not show chip.

If insertion fails:
"입력창에 자동 삽입하지 못했어요. 아래 프롬프트를 복사해 사용하세요."

Show copy button.