# Preview Judge Report

## Summary
- total cases: 74
- PASS count: 73
- FIX count: 1
- KILL count: 0
- average userWouldInsert score: 4.82
- recommended next action: Core regression is ready for the next candidate pack; keep remaining PM feedback synthesis in backlog until source-context handling is improved.

## Top Problems
- Case 3 asks about PRD scope but still outputs sections the user did not select, weakening answer reflection.
- A few generic artifact prompts label narrowed topics as 주제/대상, which is slightly awkward and can reduce trust.
- Context-line flows are generally strong, but cases without entered context are not insert-ready and should remain gated.

## P0 Fixes
No P0 fixes reported.

## Case Scores
| Case | Source | Domain Pack | Mode | Verdict | Clarity | Intent Fit | Question | Options | Prompt | Compactness | Insert Score | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. marketing strategy plan | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 4 | 5 | P2 |
| 2. launch plan | core | generic | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 4 | 5 | P2 |
| 3. new feature prd | core | product_pm | multiple_choice | FIX | 4 | 4 | 5 | 5 | 3 | 4 | 3 | P1 |
| 4. competitor analysis | core | founder_strategy | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 4 | 5 | P2 |
| 5. conversion rate diagnosis | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 4 | 5 | P2 |
| 6. option pros cons comparison | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 7. investor update email | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 3 | P2 |
| 8. customer price increase email | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 3 | P2 |
| 9. ai productivity market research | core | founder_strategy | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 4 | 5 | P2 |
| 10. chrome extension trend research | core | founder_strategy | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 4 | 5 | P2 |
| 11. personal prioritization | core | internal_ops | multiple_choice | PASS | 5 | 5 | 4 | 4 | 5 | 4 | 5 | P2 |
| 12. weekly priority | core | internal_ops | multiple_choice | PASS | 5 | 5 | 4 | 4 | 5 | 4 | 5 | P2 |
| 13. choose between a and b | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 14. campaign ideas | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 15. service name ideas | core | generic | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 16. summarize key points | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 17. organize as table | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 18. hello | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 19. translate sentence | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 20. fix spelling | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 21. short summary | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 22. organize means decide | core | generic | multiple_choice | PASS | 5 | 5 | 4 | 4 | 5 | 4 | 5 | P2 |
| 23. organize means extract | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 24. organize means plan | core | gtm_marketing | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 4 | 5 | P2 |
| 25. generic job posting | core | hr_recruiting | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 26. generic meeting agenda | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 27. generic customer interview questions | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 28. generic presentation structure | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 29. generic lecture curriculum | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 30. generic cs response manual | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 31. generic onboarding document | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 32. generic youtube planning doc | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 33. generic blog outline | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 4 | 5 | 4 | P2 |
| 34. generic survey questions | core | content_education | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 35. generic idea pros cons analysis | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 36. generic team retrospective questions | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 37. generic handoff document | core | internal_ops | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 38. generic customer complaint reply | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 39. generic proposal structure | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 40. partnership proposal outline | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 41. demo meeting agenda | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 42. salesy rewrite suppression | core | sales_bd | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 43. price negotiation reply | core | sales_bd | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 44. empathetic rewrite suppression | core | customer_support | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 45. delayed delivery complaint reply | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 46. refund policy support manual | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 47. vip escalation response plan | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 48. vip escalation paraphrase | core | customer_support | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
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
| 64. proposal for customer A | core | context_line_backlog | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 65. outage notice paraphrase | core | context_line_backlog | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 66. email information request | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 67. approval request email | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 68. schedule change email | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 69. apology email | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 70. meeting follow-up email | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 71. pm user story conversion | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 72. pm sprint priority | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 73. pm metrics dashboard | core | email_pm | multiple_choice | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 74. pm executive status report | core | email_pm | context_line | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |

## Patch Plan
| Priority | Target File | Issue | Suggested Change | Affected Cases |
| --- | --- | --- | --- | --- |
| P1 | src/core/briefCompiler.js | PRD selected scope is not reflected tightly enough and can reintroduce unselected sections. | When prd_scope is selected, make it the primary requested section set and place other PRD sections under optional 확인 필요 or supporting context. | new feature prd |
| P2 | src/core/briefCompiler.js | Generic artifact prompts sometimes label narrowed topics as 주제/대상, which is vague for user-facing review. | Use artifact-specific labels such as 회의 주제, 발표 주제, 강의 주제, 글 주제, 업무 범위 where available. | generic meeting agenda, generic presentation structure, generic lecture curriculum, generic blog outline, generic handoff document, generic customer complaint reply |

## Review Policy
This report is an automated judge result. Final product decisions must still be validated through external user testing.
