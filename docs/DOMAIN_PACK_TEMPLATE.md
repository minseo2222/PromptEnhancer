# Domain Pack Template

Use this template when adding a small candidate domain pack. Do not add candidate cases directly to the core regression set.

## Case Schema

```js
{
  name: "short readable case name",
  draft: "사용자가 ChatGPT 입력창에 쓸 원문",
  expectedTaskType: "brief.write",
  expectedDomain: "generic",
  expectedArtifactType: "generic_document",
  domainPack: "generic",
  clarificationMode: "multiple_choice",
  expectedShouldShowClarify: true,
  sampleAnswers: {
    goal: "선택할 기본 답변",
    output_format: "원하는 결과물 형식"
  },
  expectedIncludes: ["보존되어야 할 표현"],
  expectedExcludes: ["들어가면 안 되는 오염 default"],
  notes: "왜 이 케이스가 중요한지"
}
```

## Domain Packs

- `gtm_marketing`: GTM, acquisition, campaign, conversion, retention.
- `product_pm`: PRD, requirements, roadmap, user scenario, feature planning.
- `sales_bd`: proposal, outreach, partnership, business message.
- `customer_support`: complaint, CS reply, support manual, escalation.
- `hr_recruiting`: hiring, recruiting, job posting, interview coordination.
- `content_education`: blog, curriculum, presentation, survey, interview questions.
- `internal_ops`: meeting, handoff, onboarding, retrospection, operating process.
- `founder_strategy`: market, competitor, prioritization, strategic analysis.
- `generic`: useful prompts that should stay domain-neutral.

## Clarification Modes

- `multiple_choice`: Runtime should ask one or two multiple-choice questions.
- `suppress`: Runtime should not show Clarify because the draft is simple or low value.
- `needs_free_text`: Multiple-choice cannot capture the missing input well. Keep safe and document the limitation.
- `ask_first_later`: Useful for later versions, but not required for the current runtime.

## Good Candidate Cases

- Represent a real user draft, not an internal test phrase.
- Include one clear expected taskType and, when relevant, expectedArtifactType.
- State expectedIncludes for explicit signals that must be preserved.
- State expectedExcludes for known contamination risks such as SaaS marketing defaults.
- Keep each pack small enough that failures are easy to diagnose.

## Promotion Criteria

- Core regression gates pass.
- Candidate KILL count is 0.
- Candidate P0 count is 0.
- Candidate average `userWouldInsertScore` is at least 3.6.
- `multiple_choice` candidate average is at least 3.8.
- No domainPack average is below 3.3.
- FIX cases have an accepted patch plan or documented limitation.

Promotion is manual in v1. Move accepted cases from `candidateExpansionCases.cjs` to `coreRegressionCases.cjs` only after reviewing `docs/DOMAIN_EXPANSION_REPORT.md`.
