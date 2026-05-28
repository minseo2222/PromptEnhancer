const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..", "..");
const baselinePath = path.join(root, "docs", "QUALITY_BASELINE.json");
const judgeReportPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.json");
const expansionReportPath = path.join(root, "docs", "DOMAIN_EXPANSION_REPORT.md");

process.env.INCLUDE_CANDIDATES = "1";
const promptCases = require(path.join(root, "tests", "fixtures", "promptCases.cjs"));
const candidateCases = promptCases.candidateExpansionCases || [];

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing required file: ${path.relative(root, filePath)}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function runNode(script, env = {}) {
  const result = spawnSync(process.execPath, [script], {
    cwd: root,
    env: { ...process.env, ...env },
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

function shouldRunJudge() {
  if (process.env.RUN_EXPANSION_JUDGE === "1") {
    return true;
  }

  if (!fs.existsSync(judgeReportPath)) {
    return true;
  }

  if (candidateCases.length > 0) {
    return process.env.SKIP_EXPANSION_JUDGE !== "1";
  }

  const report = readJson(judgeReportPath);
  return !Array.isArray(report.cases) || report.cases.length !== promptCases.length;
}

function maybeRunJudge() {
  if (shouldRunJudge()) {
    process.stdout.write("Running preview judge with INCLUDE_CANDIDATES=1...\n");
    runNode("tests/runPreviewJudge.cjs", { INCLUDE_CANDIDATES: "1" });
    return "freshly generated";
  }

  if (candidateCases.length > 0 && process.env.SKIP_EXPANSION_JUDGE === "1") {
    process.stdout.write("Using existing preview judge report because SKIP_EXPANSION_JUDGE=1.\n");
  } else {
    process.stdout.write("Using existing preview judge report for expansion cycle.\n");
  }

  return "reused existing report";
}

function syncReportArtifacts() {
  process.stdout.write("Synchronizing preview review and judge Markdown with INCLUDE_CANDIDATES=1...\n");
  runNode("tests/generatePreviewReview.cjs", { INCLUDE_CANDIDATES: "1" });
  runNode("tests/renderJudgeReport.cjs", { INCLUDE_CANDIDATES: "1" });
}

function caseScore(caseItem) {
  return Number(caseItem.scores && caseItem.scores.userWouldInsert) || 0;
}

function emptyMetrics() {
  return {
    cases: 0,
    passCount: 0,
    fixCount: 0,
    killCount: 0,
    p0Count: 0,
    averageUserWouldInsertScore: 0
  };
}

function computeMetrics(records) {
  if (!records.length) {
    return emptyMetrics();
  }

  const result = records.reduce((metrics, record) => {
    if (record.verdict === "PASS") metrics.passCount += 1;
    if (record.verdict === "FIX") metrics.fixCount += 1;
    if (record.verdict === "KILL") metrics.killCount += 1;
    if (record.priority === "P0") metrics.p0Count += 1;
    metrics.scoreTotal += caseScore(record);
    return metrics;
  }, { ...emptyMetrics(), scoreTotal: 0 });

  result.cases = records.length;
  result.averageUserWouldInsertScore = Number((result.scoreTotal / records.length).toFixed(2));
  delete result.scoreTotal;
  return result;
}

function groupBy(records, key) {
  return records.reduce((groups, record) => {
    const value = record.fixture[key] || "unknown";
    if (!groups[value]) groups[value] = [];
    groups[value].push(record);
    return groups;
  }, {});
}

function groupMetrics(records, key) {
  return Object.entries(groupBy(records, key))
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, groupRecords]) => ({
      name,
      ...computeMetrics(groupRecords)
    }));
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => escapeCell(value)).join(" | ")} |`)
  ].join("\n");
}

function escapeCell(value) {
  return String(value == null ? "" : value).replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");
}

function gateLine(name, statusOrPassed, detail) {
  const status = typeof statusOrPassed === "string" ? statusOrPassed : statusOrPassed ? "PASS" : "FAIL";
  return `- ${status}: ${name}${detail ? ` (${detail})` : ""}`;
}

function buildRecords(report, fixtures) {
  if (!Array.isArray(report.cases)) {
    fail("Judge report does not contain a cases array.");
  }

  if (report.cases.length !== fixtures.length) {
    fail(`Judge report case count mismatch. Report=${report.cases.length}, fixtures=${fixtures.length}`);
  }

  return report.cases.map((caseItem, index) => ({
    ...caseItem,
    fixture: fixtures[index] || {}
  }));
}

function averageFor(records) {
  return records.length
    ? Number((records.reduce((total, record) => total + caseScore(record), 0) / records.length).toFixed(2))
    : 0;
}

function promotionGroupDecision(groupName, metrics, records) {
  if (!metrics.cases) {
    return "N/A";
  }

  if (groupName === "promotion_ready") {
    if (metrics.killCount > 0 || metrics.p0Count > 0) return "PATCH_REQUIRED";
    if (metrics.averageUserWouldInsertScore >= 3.8) return "PROMOTE_CANDIDATE";
    if (metrics.averageUserWouldInsertScore >= 3.4) return "REVIEW_OR_PATCH";
    return "PATCH_REQUIRED";
  }

  if (groupName === "needs_patch") {
    if (metrics.killCount > 0 || metrics.p0Count > 0) return "PATCH_REQUIRED";
    return metrics.averageUserWouldInsertScore >= 3.5 ? "PATCH_LIGHT" : "PATCH_REQUIRED";
  }

  if (groupName === "needs_context") {
    if (metrics.killCount > 0 || metrics.p0Count > 0) return "BLOCKING_CONTEXT_RISK";
    return "DOCUMENT_LIMITATION";
  }

  if (groupName === "suppress_regression") {
    const suppressPassed = records.every(
      (record) =>
        record.fixture.expectedShouldShowClarify === false &&
        record.verdict === "PASS" &&
        record.priority !== "P0"
    );
    return suppressPassed ? "KEEP_AS_REGRESSION" : "BLOCKING_SUPPRESS_FAILURE";
  }

  if (metrics.killCount > 0 || metrics.p0Count > 0) return "PATCH_REQUIRED";
  return "REVIEW";
}

function contextBacklogReason(record) {
  const reasons = {
    "sales collateral for our product": {
      reason: "제품/대상 고객/오퍼 정보가 필요",
      futureUx: "one-line product/context input"
    },
    "proposal for customer A": {
      reason: "고객 상황/제안 내용이 필요",
      futureUx: "one-line customer/context input"
    },
    "cold email draft": {
      reason: "제품/오퍼/대상 고객이 없으면 품질 제한",
      futureUx: "optional one-line offer/context field"
    }
  };

  return reasons[record.fixture.name] || {
    reason: "짧은 요청만으로는 핵심 맥락을 확정하기 어려움",
    futureUx: "optional one-line context field"
  };
}

function decide({
  coreGatePassed,
  candidateGatePassed,
  flaggedDomainPacks,
  candidateMetrics,
  candidateCount,
  promotionReadyMetrics,
  suppressRegressionPassed,
  needsContextBlocking,
  hasNonPromotableGroups
}) {
  if (!coreGatePassed || candidateMetrics.killCount > 0 || candidateMetrics.p0Count > 0 || needsContextBlocking) {
    return "REJECT";
  }

  if (candidateCount === 0) {
    return "READY_FOR_CANDIDATE";
  }

  const partialPromotionReady =
    promotionReadyMetrics.cases > 0 &&
    promotionReadyMetrics.killCount === 0 &&
    promotionReadyMetrics.p0Count === 0 &&
    promotionReadyMetrics.averageUserWouldInsertScore >= 3.8 &&
    suppressRegressionPassed;

  if (partialPromotionReady && (!candidateGatePassed || hasNonPromotableGroups)) {
    return "PARTIAL_PROMOTE_READY";
  }

  if (flaggedDomainPacks.length) {
    return "SPLIT_PACK";
  }

  if (candidateCount > 0 && !candidateGatePassed) {
    return "PATCH_REQUIRED";
  }

  return "PROMOTE";
}

function renderLowestCases(records, limit = 10) {
  const rows = records
    .slice()
    .sort((left, right) => caseScore(left) - caseScore(right))
    .slice(0, limit)
    .map((record) => [
      `${record.caseNumber}. ${record.caseName}`,
      record.fixture.domainPack || "unknown",
      record.verdict,
      caseScore(record),
      record.priority,
      record.draft
    ]);

  return rows.length
    ? markdownTable(["Case", "Domain Pack", "Verdict", "Insert Score", "Priority", "Draft"], rows)
    : "No cases.";
}

function renderReport({ baseline, report, records, judgeSource }) {
  const gates = baseline.gates || {};
  const coreRecords = records.filter((record) => record.fixture.caseSource === "core");
  const candidateRecords = records.filter((record) => record.fixture.caseSource === "candidate");
  const multipleChoiceCandidateRecords = candidateRecords.filter(
    (record) => record.fixture.clarificationMode === "multiple_choice"
  );
  const promotionReadyRecords = candidateRecords.filter(
    (record) => record.fixture.promotionGroup === "promotion_ready"
  );
  const needsContextRecords = candidateRecords.filter(
    (record) => record.fixture.promotionGroup === "needs_context"
  );
  const suppressRegressionRecords = candidateRecords.filter(
    (record) => record.fixture.promotionGroup === "suppress_regression"
  );
  const needsPatchRecords = candidateRecords.filter(
    (record) => record.fixture.promotionGroup === "needs_patch"
  );
  const coreMetrics = computeMetrics(coreRecords);
  const candidateMetrics = computeMetrics(candidateRecords);
  const promotionReadyMetrics = computeMetrics(promotionReadyRecords);
  const needsContextMetrics = computeMetrics(needsContextRecords);
  const suppressRegressionMetrics = computeMetrics(suppressRegressionRecords);
  const needsPatchMetrics = computeMetrics(needsPatchRecords);
  const baselineJudge = baseline.judge || {};
  const averageDrop = Number(((baselineJudge.averageUserWouldInsertScore || 0) - coreMetrics.averageUserWouldInsertScore).toFixed(2));
  const coreGateChecks = [
    {
      name: "core KILL must be 0",
      passed: coreMetrics.killCount <= (gates.maxCoreKill ?? 0),
      detail: `current=${coreMetrics.killCount}`
    },
    {
      name: "core P0 must be 0",
      passed: coreMetrics.p0Count <= (gates.maxCoreP0 ?? 0),
      detail: `current=${coreMetrics.p0Count}`
    },
    {
      name: "core average drop <= maxAverageDrop",
      passed: averageDrop <= (gates.maxAverageDrop ?? 0.1),
      detail: `drop=${averageDrop}`
    }
  ];
  const coreGatePassed = coreGateChecks.every((check) => check.passed);

  const multipleChoiceAverage = averageFor(multipleChoiceCandidateRecords);
  const needsContextRatio = candidateRecords.length
    ? Number((needsContextRecords.length / candidateRecords.length).toFixed(2))
    : 0;
  const uxGap =
    candidateRecords.length > 0 &&
    needsContextRecords.length > 0 &&
    (needsContextRatio >= 0.3 || needsContextMetrics.averageUserWouldInsertScore < 2.5);
  const needsContextBlocking = needsContextMetrics.killCount > 0 || needsContextMetrics.p0Count > 0;
  const suppressRegressionPassed =
    suppressRegressionRecords.length === 0 ||
    suppressRegressionRecords.every(
      (record) =>
        record.fixture.expectedShouldShowClarify === false &&
        record.verdict === "PASS" &&
        record.priority !== "P0"
    );
  const promotionReadyPassed =
    promotionReadyMetrics.cases > 0 &&
    promotionReadyMetrics.killCount === 0 &&
    promotionReadyMetrics.p0Count === 0 &&
    promotionReadyMetrics.averageUserWouldInsertScore >= 3.8;
  const partialPromotionStatus =
    promotionReadyPassed && suppressRegressionPassed && !needsContextBlocking
      ? "ELIGIBLE"
      : promotionReadyPassed && suppressRegressionPassed && needsContextBlocking
        ? "BLOCKED_BY_CONTEXT_RISK"
        : "NOT_READY";
  const candidateGateChecks = candidateRecords.length
    ? [
        {
          name: "candidate multiple_choice KILL must be 0",
          passed: multipleChoiceCandidateRecords.every((record) => record.verdict !== "KILL"),
          detail: `multiple_choice=${multipleChoiceCandidateRecords.length}`
        },
        {
          name: "candidate P0 must be 0",
          passed: candidateMetrics.p0Count === 0,
          detail: `current=${candidateMetrics.p0Count}`
        },
        {
          name: "candidate average >= minCandidateAverage",
          passed: candidateMetrics.averageUserWouldInsertScore >= (gates.minCandidateAverage ?? 3.6),
          detail: `avg=${candidateMetrics.averageUserWouldInsertScore}`
        },
        {
          name: "multiple_choice average >= minMultipleChoiceAverage",
          passed:
            !multipleChoiceCandidateRecords.length ||
            multipleChoiceAverage >= (gates.minMultipleChoiceAverage ?? 3.8),
          detail: `avg=${multipleChoiceAverage}`
        }
      ]
    : [
        {
          name: "candidate gates",
          status: "SKIPPED",
          passed: true,
          detail: "no candidate cases"
        }
      ];
  const candidateGatePassed = candidateGateChecks.every((check) => check.passed !== false);
  const domainPackMetrics = groupMetrics(candidateRecords, "domainPack");
  const promotionGroupBreakdown = Object.entries(groupBy(candidateRecords, "promotionGroup"))
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, groupRecords]) => {
      const metrics = computeMetrics(groupRecords);
      return {
        name,
        ...metrics,
        decision: promotionGroupDecision(name, metrics, groupRecords)
      };
    });
  const hasNonPromotableGroups = promotionGroupBreakdown.some(
    (item) =>
      item.cases > 0 &&
      item.name !== "promotion_ready" &&
      item.name !== "suppress_regression"
  );
  const flaggedDomainPacks = domainPackMetrics.filter((item) => item.averageUserWouldInsertScore < 3.3);
  const decision = decide({
    coreGatePassed,
    candidateGatePassed,
    flaggedDomainPacks,
    candidateMetrics,
    candidateCount: candidateRecords.length,
    promotionReadyMetrics,
    suppressRegressionPassed,
    needsContextBlocking,
    hasNonPromotableGroups
  });
  const topProblems = ((report.summary && report.summary.topProblems) || []).length
    ? report.summary.topProblems.map((problem) => `- ${problem}`).join("\n")
    : "- None";
  const recommendedNextAction = candidateRecords.length
    ? decision === "PARTIAL_PROMOTE_READY"
      ? "Manually review promotion_ready candidates for core promotion, document needs_context cases, and patch needs_patch cases."
      : promotionReadyPassed && needsContextBlocking
        ? "Do not promote the full pack. Review promotion_ready cases separately, and resolve or document blocking needs_context risk."
      : "Patch candidate cases that fall below gates, then rerun the expansion cycle."
    : "Add a small candidate pack, then rerun the expansion cycle.";
  const candidateStatus = candidateRecords.length ? "active" : "none";
  const manualPromotionCandidates = promotionReadyRecords.filter(
    (record) => record.verdict === "PASS" && record.priority !== "P0" && caseScore(record) >= 4
  );
  const contextBacklogRecords = candidateRecords.filter(
    (record) =>
      record.fixture.promotionGroup === "needs_context" ||
      record.fixture.name === "cold email draft"
  );

  return [
    "# Domain Expansion Report",
    "",
    "## Summary",
    `- core cases: ${coreRecords.length}`,
    `- candidate cases: ${candidateRecords.length}`,
    `- candidate status: ${candidateStatus}`,
    `- judge source: ${judgeSource}`,
    `- total cases: ${records.length}`,
    `- decision: ${decision}`,
    `- partial promotion status: ${partialPromotionStatus}`,
    `- needs_context risk: ${needsContextBlocking ? "BLOCKING_CONTEXT_RISK" : "none"}`,
    "",
    "## Core Regression",
    "",
    markdownTable(
      ["Metric", "Baseline", "Current", "Delta"],
      [
        ["PASS", baselineJudge.passCount, coreMetrics.passCount, coreMetrics.passCount - baselineJudge.passCount],
        ["FIX", baselineJudge.fixCount, coreMetrics.fixCount, coreMetrics.fixCount - baselineJudge.fixCount],
        ["KILL", baselineJudge.killCount, coreMetrics.killCount, coreMetrics.killCount - baselineJudge.killCount],
        ["P0", baselineJudge.p0Count, coreMetrics.p0Count, coreMetrics.p0Count - baselineJudge.p0Count],
        [
          "average userWouldInsert",
          baselineJudge.averageUserWouldInsertScore,
          coreMetrics.averageUserWouldInsertScore,
          (coreMetrics.averageUserWouldInsertScore - baselineJudge.averageUserWouldInsertScore).toFixed(2)
        ]
      ]
    ),
    "",
    "Gate results:",
    "",
    ...coreGateChecks.map((check) => gateLine(check.name, check.passed, check.detail)),
    coreMetrics.passCount < baselineJudge.passCount
      ? `- WARN: core PASS count decreased by ${baselineJudge.passCount - coreMetrics.passCount}`
      : "- PASS: core PASS count did not decrease",
    "",
    "## Candidate Pack Results",
    "",
    markdownTable(
      ["Metric", "Value"],
      [
        ["cases", candidateMetrics.cases],
        ["PASS", candidateMetrics.passCount],
        ["FIX", candidateMetrics.fixCount],
        ["KILL", candidateMetrics.killCount],
        ["P0", candidateMetrics.p0Count],
        ["average userWouldInsert", candidateMetrics.averageUserWouldInsertScore],
        ["multiple_choice average", multipleChoiceAverage],
        ["promotion_ready average", promotionReadyMetrics.averageUserWouldInsertScore],
        ["needs_patch average", needsPatchMetrics.averageUserWouldInsertScore],
        ["needs_context average", needsContextMetrics.averageUserWouldInsertScore],
        ["suppress_regression average", suppressRegressionMetrics.averageUserWouldInsertScore],
        ["needs_context ratio", needsContextRatio],
        ["UX_GAP", uxGap ? "YES" : "NO"]
      ]
    ),
    "",
    "Candidate gates:",
    "",
    ...candidateGateChecks.map((check) => gateLine(check.name, check.status || check.passed, check.detail)),
    "",
    "KILL/P0 list:",
    "",
    renderLowestCases(candidateRecords.filter((record) => record.verdict === "KILL" || record.priority === "P0"), 20),
    "",
    "Lowest 10 cases:",
    "",
    renderLowestCases(candidateRecords.length ? candidateRecords : coreRecords, 10),
    "",
    "## Domain Pack Breakdown",
    "",
    domainPackMetrics.length
      ? markdownTable(
          ["domainPack", "cases", "PASS", "FIX", "KILL", "avg insert", "decision"],
          domainPackMetrics.map((item) => [
            item.name,
            item.cases,
            item.passCount,
            item.fixCount,
            item.killCount,
            item.averageUserWouldInsertScore,
            item.averageUserWouldInsertScore < 3.3 ? "FLAGGED" : "OK"
          ])
        )
      : "No candidate domain packs.",
    "",
    "## Clarification Mode Breakdown",
    "",
    candidateRecords.length
      ? markdownTable(
          ["clarificationMode", "cases", "PASS", "FIX", "KILL", "avg insert"],
          groupMetrics(candidateRecords, "clarificationMode").map((item) => [
            item.name,
            item.cases,
            item.passCount,
            item.fixCount,
            item.killCount,
            item.averageUserWouldInsertScore
          ])
        )
      : "No candidate clarification modes.",
    "",
    "## Promotion Group Breakdown",
    "",
    promotionGroupBreakdown.length
      ? markdownTable(
          ["promotionGroup", "cases", "PASS", "FIX", "KILL", "P0", "avg insert", "decision"],
          promotionGroupBreakdown.map((item) => [
            item.name,
            item.cases,
            item.passCount,
            item.fixCount,
            item.killCount,
            item.p0Count,
            item.averageUserWouldInsertScore,
            item.decision
          ])
        )
      : "No candidate promotion groups.",
    "",
    "## Manual Promotion Candidates",
    "",
    manualPromotionCandidates.length
      ? markdownTable(
          ["Case", "Draft", "promotionGroup", "Verdict", "Insert Score", "Note"],
          manualPromotionCandidates.map((record) => [
            `${record.caseNumber}. ${record.caseName}`,
            record.draft,
            record.fixture.promotionGroup,
            record.verdict,
            caseScore(record),
            "promotion_ready, PASS, insert score >= 4"
          ])
        )
      : "No manual promotion candidates.",
    "",
    "## Context-required Backlog",
    "",
    contextBacklogRecords.length
      ? markdownTable(
          ["Case", "Draft", "Reason", "Suggested Future UX"],
          contextBacklogRecords.map((record) => {
            const item = contextBacklogReason(record);
            return [
              `${record.caseNumber}. ${record.caseName}`,
              record.draft,
              item.reason,
              item.futureUx
            ];
          })
        )
      : "No context-required backlog items.",
    "",
    "## Needs Patch Cases",
    "",
    needsPatchRecords.length
      ? markdownTable(
          ["Case", "Draft", "Verdict", "Insert Score", "Recommended Fix"],
          needsPatchRecords.map((record) => [
            `${record.caseNumber}. ${record.caseName}`,
            record.draft,
            record.verdict,
            caseScore(record),
            record.recommendedFix || ""
          ])
        )
      : "No needs_patch cases.",
    "",
    "## Recurring Problems",
    topProblems,
    "",
    "## Recommended Next Action",
    `- ${recommendedNextAction}`,
    "",
    "## Promotion Notes",
    "- Promote candidates only when core regression gates pass.",
    "- `PARTIAL_PROMOTE_READY` means only listed manual promotion candidates should be considered for manual core promotion.",
    "- Promote only packs with zero KILL/P0 cases and acceptable average insert scores.",
    "- `needs_context` cases are documented as UX backlog when multiple-choice clarification lacks enough context.",
    "- Split any domainPack whose average falls below 3.3 before promotion.",
    "- Keep `needs_free_text` cases documented if multiple-choice clarification is not sufficient.",
    ""
  ].join("\n");
}

const judgeSource = maybeRunJudge();
syncReportArtifacts();
runNode("tests/validateJudgeReport.cjs", { INCLUDE_CANDIDATES: "1" });

const baseline = readJson(baselinePath);
const report = readJson(judgeReportPath);
const records = buildRecords(report, promptCases);
const markdown = renderReport({ baseline, report, records, judgeSource });

fs.mkdirSync(path.dirname(expansionReportPath), { recursive: true });
fs.writeFileSync(expansionReportPath, markdown, "utf8");

runNode("tests/validateReportArtifacts.cjs", { INCLUDE_CANDIDATES: "1" });

process.stdout.write(`Domain expansion report generated: ${path.relative(root, expansionReportPath)}\n`);
