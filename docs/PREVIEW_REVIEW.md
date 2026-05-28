# Preview Review Pack v1

이 문서는 Prompt Quality Harness fixture를 기반으로 각 draft의 질문, 기본 선택값, compiled prompt를 사람이 눈으로 검토하기 위한 문서입니다. 런타임 기능이 아니며 prompt text를 저장하는 제품 기능도 아닙니다.

- Source fixture: `tests/fixtures/promptCases.cjs`
- Generator: `tests/generatePreviewReview.cjs`
- Output: `docs/PREVIEW_REVIEW.md`

## Summary

- total cases: 65
- core cases: 65
- candidate cases: 0
- clarify true count: 53
- clarify false count: 12
- generic domain count: 45
- context line count: 17
- average questions per clarify case: 1.60
- prompts over 1200 chars count: 0
- prompts over 1600 chars count: 0

### TaskType Distribution

- `brief.analyze`: 5
- `brief.create`: 5
- `brief.decide`: 4
- `brief.extract`: 4
- `brief.generic`: 5
- `brief.plan`: 17
- `brief.research`: 2
- `brief.write`: 23

### Domain Distribution

- `generic`: 45
- `marketing_strategy`: 4
- `personal_prioritization`: 3
- `product_planning`: 1
- `research`: 3
- `writing_email`: 9

### Domain Pack Distribution

- `content_education`: 6
- `context_candidate`: 15
- `context_line_backlog`: 2
- `customer_support`: 8
- `founder_strategy`: 3
- `generic`: 13
- `gtm_marketing`: 4
- `hr_recruiting`: 1
- `internal_ops`: 6
- `product_pm`: 1
- `sales_bd`: 6

### Clarification Mode Distribution

- `context_line`: 17
- `multiple_choice`: 36
- `suppress`: 12

### Case Source Distribution

- `core`: 65

### ArtifactType Distribution

- `blog_outline`: 1
- `churn_save_reply`: 2
- `cold_email`: 1
- `complaint_reply`: 2
- `content_plan`: 1
- `curriculum`: 1
- `customer_success_checkin`: 2
- `demo_agenda`: 1
- `follow_up_email`: 1
- `handoff_doc`: 1
- `job_posting`: 1
- `manual_or_playbook`: 1
- `meeting_agenda`: 1
- `negotiation_reply`: 1
- `none`: 27
- `objections_analysis`: 1
- `onboarding_doc`: 2
- `outage_notice`: 2
- `presentation_outline`: 1
- `proposal_outline`: 3
- `question_set`: 1
- `refund_policy_manual`: 1
- `refund_reply`: 2
- `retrospective_questions`: 1
- `sales_collateral`: 1
- `sales_script`: 1
- `support_faq`: 2
- `survey_questions`: 1
- `vip_complaint_reply`: 2

## Assumed Answer Rule

- If a fixture case has `sampleAnswers`, those values are used first.
- If a fixture case has `sampleContextLine`, that value is used for `context_line` preview compilation.
- Otherwise, the first concrete option that is not `추천해줘` is selected after intent-aware option ranking.
- The assumed answers are used only to generate this offline review artifact.

## Case 1. marketing strategy plan
Draft:
```text
우리 서비스 마케팅 전략 짜줘
```
Expected:
- caseSource: `core`
- domainPack: `gtm_marketing`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `marketing_strategy`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `marketing_strategy`
- domainConfidence: `0.92`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- output_format
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- goal
- output_format
Questions:
### Q1. 마케팅 전략의 목표는?

- 신규 유저 획득
- 유료 전환율 개선
- 기존 유저 재방문
- 보고용 전략 정리
- 추천해줘

### Q2. 원하는 결과물 형식은?

- 1페이지 전략 문서
- 4주 실행 계획
- 실행 체크리스트
- 캠페인 아이디어
- 추천해줘
Assumed Answers:
- goal: 신규 유저 획득
- output_format: 1페이지 전략 문서
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
실행 가능한 계획을 설계한다. 원문 요청 "우리 서비스 마케팅 전략 짜줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "신규 유저 획득"이다.

# 목표
신규 유저 획득

# 맥락
사용자의 원문 요청:
"우리 서비스 마케팅 전략 짜줘"

확정된 정보:
- 목표: 신규 유저 획득
- 출력 형식: 1페이지 전략 문서

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.
- 1페이지 안에 정리한다.

# 출력 형식
선택된 출력 형식: 1페이지 전략 문서
- 핵심 방향을 먼저 요약한다.
- 우선순위가 높은 실행 항목을 단계별로 제시한다.
- 필요한 리소스, 리스크, 성공 지표, 다음 액션을 포함한다.
- 마케팅/그로스 맥락을 반영한다.
- 실행 채널, 성공 지표, 리스크를 함께 다룬다.

# 좋은 답변의 기준
- 바로 실행할 수 있을 만큼 구체적이다.
- 우선순위와 순서가 분명하다.
- 모르는 정보는 가정으로 분리한다.

# 관점
마케팅/그로스 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 2. launch plan
Draft:
```text
다음 달 런칭 계획 세워줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- timeframe: 다음 달
- scope: 4주 실행 계획
- goal: 런칭 계획 수립
Missing Slots:
- output_format
- audience
- success_criteria
- constraints
Suggested Slots:
- launch_subject
- launch_plan_focus
Questions:
### Q1. 무엇을 런칭하나요?

- 제품/기능
- 마케팅 캠페인
- 이벤트/프로그램
- 내부 프로젝트
- 추천해줘

### Q2. 런칭 계획에서 가장 중요한 기준은?

- 일정과 마일스톤
- 채널/홍보 전략
- 준비 체크리스트
- 성공 지표
- 추천해줘
Assumed Answers:
- launch_subject: 제품/기능
- launch_plan_focus: 일정과 마일스톤
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
실행 가능한 계획을 설계한다. 원문 요청 "다음 달 런칭 계획 세워줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "런칭 계획 수립"이다.

# 목표
런칭 계획 수립

# 맥락
사용자의 원문 요청:
"다음 달 런칭 계획 세워줘"

확정된 정보:
- 목표: 런칭 계획 수립
- 범위: 4주 실행 계획
- 기간: 다음 달
- 런칭 대상: 제품/기능
- 런칭 기준: 일정과 마일스톤

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.
- 다음 달 실행을 전제로 한다.

# 출력 형식
선택된 출력 형식: 4주 실행 계획
런칭 기준: 일정과 마일스톤
- 런칭 대상, 일정과 마일스톤, 준비 체크리스트, 성공 지표를 구분한다.
- 다음 달 실행을 전제로 우선순위와 리스크를 제시한다.
- 원문 의도를 작업 단위로 명확히 정리한다.
- 목표, 대상, 출력 형식, 제약을 중심으로 답한다.

# 좋은 답변의 기준
- 바로 실행할 수 있을 만큼 구체적이다.
- 우선순위와 순서가 분명하다.
- 모르는 정보는 가정으로 분리한다.

# 관점
의도 명확화 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 3. new feature prd
Draft:
```text
새 기능 PRD 써줘
```
Expected:
- caseSource: `core`
- domainPack: `product_pm`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `product_planning`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `product_planning`
- domainConfidence: `0.95`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- goal: PRD 작성
Missing Slots:
- output_format
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- feature_problem
- prd_scope
Questions:
### Q1. 어떤 기능/문제를 다루나요?

- 새 기능 아이디어 구체화
- 고객 문제 정의
- 기존 기능 개선
- 실험/검증용 기능
- 추천해줘

### Q2. PRD에 꼭 포함할 범위는?

- 문제 정의와 목표
- 사용자 시나리오
- 요구사항과 우선순위
- 성공 지표와 릴리즈 계획
- 추천해줘
Assumed Answers:
- feature_problem: 새 기능 아이디어 구체화
- prd_scope: 성공 지표와 릴리즈 계획
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
실행 가능한 계획을 설계한다. 원문 요청 "새 기능 PRD 써줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "PRD 작성"이다.

# 목표
PRD 작성

# 맥락
사용자의 원문 요청:
"새 기능 PRD 써줘"

확정된 정보:
- 목표: PRD 작성
- 기능/문제: 새 기능 아이디어 구체화
- PRD 범위: 성공 지표와 릴리즈 계획

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.

# 출력 형식
선택된 출력 형식: PRD 초안
PRD 범위: 성공 지표와 릴리즈 계획
- 문제 정의와 목표, 사용자 시나리오, 요구사항과 우선순위를 구분한다.
- 성공 지표와 릴리즈 전 확인할 리스크를 포함한다.
- PRD 관점에서 문제, 요구사항, 사용자 시나리오를 반영한다.
- 성공 지표와 우선순위를 포함한다.

# 좋은 답변의 기준
- 바로 실행할 수 있을 만큼 구체적이다.
- 우선순위와 순서가 분명하다.
- 모르는 정보는 가정으로 분리한다.

# 관점
시니어 PM 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 4. competitor analysis
Draft:
```text
경쟁사 분석해줘
```
Expected:
- caseSource: `core`
- domainPack: `founder_strategy`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.analyze`
- expectedDomain: `research`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.analyze`
- domain: `research`
- domainConfidence: `0.92`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- goal: 경쟁 구도 파악
- analysis_target: 경쟁 구도
Missing Slots:
- criteria
- output_format
- depth
- assumptions_policy
Suggested Slots:
- competitor_scope
- comparison_dimensions
Questions:
### Q1. 분석할 범위는?

- 같은 카테고리의 주요 서비스
- 특정 경쟁사 2~3곳
- 가격/기능 비교
- 포지셔닝/마케팅 비교
- 추천해줘

### Q2. 가장 중요한 분석 기준은?

- 기능/제품
- 가격/수익모델
- 타깃 고객/포지셔닝
- 마케팅/채널
- 추천해줘
Assumed Answers:
- competitor_scope: 같은 카테고리의 주요 서비스
- comparison_dimensions: 기능/제품
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
대상을 비교, 진단, 분석한다. 원문 요청 "경쟁사 분석해줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "경쟁 구도 파악"이다.

# 목표
경쟁 구도 파악

# 맥락
사용자의 원문 요청:
"경쟁사 분석해줘"

확정된 정보:
- 목표: 경쟁 구도 파악
- 분석 대상: 경쟁 구도
- 경쟁사 분석 범위: 같은 카테고리의 주요 서비스
- 분석 기준: 기능/제품

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.

# 출력 형식
선택된 출력 형식: 경쟁사 분석표와 핵심 인사이트
- 분석 범위와 기준을 먼저 제시한다.
- 경쟁사별 강점, 약점, 차별점, 확인 필요 항목을 비교한다.
- 조사 목적과 분석 기준을 먼저 명확히 한다.
- 근거, 비교 기준, 확인 필요 항목을 구분한다.

# 좋은 답변의 기준
- 비교 기준이 명확하다.
- 결론과 근거가 구분된다.
- 의사결정에 쓸 수 있는 시사점이 있다.

# 관점
전략 리서처 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 5. conversion rate diagnosis
Draft:
```text
우리 전환율이 왜 낮은지 분석해줘
```
Expected:
- caseSource: `core`
- domainPack: `gtm_marketing`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.analyze`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.analyze`
- domain: `marketing_strategy`
- domainConfidence: `0.89`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- goal: 문제 원인 진단
- analysis_target: 문제 원인
Missing Slots:
- criteria
- output_format
- depth
- assumptions_policy
Suggested Slots:
- funnel_stage
- diagnosis_method
Questions:
### Q1. 어느 전환 단계가 문제인가요?

- 방문 → 가입
- 가입 → 활성화
- 무료 → 유료
- 결제 → 재구매/유지
- 추천해줘

### Q2. 어떤 방식으로 진단할까요?

- 원인 가설 트리
- 퍼널별 체크리스트
- 실험 아이디어
- 데이터 확인 항목
- 추천해줘
Assumed Answers:
- funnel_stage: 방문 → 가입
- diagnosis_method: 원인 가설 트리
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
대상을 비교, 진단, 분석한다. 원문 요청 "우리 전환율이 왜 낮은지 분석해줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "문제 원인 진단"이다.

# 목표
문제 원인 진단

# 맥락
사용자의 원문 요청:
"우리 전환율이 왜 낮은지 분석해줘"

확정된 정보:
- 목표: 문제 원인 진단
- 분석 대상: 문제 원인
- 전환 단계: 방문 → 가입
- 진단 방식: 원인 가설 트리

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.

# 출력 형식
선택된 출력 형식: 원인 가설 트리와 데이터 확인 항목
진단 방식: 원인 가설 트리
- 원인 가설 트리 방식으로 진단한다.
- 원인, 근거, 데이터 확인 항목, 다음 실험을 구분한다.
- 마케팅/그로스 맥락을 반영한다.
- 실행 채널, 성공 지표, 리스크를 함께 다룬다.

# 좋은 답변의 기준
- 비교 기준이 명확하다.
- 결론과 근거가 구분된다.
- 의사결정에 쓸 수 있는 시사점이 있다.

# 관점
마케팅/그로스 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 6. option pros cons comparison
Draft:
```text
A안 B안 장단점 비교해줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `brief.analyze`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.analyze`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- goal: 장단점 비교
- analysis_target: 장단점
- decision_options: A와 B 비교
Missing Slots:
- criteria
- output_format
- depth
- assumptions_policy
Suggested Slots:
- option_details
- decision_criteria
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 7. investor update email
Draft:
```text
투자자에게 업데이트 메일 써줘
```
Expected:
- caseSource: `core`
- domainPack: `sales_bd`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `writing_email`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.92`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- audience: 투자자
- output_format: 메일 초안
- goal: 안내/공유
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- tone
Questions:
### Q1. 원하는 톤은?

