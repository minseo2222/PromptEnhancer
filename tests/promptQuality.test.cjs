const assert = require("assert");
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

const REQUIRED_SECTIONS = ["# 작업", "# 목표", "# 맥락", "# 제약", "# 출력 형식", "# 좋은 답변의 기준"];
const COMPACT_SECTIONS = ["# 작업", "# 확인된 정보", "# 출력 형식", "# 주의할 점"];
const LENGTH_LIMITS = {
  "brief.write": 1200,
  "brief.create": 1200,
  "brief.extract": 1200,
  "brief.plan": 1600,
  "brief.analyze": 1600,
  "brief.research": 1600,
  "brief.decide": 1600,
  "brief.generic": 1600
};

function defaultAnswersFor(taskType) {
  const defaults = {
    "brief.plan": { goal: "목적과 구조 정리", output_format: "단계별 구조" },
    "brief.analyze": { goal: "경쟁 구도 파악", analysis_method: "비교표" },
    "brief.write": { goal: "목적에 맞는 초안 작성", tone: "정중하고 간결하게" },
    "brief.research": { goal: "자료와 기준 정리", output_format: "핵심 요약" },
    "brief.decide": { goal: "우선순위 정리", decision_criteria: "효과" },
    "brief.create": { goal: "목적에 맞는 후보 만들기", output_format: "짧은 후보 목록" },
    "brief.extract": { goal: "핵심 요약", output_format: "표" },
    "brief.generic": { goal: "내용 정리", output_format: "단계별 설명" }
  };

  return defaults[taskType] || defaults["brief.generic"];
}

function rankedAnswersFor(draft, sampleAnswers = {}) {
  const taskType = window.CBSRuleEngine.classifyTaskType(draft);
  const domain = window.CBSRuleEngine.classifyDomain(draft);
  const questions = window.CBSRuleEngine.getQuestionsForDraft(draft);

  return questions.reduce((answers, question) => {
    answers[question.slot] = window.CBSRuleEngine.selectAssumedAnswer(question, draft, taskType, domain, sampleAnswers);
    return answers;
  }, {});
}

function compileWithRankedAnswers(draft, sampleAnswers = {}) {
  const intent = window.CBSRuleEngine.analyzeIntent(draft);
  const taskType = intent.taskType;
  const domain = intent.domain;
  const questions = window.CBSRuleEngine.planQuestions(intent);
  const answers = questions.reduce((result, question) => {
    result[question.slot] = window.CBSRuleEngine.selectDefaultAnswer(question, intent, sampleAnswers);
    return result;
  }, {});
  const prompt = window.CBSBriefCompiler.compileBrief({
    draft,
    domain,
    taskType,
    answers,
    intent
  });

  return { taskType, domain, answers, prompt, intent, questions };
}

function assertQuestionQuality(draft, questions) {
  assert.ok(questions.length <= 2, `${draft}: questions must be 2 or fewer`);

  for (const question of questions) {
    assert.ok(question.label, `${draft}: question label is required`);
    assert.ok(Array.isArray(question.options), `${draft}: options must be an array`);
    assert.ok(question.options.length >= 4, `${draft}: options must have at least 4 values`);
    assert.ok(question.options.includes("추천해줘"), `${draft}: options must include 추천해줘`);
  }
}

function assertArtifactDraft(draft, expectedArtifacts, requiredPromptTerms, forbiddenPromptTerms = [], requiredQuestionTerms = []) {
  const result = compileWithRankedAnswers(draft);
  const expectedArtifactList = Array.isArray(expectedArtifacts) ? expectedArtifacts : [expectedArtifacts];
  assert.ok(
    expectedArtifactList.includes(result.intent.artifactType),
    `${draft}: expected artifactType ${expectedArtifactList.join(" or ")}, got ${result.intent.artifactType}`
  );

  if (requiredQuestionTerms.length) {
    const questionText = result.questions.map((question) => question.label).join(" ");
    assert.ok(
      requiredQuestionTerms.some((term) => questionText.includes(term)),
      `${draft}: expected questions to include one of ${requiredQuestionTerms.join(", ")}`
    );
  }

  for (const term of requiredPromptTerms) {
    assert.ok(result.prompt.includes(term), `${draft}: compiled prompt should include ${term}`);
  }

  for (const term of forbiddenPromptTerms) {
    assert.ok(!result.prompt.includes(term), `${draft}: compiled prompt must not include ${term}`);
  }

  return result;
}

