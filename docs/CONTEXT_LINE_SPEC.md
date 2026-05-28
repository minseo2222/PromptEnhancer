# One-line Context Clarification Spec

## Purpose

`context_line` is a local-only clarification mode for drafts where multiple-choice answers are not enough because the missing information is a concrete product, customer, policy, incident, or prior interaction.

This is a core/compiler and QA harness capability only. It does not change the current Chrome runtime UI, permissions, storage, backend, analytics, or API behavior.

## Mode Definition

`clarificationMode: "context_line"` means Clarify should collect one short free-text answer:

- one line
- no prompt storage
- no backend/API/AI call
- used only in the current compile operation

The context line can replace multiple-choice questions, or be combined with them in a future runtime. In this v1 harness it replaces the 1-2 multiple-choice questions for context-heavy backlog cases.

## When To Use

Use `context_line` when the draft has high intent but the missing information cannot be safely inferred from a fixed option list.

Typical signals:

- Product or offer is missing: sales script, cold email, sales collateral.
- Customer/account context is missing: proposal for a named customer, customer success check-in.
- Factual status is missing: refund request, outage notice, churn reason.
- Source material is missing: FAQ/Q&A from repeated customer inquiries.
- Policy or boundary is missing: refund handling, retention offer, escalation limits.

Do not use it for:

- simple rewrite/translation/spelling/summarization
- cases where suppress is safer
- cases where 1-2 multiple-choice questions are enough to narrow the task

## Core Flow

`analyzeIntent(draft)` may set:

```js
{
  needsContextLine: true,
  suggestedSlots: ["context_line"]
}
```

`planQuestions(intent)` then returns one question:

```js
{
  slot: "context_line",
  inputType: "context_line",
  label: "...",
  placeholder: "...",
  options: []
}
```

The runtime UI is not implemented in this step. The preview harness uses fixture `sampleContextLine` values to simulate the one-line input.

## Compiler Contract

`compileBrief` accepts:

```js
compileBrief({
  draft,
  domain,
  taskType,
  answers,
  intent,
  contextLine
})
```

When `contextLine` is present, it is reflected as `context_line` in the prompt context:

```md
# 확인된 정보
- 원문 요청: "..."
- 1줄 맥락: "..."
```

For standard prompts, it appears under `# 맥락` in the confirmed information list.

## Empty Context Behavior

If `intent.needsContextLine === true` but `contextLine` is empty:

- the compiler must not invent product, customer, policy, incident status, or offer details
- it adds `context_line` to 확인 필요
- the prompt must separate assumptions from facts
- high-risk facts such as refund eligibility, outage impact, compensation, retention offer, or customer commitment remain "확인 필요"

## Review Criteria

A context-line candidate passes only if:

- the one-line context appears in the compiled prompt
- the prompt becomes more concrete than the original draft
- missing facts are not fabricated
- the output contract still matches the artifact type
- the prompt remains compact enough to insert into ChatGPT
