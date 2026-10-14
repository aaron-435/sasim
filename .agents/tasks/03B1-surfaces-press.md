# 작업 지시서 03B1: 표면 토큰 + 누름 피드백 적용 (FortuneScreen)

## 목표
UI 개편 2단계 후반이다(03a의 나머지). 앞 작업(02)에서 만든 토큰과 `PressableScale`을 아래 파일들에 적용한다. 지금 화면들은 모든 카드가 "같은 배경색 + 1px 테두리"라서 평평하고 단조롭다. 카드를 **테두리 대신 표면색 차이와 그림자**로 구분하고, 누를 수 있는 것은 **눌렀을 때 살짝 줄어들고 진동**하게 바꾼다. 레이아웃, 문구, 동작은 바꾸지 않는다.

## 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`이다. **다른 muse 작업이 동시에 다른 파일을 고치고 있다.** 목록 밖 파일은 열어 보기만 하고 절대 수정하지 않는다.

- `screens/FortuneScreen.tsx`

`captureRef`/`ViewShot`(공유 이미지로 캡처되는 뷰)의 대상과 그 안쪽 스타일은 바꾸지 않는다.

파일이 크다(1,200줄 이상). 스타일 시트(`StyleSheet.create`)를 먼저 고치고, 그다음 JSX의 `Pressable`을 위에서부터 차례로 바꾼다. 한 번에 여러 곳을 고치는 편집을 써서 스텝을 아낀다.

## 규칙

### 1. 누름 피드백
- 위 파일의 `Pressable`을 `components/motion/PressableScale`로 바꾼다. import 경로는 파일 위치에 맞춘다(`../components/motion/PressableScale` 또는 `./motion/PressableScale`).
- 기존 `pressed && styles.xxx` 식의 opacity/배경 변화 스타일은 **opacity만 바꾸는 것이면 제거**한다(PressableScale이 대신함). 배경색이나 테두리를 바꾸는 눌림 스타일은 그대로 둔다(함수형 style을 PressableScale이 지원한다).
- 햅틱 종류: 선택지(성별, 언어, 관심사, 칩, 토글, 탭, 라디오 성격)는 `haptic="select"`, 나머지(이동·열기·확인 버튼, 카드)는 기본값(`"tap"`)을 쓴다. 텍스트 링크처럼 작은 것(설정의 법적 문서 링크, "이전" 뒤로가기)은 `haptic="none"`.
- 카드처럼 큰 누름 영역은 `pressedScale={0.98}`, 버튼은 기본값(0.97).
- `accessibilityRole`, `accessibilityLabel`, `disabled`, `hitSlop`, `testID` 등 기존 props는 그대로 넘긴다.

### 2. 표면
`theme/tokens.ts`의 `SURFACE`, `RADIUS`, `SHADOW`를 쓴다.

- **카드형 컨테이너**(정보를 묶는 박스: `backgroundColor`가 있고 `borderWidth: 1` + `borderColor: COLORS.border` 같은 테두리가 있는 View/Pressable)
  - `borderWidth`, `borderColor`를 지운다.
  - 배경은 `SURFACE.raised`. 화면에서 가장 중요한 카드 하나(홈 맨 위 "오늘의 기운" 히어로처럼 이미 채운 카드)는 기존 배경을 유지한다.
  - 반경은 카드 `RADIUS.md`, 큰 히어로·시트 `RADIUS.lg`, 칩·작은 버튼 `RADIUS.sm` 또는 `RADIUS.pill`(이미 999면 유지).
  - `...SHADOW.raised`를 펼쳐 넣는다.
- **카드 안의 카드**(카드 속 작은 박스, 목록 행)는 그림자 없이 `SURFACE.floating` 배경만.
- **바꾸지 않는 테두리**: 입력칸(TextInput 감싸는 박스), 선택 상태를 나타내는 테두리(선택된 칩·옵션의 `COLORS.gold` 테두리), 구분선(높이 1px 선), 점선(`borderStyle: "dashed"`) 박스, QA 모드 패널. 이 경우 테두리 색이 `COLORS.border`이면 `SURFACE.hairline`으로만 바꾼다.
- 하드코딩된 간격 숫자는 **바꾸지 않는다**(이번 범위 아님).

## 제약
- 건드리면 안 되는 파일: 위 목록 외 전부. 특히 `components/TextShareCard.tsx`와 공유 이미지로 캡처되는 뷰(`react-native-view-shot`의 `captureRef` 대상 안쪽 스타일)는 바꾸지 않는다. 캡처 대상인지 헷갈리면 그 부분은 그대로 둔다.
- 문구(i18n), 동작, 화면 구조, 조건문, 상태 로직은 바꾸지 않는다.
- 색은 `COLORS`와 `SURFACE`만. 글꼴은 `FONTS`로만 참조(기존 그대로).
- 새 패키지 설치 금지.
- 코드 스타일: 2칸 들여쓰기, 큰따옴표, 세미콜론. 주석은 꼭 필요한 곳에만 영어로 한 줄.

## 완료 조건
`mobile/`에서 실행:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -c "<Pressable[ >]" ` 을 위 목록 파일 각각에 실행 → 모두 0 (PressableScale만 남음)
- 타입 검사에서 **목록 밖 파일**의 오류가 나오면 다른 작업 중인 것이니 무시하고, 목록 안 파일의 오류만 0으로 만든다.
- 이미 끝난 파일의 적용 예: `components/JournalEntryCard.tsx`, `components/OtherBirthForm.tsx`, `components/CoupleModeSection.tsx`

## 참고
- 토큰: `theme/tokens.ts`, 누름 부품: `components/motion/PressableScale.tsx`(02에서 만듦, 수정 금지)
- 적용 예: `components/AuraNextButton.tsx`, 03a에서 바꾼 `screens/HomeScreen.tsx`
