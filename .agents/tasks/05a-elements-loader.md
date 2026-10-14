# 작업 지시서 05a: 오행 로더 (전체 화면 로딩 연출)

## 목표
지금 사주 계산, 리포트 생성, 운세 불러오기 같은 "기다리는 순간"은 기본 회전 스피너(`ActivityIndicator`)다. 이걸 **오행 다섯 점이 오각형으로 놓여 차례로 차오르는 로더**로 바꾼다. 사주 앱의 계산이 진행되는 느낌을 주는 브랜드 장면이다. 작은 버튼 안 스피너(구매 중, 내보내기 중, 검색 중)는 그대로 둔다.

## 새로 만들 파일
작업 디렉터리는 `mobile/`.

### `components/motion/ElementsLoader.tsx`
- props: `size?: "large" | "medium"`(기본 `"large"`), `style?`, `accessibilityLabel?: string`.
- 다섯 점을 오각형 꼭짓점에 둔다(위쪽부터 시계 방향: wood, fire, earth, metal, water — 상생 순서). 반지름 large 28 / medium 18, 점 지름 large 12 / medium 8.
- 색: `ELEMENT_COLORS`(`lib/elements.ts`).
- 애니메이션(react-native-reanimated, 공유 값 하나 `t`가 0→5를 `withRepeat(withTiming(5, {duration: 1800, easing: Easing.linear}), -1)`):
  - 점 i의 진행도 `p = clamp(t - i, 0, 1)`을 쓰되, 한 바퀴(5)가 끝나면 모두 비워지고 다시 시작한다.
  - 각 점: 비어 있을 때 `opacity 0.25, scale 0.7`, 차오르면 `opacity 1, scale 1`.
  - 다섯 점 전체를 감싼 View가 아주 천천히 회전(`rotate` 0→72deg를 한 바퀴 1800ms 동안, 5 바퀴마다 360). 너무 정신없으면 회전은 빼고 점만 차오르게 해도 된다(회전 각도 최대 72deg/1.8s).
  - 동작 줄이기(`lib/useReducedMotion`)면 애니메이션 없이 다섯 점을 모두 `opacity 0.6`으로 보여 준다.
- 접근성: 바깥 View에 `accessibilityRole="progressbar"`, `accessibilityLabel`(없으면 `strings.common`에 로딩 문구가 있으면 그것을, 없으면 라벨 생략), `accessibilityState={{ busy: true }}`.
- 파일 위 주석(영어 2줄): 전체 화면 로딩 전용, 버튼 안 작은 스피너는 `ActivityIndicator` 유지.

## 수정할 파일 (이 목록만)
아래 줄의 `ActivityIndicator`(전체 화면/섹션 로딩)를 `ElementsLoader`로 바꾼다. 줄 번호는 대략이니 내용으로 찾는다.
- `screens/CityScreen.tsx` — `submitting ? <ActivityIndicator ... size="large" />` (사주 계산 중) → `size="large"`
- `screens/ReportScreen.tsx` — 리포트 생성 중 큰 스피너(`size="large"`, 970줄 부근) → `size="large"`
- `screens/YearReportScreen.tsx` — 큰 스피너(265줄 부근) → `size="large"`
- `screens/CompatReportScreen.tsx` — 큰 스피너(271줄 부근) → `size="large"`
- `screens/VerifyCodeScreen.tsx` — 큰 스피너(85줄 부근) → `size="large"`
- `screens/FortuneScreen.tsx` — `style={styles.sectionSpinner}`를 쓰는 섹션 로딩 스피너 전부(6곳 안팎) → `size="medium"`, 같은 `style` 유지

바꾼 파일에서 `ActivityIndicator`를 더 쓰지 않으면 import에서 지운다. 버튼 안 작은 스피너(`size="small"` 또는 버튼 라벨 대신 나오는 것)는 바꾸지 않는다.

## 제약
- 건드리면 안 되는 파일: 위 목록 외 전부.
- 로딩 조건문, 상태, 문구는 바꾸지 않는다. 스피너 요소만 교체.
- 색은 `ELEMENT_COLORS`와 `COLORS`만.
- 애니메이션은 transform/opacity만.
- 코드 스타일: 2칸, 큰따옴표, 세미콜론. 기본 내보내기.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -rn 'ActivityIndicator.*size="large"\|sectionSpinner} />' screens` 결과에 `ActivityIndicator`가 남지 않음
