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

- [x] 3. 구독 페이월 체험·연간 표시 + 좋은 날 찾기
  - 변경: `mobile/lib/purchases.ts`(현재 오퍼링의 월간·연간 패키지와 intro price 읽기, `getMonthlyPackage` 동작은 유지), 운세·Q&A 구독 페이월 부품(패키지가 둘이면 고르기, 체험 문구는 패키지 정보로, 하드코딩 가격 없음). 좋은 날 찾기: 새 API `/api/goodDays`(목적 5종, 앞으로 30일, 기존 일진 엔진 재사용, 구독 확인), `FortuneScreen` 새 진입(탭 또는 하위 화면), 목적·이유 문구 ko/en/es. "피할 날" 표현 없음.
  - QA: 루트 검사 + mobile tsc. `curl` 로 `/api/goodDays` 구독 없음 → 401/403, 서버 계산 함수를 스크래치 스크립트로 persona 4명 × 목적 5종 호출해 날짜 3~5개·이유 한 줄·금지어("unlucky", "avoid", "흉", "피해야") 0건. mobile-web에서 연간 패키지 없는 상태가 지금과 같은 화면. (사용자 확인) 시뮬레이터 dev-client + 샌드박스에서 연간·체험 등록 후 페이월에 "7일 무료" 표시와 구매. 회귀 확인.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build` → 성공(`ƒ /api/goodDays` 포함, 새 경고 없음 — 다른 세션 dev 서버의 `.next`를 건드리지 않으려고 스크래치 복사본에서 빌드). mobile tsc → exit 0.
  - QA: 빌드본 `next start`(3100) + 로컬 RevenueCat 대역(`REVENUECAT_API_BASE`)에 `curl -X POST /api/goodDays` → appUserId 없음 401 `no_user`, 모르는 목적·일간 400, 구독 없음·만료 403 `not_subscribed`, RevenueCat 오류 503 `unavailable`, 구독 중 200(날짜 5개). 실제 RevenueCat에는 요청하지 않음.
  - QA: 스크래치 `getGoodDays`를 일간 10종 × 목적 5종 호출 → 50건 모두 3~5일, 속도를 늦출 리듬(otherChallengesSelf) 0건, 리듬당 최대 2일. 문구 금지어(unlucky·avoid·흉·피해야·피할·evita·mala suerte·나쁜) 검사 → 0건(코드 주석 1줄 제외), 한자 0자.
  - QA(mobile-web, 375×812, Playwright): `?qa=free&persona=jordan` 운세 페이월 = 이전과 같은 "Subscribe · $7.99/month"·월간 갱신 문구(혜택 목록에 "Find a good day" 한 줄 추가). `&offer=both` → 연간(Save 47%, About $4.16/month, $49.99/year, 기본 선택)·월간 행, "7 days free, then $49.99/year", "Start free trial", 체험 갱신 문구 → 월간 선택 시 "…then $7.99/month"·월간 갱신 문구로 바뀜. Q&A `&offer=trial` 한도 소진 → 같은 체험 줄·버튼·갱신 문구, 탭하면 웹엔 스토어가 없어 구매 오류 안내(예상대로).
  - QA(mobile-web `?qa=pro`): 오늘 운세 끝·이달 탭 위 "좋은 날 찾기" 카드 → 목적 5개 → 면접(en)·이사(ko)·계약(es) 결과 3~5장(날짜·오늘 배지·리듬 이름·이유 한 줄·참고 문구). 프로덕션엔 아직 라우트가 없어 Playwright로 요청을 로컬 API(대역 구독 확인)에 넘겨 확인. 웹은 appUserId가 없어 그대로 넘기면 401 → "구독을 확인하지 못했어요" + 다시 시도. es 제목 "Buenos días para"(=좋은 아침)는 "Días favorables ·"로 고침.
  - QA 회귀(mobile-web `?qa=free&persona=jordan`): 홈 → 운세 총론 → Q&A 답 1개 → 한도 → 검사 목록 → Burnout 1/30 → 궁합 결과(Jordan · Sam) 정상. 콘솔 오류는 `/api/events` 404(프로덕션 미배포)뿐.
  - [ ] (사용자 확인) 사용자 실행 C로 연간 패키지·7일 무료 체험을 등록한 뒤 iOS dev-client(샌드박스 계정)에서: 운세 → 페이월에 연간·월간 두 행과 "7일 무료, 이후 …" 줄이 스토어 가격으로 보이는지, 연간 선택 → "무료 체험 시작하기" → 결제 시트가 연간 상품인지, 구매 후 운세가 열리는지. 체험을 이미 쓴 샌드박스 계정에서는 체험 줄 없이 "구독하기 · …"로 보이는지. 웹 배포 후 구독 중인 기기에서 운세 → 좋은 날 찾기 → 목적 하나 → 날짜 목록이 뜨는지.

- [x] 4. "그 사람에 대해 묻기" Q&A
  - 변경: `mobile/data/questionBank.json`·`lib/questionBank.json`에 새 분류(질문 20개 안팎, ko/en/es, 마음 단정·관계 결말 예언 없는 질문만), `mobile/lib/qaTopicGroups.ts`, Q&A 화면에 상대 생년월일 입력(궁합 폼 부품·날짜 검증 재사용), `/api/qa-answer`에 선택 필드 `other`(없으면 지금과 같음), `lib/qaChat.ts`·`lib/qaPrompts.ts`에 두 원국 구조화 데이터와 금지 규칙. 일일 한도는 기존 것 공유.
  - QA: 루트 검사 + mobile tsc. 스크래치 스크립트로 `getQAAnswer`를 `other` 있음·없음 각 3개 언어 호출(약 $0.05 이내) → `other` 없을 때 기존과 같은 형식, 있을 때 두 사람 원국 사실 인용, "그 사람은 당신을 ~한다" 단정·이별 예언 없음. mobile-web에서 입력 → 질문 → 답, 한도 차감. 회귀 확인.
  - 계획과 달라진 점: 질문 20개는 공용 질문 은행이 아니라 새 파일 `lib/personQuestions.json`·`mobile/data/personQuestions.json`(같은 내용)에 뒀다. 웹 Q&A는 은행의 모든 분류를 그대로 보여 주므로 은행에 넣으면 웹에 입력 폼·구독 확인 없는 분류가 생긴다. 서버는 질문을 id로만 받는다(자유 글 불가). 궁합 입력 폼은 `mobile/components/OtherBirthForm.tsx`로 꺼내 궁합 화면과 함께 쓴다. 상대 이름은 서버로 보내지 않는다.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build` → 성공(`ƒ /api/qa-answer`, 새 경고 없음). mobile tsc → exit 0.
  - QA: 빌드본 `next start`(3100) + 로컬 RevenueCat 대역에 `curl -X POST /api/qa-answer` → `other` 없는 기존 요청 sessionId 없음 400(기존 문구 그대로), `other` 있음: 은행 질문 id·13월·성별 없음 400 `bad_request`, appUserId 없음 401 `no_user`, 구독 없음·만료 403 `not_subscribed`, RevenueCat 오류 503 `unavailable`, 구독 중 200(4문단). 로컬 Supabase 한도 조회는 실패해 열림 처리(`[qaQuota] failing open`)라 서버 쪽 한도 공유는 여기서 증명하지 못함 — 설계상 같은 `llm_usage_log` "qa" 행을 세고, 구독 확인된 경로만 하루 10개 상한.
  - QA: 스크래치 `getQAAnswer`/`getPersonQAAnswer` 실제 호출(ko·en·es, 질문 4종, 프롬프트 3회 보정) → `other` 없을 때 기존과 같은 3~4줄 형식, 있을 때 두 사람 오행·중심 기운을 짝지어 인용, 금지어 검사(좋아한다·후회·헤어지·돌아올·상극·궁합이 나쁘·will leave·break up·te ama·volverá 등, 한자) 0건. 보정: 질문 속 "esta persona"를 사용자로 읽은 경우 → 상대방 지칭 명시, es "Maestro del Día" 노출 → 요약 대신 중심 기운 단어만 전달. 남은 것: en 답 1건에 "Day Master" 1회(용어집 허용어, 기존 Q&A 프롬프트도 같은 경향).
  - QA(mobile-web, 375×812): `?qa=free&persona=jordan` 주제 목록에 "About someone · Pro"(사랑 다음) → 탭 → 안내 한 줄 + 구독 카드, `paywall_view`(surface=qa_person). `?qa=pro` → 배지 없음 → 입력 화면(성별·생년월일·시간·도시, 저장 안 함·단정 안 함 안내, 미완성 시 버튼 흐림+이유) → 질문 20개 목록 → 질문 → 웹은 RevenueCat id가 없어 401 → "구독을 확인하지 못했어요" + 다시 시도(남은 수 그대로) → 요청을 로컬 API + 대역 구독 id로 넘겨 다시 시도 → 4문단 답 + 👍/👎, 남은 수 9→8. 요청 본문에 `questionId`·`other`(이름 없음) 확인. 다시 열면 입력값 유지.
  - QA 회귀(mobile-web `?qa=free&persona=jordan`): 홈 → 운세 총론 → Q&A 답 1개(Today 질문, 1→0) → 한도·구독 카드 → 검사 목록 → Burnout 1/30 → 궁합(공용 폼으로 바꾼 화면) Jordan · Sam 결과·공유 미리보기 정상. 콘솔 오류는 404(이전 항목과 같은 `/api/events` 미배포)와 의도한 401뿐.
  - [ ] (사용자 확인) 웹 배포 + OTA 후 iOS dev-client(구독 중 샌드박스 계정)에서 Q&A → "특정한 사람에 대해" → 상대 생년월일 입력 → 질문 → 답이 오는지, 남은 수가 줄어드는지. 구독하지 않은 계정에서는 "구독" 배지와 구독 카드만 보이는지.