- 정중하고 간결하게
- 친근하게
- 단호하지만 부드럽게
- 전문적으로
- 추천해줘
Assumed Answers:
- tone: 정중하고 간결하게
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
목적과 독자에 맞는 글을 작성한다. 원문 요청 "투자자에게 업데이트 메일 써줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "안내/공유"이다.

# 확인된 정보
- 원문 요청: "투자자에게 업데이트 메일 써줘"
- 목표: 안내/공유
- 대상: 투자자
- 출력 형식: 메일 초안
- 톤: 정중하고 간결하게

# 출력 형식
선택된 출력 형식: 메일 초안
톤: 정중하고 간결하게
- 제목 또는 첫 문장을 제안한다.
- 본문 초안을 바로 사용할 수 있게 작성한다.
- 필요하면 대체 문구를 짧게 제시한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 투자자가 궁금해할 성과, 리스크, 다음 계획을 포함한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 8. customer price increase email
Draft:
```text
고객에게 가격 인상 안내 메일 써줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- audience: 고객
- output_format: 메일 초안
- goal: 안내/공유
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- tone
Questions:
### Q1. 원하는 톤은?

- 정중하고 간결하게
- 친근하게
- 단호하지만 부드럽게
- 전문적으로
- 추천해줘
Assumed Answers:
- tone: 정중하고 간결하게
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
목적과 독자에 맞는 글을 작성한다. 원문 요청 "고객에게 가격 인상 안내 메일 써줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "안내/공유"이다.

# 확인된 정보
- 원문 요청: "고객에게 가격 인상 안내 메일 써줘"
- 목표: 안내/공유
- 대상: 고객
- 출력 형식: 메일 초안
- 톤: 정중하고 간결하게

# 출력 형식
선택된 출력 형식: 메일 초안
톤: 정중하고 간결하게
- 제목 또는 첫 문장을 제안한다.
- 본문 초안을 바로 사용할 수 있게 작성한다.
- 필요하면 대체 문구를 짧게 제시한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 가격 인상에 대한 고객 반응과 신뢰 훼손 리스크를 고려한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 9. ai productivity market research
Draft:
```text
AI 생산성 툴 시장 조사해줘
```
Expected:
- caseSource: `core`
- domainPack: `founder_strategy`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.research`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.research`
- domain: `research`
- domainConfidence: `0.92`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- output_format
- source_preference
- analysis_target
- depth
- assumptions_policy
Suggested Slots:
- market_scope
- source_preference
Questions:
### Q1. 시장 조사의 범위는?

- 글로벌 시장
- 국내 시장
- 주요 고객 세그먼트
- 경쟁 제품/카테고리
- 추천해줘

### Q2. 어떤 자료 기준이 좋나요?

- 검증된 근거 중심
- 최근 트렌드 중심
- 경쟁 제품 비교 중심
- 실무 인사이트 중심
- 추천해줘
Assumed Answers:
- market_scope: 글로벌 시장
- source_preference: 검증된 근거 중심
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
필요한 정보를 조사하고 구조화한다. 원문 요청 "AI 생산성 툴 시장 조사해줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "시장/경쟁 이해"이다.

# 목표
시장/경쟁 이해

# 맥락
사용자의 원문 요청:
"AI 생산성 툴 시장 조사해줘"

확정된 정보:
- 목표: 시장/경쟁 이해
- 시장 범위: 글로벌 시장
- 자료 기준: 검증된 근거 중심

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.

# 출력 형식
선택된 출력 형식: 시장 조사 요약과 근거
- 시장 범위, 주요 세그먼트, 경쟁 구도, 확인 필요 자료를 구분한다.
- 근거가 부족한 내용은 가정으로 표시한다.
- 조사 목적과 분석 기준을 먼저 명확히 한다.
- 근거, 비교 기준, 확인 필요 항목을 구분한다.

# 좋은 답변의 기준
- 자료와 추론을 구분한다.
- 시장, 트렌드, 근거가 구조적으로 정리된다.
- 다음 조사 방향이 명확하다.

# 관점
전략 리서처 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 10. chrome extension trend research
Draft:
```text
최근 크롬 익스텐션 트렌드 조사해줘
```
Expected:
- caseSource: `core`
- domainPack: `founder_strategy`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.research`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.research`
- domain: `research`
- domainConfidence: `0.92`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- timeframe: 최근
Missing Slots:
- goal
- output_format
- source_preference
- analysis_target
- depth
- assumptions_policy
Suggested Slots:
- research_timeframe
- source_preference
Questions:
### Q1. 어느 기간의 트렌드를 볼까요?

- 최근 3개월
- 최근 6개월
- 최근 1년
- 최근 출시/랭킹 중심
- 추천해줘

### Q2. 어떤 자료 기준이 좋나요?

- 공식 스토어/제품 자료
- 제품 출시/리뷰 사이트
- 업계 리포트/기사
- 사용자 리뷰/커뮤니티
- 추천해줘
Assumed Answers:
- research_timeframe: 최근 3개월
- source_preference: 공식 스토어/제품 자료
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
필요한 정보를 조사하고 구조화한다. 원문 요청 "최근 크롬 익스텐션 트렌드 조사해줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "시장/경쟁 이해"이다.

# 목표
시장/경쟁 이해

# 맥락
사용자의 원문 요청:
"최근 크롬 익스텐션 트렌드 조사해줘"

확정된 정보:
- 목표: 시장/경쟁 이해
- 기간: 최근
- 조사 기간: 최근 3개월
- 자료 기준: 공식 스토어/제품 자료

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.
- 최근 자료와 트렌드임을 우선 고려한다.

# 출력 형식
선택된 출력 형식: 트렌드 요약과 확인 필요 자료
- 조사 기간과 자료 기준을 먼저 제시한다.
- 최신성 확인이 필요한 내용은 확인 필요로 분리한다.
- 조사 목적과 분석 기준을 먼저 명확히 한다.
- 근거, 비교 기준, 확인 필요 항목을 구분한다.

# 좋은 답변의 기준
- 자료와 추론을 구분한다.
- 시장, 트렌드, 근거가 구조적으로 정리된다.
- 다음 조사 방향이 명확하다.

# 관점
전략 리서처 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 11. personal prioritization
Draft:
```text
뭐부터 해야 할지 모르겠어. 정리 좀 해줘.
```
Expected:
- caseSource: `core`
- domainPack: `internal_ops`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.decide`
- expectedDomain: `personal_prioritization`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.decide`
- domain: `personal_prioritization`
- domainConfidence: `0.95`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- decision_criteria
- criteria
- timeframe
- output_format
Suggested Slots:
- goal
- decision_criteria
Questions:
### Q1. 지금 필요한 것은?

- 우선순위 정리
- 선택지 비교
- 리스크 판단
- 오늘 할 일 결정
- 추천해줘

### Q2. 판단 기준은?

- 효과
- 속도
- 비용/리소스
- 리스크
- 추천해줘
Assumed Answers:
- goal: 우선순위 정리
- decision_criteria: 속도
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
선택지와 우선순위를 판단한다. 원문 요청 "뭐부터 해야 할지 모르겠어. 정리 좀 해줘."를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "우선순위 정리"이다.

# 목표
우선순위 정리

# 맥락
사용자의 원문 요청:
"뭐부터 해야 할지 모르겠어. 정리 좀 해줘."

확정된 정보:
- 목표: 우선순위 정리
- 판단 기준: 속도

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.

# 출력 형식
선택된 출력 형식: 우선순위와 다음 액션
판단 기준: 속도
- 판단 기준을 먼저 정리한다.
- 선택지 또는 할 일을 우선순위로 나눈다.
- 오늘 할 다음 액션을 제안한다.
- 우선순위와 다음 행동을 짧게 제시한다.
- 효과, 속도, 리스크를 판단 기준으로 삼는다.

# 좋은 답변의 기준
- 효과, 속도, 리소스, 리스크가 고려된다.
- 무엇을 먼저 할지 분명하다.
- 결정하지 못한 항목은 확인 필요로 분리된다.

# 관점
생산성 코치 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 12. weekly priority
Draft:
```text
이번 주 우선순위 정해줘
```
Expected:
- caseSource: `core`
- domainPack: `internal_ops`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.decide`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.decide`
- domain: `personal_prioritization`
- domainConfidence: `0.95`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- timeframe: 이번 주
Missing Slots:
- goal
- decision_criteria
- criteria
- output_format
Suggested Slots:
- goal
- decision_criteria
Questions:
### Q1. 지금 필요한 것은?

- 우선순위 정리
- 선택지 비교
- 리스크 판단
- 오늘 할 일 결정
- 추천해줘

### Q2. 판단 기준은?

- 효과
- 속도
- 비용/리소스
- 리스크
- 추천해줘
Assumed Answers:
- goal: 우선순위 정리
- decision_criteria: 효과
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
선택지와 우선순위를 판단한다. 원문 요청 "이번 주 우선순위 정해줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "우선순위 정리"이다.

# 목표
우선순위 정리

# 맥락
사용자의 원문 요청:
"이번 주 우선순위 정해줘"

확정된 정보:
- 목표: 우선순위 정리
- 기간: 이번 주
- 판단 기준: 효과

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.
- 이번 주 실행을 전제로 한다.

# 출력 형식
선택된 출력 형식: 우선순위와 다음 액션
판단 기준: 효과
- 판단 기준을 먼저 정리한다.
- 선택지 또는 할 일을 우선순위로 나눈다.
- 오늘 할 다음 액션을 제안한다.
- 우선순위와 다음 행동을 짧게 제시한다.
- 효과, 속도, 리스크를 판단 기준으로 삼는다.

# 좋은 답변의 기준
- 효과, 속도, 리소스, 리스크가 고려된다.
- 무엇을 먼저 할지 분명하다.
- 결정하지 못한 항목은 확인 필요로 분리된다.

# 관점
생산성 코치 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 13. choose between a and b
Draft:
```text
A랑 B 중 뭐가 나을까?
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `brief.decide`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.decide`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- goal: 선택지 비교
- decision_options: A와 B 비교
Missing Slots:
- decision_criteria
- criteria
- timeframe
- output_format
Suggested Slots:
- option_details
- decision_criteria
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 14. campaign ideas
Draft:
```text
캠페인 아이디어 10개 줘
```
Expected:
- caseSource: `core`
- domainPack: `gtm_marketing`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.create`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.create`
- domain: `marketing_strategy`
- domainConfidence: `0.89`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- quantity: 10개
- goal: 캠페인 아이디어
Missing Slots:
- output_format
- style
- audience
- success_criteria
Suggested Slots:
- campaign_audience
- campaign_objective
Questions:
### Q1. 캠페인의 대상은?

- 신규 고객
- 기존 고객
- 잠재 리드
- 커뮤니티/팔로워
- 추천해줘

### Q2. 캠페인의 목적은?

- 인지도 높이기
- 가입/참여 유도
- 구매/전환 유도
- 재방문/리텐션
- 추천해줘
Assumed Answers:
- campaign_audience: 신규 고객
- campaign_objective: 인지도 높이기
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
목표에 맞는 아이디어를 만든다. 원문 요청 "캠페인 아이디어 10개 줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "캠페인 아이디어"이다.

# 확인된 정보
- 원문 요청: "캠페인 아이디어 10개 줘"
- 목표: 캠페인 아이디어
- 분량: 10개
- 캠페인 대상: 신규 고객
- 캠페인 목적: 인지도 높이기

# 출력 형식
선택된 출력 형식: 후보 목록과 추천안
분량: 10개
- 아이디어를 요청된 개수만큼 제시한다.
- 대상, 목적, 실행 방식, 기대 효과를 짧게 붙인다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 10개를 지킨다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 15. service name ideas
Draft:
```text
서비스 이름 아이디어 줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.create`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.create`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- goal: 이름/슬로건
Missing Slots:
- output_format
- quantity
- style
- audience
- success_criteria
Suggested Slots:
- naming_context
- naming_style
Questions:
### Q1. 어떤 서비스 이름인가요?

