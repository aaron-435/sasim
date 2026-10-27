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

- [ ] 9. 넘김 저장·코드 서버
  - 선행: 1
  - 변경: `app/api/verification-code/route.ts`(또는 새 `app/api/handoff`), 저장 위치(`sessions` 확장 or 새 테이블 SQL), 6자리 코드 + 긴 토큰, 7일 만료, 꺼내면 삭제, 속도 제한. 기존 GET 응답 모양 유지.
  - QA: 라우트 테스트(새 `.test.mts`: 만료·1회용·토큰/코드 두 경로·옛 응답 모양) 통과. `npm run lint && npm run build` 통과. 새 테이블이면 SQL 파일 + 18번에 실행 절차.

- [ ] 10. 웹 진입점 버튼 + 기기별 설치 안내
  - 선행: 9
  - 변경: `LandingTypeCard`·`SajuCalculator`·일간 글·`InviteAccept`·`QAChat` 끝의 "앱에서 이어 보기", `components/AppInstall.tsx`(iOS/Android/데스크톱 구분, 데스크톱 QR, App Store 링크는 설정 하나로 켜기 — 지금은 "iOS는 곧"). ko/en/es.
  - QA: `npm run lint && npm run build` 통과. 웹 preview 데스크톱(QR 보임)·mobile 뷰포트(스토어 버튼 하나) 캡처. 버튼을 누르기 전에는 넘김 저장 요청이 없는지 network로 확인.

- [ ] 11. 앱 이어받기: 딥링크 + 코드 버튼 + 빠진 단계만
  - 선행: 9
  - 변경: `mobile/App.tsx`(`fatesaid://handoff?t=` 처리), 인트로의 코드 입력을 보조 버튼으로, `VerifyCodeScreen`, 일부만 넘어온 경우 빠진 온보딩 단계만 묻고 유형 공개로. ko/en/es. OTA 가능(네이티브 변경 없음).
  - QA: mobile tsc 0. iOS 시뮬레이터 dev-client에서 `xcrun simctl openurl booted "fatesaid://handoff?t=<테스트 토큰>"` → 자동 이어받기 캡처. 코드 경로: 생년월일만 넘어온 코드 → 시각·도시 등만 묻는지 캡처. 증거 출처(시뮬레이터) 명시.

- [ ] 12. 넘김 측정
  - 선행: 2, 10, 11
  - 변경: `handoff_create`(진입점)·`handoff_redeem`(딥링크/코드, 항목 수)·`store_click` 이벤트를 앱·웹·`lib/eventSchema.ts`에, `funnel-report.mts`에 "웹 넘김 → 앱 이어받기" 줄.
  - QA: funnel 테스트에 넘김 사례 추가 → 통과. 허용 목록 밖 값은 400인지 라우트 테스트. 루트·mobile tsc 0.

- [ ] 13. (조건부) 웹 애착 검사 맛보기 → 앱에서 이어서
  - 선행: 9, 11, 그리고 21번 관찰 또는 퍼널에서 "검사 시작 전 이탈"이 병목으로 보일 것. 아니면 이 항목은 다음 SPEC으로 넘긴다고 적고 닫는다.
  - 변경: 웹 module1 앞 몇 문항 화면, 넘김에 답 싣기, 앱 검사 이어하기 저장소에 넣기.
  - QA: `npm run lint && npm run build`, mobile tsc 0. 웹에서 몇 문항 → 코드 → 앱(mobile-web 또는 시뮬레이터)에서 다음 문항부터 시작하는 캡처.

## C. 소재와 관찰 (돈 쓰지 않음)

- [ ] 14. Year Wrapped 영상 5개 (12/1 마감)
  - 변경: `video-kit.md` 8장 훅 16~20 → 대본·TTS(`marketing/tts-samples/`), 녹화 설정(`scripts/record-app*.mts`). 노출 기간 밖에서 Wrapped를 여는 방법이 필요하면 dev 전용.
  - QA: 녹화 명령 키마다 exit 0, `ffprobe` → 1080x1920 + 오디오, 프레임 몇 장으로 자막·화면 확인. 루트 tsc 0.

- [ ] 15. A4x·A6x 재렌더
  - 선행: 4, 6
  - 변경: `marketing/tts-samples/scripts.json` A4x·A6x 대본을 새 제목에 맞춤, TTS 재생성, `record-app-ab.mts` `highlight`. A3x의 옛 "Full Burnout"도 함께(이전 TODO 발견 사항).
  - QA: `node --import tsx scripts/record-app-ab.mts A4x|A6x|A3x` → exit 0, `ffprobe` 확인, 결과 화면 프레임이 대본과 같은 제목.

