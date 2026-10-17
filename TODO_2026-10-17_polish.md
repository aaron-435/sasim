# TODO (2026-10-17) — 디자인 재점검 후속 수정

SPEC: `SPEC_2026-10-17_polish.md`. 한 번에 한 항목(`/work`). 웹(W)을 먼저 끝내 배포 가능 상태로 만들고, 앱(A)은 그다음.
공통 QA: 웹 `npx tsc --noEmit` + `npm run lint && npm run build`, 앱 `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`.

## W. 웹

- [ ] W1. Q&A 막다른 길 해소 + 비용 상한
  - 범위: `components/QAChat.jsx` 답변 아래에 "앱은 곧 나와요" 안내와 다음 갈 곳(계산기, 일간 페이지) 링크. `/api/qa-answer`에 세션/익명 ID/IP당 횟수 상한(기존 `lib/rateLimit.ts` 활용, 초과 시 정직한 안내 문구, en/es/ko). 이메일 수집은 하지 않는다(SPEC 결정 대기, 기본값).
  - QA: tsc + build, work-dev에서 Q&A를 상한까지 진행해 초과 응답과 안내 문구 확인(네트워크 로그 첨부), 링크 0개였던 화면에 링크가 보이는지 375px 화면.
- [ ] W2. `<html lang>`과 메타 로컬라이즈
  - 범위: `app/layout.tsx:46-47` 비랜딩 라우트 `lang`을 `?lang`에 맞춤. `/privacy`, `/terms`, `/data-deletion` metadata(title/description)를 언어별로, canonical·hreflang·언어 전환 추가. sitemap 언어 선언과 canonical 불일치(`app/sitemap.ts`) 정리. 법적 본문은 그대로.
  - QA: tsc + build, `curl`로 `/privacy?lang=en`·`/terms?lang=es`의 `<html lang>`과 `<title>` 확인, sitemap 출력 확인.
- [ ] W3. 랜딩→온보딩 이어주기와 접근성
  - 범위: 랜딩에서 받은 생년월일을 온보딩 상태로 넘겨 해당 단계 건너뛰기. 고정 CTA가 유형 카드 하단을 가리는 문제, 터치 영역 44px, 시간 "Unknown" 토글 `aria-pressed`, 도시 목록 항목을 버튼으로, `Ir a Fatesaid`·`Go to Fatesaid` 링크가 `lang` 유지. 개인정보를 URL 쿼리에 싣지 않는다(sessionStorage 사용).
  - QA: tsc + build, work-dev 375px에서 날짜 입력 후 온보딩 진입 시 재입력 없음, CTA가 카드를 가리지 않음(화면), 키보드로 도시 선택.
- [ ] W4. 문구 정리
  - 범위: `lib/i18n/en.ts:121` "team of experts" 문구를 AI 서비스로 정직하게 교체(en/es/ko), 랜딩·404 title 보강. 상호 표기는 이미 Studio Aaron으로 통일됨.
  - QA: tsc + build, grep로 "team of" 잔존 0.

## A. 앱 (`mobile/`)

- [ ] A1. 동작 줄이기 정리 (고정 제약, 최우선)
  - 범위: `RevealCard`, `ElementsLoader`에 `useReducedMotion` 분기 추가. `HomeScreen`, `FortuneScreen`, `ChatBubbles`, `IntroScreen`의 직접 `isReduceMotionEnabled`를 훅으로 통일(설정 변경 구독).
  - QA: 앱 tsc, grep로 `isReduceMotionEnabled` 직접 호출이 훅 파일 밖에 남지 않음, mobile-web 미리보기에서 prefers-reduced-motion 에뮬레이션으로 해당 화면 확인.
- [ ] A2. Q&A 오탭 방지
  - 범위: `QAQuestionScreen.tsx:59` 선택 후 확인 시트, 질문 목록에 남은 무료 횟수 표시(en/es/ko).
  - QA: 앱 tsc, 미리보기에서 선택→확인→취소 경로와 횟수 표시 화면.
