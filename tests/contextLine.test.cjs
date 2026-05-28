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

assert.strictEqual(contextCases.length, 17, "context line coverage should include promoted core 15 + backlog 2 cases");

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

process.stdout.write("contextLine tests ok\n");
