const fs = require("fs");
const path = require("path");
const vm = require("vm");
const probes = require("./fixtures/generalityProbe.cjs");

const root = path.join(__dirname, "..");
const outputPath = path.join(root, "docs", "GENERALITY_AUDIT.md");
const REQUIRED_CATEGORIES = [
  "hr",
  "pm",
  "dev",
  "finance",
  "legal",
  "education",
  "research",
  "reporting",
  "email",
  "notice",
  "retrospective",
  "document",
  "planning",
  "data",
  "personal"
];
const COMMON_WORK_CATEGORIES = new Set(["reporting", "email", "notice", "retrospective", "document", "hr", "pm"]);
const EXPECTED_BEHAVIORS = new Set(["clarify_mc", "clarify_context", "suppress"]);

global.window = global;

for (const file of [
  "src/core/templates.js",
  "src/core/promptPatterns.js",
  "src/core/ruleEngine.js",
  "src/core/briefCompiler.js"
]) {
  vm.runInThisContext(fs.readFileSync(path.join(root, file), "utf8"), { filename: file });
}

function assertProbeShape() {
  if (!Array.isArray(probes) || probes.length < 45 || probes.length > 60) {
    throw new Error(`generalityProbe.cjs must export 45-60 cases; got ${Array.isArray(probes) ? probes.length : "non-array"}`);
  }

  const seenCategories = new Set();
  probes.forEach((probe, index) => {
    const expectedId = `g${String(index + 1).padStart(3, "0")}`;
    if (probe.id !== expectedId) {
      throw new Error(`Probe ${index + 1} must have id ${expectedId}; got ${probe.id}`);
    }
    if (!probe.draft || typeof probe.draft !== "string") {
      throw new Error(`${probe.id} draft must be a non-empty string`);
    }
    if (!REQUIRED_CATEGORIES.includes(probe.category)) {
      throw new Error(`${probe.id} category must be one of ${REQUIRED_CATEGORIES.join(", ")}`);
    }
    if (!EXPECTED_BEHAVIORS.has(probe.expectedBehavior)) {
      throw new Error(`${probe.id} expectedBehavior must be clarify_mc, clarify_context, or suppress`);
    }
    seenCategories.add(probe.category);
  });

  const missingCategories = REQUIRED_CATEGORIES.filter((category) => !seenCategories.has(category));
  if (missingCategories.length) {
    throw new Error(`Probe fixture missing required categories: ${missingCategories.join(", ")}`);
  }
}

function percent(count, total) {
  if (!total) return "0.0%";
  return `${((count / total) * 100).toFixed(1)}%`;
}

