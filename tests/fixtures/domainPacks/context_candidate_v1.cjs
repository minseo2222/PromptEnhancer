const salesBacklog = require("./sales_bd_backlog.cjs");
const customerSupportBacklog = require("./customer_support_backlog.cjs");

const CONTEXT_LINES = {
  "sales call script": "재고관리 SaaS를 SMB 대표에게 소개하고 데모 미팅을 잡는 첫 콜",
  "cold email draft": "HR팀장에게 채용 자동화 SaaS 무료 데모를 제안하는 첫 콜드메일",
  "prospect objections analysis": "보안과 도입 리스크를 우려하는 엔터프라이즈 IT 담당자 대상",
  "sales follow-up email": "어제 제품 데모 후 가격표를 보낸 리드에게 다음 미팅을 요청",
  "sales collateral for our product": "B2B 회계 자동화 제품, CFO 대상, 도입 검토용 1페이지 자료",
  "proposal for customer A": "A 고객은 CS 비용 증가가 문제이고, 지원 자동화 도입을 제안하려 함",
  "refund request response": "7일 환불 기간은 지났지만 첫 결제 고객이라 내부 검토 후 안내해야 함",
  "service outage notice": "로그인 장애가 30분째 지속, 일부 계정 영향, 1시간 뒤 상태 업데이트 예정",
  "support faq draft": "반복 문의는 로그인 오류, 환불 절차, 결제수단 변경, 비밀번호 재설정",
  "new customer onboarding guide": "신규 고객이 첫 주 안에 결제 연동과 팀 초대를 완료하게 하는 SaaS 온보딩",
  "churn save reply": "가격 부담으로 해지를 고민하지만 사용량은 높고 월간 할인은 불가",
  "customer success check-in email": "도입 2주차 고객, 핵심 기능 사용률이 낮아 활성화 지원 목적",
  "refund reply paraphrase": "결제 후 3일 내 요청이라 환불 가능성이 높지만 결제수단 확인 필요",
  "outage notice paraphrase": "예정 점검으로 23시부터 30분간 접속 불가, 완료 후 공지 예정",
  "churn save paraphrase": "구독 취소 이유는 팀 사용률 저하, 교육 세션 제안 가능",
  "customer success check-in paraphrase": "월간 리포트 확인 전 사용 현황과 막힌 지점을 묻는 고객 성공 메일",
  "support faq paraphrase": "자주 받는 문의는 배송 지연, 환불 가능 여부, 계정 로그인 문제"
};

const ARTIFACT_TYPES = {
  "sales call script": "sales_script",
  "cold email draft": "cold_email",
  "prospect objections analysis": "objections_analysis",
  "sales follow-up email": "follow_up_email",
  "sales collateral for our product": "sales_collateral",
  "proposal for customer A": "proposal_outline"
};

module.exports = salesBacklog.concat(customerSupportBacklog).map((caseItem) => ({
  ...caseItem,
  domainPack: "context_candidate",
  originalDomainPack: caseItem.domainPack,
  clarificationMode: "context_line",
  promotionGroup: "needs_context",
  expectedShouldShowClarify: true,
  expectedArtifactType: caseItem.expectedArtifactType || ARTIFACT_TYPES[caseItem.name],
  sampleContextLine: CONTEXT_LINES[caseItem.name],
  notes: `${caseItem.notes || ""} context_line candidate: 1줄 맥락이 compiled prompt의 #맥락에 반영되는지 검증한다.`.trim()
}));
