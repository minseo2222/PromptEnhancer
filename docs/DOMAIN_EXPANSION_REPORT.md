# Domain Expansion Report

## Summary
- core cases: 48
- candidate cases: 0
- candidate status: none
- judge source: reused existing report
- total cases: 48
- decision: READY_FOR_CANDIDATE
- partial promotion status: NOT_READY
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 29 | 36 | 7 |
| FIX | 14 | 12 | -2 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 3.88 | 3.79 | -0.09 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=0.09)
- PASS: core PASS count did not decrease

## Candidate Pack Results

| Metric | Value |
| --- | --- |
| cases | 0 |
| PASS | 0 |
| FIX | 0 |
| KILL | 0 |
| P0 | 0 |
| average userWouldInsert | 0 |
| multiple_choice average | 0 |
| promotion_ready average | 0 |
| needs_patch average | 0 |
| needs_context average | 0 |
| suppress_regression average | 0 |
| needs_context ratio | 0 |
| UX_GAP | NO |

Candidate gates:

- SKIPPED: candidate gates (no candidate cases)

KILL/P0 list:

No cases.

Lowest 10 cases:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 3. new feature prd | product_pm | FIX | 2 | P1 | 새 기능 PRD 써줘 |
| 7. investor update email | sales_bd | FIX | 2 | P1 | 투자자에게 업데이트 메일 써줘 |
| 8. customer price increase email | customer_support | FIX | 2 | P1 | 고객에게 가격 인상 안내 메일 써줘 |
| 11. personal prioritization | internal_ops | FIX | 2 | P1 | 뭐부터 해야 할지 모르겠어. 정리 좀 해줘. |
| 12. weekly priority | internal_ops | FIX | 2 | P1 | 이번 주 우선순위 정해줘 |
| 15. service name ideas | generic | FIX | 2 | P1 | 서비스 이름 아이디어 줘 |
| 22. organize means decide | generic | FIX | 2 | P1 | 뭐부터 해야 할지 모르겠어. 정리 좀 해줘. |
| 25. generic job posting | hr_recruiting | FIX | 2 | P1 | 채용 공고 써줘 |
| 29. generic lecture curriculum | content_education | FIX | 2 | P1 | 강의 커리큘럼 만들어줘 |
| 33. generic blog outline | content_education | FIX | 2 | P1 | 블로그 글 목차 짜줘 |

## Domain Pack Breakdown

No candidate domain packs.

## Clarification Mode Breakdown

No candidate clarification modes.

## Promotion Group Breakdown

No candidate promotion groups.

## Manual Promotion Candidates

No manual promotion candidates.

## Context-required Backlog

No context-required backlog items.

## Needs Patch Cases

No needs_patch cases.

## Recurring Problems
- Several previews ask generic or secondary questions while missing the core subject/context needed to produce a useful result.
- Some assumed defaults are arbitrary and can change the user's intent, especially for open-ended artifact requests.
- High-stakes email/support cases sometimes ask tone first instead of policy, status, content, or effective-date details.
- Personal prioritization prompts do not ask for the actual task list/options before prioritizing.
- Compiled prompts are often heavier than needed and occasionally add domain boilerplate that does not fit the specific task.

## Recommended Next Action
- Add a small candidate pack, then rerun the expansion cycle.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
