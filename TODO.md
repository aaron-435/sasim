# TODO: 디자인 진단 P1+P2 수정 + 글꼴·운세 카드·현지화·iPad

근거: `SPEC.md`, 진단 `.impeccable/critique/2026-10-03T02-35-14Z__mobile-screens.md`. 이전 작업은 `TODO_2026-10-02.md`(그쪽 13번은 아래 사용자 실행 A로 옮김).

공통 규칙
- mobile tsc = `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0.
- 화면 확인 = `mobile-web` 미리보기(포트 8082), `mobile` 프리셋, QA 모드 `?qa=free|all&persona=<mia|lucia|jisoo|jordan>`. 근거 스크린샷의 출처(웹 미리보기/시뮬레이터)를 적는다.
- 새 문구는 ko/en/es 3개 모두. 글꼴은 0번 이후 토큰으로만 참조.
- 시안을 고르는 항목은 사용자가 고르기 전에 구현으로 넘어가지 않는다.

## 기반

- [x] 0. 글꼴 토큰화 (모양 변화 없음)
  - 변경: `mobile/theme/`에 글꼴 토큰(display/ui 굵기별) 추가, `components/AppText.tsx`와 `screens/*`, `components/*`의 `fontFamily` 문자열을 토큰으로 교체. `App.tsx` 로딩은 그대로.
  - QA: mobile tsc exit 0. `grep -rn "fontFamily: \"" mobile/screens mobile/components` → 결과 없음(exit 1). 홈·리포트 1쪽 스크린샷이 수정 전과 같음.
  - QA: mobile tsc(큰 스택) → exit 0. `grep -rn 'fontFamily: "' mobile/screens mobile/components` → 결과 없음(exit 1), 27개 파일 교체·`mobile/theme/fonts.ts` 추가. mobile-web 미리보기(`?qa=all&persona=jordan`, mobile 프리셋) 홈·심층 리포트 1쪽 스크린샷이 수정 전과 같고, 화면 텍스트의 계산된 font-family 개수도 전후 동일(홈 SemiBold 10/Medium 11/Regular 7/Cormorant 2/Bold 1, 리포트 1쪽 61/2/52/17/31).

## P1

- [x] 1. 홈 운세 미리보기를 실제 계산 기반으로
  - 변경: `mobile/screens/HomeScreen.tsx` 히어로 teaser 분기(리듬 이름 + 판단 없는 한 줄), 운세를 연 뒤 돌아오면 opened 상태로 갱신(포커스 시 `fortuneOpenState` 다시 읽기), 무료 CTA 문구. `lib/i18n/{ko,en,es}.ts` 새 키. `lib/i18n/dailyInsight.ts`와 쓰지 않게 된 키 삭제.
  - QA: mobile tsc exit 0. `grep -rn "dailyInsight\|getDailyInsight" mobile/` → 결과 없음. `?qa=free&persona=mia`로 홈 → 운세 이동 시 두 화면 문장이 서로 반대말을 하지 않음(스크린샷 2장). `?qa=all&persona=jordan`에서 운세를 연 뒤 홈 히어로가 열린 상태.
  - QA: mobile tsc(큰 스택) → exit 0. `grep -rn "dailyInsight\|getDailyInsight" mobile --include=*.ts --include=*.tsx --exclude-dir=node_modules` → 결과 없음(exit 1), `lib/i18n/dailyInsight.ts`와 ko/en/es `dailyInsight` 문장 묶음 삭제. mobile-web 미리보기(mobile 프리셋): `?qa=free&persona=mia` 홈 히어로 "Your own rhythm" + 판단 없는 한 줄 + "Read today's overview" → 운세 무료 총론 제목도 "Your own rhythm"(수정 전엔 홈 "새로 시작하기 좋은 날" 대 총론 "방향을 바꾸지 말 것"으로 반대). ko·es 문구 화면 확인. `?qa=all&persona=jordan` 운세 열기 → 뒤로 → 히어로 "Today's fortune · A hand to catch you · See today in full"(열린 상태).
  - 메모: 앱 안 흐름은 Home이 단계 전환마다 다시 마운트되며 열람 기록을 새로 읽으므로 원래부터 정상이었다(포커스 재읽기 코드 불필요). 진단의 "기다리고 있어요"는 QA 모드가 페이지를 새로 불러올 때마다 열람 기록을 지우는 탓으로 보임(아래 발견 사항).

- [x] 2. 온보딩 접근성 + 동작 줄이기 + 배경 기본값
  - 변경: `components/OnboardingShell.tsx`(뒤로 버튼 라벨), `components/AuraNextButton.tsx`, `screens/{Language,Intro,Nickname,Gender,Dob,Tob,City,Concern,VerifyCode}Screen.tsx`(역할·라벨·선택 상태), `components/GoldAura.tsx`·`screens/IntroScreen.tsx`(`isReduceMotionEnabled`면 반복·진입 애니메이션 끔), `components/PatternBackground.tsx`(`backgroundColor: COLORS.background`). 대상 화면 Text에 `maxFontSizeMultiplier` 상한.
  - QA: mobile tsc exit 0. 대상 파일마다 `grep -c "accessibilityRole"` 수 ≥ 그 파일의 Pressable 수(표로 기록). `grep -n "isReduceMotionEnabled" mobile/components/GoldAura.tsx mobile/screens/IntroScreen.tsx` → 각 1건 이상.
  - (사용자 확인) iOS 실기기 VoiceOver로 언어→관심사까지 진행, 설정 > 손쉬운 사용 > 동작 줄이기 켜고 인트로·후광이 멈추는지.
  - QA: mobile tsc(큰 스택) → exit 0. Pressable 수/accessibilityRole 수: OnboardingShell 1/2, AuraNextButton 1/1, Language 1/2, Intro 0/3, Nickname 0/1, Gender 2/4, Dob 0/2, Tob 3/4, City 1/3, Concern 2/4, VerifyCode 1/3(모든 파일 역할 수 ≥ Pressable 수). `grep -c isReduceMotionEnabled` → GoldAura 1, IntroScreen 1. mobile-web 미리보기(mobile 프리셋, en)에서 DOM 확인: 언어 버튼 3개 라벨, 인트로 "Get started"·약관 링크 role=link, 뒤로 "Back", 진행 막대 progressbar 1~6/6, 성별·오전/오후 radio + aria-checked/selected가 선택에 따라 바뀜, "모름" checkbox 켜면 시·분·오전/오후 aria-disabled, "다음"이 입력 전 aria-disabled=true → 입력 후 해제, 도시 결과 "Seoul, South Korea" 버튼. 콘솔 오류 없음. 화면 모양은 수정 전과 같음(태어난 시간 스크린샷).
  - 메모: 관심사(Concern) 화면은 도시 제출(`/api/saju`, 운영 DB 기록) 뒤라 웹에서 열지 않았고 코드·tsc로만 확인. 글자 크기 상한은 `theme/fonts.ts`의 `MAX_FONT_SCALE`(display 1.3 / control 1.4 / body 1.6). react-native-web 0.21은 `accessibilityState`를 DOM에 옮기지 않아 기존 화면처럼 `aria-*`를 함께 달았고, "다음" 버튼은 `disabled` prop으로 비활성 상태를 알린다(손으로 단 aria-disabled는 Pressable이 덮어씀).
  - [ ] (사용자 확인, 위 절차) 동작 줄이기·VoiceOver·글자 크기는 네이티브에서만 확인된다. 글자 크기는 설정 > 손쉬운 사용 > 디스플레이 및 텍스트 크기 > 더 큰 텍스트를 최대로 두고 온보딩 각 화면이 겹치지 않는지.

- [x] 3. 퀴즈·Q&A 접근성 + 슬라이더 무응답 진행 막기
  - 변경: `screens/QuizScreen.tsx`(슬라이더 accessibilityValue·라벨, 건드리기 전 "다음" 비활성 대신 안내 한 줄과 함께 진행 막기), `screens/{QA,QASubcategory,QAQuestion}Screen.tsx` 역할·라벨.
  - QA: mobile tsc exit 0. 웹 미리보기 퀴즈 1번 문항에서 슬라이더를 건드리지 않고 "다음" → 진행 안 됨, 건드린 뒤 → 진행(스크린샷). 대상 파일 accessibilityRole 수 ≥ Pressable 수.
  - QA: mobile tsc(큰 스택) → exit 0. Pressable 수/`accessibilityRole="button"` 수: Quiz 5/5, QA 5/5, QASubcategory 2/2, QAQuestion 2/2. mobile-web 미리보기(mobile 프리셋): `?qa=all&persona=jordan&lang=en` 모듈 11 1번(슬라이더) — 건드리지 않고 "Next" → 1/30 그대로 + 안내 "Move the slider to the point that feels closest to you."(aria-live), 숫자·버튼이 흐리게. 슬라이더를 8로 옮기면 안내가 사라지고 "Next" → 2/30(스크린샷). 슬라이더 DOM: role=slider, 라벨=문항, aria-valuenow 5, valuetext "5 out of 10. 1 is Not hard at all, 10 is Very hard". 진행 막대 role=progressbar "Question 1 of 30". 2번(선택형) 선택지 4개 버튼 라벨. `?qa=all&persona=lucia&lang=es` Q&A 주제 8개·하위 주제 5개·질문 20개 모두 버튼 라벨(빈 라벨 0), 각 화면 제목 role=heading. 콘솔 오류 없음.
  - 메모: 대상 화면 Text에 `MAX_FONT_SCALE` 상한도 달았다(SPEC 2번 대상 화면). Q&A 말풍선(`components/ChatBubbles`)은 채팅 화면과 공유라 손대지 않았다. 질문을 고르면 유료 답변 API가 불리므로 질문 목록까지만 확인. 구독·복원·다시 시도 버튼은 코드·tsc로만 확인.
  - [ ] (사용자 확인) iOS 실기기 VoiceOver로 퀴즈 슬라이더 문항에서 위·아래 쓸기로 값이 바뀌고 "8, 10점 중…"처럼 읽히는지, 값을 바꾼 뒤 "다음"이 진행되는지.

- [x] 4. 신년 리포트를 페이지 넘김으로
  - 변경: `screens/YearReportScreen.tsx`를 섹션 단위 페이지 + 진행 표시 + 이전/다음으로. 가능한 범위에서 `ReportScreen.tsx`의 페이지 넘김 부품을 공용 컴포넌트로 빼서 둘 다 사용.
  - QA: mobile tsc exit 0. `?qa=all&persona=jordan` 신년 리포트가 페이지로 넘어가고 진행 표시가 맞음(첫·중간·끝 스크린샷).
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(다른 세션이 띄운 8082 서버, 같은 폴더라 변경 반영, mobile 프리셋): `?qa=all&persona=jordan` 신년 리포트 13쪽 — 표지(01/13, "13 PAGES" 하단) → 한눈에 보기(02, 세로 스크롤 838/750px) → 재물·연애·일·배움·몸과 마음(03~07) → 12개월 타임라인 3개월씩 4쪽(08 "Feb – Apr" 사주 달력 안내 포함 ~ 11 "Nov – Jan") → 실행 계획 4단계(12) → 마무리+면책+"Back to Home"(13/13). 오른쪽 가장자리 탭으로 넘김, 카운터·진행 막대·실제 스크롤 위치 일치(scrollLeft/375+1 = aria-valuenow), 상단 PDF 버튼. 회귀: `?qa=free&persona=mia` 심층 리포트 표지·목차 정상, 목차에서 잠긴 항목 → 페이월 17/17로 이동, 페이월에서 가장자리 탭 버튼 0개. 콘솔 오류 없음.
  - 메모: 공용 `components/ReportPager.tsx`(상단 바·가로 페이지·가장자리 탭·하단 슬롯)를 두 화면이 쓴다. 웹에서 페이지가 내용 높이로 줄어 표지 하단 문구가 위로 붙던 문제를 페이지에 측정 높이를 주는 것으로 고쳐 심층 리포트 표지("PREVIEW · 16 OF 42 PAGES")도 이제 화면 아래에 붙는다. 첫 장 안내·마지막 장 재설계는 5번 범위라 마무리 페이지는 기존 내용(맺음말·면책)만 옮겼다.
  - [ ] (사용자 확인) iOS 실기기·시뮬레이터에서 신년 리포트를 옆으로 쓸어 넘길 때 긴 장(한눈에 보기 등)의 세로 스크롤과 가로 넘김이 서로 방해하지 않는지.

- [x] 5. 두 리포트의 첫 장 안내와 마지막 페이지
  - 선행: 4
  - 변경: 공용 리포트 부품에 첫 장 넘기기 안내(한 번 본 뒤 저장해서 숨김), 마지막 페이지(한 줄 요약·공유·다음 검사 추천 또는 다음 행동·PDF 저장·작은 면책). `lib/i18n/*`.
  - QA: mobile tsc exit 0. 심층·신년 리포트 각각 첫 장 안내 → 다시 열면 없음, 마지막 장 구성 스크린샷(ko·en·es 중 2개 언어).
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(다른 세션이 띄운 8082 서버, 같은 폴더라 변경 반영, mobile 프리셋): `?qa=all&persona=jordan`(en) 심층 리포트 1쪽 하단에 "Swipe or tap the right edge to turn the page" → 한 장 넘기면 사라지고 `fatesaid_reader_hint_seen_deep=1` → 새로고침 후 다시 열면 안내 없음. 마지막 장(41/41): 맺음말 → "If you keep one line" + 한 줄 요약 + Share·Save as PDF → "A test to try next · Money · 약 5분·30문항 · Start this test" → 작은 면책, 카드 탭 시 Module 2 퀴즈 1/30으로 이동. `?qa=all&persona=lucia`(es) 신년 리포트 1쪽 안내 "Desliza o toca el borde derecho para avanzar"(한 줄) → 넘기면 저장, 다시 열면 없음. 마지막 장(13/13): 맺음말 → "Si te quedas con una línea" + 부제 요약 + Compartir·Guardar como PDF → "Tu siguiente paso"(실행 계획 1단계 제목) → 면책, 카드 탭 시 12/13 실행 계획으로 이동. 회귀: `?qa=free&persona=mia` 심층 리포트 17/17 페이월 그대로, 새 마지막 장은 잠금 상태라 안 보임. 콘솔 오류 없음.
  - 메모: 공용 `components/ReportClosingPage.tsx`(두 리포트 마지막 장), `ReportPager`의 `swipeHint`(저장은 `lib/readerHint.ts`, 리포트 종류별 키). 한 줄 요약은 심층=`psychology_takeaway` 첫 문장, 신년=`subtitle`. 공유는 RN `Share`로 요약 한 줄 + 앱 주소 텍스트(새 의존성 없음). 다음 검사는 기기에 저장된 리포트가 없는 모듈 중 같은 track 우선(`App.tsx`의 `openModuleQuiz`로 바로 퀴즈). 안내는 정적이라 동작 줄이기 대상 없음. 웹은 `navigator.share`가 없으면 공유가 조용히 무시된다.
  - [ ] (사용자 확인) iOS 시뮬레이터·실기기에서 마지막 장 "공유하기"를 누르면 공유 시트에 요약 한 줄과 주소가 뜨는지, 심층 리포트 "다음 검사" 카드가 퀴즈로 넘어가는지, 첫 장 안내가 한 번 넘긴 뒤 다시 열면 없는지.

- [x] 6. 리포트 사소한 문제 묶음
  - 변경: `screens/ReportScreen.tsx` — 1쪽 제목·부제 간격, 본문 문단 간격, 81자 대문자 표지 소제목(짧게 또는 문장형), 페이월 "42쪽 중 26쪽"과 페이지 카운터 일치, 강점 % 막대가 "나쁨" 색(빨강)으로 보이지 않게.
  - QA: mobile tsc exit 0. `?qa=free&persona=mia` 페이월 쪽 카운터와 문구 숫자가 같음, 1·4쪽 스크린샷.
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(다른 세션이 띄운 8082 서버, mobile 프리셋): `?qa=free&persona=mia`(en) 표지 소제목 "LOVE & ATTACHMENT · DEEP REPORT"(35자, 수정 전 81자), 제목 두 줄 뒤 부제가 작은 기울임 한 줄로 분리, 하단 "PREVIEW · 7 OF 15 CHAPTERS OPEN". 4쪽: Anxiety 82% 막대가 청자색(수정 전 빨강), 본문 문장 사이 9px 간격. 17/17 페이월 "8 of 15 chapters are locked" = 아래 잠긴 장 8줄과 일치, 표지 "7 of 15"와 합이 맞고 쪽수 숫자는 카운터 하나만 남음. `?qa=free&persona=lucia`(es) 표지 "AMOR Y APEGO · INFORME PROFUNDO", "7 DE 15 CAPÍTULOS ABIERTOS"(DOM 텍스트로도 확인). 콘솔 오류는 화면 파일과 문구 파일을 따로 저장한 사이의 핫리로드 1건(`previewChaptersLabel is not a function`, 같은 스택이 버퍼에 남음)뿐이고 새로 불러온 화면은 라벨을 정상 표시.
  - 메모: 표지 소제목은 서버 `subtitle`(프롬프트가 "~ 심층 리포트 — 사주 × 심리검사 × 상담 통합" 형식을 지시) 대신 앱이 `모듈 이름 · 심층 리포트`로 만든다(서버 프롬프트는 범위 밖). 쪽수 대신 장(목차 항목) 수로 통일: 카운터는 미리보기 쪽 + 페이월 1쪽만 세므로 "42쪽"과 맞출 수 없었다. 구매 후 표지는 "N PAGES"가 카운터와 같아 그대로. 본문 문장 간격은 `Prose`(문장마다 Text, 바깥 여백은 감싸는 View로)로 caseBody·dataNote·cardBody에만 적용, 인용·서사(표시 글꼴) 문장은 그대로. 막대 색은 청자·하늘·모래·보라·세이지(빨강 없음).

## 개성: 사주 원국 시각화

- [ ] 7. 원국 그림 시안 2~3개 (사용자 확인)
  - 변경: 스크래치 또는 dev 전용 화면에 `react-native-svg` 시안 2~3개(네 기둥 + 오행 분포, 시주 없음 버전 포함, "가장 강한 오행"과 일간 구분). 프로젝트 화면 코드는 건드리지 않음.
  - QA: 웹 미리보기 스크린샷을 사용자에게 보여주고 선택 결과를 이 항목에 기록. (사용자 확인) 선택.

- [ ] 8. 원국 컴포넌트 구현 + 홈 적용
  - 선행: 7
  - 변경: `components/`에 원국 컴포넌트, `screens/HomeScreen.tsx` 오행 막대 카드 교체(탭 불가 카드는 목록처럼 보이지 않게). 데이터는 저장된 `fourPillars`.
  - QA: mobile tsc exit 0. jordan·mia·jisoo(시간 있음/없음 섞어서) 홈 스크린샷에서 그림이 깨지지 않음.

- [ ] 9. 타입 화면·사주 타입 공유 카드에 원국 적용
  - 선행: 8
  - 변경: `screens/TypeScreen.tsx`, `screens/ShareCardsScreen.tsx`·`lib/shareCardContent.ts`(사주 타입 카드). view-shot 캡처 크기 확인.
  - QA: mobile tsc exit 0. 타입 화면과 공유 카드 미리보기 스크린샷. (사용자 확인) 실기기에서 공유 카드 이미지 저장 후 원국이 잘리지 않는지.

## P2

- [ ] 10. 검사 목록 단순화
  - 변경: `screens/ModuleSelectScreen.tsx` — 추천 3개 크게(쉬운 한 줄 + 추천 이유 + "약 5분 · 30문항"), 나머지 "모든 검사"로 접기, "Module N"·임상 용어 부제 제거. `lib/i18n/*`.
  - QA: mobile tsc exit 0. `grep -rn "Module [0-9]\|Módulo [0-9]\|모듈 [0-9]" mobile/lib/i18n` 에서 검사 목록용 문구 없음. 첫 화면에 보이는 선택지 4개 이하(스크린샷, en·es).

- [ ] 11. Q&A 주제 묶기 + 남은 질문 수
  - 변경: `screens/QAScreen.tsx`(첫 화면 주제 5개 이하로 묶는 표시용 매핑, 질문 은행은 그대로), 헤더에 오늘 남은 수(`lib/qaQuota.ts`).
  - QA: mobile tsc exit 0. `git diff --stat mobile/data/questionBank.json` → 변경 없음. 무료·구독 페르소나에서 "1개 중 1개 남음"/"10개 중 N개 남음" 스크린샷.

- [ ] 12. 궁합 화면 정리
  - 변경: `screens/CompatibilityScreen.tsx` — 관계 이름 맨 위 크게, 점수는 작은 보조, 반복 문단 제거, 공유 카드 미리보기 틀, 폼 간격·성별 라벨·포커스 테두리 `COLORS.gold`. 궁합 공유 카드도 같은 위계.
  - QA: mobile tsc exit 0. 결과·공유 카드·폼 스크린샷. `grep -nE "#[0-9A-Fa-f]{6}" mobile/screens/CompatibilityScreen.tsx` 결과를 검토해 포커스 테두리가 하드코딩 금색이 아니라 `COLORS` 토큰임을 기록.

## 추가 범위

- [ ] 13. 글꼴 후보 비교 시안 (사용자 확인)
  - 선행: 0
  - 변경: 없음(스크래치에서 웹 미리보기에 후보 글꼴을 임시 주입하거나 HTML 비교 시안). 조건: 스페인어 악센트·한글(짝 글꼴 가능)·무료·`@expo-google-fonts/*`로 OTA 가능.
  - QA: 홈·리포트 1쪽·운세 3화면 × 후보 2~3조합(+ 현행) 비교를 사용자에게 보여주고 선택 결과를 기록. (사용자 확인) 선택.

- [ ] 14. 고른 글꼴 적용
  - 선행: 0, 13
  - 변경: `mobile/package.json`(글꼴 JS 패키지), `App.tsx` 로딩, 글꼴 토큰 값, `lib/reportPdf.ts`·공유 카드의 글꼴, 루트 `CLAUDE.md` Fonts 줄과 `PRODUCT.md` 글꼴 문구.
  - QA: mobile tsc exit 0. `cd mobile && npx expo install --check` 경고 없음. ko·en·es 홈·리포트 스크린샷에서 글꼴 대체(시스템 글꼴로 떨어짐) 없음. `grep -n "Cormorant\|Manrope" CLAUDE.md PRODUCT.md`가 새 결정과 일치. (사용자 확인) 실기기 OTA 후 글꼴 로드.

- [ ] 15. 운세 화면 카드 개편
  - 변경: `screens/FortuneScreen.tsx` 오늘 탭 — 개요 주인공, 영역별 운세 묶음, 세부 펼치기, 대문자 소제목 정리, 상단 제목을 탭에 맞게, es 탭 라벨 넘침 해결. 무료/구독 경계와 페이월 문구 유지.
  - QA: mobile tsc exit 0. `?qa=all&persona=lucia`(es)와 `?qa=free&persona=mia` 오늘·연간 탭 스크린샷. 페이월이 여전히 잠긴 항목을 정확히 나열.

- [ ] 16. 행운의 방향 숨김 + 엔진 용어 정리
  - 변경: `screens/FortuneScreen.tsx`(en/es에서 방향 숨김), `lib/dailyFortuneContent.ts` 필요 시, 리포트 면책의 "manseryeok engine" 등 내부 용어를 각 언어 표현으로(`lib/i18n/*`).
  - QA: mobile tsc exit 0. `grep -rni "manseryeok" mobile/lib/i18n/en.ts mobile/lib/i18n/es.ts` → 사용자 노출 문구 없음. en·es 운세 행운 카드에 방향 없음(스크린샷).

- [ ] 17. 유명인 예시 현지화
  - 변경: `mobile/lib/sajuTypeCelebrities.ts`에 언어권 태그와 스페인어권·한국 인물 추가, `screens/TypeScreen.tsx`에서 사용자 언어권 우선 정렬. 새 인물은 공개 생년월일을 `lib/manseryeok.ts`+`lib/sajuType.ts`로 계산해 맞는 유형에만 넣고 출처를 주석에. 웹 사본 `lib/sajuTypeCelebrities.ts`도 같은 내용으로.
  - QA: mobile tsc exit 0. 루트 `npx tsc --noEmit` exit 0. 계산 검증 스크립트(스크래치) 출력에서 추가 인물 전원 배정 유형 일치. `?qa=all&persona=lucia` 타입 화면에 스페인어권 인물이 먼저(스크린샷).

- [ ] 18. iPad 레이아웃
  - 선행: 1, 5, 8, 10, 15 (바뀐 화면 위에서 작업)
  - 변경: 공용 레이아웃 훅/컨테이너(`useWindowDimensions`, 768pt 이상), 홈·운세·리포트·검사 목록 최대 폭 또는 2열, 리포트 페이지·공유 카드 미리보기 비율.
  - QA: mobile tsc exit 0. 웹 미리보기 1024×1366에서 4개 화면 스크린샷, 본문이 화면 가득 늘어나지 않음. (사용자 확인) iPad 시뮬레이터 또는 실기기 확인.

## 마무리

- [ ] 19. 재진단 + 문서 갱신
  - 선행: 1~18
  - 변경: `/impeccable critique` 앱 전체 재실행, `WIKI.md`(원국 컴포넌트, 리포트 공용 페이지 부품, 글꼴 토큰, iPad 레이아웃), `PRODUCT.md` 해당 줄.
  - QA: 새 진단 점수가 27/40 초과, 결과 파일 경로 기록. mobile tsc exit 0.

## 사용자 실행 (마지막)

- [ ] A. (사용자 실행) 이전 작업(챗봇 5세트) 배포와 실기기 확인 — `TODO_2026-10-02.md` 13번에서 옮김
  - 순서·확인 항목은 `TODO_2026-10-02.md` 13번 그대로. 이번 배치 작업 전에 먼저 끝내는 것을 권장(미푸시 커밋 14개가 쌓여 있음).

- [ ] B. (사용자 실행) 이번 배치 배포와 실기기 확인
  - 선행: A, 19
  - 순서: 커밋 → (웹 파일을 바꿨으면) `git push origin main` → Vercel Ready 확인 → OTA(`cd mobile && npx --yes eas-cli update --branch production --environment production --message "디자인 진단 수정 배치" --non-interactive`) → TestFlight 앱 완전 종료 후 두 번 열기.
  - 확인할 것: 새 글꼴 로드, VoiceOver로 온보딩, 동작 줄이기, 홈 원국 그림, 공유 카드 저장, 신년·심층 리포트 넘김과 마지막 장, iPad.
  - (사용자 확인) 실기기·RevenueCat이 필요해 자동화할 수 없다.

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

- (1번 중) `mobile/dev/qaMode.ts:89` QA 프리셋이 `?persona=`로 페이지를 불러올 때마다 `fatesaid_fortune_open_state`를 지워, 새로고침하면 운세를 열었어도 홈이 다시 "기다리고 있어요"로 보인다. dev 전용이지만 재진단 때 오래된 상태로 오인될 수 있음 — 페르소나가 바뀔 때만 지우게 할지 검토.
- (6번 중) 심층 리포트 심리검사 분석 쪽 부제 "Module 1 · Love & Attachment Analysis"(`ReportScreen.tsx`의 `quizAnalysisSuffix` 줄)에 아직 "Module N"이 붙는다. 표지·다음 검사 카드는 `moduleDisplayTitle`로 뺐으니 10번(모듈 번호 제거) 때 같이 정리.
- (6번 중) 서버 리포트 프롬프트(`lib/reportPrompts.ts:298`)가 여전히 81자짜리 `subtitle`을 쓰게 한다. 앱 표지는 더 이상 쓰지 않지만 PDF 표지(`lib/pdf/reportPdf.tsx:315` `coverSubtitle`)는 그대로 81자를 보여 준다. PDF 표지도 앱처럼 짧게 만들지, 프롬프트 형식 지시를 바꿀지 검토(서버 프롬프트·PDF는 이번 SPEC 범위 밖).