- [ ] 16. 영어 사용자 5명 관찰 키트 (문서만)
  - 변경: 새 `marketing/user-observation-kit.md` — 모집 문구(규칙이 허용하는 커뮤니티 1~2곳, 무단 DM·자동 댓글 금지), 관찰 과제(유형 카드 → 앱 이동 → 애착 검사·대화 → 리포트 미리보기 → 페이월), 기록표(멈춘 곳, 낼 것/안 낼 것과 이유), 사례비와 구매비 보상 분리, 주력 상품을 바꿀 조건(SPEC 사업 가설).
  - QA: 키트 금지어 점검(압박·정확도 표현) 0. 사례비가 월 $300 예산 안의 항목으로 적혀 있는지 확인.

## 사용자 확인·실행

- [ ] 17. (사용자 확인) 구매 성공 5건 대조
  - RevenueCat 대시보드 → Customers/Transactions에서 구매 날짜·상품·샌드박스 여부·무료 체험·환불을 확인하고, 본인·테스터 구매인지 알려 주기. 키·원시 기록은 채팅이나 외부 도구에 붙이지 않는다.

- [ ] 18. (사용자 확인·실행) Supabase 삭제 작업 확인 / SQL 실행
  - 대시보드 Database → Cron(또는 Functions)에 보관 기간 삭제 작업이 있는지 확인. 5·9번에서 SQL 파일이 생기면 SQL Editor에서 실행.
  - (5번, 19번 웹 배포 전에) ① Database → Extensions에서 `pg_cron` 켜기 ② SQL Editor에 `supabase/retention.sql` 전체를 붙여넣고 Run ③ `select jobname, schedule from cron.job;` → `fatesaid-retention | 15 3 * * *` 한 줄 ④ 바로 한 번 `select purge_expired_data();` → 오류 없이 끝나면 성공. 대시보드에 비슷한 작업이 이미 있으면 실행 전에 알려 주기.

- [ ] 19. (사용자 실행) 커밋·푸시 → Vercel 웹 배포 확인
  - 웹 변경(2·3·5·9·10·12)이 실린다. 앱 OTA보다 먼저.

- [ ] 20. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update`
  - 이전 TODO 11번(결과 문구 1·2)에 이번 앱 변경(2·4·6·7·11)까지 함께 실린다. 순서는 `HANDOFF_2026-10-25_ota_pending.md`(웹 먼저).

- [ ] 21. (사용자 실행) 영어 사용자 5명 관찰
  - 선행: 16, 그리고 19·20으로 넘김이 배포된 뒤가 좋다. 결과 기록표를 공유하면 13번 진행 여부와 주력 상품 판단에 쓴다.

## 발견 사항
- (6번 중) 수면 최고점 옛 제목 "Deep-Sleep Deprived"가 영상 쪽에 남아 있다: `scripts/record-app-ab.mts:75` `highlight`, `marketing/tts-samples/scripts.json` A6x. 15번(A6x 재렌더)에서 새 제목으로 맞춘다. 이미 저장된 리포트의 옛 정의 제목(대체 제목이 아님)은 `repairSavedTypeInfo`가 바꾸지 않는다.
- (6번 중) module2 en 제목 "All Show, No Substance"(겉과 속이 다른 형)는 진단은 아니지만 판단조라 다음 문구 작업 때 볼 만하다. 이번 범위(hook·건강 상태형 제목) 밖이라 두었다.
- (3번 중) 히어로 본문 "about three minutes / 3분 만에"는 유형 카드 + 온보딩 + 첫 질문까지의 전체 시간이라 그대로 뒀다. 헤드라인 "Your birth chart, read as…"도 약속이 아니라 소개라 그대로. 필요하면 별도 문구 작업으로.
- (3번 중) `landing_cta_click`의 뜻이 "온보딩 시작"에서 "유형 카드로 이동"으로 바뀌었다(funnel-report는 이 이벤트를 안 씀). 온보딩 시작은 `position: type_card` 클릭.
- (4번 중) 이미 생성된 심층 리포트 본문은 생성 당시 대체 제목을 프롬프트로 받았다. 화면 제목은 고쳐지지만 본문 문장 안 언급은 다시 생성하기 전까지 남는다.
- (1번 중) 운영 이벤트의 `purchase_success`가 모두 `kind` 없음(unknown) — `kind`는 커밋 3046e93부터라 구버전 빌드 신호로 보임. 미확인 1·2와 같이 확인.
- (1번 중) 구독 SKU는 코드에 이름이 없고(RevenueCat 오퍼링에서 옴) 리포트에서 `other_or_missing_product`로 묶인다. 구독을 따로 세려면 ASC/Play의 실제 구독 상품 ID를 받아 `productFamily`에 넣는다(2번이나 12번에서).
