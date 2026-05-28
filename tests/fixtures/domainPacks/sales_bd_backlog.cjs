module.exports = [
  {
    name: "sales call script",
    draft: "세일즈 콜 스크립트 써줘",
    domainPack: "sales_bd",
    clarificationMode: "multiple_choice",
    promotionGroup: "needs_patch",
    expectedShouldShowClarify: true,
    expectedTaskTypes: ["brief.write", "brief.plan"],
    expectedArtifactType: "sales_script",
    expectedIncludes: ["세일즈", "콜", "스크립트"],
    expectedExcludes: ["신규 유저 획득", "PRD"],
    notes: "세일즈 콜 목적, 대상, 콜 구조를 묻는 질문이 나오면 좋다.",
    backlogReason: "제품/고객/콜 목적 맥락이 없으면 스크립트 품질이 제한됨."
  },
  {
    name: "cold email draft",
    draft: "콜드메일 작성해줘",
    domainPack: "sales_bd",
    clarificationMode: "multiple_choice",
    promotionGroup: "needs_patch",
    expectedShouldShowClarify: true,
    expectedTaskType: "brief.write",
    expectedArtifactType: "cold_email",
    expectedIncludes: ["콜드메일", "메일", "제목", "본문"],
    expectedExcludes: ["PRD", "회의 아젠다"],
    backlogReason: "제품/오퍼/대상 고객 맥락이 없으면 품질이 제한됨. optional one-line offer/context field 후보."
  },
  {
    name: "prospect objections analysis",
    draft: "잠재 고객 objections 정리해줘",
    domainPack: "sales_bd",
    clarificationMode: "multiple_choice",
    promotionGroup: "promotion_ready",
    expectedShouldShowClarify: true,
    expectedTaskTypes: ["brief.analyze", "brief.extract"],
    expectedArtifactType: "objections_analysis",
    expectedIncludes: ["objection", "반박", "우려", "망설임", "대응", "정리"],
    expectedExcludes: ["시장 흐름", "PRD"],
    notes: "objection은 고객 반박/우려/망설임으로 해석하면 된다.",
    backlogReason: "후보는 좋지만 objection 유형과 고객 맥락 질문 보강 후 재검증 필요."
  },
  {
    name: "sales follow-up email",
    draft: "영업 후속 메일 써줘",
    domainPack: "sales_bd",
    clarificationMode: "multiple_choice",
    promotionGroup: "needs_patch",
    expectedShouldShowClarify: true,
    expectedTaskType: "brief.write",
    expectedArtifactType: "follow_up_email",
    expectedIncludes: ["영업", "후속", "메일"],
    expectedExcludes: ["PRD", "회의 아젠다"],
    backlogReason: "이전 접점과 다음 액션 정보가 필요함."
  },
  {
    name: "sales collateral for our product",
    draft: "우리 제품 세일즈 자료 만들어줘",
    domainPack: "sales_bd",
    clarificationMode: "needs_free_text",
    promotionGroup: "needs_context",
    expectedShouldShowClarify: true,
    allowedShouldShowClarify: [false, true],
    expectedTaskTypes: ["brief.plan", "brief.write"],
    expectedIncludes: ["세일즈", "자료"],
    expectedExcludes: ["신규 유저 획득", "PRD"],
    notes:
      "어떤 제품인지 없어서 v0 객관식만으로는 완성도 높은 결과를 만들기 어렵다. Clarify가 뜬다면 제품 유형/대상 고객/자료 목적을 물어야 한다.",
    backlogReason: "제품 설명과 대상 고객 정보가 필요함. one-line product/context input 후보."
  },
  {
    name: "proposal for customer A",
    draft: "A 고객에게 제안서 써줘",
    domainPack: "sales_bd",
    clarificationMode: "needs_free_text",
    promotionGroup: "needs_context",
    expectedShouldShowClarify: true,
    allowedShouldShowClarify: [false, true],
    expectedTaskTypes: ["brief.write", "brief.plan"],
    expectedIncludes: ["제안서"],
    expectedExcludes: ["신규 유저 획득", "PRD"],
    notes:
      "A 고객이 누구인지, 제안 내용이 무엇인지 없어 free-text가 필요한 케이스다. v0에서는 suppress 또는 추가 정보 필요로 안전 처리하는 것이 좋다.",
    backlogReason: "고객 상황과 제안 내용이 필요함. one-line customer/context input 후보."
  }
];
