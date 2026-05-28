# Domain Expansion Report

## Summary
- core cases: 63
- candidate cases: 0
- candidate status: none
- judge source: reused existing report
- total cases: 63
- decision: READY_FOR_CANDIDATE
- partial promotion status: NOT_READY
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 36 | 57 | 21 |
| FIX | 12 | 6 | -6 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 3.79 | 4.24 | 0.45 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=-0.45)
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
| 11. personal prioritization | internal_ops | FIX | 2 | P1 | 뭐부터 해야 할지 모르겠어. 정리 좀 해줘. |
| 12. weekly priority | internal_ops | FIX | 2 | P1 | 이번 주 우선순위 정해줘 |
| 15. service name ideas | generic | FIX | 2 | P1 | 서비스 이름 아이디어 줘 |
| 22. organize means decide | generic | FIX | 2 | P1 | 뭐부터 해야 할지 모르겠어. 정리 좀 해줘. |
| 3. new feature prd | product_pm | FIX | 3 | P1 | 새 기능 PRD 써줘 |
| 48. vip escalation paraphrase | customer_support | FIX | 3 | P1 | 중요 고객 항의에 긴급 대응 메일 초안 써줘 |
| 1. marketing strategy plan | gtm_marketing | PASS | 4 | P2 | 우리 서비스 마케팅 전략 짜줘 |
| 2. launch plan | generic | PASS | 4 | P2 | 다음 달 런칭 계획 세워줘 |
| 4. competitor analysis | founder_strategy | PASS | 4 | P2 | 경쟁사 분석해줘 |
| 5. conversion rate diagnosis | gtm_marketing | PASS | 4 | P2 | 우리 전환율이 왜 낮은지 분석해줘 |

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
- High-context tasks sometimes ask categorical multiple-choice questions instead of collecting the actual feature, service, or task list needed for a useful result.
- Some artifact compilers lose explicit output intent, especially email draft vs generic response and proposal draft vs outline.
- Planned maintenance is routed through outage wording, which can distort a scheduled customer notice.

## Recommended Next Action
- Add a small candidate pack, then rerun the expansion cycle.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
