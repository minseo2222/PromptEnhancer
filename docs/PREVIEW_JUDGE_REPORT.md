# Preview Judge Report

## Summary
- total cases: 65
- PASS count: 57
- FIX count: 8
- KILL count: 0
- average userWouldInsert score: 4.2
- recommended next action: Patch the recurring high-context and artifact-format issues, regenerate docs/PREVIEW_REVIEW.md, then rerun schema and encoding validation.

## Top Problems
- High-context tasks sometimes ask categorical multiple-choice questions instead of collecting the actual feature, service, or task list needed for a useful result.
- Some artifact compilers lose explicit output intent, especially email draft vs generic response and proposal draft vs outline.
- Planned maintenance is routed through outage wording, which can distort a scheduled customer notice.

## P0 Fixes
No P0 fixes reported.

## Case Scores
| Case | Source | Domain Pack | Mode | Verdict | Clarity | Intent Fit | Question | Options | Prompt | Compactness | Insert Score | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. marketing strategy plan | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 2. launch plan | core | generic | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 3. new feature prd | core | product_pm | multiple_choice | FIX | 4 | 3 | 3 | 2 | 3 | 4 | 3 | P1 |
| 4. competitor analysis | core | founder_strategy | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 5. conversion rate diagnosis | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 5 | 5 | 4 | 4 | 4 | P2 |
| 6. option pros cons comparison | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 7. investor update email | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 8. customer price increase email | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 9. ai productivity market research | core | founder_strategy | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 10. chrome extension trend research | core | founder_strategy | multiple_choice | PASS | 4 | 5 | 5 | 5 | 4 | 4 | 4 | P2 |
| 11. personal prioritization | core | internal_ops | multiple_choice | FIX | 3 | 3 | 2 | 2 | 2 | 4 | 2 | P1 |
| 12. weekly priority | core | internal_ops | multiple_choice | FIX | 3 | 3 | 2 | 2 | 2 | 4 | 2 | P1 |
| 13. choose between a and b | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 14. campaign ideas | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 15. service name ideas | core | generic | multiple_choice | FIX | 3 | 3 | 3 | 2 | 2 | 5 | 2 | P1 |
| 16. summarize key points | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 17. organize as table | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 18. hello | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 19. translate sentence | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 20. fix spelling | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 21. short summary | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 22. organize means decide | core | generic | multiple_choice | FIX | 3 | 3 | 2 | 2 | 2 | 4 | 2 | P1 |
| 23. organize means extract | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 24. organize means plan | core | gtm_marketing | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 4 | 4 | P2 |
| 25. generic job posting | core | hr_recruiting | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 26. generic meeting agenda | core | internal_ops | multiple_choice | PASS | 4 | 4 | 5 | 5 | 4 | 5 | 4 | P2 |
| 27. generic customer interview questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 28. generic presentation structure | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 29. generic lecture curriculum | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 30. generic cs response manual | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 31. generic onboarding document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 32. generic youtube planning doc | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 33. generic blog outline | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 34. generic survey questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 35. generic idea pros cons analysis | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 36. generic team retrospective questions | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 37. generic handoff document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 38. generic customer complaint reply | core | customer_support | multiple_choice | PASS | 4 | 4 | 5 | 5 | 4 | 5 | 4 | P2 |
| 39. generic proposal structure | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 40. partnership proposal outline | core | sales_bd | multiple_choice | PASS | 4 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 41. demo meeting agenda | core | sales_bd | multiple_choice | PASS | 4 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 42. salesy rewrite suppression | core | sales_bd | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 43. price negotiation reply | core | sales_bd | multiple_choice | PASS | 4 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 44. empathetic rewrite suppression | core | customer_support | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 45. delayed delivery complaint reply | core | customer_support | multiple_choice | PASS | 4 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 46. refund policy support manual | core | customer_support | multiple_choice | PASS | 4 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 47. vip escalation response plan | core | customer_support | multiple_choice | PASS | 4 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 48. vip escalation paraphrase | core | customer_support | multiple_choice | FIX | 4 | 3 | 4 | 4 | 3 | 5 | 3 | P1 |
| 49. sales call script | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 50. cold email draft | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 51. prospect objections analysis | candidate | context_candidate | context_line | PASS | 5 | 4 | 5 | 5 | 4 | 5 | 4 | P2 |
| 52. sales follow-up email | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 53. sales collateral for our product | candidate | context_candidate | context_line | PASS | 5 | 4 | 5 | 5 | 4 | 5 | 4 | P2 |
| 54. proposal for customer A | candidate | context_candidate | context_line | FIX | 4 | 3 | 5 | 5 | 3 | 5 | 3 | P1 |
| 55. refund request response | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 56. service outage notice | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 57. support faq draft | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 58. new customer onboarding guide | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 59. churn save reply | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 60. customer success check-in email | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 61. refund reply paraphrase | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 62. outage notice paraphrase | candidate | context_candidate | context_line | FIX | 4 | 3 | 5 | 5 | 2 | 5 | 3 | P1 |
| 63. churn save paraphrase | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 64. customer success check-in paraphrase | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 65. support faq paraphrase | candidate | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |

## Patch Plan
| Priority | Target File | Issue | Suggested Change | Affected Cases |
| --- | --- | --- | --- | --- |
| P1 | src/core/ruleEngine.js, src/core/templates.js | High-context tasks need the actual subject or task list, not only categorical multiple-choice answers. | Route PRD, naming, and personal prioritization drafts to a context-line question or a context-first prompt that asks for the actual feature/problem, service description, or current task list. | Case 3. new feature prd, Case 11. personal prioritization, Case 12. weekly priority, Case 15. service name ideas, Case 22. organize means decide |
| P1 | src/core/briefCompiler.js | Email intent is lost for support escalation artifacts. | When the draft includes 메일, 이메일, or 답장, add an email-specific output contract such as subject, opening, body, and CTA while keeping the artifact safety constraints. | Case 48. vip escalation paraphrase |
| P1 | src/core/ruleEngine.js, src/core/briefCompiler.js | Proposal draft requests are compiled as outline-only prompts. | Distinguish 제안서 써줘 from 제안서 구조/목차 requests and compile a proposal draft or draft-plus-structure output when context is available. | Case 54. proposal for customer A |
| P1 | src/core/ruleEngine.js, src/core/briefCompiler.js | Scheduled maintenance is contaminated by outage wording. | Add a maintenance_notice artifact or branch outage_notice contracts when 예정 점검/점검 signals are present so the prompt uses 안내문 and planned-maintenance framing instead of 장애 공지. | Case 62. outage notice paraphrase |

## Review Policy
This report is an automated judge result. Final product decisions must still be validated through external user testing.
