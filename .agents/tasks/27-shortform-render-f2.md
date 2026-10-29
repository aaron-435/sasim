# 작업 지시서 27: 숏폼 F2 렌더 템플릿 (유형 × 관계 카드 묶음)

## 목표
설정 파일 하나(`marketing/shortform/produce/<key>.json`, 형식 F2)로 두 사주 유형의 관계 카드 묶음을 만드는 `scripts/shortform/render-f2.mts`를 만든다. 결과물 3가지:
- Instagram 캐러셀 PNG(1080×1350) 여러 장
- TikTok 사진 게시물 PNG(1080×1920) 여러 장
- YouTube Shorts용 슬라이드 mp4(1080×1920, 무음 트랙, 카드당 3초)

카드 문장은 **앱에 이미 있는 영어 문구만** 쓴다. 스크립트가 원문 일치와 관계 계산 일치를 검사한다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/shortform/render-f2.mts`
- 새로: `marketing/shortform/produce/F2-sample.json`, `F2-sample2.json`, `F2-sample3.json` (3세트, 아래 "설정")
- 그 외 파일은 건드리지 않는다. 특히 `scripts/shortform/common.mts`, `check-copy.mts`, `render-f1.mts`, `mobile/`, `lib/` 는 수정 금지. 바꿀 점은 마지막 보고에 적는다.
- 다른 muse 작업이 같은 폴더에서 동시에 `render-f4.mts`, `render-f6.mts`를 만들고 있다. 그 파일 오류는 무시하고 고치지 않는다.
- `.env*` 파일은 열거나 출력하지 않는다.

## 사용법 (파일 첫 주석에 적기)
```
node --import tsx scripts/shortform/render-f2.mts <key> [--check]
```
- `--check`: 브라우저 없이 설정·원문·관계 검사만 하고 카드 목록(카드 번호, 문장)을 출력한 뒤 exit 0. **너(muse)는 이 모드로만 실행해 확인한다.**
- 출력: `marketing/video/<key>/ig-01.png …`, `marketing/video/<key>/tt-01.png …`, `marketing/video/<key>.mp4`.

## 재사용
`scripts/shortform/common.mts`를 먼저 읽는다. `loadForFormat("F2", "render-f2.mts")`(형식·문구 점검), `ROOT`, `OUT_DIR`, `makeTmp`, `silentAudio`, `launch`, `FONT_CSS`, `COLORS`를 쓴다. 단 `loadForFormat`은 `--check`를 모르는 인자로 보고 오류를 낸다. 그러니 `--check`는 `process.argv`에서 먼저 빼고 부르거나, 같은 일을 하는 짧은 코드를 쓴다(`loadConfigFile` + `checkConfig`, common.mts는 고치지 않는다).

## 설정 (F2 규칙, 스크립트가 검사)
- `birth: null`, `script: []`, `aiVoice: false`.
- `hook`: 표지 카드 큰 글자(새 문장이라 check-copy 전체 규칙 적용).
- `onScreen[0]`: 두 유형 이름 `"<A> × <B>"` (영어 archetype 이름, 예 `"Oak × Field"`). 이름은 `mobile/lib/sajuTypeContent.ts`의 `SAJU_TYPE_CONTENT.en.archetypes[*].name`. A가 "나", B가 "상대"다.
- `onScreen[1..]`: 카드 문장 2~6개. 각 문장은 아래 중 하나와 **글자까지 같아야** 한다:
  - 관계(A→B) 문구: `COMPATIBILITY_CONTENT.en.relations[relation].headline | body | goodPoint` (`mobile/lib/compatibilityContent.ts`). `caution`과 `bondNote`는 쓰지 않는다.
  - A 또는 B의 `tagline`.
- 관계 계산: `lib/compatibility.ts`의 `calculateCompatibility(stemA, stemB).relation`. archetype → 천간은 `lib/sajuType.ts`의 순서(갑 oak, 을 vine, 병 sun, 정 flame, 무 mountain, 기 field, 경 steel, 신 gem, 임 ocean, 계 dew). 스크립트 안의 이 표가 맞는지 `classifySajuType(stem, {wood:1,fire:1,earth:1,metal:1,water:1})?.archetype`으로 시작할 때 한 번 확인한다(어긋나면 오류).
- 관계가 다른 쌍의 문구를 쓰면 `onScreen[i]: not app copy for <A> × <B> (<relation>)` 오류로 exit 1. % 점수(`score`)는 어디에도 쓰지 않는다.
- 원문 일치 검사는 check-copy의 `APP_COPY_EN`이 아니라 위 규칙(그 쌍에 맞는 문구)으로 따로 한다.

샘플 3세트(관계 종류가 서로 다르게):
- `F2-sample`: `Oak × Field` (나무가 흙을 누름 → selfChallengesOther), utmPlatform `tiktok`
- `F2-sample2`: `Sun × Field` (불이 흙을 살림 → selfNurturesOther), utmPlatform `instagram`
- `F2-sample3`: `Ocean × Dew` (같은 물 → mirror), utmPlatform `youtube`
- 각 세트 onScreen: 유형 이름 줄 + headline + goodPoint + A tagline + B tagline 정도. 해시태그 3~5개, 캡션에 `link in bio`. 사실을 지어내지 않는다.
- 쓰고 나서 `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` 이 0 failed.

## 카드 구성
1. 표지: 두 유형 그림을 나란히(일간 그림 `public/art/daymaster-<로마자>.webp`, 갑 gap·을 eul·병 byeong·정 jeong·무 mu·기 gi·경 gyeong·신 sin·임 im·계 gye; data URL로 넣는다), 그 아래 `onScreen[0]` (Newsreader), 그 아래 `hook`.
2. 문장 카드: `onScreen[1..]` 한 장에 하나. 위쪽 작은 글자로 `onScreen[0]`(어느 쌍인지), 가운데 문장. headline은 Newsreader 큰 글자, 나머지는 Plus Jakarta Sans. tagline 카드는 그 유형 그림을 작게 곁들인다.
3. 마지막: `Link in bio` / `Fatesaid` 카드(render-f1의 끝 카드 모양).
- 색·글꼴: Celadon & Hanji(`COLORS` from `mobile/theme/colors.ts`, 새 색 만들지 않기), 글꼴은 `FONT_CSS`의 `NR`(Newsreader 500, italic 포함)과 `PJS`(Plus Jakarta Sans). 배경 `COLORS.background`, 제목 `COLORS.headline`, 강조 `COLORS.gold`, 테두리 `COLORS.border`.
- 글자는 양옆 여백 안에서 줄바꿈되고 잘리지 않아야 한다. 1080×1350과 1080×1920은 같은 카드 HTML을 높이만 바꿔 쓴다(세로 가운데 정렬). 렌더 뒤 각 카드에서 본문 요소의 `scrollHeight > clientHeight`면 오류(잘림 방지).
- PNG: Playwright `page.setContent` + `page.screenshot`. viewport 540×675 / 540×960, `deviceScaleFactor: 2`. 결과 PNG 크기를 `ffprobe`나 PNG 헤더로 확인해 1080×1350 / 1080×1920이 아니면 오류.
- mp4: TikTok용 PNG를 카드당 3초로 이어 붙인다(ffmpeg concat, fps 30, libx264 crf 18, yuv420p) + `silentAudio`. 35초 넘으면 오류.
- 콘솔 마지막 줄: `ok <key> <relation> <카드 수> cards, ig+tt png, <mp4 길이>s`.

## 제약
- 주석 밀도·명명은 `render-f1.mts`와 맞춘다(영어 주석, 첫 블록 주석에 목적·사용법).
- 새 npm 패키지 금지. 이 템플릿은 mobile-web을 쓰지 않는다(HTML을 직접 그린다).
- 화면 글자는 설정 파일과 앱 원문에서만 온다(예외: `Link in bio`, `Fatesaid`, `×`).

## 완료 조건 (muse가 직접 실행)
샌드박스에서 브라우저가 안 뜨므로 렌더는 하지 않는다(이 세션이 한다).
1. `node --import tsx scripts/shortform/render-f2.mts F2-sample --check` (sample2, sample3도) → 각각 관계 이름과 카드 목록 출력, exit 0.
2. 일부러 틀린 경우: 임시로 다른 관계의 headline을 넣은 설정을 스크립트 안이 아닌 임시 파일로 만들어 `--check` → exit 1과 오류 문구 확인 후 임시 파일 삭제. (임시 파일은 `marketing/shortform/produce/` 밖, 예: `/tmp`가 아니라 `marketing/video/.tmp-f2check/`에 두고 지운다. 이 경우 키 검사 때문에 파일 이름=key로 맞춘다.)
3. `npx tsc --noEmit 2>&1 | grep -E "render-f2" ; echo done` → 오류 없음.
4. `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/F1-sample.json marketing/shortform/produce/F2-sample*.json` → `4 files, 0 failed`.
- git commit 하지 않는다.

## 참고
- 범위·규칙: `SPEC.md`, `TODO.md` 4번. "나쁜 궁합" 표현과 % 금지.