function questionText(result) {
  return result.questions.map((question) => `${question.label} ${question.options.join(" ")}`).join(" ");
}

function assertAnyIncludes(text, terms, message) {
  assert.ok(terms.some((term) => text.includes(term)), message || `expected one of ${terms.join(", ")}`);
}

function assertCompiledPrompt(caseItem, taskType, domain) {
  const answers = defaultAnswersFor(taskType);
  const prompt = window.CBSBriefCompiler.compileBrief({
    draft: caseItem.draft,
    domain,
    taskType,
    answers
  });

  assert.strictEqual(typeof prompt, "string", `${caseItem.name}: compiled prompt must be a string`);
  assert.ok(prompt.length > 0, `${caseItem.name}: compiled prompt must not be empty`);
  assert.ok(prompt.length <= LENGTH_LIMITS[taskType], `${caseItem.name}: prompt too long (${prompt.length})`);
  assert.ok(!prompt.startsWith("너는"), `${caseItem.name}: prompt must not be persona-first`);
  assert.ok(prompt.includes("사용자의 원문 요청") || prompt.includes("원문 요청"), `${caseItem.name}: prompt must include original request label`);
  assert.ok(prompt.includes(caseItem.draft.slice(0, Math.min(8, caseItem.draft.length))), `${caseItem.name}: prompt must include draft text`);

  const requiredSections = prompt.includes("# 확인된 정보") ? COMPACT_SECTIONS : REQUIRED_SECTIONS;
  for (const section of requiredSections) {
    assert.ok(prompt.includes(section), `${caseItem.name}: missing section ${section}`);
  }

  for (const value of Object.values(answers)) {
    assert.ok(prompt.includes(value), `${caseItem.name}: selected answer not reflected: ${value}`);
  }

  for (const expected of caseItem.expectedIncludes || []) {
    assert.ok(prompt.includes(expected), `${caseItem.name}: expected compiled prompt to include ${expected}`);
  }

  return prompt;
}

let trueClarifyCaseCount = 0;

for (const caseItem of promptCases) {
  const shouldShow = window.CBSRuleEngine.shouldShowClarify(caseItem.draft);
  assert.strictEqual(shouldShow, caseItem.shouldShowClarify, `${caseItem.name}: shouldShowClarify mismatch`);

  const taskType = window.CBSRuleEngine.classifyTaskType(caseItem.draft);
  const domain = window.CBSRuleEngine.classifyDomain(caseItem.draft);

  if (caseItem.expectedTaskType) {
    assert.strictEqual(taskType, caseItem.expectedTaskType, `${caseItem.name}: taskType mismatch`);
  }

  if (caseItem.expectedTaskTypes) {
    assert.ok(
      caseItem.expectedTaskTypes.includes(taskType),
      `${caseItem.name}: expected one of ${caseItem.expectedTaskTypes.join(", ")}, got ${taskType}`
    );
  }

  if (caseItem.expectedDomain) {
    assert.strictEqual(domain, caseItem.expectedDomain, `${caseItem.name}: domain mismatch`);
  }

  if (shouldShow) {
    trueClarifyCaseCount += 1;
    const questions = window.CBSRuleEngine.getQuestionsForDraft(caseItem.draft);
    assertQuestionQuality(caseItem.draft, questions);
  }

  if (caseItem.expectedTaskType || caseItem.expectedTaskTypes || caseItem.genericStress) {
    assertCompiledPrompt(caseItem, taskType, domain);
  }

  if (caseItem.genericStress) {
    assert.ok(shouldShow, `${caseItem.name}: generic stress cases should show Clarify`);
    const questions = window.CBSRuleEngine.getQuestionsForDraft(caseItem.draft);
    assertQuestionQuality(caseItem.draft, questions);
    const intent = window.CBSRuleEngine.analyzeIntent(caseItem.draft);
    assert.ok(intent.suggestedSlots.length > 0, `${caseItem.name}: intent should suggest slots`);
    assert.ok(intent.missingSlots.length > 0, `${caseItem.name}: intent should identify missing slots`);

    const prompt = compileWithRankedAnswers(caseItem.draft).prompt;
    assert.ok(prompt.includes("# 작업"), `${caseItem.name}: generic prompt missing task section`);
    assert.ok(
      prompt.includes("# 목표") || prompt.includes("# 확인된 정보"),
      `${caseItem.name}: generic prompt missing goal/confirmed section`
    );
    assert.ok(
      prompt.includes("# 맥락") || prompt.includes("원문 요청"),
      `${caseItem.name}: generic prompt missing context/original request`
    );
    assert.ok(prompt.includes("# 출력 형식"), `${caseItem.name}: generic prompt missing output section`);
    assert.ok(!prompt.startsWith("너는"), `${caseItem.name}: generic prompt must not be persona-first`);
    assert.ok(prompt.length > 300, `${caseItem.name}: generic prompt is too thin`);
    assert.ok(prompt.length <= LENGTH_LIMITS[taskType], `${caseItem.name}: generic prompt too long (${prompt.length})`);
  }
}

