# 작업 지시서 12a-yearreport: 신년 리포트 (간격 토큰 + Reveal + 표면)

## 목표
아래 1파일의 직접 쓴 간격·모서리 숫자를 `SPACE`/`RADIUS` 토큰으로 바꾸고, 카드 표면을 `SURFACE`/`SHADOW`로 맞추고, 첫 진입 요소에 `Reveal` 순차 등장을 넣는다. 구성·문구·기능·흐름은 바꾸지 않는다.

## 수정할 파일 (작업 디렉터리 `mobile/`, 이 목록만)
- `screens/YearReportScreen.tsx`

## 규칙
- 토큰: `theme/tokens.ts`의 `SPACE`(4/8/12/16/24/32/48), `RADIUS`(sm10/md16/lg24/pill999), `SURFACE`(base/raised/floating/hairline), `SHADOW`(raised/floating). 
- `padding*`, `margin*`, `gap`, `rowGap`, `columnGap`, `borderRadius*`의 숫자 리터럴을 모두 토큰으로. 토큰에 없는 값은 가장 가까운 토큰으로 맞춘다(6→`SPACE.sm`, 20→`SPACE.lg` 또는 `SPACE.xl` 중 가까운 쪽, 14→`SPACE.md` 또는 `SPACE.lg`). 0은 그대로 둔다. 임의 숫자 추가 금지, `tokens.ts`는 수정하지 않는다.
- 카드로 보이는 컨테이너(배경색+모서리)는 `backgroundColor: SURFACE.raised` + `...SHADOW.raised` + `borderRadius: RADIUS.md`. 단, 오행 색 테두리(borderColor가 오행 색으로 정해지는 곳)와 입력창 내부는 지금 모양을 유지하고 간격만 토큰으로 바꾼다.
- 테두리 두께(`borderWidth`), 아이콘 크기, `lineHeight`, `fontSize`, `width/height`는 바꾸지 않는다.
- `Reveal`: `import Reveal from "../components/motion/Reveal";`. 화면 위에서 아래 큰 블록 단위 최대 5단계(`index={0..4}`)로 감싼다. 이미 `Reveal`이 있는 곳은 유지. 리스트 항목·입력창마다 감싸지 않는다. 키보드·포커스·스크롤·FlatList 동작을 깨는 위치는 피한다. 구독 안내·결제 카드, `Purchases.` 코드는 간격 숫자만 바꾸고 로직은 건드리지 않는다.
- 신년 리포트는 `ReportPager`(페이지 넘김) 안의 페이지와 구매 전 세로 스크롤 미리보기가 있다. 페이지 넘김 구조·`ReportPager` 호출·구매·`Purchases.` 코드는 건드리지 말고, 페이지 안 간격·표면만 토큰으로. `Reveal`은 구매 전 미리보기의 큰 블록(표지·한눈에 보기 등)에만, 페이지 넘김 안쪽은 이미 있는 연출을 유지한다.
- 제목·눈썹·본문 위계: 같은 파일 안의 기존 스타일 관계를 유지한다(바꾸지 않는다).

## 제약
- 건드리면 안 되는 파일: 위 목록 밖 전부. 결제·`Purchases.`·API 호출 코드.
- 새 의존성 금지. 코드 스타일은 주변과 같게(2칸, 큰따옴표, 세미콜론).
- 문구(i18n 키 포함)·기능·화면 흐름 변경 금지.

## 완료 조건 (`mobile/`에서)
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -nE '(padding|margin|gap|borderRadius)[A-Za-z]*: *[0-9]' screens/YearReportScreen.tsx` → 0줄 (`: 0`은 허용)
