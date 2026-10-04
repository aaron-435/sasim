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

- [x] 7. 원국 그림 시안 2~3개 (사용자 확인)
  - 변경: 스크래치 또는 dev 전용 화면에 `react-native-svg` 시안 2~3개(네 기둥 + 오행 분포, 시주 없음 버전 포함, "가장 강한 오행"과 일간 구분). 프로젝트 화면 코드는 건드리지 않음.
  - QA: 웹 미리보기 스크린샷을 사용자에게 보여주고 선택 결과를 이 항목에 기록. (사용자 확인) 선택.
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(다른 세션이 띄운 8082 서버, mobile 프리셋) `?sketch=chart&persona=jordan|jisoo|lucia`에서 시안 3개(A 네 기둥 + 분포 막대 / B 오행 고리 / C 여덟 칸 직조)를 en·ko(시주 없음)·es로 확인, 겹침·잘림 없음, 콘솔 오류 없음. **사용자 선택: A · 네 기둥 + 분포 막대** (2026-10-03).
  - 메모: 시안은 `mobile/dev/ChartSketches.tsx`(dev 전용, 문구 하드코딩), 진입은 `index.ts`의 `__DEV__` + `?sketch=chart` 분기. 8번에서 A를 `components/`로 옮긴 뒤 시안 파일과 분기는 지운다. A 구성: 기둥마다 위 천간(둥근 칸)·아래 지지(모난 칸), 칸 안 주 표기는 언어별 오행 이름, 한자는 작은 보조. 일간 칸에 밝은 테두리 + "나/You/Tú" 배지, 아래 분포 막대에서 가장 강한 오행은 진하게, 캡션 두 줄 "가장 많은 기운 · 흙 38%" / "당신 자신 · 물"로 두 개념을 나눈다. 시주 없음은 빗금 점선 칸 + "시간 모름". 동률(Jordan 흙·쇠 37.5%)은 둘 다 표시.

- [x] 8. 원국 컴포넌트 구현 + 홈 적용
  - 선행: 7
  - 변경: `components/`에 원국 컴포넌트, `screens/HomeScreen.tsx` 오행 막대 카드 교체(탭 불가 카드는 목록처럼 보이지 않게). 데이터는 저장된 `fourPillars`.
  - QA: mobile tsc exit 0. jordan·mia·jisoo(시간 있음/없음 섞어서) 홈 스크린샷에서 그림이 깨지지 않음.
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(다른 세션이 띄운 8082 서버를 브라우저 창에서 직접 열기, mobile 프리셋) 홈: `?qa=all&persona=jordan`(en) 네 기둥 + 분포 막대, 동률 캡션 "Most present · Earth & Metal, 38% each" / "Your core · Water", 일간 칸 "You" 배지. `?qa=all&persona=jisoo`(ko, 시간 모름) 시주 칸 빗금 점선 + "시간 모름", 막대 합 100%(6글자), "가장 많은 기운 · 흙 50%" / "당신 자신 · 나무". `?qa=all&persona=lucia`(es) "Más presente · Tierra 38%" / "Tu esencia · Agua", 칸 글자 잘림 없음. `?qa=free&persona=mia`(en) 무료 상태에서도 정상. 그림 전체가 role=img + 언어별 요약 라벨(예: "나의 사주 원국. 태어난 해: 위 흙, 아래 나무. … 시: 시간 모름. …"). 콘솔 오류 없음.
  - 메모: 공용 `mobile/components/FourPillarsChart.tsx`(`parseFourPillars`, `strongestElements` 함께 내보냄 — 9번에서 재사용). 폭은 onLayout으로 재서 칸 폭 52~76pt, 넓은 화면에선 기둥 묶음을 가운데로(18번 iPad 대비). 문구는 `strings.fourPillarsChart`(ko 오행 이름은 시안대로 나무/불/흙/쇠/물). 홈 카드는 테두리·배경 없이 그려 아래 기능 목록(테두리 카드)과 구분, 섹션 제목 "나의 사주 원국 / My saju chart / Mi carta saju". 인사말 아래 "가장 강한 오행 · ⛰️ 토" 줄과 설명 한 줄(`home.elementBadgePrefix`·`identityHint`)은 그림 캡션이 같은 구분을 하면서 동률을 둘 다 말하므로 지웠다(서버 `dominantElement` 하나만 말해 그림과 어긋나던 문제). 오행 막대 성장 애니메이션은 막대와 함께 사라졌고 새 동작은 없다. 7번 시안 파일 `dev/ChartSketches.tsx`와 `index.ts`의 `?sketch=chart` 분기 삭제.
  - [ ] (사용자 확인) iOS 시뮬레이터 dev-client에서 홈 원국 그림의 한자(보조 표기)가 시스템 글꼴로 정상 표시되는지, VoiceOver가 그림을 한 덩어리로 요약해 읽는지.

- [x] 9. 타입 화면·사주 타입 공유 카드에 원국 적용
  - 선행: 8
  - 변경: `screens/TypeScreen.tsx`, `screens/ShareCardsScreen.tsx`·`lib/shareCardContent.ts`(사주 타입 카드). view-shot 캡처 크기 확인.
  - QA: mobile tsc exit 0. 타입 화면과 공유 카드 미리보기 스크린샷. (사용자 확인) 실기기에서 공유 카드 이미지 저장 후 원국이 잘리지 않는지.
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(이 세션이 띄운 8082 서버, mobile 프리셋) 타입 화면: `?qa=all&persona=jordan`(en) 히어로 아래 "My saju chart" + 네 기둥 그림, 동률 캡션 "Most present · Earth & Metal, 38% each" / "Your core · Water", 아래 공유 카드 맨 위(FATESAID 아래)에 같은 그림 + 가운데 정렬 캡션 + 구분선. `?qa=all&persona=jisoo`(ko, 시간 모름) 화면·공유 카드 모두 시주 칸 빗금 + "시간 모름", "가장 많은 기운 · 흙 50%" / "당신 자신 · 나무". `?qa=all&persona=lucia`(es) "Más presente · Tierra 38%" / "Tu esencia · Agua", 공유 카드 좁은 폭(칸 52pt)에서도 "Madera"·"Fuego" 잘림 없음. role=img 요약 라벨 언어별 정상. 콘솔 오류 없음.
  - 메모: "사주 타입 공유 카드"는 `TypeScreen` 안의 공유 카드(내용 높이 그대로, `captureRef` 너비 1080)다. `ShareCardsScreen`(돈·연애·올해 카드, 9:16 고정 상자)은 원국과 무관한 영역 카드라 손대지 않았고 `lib/shareCardContent.ts`도 그대로. 공유 카드는 고정 비율이 아니어서 그림이 들어가도 잘리지 않고 길이만 늘어난다. 섹션 제목은 홈과 같은 `home.myChartTitle`을 재사용해 새 문구 없음. `FourPillarsChart`에 캡션 가운데 정렬 옵션(`centered`) 추가. 타입 화면의 "지금 나를 움직이는 것"(mode) 문구는 오행 이름을 말하지 않아(Jordan: "The chart leans toward what presses on you") 동률 캡션과 어긋나지 않는다.
  - [ ] (사용자 확인) iOS 시뮬레이터 dev-client 또는 실기기에서 타입 화면 "결과 공유하기" → 저장한 PNG에 원국 그림(SVG)이 빠지거나 잘리지 않고 찍히는지, 한자가 정상 표시되는지.

## P2

- [x] 10. 검사 목록 단순화
  - 변경: `screens/ModuleSelectScreen.tsx` — 추천 3개 크게(쉬운 한 줄 + 추천 이유 + "약 5분 · 30문항"), 나머지 "모든 검사"로 접기, "Module N"·임상 용어 부제 제거. `lib/i18n/*`.
  - QA: mobile tsc exit 0. `grep -rn "Module [0-9]\|Módulo [0-9]\|모듈 [0-9]" mobile/lib/i18n` 에서 검사 목록용 문구 없음. 첫 화면에 보이는 선택지 4개 이하(스크린샷, en·es).
  - QA: mobile tsc(큰 스택) → exit 0. `grep -rn "Module [0-9]\|Módulo [0-9]\|모듈 [0-9]" mobile/lib/i18n` → `STYLE_GUIDE.md` 설명 1줄뿐(UI 문구 없음), 화면 파일에 "Module N"·`subtitle` 참조 없음(exit 1). mobile-web 미리보기(이 세션이 띄운 8082 서버, mobile 프리셋): `?qa=all&persona=jordan&lang=en`(관심사 일상) "Good places to start" + "Picked to match what's on your mind: Myself & daily life." + Burnout·Money·Follow-Through 큰 카드(쉬운 한 줄 + "About 5 min · 30 questions") + "All tests · 8 more" — 접힌 상태 role=button 5개(뒤로 + 선택지 4개). 펼치면 "Show less"(aria-expanded=true) + 나머지 8개 목록, 각 버튼 라벨에 번호 없음. 카드 탭 → Burnout 퀴즈 1/30. `?qa=all&persona=lucia&lang=es`(관심사 관계) "Buenos tests para empezar · Elegidos según lo que te importa ahora: Relaciones." + Amor y apego·Familia de origen·La máscara + "Todos los tests · 8 más". `?qa=free&persona=jisoo&lang=ko` "먼저 해 보기 좋은 검사 · 지금 궁금하다고 고른 '나 자신과 일상'에 맞춰 골랐어요." + 번아웃·돈·실행력. 콘솔 오류 없음.
  - 메모: 추천 3개는 관심사별 고정 목록(관계: 연애&애착·원가족·가면 / 일상: 번아웃·돈·실행력 / 미선택: 연애&애착·돈·번아웃, 미선택 경로는 코드·tsc로만 확인). 관계 track 모듈이 2개뿐이라 셋째는 사람 사이 피로를 다루는 가면으로 골랐다. 모듈 `title`의 "모듈 N ·"은 서버 프롬프트·저장 결과에 쓰이므로 데이터는 그대로 두고, `ReportScreen`에 있던 `moduleDisplayTitle`을 `lib/quiz/modules.ts`로 옮겨 검사 목록·리포트에서 함께 쓴다(발견 사항의 리포트 심리검사 분석 쪽 부제 "Module 1 · …"도 이걸로 정리). 쉬운 한 줄은 `strings.moduleSelect.blurbs`(11개 × ko/en/es), 소요 시간은 SPEC 가정대로 고정 "약 5분 · 30문항". 접기는 애니메이션 없음. 임상 부제(`subtitle`)는 화면에서만 뺐고 데이터는 그대로.