const marketingPrompt = window.CBSBriefCompiler.compileBrief({
  draft: "우리 서비스 마케팅 전략 짜줘",
  domain: "marketing_strategy",
  taskType: "brief.plan",
  answers: {
    goal: "신규 유저 획득",
    output_format: "1페이지 전략 문서"
  }
});

for (const expected of ["신규 유저 획득", "1페이지 전략 문서", "그로스", "실행", "성공 지표"]) {
  assert.ok(marketingPrompt.includes(expected), `marketing plan should include ${expected}`);
}

const prdPrompt = window.CBSBriefCompiler.compileBrief({
  draft: "새 기능 PRD 써줘",
  domain: "product_planning",
  taskType: "brief.plan",
  answers: {
    goal: "내부 개발 착수용",
    scope: "성공 지표와 릴리즈 계획"
  }
});

for (const expected of ["PRD", "요구사항", "사용자 시나리오", "성공 지표"]) {
  assert.ok(prdPrompt.includes(expected), `PRD prompt should include ${expected}`);
}

const launchPlan = compileWithRankedAnswers("다음 달 런칭 계획 세워줘");
assert.strictEqual(launchPlan.taskType, "brief.plan", "launch plan should be a plan task");
assert.notStrictEqual(launchPlan.domain, "personal_prioritization", "launch plan must not be personal prioritization");
assertAnyIncludes(questionText(launchPlan), ["무엇을 런칭", "런칭"], "launch plan should ask launch-specific questions");
assert.ok(launchPlan.prompt.includes("다음 달"), "launch plan should preserve next-month timeframe");
assert.ok(!launchPlan.prompt.includes("신규 유저 획득"), "launch plan must not default to user acquisition");
assert.ok(!launchPlan.prompt.includes("생산성 코치"), "launch plan must not use productivity-coach perspective");
assert.ok(!launchPlan.prompt.includes("오늘 할 일 3개 추천"), "launch plan must not use personal prioritization output defaults");

const prdQuestions = window.CBSRuleEngine.getQuestionsForDraft("새 기능 PRD 써줘");
const prdQuestionText = prdQuestions.map((question) => `${question.label} ${question.options.join(" ")}`).join(" ");
assert.ok(
  prdQuestionText.includes("어떤 기능") || prdQuestionText.includes("문제"),
  "PRD plan should ask which feature/problem is being covered"
);
assert.ok(prdQuestionText.includes("PRD") || prdQuestionText.includes("포함할 범위"), "PRD plan should ask PRD scope");
assert.ok(!prdQuestionText.includes("가장 중요한 목표"), "PRD plan must not use generic plan goal question");

const competitorAnalysis = compileWithRankedAnswers("경쟁사 분석해줘");
assertAnyIncludes(questionText(competitorAnalysis), ["경쟁사", "분석할 범위"], "competitor analysis should ask analysis scope");
assertAnyIncludes(
  questionText(competitorAnalysis),
  ["분석 기준", "기능/제품", "가격/수익모델", "포지셔닝"],
  "competitor analysis should ask concrete comparison dimensions"
);
assert.ok(!competitorAnalysis.answers.goal, "competitor analysis must not ask abstract goal by default");

