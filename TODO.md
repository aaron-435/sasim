# TODO (2026-10-27) — 측정 신뢰도 → 웹→앱 이동 → 공개 전 정비

SPEC: `SPEC.md`. 한 세션에 한 항목. 순서: 1·2(측정)가 웹→앱(9~13)보다 먼저다. 3~8, 14~16은 서로 독립이라 나란히 해도 된다. 마케팅 예산은 월 약 $300(2026-10-27 결정), 이 TODO에서는 집행하지 않는다.

## A. 측정 신뢰도와 정합성

- [x] 1. Codex 퍼널 리포트 변경 검토·반영
  - 변경: `scripts/funnel-report.mts`(작업 트리에 이미 고쳐져 있음), `scripts/funnel-report.test.mts`(미추적). 다시 만들지 않고 읽고 검토한 뒤, 고칠 곳만 고친다.
  - QA: `npx tsx scripts/funnel-report.test.mts` → 22개 이상 통과. 루트 `npx tsc --noEmit` → 0. `npx tsx --env-file=.env.local scripts/funnel-report.mts` → 실행 성공(출력에 ID·생일·자유 문구 없음을 눈으로 확인, 출력은 채팅이나 외부 도구에 붙이지 않음).
  - 결과(2026-10-27): 코드 수정 없이 받아들임. 검토한 점 — `.order("id")`는 세 테이블 모두 `id` 기본키가 있어 안전, 이벤트 이름(`onboarding_complete`·`type_reveal_view` 등)은 `lib/eventSchema.ts` 허용 목록에 있음, D1/D7 분모는 끝난 KST 날만, 모르는 product·surface는 가림.
  - QA: `npx tsx scripts/funnel-report.test.mts` → "22 passed". 루트 `npx tsc --noEmit` → exit 0. `npx tsx --env-file=.env.local scripts/funnel-report.mts` → exit 0, 67줄, UUID 꼴 0건·날짜 꼴 0건(grep), product·surface 이름은 알려진 값과 `other_or_missing_*`만.

- [x] 2. 테스터 기기 표시
  - 선행: 1
  - 변경: 앱 `mobile/lib/analytics.ts` + 숨은 스위치(설정 화면), 웹 `lib/analytics.ts`, 서버 `lib/eventSchema.ts`, `funnel-report.mts`(테스터 포함/제외 나눠 출력), 테스트.
  - QA: funnel 테스트에 테스터 사례 추가 → 통과. `lib/eventSchema` 허용 목록 테스트(있으면). 루트·mobile tsc 0. mobile-web에서 스위치를 켜고 이벤트 요청 본문에 테스터 표시가 붙는지 `read_network_requests`로 확인.
  - 결과(2026-10-27): 배치 필드 `tester: true` → 서버가 각 행 `props.tester`로 저장(DB 열 추가 없음, SQL 불필요, 클라이언트의 이벤트별 `tester` 속성은 400). 앱은 설정 © 줄 7번 탭으로 켜고 끔(켜지면 "· T", 초기화에도 유지, 알림 문구 ko/en/es). 웹은 `?tester=1`/`?tester=0`. 리포트는 테스터 기기를 그 이전 행까지 사용자 섹션에서 빼고 맨 끝 "tester-marked native devices" 섹션에만 센다. 구버전 서버·앱과 호환(모르는 배치 필드는 무시, 필드가 없으면 false).
  - QA: `npx tsx scripts/funnel-report.test.mts` → "31 passed"(기존 22 + 테스터 9). 새 `npx tsx scripts/event-schema.test.mts` → "9 passed". 루트 `npx tsc --noEmit` → exit 0. mobile tsc(큰 스택) → exit 0. mobile-web(`?qa=free&persona=sam&lang=en`, 375x812): 설정 © 7번 탭 → "© 2026 Studio Aaron · T", localStorage `fatesaid_tester`="1" → 운세 "Helpful" 탭 → `/api/events` 본문 `{platform:"app-web", dev:true, tester:true, events:[feedback]}`. 증거 출처: 브라우저 패널은 교차 출처 fetch를 `read_network_requests`에 잡지 못해(API 요청 0건으로 보임), 페이지 안 fetch 래퍼로 본문을 읽음.
  - (사용자 확인, 미확인 2 해소용) 웹 배포(19번)와 OTA(20번) 뒤: 휴대폰 앱 설정 맨 아래 © 줄 7번 탭 → "테스터 모드를 켰어요" → 온보딩·검사·대화·리포트 한 바퀴 → `npx tsx --env-file=.env.local scripts/funnel-report.mts`의 "tester-marked native devices" 섹션에서 `onboarding_complete`·`chat_start`·`chat_complete`·`report_generate`가 1/1인지 확인. 지금 깔린 1.2.0 빌드에는 스위치가 없다.

