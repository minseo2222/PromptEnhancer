const fs = require("fs");
const path = require("path");
const vm = require("vm");

global.window = global;

for (const file of [
  "src/core/templates.js",
  "src/core/promptPatterns.js",
  "src/core/ruleEngine.js",
  "src/core/briefCompiler.js"
]) {
  vm.runInThisContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), { filename: file });
}

const trueCases = [
  "우리 서비스 마케팅 전략 짜줘",
  "새 기능 PRD 써줘",
  "경쟁사 분석해줘",
  "투자자에게 업데이트 메일 써줘",
  "요즘 할 게 너무 많고 뭐부터 해야 할지 모르겠어. 정리 좀 해줘."
];

const falseCases = [
  "이 문장 번역해줘",
  "이거 요약해줘",
  "맞춤법 고쳐줘",
  "안녕",
  "이 문장 영업스럽게 바꿔줘",
  "이 문장 고객에게 더 공감 있게 바꿔줘",
  "이 문장 좀 더 정중하게 바꿔줘",
  "논문 초록을 세 줄로 요약해줘"
];

const deliverableGateCases = [
  "이번 분기 성과 리뷰 코멘트 정리해줘",
  "베타 테스트 피드백을 어떻게 정리할지 알려줘",
  "월별 손익 보고서 요약해줘",
  "이 계약서 리스크 검토해줘",
  "개인정보 처리방침 개정 안내문 써줘",
  "임원 보고용 프로젝트 현황 정리해줘",
  "보안 업데이트 릴리즈 노트 써줘"
];

for (const draft of trueCases) {
  if (!window.CBSRuleEngine.shouldShowClarify(draft)) {
    throw new Error(`Expected high-intent draft to show Clarify: ${draft}`);
  }
}

for (const draft of falseCases) {
  if (window.CBSRuleEngine.shouldShowClarify(draft)) {
    throw new Error(`Expected simple draft to stay quiet: ${draft}`);
  }
}

for (const draft of deliverableGateCases) {
  if (!window.CBSRuleEngine.shouldShowClarify(draft)) {
    throw new Error(`Expected deliverable request to show Clarify: ${draft}`);
  }
}

const taskTypeCases = [
  ["경쟁사 분석해줘", "brief.analyze"],
  ["투자자에게 업데이트 메일 써줘", "brief.write"],
  ["뭐부터 해야 할지 모르겠어. 정리 좀 해줘.", "brief.decide"]
];

for (const [draft, expectedTaskType] of taskTypeCases) {
  const actual = window.CBSRuleEngine.classifyTaskType(draft);
  if (actual !== expectedTaskType) {
    throw new Error(`Expected ${expectedTaskType}, got ${actual}: ${draft}`);
  }
}

const analyzePrompt = window.CBSBriefCompiler.compileBrief({
  draft: "경쟁사 분석해줘",
  domain: "research",
  taskType: "brief.analyze",
  answers: {
    goal: "경쟁 구도 파악",
    analysis_method: "비교표"
  }
});

for (const section of ["# 작업", "# 목표", "# 맥락", "# 제약", "# 출력 형식", "# 좋은 답변의 기준"]) {
  if (!analyzePrompt.includes(section)) {
    throw new Error(`Missing compiler section: ${section}`);
  }
}

if (analyzePrompt.startsWith("너는")) {
  throw new Error("Compiler should not be persona-first.");
}

if (!analyzePrompt.includes("비교표") || !analyzePrompt.includes("분석 기준")) {
  throw new Error("Analyze prompt should include selected method and analysis criteria.");
}

const writeQuestions = window.CBSRuleEngine.getQuestionsForDraft("투자자에게 업데이트 메일 써줘");
if (!writeQuestions.some((question) => question.slot === "context_line" || question.slot === "tone")) {
  throw new Error("Write task should ask for tone or the missing update context.");
}

const writePrompt = window.CBSBriefCompiler.compileBrief({
  draft: "투자자에게 업데이트 메일 써줘",
  domain: "writing_email",
  taskType: "brief.write",
  answers: {
    goal: "업데이트 공유",
    tone: "정중하고 간결하게"
  }
});

if (!writePrompt.includes("본문 초안") || !writePrompt.includes("간결") || !writePrompt.includes("독자")) {
  throw new Error("Write prompt should include email draft guidance and audience-fit quality bar.");
}

const decideQuestions = window.CBSRuleEngine.getQuestionsForDraft("뭐부터 해야 할지 모르겠어. 정리 좀 해줘.");
if (!decideQuestions.some((question) => question.slot === "decision_criteria")) {
  throw new Error("Decide task should ask a decision criteria question.");
}

const decidePrompt = window.CBSBriefCompiler.compileBrief({
  draft: "뭐부터 해야 할지 모르겠어. 정리 좀 해줘.",
  domain: "personal_prioritization",
  taskType: "brief.decide",
  answers: {
    goal: "우선순위 정리",
    decision_criteria: "효과"
  }
});

if (!decidePrompt.includes("우선순위") || !decidePrompt.includes("다음 액션")) {
  throw new Error("Decide prompt should include priority and next-action guidance.");
}

console.log("ruleEngine/compiler tests ok");