- 소비자 앱
- B2B SaaS
- 커뮤니티/콘텐츠
- 내부 도구/프로젝트
- 추천해줘

### Q2. 원하는 네이밍 스타일은?

- 짧고 기억하기 쉽게
- 전문적이고 신뢰감 있게
- 친근하고 캐주얼하게
- 글로벌/영문 느낌으로
- 추천해줘
Assumed Answers:
- naming_context: 소비자 앱
- naming_style: 짧고 기억하기 쉽게
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
목표에 맞는 아이디어를 만든다. 원문 요청 "서비스 이름 아이디어 줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "이름/슬로건"이다.

# 확인된 정보
- 원문 요청: "서비스 이름 아이디어 줘"
- 목표: 이름/슬로건
- 서비스 유형: 소비자 앱
- 네이밍 스타일: 짧고 기억하기 쉽게

# 출력 형식
선택된 출력 형식: 후보 목록과 추천안
- 이름 후보와 짧은 의도를 함께 제시한다.
- 네이밍 스타일과 서비스 유형을 우선 반영한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 16. summarize key points
Draft:
```text
이 내용 핵심만 요약해줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `brief.extract`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.extract`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- input_source: 아래 내용
Missing Slots:
- output_format
- depth
- preserve
- goal
Suggested Slots:
- output_format
- depth
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 17. organize as table
Draft:
```text
아래 내용을 표로 정리해줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `brief.extract`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.extract`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- output_format: 표로 정리
- input_source: 아래 내용
Missing Slots:
- depth
- preserve
- goal
Suggested Slots:
- depth
- preserve
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 18. hello
Draft:
```text
안녕
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `not specified`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.generic`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- output_format
- audience
- scope
- constraints
Suggested Slots:
- goal
- output_format
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 19. translate sentence
Draft:
```text
이 문장 번역해줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `not specified`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.generic`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- output_format
- audience
- scope
- constraints
Suggested Slots:
- goal
- output_format
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 20. fix spelling
Draft:
```text
맞춤법 고쳐줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `not specified`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.generic`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- output_format
- audience
- scope
- constraints
Suggested Slots:
- goal
- output_format
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 21. short summary
Draft:
```text
짧게 요약해줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `not specified`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.extract`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- output_format
- input_source
- depth
- preserve
- goal
Suggested Slots:
- output_format
- input_source
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 22. organize means decide
Draft:
```text
뭐부터 해야 할지 모르겠어. 정리 좀 해줘.
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.decide`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.decide`
- domain: `personal_prioritization`
- domainConfidence: `0.95`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- decision_criteria
- criteria
- timeframe
- output_format
Suggested Slots:
- goal
- decision_criteria
Questions:
### Q1. 지금 필요한 것은?

- 우선순위 정리
- 선택지 비교
- 리스크 판단
- 오늘 할 일 결정
- 추천해줘

### Q2. 판단 기준은?

- 효과
- 속도
- 비용/리소스
- 리스크
- 추천해줘
Assumed Answers:
- goal: 우선순위 정리
- decision_criteria: 효과
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
선택지와 우선순위를 판단한다. 원문 요청 "뭐부터 해야 할지 모르겠어. 정리 좀 해줘."를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "우선순위 정리"이다.

# 목표
우선순위 정리

# 맥락
사용자의 원문 요청:
"뭐부터 해야 할지 모르겠어. 정리 좀 해줘."

확정된 정보:
- 목표: 우선순위 정리
- 판단 기준: 효과

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.

# 출력 형식
선택된 출력 형식: 우선순위와 다음 액션
판단 기준: 효과
- 판단 기준을 먼저 정리한다.
- 선택지 또는 할 일을 우선순위로 나눈다.
- 오늘 할 다음 액션을 제안한다.
- 우선순위와 다음 행동을 짧게 제시한다.
- 효과, 속도, 리스크를 판단 기준으로 삼는다.

# 좋은 답변의 기준
- 효과, 속도, 리소스, 리스크가 고려된다.
- 무엇을 먼저 할지 분명하다.
- 결정하지 못한 항목은 확인 필요로 분리된다.

# 관점
생산성 코치 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 23. organize means extract
Draft:
```text
이 내용 핵심만 요약해서 정리해줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `brief.extract`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.extract`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- input_source: 아래 내용
Missing Slots:
- output_format
- depth
- preserve
- goal
Suggested Slots:
- output_format
- depth
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 24. organize means plan
Draft:
```text
마케팅 전략을 1페이지로 정리해줘
```
Expected:
- caseSource: `core`
- domainPack: `gtm_marketing`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `marketing_strategy`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `marketing_strategy`
- domainConfidence: `0.92`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- quantity: 1페이지
- output_format: 1페이지 전략 문서
Missing Slots:
- goal
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- goal
Questions:
### Q1. 마케팅 전략의 목표는?

- 보고용 전략 정리
- 신규 유저 획득
- 유료 전환율 개선
- 기존 유저 재방문
- 추천해줘
Assumed Answers:
- goal: 보고용 전략 정리
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
실행 가능한 계획을 설계한다. 원문 요청 "마케팅 전략을 1페이지로 정리해줘"를 바로 수행 가능한 작업 brief로 정리한다. 목표는 "보고용 전략 정리"이다.

# 목표
보고용 전략 정리

# 맥락
사용자의 원문 요청:
"마케팅 전략을 1페이지로 정리해줘"

확정된 정보:
- 목표: 보고용 전략 정리
- 분량: 1페이지
- 출력 형식: 1페이지 전략 문서

# 제약
- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.
- 추상적인 조언보다 실행 가능한 제안을 우선한다.
- 불확실한 부분은 “확인 필요”로 분리한다.
- 1페이지 안에 정리한다.

# 출력 형식
선택된 출력 형식: 1페이지 전략 문서
분량: 1페이지
- 핵심 방향을 먼저 요약한다.
- 우선순위가 높은 실행 항목을 단계별로 제시한다.
- 필요한 리소스, 리스크, 성공 지표, 다음 액션을 포함한다.
- 마케팅/그로스 맥락을 반영한다.
- 실행 채널, 성공 지표, 리스크를 함께 다룬다.

# 좋은 답변의 기준
- 바로 실행할 수 있을 만큼 구체적이다.
- 우선순위와 순서가 분명하다.
- 모르는 정보는 가정으로 분리한다.

# 관점
마케팅/그로스 관점에서 답하라.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 25. generic job posting
Draft:
```text
채용 공고 써줘
```
Expected:
- caseSource: `core`
- domainPack: `hr_recruiting`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `job_posting`
- needsContextLine: `false`
Filled Slots:
- output_format: 채용 공고 초안
- goal: 채용 공고 초안
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- role_type
- emphasis
Questions:
### Q1. 어떤 역할을 채용하려는 공고인가요?

- 개발자
- 마케터
- 디자이너
- 운영/CS
- 추천해줘

### Q2. 공고에서 가장 강조할 점은?

- 직무 요건 명확화
- 회사/팀 매력 전달
- 빠른 지원 유도
- 시니어 후보자 설득
- 추천해줘
Assumed Answers:
- role_type: 개발자
- emphasis: 직무 요건 명확화
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
채용 공고 초안을 작성한다. 원문 요청 "채용 공고 써줘"의 의도를 보존한다. 목표는 "채용 공고 초안"이다.

# 확인된 정보
- 원문 요청: "채용 공고 써줘"
- 목표: 채용 공고 초안
- 출력 형식: 채용 공고 초안
- 채용 역할: 개발자
- 강조점: 직무 요건 명확화

# 출력 형식
선택된 출력 형식: 채용 공고 초안
- 역할, 주요 업무, 필요 역량, 지원자가 얻을 수 있는 가치를 구분한다.
- 지원자가 바로 이해할 수 있는 채용 공고 초안으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 26. generic meeting agenda
Draft:
```text
회의 아젠다 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `internal_ops`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `meeting_agenda`
- needsContextLine: `false`
Filled Slots:
- output_format: 회의 아젠다
- goal: 회의 아젠다
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- artifact_topic
- agenda_format
Questions:
### Q1. 회의 주제/상황은 무엇인가요?

- 프로젝트 진행 상황
- 문제 해결 회의
- 아이디어/기획 논의
- 의사결정 회의
- 추천해줘

### Q2. 원하는 아젠다 형식은?

- 30분 회의 아젠다
- 항목별 시간 배분
- 논의 질문 포함
- 액션아이템/담당자 포함
- 추천해줘
Assumed Answers:
- artifact_topic: 프로젝트 진행 상황
- agenda_format: 30분 회의 아젠다
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
회의 아젠다를 만든다. 원문 요청 "회의 아젠다 만들어줘"의 의도를 보존한다. 목표는 "회의 아젠다"이다.

# 확인된 정보
- 원문 요청: "회의 아젠다 만들어줘"
- 목표: 회의 아젠다
- 주제/대상: 프로젝트 진행 상황
- 출력 형식: 회의 아젠다
- 아젠다 형식: 30분 회의 아젠다

