const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const inputPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.json");
const outputPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.md");
const fixturePath = path.join(root, "tests", "fixtures", "promptCases.cjs");
const promptCases = fs.existsSync(fixturePath) ? require(fixturePath) : [];

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing judge JSON report: ${path.relative(process.cwd(), filePath)}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeCell(value) {
  return String(value == null ? "" : value)
    .replace(/\r?\n/g, "<br>")
    .replace(/\|/g, "\\|");
}

function formatProblems(problems) {
  if (!problems || !problems.length) {
    return "None";
  }

  return problems.join("<br>");
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`)
  ].join("\n");
}

function renderP0Fixes(cases) {
  const p0Cases = cases.filter((caseItem) => caseItem.priority === "P0" || caseItem.verdict === "KILL");

  if (!p0Cases.length) {
    return "No P0 fixes reported.";
  }

  return markdownTable(
    ["Case", "Source", "Domain Pack", "Draft", "Problem", "Recommended Fix", "Target File"],
    p0Cases.map((caseItem) => [
      `${caseItem.caseNumber}. ${caseItem.caseName}`,
      getCaseMetadata(caseItem).caseSource,
      getCaseMetadata(caseItem).domainPack,
      caseItem.draft,
      formatProblems(caseItem.problems),
      caseItem.recommendedFix,
      "See Patch Plan"
    ])
  );
}

function renderCaseScores(cases) {
  return markdownTable(
    [
      "Case",
      "Source",
      "Domain Pack",
      "Mode",
      "Verdict",
      "Clarity",
      "Intent Fit",
      "Question",
      "Options",
      "Prompt",
      "Compactness",
      "Insert Score",
      "Priority"
    ],
    cases.map((caseItem) => [
      `${caseItem.caseNumber}. ${caseItem.caseName}`,
      getCaseMetadata(caseItem).caseSource,
      getCaseMetadata(caseItem).domainPack,
      getCaseMetadata(caseItem).clarificationMode,
      caseItem.verdict,
      caseItem.scores.clarity,
      caseItem.scores.intentFit,
      caseItem.scores.questionUsefulness,
      caseItem.scores.optionSpecificity,
      caseItem.scores.promptUsefulness,
      caseItem.scores.compactness,
      caseItem.scores.userWouldInsert,
      caseItem.priority
    ])
  );
}

function getCaseMetadata(caseItem) {
  const fixture = promptCases[caseItem.caseNumber - 1] || {};
  return {
    caseSource: fixture.caseSource || "unknown",
    domainPack: fixture.domainPack || "unknown",
    clarificationMode: fixture.clarificationMode || "unknown"
  };
}

function renderPatchPlan(patchPlan) {
  if (!patchPlan || !patchPlan.length) {
    return "No patch plan items reported.";
  }

  return markdownTable(
    ["Priority", "Target File", "Issue", "Suggested Change", "Affected Cases"],
    patchPlan.map((item) => [
      item.priority,
      item.targetFile,
      item.issue,
      item.suggestedChange,
      (item.affectedCases || []).join(", ")
    ])
  );
}

function renderReport(report) {
  const cases = report.cases || [];
  const counts = cases.reduce(
    (result, caseItem) => {
      result[caseItem.verdict] = (result[caseItem.verdict] || 0) + 1;
      result.userWouldInsertTotal += Number(caseItem.scores && caseItem.scores.userWouldInsert) || 0;
      return result;
    },
    { PASS: 0, FIX: 0, KILL: 0, userWouldInsertTotal: 0 }
  );
  const summary = {
    ...(report.summary || {}),
    totalCases: cases.length,
    passCount: counts.PASS,
    fixCount: counts.FIX,
    killCount: counts.KILL,
    averageUserWouldInsertScore: cases.length ? Number((counts.userWouldInsertTotal / cases.length).toFixed(2)) : 0
  };
  const topProblems = summary.topProblems && summary.topProblems.length
    ? summary.topProblems.map((problem) => `- ${problem}`).join("\n")
    : "- None";

  return [
    "# Preview Judge Report",
    "",
    "## Summary",
    `- total cases: ${summary.totalCases}`,
    `- PASS count: ${summary.passCount}`,
    `- FIX count: ${summary.fixCount}`,
    `- KILL count: ${summary.killCount}`,
    `- average userWouldInsert score: ${summary.averageUserWouldInsertScore}`,
    `- recommended next action: ${summary.recommendedNextAction}`,
    "",
    "## Top Problems",
    topProblems,
    "",
    "## P0 Fixes",
    renderP0Fixes(cases),
    "",
    "## Case Scores",
    renderCaseScores(cases),
    "",
    "## Patch Plan",
    renderPatchPlan(report.patchPlan),
    "",
    "## Review Policy",
    "This report is an automated judge result. Final product decisions must still be validated through external user testing.",
    ""
  ].join("\n");
}

const report = readJson(inputPath);
fs.writeFileSync(outputPath, renderReport(report), "utf8");
process.stdout.write(`Preview judge Markdown generated: ${path.relative(process.cwd(), outputPath)}\n`);
