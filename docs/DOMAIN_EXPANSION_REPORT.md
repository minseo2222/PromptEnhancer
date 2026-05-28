# Domain Expansion Report

## Summary
- core cases: 63
- candidate cases: 2
- candidate status: active
- judge source: freshly generated
- total cases: 65
- decision: PROMOTE
- partial promotion status: NOT_READY
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 57 | 53 | -4 |
| FIX | 6 | 10 | 4 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 4.24 | 4.21 | -0.03 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=0.03)
- WARN: core PASS count decreased by 4

## Candidate Pack Results

| Metric | Value |
| --- | --- |
| cases | 2 |
| PASS | 2 |
| FIX | 0 |
| KILL | 0 |
| P0 | 0 |
| average userWouldInsert | 5 |
| multiple_choice average | 0 |
| promotion_ready average | 0 |
| needs_patch average | 5 |
| needs_context average | 0 |
| suppress_regression average | 0 |
| needs_context ratio | 0 |
| UX_GAP | NO |

Candidate gates:

- PASS: candidate multiple_choice KILL must be 0 (multiple_choice=0)
- PASS: candidate P0 must be 0 (current=0)
- PASS: candidate average >= minCandidateAverage (avg=5)
- PASS: multiple_choice average >= minMultipleChoiceAverage (avg=0)

KILL/P0 list:

No cases.

Lowest 10 cases:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 64. proposal for customer A | context_line_backlog | PASS | 5 | P2 | A 고객에게 제안서 써줘 |
| 65. outage notice paraphrase | context_line_backlog | PASS | 5 | P2 | 점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘 |

## Domain Pack Breakdown

| domainPack | cases | PASS | FIX | KILL | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- |
| context_line_backlog | 2 | 2 | 0 | 0 | 5 | OK |

## Clarification Mode Breakdown

| clarificationMode | cases | PASS | FIX | KILL | avg insert |
| --- | --- | --- | --- | --- | --- |
| context_line | 2 | 2 | 0 | 0 | 5 |

## Promotion Group Breakdown

| promotionGroup | cases | PASS | FIX | KILL | P0 | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| needs_patch | 2 | 2 | 0 | 0 | 0 | 5 | PATCH_LIGHT |

## Manual Promotion Candidates

No manual promotion candidates.

## Context-required Backlog

No context-required backlog items.

## Needs Patch Cases

| Case | Draft | Verdict | Insert Score | Recommended Fix |
| --- | --- | --- | --- | --- |
| 64. proposal for customer A | A 고객에게 제안서 써줘 | PASS | 5 |  |
| 65. outage notice paraphrase | 점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘 | PASS | 5 |  |

## Recurring Problems
- Several high-context drafts still use multiple-choice when the missing fact is a concrete product, topic, policy, update, or task list.
- Some option sets answer with broad categories instead of collecting the specific subject the final prompt needs.
- A few compiled prompts ask ChatGPT to produce a usable artifact while the central content is still unknown.
- Context-line cases are substantially stronger and should be expanded to similar high-context write/create/plan cases.

## Recommended Next Action
- Patch candidate cases that fall below gates, then rerun the expansion cycle.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
