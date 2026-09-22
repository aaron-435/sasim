# TODO: 리포트 "다음 장" 희망 프레임

SPEC.md 승인 완료(2026-09-22). 항목마다 새 세션에서 `/work`로 하나씩 처리.

- [x] 1. 심층 리포트 프롬프트 톤 개정 — 나이 확정 + 기운전환 확정 + 모듈영역 한정 결과 확정
  - 변경: `lib/reportPrompts.ts`
    - `describeUpcomingPeriod()`의 반환 데이터 줄: 나이 표기는 유지하되, 모델이 이 기운 전환을 확정 사실로 다루도록 지시를 보강
    - `buildOutputSchema()`의 `upcoming_period_heading`/`upcoming_period_body` 지시문: "다음 장" 프레임 + 나이 숫자를 문장 앞쪽에서 명확히 쓰도록 강제하는 문구 추가
    - `buildOutputSchema()`의 `closing_body` 지시문(paidFields): (a) 기운 전환은 확정 문장 (b) 이번 모듈이 다루는 구체적 영역에 한정된 결과도 확정 문장 (c) 모듈 영역을 벗어난 보편적 약속("인생이 다 잘 풀립니다") 금지 (d) 정신건강 계열 모듈(번아웃/수면/분노)은 "회복됩니다" 류 임상적 표현 대신 체감 표현. `mindset_guide`에 이미 있는 "범용 은유 금지" 패턴을 참고해서 같은 방식으로 강제
    - 규칙 4·8도 함께 보강: 기운 전환을 확정 사실로 쓰라는 지시(4), "단정 금지" 안전 규칙이 이번 모듈 영역 안의 확정 결과문까지 막는 게 아니라는 경계 명시(8)
  - QA: `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts` → 7개 페르소나 전부 `ok`로 생성 완료, `mobile/dev/qaData.ts` 갱신됨. 갱신된 `QA_DEEP_REPORT`에서 ko(jisoo)·en(mia)·es(lucia) 3개 언어의 `upcoming_period_heading/body`·`closing_body`를 직접 읽어 확인: 나이가 문장 맨 앞에서 숫자로 명확(예: "36세부터, 물의 계절이 열립니다" / "33 to 42, the Water season opens" / "A los 38 años, el fuego toma fuerza"), 기운전환이 확정 문장("~됩니다/~합니다"), 결과문이 번아웃(module3) 영역(쉼·점검 습관)에 한정되고 "인생이 다 잘 풀립니다" 류 보편 문장 없음, 임상적 "회복됩니다" 대신 "가벼워져요"/"줄고" 같은 체감 표현. 추가로 스크래치패드 임시 스크립트로 지수 페르소나를 돈(module2)·분노(module6) 모듈로 각각 1회씩 더 호출해 비교: 두 결과 모두 같은 나이(36세)·기운(수)을 확정 문장으로 쓰되, closing_body 결과문은 각 모듈 주제(돈=결핍감·확인 미루기 완화, 분노=폭발·되새김 완화)에 맞게 실제로 달랐고 분노(정신건강 계열)도 "회복" 대신 "가벼워져요/줄고" 체감 표현 사용 — 복붙해도 말이 되는 문장 아님. 스크립트 파일은 확인 후 삭제(커밋 안 함). 추가로 `npx tsc --noEmit`(루트) 통과 확인

- [ ] 2. 리포트 화면 페이월 카드에 개인화 미리보기 한 줄
  - 변경: `mobile/screens/ReportScreen.tsx`의 `PaywallPage`(1220행 부근) — 구매 전 모든 잠긴 페이지가 이 카드 하나로 합쳐져 보이므로(29개 개별 페이지가 아님, 622행 주석 참고), 여기에 새 줄을 추가한다. `decadeFortune`/`currentAge`는 이미 `ReportScreen`의 props로 들어와 있으니(117~131행), `mobile/lib/decadeTransition.ts`의 `findNextDecadeTransition()`으로 다음 대운의 `startAge`/`pillarLabel`을 구해 AI 호출 없이 로컬에서 "N세부터, [원소] 기운이 시작돼요" 같은 한 줄을 만들고 `PaywallPage`에 새 prop으로 넘겨 `paywallLockedNote` 아래에 표시. 데이터가 없으면(구버전 세션 등) 이 줄 자체를 표시하지 않는다
  - 변경: `mobile/lib/i18n/{ko,en,es}.ts` — 새 문자열 추가(고정 나이/원소 슬롯이 있는 템플릿). 기운 이름 표기는 `lib/reportPrompts.ts`의 `ELEMENT_LABEL`과 같은 어휘로 맞출 것
  - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`. 추가로 `mobile-web` 프리뷰(포트 8082)에서 `http://localhost:8082/?qa=free&persona=mia`를 열어 리포트를 끝까지 넘겨 페이월 카드에 새 줄이 보이는지 확인, `?persona=jisoo`(ko)·`?persona=lucia`(es)로 3개 언어 확인. 스크린샷으로 확인

- [ ] 3. 신년 리포트에 decadeFortune 반영
  - 변경: `app/api/yearReport/route.ts` — 요청 바디에 `currentAge?: number`, `decadeFortune?: unknown`(또는 구체 타입) 추가, `getYearReportContent()` 호출 시 전달
  - 변경: `lib/yearReportPrompts.ts` — `YearReportContext`에 `currentAge`/`decadeFortune` 추가, `lib/reportPrompts.ts`의 `describeUpcomingPeriod()`와 같은 로직(또는 공용 함수로 추출)으로 다음 대운 데이터 줄을 만들어 `closing` 필드 지시문에 반영(나이 확정, 기운전환 확정, 신년 리포트가 다루는 영역에 한정된 결과 확정 — 항목 1과 같은 규칙)
  - 변경: `lib/yearReport.ts` — 필요시 컨텍스트 전달 경로 확인
  - 변경: `mobile/screens/YearReportScreen.tsx`(98행 부근 fetch 호출) — POST 바디에 `currentAge`/`decadeFortune` 추가
  - 변경: `mobile/App.tsx`(423행 `<YearReportScreen>`) — 이미 갖고 있는 `homeData.sajuResult.decadeFortune`/`currentAge`를 새 props로 전달
  - 변경: `scripts/gen-qa-fixtures.mts` — `getYearReportContent()` 호출 시 `r.decadeFortune`/`r.currentAge`를 컨텍스트에 추가(현재 안 넘어감, 안 넘기면 QA 픽스처가 새 로직을 안 탐)
  - 선행: 1 (같은 `describeUpcomingPeriod` 로직/규칙을 재사용하므로 1에서 먼저 안정화)
  - QA: `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts` 실행 후 `QA_YEAR_REPORT`의 `closing`을 읽어 나이 숫자 명확성 + 확정 톤 확인. `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` 통과. `npx tsc --noEmit`(루트) 통과

- [ ] 4. (사용자 실행) 실기기/스토어 확인
  - 항목 1~3이 모두 `[x]`가 된 뒤: 웹(`app/api/yearReport`, `app/api/report`)이 Vercel에 배포됐는지 확인 → OTA(`eas update --branch production`) 발행 → TestFlight 또는 iOS 시뮬레이터 dev-client에서 실제 구매 전 페이월 카드와 구매 후 심층/신년 리포트 결과를 직접 읽고 톤이 의도대로인지 최종 확인
  - (사용자 확인) — 자동화 불가, 실제 결제 플로우와 실기기 필요

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)
