# Manual Test Plan

## 1. Load Unpacked

1. Chrome에서 `chrome://extensions`를 연다.
2. `Developer mode`를 켠다.
3. `Load unpacked`를 누른다.
4. 프로젝트 루트 폴더를 선택한다.

Pass:
- manifest error가 없다.
- popup이 열리고 `Local Only Mode`가 보인다.

## 2. ChatGPT Flow

1. `https://chatgpt.com/`을 연다.
2. composer에 `우리 서비스 마케팅 전략 짜줘`를 입력한다.
3. `Clarify` chip을 누른다.
4. 질문 2개 이하를 선택한다.
5. Preview를 확인한다.
6. `입력창에 넣기`를 누른다.
7. `Undo`를 누른다.

Pass:
- chip이 입력 중 바로 뜨지 않고 debounce 후 표시된다.
- preview가 삽입 전에 보인다.
- 자동 전송하지 않는다.
- Undo가 원문을 복원한다.

## 3. Simple Prompt Non-interference

다음 입력에는 chip이 뜨지 않아야 한다.

- `이 문장 번역해줘`
- `이거 요약해줘`
- `맞춤법 고쳐줘`
- `안녕`

## 4. Placement Lock

1. `우리 서비스 마케팅 전략 짜줘` 입력
2. `Clarify` 클릭
3. 질문창이 입력창 위에 뜨는지 확인
4. 선택지를 모두 선택
5. preview가 같은 위치에 유지되는지 확인

Pass:
- 질문창이 위였으면 preview/inserted/undo도 위 기준을 유지한다.
- 질문창이 아래였으면 preview도 아래 기준을 유지한다.
- preview가 입력창 아래로 flip되면 실패다.

## 5. Responsive Viewport

다음 창 크기에서 확인한다.

- 1440px 이상
- 900px 정도
- 480px 이하
- 세로 높이 600px 이하

Pass:
- chip과 popover가 화면 밖으로 나가지 않는다.
- 480px 이하에서는 Local badge가 숨겨진다.
- preview가 길어도 내부 스크롤된다.
- `입력창에 넣기`와 `Undo`가 계속 작동한다.

## 6. Task-pattern Brief Compiler

입력: `경쟁사 분석해줘`

Pass:
- taskType은 `brief.analyze`이다.
- 최종 prompt가 `# 작업`, `# 목표`, `# 맥락`, `# 제약`, `# 출력 형식`, `# 좋은 답변의 기준`을 포함한다.
- persona가 첫 줄을 지배하지 않는다.
- 비교/분석 기준이 들어간다.

입력: `투자자에게 업데이트 메일 써줘`

Pass:
- taskType은 `brief.write`이다.
- 목적과 톤 질문이 나온다.
- 출력 형식에 메일 초안 관련 지시가 들어간다.
- 좋은 답변의 기준에 간결성/독자 적합성이 포함된다.

입력: `뭐부터 해야 할지 모르겠어. 정리 좀 해줘.`

Pass:
- taskType은 `brief.decide`이다.
- 우선순위/판단 기준 질문이 나온다.
- 출력 형식에 우선순위와 다음 액션이 포함된다.

## 7. Preview Review Pack

1. Run `node tests\generatePreviewReview.cjs`.
2. Open `docs/PREVIEW_REVIEW.md`.
3. Review every case's Expected/Actual values, Questions, Assumed Answers, Compiled Prompt, and Human Review fields.

Pass:
- 질문이 사용자의 의도를 좁히는 데 도움이 된다.
- preview가 너무 길지 않다.
- 사용자가 선택한 답이 prompt에 반영된다.
- taskType 구조와 domain 관점이 동시에 살아 있다.
- ChatGPT에 넣었을 때 더 좋은 답변을 받을 것 같다.
- shouldShowClarify false 케이스는 런타임에서 chip이 뜨지 않는 의도로 표시된다.

## 8. Generic Stress Tests

Run `node tests\promptQuality.test.cjs`.

Pass:
- generic stress cases all show Clarify.
- domain이 generic이어도 질문 label이 비어 있지 않고 options가 4개 이상이다.
- 질문은 최대 2개이며 `추천해줘`가 포함된다.
- compiled prompt에 `# 작업`, `# 목표`, `# 맥락`, `# 출력 형식`이 포함된다.
- prompt가 `너는`으로 시작하지 않는다.
- 채용 공고, 회의 아젠다, 고객 인터뷰 질문, 강의 커리큘럼, 고객 불만 답변 같은 unknown domain 요청도 원문 핵심어가 prompt에 보존된다.
- artifactType이 있는 산출물 요청은 SaaS marketing/product/email 기본값으로 오염되지 않는다.
- 질문/문항 생성 요청은 research summary가 아니라 질문 목록 산출물로 컴파일된다.

## 9. Preview Judge

Run:

```powershell
node tests\runPreviewJudge.cjs
```

