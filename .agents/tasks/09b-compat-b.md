# 작업 지시서 09b: 궁합 화면 B (간격 토큰 + Reveal + 표면)

## 목표
궁합 리포트·그룹 케미 2파일의 직접 쓴 간격·모서리 숫자를 `SPACE`/`RADIUS` 토큰으로 바꾸고, 카드 표면을 `SURFACE`/`SHADOW`로 맞추고, 첫 진입 요소에 `Reveal` 순차 등장을 넣는다. 구성·문구·기능·흐름은 바꾸지 않는다.

## 수정할 파일 (작업 디렉터리 `mobile/`, 이 목록만)
- `screens/CompatReportScreen.tsx`
- `screens/GroupChemistryScreen.tsx`

## 규칙
- 토큰: `theme/tokens.ts`의 `SPACE`(4/8/12/16/24/32/48), `RADIUS`(sm10/md16/lg24/pill999), `SURFACE`(base/raised/floating/hairline), `SHADOW`(raised/floating). 
- `padding*`, `margin*`, `gap`, `rowGap`, `columnGap`, `borderRadius*`의 숫자 리터럴을 모두 토큰으로. 토큰에 없는 값은 가장 가까운 토큰으로 맞춘다(6→`SPACE.sm`, 20→`SPACE.lg` 또는 `SPACE.xl` 중 가까운 쪽, 14→`SPACE.md` 또는 `SPACE.lg`). 0은 그대로 둔다. 임의 숫자 추가 금지, `tokens.ts`는 수정하지 않는다.
- 카드로 보이는 컨테이너(배경색+모서리)는 `backgroundColor: SURFACE.raised` + `...SHADOW.raised` + `borderRadius: RADIUS.md`. 단, 오행 색 테두리(borderColor가 오행 색으로 정해지는 곳)와 입력창 내부는 지금 모양을 유지하고 간격만 토큰으로 바꾼다.
- 테두리 두께(`borderWidth`), 아이콘 크기, `lineHeight`, `fontSize`, `width/height`는 바꾸지 않는다.
- 제목·눈썹·본문 위계: 같은 파일 안의 기존 스타일 관계를 유지한다(바꾸지 않는다).

## 제약
- 건드리면 안 되는 파일: 위 목록 밖 전부. 결제·`Purchases.`·API 호출 코드.
- 새 의존성 금지. 코드 스타일은 주변과 같게(2칸, 큰따옴표, 세미콜론).
- 문구(i18n 키 포함)·기능·화면 흐름 변경 금지.

## 완료 조건 (`mobile/`에서)
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -nE '(padding|margin|gap|borderRadius)[A-Za-z]*: *[0-9]' screens/CompatReportScreen.tsx screens/GroupChemistryScreen.tsx` → 0줄 (`: 0`은 허용)
