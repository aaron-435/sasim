# 작업 지시서 04a: 홈 화면 구성 개편

## 목표
UI 개편 3단계의 첫 화면이다. 홈(`mobile/screens/HomeScreen.tsx`)은 지금 같은 폭 카드가 세로로 쌓이고, 아래 "더 알아보기"는 아이콘 + 글 목록 4줄이다. 이걸 **리듬이 있는 화면**으로 바꾼다. 콘텐츠가 위에서부터 순서대로 등장하고, 히어로는 그라데이션으로 깊이가 생기고, "더 알아보기"는 크기가 다른 타일(벤토 그리드)로 바뀐다. 기능, 문구, 이동 동작은 그대로 둔다.

앞 작업에서 끝난 것(다시 하지 않음): 모든 `Pressable` → `PressableScale`, 카드 테두리 → `SURFACE.raised` + `SHADOW.raised`.

## 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`.
- `screens/HomeScreen.tsx`
- `components/FourPillarsChart.tsx` (등장 애니메이션만, 아래 4번)

## 바꿀 것

### 1. 순차 등장
`components/motion/Reveal`로 아래 블록을 감싸고 `index`를 0부터 차례로 준다: 헤더(인사·유형 배지) 0, 히어로 1, 오행 색 카드(`ElementColorCard`) 2, Wrapped 카드 3, 커플 카드 4, 심리테스트 카드 5, 사주 원국 섹션 6, 더 알아보기 섹션 7. 없는 블록(조건부)은 건너뛰어도 index는 고정값을 쓴다(빈 지연은 괜찮음). QA 패널과 푸터는 감싸지 않는다.
- 히어로에는 이미 `heroSettle`(RN `Animated`) 등장 애니메이션이 있다. 히어로는 `Reveal`로 감싸지 말고 기존 것을 그대로 둔다(index 1 자리는 비움).

### 2. 헤더 타이포
- `greeting`: `fontSize` 30 → 34, `lineHeight` 40, `letterSpacing: -0.6`. 한국어(`locale === "ko"`)일 때는 시스템 글꼴이므로 `fontWeight: "700"`과 `letterSpacing: -0.8`을 추가로 준다(기존 `philosophyLineKo`처럼 ko 전용 스타일 하나 추가).
- 인사 위에 작은 날짜 줄(eyebrow)을 추가한다: 오늘 날짜를 `lib/shortDate.ts`의 기존 함수로 포맷(예: "10월 14일 화요일" / "Tuesday, Oct 14"). 맞는 함수가 없으면 `Intl.DateTimeFormat(locale, { month: "long", day: "numeric", weekday: "long" })`을 쓴다. 스타일: `FONTS.medium`, 12, `COLORS.subheadline`, `letterSpacing: 0.4`. 브랜드 줄(FATESAID)과 인사 사이에 둔다.

### 3. 히어로 그라데이션
- `styles.hero`의 단색 배경 위에 `expo-linear-gradient`의 `LinearGradient`를 절대 위치(`StyleSheet.absoluteFill`)로 깔고 `borderRadius`를 히어로와 같게 맞춘다(`overflow: "hidden"`을 hero에 추가).
- 색: 왼쪽 위 `"#86BCA0"` → 오른쪽 아래 `COLORS.gold`(`#6FA98B`) → `"#5C957A"`, `start={{x:0,y:0}} end={{x:1,y:1}}`. 이 세 색은 청자 계열 명도 차이만이라 팔레트 규칙 안이다. 다른 색은 쓰지 않는다.
- 히어로 오른쪽 아래에 나중에 "오늘의 리듬 그림"이 들어갈 자리를 비워 두지 않아도 된다(이번 범위 아님).

### 4. 사주 원국 등장
`components/FourPillarsChart.tsx`의 기둥(원형 칩) 열마다 `Reveal`을 씌워 `index` 0~3으로 순서대로 올라오게 한다. 레이아웃·색·크기는 바꾸지 않는다. 오행 비율 막대가 있으면 그 막대는 그대로 둔다.

### 5. "더 알아보기" → 벤토 타일
지금 `styles.list` 안의 행 목록(`features.map`)을 2열 타일 그리드로 바꾼다.
- 첫 번째 항목은 **가로 전체 폭** 타일(아이콘 왼쪽 위 28px, 제목 18px `FONTS.semibold`, 설명 2줄, 오른쪽 아래 `ArrowRight` 16px).
- 나머지 항목은 **2열 정사각형에 가까운 타일**(`width: "48%"`, `minHeight: 132`, 아이콘 위 24px, 제목 16px, 설명 2줄 `numberOfLines={2}`). 항목이 홀수로 남으면 마지막 타일은 전체 폭.
- 타일 스타일: `SURFACE.raised`, `RADIUS.md`, `SHADOW.raised`, 안쪽 여백 `SPACE.lg`, 타일 사이 간격 `SPACE.md`(`flexWrap: "wrap"`, `justifyContent: "space-between"`, `rowGap`).
- 타일은 `PressableScale pressedScale={0.97}`, 기존 `accessibilityLabel`·`onPress` 그대로. 행 구분선(`listRowDivider`)과 `android_ripple`은 타일에서 제거.
- 아이콘 뒤에 지름 44 원형 배경(`"rgba(111,169,139,0.12)"`)을 깔아 아이콘이 떠 보이게 한다.
- 각 타일도 `Reveal`로 감싸 `index`를 0,1,2,3… 주되, 섹션 전체 Reveal(index 7) 안에서 `delay`를 `400 + i*50`으로 직접 준다.

### 6. 간격
- 섹션 사이 세로 간격을 `SPACE.xxl`(32)로 통일한다(`styles.section`의 `marginTop` 등). 카드끼리 간격은 `SPACE.md`(12).
- `sectionTitle`: 18 → 20, `FONTS.display`(영어), ko일 때 `fontWeight: "700"`.

## 제약
- 건드리면 안 되는 파일: 목록 외 전부. i18n 문자열은 추가하지 않는다(날짜는 포맷 함수로만).
- 색은 `COLORS`, `SURFACE`, 그리고 위에 적은 히어로 그라데이션 3색과 아이콘 원 배경 1색만.
- 글꼴은 `FONTS`로만. `fontStyle: "italic"` 금지.
- 애니메이션은 transform/opacity만. 동작 줄이기는 `Reveal`이 처리한다.
- 히어로의 기존 RN `Animated` 코드(heroPress, heroSettle)는 지우지 않는다.
- 코드 스타일: 2칸, 큰따옴표, 세미콜론.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0 (목록 밖 파일의 오류가 나오면 다른 작업 중인 것이니 무시하고 보고)
- `grep -c "Reveal" screens/HomeScreen.tsx` → 5 이상
- `grep -c "LinearGradient" screens/HomeScreen.tsx` → 2 이상 (import + 사용)

## 참고
- 토큰: `theme/tokens.ts`, `theme/motion.ts`
- 부품: `components/motion/Reveal.tsx`, `components/motion/PressableScale.tsx` (수정 금지)