# 출력 형식
선택된 출력 형식: 회의 아젠다
아젠다 형식: 30분 회의 아젠다
- 30분 회의 아젠다에 맞춰 안건을 구성한다.
- 회의 목적, 논의 안건, 시간 배분, 기대 결과를 구분한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 27. generic customer interview questions
Draft:
```text
고객 인터뷰 질문 뽑아줘
```
Expected:
- caseSource: `core`
- domainPack: `content_education`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.research or brief.create`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.create`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `question_set`
- needsContextLine: `false`
Filled Slots:
- audience: 고객
- output_format: 질문 목록
- goal: 질문 목록
Missing Slots:
- quantity
- style
- success_criteria
Suggested Slots:
- question_purpose
- question_format
Questions:
### Q1. 질문의 목적은 무엇인가요?

- 문제 검증
- 만족도/불만 파악
- 사용성 피드백
- 회고/학습 도출
- 추천해줘

### Q2. 질문 형식은?

- 핵심 질문 10개
- 개방형 질문
- 질문 + 후속 질문
- 진행자 가이드 포함
- 추천해줘
Assumed Answers:
- question_purpose: 문제 검증
- question_format: 핵심 질문 10개
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
질문 목록을 만든다. 원문 요청 "고객 인터뷰 질문 뽑아줘"의 의도를 보존한다. 목표는 "질문 목록"이다.

# 확인된 정보
- 원문 요청: "고객 인터뷰 질문 뽑아줘"
- 목표: 질문 목록
- 대상: 고객
- 출력 형식: 질문 목록
- 질문 목적: 문제 검증
- 질문 형식: 핵심 질문 10개

# 출력 형식
선택된 출력 형식: 질문 목록
질문 형식: 핵심 질문 10개
- 핵심 질문 10개를 제시한다.
- 필요하면 마지막에 확인 필요 항목만 짧게 덧붙인다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 28. generic presentation structure
Draft:
```text
발표 구조 잡아줘
```
Expected:
- caseSource: `core`
- domainPack: `content_education`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `presentation_outline`
- needsContextLine: `false`
Filled Slots:
- output_format: 발표 구조
- goal: 발표 구조
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- artifact_topic
- outline_format
Questions:
### Q1. 발표 주제는 무엇인가요?

- 제품/서비스 소개
- 프로젝트 결과 공유
- 문제/해결안 제안
- 교육/설명
- 추천해줘

### Q2. 원하는 구조는?

- 5분 발표 구조
- 10분 발표 구조
- 슬라이드 목차
- 발표 스크립트 포함
- 추천해줘
Assumed Answers:
- artifact_topic: 제품/서비스 소개
- outline_format: 5분 발표 구조
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
발표 구조를 잡는다. 원문 요청 "발표 구조 잡아줘"의 의도를 보존한다. 목표는 "발표 구조"이다.

# 확인된 정보
- 원문 요청: "발표 구조 잡아줘"
- 목표: 발표 구조
- 주제/대상: 제품/서비스 소개
- 출력 형식: 발표 구조
- 구조 형식: 5분 발표 구조

# 출력 형식
선택된 출력 형식: 발표 구조
구조 형식: 5분 발표 구조
- 5분 발표 구조에 맞춰 발표 흐름을 구성한다.
- 도입, 본론, 마무리의 핵심 메시지를 구분한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 29. generic lecture curriculum
Draft:
```text
강의 커리큘럼 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `content_education`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `curriculum`
- needsContextLine: `false`
Filled Slots:
- output_format: 커리큘럼 초안
- goal: 커리큘럼 초안
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- artifact_topic
- learning_audience
Questions:
### Q1. 강의 주제는 무엇인가요?

- 업무/실무 교육
- 제품/서비스 교육
- 기술/도구 교육
- 입문 개념 교육
- 추천해줘

### Q2. 학습 대상은 누구인가요?

- 입문자
- 실무자
- 내부 팀원
- 고객/사용자
- 추천해줘
Assumed Answers:
- artifact_topic: 업무/실무 교육
- learning_audience: 입문자
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
강의 커리큘럼을 만든다. 원문 요청 "강의 커리큘럼 만들어줘"의 의도를 보존한다. 목표는 "커리큘럼 초안"이다.

# 확인된 정보
- 원문 요청: "강의 커리큘럼 만들어줘"
- 목표: 커리큘럼 초안
- 주제/대상: 업무/실무 교육
- 출력 형식: 커리큘럼 초안
- 학습 대상: 입문자

# 출력 형식
선택된 출력 형식: 커리큘럼 초안
- 학습 목표, 대상, 모듈, 실습 또는 과제를 구분한다.
- 순서대로 따라갈 수 있는 커리큘럼 초안으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 30. generic cs response manual
Draft:
```text
CS 응대 매뉴얼 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan or brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `manual_or_playbook`
- needsContextLine: `false`
Filled Slots:
- output_format: 매뉴얼/플레이북
- goal: 매뉴얼/플레이북
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- manual_purpose
- manual_scope
Questions:
### Q1. 매뉴얼의 목적은 무엇인가요?

- 일관된 응대
- 신규 담당자 교육
- 예외 상황 처리
- 품질 기준 정리
- 추천해줘

### Q2. 포함할 범위는?

- 기본 절차
- 상황별 스크립트
- 체크리스트
- escalation 기준
- 추천해줘
Assumed Answers:
- manual_purpose: 일관된 응대
- manual_scope: 기본 절차
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
매뉴얼/플레이북을 만든다. 원문 요청 "CS 응대 매뉴얼 만들어줘"의 의도를 보존한다. 목표는 "매뉴얼/플레이북"이다.

# 확인된 정보
- 원문 요청: "CS 응대 매뉴얼 만들어줘"
- 목표: 매뉴얼/플레이북
- 출력 형식: 매뉴얼/플레이북
- 매뉴얼 목적: 일관된 응대
- 매뉴얼 범위: 기본 절차

# 출력 형식
선택된 출력 형식: 매뉴얼/플레이북
매뉴얼 범위: 기본 절차
- 기본 절차 범위를 우선 반영한다.
- 절차, 상황별 대응, 확인 기준을 구분한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 31. generic onboarding document
Draft:
```text
온보딩 문서 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `internal_ops`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan or brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `onboarding_doc`
- needsContextLine: `false`
Filled Slots:
- output_format: 온보딩 문서
- goal: 온보딩 문서
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- onboarding_audience
- onboarding_format
Questions:
### Q1. 누구를 위한 온보딩인가요?

- 신규 직원
- 신규 고객
- 신규 사용자
- 파트너/외부 협업자
- 추천해줘

### Q2. 원하는 형식은?

- 첫날 체크리스트
- 1주 온보딩 플랜
- 단계별 가이드
- 필요한 자료 목록 포함
- 추천해줘
Assumed Answers:
- onboarding_audience: 신규 직원
- onboarding_format: 첫날 체크리스트
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
온보딩 문서를 만든다. 원문 요청 "온보딩 문서 만들어줘"의 의도를 보존한다. 목표는 "온보딩 문서"이다.

# 확인된 정보
- 원문 요청: "온보딩 문서 만들어줘"
- 목표: 온보딩 문서
- 출력 형식: 온보딩 문서
- 온보딩 대상: 신규 직원
- 온보딩 형식: 첫날 체크리스트

# 출력 형식
선택된 출력 형식: 온보딩 문서
온보딩 형식: 첫날 체크리스트
- 첫날 체크리스트 형식을 우선 반영한다.
- 대상, 단계, 체크리스트, 필요한 자료를 구분한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 32. generic youtube planning doc
Draft:
```text
유튜브 영상 기획안 써줘
```
Expected:
- caseSource: `core`
- domainPack: `content_education`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan or brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `content_plan`
- needsContextLine: `false`
Filled Slots:
- output_format: 콘텐츠 기획안
- goal: 콘텐츠 기획안
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- artifact_topic
- content_output
Questions:
### Q1. 영상/콘텐츠 주제는 무엇인가요?

- 제품/서비스 소개
- 사용법/교육
- 브랜드 스토리
- 트렌드/인사이트
- 추천해줘

### Q2. 원하는 결과물은?

- 기획안 구조
- 영상 흐름
- 제목/훅 아이디어 포함
- 촬영/편집 체크리스트 포함
- 추천해줘
Assumed Answers:
- artifact_topic: 제품/서비스 소개
- content_output: 기획안 구조
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
콘텐츠 기획안을 만든다. 원문 요청 "유튜브 영상 기획안 써줘"의 의도를 보존한다. 목표는 "콘텐츠 기획안"이다.

# 확인된 정보
- 원문 요청: "유튜브 영상 기획안 써줘"
- 목표: 콘텐츠 기획안
- 주제/대상: 제품/서비스 소개
- 출력 형식: 콘텐츠 기획안
- 콘텐츠 결과물: 기획안 구조

# 출력 형식
선택된 출력 형식: 콘텐츠 기획안
콘텐츠 결과물: 기획안 구조
- 콘텐츠 목적, 핵심 메시지, 흐름, 훅 또는 제목 후보를 포함한다.
- 제작 전 확인할 체크리스트를 짧게 붙인다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 33. generic blog outline
Draft:
```text
블로그 글 목차 짜줘
```
Expected:
- caseSource: `core`
- domainPack: `content_education`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write or brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `blog_outline`
- needsContextLine: `false`
Filled Slots:
- output_format: 블로그 목차
- goal: 블로그 목차
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- artifact_topic
- outline_format
Questions:
### Q1. 글의 주제는 무엇인가요?

- 제품/서비스 설명
- 문제 해결 가이드
- 트렌드/인사이트
- 사례/경험 공유
- 추천해줘

### Q2. 원하는 목차 수준은?

- 핵심 목차만
- H2/H3 구조
- 섹션별 핵심 메시지 포함
- 제목 후보 포함
- 추천해줘
Assumed Answers:
- artifact_topic: 제품/서비스 설명
- outline_format: 핵심 목차만
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
블로그 글 목차를 잡는다. 원문 요청 "블로그 글 목차 짜줘"의 의도를 보존한다. 목표는 "블로그 목차"이다.

# 확인된 정보
- 원문 요청: "블로그 글 목차 짜줘"
- 목표: 블로그 목차
- 주제/대상: 제품/서비스 설명
- 출력 형식: 블로그 목차
- 구조 형식: 핵심 목차만

# 출력 형식
선택된 출력 형식: 블로그 목차
구조 형식: 핵심 목차만
- 핵심 목차만 간결하게 제시한다.
- 각 목차가 다루는 핵심 방향을 한 줄로 붙인다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 34. generic survey questions
Draft:
```text
설문조사 문항 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `content_education`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.research or brief.create`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.create`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `survey_questions`
- needsContextLine: `false`
Filled Slots:
- output_format: 설문 문항 목록
- goal: 설문 문항 목록
Missing Slots:
- quantity
- style
- audience
- success_criteria
Suggested Slots:
- artifact_topic
- question_format
Questions:
### Q1. 설문 주제는 무엇인가요?

- 고객 만족도
- 제품 사용성
- 시장/수요 확인
- 내부 구성원 의견
- 추천해줘

### Q2. 질문 형식은?

- 핵심 질문 10개
- 개방형 질문
- 질문 + 후속 질문
- 진행자 가이드 포함
- 추천해줘
Assumed Answers:
- artifact_topic: 고객 만족도
- question_format: 핵심 질문 10개
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
설문 문항 목록을 만든다. 원문 요청 "설문조사 문항 만들어줘"의 의도를 보존한다. 목표는 "설문 문항 목록"이다.

