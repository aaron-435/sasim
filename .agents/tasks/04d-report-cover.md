# 작업 지시서 04d: 심층 리포트 표지 개편

## 목표
`mobile/screens/ReportScreen.tsx`의 표지(`CoverPage`)는 지금 작은 제목(27px)과 짧은 선, 닉네임만 있는 글자 페이지다. 리포트를 산 사람이 처음 보는 장면이므로 **책 표지처럼** 만든다. 사용자의 일간 오행 색이 은은하게 번지는 배경, 화면 밖으로 넘치는 큰 원 장식, 크게 키운 제목, 순서대로 나타나는 요소. 문구·페이지 구성·결제 로직은 그대로다.

## 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`. **`screens/ReportScreen.tsx` 한 파일만.**

## 바꿀 것

### 1. `CoverPage`에 오행 전달
- `CoverPage` props에 `element?: string | null`(`"wood" | "fire" | "earth" | "metal" | "water"`)을 추가한다.
- 표지를 만드는 곳(`key: "cover"`, 877줄 부근)에서 `element={dayMaster?.element ?? null}`을 넘긴다. `dayMaster`는 이미 컴포넌트 props에 있다.
- 색: `ELEMENT_COLORS[element]`(이미 import됨, 파일 안 별칭 `ELEMENT_COLOR`). `element`가 없으면 `COLORS.gold`.

### 2. 배경
- 표지의 `PageShell` 안 맨 뒤에 `expo-linear-gradient` `LinearGradient`를 `StyleSheet.absoluteFill`로 깐다. 색 `[\`${tint}33\`, "transparent"]`, `start={{x:0, y:0}} end={{x:0.6, y:0.7}}`. (`tint`는 위의 오행 색, `33`은 투명도 16진수)
- 큰 원 장식: `react-native-svg`로 지름 `width * 1.1`(화면 폭은 `useWindowDimensions`) 원 2개를 표지 오른쪽 위로 넘치게 둔다(`position: "absolute", right: -width * 0.35, top: -width * 0.2`). 바깥 원은 `stroke={tint}` `strokeOpacity={0.35}` `strokeWidth={1}` `fill="none"`, 안쪽 원(지름 0.72배, 같은 중심)은 `strokeOpacity={0.2}`. `pointerEvents="none"`, 접근성 숨김(`accessible={false}`, `importantForAccessibility="no-hide-descendants"`).
- `PageShell`에 `overflow: "hidden"`이 없으면 표지에서만 감싸는 `View`에 준다.

### 3. 타이포
- `coverTitle`: 27 → 40, `lineHeight` 48, `letterSpacing: -0.8`. ko(이 파일에서 `locale`을 이미 쓰는 방식을 따름)면 `fontWeight: "700"`, `letterSpacing: -1`. ko 판별 값이 `CoverPage`에 없으면 prop으로 넘긴다.
- `coverTitle2`: 20 → 22, `lineHeight` 30.
- `coverRule`: 폭 30 → 48, 색 `tint`.
- `coverSub`(닉네임): 13 → 15, `FONTS.semibold`, `letterSpacing: 0.3`.

### 4. 등장
`components/motion/Reveal`로 eyebrow(0), 제목(1), 제목2(2), 선+닉네임(3), 출처 배지(4)를 감싼다. 원 장식은 `Reveal`로 감싸지 말고 reanimated `useSharedValue`로 `opacity` 0→1, `scale` 0.92→1을 `DURATION.slow * 2`(720ms), `EASING.enter`로 한 번 재생한다. 동작 줄이기(`lib/useReducedMotion`)면 바로 1.

## 제약
- 건드리면 안 되는 파일: `screens/ReportScreen.tsx` 외 전부. i18n 문자열 추가 금지.
- 표지 외 페이지(목차, 원소 페이지, 페이월 등)는 바꾸지 않는다.
- 이 파일에는 RN `Animated`가 이미 있을 수 있다. reanimated는 `import Reanimated, {...} from "react-native-reanimated"`로 이름을 달리 가져온다.
- PDF(`lib/pdf/`)와 공유 이미지에는 영향이 없어야 한다(이 파일의 화면 표지만 바꿈).
- 색은 `COLORS`, `ELEMENT_COLORS`(투명도만 붙여서), `SURFACE`만. 글꼴은 `FONTS`로만. `fontStyle: "italic"` 금지.
- 애니메이션은 transform/opacity만.
- 코드 스타일: 2칸, 큰따옴표, 세미콜론. 파일이 1,700줄이 넘으니 `CoverPage`와 `pageStyles`의 `cover*` 항목만 찾아 고친다.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0 (목록 밖 파일 오류는 다른 작업 중이니 무시하고 보고)
- `grep -c "LinearGradient" screens/ReportScreen.tsx` → 2 이상
- `git diff --stat` 에서 이 작업으로 바뀐 파일은 `screens/ReportScreen.tsx`뿐