- [x] 11. Q&A 주제 묶기 + 남은 질문 수
  - 변경: `screens/QAScreen.tsx`(첫 화면 주제 5개 이하로 묶는 표시용 매핑, 질문 은행은 그대로), 헤더에 오늘 남은 수(`lib/qaQuota.ts`).
  - QA: mobile tsc exit 0. `git diff --stat mobile/data/questionBank.json` → 변경 없음. 무료·구독 페르소나에서 "1개 중 1개 남음"/"10개 중 N개 남음" 스크린샷.
  - QA: mobile tsc(큰 스택) → exit 0. `git diff --stat mobile/data/questionBank.json` → 출력 없음(변경 없음). mobile-web 미리보기(다른 세션이 띄운 8082 서버를 브라우저 창에서 직접 열기, mobile 프리셋): `?qa=free&persona=mia`(en) 헤더 "1 of 1 left today", 주제 5개 Love & People · Work & Money · You & Your Wellbeing · Timing & Change · Today & This Week. Love & People → 섹션 "Love & Relationships"(5) + "Family & Relationships"(4). Today & This Week → 중간 화면 없이 질문 목록으로, 뒤로 → 채팅. `?qa=pro&persona=lucia`(es, 오늘 사용량 3으로 설정) 헤더 제목 아래 "Te quedan 7 de 10 hoy", 제목 "PREGUNTAS DE SAJU · RESPUESTA DE IA" 잘림 없음, Trabajo y dinero → "Trabajo y estudios"(4) + "Dinero y éxito"(3). `?qa=free&persona=jisoo`(ko, 사용량 1) "오늘 1개 중 0개 남음" + 한도 안내·구독 버튼. 콘솔 오류 없음. 확인 뒤 테스트용 사용량 키는 지움.
  - 메모: 묶음은 `mobile/lib/qaTopicGroups.ts`(사랑과 사람=love+family, 일과 돈=career+wealth, 나 자신과 마음=self+wellbeing, 시기와 변화=timing, 오늘과 이번 주=daily). 여러 분류가 합쳐진 묶음은 `QASubcategoryScreen`에서 원래 분류 이름이 섹션 제목이 되고, 하위 주제가 하나뿐인 묶음(오늘)은 질문 목록으로 바로 간다(뒤로·Android 뒤로도 채팅으로). 남은 수는 첫 인사 때·답변 뒤·구독/복원 뒤에 갱신. es에서 오른쪽에 두면 제목이 잘리고 두 줄로 접혀 제목 아래 줄로 옮겼다. 웹 Q&A와 질문 은행은 그대로 8개 분류.

- [x] 12. 궁합 화면 정리
  - 변경: `screens/CompatibilityScreen.tsx` — 관계 이름 맨 위 크게, 점수는 작은 보조, 반복 문단 제거, 공유 카드 미리보기 틀, 폼 간격·성별 라벨·포커스 테두리 `COLORS.gold`. 궁합 공유 카드도 같은 위계.
  - QA: mobile tsc exit 0. 결과·공유 카드·폼 스크린샷. `grep -nE "#[0-9A-Fa-f]{6}" mobile/screens/CompatibilityScreen.tsx` 결과를 검토해 포커스 테두리가 하드코딩 금색이 아니라 `COLORS` 토큰임을 기록.
  - QA: mobile tsc(큰 스택) → exit 0. `grep -nE "#[0-9A-Fa-f]{6}" mobile/screens/CompatibilityScreen.tsx` → 2줄(227·232, 공유 카드 "좋은 점"/"주의할 점" 라벨 색 `#8FBF9E`·`#D9A26C`, 포커스와 무관). 포커스 테두리는 `inputFocused: { borderColor: COLORS.gold }`, 도시 결과 상자의 옛 팔레트 `#131219`는 `COLORS.background`로. Pressable 10개 / `accessibilityRole` 13개. mobile-web 미리보기(다른 세션이 띄운 8082 서버를 브라우저 창에서 직접 열기, mobile 프리셋): `?qa=all&persona=jordan&lang=en` 폼 — 이름·성별 사이에 "Their gender" 라벨(radiogroup 라벨도 같음), 포커스한 입력 칸 계산 테두리 rgb(111,169,139)=청자색·outline 0px(수정 전 브라우저 기본 노란 링). 결과 — 맨 위 "Jordan · Sam" → 관계 이름 "You're the one who fuels them"(표시 글꼴 30) → 작은 "Compatibility points · 82", 본문 문단은 화면에 한 번. 아래 점선 틀 "Share image preview" 안의 공유 카드도 관계 이름이 크고 점수는 작은 한 줄, 본문 대신 좋은 점·주의할 점만(수정 전 본문 화면 1 + 카드 1 + 좋은/주의 = 같은 뜻 세 번). `?qa=all&persona=lucia&lang=es` "Eres quien desafía" / "Puntos de compatibilidad · 58" / "Vista previa de la imagen para compartir", 잘림 없음. `?qa=all&persona=jisoo&lang=ko` "지수 · 민준" / "내가 받는 쪽" / "궁합 포인트 · 82" / "공유 이미지 미리보기". 콘솔 오류 없음.
  - 메모: 새 문구 `compatibility.genderLabel`·`sharePreviewLabel`(ko/en/es). 웹 포커스 링은 `outlineStyle: "solid"` + `outlineWidth: 0`으로 끄고 테두리 색으로 대신한다(RN 타입이 `"none"`을 받지 않고, Chrome은 `auto`일 때 폭 0을 무시). 공유 카드는 그대로 `captureRef` 너비 1080(내용 높이), 미리보기 틀은 캡처 대상 밖이라 저장 이미지에 들어가지 않는다. 결과 화면 버튼 3개·도시 결과 줄에 역할·라벨 추가. 새 동작 없음.
  - [ ] (사용자 확인) iOS 시뮬레이터 dev-client 또는 실기기에서 궁합 결과 "결과 공유하기" → 저장된 PNG에 점선 틀·"미리보기" 글자가 들어가지 않고 카드만 찍히는지, 관계 이름이 크게 보이는지.

## 추가 범위

- [x] 13. 글꼴 후보 비교 시안 (사용자 확인)
  - 선행: 0
  - 변경: 없음(스크래치에서 웹 미리보기에 후보 글꼴을 임시 주입하거나 HTML 비교 시안). 조건: 스페인어 악센트·한글(짝 글꼴 가능)·무료·`@expo-google-fonts/*`로 OTA 가능.
  - QA: 홈·리포트 1쪽·운세 3화면 × 후보 2~3조합(+ 현행) 비교를 사용자에게 보여주고 선택 결과를 기록. (사용자 확인) 선택.
  - 시안(2026-10-04, 코드 변경 없음): Playwright 헤드리스(2배율, 375×812)로 mobile-web `?qa=all&persona=jordan|jisoo|lucia` 홈·운세 오늘 탭·심층 리포트 1쪽에 `@expo-google-fonts` TTF(unpkg)를 임시 주입해 36장 촬영. 비교표 `.playwright-mcp/compare-{home,fortune,report}.png`, 한글 제목 확대 `compare-ko-display-2x.png`(추적 안 되는 임시 폴더).
    - 현행: Cormorant Garamond 500 + Manrope, 한글은 시스템 글꼴
    - A 따뜻한 세리프: Fraunces 500 + Figtree, 한글 제목 고운바탕(한 굵기 약 8.4MB)
    - B 에디토리얼: Instrument Serif(굵기 하나, 이탤릭 별도) + DM Sans, 한글 제목 나눔명조(한 굵기 약 3.1MB)
    - C 단정한 뉴스페이퍼: Newsreader 500 + Plus Jakarta Sans, 한글 제목 나눔명조
    - 공통 메모: 라틴 후보는 한 굵기 40~120KB(현행 Cormorant 667KB). 크기는 그대로 두고 바꿨기 때문에 A·C는 제목이 한 줄 더 길어짐(14번에서 크기 조정). 리포트 부제 이탤릭은 지금도 합성 기울임이라 14번에서 이탤릭 파일을 함께 넣을지 정해야 함. 한글 본문(UI)은 모든 안에서 시스템 글꼴 유지(용량 0).
  - 선택 결과(2026-10-04 사용자): C — 표시용 Newsreader, UI용 Plus Jakarta Sans. 한글은 제목·본문 모두 시스템 글꼴 유지(나눔명조 넣지 않음). 14번은 이 조합으로 진행.
  - QA: Playwright 헤드리스 2배율 스크린샷 36장 → 비교표 3장 + 한글 확대 1장을 사용자에게 보여주고 선택 받음.