## 첫 결제

- [x] 5. 궁합 상세 리포트 (`compat_report`)
  - 변경: 새 `lib/compatReport*.ts`(프롬프트·파싱·품질 검사, "나쁜 궁합 없음"·압박 규칙), `/api/compatReport`(무료 미리보기)와 `/api/compatReport/paid`(RevenueCat 거래 확인 후 생성, 거래 id + 상대 조합 기록 — 소모성), `supabase/schema.sql`(구매 기록 테이블), `mobile/lib/purchases.ts`(상품 `compat_report`, 오퍼링 위치는 `IAP_PRODUCTS.md`에 추가), 새 `mobile/screens/CompatReportScreen.tsx`(`ReportPager`·`ReportClosingPage` 재사용, 페이월, 내 리포트 저장), `CompatibilityScreen`에 진입 행. `IAP_PRODUCTS.md`에 상품 스펙 추가.
  - QA: 루트 검사 + mobile tsc. `curl`로 paid 엔드포인트 구매 증빙 없음 → 403. 스크래치로 무료 부분 생성 persona 2쌍 × 3개 언어(약 $0.1) → 금지어 0건, 원국 사실만. mobile-web에서 궁합 결과 → 미리보기 → 페이월(스크린샷). (사용자 확인) 상품 등록 후 샌드박스 구매 → 전체 읽기 → 내 리포트, 같은 상대 재열람 시 재구매 요구 없음. 회귀 확인.
  - 계획과 달라진 점: 소모성이라 entitlement가 없어서 서버는 거래로 확인한다 — `lib/revenuecat.ts`의 `checkConsumablePurchase`가 사용자의 `non_subscriptions`에서 그 거래(RevenueCat id 또는 스토어 거래 id)를 찾고, 라우트는 RevenueCat 구매 id로 정규화해 `compat_report_purchases`에 상대 조합(HMAC, 생년월일 원문 없음)과 묶는다. 같은 조합은 5번까지 다시 생성(설치 기기 사본 분실·생성 실패 대비), 다른 조합 409, DB 실패 503(fail closed). 상대 이름은 서버로 보내지 않고 모델이 `{other}` 토큰으로 쓰면 앱이 이름(없으면 "그 사람")으로 바꾼다. 구매 증빙 없음은 신년 리포트와 같은 402(`not_purchased`)로 맞췄다. "내 리포트" 홈 진입은 구매한 궁합 리포트만 있어도 열리게 했다.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build`(스크래치 복사본) → 성공, `ƒ /api/compatReport`·`ƒ /api/compatReport/paid` 포함, 새 경고 없음(edge runtime 경고는 기존). mobile tsc → exit 0.
  - QA: 빌드본 `next start`(3100) + 로컬 RevenueCat·Supabase 대역(실제 RevenueCat·프로덕션 DB에는 요청 안 함)에 `curl`: 무료 — other 없음·13월·모르는 일간·잘못된 JSON 400. 유료 — 거래 id 없음 400, appUserId 없음 401 `no_user`, 구매 없는 사용자·다른 상품의 거래 402 `not_purchased`, RevenueCat 오류 503, 첫 사용 200(생성), 같은 거래·다른 상대 409 `used_for_other`, 같은 거래·같은 상대 재생성 200(generations 2), 재생성 5회 도달 429 `regen_limit`, 스토어 id로 산 거래를 RevenueCat id로 다른 상대에 쓰기 409(정규화 확인), DB 실패 503, IP 한도(시간당 5) 초과 429. 저장 행에는 거래 id·사용자 id·pair_key(HMAC)·generations만.
  - QA: 실제 생성(gpt-5.4-mini, 약 $0.1) 무료 2쌍 × ko·en·es + 유료 ko·es·en → 판정·결말 예언·마음 단정·전문용어 0건(코드 검사 남은 지적 0), `{other}` 토큰 유지, 인용 퍼센트 전부 엔진 값과 일치(예: 37.5 → 38%). 생성 뒤 코드 검사에 "데이터에 없는 퍼센트" 항목을 더했다. ko 1건에 "상대의 도움"이 일반 명사로 한 번 나옴(허용).
  - QA(mobile-web, 375×812, `?qa=free&persona=jordan`, `/api/compatReport*`만 페이지에서 로컬 3100으로 돌림): 궁합 결과(Jordan · Sam) 공유 버튼 아래 "Compatibility report" 행 → 생성 중 문구 → 표지(이름·제목·부제·계산 근거) → 무료 2장 → 페이월 쪽(잠긴 3개 장, "Open the report", 가격은 결제 화면 안내, 한 사람당 1회 구매·구독 아님, 판정하지 않음 문구). 웹엔 스토어가 없어 구매 → "can't be bought right now"(예상대로). 요청 본문에 이름 없음(`other`는 생년월일·성별만). 뒤로 → 결과 그대로, 다시 열기 → 저장본(요청 수 그대로 1). 구매 후 화면: 이 상대의 기기 저장 항목에 대역 구매로 서버가 만든 유료 부분을 넣고 → 홈 "My reports" → "Compatibility with Sam" → 8쪽(표지·무료 2·부딪히는 지점 1/3~3/3·리듬·맺음) → 마지막 장 Back → 내 리포트.
  - QA 회귀(mobile-web `?qa=free&persona=jordan`, 저장 항목 지운 뒤): 홈 → 운세 총론 → Q&A 답 1개(1→0) → 검사 목록 → Burnout 1/30 → 궁합 결과(Jordan · Sam, 프로덕션 `/api/compatibility` 200) 정상. 콘솔 오류는 `/api/events` 404 5건(프로덕션 미배포, 직접 호출해 404 확인)뿐.
  - [ ] (사용자 확인) 사용자 실행 B(SQL `compat_report_purchases`)·C(상품 등록: App Store 소모품 `com.fatesaid.app.report.compat`, Play `compat_report`, RevenueCat "reports" 오퍼링에 패키지 `compat_report`, entitlement 없음) 후 웹 배포 → OTA → iOS dev-client 샌드박스 계정에서: 궁합 결과 → "궁합 상세 리포트" → 미리보기 2장 → 페이월에 스토어 가격 → 구매 → 생성 → 8쪽 읽기 → 홈 "내 리포트"에 "○○님과의 궁합". 앱을 껐다 켜서 다시 열면 재구매 없이 바로 열리는지. 다른 상대로 다시 사면 새 결제가 뜨는지. Android에서는 같은 흐름에서 구매 직후 생성이 되는지(SDK가 주는 거래 id가 RevenueCat 기록과 맞는지 — 402면 알려 주세요).

## 바이럴

- [x] 6. 초대 링크와 친구 궁합
  - 변경: `supabase/schema.sql`(`invites`: 코드, 보낸 사람 세션·표시 이름·궁합 계산용 최소 데이터, 친구 결과, 만료 30일), `/api/invites`(생성·조회·수락, rate limit), 웹 새 `app/c/[code]/page.tsx`(동의 문구, 친구 생년월일 입력, 관계 이름 + 한 줄, 설치 안내, 만료 화면, ko/en/es는 보낸 사람 언어 기본), 앱 `CompatibilityScreen`에 "친구와 궁합 보기"(공유 시트로 링크), 새 "받은 궁합" 목록(탭하면 기존 궁합 결과 화면).
  - QA: 루트 검사 + mobile tsc. 로컬 dev에서 `curl`로 초대 생성 → `/c/<code>` 열어 입력 → 조회 API에 결과, 만료 시각을 과거로 둔 코드 → 만료 화면. 저장 행에 생년월일 외 불필요한 값이 없는지 스키마 대조. mobile-web에서 링크 생성·공유 시트 호출(웹은 클립보드 대체 가능)과 받은 궁합 목록(프로덕션 API 배포 전엔 로컬 API 응답 모양으로 확인). 회귀 확인.
  - 계획과 달라진 점: `/api/invites`를 셋으로 나눴다 — `POST /api/invites`(생성: 코드 10자와 owner token을 한 번만 돌려주고 DB엔 토큰의 SHA-256만), `POST /api/invites/status`(보낸 사람 앱이 코드+토큰으로 결과 조회, 토큰이 틀리면 `missing`), `POST /api/invites/[code]`(친구 수락: 동의 `consent: true` 필수, 한 링크에 한 번만, 만료 410·이미 답함 409·없음 404). 친구 생년월일은 수락 요청 안에서만 쓰고, 행에는 파생 결과(일간 한 글자·사주 유형·가장 많은 오행)와 친구가 적은 표시 이름(선택, 24자)만 남긴다. 보낸 사람 쪽 저장도 이름·일간 한 글자·언어뿐. 만료 행은 다음 초대를 만들 때 지운다. 친구 페이지는 친구 시점(친구 = "나")으로 관계 이름 + 본문 첫 문장을 보여 주고, 보낸 사람 앱은 같은 결과를 보낸 사람 시점으로 기존 궁합 결과 화면에 연다(받은 결과에는 상대 생년월일이 없으므로 "궁합 상세 리포트" 행은 숨김). "받은 궁합" 목록은 별도 화면 대신 `CompatibilityScreen` 입력 화면 아래 "친구와 궁합 보기" 칸 안에 두었다(답 대기 중 링크는 점선 행, 탭하면 링크 다시 보내기). 답이 온 결과는 기기(`mobile/lib/invites.ts`)에 복사해 링크 만료 뒤에도 남는다.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build`(스크래치 복사본) → 성공·경고 없음, `ƒ /api/invites`·`ƒ /api/invites/[code]`·`ƒ /api/invites/status`·`ƒ /c/[code]` 포함. mobile tsc → exit 0.
  - QA: 빌드본 `next start`(3100) + 로컬 Supabase 대역(PostgREST 흉내, 프로덕션 DB 요청 없음)에 `curl`: 생성 200(코드·토큰·URL·30일 뒤 만료), 모르는 일간·모르는 언어 400, 조회 open → 틀린 토큰 `missing`, 수락 — 동의 없음·미래 날짜 400, 없는 코드 404, 정상 200(친구 시점 관계), 두 번째 수락 409, 조회 answered(보낸 사람 시점 관계·친구 유형·이름 `Sam <b>` → `Sam b`), 만료로 돌린 코드 수락 410·페이지 만료 화면(ko·es), 없는 코드 페이지 "We couldn't find this link". 만료 행은 다음 생성 때 삭제됨. 생성 IP 한도(시간당 10) 초과 429. 저장 행 대조: 코드·토큰 해시·보낸 사람 이름·일간 한 글자·언어·만료·수락 시각·친구 이름·친구 결과(일간·유형·오행)뿐, 생년월일 없음.
  - QA 중 고친 것: `/c/[code]`가 Next 데이터 캐시에 첫 조회를 붙잡아 답한 뒤에도 입력 폼을 보여 줬다 → 페이지에 `fetchCache = "force-no-store"`를 넣고 열림 → 답함 → 만료 화면 전환을 다시 확인.
  - QA(웹 미리보기 375×812, 로컬 3100): `/c/<code>` 영어 폼(보낸 사람 이름 제목, 생년월일·이름(선택)·출생 시간·동의 체크·30일 안내) → 동의 없이 제출 "Please agree to share the result to see it." → 동의 후 제출 → "Sam · Jordan / You're the one who fuels them / Your energy pushes theirs forward. / This result has also been sent to Jordan's app." + 앱 안내, `/api/invites/<code>` 200, `invite_accept` 이벤트 요청 1건. 콘솔 오류는 로컬에 없는 Vercel insights 스크립트 404뿐.
  - QA(mobile-web 375×812, `?qa=free&persona=jordan`, `/api/invites*`만 페이지에서 로컬 3100으로 돌림): 궁합 화면 아래 "Match with a friend" → "Send a link" → 서버 행(Jordan, 일간 계, en) 생성, 공유 문구 "Want to see how our saju charts match?…\nhttps://www.fatesaidapp.com/c/<code>"(navigator.share), 기기 목록에 open 항목. "Link you sent · Waiting for an answer · 30 days left" 탭 → navigator.share 없는 경우 클립보드 복사 + "Link copied. Paste it to your friend." curl로 친구(Alex) 수락 후 화면 다시 열기 → "Received: Alex · You're the one being pushed" → 탭 → 기존 결과 화면(Jordan · Alex, 공유 카드, 상세 리포트 행 없음), 기기 항목 answered로 저장. "Try someone else" → 입력 화면.
  - QA 회귀(mobile-web `?qa=free&persona=jordan`): 직접 입력 궁합(Jordan · Sam, 프로덕션 `/api/compatibility`) 결과에 상세 리포트 행 그대로 → 홈 → 운세 총론 → Q&A 답 1개(이전 세션이 오늘 무료 1개를 써서 기기 한도 기록만 지우고 1→0) → 검사 목록 → Burnout 1/30. 콘솔 오류 없음.
  - [ ] (사용자 확인) 사용자 실행 B(SQL `invites`) 후 웹 배포 → OTA → 실기기(iOS dev-client 또는 Android)에서: 궁합 → "친구와 궁합 보기" → "링크 보내기" → 공유 시트가 뜨고 메시지에 `https://www.fatesaidapp.com/c/…` 링크가 붙는지 → 다른 휴대폰(또는 시크릿 창)에서 링크 열기 → 생년월일·동의 → 결과 → 보낸 휴대폰에서 궁합 화면을 다시 열면 "받은 궁합"에 친구 이름과 관계 이름이 뜨고 탭하면 결과가 열리는지. 같은 링크를 다시 열면 "이미 답이 온 링크예요"가 보이는지. Supabase `invites` 행에 생년월일이 없는지 Table Editor에서 확인.

