# 작업 지시서 02: 모션 기반 (네이티브 패키지 설치 + 디자인 토큰 + 모션 부품 + 화면 전환)

## 목표
앱(`mobile/`, Expo SDK 57 / React Native 0.86)의 대규모 UI 개편 첫 단계다. 개편에 필요한 네이티브 패키지를 설치하고, 간격·반경·표면·모션 토큰과 공용 모션 부품(화면 전환, 순차 등장, 누름 축소 + 햅틱)을 만든 뒤, `App.tsx`의 화면 전환에 연결한다. 지금은 화면이 상태값(`step`)으로 바뀔 때 애니메이션 없이 한 번에 바뀐다. 이걸 앞으로 갈 때는 오른쪽에서, 뒤로 갈 때는 왼쪽에서 들어오게 한다.

배경 자료: 저장소 루트 `DESIGN_AUDIT_2026-10-14.md` (읽기만 할 것).

## 수정할 파일 / 새로 만들 파일
작업 디렉터리는 `mobile/`이다.

1. 패키지 설치 (반드시 `npx expo install`로, SDK에 맞는 버전이 들어가게):
   ```
   npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler expo-haptics expo-linear-gradient expo-blur expo-image lottie-react-native
   ```
   `babel.config.js`는 만들지 않는다(SDK 57의 `babel-preset-expo`가 reanimated 플러그인을 자동으로 넣는다). 설치 후 `package.json`과 `package-lock.json`이 바뀌는 것은 정상이다.

2. 새 파일 `theme/tokens.ts`: 아래 토큰을 `as const` 객체로 내보낸다. 숫자는 이 값을 그대로 쓴다.
   - `SPACE`: `xs 4, sm 8, md 12, lg 16, xl 24, xxl 32, xxxl 48`
   - `RADIUS`: `sm 10` (칩·입력 안쪽), `md 16` (카드), `lg 24` (히어로·시트), `pill 999`
   - `SURFACE`: 배경 위 3단계 표면색. `base: COLORS.background`, `raised: "#18291F"`, `floating: "#1F3327"`, 그리고 `hairline: "rgba(217,201,163,0.08)"` (테두리가 꼭 필요할 때만 쓰는 아주 옅은 선)
   - `SHADOW`: `raised`, `floating` 두 단계. 색은 검정이 아니라 `#06100B`, iOS용 `shadowColor/shadowOffset/shadowOpacity/shadowRadius`와 Android용 `elevation`을 같이 넣는다.
   - 파일 맨 위에 한 줄 주석: 이 토큰은 2026-10-14 UI 개편용이며 화면별 숫자 직접 입력을 대체한다.

3. 새 파일 `theme/motion.ts`:
   - `DURATION`: `fast 160, base 240, slow 360, reveal 480`
   - `EASING`: reanimated `Easing.bezier`로 `standard (0.2, 0, 0, 1)`, `enter (0.05, 0.7, 0.1, 1)`, `exit (0.3, 0, 0.8, 0.15)`
   - `SPRING`: `press { damping: 18, stiffness: 320, mass: 0.6 }`, `gentle { damping: 20, stiffness: 180 }`
   - `STAGGER_MS = 50`

4. 새 파일 `lib/useReducedMotion.ts`: `AccessibilityInfo.isReduceMotionEnabled()` 초기값 + `reduceMotionChanged` 구독으로 boolean을 돌려주는 훅. 기존 패턴은 `components/GoldAura.tsx` 30~40줄을 참고한다(`.catch(() => false)` 포함).

5. 새 파일 `lib/haptics.ts`: `expo-haptics`를 감싼 `tap()`(Light impact), `select()`(selectionAsync), `success()`(Notification Success). `Platform.OS === "web"`이면 아무것도 하지 않는다. 모든 호출은 `.catch(() => {})`로 실패를 삼킨다.