const serviceName = compileWithRankedAnswers("서비스 이름 아이디어 줘");
assert.strictEqual(serviceName.intent.filledSlots.goal, "이름/슬로건", "service naming should infer name/slogan by default");
assertAnyIncludes(questionText(serviceName), ["서비스 이름", "네이밍"], "service naming should ask naming-specific questions");
assertAnyIncludes(serviceName.prompt, ["이름", "네이밍"], "service naming prompt should include naming intent");
assert.ok(!serviceName.prompt.includes("목표는 \"캠페인 아이디어\""), "service naming must not compile as campaign ideas");
assert.ok(!serviceName.prompt.includes("B2B SaaS"), "service naming must not assume B2B SaaS without signal");

const chooseAB = compileWithRankedAnswers("A랑 B 중 뭐가 나을까?");
assert.strictEqual(chooseAB.intent.filledSlots.goal, "선택지 비교", "A/B choice should infer option comparison by default");
assert.strictEqual(chooseAB.answers.option_details, "A/B 설명을 먼저 요청", "A/B choice should ask for option details before comparing");
assert.ok(!chooseAB.prompt.includes("제품/기능 선택"), "A/B choice must not inject product/feature assumptions");
assert.ok(!chooseAB.prompt.includes("오늘 할 다음 액션"), "A/B choice must not use generic prioritization output contract");

const conversionAnalysis = compileWithRankedAnswers("우리 전환율이 왜 낮은지 분석해줘");
assert.strictEqual(conversionAnalysis.intent.filledSlots.goal, "문제 원인 진단", "why/low analysis should infer cause diagnosis");
assertAnyIncludes(questionText(conversionAnalysis), ["전환 단계", "퍼널"], "conversion diagnosis should ask funnel-stage questions");
assertAnyIncludes(conversionAnalysis.prompt, ["원인", "가설", "데이터 확인"], "conversion diagnosis should compile diagnosis method");
assert.ok(!conversionAnalysis.prompt.includes("비교표"), "conversion diagnosis must not default to comparison table");
assert.ok(!conversionAnalysis.prompt.includes("1페이지 전략 문서"), "analysis prompt must not inherit marketing output format defaults");

const prosConsComparison = compileWithRankedAnswers("A안 B안 장단점 비교해줘");
assert.strictEqual(prosConsComparison.intent.filledSlots.goal, "장단점 비교", "pros/cons comparison should infer pros-cons comparison");
assertAnyIncludes(questionText(prosConsComparison), ["A안", "B안", "무엇을 비교"], "A/B comparison should ask what is being compared");
assert.ok(!questionText(prosConsComparison).includes("지금 필요한 것은"), "A/B comparison must not ask generic goal question");
assert.ok(!prosConsComparison.prompt.includes("목표는 \"문제 원인 진단\""), "pros/cons comparison must not compile as cause diagnosis");
assert.strictEqual(prosConsComparison.answers.option_details, "A/B 설명을 먼저 요청", "A/B comparison should ask for option details before comparing");
assert.ok(!prosConsComparison.prompt.includes("제품/기능 선택"), "A/B comparison must not inject product/feature assumptions");

const ideaProsCons = compileWithRankedAnswers("내 아이디어 장단점 분석해줘");
assert.strictEqual(ideaProsCons.intent.filledSlots.goal, "장단점 비교", "idea pros/cons should infer pros-cons comparison");
assert.strictEqual(ideaProsCons.intent.intentQuestionKey, "idea_pros_cons", "idea pros/cons should use idea-specific slot questions");
assertAnyIncludes(questionText(ideaProsCons), ["어떤 아이디어", "분석 기준"], "idea pros/cons should ask for idea content and criteria");
assert.strictEqual(ideaProsCons.answers.artifact_topic, "아이디어 설명을 먼저 요청", "idea pros/cons should request the actual idea before analysis");
assertAnyIncludes(ideaProsCons.prompt, ["아이디어", "검증", "리스크"], "idea pros/cons prompt should focus on idea analysis");
assert.ok(!ideaProsCons.prompt.includes("목표는 \"문제 원인 진단\""), "idea pros/cons must not compile as cause diagnosis");

const tableExtractDraft = "아래 내용을 표로 정리해줘";
assert.strictEqual(window.CBSRuleEngine.shouldShowClarify(tableExtractDraft), false, "table extract should be skipped by runtime");
assert.notStrictEqual(
  window.CBSRuleEngine.classifyDomain(tableExtractDraft),
  "personal_prioritization",
  "table extract must not be personal prioritization"
);