- [x] 7. 그룹 케미 맵 + 커플 모드
  - 선행: 6
  - 변경: 새 `lib/groupChemistry.ts`(오행 분포 규칙으로 역할 배정, LLM 없음, 서버·앱 공용 사본 또는 API), 새 `mobile/screens/GroupChemistryScreen.tsx`(3~6명 직접 입력 또는 받은 궁합에서 고르기, 공유 카드 — width-only 캡처 규칙), 커플: `supabase/schema.sql`(`pairs`), `/api/pairs`(초대 코드로 연결·해제), `/api/coupleDaily`(두 사람 중 한 명 구독 확인, 오늘 두 사람 흐름), 홈 커플 카드, 설정에 연결 해제.
  - QA: 루트 검사 + mobile tsc. 스크래치로 `groupChemistry` 3·4·6명 입력 → 사람마다 역할 하나, 같은 입력은 같은 결과, 부정 표현 0건. `curl`로 pairs 연결 → coupleDaily 구독 없음 403 → 해제 후 404. mobile-web 그룹 화면·공유 미리보기 스크린샷. (사용자 확인) 두 기기에서 연결 후 한쪽만 구독일 때 양쪽 홈에 커플 카드. 회귀 확인.
  - 계획과 달라진 점: 그룹 역할 규칙은 서버 한 곳(`lib/groupChemistry.ts` + `POST /api/groupChemistry`, 저장·LLM 없음)에 두고 앱은 오행 키만 받아 문구(`mobile/lib/groupChemistryContent.ts`)를 입힌다. 사람마다 신호 두 개(일간 오행·가장 많은 오행)만 쓰므로 나·생년월일 입력·받은 궁합(친구 결과에 둘 다 있음) 세 출처를 같은 규칙으로 섞을 수 있다. 역할은 일간 오행, 앞사람과 겹치고 가장 많은 오행이 비어 있으면 그쪽으로 옮김(입력 순서로 동점 처리), 무리 제목은 일간 2점·가장 많은 오행 1점 합의 최다 오행, 아무도 없는 오행은 "무리에 더하면 좋은 것" 한 줄(없으면 "다섯 기운이 모두"). 커플 연결은 6번 웹 링크가 아니라 **앱에서 입력하는 8자 코드**로 했다 — 6번 링크의 친구는 웹에서만 답해 앱 신원(RevenueCat id)이 없기 때문. `POST /api/pairs`의 `op`(create·join·unlink), `POST /api/coupleDaily`(코드+토큰, 두 사람의 저장된 RevenueCat id 중 하나라도 qa_premium이면 200, 모두 inactive면 403, 확인 실패 섞이면 503, id가 하나도 없으면 403). 설정 진입점은 궁합 화면 아래(그룹 케미 맵 행 + "커플 모드" 칸), 해제는 그 칸과 설정 둘 다. 설정의 "내 데이터 초기화"도 서버에서 연결을 해제한다.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors", `npm run build`(스크래치 복사본) → 성공, `ƒ /api/groupChemistry`·`ƒ /api/pairs`·`ƒ /api/coupleDaily` 포함(경고는 기존 edge runtime 1건뿐). mobile tsc → exit 0.
  - QA: 스크래치 `npx tsx group.mts` — `groupChemistry` 3·4·6명 무작위 각 2000회 → 사람마다 역할 하나(자기 신호 둘 중 하나), 같은 입력 같은 결과, 위반 0건. 2명·7명 → null. 문구(ko/en/es) 금지어(bad·clash·conflict·avoid·나쁜·충돌·피해·조심·malo·conflicto·evita 등) 0건.
  - QA: 빌드본 `next start`(3100) + 로컬 Supabase·RevenueCat 대역(프로덕션 요청 없음)에 `curl`: groupChemistry 3명(알려진 신호)·4명(생년월일 2명 섞음, 서버가 유형 계산)·6명 200, 2명·7명·모르는 오행·미래 날짜 400. pairs 만들기 200(코드 8자·토큰·7일 만료) → 연결 전 coupleDaily 409 `not_joined` → 내 코드 넣기 400 `self` → 없는 코드 404 → 대문자·하이픈·공백 코드("Z9QY-EWNJ ")로 연결 200(상대 이름 반환) → 두 번째 연결 409 → 둘 다 무료 403(`partnerName` 포함, 이름 `Sam <b>` → `Sam b`) → 틀린 토큰 404. 한쪽만 구독: A·B 둘 다 200(각자 시점의 오늘 리듬). RevenueCat 오류+상대 무료 503. id 없는 연결 403. B 해제 200 → A coupleDaily 404 → 다시 해제 404. 연결 안 된 코드 만료 → 연결 404·coupleDaily 404, 다음 만들기 때 그 행 삭제(연결된 행은 남음). 연결 시도 IP 한도(10분 10회) 초과 429. 저장 행 대조: 코드·토큰 해시 둘·이름·일간·일지·RevenueCat id·시각뿐, 생년월일 없음.
  - QA(mobile-web 375×812, `?qa=free&persona=jordan`, `/api/groupChemistry`·`/api/pairs`·`/api/coupleDaily`만 페이지에서 로컬 3100으로 돌림 — 다른 세션이 띄운 같은 폴더의 8082 서버 사용): 궁합 화면 아래 "Group chemistry map · Free" 행 → 멤버 1명(Jordan (You)) "Add 2 more people…" → 받은 궁합 칩 "Alex" 추가 → 생년월일로 Mina 추가(폼이 비워짐, Alex 칩 사라짐) → "See our chemistry" → "A steady crew" 카드(Jordan 흐름을 읽는 사람·Alex 균형·Mina 매듭, "Something to add to the mix" 한 줄, 공유 버튼·멤버 바꾸기), 뒤로 → 멤버 유지. ko 같은 흐름 "깊은 무리" 카드. 커플: "Get a link code" → 코드 칸 "mpk7-ytjq"·7일 안내, 공유 문구(navigator.share) 확인 → 홈 "Today, the two of you · This card opens once your partner enters the code" → curl로 구독 대역 상대 연결 → 홈 카드 "You · Your own rhythm / Sam · A pacing rhythm" + 한 줄 → 설정 "Couple mode · Linked with Sam · Unlink" → 확인 창 → 해제, 상대 coupleDaily 404. es: curl로 만든 코드를 앱에 입력 — 틀린 코드 "No encontramos ese código…", 맞는 코드("btfp 2nbe") → "Conexión activa con Lucia" → 홈 잠금 카드("Se abre para la pareja… / Ver la suscripción" → 운세 화면) → 상대(curl) 해제 → 홈 카드 사라짐·기기 저장 지워짐. 웹 미리보기라 실제 이미지 캡처·공유 시트는 확인 못 함.
  - QA 회귀(mobile-web `?qa=free&persona=jordan`, 새로고침 뒤): 홈(연결 없으면 coupleDaily 요청 없음) → 운세 총론 → Q&A 답 1개(1→0) → 검사 목록 → Burnout 1/30 → 직접 입력 궁합(Jordan · Sam, 프로덕션 `/api/compatibility` 200). 새로고침 뒤 네트워크는 200만. 그 전 콘솔 400은 프로덕션 `/api/events`가 아직 모르는 새 이벤트 이름(`group_chemistry_view` 등)을 거절한 것 — 로컬 빌드는 같은 배치 200.
  - [ ] (사용자 확인) 사용자 실행 B(SQL `pairs`) 후 웹 배포 → OTA → 두 실기기(iOS dev-client 또는 Android, 서로 다른 스토어 계정)에서: A 궁합 → 아래 "커플 모드" → "연결 코드 만들기" → 공유 시트에 코드가 붙는지 → B 궁합 → 커플 모드에 코드 입력 → "연결하기" → 두 기기 홈에 "오늘 우리 둘의 흐름" 카드. 둘 다 무료면 잠금 카드("구독 알아보기" → 운세), 한 명만 샌드박스 구독하면 두 기기 모두 두 사람의 리듬과 한 줄이 보이는지. B 설정 → 커플 모드 → 연결 해제 → A 앱을 다시 열면 홈 카드가 사라지는지. 그룹 케미 맵: 3명 이상 → "결과 공유하기" → 공유 시트에 카드 이미지가 잘리지 않고(아래 빈 무늬 없이) 들어가는지. Supabase `pairs` 행에 생년월일이 없는지 Table Editor에서 확인.

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
  - 1·5·6·7번이 `supabase/schema.sql`에 추가한 `events`, `compat_report_purchases`(궁합 리포트 구매 기록), `invites`, `pairs`를 SQL Editor에서 실행. 각 항목 배포 전에.

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
- (3번 중) 기존 `strings.qa.subscriptionPriceLabel`(스토어 응답 전 대체 문구)에 "$7.99"가 하드코딩돼 있다. 스토어가 응답하지 않는 웹·오프라인에서만 보이지만 STYLE_GUIDE의 "가격은 priceString만" 규칙과 어긋난다.
- (3번 중) Q&A 한도 소진 말풍선(`limitReached2`)은 스토어 가격이 오기 전에 찍히면 대체 가격으로 남고, 연간이 기본 선택이면 "$49.99/year"로 찍힌다(카드의 선택과 함께 바뀌지 않음).
- (4번 중) 서버 `lib/qaQuota.ts`는 앱(mobile) 기존 Q&A를 구독 여부와 관계없이 하루 1개로 센다(`isQaQuotaExceeded`에 구독 정보가 없음). 앱은 구독자에게 10개를 보여 주므로, 프로덕션 Supabase가 정상이면 구독자의 일반 질문 2번째부터 서버가 403을 줄 수 있다. 4번의 "그 사람" 경로만 RevenueCat 확인 뒤 10개 상한을 쓴다. 일반 경로도 appUserId를 받아 같은 확인을 붙일지 결정 필요.
- (4번 중) 기존 Q&A 답(en)에도 "Your Day Master, the core of your natural style…"처럼 용어가 그대로 나온다. 기존 프롬프트가 `요약`(dayMaster 키)을 그대로 넘기기 때문. 4번 프롬프트처럼 중심 기운 단어만 넘기면 줄어든다.
- (5번 중) 궁합 리포트는 소모성이라 스토어 "구매 복원"이 없다. 앱을 지웠다 다시 깔면 기기 사본과 거래 id가 사라져 다시 열 방법이 없다(서버는 같은 거래·같은 상대 재생성을 허용하지만 앱이 거래 id를 모름). RevenueCat `customerInfo.nonSubscriptionTransactions`에서 궁합 상품 거래를 골라 상대를 다시 입력하면 이어 주는 복원 흐름이 필요한지 결정 필요.
- (5번 중) 홈 "내 리포트" 설명 문구(`home.featureReportsDescription`, "Reopen the in-depth reports you've made")가 궁합 리포트도 담게 된 지금은 조금 좁다. 문구만 고치면 됨(ko/en/es).
- (5번 중) 고쳐 쓰기 호출(`makeRewriter`)은 `{other}` 토큰을 모른다. 지적 문구에 "토큰 유지"를 넣었지만, 고쳐 쓴 문장에서 토큰이 빠지면 그 문장만 "그 사람" 대신 일반 표현이 된다. 이번 생성에서는 고쳐 쓰기가 일어나지 않아 확인 못 함.
- (6번 중) Next 14는 서버 컴포넌트(페이지)에서 supabase-js의 읽기(fetch)를 데이터 캐시에 넣는다. `/c/[code]`는 `fetchCache = "force-no-store"`로 막았지만, 앞으로 Supabase를 읽는 서버 페이지를 새로 만들면 같은 설정이 필요하다(POST 라우트는 영향 없음).
- (6번 중) 친구가 답해도 보낸 사람에게 알림이 가지 않는다. 보낸 사람이 궁합 화면을 다시 열 때만 결과를 가져온다. 앱을 열 때(홈) 한 번 조회해 홈에 작은 표시를 띄울지, 푸시(서버 알림 필요)로 갈지 결정 필요.
- (6번 중) 링크는 항상 웹으로 열린다(유니버설 링크·앱 링크 없음, SPEC대로). 친구가 앱을 이미 설치했어도 웹 맛보기를 거친다. 12번 스토어 빌드 때 associated domains를 붙일지 검토.
- (7번 중) `/api/events`는 모르는 이벤트 이름이 하나라도 있으면 배치 전체를 400으로 버린다. 새 이름(`group_chemistry_view`·`pair_*`)을 쓰는 앱이 웹 배포보다 먼저 나가면 같은 배치의 다른 이벤트까지 사라진다. 배포 순서(웹 → OTA)를 지키면 문제없지만, 모르는 이름만 빼고 저장하도록 바꿀지 결정 필요.
- (7번 중) 커플 모드는 연결할 때의 RevenueCat 앱 사용자 id를 저장한다. 앱을 지웠다 다시 깔아 익명 id가 바뀌면 그 사람의 구독이 서버 확인에 잡히지 않는다(상대가 구독 중이면 여전히 열림). 다시 연결하면 새 id로 저장된다. 앱을 열 때 id를 갱신하는 경로가 필요한지 결정 필요.
- (7번 중) 상대가 코드를 넣어도 만든 사람에게 알림이 가지 않는다(6번 초대와 같음). 홈을 다시 열 때 카드가 "대기"에서 바뀐다.
