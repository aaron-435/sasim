# 작업 지시서 05b: 유형 공개 장면 연출

## 목표
온보딩을 마친 새 사용자가 처음 받는 보상이 "유형 공개"(`TypeScreen`의 `variant="reveal"`)다. 지금은 카드가 다른 화면처럼 그냥 나타난다. 이걸 **의식 같은 장면**으로 만든다: 잠깐의 정적 → 카드 뒤로 오행 색 빛 고리가 퍼짐 → 카드가 살짝 뒤집히며 앞면이 드러남 → 유형 이름이 떠오름 → 성공 진동 → 나머지 내용이 차례로 등장. 홈에서 들어가는 일반 유형 화면(`variant="full"`)은 가벼운 등장만 준다. 문구와 동작은 그대로다.

## 새로 만들 파일 / 수정할 파일
작업 디렉터리는 `mobile/`.
- 새 파일 `components/motion/RevealCard.tsx`
- 수정 `screens/TypeScreen.tsx`

## 1. `components/motion/RevealCard.tsx`
- props: `tint: string`(오행 색), `ceremony: boolean`, `children`, `style?`.
- `ceremony === true`일 때 순서(reanimated `withDelay`/`withSequence`/`withTiming`):
  1. 0~300ms: 아무것도 안 보임(카드 opacity 0).
  2. 300ms: 카드 뒤 빛 고리 시작. 카드 뒤에 절대 위치 원(카드 너비 크기, `borderRadius` 원, `borderWidth: 2`, `borderColor: tint`)이 `scale 0.6→1.5`, `opacity 0.6→0`을 900ms(`EASING.exit`)로. 같은 원을 하나 더 200ms 늦게.
  3. 400ms: 카드 `opacity 0→1`, `rotateY "-70deg"→"0deg"`, `scale 0.94→1`을 700ms(`EASING.enter`), `perspective: 1000`을 transform 맨 앞에.
  4. 1100ms: `lib/haptics`의 `success()` 한 번(`runOnJS` 사용 또는 `setTimeout`).
- `ceremony === false`면 카드만 `opacity 0→1, scale 0.98→1` 360ms.
- 동작 줄이기(`lib/useReducedMotion`)면 고리 없음, 카드 바로 보임, 햅틱은 그대로 한 번(ceremony일 때만).
- 고리는 `pointerEvents="none"`, 접근성 숨김.
- `onSettled?: () => void` prop을 받아 카드 애니메이션이 끝나면 한 번 호출한다(아래 2에서 사용).

## 2. `screens/TypeScreen.tsx`
- 98~111줄의 유형 카드 `View`(테두리에 `tint`가 있는 카드)를 `RevealCard`로 감싼다: `<RevealCard tint={tint} ceremony={reveal}>`. 카드 `View`와 그 안쪽은 그대로 둔다.
- **캡처 대상 주의**: 167줄 부근 `ref={cardRef}`의 공유 이미지 뷰는 감싸거나 바꾸지 않는다. `RevealCard`는 98줄의 화면용 카드에만 쓴다.
- ceremony일 때 카드 아래 나머지 블록(공유 카드 미리보기, 공유 버튼, 홈 버튼 등)은 `components/motion/Reveal`로 감싸 카드가 다 드러난 뒤(`delay` 1200ms부터 `index`마다 +60ms) 차례로 등장시킨다. `ceremony`가 아니면 `delay` 200ms부터.
- `revealEyebrow` 문구는 `Reveal delay={0}`로 먼저 나온다.
- `typeName` 스타일: 크기를 지금보다 1.25배(정수로 반올림), `letterSpacing: -0.6`, ko일 때 `fontWeight: "700"`. (이 파일에서 locale을 얻는 기존 방식을 쓴다.)

## 제약
- 건드리면 안 되는 파일: 위 2개 외 전부. i18n 추가 금지.
- `captureRef` 대상 뷰(공유 이미지) 안쪽 스타일·구조 변경 금지.
- 색은 `tint`(오행 색), `COLORS`만. 글꼴은 `FONTS`로만.
- 애니메이션은 transform/opacity만(빛 고리 포함).
- 코드 스타일: 2칸, 큰따옴표, 세미콜론. 기본 내보내기.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0 (목록 밖 오류는 다른 작업 중이니 무시하고 보고)
- `grep -c "RevealCard" screens/TypeScreen.tsx` → 2 이상
- `git diff screens/TypeScreen.tsx` 에서 `cardRef`가 붙은 줄과 그 안쪽은 변경 없음
