const fs = require("fs");
const path = require("path");
const vm = require("vm");
const promptCases = require("./fixtures/promptCases.cjs");

global.window = global;

for (const file of [
  "src/core/templates.js",
  "src/core/promptPatterns.js",
  "src/core/ruleEngine.js",
  "src/core/briefCompiler.js"
]) {
  vm.runInThisContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), { filename: file });
}

const outputPath = path.join(__dirname, "..", "docs", "PREVIEW_REVIEW.md");
const RECOMMEND_OPTION = "추천해줘";

function fenced(value, language = "text") {
  return `\`\`\`${language}\n${String(value || "").replace(/```/g, "'''")}\n\`\`\``;
}

function firstReviewOption(question) {
  return question.options.find((option) => option !== RECOMMEND_OPTION && option !== window.CBSTemplates.RECOMMEND_OPTION) || question.options[0] || "";
}

function assumedAnswersFor(questions, draft, taskType, domain, sampleAnswers = {}) {
  return questions.reduce((answers, question) => {
    if (question.inputType === "context_line") {
      return answers;
    }

    answers[question.slot] = window.CBSRuleEngine.selectAssumedAnswer(question, draft, taskType, domain, sampleAnswers) || firstReviewOption(question);
    return answers;
  }, {});
}

function contextLineFor(caseItem, intent) {
  if (caseItem.sampleContextLine) {
    return caseItem.sampleContextLine;
  }

  return intent.needsContextLine ? "" : "";
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    const value = item[key] || "unknown";
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function renderDistribution(title, distribution) {
  const entries = Object.entries(distribution).sort(([left], [right]) => left.localeCompare(right));
  return [`### ${title}`, "", ...entries.map(([key, count]) => `- \`${key}\`: ${count}`)].join("\n");
}

function renderQuestions(questions) {
  if (!questions.length) {
    return "_No questions returned._";
  }

  return questions
    .map((question, index) => {
      if (question.inputType === "context_line") {
        return [
          `### Q${index + 1}. ${question.label}`,
          "",
          "- inputType: `context_line`",
          `- placeholder: ${question.placeholder || "한 줄 맥락"}`
        ].join("\n");
      }

      const options = question.options.map((option) => `- ${option}`).join("\n");
      return `### Q${index + 1}. ${question.label}\n\n${options}`;
    })
    .join("\n\n");
}

function renderAnswers(answers) {
  const entries = Object.entries(answers);
  if (!entries.length) {
    return "_No assumed answers._";
  }

  return entries.map(([slot, value]) => `- ${slot}: ${value}`).join("\n");
}

function renderObjectMap(value) {
  const entries = Object.entries(value || {});
  if (!entries.length) {
    return "- none";
  }

  return entries.map(([key, item]) => `- ${key}: ${Array.isArray(item) ? item.join(", ") : item}`).join("\n");
}

function renderArrayList(values) {
  if (!values || !values.length) {
    return "- none";
  }

  return values.map((value) => `- ${value}`).join("\n");
}

function buildReviewCase(caseItem) {
  const intent = window.CBSRuleEngine.analyzeIntent(caseItem.draft);
  const shouldShowClarify = intent.shouldClarify;
  const domain = intent.domain;
  const taskType = intent.taskType;
  const questions = window.CBSRuleEngine.planQuestions(intent);
  const answers = shouldShowClarify ? assumedAnswersFor(questions, caseItem.draft, taskType, domain, caseItem.sampleAnswers) : {};
  const contextLine = shouldShowClarify ? contextLineFor(caseItem, intent) : "";
  const compiledPrompt = shouldShowClarify
    ? window.CBSBriefCompiler.compileBrief({
        draft: caseItem.draft,
        domain,
        taskType,
        answers,
        intent,
        contextLine
      })
    : "";

  return {
    ...caseItem,
    caseSource: caseItem.caseSource || "core",
    domainPack: caseItem.domainPack || "generic",
    clarificationMode: caseItem.clarificationMode || (caseItem.shouldShowClarify === false ? "suppress" : "multiple_choice"),
    expectedShouldShowClarify: caseItem.expectedShouldShowClarify ?? caseItem.shouldShowClarify,
    expectedArtifactType: caseItem.expectedArtifactType || "not specified",
    shouldShowClarifyActual: shouldShowClarify,
    domainActual: domain,
    domainConfidenceActual: intent.domainConfidence,
    taskTypeActual: taskType,
    artifactTypeActual: intent.artifactType,
    filledSlots: intent.filledSlots,
    missingSlots: intent.missingSlots,
    suggestedSlots: intent.suggestedSlots,
    needsContextLine: !!intent.needsContextLine,
    questions: shouldShowClarify ? questions : [],
    answers,
    contextLine,
    compiledPrompt,
    promptLength: compiledPrompt.length
  };
}

function renderCase(caseItem, index) {
  const clarifyBehavior = caseItem.shouldShowClarifyActual
    ? ""
    : [
        "Clarify behavior:",
        "",
        "> 이 케이스는 런타임에서 Clarify chip을 표시하지 않습니다.",
        ""
      ].join("\n");
  const questionsText = caseItem.shouldShowClarifyActual ? renderQuestions(caseItem.questions) : "Skipped in runtime.";
  const answersText = caseItem.shouldShowClarifyActual ? renderAnswers(caseItem.answers) : "Skipped in runtime.";
  const contextLineText =
    caseItem.shouldShowClarifyActual && caseItem.needsContextLine
      ? fenced(caseItem.contextLine || "No sample context line provided.")
      : caseItem.shouldShowClarifyActual
        ? "_Not used for this case._"
        : "Skipped in runtime.";
  const promptText = caseItem.shouldShowClarifyActual ? fenced(caseItem.compiledPrompt) : "Skipped in runtime.";
  const expectedTaskType = caseItem.expectedTaskType || (caseItem.expectedTaskTypes || []).join(" or ") || "not specified";

  return [
    `## Case ${index + 1}. ${caseItem.name}`,
    "",
    "Draft:",
    fenced(caseItem.draft),
    "",
    "Expected:",
    "",
    `- caseSource: \`${caseItem.caseSource}\``,
    `- domainPack: \`${caseItem.domainPack}\``,
    `- clarificationMode: \`${caseItem.clarificationMode}\``,
    `- shouldShowClarify: \`${caseItem.expectedShouldShowClarify}\``,
    `- expectedTaskType: \`${expectedTaskType}\``,
    `- expectedDomain: \`${caseItem.expectedDomain || "not specified"}\``,
    `- expectedArtifactType: \`${caseItem.expectedArtifactType}\``,
    "",
    "Actual:",
    "",
    `- shouldShowClarify: \`${caseItem.shouldShowClarifyActual}\``,
    `- taskType: \`${caseItem.taskTypeActual}\``,
    `- domain: \`${caseItem.domainActual}\``,
    `- domainConfidence: \`${caseItem.domainConfidenceActual.toFixed(2)}\``,
    `- artifactType: \`${caseItem.artifactTypeActual}\``,
    `- needsContextLine: \`${caseItem.needsContextLine}\``,
    "",
    "Filled Slots:",
    renderObjectMap(caseItem.filledSlots),
    "",
    "Missing Slots:",
    renderArrayList(caseItem.missingSlots),
    "",
    "Suggested Slots:",
    renderArrayList(caseItem.suggestedSlots),
    "",
    clarifyBehavior,
    "Questions:",
    "",
    questionsText,
    "",
    "Assumed Answers:",
    "",
    answersText,
    "",
    "Context Line:",
    "",
    contextLineText,
    "",
    "Compiled Prompt:",
    "",
    promptText,
    "",
    "Human Review:",
    "",
    "- 명확성 1~5:",
    "- 사용자 의도 반영 1~5:",
    "- 실행 가능성 1~5:",
    "- 과도하게 장황한가 1~5:",
    "- ChatGPT에 넣고 싶은가 1~5:",
    "- 수정 메모:",
    ""
  ]
    .filter((line) => line !== "")
    .join("\n");
}

const reviewCases = promptCases.map(buildReviewCase);
const clarifyTrueCount = reviewCases.filter((caseItem) => caseItem.shouldShowClarifyActual).length;
const clarifyFalseCount = reviewCases.length - clarifyTrueCount;
const coreCaseCount = reviewCases.filter((caseItem) => caseItem.caseSource === "core").length;
const candidateCaseCount = reviewCases.filter((caseItem) => caseItem.caseSource === "candidate").length;
const over1200Count = reviewCases.filter((caseItem) => caseItem.promptLength > 1200).length;
const over1600Count = reviewCases.filter((caseItem) => caseItem.promptLength > 1600).length;
const genericDomainCount = reviewCases.filter((caseItem) => caseItem.domainActual === "generic").length;
const contextLineCount = reviewCases.filter((caseItem) => caseItem.needsContextLine).length;
const averageQuestions = clarifyTrueCount
  ? reviewCases
      .filter((caseItem) => caseItem.shouldShowClarifyActual)
      .reduce((total, caseItem) => total + caseItem.questions.length, 0) / clarifyTrueCount
  : 0;

const documentBody = [
  "# Preview Review Pack v1",
  "",
  "이 문서는 Prompt Quality Harness fixture를 기반으로 각 draft의 질문, 기본 선택값, compiled prompt를 사람이 눈으로 검토하기 위한 문서입니다. 런타임 기능이 아니며 prompt text를 저장하는 제품 기능도 아닙니다.",
  "",
  "- Source fixture: `tests/fixtures/promptCases.cjs`",
  "- Generator: `tests/generatePreviewReview.cjs`",
  "- Output: `docs/PREVIEW_REVIEW.md`",
  "",
  "## Summary",
  "",
  `- total cases: ${reviewCases.length}`,
  `- core cases: ${coreCaseCount}`,
  `- candidate cases: ${candidateCaseCount}`,
  `- clarify true count: ${clarifyTrueCount}`,
  `- clarify false count: ${clarifyFalseCount}`,
  `- generic domain count: ${genericDomainCount}`,
  `- context line count: ${contextLineCount}`,
  `- average questions per clarify case: ${averageQuestions.toFixed(2)}`,
  `- prompts over 1200 chars count: ${over1200Count}`,
  `- prompts over 1600 chars count: ${over1600Count}`,
  "",
  renderDistribution("TaskType Distribution", countBy(reviewCases, "taskTypeActual")),
  "",
  renderDistribution("Domain Distribution", countBy(reviewCases, "domainActual")),
  "",
  renderDistribution("Domain Pack Distribution", countBy(reviewCases, "domainPack")),
  "",
  renderDistribution("Clarification Mode Distribution", countBy(reviewCases, "clarificationMode")),
  "",
  renderDistribution("Case Source Distribution", countBy(reviewCases, "caseSource")),
  "",
  renderDistribution("ArtifactType Distribution", countBy(reviewCases, "artifactTypeActual")),
  "",
  "## Assumed Answer Rule",
  "",
  "- If a fixture case has `sampleAnswers`, those values are used first.",
  "- If a fixture case has `sampleContextLine`, that value is used for `context_line` preview compilation.",
  "- Otherwise, the first concrete option that is not `추천해줘` is selected after intent-aware option ranking.",
  "- The assumed answers are used only to generate this offline review artifact.",
  "",
  reviewCases.map(renderCase).join("\n---\n\n")
].join("\n");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, documentBody, "utf8");
process.stdout.write(`Preview review generated: ${path.relative(process.cwd(), outputPath)} (${reviewCases.length} cases)\n`);
