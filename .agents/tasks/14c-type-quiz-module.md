# 작업 지시서 14c-type-quiz-module: Type·Quiz·ModuleSelect 숫자 정리 (간격·모서리 숫자를 토큰으로)

## 목표
아래 파일에 남은 직접 쓴 간격·모서리 숫자를 `SPACE`/`RADIUS` 토큰으로 바꾼다. 숫자만 바꾸고 구성·문구·기능·흐름·모션은 그대로 둔다. 1차 개편에서 구성은 이미 끝났다.

## 수정할 파일 (작업 디렉터리 `mobile/`, 이 목록만)
- `screens/TypeScreen.tsx`
- `screens/QuizScreen.tsx`
- `screens/ModuleSelectScreen.tsx`

## 규칙
- 토큰: `theme/tokens.ts`의 `SPACE`(xs4/sm8/md12/lg16/xl24/xxl32/xxxl48), `RADIUS`(sm10/md16/lg24/pill999). 파일에 import가 없으면 `import { SPACE, RADIUS } from "../theme/tokens";`로 추가(이미 있으면 필요한 이름만 보태기).
- `padding*`, `margin*`, `gap`, `rowGap`, `columnGap`, `borderRadius*`의 숫자 리터럴을 모두 토큰으로. 토큰에 없는 값은 가장 가까운 토큰으로(2·3→`SPACE.xs`, 5·6·7→`SPACE.sm`(6은 xs와 동점이면 큰 쪽), 9·10→`SPACE.sm` 또는 `SPACE.md`(10은 md), 14→`SPACE.md`(동점이면 큰 쪽이라 `SPACE.lg`), 18→`SPACE.lg`, 20→`SPACE.xl`(동점이면 큰 쪽), 22→`SPACE.xl`, 26→`SPACE.xl`, 28→`SPACE.xxl`, 36→`SPACE.xxl`, 40→`SPACE.xxl`). 모서리: 4·6·8→`RADIUS.sm`, 12→`RADIUS.sm`(동점 큰 쪽 → `RADIUS.md`는 14 이상일 때), 16→`RADIUS.md`, 20·22→`RADIUS.lg`, 24·28→`RADIUS.lg`, 999→`RADIUS.pill`. 원형 요소(width=height의 절반 반지름)는 `RADIUS.pill`. 0은 그대로. 임의 숫자 추가 금지, `tokens.ts`는 수정하지 않는다.
- 한 줄 스타일(`{ marginTop: 6, gap: 4 }`)도 모두 대상이다. 다중 줄도 같다.
- 테두리 두께, 아이콘 크기, `lineHeight`, `fontSize`, `letterSpacing`, `width`/`height`, `borderRadius`가 아닌 `borderWidth`는 바꾸지 않는다. `paddingTop: "8%"`처럼 문자열 퍼센트도 그대로 둔다.
- JSX 구조, 색, 문구(i18n), 핸들러, API 호출, `Purchases.` 관련 코드는 읽기만 하고 수정하지 않는다.

## 제약
- 위 목록 밖 파일 수정 금지. 새 의존성 금지. 코드 스타일은 주변과 같게(2칸, 큰따옴표, 세미콜론).

## 완료 조건 (`mobile/`에서)
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- 목록 파일에 대해 `grep -nE '(padding|margin|gap|borderRadius)[A-Za-z]*: *[0-9]' <파일들>` 결과에서 `: 0`을 뺀 줄이 0줄
