# 작업 지시서 06a: 작은 생동감 (숫자 카운트업, 오행 막대 차오름, 오늘 칸 숨쉬기)

## 목표
정적인 숫자와 막대를 살아 있게 만든다. 오행 비율 막대는 왼쪽에서 차오르고, 비율 숫자는 0에서 올라가고, 달력의 오늘 칸은 은은하게 숨 쉰다. 값, 문구, 레이아웃은 바꾸지 않는다.

## 새로 만들 파일 / 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`. **다른 muse 작업이 동시에 다른 파일을 고치고 있다.** 목록 밖 파일은 수정하지 않는다.
- 새 파일 `components/motion/CountUp.tsx`
- 수정 `components/FourPillarsChart.tsx`
- 수정 `components/MonthGrid.tsx`
- 수정 `screens/WrappedScreen.tsx` (숫자 카운트업만)

## 1. `components/motion/CountUp.tsx`
- props: `value: number`, `duration?: number`(기본 700), `delay?: number`(기본 0), `format?: (n: number) => string`(기본 `String(Math.round(n))`), 그리고 `Text`(`components/AppText`)에 넘길 `style`, `maxFontSizeMultiplier` 등 나머지 props.
- `requestAnimationFrame`으로 0 → `value`를 ease-out(`1 - (1 - t)^3`)으로 올리며 React state로 글자를 갱신한다(웹·네이티브 공통으로 확실히 동작하게 reanimated 대신 rAF 사용). 언마운트 시 `cancelAnimationFrame`.
- `value`가 바뀌면 이전 표시값에서 새 값으로 다시 올라간다.
- 동작 줄이기(`lib/useReducedMotion`)면 바로 최종값.
- 접근성: 스크린리더가 중간값을 읽지 않도록 `accessibilityLabel`을 최종값 문자열로 고정.

## 2. `components/FourPillarsChart.tsx`
- **막대 차오름**: 오행 비율 막대 `Svg`(`<Svg width={width} height={HEIGHT - BAR_Y}>`)를 `overflow: "hidden"` View로 감싸고, 안쪽 reanimated `Animated.View`의 `translateX`를 `-width → 0`으로 900ms(`EASING.enter`, `theme/motion.ts`), 기둥 등장 뒤라 `delay` 350ms. 동작 줄이기면 바로 0.
- **범례 숫자**: 범례의 `{Math.round(elements[k] ?? 0)}%` 숫자 부분을 `CountUp`으로 바꾼다. 예: `{t.elementNames[k as El]} ` 텍스트 뒤에 `<CountUp value={Math.round(elements[k] ?? 0)} delay={350} format={(n) => \`${Math.round(n)}%\`} style={styles.legendText} />`. 한 줄에 이어 보이도록 범례 항목 안의 배치를 맞춘다(필요하면 이름과 숫자를 `flexDirection: "row"` 안의 두 Text로). 글자 크기·색은 그대로.
- 기둥 레이아웃, 색, 캡션은 바꾸지 않는다.

## 3. `components/MonthGrid.tsx`
- 오늘 날짜(기기 현지 날짜를 `YYYY-MM-DD`로)를 컴포넌트 안에서 계산한다.
- 오늘 칸(`date === today`)에는 `renderDay(date)` 위에 절대 위치 링 하나를 덧씌운다: `StyleSheet.absoluteFill` + 칸 padding(3)만큼 안쪽, `borderRadius` 10, `borderWidth: 1.5`, `borderColor: COLORS.gold`, `pointerEvents="none"`. 이 링의 `opacity`를 reanimated `withRepeat(withSequence(withTiming(0.85, {duration: 1400}), withTiming(0.25, {duration: 1400})), -1)`로 숨 쉬게 한다.
- 동작 줄이기면 링을 `opacity 0.6`으로 고정.
- `buildMonthCells`와 기존 props·레이아웃은 그대로. 호출하는 화면(저널, 운세 이달 탭)은 바꾸지 않는다.

## 4. `screens/WrappedScreen.tsx`
- 화면에 크게 보이는 숫자(일수, 횟수, 비율 등 숫자만 단독으로 보이는 Text)가 있으면 `CountUp`으로 바꾼다. 숫자가 문장 안에 섞인 i18n 함수 결과(예: `strings.wrapped.topicCount(...)`)는 바꾸지 않는다. 바꿀 숫자가 없으면 이 파일은 그대로 두고 보고한다.
- `captureRef` 대상 뷰(공유 이미지) 안쪽은 바꾸지 않는다.

## 제약
- 색은 `COLORS`, `ELEMENT_COLORS`만. 글꼴은 `FONTS`로만.
- 애니메이션은 transform/opacity만(CountUp은 글자 갱신이라 예외).
- 코드 스타일: 2칸, 큰따옴표, 세미콜론. 기본 내보내기.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0 (목록 밖 파일 오류는 다른 작업 중이니 무시하고 보고)
- `grep -c "CountUp" components/FourPillarsChart.tsx` → 2 이상
- `grep -c "withRepeat" components/MonthGrid.tsx` → 1
