# Generality & Domain Audit

생성 일시: 2026-05-29T05:04:52.401Z

이 문서는 측정 전용 리포트입니다. 제품 로직, core rule/compiler, runtime, governance 산출물은 변경하지 않습니다.

## 1. 한 줄 요약

총 50개 probe 중 trigger율은 82.0%(41건), suppress율은 18.0%(9건), clarify 중 generic artifact 비율은 85.4%(35/41건)입니다.

## 2. 전체 지표

- 총 probe 수: 50
- trigger: 41 (82.0%)
- suppress: 9 (18.0%)
- clarify_mc: 40
- clarify_context: 1
- suppress: 9
- clarify 중 artifactType none/generic_*: 35 (85.4%)

## 3. 카테고리별 표

| category | n | trigger | suppress | genericArtifact |
| --- | ---: | ---: | ---: | ---: |
| hr | 4 | 4 | 0 | 2 |
| pm | 4 | 4 | 0 | 4 |
| dev | 4 | 4 | 0 | 4 |
| finance | 4 | 3 | 1 | 3 |
| legal | 4 | 3 | 1 | 3 |
| education | 4 | 3 | 1 | 1 |
| research | 4 | 3 | 1 | 3 |
| reporting | 4 | 3 | 1 | 3 |
| email | 4 | 3 | 1 | 3 |
| notice | 4 | 3 | 1 | 2 |
| retrospective | 4 | 3 | 1 | 2 |
| document | 3 | 2 | 1 | 2 |
| planning | 1 | 1 | 0 | 1 |
| data | 1 | 1 | 0 | 1 |
| personal | 1 | 1 | 0 | 1 |

## 4. 불일치 목록

### (a) 떠야 하는데 안 뜸

- 없음

### (b) 안 떠야 하는데 뜸

- g012 [dev] 이 함수 이름 더 읽기 좋게 바꿔줘 → expected=suppress, actual=clarify_mc, artifact=none

### (c) 도메인 확장 후보

clarify는 떴으나 artifactType이 none/generic_*이고 흔한 업무 카테고리(reporting/email/notice/retrospective/document/hr/pm)에 속한 케이스입니다.

- g003 [hr] 이번 분기 성과 리뷰 코멘트 정리해줘 → expected=clarify_context, actual=clarify_mc, artifact=none
- g004 [hr] 퇴사자 인수인계 체크리스트 만들어줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g005 [pm] 신규 기능 요구사항을 유저 스토리로 바꿔줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g006 [pm] 다음 스프린트 우선순위 정리해줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g007 [pm] 제품 지표 대시보드에 넣을 항목 추천해줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g008 [pm] 베타 테스트 피드백을 어떻게 정리할지 알려줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g029 [reporting] 주간 업무 보고서 초안 써줘 → expected=clarify_context, actual=clarify_mc, artifact=generic_document
- g030 [reporting] 임원 보고용 프로젝트 현황 정리해줘 → expected=clarify_context, actual=clarify_mc, artifact=none
- g031 [reporting] KPI 리뷰 회의 자료 구조 잡아줘 → expected=clarify_mc, actual=clarify_mc, artifact=generic_outline
- g033 [email] 파트너사에 일정 변경 메일 써줘 → expected=clarify_context, actual=clarify_mc, artifact=none
- g034 [email] 팀원에게 자료 요청하는 메일 작성해줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g035 [email] 대표님께 승인 요청 메일 보내야 해. 초안 좀 → expected=clarify_context, actual=clarify_mc, artifact=none
- g038 [notice] 사내 행사 안내 공지 초안 만들어줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g039 [notice] 보안 업데이트 릴리즈 노트 써줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g042 [retrospective] 프로젝트 회고 보고서 구조 잡아줘 → expected=clarify_mc, actual=clarify_mc, artifact=generic_outline
- g043 [retrospective] 이번 실패에서 배운 점 정리해줘 → expected=clarify_context, actual=clarify_mc, artifact=none
- g045 [document] 운영 가이드 문서 초안 만들어줘 → expected=clarify_mc, actual=clarify_mc, artifact=none
- g047 [document] 새 정책 설명 문서 목차 잡아줘 → expected=clarify_mc, actual=clarify_mc, artifact=none

## 5. 확장 우선순위 TOP 5

빈도는 이 probe fixture 안에서의 등장 수만 근거로 계산했습니다.

