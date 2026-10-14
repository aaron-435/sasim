# 작업 지시서 08b: 그림 자리 연결 B (유형 공개 일간 그림, 빈 화면·오류)

## 목표
`mobile/components/ArtImage.tsx`(수정 금지)와 `mobile/data/art/manifest.ts`(수정 금지, 지금 `ART_MANIFEST`는 비어 있음)가 이미 있다. 그림 키에 그림이 없으면 `ArtImage`가 `fallback`을 그린다. 아래 자리에 `ArtImage`를 끼우되, **그림이 0장인 지금은 화면이 지금과 완전히 똑같아야 한다**.

## 수정할 파일 (작업 디렉터리 `mobile/`, 이 목록만)
- `screens/TypeScreen.tsx` (유형 공개 `reveal` 모드 포함. `TypeRevealScreen.tsx`는 이 화면을 감싸기만 하면 수정 불필요, 필요할 때만)
- `screens/JournalScreen.tsx`
- `screens/CompatibilityScreen.tsx`
- `screens/MyReportsScreen.tsx`
- 오류 화면: 앱에서 네트워크/일반 오류를 글자만 보여 주는 대표 자리 하나를 `grep -rn "error" screens components`로 찾아 그곳 한 군데(`App.tsx` 또는 `components/`의 오류 부품). 찾기 어려우면 건너뛰고 보고에 적는다.

## 1. TypeScreen — 일간 그림
- 유형 공개 화면 히어로 카드의 "지금의 빛 고리/원소 아이콘" 자리(`ArchetypeIcon` 등)에: 일간 글자에 맞는 `daymaster-*` 키의 그림이 있으면 그것을 같은 자리·비슷한 크기(가로 최대 240)에 그리고, 없으면 지금 렌더 그대로(`fallback`).
- 일간 → 키: 갑 daymaster-gap, 을 daymaster-eul, 병 daymaster-byeong, 정 daymaster-jeong, 무 daymaster-mu, 기 daymaster-gi, 경 daymaster-gyeong, 신 daymaster-sin, 임 daymaster-im, 계 daymaster-gye. 일간 글자(천간 한글 또는 한자)를 이 화면이 이미 가진 값(`sajuType`, `dayMaster` 등)에서 얻는다. 한자면 甲乙丙丁戊己庚辛壬癸 순으로 같은 매핑을 쓴다. 못 얻으면 그림 없이 지금 그대로.
- 공유 이미지 캡처 영역 안에는 넣지 않는다.

## 2. 빈 화면 그림
- `JournalScreen.tsx`의 `count === 0` 빈 상태 글자 위에 `empty-journal`, `CompatibilityScreen.tsx`의 받은 궁합 목록이 비었을 때(빈 상태 글자가 있으면 그 위, 없으면 건너뛰기) `empty-compat`, `MyReportsScreen.tsx`의 빈 상태 글자 위에 `empty-reports`. 크기 약 120×120 가운데 정렬, 불투명도 0.9. 그림이 없으면 아무것도 안 그림(지금과 같음). 기존 문구는 그대로.

## 3. 오류 그림
- 위에서 찾은 한 곳에 `error-network`(네트워크 오류일 때) 또는 `error-generic`을 같은 방식으로 글자 위에 끼운다.

## 제약
- 건드리면 안 되는 파일: 위 목록 밖 전부. `ArtImage.tsx`, `manifest.ts`, 결제·`Purchases.` 관련 코드.
- 새 네이티브 의존성 금지. 코드 스타일은 주변과 같게(2칸, 큰따옴표, 세미콜론). 색은 `COLORS`, 글꼴은 `FONTS`. 간격 숫자는 새로 쓰는 곳만 `theme/tokens.ts`의 `SPACE`/`RADIUS`를 쓴다(기존 숫자 정리는 다른 항목 몫).
- 문구·기능·흐름 변경 금지.

## 완료 조건
`mobile/`에서
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -c "ArtImage" screens/TypeScreen.tsx screens/JournalScreen.tsx screens/CompatibilityScreen.tsx screens/MyReportsScreen.tsx` → 각 1 이상
