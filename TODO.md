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

- [ ] 1. 홈 운세 미리보기를 실제 계산 기반으로
  - 변경: `mobile/screens/HomeScreen.tsx` 히어로 teaser 분기(리듬 이름 + 판단 없는 한 줄), 운세를 연 뒤 돌아오면 opened 상태로 갱신(포커스 시 `fortuneOpenState` 다시 읽기), 무료 CTA 문구. `lib/i18n/{ko,en,es}.ts` 새 키. `lib/i18n/dailyInsight.ts`와 쓰지 않게 된 키 삭제.
  - QA: mobile tsc exit 0. `grep -rn "dailyInsight\|getDailyInsight" mobile/` → 결과 없음. `?qa=free&persona=mia`로 홈 → 운세 이동 시 두 화면 문장이 서로 반대말을 하지 않음(스크린샷 2장). `?qa=all&persona=jordan`에서 운세를 연 뒤 홈 히어로가 열린 상태.

- [ ] 2. 온보딩 접근성 + 동작 줄이기 + 배경 기본값
  - 변경: `components/OnboardingShell.tsx`(뒤로 버튼 라벨), `components/AuraNextButton.tsx`, `screens/{Language,Intro,Nickname,Gender,Dob,Tob,City,Concern,VerifyCode}Screen.tsx`(역할·라벨·선택 상태), `components/GoldAura.tsx`·`screens/IntroScreen.tsx`(`isReduceMotionEnabled`면 반복·진입 애니메이션 끔), `components/PatternBackground.tsx`(`backgroundColor: COLORS.background`). 대상 화면 Text에 `maxFontSizeMultiplier` 상한.
  - QA: mobile tsc exit 0. 대상 파일마다 `grep -c "accessibilityRole"` 수 ≥ 그 파일의 Pressable 수(표로 기록). `grep -n "isReduceMotionEnabled" mobile/components/GoldAura.tsx mobile/screens/IntroScreen.tsx` → 각 1건 이상.
  - (사용자 확인) iOS 실기기 VoiceOver로 언어→관심사까지 진행, 설정 > 손쉬운 사용 > 동작 줄이기 켜고 인트로·후광이 멈추는지.

- [ ] 3. 퀴즈·Q&A 접근성 + 슬라이더 무응답 진행 막기
  - 변경: `screens/QuizScreen.tsx`(슬라이더 accessibilityValue·라벨, 건드리기 전 "다음" 비활성 대신 안내 한 줄과 함께 진행 막기), `screens/{QA,QASubcategory,QAQuestion}Screen.tsx` 역할·라벨.
  - QA: mobile tsc exit 0. 웹 미리보기 퀴즈 1번 문항에서 슬라이더를 건드리지 않고 "다음" → 진행 안 됨, 건드린 뒤 → 진행(스크린샷). 대상 파일 accessibilityRole 수 ≥ Pressable 수.

- [ ] 4. 신년 리포트를 페이지 넘김으로
  - 변경: `screens/YearReportScreen.tsx`를 섹션 단위 페이지 + 진행 표시 + 이전/다음으로. 가능한 범위에서 `ReportScreen.tsx`의 페이지 넘김 부품을 공용 컴포넌트로 빼서 둘 다 사용.
  - QA: mobile tsc exit 0. `?qa=all&persona=jordan` 신년 리포트가 페이지로 넘어가고 진행 표시가 맞음(첫·중간·끝 스크린샷).

- [ ] 5. 두 리포트의 첫 장 안내와 마지막 페이지
  - 선행: 4
  - 변경: 공용 리포트 부품에 첫 장 넘기기 안내(한 번 본 뒤 저장해서 숨김), 마지막 페이지(한 줄 요약·공유·다음 검사 추천 또는 다음 행동·PDF 저장·작은 면책). `lib/i18n/*`.
  - QA: mobile tsc exit 0. 심층·신년 리포트 각각 첫 장 안내 → 다시 열면 없음, 마지막 장 구성 스크린샷(ko·en·es 중 2개 언어).

- [ ] 6. 리포트 사소한 문제 묶음
  - 변경: `screens/ReportScreen.tsx` — 1쪽 제목·부제 간격, 본문 문단 간격, 81자 대문자 표지 소제목(짧게 또는 문장형), 페이월 "42쪽 중 26쪽"과 페이지 카운터 일치, 강점 % 막대가 "나쁨" 색(빨강)으로 보이지 않게.
  - QA: mobile tsc exit 0. `?qa=free&persona=mia` 페이월 쪽 카운터와 문구 숫자가 같음, 1·4쪽 스크린샷.

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