function escapeTable(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

function isGenericArtifact(artifactType) {
  return !artifactType || artifactType === "none" || artifactType.startsWith("generic_");
}

function inferActualBehavior(shouldShow, questions) {
  if (!shouldShow) return "suppress";
  if (questions.some((question) => question.inputType === "context_line")) return "clarify_context";
  return "clarify_mc";
}

function classifyQuestionSpecificity(record) {
  if (record.actualBehavior === "suppress") return "none";
  if (record.isGenericArtifact) return "generic";
  return "specific";
}

function summarizeQuestions(record) {
  if (!record.questionLabels.length) return "질문 없음";
  return `${record.questionSpecificity}: ${record.questionLabels.join(" / ")}`;
}

function countBy(items, keyFn) {
  return items.reduce((result, item) => {
    const key = keyFn(item);
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
}

function groupBy(items, keyFn) {
  return items.reduce((result, item) => {
    const key = keyFn(item);
    result[key] = result[key] || [];
    result[key].push(item);
    return result;
  }, {});
}

function analyzeProbe(probe) {
  const shouldShow = window.CBSRuleEngine.shouldShowClarify(probe.draft);
  const intent = window.CBSRuleEngine.analyzeIntent(probe.draft);
  const questions = shouldShow ? window.CBSRuleEngine.planQuestions(intent) : [];
  const actualBehavior = inferActualBehavior(shouldShow, questions);
  const artifactType = intent.artifactType || "none";
  const genericArtifact = isGenericArtifact(artifactType);
  const record = {
    id: probe.id,
    draft: probe.draft,
    category: probe.category,
    expectedBehavior: probe.expectedBehavior,
    actualBehavior,
    shouldShowClarify: shouldShow,
    artifactType,
    taskType: intent.taskType || "",
    questionCount: questions.length,
    questionLabels: questions.map((question) => question.label || ""),
    isGenericArtifact: genericArtifact
  };
  record.questionSpecificity = classifyQuestionSpecificity(record);
  record.questionSummary = summarizeQuestions(record);
  return record;
}

function buildCategoryRows(records) {
  const grouped = groupBy(records, (record) => record.category);
  return REQUIRED_CATEGORIES.map((category) => {
    const items = grouped[category] || [];
    return {
      category,
      n: items.length,
      trigger: items.filter((item) => item.actualBehavior !== "suppress").length,
      suppress: items.filter((item) => item.actualBehavior === "suppress").length,
      genericArtifact: items.filter((item) => item.actualBehavior !== "suppress" && item.isGenericArtifact).length
    };
  });
}

function formatCaseList(items) {
  if (!items.length) return "- 없음";
  return items.map((item) => `- ${item.id} [${item.category}] ${item.draft} → expected=${item.expectedBehavior}, actual=${item.actualBehavior}, artifact=${item.artifactType}`).join("\n");
}

function buildPriorityRows(domainExpansionCandidates) {
  const grouped = groupBy(domainExpansionCandidates, (record) => record.category);
  return Object.entries(grouped)
    .map(([category, items]) => ({
      category,
      count: items.length,
      examples: items.slice(0, 3).map((item) => item.draft)
    }))
    .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category))
    .slice(0, 5);
}

function buildMarkdown(data) {
  const {
    generatedAt,
    records,
    total,
    triggerCount,
    suppressCount,
    modeCounts,
    genericClarifyCount,
    clarifyCount,
    categoryRows,
    shouldHaveShown,
    shouldHaveSuppressed,
    domainExpansionCandidates,
    priorityRows
  } = data;

  const lines = [
    "# Generality & Domain Audit",
    "",
    `생성 일시: ${generatedAt}`,
    "",
    "이 문서는 측정 전용 리포트입니다. 제품 로직, core rule/compiler, runtime, governance 산출물은 변경하지 않습니다.",
    "",
    "## 1. 한 줄 요약",
    "",
    `총 ${total}개 probe 중 trigger율은 ${percent(triggerCount, total)}(${triggerCount}건), suppress율은 ${percent(suppressCount, total)}(${suppressCount}건), clarify 중 generic artifact 비율은 ${percent(genericClarifyCount, clarifyCount)}(${genericClarifyCount}/${clarifyCount}건)입니다.`,
    "",
    "## 2. 전체 지표",
    "",
    `- 총 probe 수: ${total}`,
    `- trigger: ${triggerCount} (${percent(triggerCount, total)})`,
    `- suppress: ${suppressCount} (${percent(suppressCount, total)})`,
    `- clarify_mc: ${modeCounts.clarify_mc || 0}`,
    `- clarify_context: ${modeCounts.clarify_context || 0}`,
    `- suppress: ${modeCounts.suppress || 0}`,
    `- clarify 중 artifactType none/generic_*: ${genericClarifyCount} (${percent(genericClarifyCount, clarifyCount)})`,
    "",
    "## 3. 카테고리별 표",
    "",
    "| category | n | trigger | suppress | genericArtifact |",
    "| --- | ---: | ---: | ---: | ---: |",
    ...categoryRows.map((row) => `| ${row.category} | ${row.n} | ${row.trigger} | ${row.suppress} | ${row.genericArtifact} |`),
    "",
    "## 4. 불일치 목록",
    "",
    "### (a) 떠야 하는데 안 뜸",
    "",
    formatCaseList(shouldHaveShown),
    "",
    "### (b) 안 떠야 하는데 뜸",
    "",
    formatCaseList(shouldHaveSuppressed),
    "",
    "### (c) 도메인 확장 후보",
    "",
    "clarify는 떴으나 artifactType이 none/generic_*이고 흔한 업무 카테고리(reporting/email/notice/retrospective/document/hr/pm)에 속한 케이스입니다.",
    "",
    formatCaseList(domainExpansionCandidates),
    "",
    "## 5. 확장 우선순위 TOP 5",
    "",
    "빈도는 이 probe fixture 안에서의 등장 수만 근거로 계산했습니다.",
    "",
    "| rank | category | 빈도 | 예시 |",
    "| ---: | --- | ---: | --- |",
    ...(priorityRows.length
      ? priorityRows.map((row, index) => `| ${index + 1} | ${row.category} | ${row.count} | ${escapeTable(row.examples.join(" / "))} |`)
      : ["| - | 없음 | 0 | - |"]),
    "",
    "## 6. 원자료 표",
    "",
    "| id | draft | category | expected | actual | artifactType | taskType | questions | isGenericArtifact |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...records.map((record) =>
      [
        record.id,
        escapeTable(record.draft),
        record.category,
        record.expectedBehavior,
        record.actualBehavior,
        record.artifactType,
        record.taskType,
        escapeTable(record.questionSummary),
        record.isGenericArtifact ? "true" : "false"
      ].join(" | ")
    ).map((row) => `| ${row} |`)
  ];

  return `${lines.join("\n")}\n`;
}

