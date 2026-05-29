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
  },
  {
    name: "empathetic rewrite suppression",
    draft: "이 문장 고객에게 더 공감 있게 바꿔줘",
    expectedTaskType: "brief.generic",
    expectedDomain: "generic",
    expectedArtifactType: "none",
    domainPack: "customer_support",
    clarificationMode: "suppress",
    promotionGroup: "suppress_regression",
    expectedShouldShowClarify: false,
    expectedIncludes: ["고객", "공감"],
    expectedExcludes: ["신규 유저 획득", "PRD"],
    notes: "단순 tone rewrite는 Clarify가 뜨면 방해다.",
    promotedFrom: "customer_support_candidate_v1",
    promotionReason: "manual_promotion_after_candidate_cycle",
    promotedAt: "2026-05-29"
  },
  {
    name: "delayed delivery complaint reply",
    draft: "배송 지연 고객 불만 답변 써줘",
    expectedTaskType: "brief.write",
    expectedDomain: "generic",
    expectedArtifactType: "complaint_reply",
    domainPack: "customer_support",
    clarificationMode: "multiple_choice",
    promotionGroup: "promotion_ready",
    expectedShouldShowClarify: true,
    expectedIncludes: ["배송", "지연", "불만", "고객", "답변"],
    expectedExcludes: ["신규 유저 획득", "PRD", "세일즈 콜"],
    notes: "불만 응대에서 공감, 사실 확인, 해결 방안, 다음 액션이 살아야 한다.",
    promotedFrom: "customer_support_candidate_v1",
    promotionReason: "manual_promotion_after_candidate_cycle",
    promotedAt: "2026-05-29"
  },
  {
    name: "refund policy support manual",
    draft: "환불 정책 CS 응대 매뉴얼 만들어줘",
    expectedTaskType: "brief.plan",
    expectedDomain: "generic",
    expectedArtifactType: "refund_policy_manual",
    domainPack: "customer_support",
    clarificationMode: "multiple_choice",
    promotionGroup: "promotion_ready",
    expectedShouldShowClarify: true,
    expectedIncludes: ["환불", "정책", "CS", "응대", "매뉴얼"],
    expectedExcludes: ["신규 유저 획득", "PRD", "콜드메일"],
    notes: "지원팀이 일관되게 응대할 수 있는 절차와 escalation 기준이 필요하다.",
    promotedFrom: "customer_support_candidate_v1",
    promotionReason: "manual_promotion_after_candidate_cycle",
    promotedAt: "2026-05-29"
  },
  {
    name: "vip escalation response plan",
    draft: "VIP 고객 클레임 대응 초안 써줘",
    expectedTaskType: "brief.write",
    expectedDomain: "generic",
    expectedArtifactType: "vip_complaint_reply",
    domainPack: "customer_support",
    clarificationMode: "multiple_choice",
    promotionGroup: "needs_patch",
    expectedShouldShowClarify: true,
    expectedIncludes: ["VIP", "고객", "클레임", "대응"],
    expectedExcludes: ["신규 유저 획득", "PRD", "채용 공고"],
    notes: "risk, escalation, trust recovery 기준이 필요한 고위험 대응 케이스다.",
    promotedFrom: "customer_support_candidate_v1",
    promotionReason: "manual_promotion_after_candidate_cycle",
    promotedAt: "2026-05-29"
  },
  {
    name: "vip escalation paraphrase",
    draft: "중요 고객 항의에 긴급 대응 메일 초안 써줘",
    expectedTaskType: "brief.write",
    expectedDomain: "writing_email",
    expectedArtifactType: "vip_complaint_reply",
    domainPack: "customer_support",
    clarificationMode: "multiple_choice",
    promotionGroup: "needs_patch",
    expectedShouldShowClarify: true,
    expectedIncludes: ["중요 고객", "항의", "긴급 대응", "메일"],
    expectedExcludes: ["신규 유저 획득", "PRD", "채용 공고"],
    notes: "VIP/클레임이라는 고정 문구 없이 중요 고객/항의/긴급 대응 신호로 escalation 대응을 잡는다.",
    promotedFrom: "customer_support_candidate_v1",
    promotionReason: "manual_promotion_after_candidate_cycle_overfit_guard",
    promotedAt: "2026-05-29"
  },
  {
    "name": "sales call script",
    "draft": "세일즈 콜 스크립트 써줘",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedTaskTypes": [
      "brief.write",
      "brief.plan"
    ],
    "expectedArtifactType": "sales_script",
    "expectedIncludes": [
      "세일즈",
      "콜",
      "스크립트"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD"
    ],
    "notes": "세일즈 콜 목적, 대상, 콜 구조를 묻는 질문이 나오면 좋다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "제품/고객/콜 목적 맥락이 없으면 스크립트 품질이 제한됨.",
    "originalDomainPack": "sales_bd",
    "sampleContextLine": "재고관리 SaaS를 SMB 대표에게 소개하고 데모 미팅을 잡는 첫 콜"
  },
  {
    "name": "cold email draft",
    "draft": "콜드메일 작성해줘",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedTaskType": "brief.write",
    "expectedArtifactType": "cold_email",
    "expectedIncludes": [
      "콜드메일",
      "메일",
      "제목",
      "본문"
    ],
    "expectedExcludes": [
      "PRD",
      "회의 아젠다"
    ],
    "backlogReason": "제품/오퍼/대상 고객 맥락이 없으면 품질이 제한됨. optional one-line offer/context field 후보.",
    "originalDomainPack": "sales_bd",
    "sampleContextLine": "HR팀장에게 채용 자동화 SaaS 무료 데모를 제안하는 첫 콜드메일",
    "notes": "context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다."
  },
  {
    "name": "prospect objections analysis",
    "draft": "잠재 고객 objections 정리해줘",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedTaskTypes": [
      "brief.analyze",
      "brief.extract"
    ],
    "expectedArtifactType": "objections_analysis",
    "expectedIncludes": [
      "objection",
      "반박",
      "우려",
      "망설임",
      "대응",
      "정리"
    ],
    "expectedExcludes": [
      "시장 흐름",
      "PRD"
    ],
    "notes": "objection은 고객 반박/우려/망설임으로 해석하면 된다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "후보는 좋지만 objection 유형과 고객 맥락 질문 보강 후 재검증 필요.",
    "originalDomainPack": "sales_bd",
    "sampleContextLine": "보안과 도입 리스크를 우려하는 엔터프라이즈 IT 담당자 대상"
  },
  {
    "name": "sales follow-up email",
    "draft": "영업 후속 메일 써줘",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedTaskType": "brief.write",
    "expectedArtifactType": "follow_up_email",
    "expectedIncludes": [
      "영업",
      "후속",
      "메일"
    ],
    "expectedExcludes": [
      "PRD",
      "회의 아젠다"
    ],
    "backlogReason": "이전 접점과 다음 액션 정보가 필요함.",
    "originalDomainPack": "sales_bd",
    "sampleContextLine": "어제 제품 데모 후 가격표를 보낸 리드에게 다음 미팅을 요청",
    "notes": "context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다."
  },
  {
    "name": "sales collateral for our product",
    "draft": "우리 제품 세일즈 자료 만들어줘",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "allowedShouldShowClarify": [
      false,
      true
    ],
    "expectedTaskTypes": [
      "brief.plan",
      "brief.write"
    ],
    "expectedIncludes": [
      "세일즈",
      "자료"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD"
    ],
    "notes": "어떤 제품인지 없어서 v0 객관식만으로는 완성도 높은 결과를 만들기 어렵다. Clarify가 뜬다면 제품 유형/대상 고객/자료 목적을 물어야 한다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "제품 설명과 대상 고객 정보가 필요함. one-line product/context input 후보.",
    "originalDomainPack": "sales_bd",
    "expectedArtifactType": "sales_collateral",
    "sampleContextLine": "B2B 회계 자동화 제품, CFO 대상, 도입 검토용 1페이지 자료"
  },
  {
    "name": "refund request response",
    "draft": "환불 요청 고객 답변 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "refund_reply",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "환불",
      "요청",
      "고객",
      "답변"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "채용 공고"
    ],
    "notes": "환불 정책, 결제 상태, 예외 처리 권한이 없으면 free-text 맥락이 필요하다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "7일 환불 기간은 지났지만 첫 결제 고객이라 내부 검토 후 안내해야 함"
  },
  {
    "name": "service outage notice",
    "draft": "서비스 장애 공지 초안 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "outage_notice",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "서비스",
      "장애",
      "공지"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "가격 협상"
    ],
    "notes": "장애 범위, 발생 시간, 영향 고객, 복구 상태가 없으면 안전한 공지가 어렵다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "로그인 장애가 30분째 지속, 일부 계정 영향, 1시간 뒤 상태 업데이트 예정"
  },
  {
    "name": "support faq draft",
    "draft": "고객 지원 FAQ 초안 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "support_faq",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "고객",
      "지원",
      "FAQ"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "세일즈"
    ],
    "notes": "FAQ 범위와 형식을 묻되, source 문의 목록이 없으면 확인 필요로 남겨야 한다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "원본 문의 목록 입력 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "반복 문의는 로그인 오류, 환불 절차, 결제수단 변경, 비밀번호 재설정"
  },
  {
    "name": "new customer onboarding guide",
    "draft": "신규 고객 온보딩 문서 만들어줘",
    "expectedTaskType": "brief.plan",
    "expectedDomain": "generic",
    "expectedArtifactType": "onboarding_doc",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "신규 고객",
      "온보딩",
      "문서"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "채용 공고"
    ],
    "notes": "고객 성공 관점의 온보딩 대상과 단계가 잘 반영되는지 확인한다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "제품/서비스 맥락 입력 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "신규 고객이 첫 주 안에 결제 연동과 팀 초대를 완료하게 하는 SaaS 온보딩"
  },
  {
    "name": "churn save reply",
    "draft": "해지하려는 고객에게 붙잡는 답변 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "churn_save_reply",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "해지",
      "고객",
      "답변"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "세일즈 콜"
    ],
    "notes": "해지 사유, 고객 플랜, 제안 가능한 대안이 없으면 억지 객관식화하지 않는다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "가격 부담으로 해지를 고민하지만 사용량은 높고 월간 할인은 불가"
  },
  {
    "name": "customer success check-in email",
    "draft": "고객 성공 체크인 메일 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "customer_success_checkin",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "고객 성공",
      "체크인",
      "메일"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "채용 공고"
    ],
    "notes": "고객 상태, 사용 맥락, 체크인 목적이 없으면 free-text 맥락이 필요하다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "도입 2주차 고객, 핵심 기능 사용률이 낮아 활성화 지원 목적"
  },
  {
    "name": "refund reply paraphrase",
    "draft": "고객이 결제 취소하고 돈을 돌려달라고 할 때 답장 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "refund_reply",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "고객",
      "결제",
      "돌려",
      "답장"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "채용 공고"
    ],
    "notes": "환불이라는 고정 단어 없이 결제 취소/돈을 돌려달라는 의도로 refund_reply를 잡는 paraphrase 케이스. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "결제 후 3일 내 요청이라 환불 가능성이 높지만 결제수단 확인 필요"
  },
  {
    "name": "churn save paraphrase",
    "draft": "구독 취소하려는 고객 마음 돌리는 메일 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "churn_save_reply",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "구독 취소",
      "고객",
      "마음",
      "메일"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "세일즈 콜"
    ],
    "notes": "해지라는 고정 단어 없이 구독 취소/마음 돌리기 표현을 churn_save_reply로 분류하는 케이스. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "구독 취소 이유는 팀 사용률 저하, 교육 세션 제안 가능"
  },
  {
    "name": "customer success check-in paraphrase",
    "draft": "사용 현황 확인용 고객 점검 메일 작성해줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "customer_success_checkin",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "사용 현황",
      "고객",
      "점검 메일"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "채용 공고"
    ],
    "notes": "체크인이라는 고정 단어 없이 사용 현황 확인/점검 메일 신호로 customer_success_checkin을 잡는다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "월간 리포트 확인 전 사용 현황과 막힌 지점을 묻는 고객 성공 메일"
  },
  {
    "name": "support faq paraphrase",
    "draft": "자주 받는 고객 문의 Q&A 만들어줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "support_faq",
    "domainPack": "context_candidate",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "자주 받는",
      "고객 문의",
      "Q&A"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "세일즈"
    ],
    "notes": "FAQ라는 고정 문구 없이 자주 받는/Q&A 표현으로 support_faq를 잡고, 문의 범위/형식 질문으로 일반화한다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "자주 받는 문의는 배송 지연, 환불 가능 여부, 계정 로그인 문제"
  },
  {
    "name": "proposal for customer A",
    "draft": "A 고객에게 제안서 써줘",
    "domainPack": "context_line_backlog",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_patch",
    "expectedShouldShowClarify": true,
    "allowedShouldShowClarify": [
      false,
      true
    ],
    "expectedTaskTypes": [
      "brief.write",
      "brief.plan"
    ],
    "expectedIncludes": [
      "제안서"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD"
    ],
    "notes": "A 고객이 누구인지, 제안 내용이 무엇인지 없어 free-text가 필요한 케이스다. v0에서는 suppress 또는 추가 정보 필요로 안전 처리하는 것이 좋다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "고객 상황과 제안 내용이 필요함. one-line customer/context input 후보.",
    "originalDomainPack": "sales_bd",
    "expectedArtifactType": "proposal_outline",
    "sampleContextLine": "A 고객은 CS 비용 증가가 문제이고, 지원 자동화 도입을 제안하려 함"
  },
  {
    "name": "outage notice paraphrase",
    "draft": "점검 때문에 접속 불가한 상황을 고객 안내문으로 작성해줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "outage_notice",
    "domainPack": "context_line_backlog",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_patch",
    "expectedShouldShowClarify": true,
    "expectedIncludes": [
      "점검",
      "접속 불가",
      "고객",
      "안내문"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "가격 협상"
    ],
    "notes": "장애라는 고정 단어 없이 점검/접속 불가/안내문 신호로 outage_notice를 잡아야 한다. context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.",
    "backlogReason": "one-line context UX 필요",
    "originalDomainPack": "customer_support",
    "sampleContextLine": "예정 점검으로 23시부터 30분간 접속 불가, 완료 후 공지 예정"
  },
  {
    "name": "email information request",
    "draft": "팀원에게 자료 요청하는 메일 작성해줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "writing_email",
    "expectedArtifactType": "email_draft",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "다음 주 월요일까지 3월 매출 자료를 받아 보고서에 반영해야 함",
    "expectedIncludes": [
      "메일",
      "자료",
      "요청"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "세일즈"
    ],
    "notes": "General email draft should ask purpose/tone without inheriting sales defaults."
  },
  {
    "name": "approval request email",
    "draft": "대표님께 승인 요청 메일 보내야 해. 초안 좀",
    "expectedTaskType": "brief.write",
    "expectedDomain": "writing_email",
    "expectedArtifactType": "approval_request_email",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "다음 분기 채용 예산 500만원 승인을 요청하는 상황",
    "expectedIncludes": [
      "승인",
      "메일",
      "예산"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "콜드메일"
    ],
    "notes": "Approval target and context are essential, so one-line context should carry the specifics."
  },
  {
    "name": "schedule change email",
    "draft": "파트너사에 일정 변경 메일 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "writing_email",
    "expectedArtifactType": "schedule_change_email",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "다음 주 미팅을 내부 일정 때문에 목요일 오후로 변경 요청",
    "expectedIncludes": [
      "일정",
      "변경",
      "메일"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "장애"
    ],
    "notes": "Schedule change email needs before/after context but should not become outage wording."
  },
  {
    "name": "apology email",
    "draft": "고객에게 사과 메일 작성해줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "writing_email",
    "expectedArtifactType": "apology_email",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "자료 전달이 하루 늦어진 상황이며 재발 방지 계획을 짧게 포함",
    "expectedIncludes": [
      "사과",
      "메일",
      "재발 방지"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "가격 협상"
    ],
    "notes": "Apology email quality depends on the missing incident context."
  },
  {
    "name": "meeting follow-up email",
    "draft": "회의 후 팔로업 메일 써줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "writing_email",
    "expectedArtifactType": "email_followup",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "오늘 킥오프에서 일정과 담당자를 정했고 금요일까지 초안 공유를 요청",
    "expectedIncludes": [
      "팔로업",
      "메일",
      "CTA"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "콜드메일"
    ],
    "notes": "Non-sales follow-up should stay generic email, not sales follow-up."
  },
  {
    "name": "pm user story conversion",
    "draft": "신규 기능 요구사항을 유저 스토리로 바꿔줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "product_planning",
    "expectedArtifactType": "pm_user_story",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "신규 사용자가 결제 전 무료 체험 한도를 확인하고 업그레이드할 수 있어야 함",
    "expectedIncludes": [
      "유저 스토리",
      "요구사항",
      "수용 기준"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "메일 초안"
    ],
    "notes": "PM artifact should not be treated as simple text transform."
  },
  {
    "name": "pm sprint priority",
    "draft": "다음 스프린트 우선순위 정리해줘",
    "expectedTaskType": "brief.decide",
    "expectedDomain": "product_planning",
    "expectedArtifactType": "pm_sprint_priority",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "결제 오류 수정, 온보딩 개선, 관리자 통계 화면 중 2주 안에 끝낼 항목을 정해야 함",
    "expectedIncludes": [
      "스프린트",
      "우선순위",
      "TODO"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "생산성 코치"
    ],
    "notes": "Sprint prioritization should ask PM criteria, not personal productivity defaults."
  },
  {
    "name": "pm metrics dashboard",
    "draft": "제품 지표 대시보드에 넣을 항목 추천해줘",
    "expectedTaskType": "brief.analyze",
    "expectedDomain": "product_planning",
    "expectedArtifactType": "pm_metrics_dashboard",
    "domainPack": "email_pm",
    "clarificationMode": "multiple_choice",
    "promotionGroup": "promotion_ready",
    "expectedShouldShowClarify": true,
    "sampleAnswers": {
      "pm_metric_goal": "제품 활성화 파악",
      "pm_output_format": "정의와 계산식 포함"
    },
    "expectedIncludes": [
      "제품 지표",
      "대시보드",
      "계산식"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "메일 초안"
    ],
    "notes": "Metric recommendations should stay product-measurement focused."
  },
  {
    "name": "pm executive status report",
    "draft": "임원 보고용 프로젝트 현황 정리해줘",
    "expectedTaskType": "brief.write",
    "expectedDomain": "generic",
    "expectedArtifactType": "pm_status_report",
    "domainPack": "email_pm",
    "clarificationMode": "context_line",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleContextLine": "결제 리뉴얼 프로젝트가 2주 지연됐고 리스크와 다음 의사결정이 필요",
    "expectedIncludes": [
      "프로젝트",
      "현황",
      "임원",
      "리스크"
    ],
    "expectedExcludes": [
      "신규 유저 획득",
      "PRD",
      "오늘 할 일"
    ],
    "notes": "Status report needs project facts; context_line should prevent invented status."
  }

];