# 확인된 정보
- 원문 요청: "설문조사 문항 만들어줘"
- 목표: 설문 문항 목록
- 주제/대상: 고객 만족도
- 출력 형식: 설문 문항 목록
- 질문 형식: 핵심 질문 10개

# 출력 형식
선택된 출력 형식: 설문 문항 목록
질문 형식: 핵심 질문 10개
- 핵심 질문 10개를 제시한다.
- 필요하면 마지막에 확인 필요 항목만 짧게 덧붙인다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 35. generic idea pros cons analysis
Draft:
```text
내 아이디어 장단점 분석해줘
```
Expected:
- caseSource: `core`
- domainPack: `generic`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `brief.analyze`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.analyze`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- goal: 장단점 비교
- analysis_target: 장단점
Missing Slots:
- criteria
- output_format
- depth
- assumptions_policy
Suggested Slots:
- artifact_topic
- comparison_dimensions
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 36. generic team retrospective questions
Draft:
```text
팀 회고 질문 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `internal_ops`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.research or brief.create`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.create`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `retrospective_questions`
- needsContextLine: `false`
Filled Slots:
- audience: 팀
- output_format: 회고 질문 목록
- goal: 회고 질문 목록
Missing Slots:
- quantity
- style
- success_criteria
Suggested Slots:
- question_purpose
- question_format
Questions:
### Q1. 질문의 목적은 무엇인가요?

- 회고/학습 도출
- 문제 검증
- 만족도/불만 파악
- 사용성 피드백
- 추천해줘

### Q2. 질문 형식은?

- 핵심 질문 10개
- 개방형 질문
- 질문 + 후속 질문
- 진행자 가이드 포함
- 추천해줘
Assumed Answers:
- question_purpose: 회고/학습 도출
- question_format: 핵심 질문 10개
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
회고 질문 목록을 만든다. 원문 요청 "팀 회고 질문 만들어줘"의 의도를 보존한다. 목표는 "회고 질문 목록"이다.

# 확인된 정보
- 원문 요청: "팀 회고 질문 만들어줘"
- 목표: 회고 질문 목록
- 대상: 팀
- 출력 형식: 회고 질문 목록
- 질문 목적: 회고/학습 도출
- 질문 형식: 핵심 질문 10개

# 출력 형식
선택된 출력 형식: 회고 질문 목록
질문 형식: 핵심 질문 10개
- 핵심 질문 10개를 제시한다.
- 필요하면 마지막에 확인 필요 항목만 짧게 덧붙인다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 37. generic handoff document
Draft:
```text
업무 인수인계 문서 작성해줘
```
Expected:
- caseSource: `core`
- domainPack: `internal_ops`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `handoff_doc`
- needsContextLine: `false`
Filled Slots:
- output_format: 인수인계 문서
- goal: 인수인계 문서
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- artifact_topic
- handoff_format
Questions:
### Q1. 어떤 업무를 인수인계하나요?

- 운영 업무
- 프로젝트 진행 업무
- 고객/파트너 관리
- 시스템/도구 관리
- 추천해줘

### Q2. 원하는 형식은?

- 체크리스트
- 상세 문서
- 표로 정리
- 바로 실행할 TODO 포함
- 추천해줘
Assumed Answers:
- artifact_topic: 운영 업무
- handoff_format: 체크리스트
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
업무 인수인계 문서를 작성한다. 원문 요청 "업무 인수인계 문서 작성해줘"의 의도를 보존한다. 목표는 "인수인계 문서"이다.

# 확인된 정보
- 원문 요청: "업무 인수인계 문서 작성해줘"
- 목표: 인수인계 문서
- 주제/대상: 운영 업무
- 출력 형식: 인수인계 문서
- 인수인계 형식: 체크리스트

# 출력 형식
선택된 출력 형식: 인수인계 문서
인수인계 형식: 체크리스트
- 체크리스트 형식을 우선 반영한다.
- 현재 상태, 진행 중인 작업, 리스크, 다음 액션을 구분한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 38. generic customer complaint reply
Draft:
```text
고객 불만 답변 써줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `complaint_reply`
- needsContextLine: `false`
Filled Slots:
- audience: 고객
- output_format: 고객 불만 답변 초안
- goal: 고객 불만 답변 초안
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- artifact_topic
- tone
Questions:
### Q1. 고객 불만의 핵심 내용은 무엇인가요?

- 서비스 장애/오류
- 가격/정책 불만
- 배송/일정 지연
- 응대 경험 불만
- 추천해줘

### Q2. 원하는 톤은?

- 정중하고 공감 있게
- 단호하지만 부드럽게
- 짧고 명확하게
- 신뢰 회복 중심
- 추천해줘
Assumed Answers:
- artifact_topic: 서비스 장애/오류
- tone: 정중하고 공감 있게
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
고객 불만 답변 초안을 작성한다. 원문 요청 "고객 불만 답변 써줘"의 의도를 보존한다. 목표는 "고객 불만 답변 초안"이다.

# 확인된 정보
- 원문 요청: "고객 불만 답변 써줘"
- 목표: 고객 불만 답변 초안
- 대상: 고객
- 주제/대상: 서비스 장애/오류
- 출력 형식: 고객 불만 답변 초안
- 톤: 정중하고 공감 있게

# 출력 형식
선택된 출력 형식: 고객 불만 답변 초안
톤: 정중하고 공감 있게
- 사과/공감, 사실 확인, 해결 방안, 다음 액션을 구분한다.
- 고객 신뢰를 해치지 않는 답변 초안으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 39. generic proposal structure
Draft:
```text
제안서 구조 잡아줘
```
Expected:
- caseSource: `core`
- domainPack: `sales_bd`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan or brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `proposal_outline`
- needsContextLine: `false`
Filled Slots:
- output_format: 제안서 구조
- goal: 제안서 구조
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- proposal_goal
- proposal_context
Questions:
### Q1. 제안서의 목적은 무엇인가요?

- 문제 해결안 제시
- 신규 계약 설득
- 제휴 구조 제안
- 내부 승인 지원
- 추천해줘

### Q2. 제안할 내용은 무엇에 가깝나요?

- 제품/서비스 도입
- 제휴/협업 구조
- 고객 문제 해결안
- 가격/계약 조건
- 추천해줘
Assumed Answers:
- proposal_goal: 문제 해결안 제시
- proposal_context: 제품/서비스 도입
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
제안서 구조를 잡는다. 원문 요청 "제안서 구조 잡아줘"의 의도를 보존한다. 목표는 "제안서 구조"이다.

# 확인된 정보
- 원문 요청: "제안서 구조 잡아줘"
- 목표: 제안서 구조
- 제안서 목적: 문제 해결안 제시
- 제안 내용: 제품/서비스 도입
- 출력 형식: 제안서 구조

# 출력 형식
선택된 출력 형식: 제안서 구조
제안서 목적: 문제 해결안 제시
제안 내용: 제품/서비스 도입
- 문제 정의, 제안 내용, 기대 효과, 비용/리스크, 다음 단계를 구분한다.
- 제안서 구조를 바로 확장할 수 있게 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 40. partnership proposal outline
Draft:
```text
제휴 제안서 목차 짜줘
```
Expected:
- caseSource: `core`
- domainPack: `sales_bd`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan or brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `proposal_outline`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `proposal_outline`
- needsContextLine: `false`
Filled Slots:
- output_format: 제안서 구조
- goal: 제안서 구조
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- proposal_goal
- proposal_context
Questions:
### Q1. 제안서의 목적은 무엇인가요?

- 제휴 구조 제안
- 신규 계약 설득
- 내부 승인 지원
- 문제 해결안 제시
- 추천해줘

### Q2. 제안할 내용은 무엇에 가깝나요?

- 제휴/협업 구조
- 제품/서비스 도입
- 고객 문제 해결안
- 가격/계약 조건
- 추천해줘
Assumed Answers:
- proposal_goal: 제휴 구조 제안
- proposal_context: 제휴/협업 구조
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
제안서 구조를 잡는다. 원문 요청 "제휴 제안서 목차 짜줘"의 의도를 보존한다. 목표는 "제안서 구조"이다.

# 확인된 정보
- 원문 요청: "제휴 제안서 목차 짜줘"
- 목표: 제안서 구조
- 제안서 목적: 제휴 구조 제안
- 제안 내용: 제휴/협업 구조
- 출력 형식: 제안서 구조

# 출력 형식
선택된 출력 형식: 제안서 구조
제안서 목적: 제휴 구조 제안
제안 내용: 제휴/협업 구조
- 문제 정의, 제안 내용, 기대 효과, 비용/리스크, 다음 단계를 구분한다.
- 제안서 구조를 바로 확장할 수 있게 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 41. demo meeting agenda
Draft:
```text
데모 미팅 아젠다 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `sales_bd`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `demo_agenda`
- needsContextLine: `false`
Filled Slots:
- output_format: 데모 미팅 아젠다
- goal: 데모 미팅 아젠다
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- meeting_goal
- sales_stage
Questions:
### Q1. 미팅의 가장 중요한 목적은 무엇인가요?

- 제품 가치 설명
- 니즈 파악
- 의사결정자 설득
- 다음 단계 합의
- 추천해줘

### Q2. 현재 영업 단계는 어디에 가까운가요?

- 데모/미팅 전
- 첫 접촉
- 제안서 전달
- 협상/클로징
- 추천해줘
Assumed Answers:
- meeting_goal: 제품 가치 설명
- sales_stage: 데모/미팅 전
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
데모 미팅 아젠다를 만든다. 원문 요청 "데모 미팅 아젠다 만들어줘"의 의도를 보존한다. 목표는 "데모 미팅 아젠다"이다.

# 확인된 정보
- 원문 요청: "데모 미팅 아젠다 만들어줘"
- 목표: 데모 미팅 아젠다
- 영업 단계: 데모/미팅 전
- 미팅 목적: 제품 가치 설명
- 출력 형식: 데모 미팅 아젠다

# 출력 형식
선택된 출력 형식: 데모 미팅 아젠다
영업 단계: 데모/미팅 전
미팅 목적: 제품 가치 설명
- 미팅 목표, 시간 배분, 질문/데모 흐름, 다음 액션을 구분한다.
- 데모 전후에 합의해야 할 항목을 명확히 한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 42. salesy rewrite suppression
Draft:
```text
이 문장 영업스럽게 바꿔줘
```
Expected:
- caseSource: `core`
- domainPack: `sales_bd`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `not specified`
- expectedDomain: `not specified`
- expectedArtifactType: `not specified`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.generic`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- none
Missing Slots:
- goal
- output_format
- audience
- scope
- constraints
Suggested Slots:
- goal
- output_format
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 43. price negotiation reply
Draft:
```text
가격 협상 대응 문구 써줘
```
Expected:
- caseSource: `core`
- domainPack: `sales_bd`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `negotiation_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `negotiation_reply`
- needsContextLine: `false`
Filled Slots:
- output_format: 가격 협상 대응 문구
- goal: 가격 협상 대응 문구
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- objection_type
- negotiation_boundary
Questions:
### Q1. 주로 다룰 objection은 무엇인가요?

- 가격이 비싸다
- 필요성을 못 느낀다
- 기존 솔루션이 있다
- 도입 리스크가 걱정된다
- 추천해줘

### Q2. 협상에서 지킬 기준은 무엇인가요?

