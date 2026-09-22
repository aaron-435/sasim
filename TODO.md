# TODO: 리포트 "다음 장" 희망 프레임

SPEC.md 승인 완료(2026-09-22). 항목마다 새 세션에서 `/work`로 하나씩 처리.

- [x] 1. 심층 리포트 프롬프트 톤 개정 — 나이 확정 + 기운전환 확정 + 모듈영역 한정 결과 확정
  - 변경: `lib/reportPrompts.ts`
    - `describeUpcomingPeriod()`의 반환 데이터 줄: 나이 표기는 유지하되, 모델이 이 기운 전환을 확정 사실로 다루도록 지시를 보강
    - `buildOutputSchema()`의 `upcoming_period_heading`/`upcoming_period_body` 지시문: "다음 장" 프레임 + 나이 숫자를 문장 앞쪽에서 명확히 쓰도록 강제하는 문구 추가
    - `buildOutputSchema()`의 `closing_body` 지시문(paidFields): (a) 기운 전환은 확정 문장 (b) 이번 모듈이 다루는 구체적 영역에 한정된 결과도 확정 문장 (c) 모듈 영역을 벗어난 보편적 약속("인생이 다 잘 풀립니다") 금지 (d) 정신건강 계열 모듈(번아웃/수면/분노)은 "회복됩니다" 류 임상적 표현 대신 체감 표현. `mindset_guide`에 이미 있는 "범용 은유 금지" 패턴을 참고해서 같은 방식으로 강제
    - 규칙 4·8도 함께 보강: 기운 전환을 확정 사실로 쓰라는 지시(4), "단정 금지" 안전 규칙이 이번 모듈 영역 안의 확정 결과문까지 막는 게 아니라는 경계 명시(8)
  - QA: `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts` → 7개 페르소나 전부 `ok`로 생성 완료, `mobile/dev/qaData.ts` 갱신됨. 갱신된 `QA_DEEP_REPORT`에서 ko(jisoo)·en(mia)·es(lucia) 3개 언어의 `upcoming_period_heading/body`·`closing_body`를 직접 읽어 확인: 나이가 문장 맨 앞에서 숫자로 명확(예: "36세부터, 물의 계절이 열립니다" / "33 to 42, the Water season opens" / "A los 38 años, el fuego toma fuerza"), 기운전환이 확정 문장("~됩니다/~합니다"), 결과문이 번아웃(module3) 영역(쉼·점검 습관)에 한정되고 "인생이 다 잘 풀립니다" 류 보편 문장 없음, 임상적 "회복됩니다" 대신 "가벼워져요"/"줄고" 같은 체감 표현. 추가로 스크래치패드 임시 스크립트로 지수 페르소나를 돈(module2)·분노(module6) 모듈로 각각 1회씩 더 호출해 비교: 두 결과 모두 같은 나이(36세)·기운(수)을 확정 문장으로 쓰되, closing_body 결과문은 각 모듈 주제(돈=결핍감·확인 미루기 완화, 분노=폭발·되새김 완화)에 맞게 실제로 달랐고 분노(정신건강 계열)도 "회복" 대신 "가벼워져요/줄고" 체감 표현 사용 — 복붙해도 말이 되는 문장 아님. 스크립트 파일은 확인 후 삭제(커밋 안 함). 추가로 `npx tsc --noEmit`(루트) 통과 확인

- [x] 2. 리포트 화면 페이월 카드에 개인화 미리보기 한 줄
  - 변경: `mobile/lib/decadeTransition.ts` — 기존 `findNextDecadeTransition()`(생일까지 필요, 알림 예약용)은 그대로 두고, 미리보기 전용으로 더 가벼운 `findNextDecadeElementPreview(decadeFortune, currentAge)`를 새로 추가. `DecadeFortuneEntryLike`에 `skyElement`/`earthElement`(한자 문자열)를 추가하고, `lib/reportPrompts.ts`의 `HANJA_TO_ELEMENT_KEY`·`App.tsx`의 `EL_KO_TO_KEY`와 같은 매핑을 로컬에 복제(모바일은 루트 `lib/`를 import하지 않는 별도 패키지라 기존에도 이렇게 중복해 옴)해서 `{ startAge, elementKey }`를 반환. 생일이 필요 없어 `ReportScreen`에 새 prop을 늘리지 않아도 됨
  - 변경: `mobile/screens/ReportScreen.tsx` — `topAnswers`와 같은 패턴으로 `decadePreviewLine` useMemo 추가(`decadeFortune`/`currentAge`/`strings` 의존), `PaywallPage`에 새 prop `decadePreviewLine: string | null`로 전달해 `paywallLockedNote` 바로 아래 조건부 렌더(`!!decadePreviewLine &&`). `pages` useMemo의 의존성 배열에도 추가
  - 변경: `mobile/lib/i18n/{ko,en,es}.ts` — `report.paywallDecadePreview(age, element)` 템플릿 추가. 기운 이름은 `strings.common.elementLabels`(이미 `lib/reportPrompts.ts`의 `ELEMENT_LABEL`과 동일 어휘: 목/화/토/금/수, Wood/Fire/Earth/Metal/Water, Madera/Fuego/Tierra/Metal/Agua)를 그대로 사용
  - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 에러 없음. `mobile-web` 프리뷰(포트 8082)에서 `http://localhost:8082/?qa=free&persona=mia`(en)·`?persona=jisoo`(ko)·`?persona=lucia`(es) 세 언어 모두 홈 → "Open sample deep report" → 12페이지 중 마지막(페이월) 페이지까지 넘겨 스크린샷으로 직접 확인: en "From age 33, your Water season begins", ko "36세부터, 수 기운이 시작돼요", es "A partir de los 38 años, tu temporada de Fuego comienza" — 모두 `paywallLockedNote`(잠긴 페이지 수) 바로 아래 표시되고 나이가 숫자로 또렷함. 데이터 없을 때(구버전 세션) 줄 자체가 안 보이는 분기(`!!decadePreviewLine &&`)는 코드 리뷰로 확인(픽스처가 항상 decadeFortune을 포함해 화면으로는 재현 안 됨)

