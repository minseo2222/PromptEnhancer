# Domain Expansion Report

## Summary
- core cases: 43
- candidate cases: 10
- candidate status: active
- judge source: freshly generated
- total cases: 53
- decision: REJECT
- partial promotion status: NOT_READY
- needs_context risk: BLOCKING_CONTEXT_RISK

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 29 | 37 | 8 |
| FIX | 14 | 6 | -8 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 3.88 | 4.12 | 0.24 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=-0.24)
- PASS: core PASS count did not decrease

## Candidate Pack Results

| Metric | Value |
| --- | --- |
| cases | 10 |
| PASS | 1 |
| FIX | 3 |
| KILL | 6 |
| P0 | 6 |
| average userWouldInsert | 1.8 |
| multiple_choice average | 1.4 |
| promotion_ready average | 1.33 |
| needs_patch average | 1.5 |
| needs_context average | 1.5 |
| suppress_regression average | 5 |
| needs_context ratio | 0.4 |
| UX_GAP | YES |

Candidate gates:

- FAIL: candidate multiple_choice KILL must be 0 (multiple_choice=5)
- FAIL: candidate P0 must be 0 (current=6)
- FAIL: candidate average >= minCandidateAverage (avg=1.8)
- FAIL: multiple_choice average >= minMultipleChoiceAverage (avg=1.4)

KILL/P0 list:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 44. delayed delivery complaint reply | customer_support | KILL | 1 | P0 | 배송 지연 고객 불만 답변 써줘 |
| 45. refund request response | customer_support | KILL | 1 | P0 | 환불 요청 고객 답변 써줘 |
| 46. service outage notice | customer_support | KILL | 1 | P0 | 서비스 장애 공지 초안 써줘 |
| 48. new customer onboarding guide | customer_support | KILL | 1 | P0 | 신규 고객 온보딩 문서 만들어줘 |
| 51. churn save reply | customer_support | KILL | 1 | P0 | 해지하려는 고객에게 붙잡는 답변 써줘 |
| 52. vip escalation response plan | customer_support | KILL | 1 | P0 | VIP 고객 클레임 대응 초안 써줘 |

Lowest 10 cases:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 44. delayed delivery complaint reply | customer_support | KILL | 1 | P0 | 배송 지연 고객 불만 답변 써줘 |
| 45. refund request response | customer_support | KILL | 1 | P0 | 환불 요청 고객 답변 써줘 |
| 46. service outage notice | customer_support | KILL | 1 | P0 | 서비스 장애 공지 초안 써줘 |
| 48. new customer onboarding guide | customer_support | KILL | 1 | P0 | 신규 고객 온보딩 문서 만들어줘 |
| 51. churn save reply | customer_support | KILL | 1 | P0 | 해지하려는 고객에게 붙잡는 답변 써줘 |
| 52. vip escalation response plan | customer_support | KILL | 1 | P0 | VIP 고객 클레임 대응 초안 써줘 |
| 47. support faq draft | customer_support | FIX | 2 | P1 | 고객 지원 FAQ 초안 써줘 |
| 49. refund policy support manual | customer_support | FIX | 2 | P1 | 환불 정책 CS 응대 매뉴얼 만들어줘 |
| 53. customer success check-in email | customer_support | FIX | 3 | P1 | 고객 성공 체크인 메일 써줘 |
| 50. empathetic rewrite suppression | customer_support | PASS | 5 | P2 | 이 문장 고객에게 더 공감 있게 바꿔줘 |

## Domain Pack Breakdown

| domainPack | cases | PASS | FIX | KILL | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- |
| customer_support | 10 | 1 | 3 | 6 | 1.8 | FLAGGED |

## Clarification Mode Breakdown

| clarificationMode | cases | PASS | FIX | KILL | avg insert |
| --- | --- | --- | --- | --- | --- |
| multiple_choice | 5 | 0 | 2 | 3 | 1.4 |
| needs_context | 4 | 0 | 1 | 3 | 1.5 |
| suppress | 1 | 1 | 0 | 0 | 5 |

## Promotion Group Breakdown

| promotionGroup | cases | PASS | FIX | KILL | P0 | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| needs_context | 4 | 0 | 1 | 3 | 3 | 1.5 | BLOCKING_CONTEXT_RISK |
| needs_patch | 2 | 0 | 1 | 1 | 1 | 1.5 | PATCH_REQUIRED |
| promotion_ready | 3 | 0 | 1 | 2 | 2 | 1.33 | PATCH_REQUIRED |
| suppress_regression | 1 | 1 | 0 | 0 | 0 | 5 | KEEP_AS_REGRESSION |

## Manual Promotion Candidates

No manual promotion candidates.

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
| 47. support faq draft | 고객 지원 FAQ 초안 써줘 | FIX | 2 | Add support_faq classification and questions for topic scope, audience, and FAQ format. |
| 52. vip escalation response plan | VIP 고객 클레임 대응 초안 써줘 | KILL | 1 | Add vip_complaint_reply or escalation_response artifact handling with severity, ownership, response tone, and resolution-boundary slots. |

## Recurring Problems
- Customer-support candidate cases fall back to generic document/write handling and lose refund, outage, FAQ, churn, and VIP complaint specificity.
- Default-answer ranking sometimes contradicts explicit draft signals, especially 배송 지연 and 신규 고객.
- Several high-context tasks ask meta multiple-choice questions instead of collecting the actual missing content needed to answer safely.
- Write/email cases often ask tone first while missing substantive fields such as metrics, dates, policy, reason, offer, or outcome.

## Recommended Next Action
- Patch candidate cases that fall below gates, then rerun the expansion cycle.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
