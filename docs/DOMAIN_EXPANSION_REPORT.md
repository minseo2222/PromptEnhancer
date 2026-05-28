# Domain Expansion Report

## Summary
- core cases: 48
- candidate cases: 17
- candidate status: active
- judge source: freshly generated
- total cases: 65
- decision: PROMOTE
- partial promotion status: NOT_READY
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 36 | 42 | 6 |
| FIX | 12 | 6 | -6 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 3.79 | 4.04 | 0.25 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=-0.25)
- PASS: core PASS count did not decrease

## Candidate Pack Results

| Metric | Value |
| --- | --- |
| cases | 17 |
| PASS | 15 |
| FIX | 2 |
| KILL | 0 |
| P0 | 0 |
| average userWouldInsert | 4.65 |
| multiple_choice average | 0 |
| promotion_ready average | 0 |
| needs_patch average | 0 |
| needs_context average | 4.65 |
| suppress_regression average | 0 |
| needs_context ratio | 1 |
| UX_GAP | YES |

Candidate gates:

- PASS: candidate multiple_choice KILL must be 0 (multiple_choice=0)
- PASS: candidate P0 must be 0 (current=0)
- PASS: candidate average >= minCandidateAverage (avg=4.65)
- PASS: multiple_choice average >= minMultipleChoiceAverage (avg=0)

KILL/P0 list:

No cases.

Lowest 10 cases:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 54. proposal for customer A | context_candidate | FIX | 3 | P1 | A 고객에게 제안서 써줘 |
| 62. outage notice paraphrase | context_candidate | FIX | 3 | P1 | 점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘 |
| 51. prospect objections analysis | context_candidate | PASS | 4 | P2 | 잠재 고객 objections 정리해줘 |
| 53. sales collateral for our product | context_candidate | PASS | 4 | P2 | 우리 제품 세일즈 자료 만들어줘 |
| 49. sales call script | context_candidate | PASS | 5 | P2 | 세일즈 콜 스크립트 써줘 |
| 50. cold email draft | context_candidate | PASS | 5 | P2 | 콜드메일 작성해줘 |
| 52. sales follow-up email | context_candidate | PASS | 5 | P2 | 영업 후속 메일 써줘 |
| 55. refund request response | context_candidate | PASS | 5 | P2 | 환불 요청 고객 답변 써줘 |
| 56. service outage notice | context_candidate | PASS | 5 | P2 | 서비스 장애 공지 초안 써줘 |
| 57. support faq draft | context_candidate | PASS | 5 | P2 | 고객 지원 FAQ 초안 써줘 |

## Domain Pack Breakdown

| domainPack | cases | PASS | FIX | KILL | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- |
| context_candidate | 17 | 15 | 2 | 0 | 4.65 | OK |

## Clarification Mode Breakdown

| clarificationMode | cases | PASS | FIX | KILL | avg insert |
| --- | --- | --- | --- | --- | --- |
| context_line | 17 | 15 | 2 | 0 | 4.65 |

## Promotion Group Breakdown

| promotionGroup | cases | PASS | FIX | KILL | P0 | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| needs_context | 17 | 15 | 2 | 0 | 0 | 4.65 | DOCUMENT_LIMITATION |

## Manual Promotion Candidates

No manual promotion candidates.

## Context-required Backlog

| Case | Draft | Reason | Suggested Future UX |
| --- | --- | --- | --- |
| 49. sales call script | 세일즈 콜 스크립트 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 50. cold email draft | 콜드메일 작성해줘 | 제품/오퍼/대상 고객이 없으면 품질 제한 | optional one-line offer/context field |
| 51. prospect objections analysis | 잠재 고객 objections 정리해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 52. sales follow-up email | 영업 후속 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 53. sales collateral for our product | 우리 제품 세일즈 자료 만들어줘 | 제품/대상 고객/오퍼 정보가 필요 | one-line product/context input |
| 54. proposal for customer A | A 고객에게 제안서 써줘 | 고객 상황/제안 내용이 필요 | one-line customer/context input |
| 55. refund request response | 환불 요청 고객 답변 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 56. service outage notice | 서비스 장애 공지 초안 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 57. support faq draft | 고객 지원 FAQ 초안 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 58. new customer onboarding guide | 신규 고객 온보딩 문서 만들어줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 59. churn save reply | 해지하려는 고객에게 붙잡는 답변 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 60. customer success check-in email | 고객 성공 체크인 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 61. refund reply paraphrase | 고객이 결제 취소하고 돈을 돌려달라고 할 때 답장 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 62. outage notice paraphrase | 점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 63. churn save paraphrase | 구독 취소하려는 고객 마음 돌리는 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 64. customer success check-in paraphrase | 사용 현황 확인용 고객 점검 메일 작성해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 65. support faq paraphrase | 자주 받는 고객 문의 Q&A 만들어줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |

## Needs Patch Cases

No needs_patch cases.

## Recurring Problems
- High-context tasks sometimes ask categorical multiple-choice questions instead of collecting the actual feature, service, or task list needed for a useful result.
- Some artifact compilers lose explicit output intent, especially email draft vs generic response and proposal draft vs outline.
- Planned maintenance is routed through outage wording, which can distort a scheduled customer notice.

## Recommended Next Action
- Patch candidate cases that fall below gates, then rerun the expansion cycle.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
