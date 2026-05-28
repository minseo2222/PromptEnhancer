# Rule Engine and Brief Schemas

## 1. Purpose

The v0 prototype should not rely on LLMs.

It should use:
- keyword/domain detection
- missing slot detection
- fixed question templates
- deterministic prompt compiler

## 2. Domains

Support these initial domains:

- marketing_strategy
- product_planning
- research
- writing_email
- personal_prioritization
- generic

## 3. Slots

Possible missing slots:

- goal
- audience
- context
- output_format
- tone
- timeframe
- constraints
- success_criteria

## 4. shouldShowClarify(draft)

Return false if:
- draft is empty
- draft length < 12
- draft is simple translation
- draft is simple summarization
- draft is simple grammar/spelling correction
- draft is just a greeting
- draft already has clear goal and output format

Return true if:
- draft is broad
- draft asks for strategy, plan, analysis, PRD, email, decision, prioritization
- draft contains vague terms like:
  - 전략
  - 계획
  - 정리
  - 분석
  - 추천
  - 개선
  - 기획
  - PRD
  - 보고
  - 메일
  - 설득
  - 우선순위

## 5. Domain Classifier Rules

### marketing_strategy

Keywords:
- 마케팅
- 캠페인
- 유저 획득
- 전환율
- 리텐션
- 광고
- GTM
- 그로스
- 시장 진입

### product_planning

Keywords:
- PRD
- 기능
- 제품
- 기획
- 요구사항
- 사용자 스토리
- 로드맵
- 스펙

### research

Keywords:
- 조사
- 리서치
- 분석
- 비교
- 경쟁사
- 시장
- 트렌드
- 자료

### writing_email

Keywords:
- 메일
- 이메일
- 답장
- 제안서
- 메시지
- DM
- 연락

### personal_prioritization

Keywords:
- 할 게 많
- 뭐부터
- 우선순위
- 정리 좀
- 혼란
- 계획 세워
- 오늘 할 일

### generic

Fallback.

## 6. Question Templates

### marketing_strategy

Question 1:
slot: goal
label: 목표는 무엇인가요?
options:
- 신규 유저 획득
- 유료 전환율 개선
- 기존 유저 재방문
- 대표/투자자 보고용 정리
- 추천해줘

Question 2:
slot: output_format
label: 원하는 결과물 형식은?
options:
- 실행 체크리스트
- 1페이지 전략 문서
- 광고 캠페인 아이디어
- 시장/경쟁 분석 포함 보고서
- 추천해줘

### product_planning

Question 1:
slot: goal
label: PRD의 목적은 무엇인가요?
options:
- 내부 개발 착수용
- 대표/리더십 보고용
- 고객 문제 정의용
- 실험/검증 계획용
- 추천해줘

Question 2:
slot: output_format
label: 포함할 범위는?
options:
- 문제 정의와 목표
- 사용자 시나리오
- 요구사항과 우선순위
- 성공 지표와 릴리즈 계획
- 추천해줘

### research

Question 1:
slot: goal
label: 리서치의 목적은 무엇인가요?
options:
- 빠른 의사결정
- 시장/경쟁 이해
- 보고서 작성
- 아이디어 발굴
- 추천해줘

Question 2:
slot: output_format
label: 결과물 형식은?
options:
- 핵심 요약
- 비교표
- 상세 보고서
- 실행 인사이트 목록
- 추천해줘

### writing_email

Question 1:
slot: goal
label: 이 메시지의 목적은 무엇인가요?
options:
- 설득
- 요청
- 거절/조율
- 관계 유지
- 추천해줘

Question 2:
slot: tone
label: 원하는 톤은?
options:
- 정중하고 간결하게
- 친근하게
- 단호하지만 부드럽게
- 전문적으로
- 추천해줘

### personal_prioritization

Question 1:
slot: goal
label: 지금 원하는 도움은 무엇에 가까운가요?
options:
- 해야 할 일 우선순위 정리
- 감정/생각 정리
- 오늘 실행할 계획 만들기
- 장기 목표 다시 정리하기
- 추천해줘

Question 2:
slot: output_format
label: 원하는 답변 방식은?
options:
- 부담을 줄이는 짧은 정리
- 중요도/긴급도 표
- 오늘 할 일 3개 추천
- 단계별 실행 계획
- 추천해줘

### generic

Question 1:
slot: goal
label: 원하는 도움은 무엇인가요?
options:
- 아이디어 얻기
- 실행 계획 만들기
- 내용을 정리하기
- 더 나은 의사결정하기
- 추천해줘

Question 2:
slot: output_format
label: 답변 형식은?
options:
- 짧은 요약
- 단계별 설명
- 체크리스트
- 표로 정리
- 추천해줘

## 7. Recommended Defaults for "추천해줘"

If user chooses "추천해줘":

marketing_strategy:
- goal: 신규 유저 획득
- output_format: 1페이지 전략 문서

product_planning:
- goal: 내부 개발 착수용
- output_format: 문제 정의와 목표

research:
- goal: 빠른 의사결정
- output_format: 비교표

writing_email:
- goal: 요청
- tone: 정중하고 간결하게

personal_prioritization:
- goal: 해야 할 일 우선순위 정리
- output_format: 오늘 할 일 3개 추천

generic:
- goal: 내용을 정리하기
- output_format: 단계별 설명

## 8. Brief Compiler Format

Generated prompt should use this structure when relevant:

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

## 9. Domain-specific Expert Roles

marketing_strategy:
너는 B2B SaaS 그로스 전략가다.

product_planning:
너는 시니어 프로덕트 매니저다.

research:
너는 전략 리서처이자 시장 분석가다.

writing_email:
너는 비즈니스 커뮤니케이션 코치다.

personal_prioritization:
너는 생산성 코치이자 우선순위 정리 도우미다.

generic:
너는 사용자의 의도를 명확히 정리해주는 AI 어시스턴트다.

## 10. Output Length

Generated prompt should be:
- Clear
- Structured
- Not excessively long
- Usually 150–350 Korean characters for simple cases
- Up to 700 Korean characters for strategy/research/PRD cases

## 11. Hard Rules

Do not generate:
- Overly verbose prompt
- Fake facts about user's business
- Overly generic "더 자세히 알려주세요"
- More than 2 questions in v0
- Any content that implies automatic sending