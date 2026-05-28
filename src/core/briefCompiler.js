(function () {
  "use strict";

  function compactDraft(draft) {
    return String(draft || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getPattern(taskType) {
    return (
      window.CBSPromptPatterns.PROMPT_PATTERNS[taskType] ||
      window.CBSPromptPatterns.PROMPT_PATTERNS["brief.generic"]
    );
  }

  function getPerspective(domain) {
    return (window.CBSTemplates.PERSPECTIVES && window.CBSTemplates.PERSPECTIVES[domain]) || window.CBSTemplates.PERSPECTIVES.generic;
  }

  const DOMAIN_FOCUS_ITEMS = {
    marketing_strategy: [
      "마케팅/그로스 맥락을 반영한다.",
      "실행 채널, 성공 지표, 리스크를 함께 다룬다."
    ],
    product_planning: [
      "PRD 관점에서 문제, 요구사항, 사용자 시나리오를 반영한다.",
      "성공 지표와 우선순위를 포함한다."
    ],
    research: [
      "조사 목적과 분석 기준을 먼저 명확히 한다.",
      "근거, 비교 기준, 확인 필요 항목을 구분한다."
    ],
    writing_email: [
      "독자와 관계에 맞는 메시지 구조를 사용한다.",
      "제목, 본문 초안, 다음 액션을 분명히 한다."
    ],
    personal_prioritization: [
      "우선순위와 다음 행동을 짧게 제시한다.",
      "효과, 속도, 리스크를 판단 기준으로 삼는다."
    ],
    generic: [
      "원문 의도를 작업 단위로 명확히 정리한다.",
      "목표, 대상, 출력 형식, 제약을 중심으로 답한다."
    ]
  };

  const SLOT_LABELS = {
    goal: "목표",
    audience: "대상",
    context: "맥락",
    output_format: "출력 형식",
    scope: "범위",
    depth: "깊이",
    tone: "톤",
    constraints: "제약",
    timeframe: "기간",
    criteria: "판단 기준",
    decision_criteria: "판단 기준",
    success_criteria: "성공 기준",
    input_source: "입력 자료",
    assumptions_policy: "가정 처리",
    quantity: "분량",
    style: "스타일",
    decision_options: "선택지",
    analysis_target: "분석 대상",
    source_preference: "자료 기준",
    preserve: "보존할 내용",
    analysis_method: "분석 방식",
    role_type: "채용 역할",
    emphasis: "강조점",
    meeting_purpose: "회의 목적",
    agenda_format: "아젠다 형식",
    question_purpose: "질문 목적",
    question_format: "질문 형식",
    presentation_purpose: "발표 목적",
    outline_format: "구조 형식",
    learning_audience: "학습 대상",
    curriculum_scope: "커리큘럼 범위",
    manual_purpose: "매뉴얼 목적",
    manual_scope: "매뉴얼 범위",
    onboarding_audience: "온보딩 대상",
    onboarding_format: "온보딩 형식",
    content_purpose: "콘텐츠 목적",
    content_output: "콘텐츠 결과물",
    blog_purpose: "글 목적",
    handoff_focus: "인수인계 핵심",
    handoff_format: "인수인계 형식",
    reply_purpose: "답변 목적",
    proposal_purpose: "제안서 목적",
    proposal_goal: "제안서 목적",
    proposal_format: "제안서 구조",
    outline_purpose: "구조화 목적",
    document_purpose: "문서 목적",
    document_format: "문서 형식",
    artifact_topic: "주제/대상",
    research_timeframe: "조사 기간",
    market_scope: "시장 범위",
    launch_subject: "런칭 대상",
    launch_plan_focus: "런칭 기준",
    feature_problem: "기능/문제",
    prd_scope: "PRD 범위",
    competitor_scope: "경쟁사 분석 범위",
    comparison_dimensions: "분석 기준",
    funnel_stage: "전환 단계",
    diagnosis_method: "진단 방식",
    option_details: "비교 대상",
    naming_context: "서비스 유형",
    naming_style: "네이밍 스타일",
    campaign_audience: "캠페인 대상",
    campaign_objective: "캠페인 목적",
    target_customer: "대상 고객",
    sales_stage: "영업 단계",
    sales_cta: "다음 액션",
    sales_context: "제안 맥락",
    previous_touchpoint: "이전 접점",
    negotiation_boundary: "협상 기준",
    objection_type: "objection 유형",
    meeting_goal: "미팅 목적",
    proposal_goal: "제안서 목적",
    proposal_context: "제안 내용"
  };

  const ARTIFACT_TASK_SENTENCES = {
    sales_script: "세일즈 콜 스크립트를 작성한다.",
    cold_email: "콜드메일 초안을 작성한다.",
    follow_up_email: "영업 후속 메일을 작성한다.",
    demo_agenda: "데모 미팅 아젠다를 만든다.",
    objections_analysis: "잠재 고객 objection과 우려 대응을 정리한다.",
    sales_collateral: "세일즈 자료를 만든다.",
    negotiation_reply: "가격 협상 대응 문구를 작성한다.",
    job_posting: "채용 공고 초안을 작성한다.",
    meeting_agenda: "회의 아젠다를 만든다.",
    question_set: "질문 목록을 만든다.",
    survey_questions: "설문 문항 목록을 만든다.",
    retrospective_questions: "회고 질문 목록을 만든다.",
    presentation_outline: "발표 구조를 잡는다.",
    curriculum: "강의 커리큘럼을 만든다.",
    manual_or_playbook: "매뉴얼/플레이북을 만든다.",
    onboarding_doc: "온보딩 문서를 만든다.",
    content_plan: "콘텐츠 기획안을 만든다.",
    blog_outline: "블로그 글 목차를 잡는다.",
    handoff_doc: "업무 인수인계 문서를 작성한다.",
    complaint_reply: "고객 불만 답변 초안을 작성한다.",
    proposal_outline: "제안서 구조를 잡는다.",
    generic_outline: "요청한 결과물의 구조를 잡는다.",
    generic_document: "문서 초안을 작성한다."
  };

  const ARTIFACT_DEFAULT_GOALS = {
    sales_script: "대상 고객이 다음 단계로 움직이도록 돕는 세일즈 콜 만들기",
    cold_email: "낯선 상대가 답장하거나 미팅을 잡고 싶게 만드는 콜드메일 작성",
    follow_up_email: "이전 접점 이후 다음 액션으로 자연스럽게 이어가기",
    demo_agenda: "데모 미팅에서 니즈, 가치, 다음 단계를 명확히 하기",
    objections_analysis: "고객 반박과 우려를 신뢰 있게 대응할 메시지로 정리하기",
    sales_collateral: "대상 고객의 pain point와 가치 제안을 빠르게 전달하기",
    negotiation_reply: "가격 우려를 인정하면서 가치와 다음 액션을 지키기",
    job_posting: "적합한 지원자가 이해하고 지원할 수 있는 공고 만들기",
    meeting_agenda: "회의 목적과 논의 순서를 명확히 하기",
    question_set: "목적에 맞는 질문 목록 만들기",
    survey_questions: "설문 목적에 맞는 문항 만들기",
    retrospective_questions: "회고에서 학습과 개선점을 끌어내기",
    presentation_outline: "발표 흐름을 설득력 있게 구조화하기",
    curriculum: "학습자가 따라갈 수 있는 커리큘럼 만들기",
    manual_or_playbook: "일관되게 실행할 수 있는 절차 만들기",
    onboarding_doc: "대상이 빠르게 적응하도록 안내하기",
    content_plan: "콘텐츠 목적에 맞는 기획안 만들기",
    blog_outline: "글의 논리 흐름과 목차를 명확히 하기",
    handoff_doc: "업무 인수인계를 빠짐없이 정리하기",
    complaint_reply: "고객 불만에 신뢰를 해치지 않고 답하기",
    proposal_outline: "제안의 논리와 구조를 명확히 하기",
    generic_outline: "요청한 구조를 명확히 잡기",
    generic_document: "바로 다듬어 쓸 수 있는 문서 초안 만들기"
  };

  const ARTIFACT_OUTPUT_CONTRACTS = {
    sales_script: [
      "오프닝, 니즈 파악 질문, 가치 제안, 예상 objection 대응, 다음 액션 제안을 구분한다.",
      "콜에서 바로 읽거나 변형해 쓸 수 있는 스크립트 형태로 작성한다."
    ],
    cold_email: ["제목 후보 2개, 첫 문장, 본문, CTA, 짧은 버전을 구분한다.", "낯선 상대가 빠르게 이해하고 답장할 수 있게 작성한다."],
    follow_up_email: ["제목, 맥락 리마인드, 핵심 가치/다음 단계, CTA를 구분한다.", "이전 접점을 부담스럽지 않게 이어가는 후속 메일로 작성한다."],
    demo_agenda: ["미팅 목표, 시간 배분, 질문/데모 흐름, 다음 액션을 구분한다.", "데모 전후에 합의해야 할 항목을 명확히 한다."],
    objections_analysis: ["objection 유형별 정리, 고객 심리/우려, 대응 메시지, 확인 질문을 구분한다.", "반박을 누르기보다 우려를 확인하고 신뢰를 높이는 방식으로 작성한다."],
    sales_collateral: ["핵심 메시지, 대상 고객 pain point, 가치 제안, proof point, CTA를 구분한다.", "제품 정보가 부족하면 가정과 확인 필요 항목을 분리한다."],
    negotiation_reply: ["고객 우려 공감, 가격/가치 재정리, 대안 제시, 다음 액션을 구분한다.", "가격 협상 상황에서 신뢰와 클로징 가능성을 함께 지킨다."],
    job_posting: ["역할, 주요 업무, 필요 역량, 지원자가 얻을 수 있는 가치를 구분한다.", "지원자가 바로 이해할 수 있는 채용 공고 초안으로 작성한다."],
    meeting_agenda: ["회의 목적, 논의 안건, 시간 배분, 기대 결과를 구분한다.", "회의 후 액션아이템과 담당자를 적을 수 있게 구성한다."],
    question_set: ["질문 목록을 목적별로 제시한다.", "필요하면 후속 질문과 진행 팁을 포함한다."],
    survey_questions: ["설문 문항 목록을 목적별로 제시한다.", "객관식/주관식 구분과 후속 분석 힌트를 포함한다."],
    retrospective_questions: ["회고 질문 목록을 단계별로 제시한다.", "학습, 개선점, 다음 액션을 끌어내는 후속 질문을 포함한다."],
    presentation_outline: ["발표 흐름을 도입, 본론, 마무리로 구성한다.", "각 구간의 핵심 메시지와 예상 슬라이드 구성을 포함한다."],
    curriculum: ["학습 목표, 대상, 모듈, 실습 또는 과제를 구분한다.", "순서대로 따라갈 수 있는 커리큘럼 초안으로 작성한다."],
    manual_or_playbook: ["기본 절차, 상황별 대응, 체크리스트를 구분한다.", "예외 상황과 escalation 기준을 포함한다."],
    onboarding_doc: ["대상, 단계, 체크리스트, 필요한 자료를 구분한다.", "첫 실행자가 바로 따라갈 수 있는 온보딩 문서로 구성한다."],
    content_plan: ["콘텐츠 목적, 핵심 메시지, 흐름, 훅 또는 제목 후보를 포함한다.", "제작 전 확인할 체크리스트를 짧게 붙인다."],
    blog_outline: ["제목 후보와 H2/H3 목차를 제시한다.", "섹션별 핵심 메시지를 짧게 설명한다."],
    handoff_doc: ["현재 상태, 진행 중인 작업, 담당자/시스템 정보, 리스크를 구분한다.", "바로 실행할 다음 TODO를 포함한다."],
    complaint_reply: ["사과/공감, 사실 확인, 해결 방안, 다음 액션을 구분한다.", "고객 신뢰를 해치지 않는 답변 초안으로 작성한다."],
    proposal_outline: ["문제 정의, 제안 내용, 기대 효과, 비용/리스크, 다음 단계를 구분한다.", "제안서 구조를 바로 확장할 수 있게 작성한다."],
    generic_outline: ["핵심 목차와 단계별 흐름을 먼저 제시한다.", "각 섹션에 들어갈 핵심 내용을 짧게 붙인다."],
    generic_document: ["문서 목적, 핵심 내용, 구조, 다음 액션을 구분한다.", "바로 다듬어 쓸 수 있는 초안으로 작성한다."]
  };

  const ARTIFACT_QUALITY_BARS = {
    sales_script: ["대상 고객과 콜 목적에 맞는 흐름이다.", "다음 액션이 자연스럽고 부담스럽지 않다."],
    cold_email: ["첫 문장에서 맥락과 가치를 빠르게 전달한다.", "CTA가 하나로 분명하고 답장하기 쉽다."],
    follow_up_email: ["이전 접점과 다음 단계가 자연스럽게 이어진다.", "압박보다 신뢰와 명확한 요청을 우선한다."],
    demo_agenda: ["미팅 목적, 질문, 데모 흐름, 다음 액션이 분명하다.", "상대 니즈 확인과 가치 설명의 균형이 맞다."],
    objections_analysis: ["고객 우려를 정확히 해석한다.", "대응 메시지가 방어적이지 않고 확인 질문으로 이어진다."],
    sales_collateral: ["대상 고객의 pain point와 가치 제안이 분명하다.", "근거와 CTA가 바로 사용할 수 있는 수준이다."],
    negotiation_reply: ["가격 우려를 인정하면서 가치와 대안을 제시한다.", "관계를 해치지 않고 다음 액션으로 이어진다."],
    job_posting: ["지원자가 역할과 기대치를 빠르게 이해할 수 있다.", "과장보다 구체적인 업무와 조건이 우선된다."],
    meeting_agenda: ["회의 목적과 산출물이 분명하다.", "안건별 논의 순서와 다음 액션이 명확하다."],
    question_set: ["질문이 목적에 맞고 편향을 줄인다.", "후속 질문이 실제 대화를 깊게 만든다."],
    survey_questions: ["문항이 한 번에 하나의 의도만 묻는다.", "응답자가 이해하기 쉽고 분석 가능한 형태다."],
    retrospective_questions: ["책임 추궁보다 학습과 개선을 유도한다.", "다음 액션으로 이어진다."],
    presentation_outline: ["청중이 따라가기 쉬운 흐름이다.", "핵심 메시지와 근거가 분명하다."],
    curriculum: ["학습 난이도와 순서가 자연스럽다.", "각 모듈의 목표와 결과물이 명확하다."],
    manual_or_playbook: ["처음 보는 사람도 따라 할 수 있다.", "예외 상황 처리 기준이 분명하다."],
    onboarding_doc: ["대상이 무엇을 언제 해야 하는지 알 수 있다.", "필요한 자료와 체크리스트가 빠지지 않는다."],
    content_plan: ["콘텐츠 목적과 흐름이 맞물린다.", "제작자가 바로 다음 단계로 갈 수 있다."],
    blog_outline: ["독자가 얻을 가치가 목차에 드러난다.", "섹션 간 흐름이 중복 없이 이어진다."],
    handoff_doc: ["업무 공백을 줄이는 정보가 우선된다.", "리스크와 다음 액션이 분명하다."],
    complaint_reply: ["고객 감정을 인정하면서 해결 방향을 제시한다.", "불필요한 방어적 표현을 피한다."],
    proposal_outline: ["상대가 왜 이 제안이 필요한지 이해할 수 있다.", "기대 효과와 다음 단계가 구체적이다."],
    generic_outline: ["구조가 원문 의도와 맞고 확장 가능하다.", "각 항목의 역할이 분명하다."],
    generic_document: ["목적과 독자가 분명하다.", "바로 편집 가능한 수준의 구조를 갖춘다."]
  };

  function getDomainFocusItems(domain, confidence) {
    if (!domain || domain === "generic" || confidence < 0.55) {
      return DOMAIN_FOCUS_ITEMS.generic;
    }

    return DOMAIN_FOCUS_ITEMS[domain] || DOMAIN_FOCUS_ITEMS.generic;
  }

  function isRecommend(value) {
    return !value || value === window.CBSTemplates.RECOMMEND_OPTION || value === "추천해줘";
  }

  function isUnresolvedValue(value) {
    return typeof value === "string" && value.includes("확인 필요");
  }

  function resolveAnswer(taskType, slot, rawValue) {
    const taskDefaults = window.CBSTemplates.TASK_DEFAULTS[taskType] || window.CBSTemplates.TASK_DEFAULTS["brief.generic"];

    if (isUnresolvedValue(rawValue)) {
      return "";
    }

    if (isRecommend(rawValue)) {
      return taskDefaults[slot] || "";
    }

    return rawValue;
  }

  function resolveAnswers(taskType, answers, intent) {
    const resolved = { ...((intent && intent.filledSlots) || {}) };
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const unresolvedSlots = [];

    Object.keys(answers || {}).forEach((slot) => {
      if (isUnresolvedValue(answers[slot])) {
        unresolvedSlots.push(slot);
        return;
      }

      const value = resolveAnswer(taskType, slot, answers[slot]);
      if (value) {
        resolved[slot] = value;
      }
    });

    if (!resolved.goal) {
      const taskDefaults = window.CBSTemplates.TASK_DEFAULTS[taskType] || window.CBSTemplates.TASK_DEFAULTS["brief.generic"];
      resolved.goal = ARTIFACT_DEFAULT_GOALS[artifactType] || taskDefaults.goal || "요청을 명확한 결과물로 바꾸기";
    }

    if (unresolvedSlots.length) {
      resolved.__unresolvedSlots = unresolvedSlots;
    }

    return resolved;
  }

  function buildTaskSentence(pattern, draft, resolved, intent) {
    const goal = resolved.goal ? ` 목표는 "${resolved.goal}"이다.` : "";
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";

    if (artifactType && ARTIFACT_TASK_SENTENCES[artifactType]) {
      return `${ARTIFACT_TASK_SENTENCES[artifactType]} 원문 요청 "${draft}"의 의도를 보존한다.${goal}`;
    }

    return `${pattern.taskVerb} 원문 요청 "${draft}"를 바로 수행 가능한 작업 brief로 정리한다.${goal}`;
  }

  function buildConfirmedInfo(resolved) {
    const preferredOrder = [
      "goal",
      "audience",
      "context",
      "artifact_topic",
      "target_customer",
      "sales_stage",
      "sales_cta",
      "sales_context",
      "previous_touchpoint",
      "negotiation_boundary",
      "objection_type",
      "meeting_goal",
      "proposal_goal",
      "proposal_context",
      "scope",
      "timeframe",
      "research_timeframe",
      "market_scope",
      "quantity",
      "output_format",
      "tone",
      "criteria",
      "decision_criteria",
      "analysis_target",
      "decision_options",
      "launch_subject",
      "launch_plan_focus",
      "feature_problem",
      "prd_scope",
      "competitor_scope",
      "comparison_dimensions",
      "funnel_stage",
      "diagnosis_method",
      "option_details",
      "naming_context",
      "naming_style",
      "campaign_audience",
      "campaign_objective",
      "source_preference",
      "constraints",
      "preserve"
    ];
    const seen = new Set();
    const orderedEntries = [];

    preferredOrder.forEach((slot) => {
      if (resolved[slot]) {
        orderedEntries.push([slot, resolved[slot]]);
        seen.add(slot);
      }
    });

    Object.entries(resolved).forEach(([slot, value]) => {
      if (!slot.startsWith("__") && !seen.has(slot) && value) {
        orderedEntries.push([slot, value]);
      }
    });

    return orderedEntries.map(([slot, value]) => `- ${SLOT_LABELS[slot] || slot}: ${value}`);
  }

  function buildUnresolvedInfo(resolved) {
    return ((resolved && resolved.__unresolvedSlots) || []).map((slot) => {
      return `- ${SLOT_LABELS[slot] || slot}: 사용자 입력 또는 추가 확인 필요`;
    });
  }

  function getOutputDescriptor(taskType, resolved, intent) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const artifactOutput =
      artifactType && window.CBSTemplates.ARTIFACT_DEFAULT_OUTPUT_FORMATS
        ? window.CBSTemplates.ARTIFACT_DEFAULT_OUTPUT_FORMATS[artifactType]
        : "";

    if (resolved.output_format) {
      return resolved.output_format;
    }

    if (artifactOutput) {
      return artifactOutput;
    }

    if (intent && intent.intentQuestionKey === "launch_plan") {
      return resolved.scope || "런칭 계획과 마일스톤";
    }

    if (intent && intent.intentQuestionKey === "prd_feature") {
      return "PRD 초안";
    }

    if (intent && intent.intentQuestionKey === "competitor_analysis") {
      return "경쟁사 분석표와 핵심 인사이트";
    }

    if (intent && intent.intentQuestionKey === "conversion_diagnosis") {
      return "원인 가설 트리와 데이터 확인 항목";
    }

    if (intent && intent.intentQuestionKey === "trend_research") {
      return "트렌드 요약과 확인 필요 자료";
    }

    if (intent && intent.intentQuestionKey === "market_research") {
      return "시장 조사 요약과 근거";
    }

    if (intent && intent.intentQuestionKey === "ab_comparison") {
      if (resolved.option_details && resolved.option_details.includes("설명")) {
        return "A/B 설명 확인 후 장단점 비교";
      }
      return "장단점 비교표와 추천 조건";
    }

    if (intent && intent.intentQuestionKey === "idea_pros_cons") {
      if (resolved.artifact_topic && resolved.artifact_topic.includes("설명")) {
        return "아이디어 설명 확인 후 장단점 분석";
      }
      return "아이디어 장단점 분석과 검증 액션";
    }

    if (taskType === "brief.plan") {
      return resolved.scope || window.CBSTemplates.TASK_DEFAULT_OUTPUT_FORMATS[taskType];
    }

    if (taskType === "brief.analyze") {
      return resolved.analysis_method || window.CBSTemplates.TASK_DEFAULT_OUTPUT_FORMATS[taskType];
    }

    if (taskType === "brief.write") {
      return window.CBSTemplates.TASK_DEFAULT_OUTPUT_FORMATS[taskType];
    }

    if (taskType === "brief.decide") {
      return window.CBSTemplates.TASK_DEFAULT_OUTPUT_FORMATS[taskType];
    }

    return window.CBSTemplates.TASK_DEFAULT_OUTPUT_FORMATS[taskType] || window.CBSTemplates.TASK_DEFAULT_OUTPUT_FORMATS["brief.generic"];
  }

  function buildOutputFormat(taskType, pattern, resolved, intent) {
    const selectedFormat = getOutputDescriptor(taskType, resolved, intent);
    const lines = selectedFormat ? [`선택된 출력 형식: ${selectedFormat}`] : [];
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const outputContract = getOutputContract(taskType, pattern, resolved, intent);

    if (resolved.tone && taskType === "brief.write") {
      lines.push(`톤: ${resolved.tone}`);
    }

    if (resolved.criteria || resolved.decision_criteria) {
      lines.push(`판단 기준: ${resolved.criteria || resolved.decision_criteria}`);
    }

    if (resolved.quantity) {
      lines.push(`분량: ${resolved.quantity}`);
    }

    appendAnswerReflectionLines(lines, resolved);

    return lines.concat(outputContract.map((item) => `- ${item}`));
  }

  function appendAnswerReflectionLines(lines, resolved) {
    [
      "question_format",
      "outline_format",
      "agenda_format",
      "handoff_format",
      "proposal_format",
      "onboarding_format",
      "manual_scope",
      "content_output",
      "target_customer",
      "sales_stage",
      "sales_cta",
      "sales_context",
      "previous_touchpoint",
      "negotiation_boundary",
      "objection_type",
      "meeting_goal",
      "proposal_goal",
      "proposal_context",
      "diagnosis_method",
      "launch_plan_focus",
      "prd_scope"
    ].forEach((slot) => {
      if (resolved[slot]) {
        lines.push(`${SLOT_LABELS[slot] || slot}: ${resolved[slot]}`);
      }
    });
  }

  function getOutputContract(taskType, pattern, resolved, intent) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";

    if (artifactType === "blog_outline" && resolved.outline_format === "핵심 목차만") {
      return ["핵심 목차만 간결하게 제시한다.", "각 목차가 다루는 핵심 방향을 한 줄로 붙인다."];
    }

    if (artifactType === "meeting_agenda" && resolved.agenda_format) {
      return [`${resolved.agenda_format}에 맞춰 안건을 구성한다.`, "회의 목적, 논의 안건, 시간 배분, 기대 결과를 구분한다."];
    }

    if (artifactType === "presentation_outline" && resolved.outline_format) {
      return [`${resolved.outline_format}에 맞춰 발표 흐름을 구성한다.`, "도입, 본론, 마무리의 핵심 메시지를 구분한다."];
    }

    if (["question_set", "survey_questions", "retrospective_questions"].includes(artifactType) && resolved.question_format) {
      if (resolved.question_format === "핵심 질문 10개") {
        return ["핵심 질문 10개를 제시한다.", "필요하면 마지막에 확인 필요 항목만 짧게 덧붙인다."];
      }
      return [`${resolved.question_format} 형식을 우선 반영한다.`, "질문 목록과 필요한 후속 질문을 목적별로 제시한다."];
    }

    if (artifactType === "handoff_doc" && resolved.handoff_format) {
      return [`${resolved.handoff_format} 형식을 우선 반영한다.`, "현재 상태, 진행 중인 작업, 리스크, 다음 액션을 구분한다."];
    }

    if (artifactType === "proposal_outline" && resolved.proposal_format) {
      return [`${resolved.proposal_format} 형식을 우선 반영한다.`, "문제 정의, 제안 내용, 기대 효과, 다음 단계를 구분한다."];
    }

    if (artifactType === "onboarding_doc" && resolved.onboarding_format) {
      return [`${resolved.onboarding_format} 형식을 우선 반영한다.`, "대상, 단계, 체크리스트, 필요한 자료를 구분한다."];
    }

    if (artifactType === "manual_or_playbook" && resolved.manual_scope) {
      return [`${resolved.manual_scope} 범위를 우선 반영한다.`, "절차, 상황별 대응, 확인 기준을 구분한다."];
    }

    if (intent && intent.intentQuestionKey === "ab_comparison") {
      if (resolved.option_details && resolved.option_details.includes("설명")) {
        return ["A안과 B안의 실제 설명이 없으면 먼저 한 문장으로 요청한다.", "설명이 있으면 판단 기준별 장단점과 추천 조건을 비교한다."];
      }
      return ["A안과 B안의 장단점을 비교한다.", "판단 기준별 추천 조건과 확인 필요 정보를 분리한다."];
    }

    if (taskType === "brief.analyze" && resolved.diagnosis_method) {
      return [`${resolved.diagnosis_method} 방식으로 진단한다.`, "원인, 근거, 데이터 확인 항목, 다음 실험을 구분한다."];
    }

    if (intent && intent.intentQuestionKey === "trend_research") {
      return ["조사 기간과 자료 기준을 먼저 제시한다.", "최신성 확인이 필요한 내용은 확인 필요로 분리한다."];
    }

    if (intent && intent.intentQuestionKey === "market_research") {
      return ["시장 범위, 주요 세그먼트, 경쟁 구도, 확인 필요 자료를 구분한다.", "근거가 부족한 내용은 가정으로 표시한다."];
    }

    if (intent && intent.intentQuestionKey === "launch_plan") {
      return ["런칭 대상, 일정과 마일스톤, 준비 체크리스트, 성공 지표를 구분한다.", "다음 달 실행을 전제로 우선순위와 리스크를 제시한다."];
    }

    if (intent && intent.intentQuestionKey === "prd_feature") {
      return ["문제 정의와 목표, 사용자 시나리오, 요구사항과 우선순위를 구분한다.", "성공 지표와 릴리즈 전 확인할 리스크를 포함한다."];
    }

    if (intent && intent.intentQuestionKey === "competitor_analysis") {
      return ["분석 범위와 기준을 먼저 제시한다.", "경쟁사별 강점, 약점, 차별점, 확인 필요 항목을 비교한다."];
    }

    if (taskType === "brief.analyze" && resolved.option_details) {
      return ["A안과 B안의 장단점을 비교한다.", "판단 기준별 추천 조건과 확인 필요 정보를 분리한다."];
    }

    if (intent && intent.intentQuestionKey === "idea_pros_cons") {
      if (resolved.artifact_topic && resolved.artifact_topic.includes("설명")) {
        return ["분석할 아이디어 설명이 없으면 먼저 한 문장으로 요청한다.", "아이디어 설명이 있으면 장점, 단점, 리스크, 검증 액션을 구분한다."];
      }
      return ["아이디어의 장점, 단점, 리스크, 확인할 가정을 구분한다.", "다음 검증 액션과 보완 방향을 제안한다."];
    }

    if (taskType === "brief.create" && resolved.naming_context) {
      return ["이름 후보와 짧은 의도를 함께 제시한다.", "네이밍 스타일과 서비스 유형을 우선 반영한다."];
    }

    if (taskType === "brief.create" && resolved.campaign_audience) {
      return ["아이디어를 요청된 개수만큼 제시한다.", "대상, 목적, 실행 방식, 기대 효과를 짧게 붙인다."];
    }

    return ARTIFACT_OUTPUT_CONTRACTS[artifactType] || pattern.outputContract;
  }

  function extractDraftConstraints(draft, intent, resolved) {
    const text = compactDraft(draft).toLowerCase();
    const constraints = [];
    const countMatch = compactDraft(draft).match(/(\d+)\s*(개|가지)/);

    if (countMatch) {
      constraints.push(`${countMatch[1]}${countMatch[2]}를 지킨다.`);
    }

    if (text.includes("1페이지") || resolved.output_format === "1페이지 전략 문서") {
      constraints.push("1페이지 안에 정리한다.");
    }

    if (text.includes("다음 달")) {
      constraints.push("다음 달 실행을 전제로 한다.");
    }

    if (text.includes("이번 주")) {
      constraints.push("이번 주 실행을 전제로 한다.");
    }

    if (text.includes("최근")) {
      constraints.push("최근 자료와 트렌드임을 우선 고려한다.");
    }

    if (/a\s*(랑|와)\s*b/i.test(draft) || /a안\s*b안/i.test(text)) {
      constraints.push("A와 B를 비교한다.");
    }

    if (text.includes("가격 인상")) {
      constraints.push("가격 인상에 대한 고객 반응과 신뢰 훼손 리스크를 고려한다.");
    }

    if (text.includes("투자자")) {
      constraints.push("투자자가 궁금해할 성과, 리스크, 다음 계획을 포함한다.");
    }

    if (text.includes("고객")) {
      constraints.push("고객이 이해하기 쉬운 표현을 사용한다.");
    }

    if (intent && intent.signals && intent.signals.outputHints.includes("표")) {
      constraints.push("표 형식이 적합하면 표로 정리한다.");
    }

    return constraints.filter((constraint, index) => constraints.indexOf(constraint) === index);
  }

  function buildDomainFocus(domain, confidence) {
    return getDomainFocusItems(domain, confidence).map((item) => `- ${item}`);
  }

  function buildQualityBar(pattern, intent) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const qualityBar = ARTIFACT_QUALITY_BARS[artifactType] || pattern.qualityBar;
    return qualityBar.map((item) => `- ${item}`);
  }

  function shouldUseCompactPrompt(taskType, intent, draft) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const intentQuestionKey = (intent && intent.intentQuestionKey) || "";
    const compactKeys = ["naming_ideas", "campaign_ideas", "idea_pros_cons", "ab_comparison"];

    return (
      artifactType ||
      taskType === "brief.write" ||
      taskType === "brief.create" ||
      compactKeys.includes(intentQuestionKey)
    );
  }

  function shouldUseContextFirstPrompt(draft, intent) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const text = compactDraft(draft).toLowerCase();
    const isPrdWithoutFeatureDetail = intent && intent.intentQuestionKey === "prd_feature" && text.includes("새 기능");
    const isCustomerProposal =
      artifactType === "proposal_outline" &&
      text.includes("고객") &&
      !["목차", "구조", "구성", "제휴"].some((term) => text.includes(term));

    return isPrdWithoutFeatureDetail || artifactType === "sales_collateral" || isCustomerProposal;
  }

  function buildContextFirstPrompt(taskType, pattern, draft, resolved, intent) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const confirmedInfo = buildConfirmedInfo(resolved);
    const isPrd = intent && intent.intentQuestionKey === "prd_feature";
    const outputLabel = isPrd ? "PRD" : artifactType === "sales_collateral" ? "세일즈 자료" : "제안서";
    let contextQuestions;

    if (isPrd) {
      contextQuestions = [
        "어떤 기능 또는 고객 문제를 다룰지 확인한다.",
        "대상 사용자와 핵심 사용 시나리오를 확인한다.",
        "성공 지표, 주요 요구사항, 릴리즈 범위를 확인한다."
      ];
    } else if (artifactType === "sales_collateral") {
      contextQuestions = [
        "제품/서비스를 한 문장으로 설명해 달라고 요청한다.",
        "대상 고객과 핵심 pain point를 확인한다.",
        "자료를 본 뒤 원하는 다음 액션을 확인한다."
      ];
    } else {
      contextQuestions = [
        "고객 A가 누구인지와 현재 상황을 확인한다.",
        "제안하려는 제품/서비스/조건을 확인한다.",
        "제안서의 목적과 원하는 다음 액션을 확인한다."
      ];
    }

    return [
      "# 작업",
      `${outputLabel}를 바로 작성하기 전에 필요한 정보를 먼저 확인한다. 원문 요청 "${draft}"의 의도를 보존한다.`,
      "",
      "# 확인된 정보",
      `- 원문 요청: "${draft}"`,
      ...(confirmedInfo.length ? confirmedInfo : ["- 선택/추론된 조건이 부족하다."]),
      "",
      "# 출력 형식",
      "먼저 아래 확인 질문을 짧게 묻는다.",
      ...contextQuestions.map((item) => `- ${item}`),
      isPrd
        ? "사용자가 답하면 문제 정의, 사용자 시나리오, 요구사항, 성공 지표를 포함한 PRD 초안으로 이어서 작성한다."
        : "사용자가 답하면 바로 사용할 수 있는 초안 또는 구조로 이어서 작성한다.",
      "",
      "# 주의할 점",
      "- 제품, 고객, 제안 내용을 지어내지 않는다.",
      "- 부족한 정보는 확인 필요로 분리한다.",
      "- 상대가 부담스럽지 않게 신뢰와 다음 액션을 우선한다."
    ].join("\n");
  }

  function buildCompactPrompt(taskType, pattern, draft, resolved, intent) {
    const confirmedInfo = buildConfirmedInfo(resolved);
    const unresolvedInfo = buildUnresolvedInfo(resolved);
    const draftConstraints = extractDraftConstraints(draft, intent, resolved);
    const outputLines = buildOutputFormat(taskType, pattern, resolved, intent);

    return [
      "# 작업",
      buildTaskSentence(pattern, draft, resolved, intent),
      "",
      "# 확인된 정보",
      `- 원문 요청: "${draft}"`,
      ...(confirmedInfo.length ? confirmedInfo : ["- 선택/추론된 조건이 부족하므로 필요한 가정을 표시한다."]),
      ...(unresolvedInfo.length ? ["", "확인 필요:", ...unresolvedInfo] : []),
      "",
      "# 출력 형식",
      ...outputLines.slice(0, 7),
      "",
      "# 주의할 점",
      "- 모르는 정보는 가정으로 표시한다.",
      ...(unresolvedInfo.length ? ["- 확인 필요 항목은 지어내지 말고 먼저 질문하거나 가정으로 표시한다."] : []),
      "- 주제, 대상, 역할처럼 원문에 없는 핵심 정보는 지어내지 말고 확인 질문으로 분리한다.",
      "- 선택한 조건을 우선 반영한다.",
      "- 바로 사용할 수 있는 형태로 작성한다.",
      ...draftConstraints.map((constraint) => `- ${constraint}`)
    ].join("\n");
  }

  function compileBrief(input) {
    const draft = compactDraft(input && input.draft);
    const baseIntent = input && input.intent ? input.intent : window.CBSRuleEngine.analyzeIntent(draft);
    const domain = input && input.domain ? input.domain : baseIntent.domain || "generic";
    const taskType = input && input.taskType ? input.taskType : baseIntent.taskType || "brief.generic";
    const answers = input && input.answers ? input.answers : {};
    const pattern = getPattern(taskType);
    const confidence = typeof baseIntent.domainConfidence === "number" ? baseIntent.domainConfidence : 0;
    const perspective = confidence >= 0.55 ? getPerspective(domain) : getPerspective("generic");
    const resolved = resolveAnswers(taskType, answers, baseIntent);
    const confirmedInfo = buildConfirmedInfo(resolved);
    const unresolvedInfo = buildUnresolvedInfo(resolved);
    const draftConstraints = extractDraftConstraints(draft, baseIntent, resolved);

    if (shouldUseContextFirstPrompt(draft, baseIntent)) {
      return buildContextFirstPrompt(taskType, pattern, draft, resolved, baseIntent);
    }

    if (shouldUseCompactPrompt(taskType, baseIntent, draft)) {
      return buildCompactPrompt(taskType, pattern, draft, resolved, baseIntent);
    }

    return [
      "# 작업",
      buildTaskSentence(pattern, draft, resolved, baseIntent),
      "",
      "# 목표",
      resolved.goal || "사용자의 요청을 명확한 결과물로 바꾼다.",
      "",
      "# 맥락",
      "사용자의 원문 요청:",
      `"${draft}"`,
      "",
      "확정된 정보:",
      ...(confirmedInfo.length ? confirmedInfo : ["- 아직 확정된 정보가 적으므로 필요한 가정을 표시한다."]),
      ...(unresolvedInfo.length ? ["", "확인 필요:", ...unresolvedInfo] : []),
      "",
      "# 제약",
      "- 모르는 정보는 지어내지 말고, 필요한 경우 합리적 가정이라고 표시한다.",
      ...(unresolvedInfo.length ? ["- 확인 필요 항목은 먼저 질문하거나, 가정으로 답할 경우 명시적으로 표시한다."] : []),
      "- 추상적인 조언보다 실행 가능한 제안을 우선한다.",
      "- 불확실한 부분은 “확인 필요”로 분리한다.",
      ...draftConstraints.map((constraint) => `- ${constraint}`),
      "",
      "# 출력 형식",
      ...buildOutputFormat(taskType, pattern, resolved, baseIntent),
      ...buildDomainFocus(domain, confidence),
      "",
      "# 좋은 답변의 기준",
      ...buildQualityBar(pattern, baseIntent),
      "",
      "# 관점",
      `${perspective}에서 답하라.`
    ].join("\n");
  }

  window.CBSBriefCompiler = {
    compileBrief
  };
})();
