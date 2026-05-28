# Preview Judge Report

## Summary
- total cases: 65
- PASS count: 55
- FIX count: 10
- KILL count: 0
- average userWouldInsert score: 4.23
- recommended next action: Patch high-context multiple-choice cases to use context_line, regenerate docs/PREVIEW_REVIEW.md, and rerun validation.

## Top Problems
- Several high-context drafts still use multiple-choice when the missing fact is a concrete product, topic, policy, update, or task list.
- Some option sets answer with broad categories instead of collecting the specific subject the final prompt needs.
- A few compiled prompts ask ChatGPT to produce a usable artifact while the central content is still unknown.
- Context-line cases are substantially stronger and should be expanded to similar high-context write/create/plan cases.

## P0 Fixes
No P0 fixes reported.

## Case Scores
| Case | Source | Domain Pack | Mode | Verdict | Clarity | Intent Fit | Question | Options | Prompt | Compactness | Insert Score | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. marketing strategy plan | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 2. launch plan | core | generic | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 3. new feature prd | core | product_pm | multiple_choice | FIX | 3 | 3 | 2 | 2 | 3 | 4 | 2 | P1 |
| 4. competitor analysis | core | founder_strategy | multiple_choice | FIX | 3 | 3 | 3 | 2 | 3 | 4 | 3 | P1 |
| 5. conversion rate diagnosis | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 6. option pros cons comparison | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 7. investor update email | core | sales_bd | multiple_choice | FIX | 3 | 3 | 2 | 2 | 3 | 4 | 2 | P1 |
| 8. customer price increase email | core | customer_support | multiple_choice | FIX | 3 | 3 | 2 | 2 | 3 | 4 | 2 | P1 |
| 9. ai productivity market research | core | founder_strategy | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 10. chrome extension trend research | core | founder_strategy | multiple_choice | PASS | 5 | 4 | 5 | 5 | 4 | 4 | 4 | P2 |
| 11. personal prioritization | core | internal_ops | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 12. weekly priority | core | internal_ops | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 13. choose between a and b | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 14. campaign ideas | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 15. service name ideas | core | generic | multiple_choice | FIX | 3 | 3 | 2 | 2 | 2 | 5 | 2 | P1 |
| 16. summarize key points | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 17. organize as table | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 18. hello | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 19. translate sentence | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 20. fix spelling | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 21. short summary | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 22. organize means decide | core | generic | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 23. organize means extract | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 24. organize means plan | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 25. generic job posting | core | hr_recruiting | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 26. generic meeting agenda | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 27. generic customer interview questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 28. generic presentation structure | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 29. generic lecture curriculum | core | content_education | multiple_choice | FIX | 3 | 3 | 2 | 2 | 3 | 4 | 3 | P1 |
| 30. generic cs response manual | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 31. generic onboarding document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 32. generic youtube planning doc | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 33. generic blog outline | core | content_education | multiple_choice | FIX | 3 | 3 | 2 | 2 | 3 | 4 | 3 | P1 |
| 34. generic survey questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 35. generic idea pros cons analysis | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 36. generic team retrospective questions | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 37. generic handoff document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 38. generic customer complaint reply | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 39. generic proposal structure | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 40. partnership proposal outline | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 41. demo meeting agenda | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 42. salesy rewrite suppression | core | sales_bd | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 43. price negotiation reply | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 5 | 4 | P2 |
| 44. empathetic rewrite suppression | core | customer_support | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 45. delayed delivery complaint reply | core | customer_support | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 5 | 4 | P2 |
| 46. refund policy support manual | core | customer_support | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 5 | 4 | P2 |
| 47. vip escalation response plan | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 5 | 4 | P2 |
| 48. vip escalation paraphrase | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 5 | 4 | P2 |
| 49. sales call script | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 50. cold email draft | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 51. prospect objections analysis | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 52. sales follow-up email | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 53. sales collateral for our product | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 54. refund request response | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 55. service outage notice | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 56. support faq draft | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 57. new customer onboarding guide | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 58. churn save reply | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 59. customer success check-in email | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 60. refund reply paraphrase | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 61. churn save paraphrase | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 62. customer success check-in paraphrase | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 63. support faq paraphrase | core | context_candidate | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 64. proposal for customer A | candidate | context_line_backlog | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 65. outage notice paraphrase | candidate | context_line_backlog | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |

## Patch Plan
| Priority | Target File | Issue | Suggested Change | Affected Cases |
| --- | --- | --- | --- | --- |
| P1 | src/core/ruleEngine.js | High-context multiple-choice flows cannot collect the concrete facts required for usable output. | Route PRD, competitor analysis, investor update, price increase, personal prioritization, service naming, curriculum, and blog outline drafts to context_line when the central subject or source facts are absent. | 3, 4, 7, 8, 11, 12, 15, 22, 29, 33 |
| P1 | src/core/templates.js | Several question option sets use broad categories where the task needs a concrete topic, product, feature, or task list. | Replace broad category-only prompts with context_line labels/placeholders or add first-class templates that ask for the concrete missing subject. | 3, 4, 15, 29, 33 |
| P2 | src/core/briefCompiler.js | Compiled prompts sometimes proceed as if enough context exists even when the core artifact content is unknown. | For high-context cases without context_line, emit a short context-first prompt that asks for the missing facts before drafting the final artifact. | 7, 8, 11, 12, 22 |
| P2 | tests/fixtures/coreRegressionCases.cjs | Some core fixtures now preserve weak v0 multiple-choice behavior even though context_line has proven stronger in adjacent cases. | Update fixture expectations for the recurring high-context cases after product behavior changes, then regenerate the preview review pack. | 3, 4, 7, 8, 11, 12, 15, 22, 29, 33 |

## Review Policy
This report is an automated judge result. Final product decisions must still be validated through external user testing.