PowerShell wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File tests\runPreviewJudge.ps1
```

Generated files:
- `docs/PREVIEW_REVIEW.md`
- `docs/PREVIEW_JUDGE_REPORT.json`
- `docs/PREVIEW_JUDGE_REPORT.md`

Internal heuristic pass targets:
- KILL <= 3
- PASS >= 60%
- average userWouldInsertScore >= 3.5
- P0 patchPlan items <= 5
- Judge report의 Draft 컬럼에 한국어가 정상 표시된다.
- `??` placeholder가 보이면 테스트 실패다.
- PASS/FIX/KILL은 UTF-8 validation 통과 후에만 신뢰한다.
- runner가 derivative summary count를 case-level verdict 기준으로 정규화한다.
- `summary.totalCases`는 `cases.length`와 일치해야 한다.
- summary PASS/FIX/KILL count는 case-level verdict count와 일치해야 한다.
- summary average userWouldInsertScore는 case-level 평균과 ±0.05 이내여야 한다.

Note:
- This is an automated judge for local QA.
- It does not replace external user testing.
- It must not be added to product runtime.

## 10. Domain Expansion Governance

Run:

```powershell
node tests\expansion\runExpansionCycle.cjs
```

Pass:
- `tests/fixtures/coreRegressionCases.cjs` contains the approved core regression set.
- `tests/fixtures/candidateExpansionCases.cjs` is not mixed into normal tests unless `INCLUDE_CANDIDATES=1`.
- `docs/QUALITY_BASELINE.json` is used for core regression deltas.
- `docs/DOMAIN_EXPANSION_REPORT.md` is generated.
- Candidate 0개일 때 decision is `READY_FOR_CANDIDATE`.
- Candidate 0개일 때 candidate gates are `SKIPPED` or `N/A`, not `PASS`.
- Candidate가 1개 이상이면 `SKIP_EXPANSION_JUDGE=1`이 없는 한 judge를 다시 실행한다.
- Candidate가 있는데 stale `PREVIEW_JUDGE_REPORT.json`을 조용히 재사용하면 실패다.
- `docs/QUALITY_BASELINE.json` is not automatically updated by the expansion cycle.
- Core KILL count is 0.
- Core P0 count is 0.
- Core average `userWouldInsertScore` drop is <= 0.10.
- Candidate domainPack results are reported separately.
- Candidate `promotionGroup` results are reported separately.
- Candidate `multiple_choice` KILL count is 0.
- Candidate P0 count is 0.
- Candidate average is checked against the configured baseline gates.
- A weak domainPack can be marked `SPLIT_PACK` instead of promoted.
- `PARTIAL_PROMOTE_READY` is available when core gates pass, candidate KILL/P0 is 0, `promotion_ready` passes, and context-limited cases are only documented.
- `Manual Promotion Candidates` lists only `promotion_ready` cases with PASS and insert score >= 4.
- `Context-required Backlog` records cases where one-line context input is likely needed later.
- `needs_context` cases do not unfairly reject the full pack unless they introduce KILL/P0 or context risk.
- `node tests\validateReportArtifacts.cjs` passes before any candidate promotion decision.
- `docs/PREVIEW_JUDGE_REPORT.json` and `docs/PREVIEW_JUDGE_REPORT.md` show the same total/PASS/FIX/KILL counts.
- `docs/PREVIEW_REVIEW.md` total cases match core + candidate fixture count.
- `docs/DOMAIN_EXPANSION_REPORT.md` candidate cases match `tests/fixtures/candidateExpansionCases.cjs`.
- Stale Markdown reports fail validation instead of being trusted.
- After manual promotion, core case count increases by the promoted case count.
- After manual promotion, `tests/fixtures/candidateExpansionCases.cjs` is reset to 0 active cases.
- Non-promoted cases are preserved in a `tests/fixtures/domainPacks/*_backlog.cjs` file.
- Backlog cases are not automatically loaded into regression or candidate tests.
- After active candidates are cleared, `runExpansionCycle` returns `READY_FOR_CANDIDATE`.
- Core KILL/P0 remains 0 after promotion.

Promotion checklist:
- Promote candidate cases manually only after gates pass.
- Update `docs/QUALITY_BASELINE.json` manually only after an explicit baseline decision.
- Reject packs that introduce KILL/P0 or severe core regression.
- Split packs when one domainPack is materially weaker than the rest.
- Keep `needs_free_text` cases documented if current multiple-choice runtime is insufficient.

### Quality Baseline Refresh

Run only after manual promotion is complete:

```powershell
node tests\validateReportArtifacts.cjs
$env:ALLOW_BASELINE_REFRESH="1"; node tests\baseline\refreshQualityBaseline.cjs; Remove-Item Env:\ALLOW_BASELINE_REFRESH
```

Pass:
- `tests/fixtures/candidateExpansionCases.cjs` has 0 cases.
- `docs/PREVIEW_JUDGE_REPORT.json` total cases matches `tests/fixtures/coreRegressionCases.cjs`.
- Current judge KILL count is 0.
- Current judge P0 count is 0.
- Report artifact sync validation passes.
- Refresh without `ALLOW_BASELINE_REFRESH=1` fails.
- After refresh, `docs/QUALITY_BASELINE.json` `caseCount` is 43.
- Previous baseline backup remains in `docs/baselines/`.

## 11. Privacy / Permissions

Pass:
- `manifest.json`에 `<all_urls>`가 없다.
- `manifest.json`에 `https://*/*`가 없다.
- `tabs`, `history`, `cookies`, `webRequest`, `debugger` permission이 없다.
- prompt processing network call이 없다.
- analytics, cloud AI, backend call이 없다.
- prompt body와 generated prompt body가 storage에 저장되지 않는다.
- console에 draft 또는 generated prompt가 출력되지 않는다.