- 할인 없이 가치 설명
- 조건부 할인 가능
- 대안 패키지 제안
- 내부 검토 후 답변
- 추천해줘
Assumed Answers:
- objection_type: 가격이 비싸다
- negotiation_boundary: 할인 없이 가치 설명
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
가격 협상 대응 문구를 작성한다. 원문 요청 "가격 협상 대응 문구 써줘"의 의도를 보존한다. 목표는 "가격 협상 대응 문구"이다.

# 확인된 정보
- 원문 요청: "가격 협상 대응 문구 써줘"
- 목표: 가격 협상 대응 문구
- 협상 기준: 할인 없이 가치 설명
- objection 유형: 가격이 비싸다
- 출력 형식: 가격 협상 대응 문구

# 출력 형식
선택된 출력 형식: 가격 협상 대응 문구
협상 기준: 할인 없이 가치 설명
objection 유형: 가격이 비싸다
- 고객 우려 공감, 가격/가치 재정리, 대안 제시, 다음 액션을 구분한다.
- 가격 협상 상황에서 신뢰와 클로징 가능성을 함께 지킨다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 44. empathetic rewrite suppression
Draft:
```text
이 문장 고객에게 더 공감 있게 바꿔줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `suppress`
- shouldShowClarify: `false`
- expectedTaskType: `brief.generic`
- expectedDomain: `generic`
- expectedArtifactType: `none`
Actual:
- shouldShowClarify: `false`
- taskType: `brief.generic`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `none`
- needsContextLine: `false`
Filled Slots:
- audience: 고객
Missing Slots:
- goal
- output_format
- scope
- constraints
Suggested Slots:
- goal
- output_format
Clarify behavior:

> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.

Questions:
Skipped in runtime.
Assumed Answers:
Skipped in runtime.
Context Line:
Skipped in runtime.
Compiled Prompt:
Skipped in runtime.
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 45. delayed delivery complaint reply
Draft:
```text
배송 지연 고객 불만 답변 써줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `complaint_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `complaint_reply`
- needsContextLine: `false`
Filled Slots:
- audience: 고객
- artifact_topic: 배송/일정 지연
- output_format: 고객 불만 답변 초안
- goal: 고객 불만 답변 초안
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- tone
Questions:
### Q1. 원하는 톤은?

- 정중하고 공감 있게
- 단호하지만 부드럽게
- 짧고 명확하게
- 신뢰 회복 중심
- 추천해줘
Assumed Answers:
- tone: 정중하고 공감 있게
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
고객 불만 답변 초안을 작성한다. 원문 요청 "배송 지연 고객 불만 답변 써줘"의 의도를 보존한다. 목표는 "고객 불만 답변 초안"이다.

# 확인된 정보
- 원문 요청: "배송 지연 고객 불만 답변 써줘"
- 목표: 고객 불만 답변 초안
- 대상: 고객
- 주제/대상: 배송/일정 지연
- 출력 형식: 고객 불만 답변 초안
- 톤: 정중하고 공감 있게

# 출력 형식
선택된 출력 형식: 고객 불만 답변 초안
톤: 정중하고 공감 있게
- 사과/공감, 사실 확인, 해결 방안, 다음 액션을 구분한다.
- 고객 신뢰를 해치지 않는 답변 초안으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
- 배송/일정 지연 신호를 서비스 장애로 바꾸지 않는다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 46. refund policy support manual
Draft:
```text
환불 정책 CS 응대 매뉴얼 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `generic`
- expectedArtifactType: `refund_policy_manual`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `refund_policy_manual`
- needsContextLine: `false`
Filled Slots:
- output_format: 환불 정책 CS 응대 매뉴얼
- goal: 환불 정책 CS 응대 매뉴얼
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- refund_policy_scope
- manual_scope
Questions:
### Q1. 환불 정책 매뉴얼에서 가장 중요한 범위는?

- 환불 가능/불가 기준
- 예외/승인 절차
- 상황별 응대 스크립트
- escalation 기준
- 추천해줘

### Q2. 매뉴얼 형식은 어떻게 구성할까요?

- 기본 절차
- 상황별 스크립트
- 체크리스트
- escalation 기준
- 추천해줘
Assumed Answers:
- refund_policy_scope: 환불 가능/불가 기준
- manual_scope: 기본 절차
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
환불 정책 CS 응대 매뉴얼을 만든다. 원문 요청 "환불 정책 CS 응대 매뉴얼 만들어줘"의 의도를 보존한다. 목표는 "환불 정책 CS 응대 매뉴얼"이다.

# 확인된 정보
- 원문 요청: "환불 정책 CS 응대 매뉴얼 만들어줘"
- 목표: 환불 정책 CS 응대 매뉴얼
- 환불 정책 범위: 환불 가능/불가 기준
- 출력 형식: 환불 정책 CS 응대 매뉴얼
- 매뉴얼 범위: 기본 절차

# 출력 형식
선택된 출력 형식: 환불 정책 CS 응대 매뉴얼
매뉴얼 범위: 기본 절차
환불 정책 범위: 환불 가능/불가 기준
- 환불 가능/불가 기준, 예외/승인 절차, 상황별 응대 스크립트, escalation 기준을 구분한다.
- 정책이 불명확한 부분은 확인 필요로 표시하고 임의로 약속하지 않는다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 환불 가능 여부와 정책 근거를 모르면 단정하지 않는다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 47. vip escalation response plan
Draft:
```text
VIP 고객 클레임 대응 초안 써줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `vip_complaint_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `vip_complaint_reply`
- needsContextLine: `false`
Filled Slots:
- audience: 고객
- output_format: VIP 클레임 대응 초안
- goal: VIP 클레임 대응 초안
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- escalation_level
- ownership_model
Questions:
### Q1. 클레임의 심각도는?

- 반복 불만/중요 고객
- 긴급 장애/업무 영향
- 계약/보상 이슈
- 담당자 대응 불만
- 추천해줘

### Q2. 응대에서 가장 중요한 오너십은?

- 담당자 지정
- 관리자/리더 개입
- 해결 일정 공유
- 재발 방지 약속
- 추천해줘
Assumed Answers:
- escalation_level: 반복 불만/중요 고객
- ownership_model: 담당자 지정
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
VIP 고객 클레임 대응 초안을 작성한다. 원문 요청 "VIP 고객 클레임 대응 초안 써줘"의 의도를 보존한다. 목표는 "VIP 클레임 대응 초안"이다.

# 확인된 정보
- 원문 요청: "VIP 고객 클레임 대응 초안 써줘"
- 목표: VIP 클레임 대응 초안
- 대상: 고객
- 심각도: 반복 불만/중요 고객
- 오너십: 담당자 지정
- 출력 형식: VIP 클레임 대응 초안

# 출력 형식
선택된 출력 형식: VIP 클레임 대응 초안
심각도: 반복 불만/중요 고객
오너십: 담당자 지정
- 사과/공감, 오너십, 심각도 확인, 해결 계획, 다음 업데이트를 구분한다.
- 보상이나 약속은 단정하지 말고 확인 필요와 가능한 범위를 분리한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
- 중요 고객 클레임은 오너십, 해결 일정, 재발 방지 관점으로 다룬다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 48. vip escalation paraphrase
Draft:
```text
중요 고객 항의에 긴급 대응 메일 초안 써줘
```
Expected:
- caseSource: `core`
- domainPack: `customer_support`
- clarificationMode: `multiple_choice`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `writing_email`
- expectedArtifactType: `vip_complaint_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `vip_complaint_reply`
- needsContextLine: `false`
Filled Slots:
- audience: 고객
- output_format: VIP 클레임 대응 초안
- goal: VIP 클레임 대응 초안
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- escalation_level
- ownership_model
Questions:
### Q1. 클레임의 심각도는?

- 긴급 장애/업무 영향
- 계약/보상 이슈
- 반복 불만/중요 고객
- 담당자 대응 불만
- 추천해줘

### Q2. 응대에서 가장 중요한 오너십은?

- 담당자 지정
- 관리자/리더 개입
- 해결 일정 공유
- 재발 방지 약속
- 추천해줘
Assumed Answers:
- escalation_level: 긴급 장애/업무 영향
- ownership_model: 담당자 지정
Context Line:
_Not used for this case._
Compiled Prompt:
```text
# 작업
VIP 고객 클레임 대응 초안을 작성한다. 원문 요청 "중요 고객 항의에 긴급 대응 메일 초안 써줘"의 의도를 보존한다. 목표는 "VIP 클레임 대응 초안"이다.

# 확인된 정보
- 원문 요청: "중요 고객 항의에 긴급 대응 메일 초안 써줘"
- 목표: VIP 클레임 대응 초안
- 대상: 고객
- 심각도: 긴급 장애/업무 영향
- 오너십: 담당자 지정
- 출력 형식: VIP 클레임 대응 초안

# 출력 형식
선택된 출력 형식: VIP 클레임 대응 초안
심각도: 긴급 장애/업무 영향
오너십: 담당자 지정
- 사과/공감, 오너십, 심각도 확인, 해결 계획, 다음 업데이트를 구분한다.
- 보상이나 약속은 단정하지 말고 확인 필요와 가능한 범위를 분리한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 49. sales call script
Draft:
```text
세일즈 콜 스크립트 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write or brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `sales_script`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `sales_script`
- needsContextLine: `true`
Filled Slots:
- output_format: 세일즈 콜 스크립트
- goal: 세일즈 콜 스크립트
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 제품, 대상 고객, 콜 목적을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: SMB 대표에게 재고관리 SaaS 데모 미팅을 잡기 위한 첫 콜
Assumed Answers:
_No assumed answers._
Context Line:
```text
재고관리 SaaS를 SMB 대표에게 소개하고 데모 미팅을 잡는 첫 콜
```
Compiled Prompt:
```text
# 작업
세일즈 콜 스크립트를 작성한다. 원문 요청 "세일즈 콜 스크립트 써줘"의 의도를 보존한다. 목표는 "세일즈 콜 스크립트"이다.

# 확인된 정보
- 원문 요청: "세일즈 콜 스크립트 써줘"
- 목표: 세일즈 콜 스크립트
- 1줄 맥락: 재고관리 SaaS를 SMB 대표에게 소개하고 데모 미팅을 잡는 첫 콜
- 출력 형식: 세일즈 콜 스크립트

# 출력 형식
선택된 출력 형식: 세일즈 콜 스크립트
- 오프닝, 니즈 파악 질문, 가치 제안, 예상 objection 대응, 다음 액션 제안을 구분한다.
- 콜에서 바로 읽거나 변형해 쓸 수 있는 스크립트 형태로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 50. cold email draft
Draft:
```text
콜드메일 작성해줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `cold_email`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `cold_email`
- needsContextLine: `true`
Filled Slots:
- output_format: 콜드메일 초안
- goal: 콜드메일 초안
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 제품/오퍼와 대상 고객을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: HR팀장에게 채용 자동화 툴 데모를 제안하는 첫 메일
Assumed Answers:
_No assumed answers._
Context Line:
```text
HR팀장에게 채용 자동화 SaaS 무료 데모를 제안하는 첫 콜드메일
```
Compiled Prompt:
```text
# 작업
콜드메일 초안을 작성한다. 원문 요청 "콜드메일 작성해줘"의 의도를 보존한다. 목표는 "콜드메일 초안"이다.

# 확인된 정보
- 원문 요청: "콜드메일 작성해줘"
- 목표: 콜드메일 초안
- 1줄 맥락: HR팀장에게 채용 자동화 SaaS 무료 데모를 제안하는 첫 콜드메일
- 출력 형식: 콜드메일 초안

