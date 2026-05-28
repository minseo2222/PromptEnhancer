const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const reportJsonPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.json");
const reportMarkdownPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.md");
const fixturePath = path.join(root, "tests", "fixtures", "promptCases.cjs");

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function hasHangul(value) {
  return /[\uAC00-\uD7AF]/.test(String(value || ""));
}

function hasQuestionMarkPlaceholder(value) {
  const text = String(value || "");
  return /\?\?\?/.test(text) || /(?:^|\s)\?\?(?:\s|$)/.test(text);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Could not parse JSON report: ${error.message}`);
  }
}

function failEncoding(message) {
  fail(`${message}\nJudge report appears to have lost UTF-8 Korean text. Do not trust PASS/FIX/KILL results.`);
}

if (!fs.existsSync(reportJsonPath)) {
  fail(`Missing judge JSON report: ${path.relative(process.cwd(), reportJsonPath)}`);
}

const report = readJson(reportJsonPath);
const promptCases = loadPromptCasesForReport(report);

function loadPromptCases(includeCandidates) {
  const previous = process.env.INCLUDE_CANDIDATES;
  if (includeCandidates) {
    process.env.INCLUDE_CANDIDATES = "1";
  } else {
    delete process.env.INCLUDE_CANDIDATES;
  }

  delete require.cache[require.resolve(fixturePath)];
  const cases = require(fixturePath);

  if (previous == null) {
    delete process.env.INCLUDE_CANDIDATES;
  } else {
    process.env.INCLUDE_CANDIDATES = previous;
  }

  return cases;
}

function loadPromptCasesForReport(report) {
  const defaultCases = loadPromptCases(false);
  if (!Array.isArray(report.cases) || report.cases.length === defaultCases.length) {
    return defaultCases;
  }

  const candidateCases = loadPromptCases(true);
  if (report.cases.length === candidateCases.length) {
    return candidateCases;
  }

  return defaultCases;
}

if (!report.summary || typeof report.summary !== "object") {
  fail("Judge report does not contain a summary object.");
}

if (!Array.isArray(report.cases)) {
  fail("Judge report does not contain a cases array.");
}

if (report.cases.length !== promptCases.length) {
  fail(`Judge report case count mismatch. Expected ${promptCases.length}, got ${report.cases.length}.`);
}

for (const [index, fixture] of promptCases.entries()) {
  const caseItem = report.cases.find((item) => item.caseName === fixture.name) || report.cases[index];
  if (!caseItem) {
    fail(`Missing judge case for fixture: ${fixture.name}`);
  }

  if (hasQuestionMarkPlaceholder(caseItem.draft)) {
    failEncoding(`Judge case draft contains question-mark placeholders: ${caseItem.caseName}`);
  }

  if (hasHangul(fixture.draft) && !hasHangul(caseItem.draft)) {
    failEncoding(`Judge case draft lost Korean text: ${caseItem.caseName}`);
  }
}

const topProblems = ((report.summary && report.summary.topProblems) || []).map((problem) => String(problem).toLowerCase());
for (const problem of topProblems) {
  if (problem.includes("question-mark") || (problem.includes("placeholder") && problem.includes("question"))) {
    failEncoding("Judge summary reports question-mark placeholder encoding loss.");
  }
}

if (fs.existsSync(reportMarkdownPath)) {
  const markdown = fs.readFileSync(reportMarkdownPath, "utf8");
  const placeholderMatches = markdown.match(/\?\?\?/g) || [];
  if (placeholderMatches.length > 0) {
    failEncoding(`Markdown judge report contains ${placeholderMatches.length} triple-question-mark placeholders.`);
  }
}

const counts = report.cases.reduce(
  (result, caseItem) => {
    if (!["PASS", "FIX", "KILL"].includes(caseItem.verdict)) {
      fail(`Invalid verdict for case ${caseItem.caseName}: ${caseItem.verdict}`);
    }

    result[caseItem.verdict] += 1;
    const score = caseItem.scores && Number(caseItem.scores.userWouldInsert);
    if (!Number.isFinite(score)) {
      fail(`Missing userWouldInsert score for case ${caseItem.caseName}`);
    }
    result.userWouldInsertTotal += score;
    return result;
  },
  { PASS: 0, FIX: 0, KILL: 0, userWouldInsertTotal: 0 }
);

const average = report.cases.length ? counts.userWouldInsertTotal / report.cases.length : 0;

if (report.summary.totalCases !== report.cases.length) {
  fail(`summary.totalCases mismatch. Summary=${report.summary.totalCases}, cases=${report.cases.length}`);
}

if (report.summary.passCount !== counts.PASS) {
  fail(`summary.passCount mismatch. Summary=${report.summary.passCount}, cases=${counts.PASS}`);
}

if (report.summary.fixCount !== counts.FIX) {
  fail(`summary.fixCount mismatch. Summary=${report.summary.fixCount}, cases=${counts.FIX}`);
}

if (report.summary.killCount !== counts.KILL) {
  fail(`summary.killCount mismatch. Summary=${report.summary.killCount}, cases=${counts.KILL}`);
}

if (Math.abs(Number(report.summary.averageUserWouldInsertScore) - average) > 0.05) {
  fail(
    `summary.averageUserWouldInsertScore mismatch. Summary=${report.summary.averageUserWouldInsertScore}, cases=${average.toFixed(2)}`
  );
}

process.stdout.write("judge report validation ok\n");
