# Preview Judge Report

## Summary
- total cases: 53
- PASS count: 38
- FIX count: 9
- KILL count: 6
- average userWouldInsert score: 3.68
- recommended next action: Fix explicit-signal ranking and add customer-support artifact templates before promoting more candidate cases.

## Top Problems
- Customer-support candidate cases fall back to generic document/write handling and lose refund, outage, FAQ, churn, and VIP complaint specificity.
- Default-answer ranking sometimes contradicts explicit draft signals, especially 배송 지연 and 신규 고객.
- Several high-context tasks ask meta multiple-choice questions instead of collecting the actual missing content needed to answer safely.
- Write/email cases often ask tone first while missing substantive fields such as metrics, dates, policy, reason, offer, or outcome.

## P0 Fixes
| Case | Source | Domain Pack | Draft | Problem | Recommended Fix | Target File |
| --- | --- | --- | --- | --- | --- | --- |
| 44. delayed delivery complaint reply | candidate | customer_support | 배송 지연 고객 불만 답변 써줘 | The draft explicitly says 배송 지연, but the assumed answer and compiled prompt select 서비스 장애/오류.<br>This contradiction would immediately reduce user trust.<br>The correct option exists but default ranking fails to preserve the explicit signal. | Rank 배송/일정 지연 first when the draft contains 배송 지연, 일정 지연, delivery delay, or similar terms. | See Patch Plan |
| 45. refund request response | candidate | customer_support | 환불 요청 고객 답변 써줘 | Clarify asks generic tone and scope questions instead of refund outcome, policy, reason, or next step.<br>Scope options like 4주 실행 계획 are inappropriate for a customer refund reply.<br>The artifact is not classified as a refund/support response. | Add a refund_reply artifact with questions for approve/deny/needs-review, policy basis, customer situation, and desired resolution. | See Patch Plan |
| 46. service outage notice | candidate | customer_support | 서비스 장애 공지 초안 써줘 | Service outage notice is routed to generic_document.<br>Questions about document purpose and generic format are noisy for an incident notice.<br>The prompt misses incident status, affected users, impact, timing, workaround, and apology/update cadence. | Add an outage_notice artifact with incident-specific questions and an output contract for impact, status, workaround, next update, and apology language. | See Patch Plan |
| 48. new customer onboarding guide | candidate | customer_support | 신규 고객 온보딩 문서 만들어줘 | The draft explicitly says 신규 고객, but the assumed answer selects 신규 직원.<br>Compiled prompt contains conflicting confirmed info: 대상 고객 and 온보딩 대상 신규 직원.<br>This is a direct intent regression. | Rank 신규 고객 first when onboarding drafts contain 고객, and avoid asking an already explicit audience unless needed. | See Patch Plan |
| 51. churn save reply | candidate | customer_support | 해지하려는 고객에게 붙잡는 답변 써줘 | Generic tone/scope questions do not fit a churn-save customer reply.<br>The prompt does not ask cancellation reason, acceptable offer, retention boundary, or ethical tone.<br>Scope options are irrelevant and noisy for a customer message. | Add a churn_save_reply artifact with questions for cancellation reason, retention goal, offer boundary, and empathy-first framing. | See Patch Plan |
| 52. vip escalation response plan | candidate | customer_support | VIP 고객 클레임 대응 초안 써줘 | VIP complaint handling falls back to generic_document.<br>Questions do not ask claim type, severity, escalation owner, compensation boundary, or response channel.<br>The compiled prompt loses the urgency and risk profile of VIP escalation. | Add vip_complaint_reply or escalation_response artifact handling with severity, ownership, response tone, and resolution-boundary slots. | See Patch Plan |

