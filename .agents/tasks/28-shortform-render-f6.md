# 작업 지시서 28: 숏폼 F6 렌더 템플릿 (한 줄 문구 카드 + 생성 그림 배경)

## 목표
설정 파일 하나(`marketing/shortform/produce/<key>.json`, 형식 F6)로 7~12초 세로 영상(1080×1920, 무음 트랙)을 만드는 `scripts/shortform/render-f6.mts`를 만든다. 배경은 앱이 그 생년월일로 그리는 생성 그림("element map", 오행 꽃잎 무늬)이 천천히 도는 화면이고, 그 위에 그 사람 유형의 **앱 원문 tagline 한 줄**과 계정 이름을 얹는다. 음원은 게시할 때 플랫폼에서 고르므로 무음 트랙만 둔다.

F3 템플릿(다음 작업)이 같은 배경을 쓰므로, 배경 그리는 부분은 **`scripts/shortform/art-layer.mts`** 로 따로 만든다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/shortform/art-layer.mts`, `scripts/shortform/render-f6.mts`
- 새로: `marketing/shortform/produce/F6-sample.json`, `F6-sample2.json` (렌더 2개용)
- 그 외 파일은 건드리지 않는다. 특히 `scripts/shortform/common.mts`, `check-copy.mts`, `render-f1.mts`, `mobile/` 수정 금지. 바꿀 점은 마지막 보고에 적는다.
- 다른 muse 작업이 같은 폴더에서 동시에 `render-f2.mts`, `render-f4.mts`를 만들고 있다. 그 파일 오류는 무시하고 고치지 않는다.
- `.env*` 파일은 열거나 출력하지 않는다.

## 재사용
`scripts/shortform/common.mts`를 먼저 읽는다.
- `elementMap(birth)` → `{ svg, typeName }`: 그 생년월일로 mobile-web 온보딩을 화면 밖에서 돌려 Home의 그림 SVG와 유형 이름("Dew · Order")을 가져온다(캐시됨). **그림을 새로 그리지 않는다.** 이 SVG를 그대로 크게 키워 쓴다.
- `loadForFormat("F6", "render-f6.mts")`, `makeTmp`, `silentAudio`, `launch`, `recorder`(`start/at/finish`), `FONT_CSS`, `COLORS`, `OUT_DIR`. `--no-tts` 인자는 F6에서 의미가 없지만 받아도 된다(무시).

## art-layer.mts (F3도 쓴다)
- `export function artLayerHtml(svg: string, opts?: { dim?: number }): { css: string; html: string }`
  - 540×960 화면 기준. 배경 `COLORS.background`. SVG를 가로 약 120%(648px) 크기로 화면 가운데보다 조금 위(세로 40% 지점)에 둔다. 가장자리는 화면 밖으로 살짝 나가도 된다.
  - 아주 느린 회전: 360도 / 60초, linear, 무한(CSS animation). `opts.dim`(0~1, 기본 0)만큼 위에 `COLORS.background` 반투명 막을 덮어 글자 대비를 확보한다.
  - 장식이라 `aria-hidden="true"`.
- 짧은 영어 주석: 앱의 ElementMap을 그대로 키운 것이고 영상용 회전은 앱(90초/바퀴)보다 조금 빠르다는 것.

## 설정 (F6 규칙, render-f6가 검사)
- `birth` 필수, `script: []`, `aiVoice: false`.
- `hook`: 위쪽 작은 라벨(새 문장, check-copy 전체 규칙). 예: `A saju type in one line`.
- `onScreen[0]`: 그 생년월일 유형의 archetype `tagline` 원문(`SAJU_TYPE_CONTENT.en.archetypes[*].tagline`, `mobile/lib/sajuTypeContent.ts`). `elementMap(birth).typeName`의 첫 단어(예 `Dew`)가 archetype 이름이고, 그 archetype의 tagline과 글자까지 같아야 한다. 다르면 `onScreen[0]: not the <Dew> tagline` 오류로 exit 1.
- `onScreen[1]` (선택): 유형 이름. 있으면 `typeName`과 같아야 한다.
- 개수가 0개이거나 2개 초과면 오류.

샘플 2개(생년월일이 서로, 그리고 F1-sample 1994-08-21과도 달라야 한다):
- `F6-sample`: birth `{"date":"1997-05-26","time":null,"city":"Madrid"}`, utmPlatform `tiktok`
- `F6-sample2`: birth `{"date":"1985-02-11","time":"21:45","city":"São Paulo"}`, utmPlatform `instagram`
- tagline은 아직 모르므로(유형은 렌더해야 나온다) 우선 `onScreen`을 비우지 말고 아무 archetype tagline을 넣어 두고, 보고에 "렌더 때 이 세션이 맞는 tagline으로 바꾼다"고 적는다. 캡션에 `link in bio`, 해시태그 3~5개. `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` 이 0 failed.

## 화면 구성 (540×960 @2x 페이지를 `page.setContent`로 만들고 `recorder`로 녹화)
- 배경: `artLayerHtml(svg, { dim: 0.35 })`.
- 위쪽(세로 14% 근처): `hook` — PJS 700, 18px, 글자 간격 넓게, `COLORS.gold`.
- 아래쪽(세로 62~78%): `onScreen[0]` — Newsreader italic 500(`NR`), 40px 근처, `COLORS.headline`, 가운데 정렬, 양옆 여백 32px 안에서 줄바꿈.
- 그 아래 작게: `onScreen[1]`이 있으면 PJS 500, `COLORS.subheadline`.
- 맨 아래(세로 90%): `@fatesaidapp` — PJS 700 16px, `COLORS.footer`.
- 등장: tagline은 0.4초에 0.6초 페이드인(opacity만). 다른 움직임은 배경 회전뿐.
- 길이: 환경 변수 `F6_SECONDS`(기본 9). 7~12 밖이면 오류.
- 녹화: `launch()`로 페이지 → `page.setContent(...)` → 글꼴 로드 대기(`document.fonts.ready`) → `rec.start()` → `rec.at(seconds)` → `rec.finish(OUT_DIR/<key>.mp4, silentAudio(tmp, seconds), 12.5)`.
- 녹화 전 검사: tagline 요소의 `scrollHeight > clientHeight`면 오류(잘림).
- 콘솔 마지막 줄: `ok <출력> <길이>s, type=<typeName>`.

## 제약
- 주석 밀도·명명은 `render-f1.mts`와 맞춘다(영어 주석, 첫 블록 주석에 목적·사용법·"art comes from mobile-web's ElementMap" 설명).
- 새 npm 패키지 금지. 새 색 금지(`COLORS`만).
- 화면 글자는 설정 파일과 앱 원문에서만 온다(예외: `@fatesaidapp`).

## 완료 조건 (muse가 직접 실행)
샌드박스에서 브라우저·localhost가 막혀 렌더는 하지 않는다(이 세션이 한다).
1. `npx tsc --noEmit 2>&1 | grep -E "render-f6|art-layer" ; echo done` → 오류 없음.
2. `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/F1-sample.json marketing/shortform/produce/F6-sample*.json` → `3 files, 0 failed`.
3. `npx tsx scripts/shortform/check-copy.test.mts` → `ok`.
- git commit 하지 않는다.

## 참고
- 범위·규칙: `SPEC.md`, `TODO.md` 5번.
