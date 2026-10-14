# 작업 지시서 07b: 생성 그림 배치 (운세 히어로 물결, 리포트 표지 기운 지도)

## 목표
07에서 만든 `components/art/RhythmWave.tsx`, `components/art/ElementMap.tsx`(수정 금지)를 두 화면에 붙인다.

## 수정할 파일 (이 목록만)
작업 디렉터리는 `mobile/`.
- `screens/FortuneScreen.tsx`
- `screens/ReportScreen.tsx`

## 1. FortuneScreen — "오늘" 히어로 카드 맨 위에 물결
- "오늘" 탭 히어로 카드(그라데이션이 깔린 카드, `heroKicker` → `heroRhythm` 순서로 시작하는 블록) 안, 키커 **위**에 `RhythmWave`를 넣는다: `relation={daily.compatibility.relation}`, `height={64}`, `color={COLORS.gold}`.
- 물결이 카드 가장자리까지 닿도록 카드 좌우 안쪽 여백만큼 음수 마진(`marginHorizontal: -카드 paddingHorizontal`)과 위쪽 음수 마진(`marginTop: -카드 paddingTop`)을 주고, 아래 `marginBottom: SPACE.md`.
- `relation` 값의 타입이 `RhythmWave`의 props와 맞지 않으면 안전하게 좁혀서(알 수 없는 값이면 `"mirror"`) 넘긴다.
- 공유 이미지(`OverviewShare`의 캡처 뷰) 안에는 넣지 않는다.

## 2. ReportScreen — 표지에 기운 지도
- `CoverPage`(04d에서 바꿈)의 오른쪽 위로 넘치는 큰 원 장식 2개를 `ElementMap`으로 바꾼다: `size={width * 1.1}`, 같은 위치(`position: "absolute", right: -width * 0.35, top: -width * 0.2`), `style`에 `opacity: 0.35`, `animated`는 true.
- 입력: `elements`(이 화면 props에 이미 있음)와 `seed`(`dayMaster?.char ?? nickname`)를 `CoverPage` props로 넘긴다. `elements`가 없으면 지금의 원 장식을 그대로 쓴다(대체가 아니라 있을 때만 교체).
- 04d가 원에 걸어 둔 등장 애니메이션(opacity·scale)은 `ElementMap`을 감싸는 View에 그대로 둔다.

## 제약
- 건드리면 안 되는 파일: 위 2개 외 전부. `components/art/*` 수정 금지.
- 다른 부분(탭, 다른 카드, 다른 페이지, 결제)은 바꾸지 않는다.
- 색·글꼴 규칙, transform/opacity만, 코드 스타일(2칸, 큰따옴표, 세미콜론)은 앞 작업과 같다.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -c "RhythmWave" screens/FortuneScreen.tsx` → 2 이상
- `grep -c "ElementMap" screens/ReportScreen.tsx` → 2 이상