| rank | category | 빈도 | 예시 |
| ---: | --- | ---: | --- |
| 1 | pm | 4 | 신규 기능 요구사항을 유저 스토리로 바꿔줘 / 다음 스프린트 우선순위 정리해줘 / 제품 지표 대시보드에 넣을 항목 추천해줘 |
| 2 | email | 3 | 파트너사에 일정 변경 메일 써줘 / 팀원에게 자료 요청하는 메일 작성해줘 / 대표님께 승인 요청 메일 보내야 해. 초안 좀 |
| 3 | reporting | 3 | 주간 업무 보고서 초안 써줘 / 임원 보고용 프로젝트 현황 정리해줘 / KPI 리뷰 회의 자료 구조 잡아줘 |
| 4 | document | 2 | 운영 가이드 문서 초안 만들어줘 / 새 정책 설명 문서 목차 잡아줘 |
| 5 | hr | 2 | 이번 분기 성과 리뷰 코멘트 정리해줘 / 퇴사자 인수인계 체크리스트 만들어줘 |

## 6. 원자료 표

| id | draft | category | expected | actual | artifactType | taskType | questions | isGenericArtifact |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| g001 | 신입 디자이너 채용 공고 초안 만들어줘 | hr | clarify_mc | clarify_mc | job_posting | brief.write | specific: 어떤 역할을 채용하려는 공고인가요? / 공고에서 가장 강조할 점은? | false |
| g002 | 면접 질문 리스트 뽑아줘 | hr | clarify_mc | clarify_mc | question_set | brief.create | specific: 질문의 목적은 무엇인가요? / 질문 형식은? | false |
| g003 | 이번 분기 성과 리뷰 코멘트 정리해줘 | hr | clarify_context | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g004 | 퇴사자 인수인계 체크리스트 만들어줘 | hr | clarify_mc | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g005 | 신규 기능 요구사항을 유저 스토리로 바꿔줘 | pm | clarify_mc | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g006 | 다음 스프린트 우선순위 정리해줘 | pm | clarify_mc | clarify_mc | none | brief.decide | generic: 지금 필요한 것은? / 판단 기준은? | true |
| g007 | 제품 지표 대시보드에 넣을 항목 추천해줘 | pm | clarify_mc | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g008 | 베타 테스트 피드백을 어떻게 정리할지 알려줘 | pm | clarify_mc | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g009 | API 에러 로그 분석 계획 세워줘 | dev | clarify_mc | clarify_mc | none | brief.analyze | generic: 무엇을 중심으로 분석하면 좋을까요? / 분석의 목적은? | true |
| g010 | 코드 리뷰 체크리스트 만들어줘 | dev | clarify_mc | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g011 | 배포 장애 원인 보고서 구조 잡아줘 | dev | clarify_context | clarify_mc | generic_outline | brief.plan | generic: 구조를 잡는 목적은 무엇인가요? / 원하는 구조는? | true |
| g012 | 이 함수 이름 더 읽기 좋게 바꿔줘 | dev | suppress | clarify_mc | none | brief.create | generic: 아이디어를 어떻게 받고 싶나요? / 몇 개 정도 제시하면 좋을까요? | true |
| g013 | 월별 손익 보고서 요약해줘 | finance | clarify_context | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g014 | 예산 초과 원인 분석해줘 | finance | clarify_mc | clarify_mc | none | brief.analyze | generic: 어떤 기준으로 판단하면 좋을까요? / 답변 형식은? | true |
| g015 | 투자 심사 자료 목차 잡아줘 | finance | clarify_mc | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g016 | 이번 달 비용을 표로 정리해줘 | finance | suppress | suppress | none | brief.extract | 질문 없음 | true |
| g017 | 이 계약서 리스크 검토해줘 | legal | clarify_context | clarify_mc | none | brief.analyze | generic: 무엇을 중심으로 분석하면 좋을까요? / 분석의 목적은? | true |
| g018 | 개인정보 처리방침 개정 안내문 써줘 | legal | clarify_context | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g019 | 서비스 이용약관 변경 체크리스트 만들어줘 | legal | clarify_mc | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g020 | 이 문장 법무팀 말투로 바꿔줘 | legal | suppress | suppress | none | brief.generic | 질문 없음 | true |
| g021 | 신입 온보딩 교육 커리큘럼 짜줘 | education | clarify_mc | clarify_mc | curriculum | brief.plan | specific: 강의 주제는 무엇인가요? / 학습 대상은 누구인가요? | false |
| g022 | 고객 교육 웨비나 아젠다 만들어줘 | education | clarify_mc | clarify_mc | none | brief.plan | generic: 가장 중요한 목표는? / 어느 정도 범위로 다루면 좋을까요? | true |
| g023 | 강의 만족도 설문 문항 만들어줘 | education | clarify_mc | clarify_mc | survey_questions | brief.create | specific: 설문 주제는 무엇인가요? / 질문 형식은? | false |
| g024 | 이 내용을 중학생도 이해하게 설명해줘 | education | suppress | suppress | none | brief.generic | 질문 없음 | true |
| g025 | 핀테크 시장 리서치 계획 세워줘 | research | clarify_mc | clarify_mc | none | brief.research | generic: 시장 조사의 범위는? / 어떤 자료 기준이 좋나요? | true |
| g026 | 사용자 인터뷰 결과에서 인사이트 뽑아줘 | research | clarify_context | clarify_mc | none | brief.research | generic: 리서치의 목적은? / 원하는 정리 방식은? | true |
| g027 | 경쟁 제품 가격 정책 조사해줘 | research | clarify_mc | clarify_mc | none | brief.research | generic: 리서치의 목적은? / 원하는 정리 방식은? | true |
| g028 | 논문 초록을 세 줄로 요약해줘 | research | suppress | suppress | none | brief.extract | 질문 없음 | true |
| g029 | 주간 업무 보고서 초안 써줘 | reporting | clarify_context | clarify_mc | generic_document | brief.write | generic: 문서의 목적은 무엇인가요? / 원하는 형식은? | true |
| g030 | 임원 보고용 프로젝트 현황 정리해줘 | reporting | clarify_context | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g031 | KPI 리뷰 회의 자료 구조 잡아줘 | reporting | clarify_mc | clarify_mc | generic_outline | brief.plan | generic: 구조를 잡는 목적은 무엇인가요? / 원하는 구조는? | true |
| g032 | 이 표를 한 문단으로 설명해줘 | reporting | suppress | suppress | none | brief.generic | 질문 없음 | true |
| g033 | 파트너사에 일정 변경 메일 써줘 | email | clarify_context | clarify_mc | none | brief.write | generic: 원하는 톤은? | true |
| g034 | 팀원에게 자료 요청하는 메일 작성해줘 | email | clarify_mc | clarify_mc | none | brief.write | generic: 원하는 톤은? | true |
| g035 | 대표님께 승인 요청 메일 보내야 해. 초안 좀 | email | clarify_context | clarify_mc | none | brief.write | generic: 원하는 톤은? | true |
| g036 | 이 문장 좀 더 정중하게 바꿔줘 | email | suppress | suppress | none | brief.generic | 질문 없음 | true |
| g037 | 서비스 점검 공지문 작성해줘 | notice | clarify_context | clarify_context | outage_notice | brief.write | specific: 영향 범위, 현재 상태, 다음 업데이트 시점을 한 줄로 알려주세요. | false |
| g038 | 사내 행사 안내 공지 초안 만들어줘 | notice | clarify_mc | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g039 | 보안 업데이트 릴리즈 노트 써줘 | notice | clarify_mc | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g040 | 휴무 안내 문구 짧게 써줘 | notice | suppress | suppress | none | brief.generic | 질문 없음 | true |
| g041 | 분기 회고 질문 만들어줘 | retrospective | clarify_mc | clarify_mc | retrospective_questions | brief.create | specific: 질문의 목적은 무엇인가요? / 질문 형식은? | false |
| g042 | 프로젝트 회고 보고서 구조 잡아줘 | retrospective | clarify_mc | clarify_mc | generic_outline | brief.plan | generic: 구조를 잡는 목적은 무엇인가요? / 원하는 구조는? | true |
| g043 | 이번 실패에서 배운 점 정리해줘 | retrospective | clarify_context | clarify_mc | none | brief.analyze | generic: 어떤 기준으로 판단하면 좋을까요? / 답변 형식은? | true |
| g044 | 회고 메모를 맞춤법만 고쳐줘 | retrospective | suppress | suppress | none | brief.generic | 질문 없음 | true |
| g045 | 운영 가이드 문서 초안 만들어줘 | document | clarify_mc | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g046 | 프로세스 문서를 체크리스트로 바꿔줘 | document | suppress | suppress | none | brief.generic | 질문 없음 | true |
| g047 | 새 정책 설명 문서 목차 잡아줘 | document | clarify_mc | clarify_mc | none | brief.write | generic: 누가 읽거나 사용하게 되나요? / 원하는 톤은? | true |
| g048 | 다음 달 팀 워크숍 계획 세워줘 | planning | clarify_mc | clarify_mc | none | brief.plan | generic: 가장 중요한 목표는? / 원하는 결과물 형식은? | true |
| g049 | 고객 데이터 정제 기준 만들어줘 | data | clarify_mc | clarify_mc | none | brief.generic | generic: 원하는 도움은? / 답변 형식은? | true |
| g050 | 이번 주 내 할 일 우선순위 정해줘 | personal | clarify_mc | clarify_mc | none | brief.decide | generic: 지금 필요한 것은? / 판단 기준은? | true |
