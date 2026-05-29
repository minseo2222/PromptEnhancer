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
    context_line: "1줄 맥락",
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
    proposal_context: "제안 내용",
    refund_status: "환불 상태",
    resolution_policy: "해결 기준",
    outage_status: "장애 상태",
    outage_impact: "영향 범위",
    churn_reason: "해지 사유",
    retention_boundary: "리텐션 기준",
    escalation_level: "심각도",
    ownership_model: "오너십",
    checkin_purpose: "체크인 목적",
    customer_stage: "고객 상태",
    faq_topic: "FAQ 범위",
    faq_format: "FAQ 형식",
    refund_policy_scope: "환불 정책 범위",
    email_purpose: "메일 목적",
    email_tone: "메일 톤",
    approval_target: "승인 대상",
    schedule_change_context: "일정 변경 성격",
    apology_context: "사과 상황",
    email_cta: "메일 CTA",
    pm_user_type: "사용자 유형",
    pm_story_scope: "유저 스토리 범위",
    pm_priority_basis: "우선순위 기준",
    pm_output_format: "PM 출력 형식",
    pm_requirement_scope: "요구사항 범위",
    pm_report_audience: "보고 대상",
    pm_report_focus: "보고 초점",
    pm_feedback_source: "피드백 출처",
    pm_metric_goal: "지표 목적"
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
    refund_reply: "환불 요청 고객 답변을 작성한다.",
    outage_notice: "서비스 장애 공지 초안을 작성한다.",
    churn_save_reply: "해지하려는 고객에게 보낼 답변을 작성한다.",
    vip_complaint_reply: "VIP 고객 클레임 대응 초안을 작성한다.",
    customer_success_checkin: "고객 성공 체크인 메일을 작성한다.",
    support_faq: "고객 지원 FAQ 초안을 작성한다.",
    refund_policy_manual: "환불 정책 CS 응대 매뉴얼을 만든다.",
    email_draft: "메일 초안을 작성한다.",
    approval_request_email: "승인 요청 메일을 작성한다.",
    schedule_change_email: "일정 변경 메일을 작성한다.",
    apology_email: "사과 메일을 작성한다.",
    email_followup: "팔로업 메일을 작성한다.",
    pm_user_story: "요구사항을 유저 스토리로 정리한다.",
    pm_sprint_priority: "스프린트 우선순위를 정리한다.",
    pm_requirements_brief: "제품 요구사항을 정리한다.",
    pm_status_report: "프로젝트 현황 보고를 작성한다.",
    pm_feedback_synthesis: "제품 피드백을 정리한다.",
    pm_metrics_dashboard: "제품 지표 대시보드 항목을 추천한다.",
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
    refund_reply: "환불 요청에 정책과 고객 신뢰를 함께 지키며 답하기",
    outage_notice: "장애 상황을 숨기지 않고 고객이 다음 행동을 알 수 있게 공지하기",
    churn_save_reply: "해지 의사를 존중하면서 이탈 사유와 가능한 대안을 확인하기",
    vip_complaint_reply: "중요 고객 클레임에 오너십과 해결 일정을 분명히 하기",
    customer_success_checkin: "고객의 사용 현황과 성공 가능성을 부담 없이 확인하기",
    support_faq: "고객이 스스로 문제를 해결할 수 있는 FAQ 만들기",
    refund_policy_manual: "지원팀이 환불 정책을 일관되고 안전하게 안내하도록 만들기",
    email_draft: "상대와 목적에 맞는 메일 초안 만들기",
    approval_request_email: "필요한 승인과 근거를 명확히 전달하기",
    schedule_change_email: "일정 변경을 정중하고 혼선 없이 안내하기",
    apology_email: "상황을 인정하고 신뢰 회복 방향을 분명히 하기",
    email_followup: "이전 접점 이후 다음 액션으로 자연스럽게 이어가기",
    pm_user_story: "사용자 관점의 요구와 수용 기준을 명확히 하기",
    pm_sprint_priority: "이번 스프린트에서 먼저 할 일을 판단 가능하게 정리하기",
    pm_requirements_brief: "제품 요구사항을 실행 가능한 단위로 정리하기",
    pm_status_report: "프로젝트 상태와 필요한 의사결정을 명확히 전달하기",
    pm_feedback_synthesis: "피드백을 인사이트와 액션아이템으로 바꾸기",
    pm_metrics_dashboard: "제품 상태를 판단할 지표 항목을 우선순위화하기",
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
    refund_reply: [
      "환불 상태, 정책 근거, 고객 상황 공감, 다음 절차를 구분한다.",
      "환불 가능 여부를 모르면 단정하지 말고 확인 필요와 임시 안내를 분리한다."
    ],
    outage_notice: [
      "장애 요약, 영향 범위, 현재 상태, 우회책, 다음 업데이트 시점을 구분한다.",
      "책임 회피보다 사과, 사실 확인, 고객이 할 수 있는 다음 행동을 우선한다."
    ],
    churn_save_reply: [
      "공감, 해지 사유 확인, 가능한 대안, 다음 액션을 구분한다.",
      "무리하게 붙잡기보다 고객 선택권과 신뢰를 해치지 않는 답변으로 작성한다."
    ],
    vip_complaint_reply: [
      "사과/공감, 오너십, 심각도 확인, 해결 계획, 다음 업데이트를 구분한다.",
      "보상이나 약속은 단정하지 말고 확인 필요와 가능한 범위를 분리한다."
    ],
    customer_success_checkin: [
      "제목, 체크인 목적, 사용 현황 질문, 지원 제안, 다음 액션을 구분한다.",
      "고객이 부담 없이 답할 수 있게 짧고 구체적인 메일로 작성한다."
    ],
    support_faq: [
      "FAQ 카테고리, 질문, 고객용 답변, 필요한 다음 액션을 구분한다.",
      "답변은 고객이 바로 이해할 수 있게 짧고 실무적으로 작성한다."
    ],
    refund_policy_manual: [
      "환불 가능/불가 기준, 예외/승인 절차, 상황별 응대 스크립트, escalation 기준을 구분한다.",
      "정책이 불명확한 부분은 확인 필요로 표시하고 임의로 약속하지 않는다."
    ],
    email_draft: [
      "제목, 첫 문장, 본문 초안, 요청 또는 CTA를 구분한다.",
      "독자와 목적에 맞게 짧고 바로 보낼 수 있는 메일로 작성한다."
    ],
    approval_request_email: [
      "요청 배경, 승인 대상, 판단 근거, 필요한 결정, 답변 기한 또는 다음 액션을 구분한다.",
      "승인자가 빠르게 판단할 수 있게 사실과 요청을 분명히 쓴다."
    ],
    schedule_change_email: [
      "변경 사유, 기존 일정, 제안 일정, 상대가 확인할 액션을 구분한다.",
      "불편을 줄이는 톤으로 혼선 없이 작성한다."
    ],
    apology_email: [
      "사과, 발생 상황, 영향, 해결/재발 방지 방향, 다음 액션을 구분한다.",
      "변명보다 책임감과 신뢰 회복을 우선한다."
    ],
    email_followup: [
      "이전 접점 리마인드, 핵심 요지, 필요한 확인, CTA를 구분한다.",
      "상대가 부담 없이 답할 수 있게 짧고 분명하게 작성한다."
    ],
    pm_user_story: [
      "사용자 유형, 니즈, 목표 행동, 수용 기준을 구분한다.",
      "개발/디자인이 바로 논의할 수 있는 단위로 작성한다."
    ],
    pm_sprint_priority: [
      "우선순위 목록, 판단 기준, 리스크, 이번 스프린트 목표를 구분한다.",
      "왜 먼저 해야 하는지와 보류할 항목을 함께 제시한다."
    ],
    pm_requirements_brief: [
      "문제 정의, 사용자 시나리오, 기능 요구사항, 수용 기준을 구분한다.",
      "모호한 요구는 확인 필요로 분리하고 구현 단위로 정리한다."
    ],
    pm_status_report: [
      "진행 상황, 리스크/이슈, 지표, 필요한 의사결정, 다음 액션을 구분한다.",
      "보고 대상이 바로 판단할 수 있게 요점을 앞에 둔다."
    ],
    pm_feedback_synthesis: [
      "피드백 주제, 반복 패턴, 사용자 pain point, 우선순위, 액션아이템을 구분한다.",
      "원문에 없는 사실은 가정으로 표시하고 확인 필요를 분리한다."
    ],
    pm_metrics_dashboard: [
      "지표 후보, 목적, 정의/계산식, 사용 의사결정, 우선순위를 구분한다.",
      "보기 좋은 지표보다 실제 판단에 쓰이는 지표를 우선한다."
    ],
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
    refund_reply: ["정책과 고객 상황을 함께 고려한다.", "환불 가능 여부를 섣불리 단정하지 않는다."],
    outage_notice: ["영향 범위와 현재 상태가 분명하다.", "사과와 다음 업데이트 기준이 빠지지 않는다."],
    churn_save_reply: ["해지 사유를 먼저 존중하고 확인한다.", "과한 설득보다 신뢰와 선택권을 우선한다."],
    vip_complaint_reply: ["오너십과 해결 일정이 분명하다.", "중요 고객에게 방어적으로 들리지 않는다."],
    customer_success_checkin: ["체크인 목적과 다음 액션이 분명하다.", "고객이 답하기 쉬운 질문으로 구성된다."],
    support_faq: ["질문과 답변이 고객 관점에서 명확하다.", "고객 지원팀의 반복 문의를 줄일 수 있다."],
    refund_policy_manual: ["정책 기준과 예외 처리가 분명하다.", "지원 담당자가 같은 기준으로 응대할 수 있다."],
    email_draft: ["메일 목적과 요청이 분명하다.", "독자가 바로 이해하고 답할 수 있다."],
    approval_request_email: ["승인 대상과 판단 근거가 분명하다.", "요청이 과장 없이 간결하다."],
    schedule_change_email: ["변경 내용과 상대 액션이 혼선 없이 드러난다.", "정중하지만 불필요하게 장황하지 않다."],
    apology_email: ["책임과 해결 방향이 분명하다.", "변명처럼 들리지 않는다."],
    email_followup: ["이전 맥락과 다음 액션이 자연스럽다.", "답장 부담을 줄이는 문장이다."],
    pm_user_story: ["사용자, 목적, 수용 기준이 구분된다.", "팀이 바로 논의할 수 있는 수준이다."],
    pm_sprint_priority: ["판단 기준과 우선순위가 일관된다.", "리스크와 보류 항목이 분명하다."],
    pm_requirements_brief: ["요구사항이 실행 가능한 단위로 정리된다.", "모호한 부분을 확인 필요로 분리한다."],
    pm_status_report: ["보고 대상이 핵심 상태를 빠르게 파악할 수 있다.", "필요한 결정과 다음 액션이 빠지지 않는다."],
    pm_feedback_synthesis: ["피드백을 단순 나열하지 않고 패턴으로 묶는다.", "인사이트가 액션으로 이어진다."],
    pm_metrics_dashboard: ["지표가 의사결정 목적과 연결된다.", "정의와 우선순위가 명확하다."],
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

  function applyContextLine(resolved, contextLine, intent) {
    const line = compactDraft(contextLine);

    if (line) {
      resolved.context_line = line;
      return resolved;
    }

    if (intent && intent.needsContextLine) {
      const unresolved = resolved.__unresolvedSlots || [];
      if (!unresolved.includes("context_line")) {
        resolved.__unresolvedSlots = unresolved.concat("context_line");
      }
    }

    return resolved;
  }

  function getIntentText(draft, resolved) {
    return `${compactDraft(draft)} ${resolved && resolved.context_line ? resolved.context_line : ""}`.toLowerCase();
  }

  function textIncludesAny(text, keywords) {
    return keywords.some((keyword) => text.includes(String(keyword).toLowerCase()));
  }

  function isProposalWriteRequest(draft, resolved) {
    const text = getIntentText(draft, resolved);

    return (
      text.includes("제안서") &&
      textIncludesAny(text, ["써줘", "작성", "초안", "본문", "메일"]) &&
      !textIncludesAny(text, ["목차", "구조", "구성", "아웃라인"])
    );
  }

  function isPlannedMaintenanceNotice(draft, resolved) {
    const text = getIntentText(draft, resolved);
    const hasMaintenanceSignal = textIncludesAny(text, ["점검", "정기 점검", "예정 점검", "사전 안내"]);
    const hasPlannedSignal = textIncludesAny(text, ["예정", "정기", "사전", "완료 후", "접속 불가", "접속불가"]);
    const hasUnplannedOutageSignal = textIncludesAny(text, ["장애", "오류", "에러", "다운", "복구 중", "조사 중"]);

    return hasMaintenanceSignal && hasPlannedSignal && !hasUnplannedOutageSignal;
  }

  function applyArtifactFraming(draft, resolved, intent, answers) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";

    if (artifactType === "proposal_outline" && isProposalWriteRequest(draft, resolved)) {
      resolved.__proposalWriteRequest = true;

      if (!answers.goal) {
        resolved.goal = "고객 상황에 맞는 제안서 초안 작성";
      }

      if (!answers.output_format) {
        resolved.output_format = "제안서 본문 초안";
      }
    }

    if (artifactType === "outage_notice" && isPlannedMaintenanceNotice(draft, resolved)) {
      resolved.__plannedMaintenanceNotice = true;

      if (!answers.goal) {
        resolved.goal = "예정 점검과 접속 제한을 고객에게 사전 안내하기";
      }

      if (!answers.output_format) {
        resolved.output_format = "점검/접속 제한 사전 안내문";
      }
    }

    return resolved;
  }

  function buildTaskSentence(pattern, draft, resolved, intent) {
    const goal = resolved.goal ? ` 목표는 "${resolved.goal}"이다.` : "";
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";

    if (artifactType === "proposal_outline" && resolved.__proposalWriteRequest) {
      return `제안서 본문 초안을 작성한다. 원문 요청 "${draft}"의 의도를 보존한다.${goal}`;
    }

    if (artifactType === "outage_notice" && resolved.__plannedMaintenanceNotice) {
      return `예정된 점검/접속 제한 안내문을 작성한다. 원문 요청 "${draft}"의 의도를 보존한다.${goal}`;
    }

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
      "context_line",
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
      "refund_status",
      "resolution_policy",
      "outage_status",
      "outage_impact",
      "churn_reason",
      "retention_boundary",
      "escalation_level",
      "ownership_model",
      "checkin_purpose",
      "customer_stage",
      "faq_topic",
      "faq_format",
      "refund_policy_scope",
      "email_purpose",
      "email_tone",
      "approval_target",
      "schedule_change_context",
      "apology_context",
      "email_cta",
      "pm_user_type",
      "pm_story_scope",
      "pm_priority_basis",
      "pm_output_format",
      "pm_requirement_scope",
      "pm_report_audience",
      "pm_report_focus",
      "pm_feedback_source",
      "pm_metric_goal",
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

    if (artifactType === "proposal_outline" && resolved.__proposalWriteRequest) {
      return "제안서 본문 초안";
    }

    if (artifactType === "outage_notice" && resolved.__plannedMaintenanceNotice) {
      return "점검/접속 제한 사전 안내문";
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
      "refund_status",
      "resolution_policy",
      "outage_status",
      "outage_impact",
      "churn_reason",
      "retention_boundary",
      "escalation_level",
      "ownership_model",
      "checkin_purpose",
      "customer_stage",
      "faq_topic",
      "faq_format",
      "refund_policy_scope",
      "email_purpose",
      "email_tone",
      "approval_target",
      "schedule_change_context",
      "apology_context",
      "email_cta",
      "pm_user_type",
      "pm_story_scope",
      "pm_priority_basis",
      "pm_output_format",
      "pm_requirement_scope",
      "pm_report_audience",
      "pm_report_focus",
      "pm_feedback_source",
      "pm_metric_goal",
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

    if (artifactType === "proposal_outline" && resolved.__proposalWriteRequest) {
      return [
        "목차만 나열하지 말고 바로 다듬어 쓸 수 있는 제안서 본문 초안으로 작성한다.",
        "고객 문제, 제안 내용, 기대 효과, 실행 범위, 다음 액션을 구분한다.",
        "고객/제안 정보가 부족하면 확인 필요 항목을 분리한다."
      ];
    }

    if (artifactType === "outage_notice" && resolved.__plannedMaintenanceNotice) {
      return [
        "점검 목적, 예정 시간, 영향 범위, 고객이 알아야 할 사항, 완료 후 안내 계획을 구분한다.",
        "비계획 장애 사과문처럼 쓰지 말고 사전 안내와 협조 요청 중심으로 작성한다.",
        "예정된 사실과 확인 필요 항목을 분리한다."
      ];
    }

    if (
      ["email_draft", "approval_request_email", "schedule_change_email", "apology_email", "email_followup"].includes(
        artifactType
      )
    ) {
      const contract = ARTIFACT_OUTPUT_CONTRACTS[artifactType] || ARTIFACT_OUTPUT_CONTRACTS.email_draft;
      const selected = resolved.email_purpose || resolved.approval_target || resolved.schedule_change_context || resolved.apology_context || resolved.email_cta;
      return selected ? [`선택된 조건 "${selected}"을 메일 구조에 우선 반영한다.`].concat(contract) : contract;
    }

    if (artifactType && artifactType.startsWith("pm_")) {
      const contract = ARTIFACT_OUTPUT_CONTRACTS[artifactType] || pattern.outputContract;
      return resolved.pm_output_format ? [`${resolved.pm_output_format} 형식을 우선 반영한다.`].concat(contract) : contract;
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

    if (text.includes("환불")) {
      constraints.push("환불 가능 여부와 정책 근거를 모르면 단정하지 않는다.");
    }

    if (text.includes("장애")) {
      constraints.push("장애 영향 범위, 현재 상태, 다음 업데이트 기준을 분리한다.");
    }

    if (text.includes("배송 지연") || text.includes("일정 지연")) {
      constraints.push("배송/일정 지연 신호를 서비스 장애로 바꾸지 않는다.");
    }

    if (text.includes("해지")) {
      constraints.push("해지 의사를 존중하고 무리한 설득보다 사유 확인과 선택권을 우선한다.");
    }

    if (text.includes("vip") || text.includes("클레임")) {
      constraints.push("중요 고객 클레임은 오너십, 해결 일정, 재발 방지 관점으로 다룬다.");
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

  function hasSpecificAnswers(answers) {
    return Object.entries(answers || {}).some(([slot, value]) => {
      return slot !== "context_line" && !isRecommend(value) && !isUnresolvedValue(value);
    });
  }

  function shouldUseContextFirstPrompt(draft, intent, answers) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const text = compactDraft(draft).toLowerCase();
    const isPrdWithoutFeatureDetail = intent && intent.intentQuestionKey === "prd_feature" && text.includes("새 기능");
    const isCustomerProposal =
      artifactType === "proposal_outline" &&
      text.includes("고객") &&
      !["목차", "구조", "구성", "제휴"].some((term) => text.includes(term));

    if (isPrdWithoutFeatureDetail && hasSpecificAnswers(answers)) {
      return false;
    }

    return isPrdWithoutFeatureDetail || artifactType === "sales_collateral" || isCustomerProposal;
  }

  function buildContextFirstPrompt(taskType, pattern, draft, resolved, intent) {
    const artifactType = intent && intent.artifactType && intent.artifactType !== "none" ? intent.artifactType : "";
    const confirmedInfo = buildConfirmedInfo(resolved);
    const unresolvedInfo = buildUnresolvedInfo(resolved);
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
      ...(unresolvedInfo.length ? ["", "확인 필요:", ...unresolvedInfo] : []),
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
    const contextLine = input && input.contextLine ? input.contextLine : answers.context_line;
    const pattern = getPattern(taskType);
    const confidence = typeof baseIntent.domainConfidence === "number" ? baseIntent.domainConfidence : 0;
    const perspective = confidence >= 0.55 ? getPerspective(domain) : getPerspective("generic");
    const resolved = applyArtifactFraming(
      draft,
      applyContextLine(resolveAnswers(taskType, answers, baseIntent), contextLine, baseIntent),
      baseIntent,
      answers
    );
    const confirmedInfo = buildConfirmedInfo(resolved);
    const unresolvedInfo = buildUnresolvedInfo(resolved);
    const draftConstraints = extractDraftConstraints(draft, baseIntent, resolved);

    if (shouldUseContextFirstPrompt(draft, baseIntent, answers) && !resolved.context_line) {
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
