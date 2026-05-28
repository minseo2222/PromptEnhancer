const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const promptPath = path.join(root, "tests", "prompts", "previewJudgePrompt.md");
const schemaPath = path.join(root, "tests", "schemas", "previewJudge.schema.json");
const judgeJsonPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.json");
const judgeMarkdownPath = path.join(root, "docs", "PREVIEW_JUDGE_REPORT.md");

const embeddedFiles = [
  "docs/PREVIEW_REVIEW.md",
  "tests/fixtures/promptCases.cjs",
  "tests/fixtures/coreRegressionCases.cjs",
  "tests/fixtures/candidateExpansionCases.cjs",
  "tests/fixtures/domainPacks/README.md",
  "src/core/ruleEngine.js",
  "src/core/templates.js",
  "src/core/briefCompiler.js"
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    windowsHide: true,
    ...options
  });

  if (result.error) {
    process.stderr.write(`${command} failed: ${result.error.message}\n`);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }

  return result;
}

function shellQuote(value) {
  const text = String(value);
  if (/^[A-Za-z0-9_./\\:-]+$/.test(text)) {
    return text;
  }

  return `"${text.replace(/"/g, '\\"')}"`;
}

function runCodex(args, input) {
  const commandLine = ["codex"].concat(args.map(shellQuote)).join(" ");
  const result = spawnSync(commandLine, {
    cwd: root,
    input,
    encoding: "utf8",
    shell: true,
    stdio: ["pipe", "inherit", "inherit"],
    windowsHide: true
  });

  if (result.error) {
    process.stderr.write(`codex failed: ${result.error.message}\n`);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function assertFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    process.stderr.write(`Missing required file: ${path.relative(root, filePath)}\n`);
    process.exit(1);
  }
}

function buildPrompt() {
  assertFileExists(promptPath);
  const parts = [
    fs.readFileSync(promptPath, "utf8"),
    "",
    "## Embedded Local Files",
    "",
    "The required local files are embedded below. Judge from these contents if tool-based file reads are unavailable."
  ];

  for (const relativePath of embeddedFiles) {
    const fullPath = path.join(root, relativePath);
    assertFileExists(fullPath);
    const content = fs.readFileSync(fullPath, "utf8");
    parts.push("", `### FILE: ${relativePath}`, "", `<file path="${relativePath}">`, content, "</file>");
  }

  return parts.join("\n");
}

process.stdout.write("Generating preview review pack...\n");
run(process.execPath, ["tests/generatePreviewReview.cjs"], { stdio: "inherit" });

if (fs.existsSync(judgeJsonPath)) {
  fs.unlinkSync(judgeJsonPath);
}

if (fs.existsSync(judgeMarkdownPath)) {
  fs.unlinkSync(judgeMarkdownPath);
}

const prompt = buildPrompt();
const args = [
  "exec",
  "--skip-git-repo-check",
  "--cd",
  ".",
  "--output-schema",
  "tests/schemas/previewJudge.schema.json",
  "--output-last-message",
  "docs/PREVIEW_JUDGE_REPORT.json",
  "-"
];

process.stdout.write("Running Codex CLI preview judge with UTF-8 Node stdin...\n");
runCodex(args, prompt);

assertFileExists(schemaPath);
assertFileExists(judgeJsonPath);

process.stdout.write("Normalizing judge summary from case-level verdicts...\n");
run(process.execPath, ["tests/normalizeJudgeReportSummary.cjs"], { stdio: "inherit" });

process.stdout.write("Validating judge JSON...\n");
run(process.execPath, ["tests/validateJudgeReport.cjs"], { stdio: "inherit" });

process.stdout.write("Rendering Markdown judge report...\n");
run(process.execPath, ["tests/renderJudgeReport.cjs"], { stdio: "inherit" });

process.stdout.write("Validating rendered Markdown and summary consistency...\n");
run(process.execPath, ["tests/validateJudgeReport.cjs"], { stdio: "inherit" });

process.stdout.write("Preview judge complete.\n");
process.stdout.write("JSON: docs/PREVIEW_JUDGE_REPORT.json\n");
process.stdout.write("Markdown: docs/PREVIEW_JUDGE_REPORT.md\n");
