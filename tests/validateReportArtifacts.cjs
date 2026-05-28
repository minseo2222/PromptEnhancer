const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const paths = {
  candidateFixtures: path.join(root, "tests", "fixtures", "candidateExpansionCases.cjs"),
  promptCases: path.join(root, "tests", "fixtures", "promptCases.cjs"),
  previewReview: path.join(root, "docs", "PREVIEW_REVIEW.md"),
  judgeJson: path.join(root, "docs", "PREVIEW_JUDGE_REPORT.json"),
  judgeMarkdown: path.join(root, "docs", "PREVIEW_JUDGE_REPORT.md"),
  expansionReport: path.join(root, "docs", "DOMAIN_EXPANSION_REPORT.md")
};

const FAILURE_MESSAGE = "Report artifacts are out of sync. Do not promote candidates until regenerated.";

function fail(message) {
  process.stderr.write(`${FAILURE_MESSAGE}\n${message}\n`);
  process.exit(1);
}

function assertFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing artifact: ${path.relative(root, filePath)}`);
  }
}

function readText(filePath) {
  assertFile(filePath);
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  try {
    return JSON.parse(readText(filePath));
  } catch (error) {
    fail(`Invalid JSON in ${path.relative(root, filePath)}: ${error.message}`);
  }
}

function loadPromptCases(includeCandidates) {
  const previous = process.env.INCLUDE_CANDIDATES;
  if (includeCandidates) {
    process.env.INCLUDE_CANDIDATES = "1";
  } else {
    delete process.env.INCLUDE_CANDIDATES;
  }

  delete require.cache[require.resolve(paths.promptCases)];
  const cases = require(paths.promptCases);

  if (previous == null) {
    delete process.env.INCLUDE_CANDIDATES;
  } else {
    process.env.INCLUDE_CANDIDATES = previous;
  }

  return cases;
}

function parseBulletNumber(markdown, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`- ${escaped}:\\s*([0-9]+)`, "i"));
  return match ? Number(match[1]) : null;
}

function parseExpansionDecision(markdown) {
  const match = markdown.match(/- decision:\s*([A-Z_]+)/);
  return match ? match[1] : null;
}

function countVerdicts(cases) {
  return cases.reduce(
    (counts, caseItem) => {
      if (caseItem.verdict === "PASS") counts.passCount += 1;
      if (caseItem.verdict === "FIX") counts.fixCount += 1;
      if (caseItem.verdict === "KILL") counts.killCount += 1;
      return counts;
    },
    { passCount: 0, fixCount: 0, killCount: 0 }
  );
}

function assertEqual(label, actual, expected) {
  if (actual !== expected) {
    fail(`${label} mismatch. Actual=${actual}, expected=${expected}`);
  }
}

function assertNoQuestionMarkPlaceholder(markdown, artifactName) {
  if (/question-mark placeholders/i.test(markdown) || /placeholder question marks/i.test(markdown)) {
    fail(`${artifactName} reports question-mark placeholder encoding loss.`);
  }

  const lines = markdown
    .split(/\r?\n/)
    .filter((line) => /\?\?/.test(line) && !/https?:\/\//.test(line));

  if (lines.length > 5) {
    fail(`${artifactName} contains excessive question-mark placeholders (${lines.length} lines).`);
  }
}

const candidateCases = require(paths.candidateFixtures);
const coreCases = loadPromptCases(false);
const allCases = loadPromptCases(true);
const candidateCount = candidateCases.length;
const expectedTotalCases = coreCases.length + candidateCount;

const judgeJson = readJson(paths.judgeJson);
const judgeCases = Array.isArray(judgeJson.cases) ? judgeJson.cases : fail("Judge JSON does not contain cases array.");
const judgeSummary = judgeJson.summary || {};
const judgeCounts = countVerdicts(judgeCases);

assertEqual("PREVIEW_JUDGE_REPORT.json summary.totalCases", judgeSummary.totalCases, judgeCases.length);
assertEqual("PREVIEW_JUDGE_REPORT.json expected total cases", judgeCases.length, expectedTotalCases);
assertEqual("PREVIEW_JUDGE_REPORT.json PASS count", judgeSummary.passCount, judgeCounts.passCount);
assertEqual("PREVIEW_JUDGE_REPORT.json FIX count", judgeSummary.fixCount, judgeCounts.fixCount);
assertEqual("PREVIEW_JUDGE_REPORT.json KILL count", judgeSummary.killCount, judgeCounts.killCount);

const judgeMarkdown = readText(paths.judgeMarkdown);
assertNoQuestionMarkPlaceholder(judgeMarkdown, "PREVIEW_JUDGE_REPORT.md");
assertEqual("PREVIEW_JUDGE_REPORT.md total cases", parseBulletNumber(judgeMarkdown, "total cases"), judgeCases.length);
assertEqual("PREVIEW_JUDGE_REPORT.md PASS count", parseBulletNumber(judgeMarkdown, "PASS count"), judgeCounts.passCount);
assertEqual("PREVIEW_JUDGE_REPORT.md FIX count", parseBulletNumber(judgeMarkdown, "FIX count"), judgeCounts.fixCount);
assertEqual("PREVIEW_JUDGE_REPORT.md KILL count", parseBulletNumber(judgeMarkdown, "KILL count"), judgeCounts.killCount);

const previewReview = readText(paths.previewReview);
assertNoQuestionMarkPlaceholder(previewReview, "PREVIEW_REVIEW.md");
assertEqual("PREVIEW_REVIEW.md total cases", parseBulletNumber(previewReview, "total cases"), expectedTotalCases);
assertEqual("PREVIEW_REVIEW.md candidate cases", parseBulletNumber(previewReview, "candidate cases"), candidateCount);

const expansionReport = readText(paths.expansionReport);
assertNoQuestionMarkPlaceholder(expansionReport, "DOMAIN_EXPANSION_REPORT.md");
assertEqual("DOMAIN_EXPANSION_REPORT.md total cases", parseBulletNumber(expansionReport, "total cases"), expectedTotalCases);
assertEqual("DOMAIN_EXPANSION_REPORT.md candidate cases", parseBulletNumber(expansionReport, "candidate cases"), candidateCount);

const expansionDecision = parseExpansionDecision(expansionReport);

if (candidateCount === 0) {
  if (expansionDecision !== "READY_FOR_CANDIDATE") {
    fail(`candidateExpansionCases.cjs is empty but DOMAIN_EXPANSION_REPORT.md decision is ${expansionDecision}.`);
  }
} else if (judgeCases.length === coreCases.length) {
  fail(`Candidate fixtures exist (${candidateCount}) but judge report only contains core cases (${coreCases.length}).`);
} else if (expansionDecision === "READY_FOR_CANDIDATE") {
  fail("Candidate fixtures exist but DOMAIN_EXPANSION_REPORT.md decision is READY_FOR_CANDIDATE.");
}

if (allCases.length !== expectedTotalCases) {
  fail(`promptCases.cjs INCLUDE_CANDIDATES=1 exported ${allCases.length}, expected ${expectedTotalCases}.`);
}

process.stdout.write("report artifact sync validation ok\n");