const campaignIdeas = compileWithRankedAnswers("캠페인 아이디어 10개 줘");
assertAnyIncludes(questionText(campaignIdeas), ["대상", "목적"], "campaign ideas should ask audience/objective");
assert.ok(campaignIdeas.prompt.includes("10개"), "campaign ideas prompt should preserve explicit count");
assert.ok(!campaignIdeas.prompt.includes("B2B SaaS"), "campaign ideas must not assume B2B SaaS without signal");

const chromeTrendResearch = compileWithRankedAnswers("최근 크롬 익스텐션 트렌드 조사해줘");
assert.strictEqual(chromeTrendResearch.intent.intentQuestionKey, "trend_research", "recent trend research should use trend-specific slots");
assertAnyIncludes(questionText(chromeTrendResearch), ["기간", "자료 기준"], "trend research should ask recency/source questions");
assert.ok(chromeTrendResearch.prompt.includes("최근"), "trend research should preserve recency signal");

const onePageMarketing = compileWithRankedAnswers("마케팅 전략을 1페이지로 정리해줘");
assert.ok(
  onePageMarketing.prompt.includes("1페이지 전략 문서") || onePageMarketing.prompt.includes("1페이지"),
  "one-page marketing plan should preserve one-page scope"
);
assert.notStrictEqual(
  onePageMarketing.answers.scope,
  "오늘/이번 주 바로 실행",
  "one-page marketing plan must not select immediate execution as assumed scope"
);

assertArtifactDraft(
  "채용 공고 써줘",
  "job_posting",
  ["채용", "공고"],
  ["대상: 고객"],
  ["역할", "공고", "강조"]
);

assertArtifactDraft("회의 아젠다 만들어줘", "meeting_agenda", ["회의", "아젠다"], ["신규 유저 획득"]);

assertArtifactDraft(
  "고객 인터뷰 질문 뽑아줘",
  "question_set",
  ["인터뷰", "질문"],
  ["시장 흐름 파악"],
  ["질문"]
);

assertArtifactDraft(
  "발표 구조 잡아줘",
  ["presentation_outline", "generic_outline"],
  ["발표", "구조"],
  ["선택된 출력 형식: 표로 정리"]
);

assertArtifactDraft("강의 커리큘럼 만들어줘", "curriculum", ["강의", "커리큘럼"], ["신규 유저 획득"]);
assertAnyIncludes(
  questionText(compileWithRankedAnswers("강의 커리큘럼 만들어줘")),
  ["강의 주제", "주제"],
  "curriculum should ask for course topic before only audience/scope"
);

assertArtifactDraft("CS 응대 매뉴얼 만들어줘", "manual_or_playbook", ["CS", "매뉴얼"], ["신규 유저 획득"]);

assertArtifactDraft("온보딩 문서 만들어줘", "onboarding_doc", ["온보딩"], ["신규 유저 획득"]);

const youtubePlan = assertArtifactDraft("유튜브 영상 기획안 써줘", "content_plan", ["유튜브", "기획안"], ["PRD"]);
assert.notStrictEqual(youtubePlan.domain, "product_planning", "youtube planning doc must not be product planning domain");
assert.ok(
  !youtubePlan.questions.map((question) => question.label).join(" ").includes("PRD"),
  "youtube planning doc must not ask PRD questions"
);

assertArtifactDraft("블로그 글 목차 짜줘", "blog_outline", ["블로그", "목차"], ["본문 초안"]);

assertArtifactDraft("설문조사 문항 만들어줘", ["survey_questions", "question_set"], ["설문", "문항"], ["시장 흐름 파악"]);

assertArtifactDraft("팀 회고 질문 만들어줘", ["retrospective_questions", "question_set"], ["회고", "질문"], ["시장 흐름 파악"]);

assertArtifactDraft("제안서 구조 잡아줘", "proposal_outline", ["제안서", "구조"], ["신규 유저 획득"]);
const proposalOutline = compileWithRankedAnswers("제안서 구조 잡아줘");
assert.ok(!proposalOutline.prompt.includes("신규 계약 설득"), "generic proposal outline must not assume a sales-contract purpose");
assert.strictEqual(proposalOutline.answers.proposal_goal, "문제 해결안 제시", "generic proposal outline should use a lower-risk proposal purpose default");