# 출력 형식
선택된 출력 형식: 콜드메일 초안
- 제목 후보 2개, 첫 문장, 본문, CTA, 짧은 버전을 구분한다.
- 낯선 상대가 빠르게 이해하고 답장할 수 있게 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 51. prospect objections analysis
Draft:
```text
잠재 고객 objections 정리해줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.analyze or brief.extract`
- expectedDomain: `not specified`
- expectedArtifactType: `objections_analysis`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.analyze`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `objections_analysis`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: objection 대응 정리
- goal: objection 대응 정리
Missing Slots:
- analysis_target
- criteria
- depth
- assumptions_policy
Suggested Slots:
- context_line
Questions:
### Q1. 제품/고객군과 자주 나오는 objection을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 보안 우려가 큰 엔터프라이즈 IT 담당자 대상
Assumed Answers:
_No assumed answers._
Context Line:
```text
보안과 도입 리스크를 우려하는 엔터프라이즈 IT 담당자 대상
```
Compiled Prompt:
```text
# 작업
잠재 고객 objection과 우려 대응을 정리한다. 원문 요청 "잠재 고객 objections 정리해줘"의 의도를 보존한다. 목표는 "objection 대응 정리"이다.

# 확인된 정보
- 원문 요청: "잠재 고객 objections 정리해줘"
- 목표: objection 대응 정리
- 대상: 고객
- 1줄 맥락: 보안과 도입 리스크를 우려하는 엔터프라이즈 IT 담당자 대상
- 출력 형식: objection 대응 정리

# 출력 형식
선택된 출력 형식: objection 대응 정리
- objection 유형별 정리, 고객 심리/우려, 대응 메시지, 확인 질문을 구분한다.
- 반박을 누르기보다 우려를 확인하고 신뢰를 높이는 방식으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 52. sales follow-up email
Draft:
```text
영업 후속 메일 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `follow_up_email`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `follow_up_email`
- needsContextLine: `true`
Filled Slots:
- output_format: 영업 후속 메일
- goal: 영업 후속 메일
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 이전 접점과 원하는 다음 액션을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 어제 데모 후 가격표를 보낸 리드에게 다음 미팅을 요청
Assumed Answers:
_No assumed answers._
Context Line:
```text
어제 제품 데모 후 가격표를 보낸 리드에게 다음 미팅을 요청
```
Compiled Prompt:
```text
# 작업
영업 후속 메일을 작성한다. 원문 요청 "영업 후속 메일 써줘"의 의도를 보존한다. 목표는 "영업 후속 메일"이다.

# 확인된 정보
- 원문 요청: "영업 후속 메일 써줘"
- 목표: 영업 후속 메일
- 1줄 맥락: 어제 제품 데모 후 가격표를 보낸 리드에게 다음 미팅을 요청
- 출력 형식: 영업 후속 메일

# 출력 형식
선택된 출력 형식: 영업 후속 메일
- 제목, 맥락 리마인드, 핵심 가치/다음 단계, CTA를 구분한다.
- 이전 접점을 부담스럽지 않게 이어가는 후속 메일로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 53. sales collateral for our product
Draft:
```text
우리 제품 세일즈 자료 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan or brief.write`
- expectedDomain: `not specified`
- expectedArtifactType: `sales_collateral`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `sales_collateral`
- needsContextLine: `true`
Filled Slots:
- output_format: 세일즈 자료
- goal: 세일즈 자료
Missing Slots:
- scope
- audience
- timeframe
- success_criteria
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 제품과 대상 고객, 자료 목적을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: B2B 회계 자동화 제품, CFO 대상, 도입 검토용 1페이지 자료
Assumed Answers:
_No assumed answers._
Context Line:
```text
B2B 회계 자동화 제품, CFO 대상, 도입 검토용 1페이지 자료
```
Compiled Prompt:
```text
# 작업
세일즈 자료를 만든다. 원문 요청 "우리 제품 세일즈 자료 만들어줘"의 의도를 보존한다. 목표는 "세일즈 자료"이다.

# 확인된 정보
- 원문 요청: "우리 제품 세일즈 자료 만들어줘"
- 목표: 세일즈 자료
- 1줄 맥락: B2B 회계 자동화 제품, CFO 대상, 도입 검토용 1페이지 자료
- 출력 형식: 세일즈 자료

# 출력 형식
선택된 출력 형식: 세일즈 자료
- 핵심 메시지, 대상 고객 pain point, 가치 제안, proof point, CTA를 구분한다.
- 제품 정보가 부족하면 가정과 확인 필요 항목을 분리한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 54. refund request response
Draft:
```text
환불 요청 고객 답변 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `refund_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `refund_reply`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 환불 요청 고객 답변
- goal: 환불 요청 고객 답변
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 환불 정책/상태와 고객 상황을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 7일 환불 기간이 지났지만 첫 결제 고객이라 예외 검토 중
Assumed Answers:
_No assumed answers._
Context Line:
```text
7일 환불 기간은 지났지만 첫 결제 고객이라 내부 검토 후 안내해야 함
```
Compiled Prompt:
```text
# 작업
환불 요청 고객 답변을 작성한다. 원문 요청 "환불 요청 고객 답변 써줘"의 의도를 보존한다. 목표는 "환불 요청 고객 답변"이다.

# 확인된 정보
- 원문 요청: "환불 요청 고객 답변 써줘"
- 목표: 환불 요청 고객 답변
- 대상: 고객
- 1줄 맥락: 7일 환불 기간은 지났지만 첫 결제 고객이라 내부 검토 후 안내해야 함
- 출력 형식: 환불 요청 고객 답변

# 출력 형식
선택된 출력 형식: 환불 요청 고객 답변
- 환불 상태, 정책 근거, 고객 상황 공감, 다음 절차를 구분한다.
- 환불 가능 여부를 모르면 단정하지 말고 확인 필요와 임시 안내를 분리한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
- 환불 가능 여부와 정책 근거를 모르면 단정하지 않는다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 55. service outage notice
Draft:
```text
서비스 장애 공지 초안 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `outage_notice`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `outage_notice`
- needsContextLine: `true`
Filled Slots:
- output_format: 서비스 장애 공지
- goal: 서비스 장애 공지
Missing Slots:
- audience
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 영향 범위, 현재 상태, 다음 업데이트 시점을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 로그인 장애가 30분째 지속, 일부 계정 영향, 1시간 뒤 업데이트
Assumed Answers:
_No assumed answers._
Context Line:
```text
로그인 장애가 30분째 지속, 일부 계정 영향, 1시간 뒤 상태 업데이트 예정
```
Compiled Prompt:
```text
# 작업
서비스 장애 공지 초안을 작성한다. 원문 요청 "서비스 장애 공지 초안 써줘"의 의도를 보존한다. 목표는 "서비스 장애 공지"이다.

# 확인된 정보
- 원문 요청: "서비스 장애 공지 초안 써줘"
- 목표: 서비스 장애 공지
- 1줄 맥락: 로그인 장애가 30분째 지속, 일부 계정 영향, 1시간 뒤 상태 업데이트 예정
- 출력 형식: 서비스 장애 공지

# 출력 형식
선택된 출력 형식: 서비스 장애 공지
- 장애 요약, 영향 범위, 현재 상태, 우회책, 다음 업데이트 시점을 구분한다.
- 책임 회피보다 사과, 사실 확인, 고객이 할 수 있는 다음 행동을 우선한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 장애 영향 범위, 현재 상태, 다음 업데이트 기준을 분리한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 56. support faq draft
Draft:
```text
고객 지원 FAQ 초안 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `support_faq`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `support_faq`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 고객 지원 FAQ
- goal: 고객 지원 FAQ
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 원본 문의 목록이나 FAQ로 만들 범위를 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 환불, 로그인 오류, 결제수단 변경 문의가 반복됨
Assumed Answers:
_No assumed answers._
Context Line:
```text
반복 문의는 로그인 오류, 환불 절차, 결제수단 변경, 비밀번호 재설정
```
Compiled Prompt:
```text
# 작업
고객 지원 FAQ 초안을 작성한다. 원문 요청 "고객 지원 FAQ 초안 써줘"의 의도를 보존한다. 목표는 "고객 지원 FAQ"이다.

# 확인된 정보
- 원문 요청: "고객 지원 FAQ 초안 써줘"
- 목표: 고객 지원 FAQ
- 대상: 고객
- 1줄 맥락: 반복 문의는 로그인 오류, 환불 절차, 결제수단 변경, 비밀번호 재설정
- 출력 형식: 고객 지원 FAQ

# 출력 형식
선택된 출력 형식: 고객 지원 FAQ
- FAQ 카테고리, 질문, 고객용 답변, 필요한 다음 액션을 구분한다.
- 답변은 고객이 바로 이해할 수 있게 짧고 실무적으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 57. new customer onboarding guide
Draft:
```text
신규 고객 온보딩 문서 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.plan`
- expectedDomain: `generic`
- expectedArtifactType: `onboarding_doc`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `onboarding_doc`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- onboarding_audience: 신규 고객
- output_format: 온보딩 문서
- goal: 온보딩 문서
Missing Slots:
- scope
- timeframe
- success_criteria
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 제품/서비스와 온보딩 목표를 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 신규 고객이 첫 주 안에 결제 연동과 팀 초대를 완료하게 하기
Assumed Answers:
_No assumed answers._
Context Line:
```text
신규 고객이 첫 주 안에 결제 연동과 팀 초대를 완료하게 하는 SaaS 온보딩
```
Compiled Prompt:
```text
# 작업
온보딩 문서를 만든다. 원문 요청 "신규 고객 온보딩 문서 만들어줘"의 의도를 보존한다. 목표는 "온보딩 문서"이다.

# 확인된 정보
- 원문 요청: "신규 고객 온보딩 문서 만들어줘"
- 목표: 온보딩 문서
- 대상: 고객
- 1줄 맥락: 신규 고객이 첫 주 안에 결제 연동과 팀 초대를 완료하게 하는 SaaS 온보딩
- 출력 형식: 온보딩 문서
- 온보딩 대상: 신규 고객

# 출력 형식
선택된 출력 형식: 온보딩 문서
- 대상, 단계, 체크리스트, 필요한 자료를 구분한다.
- 첫 실행자가 바로 따라갈 수 있는 온보딩 문서로 구성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 58. churn save reply
Draft:
```text
해지하려는 고객에게 붙잡는 답변 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `churn_save_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `churn_save_reply`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 해지 고객 답변
- goal: 해지 고객 답변
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 해지 사유, 고객 상태, 제안 가능한 대안을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 가격 부담으로 해지 고민, 월간 플랜 할인은 불가하고 사용법 지원 가능
Assumed Answers:
_No assumed answers._
Context Line:
```text
가격 부담으로 해지를 고민하지만 사용량은 높고 월간 할인은 불가
```
Compiled Prompt:
```text
# 작업
해지하려는 고객에게 보낼 답변을 작성한다. 원문 요청 "해지하려는 고객에게 붙잡는 답변 써줘"의 의도를 보존한다. 목표는 "해지 고객 답변"이다.

# 확인된 정보
- 원문 요청: "해지하려는 고객에게 붙잡는 답변 써줘"
- 목표: 해지 고객 답변
- 대상: 고객
- 1줄 맥락: 가격 부담으로 해지를 고민하지만 사용량은 높고 월간 할인은 불가
- 출력 형식: 해지 고객 답변