## Case Scores
| Case | Source | Domain Pack | Mode | Verdict | Clarity | Intent Fit | Question | Options | Prompt | Compactness | Insert Score | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. marketing strategy plan | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 4 | 4 | P2 |
| 2. launch plan | core | generic | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 4 | 4 | P2 |
| 3. new feature prd | core | product_pm | multiple_choice | FIX | 4 | 4 | 3 | 4 | 3 | 4 | 3 | P1 |
| 4. competitor analysis | core | founder_strategy | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 4 | 4 | P2 |
| 5. conversion rate diagnosis | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 4 | 4 | P2 |
| 6. option pros cons comparison | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 7. investor update email | core | sales_bd | multiple_choice | FIX | 4 | 4 | 2 | 2 | 3 | 5 | 3 | P1 |
| 8. customer price increase email | core | customer_support | multiple_choice | FIX | 4 | 4 | 2 | 2 | 3 | 5 | 3 | P1 |
| 9. ai productivity market research | core | founder_strategy | multiple_choice | PASS | 5 | 5 | 4 | 4 | 4 | 4 | 4 | P2 |
| 10. chrome extension trend research | core | founder_strategy | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 4 | 4 | P2 |
| 11. personal prioritization | core | internal_ops | multiple_choice | FIX | 4 | 4 | 3 | 3 | 3 | 4 | 3 | P1 |
| 12. weekly priority | core | internal_ops | multiple_choice | FIX | 4 | 4 | 3 | 3 | 3 | 4 | 3 | P1 |
| 13. choose between a and b | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 14. campaign ideas | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 15. service name ideas | core | generic | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 16. summarize key points | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 17. organize as table | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 18. hello | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 19. translate sentence | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 20. fix spelling | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 21. short summary | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 22. organize means decide | core | generic | multiple_choice | FIX | 4 | 4 | 3 | 3 | 3 | 4 | 3 | P1 |
| 23. organize means extract | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 24. organize means plan | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 4 | 5 | 4 | 4 | 4 | P2 |
| 25. generic job posting | core | hr_recruiting | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 26. generic meeting agenda | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 27. generic customer interview questions | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 28. generic presentation structure | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 29. generic lecture curriculum | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 30. generic cs response manual | core | customer_support | multiple_choice | PASS | 5 | 5 | 4 | 4 | 4 | 5 | 4 | P2 |
| 31. generic onboarding document | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 32. generic youtube planning doc | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 33. generic blog outline | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 34. generic survey questions | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 35. generic idea pros cons analysis | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 36. generic team retrospective questions | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 37. generic handoff document | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 38. generic customer complaint reply | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 39. generic proposal structure | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 40. partnership proposal outline | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 41. demo meeting agenda | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 42. salesy rewrite suppression | core | sales_bd | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 43. price negotiation reply | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 44. delayed delivery complaint reply | candidate | customer_support | multiple_choice | KILL | 2 | 1 | 3 | 3 | 1 | 5 | 1 | P0 |
| 45. refund request response | candidate | customer_support | needs_context | KILL | 2 | 2 | 1 | 1 | 2 | 5 | 1 | P0 |
| 46. service outage notice | candidate | customer_support | needs_context | KILL | 2 | 2 | 1 | 1 | 2 | 5 | 1 | P0 |
| 47. support faq draft | candidate | customer_support | multiple_choice | FIX | 3 | 3 | 2 | 1 | 2 | 5 | 2 | P1 |
| 48. new customer onboarding guide | candidate | customer_support | multiple_choice | KILL | 2 | 1 | 3 | 4 | 1 | 5 | 1 | P0 |
| 49. refund policy support manual | candidate | customer_support | multiple_choice | FIX | 4 | 3 | 3 | 3 | 3 | 5 | 2 | P1 |
| 50. empathetic rewrite suppression | candidate | customer_support | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 51. churn save reply | candidate | customer_support | needs_context | KILL | 2 | 2 | 1 | 1 | 2 | 5 | 1 | P0 |
| 52. vip escalation response plan | candidate | customer_support | multiple_choice | KILL | 2 | 2 | 1 | 1 | 2 | 5 | 1 | P0 |
| 53. customer success check-in email | candidate | customer_support | needs_context | FIX | 4 | 4 | 2 | 2 | 3 | 5 | 3 | P1 |

## Patch Plan
| Priority | Target File | Issue | Suggested Change | Affected Cases |
| --- | --- | --- | --- | --- |
| P0 | src/core/ruleEngine.js | Explicit draft signals are not always reflected in default answer ranking. | Add ranking candidates for complaint_reply 배송/일정 지연 and onboarding_doc 신규 고객/신규 사용자 so assumed answers cannot contradict explicit text. | 44, 48 |
| P0 | src/core/templates.js | Customer-support candidate tasks are routed through generic_document or generic write templates. | Add artifact templates and output contracts for refund replies, outage notices, churn-save replies, VIP complaint/escalation replies, support FAQs, and customer-success check-in emails. | 45, 46, 47, 51, 52, 53 |
| P1 | src/core/ruleEngine.js | Artifact classification misses common customer-support phrases. | Extend classifyArtifactType and intent-question routing for 환불 요청, 서비스 장애 공지, 고객 지원 FAQ, 해지하려는 고객, VIP 고객 클레임, and 고객 성공 체크인. | 45, 46, 47, 51, 52, 53 |
| P1 | src/core/briefCompiler.js | Compiled prompts for high-context tasks may proceed without the actual content needed to answer safely. | Use context-first prompts or unresolved-slot handling for bare PRD and prioritization requests that lack the actual feature, problem, or task list. | 3, 11, 12, 22 |
| P1 | src/core/templates.js | Email/write clarification over-prioritizes tone for sensitive business communications. | Add intent-specific questions for investor updates and price-increase notices before generic tone selection. | 7, 8 |

## Review Policy
This report is an automated judge result. Final product decisions must still be validated through external user testing.