assertArtifactDraft(
  "세일즈 콜 스크립트 써줘",
  "sales_script",
  ["세일즈", "콜", "스크립트"],
  ["신규 유저 획득", "PRD", "채용 공고", "시장 흐름", "생산성 코치", "1페이지 전략 문서"],
  ["대상 고객", "목적"]
);

assertArtifactDraft(
  "콜드메일 작성해줘",
  "cold_email",
  ["콜드메일", "메일", "CTA"],
  ["PRD", "회의 아젠다", "신규 유저 획득"],
  ["대상 고객", "다음 액션"]
);

assertArtifactDraft(
  "제휴 제안서 목차 짜줘",
  "proposal_outline",
  ["제안서", "목차", "구조"],
  ["신규 유저 획득", "메일 초안"],
  ["제안서의 목적", "대상 고객"]
);

assertArtifactDraft(
  "잠재 고객 objections 정리해줘",
  "objections_analysis",
  ["objection", "우려", "대응"],
  ["시장 흐름", "PRD", "신규 유저 획득"],
  ["objection", "대상 고객"]
);

assertArtifactDraft(
  "데모 미팅 아젠다 만들어줘",
  "demo_agenda",
  ["데모", "미팅", "아젠다"],
  ["신규 유저 획득", "채용 공고"],
  ["미팅의 가장 중요한 목적", "영업 단계"]
);

assertArtifactDraft(
  "영업 후속 메일 써줘",
  "follow_up_email",
  ["후속", "메일"],
  ["PRD", "회의 아젠다", "신규 유저 획득"],
  ["영업 단계", "다음 액션"]
);

assertArtifactDraft(
  "가격 협상 대응 문구 써줘",
  "negotiation_reply",
  ["가격", "협상", "대응"],
  ["PRD", "신규 유저 획득", "1페이지 전략 문서"],
  ["objection", "영업 단계"]
);

assert.strictEqual(
  window.CBSRuleEngine.shouldShowClarify("이 문장 영업스럽게 바꿔줘"),
  false,
  "simple salesy rewrite should be suppressed"
);

const salesCollateralIntent = window.CBSRuleEngine.analyzeIntent("우리 제품 세일즈 자료 만들어줘");
assert.strictEqual(salesCollateralIntent.artifactType, "sales_collateral", "sales collateral should be detected as a sales artifact");
assert.strictEqual(
  salesCollateralIntent.shouldClarify,
  true,
  "sales collateral should use Sales/BD artifact questions"
);
const salesCollateral = assertArtifactDraft(
  "우리 제품 세일즈 자료 만들어줘",
  "sales_collateral",
  ["세일즈", "자료"],
  ["신규 유저 획득", "PRD"],
  ["대상 고객", "맥락"]
);
assert.ok(salesCollateral.prompt.includes("확인 질문"), "sales collateral should ask for missing product context first");

const customerProposal = assertArtifactDraft(
  "A 고객에게 제안서 써줘",
  "proposal_outline",
  ["제안서"],
  ["신규 유저 획득", "PRD"],
  ["제안서의 목적", "제안할 내용"]
);
assert.ok(customerProposal.prompt.includes("확인 질문"), "customer-specific proposal should ask for missing customer/proposal context first");

const compactDrafts = [
  "서비스 이름 아이디어 줘",
  "캠페인 아이디어 10개 줘",
  "투자자에게 업데이트 메일 써줘",
  "채용 공고 써줘",
  "회의 아젠다 만들어줘",
  "고객 인터뷰 질문 뽑아줘",
  "블로그 글 목차 짜줘",
  "고객 불만 답변 써줘",
  "제안서 구조 잡아줘",
  "세일즈 콜 스크립트 써줘",
  "콜드메일 작성해줘",
  "가격 협상 대응 문구 써줘"
];

for (const draft of compactDrafts) {
  const result = compileWithRankedAnswers(draft);
  assert.ok(result.prompt.includes("# 확인된 정보"), `${draft}: compact prompt should include confirmed-info section`);
  assert.ok(result.prompt.includes("# 주의할 점"), `${draft}: compact prompt should include caution section`);
  assert.ok(result.prompt.length <= 1000, `${draft}: compact prompt should be 1000 chars or fewer (${result.prompt.length})`);
}

assert.ok(trueClarifyCaseCount >= 15, "expected at least 15 clarify-positive cases");

console.log(`promptQuality tests ok (${promptCases.length} cases)`);