function printSummary(data) {
  const {
    total,
    triggerCount,
    suppressCount,
    clarifyCount,
    genericClarifyCount,
    shouldHaveShown,
    shouldHaveSuppressed,
    domainExpansionCandidates,
    priorityRows
  } = data;

  process.stdout.write("Generality & Domain Audit\n");
  process.stdout.write(`- total: ${total}\n`);
  process.stdout.write(`- trigger: ${triggerCount} (${percent(triggerCount, total)})\n`);
  process.stdout.write(`- suppress: ${suppressCount} (${percent(suppressCount, total)})\n`);
  process.stdout.write(`- generic among clarify: ${genericClarifyCount}/${clarifyCount} (${percent(genericClarifyCount, clarifyCount)})\n`);
  process.stdout.write(`- should show but suppressed: ${shouldHaveShown.length}\n`);
  process.stdout.write(`- should suppress but triggered: ${shouldHaveSuppressed.length}\n`);
  process.stdout.write(`- domain expansion candidates: ${domainExpansionCandidates.length}\n`);
  process.stdout.write("- priority top 5:\n");
  if (!priorityRows.length) {
    process.stdout.write("  - none\n");
  } else {
    priorityRows.forEach((row, index) => {
      process.stdout.write(`  ${index + 1}. ${row.category}: ${row.count}\n`);
    });
  }
  process.stdout.write(`Report: ${path.relative(root, outputPath)}\n`);
}

function main() {
  assertProbeShape();

  const records = probes.map(analyzeProbe);
  const total = records.length;
  const triggerCount = records.filter((record) => record.actualBehavior !== "suppress").length;
  const suppressCount = total - triggerCount;
  const clarifyCount = triggerCount;
  const modeCounts = countBy(records, (record) => record.actualBehavior);
  const genericClarifyCount = records.filter((record) => record.actualBehavior !== "suppress" && record.isGenericArtifact).length;
  const shouldHaveShown = records.filter((record) => record.expectedBehavior !== "suppress" && record.actualBehavior === "suppress");
  const shouldHaveSuppressed = records.filter((record) => record.expectedBehavior === "suppress" && record.actualBehavior !== "suppress");
  const domainExpansionCandidates = records.filter(
    (record) =>
      record.actualBehavior !== "suppress" &&
      record.isGenericArtifact &&
      COMMON_WORK_CATEGORIES.has(record.category)
  );
  const priorityRows = buildPriorityRows(domainExpansionCandidates);
  const categoryRows = buildCategoryRows(records);
  const data = {
    generatedAt: new Date().toISOString(),
    records,
    total,
    triggerCount,
    suppressCount,
    clarifyCount,
    modeCounts,
    genericClarifyCount,
    categoryRows,
    shouldHaveShown,
    shouldHaveSuppressed,
    domainExpansionCandidates,
    priorityRows
  };

  fs.writeFileSync(outputPath, buildMarkdown(data), "utf8");
  printSummary(data);
}

main();
