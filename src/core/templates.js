(function () {
  "use strict";

  const RECOMMEND_OPTION = "추천해줘";

  const DOMAINS = [
    "marketing_strategy",
    "product_planning",
    "research",
    "writing_email",
    "personal_prioritization",
    "generic"
  ];

  const DOMAIN_KEYWORDS = {
    marketing_strategy: [
      "마케팅",
      "전략",
      "캠페인",
      "유저 획득",
      "전환율",
      "리텐션",
      "광고",
      "gtm",
      "성장",
      "시장 진입",
      "브랜드",
      "고객 확보"
    ],
    product_planning: [
      "prd",
      "기능",
      "제품",
      "기획",
      "요구사항",
      "유저스토리",
      "사용자 스토리",
      "로드맵",
      "스펙",
      "릴리즈",
      "mvp"
    ],
    research: [
      "조사",
      "리서치",
      "분석",
      "비교",
      "경쟁사",
      "시장",
      "트렌드",
      "자료",
      "벤치마크",
      "보고서"
    ],
    writing_email: [
      "메일",
      "이메일",
      "답장",
      "제안서",
      "메시지",
      "dm",
      "연락",
      "팔로업",
      "업데이트"
    ],
    personal_prioritization: [
      "뭘",
      "뭐부터",
      "우선순위",
      "정리",
      "오늘",
      "해야",
      "할지",
      "너무 많",
      "모르겠",
      "계획 세워",
      "일이"
    ]
  };

  const DOMAIN_KEYWORD_SIGNALS = {
    marketing_strategy: {
      strong: ["마케팅", "전환율", "유저 획득", "캠페인", "GTM", "gtm", "그로스"],
      weak: ["전략", "런칭", "브랜드", "시장 진입", "광고"]
    },
    product_planning: {
      strong: ["PRD", "prd", "기능", "요구사항", "사용자 시나리오", "유저 스토리"],
      weak: ["제품", "기획", "로드맵", "스펙", "릴리즈", "MVP", "mvp"]
    },
    research: {
      strong: ["경쟁사", "시장 조사", "리서치", "트렌드"],
      weak: ["조사", "비교", "분석", "자료", "벤치마크", "근거"]
    },
    writing_email: {
      strong: ["메일", "이메일", "답장", "DM", "dm", "메시지"],
      weak: ["연락", "제안서", "업데이트", "카피", "문서 작성"]
    },
    personal_prioritization: {
      strong: ["뭐부터", "우선순위", "할 게 많", "할 일이 많", "오늘 할 일", "이번 주 우선순위", "모르겠어", "정신없"],
      weak: ["정리", "계획"]
    }
  };

  const BROAD_TERMS = [
    "전략",
    "계획",
    "정리",
    "분석",
    "추천",
    "개선",
    "기획",
    "prd",
    "보고",
    "보고서",
    "메일",
    "아이디어",
    "우선순위",
    "짜줘",
    "만들어줘",
    "도와줘"
  ];

  const SIMPLE_PATTERNS = [
    /^(안녕|안녕하세요|hi|hello|hey)[.!?\s]*$/i,
    /^(고마워|감사|thanks|thank you)[.!?\s]*$/i,
    /^(번역|translate)\s*(해줘|해주세요|please)?[.!?\s]*$/i,
    /^(요약|summarize)\s*(해줘|해주세요|please)?[.!?\s]*$/i,
    /^(맞춤법|오탈자|문법|grammar|spell(?:ing)?)\s*(검사|고쳐|수정|확인)?\s*(해줘|해주세요)?[.!?\s]*$/i
  ];

  const QUESTION_TEMPLATES = {
    marketing_strategy: [
      {
        slot: "goal",
        label: "목표가 무엇인가요?",
        options: [
          "신규 유저 획득",
          "유료 전환율 개선",
          "기존 유저 재방문",
          "투자자 보고용 정리",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "원하는 결과물 형식은?",
        options: [
          "실행 체크리스트",
          "1페이지 전략 문서",
          "광고 캠페인 아이디어",
          "시장/경쟁 분석 포함 보고서",
          RECOMMEND_OPTION
        ]
      }
    ],
    product_planning: [
      {
        slot: "goal",
        label: "PRD의 목적은 무엇인가요?",
        options: [
          "바로 개발 착수",
          "팀 리더 보고",
          "고객 문제 정의",
          "실험/검증 계획",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "포함할 범위는?",
        options: [
          "문제 정의와 목표",
          "사용자 시나리오",
          "요구사항과 우선순위",
          "성공 지표와 릴리즈 계획",
          RECOMMEND_OPTION
        ]
      }
    ],
    research: [
      {
        slot: "goal",
        label: "리서치의 목적은 무엇인가요?",
        options: [
          "빠른 의사결정",
          "시장/경쟁 이해",
          "보고서 작성",
          "아이디어 발굴",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "결과물 형식은?",
        options: [
          "핵심 요약",
          "비교표",
          "상세 보고서",
          "실행 인사이트 목록",
          RECOMMEND_OPTION
        ]
      }
    ],
    writing_email: [
      {
        slot: "goal",
        label: "이 메시지의 목적은 무엇인가요?",
        options: [
          "업데이트",
          "요청",
          "거절/조율",
          "관계 유지",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "tone",
        label: "원하는 톤은?",
        options: [
          "정중하고 간결하게",
          "친근하게",
          "단호하지만 부드럽게",
          "전문적으로",
          RECOMMEND_OPTION
        ]
      }
    ],
    personal_prioritization: [
      {
        slot: "goal",
        label: "지금 원하는 도움은 무엇에 가까운가요?",
        options: [
          "해야 할 일 우선순위 정리",
          "감정/생각 정리",
          "오늘 실행할 계획 만들기",
          "장기 목표 다시 정리하기",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "원하는 답변 방식은?",
        options: [
          "부담을 줄이는 짧은 정리",
          "중요도/긴급도 분류",
          "오늘 할 일 3개 추천",
          "단계별 실행 계획",
          RECOMMEND_OPTION
        ]
      }
    ],
    generic: [
      {
        slot: "goal",
        label: "원하는 도움은 무엇인가요?",
        options: [
          "아이디어 얻기",
          "실행 계획 만들기",
          "내용을 정리하기",
          "더 나은 의사결정하기",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "답변 형식은?",
        options: [
          "짧은 요약",
          "단계별 설명",
          "체크리스트",
          "표로 정리",
          RECOMMEND_OPTION
        ]
      }
    ]
  };

  const DEFAULTS = {
    marketing_strategy: {
      goal: "신규 유저 획득",
      output_format: "1페이지 전략 문서"
    },
    product_planning: {
      goal: "바로 개발 착수",
      output_format: "문제 정의와 목표"
    },
    research: {
      goal: "빠른 의사결정",
      output_format: "비교표"
    },
    writing_email: {
      goal: "요청",
      output_format: "제목과 본문 초안",
      tone: "정중하고 간결하게"
    },
    personal_prioritization: {
      goal: "해야 할 일 우선순위 정리",
      output_format: "오늘 할 일 3개 추천"
    },
    generic: {
      goal: "내용을 정리하기",
      output_format: "단계별 설명"
    }
  };

  const ROLES = {
    marketing_strategy: "B2B SaaS 그로스 전략가",
    product_planning: "시니어 프로덕트 매니저",
    research: "전략 리서처이자 시장 분석가",
    writing_email: "비즈니스 커뮤니케이션 코치",
    personal_prioritization: "생산성 코치이자 우선순위 정리 도우미",
    generic: "사용자의 의도를 명확히 정리해주는 AI 어시스턴트"
  };

  const INCLUDE_ITEMS = {
    marketing_strategy: [
      "핵심 전략 요약",
      "우선순위가 높은 채널",
      "구체적인 실행 방법",
      "필요 리소스",
      "성공 지표",
      "4주 실행 계획"
    ],
    product_planning: [
      "문제 정의",
      "목표 사용자",
      "핵심 요구사항",
      "우선순위",
      "성공 지표",
      "릴리즈 전 확인할 리스크"
    ],
    research: [
      "핵심 결론",
      "비교 기준",
      "근거와 가정",
      "의사결정에 필요한 시사점",
      "다음 확인 질문"
    ],
    writing_email: [
      "제목 제안",
      "핵심 메시지",
      "상대가 바로 이해할 맥락",
      "명확한 요청 또는 다음 액션",
      "불필요한 장황함 제거"
    ],
    personal_prioritization: [
      "현재 상황 요약",
      "중요도와 긴급도 기준",
      "오늘 먼저 할 일",
      "미룰 일",
      "부담을 줄이는 다음 행동"
    ],
    generic: [
      "핵심 요약",
      "구체적인 실행 방법",
      "우선순위",
      "필요하면 표 또는 체크리스트",
      "다음 액션"
    ]
  };

  const TASK_QUESTION_TEMPLATES = {
    "brief.plan": [
      {
        slot: "goal",
        label: "가장 중요한 목표는?",
        options: [
          "목적과 구조 정리",
          "실행 순서 만들기",
          "필요한 항목 빠짐없이 정리",
          "의사결정/진행을 돕기",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "원하는 결과물 형식은?",
        options: [
          "간단한 초안",
          "단계별 구조",
          "체크리스트 포함",
          "1페이지 문서",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.analyze": [
      {
        slot: "goal",
        label: "분석의 목적은?",
        options: [
          "빠른 의사결정",
          "경쟁 구도 파악",
          "문제 원인 진단",
          "장단점 비교",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "analysis_method",
        label: "원하는 분석 방식은?",
        options: [
          "비교표",
          "핵심 요약",
          "장단점/리스크",
          "실행 인사이트",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.write": [
      {
        slot: "goal",
        label: "메시지의 목적은?",
        options: [
          "설득",
          "요청",
          "업데이트 공유",
          "거절/조율",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "tone",
        label: "원하는 톤은?",
        options: [
          "정중하고 간결하게",
          "친근하게",
          "단호하지만 부드럽게",
          "전문적으로",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.decide": [
      {
        slot: "goal",
        label: "지금 필요한 것은?",
        options: [
          "우선순위 정리",
          "선택지 비교",
          "리스크 판단",
          "오늘 할 일 결정",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "decision_criteria",
        label: "판단 기준은?",
        options: [
          "효과",
          "속도",
          "비용/리소스",
          "리스크",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.research": [
      {
        slot: "goal",
        label: "리서치의 목적은?",
        options: [
          "시장 흐름 파악",
          "근거 자료 정리",
          "트렌드 이해",
          "보고서 작성",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "원하는 정리 방식은?",
        options: [
          "핵심 요약",
          "근거 중심 정리",
          "비교표",
          "확인 필요 항목 포함",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.create": [
      {
        slot: "goal",
        label: "어떤 아이디어가 필요한가요?",
        options: [
          "캠페인 아이디어",
          "기능 아이디어",
          "이름/슬로건",
          "콘텐츠 아이디어",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "아이디어를 어떻게 받고 싶나요?",
        options: [
          "짧은 후보 목록",
          "추천 순위 포함",
          "장단점 포함",
          "바로 실행 가능한 안",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.extract": [
      {
        slot: "goal",
        label: "어떻게 구조화할까요?",
        options: [
          "핵심 요약",
          "표로 정리",
          "체크리스트",
          "액션 아이템 추출",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "원하는 결과 형식은?",
        options: [
          "짧은 요약",
          "섹션별 정리",
          "표",
          "다음 액션 목록",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.generic": [
      {
        slot: "goal",
        label: "원하는 도움은?",
        options: [
          "내용 정리",
          "실행 계획",
          "아이디어 얻기",
          "의사결정",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "답변 형식은?",
        options: [
          "단계별 설명",
          "체크리스트",
          "표",
          "짧은 요약",
          RECOMMEND_OPTION
        ]
      }
    ]
  };

  const COMBO_QUESTION_TEMPLATES = {
    "brief.plan:product_planning": [
      {
        slot: "goal",
        label: "PRD의 목적은?",
        options: [
          "내부 개발 착수용",
          "리더십 리뷰용",
          "고객 문제 정의용",
          "실험/검증 계획용",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "scope",
        label: "포함할 범위는?",
        options: [
          "문제 정의와 목표",
          "사용자 시나리오",
          "요구사항과 우선순위",
          "성공 지표와 릴리즈 계획",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.plan:marketing_strategy": [
      {
        slot: "goal",
        label: "마케팅 전략의 목표는?",
        options: [
          "신규 유저 획득",
          "유료 전환율 개선",
          "기존 유저 재방문",
          "보고용 전략 정리",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "output_format",
        label: "원하는 결과물 형식은?",
        options: [
          "1페이지 전략 문서",
          "4주 실행 계획",
          "실행 체크리스트",
          "캠페인 아이디어",
          RECOMMEND_OPTION
        ]
      }
    ],
    "brief.write:writing_email": [
      {
        slot: "goal",
        label: "메시지의 목적은?",
        options: [
          "안내/공유",
          "요청",
          "설득",
          "거절/조율",
          RECOMMEND_OPTION
        ]
      },
      {
        slot: "tone",
        label: "원하는 톤은?",
        options: [
          "정중하고 간결하게",
          "친근하게",
          "단호하지만 부드럽게",
          "전문적으로",
          RECOMMEND_OPTION
        ]
      }
    ]
  };

  const INTENT_QUESTION_TEMPLATES = {
    launch_plan: [
      {
        slot: "launch_subject",
        label: "무엇을 런칭하나요?",
        options: ["제품/기능", "마케팅 캠페인", "이벤트/프로그램", "내부 프로젝트", RECOMMEND_OPTION]
      },
      {
        slot: "launch_plan_focus",
        label: "런칭 계획에서 가장 중요한 기준은?",
        options: ["일정과 마일스톤", "채널/홍보 전략", "준비 체크리스트", "성공 지표", RECOMMEND_OPTION]
      }
    ],
    prd_feature: [
      {
        slot: "feature_problem",
        label: "어떤 기능/문제를 다루나요?",
        options: ["새 기능 아이디어 구체화", "고객 문제 정의", "기존 기능 개선", "실험/검증용 기능", RECOMMEND_OPTION]
      },
      {
        slot: "prd_scope",
        label: "PRD에 꼭 포함할 범위는?",
        options: ["문제 정의와 목표", "사용자 시나리오", "요구사항과 우선순위", "성공 지표와 릴리즈 계획", RECOMMEND_OPTION]
      }
    ],
    competitor_analysis: [
      {
        slot: "competitor_scope",
        label: "분석할 범위는?",
        options: ["같은 카테고리의 주요 서비스", "특정 경쟁사 2~3곳", "가격/기능 비교", "포지셔닝/마케팅 비교", RECOMMEND_OPTION]
      },
      {
        slot: "comparison_dimensions",
        label: "가장 중요한 분석 기준은?",
        options: ["기능/제품", "가격/수익모델", "타깃 고객/포지셔닝", "마케팅/채널", RECOMMEND_OPTION]
      }
    ],
    conversion_diagnosis: [
      {
        slot: "funnel_stage",
        label: "어느 전환 단계가 문제인가요?",
        options: ["방문 → 가입", "가입 → 활성화", "무료 → 유료", "결제 → 재구매/유지", RECOMMEND_OPTION]
      },
      {
        slot: "diagnosis_method",
        label: "어떤 방식으로 진단할까요?",
        options: ["원인 가설 트리", "퍼널별 체크리스트", "실험 아이디어", "데이터 확인 항목", RECOMMEND_OPTION]
      }
    ],
    ab_comparison: [
      {
        slot: "option_details",
        label: "A안과 B안은 무엇을 비교하는 건가요?",
        options: ["A/B 설명을 먼저 요청", "제품/기능 선택", "마케팅/채널 선택", "가격/비즈니스 모델 선택", RECOMMEND_OPTION]
      },
      {
        slot: "decision_criteria",
        label: "가장 중요한 판단 기준은?",
        options: ["효과", "비용/리소스", "실행 속도", "리스크", RECOMMEND_OPTION]
      }
    ],
    idea_pros_cons: [
      {
        slot: "artifact_topic",
        label: "어떤 아이디어를 분석하나요?",
        options: ["아이디어 설명을 먼저 요청", "제품/기능 아이디어", "마케팅/콘텐츠 아이디어", "사업/수익모델 아이디어", RECOMMEND_OPTION]
      },
      {
        slot: "comparison_dimensions",
        label: "가장 중요한 분석 기준은?",
        options: ["실행 가능성", "사용자 가치", "비용/리소스", "리스크", RECOMMEND_OPTION]
      }
    ],
    naming_ideas: [
      {
        slot: "naming_context",
        label: "어떤 서비스 이름인가요?",
        options: ["소비자 앱", "B2B SaaS", "커뮤니티/콘텐츠", "내부 도구/프로젝트", RECOMMEND_OPTION]
      },
      {
        slot: "naming_style",
        label: "원하는 네이밍 스타일은?",
        options: ["짧고 기억하기 쉽게", "전문적이고 신뢰감 있게", "친근하고 캐주얼하게", "글로벌/영문 느낌으로", RECOMMEND_OPTION]
      }
    ],
    campaign_ideas: [
      {
        slot: "campaign_audience",
        label: "캠페인의 대상은?",
        options: ["신규 고객", "기존 고객", "잠재 리드", "커뮤니티/팔로워", RECOMMEND_OPTION]
      },
      {
        slot: "campaign_objective",
        label: "캠페인의 목적은?",
        options: ["인지도 높이기", "가입/참여 유도", "구매/전환 유도", "재방문/리텐션", RECOMMEND_OPTION]
      }
    ],
    trend_research: [
      {
        slot: "research_timeframe",
        label: "어느 기간의 트렌드를 볼까요?",
        options: ["최근 3개월", "최근 6개월", "최근 1년", "최근 출시/랭킹 중심", RECOMMEND_OPTION]
      },
      {
        slot: "source_preference",
        label: "어떤 자료 기준이 좋나요?",
        options: ["공식 스토어/제품 자료", "제품 출시/리뷰 사이트", "업계 리포트/기사", "사용자 리뷰/커뮤니티", RECOMMEND_OPTION]
      }
    ],
    market_research: [
      {
        slot: "market_scope",
        label: "시장 조사의 범위는?",
        options: ["글로벌 시장", "국내 시장", "주요 고객 세그먼트", "경쟁 제품/카테고리", RECOMMEND_OPTION]
      },
      {
        slot: "source_preference",
        label: "어떤 자료 기준이 좋나요?",
        options: ["검증된 근거 중심", "최근 트렌드 중심", "경쟁 제품 비교 중심", "실무 인사이트 중심", RECOMMEND_OPTION]
      }
    ]
  };

  const ARTIFACT_QUESTION_TEMPLATES = {
    sales_script: [
      { slot: "target_customer", label: "대상 고객은 누구인가요?", options: ["초기 스타트업/소규모 팀", "SMB 의사결정자", "엔터프라이즈 담당자", "기존 리드/문의 고객", RECOMMEND_OPTION] },
      { slot: "meeting_goal", label: "콜의 가장 중요한 목적은 무엇인가요?", options: ["니즈 파악", "제품 가치 설명", "의사결정자 설득", "다음 단계 합의", RECOMMEND_OPTION] }
    ],
    cold_email: [
      { slot: "target_customer", label: "대상 고객은 누구인가요?", options: ["초기 스타트업/소규모 팀", "SMB 의사결정자", "엔터프라이즈 담당자", "기존 리드/문의 고객", RECOMMEND_OPTION] },
      { slot: "sales_context", label: "무엇을 제안하는 메일인가요?", options: ["문제 해결 제안", "제품 데모 제안", "자료/사례 공유", "제휴/협업 제안", RECOMMEND_OPTION] }
    ],
    follow_up_email: [
      { slot: "previous_touchpoint", label: "어떤 접점 이후의 후속 메일인가요?", options: ["이전 미팅/콜 이후", "데모 이후", "제안서 전달 이후", "자료 공유 이후", RECOMMEND_OPTION] },
      { slot: "sales_cta", label: "상대에게 유도할 다음 액션은 무엇인가요?", options: ["답장 유도", "데모 미팅 예약", "제안서/자료 확인", "내부 공유/검토 요청", RECOMMEND_OPTION] }
    ],
    demo_agenda: [
      { slot: "meeting_goal", label: "미팅의 가장 중요한 목적은 무엇인가요?", options: ["니즈 파악", "제품 가치 설명", "의사결정자 설득", "다음 단계 합의", RECOMMEND_OPTION] },
      { slot: "sales_stage", label: "현재 영업 단계는 어디에 가까운가요?", options: ["첫 접촉", "데모/미팅 전", "제안서 전달", "협상/클로징", RECOMMEND_OPTION] }
    ],
    objections_analysis: [
      { slot: "objection_type", label: "주로 다룰 objection은 무엇인가요?", options: ["주요 objections 전체", "가격이 비싸다", "필요성을 못 느낀다", "도입 리스크가 걱정된다", RECOMMEND_OPTION] },
      { slot: "target_customer", label: "대상 고객은 누구인가요?", options: ["초기 스타트업/소규모 팀", "SMB 의사결정자", "엔터프라이즈 담당자", "기존 리드/문의 고객", RECOMMEND_OPTION] }
    ],
    sales_collateral: [
      { slot: "target_customer", label: "대상 고객은 누구인가요?", options: ["초기 스타트업/소규모 팀", "SMB 의사결정자", "엔터프라이즈 담당자", "기존 리드/문의 고객", RECOMMEND_OPTION] },
      { slot: "sales_context", label: "자료에서 가장 먼저 설명할 맥락은?", options: ["핵심 문제와 해결", "주요 기능/장점", "고객 사례/성과", "도입 효과/ROI", RECOMMEND_OPTION] }
    ],
    negotiation_reply: [
      { slot: "objection_type", label: "주로 다룰 objection은 무엇인가요?", options: ["가격이 비싸다", "필요성을 못 느낀다", "기존 솔루션이 있다", "도입 리스크가 걱정된다", RECOMMEND_OPTION] },
      { slot: "negotiation_boundary", label: "협상에서 지킬 기준은 무엇인가요?", options: ["할인 없이 가치 설명", "조건부 할인 가능", "대안 패키지 제안", "내부 검토 후 답변", RECOMMEND_OPTION] }
    ],
    job_posting: [
      { slot: "role_type", label: "어떤 역할을 채용하려는 공고인가요?", options: ["개발자", "마케터", "디자이너", "운영/CS", RECOMMEND_OPTION] },
      { slot: "emphasis", label: "공고에서 가장 강조할 점은?", options: ["직무 요건 명확화", "회사/팀 매력 전달", "빠른 지원 유도", "시니어 후보자 설득", RECOMMEND_OPTION] }
    ],
    meeting_agenda: [
      { slot: "artifact_topic", label: "회의 주제/상황은 무엇인가요?", options: ["프로젝트 진행 상황", "문제 해결 회의", "아이디어/기획 논의", "의사결정 회의", RECOMMEND_OPTION] },
      { slot: "agenda_format", label: "원하는 아젠다 형식은?", options: ["30분 회의 아젠다", "항목별 시간 배분", "논의 질문 포함", "액션아이템/담당자 포함", RECOMMEND_OPTION] }
    ],
    question_set: [
      { slot: "question_purpose", label: "질문의 목적은 무엇인가요?", options: ["문제 검증", "만족도/불만 파악", "사용성 피드백", "회고/학습 도출", RECOMMEND_OPTION] },
      { slot: "question_format", label: "질문 형식은?", options: ["핵심 질문 10개", "개방형 질문", "질문 + 후속 질문", "진행자 가이드 포함", RECOMMEND_OPTION] }
    ],
    survey_questions: [
      { slot: "artifact_topic", label: "설문 주제는 무엇인가요?", options: ["고객 만족도", "제품 사용성", "시장/수요 확인", "내부 구성원 의견", RECOMMEND_OPTION] },
      { slot: "question_format", label: "질문 형식은?", options: ["핵심 질문 10개", "개방형 질문", "질문 + 후속 질문", "진행자 가이드 포함", RECOMMEND_OPTION] }
    ],
    retrospective_questions: [
      { slot: "question_purpose", label: "질문의 목적은 무엇인가요?", options: ["문제 검증", "만족도/불만 파악", "사용성 피드백", "회고/학습 도출", RECOMMEND_OPTION] },
      { slot: "question_format", label: "질문 형식은?", options: ["핵심 질문 10개", "개방형 질문", "질문 + 후속 질문", "진행자 가이드 포함", RECOMMEND_OPTION] }
    ],
    presentation_outline: [
      { slot: "artifact_topic", label: "발표 주제는 무엇인가요?", options: ["제품/서비스 소개", "프로젝트 결과 공유", "문제/해결안 제안", "교육/설명", RECOMMEND_OPTION] },
      { slot: "outline_format", label: "원하는 구조는?", options: ["5분 발표 구조", "10분 발표 구조", "슬라이드 목차", "발표 스크립트 포함", RECOMMEND_OPTION] }
    ],
    curriculum: [
      { slot: "artifact_topic", label: "강의 주제는 무엇인가요?", options: ["업무/실무 교육", "제품/서비스 교육", "기술/도구 교육", "입문 개념 교육", RECOMMEND_OPTION] },
      { slot: "learning_audience", label: "학습 대상은 누구인가요?", options: ["입문자", "실무자", "내부 팀원", "고객/사용자", RECOMMEND_OPTION] }
    ],
    manual_or_playbook: [
      { slot: "manual_purpose", label: "매뉴얼의 목적은 무엇인가요?", options: ["일관된 응대", "신규 담당자 교육", "예외 상황 처리", "품질 기준 정리", RECOMMEND_OPTION] },
      { slot: "manual_scope", label: "포함할 범위는?", options: ["기본 절차", "상황별 스크립트", "체크리스트", "escalation 기준", RECOMMEND_OPTION] }
    ],
    onboarding_doc: [
      { slot: "onboarding_audience", label: "누구를 위한 온보딩인가요?", options: ["신규 직원", "신규 고객", "신규 사용자", "파트너/외부 협업자", RECOMMEND_OPTION] },
      { slot: "onboarding_format", label: "원하는 형식은?", options: ["첫날 체크리스트", "1주 온보딩 플랜", "단계별 가이드", "필요한 자료 목록 포함", RECOMMEND_OPTION] }
    ],
    content_plan: [
      { slot: "artifact_topic", label: "영상/콘텐츠 주제는 무엇인가요?", options: ["제품/서비스 소개", "사용법/교육", "브랜드 스토리", "트렌드/인사이트", RECOMMEND_OPTION] },
      { slot: "content_output", label: "원하는 결과물은?", options: ["기획안 구조", "영상 흐름", "제목/훅 아이디어 포함", "촬영/편집 체크리스트 포함", RECOMMEND_OPTION] }
    ],
    blog_outline: [
      { slot: "artifact_topic", label: "글의 주제는 무엇인가요?", options: ["제품/서비스 설명", "문제 해결 가이드", "트렌드/인사이트", "사례/경험 공유", RECOMMEND_OPTION] },
      { slot: "outline_format", label: "원하는 목차 수준은?", options: ["핵심 목차만", "H2/H3 구조", "섹션별 핵심 메시지 포함", "제목 후보 포함", RECOMMEND_OPTION] }
    ],
    handoff_doc: [
      { slot: "artifact_topic", label: "어떤 업무를 인수인계하나요?", options: ["운영 업무", "프로젝트 진행 업무", "고객/파트너 관리", "시스템/도구 관리", RECOMMEND_OPTION] },
      { slot: "handoff_format", label: "원하는 형식은?", options: ["체크리스트", "상세 문서", "표로 정리", "바로 실행할 TODO 포함", RECOMMEND_OPTION] }
    ],
    refund_reply: [
      { slot: "refund_status", label: "환불 요청은 어떤 상태인가요?", options: ["환불 가능/승인", "정책상 어려움", "검토 후 안내", "대안/크레딧 제안", RECOMMEND_OPTION] },
      { slot: "resolution_policy", label: "답변에서 가장 중요한 기준은?", options: ["정책 근거 명확화", "고객 상황 공감", "대안 제시", "내부 확인 후 안내", RECOMMEND_OPTION] }
    ],
    outage_notice: [
      { slot: "outage_status", label: "장애/점검의 현재 상태는?", options: ["예정된 점검/중단", "조사 중", "복구 중", "우회 방법 있음", RECOMMEND_OPTION] },
      { slot: "outage_impact", label: "영향 범위는 어디까지인가요?", options: ["전체 서비스 영향", "일부 기능 영향", "특정 고객/지역 영향", "영향 범위 확인 중", RECOMMEND_OPTION] }
    ],
    churn_save_reply: [
      { slot: "churn_reason", label: "해지 사유는 무엇에 가까운가요?", options: ["해지 사유 확인", "가격/비용 부담", "기능 부족", "성과 미흡", RECOMMEND_OPTION] },
      { slot: "retention_boundary", label: "답변의 리텐션 기준은?", options: ["공감 후 사유 확인", "대안/플랜 제안", "사용법/성과 지원", "무리한 설득 없이 종료 지원", RECOMMEND_OPTION] }
    ],
    vip_complaint_reply: [
      { slot: "escalation_level", label: "클레임의 심각도는?", options: ["긴급 장애/업무 영향", "계약/보상 이슈", "반복 불만/중요 고객", "담당자 대응 불만", RECOMMEND_OPTION] },
      { slot: "ownership_model", label: "응대에서 가장 중요한 오너십은?", options: ["담당자 지정", "관리자/리더 개입", "해결 일정 공유", "재발 방지 약속", RECOMMEND_OPTION] }
    ],
    customer_success_checkin: [
      { slot: "checkin_purpose", label: "체크인의 목적은 무엇인가요?", options: ["사용 현황 확인", "성과/목표 점검", "문제 조기 발견", "업셀/확장 탐색", RECOMMEND_OPTION] },
      { slot: "customer_stage", label: "고객 상태는 어디에 가깝나요?", options: ["온보딩 직후", "활성 사용 중", "이탈 위험", "갱신 전", RECOMMEND_OPTION] }
    ],
    support_faq: [
      { slot: "faq_topic", label: "FAQ에 사용할 문의 범위는?", options: ["기존 문의 목록 기반", "제품 사용법/온보딩", "결제/환불", "문제 해결/장애", RECOMMEND_OPTION] },
      { slot: "faq_format", label: "Q&A를 어떤 형태로 정리할까요?", options: ["카테고리별 Q&A", "질문-짧은 답변 목록", "답변 + 추가 안내", "고객용 도움말 문서", RECOMMEND_OPTION] }
    ],
    refund_policy_manual: [
      { slot: "refund_policy_scope", label: "환불 정책 매뉴얼에서 가장 중요한 범위는?", options: ["환불 가능/불가 기준", "예외/승인 절차", "상황별 응대 스크립트", "escalation 기준", RECOMMEND_OPTION] },
      { slot: "manual_scope", label: "매뉴얼 형식은 어떻게 구성할까요?", options: ["기본 절차", "상황별 스크립트", "체크리스트", "escalation 기준", RECOMMEND_OPTION] }
    ],
    complaint_reply: [
      { slot: "artifact_topic", label: "고객 불만의 핵심 내용은 무엇인가요?", options: ["서비스 장애/오류", "가격/정책 불만", "배송/일정 지연", "응대 경험 불만", RECOMMEND_OPTION] },
      { slot: "tone", label: "원하는 톤은?", options: ["정중하고 공감 있게", "단호하지만 부드럽게", "짧고 명확하게", "신뢰 회복 중심", RECOMMEND_OPTION] }
    ],
    proposal_outline: [
      { slot: "proposal_goal", label: "제안서의 목적은 무엇인가요?", options: ["신규 계약 설득", "제휴 구조 제안", "내부 승인 지원", "문제 해결안 제시", RECOMMEND_OPTION] },
      { slot: "proposal_context", label: "제안할 내용은 무엇에 가깝나요?", options: ["제품/서비스 도입", "제휴/협업 구조", "고객 문제 해결안", "가격/계약 조건", RECOMMEND_OPTION] }
    ],
    generic_outline: [
      { slot: "outline_purpose", label: "구조를 잡는 목적은 무엇인가요?", options: ["설득", "정보 정리", "실행 계획", "의사결정 지원", RECOMMEND_OPTION] },
      { slot: "outline_format", label: "원하는 구조는?", options: ["핵심 목차", "단계별 구조", "체크리스트 포함", "1페이지 문서", RECOMMEND_OPTION] }
    ],
    generic_document: [
      { slot: "document_purpose", label: "문서의 목적은 무엇인가요?", options: ["정보 공유", "설득", "업무 정리", "실행 안내", RECOMMEND_OPTION] },
      { slot: "document_format", label: "원하는 형식은?", options: ["간단한 초안", "상세 문서", "목차 먼저", "체크리스트 포함", RECOMMEND_OPTION] }
    ]
  };

  const ARTIFACT_DEFAULT_OUTPUT_FORMATS = {
    sales_script: "세일즈 콜 스크립트",
    cold_email: "콜드메일 초안",
    follow_up_email: "영업 후속 메일",
    demo_agenda: "데모 미팅 아젠다",
    objections_analysis: "objection 대응 정리",
    sales_collateral: "세일즈 자료",
    negotiation_reply: "가격 협상 대응 문구",
    job_posting: "채용 공고 초안",
    meeting_agenda: "회의 아젠다",
    question_set: "질문 목록",
    survey_questions: "설문 문항 목록",
    retrospective_questions: "회고 질문 목록",
    presentation_outline: "발표 구조",
    curriculum: "커리큘럼 초안",
    manual_or_playbook: "매뉴얼/플레이북",
    onboarding_doc: "온보딩 문서",
    content_plan: "콘텐츠 기획안",
    blog_outline: "블로그 목차",
    handoff_doc: "인수인계 문서",
    refund_reply: "환불 요청 고객 답변",
    outage_notice: "서비스 장애 공지",
    churn_save_reply: "해지 고객 답변",
    vip_complaint_reply: "VIP 클레임 대응 초안",
    customer_success_checkin: "고객 성공 체크인 메일",
    support_faq: "고객 지원 FAQ",
    refund_policy_manual: "환불 정책 CS 응대 매뉴얼",
    complaint_reply: "고객 불만 답변 초안",
    proposal_outline: "제안서 구조",
    generic_outline: "구조 초안",
    generic_document: "문서 초안"
  };

  const ARTIFACT_TASK_TYPES = {
    sales_script: "brief.write",
    cold_email: "brief.write",
    follow_up_email: "brief.write",
    demo_agenda: "brief.plan",
    objections_analysis: "brief.analyze",
    sales_collateral: "brief.plan",
    negotiation_reply: "brief.write",
    job_posting: "brief.write",
    meeting_agenda: "brief.plan",
    question_set: "brief.create",
    survey_questions: "brief.create",
    retrospective_questions: "brief.create",
    presentation_outline: "brief.plan",
    curriculum: "brief.plan",
    manual_or_playbook: "brief.plan",
    onboarding_doc: "brief.plan",
    content_plan: "brief.plan",
    blog_outline: "brief.write",
    handoff_doc: "brief.write",
    refund_reply: "brief.write",
    outage_notice: "brief.write",
    churn_save_reply: "brief.write",
    vip_complaint_reply: "brief.write",
    customer_success_checkin: "brief.write",
    support_faq: "brief.write",
    refund_policy_manual: "brief.plan",
    complaint_reply: "brief.write",
    proposal_outline: "brief.plan",
    generic_outline: "brief.plan",
    generic_document: "brief.write"
  };

  const SLOT_ONTOLOGY = {
    goal: {
      label: "목표",
      genericQuestion: "이 작업의 가장 중요한 목적은 무엇인가요?",
      options: ["실행 계획 만들기", "의사결정 돕기", "내용을 명확히 정리하기", "설득력 높이기", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 1,
        "brief.analyze": 1,
        "brief.write": 3,
        "brief.research": 1,
        "brief.decide": 2,
        "brief.create": 1,
        "brief.extract": 3,
        "brief.generic": 1
      }
    },
    audience: {
      label: "대상",
      genericQuestion: "누가 읽거나 사용하게 되나요?",
      options: ["고객", "팀 내부", "리더십/임원", "일반 사용자", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 2,
        "brief.write": 1,
        "brief.research": 3,
        "brief.create": 4,
        "brief.generic": 2
      }
    },
    context: {
      label: "맥락",
      genericQuestion: "어떤 상황을 전제로 하면 좋을까요?",
      options: ["초기 아이디어 단계", "실행 직전", "문제 해결 중", "보고/공유 목적", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 4,
        "brief.analyze": 3,
        "brief.write": 4,
        "brief.generic": 4
      }
    },
    output_format: {
      label: "출력 형식",
      genericQuestion: "원하는 결과물 형식은?",
      options: ["짧은 요약", "단계별 설명", "체크리스트", "표로 정리", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 2,
        "brief.analyze": 2,
        "brief.write": 3,
        "brief.research": 2,
        "brief.decide": 4,
        "brief.create": 2,
        "brief.extract": 1,
        "brief.generic": 2
      }
    },
    scope: {
      label: "범위",
      genericQuestion: "어느 정도 범위로 다루면 좋을까요?",
      options: ["바로 실행 가능한 수준", "1페이지로 정리", "4주 실행 계획", "전체 구조 잡기", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 2,
        "brief.write": 2,
        "brief.research": 4,
        "brief.generic": 3
      }
    },
    depth: {
      label: "깊이",
      genericQuestion: "답변의 깊이는 어느 정도가 좋나요?",
      options: ["핵심만 짧게", "실무자가 바로 쓸 정도", "근거와 리스크 포함", "상세 문서 수준", RECOMMEND_OPTION],
      priority: {
        "brief.analyze": 3,
        "brief.research": 3,
        "brief.extract": 2,
        "brief.generic": 4
      }
    },
    tone: {
      label: "톤",
      genericQuestion: "원하는 톤은?",
      options: ["정중하고 간결하게", "친근하게", "단호하지만 부드럽게", "전문적으로", RECOMMEND_OPTION],
      priority: {
        "brief.write": 2,
        "brief.generic": 5
      }
    },
    constraints: {
      label: "제약",
      genericQuestion: "반드시 지켜야 할 제약이 있나요?",
      options: ["짧고 간결하게", "실행 가능한 내용만", "리스크도 함께", "확인 필요한 부분 분리", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 5,
        "brief.write": 5,
        "brief.generic": 5
      }
    },
    timeframe: {
      label: "기간",
      genericQuestion: "언제 실행하거나 사용할 계획인가요?",
      options: ["오늘", "이번 주", "다음 달", "4주 안에", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 3,
        "brief.decide": 3,
        "brief.generic": 4
      }
    },
    criteria: {
      label: "기준",
      genericQuestion: "어떤 기준으로 판단하면 좋을까요?",
      options: ["효과", "속도", "비용/리소스", "리스크", RECOMMEND_OPTION],
      priority: {
        "brief.analyze": 2,
        "brief.decide": 1,
        "brief.research": 4
      }
    },
    success_criteria: {
      label: "성공 기준",
      genericQuestion: "좋은 결과라고 판단할 기준은 무엇인가요?",
      options: ["명확한 다음 액션", "설득력", "실행 가능성", "측정 가능한 지표", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 4,
        "brief.create": 4,
        "brief.generic": 4
      }
    },
    input_source: {
      label: "입력 자료",
      genericQuestion: "어떤 자료를 기준으로 정리하면 좋을까요?",
      options: ["아래 내용", "현재 상황 설명", "외부 자료 요약", "가정 기반 초안", RECOMMEND_OPTION],
      priority: {
        "brief.extract": 2,
        "brief.research": 4
      }
    },
    assumptions_policy: {
      label: "가정 처리",
      genericQuestion: "정보가 부족한 부분은 어떻게 처리할까요?",
      options: ["합리적 가정 표시", "확인 필요로 분리", "질문 먼저 정리", "최소 가정으로 작성", RECOMMEND_OPTION],
      priority: {
        "brief.research": 5,
        "brief.analyze": 5,
        "brief.generic": 5
      }
    },
    quantity: {
      label: "분량",
      genericQuestion: "몇 개 정도 제시하면 좋을까요?",
      options: ["3개", "5개", "10개", "가능한 만큼", RECOMMEND_OPTION],
      priority: {
        "brief.create": 3,
        "brief.research": 5,
        "brief.generic": 5
      }
    },
    style: {
      label: "스타일",
      genericQuestion: "어떤 스타일이 좋을까요?",
      options: ["실무적으로", "간결하게", "창의적으로", "브랜드에 맞게", RECOMMEND_OPTION],
      priority: {
        "brief.create": 3,
        "brief.write": 4
      }
    },
    decision_options: {
      label: "선택지",
      genericQuestion: "어떤 선택지를 비교하면 되나요?",
      options: ["A와 B 비교", "여러 옵션 비교", "우선순위 정리", "추천안 하나 제시", RECOMMEND_OPTION],
      priority: {
        "brief.decide": 1
      }
    },
    analysis_target: {
      label: "분석 대상",
      genericQuestion: "무엇을 중심으로 분석하면 좋을까요?",
      options: ["문제 원인", "경쟁 구도", "장단점", "리스크", RECOMMEND_OPTION],
      priority: {
        "brief.analyze": 1,
        "brief.research": 3
      }
    },
    source_preference: {
      label: "자료 기준",
      genericQuestion: "어떤 자료 기준을 선호하나요?",
      options: ["검증된 근거 중심", "최근 트렌드 중심", "비교 사례 중심", "실무 인사이트 중심", RECOMMEND_OPTION],
      priority: {
        "brief.research": 3
      }
    },
    target_customer: {
      label: "대상 고객",
      genericQuestion: "대상 고객은 누구인가요?",
      options: ["초기 스타트업/소규모 팀", "SMB 의사결정자", "엔터프라이즈 담당자", "기존 리드/문의 고객", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1,
        "brief.plan": 1,
        "brief.analyze": 2
      }
    },
    sales_stage: {
      label: "영업 단계",
      genericQuestion: "현재 영업 단계는 어디에 가까운가요?",
      options: ["첫 접촉", "데모/미팅 전", "제안서 전달", "협상/클로징", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1,
        "brief.plan": 2
      }
    },
    sales_cta: {
      label: "다음 액션",
      genericQuestion: "상대에게 유도할 다음 액션은 무엇인가요?",
      options: ["답장 유도", "데모 미팅 예약", "제안서/자료 확인", "내부 공유/검토 요청", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1,
        "brief.plan": 2
      }
    },
    sales_context: {
      label: "제안 맥락",
      genericQuestion: "무엇을 제안하는 맥락인가요?",
      options: ["문제 해결 제안", "제품 데모 제안", "자료/사례 공유", "제휴/협업 제안", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1,
        "brief.plan": 1
      }
    },
    previous_touchpoint: {
      label: "이전 접점",
      genericQuestion: "어떤 접점 이후인가요?",
      options: ["이전 미팅/콜 이후", "데모 이후", "제안서 전달 이후", "자료 공유 이후", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    negotiation_boundary: {
      label: "협상 기준",
      genericQuestion: "협상에서 지킬 기준은 무엇인가요?",
      options: ["할인 없이 가치 설명", "조건부 할인 가능", "대안 패키지 제안", "내부 검토 후 답변", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    objection_type: {
      label: "objection 유형",
      genericQuestion: "주로 다룰 objection은 무엇인가요?",
      options: ["주요 objections 전체", "가격이 비싸다", "필요성을 못 느낀다", "도입 리스크가 걱정된다", RECOMMEND_OPTION],
      priority: {
        "brief.analyze": 1,
        "brief.write": 1
      }
    },
    meeting_goal: {
      label: "미팅 목적",
      genericQuestion: "미팅의 가장 중요한 목적은 무엇인가요?",
      options: ["니즈 파악", "제품 가치 설명", "의사결정자 설득", "다음 단계 합의", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 1,
        "brief.write": 2
      }
    },
    proposal_goal: {
      label: "제안서 목적",
      genericQuestion: "제안서의 목적은 무엇인가요?",
      options: ["신규 계약 설득", "제휴 구조 제안", "내부 승인 지원", "문제 해결안 제시", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 1,
        "brief.write": 2
      }
    },
    proposal_context: {
      label: "제안 내용",
      genericQuestion: "제안할 내용은 무엇에 가깝나요?",
      options: ["제품/서비스 도입", "제휴/협업 구조", "고객 문제 해결안", "가격/계약 조건", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 1,
        "brief.write": 1
      }
    },
    refund_status: {
      label: "환불 상태",
      genericQuestion: "환불 요청은 어떤 상태인가요?",
      options: ["환불 가능/승인", "정책상 어려움", "검토 후 안내", "대안/크레딧 제안", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    resolution_policy: {
      label: "해결 기준",
      genericQuestion: "답변에서 가장 중요한 기준은?",
      options: ["정책 근거 명확화", "고객 상황 공감", "대안 제시", "내부 확인 후 안내", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    outage_status: {
      label: "장애 상태",
      genericQuestion: "장애/점검의 현재 상태는?",
      options: ["예정된 점검/중단", "조사 중", "복구 중", "우회 방법 있음", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    outage_impact: {
      label: "영향 범위",
      genericQuestion: "영향 범위는 어디까지인가요?",
      options: ["전체 서비스 영향", "일부 기능 영향", "특정 고객/지역 영향", "영향 범위 확인 중", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    churn_reason: {
      label: "해지 사유",
      genericQuestion: "해지 사유는 무엇에 가까운가요?",
      options: ["해지 사유 확인", "가격/비용 부담", "기능 부족", "성과 미흡", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    retention_boundary: {
      label: "리텐션 기준",
      genericQuestion: "답변의 리텐션 기준은?",
      options: ["공감 후 사유 확인", "대안/플랜 제안", "사용법/성과 지원", "무리한 설득 없이 종료 지원", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    escalation_level: {
      label: "심각도",
      genericQuestion: "클레임의 심각도는?",
      options: ["긴급 장애/업무 영향", "계약/보상 이슈", "반복 불만/중요 고객", "담당자 대응 불만", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    ownership_model: {
      label: "오너십",
      genericQuestion: "응대에서 가장 중요한 오너십은?",
      options: ["담당자 지정", "관리자/리더 개입", "해결 일정 공유", "재발 방지 약속", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    checkin_purpose: {
      label: "체크인 목적",
      genericQuestion: "체크인의 목적은 무엇인가요?",
      options: ["사용 현황 확인", "성과/목표 점검", "문제 조기 발견", "업셀/확장 탐색", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    customer_stage: {
      label: "고객 상태",
      genericQuestion: "고객 상태는 어디에 가깝나요?",
      options: ["온보딩 직후", "활성 사용 중", "이탈 위험", "갱신 전", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    faq_topic: {
      label: "FAQ 범위",
      genericQuestion: "FAQ에 사용할 문의 범위는?",
      options: ["기존 문의 목록 기반", "제품 사용법/온보딩", "결제/환불", "문제 해결/장애", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    faq_format: {
      label: "FAQ 형식",
      genericQuestion: "Q&A를 어떤 형태로 정리할까요?",
      options: ["카테고리별 Q&A", "질문-짧은 답변 목록", "답변 + 추가 안내", "고객용 도움말 문서", RECOMMEND_OPTION],
      priority: {
        "brief.write": 1
      }
    },
    refund_policy_scope: {
      label: "환불 정책 범위",
      genericQuestion: "환불 정책 매뉴얼에서 가장 중요한 범위는?",
      options: ["환불 가능/불가 기준", "예외/승인 절차", "상황별 응대 스크립트", "escalation 기준", RECOMMEND_OPTION],
      priority: {
        "brief.plan": 1
      }
    },
    preserve: {
      label: "보존할 내용",
      genericQuestion: "원문에서 꼭 유지해야 할 것은 무엇인가요?",
      options: ["핵심 표현 유지", "숫자/제약 유지", "톤 유지", "구조만 바꾸기", RECOMMEND_OPTION],
      priority: {
        "brief.extract": 3,
        "brief.write": 5
      }
    }
  };

  const TASK_SLOT_PRIORITIES = {
    "brief.plan": ["goal", "output_format", "scope", "audience", "timeframe", "success_criteria", "constraints"],
    "brief.analyze": ["analysis_target", "goal", "criteria", "output_format", "depth", "assumptions_policy"],
    "brief.write": ["audience", "tone", "goal", "scope", "style", "constraints"],
    "brief.research": ["goal", "output_format", "source_preference", "analysis_target", "depth", "assumptions_policy"],
    "brief.decide": ["goal", "decision_criteria", "criteria", "timeframe", "output_format"],
    "brief.create": ["goal", "output_format", "quantity", "style", "audience", "success_criteria"],
    "brief.extract": ["output_format", "input_source", "depth", "preserve", "goal"],
    "brief.generic": ["goal", "output_format", "audience", "scope", "constraints"]
  };

  const TASK_DEFAULT_OUTPUT_FORMATS = {
    "brief.plan": "실행 계획과 다음 액션",
    "brief.analyze": "분석 기준과 핵심 인사이트",
    "brief.write": "바로 사용할 수 있는 초안",
    "brief.research": "핵심 요약과 확인 필요 항목",
    "brief.decide": "우선순위와 다음 액션",
    "brief.create": "후보 목록과 추천안",
    "brief.extract": "요청한 형식으로 구조화",
    "brief.generic": "목표, 맥락, 다음 액션"
  };

  const TASK_DEFAULTS = {
    "brief.plan": {
      goal: "목적과 구조 정리",
      output_format: "단계별 구조"
    },
    "brief.analyze": {
      goal: "빠른 의사결정",
      analysis_method: "비교표"
    },
    "brief.write": {
      goal: "업데이트 공유",
      tone: "정중하고 간결하게"
    },
    "brief.research": {
      goal: "시장/경쟁 이해",
      output_format: "핵심 요약"
    },
    "brief.decide": {
      goal: "우선순위 정리",
      decision_criteria: "효과"
    },
    "brief.create": {
      goal: "아이디어 얻기",
      output_format: "후보 목록"
    },
    "brief.extract": {
      goal: "내용을 정리하기",
      output_format: "핵심 요약"
    },
    "brief.generic": {
      goal: "요청을 명확히 정리하기",
      output_format: "단계별 설명"
    }
  };

  const PERSPECTIVES = {
    marketing_strategy: "마케팅/그로스 관점",
    product_planning: "시니어 PM 관점",
    research: "전략 리서처 관점",
    writing_email: "비즈니스 커뮤니케이션 관점",
    personal_prioritization: "생산성 코치 관점",
    generic: "의도 명확화 관점"
  };

  window.CBSTemplates = {
    RECOMMEND_OPTION,
    DOMAINS,
    DOMAIN_KEYWORDS,
    DOMAIN_KEYWORD_SIGNALS,
    BROAD_TERMS,
    SIMPLE_PATTERNS,
    QUESTION_TEMPLATES,
    DEFAULTS,
    ROLES,
    PERSPECTIVES,
    COMBO_QUESTION_TEMPLATES,
    INTENT_QUESTION_TEMPLATES,
    ARTIFACT_QUESTION_TEMPLATES,
    ARTIFACT_DEFAULT_OUTPUT_FORMATS,
    ARTIFACT_TASK_TYPES,
    SLOT_ONTOLOGY,
    TASK_SLOT_PRIORITIES,
    TASK_DEFAULT_OUTPUT_FORMATS,
    TASK_QUESTION_TEMPLATES,
    TASK_DEFAULTS,
    INCLUDE_ITEMS
  };
})();
