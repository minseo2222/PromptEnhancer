# Domain Expansion Report

## Summary
- core cases: 43
- candidate cases: 10
- candidate status: active
- judge source: freshly generated
- total cases: 53
- decision: PARTIAL_PROMOTE_READY
- partial promotion status: ELIGIBLE
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 29 | 35 | 6 |
| FIX | 14 | 8 | -6 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 3.88 | 4.37 | 0.49 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=-0.49)
- PASS: core PASS count did not decrease

## Candidate Pack Results

| Metric | Value |
| --- | --- |
| cases | 10 |
| PASS | 10 |
| FIX | 0 |
| KILL | 0 |
| P0 | 0 |
| average userWouldInsert | 5 |
| multiple_choice average | 5 |
| promotion_ready average | 5 |
| needs_patch average | 5 |
| needs_context average | 5 |
| suppress_regression average | 5 |
| needs_context ratio | 0.4 |
| UX_GAP | YES |

Candidate gates:

- PASS: candidate multiple_choice KILL must be 0 (multiple_choice=5)
- PASS: candidate P0 must be 0 (current=0)
- PASS: candidate average >= minCandidateAverage (avg=5)
- PASS: multiple_choice average >= minMultipleChoiceAverage (avg=5)

KILL/P0 list:

No cases.

Lowest 10 cases:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 44. delayed delivery complaint reply | customer_support | PASS | 5 | P2 | 배송 지연 고객 불만 답변 써줘 |
| 45. refund request response | customer_support | PASS | 5 | P2 | 환불 요청 고객 답변 써줘 |
| 46. service outage notice | customer_support | PASS | 5 | P2 | 서비스 장애 공지 초안 써줘 |
| 47. support faq draft | customer_support | PASS | 5 | P2 | 고객 지원 FAQ 초안 써줘 |
| 48. new customer onboarding guide | customer_support | PASS | 5 | P2 | 신규 고객 온보딩 문서 만들어줘 |
| 49. refund policy support manual | customer_support | PASS | 5 | P2 | 환불 정책 CS 응대 매뉴얼 만들어줘 |
| 50. empathetic rewrite suppression | customer_support | PASS | 5 | P2 | 이 문장 고객에게 더 공감 있게 바꿔줘 |
| 51. churn save reply | customer_support | PASS | 5 | P2 | 해지하려는 고객에게 붙잡는 답변 써줘 |
| 52. vip escalation response plan | customer_support | PASS | 5 | P2 | VIP 고객 클레임 대응 초안 써줘 |
| 53. customer success check-in email | customer_support | PASS | 5 | P2 | 고객 성공 체크인 메일 써줘 |

## Domain Pack Breakdown

| domainPack | cases | PASS | FIX | KILL | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- |
| customer_support | 10 | 10 | 0 | 0 | 5 | OK |

## Clarification Mode Breakdown

| clarificationMode | cases | PASS | FIX | KILL | avg insert |
| --- | --- | --- | --- | --- | --- |
| multiple_choice | 5 | 5 | 0 | 0 | 5 |
| needs_context | 4 | 4 | 0 | 0 | 5 |
| suppress | 1 | 1 | 0 | 0 | 5 |

## Promotion Group Breakdown

| promotionGroup | cases | PASS | FIX | KILL | P0 | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| needs_context | 4 | 4 | 0 | 0 | 0 | 5 | DOCUMENT_LIMITATION |
| needs_patch | 2 | 2 | 0 | 0 | 0 | 5 | PATCH_LIGHT |
| promotion_ready | 3 | 3 | 0 | 0 | 0 | 5 | PROMOTE_CANDIDATE |
| suppress_regression | 1 | 1 | 0 | 0 | 0 | 5 | KEEP_AS_REGRESSION |

## Manual Promotion Candidates

| Case | Draft | promotionGroup | Verdict | Insert Score | Note |
| --- | --- | --- | --- | --- | --- |
| 44. delayed delivery complaint reply | 배송 지연 고객 불만 답변 써줘 | promotion_ready | PASS | 5 | promotion_ready, PASS, insert score >= 4 |
| 48. new customer onboarding guide | 신규 고객 온보딩 문서 만들어줘 | promotion_ready | PASS | 5 | promotion_ready, PASS, insert score >= 4 |
| 49. refund policy support manual | 환불 정책 CS 응대 매뉴얼 만들어줘 | promotion_ready | PASS | 5 | promotion_ready, PASS, insert score >= 4 |

## Context-required Backlog

| Case | Draft | Reason | Suggested Future UX |
| --- | --- | --- | --- |
| 45. refund request response | 환불 요청 고객 답변 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 46. service outage notice | 서비스 장애 공지 초안 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 51. churn save reply | 해지하려는 고객에게 붙잡는 답변 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 53. customer success check-in email | 고객 성공 체크인 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |

## Needs Patch Cases

| Case | Draft | Verdict | Insert Score | Recommended Fix |
| --- | --- | --- | --- | --- |
| 47. support faq draft | 고객 지원 FAQ 초안 써줘 | PASS | 5 |  |
| 52. vip escalation response plan | VIP 고객 클레임 대응 초안 써줘 | PASS | 5 |  |

## Recurring Problems
- Broad strategy, writing, and naming cases sometimes ask for tone or format before the missing factual context needed for a trustworthy answer.
- A few compiled prompts can proceed with generic assumptions when the actual object, category, feature, or content is still undefined.
- The weekly prioritization prompt over-injects a today-oriented action and dilutes the selected decision criterion.

## Recommended Next Action
- Manually review promotion_ready candidates for core promotion, document needs_context cases, and patch needs_patch cases.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