- [ ] A3. 퀴즈 이어하기
  - 범위: `QuizScreen.tsx`의 answers·index를 AsyncStorage에 저장(모듈별, 완료 시 삭제), 모듈 카드/경로 카드가 "n번 문항부터 계속"으로 바뀜. 새 네이티브 의존성 금지(기존 스토리지 사용).
  - QA: 앱 tsc, 미리보기에서 14번까지 답 → 새로고침 → 카드 문구와 15번에서 재개, 완료 후 저장 삭제.
- [ ] A4. 공용 리포트 표지
  - 범위: 신년·궁합·Wrapped 표지를 심층 리포트의 표지 방식(오행 색 전환, `Reveal`, `ElementMap`/`ArtImage`)으로 통일하는 공용 컴포넌트. 그림 없을 때 폴백 유지.
  - QA: 앱 tsc, 미리보기(`?qa=` 페르소나)에서 세 화면 표지 캡처. 구독자 전용은 네이티브 확인 → `(user check)`.
- [ ] A5. 페이월 통일 + 심층 페이월 접기
  - 범위: 심층·신년·궁합 페이월을 `SURFACE` 토큰 기반 한 컴포넌트로. 심층 페이월 잠긴 챕터는 4~5개만 보이고 "+N개"로 접어 구매 버튼이 첫 화면에 보이게. 궁합 `lockedFriction`, 신년 무료 미리보기 문구 한 단계 완화(압박 규칙).
  - QA: 앱 tsc, 375×812 화면에서 구매 버튼 가시성(가능하면 미리보기, 아니면 `(user check)`), 문구 grep.
- [ ] A6. P3 일괄 정리
  - 범위: 11~12px 글자를 12px 이상(`GoodDays:234`, `QAScreen:515,553` 등), 터치 영역 44pt(홈 `typeBadge`, `heroCtaRow`), 대문자 자간 키커, 논팔레트 hex를 토큰으로(종이 팔레트·파랑·궁합 카드), 한국어 굵기 헬퍼 통합, 리포트 표지 그림 불투명도.
  - QA: 앱 tsc, grep로 `fontSize: 11` 잔존 확인, 미리보기 화면.
- [ ] A7. 이미지 폴백 확인
  - 범위: `ART_MANIFEST`에 항목이 없을 때 모듈 표지 12개·일간 그림이 어떻게 보이는지 확인하고, 번호만 연속으로 보이면 폴백을 다듬는다(그림 배치 자체는 범위 밖).
  - QA: 미리보기 캡처 첨부.

## Z. 마무리

- [ ] Z1. impeccable 재점검 1회(앱 A/B/C + 웹), 화면 증거 포함. 점수표를 `.impeccable/critique/`에 저장.
- [ ] Z2. `(user check)` iOS 시뮬레이터/실기기: 화면 전환 속도(웹에서 1~2초 느림 의심), 햅틱, 동작 줄이기, 저사양 Android 성능, 구독자 화면(RevealCard·페이월·표지).
- [ ] Z3. 배포: 웹은 먼저(푸시), 앱 OTA는 1.2.0 두 스토어 공개 후 `eas update`(사용자 실행).

## 발견 사항 (범위 밖, 기록만)
- 챗 이어하기(서버 세션 저장) 별도 `/spec`.
- 성별 선택지에 "답하지 않음" 없음(제품의 성중립 원칙과 어긋남, 결정 필요).
- 유형 카드에 유명인 이름 노출(광고 소재에는 가려야 함).
- 설정의 무료 사용자 대상 Pro 알림 노출 재확인.
- `ReportPager.tsx:77` 스크롤 값 JS 스레드 쓰기(주석은 UI 스레드라고 되어 있음).
- 데스크톱 1280px 랜딩 우측 절반 비어 있음(DESIGN_VARIANCE 6 대비 밋밋함).
- 스페인어 "mapa natal"은 서양 점성술 용어로 읽힐 수 있음.
- 챗 응답에는 독자 성별 표지(ocupado/cansado 등) 후처리 검사가 없음. 리포트의 `ES_GENDERED_READER`처럼 챗에도 걸지 검토(로직 변경이라 별도 항목). 2026-10-17 es 샘플 6턴에서 "te mantienes ocupado", "llegas cansado" 각 1회 확인.
