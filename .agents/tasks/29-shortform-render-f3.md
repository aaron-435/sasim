# 작업 지시서 29: 숏폼 F3 템플릿(날짜 카드) + 절기 날짜표

## 목표
1. 엔진(`lib/solarTerms.ts`)에서 2026-11-01 ~ 2027-02-28 절기 시각을 뽑아 KST·UTC로 적고, Year Wrapped(12/1)·2027 신년을 더한 날짜표 `marketing/shortform/dates.md`를 만드는 `scripts/shortform/solar-term-dates.mts`.
2. 설정 파일 하나(형식 F3)로 날짜 텍스트 카드 3~4장을 생성 그림 배경 위에 차례로 보이는 세로 영상(1080×1920, 35초 이하)을 만드는 `scripts/shortform/render-f3.mts`. AI 음성은 선택(`aiVoice`).

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/shortform/solar-term-dates.mts`, `scripts/shortform/render-f3.mts`, `marketing/shortform/dates.md`(스크립트가 만든다), `marketing/shortform/produce/F3-sample.json`
- 그 외 파일은 건드리지 않는다. 특히 `lib/solarTerms.ts`(엔진), `scripts/shortform/common.mts`, `art-layer.mts`, `check-copy.mts`, `render-f*.mts`, `mobile/` 수정 금지. 바꿀 점은 마지막 보고에 적는다.
- `.env*` 파일은 열거나 출력하지 않는다.

## 1. solar-term-dates.mts
- 사용법: `npx tsx scripts/shortform/solar-term-dates.mts` → `marketing/shortform/dates.md`를 다시 쓰고, 표를 콘솔에도 출력.
- `upcomingSolarTerms(new Date("2026-11-01T00:00:00Z"), …)`로 2027-02-28 KST 끝까지의 24절기를 뽑는다. 이름: 영어는 `mobile/lib/elementColorContent.ts`의 `SOLAR_TERM_NAMES.en`, 한국어는 `.ko`. 각 행: 영어 이름, 한국어 이름, KST 시각(`YYYY-MM-DD HH:mm KST`), UTC 시각, 미국 동부(America/New_York) 날짜, 월을 여는 절기 여부(`opensMonth`), 계절 오행(`seasonElement`).
  - 시간대 변환은 `Intl.DateTimeFormat`(timeZone 옵션)으로 한다. 손으로 +9 하지 않는다.
- 표 아래에 고정 날짜 2개: `2026-12-01 Year Wrapped 공개`(앱 기능), `2027-01-01 신년`.
- dates.md 첫머리에: 생성 명령, 생성 시각, "엔진 lib/solarTerms.ts 출력, 손으로 고치지 말 것", 그리고 게시 날짜를 정할 때 북미 시청자는 미국 동부 날짜를 본다는 한 줄.
- 같은 파일 끝에 교차 확인 한 줄: `findSolarLongitudeCrossing(225, …)`(입동)과 `(270, …)`(동지)를 직접 불러 얻은 시각이 표의 입동·동지와 같은지 `check: lidong ok, dongzhi ok`처럼 적는다. 다르면 스크립트가 exit 1.
- `export function solarTermDates(fromIso: string, toIso: string)`로 행 목록을 돌려주는 함수를 내보내 render-f3가 쓴다.

## 2. render-f3.mts
사용법: `node --import tsx scripts/shortform/render-f3.mts <key> [--no-tts]` (mobile-web 필요: 배경 그림을 처음 한 번 가져올 때).

재사용(먼저 읽기): `scripts/shortform/common.mts`(`loadForFormat("F3", …)`, `makeTmp`, `voiceAudio`, `silentAudio`, `sentenceStarts`, `launch`, `recorder`, `elementMap`, `FONT_CSS`, `CTA_CSS`/`addCta`/`showCta`, `COLORS`, `OUT_DIR`), `scripts/shortform/art-layer.mts`(`artLayerHtml(svg, { dim })` — 생성 그림 배경, F6과 같음).

설정(F3 규칙, 스크립트가 검사):
- `birth` 필수(배경 그림의 주인). `onScreen` 3~4개 = 카드 문장. `hook` = 첫 카드 위 큰 글자.
- `aiVoice: true`면 `script` 문장 수 = `onScreen` 수 + 1(첫 문장은 훅 동안, 마지막 문장 동안 CTA)이어야 한다. `aiVoice: false`면 `script: []`이고 카드당 3초 + CTA 1.5초.
- **날짜 일치 검사**: 카드 문장에 절기 영어 이름(`SOLAR_TERM_NAMES.en` 값)이 있고 `Nov 7`처럼 "월 약자 + 일"이 함께 있으면, 그 날짜가 `solarTermDates`의 KST 날짜 또는 미국 동부 날짜와 같아야 한다. 다르면 `onScreen[i]: <이름> is <KST>/<ET>, not <적은 날짜>` 오류로 exit 1. `Dec 1`이 `Wrapped`와 함께 나오면 12월 1일인지도 본다.
- 문장은 "리듬·흐름" 표현만(예언 금지). check-copy가 이미 막으니 `loadForFormat`이 통과하면 된다.

화면(540×960 @2x, `page.setContent`로 직접 그린 페이지, mobile-web 화면 녹화 아님):
- 배경: `elementMap(birth).svg` → `artLayerHtml(svg, { dim: 0.45 })`.
- 0초: `hook`을 가운데 큰 글자(Newsreader 500, `NR`, 38px 근처, `COLORS.headline`).
- 이후 카드: `onScreen[i]`를 한 장씩, 가운데 글자 상자(배경 `COLORS.background` 85% 불투명, 테두리 `COLORS.border`, 둥근 모서리). 카드 위에 작은 날짜 라벨은 넣지 않는다(문장 자체에 날짜가 있다). 전환은 0.25초 페이드(opacity만).
- 음성 있으면: 카드 i는 `starts[i+1]`에 바뀐다. 자막은 따로 깔지 않는다(카드 글자가 자막 역할).
- 끝: 마지막 1.5초 `showCta`.
- 맨 아래 `@fatesaidapp` 작게(F6과 같은 모양).
- 녹화 전 각 카드 요소의 `scrollHeight > clientHeight`면 오류(잘림).
- `rec.finish(OUT_DIR/<key>.mp4, audio, 35)`. 콘솔 마지막 줄: `ok <출력> <길이>s, <카드 수> cards, voice=<yes|no>`.

F3-sample.json: key `F3-sample`, birth `{"date":"2001-12-09","time":"09:10","city":"Sydney"}`, 주제는 동지(Winter Solstice) — dates.md에서 날짜를 가져와 카드 3장(예: 무슨 날인지, 앱이 이 날을 계절 흐름의 전환점으로 본다는 것, 앱에서 자기 흐름을 볼 수 있다는 것). aiVoice true, script 4문장, utmPlatform `tiktok`, 캡션에 `link in bio`와 `Voiceover is AI-generated.`, 해시태그 3~5개. 예언·운·정확도·시청자 단정 표현 금지. `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` 0 failed.

## 제약
- 주석 밀도·명명은 `render-f1.mts`와 맞춘다(영어 주석, 첫 블록 주석에 목적·사용법).
- 새 npm 패키지 금지. 새 색 금지.

## 완료 조건 (muse가 직접 실행)
샌드박스에서 브라우저·localhost가 막혀 렌더는 하지 않는다(이 세션이 한다).
1. `npx tsx scripts/shortform/solar-term-dates.mts` → dates.md 생성, 마지막 줄 `check: lidong ok, dongzhi ok`.
2. `npm run validate:manseryeok` → 통과(엔진은 안 바꿨으니 그대로).
3. `npx tsc --noEmit 2>&1 | grep -E "render-f3|solar-term-dates" ; echo done` → 오류 없음.
4. `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` → 0 failed.
- git commit 하지 않는다.

## 참고
- 범위·규칙: `SPEC.md`, `TODO.md` 6번.
