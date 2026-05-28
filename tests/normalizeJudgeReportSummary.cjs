const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const reportJsonPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.json");

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

if (!fs.existsSync(reportJsonPath)) {
  fail(`Missing judge JSON report: ${path.relative(process.cwd(), reportJsonPath)}`);
}

const report = JSON.parse(fs.readFileSync(reportJsonPath, "utf8"));

if (!report.summary || typeof report.summary !== "object") {
  fail("Judge report does not contain a summary object.");
}

if (!Array.isArray(report.cases)) {
  fail("Judge report does not contain a cases array.");
}

const counts = report.cases.reduce(
  (result, caseItem) => {
    if (!["PASS", "FIX", "KILL"].includes(caseItem.verdict)) {
      fail(`Invalid verdict for case ${caseItem.caseName}: ${caseItem.verdict}`);
    }

    result[caseItem.verdict] += 1;
    result.userWouldInsertTotal += Number(caseItem.scores && caseItem.scores.userWouldInsert) || 0;
    return result;
  },
  { PASS: 0, FIX: 0, KILL: 0, userWouldInsertTotal: 0 }
);

report.summary = {
  ...report.summary,
  totalCases: report.cases.length,
  passCount: counts.PASS,
  fixCount: counts.FIX,
  killCount: counts.KILL,
  averageUserWouldInsertScore: report.cases.length ? Number((counts.userWouldInsertTotal / report.cases.length).toFixed(2)) : 0
};

fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write("judge summary normalized from case-level verdicts\n");
