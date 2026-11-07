# 작업 지시서 32: iPad 등 넓은 화면에서 화면 폭 제한(readableColumn) 적용

## 목표
iPad(1032pt)에서 일부 화면이 전체 폭으로 늘어나 내용이 위·왼쪽에만 몰린다. 이미 있는 폭 제한 헬퍼 `readableColumn`(`mobile/theme/layout.ts`, 폭 100% / 최대 640 / 가운데 정렬)을 빠진 화면에 적용해, 넓은 화면에서도 홈·궁합·리포트처럼 가운데 정렬 컬럼으로 보이게 한다. 폰 화면(640pt 미만)에서는 동작이 전혀 달라지면 안 된다.

## 수정할 파일 (모두 mobile/ 아래)
참고 구현: `screens/CompatibilityScreen.tsx`의 `content: { ...readableColumn, paddingHorizontal: ..., }`, `components/ReportPager.tsx`의 `chrome`/`pageColumn`.
각 파일에서 `import { readableColumn } from "../theme/layout";`(components/는 `"../theme/layout"`, 경로 확인) 후 아래 스타일에 `...readableColumn`을 펼쳐 넣는다.

1. `components/OnboardingShell.tsx`: `header`와 `body` 스타일(둘 다). 이 한 곳으로 Dob/Tob/Gender/City/Nickname/Concern/VerifyCode 화면이 해결된다. 배경(PatternBackground)은 전체 폭 그대로 둔다.
2. `screens/QuizScreen.tsx`: `header`, `content`, `doneContent`(결과 화면; 이미 alignItems:"center"라 카드/버튼이 폭을 채우도록 확인) 스타일.
3. `screens/ChatScreen.tsx`: 상단 `header`, `scrollContent`(말풍선 목록), 하단 입력창 영역(composer/입력 행)과 선택지 영역(chips) 컨테이너. 입력창을 감싸는 바깥 View는 전체 폭을 유지하고 안쪽 내용만 제한해도 된다. 키보드 처리(KeyboardAvoidingView)는 건드리지 않는다.
4. `screens/QAScreen.tsx`: 상단 header, `scrollContent`, 하단 입력창 영역.
5. `screens/QASubcategoryScreen.tsx`, `screens/QAQuestionScreen.tsx`: `content`(와 있으면 하단 고정 버튼 영역).
6. `screens/SettingsScreen.tsx`: `content`.
7. `screens/MyReportsScreen.tsx`, `screens/SajuLearnScreen.tsx`: `content`.
8. `screens/LanguageScreen.tsx`, `screens/IntroScreen.tsx`: 자체 SafeAreaView 안의 내용 컨테이너(스타일 확인 후 적용).
9. `screens/WrappedScreen.tsx`, `screens/TypeRevealScreen.tsx`: 코드를 읽고 전체 폭으로 늘어나는 컨테이너가 있으면 적용. 풀블리드 배경/이미지/페이저 성격이면 건드리지 말고 지시서 맨 아래 "보고"에 이유를 적는다.

## 제약
- 새 의존성 추가 금지. `theme/layout.ts`의 `READABLE_MAX_WIDTH`(640)는 바꾸지 않는다.
- 요청 본문·API 호출·문구·색·폰트·애니메이션·접근성 속성은 절대 건드리지 않는다. 레이아웃 스타일 한 줄(`...readableColumn`) 추가가 원칙이고, 구조 변경(View 래핑)은 하단 입력창처럼 꼭 필요한 경우에만 최소로 한다.
- `alignSelf:"flex-start"`가 있는 뒤로가기 버튼처럼 이미 개별 정렬이 있는 요소는 그대로 둔다(컨테이너가 제한되면 자연스럽게 따라온다).
- 이미 `readableColumn`을 쓰는 파일은 수정하지 않는다.
- 커밋하지 않는다. git 명령은 `git diff`, `git status`만 쓴다.
- ScrollView에 적용할 때는 `style`이 아니라 `contentContainerStyle`에 넣는다(스크롤바가 컬럼 안쪽에 생기는 것을 피함).

## 완료 조건
- `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` 오류 0.
- 수정 파일 목록과 각 파일에서 바꾼 스타일 이름을 "보고"에 표로 적는다.

## 참고
- 이 지시서는 `.agents/tasks/32-ipad-readable-width.md`. 결과는 사용자가 iPad 크기 웹 미리보기(1032x1376)로 확인한다.

## 보고

완료. `tsc --noEmit` 오류 0 (mobile/에서 실행, exit 0). 총 11개 파일 수정, 모두 `...readableColumn` 한 줄 + import 추가뿐이며 구조 변경(View 래핑) 없음. ScrollView에는 `contentContainerStyle` 쪽 스타일(`content`, `scrollContent`, `doneContent`)에만 적용.

| 파일 (mobile/ 아래) | 바꾼 스타일 | 비고 |
|---|---|---|
| components/OnboardingShell.tsx | `header`, `body` | PatternBackground는 그대로 전체 폭 |
| screens/QuizScreen.tsx | `header`, `content`, `doneContent` | `resultCard`·`continueButton`은 `width:"100%"`, 감싸는 Reveal은 `revealFullWidth`라 컬럼 폭을 채움 확인 |
| screens/ChatScreen.tsx | `header`, `scrollContent`, `inputRow`, `choiceRow`, `checkpointRow`, `skipRow` | 지시서 지정 4곳 + 하단 동일 성격 2곳(`checkpointRow` 선택 버튼, `skipRow` 스킵 링크 — 빼면 하단만 따로 전체 폭이 됨). KeyboardAvoidingView 미변경 |
| screens/QAScreen.tsx | `header`, `scrollContent` | 하단 입력창 없음(선택지 picker형 채팅이라 해당 UI 자체가 없음) |
| screens/QASubcategoryScreen.tsx | `content` | 하단 고정 버튼 없음 |
| screens/QAQuestionScreen.tsx | `content` | 하단 고정 버튼 없음. 확인용 Modal 시트는 모달이라 범위 밖으로 보고 미변경 |
| screens/SettingsScreen.tsx | `content` | — |
| screens/MyReportsScreen.tsx | `content` | — |
| screens/SajuLearnScreen.tsx | `content` | — |
| screens/LanguageScreen.tsx | `content` | SafeAreaView 안 내용 컨테이너 |
| screens/IntroScreen.tsx | `content` | 헤드라인 블록. `centerLayer`(절대 중앙 버튼층)·푸터는 이미 가운데 정렬이라 미변경 |

미변경 2건:

- `screens/WrappedScreen.tsx` — 페이저 성격. 본문이 `ReportPager`의 `pageColumn`(이미 `readableColumn` 적용) 안에서 렌더되고, 로딩/에러 `center` 뷰는 `alignItems:"center"`라 손댈 곳 없음.
- `screens/TypeRevealScreen.tsx` — `TypeScreen variant="reveal"`을 그대로 렌더하는 래퍼이고, `TypeScreen`은 이미 2곳에 `readableColumn`을 씀. 손댈 곳 없음.