- [x] 3. 신년 리포트에 decadeFortune 반영
  - 변경: `app/api/yearReport/route.ts` — 요청 바디에 `currentAge?: number`, `decadeFortune?: ReportDecadeFortune | null` 추가, `getYearReportContent()` 호출 시 전달
  - 변경: `lib/yearReportPrompts.ts` — `YearReportContext`에 `currentAge`/`decadeFortune` 추가. 새로 만들지 않고 `lib/reportPrompts.ts`의 `describeUpcomingPeriod()`를 그대로 import해서 재사용(공용 함수 추출 대신 기존 함수 재사용 — 로직 중복 없음). "다가오는 대운 시기" 데이터 줄을 근거 데이터에 추가하고, 규칙 3-1(나이·기운전환은 확정 사실, 결과문은 이 리포트가 다룬 해당 연도 흐름에 한정, 보편적 약속 금지)과 `closing` 필드 지시문에 반영
  - 변경: `lib/yearReport.ts` — 컨텍스트 전달 경로 확인만 함(그대로 통과하는 구조라 코드 변경 불필요)
  - 변경: `mobile/screens/YearReportScreen.tsx` — `decadeFortune`/`currentAge` props 추가, fetch 바디와 `generate` 콜백 의존성 배열에 반영
  - 변경: `mobile/App.tsx`(423행 `<YearReportScreen>`) — `homeData.sajuResult.decadeFortune`/`currentAge`를 새 props로 전달
  - 변경: `scripts/gen-qa-fixtures.mts` — `getYearReportContent()` 호출에 `r.decadeFortune`/`r.currentAge` 추가
  - QA: `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts` 실행(7개 페르소나 전부 `ok`) 후 `mobile/dev/qaData.ts`의 `QA_YEAR_REPORT`에서 ko(jisoo)·en(mia)·es(lucia) `closing`을 직접 읽어 확인: 나이가 문장 맨 앞에서 숫자로 명확(예: "36세부터 45세까지 수 기운이 강해지는 시기가 이어집니다" / "From age 33 to 42, a stronger Water phase is already set to begin" / "De los 38 a los 47 años, tu ciclo de diez años entra en una etapa donde el fuego se vuelve más fuerte"), 기운전환이 확정 문장이고 그 뒤 결과문은 해당 연도(2027년)의 실제 관계 흐름에 한정되며 "인생이 다 잘 풀립니다" 류 보편 문장 없음. `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` 통과(에러 없음). `npx tsc --noEmit`(루트) 통과(에러 없음)

- [ ] 4. (사용자 실행) 실기기/스토어 확인
  - 항목 1~3이 모두 `[x]`가 된 뒤: 웹(`app/api/yearReport`, `app/api/report`)이 Vercel에 배포됐는지 확인 → OTA(`eas update --branch production`) 발행 → TestFlight 또는 iOS 시뮬레이터 dev-client에서 실제 구매 전 페이월 카드와 구매 후 심층/신년 리포트 결과를 직접 읽고 톤이 의도대로인지 최종 확인
  - (사용자 확인) — 자동화 불가, 실제 결제 플로우와 실기기 필요

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

- ~~항목 2(리포트 화면 페이월 카드 미리보기)가 이미 코드로 구현되어 워킹트리에 uncommitted 상태로 존재함~~ → 이후 세션에서 `/work 2`로 QA(tsc + mobile-web 3개 언어 스크린샷)까지 돌려 항목 2를 `[x]`로 체크 완료(위 항목 2 QA 기록 참고). 해결됨.
- `gen-qa-fixtures.mts` 실행 중 신년 리포트 스페인어 페르소나(lucia)에서 "Cinco Elementos"(대문자화된 오행 표기) 스페인어 스타일 위반이 1회 감지·자동 교정됨(`checkYearReportDeterministic`의 기존 `ES_CAPITALIZED_ELEMENTS` 규칙) — 이번 작업(decadeFortune 반영)과 무관한 기존 동작이라 손대지 않음.
