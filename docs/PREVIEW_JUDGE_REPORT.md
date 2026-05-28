# Preview Judge Report

## Summary
- total cases: 43
- PASS count: 29
- FIX count: 14
- KILL count: 0
- average userWouldInsert score: 3.88
- recommended next action: Fix critical slot ordering for underspecified write, artifact, analysis, and prioritization cases, then regenerate the preview review.

## Top Problems
- Several write/artifact flows ask for tone or a broad category before essential source facts.
- Generic artifact defaults are often too coarse, producing template-like prompts instead of draft-specific briefs.
- Decision/prioritization flows miss the user's actual task list or current context before asking for criteria.
- Some analysis/research flows do not capture the actual company, service, category, or comparison object.
- Compiled prompts repeat generic safety and quality instructions, which can dilute selected answers.

## P0 Fixes
No P0 fixes reported.

## Case Scores
| Case | Source | Domain Pack | Mode | Verdict | Clarity | Intent Fit | Question | Options | Prompt | Compactness | Insert Score | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. marketing strategy plan | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 2. launch plan | core | generic | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 3. new feature prd | core | product_pm | multiple_choice | FIX | 4 | 3 | 3 | 4 | 3 | 4 | 3 | P1 |
| 4. competitor analysis | core | founder_strategy | multiple_choice | FIX | 3 | 2 | 3 | 3 | 2 | 4 | 2 | P1 |
| 5. conversion rate diagnosis | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 6. option pros cons comparison | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 7. investor update email | core | sales_bd | multiple_choice | FIX | 3 | 3 | 2 | 2 | 3 | 4 | 3 | P1 |
| 8. customer price increase email | core | customer_support | multiple_choice | FIX | 3 | 3 | 2 | 2 | 3 | 4 | 3 | P1 |
| 9. ai productivity market research | core | founder_strategy | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 10. chrome extension trend research | core | founder_strategy | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 11. personal prioritization | core | internal_ops | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 12. weekly priority | core | internal_ops | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 13. choose between a and b | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 14. campaign ideas | core | gtm_marketing | multiple_choice | PASS | 4 | 5 | 4 | 4 | 4 | 5 | 4 | P2 |
| 15. service name ideas | core | generic | multiple_choice | FIX | 3 | 2 | 2 | 3 | 2 | 5 | 2 | P1 |
| 16. summarize key points | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 17. organize as table | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 18. hello | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 19. translate sentence | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 20. fix spelling | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 21. short summary | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 22. organize means decide | core | generic | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 23. organize means extract | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 24. organize means plan | core | gtm_marketing | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 25. generic job posting | core | hr_recruiting | multiple_choice | FIX | 3 | 3 | 3 | 4 | 3 | 4 | 3 | P1 |
| 26. generic meeting agenda | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 27. generic customer interview questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 28. generic presentation structure | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 29. generic lecture curriculum | core | content_education | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 30. generic cs response manual | core | customer_support | multiple_choice | FIX | 3 | 3 | 3 | 4 | 3 | 4 | 3 | P1 |
| 31. generic onboarding document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 32. generic youtube planning doc | core | content_education | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 33. generic blog outline | core | content_education | multiple_choice | FIX | 3 | 3 | 3 | 3 | 3 | 4 | 3 | P1 |
| 34. generic survey questions | core | content_education | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 35. generic idea pros cons analysis | core | generic | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 36. generic team retrospective questions | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 37. generic handoff document | core | internal_ops | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 38. generic customer complaint reply | core | customer_support | multiple_choice | FIX | 3 | 3 | 3 | 4 | 3 | 4 | 3 | P1 |
| 39. generic proposal structure | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 4 | 4 | 4 | 4 | P2 |
| 40. partnership proposal outline | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 4 | 4 | P2 |
| 41. demo meeting agenda | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 4 | 4 | P2 |
| 42. salesy rewrite suppression | core | sales_bd | suppress | PASS | 5 | 5 | 5 | 5 | 5 | 5 | 5 | P2 |
| 43. price negotiation reply | core | sales_bd | multiple_choice | PASS | 4 | 4 | 4 | 5 | 4 | 4 | 4 | P2 |

## Patch Plan
| Priority | Target File | Issue | Suggested Change | Affected Cases |
| --- | --- | --- | --- | --- |
| P1 | src/core/templates.js | Artifact question templates often ask broad category or tone before the essential object/content facts. | For PRD, naming, job posting, curriculum, YouTube, blog, customer reply, and email artifacts, add first-slot questions for concrete subject, source facts, or required context before style/tone/output questions. | 3, 7, 8, 15, 25, 29, 32, 33, 38 |
| P1 | src/core/ruleEngine.js | Suggested slot selection prioritizes available template slots even when the draft lacks the core object to operate on. | Detect underspecified targets such as competitor/category, service description, task list, role details, and customer complaint facts; rank those slots ahead of tone, format, scope, or criteria. | 4, 11, 12, 15, 22, 25, 29, 32, 33, 38 |
| P1 | src/core/briefCompiler.js | The compiler treats coarse multiple-choice answers as sufficient and can produce generic drafts from missing facts. | When selected answers are broad placeholders, switch to a context-first compiled prompt that asks for the missing concrete facts and clearly marks them as required before drafting. | 3, 4, 7, 8, 15, 25, 29, 30, 32, 33, 38 |
| P2 | src/core/briefCompiler.js | Full prompts repeat generic constraints, domain focus, and quality bars, reducing compactness and sometimes diluting the selected answer. | Shorten repeated safety/quality sections and avoid adding secondary criteria that conflict with the user's selected answer. | 1, 2, 5, 9, 10, 11, 12, 22, 24 |

## Review Policy
This report is an automated judge result. Final product decisions must still be validated through external user testing.
