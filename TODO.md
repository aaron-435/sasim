# TODO: 설치·결제·재방문을 당기는 기능 묶음 (K-컬처 제외)

근거: `SPEC.md`(2026-10-05 승인). 이전 작업은 `TODO_2026-10-04.md`에 보관했고, 그쪽 사용자 실행 A·B는 아래 "사용자 실행" A로 옮겼다.

공통 규칙
- 루트 검사 = `npx tsc --noEmit` → exit 0, `npm run lint && npm run build` → 경고·오류 없음, 빌드 성공.
- mobile tsc = `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0.
- 화면 확인 = `mobile-web` 미리보기(포트 8082), `mobile` 프리셋, QA 모드 `?qa=free|pro|all&persona=<mia|lucia|jisoo|jordan>`(`mobile/dev/README.md`). 근거 스크린샷의 출처(웹 미리보기인지 시뮬레이터인지)를 적는다.
- **회귀 확인**(모든 항목 공통) = mobile-web `?qa=free&persona=jordan`에서 홈 → 운세 → Q&A 질문 1개 → 검사 목록 → 퀴즈 첫 문항 → 궁합 결과가 이전과 같이 동작하고 콘솔 오류가 없다. 기존 API 응답 형식은 바꾸지 않는다(새 필드는 선택).
- 새 문구는 ko/en/es 3개 모두. 글꼴은 `FONTS` 토큰, 색은 `COLORS`만. 새 모션은 동작 줄이기를 따른다.
- 1~11은 새 네이티브 의존성 금지(OTA 배포). 12만 예외.
- 생성 비용이 드는 유료 API는 RevenueCat 확인(fail closed). 웹(앱 RevenueCat 없음)에서는 유료 화면을 `(사용자 확인)`으로 남기고 entitlement를 흉내 내지 않는다.
- 새 Supabase 테이블은 `supabase/schema.sql`에 SQL을 쓰고, 실행은 사용자 실행 B에 모은다.

## 기반

- [x] 1. 측정과 👍/👎 피드백
  - 변경: `supabase/schema.sql`(`events` 테이블: 시각, 익명 세션 id, 언어, 플랫폼, 이름, 짧은 속성 jsonb), `app/api/events/route.ts`(허용 이벤트 이름 목록, 속성 키·길이 제한, `lib/rateLimit.ts`), `mobile/lib/analytics.ts`(실패해도 화면에 영향 없는 fire-and-forget, 배치 전송), 웹 `components/`의 랜딩·Q&A 기록. 이벤트: 온보딩 단계 진입·완료, 첫 운세 열람, Q&A 질문·한도 소진, 페이월 노출·결제 시도·성공·취소, 공유, 초대 생성·수락, 알림 탭. Q&A 답변·오늘 운세 아래 👍/👎(`feedback` 이벤트). 개인정보처리방침·App Store 개인정보 라벨 갱신용 문구 초안을 `HANDOFF` 대신 이 항목 아래에 남긴다.
  - QA: 루트 검사 + mobile tsc. 로컬 `npm run dev` 상태에서 `curl -X POST localhost:3000/api/events`로 허용 이벤트 → 200, 모르는 이름·생년월일 키·긴 속성 → 400. `grep -rn "track(" mobile/screens mobile/lib`로 위 이벤트가 모두 호출되는지 목록 대조. mobile-web에서 👍 탭 시 네트워크 요청 1건(앱은 프로덕션 API를 부르므로 웹 배포 전에는 요청 형태만 확인). 회귀 확인.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build` → 성공·경고 없음(`/api/events` 포함). mobile tsc → exit 0.
  - QA: `curl -X POST localhost:3000/api/events`(work-dev) → 허용 배치 200 `{"ok":true,"stored":0}`(로컬 DB에 `events` 테이블이 아직 없어 저장 0, 서버 로그 PGRST205 — 사용자 실행 B 후 저장됨), 모르는 이름·`birthDate` 키·날짜 모양 값·숫자 1990·60자 값·띄어쓴 자유 글·잘못된 플랫폼·21개 배치 → 모두 400.
  - QA: `grep -rnoE 'track(Once)?\("[a-z_]+"' mobile/...` → onboarding_step·onboarding_complete(App), fortune_first_view·paywall_view·share(운세), qa_ask·qa_limit_reached·paywall_view(Q&A), paywall_view(심층·신년 리포트), purchase_start/success/cancel/error(`purchases.ts` 한 곳), share 7곳, notification_tap(App), feedback(`FeedbackRow`). `type_reveal_view`·`invite_create`·`invite_accept`는 서버 허용 목록에만 있고 호출은 2·6번에서 화면과 함께 넣는다.
  - QA(mobile-web, `?qa=free&persona=jordan`, 375×812): 운세 무료 카드·Q&A 답 아래 👍/👎 줄 표시, 👎 탭 → 감사 문구 + `/api/events` 요청 1건(`feedback`, surface=fortune, value=down; fetch 가로채기로 본문 확인, 프로덕션 미배포라 404 — 같은 본문을 로컬 API에 보내면 200). Q&A 질문 1개 → `qa_ask`(topic=today) → `qa_limit_reached`+`paywall_view`. 웹 랜딩(localhost:3000) → `landing_view` 200. 회귀: 홈 → 운세 → Q&A 답 → 검사 목록 → 퀴즈 1/30 → 궁합 결과 정상, 콘솔 오류는 `/api/events` 404뿐.
  - [ ] (사용자 확인) 실기기 알림 탭·실제 구매 이벤트 — 웹 배포·SQL 실행·OTA 후 iOS dev-client에서 알림을 눌러 앱을 열고, Supabase `events`에 `notification_tap`(kind=daily 등) 행이 생기는지, 샌드박스 구매 시 `purchase_start`→`purchase_success` 행이 생기는지 확인.
  - 개인정보 문구 초안(사용자 실행 D에서 사용):
    - 개인정보처리방침 추가 문단(ko): "서비스 개선을 위해 앱과 웹사이트 사용 기록(어떤 화면을 열었는지, 어떤 버튼을 눌렀는지, 구매 시도와 결과, 답변이 도움이 되었는지에 대한 👍/👎)을 수집합니다. 이 기록은 기기마다 무작위로 만든 식별자에 묶이며 이름, 생년월일, 직접 입력한 글은 포함하지 않습니다. 기록은 서비스 개선 분석에만 쓰고 광고나 제3자 추적에 쓰지 않습니다."
    - (en): "To improve the service, we record how the app and website are used (which screens are opened, which buttons are tapped, purchase attempts and results, and 👍/👎 on whether an answer felt accurate). These records are tied to a random identifier created on your device and never include your name, birth date or anything you type. We use them only to analyze and improve the service, not for advertising or third-party tracking."
    - (es): "Para mejorar el servicio, registramos cómo se usan la app y el sitio web (qué pantallas se abren, qué botones se tocan, los intentos y resultados de compra, y el 👍/👎 sobre si una respuesta te pareció acertada). Estos registros se asocian a un identificador aleatorio creado en tu dispositivo y nunca incluyen tu nombre, tu fecha de nacimiento ni lo que escribes. Solo los usamos para analizar y mejorar el servicio, no para publicidad ni seguimiento de terceros."
    - App Store 개인정보 라벨: "사용 데이터 → 제품 상호 작용" + "식별자 → 기기 ID(무작위 설치 id)" 추가, 용도 "분석", 사용자와 연결 안 됨, 추적 아니오. Play 데이터 보안: "앱 활동 → 앱 상호작용", "기기 또는 기타 ID", 수집 O·공유 X·분석 목적.

