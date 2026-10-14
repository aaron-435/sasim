# 작업 지시서 04c: 오늘의 운세 화면 구성 개편

## 목표
`mobile/screens/FortuneScreen.tsx`의 **탭 바**와 **"오늘" 탭**을 잡지형으로 바꾼다. 지금은 긴 본문이 한 카드에 이어지고, 영역별(재물·애정·건강)은 같은 모양 행이며, 행운 포인트는 작은 글자다. 리듬 이름을 크게, 첫 문단을 인용처럼, 영역은 아이콘이 있는 행으로, 행운 숫자는 큰 숫자로 바꿔 시선이 머무는 지점을 만든다. 탭 바에는 선택 표시가 미끄러지듯 움직이는 인디케이터를 넣는다. 이번 주·이달·신년 탭의 내용은 바꾸지 않는다(탭 바만 공유). 문구·데이터·조건문·구독 잠금 로직은 그대로다.

앞 작업에서 끝난 것: `Pressable` → `PressableScale`, 카드 표면 토큰.

## 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`. **`screens/FortuneScreen.tsx` 한 파일만.**

## 바꿀 것

### 1. 제목
`styles.heading`: 26 → 32, `lineHeight` 40, `letterSpacing: -0.6`. ko(`locale === "ko"`)일 때 `fontWeight: "700"`, `letterSpacing: -0.8` 스타일을 추가로 붙인다.

### 2. 탭 바 슬라이딩 인디케이터
- `styles.tabRow` 안에 절대 위치 인디케이터 `Animated.View`(react-native-reanimated) 하나를 둔다. 배경 `"rgba(111,169,139,0.18)"`, 반경 9, 높이는 탭 버튼과 같게.
- `tabRow`의 `onLayout`으로 폭을 재고, 탭 하나 폭 = (전체 폭 − 좌우 패딩) / 4. 선택 탭 index가 바뀌면 `translateX`를 `withSpring(index * tabWidth, SPRING.gentle)`로 옮긴다(`theme/motion.ts`). 동작 줄이기(`lib/useReducedMotion`)면 `withTiming(..., {duration: 0})`.
- 기존 `tabButtonActive`의 배경은 제거한다(인디케이터가 대신). 선택된 탭 글자 스타일(`tabLabelActive`)은 유지.
- reanimated의 `Animated`와 RN의 `Animated`(이 파일에 이미 있음)가 충돌하지 않게 reanimated는 `import Reanimated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated"`처럼 다른 이름으로 가져온다.

### 3. "오늘" 히어로 카드 (`styles.heroCard` 블록, 710~723줄 부근)
- `heroKicker`: 13 → 12, `letterSpacing: 1.2`, 영어·스페인어는 대문자처럼 보이게 하지 말고 그대로(텍스트 변환 금지).
- `heroRhythm`(리듬 이름): 30 → 44, `lineHeight` 50, `letterSpacing: -1`. ko면 `fontWeight: "700"`, `letterSpacing: -1.2`.
- `heroHeadline`: 첫 줄을 인용처럼 — 영어/스페인어는 `FONTS.displayItalic` 20 / `lineHeight` 28, ko는 시스템 글꼴 18 / `lineHeight` 28 / `fontWeight: "600"`. 왼쪽에 3px 세로선(`COLORS.gold`, `paddingLeft: 14`, `borderLeftWidth: 3`)을 둔다.
- 본문(`toParagraphs` 결과)은 지금처럼 하나의 `Text`지만 `lineHeight`를 본문 크기의 1.7배로(예: 15/26).
- 히어로 카드 배경에 `expo-linear-gradient`를 `StyleSheet.absoluteFill`로 깐다: `["#1F3327", "#18291F"]` 위→아래. 카드에 `overflow: "hidden"`. 공유 미리보기(`OverviewShare`)와 `FeedbackRow`는 그대로 카드 안에 둔다.

### 4. 영역별 (`AreaList` 함수)
- 각 행 왼쪽에 지름 36 원형 아이콘(`"rgba(111,169,139,0.12)"` 배경, `lucide-react-native` 아이콘 18px `COLORS.gold`): wealth → `Coins`, love → `Heart`, health → `Activity`, career → `Briefcase`, study → `BookOpen`, 그 밖의 key → `Sparkles`. import는 기존 lucide 스타일(`lucide-react-native/icons/xxx` 개별 경로가 쓰이고 있으면 그 방식)을 따른다.
- 행은 `flexDirection: "row"`, 아이콘과 글 사이 `SPACE.md`, 행 간 `SPACE.lg`. 라벨 14 `FONTS.semibold` `COLORS.headline`, 본문 14 / `lineHeight` 22.
- 이 함수는 신년 탭에서도 쓰이므로, 바꾼 모양이 거기에도 적용되는 것은 괜찮다.

### 5. 행운 포인트 (736~757줄 부근)
- 각 항목을 세로 블록으로: 라벨 12 `COLORS.subheadline` 위, 값 아래.
- 숫자 값(`luckyNumber`)은 `FONTS.display` 40 / `lineHeight` 44 `COLORS.headline`, `fontVariant: ["lining-nums"]`.
- 색 값(`luckyPoint.color`)은 글자 앞에 지름 12 원(`COLORS.gold` 테두리 1.5px, 배경 투명)을 둔다. 실제 색을 칠하지는 않는다(색 이름 → 색 값 매핑이 없음).
- 방향(ko 전용)은 값 18 `FONTS.semibold`.
- 항목 사이에 세로 구분선(1px `SURFACE.hairline`).

### 6. 간격
"오늘" 탭의 카드 사이 간격을 `SPACE.lg`(16)로 통일한다.

## 제약
- 건드리면 안 되는 파일: `screens/FortuneScreen.tsx` 외 전부. i18n 문자열 추가 금지.
- 이번 주·이달·신년 탭의 JSX는 바꾸지 않는다(공유하는 `AreaList`, 탭 바, 제목 제외).
- `OverviewShare`의 캡처 대상 뷰(공유 이미지) 안쪽 스타일은 바꾸지 않는다.
- 봉인 카드(`sealCard`), `sectionStyle` 애니메이션(RN Animated), `handleSeal*` 코드는 그대로.
- 색은 `COLORS`, `SURFACE`, 위에 적은 rgba 2개와 그라데이션 2색만. 글꼴은 `FONTS`로만. `fontStyle: "italic"` 금지.
- 애니메이션은 transform/opacity만.
- 코드 스타일: 2칸, 큰따옴표, 세미콜론. 파일이 1,200줄이 넘으니 스타일 시트를 먼저 고치고 JSX를 고친다. 여러 곳을 한 번에 고치는 편집으로 스텝을 아낀다.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -c "LinearGradient" screens/FortuneScreen.tsx` → 2 이상
- `grep -c "withSpring" screens/FortuneScreen.tsx` → 1 이상