- [x] 14. 고른 글꼴 적용
  - 선행: 0, 13
  - 변경: `mobile/package.json`(글꼴 JS 패키지), `App.tsx` 로딩, 글꼴 토큰 값, `lib/reportPdf.ts`·공유 카드의 글꼴, 루트 `CLAUDE.md` Fonts 줄과 `PRODUCT.md` 글꼴 문구.
  - QA: mobile tsc exit 0. `cd mobile && npx expo install --check` 경고 없음. ko·en·es 홈·리포트 스크린샷에서 글꼴 대체(시스템 글꼴로 떨어짐) 없음. `grep -n "Cormorant\|Manrope" CLAUDE.md PRODUCT.md`가 새 결정과 일치. (사용자 확인) 실기기 OTA 후 글꼴 로드.
  - 적용(2026-10-04): 앱은 `@expo-google-fonts/newsreader`(500 + 500 이탤릭)·`plus-jakarta-sans`(400/500/600/700)로 교체하고 Cormorant·Manrope 패키지 제거. `theme/fonts.ts`에 `FONTS.displayItalic` 추가 — 리포트 표지 부제·인용문, 홈 철학 문장이 합성 기울임(`fontStyle: "italic"`) 대신 진짜 이탤릭을 씀(ko 철학 문장은 정체). 공유 카드·원국 그림 SVG는 토큰을 쓰므로 자동 반영. PDF는 루트 패키지 교체 + `lib/pdf/reportPdf.tsx` 등록 + `next.config.mjs` 파일 포함 목록 교체(ko는 Noto Sans KR 그대로). 글자 크기는 스크린샷상 줄넘김이 문제없어 바꾸지 않음.
  - QA: mobile tsc(큰 스택) → exit 0. 루트 `npx tsc --noEmit` → exit 0, `npm run lint && npm run build` → 경고·오류 없음, exit 0, `/api/report-pdf` nft에 새 TTF 3개 포함. `npx expo install --check` → 글꼴 패키지 경고 없음(남은 6개 패치 버전 경고는 변경 전에도 동일, 발견 사항). Node로 react-pdf에 새 TTF를 등록해 렌더 → `/BaseFont` Newsreader-Medium·PlusJakartaSans-Regular/SemiBold, 스페인어 악센트 정상(pdftoppm 이미지 확인). mobile-web 미리보기(mobile 프리셋) `?qa=all&persona=lucia`(es) 홈·심층 리포트 1쪽, `jisoo`(ko) 홈·리포트 1쪽, `jordan`(en) 홈·운세: `document.fonts`에서 새 글꼴 로드 완료, 화면 텍스트 font-family가 전부 Newsreader_*/PlusJakartaSans_*(대체 없음, 한글은 의도대로 시스템 글꼴). `grep -n "Cormorant\|Manrope" CLAUDE.md PRODUCT.md` → 결과 없음(새 문구로 교체).
  - [ ] (사용자 확인) 실기기에서 OTA(웹 배포 후 `eas update`) 받은 뒤 홈 인사말·리포트 표지 부제(이탤릭)·운세 본문이 새 글꼴로 보이는지, Android에서 리포트 인용문이 기울임으로 보이는지.