6. 새 파일 `components/motion/PressableScale.tsx`: `Pressable`의 props를 그대로 받고, 눌렀을 때 `scale` 0.97로 `SPRING.press` 스프링, 떼면 1로 돌아온다(reanimated `useSharedValue` + `useAnimatedStyle`, transform만 사용). 추가 prop `haptic?: "tap" | "select" | "none"`(기본 `"tap"`), `pressedScale?: number`. 동작 줄이기가 켜져 있으면 축소하지 않고 opacity 0.85만 쓴다. `disabled`면 축소·햅틱 둘 다 안 한다. `style`은 함수형(`({pressed}) => ...`)과 일반형 둘 다 받아야 한다.

7. 새 파일 `components/motion/Reveal.tsx`: 자식을 opacity 0→1, translateY 12→0으로 등장시키는 래퍼. props `index?: number`(지연 = index × `STAGGER_MS`), `delay?: number`, `style?`. reanimated의 `FadeInDown` 계열 layout animation 또는 `useSharedValue` 중 하나로 구현. 동작 줄이기가 켜져 있으면 애니메이션 없이 바로 보인다.

8. 새 파일 `components/motion/ScreenTransition.tsx`: `stepKey: string`과 `direction: "forward" | "back" | "fade"`를 받아 자식을 감싼다. `stepKey`가 바뀔 때 `forward`는 오른쪽에서 24px 들어오며 페이드인, `back`은 왼쪽에서 24px, `fade`는 페이드 + scale 0.98→1. 길이는 `DURATION.base`, 이징은 `EASING.enter`. 구현은 `<Animated.View key={stepKey} entering={...}>` 방식을 권한다. 퇴장(exiting) 애니메이션은 넣지 않는다(겹침과 웹 호환 문제를 피함). `flex: 1`. 동작 줄이기가 켜져 있으면 감싸기만 하고 애니메이션은 없다.

9. `App.tsx` 수정:
   - 최상단을 `GestureHandlerRootView`(`style={{ flex: 1 }}`)로 감싼다(`SafeAreaProvider` 바깥).
   - 이전 step을 `useRef`로 기억해 방향을 정한다: 새 step이 `BACK_TARGET[이전 step]`과 같으면 `"back"`, 새 step이 `"typeReveal"`, `"report"`, `"yearReport"`, `"compatReport"`, `"qaReport"`, `"wrapped"` 중 하나면 `"fade"`, 나머지는 `"forward"`.
   - 각 step 화면을 렌더하는 `{step === "..." && ...}` 묶음 전체를 `<ScreenTransition stepKey={step} direction={...}>` 하나로 감싼다. 각 화면의 조건문과 props는 한 글자도 바꾸지 않는다.

10. `components/AuraNextButton.tsx`: 안쪽 `Pressable`을 `PressableScale`로 바꾼다(기존 `pressed` opacity 스타일은 제거). 다른 동작은 그대로.

## 제약
- 건드리면 안 되는 파일: 위 목록 외 전부. 특히 `screens/*`, `lib/i18n/*`, `theme/colors.ts`, `theme/fonts.ts`, 루트(`mobile/` 바깥)의 모든 파일, `.env*`.
- 색은 `theme/colors.ts`의 `COLORS`만 쓰고 새 색은 위 `SURFACE`/`SHADOW` 값만 허용한다. 글꼴은 `FONTS`로만 참조한다.
- 애니메이션은 transform과 opacity만 쓴다(width/height/top/left 애니메이션 금지).
- 기존 코드 스타일: 2칸 들여쓰기, 큰따옴표, 세미콜론, 파일 위쪽에 영어 주석 한두 줄로 "왜"를 적는 방식(`components/AuraNextButton.tsx` 참고). 기본 내보내기(default export) 컴포넌트.
- 새 화면 라이브러리(react-navigation, expo-router)는 넣지 않는다.

## 완료 조건
`mobile/`에서 실행:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `npx expo install --check` → 버전 불일치 없음
- `grep -n "GestureHandlerRootView\|ScreenTransition" App.tsx` → 둘 다 나옴
- `git diff --stat -- screens` → 변경 없음

## 참고
- 동작 줄이기 처리 예: `components/GoldAura.tsx`, `components/ChatBubbles.tsx`
- 화면 전환 방향 판단에 쓰는 표: `App.tsx`의 `BACK_TARGET`
