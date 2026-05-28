module.exports = [
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
  }
];