- [x] 15. 운세 화면 카드 개편
  - 변경: `screens/FortuneScreen.tsx` 오늘 탭 — 개요 주인공, 영역별 운세 묶음, 세부 펼치기, 대문자 소제목 정리, 상단 제목을 탭에 맞게, es 탭 라벨 넘침 해결. 무료/구독 경계와 페이월 문구 유지.
  - QA: mobile tsc exit 0. `?qa=all&persona=lucia`(es)와 `?qa=free&persona=mia` 오늘·연간 탭 스크린샷. 페이월이 여전히 잠긴 항목을 정확히 나열.
  - 적용(2026-10-04): 오늘 탭 8장 → 4덩어리. ① 주인공 카드(오늘의 리듬 이름 + 총론 제목·본문 + 공유, 연속 배지) ② "영역별로 보면" 한 카드 안에 재물·애정·건강 줄 ③ 행운 포인트(항목 라벨을 "색/숫자/방향"으로 줄여 es 두 줄 접힘 해소) ④ "오늘 더 알아보기" — 12운성·12신살을 접힌 줄로, 탭하면 펼침(애니메이션 없음, `aria-expanded`). 연간 탭도 같은 구조(주인공 + 재물·애정·직장·학업·건강 묶음 + 12운성·신살 접기, 합/충 메모는 주인공 카드 안 인용 줄). 소제목 대문자·자간 제거(문장형 13pt). 상단 제목 `fortune.headerLabel` → `fortune.tabHeadings[tab]`(오늘의 운세/이번 주 운세/이달의 운세/신년 운세, Today's Fortune/Your Week/Your Month/The Year Ahead, Tu lectura de hoy/Tu semana/Tu mes/El año que viene). 탭은 테두리 상자 4개 → 세그먼트 컨트롤 하나(`tablist`), 라벨을 짧게(Week/Month/Year, Semana/Mes/Año, 이번 주) + `numberOfLines={1}`. 월별 흐름 칩에 역할·선택 상태. 등장 애니메이션은 4덩어리로 줄였고 기존 동작 줄이기 분기 그대로. 무료 화면·페이월 코드는 그대로.
  - QA: mobile tsc(큰 스택) → exit 0. `grep -c 'textTransform: "uppercase"' mobile/screens/FortuneScreen.tsx` → 0. mobile-web 미리보기(다른 세션이 띄운 8082 서버를 브라우저 창에서 직접 열기, mobile 프리셋 375×812): `?qa=all&persona=lucia`(es) 오늘 — 제목 "Tu lectura de hoy", 주인공 "Tu ritmo de hoy / Un ritmo receptivo / Un rayo de sol", "Por áreas" 안 Dinero·Amor·Salud, 행운 "Color/Número/Dirección" 한 줄, "Más sobre hoy" 2줄 접힘 → "Plenitud" 탭하면 본문 펼침(aria-expanded true). 탭 4개 모두 글자 넘침 없음(scrollWidth ≤ clientWidth), aria-selected 정상. 연간 — 제목 "El año que viene", 신년 리포트 카드 → 주인공 "Tu ritmo en 2027 / Un ritmo de iniciativa" → Por áreas 5줄 → Más sobre este año → Flujo mensual. `?qa=free&persona=mia`(en) 무료 총론 카드 + "What Pro opens" 혜택 5개·구독 버튼·약관 문구가 수정 전과 같음. `?qa=all&persona=jisoo`(ko) 오늘 "오늘의 운세 / 오늘의 리듬 · 고르는 리듬 / 영역별로 보면". `?qa=all&persona=jordan`(en) Week 탭 제목 "Your Week", 탭 넘침 없음, 최고의 날·조절할 날·날짜 목록 정상. 콘솔 오류 없음.

- [x] 16. 행운의 방향 숨김 + 엔진 용어 정리
  - 변경: `screens/FortuneScreen.tsx`(en/es에서 방향 숨김), `lib/dailyFortuneContent.ts` 필요 시, 리포트 면책의 "manseryeok engine" 등 내부 용어를 각 언어 표현으로(`lib/i18n/*`).
  - QA: mobile tsc exit 0. `grep -rni "manseryeok" mobile/lib/i18n/en.ts mobile/lib/i18n/es.ts` → 사용자 노출 문구 없음. en·es 운세 행운 카드에 방향 없음(스크린샷).
  - 적용(2026-10-04): 오늘 탭 행운 카드의 방향 칸을 `locale === "ko"`일 때만 렌더(en/es는 색·숫자 2칸, `dailyFortuneContent.ts`는 그대로 — 방향 데이터는 ko만 씀). 심층 리포트 면책 1 en "our own manseryeok engine" → "our own Korean calendar engine", es "calendario perpetuo coreano (manseryeok)" → "nuestro propio motor del calendario coreano". 다른 운세 본문에 방위 표현 없음(grep). `lib/i18n/STYLE_GUIDE.md` 용어표의 Manseryeok 줄을 "UI 문구에 manseryeok 쓰지 않음"으로.
  - QA: mobile tsc(큰 스택) → exit 0. `grep -rni "manseryeok" mobile/lib/i18n/en.ts mobile/lib/i18n/es.ts` → 결과 없음(exit 1). mobile-web 미리보기(기존 8082 서버를 브라우저 창에서 열기, mobile 프리셋) 오늘 탭 행운 카드: `?qa=all&persona=lucia`(es) "Color Blanco / Número 4, 9" 2칸·"Dirección" 없음(스크린샷), `jordan`(en) "Color White / Number 4, 9"·"Direction" 없음, `jisoo`(ko) "색 흰색 / 숫자 4, 9 / 방향 서쪽" 그대로. 콘솔 오류 없음.

- [x] 17. 유명인 예시 현지화
  - 변경: `mobile/lib/sajuTypeCelebrities.ts`에 언어권 태그와 스페인어권·한국 인물 추가, `screens/TypeScreen.tsx`에서 사용자 언어권 우선 정렬. 새 인물은 공개 생년월일을 `lib/manseryeok.ts`+`lib/sajuType.ts`로 계산해 맞는 유형에만 넣고 출처를 주석에. 웹 사본 `lib/sajuTypeCelebrities.ts`도 같은 내용으로.
  - QA: mobile tsc exit 0. 루트 `npx tsc --noEmit` exit 0. 계산 검증 스크립트(스크래치) 출력에서 추가 인물 전원 배정 유형 일치. `?qa=all&persona=lucia` 타입 화면에 스페인어권 인물이 먼저(스크린샷).
  - 적용(2026-10-04): `CelebrityEntry`에 `region`(anglo/hispanic/korea/other)과 한국 인물용 `nameKo` 추가, 기존 99명에 지역 태그(영미권 65·스페인어권 4·기타). 스페인어권 33명·한국 37명 추가 → 50개 유형 중 스페인어권 인물 있는 유형 37개, 한국 인물 37개. 후보 약 200명의 생년월일을 Wikidata(P569, 날짜 정밀도 값이 하나뿐인 항목만 — 값이 엇갈린 Bardem·Santana·송강호 등 7명 제외)에서 받아 `calculateManseryeok`(시간·도시 없음, 기존 데이터와 같은 방식) + `classifySajuType`으로 계산, 맞은 유형에만 넣고 항목마다 `// 생년월일 YYYY-MM-DD — Wikidata Q…` 주석. 방법 검증으로 기존 4명(Musk·Merkel·Messi·Napoleon)을 다시 계산해 기존 배정과 일치 확인. 논란이 큰 인물·생일이 음력/불명확한 역사 인물·해외 동포는 후보에서 뺌. `getCelebritiesForType(code, locale)`이 사용자 언어권(ko→korea, en→anglo, es→hispanic) 인물을 먼저, 최대 3명. 타입 화면 공유 카드는 원래 높이를 지키려고 앞 2명만. ko 화면은 한국 인물을 한글로(`celebrityDisplayName`). 웹 사본 `lib/sajuTypeCelebrities.ts`도 같은 내용(머리말만 다름).
  - QA: 스크래치 검증 스크립트(`npx tsx --env-file=.env.local …/verify.mts` — 파일의 날짜 주석을 다시 읽어 엔진으로 재계산) → "checked 70: 70 match, 0 mismatch". mobile tsc(큰 스택) → exit 0. 루트 `npx tsc --noEmit` → exit 0. mobile-web 미리보기(mobile 프리셋): `?qa=all&persona=lucia`(es, El rocío · Orden) 타입 화면 "Personas que comparten este tipo" 첫 카드 Gabriela Mistral, 이어서 Meryl Streep·Jay-Z(스크린샷). `jisoo`(ko, 거목 · 성취) 첫 카드 "송혜교 / 배우 · 1981년생", 이어서 Napoleon Bonaparte·Bruce Lee.

- [x] 18. iPad 레이아웃
  - 선행: 1, 5, 8, 10, 15 (바뀐 화면 위에서 작업)
  - 변경: 공용 레이아웃 훅/컨테이너(`useWindowDimensions`, 768pt 이상), 홈·운세·리포트·검사 목록 최대 폭 또는 2열, 리포트 페이지·공유 카드 미리보기 비율.
  - QA: mobile tsc exit 0. 웹 미리보기 1024×1366에서 4개 화면 스크린샷, 본문이 화면 가득 늘어나지 않음. (사용자 확인) iPad 시뮬레이터 또는 실기기 확인.
  - 적용(2026-10-04): 2열 대신 가운데 한 줄 기둥으로 통일. `mobile/theme/layout.ts`에 `readableColumn`(width 100%·maxWidth 640·alignSelf center) — 휴대폰은 640보다 좁아 변화 없음, 넓은 창에서만 본문 폭이 멈추고 양옆은 배경 무늬. 적용: `HomeScreen`·`FortuneScreen`·`ModuleSelectScreen`·`TypeScreen`·`CompatibilityScreen`·`ShareCardsScreen`·`YearReportScreen`(구매 전 미리보기)의 스크롤 내용, `ReportPager`는 페이지 넘김 계산용 바깥 칸은 화면 폭 그대로 두고 안쪽에 640 기둥(두 리포트의 모든 페이지·마무리 장 포함) + 상단 진행 막대도 같은 폭. 공유 카드 미리보기는 기둥 안에서 폭 기준으로 그려져 비율 유지. 훅 대신 정적 maxWidth라 회전·Split View에도 그대로 동작. 가로 회전 설정은 건드리지 않음.
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(기존 8082 서버, 브라우저 창 1024×1366) `?qa=all&persona=jordan`: 홈 히어로 left 214·width 596(양옆 214 대칭), 운세 오늘 탭 텍스트 범위 233~791, 검사 목록 214~810, 심층 리포트 표지·3쪽·마지막 장(41/41, 요약·공유·PDF·다음 검사·새 면책 문구) 모두 가운데 기둥이고 넘김 위치 정상(03/41), 신년 리포트 표지 218~806(1/13), 타입 화면 218~803·공유 카드 미리보기 기둥 안에서 비율 정상(스크린샷). 휴대폰 회귀: 375×812 홈 텍스트 22~353, 가로 넘침 없음(수정 전과 같은 22pt 여백).
  - [ ] (사용자 확인) iPad 시뮬레이터(dev-client) 또는 실기기에서 홈·운세·검사 목록·두 리포트를 세로/가로로 열어 본문이 가운데 기둥으로 보이는지, 리포트를 넘길 때 페이지가 반쯤 걸치지 않는지, 공유 카드 저장 이미지가 휴대폰과 같은 비율인지.

## 마무리

- [x] 19. 재진단 + 문서 갱신
  - 선행: 1~18
  - 변경: `/impeccable critique` 앱 전체 재실행, `WIKI.md`(원국 컴포넌트, 리포트 공용 페이지 부품, 글꼴 토큰, iPad 레이아웃), `PRODUCT.md` 해당 줄.
  - QA: 새 진단 점수가 27/40 초과, 결과 파일 경로 기록. mobile tsc exit 0.
  - 적용(2026-10-04): `/impeccable critique` 앱 전체를 두 에이전트로 재실행(A 디자인 리뷰: mobile-web 8082 헤드리스 Playwright 375×812 + iPad 1회, 온보딩은 도시 화면까지 실제로·제출 안 함, 채팅은 소스만 / B 탐지기 CLI + 화면 6곳 오버레이). WIKI는 원국 그림·리포트 공용 부품(ReportPager·ReportClosingPage)·글꼴 토큰·iPad 기둥이 각 항목 때 이미 반영돼 있어 진단 기록 위치 한 줄만 추가. `PRODUCT.md`: 홈 무료 핵심에 원국 그림, iPad 가운데 기둥(640pt), 신년 리포트 페이지 넘김 + 공용 마지막 장, 미정 항목을 "가운데 기둥 이상의 태블릿 레이아웃"으로.
  - QA: 진단 결과 `.impeccable/critique/2026-10-04T01-35-17Z__mobile-screens.md` → 29/40(이전 27, P0 0·P1 3). 탐지기 CLI `impeccable detect --json mobile/screens`·`mobile/components` → `[]` exit 0(여전히 RN StyleSheet를 못 읽음, 픽스처로 확인), 오버레이 진짜 지적은 리포트 대문자 eyebrow·자간·11.5px 면책뿐(차트 SVG 대비 105건은 오탐). mobile tsc(큰 스택) → exit 0. 새 P1 3개는 아래 발견 사항(이번 SPEC 범위 밖, 다음 작업 후보).

## 재진단 후속 (2026-10-04, 사용자 요청: 19번 재진단의 P1+P2 전부를 한 번에)

- [x] 20. 재진단 P1+P2 일괄 수정
  - 변경:
    - 압박 규칙: `mobile/lib/dailyFortuneContent.ts` pressing 리듬(otherChallengesSelf)의 재물·건강 문구와 총론 1·2번 변형의 건강("작은 탈")·지출 예측 문장을 결과 예측 없는 속도 조절 조언으로(ko/en/es). 무료 운세는 그 리듬의 날 총론 대신 중립 문구 `fortune.paceFreeHeadline/Body`(`FortuneScreen.tsx` 무료 분기). 신년 미리보기 "단련되는 해" 개요를 성장 먼저로(`mobile/lib/yearFortuneContent.ts`, 웹 사본 `lib/yearFortuneContent.ts`는 그대로 — 앱 화면만 씀).
    - 궁합: 날짜 검증(`lib/zodiac.ts` `toISODateString`이 없는 날짜(2/31 등)도 거르게 — 온보딩 생년월일에도 적용), 칸 아래 오류 문구 `compatibility.dobInvalid`, 비활성 버튼 이유 한 줄, 이름을 비우면 예시 문구 대신 "상대/Them/La otra persona"(`unnamedOther`, `otherTypeLabelUnnamed`).
    - 리포트 넘김: `ReportPager` 가장자리 탭을 16% → 여백 안 22pt 띠(넓은 화면은 기둥 밖 여백까지). 목차 줄을 약 44pt 터치 높이로.
    - 접근성: 구매 버튼(리포트 단건·번들, 운세 구독·복원)·운세 봉인 카드·리포트 재시도/홈·타입 공유·채팅 재시도/점검 버튼에 역할(필요 시 라벨·상태), 채팅 보내기 라벨 `chat.sendLabel`, `ChatBubbles` 타이핑 점이 동작 줄이기면 멈춤.
    - 온보딩: 인트로 문구에서 "운명을 바꾸고 싶나요?"·"무료 30분 리딩" 삭제(실제 계산 설명 + "사주 풀이는 무료 · 가입 없이 시작"), 인증 코드 화면을 순서에서 빼고 인트로 아래 링크로(`App.tsx` 흐름·뒤로 대상), 언어 목록·머리말 en → es → ko, 성별 화면에 묻는 이유 한 줄(`gender.why`).
    - 정리: 팔레트 밖 색 `#1C1B24`·`#131219`·`#E0A296`을 `COLORS.border/background/danger`로(dev QA 패널 제외), 퀴즈·리포트 오행 색을 `lib/elements.ts` 하나로, 12운성 en 이름 5개를 쉬운 말로(Birth → A Fresh Start, Conception → A Seed Planted 등), 궁합 "day-masters" 문구, 퀴즈·내 리포트의 "Module N" 접두어 제거, 퀴즈 슬라이더 미조작 상태는 "–"와 흐린 손잡이, 리포트 소제목·카드 번호를 문장형으로(대문자·자간 제거, "Weakness" → "Growth edge"/"Punto a cuidar"/"보완할 점"), 마지막 장 본문 문단 간격·면책 12pt, 궁합 공유 카드 라벨 12pt, 원국 그림 분포 막대에 범례.
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web 미리보기(8082, mobile 프리셋): 홈 원국 범례 "Fire 13% · Earth 38% · Metal 38% · Water 13%"(jordan). 심층 리포트 가장자리 탭 실측 left 0·width 22 / left 353·width 22, 목차 05번 줄 오른쪽 쪽 번호(x=340) 탭 → 12쪽으로 이동(progressbar 12), 마지막 장(41/41) 문단 간격. 새 온보딩(localStorage 비움, `?qa=off`): 언어 English 먼저 → 인트로 새 문구·코드 링크 → 링크는 인증 화면, 뒤로 → 인트로, 화살표 → 바로 닉네임 → 성별 화면 이유 문구. 궁합(lucia, es): 31/02/1990 → "Revisa la fecha…" + 버튼 비활성, 미입력 시 이유 한 줄, 28/02로 고치고 이름 비운 채 제출 → "Lucía · La otra persona"·"Su perfil · …". 퀴즈 1번 kicker "BURNOUT"(모듈 번호 없음), 값 "–"·흐린 손잡이. 콘솔 오류 없음. pressing 날 무료 운세는 날짜를 고를 수 없어 코드로만 확인.
  - QA(재진단): `/impeccable critique` 두 에이전트 재실행 → `.impeccable/critique/2026-10-04T02-16-28Z__mobile-screens.md` 30/40(27 → 29 → 30, P1 3 → 1). 탐지기 CLI `[]` exit 0, Pressable/Touchable 103개 전부 역할 있음, 오버레이 진짜 지적은 목차 eyebrow(경계선)뿐. 이번 수정 항목은 A 리뷰가 화면에서 모두 해결로 확인(pressing 날 무료 문구는 jisoo가 마침 그 리듬이라 ko/en 실제 확인).
  - [ ] (사용자 확인) 실기기 VoiceOver로 리포트 구매 버튼·운세 구독 버튼이 "버튼"으로 읽히는지, 동작 줄이기 켜고 채팅 타이핑 점이 멈춰 있는지, 리포트 오른쪽 가장자리를 눌러 넘김이 되는지(22pt 띠).

- [x] 21. 재진단(30/40) P1·P2·P3 일괄 수정 (2026-10-04 사용자: 채팅 시계는 숨기고 세트 진행 표시, 나머지도 지금)
  - 변경:
    - 채팅: 헤더의 30분 카운트다운(마지막 1분 빨강)을 없애고 "이야기 2 / 5"(`chat.setProgress`, 화면 읽기 `setProgressA11y`)로. 서버는 여전히 30분에 대화를 마무리하고 27분부터 마무리로 이끈다(`lib/chatPrompts.ts` `isFinalTurn`·`buildTimeNoticeV2`) — 그래서 27분부터는 헤더가 색 없이 "정리 중"(`chat.timeUpLabel`)으로 바뀌어 끝이 갑작스럽지 않게 한다(재진단 3회차 지적 반영). 조기 마무리 7분 조건은 그대로.
    - 홈: 히어로 아래 핵심 흐름 카드("5분 심리테스트로 시작하기" / 리포트가 있으면 "다음 심리테스트 해 보기" → 검사 목록), 목록에서 심리테스트 줄 제거(보통 4줄). 하다 만 퀴즈·상담 이어 하기는 진행 상태를 기기에 저장하는 구조가 없어 이번엔 안 함(발견 사항).
    - 용어: 원국 캡션 "Your core" → "Your Day Master (you)"(es "Tu Maestro del Día (tú)", ko "나의 일간(나를 뜻하는 기운)"), 타입 화면 유형 이름 아래 한 줄 설명(`sajuType.typeGloss`), 연간 탭 월별 흐름에 합/전환 배지 범례(`fortune.branchLegend`, 배지 있는 달이 있을 때만).
    - 리포트: 짧은 카드·인용·답변 페이지를 위에 매단 배치(위 16~22%) → 라벨까지 한 덩어리로 화면 가운데(`CenteredBody`, 길면 세로 스크롤 — 라벨을 위에 두고 본문만 가운데 두었더니 떨어져 보인다는 재진단 지적으로 라벨도 안으로), 신년 리포트 표지에 FATESAID 머리글과 계산 근거 줄, 목차·영역 라벨 en 문장형, "Weaknesses/puntos débiles/취약점" → "growth edges/puntos a cuidar/보완할 점"(카드 이름과 맞춤), 운세 섹션 라벨 en 문장형, 잠긴 목차 줄 화면 읽기 "잠김 · 누르면 잠금 해제 화면으로".
    - Q&A: 질문 목록 처음 6개 + "질문 N개 더 보기".
    - 작은 것: 미조작 슬라이더 화면 읽기 값 "아직 고르지 않음", 범례에 0% 오행도 표시, 설정 언어 목록 en → es → ko, 설정에 "구독·법적 고지" 섹션 복원(구매 복원·구독 관리·약관·개인정보 — 문구 키는 있었는데 화면에서 빠져 있었음), 본문색 `#C7C3D1` 10곳 → `COLORS.headline`, pressing 날 무료 문구 2문장 → 5문장, 신년 "투자에 유리" 문구와 12운성 병/Winding Down의 "몸이 쉽게 지친다" 문구를 속도 조절로(ko/en/es), 채팅 조기 마무리 라벨 12pt.
  - QA: mobile tsc(큰 스택) → exit 0. mobile-web(8082, mobile 프리셋): 홈 핵심 흐름 카드·범례 "Wood 0% · Fire 13% …"·캡션 "Your Day Master (you) · Water"(jordan), 리포트 29/41 "Directional sense" 카드 본문이 화면 가운데, 타입 화면 설명 줄, Q&A "My Current Job" 질문 6개 + 더 보기, 설정(lucia, es) "Suscripción y legal" 아래 Restaurar compras·Gestionar suscripción·Términos, 연간 탭에 "Bond: a month…" 범례. 콘솔 오류 없음. 채팅 헤더는 퀴즈를 끝내야 열려 소스로만 확인.
  - QA(재진단 3회차): `/impeccable critique` 두 에이전트 → `.impeccable/critique/2026-10-04T02-58-13Z__mobile-screens.md` 30/40(27 → 29 → 30 → 30), P1 3 → 1 → 0, 열 항목 모두 3점. 탐지기 CLI `[]` exit 0, Pressable 107개 모두 역할, `#C7C3D1` 0곳. 이번 수정은 모두 해결로 확인. 진단 뒤 지적 2개(채팅 30분 마무리 예고, 리포트 라벨 분리)를 고치고 mobile tsc(큰 스택) exit 0, mobile-web 리포트 29쪽에서 "Growth edge · 01 of 04" 라벨이 제목 바로 위에 함께 가운데 오는 것 확인(4회차 진단은 돌리지 않음).
  - [ ] (사용자 확인) 실기기에서 설정 "구매 복원"이 RevenueCat 복원 후 알림을 띄우는지, "구독 관리"가 App Store/Play 구독 화면을 여는지, 채팅 헤더에 "이야기 N / 5"가 턴에 맞게 바뀌는지.

- [x] 22. 재진단 3회차 P3 수정 (2026-10-04 사용자: 30분 상한은 예고만 두고 유지, 남은 P3 지금)
  - 변경:
    - 소제목 표기 통일: 대문자·넓은 자간 라벨 14곳을 문장형(자간 0.2)으로 — 퀴즈 모듈 라벨·완료 배지, 검사 목록 배지, Q&A 헤더·하위 주제·질문 목록 라벨, 설정 섹션, 채팅 헤더, 리포트 목차 eyebrow·표지 쪽수·psychology 라벨, 타입·궁합 공유 카드 eyebrow·라벨. 브랜드 표시 FATESAID만 대문자 유지. 원문도 문장형으로(en "Preview", "41 pages", "Saju compatibility", "Free AI counseling" / es "Vista previa", "páginas" / ko "미리보기", "41쪽").
    - 타입 화면 공유 카드를 궁합처럼 점선 틀 "공유 이미지 미리보기" 안에(`sajuType.sharePreviewLabel`), 카드 내용은 화면 읽기에서 숨김(같은 글을 두 번 읽지 않게). 틀은 캡처 밖.
    - 연간 탭 월별 흐름: 앞달과 같은 문구면 "앞달과 같은 흐름이 이어져요"(`fortune.monthSameAsPrevious`)로 대신하고, 2줄 잘림 없앰.
    - 신년 리포트 마지막 장에 제목 "한 해를 맺으며 / Closing the year / Para cerrar el año"(`yearReport.chapterClosing`), 리포트 세트 카드 라벨 11 → 12pt.
  - QA: mobile tsc(큰 스택) → exit 0. `grep -rn 'textTransform: "uppercase"' mobile/screens mobile/components` → 브랜드 라벨 4곳만(리포트·신년 표지, 인트로, 언어). mobile-web(8082, mobile 프리셋): 타입 화면 공유 카드가 "Share image preview" 점선 틀 안, eyebrow "Who you're born as" 문장형. 연간 탭 월별 흐름(jordan) "Mar 2027 · The same flow carries on from the month before." 6곳, 나머지 달은 전체 문장. 콘솔 오류 없음.

## 사용자 실행 (마지막)

- [ ] A. (사용자 실행) 이전 작업(챗봇 5세트) 배포와 실기기 확인 — `TODO_2026-10-02.md` 13번에서 옮김
  - 순서·확인 항목은 `TODO_2026-10-02.md` 13번 그대로. 이번 배치 작업 전에 먼저 끝내는 것을 권장(미푸시 커밋 14개가 쌓여 있음).

- [ ] B. (사용자 실행) 이번 배치 배포와 실기기 확인
  - 선행: A, 19, 20, 21, 22(운세 pressing 문구 수정 포함 — 2026-10-04 사용자 결정: 그 문구를 고친 뒤 이번 배치와 함께 배포).
  - 순서: 커밋 → (웹 파일을 바꿨으면) `git push origin main` → Vercel Ready 확인 → OTA(`cd mobile && npx --yes eas-cli update --branch production --environment production --message "디자인 진단 수정 배치" --non-interactive`) → TestFlight 앱 완전 종료 후 두 번 열기.
  - 확인할 것: 새 글꼴 로드, VoiceOver로 온보딩, 동작 줄이기, 홈 원국 그림, 공유 카드 저장, 신년·심층 리포트 넘김과 마지막 장, iPad.
  - (사용자 확인) 실기기·RevenueCat이 필요해 자동화할 수 없다.
  - 실기기 확인 진행(2026-10-04, Android TestFlight 대신 Play 내부 빌드 기준): 온보딩 — 인트로 새 문구·바로 닉네임·코드 링크·성별 이유 정상. 언어 목록은 초기화가 언어를 지우지 않아 건너뜀(정상, 설정 > 언어에서 순서 확인). TalkBack·애니메이션 삭제는 생략.
    - 발견·수정(미커밋, 다음 OTA에 포함): 인트로 약관·개인정보 링크가 문장 속 작은 글자라 잘 안 눌림 → 문장은 "계속하면 아래 약관에 동의하게 돼요"(`intro.ageNoticeShort`, ko/en/es)로 바꾸고 그 아래 44pt 높이 링크 버튼 두 개(`IntroScreen.tsx`). QA: mobile tsc exit 0, mobile-web 인트로에서 링크 크기 126×44·109×44.
    - 이어서 확인: 홈 카드·원국 정상, 퀴즈 슬라이더는 값 바꾼 뒤에만 진행(세로 쓸기 안 됨 — 가로 유지, 사용자 OK), 퀴즈 번호 없음, 채팅 시계 없음, 무료 리포트 카드 1장·이전 리포트·첫 장 안내·탭 넘김·가운데 정렬 정상, 공유 카드·궁합 정상. 운세(구독 없음)·유료 리포트·설정·iPad는 미확인.
    - 발견·수정(미커밋): 10턴 점검에서 "조금 더 이야기할게요"가 버튼만 숨겨, 사용자가 "계속할까요?"에 직접 답을 써야 했고 이어갈 소재가 없었다 → 버튼 문구를 사용자 답으로 보내고 바로 11턴 요청(서버 11턴 지시가 짧은 계속 답을 받고 세트 3 퀴즈 인용 질문으로 여는 설계, `ChatScreen.tsx`). 페이월에 마지막 장 안내 한 줄(`report.paywallExtras`: 한 줄 요약·다음 검사·PDF). QA: mobile tsc exit 0, mobile-web 페이월 DOM에 문구 확인.
    - 발견·수정(서버, 2026-10-04 사용자 승인): ① 6턴 세트 시작 정리가 직전 이야기를 되풀이하는 느낌 → v2 전용으로 6턴 정리 틀을 "순서대로 이어 주기"에서 "세트 1에서 가장 걸려 보인 구절 하나 짚기(바로 앞 두 응답의 재진술에 나온 표현 제외)"로, 세트 시작 정리 전체를 두세 줄 → 한 줄로, 확인 줄은 장면을 다시 설명하지 않게(`lib/chatPrompts.ts` `RECAP_FRAMES_V2`·`buildRecapLead`, 20턴 흐름 틀은 그대로). ② 리포트 인용이 사용자 오타를 그대로 옮김 → 프롬프트는 "명백한 오타·띄어쓰기만 바로잡고 단어는 그대로"(`lib/reportPrompts.ts`), 결정론적 검사 `quoteMatchesSource`는 정확히 맞지 않으면 근사 일치(약 7자당 1글자, 최소 1글자, 5자 미만 구절은 정확히)로 인정(`lib/reportQuality.ts`), 패치 지시 문구도 맞춤.
      - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts 8 attach module1 --flow v2` 두 번(수정 1차 `sim_20261004T142404`, 조인 뒤 `sim_20261004T142527`, 각 약 $0.017) → 최종 6턴 "'괜히 불안해져요'라는 말이 단순한 연락 지연보다 더 무겁게 남았어요." 한 줄 + 짧은 정정 허락 + 세트 2 인용(기대 문항 A5 일치) + 질문, 앞 턴 재진술 반복 없음. `check-chat-sets` 92/92. 스크래치 인용 검사 12건(띄어쓰기·오타 1~2자·악센트·말줄임 → 통과, 바꿔 쓴 문장·단어 교체·짧은 구절 1자 차이 → 거부) 기대대로. 루트 `npx tsc --noEmit` exit 0, `npm run lint` 경고·오류 없음, `npm run build` 성공. 리포트 재생성으로 오타 교정 효과는 확인하지 않음(픽스처 대화에 오타가 없음) — 실기기에서 새 리포트로 확인.
    - 발견·수정(2026-10-04, 실기기 6턴 스크린샷): 세트를 여는 응답이 "정리 → 정정 허락 → 인용 → 질문" 네 조각으로 따로 놀았다(인용을 왜 꺼냈는지 없고, 질문은 인용과 무관하며 사용자가 하지 않은 "쉬어도 풀리지 않던" 상태를 전제). → 6·16·21턴은 "직전 답 짧게 받기·전환 → 인용과 꺼낸 이유 → 그 인용 답에서 나온 질문" 한 흐름으로(`buildRecapLead`), 모든 인용 턴에 인용–이유–질문 연결 규칙과 "하지 않은 말 전제 금지"(`buildOpeningQuoteInstruction`), 정정 허락 줄과 서버 보충은 10턴 점검에만(`lib/chat.ts` `RECAP_RECHECK_FALLBACK`에서 6·16·21 제거). 채점기(`judge-chat`)의 v2 `s_recap` 기준은 옛 설계라 다음 채점 때 맞출 것.
      - QA: 루트 tsc exit 0, lint 경고·오류 없음, `check-chat-sets` 92/92. `sim-chat.mts 17 attach module3 --flow v2`(인용 없는 페르소나, $0.037) → 6·16턴 "받기 → '이번에는 …살펴볼게요' → 질문", 정정 줄은 10턴만. `sim-chat.mts 12 attach module1 --flow v2`($0.026) → 1·6·11턴 인용 기대 문항 일치, 각 턴 "'…'고 답하셨는데, 방금 이야기와 이어져 보여서요" → 그 답 장면 질문. 남은 점: 11턴이 사용자의 자책 질문("제가 너무 예민한 걸까요?")을 받는 반영 줄 없이 바로 인용(기존 규칙 미준수, 이번 변경과 무관).

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

- (1번 중) `mobile/dev/qaMode.ts:89` QA 프리셋이 `?persona=`로 페이지를 불러올 때마다 `fatesaid_fortune_open_state`를 지워, 새로고침하면 운세를 열었어도 홈이 다시 "기다리고 있어요"로 보인다. dev 전용이지만 재진단 때 오래된 상태로 오인될 수 있음 — 페르소나가 바뀔 때만 지우게 할지 검토.
- (6번 중, 10번에서 해결) 심층 리포트 심리검사 분석 쪽 부제 "Module 1 · Love & Attachment Analysis"(`ReportScreen.tsx`의 `quizAnalysisSuffix` 줄)에 아직 "Module N"이 붙는다. 표지·다음 검사 카드는 `moduleDisplayTitle`로 뺐으니 10번(모듈 번호 제거) 때 같이 정리.
- (6번 중) 서버 리포트 프롬프트(`lib/reportPrompts.ts:298`)가 여전히 81자짜리 `subtitle`을 쓰게 한다. 앱 표지는 더 이상 쓰지 않지만 PDF 표지(`lib/pdf/reportPdf.tsx:315` `coverSubtitle`)는 그대로 81자를 보여 준다. PDF 표지도 앱처럼 짧게 만들지, 프롬프트 형식 지시를 바꿀지 검토(서버 프롬프트·PDF는 이번 SPEC 범위 밖).
- (7번 중, 8번에서 홈은 해결: 인사말 아래 단일 오행 줄 삭제, 그림 캡션이 동률을 둘 다 표시. 타입 화면 설명은 9번에서 확인) 오행 동률이 흔하다(8글자라 12.5% 단위). Jordan은 흙·쇠가 37.5%로 같은데 서버 `dominantElement`/`sajuType.dominantElement`는 하나만(흙) 고른다. 홈 "가장 강한 오행" 문구·타입 설명이 동률일 때 한쪽만 말하는지 8~9번 적용 때 확인(원국 그림 캡션은 둘 다 표시하기로).
- (9번 중) 타입 화면 공유 카드 미리보기 안의 원국 그림도 role=img라 화면 읽기가 같은 요약을 두 번 읽는다(공유 카드의 유형·인물 글도 원래 화면과 중복). 공유 카드 미리보기 전체를 접근성에서 하나로 묶거나 숨길지 검토. 같은 화면의 "결과 공유하기" Pressable에 `accessibilityRole`이 없다.
- (9번 중) 동률일 때 타입 화면 "지금 나를 움직이는 것" 아이콘은 서버 `dominantElement` 하나(Jordan: 산=흙)만 보여 준다. 문구는 오행 이름을 말하지 않아 모순은 아니지만, 그림 캡션은 "흙 & 쇠"라 아이콘만 보면 한쪽만 고른 것처럼 보일 수 있음.
- (10번 중) 퀴즈 화면 상단 kicker("MODULE 3 · BURNOUT", `QuizScreen.tsx`)와 `MyReportsScreen.tsx`에는 여전히 모듈 번호가 보인다. `moduleDisplayTitle`로 같이 정리할지 검토(이번 항목은 검사 목록 범위).
- (12번 중) 궁합에서 상대 이름을 비우면 이름 자리에 입력 칸 예시 문구가 그대로 들어간다("p. ej. Diego", "예: 민준", "e.g. Jamie" — `CompatibilityScreen.tsx`의 `otherDisplayName`이 `namePlaceholder`로 대체). 이번 개편으로 결과 맨 위·공유 카드에 크게 보이므로 "상대"/"Them"/"La otra persona" 같은 중립 표현으로 바꾸는 것을 검토.
- (14번 중) `cd mobile && npx expo install --check`가 expo·expo-font·expo-notifications·expo-sharing·expo-updates 등 6개 패치 버전 차이를 경고한다(글꼴 변경 전에도 동일). 올릴 때 네이티브 빌드가 필요한지 확인 후 별도 작업으로.
- (14번 중) 운세 화면 탭 라벨이 en에서도 칸을 꽉 채운다("This Month", "Year Ahead" — Plus Jakarta Sans가 Manrope보다 약간 넓음). 15번(es 탭 넘침)에서 같이 처리.
- (15번 중) 무료 페이월 혜택 "Today's full reading"은 재물·애정·건강·행운만 나열하고, 구독자에게 열리는 12운성·12신살("오늘 더 알아보기")은 말하지 않는다(수정 전에도 같음). 빠뜨린 것이라 잘못된 약속은 아니지만, 혜택 문구에 넣을지 검토.
- (15번 중) 16번에서 en/es 행운의 방향을 숨기면 행운 카드가 2칸이 된다. 이번에 라벨을 "색/숫자/방향"으로 줄였으니 16번에서 2칸 배치만 확인하면 된다.
- (16번 중) 운세 행운 카드 외에 서버 리포트·PDF(`lib/reportPrompts.ts`, `lib/pdf/reportPdf.tsx`)에 "manseryeok"·방위 표현이 나오는지는 확인하지 않았다(앱 i18n 범위만 정리). 재진단 때 PDF 면책 문구도 같이 볼 것.
- (17번 중) 기존 99명 중 생년월일을 다시 계산해 본 것은 4명뿐이다(방법 일치 확인용). 기존 인물 전원을 Wikidata 날짜로 재검증하는 스크립트를 돌려 볼지 검토.
- (17번 중) VIN-V·SUN-O·FLM-O·FLM-W·MTN-H·FLD-H 6개 유형은 후보 약 200명 중 스페인어권·한국 인물이 하나도 맞지 않았다(목 일간 + 수 편중 등 조합이 드묾). 후보를 더 넣어 볼 수 있음.
- (18번 중) iPad 세로(1024×1366)에서 두 리포트 표지는 내용이 위에 몰리고 아래가 크게 빈다(휴대폰 비율로 짠 표지). 표지만 세로 가운데 정렬할지 재진단 때 판단.
- (18번 중) `ReportPager`의 `footer`(마지막 장 "홈으로" 버튼 줄)는 화면 전체 폭 막대로 남겨 두었다(위 테두리 선이 전체 폭). 기둥 폭으로 맞출지 재진단 때 판단.
- (19번 재진단, P1) 압박 규칙 위반: 운세 "pressing" 리듬의 영역 문구가 모든 사용자에게 건강("작은 탈이 나기 쉬운"/"pick up a minor ailment")·재물("예상치 못한 지출… 투자는 미루는 게 안전") 결과를 예측한다(`mobile/lib/dailyFortuneContent.ts` ko 166~168, en 288~290, es 약 412). 같은 리듬의 무료 총론("A headwind", "자갈길")이 페이월 "What Pro opens" 바로 위에 온다(`FortuneScreen.tsx` 424~466). 페이싱 조언으로 고치고 무료는 중립 한 줄로.
- (19번 재진단, P1) 궁합 폼 날짜 검증 없음: `CompatibilityScreen.tsx:80` `canSubmit`이 채워졌는지만 봐서 13/40/2030도 결과가 나온다. 생년월일 화면의 범위 검사 재사용 + 칸 아래 오류 문구. (12번 발견 사항의 이름 칸 예시 문구 대체 문제와 같이)
- (19번 재진단, P1) `ReportPager.tsx` 137~141 가장자리 탭(양쪽 16%)이 내용 위에 있어 목차 줄 오른쪽(쪽 번호)을 누르면 그 장으로 가지 않고 다음 쪽으로 넘어간다(웹 확인). 마지막 장 "이 검사 시작하기" 오른쪽도 무반응 추정, 네이티브에서 세로 스크롤 시작을 막을 수 있음. 탭 영역을 기둥 밖 여백으로 옮기거나 상호작용·스크롤 페이지에선 끄기.
- (19번 재진단, P2) 접근성 잔여: 구매 버튼 역할 없음(`ReportScreen.tsx` 1501·1508, `FortuneScreen.tsx` 466·471), 운세 봉인 카드 543 라벨 없음, 리포트 재시도·홈 941·944·990, 타입 공유 204, 채팅 298·314·317과 아이콘만 있는 보내기 335, `ChatBubbles.tsx:26` 타이핑 점 반복이 동작 줄이기 무시.
- (19번 재진단, P2) 온보딩 약속·순서: 인트로 "Want to change your fate?" + "Free 30-minute reading · No credit card needed"(`mobile/lib/i18n/en.ts` 41~42, es·ko 동일)가 없는 기능을 약속하고 홈의 "사주는 점이 아니다"와 어긋남. 인증 코드 화면이 모든 신규 설치자에게 닉네임 앞에 나옴, 언어 목록 한국어가 맨 위, 성별을 묻는 이유 없음.
- (19번 재진단) 그 밖: 팔레트 밖 색 `#1C1B24`·`#131219`(Chat 360·494, City 204, QA 365, Quiz 344)와 `#E0A296` 9곳(`COLORS.danger` 있음), Quiz·Report 오행 색 값이 서로 다름. 신년 리포트·연간 탭 12운성 용어("quiet-storage tone", "Conception / Incubation"). Q&A "사랑과 사람" 하위 화면 선택지 9개. 퀴즈 슬라이더가 5에 놓여 있어 이미 답한 것처럼 보임. 마지막 장 본문 줄 사이 문단 간격 없음. 신년 미리보기 무료 문구("A Year of Being Tempered… pressure grows heavier")가 구매 버튼 위 — 압박 규칙 경계선.
- (20번 중) 신년 리포트 본문의 12운성 용어("quiet-storage tone", "unexpected-turn note")는 서버 프롬프트(`lib/yearReport*.ts`)가 만드는 문장이라 앱에서 못 고친다(SPEC 제외 범위). 프롬프트에 용어 대신 쉬운 말을 쓰라고 지시할지 별도 작업으로.
- (20번 중) 인트로 화면의 전체 화면 버튼 층(`centerLayer`, zIndex 1)이 아래 약관·개인정보 링크 위에 덮여 있었을 수 있다. 이번에 코드 링크와 바닥글에 zIndex 2를 줘 웹에서 탭되는 것을 확인했지만, 네이티브에서 약관 링크가 이전에 눌렸는지는 확인하지 않았다.
- (20번 중) 서버 사본 `lib/yearFortuneContent.ts`·`lib/twelveStagesContent.ts`는 앱과 문구가 달라졌다(앱 화면만 바꿈). 서버에서는 `lib/yearFortune.ts`·`lib/yearReportPrompts.ts`가 쓰므로, 맞추려면 웹 배포 → OTA 순서의 별도 작업(신년 리포트 12운성 용어 문제와 같이).
- (20번 재진단, P1) 채팅 화면 30분 카운트다운(`ChatScreen.tsx:36` `TIME_LIMIT_MINUTES`, 242~247·266~270, 마지막 1분 `#CB6249` 빨강)이 PRODUCT의 "강제 종료·가짜 긴급 타이머 없음"과 어긋난다. 시계 대신 "세트 2/5" 진행 표시, 시간 예산은 보이지 않게 + 부드러운 마무리. (채팅은 이번 SPEC 제외 범위)
- (20번 재진단, P2) 홈에서 핵심 흐름(검사 → 상담 → 리포트)이 같은 모양 5줄 중 4~5번째, 하다 만 퀴즈·상담 이어 하기 없음. 용어 불일치("Your core" vs 리포트 "Day Master", 유형 이름 설명 없음, 연간 탭 "Bond/Shift"). 리포트 쪽 2/3가 빈 페이지, 신년 표지에 브랜드·KASI·목차 없음, 목차 대소문자 혼용("Core Strength & Weaknesses" vs 카드 "Growth edge"). Q&A 하위 주제당 질문 20개(거의 같은 질문 포함).
- (20번 재진단, 작은 것) 미조작 슬라이더가 화면은 "–"인데 화면 읽기는 "5 out of 10"(`QuizScreen.tsx` 279~283), 범례가 0% 오행을 숨김(리포트 3쪽은 없는 나무를 말함), 설정 화면 언어 목록은 여전히 한국어 먼저(`SettingsScreen.tsx:88`), 잠긴 목차 줄에 잠김 상태 없음, `#C7C3D1` 본문색 11곳(Chat/Quiz/Report), pressing 날 무료 문구가 2문장(다른 날 7문장), 연간 탭 "favorable for investments"·Q&A 투자 질문(재정 예측 규칙 점검), 구독자 12운성 "Winding Down: Body and mind tire more easily" 문구.
- (21번 중) 하다 만 퀴즈·상담 이어 하기: 퀴즈 답과 상담 기록(서버 숨김 메모 `formulation` 포함)을 기기에 저장하는 구조가 없다. 저장 범위·만료(30분 예산과의 관계)를 정해야 하는 기능이라 별도 `/spec`으로.
- (21번 중) Q&A 질문 은행(`mobile/data/questionBank.json`)에 거의 같은 질문이 있다("unexpected good luck" / "unexpectedly good news"). 은행 정리는 데이터 작업이라 별도로. "Investing & Building Wealth" 하위 주제가 재정 예측 규칙에 맞는지도 같이 검토.
- (21번 중) 퀴즈 "다음" 버튼이 화면 위쪽(y≈300)에 있어 한 손 조작에 멀다. 하단 고정으로 옮길지 레이아웃 작업으로.
- (21번 재진단) 남은 P2·P3: 하다 만 퀴즈·상담 이어 하기(위 발견 사항), v2 채팅에 30분 상한 자체를 둘지(제품 결정), 리포트 쪽이 위 정렬·가운데 정렬로 번갈아 보임과 짧은 카드 두 장을 한 쪽에 묶는 안, 대문자·자간 소제목 약 12곳(퀴즈 373·460, 검사 목록 173, Q&A 387·110·104, 설정 190, 리포트 목차·쪽 수·breather, 공유 카드)과 서버 제목의 Title Case, 타입 공유 미리보기 틀 없음(궁합처럼 "공유 이미지 미리보기" 틀), 월별 흐름 같은 문구 두 달씩 반복·2줄 잘림, 원국 그림 탭/설명, Q&A 질문을 누르면 확인 없이 하루 1개를 씀, 설정의 "주간 알림"을 무료 사용자에게도 보임, 리포트 강조색·종이 팔레트(`#7FA8D6`·`#5C5237` 등)가 팔레트 문서에 없음, 11px 라벨(`ReportScreen.tsx` setCardLabel, 원국 SVG).
- (22번) 30분 상한은 2026-10-04 사용자 결정으로 유지(27분부터 "정리 중" 예고만). 아직 남은 것: 이어 하기, 리포트 쪽 정렬 번갈아 보임·짧은 카드 묶기, 서버 제목 Title Case, 원국 그림 탭/설명, Q&A 질문 한 번 탭에 하루 몫 사용(확인 없음), 설정 주간 알림을 무료 사용자에게도 보임, 리포트 강조색·종이 팔레트 문서화, 원국 SVG 11px 글자.

- (2026-10-04~05, 실기기 테스트 후속 — 시뮬레이션 기반 채팅 개선, 사용자 요청 "시뮬레이션 더 돌리고 수정할 거 찾아줘" → 1~6·8번 수정 승인)
  - 찾은 것(`scripts/out/q-1005_*.md`, 25턴 ko 번아웃·돈, en 애착, es 분노 + 10턴 마무리 ko 예민함): ① 이미 답한 걸 다시 물음(번아웃 18·19, es 11↔14·9↔18) ② 매 턴 첫 줄이 직전 답 되풀이(첫 줄 재진술 100%) ③ 질문 두 개(마침표로 끝난 "~걸까요."·"~고 ~나요" 겹질문, 채점 위반 2건) ④ 허락만 받는 예/아니오 질문 ⑤ 24턴 미래의 나를 "she"로(성별 정보 없음) ⑥ 없던 사실 전제("그날") ⑧ 채점 기준이 옛 세트 시작 설계.
  - 수정: `lib/chatPrompts.ts` v2 기법 ②(재진술은 두 턴에 한 번·짧게, 짝수 턴은 lines가 질문 한 줄뿐 — 모순 짚기·자책 받기만 예외), ④(다른 질문이 있으면 가설은 평서문, 세트 3·4의 ⑤ 턴은 가설 질문 꼴로), ⑥(정정 허락은 10턴만), 새 ⑧(이미 답한 것 다시 묻지 않기·전제 금지·허락 질문 금지·한 질문에 하나·성별 짐작 금지), 모듈 질문·상세 질문 턴 지시, 24턴 2인칭. `lib/chat.ts` 마침표로 끝난 한국어 물음 꼴 줄을 물음표 질문이 따로 있으면 평서문으로 바꾸거나 빼기(`softenImplicitQuestions`, 20턴 흐름에도 적용), 세트 ① 인용 턴에 정해진 테스트 답이 없으면 한 번 다시 요청. `scripts/judge-chat.mts` v2 t6·s_recap 기준을 새 설계(10턴 정리, 세트 전환은 받기→인용 이유→질문)로.
  - QA: 루트 tsc exit 0, lint 경고·오류 없음, `check-chat-sets` 92/92, `softenImplicitQuestions` 스크래치 6건 기대대로. 재채점 `q-1005-fix`(5개) → 질문 2개 위반 1.20 → 2.00, 위반 종합 1 → 1.80, 공통 평균 1.69 → 1.73, 세트 준수 1.46 → 1.84(전환 기준 변경 포함), ④ 확인형 가설 1.60 → 0.60으로 떨어져 세트 3·4 ⑤ 가설 질문 지시 추가 → `q-1005-fix2`(3개) ④ 1.00, 인용 누락 0. 채점 점수는 같은 설정에서도 ±0.1~0.2 흔들려 효과는 직접 셈: 짝수 턴 질문 한 줄 규칙 뒤 `sim-chat 16 burnout,attach_en` → 세트 ②~⑤ 첫 줄 재진술 100% → ko 6/11·en 9/11, 짝수 턴 ko 0/5·en 3/5(그중 2는 자책 받기 예외), 3줄 이상 응답 6~11개 → 2~7개. 비용 합계 약 $3.
  - 남은 것: 감정 어휘 좁히기(⑤)가 판정마다 0~2로 흔들림, 자책 직후 리프레이밍(⑦)을 가끔 건너뜀, es 10턴 점검 문구를 채점자가 '연장'으로 보는 경우(설계상 두 선택지 질문 — 채점 기준 쪽 문제일 수 있음).
