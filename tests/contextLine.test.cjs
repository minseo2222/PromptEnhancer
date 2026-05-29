const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const coreCases = require("./fixtures/coreRegressionCases.cjs");
const contextLineBacklogCases = require("./fixtures/domainPacks/context_line_backlog.cjs");
const contextCases = coreCases
  .filter((caseItem) => caseItem.clarificationMode === "context_line")
  .concat(contextLineBacklogCases);

global.window = global;

for (const file of [
  "src/core/templates.js",
  "src/core/promptPatterns.js",
  "src/core/ruleEngine.js",
  "src/core/briefCompiler.js"
]) {
  vm.runInThisContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), { filename: file });
}

assert.ok(contextCases.length > 0, "context line coverage should include promoted core and backlog cases");

for (const caseItem of contextCases) {
  assert.strictEqual(caseItem.clarificationMode, "context_line", `${caseItem.name}: clarificationMode`);
  assert.ok(caseItem.sampleContextLine, `${caseItem.name}: sampleContextLine is required`);

  const intent = window.CBSRuleEngine.analyzeIntent(caseItem.draft);
  assert.strictEqual(intent.needsContextLine, true, `${caseItem.name}: should need context_line`);
  assert.strictEqual(intent.shouldClarify, true, `${caseItem.name}: should show Clarify`);
  assert.deepStrictEqual(intent.suggestedSlots, ["context_line"], `${caseItem.name}: suggested context slot`);

  if (caseItem.expectedArtifactType) {
    assert.strictEqual(intent.artifactType, caseItem.expectedArtifactType, `${caseItem.name}: artifactType`);
  }

  const questions = window.CBSRuleEngine.planQuestions(intent);
  assert.strictEqual(questions.length, 1, `${caseItem.name}: should ask one context question`);
  assert.strictEqual(questions[0].slot, "context_line", `${caseItem.name}: context question slot`);
  assert.strictEqual(questions[0].inputType, "context_line", `${caseItem.name}: inputType`);

  const prompt = window.CBSBriefCompiler.compileBrief({
    draft: caseItem.draft,
    domain: intent.domain,
    taskType: intent.taskType,
    answers: {},
    intent,
    contextLine: caseItem.sampleContextLine
  });

  assert.ok(prompt.includes(caseItem.sampleContextLine), `${caseItem.name}: compiled prompt should include context line`);
  assert.ok(prompt.includes("1줄 맥락"), `${caseItem.name}: compiled prompt should label one-line context`);
  assert.ok(!prompt.includes("신규 유저 획득"), `${caseItem.name}: must not inherit marketing default`);
  assert.ok(!prompt.includes("PRD"), `${caseItem.name}: must not inherit PRD default`);

  const emptyPrompt = window.CBSBriefCompiler.compileBrief({
    draft: caseItem.draft,
    domain: intent.domain,
    taskType: intent.taskType,
    answers: {},
    intent,
    contextLine: ""
  });

  assert.ok(emptyPrompt.includes("확인 필요"), `${caseItem.name}: empty context should remain explicit`);
  assert.ok(emptyPrompt.includes("1줄 맥락"), `${caseItem.name}: empty context should name the missing slot`);
}

function compileWithContext(draft, contextLine) {
  const intent = window.CBSRuleEngine.analyzeIntent(draft);
  return {
    intent,
    prompt: window.CBSBriefCompiler.compileBrief({
      draft,
      domain: intent.domain,
      taskType: intent.taskType,
      answers: {},
      intent,
      contextLine
    })
  };
}

{
  const { intent, prompt } = compileWithContext(
    "A 고객에게 제안서 써줘",
    "A 고객은 CS 비용 증가가 문제이고, 지원 자동화 도입을 제안하려 함"
  );

  assert.strictEqual(intent.artifactType, "proposal_outline", "customer proposal should keep proposal artifact");
  assert.ok(prompt.includes("제안서 본문 초안"), "proposal write request should compile as body draft");
  assert.ok(prompt.includes("고객 문제"), "proposal write request should include customer problem");
  assert.ok(!prompt.includes("제안서 구조를 잡는다"), "proposal write request should not use outline-only task");
  assert.ok(!prompt.includes("제안서 구조를 바로 확장"), "proposal write request should not use outline-only contract");
}

{
  const { intent, prompt } = compileWithContext(
    "점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘",
    "예정 점검으로 23시부터 30분간 접속 불가, 완료 후 공지 예정"
  );

  assert.strictEqual(intent.artifactType, "outage_notice", "planned maintenance should keep notice artifact");
  assert.ok(prompt.includes("점검/접속 제한 사전 안내문"), "planned maintenance should use planned notice framing");
  assert.ok(prompt.includes("사전 안내와 협조 요청"), "planned maintenance should prioritize advance notice");
  assert.ok(!prompt.includes("서비스 장애 공지"), "planned maintenance should not use unplanned outage output");
  assert.ok(!prompt.includes("책임 회피보다 사과"), "planned maintenance should not use outage apology contract");
}

{
  const { intent, prompt } = compileWithContext(
    "신규 거래처에 보낼 제안서 작성해줘",
    "신규 거래처는 기존 수작업 때문에 응답 시간이 길어져 자동화 도입을 검토 중"
  );

  assert.strictEqual(intent.artifactType, "proposal_outline", "held-out proposal write should classify as proposal artifact");
  assert.ok(prompt.includes("제안서 본문 초안"), "held-out proposal write should compile as body draft");
  assert.ok(!prompt.includes("제안서 구조를 잡는다"), "held-out proposal write should not fall back to outline task");
}

{
  const { intent, prompt } = compileWithContext(
    "정기 점검 사전 안내문 써줘",
    "정기 점검으로 02시부터 20분간 일부 기능 사용 제한, 완료 후 다시 안내 예정"
  );

  assert.strictEqual(intent.artifactType, "outage_notice", "held-out planned notice should classify as notice artifact");
  assert.ok(prompt.includes("점검/접속 제한 사전 안내문"), "held-out planned notice should use planned maintenance framing");
  assert.ok(prompt.includes("예정 시간"), "held-out planned notice should preserve planned schedule structure");
  assert.ok(!prompt.includes("서비스 장애 공지"), "held-out planned notice should not use outage default output");
}

process.stdout.write("contextLine tests ok\n");
