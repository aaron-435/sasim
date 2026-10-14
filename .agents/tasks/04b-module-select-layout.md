# 작업 지시서 04b: 심리테스트 선택 화면 구성 개편

## 목표
`mobile/screens/ModuleSelectScreen.tsx`는 지금 가운데 정렬 제목 아래 "추천 3개"가 같은 모양 카드로, "전체 보기"를 펼치면 나머지가 글 목록으로 나온다. 이걸 **잡지 목차 같은 화면**으로 바꾼다. 추천 첫 번째는 큰 표지 타일, 나머지 둘은 반 폭 타일, 전체 목록은 2열 작은 타일이다. 각 타일에는 모듈 표지 그림 자리(`ModuleArt`)가 있다. 지금은 그림 파일이 없으므로 `ModuleArt`는 큰 번호 + 청자 그라데이션으로 그리고, 나중에 일러스트 파일이 생기면 이 부품 하나만 바꾼다. 기능·문구·추천 로직은 그대로다.

## 수정할 파일 / 새로 만들 파일
작업 디렉터리는 `mobile/`.
- 새 파일 `components/ModuleArt.tsx`
- 수정 `screens/ModuleSelectScreen.tsx`

## 1. `components/ModuleArt.tsx`
- props: `moduleId: string`, `size: "large" | "small"`, `style?`.
- 모듈 번호는 `moduleId`의 숫자(`"module7"` → 7)를 두 자리로(`"07"`).
- 그림: `expo-linear-gradient`로 채운 상자. 반경은 부모가 정한다(`overflow: "hidden"`은 부모 타일이 가짐). 그라데이션 색은 모듈 번호에 따라 아래 3쌍 중 하나를 고른다(`(n - 1) % 3`):
  - `["#1F3327", "#2C4A3A"]`
  - `["#1C2E25", "#3A5A47"]`
  - `["#22352A", "#4A6B57"]`
  `start={{x:0,y:0}} end={{x:1,y:1}}`.
- 번호 텍스트: `FONTS.displayItalic`, large는 72 / small은 40, `COLORS.headline`, `opacity: 0.9`, 오른쪽 아래 정렬(`position: "absolute", right: 14, bottom: 6`), `letterSpacing: -1`, `includeFontPadding: false`.
- 왼쪽 위에 지름 8 점 하나(`COLORS.gold`)를 둔다(장식).
- 파일 위쪽 주석(영어 2줄): 일러스트(`IMAGE_PROMPTS_2026-10-14.md`의 D 묶음)가 들어오면 이 부품에서 `expo-image`로 바꾼다는 것.
- 접근성: 장식이므로 `accessible={false}`, `importantForAccessibility="no-hide-descendants"`, `aria-hidden`.

## 2. 화면
- **헤더**: 가운데 정렬 → 왼쪽 정렬. `heading` 크기 24 → 32, `lineHeight` 40, `letterSpacing: -0.6`(ko일 때 `fontWeight: "700"`, `letterSpacing: -0.8` 추가). 배지 줄(`badgeRow`)은 heading 위에 그대로.
- **추천 첫 번째**: 전체 폭 큰 타일. 위에 `ModuleArt size="large"`(높이 168), 아래 글 영역(제목 20 `FONTS.semibold` / 블러브 14 / 메타 12 `COLORS.subheadline`) + 오른쪽 아래 `ArrowRight`. 타일: `SURFACE.raised`, `RADIUS.lg`, `SHADOW.raised`, `overflow: "hidden"`, 글 영역 여백 `SPACE.lg`.
- **추천 2·3번째**: 한 줄에 두 개, 각 `width: "48%"`. 위에 `ModuleArt size="small"`(높이 96), 아래 제목 16 + 블러브 2줄(`numberOfLines={2}`) + 메타. 타일 스타일은 큰 타일과 같고 반경 `RADIUS.md`. 추천이 2개 이하일 때도 깨지지 않게 한다.
- **전체 보기 토글**: 지금처럼. 펼친 목록(`rest`)은 2열 작은 타일(`width: "48%"`, `minHeight: 120`): 위에 `ModuleArt size="small"`(높이 64), 아래 제목 15 + 블러브 2줄. 홀수면 마지막 타일 전체 폭. 반경 `RADIUS.md`, 배경 `SURFACE.raised`, 그림자 없음.
- 타일 사이 간격 `SPACE.md`, 섹션 사이 `SPACE.xl`.
- 모든 타일은 기존 `PressableScale`(`pressedScale={0.97}`)과 기존 `onPress`·`accessibilityLabel`을 그대로 쓴다.
- **등장**: 헤더 `Reveal index=0`, 추천 섹션 제목·이유 `index=1`, 큰 타일 `index=2`, 반 폭 타일 `index=3, 4`. 펼친 목록 타일은 펼칠 때 `Reveal`로 `delay={i * 40}`.

## 제약
- 건드리면 안 되는 파일: 위 2개 외 전부. i18n 문자열 추가 금지.
- 색은 `COLORS`, `SURFACE`, 위 그라데이션 6색만. 글꼴은 `FONTS`로만.
- 애니메이션은 transform/opacity만(`Reveal`, `PressableScale` 사용, 두 부품은 수정 금지).
- `RECOMMENDED_IDS`, `moduleDisplayTitle`, 추천 이유 로직은 그대로.
- 코드 스타일: 2칸, 큰따옴표, 세미콜론.

## 완료 조건
`mobile/`에서:
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0 (목록 밖 파일 오류는 다른 작업 중이니 무시하고 보고)
- `grep -c "ModuleArt" screens/ModuleSelectScreen.tsx` → 4 이상
