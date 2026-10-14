# 작업 지시서 08a: 그림 자리 연결 A (모듈 표지, 질감, 리포트 원소, 운세 절기)

## 목표
`mobile/components/ArtImage.tsx`(수정 금지)와 `mobile/data/art/manifest.ts`(수정 금지, 지금 `ART_MANIFEST`는 비어 있음)가 이미 있다. 그림 키에 그림이 없으면 `ArtImage`가 `fallback`을 그린다. 아래 자리에 `ArtImage`를 끼우되, **그림이 0장인 지금은 화면이 지금과 완전히 똑같아야 한다**(대체 그림 = 지금 코드 그림 그대로).

## 수정할 파일 / 새로 만들 파일 (작업 디렉터리 `mobile/`, 이 목록만)
- `components/ModuleArt.tsx`
- `components/PatternBackground.tsx`
- `lib/currentSolarTerm.ts` (새)
- `screens/FortuneScreen.tsx`
- `screens/ReportScreen.tsx`

## 1. ModuleArt
- 키: `module{n}-{이름}` 형태의 `ArtKey`. `moduleId`의 숫자 n으로 정한다. 매핑(n → 키): 1 module1-love, 2 module2-money, 3 module3-burnout, 4 module4-mask, 5 module5-followthrough, 6 module6-anger, 7 module7-sensitivity, 8 module8-sleep, 9 module9-family, 10 module10-focus, 11 module11-expression, 12 module12-freshstart. 매핑에 없으면 그림 없이 지금 그대로.
- 지금의 `LinearGradient`+번호 렌더를 `fallback`으로 두고 `<ArtImage artKey=… contentFit="cover" style={style} fallback={…}/>`로 감싼다. 그림이 있으면 `style`(부모가 크기를 줌)이 그대로 적용되고 번호는 안 그린다. 파일 맨 위의 "Placeholder" 주석은 지금 상태에 맞게 고친다.

## 2. PatternBackground
- 지금의 패턴 `Image`는 그대로 두고, 그 위에 질감 `ArtImage`(`texture-hanji`)를 `StyleSheet.absoluteFill`로, 불투명도 0.05, `contentFit="cover"`로 올린다. 그림이 없으면 아무것도 안 그린다(`fallback` 기본값 null). 터치를 가로채지 않는다(ArtImage 쪽이 `pointerEvents="none"`).

## 3. lib/currentSolarTerm.ts (새)
- `export function currentSolarTermArtKey(date: Date): ArtKey` — 기기 로컬 날짜 기준으로 지난 가장 가까운 절기의 그림 키를 돌려준다. 정확한 시각 계산 없이 고정 월/일 표(±1일 오차 허용, 주석으로 명시)를 쓴다: 소한 1/6, 대한 1/20, 입춘 2/4, 우수 2/19, 경칩 3/6, 춘분 3/21, 청명 4/5, 곡우 4/20, 입하 5/6, 소만 5/21, 망종 6/6, 하지 6/21, 소서 7/7, 대서 7/23, 입추 8/8, 처서 8/23, 백로 9/8, 추분 9/23, 한로 10/8, 상강 10/23, 입동 11/7, 소설 11/22, 대설 12/7, 동지 12/22. 키 이름은 `manifest.ts`의 `ART_KEYS`(term-01-ipchun … term-24-daehan)에 있는 것을 쓴다. 1/1~1/5는 전해 동지.
- 반환 타입이 `ArtKey`임을 타입체크가 보장해야 한다(오타 금지).

## 4. FortuneScreen — 오늘 탭 히어로 카드
- 히어로 카드(`heroCardToday`) 안 `RhythmWave` 자리에: 절기 그림이 있으면 그 그림을 카드 안쪽 위쪽에 낮은 띠(높이 약 96, 불투명도 0.55)로 깔고 물결은 그 위에 그대로, 그림이 없으면 지금처럼 물결만. 구현: `<ArtImage artKey={currentSolarTermArtKey(new Date())} contentFit="cover" style={…absolute 띠…} />`를 `RhythmWave` 앞에 형제로 둔다. 그림이 없으면 아무것도 안 그리므로 화면이 지금과 같다. 공유 이미지 캡처(`OverviewShare`) 안에는 넣지 않는다. 다른 탭·다른 부분은 건드리지 않는다(간격 숫자 정리는 다른 항목 몫).

## 5. ReportScreen — 원소 페이지
- 표지(`CoverPage`)의 `ElementMap`/원 장식 영역과, 페이지 중 오행 하나를 주제로 하는 곳이 있으면 거기에 `ArtImage`를 끼운다. 키는 `element-wood|fire|earth|metal|water`. 표지는: 일간 오행(`tint`를 정하는 그 오행)의 `element-*` 그림이 있으면 `ElementMap` 대신 같은 자리·같은 크기에 그린다(`fallback`으로 지금의 `ElementMap`/`Svg` 원 렌더 그대로). 오행 키를 못 정하는 페이지는 건드리지 않는다. 화면당 몇 줄만 바꾼다.

## 제약
- 건드리면 안 되는 파일: 위 목록 밖 전부. 특히 `ArtImage.tsx`, `manifest.ts`, `RhythmWave`, `ElementMap`, 결제·`Purchases.` 관련 코드.
- 새 네이티브 의존성 금지. 코드 스타일은 주변과 같게(2칸, 큰따옴표, 세미콜론). 색은 `COLORS` 토큰, 글꼴은 `FONTS`.
- 문구·기능·흐름 변경 금지.

## 완료 조건
`mobile/`에서
- `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0
- `grep -c "ArtImage" components/ModuleArt.tsx components/PatternBackground.tsx screens/FortuneScreen.tsx screens/ReportScreen.tsx` → 각 1 이상
