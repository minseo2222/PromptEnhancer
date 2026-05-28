(function () {
  "use strict";

  const MIN_DRAFT_LENGTH = 12;
  const MIN_HIGH_INTENT_LENGTH = 6;
  const RECOMMEND_OPTION = "추천해줘";

  const HIGH_INTENT_TERMS = [
    "prd",
    "전략",
    "분석",
    "기획",
    "보고",
    "메일",
    "경쟁사",
    "마케팅",
    "우선순위",
    "계획",
    "개선",
    "공고",
    "아젠다",
    "커리큘럼",
    "매뉴얼",
    "온보딩",
    "제안서",
    "세일즈",
    "영업",
    "콜드메일",
    "콜 스크립트",
    "데모",
    "objection",
    "협상",
    "후속 메일"
  ];

  const TASK_TYPE_KEYWORDS = {
    "brief.plan": [
      "전략",
      "계획",
      "로드맵",
      "실행안",
      "런칭",
      "gtm",
      "기획",
      "prd",
      "아젠다",
      "커리큘럼",
      "온보딩",
      "구조",
      "기획안",
      "발표",
      "매뉴얼"
    ],
    "brief.analyze": ["분석", "비교", "진단", "왜", "원인", "장단점", "경쟁사", "낮은지", "실패", "objection", "objections", "반박", "우려", "망설임"],
    "brief.write": [
      "메일",
      "이메일",
      "답장",
      "메시지",
      "dm",
      "카피",
      "문서 작성",
      "작성해줘",
      "제안서",
      "공고",
      "답변",
      "인수인계",
      "목차",
      "블로그 글",
      "콜드메일",
      "콜드 메일",
      "후속 메일",
      "대응 문구",
      "콜 스크립트"
    ],
    "brief.research": ["조사", "리서치", "시장", "트렌드", "자료 찾아", "근거", "인터뷰", "설문조사", "문항", "질문"],
    "brief.decide": ["뭐부터", "우선순위", "선택", "결정", "고를까", "판단", "중 뭐", "뭐가 나을까"],
    "brief.create": ["아이디어", "브레인스토밍", "이름", "네이밍", "슬로건", "캠페인", "뽑아"],
    "brief.extract": ["요약", "정리", "표로", "변환", "핵심만"]
  };

  const TASK_TIE_ORDER = [
    "brief.decide",
    "brief.analyze",
    "brief.plan",
    "brief.write",
    "brief.research",
    "brief.create",
    "brief.extract",
    "brief.generic"
  ];

  const CONTEXT_LINE_ARTIFACTS = [
    "sales_script",
    "cold_email",
    "follow_up_email",
    "objections_analysis",
    "sales_collateral",
    "refund_reply",
    "outage_notice",
    "churn_save_reply",
    "customer_success_checkin",
    "support_faq"
  ];

  function normalizeDraft(draft) {
    return String(draft || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function includesAny(text, keywords) {
    return keywords.some((keyword) => text.includes(String(keyword).toLowerCase()));
  }

  function unique(values) {
    return values.filter((value, index) => value && values.indexOf(value) === index);
  }

  function hasTableFormatSignal(text) {
    return /(^|\s)(표|table)(로|로\s|로$|\s|$)/i.test(text) || text.includes("표로") || text.includes("표 형식");
  }

  function isSimpleRequest(draft) {
    const text = normalizeDraft(draft).toLowerCase();
    if (!text) {
      return true;
    }

    if (window.CBSTemplates.SIMPLE_PATTERNS.some((pattern) => pattern.test(text))) {
      return true;
    }

    const compact = text.replace(/\s+/g, "");
    const simpleShortcuts = [
      "번역해줘",
      "번역해주세요",
      "요약해줘",
      "요약해주세요",
      "짧게요약해줘",
      "맞춤법고쳐줘",
      "맞춤법검사해줘",
      "오탈자고쳐줘",
      "문법고쳐줘"
    ];

    if (compact.length <= 24 && compact.includes("문장") && includesAny(compact, ["바꿔줘", "고쳐줘", "다듬어줘"])) {
      return true;
    }

    return compact.length <= 18 && simpleShortcuts.some((shortcut) => compact.includes(shortcut));
  }

  function hasClearGoalAndOutputFormat(draft) {
    const text = normalizeDraft(draft).toLowerCase();
    const hasGoal = /(목표|목적|goal|objective)\s*[:：]/i.test(text);
    const hasFormat = /(형식|결과물|출력|output|format)\s*[:：]/i.test(text);

    return hasGoal && hasFormat;
  }

  function hasPersonalPrioritizationSignal(text) {
    const strongSignals = [
      "뭐부터",
      "우선순위",
      "할 게 많",
      "할 일이 많",
      "오늘 할 일",
      "이번 주 우선순위",
      "모르겠어",
      "정신없"
    ];
    const organizeSignals = ["뭐부터", "할 게", "할 일이", "우선순위", "모르겠어"];

    return includesAny(text, strongSignals) || (text.includes("정리 좀 해줘") && includesAny(text, organizeSignals));
  }

  function hasBareMissingObject(text) {
    const compact = text.replace(/\s+/g, "");
    const isBareAB =
      compact.includes("a안b안") ||
      compact.includes("a랑b") ||
      compact.includes("a와b") ||
      compact.includes("a와b중") ||
      compact.includes("a랑b중");
    const isBareIdeaAnalysis = text.includes("내 아이디어") && text.includes("장단점") && text.length <= 24;

    return isBareAB || isBareIdeaAnalysis;
  }

  function classifyArtifactType(draft) {
    const text = normalizeDraft(draft).toLowerCase();
    const hasCustomerContext = includesAny(text, ["고객", "사용자", "유저", "cs", "상담", "지원", "문의", "vip", "중요 고객"]);
    const hasResponseIntent = includesAny(text, ["답변", "응대", "대응", "메일", "문구", "초안", "작성", "써줘", "안내", "안내문", "공지", "메시지"]);
    const hasManualIntent = includesAny(text, ["매뉴얼", "플레이북", "가이드", "가이드라인", "절차", "스크립트"]);
    const hasRefundSignal = includesAny(text, ["환불", "돈을 돌려", "돌려달", "결제 취소", "refund", "reembolso"]);
    const hasOutageSignal = includesAny(text, ["장애", "점검", "중단", "접속 불가", "접속불가", "오류", "에러", "다운", "서비스 불가"]);
    const hasChurnSignal = includesAny(text, ["해지", "취소", "구독 취소", "탈퇴", "이탈", "마음 돌리", "붙잡", "리텐션", "retention", "churn"]);
    const hasEscalationSignal = includesAny(text, ["vip", "중요 고객", "주요 고객", "항의", "컴플레인", "클레임", "긴급 대응", "에스컬레이션", "escalation"]);
    const hasCheckinSignal = includesAny(text, ["체크인", "점검 메일", "사용 현황 확인", "사용 현황", "고객 성공", "customer success", "check-in"]);
    const hasFaqSignal = includesAny(text, ["faq", "q&a", "q & a", "자주 받는", "자주 묻는", "자주묻는", "자주 나오는", "도움말"]);
    const hasDelayComplaintSignal = includesAny(text, ["배송 지연", "일정 지연", "배달 지연", "출고 지연", "delivery delay", "delay"]);
    const hasComplaintSignal = includesAny(text, ["불만", "항의", "컴플레인", "클레임"]) || hasDelayComplaintSignal;

    if (hasRefundSignal && (hasManualIntent || includesAny(text, ["정책", "승인 기준", "예외", "cs"]))) {
      return "refund_policy_manual";
    }

    if (hasRefundSignal && (hasCustomerContext || hasResponseIntent || includesAny(text, ["요청", "원하", "문의", "거절", "승인", "불가", "검토"]))) {
      return "refund_reply";
    }

    if (hasCheckinSignal && (hasCustomerContext || hasResponseIntent || includesAny(text, ["현황", "성과", "목표", "갱신"]))) {
      return "customer_success_checkin";
    }

    if (hasOutageSignal && (hasCustomerContext || hasResponseIntent || includesAny(text, ["영향", "복구", "우회", "상태"]))) {
      return "outage_notice";
    }

    if (hasChurnSignal && (hasCustomerContext || hasResponseIntent || includesAny(text, ["사유", "대안", "플랜", "혜택"]))) {
      return "churn_save_reply";
    }

    if (hasEscalationSignal && (hasCustomerContext || hasResponseIntent || includesAny(text, ["긴급", "중요", "심각", "오너십", "관리자"]))) {
      return "vip_complaint_reply";
    }

    if (hasFaqSignal && (hasCustomerContext || hasResponseIntent || includesAny(text, ["지원", "문의", "질문", "답변"]))) {
      return "support_faq";
    }

    if (hasComplaintSignal && (hasCustomerContext || hasResponseIntent)) {
      return "complaint_reply";
    }

    if (includesAny(text, ["세일즈 콜 스크립트", "영업 콜 스크립트", "콜 스크립트"])) {
      return "sales_script";
    }

    if (includesAny(text, ["콜드메일", "콜드 메일", "cold email"])) {
      return "cold_email";
    }

    if (includesAny(text, ["영업 후속 메일", "후속 메일", "follow-up"])) {
      return "follow_up_email";
    }

    if (includesAny(text, ["데모 미팅 아젠다", "데모 아젠다", "데모 미팅"])) {
      return "demo_agenda";
    }

    if (includesAny(text, ["objections", "objection", "잠재 고객 objections", "고객 반박", "고객 우려", "구매 망설임", "objection 정리"])) {
      return "objections_analysis";
    }

    if (includesAny(text, ["세일즈 자료", "영업 자료", "sales deck", "세일즈 덱"])) {
      return "sales_collateral";
    }

    if (includesAny(text, ["가격 협상 대응", "가격 협상 문구", "협상 대응", "할인 요청 대응"])) {
      return "negotiation_reply";
    }

    if (includesAny(text, ["채용 공고", "채용공고", "구인 공고"])) {
      return "job_posting";
    }

    if (includesAny(text, ["회의 아젠다", "미팅 아젠다", "회의 agenda"])) {
      return "meeting_agenda";
    }

    if (includesAny(text, ["설문조사 문항", "설문 문항", "설문 질문"])) {
      return "survey_questions";
    }

    if (includesAny(text, ["회고 질문", "팀 회고 질문"])) {
      return "retrospective_questions";
    }

    if (includesAny(text, ["인터뷰 질문", "질문 뽑아줘", "질문 만들어줘", "질문 리스트"])) {
      return "question_set";
    }

    if (includesAny(text, ["발표 구조", "발표 목차", "발표 흐름"])) {
      return "presentation_outline";
    }

    if (includesAny(text, ["커리큘럼", "강의 커리큘럼", "수업 커리큘럼"])) {
      return "curriculum";
    }

    if (includesAny(text, ["응대 매뉴얼", "매뉴얼", "플레이북", "가이드라인"])) {
      return "manual_or_playbook";
    }

    if (includesAny(text, ["온보딩 문서", "온보딩 가이드", "온보딩 체크리스트"])) {
      return "onboarding_doc";
    }

    if (includesAny(text, ["유튜브 영상 기획안", "영상 기획안", "콘텐츠 기획안"])) {
      return "content_plan";
    }

    if (includesAny(text, ["블로그 글 목차", "글 목차", "아티클 목차"])) {
      return "blog_outline";
    }

    if (includesAny(text, ["인수인계 문서", "업무 인수인계"])) {
      return "handoff_doc";
    }

    if (includesAny(text, ["고객 불만 답변", "불만 답변", "항의 답변", "컴플레인 답변"])) {
      return "complaint_reply";
    }

    if (includesAny(text, ["제휴 제안서 목차", "제안서 목차", "제안서 구조", "제안서 구성"])) {
      return "proposal_outline";
    }

    if (text.includes("제안서") && includesAny(text, ["써줘", "작성해줘"])) {
      return "proposal_outline";
    }

    if (includesAny(text, ["구조 잡아줘", "목차 짜줘", "흐름 잡아줘"])) {
      return "generic_outline";
    }

    if (includesAny(text, ["문서 작성", "문서 만들어줘", "초안 써줘"])) {
      return "generic_document";
    }

    return "none";
  }

  function classifyTaskType(draft) {
    const text = normalizeDraft(draft).toLowerCase();
    const artifactType = classifyArtifactType(text);
    const artifactTaskType = window.CBSTemplates.ARTIFACT_TASK_TYPES && window.CBSTemplates.ARTIFACT_TASK_TYPES[artifactType];

    if (artifactTaskType) {
      return artifactTaskType;
    }

    if (hasPersonalPrioritizationSignal(text)) {
      return "brief.decide";
    }

    if (includesAny(text, ["요약", "핵심만", "표로", "변환"]) && !includesAny(text, ["전략", "계획", "분석"])) {
      return "brief.extract";
    }

    if (includesAny(text, ["전략", "계획", "prd", "로드맵", "기획"]) && text.includes("정리")) {
      return "brief.plan";
    }

    const scores = Object.entries(TASK_TYPE_KEYWORDS).reduce((result, [taskType, keywords]) => {
      result[taskType] = keywords.reduce((score, keyword) => score + (text.includes(keyword.toLowerCase()) ? 1 : 0), 0);
      return result;
    }, {});

    const best = Object.entries(scores)
      .sort((left, right) => {
        if (right[1] !== left[1]) {
          return right[1] - left[1];
        }

        return TASK_TIE_ORDER.indexOf(left[0]) - TASK_TIE_ORDER.indexOf(right[0]);
      })
      .find((entry) => entry[1] > 0);

    return best ? best[0] : "brief.generic";
  }

  function scoreDomainSignals(text, domain, signals, taskType) {
    const strongScore = (signals.strong || []).reduce((score, keyword) => {
      return score + (text.includes(String(keyword).toLowerCase()) ? 3 : 0);
    }, 0);
    const weakScore = (signals.weak || []).reduce((score, keyword) => {
      return score + (text.includes(String(keyword).toLowerCase()) ? 1 : 0);
    }, 0);

    if (domain === "personal_prioritization" && !hasPersonalPrioritizationSignal(text)) {
      return 0;
    }

    return strongScore > 0 ? strongScore + weakScore : 0;
  }

  function getDomainAnalysis(draft, taskTypeOverride) {
    const text = normalizeDraft(draft).toLowerCase();
    const taskType = taskTypeOverride || classifyTaskType(draft);
    const domainSignals = window.CBSTemplates.DOMAIN_KEYWORD_SIGNALS || {};
    const scores = {};

    Object.entries(domainSignals).forEach(([domain, signals]) => {
      scores[domain] = scoreDomainSignals(text, domain, signals, taskType);
    });

    const best = Object.entries(scores)
      .sort((left, right) => right[1] - left[1])
      .find((entry) => entry[1] > 0);

    if (!best) {
      return {
        domain: "generic",
        domainConfidence: 0,
        domainScores: scores
      };
    }

    return {
      domain: best[0],
      domainConfidence: Math.min(0.95, best[1] >= 3 ? 0.8 + best[1] * 0.03 : 0.45 + best[1] * 0.1),
      domainScores: scores
    };
  }

  function classifyDomain(draft) {
    return getDomainAnalysis(draft).domain;
  }

  function matchAll(text, regex) {
    return Array.from(text.matchAll(regex)).map((match) => match[0]);
  }

  function extractSignals(draft) {
    const normalized = normalizeDraft(draft);
    const text = normalized.toLowerCase();
    const quantities = unique(matchAll(normalized, /\d+\s*(?:개|가지|명|분|주|개월|페이지)/g));
    const timeframe = unique(["오늘", "이번 주", "다음 달", "4주", "한 달", "분기", "최근"].filter((term) => text.includes(term)));
    const outputHints = unique([
      hasTableFormatSignal(text) ? "표" : "",
      ...["1페이지", "체크리스트", "메일", "아젠다", "목차", "공고", "매뉴얼", "문서"].filter((term) => text.includes(term))
    ]);
    const audienceHints = unique(["고객", "투자자", "팀", "대표", "임원", "사용자", "지원자", "신입", "리더십"].filter((term) => text.includes(term)));
    const toneHints = unique(["정중하게", "친근하게", "단호하게", "전문적으로", "간결하게"].filter((term) => text.includes(term)));
    const comparisonHints = unique(["a랑 b", "a와 b", "a안 b안", "비교", "뭐가 나을까", "중 뭐"].filter((term) => text.includes(term)));
    const analysisHints = unique(["왜", "원인", "실패", "낮은지", "장단점"].filter((term) => text.includes(term)));
    const createHints = unique(["아이디어", "이름", "네이밍", "슬로건", "브레인스토밍", "문항", "질문"].filter((term) => text.includes(term)));
    const writeHints = unique(["메일", "답장", "문서", "공고", "제안서", "dm", "답변", "블로그", "글"].filter((term) => text.includes(term)));
    const planningHints = unique(["전략", "계획", "로드맵", "아젠다", "커리큘럼", "온보딩", "기획안", "구조", "매뉴얼"].filter((term) => text.includes(term)));

    return {
      quantities,
      timeframe,
      outputHints,
      audienceHints,
      toneHints,
      comparisonHints,
      analysisHints,
      createHints,
      writeHints,
      planningHints
    };
  }

  function inferGoal(draft, taskType, artifactType, signals) {
    const text = normalizeDraft(draft).toLowerCase();

    if (artifactType && artifactType !== "none") {
      return window.CBSTemplates.ARTIFACT_DEFAULT_OUTPUT_FORMATS[artifactType] || "";
    }

    if (text.includes("prd")) return "PRD 작성";
    if (text.includes("런칭") && text.includes("계획")) return "런칭 계획 수립";
    if (text.includes("경쟁사") && text.includes("분석")) return "경쟁사 분석";
    if (includesAny(text, ["왜", "원인", "낮은지"]) && text.includes("분석")) return "원인 진단";
    if (signals.comparisonHints.length || includesAny(text, ["a안 b안", "장단점 비교"])) return "선택지/장단점 비교";
    if (text.includes("캠페인") && text.includes("아이디어")) return "캠페인 아이디어 생성";
    if (includesAny(text, ["이름", "네이밍", "슬로건"]) && text.includes("아이디어")) return "네이밍 아이디어 생성";

    if (taskType === "brief.write" && includesAny(text, ["메일", "답변", "공고"])) return "초안 작성";
    return "";
  }

  function getIntentQuestionKey(draft, taskType, domain, artifactType, signals) {
    const text = normalizeDraft(draft).toLowerCase();

    if (text.includes("prd")) return "prd_feature";
    if (text.includes("런칭") && text.includes("계획")) return "launch_plan";
    if (text.includes("경쟁사") && text.includes("분석")) return "competitor_analysis";
    if (text.includes("전환율") && includesAny(text, ["왜", "원인", "낮은지", "분석"])) return "conversion_diagnosis";
    if (taskType === "brief.research" && includesAny(text, ["최근", "트렌드"])) return "trend_research";
    if (taskType === "brief.research" && includesAny(text, ["시장 조사", "시장"])) return "market_research";
    if (text.includes("아이디어") && text.includes("장단점") && text.includes("분석")) return "idea_pros_cons";
    if (signals.comparisonHints.length && includesAny(text, ["장단점", "뭐가 나을까", "비교"])) return "ab_comparison";
    if (includesAny(text, ["이름", "네이밍", "슬로건"]) && text.includes("아이디어")) return "naming_ideas";
    if (text.includes("캠페인") && text.includes("아이디어")) return "campaign_ideas";

    return "";
  }

  function shouldUseContextLine(draft, taskType, artifactType) {
    const text = normalizeDraft(draft).toLowerCase();

    if (CONTEXT_LINE_ARTIFACTS.includes(artifactType)) {
      return true;
    }

    if (artifactType === "onboarding_doc" && includesAny(text, ["고객", "사용자"])) {
      return true;
    }

    if (
      artifactType === "proposal_outline" &&
      text.includes("고객") &&
      !includesAny(text, ["목차", "구조", "구성", "제휴"])
    ) {
      return true;
    }

    return taskType === "brief.write" && includesAny(text, ["제품 세일즈 자료", "세일즈 자료"]);
  }

  function getContextLineLabel(intent) {
    const labels = {
      sales_script: "제품, 대상 고객, 콜 목적을 한 줄로 알려주세요.",
      cold_email: "제품/오퍼와 대상 고객을 한 줄로 알려주세요.",
      follow_up_email: "이전 접점과 원하는 다음 액션을 한 줄로 알려주세요.",
      objections_analysis: "제품/고객군과 자주 나오는 objection을 한 줄로 알려주세요.",
      sales_collateral: "제품과 대상 고객, 자료 목적을 한 줄로 알려주세요.",
      proposal_outline: "고객 상황과 제안할 내용을 한 줄로 알려주세요.",
      refund_reply: "환불 정책/상태와 고객 상황을 한 줄로 알려주세요.",
      outage_notice: "영향 범위, 현재 상태, 다음 업데이트 시점을 한 줄로 알려주세요.",
      churn_save_reply: "해지 사유, 고객 상태, 제안 가능한 대안을 한 줄로 알려주세요.",
      customer_success_checkin: "고객 상태, 사용 맥락, 체크인 목적을 한 줄로 알려주세요.",
      support_faq: "원본 문의 목록이나 FAQ로 만들 범위를 한 줄로 알려주세요.",
      onboarding_doc: "제품/서비스와 온보딩 목표를 한 줄로 알려주세요."
    };

    return labels[intent.artifactType] || "이 작업에 필요한 핵심 맥락을 한 줄로 알려주세요.";
  }

  function getContextLinePlaceholder(intent) {
    const placeholders = {
      sales_script: "예: SMB 대표에게 재고관리 SaaS 데모 미팅을 잡기 위한 첫 콜",
      cold_email: "예: HR팀장에게 채용 자동화 툴 데모를 제안하는 첫 메일",
      follow_up_email: "예: 어제 데모 후 가격표를 보낸 리드에게 다음 미팅을 요청",
      objections_analysis: "예: 보안 우려가 큰 엔터프라이즈 IT 담당자 대상",
      sales_collateral: "예: B2B 회계 자동화 제품, CFO 대상, 도입 검토용 1페이지 자료",
      proposal_outline: "예: A 고객의 지원 비용 절감을 위한 CS 자동화 도입 제안",
      refund_reply: "예: 7일 환불 기간이 지났지만 첫 결제 고객이라 예외 검토 중",
      outage_notice: "예: 로그인 장애가 30분째 지속, 일부 계정 영향, 1시간 뒤 업데이트",
      churn_save_reply: "예: 가격 부담으로 해지 고민, 월간 플랜 할인은 불가하고 사용법 지원 가능",
      customer_success_checkin: "예: 도입 2주차 고객, 기능 사용률 낮음, 활성화 지원 목적",
      support_faq: "예: 환불, 로그인 오류, 결제수단 변경 문의가 반복됨",
      onboarding_doc: "예: 신규 고객이 첫 주 안에 결제 연동과 팀 초대를 완료하게 하기"
    };

    return placeholders[intent.artifactType] || "예: 대상, 상황, 제약, 원하는 결과를 한 줄로 작성";
  }

  function getContextLineQuestion(intent) {
    return {
      slot: "context_line",
      label: getContextLineLabel(intent),
      inputType: "context_line",
      placeholder: getContextLinePlaceholder(intent),
      options: []
    };
  }

  function deriveFilledSlots(draft, signals, taskType, artifactType) {
    const text = normalizeDraft(draft).toLowerCase();
    const filled = {};

    if (signals.quantities.length) {
      filled.quantity = signals.quantities[0];
    }

    if (signals.timeframe.length) {
      filled.timeframe = signals.timeframe[0];
    }

    if (signals.audienceHints.length) {
      filled.audience = signals.audienceHints[0];
    }

    if (signals.toneHints.length) {
      const toneMap = {
        "정중하게": "정중하고 간결하게",
        "친근하게": "친근하게",
        "단호하게": "단호하지만 부드럽게",
        "전문적으로": "전문적으로",
        "간결하게": "정중하고 간결하게"
      };
      filled.tone = toneMap[signals.toneHints[0]] || signals.toneHints[0];
    }

    if (hasTableFormatSignal(text)) {
      filled.output_format = "표로 정리";
    } else if (text.includes("1페이지")) {
      filled.output_format = "1페이지 전략 문서";
    } else if (text.includes("체크리스트")) {
      filled.output_format = "체크리스트";
    } else if (text.includes("아젠다")) {
      filled.output_format = "회의 아젠다";
    } else if (text.includes("목차")) {
      filled.output_format = "목차";
    } else if (text.includes("공고")) {
      filled.output_format = "공고 초안";
    } else if (text.includes("메일")) {
      filled.output_format = "메일 초안";
    }

    if (taskType === "brief.create") {
      if (includesAny(text, ["이름", "네이밍", "슬로건"])) {
        filled.goal = "이름/슬로건";
      } else if (text.includes("캠페인")) {
        filled.goal = "캠페인 아이디어";
      }
    }

    if (taskType === "brief.analyze") {
      if (signals.comparisonHints.length || text.includes("장단점")) {
        filled.goal = "장단점 비교";
        filled.analysis_target = "장단점";
        if (signals.comparisonHints.length) {
          filled.decision_options = "A와 B 비교";
        }
      } else if (includesAny(text, ["왜", "원인", "낮은지", "실패"])) {
        filled.goal = "문제 원인 진단";
        filled.analysis_target = "문제 원인";
      } else if (text.includes("경쟁사")) {
        filled.goal = "경쟁 구도 파악";
        filled.analysis_target = "경쟁 구도";
      } else if (text.includes("장단점")) {
        filled.analysis_target = "장단점";
      }
    }

    if (taskType === "brief.decide" && signals.comparisonHints.length) {
      filled.goal = "선택지 비교";
      filled.decision_options = "A와 B 비교";
    }

    if (taskType === "brief.write" && (!artifactType || artifactType === "none")) {
      if (includesAny(text, ["가격 인상 안내", "업데이트", "공고"])) {
        filled.goal = "안내/공유";
      } else if (text.includes("불만")) {
        filled.goal = "거절/조율";
      }
    }

    if (taskType === "brief.plan" && text.includes("prd")) {
      filled.goal = "PRD 작성";
    }

    if (artifactType === "onboarding_doc") {
      if (text.includes("고객")) {
        filled.onboarding_audience = "신규 고객";
      } else if (text.includes("사용자")) {
        filled.onboarding_audience = "신규 사용자";
      } else if (includesAny(text, ["직원", "신입"])) {
        filled.onboarding_audience = "신규 직원";
      }
    }

    if (artifactType === "complaint_reply" && includesAny(text, ["배송 지연", "일정 지연", "delivery delay"])) {
      filled.artifact_topic = "배송/일정 지연";
    }

    if (text.includes("다음 달") || text.includes("한 달") || text.includes("4주")) {
      filled.scope = "4주 실행 계획";
    }

    if (text.includes("아래 내용") || text.includes("이 내용")) {
      filled.input_source = "아래 내용";
    }

    if (artifactType && artifactType !== "none") {
      const artifactOutput = window.CBSTemplates.ARTIFACT_DEFAULT_OUTPUT_FORMATS[artifactType];
      if (artifactOutput) {
        filled.output_format = artifactOutput;
      }
    }

    if (!filled.goal && signals.inferredGoal) {
      filled.goal = signals.inferredGoal;
    }

    return filled;
  }

  function detectMissingSlots(draft, domain) {
    return analyzeIntent(draft).missingSlots;
  }

  function determineShouldClarify(normalized, taskType, domain, artifactType) {
    const text = normalized.toLowerCase();

    if (!normalized) {
      return false;
    }

    if (isSimpleRequest(normalized)) {
      return false;
    }

    if (hasClearGoalAndOutputFormat(normalized)) {
      return false;
    }

    if (taskType === "brief.extract") {
      return false;
    }

    if (hasBareMissingObject(text)) {
      return false;
    }

    if (normalized.length >= MIN_HIGH_INTENT_LENGTH && taskType !== "brief.generic") {
      return true;
    }

    if (normalized.length >= MIN_HIGH_INTENT_LENGTH && includesAny(text, HIGH_INTENT_TERMS)) {
      return true;
    }

    if (normalized.length < MIN_DRAFT_LENGTH) {
      return false;
    }

    if (domain !== "generic") {
      return true;
    }

    return includesAny(text, window.CBSTemplates.BROAD_TERMS);
  }

  function getMissingSlots(taskType, filledSlots) {
    const priorities = window.CBSTemplates.TASK_SLOT_PRIORITIES[taskType] || window.CBSTemplates.TASK_SLOT_PRIORITIES["brief.generic"];
    return priorities.filter((slot) => !filledSlots[slot]);
  }

  function getSuggestedSlots(taskType, domain, artifactType, intentQuestionKey, filledSlots, missingSlots) {
    const intentQuestions = window.CBSTemplates.INTENT_QUESTION_TEMPLATES && window.CBSTemplates.INTENT_QUESTION_TEMPLATES[intentQuestionKey];
    if (intentQuestions && intentQuestions.length) {
      const intentSlots = intentQuestions.map((question) => question.slot).filter((slot) => !filledSlots[slot]);
      return (intentSlots.length ? intentSlots : intentQuestions.map((question) => question.slot)).slice(0, 2);
    }

    const artifactQuestions = window.CBSTemplates.ARTIFACT_QUESTION_TEMPLATES && window.CBSTemplates.ARTIFACT_QUESTION_TEMPLATES[artifactType];
    if (artifactQuestions && artifactQuestions.length) {
      const artifactSlots = artifactQuestions.map((question) => question.slot).filter((slot) => !filledSlots[slot]);
      return (artifactSlots.length ? artifactSlots : missingSlots).slice(0, 2);
    }

    const comboKey = `${taskType}:${domain}`;
    const combo = window.CBSTemplates.COMBO_QUESTION_TEMPLATES[comboKey];

    if (combo) {
      const comboSlots = combo.map((question) => question.slot).filter((slot) => !filledSlots[slot]);
      if (comboSlots.length) {
        return comboSlots.slice(0, 2);
      }
    }

    return missingSlots.slice(0, 2);
  }

  function analyzeIntent(draft) {
    const normalized = normalizeDraft(draft);
    const artifactType = classifyArtifactType(normalized);
    const taskType = classifyTaskType(normalized);
    const domainAnalysis = getDomainAnalysis(normalized, taskType);
    const signals = extractSignals(normalized);
    signals.inferredGoal = inferGoal(normalized, taskType, artifactType, signals);
    const filledSlots = deriveFilledSlots(normalized, signals, taskType, artifactType);
    const missingSlots = getMissingSlots(taskType, filledSlots);
    const intentQuestionKey = getIntentQuestionKey(normalized, taskType, domainAnalysis.domain, artifactType, signals);
    const needsContextLine = shouldUseContextLine(normalized, taskType, artifactType);
    const suggestedSlots = needsContextLine
      ? ["context_line"]
      : getSuggestedSlots(taskType, domainAnalysis.domain, artifactType, intentQuestionKey, filledSlots, missingSlots);
    const shouldClarify = determineShouldClarify(normalized, taskType, domainAnalysis.domain, artifactType);

    return {
      draft: normalized,
      taskType,
      domain: domainAnalysis.domain,
      domainConfidence: domainAnalysis.domainConfidence,
      artifactType,
      intentQuestionKey,
      domainScores: domainAnalysis.domainScores,
      signals,
      filledSlots,
      missingSlots,
      suggestedSlots,
      needsContextLine,
      shouldClarify
    };
  }

  function findMatchingOption(options, candidates) {
    return candidates.reduce((match, candidate) => {
      return match || options.find((option) => option.includes(candidate));
    }, "");
  }

  function getQuestionTemplateForSlot(slot, intent) {
    const intentQuestion = ((window.CBSTemplates.INTENT_QUESTION_TEMPLATES || {})[intent.intentQuestionKey] || []).find(
      (question) => question.slot === slot
    );
    const artifactQuestion = ((window.CBSTemplates.ARTIFACT_QUESTION_TEMPLATES || {})[intent.artifactType] || []).find(
      (question) => question.slot === slot
    );
    const comboKey = `${intent.taskType}:${intent.domain}`;
    const comboQuestion = (window.CBSTemplates.COMBO_QUESTION_TEMPLATES[comboKey] || []).find((question) => question.slot === slot);
    const taskQuestion = (window.CBSTemplates.TASK_QUESTION_TEMPLATES[intent.taskType] || []).find((question) => question.slot === slot);
    const domainQuestion = (window.CBSTemplates.QUESTION_TEMPLATES[intent.domain] || []).find((question) => question.slot === slot);
    const slotDefinition = window.CBSTemplates.SLOT_ONTOLOGY[slot];

    if (intentQuestion) {
      return intentQuestion;
    }

    if (artifactQuestion) {
      return artifactQuestion;
    }

    if (comboQuestion) {
      return comboQuestion;
    }

    if (taskQuestion) {
      return taskQuestion;
    }

    if (domainQuestion) {
      return domainQuestion;
    }

    if (slotDefinition) {
      return {
        slot,
        label: slotDefinition.genericQuestion,
        options: slotDefinition.options
      };
    }

    return {
      slot,
      label: "무엇을 더 정하면 좋을까요?",
      options: ["목표", "대상", "형식", "범위", window.CBSTemplates.RECOMMEND_OPTION]
    };
  }

  function ensureQuestionOptions(options) {
    const normalized = options.slice(0, 5);
    const recommend = window.CBSTemplates.RECOMMEND_OPTION || RECOMMEND_OPTION;
    while (normalized.length < 4) {
      normalized.push(["실행 계획", "짧은 요약", "체크리스트", "표로 정리"][normalized.length] || "구체적으로");
    }

    if (!normalized.includes(recommend) && !normalized.includes(RECOMMEND_OPTION)) {
      normalized.push(recommend);
    }

    return normalized.slice(0, 5);
  }

  function rankOptionsForQuestion(question, intent) {
    const options = ensureQuestionOptions(question.options || []);
    const slotValue = intent.filledSlots && intent.filledSlots[question.slot];
    const candidates = [];
    const draftText = intent.draft.toLowerCase();
    const artifactType = intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";

    if (slotValue) {
      candidates.push(slotValue);
    }

    if (artifactType) {
      if (question.slot === "question_purpose") {
        if (artifactType === "retrospective_questions") {
          candidates.push("회고/학습 도출");
        } else if (artifactType === "survey_questions") {
          candidates.push("만족도/불만 파악");
        } else if (draftText.includes("인터뷰")) {
          candidates.push("문제 검증", "사용성 피드백");
        }
      }

      if (question.slot === "role_type") {
        if (draftText.includes("마케터")) candidates.push("마케터");
        if (draftText.includes("디자이너")) candidates.push("디자이너");
        if (draftText.includes("개발")) candidates.push("개발자");
        if (includesAny(draftText, ["운영", "cs"])) candidates.push("운영/CS");
      }

      if (question.slot === "presentation_purpose" && !includesAny(draftText, ["설득", "의사결정", "교육"])) {
        candidates.push("정보 공유");
      }

      if (question.slot === "content_purpose" && draftText.includes("유튜브")) {
        candidates.push("조회수/관심 유도", "교육/정보 전달");
      }

      if (question.slot === "blog_purpose" && !includesAny(draftText, ["seo", "설득"])) {
        candidates.push("정보 전달");
      }

      if (question.slot === "target_customer") {
        if (includesAny(draftText, ["잠재", "리드", "문의", "고객"])) candidates.push("기존 리드/문의 고객");
        if (includesAny(draftText, ["엔터프라이즈", "대기업"])) candidates.push("엔터프라이즈 담당자");
        if (includesAny(draftText, ["smb", "소규모", "스타트업"])) candidates.push("SMB 의사결정자", "초기 스타트업/소규모 팀");
      }

      if (question.slot === "sales_stage") {
        if (includesAny(draftText, ["데모", "미팅"])) candidates.push("데모/미팅 전");
        if (includesAny(draftText, ["제안서", "자료"])) candidates.push("제안서 전달");
        if (includesAny(draftText, ["협상", "가격", "할인"])) candidates.push("협상/클로징");
        if (includesAny(draftText, ["콜드", "첫 접촉"])) candidates.push("첫 접촉");
      }

      if (question.slot === "sales_cta") {
        if (includesAny(draftText, ["콜드", "후속", "메일"])) candidates.push("답장 유도");
        if (includesAny(draftText, ["데모", "미팅"])) candidates.push("데모 미팅 예약");
        if (includesAny(draftText, ["제안서", "자료"])) candidates.push("제안서/자료 확인");
      }

      if (question.slot === "sales_context") {
        if (includesAny(draftText, ["제휴", "협업"])) candidates.push("제휴/협업 제안");
        if (includesAny(draftText, ["자료", "세일즈", "영업"])) candidates.push("핵심 문제와 해결");
        if (includesAny(draftText, ["콜드", "메일"])) candidates.push("문제 해결 제안");
        if (includesAny(draftText, ["사례", "성과"])) candidates.push("고객 사례/성과");
      }

      if (question.slot === "previous_touchpoint") {
        if (draftText.includes("후속")) candidates.push("이전 미팅/콜 이후");
        if (draftText.includes("데모")) candidates.push("데모 이후");
        if (draftText.includes("제안서")) candidates.push("제안서 전달 이후");
        if (draftText.includes("자료")) candidates.push("자료 공유 이후");
      }

      if (question.slot === "negotiation_boundary") {
        if (includesAny(draftText, ["가격", "협상"])) candidates.push("할인 없이 가치 설명");
        if (draftText.includes("할인")) candidates.push("조건부 할인 가능");
      }

      if (question.slot === "objection_type") {
        if (includesAny(draftText, ["가격", "협상", "할인"])) candidates.push("가격이 비싸다");
        if (includesAny(draftText, ["필요", "망설임"])) candidates.push("필요성을 못 느낀다");
        if (includesAny(draftText, ["기존 솔루션"])) candidates.push("기존 솔루션이 있다");
        if (includesAny(draftText, ["리스크", "우려"])) candidates.push("도입 리스크가 걱정된다");
        if (artifactType === "objections_analysis" && !candidates.length) candidates.push("주요 objections 전체");
      }

      if (question.slot === "meeting_goal") {
        if (draftText.includes("데모")) candidates.push("제품 가치 설명", "다음 단계 합의");
        if (includesAny(draftText, ["콜", "스크립트"])) candidates.push("니즈 파악", "다음 단계 합의");
      }

      if (question.slot === "proposal_goal") {
        if (draftText.includes("제휴")) candidates.push("제휴 구조 제안");
        if (draftText.includes("고객")) candidates.push("문제 해결안 제시");
        if (includesAny(draftText, ["계약", "영업", "세일즈"])) candidates.push("신규 계약 설득");
        if (draftText.includes("내부")) candidates.push("내부 승인 지원");
        if (!includesAny(draftText, ["제휴", "계약", "영업", "세일즈", "내부"])) candidates.push("문제 해결안 제시");
      }

      if (question.slot === "proposal_context") {
        if (draftText.includes("제휴")) candidates.push("제휴/협업 구조");
        if (draftText.includes("고객")) candidates.push("고객 문제 해결안");
        if (includesAny(draftText, ["가격", "계약"])) candidates.push("가격/계약 조건");
      }

      if (question.slot === "artifact_topic") {
        if (artifactType === "complaint_reply") {
          if (includesAny(draftText, ["배송 지연", "일정 지연", "배달 지연", "출고 지연", "delivery delay", "delay"])) candidates.push("배송/일정 지연");
          if (includesAny(draftText, ["장애", "점검", "중단", "접속 불가", "접속불가", "오류", "에러", "다운"])) candidates.push("서비스 장애/오류");
          if (includesAny(draftText, ["가격", "정책", "환불"])) candidates.push("가격/정책 불만");
          if (includesAny(draftText, ["응대", "상담", "지원 경험"])) candidates.push("응대 경험 불만");
        }
      }

      if (question.slot === "onboarding_audience") {
        if (draftText.includes("고객")) candidates.push("신규 고객");
        if (draftText.includes("사용자")) candidates.push("신규 사용자");
        if (includesAny(draftText, ["직원", "신입"])) candidates.push("신규 직원");
      }

      if (question.slot === "refund_status") {
        if (draftText.includes("승인")) candidates.push("환불 가능/승인");
        if (includesAny(draftText, ["거부", "불가", "어려"])) candidates.push("정책상 어려움");
        if (includesAny(draftText, ["대안", "크레딧"])) candidates.push("대안/크레딧 제안");
        if (includesAny(draftText, ["환불", "돈을 돌려", "돌려달", "결제 취소", "refund", "reembolso"])) candidates.push("검토 후 안내");
      }

      if (question.slot === "resolution_policy") {
        if (includesAny(draftText, ["환불", "돈을 돌려", "돌려달", "결제 취소", "refund", "reembolso"])) candidates.push("정책 근거 명확화", "고객 상황 공감");
        if (includesAny(draftText, ["불만", "클레임", "해지"])) candidates.push("신뢰 회복 우선");
        if (includesAny(draftText, ["장애", "점검", "중단", "접속 불가", "오류", "지연"])) candidates.push("사실 확인과 다음 액션");
      }

      if (question.slot === "outage_status") {
        if (draftText.includes("복구 완료")) candidates.push("복구 완료");
        if (draftText.includes("복구")) candidates.push("복구 중");
        if (draftText.includes("우회")) candidates.push("우회 방법 있음");
        if (includesAny(draftText, ["점검", "중단"])) candidates.push("예정된 점검/중단");
        if (includesAny(draftText, ["장애", "접속 불가", "접속불가", "오류", "에러", "다운"])) candidates.push("조사 중");
      }

      if (question.slot === "outage_impact") {
        if (draftText.includes("전체")) candidates.push("전체 서비스 영향");
        if (includesAny(draftText, ["일부", "기능"])) candidates.push("일부 기능 영향");
        if (includesAny(draftText, ["특정 고객", "일부 고객", "특정 지역", "지역"])) candidates.push("특정 고객/지역 영향");
        if (includesAny(draftText, ["장애", "점검", "중단", "접속 불가", "접속불가", "오류", "에러", "다운"])) candidates.push("영향 범위 확인 중");
      }

      if (question.slot === "churn_reason") {
        if (includesAny(draftText, ["가격", "비용"])) candidates.push("가격/비용 부담");
        if (draftText.includes("기능")) candidates.push("기능 부족");
        if (includesAny(draftText, ["성과", "효과"])) candidates.push("성과 미흡");
        if (includesAny(draftText, ["해지", "취소", "구독 취소", "탈퇴", "이탈", "마음 돌리", "리텐션"])) candidates.push("해지 사유 확인");
      }

      if (question.slot === "retention_boundary") {
        if (includesAny(draftText, ["해지", "취소", "구독 취소", "탈퇴", "이탈", "마음 돌리", "리텐션"])) candidates.push("공감 후 사유 확인");
        if (includesAny(draftText, ["혜택", "할인", "대안"])) candidates.push("대안/플랜 제안");
      }

      if (question.slot === "escalation_level") {
        if (includesAny(draftText, ["장애", "점검", "중단", "업무 영향", "긴급"])) candidates.push("긴급 장애/업무 영향");
        if (includesAny(draftText, ["vip", "중요 고객", "주요 고객", "클레임", "항의", "컴플레인"])) candidates.push("반복 불만/중요 고객");
        if (includesAny(draftText, ["보상", "계약"])) candidates.push("계약/보상 이슈");
      }

      if (question.slot === "ownership_model") {
        if (includesAny(draftText, ["vip", "클레임"])) candidates.push("담당자 지정");
        if (draftText.includes("리더")) candidates.push("관리자/리더 개입");
        if (includesAny(draftText, ["일정", "해결"])) candidates.push("해결 일정 공유");
      }

      if (question.slot === "checkin_purpose") {
        if (includesAny(draftText, ["체크인", "점검 메일", "사용 현황", "사용 현황 확인", "고객 성공"])) candidates.push("사용 현황 확인");
        if (includesAny(draftText, ["성과", "목표"])) candidates.push("성과/목표 점검");
        if (includesAny(draftText, ["문제", "불만"])) candidates.push("문제 조기 발견");
      }

      if (question.slot === "customer_stage") {
        if (draftText.includes("신규")) candidates.push("온보딩 직후");
        if (includesAny(draftText, ["해지", "이탈"])) candidates.push("이탈 위험");
        if (draftText.includes("갱신")) candidates.push("갱신 전");
      }

      if (question.slot === "faq_topic") {
        if (includesAny(draftText, ["문의", "자주 받는", "자주 묻는", "자주묻는", "faq", "q&a"])) candidates.push("기존 문의 목록 기반");
        if (includesAny(draftText, ["환불", "결제"])) candidates.push("결제/환불");
        if (includesAny(draftText, ["장애", "오류", "문제", "접속 불가"])) candidates.push("문제 해결/장애");
        if (includesAny(draftText, ["사용법", "온보딩", "지원"])) candidates.push("제품 사용법/온보딩");
      }

      if (question.slot === "faq_format") {
        if (includesAny(draftText, ["q&a", "자주 받는", "자주 묻는", "자주묻는"])) candidates.push("카테고리별 Q&A");
        if (draftText.includes("faq")) candidates.push("카테고리별 Q&A");
      }

      if (question.slot === "refund_policy_scope") {
        if (includesAny(draftText, ["환불", "돈을 돌려", "돌려달", "결제 취소", "refund", "reembolso"])) candidates.push("환불 가능/불가 기준");
        if (includesAny(draftText, ["정책", "예외"])) candidates.push("예외/승인 절차");
        if (includesAny(draftText, ["응대", "cs"])) candidates.push("상황별 응대 스크립트");
      }
    }

    if (question.slot === "goal") {
      if (intent.filledSlots.goal) {
        candidates.push(intent.filledSlots.goal);
      }
      if (intent.taskType === "brief.create" && includesAny(intent.draft.toLowerCase(), ["이름", "네이밍", "슬로건"])) {
        candidates.push("이름/슬로건", "이름", "슬로건");
      }
      if (intent.taskType === "brief.create" && intent.draft.toLowerCase().includes("캠페인")) {
        candidates.push("캠페인 아이디어", "캠페인");
      }
      if (intent.taskType === "brief.decide" && intent.signals.comparisonHints.length) {
        candidates.push("선택지 비교");
      }
      if (intent.taskType === "brief.analyze" && (intent.signals.comparisonHints.length || draftText.includes("장단점"))) {
        candidates.push("장단점 비교", "선택지 비교");
      } else if (intent.taskType === "brief.analyze" && intent.signals.analysisHints.length) {
        candidates.push("문제 원인 진단", "경쟁 구도 파악");
      }
      if (intent.taskType === "brief.write" && intent.filledSlots.goal) {
        candidates.push(intent.filledSlots.goal);
      }
      if (intent.domain === "marketing_strategy" && draftText.includes("정리")) {
        candidates.push("보고용 전략 정리");
      }
    }

    if (question.slot === "output_format") {
      candidates.push(...intent.signals.outputHints);
      candidates.push(intent.filledSlots.output_format);
      if (draftText.includes("표")) {
        candidates.push("표로 정리", "표");
      }
      if (draftText.includes("1페이지")) {
        candidates.push("1페이지 전략 문서", "1페이지");
      }
    }

    if (question.slot === "scope") {
      candidates.push(intent.filledSlots.scope);
      if (includesAny(draftText, ["다음 달", "한 달", "4주"])) {
        candidates.push("4주 실행 계획", "4주");
      }
      if (draftText.includes("1페이지")) {
        candidates.push("1페이지 전략 문서", "1페이지");
      }
    }

    if (question.slot === "launch_plan_focus" && draftText.includes("다음 달")) {
      candidates.push("일정과 마일스톤");
    }

    if (question.slot === "feature_problem") {
      if (draftText.includes("새 기능")) candidates.push("새 기능 아이디어 구체화");
      if (draftText.includes("개선")) candidates.push("기존 기능 개선");
    }

    if (question.slot === "prd_scope") {
      candidates.push(intent.filledSlots.prd_scope);
    }

    if (question.slot === "competitor_scope" && draftText.includes("경쟁사")) {
      candidates.push("같은 카테고리의 주요 서비스", "특정 경쟁사 2~3곳");
    }

    if (question.slot === "comparison_dimensions") {
      if (draftText.includes("가격")) candidates.push("가격/수익모델");
      if (draftText.includes("마케팅")) candidates.push("마케팅/채널");
      if (draftText.includes("기능")) candidates.push("기능/제품");
    }

    if (question.slot === "diagnosis_method" && includesAny(draftText, ["왜", "원인", "낮은지"])) {
      candidates.push("원인 가설 트리");
    }

    if (question.slot === "option_details") {
      if (draftText.includes("마케팅")) candidates.push("마케팅/채널 선택");
      if (draftText.includes("가격")) candidates.push("가격/비즈니스 모델 선택");
      if (draftText.includes("기능")) candidates.push("제품/기능 선택");
    }

    if (question.slot === "naming_context") {
      if (includesAny(draftText, ["b2b", "saas"])) candidates.push("B2B SaaS");
      if (includesAny(draftText, ["앱", "소비자"])) candidates.push("소비자 앱");
      if (includesAny(draftText, ["커뮤니티", "콘텐츠"])) candidates.push("커뮤니티/콘텐츠");
      if (draftText.includes("내부")) candidates.push("내부 도구/프로젝트");
    }

    if (question.slot === "campaign_audience") {
      if (draftText.includes("기존")) candidates.push("기존 고객");
      if (includesAny(draftText, ["리드", "잠재"])) candidates.push("잠재 리드");
      if (includesAny(draftText, ["커뮤니티", "팔로워"])) candidates.push("커뮤니티/팔로워");
    }

    if (question.slot === "campaign_objective") {
      if (includesAny(draftText, ["전환", "구매"])) candidates.push("구매/전환 유도");
      if (includesAny(draftText, ["재방문", "리텐션"])) candidates.push("재방문/리텐션");
      if (includesAny(draftText, ["가입", "참여"])) candidates.push("가입/참여 유도");
    }

    if (question.slot === "audience") {
      candidates.push(...intent.signals.audienceHints);
    }

    if (question.slot === "tone") {
      candidates.push(intent.filledSlots.tone);
    }

    if (question.slot === "quantity") {
      candidates.push(intent.filledSlots.quantity);
    }

    if (question.slot === "criteria" || question.slot === "decision_criteria") {
      candidates.push("효과", "속도", "리스크");
    }

    if (question.slot === "analysis_target") {
      candidates.push(intent.filledSlots.analysis_target, ...intent.signals.analysisHints);
    }

    if (question.slot === "decision_options") {
      candidates.push(intent.filledSlots.decision_options);
    }

    const preferred = findMatchingOption(options, unique(candidates.filter(Boolean)));

    if (!preferred) {
      return options;
    }

    return [preferred].concat(options.filter((option) => option !== preferred));
  }

  function normalizeQuestion(question, intent) {
    return {
      slot: question.slot,
      label: question.label || question.genericQuestion || "무엇을 정하면 좋을까요?",
      options: rankOptionsForQuestion(question, intent).map((option) => {
        return option === window.CBSTemplates.RECOMMEND_OPTION ? RECOMMEND_OPTION : option;
      })
    };
  }

  function planQuestions(intent) {
    if (intent.needsContextLine) {
      return [getContextLineQuestion(intent)];
    }

    return intent.suggestedSlots
      .map((slot) => getQuestionTemplateForSlot(slot, intent))
      .slice(0, 2)
      .map((question) => normalizeQuestion(question, intent));
  }

  function selectDefaultAnswer(question, intent, sampleAnswers) {
    if (sampleAnswers && sampleAnswers[question.slot]) {
      return sampleAnswers[question.slot];
    }

    const rankedOptions = rankOptionsForQuestion(question, intent);
    return rankedOptions.find((option) => option !== window.CBSTemplates.RECOMMEND_OPTION && option !== RECOMMEND_OPTION) || rankedOptions[0] || "";
  }

  function rankQuestionOptions(question, draftOrIntent, taskType, domain) {
    const intent =
      draftOrIntent && typeof draftOrIntent === "object" && draftOrIntent.filledSlots
        ? draftOrIntent
        : {
            ...analyzeIntent(draftOrIntent),
            taskType: taskType || classifyTaskType(draftOrIntent),
            domain: domain || classifyDomain(draftOrIntent)
          };
    return rankOptionsForQuestion(question, intent);
  }

  function selectAssumedAnswer(question, draft, taskType, domain, sampleAnswers) {
    const intent = {
      ...analyzeIntent(draft),
      taskType: taskType || classifyTaskType(draft),
      domain: domain || classifyDomain(draft)
    };
    return selectDefaultAnswer(question, intent, sampleAnswers);
  }

  function shouldShowClarify(draft) {
    return analyzeIntent(draft).shouldClarify;
  }

  function getQuestionsForDraft(draft) {
    return planQuestions(analyzeIntent(draft));
  }

  window.CBSRuleEngine = {
    MIN_DRAFT_LENGTH,
    MIN_HIGH_INTENT_LENGTH,
    normalizeDraft,
    shouldShowClarify,
    classifyDomain,
    classifyTaskType,
    detectMissingSlots,
    getQuestionsForDraft,
    analyzeIntent,
    planQuestions,
    rankQuestionOptions,
    rankOptionsForQuestion,
    selectAssumedAnswer,
    selectDefaultAnswer
  };
})();
