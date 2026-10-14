# 작업 지시서 07: 사용자별 생성 그림 (나의 기운 지도, 오늘의 리듬 물결)

## 목표
사용자의 사주 데이터로 직접 그리는 그림 두 가지를 만든다. 그림 파일 없이 SVG로 그리고, **같은 입력이면 항상 같은 그림**(결정적)이다. "계산한 것이지 지어낸 게 아니다"라는 제품 원칙에 맞게 모양이 실제 데이터(오행 비율, 오늘의 리듬)를 반영한다.

1. **나의 기운 지도**(`ElementMap`): 오행 다섯 원소의 비율을 꽃잎/물결 모양으로 그린 원형 무늬. 홈 인사 옆과 리포트 표지에 쓴다.
2. **오늘의 리듬 물결**(`RhythmWave`): 오늘의 리듬 종류에 따라 물결의 높이·간격·겹 수가 달라지는 가로 띠. 운세 "오늘" 히어로 카드 위쪽에 쓴다.

## 새로 만들 파일 / 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`. **다른 muse 작업이 동시에 다른 파일을 고치고 있다.** 목록 밖 파일은 수정하지 않는다.
- 새 파일 `components/art/ElementMap.tsx`
- 새 파일 `components/art/RhythmWave.tsx`
- 새 파일 `lib/seededRandom.ts`
- 수정 `screens/HomeScreen.tsx` (기운 지도 배치만)

`screens/ReportScreen.tsx`, `screens/FortuneScreen.tsx`는 지금 다른 작업이 고치고 있으므로 **이번에는 건드리지 않는다**. 두 화면에 붙이는 일은 다음 작업에서 한다.

## 1. `lib/seededRandom.ts`
- `hashString(s: string): number` — 문자열을 32비트 정수로(FNV-1a 같은 간단한 해시).
- `mulberry32(seed: number): () => number` — 0~1 의사난수 생성기.
- 짧은 영어 주석: 생성 그림이 같은 사용자에게 항상 같은 모양이 되도록 쓰는 결정적 난수.

## 2. `components/art/ElementMap.tsx`
- props: `elements: Record<string, number>`(키 `wood|fire|earth|metal|water`, 값은 퍼센트 0~100), `seed: string`(일간 글자 등), `size: number`, `animated?: boolean`(기본 true), `style?`.
- 그림(react-native-svg, `viewBox="-100 -100 200 200"`):
  - 바탕: 반지름 96 원, `fill="none"`, `stroke={COLORS.headline}` `strokeOpacity={0.12}`.
  - 오행 다섯 꽃잎: `ELEMENT_ORDER` 순서로 72도 간격(시작 각도는 `seed`로 0~71도 회전). 각 꽃잎은 중심에서 바깥으로 뻗는 물방울 모양 `Path`(2차 베지어). 길이 = `30 + 60 * (비율 / 최대비율)`, 폭 = 길이의 0.42배. 비율이 0인 원소는 길이 18의 가는 선 꽃잎(`fillOpacity` 0.08)으로 "비어 있음"을 표시.
  - 색: `ELEMENT_COLORS[k]`, `fillOpacity` 0.35, `stroke` 같은 색 `strokeOpacity` 0.7, `strokeWidth` 1.
  - 결 무늬: `seed` 난수로 반지름 20~90 사이 동심원 3~5개(`strokeOpacity` 0.06~0.14, `strokeDasharray`는 난수로 "2 4" / "1 6" / 없음 중 하나). 같은 seed면 항상 같은 결.
  - 가운데: 지름 10 원 `COLORS.headline`.
- 움직임(`animated`일 때): 전체가 아주 천천히 회전(360도 / 90초, `withRepeat(withTiming(...), -1)`, linear) + 처음 마운트 때 꽃잎이 `scale 0.6→1`, `opacity 0→1` 900ms. 동작 줄이기(`lib/useReducedMotion`)면 회전 없음, 등장 없음.
- 접근성: 장식이므로 숨김(`accessible={false}`, `importantForAccessibility="no-hide-descendants"`, `aria-hidden`).
- `elements`가 비어 있거나 합이 0이면 `null` 반환.

## 3. `components/art/RhythmWave.tsx`
- props: `relation: "mirror" | "selfNurturesOther" | "otherNurturesSelf" | "selfChallengesOther" | "otherChallengesSelf"`, `color?: string`(기본 `COLORS.gold`), `height?: number`(기본 72), `style?`. 폭은 부모를 꽉 채운다(`onLayout`으로 폭 측정).
- 리듬별 모양(사인파 겹):
  | relation | 겹 수 | 진폭(px) | 파장(폭 대비) | 느낌 |
  |---|---|---|---|---|
  | mirror | 2 | 8 | 0.5 | 고르고 안정 |
  | selfNurturesOther | 3 | 12 | 0.6 | 넓게 퍼짐 |
  | otherNurturesSelf | 3 | 10 | 0.8 | 느긋하게 받아들임 |
  | selfChallengesOther | 3 | 16 | 0.35 | 힘 있게 앞으로 |
  | otherChallengesSelf | 2 | 6 | 0.3 | 잔잔하게 고름 (페이스 조절일 — 불길해 보이지 않게 낮고 차분하게) |
- 각 겹은 `Path`(점 40~60개로 사인파), 위 겹일수록 `strokeOpacity` 0.6 → 0.35 → 0.2, `strokeWidth` 1.5, `fill="none"`. 첫 겹 아래를 아주 옅게 채운다(`fill` 같은 색 `fillOpacity` 0.06, 경로를 아래 끝까지 닫아서).
- 움직임: 겹마다 다른 속도로 가로로 흐른다. 구현은 경로를 폭의 2배로 그리고 `translateX`를 `0 → -파장px`로 `withRepeat(withTiming(..., {duration: 4000~7000, easing: linear}), -1)`(겹마다 다른 시간). 동작 줄이기면 정지.
- 접근성 숨김.

## 4. `screens/HomeScreen.tsx`
- 헤더의 인사(`greeting`) 줄 오른쪽에 `ElementMap`(size 76)을 둔다. 인사와 유형 배지를 감싼 영역을 `flexDirection: "row"`로 만들어 왼쪽에 기존 날짜·인사·배지, 오른쪽에 지도. 인사 글자가 길면 지도가 밀리지 않게 왼쪽 영역 `flex: 1`.
- 입력: `elements`(이 화면 props에 이미 있음), `seed`는 `selfDayMasterChar ?? nickname`. `elements`가 없으면 지도를 그리지 않는다.
- 지도를 누르면 유형 화면으로(`onOpenType`, `sajuType`이 있을 때만). `PressableScale haptic="select"`, `accessibilityRole="button"`, `accessibilityLabel`은 기존 유형 배지와 같은 값.

## 제약
- 색은 `COLORS`, `ELEMENT_COLORS`만(투명도로 조절). 새 색 금지.
- 애니메이션은 transform/opacity만.
- 압박 규칙: "페이스 조절" 리듬(`otherChallengesSelf`)을 위협적으로 보이게 하지 않는다(뾰족한 파형·빨강 금지).
- 코드 스타일: 2칸, 큰따옴표, 세미콜론. 기본 내보내기. 짧은 영어 주석으로 "왜"만.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0 (목록 밖 파일 오류는 다른 작업 중이니 무시하고 보고)
- `grep -c "ElementMap" screens/HomeScreen.tsx` → 2 이상
- `ls components/art` → `ElementMap.tsx`, `RhythmWave.tsx`
