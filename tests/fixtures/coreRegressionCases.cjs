module.exports = [
  {
    name: "marketing strategy plan",
    draft: "우리 서비스 마케팅 전략 짜줘",
    expectedTaskType: "brief.plan",
    expectedDomain: "marketing_strategy",
    shouldShowClarify: true,
    sampleAnswers: {
      goal: "신규 유저 획득",
      scope: "1페이지 전략 문서"
    },
    expectedIncludes: ["마케팅", "실행", "성공 지표"]
  },
  {
    name: "launch plan",
    draft: "다음 달 런칭 계획 세워줘",
    expectedTaskType: "brief.plan",
    shouldShowClarify: true
  },
  {
    name: "new feature prd",
    draft: "새 기능 PRD 써줘",
    expectedTaskType: "brief.plan",
    expectedDomain: "product_planning",
    shouldShowClarify: true,
    sampleAnswers: {
      feature_problem: "새 기능 아이디어 구체화",
      prd_scope: "성공 지표와 릴리즈 계획"
    },
    expectedIncludes: ["PRD", "요구사항", "성공 지표"]
  },
  {
    name: "competitor analysis",
    draft: "경쟁사 분석해줘",
    expectedTaskType: "brief.analyze",
    expectedDomain: "research",
    shouldShowClarify: true,
    expectedIncludes: ["분석 기준", "비교"]
  },
  {
    name: "conversion rate diagnosis",
    draft: "우리 전환율이 왜 낮은지 분석해줘",
    expectedTaskType: "brief.analyze",
    shouldShowClarify: true
  },
  {
    name: "option pros cons comparison",
    draft: "A안 B안 장단점 비교해줘",
    expectedTaskType: "brief.analyze",
    shouldShowClarify: false
  },
  {
    name: "investor update email",
    draft: "투자자에게 업데이트 메일 써줘",
    expectedTaskType: "brief.write",
    expectedDomain: "writing_email",
    shouldShowClarify: true,
    sampleAnswers: {
      goal: "업데이트 공유",
      tone: "정중하고 간결하게"
    },
    expectedIncludes: ["본문 초안", "간결", "독자"]
  },
  {
    name: "customer price increase email",
    draft: "고객에게 가격 인상 안내 메일 써줘",
    expectedTaskType: "brief.write",
    shouldShowClarify: true
  },
  {
    name: "ai productivity market research",
    draft: "AI 생산성 툴 시장 조사해줘",
    expectedTaskType: "brief.research",
    shouldShowClarify: true
  },
  {
    name: "chrome extension trend research",
    draft: "최근 크롬 익스텐션 트렌드 조사해줘",
    expectedTaskType: "brief.research",
    shouldShowClarify: true
  },
  {
    name: "personal prioritization",
    draft: "뭐부터 해야 할지 모르겠어. 정리 좀 해줘.",
    expectedTaskType: "brief.decide",
    expectedDomain: "personal_prioritization",
    shouldShowClarify: true,
    sampleAnswers: {
      decision_need: "우선순위 정리",
      decision_criteria: "속도"
    },
    expectedIncludes: ["우선순위", "다음 액션"]
  },
  {
    name: "weekly priority",
    draft: "이번 주 우선순위 정해줘",
    expectedTaskType: "brief.decide",
    shouldShowClarify: true
  },
  {
    name: "choose between a and b",
    draft: "A랑 B 중 뭐가 나을까?",
    expectedTaskType: "brief.decide",
    shouldShowClarify: false
  },
  {
    name: "campaign ideas",
    draft: "캠페인 아이디어 10개 줘",
    expectedTaskType: "brief.create",
    shouldShowClarify: true
  },
  {
    name: "service name ideas",
    draft: "서비스 이름 아이디어 줘",
    expectedTaskType: "brief.create",
    shouldShowClarify: true
  },
  {
    name: "summarize key points",
    draft: "이 내용 핵심만 요약해줘",
    expectedTaskType: "brief.extract",
    shouldShowClarify: false
  },
  {
    name: "organize as table",
    draft: "아래 내용을 표로 정리해줘",
    expectedTaskType: "brief.extract",
    shouldShowClarify: false
  },
  {
    name: "hello",
    draft: "안녕",
    shouldShowClarify: false
  },
  {
    name: "translate sentence",
    draft: "이 문장 번역해줘",
    shouldShowClarify: false
  },
  {
    name: "fix spelling",
    draft: "맞춤법 고쳐줘",
    shouldShowClarify: false
  },
  {
    name: "short summary",
    draft: "짧게 요약해줘",
    shouldShowClarify: false
  },
  {
    name: "organize means decide",
    draft: "뭐부터 해야 할지 모르겠어. 정리 좀 해줘.",
    expectedTaskType: "brief.decide",
    shouldShowClarify: true
  },
  {
    name: "organize means extract",
    draft: "이 내용 핵심만 요약해서 정리해줘",
    expectedTaskType: "brief.extract",
    shouldShowClarify: false
  },
  {
    name: "organize means plan",
    draft: "마케팅 전략을 1페이지로 정리해줘",
    expectedTaskType: "brief.plan",
    expectedDomain: "marketing_strategy",
    shouldShowClarify: true
  },
  {
    name: "generic job posting",
    draft: "채용 공고 써줘",
    expectedTaskTypes: ["brief.write"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["채용", "공고"]
  },
  {
    name: "generic meeting agenda",
    draft: "회의 아젠다 만들어줘",
    expectedTaskTypes: ["brief.plan"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["회의", "아젠다"]
  },
  {
    name: "generic customer interview questions",
    draft: "고객 인터뷰 질문 뽑아줘",
    expectedTaskTypes: ["brief.research", "brief.create"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["인터뷰", "질문"]
  },
  {
    name: "generic presentation structure",
    draft: "발표 구조 잡아줘",
    expectedTaskTypes: ["brief.plan"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["발표", "구조"]
  },
  {
    name: "generic lecture curriculum",
    draft: "강의 커리큘럼 만들어줘",
    expectedTaskTypes: ["brief.plan"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["강의", "커리큘럼"]
  },
  {
    name: "generic cs response manual",
    draft: "CS 응대 매뉴얼 만들어줘",
    expectedTaskTypes: ["brief.plan", "brief.write"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["CS", "매뉴얼"]
  },
  {
    name: "generic onboarding document",
    draft: "온보딩 문서 만들어줘",
    expectedTaskTypes: ["brief.plan", "brief.write"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["온보딩", "문서"]
  },
  {
    name: "generic youtube planning doc",
    draft: "유튜브 영상 기획안 써줘",
    expectedTaskTypes: ["brief.plan", "brief.write"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["유튜브", "기획안"]
  },
  {
    name: "generic blog outline",
    draft: "블로그 글 목차 짜줘",
    expectedTaskTypes: ["brief.write", "brief.plan"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["블로그", "목차"]
  },
  {
    name: "generic survey questions",
    draft: "설문조사 문항 만들어줘",
    expectedTaskTypes: ["brief.research", "brief.create"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["설문조사", "문항"]
  },
  {
    name: "generic idea pros cons analysis",
    draft: "내 아이디어 장단점 분석해줘",
    expectedTaskTypes: ["brief.analyze"],
    shouldShowClarify: false,
    expectedIncludes: ["아이디어", "장단점"]
  },
  {
    name: "generic team retrospective questions",
    draft: "팀 회고 질문 만들어줘",
    expectedTaskTypes: ["brief.research", "brief.create"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["팀", "질문"]
  },
  {
    name: "generic handoff document",
    draft: "업무 인수인계 문서 작성해줘",
    expectedTaskTypes: ["brief.write"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["인수인계", "문서"]
  },
  {
    name: "generic customer complaint reply",
    draft: "고객 불만 답변 써줘",
    expectedTaskTypes: ["brief.write"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["고객", "불만"]
  },
  {
    name: "generic proposal structure",
    draft: "제안서 구조 잡아줘",
    expectedTaskTypes: ["brief.plan", "brief.write"],
    shouldShowClarify: true,
    genericStress: true,
    expectedIncludes: ["제안서", "구조"]
  },
  {
    name: "partnership proposal outline",
    draft: "제휴 제안서 목차 짜줘",
    domainPack: "sales_bd",
    clarificationMode: "multiple_choice",
    expectedShouldShowClarify: true,
    expectedTaskTypes: ["brief.plan", "brief.write"],
    expectedArtifactType: "proposal_outline",
    expectedIncludes: ["제안서", "목차", "구조"],
    expectedExcludes: ["신규 유저 획득", "메일 초안"],
    promotedFrom: "sales_bd_candidate_v1",
    promotionReason: "manual_promotion_after_partial_promote_ready",
    promotedAt: "2026-05-29"
  },
  {
    name: "demo meeting agenda",
    draft: "데모 미팅 아젠다 만들어줘",
    domainPack: "sales_bd",
    clarificationMode: "multiple_choice",
    expectedShouldShowClarify: true,
    expectedTaskType: "brief.plan",
    expectedArtifactTypes: ["demo_agenda", "meeting_agenda"],
    expectedIncludes: ["데모", "미팅", "아젠다"],
    expectedExcludes: ["신규 유저 획득", "채용 공고"],
    promotedFrom: "sales_bd_candidate_v1",
    promotionReason: "manual_promotion_after_partial_promote_ready",
    promotedAt: "2026-05-29"
  },
  {
    name: "salesy rewrite suppression",
    draft: "이 문장 영업스럽게 바꿔줘",
    domainPack: "sales_bd",
    clarificationMode: "suppress",
    expectedShouldShowClarify: false,
    expectedExcludes: ["신규 유저 획득", "PRD"],
    notes: "단순 문장 rewrite다. Clarify가 뜨면 방해다.",
    promotedFrom: "sales_bd_candidate_v1",
    promotionReason: "manual_promotion_after_partial_promote_ready",
    promotedAt: "2026-05-29"
  },
  {
    name: "price negotiation reply",
    draft: "가격 협상 대응 문구 써줘",
    domainPack: "sales_bd",
    clarificationMode: "multiple_choice",
    expectedShouldShowClarify: true,
    expectedTaskType: "brief.write",
    expectedArtifactType: "negotiation_reply",
    expectedIncludes: ["가격", "협상", "대응", "문구"],
    expectedExcludes: ["PRD", "신규 유저 획득"],
    promotedFrom: "sales_bd_candidate_v1",
    promotionReason: "manual_promotion_after_partial_promote_ready",
    promotedAt: "2026-05-29"
  }
];
