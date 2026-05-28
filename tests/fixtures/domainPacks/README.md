# Domain Pack Fixtures

Domain packs are candidate case sets used to expand compiler coverage without weakening the core regression baseline.

Do not add new domain cases directly to `promptCases.cjs`. Add candidate cases to `tests/fixtures/candidateExpansionCases.cjs`, run the expansion cycle, then promote only the cases that pass the gates.

## Case Shape

```js
{
  name: "customer support complaint reply",
  draft: "고객 불만 답변 써줘",
  expectedTaskType: "brief.write",
  expectedDomain: "generic",
  expectedArtifactType: "complaint_reply",
  domainPack: "customer_support",
  clarificationMode: "multiple_choice",
  expectedShouldShowClarify: true,
  sampleAnswers: {
    goal: "사과와 공감",
    tone: "정중하고 공감 있게"
  },
  expectedIncludes: ["고객", "불만"],
  expectedExcludes: ["신규 유저 획득"],
  notes: "Artifact-specific write case; should not inherit SaaS marketing defaults."
}
```

## Domain Packs

- `gtm_marketing`
- `product_pm`
- `sales_bd`
- `customer_support`
- `hr_recruiting`
- `content_education`
- `internal_ops`
- `founder_strategy`
- `generic`

## Consumed Packs

- `context_candidate_v1.cjs` is a consumed dynamic loader. It previously combined Sales/BD and Customer Support backlogs into `context_line` candidates, but those source backlogs are now empty after the accepted cases moved into core and the remaining cases moved to `context_line_backlog.cjs`.
- Do not reactivate a consumed pack directly. Copy backlog cases into `candidateExpansionCases.cjs` or create a new candidate pack for the next cycle.

## Clarification Modes

- `multiple_choice`: Clarify should ask one or two useful multiple-choice questions.
- `context_line`: Clarify should ask for one short free-text context line when fixed options cannot capture the missing product, customer, policy, incident, offer, or source material.
- `suppress`: Clarify should not appear in runtime.
- `needs_free_text`: Multiple-choice is likely insufficient; keep safe or document limitation.
- `ask_first_later`: Useful later, but not required for the current runtime.

## Promotion Rule

Candidate cases should be promoted to `coreRegressionCases.cjs` only after the expansion report shows no core regression, no P0/KILL cases, and acceptable candidate quality for the target domain pack.
