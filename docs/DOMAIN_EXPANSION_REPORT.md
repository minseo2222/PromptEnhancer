# Domain Expansion Report

## Summary
- core cases: 65
- candidate cases: 10
- candidate status: active
- judge source: freshly generated
- total cases: 75
- decision: PARTIAL_PROMOTE_READY
- partial promotion status: ELIGIBLE
- needs_context risk: none

## Core Regression

| Metric | Baseline | Current | Delta |
| --- | --- | --- | --- |
| PASS | 55 | 64 | 9 |
| FIX | 10 | 1 | -9 |
| KILL | 0 | 0 | 0 |
| P0 | 0 | 0 | 0 |
| average userWouldInsert | 4.23 | 4.8 | 0.57 |

Gate results:

- PASS: core KILL must be 0 (current=0)
- PASS: core P0 must be 0 (current=0)
- PASS: core average drop <= maxAverageDrop (drop=-0.57)
- PASS: core PASS count did not decrease

## Candidate Pack Results

| Metric | Value |
| --- | --- |
| cases | 10 |
| PASS | 9 |
| FIX | 1 |
| KILL | 0 |
| P0 | 0 |
| average userWouldInsert | 4.8 |
| multiple_choice average | 4 |
| promotion_ready average | 4 |
| needs_patch average | 0 |
| needs_context average | 5 |
| suppress_regression average | 0 |
| needs_context ratio | 0.8 |
| UX_GAP | YES |

Candidate gates:

- PASS: candidate multiple_choice KILL must be 0 (multiple_choice=2)
- PASS: candidate P0 must be 0 (current=0)
- PASS: candidate average >= minCandidateAverage (avg=4.8)
- PASS: multiple_choice average >= minMultipleChoiceAverage (avg=4)

KILL/P0 list:

No cases.

Lowest 10 cases:

| Case | Domain Pack | Verdict | Insert Score | Priority | Draft |
| --- | --- | --- | --- | --- | --- |
| 73. pm feedback synthesis | email_pm | FIX | 3 | P1 | 베타 테스트 피드백을 어떻게 정리할지 알려줘 |
| 66. email information request | email_pm | PASS | 5 | P2 | 팀원에게 자료 요청하는 메일 작성해줘 |
| 67. approval request email | email_pm | PASS | 5 | P2 | 대표님께 승인 요청 메일 보내야 해. 초안 좀 |
| 68. schedule change email | email_pm | PASS | 5 | P2 | 파트너사에 일정 변경 메일 써줘 |
| 69. apology email | email_pm | PASS | 5 | P2 | 고객에게 사과 메일 작성해줘 |
| 70. meeting follow-up email | email_pm | PASS | 5 | P2 | 회의 후 팔로업 메일 써줘 |
| 71. pm user story conversion | email_pm | PASS | 5 | P2 | 신규 기능 요구사항을 유저 스토리로 바꿔줘 |
| 72. pm sprint priority | email_pm | PASS | 5 | P2 | 다음 스프린트 우선순위 정리해줘 |
| 74. pm metrics dashboard | email_pm | PASS | 5 | P2 | 제품 지표 대시보드에 넣을 항목 추천해줘 |
| 75. pm executive status report | email_pm | PASS | 5 | P2 | 임원 보고용 프로젝트 현황 정리해줘 |

## Domain Pack Breakdown

| domainPack | cases | PASS | FIX | KILL | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- |
| email_pm | 10 | 9 | 1 | 0 | 4.8 | OK |

## Clarification Mode Breakdown

| clarificationMode | cases | PASS | FIX | KILL | avg insert |
| --- | --- | --- | --- | --- | --- |
| context_line | 8 | 8 | 0 | 0 | 5 |
| multiple_choice | 2 | 1 | 1 | 0 | 4 |

## Promotion Group Breakdown

| promotionGroup | cases | PASS | FIX | KILL | P0 | avg insert | decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| needs_context | 8 | 8 | 0 | 0 | 0 | 5 | DOCUMENT_LIMITATION |
| promotion_ready | 2 | 1 | 1 | 0 | 0 | 4 | PROMOTE_CANDIDATE |

## Manual Promotion Candidates

| Case | Draft | promotionGroup | Verdict | Insert Score | Note |
| --- | --- | --- | --- | --- | --- |
| 74. pm metrics dashboard | 제품 지표 대시보드에 넣을 항목 추천해줘 | promotion_ready | PASS | 5 | promotion_ready, PASS, insert score >= 4 |

## Context-required Backlog

| Case | Draft | Reason | Suggested Future UX |
| --- | --- | --- | --- |
| 66. email information request | 팀원에게 자료 요청하는 메일 작성해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 67. approval request email | 대표님께 승인 요청 메일 보내야 해. 초안 좀 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 68. schedule change email | 파트너사에 일정 변경 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 69. apology email | 고객에게 사과 메일 작성해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 70. meeting follow-up email | 회의 후 팔로업 메일 써줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 71. pm user story conversion | 신규 기능 요구사항을 유저 스토리로 바꿔줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 72. pm sprint priority | 다음 스프린트 우선순위 정리해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |
| 75. pm executive status report | 임원 보고용 프로젝트 현황 정리해줘 | 짧은 요청만으로는 핵심 맥락을 확정하기 어려움 | optional one-line context field |

## Needs Patch Cases

No needs_patch cases.

## Recurring Problems
- Some high-context multiple-choice cases still default to broad assumptions instead of collecting the missing product, customer, source, or policy facts.
- Case 3 asks about PRD scope but still outputs sections the user did not select, weakening answer reflection.
- A few generic artifact prompts label narrowed topics as 주제/대상, which is slightly awkward and can reduce trust.
- Context-line flows are generally strong, but cases without entered context are not insert-ready and should remain gated.

## Recommended Next Action
- Manually review promotion_ready candidates for core promotion, document needs_context cases, and patch needs_patch cases.

## Promotion Notes
- Promote candidates only when core regression gates pass.
- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.
- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.
- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.
- Split any domainPack whose average falls below 3.3 before promotion.
- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.
