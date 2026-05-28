# Clarify Before Send

Manifest V3 기반의 local-only Chrome Extension v0입니다. ChatGPT, Claude, Gemini 입력창의 현재 draft만 읽고, 모호한 요청에 작은 `Clarify` chip을 보여준 뒤 객관식 질문, preview, 입력창 삽입, Undo 흐름을 제공합니다.

## What It Does

- ChatGPT, Claude, Gemini composer에서 현재 입력 중인 draft를 감지합니다.
- 입력이 멈춘 뒤 약 800ms debounce 후에만 `Clarify` chip을 표시합니다.
- 최대 2개의 객관식 질문을 보여줍니다.
- 선택한 답변으로 deterministic template 기반 prompt preview를 만듭니다.
- 사용자가 확인한 뒤 `입력창에 넣기`를 누르면 composer에 삽입합니다.
- 삽입 후 `Undo`로 원래 draft를 복원할 수 있습니다.
- 최종 전송은 항상 사용자가 직접 합니다.

## What It Does Not Do

- React, Vite, Next.js, bundler를 사용하지 않습니다.
- backend, server API, login, payment, analytics, cloud AI를 사용하지 않습니다.
- OpenAI, Claude, Gemini API를 호출하지 않습니다.
- local LLM 또는 Chrome Prompt API를 main flow에 사용하지 않습니다.
- prompt text, generated prompt, chat history를 저장하지 않습니다.
- chat history, sidebar, profile, cookies, browser history를 읽지 않습니다.
- 메시지를 자동 전송하지 않습니다.

## Load Unpacked

1. Chrome에서 `chrome://extensions`를 엽니다.
2. 우측 상단 `Developer mode`를 켭니다.
3. `Load unpacked`를 클릭합니다.
4. 이 프로젝트 루트 폴더를 선택합니다.
5. `Clarify Before Send`가 manifest error 없이 로드되는지 확인합니다.

단축키: 기본값은 Windows/Linux `Ctrl+Shift+Y`, macOS `Command+Shift+Y`입니다. Chrome의 `chrome://extensions/shortcuts`에서 사용자가 변경할 수 있습니다.
6. 확장 아이콘을 눌러 popup에 `Local Only Mode`가 보이는지 확인합니다.

## Manual Test On Supported Sites

1. `https://chatgpt.com/`, `https://chat.openai.com/`, `https://claude.ai/`, 또는 `https://gemini.google.com/`을 엽니다.
2. 새 chat 입력창에 `우리 서비스 마케팅 전략 짜줘`처럼 넓은 요청을 입력합니다.
3. 약 1초 기다립니다.
4. 입력창 근처에 `Clarify` chip이 뜨는지 확인합니다.
5. chip을 누르고 2개 이하의 객관식 질문에 답합니다.
6. `Preview`가 먼저 보이는지 확인합니다.
7. `입력창에 넣기`를 누릅니다.
8. 입력창 내용이 preview prompt로 바뀌고 자동 전송되지 않는지 확인합니다.
9. `Undo`를 눌러 원래 draft가 복원되는지 확인합니다.

Hardening checks before broader testing:

- 실제 `chatgpt.com`에서 삽입 후 send button이 활성화되는지 확인합니다.
- 실제 전송 시 generated prompt가 전송되는지 확인합니다.
- `Undo` 후 원문이 실제 composer 상태에 복원되는지 확인합니다.
- `닫기` 후 popover만 닫히고 같은 draft에서 chip이 새로 튀어나오는 느낌이 없는지 확인합니다.
- 질문창이 열린 상태에서 원문을 수정하면 기존 flow가 닫히는지 확인합니다.

Local rule-engine check:

```powershell
node tests/ruleEngine.test.cjs
node tests/promptQuality.test.cjs
node tests/generatePreviewReview.cjs
```

Preview Review Pack:

```powershell
node tests/generatePreviewReview.cjs
```

- Generates `docs/PREVIEW_REVIEW.md` from `tests/fixtures/promptCases.cjs`.
- This is an offline review artifact for reading questions, assumed answers, and compiled prompts. It is not a runtime feature and does not add product prompt storage.
- Review each case's Expected/Actual classification, Questions, Assumed Answers, Compiled Prompt, and Human Review fields.
- Use the Human Review fields to score clarity, intent fit, actionability, verbosity, and whether the prompt is worth inserting into ChatGPT.

### Preview Judge

Run:

```powershell
node tests\runPreviewJudge.cjs
node tests\validateJudgeReport.cjs
node tests\validateJudgeReportEncoding.cjs
node tests\validateReportArtifacts.cjs
```