- [x] 3. 랜딩 약속 일치 (ko/en/es)
  - 변경: `lib/i18n/{en,ko,es}.ts` 랜딩 CTA·보조 문구, 필요하면 `components/AppFlow.jsx`·`Landing.jsx`·`LandingTypeCard.jsx`의 CTA 뒤 첫 화면. (가) 문구를 실제 입력에 맞추기 vs (나) 짧은 첫 화면, 근거를 적고 하나를 고른다. 새 결과 화면은 만들지 않는다.
  - QA: `npm run lint && npm run build` → 통과. 웹 preview(데스크톱 + mobile 뷰포트)에서 en/ko/es 랜딩 → CTA → 첫 화면 캡처, 문구와 실제 입력이 맞는지 확인.
  - 결과(2026-10-27): (나)를 골랐다. 근거: CTA 뒤 온보딩은 이름·성별·생년월일·시각·도시 5단계를 받고 Q&A 주제 선택으로 가서 "차트"를 보여 주지 않는다. 반면 같은 랜딩의 유형 카드는 생년월일만으로 바로 유형을 보여 주므로 "생년월일만" 약속을 그대로 지킨다(새 화면 없음). 히어로·하단·고정 CTA → 유형 카드로 스크롤 + 첫 입력칸 초점(reduced motion이면 즉시 이동). 카드의 계속 버튼만 온보딩을 연다(생년월일은 채워져 4단계). 문구: CTA "See my saju type, free"/"내 사주 유형 무료로 보기"/"Ver mi tipo de saju gratis", 보조 "약 10초 · 생년월일만", 이용 순서 3단계, FAQ "무료인가요" 첫 문장(결과 → 유형), 카드 계속 버튼 "몇 가지 더 넣고 질문해 보기"(시간·도시만이라고 하면 이름·성별을 빼먹음).
  - QA: `npm run lint` → "No ESLint warnings or errors". `npm run build` → exit 0(마지막 문구 수정 뒤 다시 실행). 루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/check-es-text.mts <새 es 문구>` → 경고 0개. 웹 preview(`work-dev`): en 데스크톱·en/ko/es 375x812에서 CTA 클릭 → 카드 섹션이 화면 맨 위(top 0), 초점 en "Birth month"·ko "태어난 연도"·es "Día de nacimiento"(언어별 날짜 순서). es·en: 날짜 입력 → 유형 카드 → 계속 → "PASO 1 / 4 ¿Cómo te llamamos?"(생년월일 단계 건너뜀). 증거: 브라우저 패널 스크린샷은 늦게 갱신돼 스크롤·초점 상태를 페이지 안 JS로 읽음.

- [x] 4. 결과 이름 버그 수정 (전 모듈, 직접 처리·muse 위임 금지)
  - 변경: `mobile/lib/quiz/quizProfile.ts`(`classifyProfile` 조회), 필요하면 `QuizScreen.tsx` 대체 제목 경로. 먼저 저장된 결과·리포트 프롬프트·이벤트가 `typeKey` 순서에 기대는지 grep으로 확인. 분류 기준은 그대로.
  - QA: 모든 모듈의 2·3개 조합 키 순열을 도는 검사 스크립트(새로, `scripts/`) → 대체 제목 0건. mobile tsc 0. mobile-web(`?qa=free&persona=sam&lang=en`) 가면 30문항 최고값 → 정의된 제목 캡처. 옛 순서로 저장된 결과를 다시 열어도 맞는 이름(스크립트 사례로).
  - 결과(2026-10-27): 먼저 grep으로 확인 — `typeKey`는 서버·이벤트·리포트 프롬프트 어디에도 키로 쓰이지 않고(서버엔 `typeInfo.title`만 감) `resolveTypeName` 조회에만 쓰임. 그래서 분류(`classifyProfile`, `activeDimensions` 순서 포함)는 그대로 두고 `resolveTypeName`이 정확한 키가 없으면 차원 집합이 같은 키를 찾게 함(앱 `mobile/lib/quiz/quizProfile.ts`와 같은 코드인 웹 `lib/quizProfile.ts` 둘 다). 저장된 리포트(`reportStorage`)는 `typeInfo`를 그대로 저장하므로, 내 리포트에서 다시 열 때 `repairSavedTypeInfo`(`mobile/lib/quiz/modules.ts`)가 옛 대체 제목("<차원>+<차원> Combined Type" 꼴, 쓰인 언어 판별)만 정의된 제목으로 바꿈(`App.tsx`). 이미 생성된 리포트 본문 안의 옛 제목은 바꾸지 않음. 가면(module4)은 화면 이동 대신 돈(module2)으로 확인 — 같은 엔진이고 버그가 나던 순서를 정확히 만들 수 있어서.
  - QA: 새 `npx tsx scripts/quiz-type-names.test.mts` → "532 passed, fallback titles: 0"(앱 12모듈×3언어 + 웹 11모듈, 2개 이상 조합의 모든 순열 + 단일·기준 + 저장 복구 ko/en/es + 손대지 않는 경우). 대조: 예전 정확 키 조회는 en만 134개 중 89개를 놓침(임시 스크립트). mobile tsc(큰 스택) → exit 0. 루트 `npx tsc --noEmit` → exit 0. mobile-web(`?qa=free&persona=sam&lang=en`, 375x812): 돈 검사 이어 풀기 저장값에 29개 답(회피 > 결핍, 과시 0)을 넣고 30번 화면에서 마지막 답 → 키 `avoidance+scarcity`인데 정의된 제목 "Anxious Avoidant" 표시(예전이면 대체 제목).

- [x] 5. 개인정보 설명 정합성 (ko/en/es)
  - 변경: `lib/legalContent.ts`(KASI 호출 사실: 양력 날짜만 한국천문연구원 공공 API로), 보관 1년 → 실제 삭제 작업 SQL(`supabase/` 새 파일, 사용자 실행) 또는 문구를 실제에 맞추기. 앱 안 처리방침 사본이 있으면 함께.
  - QA: `grep -n "외부 계산\|outside calculation\|cálculo externo" lib/legalContent.ts` → 사실과 다른 문장 0. `npm run lint && npm run build` 통과. `/privacy?lang=en|ko|es` 웹 preview 확인. SQL을 만들었다면 파일 경로와 실행 절차를 18번에 적는다.
  - 결과(2026-10-27): 보관 1년은 **삭제 작업을 만드는 쪽**을 골랐다. 근거: 서버의 세션·사주·검사·대화·리포트·사용량 행은 쓰기만 하고 다시 읽어 기능을 만들지 않으며(리포트는 기기 저장, 읽는 곳은 24시간짜리 넘김 코드뿐), 데이터 삭제 페이지(`app/(legal)/data-deletion`)도 이미 "최대 1년 후 자동 삭제"를 약속하고 있어 문구를 줄이는 것보다 약속을 지키는 편이 맞다. 새 `supabase/retention.sql`(pg_cron 매일 03:15 UTC → `purge_expired_data()`: 1년 지난 7개 테이블 행, 만료 초대, 연결 안 된 만료 커플 코드, 궁합 구매 기록은 제외). 처리방침 ko/en/es 3항 끝 문단 = 매일 자동 삭제 작업으로 지움, 4항 끝 문단 = 보정한 양력 날짜(연·월·일)만 서버가 한국천문연구원 공공 API(공공데이터포털)로 조회, 이름·시각·도시·성별·기기 식별자는 안 보냄. 방침 날짜 10월 7일 → 10월 27일(약관은 그대로). 앱 안에 처리방침 사본은 없음(웹 링크만).
  - QA: `grep -n "외부 계산\|outside calculation\|cálculo externo" lib/legalContent.ts` → 0건(es 옛 문구 "proveedor externo de cálculo"도 0). `npx tsx scripts/check-es-text.mts <새 es 문장>` → 경고 0개. 루트 `npx tsc --noEmit` → exit 0. `npm run lint` → "No ESLint warnings or errors", `npm run build` → exit 0. 웹 preview(`work-dev`) `/privacy?lang=ko|en|es`: 새 KASI·자동 삭제 문장과 10월 27일 있음, 옛 문장 없음(페이지 안 텍스트로 확인), es 4항 캡처.
  - 주의: 처리방침의 "매일 자동 삭제"는 18번에서 SQL을 실행해야 사실이 된다. **18번 SQL 실행을 19번 웹 배포보다 먼저** 한다.

- [x] 6. 결과 문구 단정·진단 표현 정리 (모듈 2·4~10, ko/en/es)
  - 변경: `mobile/lib/quiz/module{2,4,5,6,7,8,9,10}*.ts` 결과 `title`·`hook`, 웹 `lib/module*.ts`의 같은 문구. 수면 "Deep-Sleep Deprived", module7 "전형적인 고감각민감자(HSP)" 포함.
  - QA: `grep -rnE "패턴입니다|You tend to|Tiendes a|증후군|syndrome|síndrome|Deprived|전형적인" mobile/lib/quiz lib/module*.ts` → 결과 문구 0건(주석 제외). 루트·mobile tsc 0. `npx tsx scripts/check-es-text.mts`로 es 결과 문구 확인(필요하면 임시 추출 파일). mobile-web에서 수면 최고점 결과 캡처.
  - 결과(2026-10-27): 앱 8개 모듈 ko/en/es와 웹 같은 ko 문구에서 20개 키를 관찰형으로 바꿈("~패턴입니다", "never/철저히/마감 직전까지 손대지 않음" 같은 단정, 어린 시절을 단정하던 module9 `parentification`, "전형적인 HSP" → "HSP라 부르는 기질과 닮은 조합", 2인칭 "A pattern of…"). 수면 최고점 제목 "깊은 잠 결핍형/Deep-Sleep Deprived/Falta de sueño profundo" → "생각·몸·꿈 모두 깨어 있는형/Mind, Body and Dreams All Awake/Mente, cuerpo y sueños en vela", hook에서 "회복이 필요한 수면 상태" 삭제. 키·분류는 그대로. "~편입니다/tend to"류 부드러운 서술은 그대로 둠.
  - QA: `grep -rnE "패턴입니다|You tend to|Tiendes a|증후군|syndrome|síndrome|Deprived|전형적인" mobile/lib/quiz lib/module*.ts` → 1건(`quizProfile.ts:394` 주석)만. `npx tsx scripts/check-es-text.mts <바뀐 es 20줄>` → 경고 0개. `npx tsx scripts/quiz-type-names.test.mts` → "532 passed, fallback titles: 0". 루트 tsc exit 0, mobile tsc(큰 스택) exit 0, `npm run lint && npm run build` 통과. mobile-web(`?qa=free&persona=sam&lang=en`, 375x812): 수면 29문항 최고점 저장값 + 30번 최고 답 → "Mind, Body and Dreams All Awake" / "Your answers this time showed signs that…" 캡처.

- [x] 7. "AI Counseling" 용어 정리 (ko/en/es)
  - 변경: 결과 화면 버튼·안내 문구(`mobile/lib/i18n/*`, 해당 화면). 챗 프롬프트는 건드리지 않는다.
  - QA: `grep -rniE "counsel|asesor" mobile/lib/i18n` → 결과 화면 문구 0건(남는 것은 이유를 적음). mobile tsc 0. mobile-web 결과 화면 캡처.
  - 결과(2026-10-27): es는 이미 "conversación con IA"였다. en·ko의 결과 화면 버튼(`continueToChatButton`)·안내(`moreDetail`)·대화 헤더·종료 배지·리포트 인용 라벨·리포트 페이월·홈 경로·내 리포트 빈 화면을 "AI conversation / AI 대화"로. ko 홈 안내의 "진단해보면" → "살펴보면"(같은 문장). `STYLE_GUIDE.md` 용어집 줄도 "AI 대화 / AI conversation"으로. 챗 프롬프트는 안 건드림.
  - QA: `grep -rniE "counsel|asesor" mobile/lib/i18n` → 2건, 둘 다 남김: en.ts:703 리포트 면책("does not replace professional psychological counseling" — 전문 상담을 대체하지 않는다는 뜻이라 맞는 말), STYLE_GUIDE.md:14 브랜드 목소리 설명. ko는 "상담" 2건(리포트 면책, 위기 상담전화 이름)만 남김. mobile tsc exit 0. mobile-web 결과 화면 캡처: 버튼 "Continue to the AI Conversation", 안내 끝 "once you finish the AI conversation".

- [x] 8. 문서 사실 고치기
  - 변경: `PRODUCT.md`(모듈 11 → 12 등), 코드와 어긋난 수치(대화 턴 수 등)를 대조해 고침.
  - QA: `grep -n "11 psych\|11 개\|11개" PRODUCT.md WIKI.md` → 0. 고친 수치마다 근거 파일을 커밋 메시지 초안에 적음.
  - 결과(2026-10-27): `PRODUCT.md` 모듈 수 11 → 12(`mobile/lib/quiz/modules.ts`), 대화 25턴·10턴 점검 → 22턴·9턴 점검의 고정 스크립트 선택형(`mobile/lib/chatFlow.ts` 기본 V4, `lib/choiceScripts/common.ts` 인용 줄), "AI counseling chat" → "conversation with AI"(7번과 같은 용어). 대조해 맞았던 것: 무료 Q&A 1개·구독 10개(`mobile/lib/qaQuota.ts`), 질문 뱅크 530(`mobile/data/questionBank.json` 실제 합계), 리포트 $14.99(`mobile/lib/reportPricing.ts`), 사주 유형 50(일간 10 × 많은 오행 5). WIKI의 "페르소나 11개"는 sim-chat 모듈 1~11 페르소나 수라 사실이지만 오해 없게 표현만 바꿈.
  - QA: `grep -n "11 psych\|11 개\|11개" PRODUCT.md WIKI.md` → 0건(exit 1). `grep -c counseling PRODUCT.md` → 0.

## B. 웹→앱 이동 (결제 없음)

- [x] 9. 넘김 저장·코드 서버
  - 선행: 1
  - 변경: `app/api/verification-code/route.ts`(또는 새 `app/api/handoff`), 저장 위치(`sessions` 확장 or 새 테이블 SQL), 6자리 코드 + 긴 토큰, 7일 만료, 꺼내면 삭제, 속도 제한. 기존 GET 응답 모양 유지.
  - QA: 라우트 테스트(새 `.test.mts`: 만료·1회용·토큰/코드 두 경로·옛 응답 모양) 통과. `npm run lint && npm run build` 통과. 새 테이블이면 SQL 파일 + 18번에 실행 절차.
  - 결과(2026-10-27): **새 테이블**을 골랐다. 근거: `sessions`는 Q&A 세션 행이라 유형 카드·계산기처럼 세션이 없는 진입점을 담으려면 빈 세션을 만들어야 하고, 1년 보관 대상이라 7일 만료·꺼내면 삭제와 맞지 않는다. 새 `handoffs`(코드 PK, 토큰 SHA-256 unique, 진입점·언어 check, 입력값 jsonb, 7일 `expires_at`, RLS). 새 `POST /api/handoff {source, locale, data}` → `{code, token, deepLink, expiresAt}`, `GET /api/handoff?t=|?code=` → `{kind:"handoff", source, locale, data}`, 옛 Q&A 코드는 같은 GET이 `{kind:"session", nickname, track, sajuResult}`로(앱이 한 번만 부르게). 입력값은 엄격 검사(모르는 키·불가능한 날짜·미래 날짜·시각만 있는 경우 400, 닉네임·도시는 한 줄로 정리·길이 제한, `birthHour: null` = 시각 모름, 없으면 앱이 물음). 꺼낼 때 삭제가 행을 지운 요청만 데이터를 받음(동시 요청 1명만). 옛 `/api/verification-code`는 로직을 `lib/handoff.ts`로 옮기고 응답 모양 그대로, 새 넘김 코드가 들어오면 409 `update_app`(소모 안 함). 두 테이블이 같은 6자리 코드 공간을 피하고(서로 확인), 코드 조회는 두 라우트가 같은 속도 제한 버킷(IP당 10분 20회) — 예전엔 엔드포인트가 둘이 되면 시도가 두 배였다. 토큰 조회는 별도 30회, 생성 10회. 코드 생성은 `Math.random` → `crypto.randomInt`. SQL `supabase/handoffs.sql`(새), `schema.sql`·`retention.sql`(만료 넘김 매일 삭제)에 반영.
  - QA: 새 `npx tsx scripts/handoff.test.mts` → "109 passed"(메모리 저장소: 생성→토큰/코드 두 경로·1회용·서로 무효화, 7일 경계·만료 410·다음 생성 때 정리, 입력 검사 400 15종·거절 시 저장 0, 옛 POST `{code}`·옛 GET `{nickname,track,sajuResult}`·24시간 410·1회용, 새 GET의 옛 코드, 옛 GET의 새 코드 409 비소모, 코드 공간 충돌 회피). 루트 `npx tsc --noEmit` → exit 0. `npm run lint` → "No ESLint warnings or errors", `npm run build` → exit 0(`ƒ /api/handoff`, `ƒ /api/verification-code`). dev 서버(`work-dev`) curl: DB를 안 타는 잘못된 입력 5종 → 모두 400과 맞는 메시지. 같은 dev 서버가 실제 DB(아직 `handoffs` 없음)로 `GET /api/verification-code?code=123456`·`GET /api/handoff?code=123456` → 둘 다 404(테이블이 없어도 500 아님, `isMissingTable`). 정상 생성·꺼내기는 테이블이 없어 아직 실제 DB로 확인 못 함 → 18번 SQL 실행 뒤 아래 (사용자 확인).
  - (사용자 확인, 18번 SQL 뒤) 로컬 `npm run dev`에서: `curl -s -X POST localhost:3000/api/handoff -H 'content-type: application/json' -d '{"source":"type_card","locale":"en","data":{"birthYear":1994,"birthMonth":3,"birthDay":8}}'` → `code`·`token`이 옴 → `curl -s "localhost:3000/api/handoff?code=<code>"` → `"kind":"handoff"`와 생년월일 → 같은 명령 한 번 더 → 404. 운영 DB에 테스트 행 1개가 생겼다 바로 지워진다.

- [x] 10. 웹 진입점 버튼 + 기기별 설치 안내
  - 선행: 9
  - 변경: `LandingTypeCard`·`SajuCalculator`·일간 글·`InviteAccept`·`QAChat` 끝의 "앱에서 이어 보기", `components/AppInstall.tsx`(iOS/Android/데스크톱 구분, 데스크톱 QR, App Store 링크는 설정 하나로 켜기 — 지금은 "iOS는 곧"). ko/en/es.
  - 함께(9번에서 넘김): 처리방침 ko/en/es(`lib/legalContent.ts`) 3항에 넘김 저장(누른 뒤에만, 항목, 7일, 꺼내면 삭제)을 적는다 — 버튼이 생겨 실제 저장이 시작되는 배포와 같이 나가야 한다. 서버 API는 `POST /api/handoff {source, locale, data}`(`lib/handoff.ts` 주석).
  - QA: `npm run lint && npm run build` 통과. 웹 preview 데스크톱(QR 보임)·mobile 뷰포트(스토어 버튼 하나) 캡처. 버튼을 누르기 전에는 넘김 저장 요청이 없는지 network로 확인.
  - 결과(2026-10-27): 공용 `components/AppInstall.tsx`를 클라이언트 컴포넌트로 바꿈(서버 컴포넌트 `DayMasterPage`가 함수 든 사전을 넘길 수 없어 `t` 대신 `locale`을 받음). `handoff` 없이 부르면 지금처럼 설치 줄(랜딩), 있으면 주 버튼이 "앱에서 이어 보기" — 누른 뒤에만 `POST /api/handoff`, 응답 뒤 코드(눌러서 복사) + 기기별 안내: Android는 스토어 버튼 하나 + 딥링크 한 번 자동 시도, iPhone은 "앱이 이미 있나요? 앱에서 열기" 링크(Safari는 처리할 앱이 없으면 오류 창을 띄워서 자동 시도 안 함), 데스크톱은 딥링크 QR + 두 스토어. 기기 판별은 마운트 뒤(UA, iPadOS는 터치 수)라 서버 HTML은 데스크톱 모양. App Store 링크는 `lib/jsonLd.ts` `APP_STORE_URL` 하나(지금 null → "iOS는 곧"). 진입점별 data: 유형 카드 = 생년월일, 계산기 = 생년월일 + 고른 시각(기본값이 "모름"이라 고르지 않으면 시각 키 없음 → 앱이 물음), 초대 = 친구의 생년월일·시각·이름(결과 뒤), 일간 글 = 빈 data(진입점 기록용), Q&A = 온보딩 입력 전체(`OnboardingWizard`가 `birthInput.handoff`로 만들어 `AppFlow` → `QAChat`). Q&A는 옛 24시간 코드를 그대로 보여 주고(깔린 1.2.0이 읽는 코드) 새 버튼은 링크·QR만(`showCode={false}`) — 코드 두 개를 보여 주지 않기 위함. Q&A의 track은 웹이 묻지 않는 고정값이라 넘기지 않음. QR 라이브러리 `qrcode-generator@1.4.4`(2019, 의존성 없음) 추가. 처리방침 ko/en/es: 1항 초대 줄에 "친구가 직접 누르면 7일 보관" 예외, 3항에 웹→앱 이어 보기(누른 때만·항목·언어·시작 화면·6자리 코드, 불러오면 즉시 삭제/7일), 보안 줄에 링크 토큰 해시.
  - QA: 루트 `npx tsc --noEmit` → exit 0. `npm run lint` → "No ESLint warnings or errors". `npm run build` → exit 0, 계산기·일간 글은 그대로 ● 정적 생성. dev 서버 + Playwright: 계산기·일간 글·유형 카드 모두 버튼 누르기 전 `/api/handoff` 요청 0건. 실제 서버(아직 `handoffs` 없음)로 누르면 503 → "지금은 코드를 만들지 못했어요…" 안내(빈 화면·가짜 코드 없음). 성공 화면은 POST 응답만 가로채서 확인: 요청 본문 계산기 `{source:"calculator",locale:"en",data:{birthYear:1994,birthMonth:3,birthDay:8}}`, es 유형 카드 `type_card`·`es`, ko 일간 글 `day_master`·`data:{}`. 캡처 `/private/tmp/claude-501/-Users-kwonhyunjo-Desktop-sasim-work/c83f01c5-e81d-4ce8-a49e-2596a249ac39/scratchpad/web-desktop-calculator.png`(코드 + QR + Play + "iOS is coming soon"), `web-android-typecard-panel.png`(390폭 Android UA, 스토어 버튼 하나 + "¿Ya tienes la app? Ábrela"). QR은 브라우저 BarcodeDetector로 읽어 `fatesaid://handoff?t=…`와 일치. 랜딩(handoff 없음)은 Play 주 버튼 그대로, 이어 보기 버튼 0. 콘솔 오류·hydration 경고 없음. 초대(실제 초대 코드 필요)와 Q&A 끝 화면(OpenAI 답 2개 필요)은 화면 캡처 안 함 — 같은 컴포넌트, 빌드·타입으로만 확인.
  - (사용자 확인, 18번 SQL + 19번 배포 뒤) 휴대폰(Android)으로 fatesaidapp.com 유형 카드 → 생년월일 → "앱에서 이어 보기" → 앱이 깔려 있으면 앱이 열림, 없으면 코드와 Play 버튼. PC에서 같은 버튼 → QR이 보이고 휴대폰 카메라로 찍으면 앱이 열림.

- [ ] 11. 앱 이어받기: 딥링크 + 코드 버튼 + 빠진 단계만 (구현·검증 끝, 남은 것은 아래 사용자 확인 하나)
  - 선행: 9
  - 변경: `mobile/App.tsx`(`fatesaid://handoff?t=` 처리), 인트로의 코드 입력을 보조 버튼으로, `VerifyCodeScreen`, 일부만 넘어온 경우 빠진 온보딩 단계만 묻고 유형 공개로. ko/en/es. OTA 가능(네이티브 변경 없음).
  - 서버(9번): 코드·링크 모두 `GET /api/handoff?t=|?code=` 한 번. `kind:"handoff"`면 `data`의 빠진 칸만 묻고, `kind:"session"`이면 지금의 옛 처리(`normalizeVerifyCodeSajuResult`) 그대로. `birthHour: null`은 "시각 모름"을 고른 것, 키가 없으면 물어야 한다.
  - 오류 문구 언어(9번 발견 사항): `VerifyCodeScreen`이 서버 `error`(한국어뿐)를 그대로 보여 주지 않고, 응답의 `code`(`bad_request`·`not_found`·`expired`·`update_app`·`unavailable`, 429는 HTTP 상태)로 ko/en/es 문구를 고른다. 서버 `lib/handoff.ts` `redeemSessionCode`의 404·410에도 `code`(`not_found`·`expired`)를 붙인다(옛 앱은 `error`만 읽으니 필드 추가는 안전). `scripts/handoff.test.mts`의 "410은 `{ error }`만" 검사를 "`error` 유지 + `code`"로 바꾼다. OTA 전 1.2.0은 그대로 한국어(옛 앱은 언어를 안 보내 서버만으로는 못 고침).
  - QA: `npx tsx scripts/handoff.test.mts` 통과(옛 코드 404·410에 `code`). mobile tsc 0. mobile-web en/es에서 없는 코드 입력 → 자기 언어 오류 문구 캡처. iOS 시뮬레이터 dev-client에서 `xcrun simctl openurl booted "fatesaid://handoff?t=<테스트 토큰>"` → 자동 이어받기 캡처. 코드 경로: 생년월일만 넘어온 코드 → 시각·도시 등만 묻는지 캡처. 증거 출처(시뮬레이터) 명시.
  - 결과(2026-10-27): 새 `mobile/lib/handoff.ts` — `redeemHandoff`(GET `/api/handoff` 한 번, 오류는 응답 `code`·429로 분류)와 `planHandoff`(넘어온 값 → 화면 상태 + 이미 답한 단계). `VerifyCodeScreen`이 옛 `/api/verification-code` 대신 `/api/handoff?code=`를 부르고, `kind:"session"`은 예전처럼 홈으로, `kind:"handoff"`는 `App.tsx` `applyHandoff`로. 오류 문구는 서버 `error`를 쓰지 않고 `verifyCode.errors.<code>`(ko/en/es, 링크가 이미 쓰였을 때 `linkUsed` 따로). `fatesaid://handoff?t=<64hex>`는 위젯 링크와 같은 Linking 처리기에서 받아 코드 화면을 `token`과 함께 열고 화면이 자동으로 꺼냄("웹에서 입력한 정보를 불러오는 중…"), 실패하면 코드 칸이 그대로 쓸 수 있음. 첫 실행이면 언어 선택이 끝난 뒤에 열고, 이 기기에 이미 사주가 있으면 링크를 무시(꺼내지 않아 행은 7일 뒤 만료). 빠진 단계만: 앞으로 갈 때 이미 답한 닉네임·성별·생년월일·시각을 건너뛰고(뒤로 가면 채워진 채로 보임), 도시는 계산을 하는 단계라 항상 보이되 넘어온 도시를 미리 고름(`CityScreen` `initialCity`), 고민은 웹이 묻지 않아 항상 물음 → 새 사용자처럼 유형 공개 화면으로. 만 14세 미만 생년월일은 "답함"으로 치지 않아 생년월일 화면과 나이 안내가 그대로 나옴. 인트로의 코드 입력은 금색 테두리 보조 버튼(44pt)으로. 서버: 옛 Q&A 코드 404·410에 `code`(`not_found`·`expired`) 추가, `error`는 그대로.
  - QA: `npx tsx scripts/handoff.test.mts` → "110 passed"(옛 404·410이 `error` 유지 + `code`, 새 엔드포인트의 없는 코드 404 `not_found`). mobile `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0. 루트 tsc 0, lint·build 통과(10번과 같은 실행). **mobile-web**(Playwright, 앱의 운영 API 호출을 로컬 dev 서버로 돌림 — 운영에는 아직 `/api/handoff`가 없음): en/es에서 `123456` 입력 → 실제 서버 응답 404 `{error:"유효하지 않거나…"(한국어), code:"not_found"}`인데 화면은 "We couldn't find that code…" / "No encontramos ese código…"(`/private/tmp/claude-501/-Users-kwonhyunjo-Desktop-sasim-work/c83f01c5-e81d-4ce8-a49e-2596a249ac39/scratchpad/app-verify-error-es.png`). 인트로 보조 버튼 `/private/tmp/claude-501/-Users-kwonhyunjo-Desktop-sasim-work/c83f01c5-e81d-4ce8-a49e-2596a249ac39/scratchpad/app-intro-en.png`. 성공 응답은 테이블이 없어 가로챈 값으로: 생년월일만(유형 카드) → 닉네임 → 성별 → (생년월일 건너뜀) → 시각, 뒤로 가면 생년월일 칸 03/08/1994(`app-handoff-skip-to-tob.png`, `app-handoff-dob-prefilled.png`). 전체(Q&A 모양) → 바로 도시 화면, "Seoul" 미리 채움. 2016년생 → 생년월일 화면 + "Sorry, you must be 14 or older…". **iOS 시뮬레이터 dev-client**(iPhone 17 Pro Max, 로컬 Metro): 사주가 저장된 테스트 사용자 상태에서 `xcrun simctl openurl booted "fatesaid://handoff?t=abab…"` → "Open in Fate Said?" → 열기 → 홈 그대로(의도대로 무시). 새 설치 상태의 자동 이어받기는 시뮬레이터 테스트 사용자를 지워야 하고 운영 API에 라우트가 없어 성공할 수 없어서 하지 않음 → 아래 (사용자 확인).
  - (사용자 확인, 18번 SQL + 19번 웹 배포 + 20번 OTA 뒤) iPhone 또는 Android에서 앱 설정 → "내 정보 초기화"(또는 새 설치) → 웹 유형 카드에서 "앱에서 이어 보기" → ① 같은 폰이면 앱이 열리고 "웹에서 입력한 정보를 불러오는 중…" 뒤 닉네임 화면, 성별 다음에 생년월일을 건너뛰고 시각 화면 ② PC면 QR을 폰으로 찍거나, 앱 첫 화면 "웹에서 시작했나요?"에 6자리 코드 → 같은 흐름. 끝에 유형 공개 화면이 나오면 성공. 같은 링크를 한 번 더 열면 "이 링크는 이미 사용됐어요".

- [x] 12. 넘김 측정
  - 선행: 2, 10, 11 (11은 구현 끝, 사용자 확인만 남음)
  - 변경: `handoff_create`(진입점)·`handoff_redeem`(딥링크/코드, 항목 수)·`store_click` 이벤트를 앱·웹·`lib/eventSchema.ts`에, `funnel-report.mts`에 "웹 넘김 → 앱 이어받기" 줄.
  - QA: funnel 테스트에 넘김 사례 추가 → 통과. 허용 목록 밖 값은 400인지 라우트 테스트. 루트·mobile tsc 0.
  - 결과(2026-10-27): 새 속성 키 없이 기존 키만 씀. 웹 `components/AppInstall.tsx` 한 곳: 넘김 POST가 성공한 뒤 `handoff_create {surface: 진입점, kind: android|ios|desktop, value: 넘긴 항목 수}`, 스토어 버튼을 누르면 `store_click {surface: 진입점 또는 landing, kind: play|app_store}`(`lib/analytics.ts` `trackHandoffCreate`·`trackStoreClick`). 앱 `VerifyCodeScreen`이 꺼내기 성공 때 `handoff_redeem {via: link|code, kind: handoff|session, surface: 진입점(서버 GET의 `source`, 앱 `mobile/lib/handoff.ts`가 알려진 값만 받음), value: 항목 수}`(옛 Q&A 코드는 `kind: session`, surface·value 없음). 리포트에 "web handoff → app redeem (all time)" 섹션: 웹 브라우저 수, `handoff_create`·`store_click`(진입점·기기·스토어별 고유 브라우저), 앱 `handoff_redeem`(네이티브 기기 분모, via·kind·진입점별), "꺼낸 뒤 `onboarding_complete`까지 간 기기". 웹·앱 ID는 연결되지 않아 나란히 센 숫자이고 사람 단위 전환이 아니라고 출력에 적음. dev 브라우저는 빼고, 테스터 표시 브라우저·기기는 끝의 "tester-marked web handoff" 섹션에만. 모르는 값은 `other_or_missing_*`로 가림.
  - QA: `npx tsx scripts/funnel-report.test.mts` → "42 passed"(기존 31 + 넘김 11: 진입점·기기·스토어 분해, 중복 제거, 모르는 값 가림, dev·테스터 제외와 테스터 섹션, 꺼내기 전 온보딩은 안 셈, ID·날짜 미출력). `npx tsx scripts/event-schema.test.mts` → "18 passed"(새 이벤트 3종 통과, `birthYear` 키·날짜 꼴 값·1994 숫자·공백 든 글·`code` 키·목록 밖 이름 `handoff_open` 모두 거절 = 라우트 400). `npx tsx scripts/handoff.test.mts` → "110 passed". 루트 `npx tsc --noEmit` → exit 0, mobile tsc(큰 스택) → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build` → exit 0. `npx tsx --env-file=.env.local scripts/funnel-report.mts` → exit 0, 102줄, UUID 꼴·날짜 꼴 0건, 새 섹션 "web handoff_create: 0 / app handoff_redeem: 0/27"(아직 배포 전이라 0이 맞음). 브라우저에서 이벤트가 실제로 나가는 것은 확인하지 않음(dev 서버 `localhost`는 `dev: true`로 리포트에서 빠짐) → 아래 (사용자 확인).
  - (사용자 확인, 18번 SQL + 19번 웹 배포 + 20번 OTA 뒤) PC 브라우저로 `https://fatesaidapp.com/?tester=1` 한 번 열기 → 유형 카드 "앱에서 이어 보기" → Play 버튼 클릭 → 폰(설정 © 7번 탭으로 테스터 켬)에서 코드 입력 → `npx tsx --env-file=.env.local scripts/funnel-report.mts` 끝의 "tester-marked web handoff → app redeem" 섹션에 `handoff_create surface=type_card: 1`, `store_click kind=play: 1`, `handoff_redeem via=code: 1`이 보이면 성공.

- [x] 13. (조건부) 웹 애착 검사 맛보기 → 앱에서 이어서 — **조건 미충족, 구현하지 않고 다음 SPEC으로 넘김**
  - 선행: 9, 11, 그리고 21번 관찰 또는 퍼널에서 "검사 시작 전 이탈"이 병목으로 보일 것. 아니면 이 항목은 다음 SPEC으로 넘긴다고 적고 닫는다.
  - 변경: 웹 module1 앞 몇 문항 화면, 넘김에 답 싣기, 앱 검사 이어하기 저장소에 넣기.
  - 결과(2026-10-28): 조건 셋 다 안 맞아 닫음. ① 21번 영어 사용자 5명 관찰은 아직 안 함. ② 11번은 사용자 확인(18 SQL·19 배포·20 OTA 뒤)이 남음. ③ 퍼널은 "검사 시작 전 이탈"을 보여 줄 수 없음 — 이벤트 허용 목록(`lib/eventSchema.ts`)에 검사 시작·완료 이벤트가 없어 리포트에 그 줄이 없고, 독립 기기 27대(최근 7일 2대, "first 100 installs: sample too small")에 본인·구버전 테스트가 섞여 있음. 다음 SPEC에서 관찰 결과와 함께 다시 판단한다(먼저 검사 시작·완료 계측이 필요하면 아래 발견 사항).
  - QA: `npx tsx --env-file=.env.local scripts/funnel-report.mts` → exit 0, "observed devices: 27", onboarding_complete 5/27, chat_start 0/27, 검사 관련 줄 없음, "web handoff_create: 0"(배포 전). 코드 변경 없음.

## C. 소재와 관찰 (돈 쓰지 않음)

- [x] 14. Year Wrapped 영상 5개 (12/1 마감)
  - 변경: `video-kit.md` 8장 훅 16~20 → 대본·TTS(`marketing/tts-samples/`), 녹화 설정(`scripts/record-app*.mts`). 노출 기간 밖에서 Wrapped를 여는 방법이 필요하면 dev 전용.
  - QA: 녹화 명령 키마다 exit 0, `ffprobe` → 1080x1920 + 오디오, 프레임 몇 장으로 자막·화면 확인. 루트 tsc 0.
  - 결과(2026-10-28): 대본 `scripts.json` `Y16`~`Y20`(훅 16~20, 화면에 실제로 적힌 말만), 음성 5개, 새 녹화 스크립트 `scripts/record-app-tour.mts`(키별 설정: 화면 열기 → 문장 박자마다 페이지 넘김·점프 컷). Wrapped는 개발용 `?date=2026-12-05` + 저장소에 Q&A 주제 횟수만 넣어 5장. 재물(Wealth)·money가 보이는 쪽, 페이월 미리보기는 찍지 않음(`video-kit.md` 8장 "제작 결과"에 계획과 달라진 점).
  - QA: `CHROME_PATH=... node --import tsx scripts/record-app-tour.mts Y16`(Y17~Y20 같음) → 다섯 다 exit 0. `ffprobe` → 다섯 다 video 1080x1920 + audio(20.4·22.4·24.1·27.0·18.2초, 1장 목표 25~35초보다 짧은 것 셋). 2.5초 간격 프레임 묶음으로 확인: Y16 표지→영역→12개월 4쪽→실행 계획→마무리, Y17 영역 4쪽 제목 = 자막, Y18 카드 1~5 순서 = 자막, Y19 Fire Horse→Fire Goat, Y20 heart→bright spot(Learning), money 칩 글자 안 보임. 대본 금지어 정규식 → Y17·Y19의 `your `만(화면 문구를 그대로 읽은 부분). 루트 `npx tsc --noEmit` → exit 0. 증거는 mobile-web(네이티브 아님). 게시는 스토어 공개 뒤 사용자.

- [x] 15. A4x·A6x 재렌더
  - 선행: 4, 6
  - 변경: `marketing/tts-samples/scripts.json` A4x·A6x 대본을 새 제목에 맞춤, TTS 재생성, `record-app-ab.mts` `highlight`. A3x의 옛 "Full Burnout"도 함께(이전 TODO 발견 사항).
  - QA: `node --import tsx scripts/record-app-ab.mts A4x|A6x|A3x` → exit 0, `ffprobe` 확인, 결과 화면 프레임이 대본과 같은 제목.
  - 결과(2026-10-28): A3x "Full Burnout" → "Running on Empty", A6x "Deep-Sleep Deprived" → "Mind, Body and Dreams All Awake"(대본 `scripts.json` + `record-app-ab.mts` `highlight`), 두 음성 다시 생성. A4x는 제목이 그대로("Fully Masked")라 대본·음성은 두고 영상만 다시 찍음(옛 영상은 4번 버그 전 화면).
  - QA: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node --import tsx scripts/record-app-ab.mts A3x`(A4x·A6x 같음) → 셋 다 exit 0. `ffprobe` → 셋 다 video 1080x1920 + audio(17.4s·18.8s·20.5s). 끝에서 3.5초 프레임의 비교 화면 제목: Steady Pace/Running on Empty, Consistent Self/Fully Masked, Peaceful Sleeper/Mind, Body and Dreams All Awake = 대본과 같음. 증거는 mobile-web.

- [x] 16. 영어 사용자 5명 관찰 키트 (문서만)
  - 변경: 새 `marketing/user-observation-kit.md` — 모집 문구(규칙이 허용하는 커뮤니티 1~2곳, 무단 DM·자동 댓글 금지), 관찰 과제(유형 카드 → 앱 이동 → 애착 검사·대화 → 리포트 미리보기 → 페이월), 기록표(멈춘 곳, 낼 것/안 낼 것과 이유), 사례비와 구매비 보상 분리, 주력 상품을 바꿀 조건(SPEC 사업 가설).
  - QA: 키트 금지어 점검(압박·정확도 표현) 0. 사례비가 월 $300 예산 안의 항목으로 적혀 있는지 확인.
  - 결과(2026-10-28): `marketing/user-observation-kit.md` — 5명으로 알 수 있는 것/없는 것, 준비(iOS 미공개면 Android만), 모집 글(r/alphaandbetausers, r/startups Feedback Friday 스레드만, 금지 행동 명시), 진행 대본 8단계, 기록표(개인 정보 칸 없음, P1~P5), 사례비 $15×5와 구매비 보전(상한 $15×5, 구매 요구 없음, 후기 조건 없음) 분리 = 최대 $150, 주력 상품을 바꿀 조건과 다음 SPEC 판단.
  - QA: 모집 글·진행 대본 영어 줄 24줄에 금지어 정규식(accura|exact|proven|predict|fortune-tell|guarantee|unlucky|doom|last chance|hurry|only today|limited|spots|countdown|diagnos) → 0건. `grep '\$300'` → 98줄 "월 약 $300 마케팅 예산 안의 항목".

## 사용자 확인·실행

- [x] 17. (사용자 확인) 구매 성공 5건 대조
  - RevenueCat 대시보드 → Customers/Transactions에서 구매 날짜·상품·샌드박스 여부·무료 체험·환불을 확인하고, 본인·테스터 구매인지 알려 주기. 키·원시 기록은 채팅이나 외부 도구에 붙이지 않는다.
  - 대조용 이벤트 목록(2026-10-28, 운영 `events` 읽기 전용 조회, ID 비출력): `purchase_success`는 행 기준 16건, 기기 6대. 모두 `kind` 없음(구버전 빌드). "5건"은 리포트의 기기 단위 숫자였다.
    | KST | 플랫폼 | 상품 | 기기 |
    |---|---|---|---|
    | 10-07 23:42, 23:49 · 10-08 09:03 | android | 구독(이름 없음) ×3 | #1 |
    | 10-08 09:05 | android | compat_report | #1 |
    | 10-12 09:22 | android | 구독 | #1 |
    | 10-12 15:09 · 10-13 11:22 | android | 구독 ×2 | #2 |
    | 10-12 15:20 / 15:23 · 10-13 11:27 | android | module3 / compat_report / module7 | #2 |
    | 10-15 15:55 | android | 구독 (dev 빌드) | #3 |
    | 10-16 10:09 | android | year_report_2027 | #4 |
    | 10-17 09:25 / 09:34 | ios | qapro.annual / module1 | #5 |
    | 10-26 13:27 | android | 구독 | #6 |
  - 해석(가설, 미확정): 10-07~08은 Play 테스트 카드 확인 날, 10-12~13은 Android 빌드·PDF 수정 날, 10-17은 TestFlight 빌드 8 실기기 구매 확인 날과 겹친다. 10-16 #4와 10-26 #6은 기억에 기록이 없다. 이 두 건이 가장 먼저 볼 대상이다.
  - 절차: ① RevenueCat → Customers에서 위 날짜·시각(KST, UTC는 9시간 빼기)으로 찾기 ② 각 거래의 Sandbox 표시·Trial 여부·Refund 여부 보기 ③ Play Console → 주문 관리에서 Android 건이 "테스트 구매"인지 보기 ④ 결과를 "#N: 본인/테스터/실사용자, 샌드박스 여부" 꼴로만 알려 주기. 실사용자 실제 청구가 0건이면 SPEC의 매출 0원과 맞는다.
  - 결과(2026-10-28, 사용자 요청으로 Claude in Chrome에서 RevenueCat 대시보드를 읽기만 함): **실제 청구 0건.** All customers 77명 · Paid 0 · Trialing 0 · Total revenue $0. Sandbox 고객 3명 중 2명이 위 16건을 모두 설명한다.
    - Android 테스트 고객 1명(별칭 2개, 재설치로 기기 ID가 바뀐 것): 10-07 무료 체험 → 연간·월간 구독 반복, compat_report ×2, module3, module7, year_report_2027(10-16), 월간 구독(10-26) — 위 #1·#2·#3·#4·#6 전부. 갱신이 30분·5분 간격이고 "billing error"로 끝나는 것은 Play 테스트 카드의 빠른 갱신이다.
    - iOS 테스트 고객 1명: 10-17 연간 체험 + module1(#5, TestFlight). 이후 매일 "갱신"은 샌드박스 가속 갱신이다.
    - 나머지 Sandbox 1명은 9-14~15(이벤트 기록 전 테스트).
  - QA: RevenueCat All customers 화면 → "Paid subscribers 0, Total revenue $0" / Sandbox 화면 → 3명, 두 고객 상세 화면이 모두 "SANDBOX DATA". SPEC 미확인 1 해소.

- [ ] 18. (사용자 확인·실행) Supabase 삭제 작업 확인 / SQL 실행
  - 대시보드 Database → Cron(또는 Functions)에 보관 기간 삭제 작업이 있는지 확인. 5·9번에서 SQL 파일이 생기면 SQL Editor에서 실행.
  - (9번, retention.sql보다 먼저) SQL Editor에 `supabase/handoffs.sql` 전체를 붙여넣고 Run → `select count(*) from handoffs;` → 0. 그다음 9번 (사용자 확인) curl. retention.sql을 이미 실행했다면 다시 한 번 실행하면 함수가 넘김 삭제 줄까지 포함해 덮어써진다.
  - (5번, 19번 웹 배포 전에) ① Database → Extensions에서 `pg_cron` 켜기 ② SQL Editor에 `supabase/retention.sql` 전체를 붙여넣고 Run ③ `select jobname, schedule from cron.job;` → `fatesaid-retention | 15 3 * * *` 한 줄 ④ 바로 한 번 `select purge_expired_data();` → 오류 없이 끝나면 성공. 대시보드에 비슷한 작업이 이미 있으면 실행 전에 알려 주기.

- [ ] 19. (사용자 실행) 커밋·푸시 → Vercel 웹 배포 확인
  - 웹 변경(2·3·5·9·10·12)이 실린다. 앱 OTA보다 먼저.
  - 9번의 `handoffs.sql`이 운영 DB에 없으면 `/api/handoff` 생성은 503이다. 옛 `/api/verification-code`(Q&A 코드)는 테이블이 없으면 "넘김 없음"으로 보고 그대로 동작한다(`lib/handoff.ts` `isMissingTable`). 그래도 10번 버튼이 함께 나가므로 18번 SQL을 이 배포 전에 실행한다.

- [ ] 20. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update`
  - 이전 TODO 11번(결과 문구 1·2)에 이번 앱 변경(2·4·6·7·11)까지 함께 실린다. 순서는 `HANDOFF_2026-10-25_ota_pending.md`(웹 먼저).

- [ ] 21. (사용자 실행) 영어 사용자 5명 관찰
  - 선행: 16, 그리고 19·20으로 넘김이 배포된 뒤가 좋다. 결과 기록표를 공유하면 13번 진행 여부와 주력 상품 판단에 쓴다.

## 발견 사항
- (15번 중) `scripts/record-*.mts`의 기본 브라우저 경로(`~/Library/Caches/ms-playwright/chromium_headless_shell-1243/...`)가 지금 없다(Playwright 캐시가 비어 있음). 녹화는 `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`로 시스템 Chrome을 써서 돌렸다. `npx playwright install chromium-headless-shell`을 다시 하거나 기본값을 바꾸면 된다.
- (13번 중) 퍼널이 검사(퀴즈) 단계를 보지 못한다: `lib/eventSchema.ts` 허용 목록에 검사 시작·완료 이벤트가 없어 "유형 공개 → 검사 시작 → 검사 완료 → 대화" 중 어디서 멈추는지 숫자로 알 수 없다. SPEC의 "바꿀 조건"(애착 검사 30문항 전 이탈)과 13번 조건을 퍼널로 판단하려면 다음 측정 작업에서 `quiz_start`·`quiz_complete`(모듈 id만)를 앱에 넣어야 한다.
- (12번 중) `handoff_redeem`은 성공만 센다. 만료·없는 코드·`update_app` 같은 실패는 기록하지 않아, 링크가 실패해서 멈춘 사람은 리포트에 안 보인다. 필요하면 다음 측정 작업에서 실패 코드를 `kind`로 따로 남긴다.
- (12번 중) iPhone의 "앱에서 열기" 링크 탭은 기록하지 않는다(앱이 열리면 `handoff_redeem`으로 잡힘). 링크 탭 대비 꺼내기 비율이 필요하면 별도 이벤트가 있어야 한다.
- (10번 중) 넘김 측정(12번) 전까지 `onboarding_complete`는 넘김으로 온 사용자도 `via: "app"`으로 찍힌다(고민 화면을 거치므로). 12번 `handoff_redeem`으로 구분한다.
- (10번 중) Q&A 끝 화면은 옛 코드 + 새 링크(별도 넘김 행)를 함께 만든다. 링크로 꺼내도 옛 코드는 24시간 남는다(한 사람용이라 그대로 둠). OTA가 충분히 퍼지면 Q&A도 새 넘김 코드 하나로 바꿀 수 있다.
- (11번 중) 앱은 넘김의 `locale`을 쓰지 않는다(첫 실행이면 언어 선택 화면을 먼저 거침). 웹 언어로 앱 언어를 미리 고르는 것은 범위 밖이라 두었다.
- (6번 중) 수면 최고점 옛 제목 "Deep-Sleep Deprived"가 영상 쪽에 남아 있다: `scripts/record-app-ab.mts:75` `highlight`, `marketing/tts-samples/scripts.json` A6x. 15번(A6x 재렌더)에서 새 제목으로 맞춘다. 이미 저장된 리포트의 옛 정의 제목(대체 제목이 아님)은 `repairSavedTypeInfo`가 바꾸지 않는다.
- (6번 중) module2 en 제목 "All Show, No Substance"(겉과 속이 다른 형)는 진단은 아니지만 판단조라 다음 문구 작업 때 볼 만하다. 이번 범위(hook·건강 상태형 제목) 밖이라 두었다.
- (3번 중) 히어로 본문 "about three minutes / 3분 만에"는 유형 카드 + 온보딩 + 첫 질문까지의 전체 시간이라 그대로 뒀다. 헤드라인 "Your birth chart, read as…"도 약속이 아니라 소개라 그대로. 필요하면 별도 문구 작업으로.
- (3번 중) `landing_cta_click`의 뜻이 "온보딩 시작"에서 "유형 카드로 이동"으로 바뀌었다(funnel-report는 이 이벤트를 안 씀). 온보딩 시작은 `position: type_card` 클릭.
- (4번 중) 이미 생성된 심층 리포트 본문은 생성 당시 대체 제목을 프롬프트로 받았다. 화면 제목은 고쳐지지만 본문 문장 안 언급은 다시 생성하기 전까지 남는다.
- (1번 중) 운영 이벤트의 `purchase_success`가 모두 `kind` 없음(unknown) — `kind`는 커밋 3046e93부터라 구버전 빌드 신호로 보임. 미확인 1·2와 같이 확인.
- (1번 중) 구독 SKU는 코드에 이름이 없고(RevenueCat 오퍼링에서 옴) 리포트에서 `other_or_missing_product`로 묶인다. 구독을 따로 세려면 ASC/Play의 실제 구독 상품 ID를 받아 `productFamily`에 넣는다(2번이나 12번에서).
- (9번 중) `/api/verification-code`·`/api/handoff`의 `error` 문구는 한국어뿐인데, 앱 `VerifyCodeScreen`은 서버 `error`를 그대로 보여 줘서 en/es 사용자가 한국어 오류를 본다(예전부터). 새 `/api/handoff`는 `code`(`not_found`·`expired`·`update_app` 등)를 같이 주니 11번에서 앱이 `code`로 자기 언어 문구를 고르면 된다. 깔린 1.2.0은 그대로. → 11번 변경·QA에 넣음.
- (9번 중) 옛 Q&A 코드 꺼내기는 읽고 나서 비우는 두 단계라 같은 코드를 동시에 두 번 내면 둘 다 받을 수 있다(예전부터, 24시간·한 사람용이라 그대로 둠). 새 넘김은 삭제가 성공한 요청만 받는다.
- (17번 중) 테스터 표시(2번)는 그 기능이 들어간 빌드부터라, 10월 본인 구매 기기(#1·#2·#4·#5)는 리포트에서 사용자 섹션에 섞인다. 17번 대조 결과가 나오면 해당 기기에서 설정 © 7번 탭으로 테스터를 켜 두면 이후 행부터는 빠진다(옛 행도 같은 기기 ID면 함께 빠짐, 단 OTA 반영 뒤).