## 첫 감탄

- [x] 2. 앱 유형 공개 화면 + 웹 유형 카드·계산기 페이지
  - 변경: `mobile/App.tsx`(고민 선택 다음 새 `typeReveal` 단계 → 홈. 기존 저장 데이터가 있는 사용자는 건너뜀), 새 `mobile/screens/TypeRevealScreen.tsx`(TypeScreen 부품 재사용: 유형 이름·한 줄·유명인·공유·홈으로). 웹: `components/Landing.jsx`에 생년월일만으로 유형 카드(기존 `/api/saju` 응답의 `sajuType` 사용) + 설치 안내, 새 `app/saju-calculator/page.tsx`(일간·네 기둥·오행 분포, 메타데이터·OG 포함). Q&A 맛보기는 그대로.
  - QA: 루트 검사 + mobile tsc. mobile-web에서 저장 데이터를 지운 뒤 온보딩 끝까지 → 유형 공개 화면 → 홈(스크린샷). `?persona=jordan`(기존 사용자)에서는 공개 화면 없이 홈. 웹 `npm run dev`에서 랜딩 생년월일 입력 → 카드, `/saju-calculator` 렌더(ko/en/es). 회귀 확인.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build` → 성공(`ƒ /saju-calculator` 7.39 kB 포함, 새 경고 없음 — edge runtime 안내는 기존 `opengraph-image`). mobile tsc → exit 0.
  - QA(mobile-web, 375×812): localStorage 비우고 English → 닉네임 → 성별 → 1992-03-15 → 시간 모름 → New York → 고민 → **유형 공개 화면**("Here's your saju type", Steel · Harvest, 타고난 나, 유명인 3명, 공유 카드 미리보기 + 테두리 "Share result", 하단 고정 "Go to home") → 탭 → 홈. 고민 다음 `/api/events` 배치 전송 확인(프로덕션 미배포라 404, 같은 모양 `type_reveal_view` 본문 3종을 로컬 API에 보내면 200). `?qa=free&persona=jordan`은 공개 화면 없이 바로 홈.
  - QA(웹 work-dev, 375×812): 랜딩 생년월일만 입력 → 유형 카드(이름·한 줄·타고난 나·지금의 기운·유명인 2명·시간 없이 계산 안내·"전체 원국은 앱에서"·곧 출시 안내), `/api/saju` 429ms, `type_reveal_view`(surface=landing) 200. "시간과 도시까지 넣고 자세히 보기" → 기존 온보딩 1/5. `/saju-calculator?lang=ko` 1992-03-15 09시 → 壬申·癸卯·庚寅·庚辰, 일간 庚 "금 기운 · 양"(앱 Steel=庚과 일치), 오행 막대, 가로 스크롤 없음. `?lang=es` 2월 30일 → "Revisa tu fecha de nacimiento.", 1992-02-15 시간 모름 → 시주 "Hora desconocida". en·es `<title>`·description·canonical·hreflang 4개·og:image 확인(curl). 콘솔 오류 0.
  - QA 회귀(mobile-web `?qa=free&persona=jordan`): 홈 → 운세 총론 → Q&A 답 1개(0 of 1 left) → 검사 목록 → Burnout 1/30 → 궁합 결과(Jordan · Sam) 정상. 콘솔 오류는 `/api/events` 404(프로덕션 미배포)뿐.
  - [ ] (사용자 확인) iOS dev-client에서 새로 온보딩(설정 → 로그아웃 → 다시 입력) → 고민 다음 유형 공개 화면 → "공유하기"로 이미지 공유 시트가 뜨는지, "홈으로" 후 앱을 다시 열면 공개 화면 없이 홈인지. Android에서는 공개 화면에서 하드웨어 뒤로 → 홈.

## 구독 강화

- [ ] 3. 구독 페이월 체험·연간 표시 + 좋은 날 찾기
  - 변경: `mobile/lib/purchases.ts`(현재 오퍼링의 월간·연간 패키지와 intro price 읽기, `getMonthlyPackage` 동작은 유지), 운세·Q&A 구독 페이월 부품(패키지가 둘이면 고르기, 체험 문구는 패키지 정보로, 하드코딩 가격 없음). 좋은 날 찾기: 새 API `/api/goodDays`(목적 5종, 앞으로 30일, 기존 일진 엔진 재사용, 구독 확인), `FortuneScreen` 새 진입(탭 또는 하위 화면), 목적·이유 문구 ko/en/es. "피할 날" 표현 없음.
  - QA: 루트 검사 + mobile tsc. `curl` 로 `/api/goodDays` 구독 없음 → 401/403, 서버 계산 함수를 스크래치 스크립트로 persona 4명 × 목적 5종 호출해 날짜 3~5개·이유 한 줄·금지어("unlucky", "avoid", "흉", "피해야") 0건. mobile-web에서 연간 패키지 없는 상태가 지금과 같은 화면. (사용자 확인) 시뮬레이터 dev-client + 샌드박스에서 연간·체험 등록 후 페이월에 "7일 무료" 표시와 구매. 회귀 확인.

- [ ] 4. "그 사람에 대해 묻기" Q&A
  - 변경: `mobile/data/questionBank.json`·`lib/questionBank.json`에 새 분류(질문 20개 안팎, ko/en/es, 마음 단정·관계 결말 예언 없는 질문만), `mobile/lib/qaTopicGroups.ts`, Q&A 화면에 상대 생년월일 입력(궁합 폼 부품·날짜 검증 재사용), `/api/qa-answer`에 선택 필드 `other`(없으면 지금과 같음), `lib/qaChat.ts`·`lib/qaPrompts.ts`에 두 원국 구조화 데이터와 금지 규칙. 일일 한도는 기존 것 공유.
  - QA: 루트 검사 + mobile tsc. 스크래치 스크립트로 `getQAAnswer`를 `other` 있음·없음 각 3개 언어 호출(약 $0.05 이내) → `other` 없을 때 기존과 같은 형식, 있을 때 두 사람 원국 사실 인용, "그 사람은 당신을 ~한다" 단정·이별 예언 없음. mobile-web에서 입력 → 질문 → 답, 한도 차감. 회귀 확인.

## 첫 결제

- [ ] 5. 궁합 상세 리포트 (`compat_report`)
  - 변경: 새 `lib/compatReport*.ts`(프롬프트·파싱·품질 검사, "나쁜 궁합 없음"·압박 규칙), `/api/compatReport`(무료 미리보기)와 `/api/compatReport/paid`(RevenueCat 거래 확인 후 생성, 거래 id + 상대 조합 기록 — 소모성), `supabase/schema.sql`(구매 기록 테이블), `mobile/lib/purchases.ts`(상품 `compat_report`, 오퍼링 위치는 `IAP_PRODUCTS.md`에 추가), 새 `mobile/screens/CompatReportScreen.tsx`(`ReportPager`·`ReportClosingPage` 재사용, 페이월, 내 리포트 저장), `CompatibilityScreen`에 진입 행. `IAP_PRODUCTS.md`에 상품 스펙 추가.
  - QA: 루트 검사 + mobile tsc. `curl`로 paid 엔드포인트 구매 증빙 없음 → 403. 스크래치로 무료 부분 생성 persona 2쌍 × 3개 언어(약 $0.1) → 금지어 0건, 원국 사실만. mobile-web에서 궁합 결과 → 미리보기 → 페이월(스크린샷). (사용자 확인) 상품 등록 후 샌드박스 구매 → 전체 읽기 → 내 리포트, 같은 상대 재열람 시 재구매 요구 없음. 회귀 확인.

## 바이럴

- [ ] 6. 초대 링크와 친구 궁합
  - 변경: `supabase/schema.sql`(`invites`: 코드, 보낸 사람 세션·표시 이름·궁합 계산용 최소 데이터, 친구 결과, 만료 30일), `/api/invites`(생성·조회·수락, rate limit), 웹 새 `app/c/[code]/page.tsx`(동의 문구, 친구 생년월일 입력, 관계 이름 + 한 줄, 설치 안내, 만료 화면, ko/en/es는 보낸 사람 언어 기본), 앱 `CompatibilityScreen`에 "친구와 궁합 보기"(공유 시트로 링크), 새 "받은 궁합" 목록(탭하면 기존 궁합 결과 화면).
  - QA: 루트 검사 + mobile tsc. 로컬 dev에서 `curl`로 초대 생성 → `/c/<code>` 열어 입력 → 조회 API에 결과, 만료 시각을 과거로 둔 코드 → 만료 화면. 저장 행에 생년월일 외 불필요한 값이 없는지 스키마 대조. mobile-web에서 링크 생성·공유 시트 호출(웹은 클립보드 대체 가능)과 받은 궁합 목록(프로덕션 API 배포 전엔 로컬 API 응답 모양으로 확인). 회귀 확인.

- [ ] 7. 그룹 케미 맵 + 커플 모드
  - 선행: 6
  - 변경: 새 `lib/groupChemistry.ts`(오행 분포 규칙으로 역할 배정, LLM 없음, 서버·앱 공용 사본 또는 API), 새 `mobile/screens/GroupChemistryScreen.tsx`(3~6명 직접 입력 또는 받은 궁합에서 고르기, 공유 카드 — width-only 캡처 규칙), 커플: `supabase/schema.sql`(`pairs`), `/api/pairs`(초대 코드로 연결·해제), `/api/coupleDaily`(두 사람 중 한 명 구독 확인, 오늘 두 사람 흐름), 홈 커플 카드, 설정에 연결 해제.
  - QA: 루트 검사 + mobile tsc. 스크래치로 `groupChemistry` 3·4·6명 입력 → 사람마다 역할 하나, 같은 입력은 같은 결과, 부정 표현 0건. `curl`로 pairs 연결 → coupleDaily 구독 없음 403 → 해제 후 404. mobile-web 그룹 화면·공유 미리보기 스크린샷. (사용자 확인) 두 기기에서 연결 후 한쪽만 구독일 때 양쪽 홈에 커플 카드. 회귀 확인.

## 재방문

- [ ] 8. 한 줄 저널과 월말 패턴 리포트
  - 변경: 새 `mobile/lib/journalStorage.ts`(날짜별 기분·한 줄, 기기 저장), `FortuneScreen` 오늘 운세를 연 뒤 "오늘 한 줄" 입력, 새 `mobile/screens/JournalScreen.tsx`(달력·월말 리포트 진입, 기록 10개 이상인 달만), `/api/journalReport`(구독 확인, 그 달 일진 흐름 × 기록 교차, 관찰 3~5개, 원문 저장 안 함 — `llm_usage_log`에도 원문 없음, 위기 표현 감지 시 기존 안전 안내).
  - QA: 루트 검사 + mobile tsc. `curl` 구독 없음 → 403. 스크래치로 생성 함수에 가짜 기록 12개 × 3개 언어(약 $0.05) → 관찰 3~5개, 진단·처방 말투 없음, 위기 문장이 든 기록 → 안전 안내 분기. `grep`으로 라우트에 Supabase 쓰기 없음 확인. mobile-web 입력·저장·달력 스크린샷. 회귀 확인.

- [ ] 9. 오늘의 원소 컬러, 절기 알림, 일간 10일 레슨
  - 변경: 원소 컬러 — `/api/dailyFortune`에 선택 필드(보완 오행·색·무드 한 줄), 홈·운세 표시와 공유 카드. 절기 — 서버 `lib/solarTerms.ts`로 앞으로 1년 절기 날짜를 주는 API(또는 기존 응답의 선택 필드), `mobile/lib/routineNotification.ts` 옆 새 절기 알림 예약, 설정 토글. 레슨 — 새 `mobile/lib/dayMasterLessons*.ts`(일간 10종 × 10장 × ko/en/es, 고전 용어는 풀어 쓰기), `SajuLearnScreen`에서 진입, 진행 기기 저장.
  - QA: 루트 검사 + mobile tsc + `npm run validate:manseryeok`(절기 계산을 건드렸다면). 스크래치로 절기 API 1년치 24개, 2026·2027 입춘 날짜가 엔진의 연 경계와 같은지. 레슨 데이터 스크립트 검사: 10 × 10 × 3 = 300장 빈 칸 없음, 한자 없음(ko 보조 표기 제외). mobile-web 홈 원소 컬러·레슨 3장 넘김·설정 토글 스크린샷. (사용자 확인) 실기기에서 절기 알림 예약 목록. 회귀 확인.

- [ ] 10. Year Wrapped (12월 1일 전 배포)
  - 변경: 새 `mobile/screens/WrappedScreen.tsx`(카드 5장 페이지 넘김, 장마다 공유 이미지, 마지막 장 → 신년 리포트), 데이터는 기존 연간 운세·`qaHistory`(없으면 그 장 건너뜀), 홈 진입점은 기기 날짜 12/1~1/31에만. 다가오는 해 미리보기는 사실만, 압박 규칙 준수.
  - QA: mobile tsc. mobile-web에서 기기 날짜를 바꾸는 dev 오버라이드(QA 모드 파라미터 추가, 프로덕션에서 무시)로 12월 → 진입점·카드 5장·공유 미리보기 스크린샷, 10월 → 진입점 없음, Q&A 기록 없는 persona → 4장. 회귀 확인.

## 새 출발 모듈과 네이티브

- [ ] 11. 새 출발 심리검사 모듈 `module12` — 콘텐츠·서버
  - 변경: `MODULE_PLAYBOOK.md`에 module12, `lib/modulePlaybooks.ts`(플레이북 + `MODULE_CHAT_SETS.module12`), 퀴즈 30문항·차원·채점(`mobile/lib/quiz/module12Transition.ts`, 루트 `lib/` 웹용 사본이 필요한지 확인), 리포트 모듈 페이지 설정, ko/en/es. 서버 허용 moduleId 목록. 앱 화면 연결은 12번.
  - QA: 루트 검사. `npx tsx scripts/check-playbook-sets.mts`, `npx tsx scripts/check-chat-sets.mts` 통과. `npx tsx --env-file=.env.local scripts/sim-chat.mts 25 <module12 페르소나 ko,en,es> --flow v2`(페르소나 추가 필요, 약 $0.3) → `scripts/judge-chat.mts`로 채점, 공통 평균 1.8 근처·위반 0건(기준선 `q11-final*`). 기존 모듈 1개 sim 짧게(8턴)로 회귀 없음.

- [ ] 12. 새 출발 모듈 앱 연결 + 홈 위젯 + 리뷰 요청 (스토어 빌드)
  - 선행: 11
  - 변경: `mobile/lib/quiz/modules.ts`에 module12, 검사 목록·퀴즈·대화·리포트·PDF 연결, 상품 `report_module12`(`IAP_PRODUCTS.md`), 번들 안내 문구 "12개"(가격은 패키지 정보). 위젯: 라이브러리 후보(iOS·Android)를 조사해 **사용자가 고른 뒤** 설치, 오늘의 리듬 이름 + 원소 컬러, 탭하면 오늘 운세, 무료 범위만. 리뷰 요청: `expo-store-review`, 리포트 마지막 장 도달 또는 구매 성공 직후 한 번, 오류·취소 직후 금지. `app.json`·EAS 설정.
  - QA: mobile tsc. mobile-web에서 검사 목록에 새 모듈 → 퀴즈 30문항 → 대화 시작(프로덕션 API 배포 후). iOS 시뮬레이터 dev-client 빌드 성공, 홈 화면 위젯 추가 스크린샷(시뮬레이터 출처 명시). `grep`으로 리뷰 요청 호출 위치 2곳뿐. (사용자 확인) 샌드박스에서 `report_module12` 구매, Android 위젯, 번들 구매자에게 module12 열림.

## 사용자 실행 (마지막)

- [ ] A. (사용자 실행) 이전 배치 배포와 실기기 확인 — `TODO_2026-10-04.md`의 A·B에서 옮김
  - 순서·확인 항목은 `TODO_2026-10-04.md` A·B 그대로. 이번 작업을 배포하기 전에 먼저 끝내는 것을 권장.

- [ ] B. (사용자 실행) Supabase SQL 실행
  - 1·5·6·7번이 `supabase/schema.sql`에 추가한 `events`, 궁합 리포트 구매 기록, `invites`, `pairs`를 SQL Editor에서 실행. 각 항목 배포 전에.

- [ ] C. (사용자 실행) 스토어·RevenueCat 설정
  - 구독: 7일 무료 체험(intro offer), 연간 요금제(가격 결정) — App Store Connect·Play Console 등록 후 RevenueCat 오퍼링에 연간 패키지 추가.
  - 새 상품: `compat_report`(소모성, $6.99 가정), `report_module12`(비소모성, $14.99) — 양 스토어 등록, RevenueCat entitlement·오퍼링 연결, 번들 상품에 `report_module12` entitlement 추가(기존 번들 구매자에게 열림).
  - Apple 2.3.1(a) 심사 회신 결과를 본 뒤 시점 결정.

- [ ] D. (사용자 실행) 개인정보 문서 갱신
  - 1번에서 만든 초안으로 개인정보처리방침(`app/privacy`)과 App Store 개인정보 라벨·Play 데이터 보안 양식에 "사용 데이터(이벤트)", 초대·커플 연결 데이터를 반영.

- [ ] E. (사용자 실행) 배포
  - 항목마다: 커밋 → `git push origin main` → Vercel Ready 확인 → OTA(`cd mobile && npx --yes eas-cli update --branch production --environment production --message "<항목>" --non-interactive`). 10번은 12월 1일 전.
  - 12번만 EAS 프로덕션 빌드 → TestFlight·Play 내부 테스트 → 스토어 제출.

## 다음 SPEC 후보

- 웹 SEO 글 30개(일간 10 × ko/en/es) — 2026-10-05 사용자 결정으로 다음 SPEC 첫 항목.
- K-컬처 기능(K-드라마 원형, 스타와 궁합) — 정리 후 다시 검토.

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

- (1번 중) 웹 Next 개발 모드(React Strict Mode)에서는 랜딩 `landing_view`가 두 번 기록된다. 프로덕션 빌드에서는 한 번이라 그대로 둠. 분석할 때 `dev=true` 행은 빼고 본다.
- (1번 중) mobile-web(`?qa=` 개발 모드) 이벤트도 프로덕션 API로 가므로 웹 배포 뒤에는 `platform=app-web`, `dev=true`로 쌓인다. 분석에서 제외 필터 필요.
- (2번 중) mobile-web에서 사주 유형 공유 카드 미리보기 아래쪽에 내용 없이 배경 무늬만 수백 px 이어진다. 기존 `TypeScreen`(홈 → 유형)에서도 같아서 이번 변경과 무관. 배경 `Image`(absoluteFill)가 웹에서 카드 높이를 키우는 것으로 보임. 네이티브 캡처 이미지에도 생기는지 시뮬레이터에서 확인 필요.
- (2번 중) 계산기 페이지 `/saju-calculator`로 들어오는 내부 링크와 `sitemap`이 없다. 다음 SPEC(SEO 글)에서 사이트맵·랜딩 링크와 함께 정리.
