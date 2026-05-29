module.exports = [
  {
    "name": "pm feedback synthesis",
    "draft": "베타 테스트 피드백을 어떻게 정리할지 알려줘",
    "expectedTaskType": "brief.analyze",
    "expectedDomain": "product_planning",
    "expectedArtifactType": "pm_feedback_synthesis",
    "domainPack": "email_pm",
    "clarificationMode": "multiple_choice",
    "promotionGroup": "needs_context",
    "expectedShouldShowClarify": true,
    "sampleAnswers": {
      "pm_feedback_source": "베타 테스트",
      "pm_output_format": "인사이트 요약"
    },
    "expectedIncludes": [
      "베타",
      "피드백",
      "인사이트"
    ],
    "expectedExcludes": [
      "시장 흐름",
      "신규 유저 획득"
    ],
    "notes": "Feedback synthesis should produce product insight structure rather than generic summary.",
    "backlogReason": "??? ??/?? ?? ??(needs_context)"
  }
];
