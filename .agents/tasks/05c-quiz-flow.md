# 작업 지시서 05c: 퀴즈 문항 전환 + 진행 막대 + 결제 성공 진동

## 목표
1. 심리테스트(`QuizScreen`)는 30문항을 넘기는 화면인데 지금 문항이 그냥 바뀐다. 답을 고르면 고른 선택지가 잠깐 강조되고, 지금 문항이 왼쪽으로 빠지며 다음 문항이 오른쪽에서 들어오게 한다. 진행 막대는 부드럽게 늘어난다.
2. 결제 성공 순간(구독, 리포트, 신년 리포트, 궁합 리포트, Q&A)에 성공 진동을 한 번 준다.
문구, 점수 계산, 진단 로직, 결제 로직은 바꾸지 않는다.

## 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`.
- `screens/QuizScreen.tsx`
- 결제 성공 진동만: `screens/FortuneScreen.tsx`, `screens/ReportScreen.tsx`, `screens/CompatReportScreen.tsx`, `screens/YearReportScreen.tsx`, `screens/QAScreen.tsx`

## 1. QuizScreen

### 문항 전환
- 지금 `recordAnswer`는 `transitioning`을 true로 두고 280ms 뒤 다음 문항으로 넘긴다. 이 타이밍(280ms)과 로직은 그대로 둔다.
- 문항 블록(모듈 라벨 아래 `prompt` 텍스트 + 선택지/슬라이더 영역)을 reanimated `Animated.View` 하나로 감싸고, `key={index}`를 준다(문항이 바뀌면 새로 마운트).
  - 마운트 시: `opacity 0→1`, `translateX 20→0`, 260ms, `EASING.enter`(`theme/motion.ts`).
  - `transitioning`이 true가 되면: `opacity 1→0`, `translateX 0→-20`, 200ms, `EASING.exit`(같은 블록의 공유 값을 `useEffect`에서 바꾼다). 280ms 뒤 새 key로 바뀌므로 겹치지 않는다.
  - 동작 줄이기(`lib/useReducedMotion`)면 이동 없이 opacity만, 시간은 그대로.
  - 이 파일에 RN `Animated`가 이미 있으면 reanimated는 `import Reanimated, {...}`로 다른 이름을 쓴다.
- 선택지 강조: 고른 선택지 label을 담는 `picked` 상태(`string | null`)를 추가해 `handleChoiceSelect`에서 설정하고, 문항이 바뀔 때(`index` 변경) `null`로 되돌린다. 고른 선택지는 `optionButtonPicked` 스타일(배경 `"rgba(111,169,139,0.18)"`, 테두리 `COLORS.gold` 1px)과 라벨 색 `COLORS.headline`. 점수 기록 로직에는 쓰지 않는다(표시 전용).

### 진행 막대
- `progressFill`의 `width` 퍼센트 대신: 트랙(`progressTrack`)에 `overflow: "hidden"`과 `onLayout`으로 폭을 재고, 채움 막대는 트랙 전체 폭으로 두고 `translateX = -(1 - progress) * trackWidth`를 `withTiming(…, {duration: 320, easing: EASING.standard})`로 움직인다. 폭을 아직 모르면(0) 막대를 숨긴다(opacity 0).
- 접근성 속성(`accessibilityRole="progressbar"`, `accessibilityValue` 등)은 그대로.

### 결과 화면
- 진단이 끝나 결과(`done`)를 보여 주는 블록의 주요 덩어리(유형 이름, 설명, 버튼들)를 `components/motion/Reveal`로 감싸 `index` 0,1,2…로 순서대로 등장시킨다. 결과 블록이 여러 갈래면 가장 바깥 주요 덩어리 3~5개만.
- 결과가 나타날 때 `lib/haptics`의 `success()`를 한 번(`useEffect`에서 `done`이 true가 될 때).

## 2. 결제 성공 진동
아래 각 파일의 `if (outcome.status === "success") {` 블록 첫 줄에 `success();`(`lib/haptics`에서 import) 한 줄을 넣는다. 다른 줄은 바꾸지 않는다.
- `screens/FortuneScreen.tsx`(446줄 부근), `screens/ReportScreen.tsx`(474, 488줄 부근 두 곳), `screens/CompatReportScreen.tsx`(228줄 부근), `screens/YearReportScreen.tsx`(199줄 부근), `screens/QAScreen.tsx`(270줄 부근)
- 이 파일들에 이미 `success`라는 이름이 있으면 `import { success as hapticSuccess } from "../lib/haptics"`처럼 바꿔 쓴다.

## 제약
- 건드리면 안 되는 파일: 위 목록 외 전부. 2번 대상 파일은 진동 한 줄과 import만 바꾼다(다른 작업이 같은 파일의 다른 곳을 고치고 있을 수 있다).
- i18n 추가 금지. 색은 `COLORS`와 위 rgba 1개만.
- 애니메이션은 transform/opacity만.
- 코드 스타일: 2칸, 큰따옴표, 세미콜론.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0 (목록 밖 오류는 다른 작업 중이니 무시하고 보고)
- `grep -rn "hapticSuccess()\|^\s*success();" screens | wc -l` → 6 이상
- `grep -c "width: \`\${" screens/QuizScreen.tsx` → 0 (퍼센트 폭 애니메이션 제거)
