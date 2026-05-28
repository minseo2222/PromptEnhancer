# Preview Judge Report

## Summary
- total cases: 48
- PASS count: 36
- FIX count: 12
- KILL count: 0
- average userWouldInsert score: 3.79
- recommended next action: Core regression set updated from existing judge results. Add a small candidate pack, then rerun the expansion cycle.

## Top Problems
- Several previews ask generic or secondary questions while missing the core subject/context needed to produce a useful result.
- Some assumed defaults are arbitrary and can change the user's intent, especially for open-ended artifact requests.
- High-stakes email/support cases sometimes ask tone first instead of policy, status, content, or effective-date details.
- Personal prioritization prompts do not ask for the actual task list/options before prioritizing.
- Compiled prompts are often heavier than needed and occasionally add domain boilerplate that does not fit the specific task.

## P0 Fixes
No P0 fixes reported.

## Case Scores
| Case | Source | Domain Pack | Mode | Verdict | Clarity | Intent Fit | Question | Options | Prompt | Compactness | Insert Score | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. marketing strategy plan | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 3 | 4 | P2 |
| 2. launch plan | core | generic | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 3 | 4 | P2 |
| 3. new feature prd | core | product_pm | multiple_choice | FIX | 3 | 4 | 2 | 3 | 2 | 4 | 2 | P1 |
| 4. competitor analysis | core | founder_strategy | multiple_choice | FIX | 3 | 3 | 2 | 3 | 3 | 3 | 3 | P1 |
| 5. conversion rate diagnosis | core | gtm_marketing | multiple_choice | FIX | 4 | 4 | 4 | 4 | 3 | 3 | 3 | P2 |
| 6. option pros cons comparison | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 7. investor update email | core | sales_bd | multiple_choice | FIX | 3 | 3 | 1 | 2 | 2 | 4 | 2 | P1 |
| 8. customer price increase email | core | customer_support | multiple_choice | FIX | 3 | 3 | 1 | 2 | 2 | 4 | 2 | P1 |
| 9. ai productivity market research | core | founder_strategy | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 3 | 4 | P2 |
| 10. chrome extension trend research | core | founder_strategy | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 3 | 4 | P2 |
| 11. personal prioritization | core | internal_ops | multiple_choice | FIX | 3 | 3 | 2 | 3 | 2 | 3 | 2 | P1 |
| 12. weekly priority | core | internal_ops | multiple_choice | FIX | 3 | 3 | 2 | 3 | 2 | 3 | 2 | P1 |
| 13. choose between a and b | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 14. campaign ideas | core | gtm_marketing | multiple_choice | PASS | 4 | 5 | 4 | 4 | 4 | 4 | 4 | P2 |
| 15. service name ideas | core | generic | multiple_choice | FIX | 3 | 2 | 2 | 3 | 2 | 4 | 2 | P1 |
| 16. summarize key points | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 17. organize as table | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 18. hello | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 19. translate sentence | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 20. fix spelling | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 21. short summary | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 22. organize means decide | core | generic | multiple_choice | FIX | 3 | 3 | 2 | 3 | 2 | 3 | 2 | P1 |
| 23. organize means extract | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 24. organize means plan | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 3 | 4 | P2 |
| 25. generic job posting | core | hr_recruiting | multiple_choice | FIX | 3 | 3 | 2 | 3 | 2 | 4 | 2 | P1 |
| 26. generic meeting agenda | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 27. generic customer interview questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 28. generic presentation structure | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 29. generic lecture curriculum | core | content_education | multiple_choice | FIX | 3 | 3 | 2 | 3 | 2 | 4 | 2 | P1 |
| 30. generic cs response manual | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 31. generic onboarding document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 32. generic youtube planning doc | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 33. generic blog outline | core | content_education | multiple_choice | FIX | 3 | 3 | 2 | 3 | 2 | 4 | 2 | P1 |
| 34. generic survey questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 35. generic idea pros cons analysis | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 36. generic team retrospective questions | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 37. generic handoff document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 38. generic customer complaint reply | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 39. generic proposal structure | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 40. partnership proposal outline | core | sales_bd | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 4 | 4 | P2 |
| 41. demo meeting agenda | core | sales_bd | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 4 | 4 | P2 |
| 42. salesy rewrite suppression | core | sales_bd | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 43. price negotiation reply | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 4 | 4 | P2 |
| 44. empathetic rewrite suppression | core | customer_support | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 45. delayed delivery complaint reply | core | customer_support | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 4 | 4 | P2 |
| 46. refund policy support manual | core | customer_support | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 4 | 4 | P2 |
| 47. vip escalation response plan | core | customer_support | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 4 | 4 | P2 |
| 48. vip escalation paraphrase | core | customer_support | multiple_choice | PASS | 4 | 5 | 4 | 5 | 4 | 4 | 4 | P2 |

## Patch Plan
| Priority | Target File | Issue | Suggested Change | Affected Cases |
| --- | --- | --- | --- | --- |
| P1 | src/core/templates.js | Several artifact templates ask broad category questions instead of collecting the core subject/context. | Add subject/context-first slots for PRD, competitor analysis, naming, job posting, curriculum, blog outline, FAQ, and customer onboarding; use needs_context when multiple-choice cannot capture the missing object. | 3, 4, 15, 25, 29, 33, 47, 48, 59 |
| P1 | src/core/ruleEngine.js | High-stakes email/support requests fall back to generic tone questions before required facts. | Route investor update and price increase emails to artifact-specific question sets that prioritize content, reporting period, effective date, amount/reason, customer impact, and CTA. | 7, 8 |
| P1 | src/core/templates.js | Personal prioritization cases do not collect the actual task list before applying criteria. | Add a task/options input slot or context-first prompt for prioritization; only ask criteria after there is something to prioritize. | 11, 12, 22 |
| P2 | src/core/briefCompiler.js | Compiled prompts are sometimes too heavy and can add mismatched domain boilerplate. | Use shorter compiled prompts for simple plan/research cases and suppress generic domain focus lines when intent-specific contracts already cover the task. | 1, 2, 5, 9, 10, 24 |
| P2 | src/core/ruleEngine.js | Question planner does not always suppress slots already explicit in the draft. | Filter suggestedSlots against filledSlots and explicit draft signals for artifact-specific slots such as checkin_purpose. | 58 |

## Review Policy
This report is an automated judge result. Final product decisions must still be validated through external user testing.
