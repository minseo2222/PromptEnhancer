# Domain Expansion Report

## Summary
- core cases: 74
- candidate cases: 0
- candidate status: none
- judge source: reused existing report
- total cases: 74
- decision: READY_FOR_CANDIDATE
- partial promotion status: NOT_READY
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 73 | 73 | 0 |
| FIX | 1 | 1 | 0 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 4.82 | 4.82 | 0.00 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=0)
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
| 3. new feature prd | product_pm | FIX | 3 | P1 | 새 기능 PRD 써줘 |
| 7. investor update email | sales_bd | PASS | 3 | P2 | 투자자에게 업데이트 메일 써줘 |
| 8. customer price increase email | customer_support | PASS | 3 | P2 | 고객에게 가격 인상 안내 메일 써줘 |
| 15. service name ideas | generic | PASS | 4 | P2 | 서비스 이름 아이디어 줘 |
| 25. generic job posting | hr_recruiting | PASS | 4 | P2 | 채용 공고 써줘 |
| 28. generic presentation structure | content_education | PASS | 4 | P2 | 발표 구조 잡아줘 |
| 29. generic lecture curriculum | content_education | PASS | 4 | P2 | 강의 커리큘럼 만들어줘 |
| 31. generic onboarding document | internal_ops | PASS | 4 | P2 | 온보딩 문서 만들어줘 |
| 32. generic youtube planning doc | content_education | PASS | 4 | P2 | 유튜브 영상 기획안 써줘 |
| 33. generic blog outline | content_education | PASS | 4 | P2 | 블로그 글 목차 짜줘 |

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
- Case 3 asks about PRD scope but still outputs sections the user did not select, weakening answer reflection.
- A few generic artifact prompts label narrowed topics as 주제/대상, which is slightly awkward and can reduce trust.
- Context-line flows are generally strong, but cases without entered context are not insert-ready and should remain gated.

## Recommended Next Action
- Add a small candidate pack, then rerun the expansion cycle.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
