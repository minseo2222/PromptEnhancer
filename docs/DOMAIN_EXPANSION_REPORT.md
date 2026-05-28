# Domain Expansion Report

## Summary
- core cases: 43
- candidate cases: 16
- candidate status: active
- judge source: freshly generated
- total cases: 59
- decision: REJECT
- partial promotion status: NOT_READY
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 29 | 31 | 2 |
| FIX | 14 | 12 | -2 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 3.88 | 3.74 | -0.14 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- FAIL: core average drop <= maxAverageDrop (drop=0.14)
- PASS: core PASS count did not decrease

## Candidate Pack Results

| Metric | Value |
| --- | --- |
| cases | 16 |
| PASS | 12 |
| FIX | 4 |
| KILL | 0 |
| P0 | 0 |
| average userWouldInsert | 3.81 |
| multiple_choice average | 3.57 |
| promotion_ready average | 3.67 |
| needs_patch average | 3.5 |
| needs_context average | 3.88 |
| suppress_regression average | 5 |
| needs_context ratio | 0.5 |
| UX_GAP | YES |

Candidate gates:

- PASS: candidate multiple_choice KILL must be 0 (multiple_choice=7)
- PASS: candidate P0 must be 0 (current=0)
- PASS: candidate average >= minCandidateAverage (avg=3.81)
- FAIL: multiple_choice average >= minMultipleChoiceAverage (avg=3.57)

KILL/P0 list:

No cases.

Lowest 10 cases:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 47. support faq draft | customer_support | FIX | 3 | P1 | 고객 지원 FAQ 초안 써줘 |
| 48. new customer onboarding guide | customer_support | FIX | 3 | P2 | 신규 고객 온보딩 문서 만들어줘 |
| 58. customer success check-in paraphrase | customer_support | FIX | 3 | P2 | 사용 현황 확인용 고객 점검 메일 작성해줘 |
| 59. support faq paraphrase | customer_support | FIX | 3 | P1 | 자주 받는 고객 문의 Q&A 만들어줘 |
| 44. delayed delivery complaint reply | customer_support | PASS | 4 | P2 | 배송 지연 고객 불만 답변 써줘 |
| 45. refund request response | customer_support | PASS | 4 | P2 | 환불 요청 고객 답변 써줘 |
| 46. service outage notice | customer_support | PASS | 4 | P2 | 서비스 장애 공지 초안 써줘 |
| 49. refund policy support manual | customer_support | PASS | 4 | P2 | 환불 정책 CS 응대 매뉴얼 만들어줘 |
| 51. churn save reply | customer_support | PASS | 4 | P2 | 해지하려는 고객에게 붙잡는 답변 써줘 |
| 52. vip escalation response plan | customer_support | PASS | 4 | P2 | VIP 고객 클레임 대응 초안 써줘 |

## Domain Pack Breakdown

| domainPack | cases | PASS | FIX | KILL | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- |
| customer_support | 16 | 12 | 4 | 0 | 3.81 | OK |

## Clarification Mode Breakdown

| clarificationMode | cases | PASS | FIX | KILL | avg insert |
| --- | --- | --- | --- | --- | --- |
| multiple_choice | 7 | 4 | 3 | 0 | 3.57 |
| needs_context | 8 | 7 | 1 | 0 | 3.88 |
| suppress | 1 | 1 | 0 | 0 | 5 |

## Promotion Group Breakdown

| promotionGroup | cases | PASS | FIX | KILL | P0 | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| needs_context | 8 | 7 | 1 | 0 | 0 | 3.88 | DOCUMENT_LIMITATION |
| needs_patch | 4 | 2 | 2 | 0 | 0 | 3.5 | PATCH_LIGHT |
| promotion_ready | 3 | 2 | 1 | 0 | 0 | 3.67 | REVIEW_OR_PATCH |
| suppress_regression | 1 | 1 | 0 | 0 | 0 | 5 | KEEP_AS_REGRESSION |

## Manual Promotion Candidates

| Case | Draft | promotionGroup | Verdict | Insert Score | Note |
| --- | --- | --- | --- | --- | --- |
| 44. delayed delivery complaint reply | 배송 지연 고객 불만 답변 써줘 | promotion_ready | PASS | 4 | promotion_ready, PASS, insert score >= 4 |
| 49. refund policy support manual | 환불 정책 CS 응대 매뉴얼 만들어줘 | promotion_ready | PASS | 4 | promotion_ready, PASS, insert score >= 4 |

## Context-required Backlog

| Case | Draft | Reason | Suggested Future UX |
| --- | --- | --- | --- |
| 45. refund request response | 환불 요청 고객 답변 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 46. service outage notice | 서비스 장애 공지 초안 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 51. churn save reply | 해지하려는 고객에게 붙잡는 답변 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 53. customer success check-in email | 고객 성공 체크인 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 54. refund reply paraphrase | 고객이 결제 취소하고 돈을 돌려달라고 할 때 답장 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 55. outage notice paraphrase | 점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 56. churn save paraphrase | 구독 취소하려는 고객 마음 돌리는 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 58. customer success check-in paraphrase | 사용 현황 확인용 고객 점검 메일 작성해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |

## Needs Patch Cases

| Case | Draft | Verdict | Insert Score | Recommended Fix |
| --- | --- | --- | --- | --- |
| 47. support faq draft | 고객 지원 FAQ 초안 써줘 | FIX | 3 | Ask whether source inquiries are available, or instruct the model to produce a category template with placeholders rather than invented Q&A. |
| 52. vip escalation response plan | VIP 고객 클레임 대응 초안 써줘 | PASS | 4 | No change. |
| 57. vip escalation paraphrase | 중요 고객 항의에 긴급 대응 메일 초안 써줘 | PASS | 4 | No change. |
| 59. support faq paraphrase | 자주 받는 고객 문의 Q&A 만들어줘 | FIX | 3 | Ask for the inquiry list/source or produce a FAQ template with placeholders and 확인 필요 sections. |

## Recurring Problems
- Several previews ask generic or secondary questions while missing the core subject/context needed to produce a useful result.
- Some assumed defaults are arbitrary and can change the user's intent, especially for open-ended artifact requests.
- High-stakes email/support cases sometimes ask tone first instead of policy, status, content, or effective-date details.
- Personal prioritization prompts do not ask for the actual task list/options before prioritizing.
- Compiled prompts are often heavier than needed and occasionally add domain boilerplate that does not fit the specific task.

## Recommended Next Action
- Patch candidate cases that fall below gates, then rerun the expansion cycle.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