PowerShell wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File tests\runPreviewJudge.ps1
```

Generates:

- `docs/PREVIEW_REVIEW.md`
- `docs/PREVIEW_JUDGE_REPORT.json`
- `docs/PREVIEW_JUDGE_REPORT.md`

This is local development QA automation. It is not included in the extension runtime, does not change permissions, and does not add product prompt storage.

Windows PowerShell can corrupt Korean text when piping strings. The Node runner sends Codex stdin as UTF-8 and validates that the judge report did not turn Korean drafts into `??` placeholders. If Korean appears as `??`, do not trust PASS/FIX/KILL results; fix the runner first.

The judge report is also checked for summary consistency. The Node runner normalizes derivative summary fields from the case-level verdicts, then `summary.totalCases`, PASS/FIX/KILL counts, and average `userWouldInsertScore` must match the `cases` array before the report is trusted. The Markdown renderer also recalculates these values from case-level results.

### Domain Expansion Governance

The approved fixture set is split into a core regression set and a candidate expansion set:

- `tests/fixtures/coreRegressionCases.cjs`: fixed core regression cases.
- `tests/fixtures/candidateExpansionCases.cjs`: new domain-pack candidates under review.
- `tests/fixtures/promptCases.cjs`: compatibility export; core only by default, core + candidates when `INCLUDE_CANDIDATES=1`.
- `docs/QUALITY_BASELINE.json`: frozen core baseline and gates.

Run the expansion cycle:

```powershell
node tests\expansion\runExpansionCycle.cjs
```

Generated report:

- `docs/DOMAIN_EXPANSION_REPORT.md`

The expansion cycle compares current core results against `docs/QUALITY_BASELINE.json`, reports candidate quality by `domainPack` and `clarificationMode`, and decides `PROMOTE`, `PATCH_REQUIRED`, `REJECT`, or `SPLIT_PACK`. Candidate cases should be promoted manually only after gates pass.

Governance hardening:

- If there are no candidate cases, the decision is `READY_FOR_CANDIDATE`, not `PROMOTE`.
- If one or more candidate cases exist, the expansion cycle runs the judge again by default to avoid stale reports.
- `SKIP_EXPANSION_JUDGE=1` may reuse an existing judge report, but use it only when you intentionally want cached results.
- `docs/QUALITY_BASELINE.json` is never updated by the expansion runner. Update it manually only after an explicit baseline decision.
- Candidate promotion and baseline updates are separate manual steps.

Promotion triage:

- Candidate cases can declare `promotionGroup`: `promotion_ready`, `needs_patch`, `needs_context`, or `suppress_regression`.
- `PARTIAL_PROMOTE_READY` means the full pack is not ready, but listed `promotion_ready` cases can be manually reviewed for promotion.
- `needs_context` is treated as a context/UX backlog, not an automatic pack rejection, unless it introduces KILL/P0 risk.
- `suppress_regression` cases protect prompts where Clarify should stay silent.
- Low-scoring `multiple_choice` or `needs_patch` cases still require prompt-engineering fixes before promotion.

Report artifact sync:

- Candidate promotion requires `node tests\validateReportArtifacts.cjs` to pass.
- `docs/PREVIEW_JUDGE_REPORT.json`, `docs/PREVIEW_JUDGE_REPORT.md`, `docs/PREVIEW_REVIEW.md`, and `docs/DOMAIN_EXPANSION_REPORT.md` must all reflect the same candidate state.
- If JSON and Markdown disagree, trust neither for promotion until the expansion cycle regenerates them.
- `tests/fixtures/candidateExpansionCases.cjs` candidate count must match `docs/DOMAIN_EXPANSION_REPORT.md`.

Manual promotion and backlog:

- In `PARTIAL_PROMOTE_READY`, promote only the reviewed cases that are ready for core regression.
- Move non-promoted cases to `tests/fixtures/domainPacks/*_backlog.cjs`.
- Clear `tests/fixtures/candidateExpansionCases.cjs` after the cycle so the next domain pack starts from an empty active candidate set.
- Backlog files are not regression sets and are not loaded by default tests.
- Copy backlog cases back into `candidateExpansionCases.cjs` only when that area is ready for another expansion cycle.
- `docs/QUALITY_BASELINE.json` is not refreshed automatically; baseline refresh is a separate explicit task.

Baseline refresh:

- Refresh the baseline only after a candidate cycle is closed and manual promotion is complete.
- `ALLOW_BASELINE_REFRESH=1` is required.
- `tests/fixtures/candidateExpansionCases.cjs` must be empty.
- Current judge KILL/P0 must be 0.
- `node tests\validateReportArtifacts.cjs` must pass before refresh.
- The refresh script backs up the previous and new baselines under `docs/baselines/`.

```powershell
node tests\validateReportArtifacts.cjs
$env:ALLOW_BASELINE_REFRESH="1"; node tests\baseline\refreshQualityBaseline.cjs --name core-v0.5-context-line --added-from context_candidate_v1 --backlog tests\fixtures\domainPacks\context_line_backlog.cjs; Remove-Item Env:\ALLOW_BASELINE_REFRESH
```

Prompt Quality Harness:

- taskType/domain 분류를 검증합니다.
- 질문 수와 질문 옵션 품질을 검증합니다.
- compiled prompt의 필수 섹션, 길이, answer 반영, persona-first 회귀를 검증합니다.
- `정리`가 decide/plan/extract 문맥에 맞게 분류되는지 확인합니다.

Responsive viewport checks:

- 1440px 이상 넓은 화면, 900px 정도 중간 화면, 480px 이하 좁은 화면, 세로 높이 600px 이하 낮은 화면에서 확인합니다.
- chip이 화면 밖으로 나가지 않는지 확인합니다.
- 480px 이하에서는 chip이 `Clarify` 중심으로 보이고 Local badge가 숨겨지는지 확인합니다.
- popover가 화면 밖으로 나가지 않는지 확인합니다.
- ChatGPT send button을 막지 않는지 확인합니다.
- option 버튼이 잘 눌리는지 확인합니다.
- preview가 길어도 내부 스크롤되는지 확인합니다.
- `입력창에 넣기`와 `Undo`가 계속 작동하는지 확인합니다.

Popover placement lock checks:

- `우리 서비스 마케팅 전략 짜줘` 입력 후 `Clarify`를 누릅니다.
- 질문창이 입력창 위에 뜨면, 선택지를 모두 선택한 뒤 preview도 같은 위쪽 위치 기준을 유지하는지 확인합니다. preview가 입력창 아래로 내려가면 실패입니다.
- Chrome 창 높이를 낮게 줄인 뒤 처음부터 아래로 뜨는 경우는 허용합니다. 단, 질문창이 아래였으면 preview/inserted/undo 상태도 아래 기준을 유지해야 합니다.
- preview가 길어지는 케이스에서 popover가 화면 밖으로 나가지 않고, preview 내부가 스크롤되며, `입력창에 넣기` 버튼이 보이는지 확인합니다.

Prompt compiler note:

v0.1 compiler는 persona-first가 아니라 task-pattern-first brief compiler를 사용합니다. 역할은 보조 관점으로만 쓰고, 목표/맥락/제약/출력 형식/좋은 답변의 기준을 중심으로 최종 prompt를 만듭니다.

Generality Layer v1:

- v0.2는 domain template 중심이 아니라 slot-based intent compiler를 사용합니다.
- taskType과 universal slots(goal, audience, output_format, tone, scope, criteria 등)를 중심으로 질문을 계획합니다.
- domain은 높은 confidence일 때만 perspective/detail hint로 사용합니다.
- unknown domain에서도 goal/output/audience/tone 같은 universal slots로 최대 2개의 질문을 만듭니다.
- artifactType/deliverableType layer가 채용 공고, 회의 아젠다, 질문 목록, 발표 구조, 커리큘럼, 매뉴얼, 온보딩 문서, 블로그 목차, 제안서 구조 같은 산출물 요청을 domain 오염 없이 보정합니다.
- generic stress cases는 `tests/fixtures/promptCases.cjs`와 `node tests/promptQuality.test.cjs`에서 함께 검증합니다.

## Platform Adapters

Clarify Before Send currently injects the same local-only flow on these exact hosts:

- `https://chatgpt.com/*`
- `https://chat.openai.com/*`
- `https://claude.ai/*`
- `https://gemini.google.com/*`

The runtime uses a small `PLATFORMS` adapter table in `src/content/content.js` to choose composer selectors per site. The core rule engine and prompt compiler are unchanged. English trigger quality is still a known limitation; this release only adds platform routing and composer insertion support.

## Privacy Notes

- v0는 local-only입니다.
- host permission은 `https://chatgpt.com/*`, `https://chat.openai.com/*`, `https://claude.ai/*`, `https://gemini.google.com/*`만 사용합니다.
- Chrome storage에는 `enabled`, `showLocalBadge` 설정만 저장합니다.
- prompt text와 generated prompt는 memory에서만 흐름을 처리하고 저장하지 않습니다.
- prompt processing을 위한 네트워크 요청은 없습니다.

## Known Limitations

- ChatGPT, Claude, Gemini composer DOM 변경에 따라 감지가 best-effort로 동작할 수 있습니다.
- 한국어 중심의 deterministic template만 제공합니다.
- 영어 trigger 품질은 이번 범위가 아니며 known issue로 남겨둡니다.
- 직접 삽입이 실패하면 복사 버튼 fallback을 제공합니다.

## Future Roadmap

- 더 정교한 domain/slot detection
- 사용자 설정 확장
- 명시적 opt-in 기반의 browser-local AI adapter 검토
- 더 많은 prompt domain template
