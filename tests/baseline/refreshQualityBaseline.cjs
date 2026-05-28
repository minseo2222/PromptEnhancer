const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..", "..");
const baselinePath = path.join(root, "docs", "QUALITY_BASELINE.json");
const baselinesDir = path.join(root, "docs", "baselines");
const judgeReportPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.json");
const coreCasesPath = path.join(root, "tests", "fixtures", "coreRegressionCases.cjs");
const candidateCasesPath = path.join(root, "tests", "fixtures", "candidateExpansionCases.cjs");
const backlogPath = path.join(root, "tests", "fixtures", "domainPacks", "sales_bd_backlog.cjs");

const NEW_BASELINE_NAME = "core-v0.3-sales-bd-partial";
const GATES = {
  maxCoreKill: 0,
  maxCoreP0: 0,
  maxAverageDrop: 0.1,
  minCandidateAverage: 3.6,
  minMultipleChoiceAverage: 3.8,
  maxCandidateKill: 0
};

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function runNode(script) {
  const result = spawnSync(process.execPath, [script], {
    cwd: root,
    stdio: "inherit",
    windowsHide: true
  });

  if (result.error) {
    fail(`${script} failed: ${result.error.message}`);
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing required file: ${path.relative(root, filePath)}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sanitizeFilePart(value) {
  return String(value || "unknown").replace(/[^A-Za-z0-9._-]/g, "-");
}

function metricsFromCases(cases) {
  return cases.reduce(
    (metrics, caseItem) => {
      if (caseItem.verdict === "PASS") metrics.passCount += 1;
      if (caseItem.verdict === "FIX") metrics.fixCount += 1;
      if (caseItem.verdict === "KILL") metrics.killCount += 1;
      if (caseItem.priority === "P0") metrics.p0Count += 1;
      metrics.userWouldInsertTotal += Number(caseItem.scores && caseItem.scores.userWouldInsert) || 0;
      return metrics;
    },
    {
      passCount: 0,
      fixCount: 0,
      killCount: 0,
      p0Count: 0,
      userWouldInsertTotal: 0
    }
  );
}

if (process.env.ALLOW_BASELINE_REFRESH !== "1") {
  fail("Refusing to refresh baseline. Set ALLOW_BASELINE_REFRESH=1 to confirm this explicit baseline update.");
}

const candidateCases = require(candidateCasesPath);
if (candidateCases.length > 0) {
  fail(`Refusing to refresh baseline while candidateExpansionCases.cjs has ${candidateCases.length} active cases.`);
}

runNode("tests/validateJudgeReport.cjs");
runNode("tests/validateJudgeReportEncoding.cjs");
runNode("tests/validateReportArtifacts.cjs");

const coreCases = require(coreCasesPath);
const backlogCases = fs.existsSync(backlogPath) ? require(backlogPath) : [];
const previousBaseline = readJson(baselinePath);
const report = readJson(judgeReportPath);

if (!Array.isArray(report.cases)) {
  fail("PREVIEW_JUDGE_REPORT.json does not contain a cases array.");
}

if (report.cases.length !== coreCases.length) {
  fail(`Judge report case count (${report.cases.length}) does not match core regression case count (${coreCases.length}).`);
}

const metrics = metricsFromCases(report.cases);
const averageUserWouldInsertScore = report.cases.length
  ? Number((metrics.userWouldInsertTotal / report.cases.length).toFixed(2))
  : 0;

if (metrics.killCount > 0 || metrics.p0Count > 0) {
  fail(`Refusing to refresh baseline with KILL=${metrics.killCount}, P0=${metrics.p0Count}.`);
}

const newBaseline = {
  name: NEW_BASELINE_NAME,
  createdAt: new Date().toISOString(),
  caseCount: coreCases.length,
  source: {
    judgeReport: "docs/PREVIEW_JUDGE_REPORT.json",
    coreRegressionCases: "tests/fixtures/coreRegressionCases.cjs",
    candidateExpansionCases: "tests/fixtures/candidateExpansionCases.cjs"
  },
  promotionSummary: {
    previousCaseCount: previousBaseline.caseCount,
    addedCases: coreCases.length - previousBaseline.caseCount,
    addedFrom: "sales_bd_candidate_v1",
    backlogCases: backlogCases.length
  },
  judge: {
    passCount: metrics.passCount,
    fixCount: metrics.fixCount,
    killCount: metrics.killCount,
    p0Count: metrics.p0Count,
    averageUserWouldInsertScore
  },
  gates: GATES
};

fs.mkdirSync(baselinesDir, { recursive: true });

const previousBackupPath = path.join(
  baselinesDir,
  `QUALITY_BASELINE_${sanitizeFilePart(previousBaseline.name)}.json`
);
const newBackupPath = path.join(
  baselinesDir,
  `QUALITY_BASELINE_${sanitizeFilePart(newBaseline.name)}.json`
);

fs.writeFileSync(previousBackupPath, `${JSON.stringify(previousBaseline, null, 2)}\n`, "utf8");
fs.writeFileSync(baselinePath, `${JSON.stringify(newBaseline, null, 2)}\n`, "utf8");
fs.writeFileSync(newBackupPath, `${JSON.stringify(newBaseline, null, 2)}\n`, "utf8");

process.stdout.write(`Quality baseline refreshed: ${newBaseline.name}\n`);
process.stdout.write(`Previous baseline backup: ${path.relative(root, previousBackupPath)}\n`);
process.stdout.write(`New baseline backup: ${path.relative(root, newBackupPath)}\n`);
