# 작업 지시서 13b-onboard-b: 온보딩 Dob~VerifyCode (간격 토큰 + Reveal + 표면)

## 목표
아래 파일의 직접 쓴 간격·모서리 숫자를 `SPACE`/`RADIUS` 토큰으로 바꾸고, 카드 표면을 `SURFACE`/`SHADOW`로 맞추고, 첫 진입 요소에 `Reveal` 순차 등장을 넣는다. 구성·문구·기능·흐름은 바꾸지 않는다.

## 수정할 파일 (작업 디렉터리 `mobile/`, 이 목록만)
- `screens/DobScreen.tsx`
- `screens/TobScreen.tsx`
- `screens/CityScreen.tsx`
- `screens/ConcernScreen.tsx`
- `screens/VerifyCodeScreen.tsx`

## 규칙
- 토큰: `theme/tokens.ts`의 `SPACE`(4/8/12/16/24/32/48), `RADIUS`(sm10/md16/lg24/pill999), `SURFACE`(base/raised/floating/hairline), `SHADOW`(raised/floating).
- `padding*`, `margin*`, `gap`, `rowGap`, `columnGap`, `borderRadius*`의 숫자 리터럴을 모두 토큰으로. 토큰에 없는 값은 가장 가까운 토큰으로 맞춘다(6→`SPACE.sm`, 14→`SPACE.md` 또는 `SPACE.lg`, 20→`SPACE.lg` 또는 `SPACE.xl` 중 가까운 쪽, 동점은 큰 쪽). 0은 그대로 둔다. 임의 숫자 추가 금지, `tokens.ts`는 수정하지 않는다. 원형 요소는 `RADIUS.pill`.
- 카드로 보이는 컨테이너(배경색+모서리)는 `backgroundColor: SURFACE.raised` + `...SHADOW.raised`. 입력창·선택 칩 선택 상태(테두리 색이 상태로 바뀌는 곳)는 지금 모양을 유지하고 간격만 토큰으로 바꾼다.
- 테두리 두께, 아이콘 크기, `lineHeight`, `fontSize`, `width/height`는 바꾸지 않는다.
- `Reveal`: `import Reveal from "../components/motion/Reveal";`(components 안 파일은 `"./motion/Reveal"`). 화면 위에서 아래 큰 블록 단위 최대 5단계(`index={0..4}`)로 감싼다. 이미 `Reveal`이 있는 곳은 유지. 리스트 항목·입력창마다 감싸지 않는다. 키보드·포커스·스크롤·FlatList·자동 진행 동작을 깨는 위치는 피한다.
- `OnboardingShell.tsx`는 다른 지시서에서 수정하므로 건드리지 않는다. Shell이 제목 `Reveal`을 갖게 될 예정이므로 이 화면들의 제목에는 `Reveal`을 넣지 말고, 본문 블록(피커·검색 목록·칩 묶음)에만 최대 3단계.
- CityScreen의 검색 입력과 결과 목록(FlatList/스크롤)은 `Reveal`로 감싸지 않는다(포커스·키보드 보호). 검색 박스 바깥 헤더 블록만.

## 제약
- 위 목록 밖 파일 수정 금지. API 호출·저장·`step` 전환 로직 변경 금지.
- 새 의존성 금지. 코드 스타일은 주변과 같게(2칸, 큰따옴표, 세미콜론).
- 문구(i18n 키 포함)·기능·화면 흐름 변경 금지.

## 완료 조건 (`mobile/`에서)
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- 목록 파일에 대해 `grep -nE '(padding|margin|gap|borderRadius)[A-Za-z]*: *[0-9]' <파일들>` → 0줄 (`: 0`은 허용)