# 출력 형식
선택된 출력 형식: 해지 고객 답변
- 공감, 해지 사유 확인, 가능한 대안, 다음 액션을 구분한다.
- 무리하게 붙잡기보다 고객 선택권과 신뢰를 해치지 않는 답변으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
- 해지 의사를 존중하고 무리한 설득보다 사유 확인과 선택권을 우선한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 59. customer success check-in email
Draft:
```text
고객 성공 체크인 메일 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `customer_success_checkin`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `customer_success_checkin`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 고객 성공 체크인 메일
- goal: 고객 성공 체크인 메일
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 고객 상태, 사용 맥락, 체크인 목적을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 도입 2주차 고객, 기능 사용률 낮음, 활성화 지원 목적
Assumed Answers:
_No assumed answers._
Context Line:
```text
도입 2주차 고객, 핵심 기능 사용률이 낮아 활성화 지원 목적
```
Compiled Prompt:
```text
# 작업
고객 성공 체크인 메일을 작성한다. 원문 요청 "고객 성공 체크인 메일 써줘"의 의도를 보존한다. 목표는 "고객 성공 체크인 메일"이다.

# 확인된 정보
- 원문 요청: "고객 성공 체크인 메일 써줘"
- 목표: 고객 성공 체크인 메일
- 대상: 고객
- 1줄 맥락: 도입 2주차 고객, 핵심 기능 사용률이 낮아 활성화 지원 목적
- 출력 형식: 고객 성공 체크인 메일

# 출력 형식
선택된 출력 형식: 고객 성공 체크인 메일
- 제목, 체크인 목적, 사용 현황 질문, 지원 제안, 다음 액션을 구분한다.
- 고객이 부담 없이 답할 수 있게 짧고 구체적인 메일로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 60. refund reply paraphrase
Draft:
```text
고객이 결제 취소하고 돈을 돌려달라고 할 때 답장 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `refund_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `refund_reply`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 환불 요청 고객 답변
- goal: 환불 요청 고객 답변
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 환불 정책/상태와 고객 상황을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 7일 환불 기간이 지났지만 첫 결제 고객이라 예외 검토 중
Assumed Answers:
_No assumed answers._
Context Line:
```text
결제 후 3일 내 요청이라 환불 가능성이 높지만 결제수단 확인 필요
```
Compiled Prompt:
```text
# 작업
환불 요청 고객 답변을 작성한다. 원문 요청 "고객이 결제 취소하고 돈을 돌려달라고 할 때 답장 써줘"의 의도를 보존한다. 목표는 "환불 요청 고객 답변"이다.

# 확인된 정보
- 원문 요청: "고객이 결제 취소하고 돈을 돌려달라고 할 때 답장 써줘"
- 목표: 환불 요청 고객 답변
- 대상: 고객
- 1줄 맥락: 결제 후 3일 내 요청이라 환불 가능성이 높지만 결제수단 확인 필요
- 출력 형식: 환불 요청 고객 답변

# 출력 형식
선택된 출력 형식: 환불 요청 고객 답변
- 환불 상태, 정책 근거, 고객 상황 공감, 다음 절차를 구분한다.
- 환불 가능 여부를 모르면 단정하지 말고 확인 필요와 임시 안내를 분리한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 61. churn save paraphrase
Draft:
```text
구독 취소하려는 고객 마음 돌리는 메일 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `churn_save_reply`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `churn_save_reply`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 해지 고객 답변
- goal: 해지 고객 답변
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 해지 사유, 고객 상태, 제안 가능한 대안을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 가격 부담으로 해지 고민, 월간 플랜 할인은 불가하고 사용법 지원 가능
Assumed Answers:
_No assumed answers._
Context Line:
```text
구독 취소 이유는 팀 사용률 저하, 교육 세션 제안 가능
```
Compiled Prompt:
```text
# 작업
해지하려는 고객에게 보낼 답변을 작성한다. 원문 요청 "구독 취소하려는 고객 마음 돌리는 메일 써줘"의 의도를 보존한다. 목표는 "해지 고객 답변"이다.

# 확인된 정보
- 원문 요청: "구독 취소하려는 고객 마음 돌리는 메일 써줘"
- 목표: 해지 고객 답변
- 대상: 고객
- 1줄 맥락: 구독 취소 이유는 팀 사용률 저하, 교육 세션 제안 가능
- 출력 형식: 해지 고객 답변

# 출력 형식
선택된 출력 형식: 해지 고객 답변
- 공감, 해지 사유 확인, 가능한 대안, 다음 액션을 구분한다.
- 무리하게 붙잡기보다 고객 선택권과 신뢰를 해치지 않는 답변으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 62. customer success check-in paraphrase
Draft:
```text
사용 현황 확인용 고객 점검 메일 작성해줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `customer_success_checkin`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `writing_email`
- domainConfidence: `0.89`
- artifactType: `customer_success_checkin`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 고객 성공 체크인 메일
- goal: 고객 성공 체크인 메일
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 고객 상태, 사용 맥락, 체크인 목적을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 도입 2주차 고객, 기능 사용률 낮음, 활성화 지원 목적
Assumed Answers:
_No assumed answers._
Context Line:
```text
월간 리포트 확인 전 사용 현황과 막힌 지점을 묻는 고객 성공 메일
```
Compiled Prompt:
```text
# 작업
고객 성공 체크인 메일을 작성한다. 원문 요청 "사용 현황 확인용 고객 점검 메일 작성해줘"의 의도를 보존한다. 목표는 "고객 성공 체크인 메일"이다.

# 확인된 정보
- 원문 요청: "사용 현황 확인용 고객 점검 메일 작성해줘"
- 목표: 고객 성공 체크인 메일
- 대상: 고객
- 1줄 맥락: 월간 리포트 확인 전 사용 현황과 막힌 지점을 묻는 고객 성공 메일
- 출력 형식: 고객 성공 체크인 메일

# 출력 형식
선택된 출력 형식: 고객 성공 체크인 메일
- 제목, 체크인 목적, 사용 현황 질문, 지원 제안, 다음 액션을 구분한다.
- 고객이 부담 없이 답할 수 있게 짧고 구체적인 메일로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 63. support faq paraphrase
Draft:
```text
자주 받는 고객 문의 Q&A 만들어줘
```
Expected:
- caseSource: `core`
- domainPack: `context_candidate`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `support_faq`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `support_faq`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 고객 지원 FAQ
- goal: 고객 지원 FAQ
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 원본 문의 목록이나 FAQ로 만들 범위를 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 환불, 로그인 오류, 결제수단 변경 문의가 반복됨
Assumed Answers:
_No assumed answers._
Context Line:
```text
자주 받는 문의는 배송 지연, 환불 가능 여부, 계정 로그인 문제
```
Compiled Prompt:
```text
# 작업
고객 지원 FAQ 초안을 작성한다. 원문 요청 "자주 받는 고객 문의 Q&A 만들어줘"의 의도를 보존한다. 목표는 "고객 지원 FAQ"이다.

# 확인된 정보
- 원문 요청: "자주 받는 고객 문의 Q&A 만들어줘"
- 목표: 고객 지원 FAQ
- 대상: 고객
- 1줄 맥락: 자주 받는 문의는 배송 지연, 환불 가능 여부, 계정 로그인 문제
- 출력 형식: 고객 지원 FAQ

# 출력 형식
선택된 출력 형식: 고객 지원 FAQ
- FAQ 카테고리, 질문, 고객용 답변, 필요한 다음 액션을 구분한다.
- 답변은 고객이 바로 이해할 수 있게 짧고 실무적으로 작성한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 64. proposal for customer A
Draft:
```text
A 고객에게 제안서 써줘
```
Expected:
- caseSource: `core`
- domainPack: `context_line_backlog`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write or brief.plan`
- expectedDomain: `not specified`
- expectedArtifactType: `proposal_outline`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.plan`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `proposal_outline`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 제안서 구조
- goal: 제안서 구조
Missing Slots:
- scope
- timeframe
- success_criteria
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 고객 상황과 제안할 내용을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: A 고객의 지원 비용 절감을 위한 CS 자동화 도입 제안
Assumed Answers:
_No assumed answers._
Context Line:
```text
A 고객은 CS 비용 증가가 문제이고, 지원 자동화 도입을 제안하려 함
```
Compiled Prompt:
```text
# 작업
제안서 본문 초안을 작성한다. 원문 요청 "A 고객에게 제안서 써줘"의 의도를 보존한다. 목표는 "고객 상황에 맞는 제안서 초안 작성"이다.

# 확인된 정보
- 원문 요청: "A 고객에게 제안서 써줘"
- 목표: 고객 상황에 맞는 제안서 초안 작성
- 대상: 고객
- 1줄 맥락: A 고객은 CS 비용 증가가 문제이고, 지원 자동화 도입을 제안하려 함
- 출력 형식: 제안서 본문 초안

# 출력 형식
선택된 출력 형식: 제안서 본문 초안
- 목차만 나열하지 말고 바로 다듬어 쓸 수 있는 제안서 본문 초안으로 작성한다.
- 고객 문제, 제안 내용, 기대 효과, 실행 범위, 다음 액션을 구분한다.
- 고객/제안 정보가 부족하면 확인 필요 항목을 분리한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모:
---

## Case 65. outage notice paraphrase
Draft:
```text
점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘
```
Expected:
- caseSource: `core`
- domainPack: `context_line_backlog`
- clarificationMode: `context_line`
- shouldShowClarify: `true`
- expectedTaskType: `brief.write`
- expectedDomain: `generic`
- expectedArtifactType: `outage_notice`
Actual:
- shouldShowClarify: `true`
- taskType: `brief.write`
- domain: `generic`
- domainConfidence: `0.00`
- artifactType: `outage_notice`
- needsContextLine: `true`
Filled Slots:
- audience: 고객
- output_format: 서비스 장애 공지
- goal: 서비스 장애 공지
Missing Slots:
- tone
- scope
- style
- constraints
Suggested Slots:
- context_line
Questions:
### Q1. 영향 범위, 현재 상태, 다음 업데이트 시점을 한 줄로 알려주세요.

- inputType: `context_line`
- placeholder: 예: 로그인 장애가 30분째 지속, 일부 계정 영향, 1시간 뒤 업데이트
Assumed Answers:
_No assumed answers._
Context Line:
```text
예정 점검으로 23시부터 30분간 접속 불가, 완료 후 공지 예정
```
Compiled Prompt:
```text
# 작업
예정된 점검/접속 제한 안내문을 작성한다. 원문 요청 "점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘"의 의도를 보존한다. 목표는 "예정 점검과 접속 제한을 고객에게 사전 안내하기"이다.

# 확인된 정보
- 원문 요청: "점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘"
- 목표: 예정 점검과 접속 제한을 고객에게 사전 안내하기
- 대상: 고객
- 1줄 맥락: 예정 점검으로 23시부터 30분간 접속 불가, 완료 후 공지 예정
- 출력 형식: 점검/접속 제한 사전 안내문

# 출력 형식
선택된 출력 형식: 점검/접속 제한 사전 안내문
- 점검 목적, 예정 시간, 영향 범위, 고객이 알아야 할 사항, 완료 후 안내 계획을 구분한다.
- 비계획 장애 사과문처럼 쓰지 말고 사전 안내와 협조 요청 중심으로 작성한다.
- 예정된 사실과 확인 필요 항목을 분리한다.

# 주의할 점
- 모르는 정보는 가정으로 표시한다.
- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.
- 선택한 조건을 우선 반영한다.
- 바로 사용할 수 있는 형태로 작성한다.
- 고객이 이해하기 쉬운 표현을 사용한다.
```
Human Review:
- 명확성 1~5:
- 사용자 의도 반영 1~5:
- 실행 가능성 1~5:
- 과도하게 장황한가 1~5:
- ChatGPT에 넣고 싶은가 1~5:
- 수정 메모: