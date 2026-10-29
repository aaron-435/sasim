# 작업 지시서 26: 숏폼 F4 렌더 템플릿 (전/후: 심리 검사 결과 → 사주 유형 카드)

## 목표
설정 파일 하나(`marketing/shortform/produce/<key>.json`, 형식 F4)로 세로 영상 1개(1080×1920, 35초 이하, 음성 트랙)를 만드는 `scripts/shortform/render-f4.mts`를 만든다. 화면은 mobile-web(http://localhost:8082)에서 새 사용자가 **심리 검사 하나를 끝내 결과 카드("전")를 보고, 이어서 같은 사람의 사주 유형 카드("후")를 보는** 녹화다. 0초부터 앱 화면이다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/shortform/render-f4.mts`
- 새로: `marketing/shortform/produce/F4-sample.json` (아래 "설정" 참고)
- 그 외 파일은 건드리지 않는다. 특히 `scripts/shortform/common.mts`, `check-copy.mts`, `render-f1.mts`, `scripts/record-*.mts`, `mobile/` 는 수정 금지. common.mts에 바꿀 점이 있으면 코드 대신 마지막 보고에 적는다.
- 다른 muse 작업이 같은 폴더에서 동시에 `render-f2.mts`, `render-f6.mts`를 만들고 있다. 그 파일의 오류는 무시하고 고치지 않는다.
- `.env*` 파일은 열거나 출력하지 않는다.

## 재사용 (반드시)
`scripts/shortform/common.mts`를 먼저 끝까지 읽는다. 아래를 그대로 쓴다. 같은 기능을 새로 짜지 않는다.
- `loadForFormat("F4", "render-f4.mts")` → `{ key, noTts, config }` (형식·문구 점검 포함)
- `makeTmp`, `voiceAudio(key, config.script, noTts, tmp)`, `sentenceStarts`, `launch`, `guardProd`, `recorder(ctx, page, tmp)` (`start/cut/resume/at/elapsed/finish`), `onboardOffCamera(page, birth)`, `maskCelebrities`, `celebrityAboveMask`, `FONT_CSS`, `CTA_CSS`/`addCta`/`showCta`, `COLORS`, `OUT_DIR`, `baseUrl`
- 자막·훅 오버레이 모양은 `render-f1.mts`의 `#rec-hook`, `#rec-cap`과 같게(같은 CSS 값). 실패 처리(`fail`: 브라우저 닫고 tmp 지우고 exit 1)도 render-f1과 같은 모양.

## 설정 (F4 규칙, 스크립트가 검사)
- `birth` 필수(날짜·시간·도시). `aiVoice: true`, `script` 4~6문장.
- `onScreen`은 정확히 3개: `[검사 이름, 전 라벨, 후 라벨]`.
  - `onScreen[0]`: 앱 검사 목록에 보이는 이름 그대로(예: `Burnout`, `Sleep`, `Focus`, `Money`, `Anger`, `The Mask`, `Love & Attachment`). 목록에 없으면 오류.
  - `onScreen[1]`, `onScreen[2]`: 결과 카드·유형 카드 위에 띄우는 배지 글자(예: `Psych test result`, `Saju type, same person`).
- 개수가 다르면 `F4 needs onScreen [test, beforeLabel, afterLabel]` 오류로 exit 1.

`F4-sample.json`: key `F4-sample`, birth `{"date":"1988-11-03","time":"15:20","city":"Chicago"}`, 검사 `Sleep`, utmPlatform `instagram`, aiVoice true, 해시태그 3~5개(`#saju` 포함). 문장은 SPEC 규칙을 따른다: 정확도·예언·불운 표현 금지, 시청자 감정 단정("you're…", "pov") 금지, 가짜 후기 1인칭 금지. 캡션에 `link in bio`와 `Voiceover is AI-generated.` 포함. 쓰고 나서 `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` 이 0 failed가 될 때까지 문장을 고친다(규칙을 풀지 말고 단어를 바꾼다).

## 장면 (실제 화면에서 확인한 선택자)
준비(화면 밖):
1. `launch()` → `guardProd(page)` → 추가 안전장치: `page.on("request")`로 `fatesaidapp.com`에 가는 요청 중 GET이 아니고 `/api/saju`·`/api/events`도 아닌 것이 있으면 오류로 멈춘다(운영 DB 쓰기 방지).
2. `onboardOffCamera(page, birth)` → `page.getByRole("button", { name: "Go home" }).click()`.
3. `page.getByText("Choose a test").click()` → `page.getByText("Which psych test would you like to take?").waitFor()`.
4. 검사 이름이 안 보이면 `page.getByText(/^All tests/).first().click()`. 그다음 `page.getByText(test, { exact: true }).first()`를 `scrollIntoViewIfNeeded()`.
5. 스타일·오버레이 추가: `FONT_CSS`, `CTA_CSS`, `#rec-hook`(훅), `#rec-cap`(자막), `#rec-badge`(배지, `record-app-ab.mts`의 `#rec-badge` 모양), `addCta(page)`.

촬영(`rec.start()`부터 영상 시계 시작):
- S0 (0초~): 검사 목록 화면 + 위쪽 훅 + 아래 자막 1문장.
- S1 (`starts[1]` 0.7초 전): 검사 타일 클릭 → `^1 / 30$` 대기. 배지 `onScreen[1]`은 아직 숨김. 1·2번 문항을 화면에서 답한다(답 사이 0.28초). 답하는 방법은 `record-app-ab.mts`의 `answer()`를 그대로 옮긴다(슬라이더면 좌/우 끝 클릭 후 `Next`, 아니면 선택지 버튼). 각 문항을 높게/낮게 답할지는 `birth.date` 숫자로 정한다(예: 문항 i는 날짜 숫자들의 합 + i 가 짝수면 높게). 영상마다 결과가 달라지게 하려는 것이다.
- 3~30번은 `rec.cut()` 뒤 화면 밖에서 답하고 `Your first blueprint is ready` 대기 + 600ms → `rec.resume()`.
- S2 (`starts[2]` 근처): 결과 카드. 훅 숨기고 배지 `onScreen[1]` 보이기. 최소 2.5초 유지.
- S3 (`starts[3]` 0.6초 전): `rec.cut()` → `page.goto(baseUrl() + "/")` (저장된 상태라 Home으로 열린다) → `page.getByRole("button", { name: / · / }).first().click()` (Home의 유형 타일, aria-label이 "Dew · Order" 형태) → `Back` 버튼이 보일 때까지 대기 + 1.2초 → 오버레이(자막·배지·CTA)를 다시 붙인다(페이지를 새로 열었으니 DOM이 비었다) → `maskCelebrities(page)`(유형 화면은 유명인 라벨이 첫 화면 아래 1290px 근처라 마스크는 맨 아래 띠만 된다) → `celebrityAboveMask(page, top, OUT_DIR/.type-<key>.png)`가 true면 오류 → 화면의 유형 이름(35px 글자, render-f1의 `typeName` 읽는 방법과 같음)을 읽는다 → `rec.resume()`. 배지 `onScreen[2]`. 최소 2.5초 유지.
- 마지막 문장: render-f1과 같은 방식으로 끝 1.5초 `showCta(page)`.
- `rec.finish(OUT_DIR/<key>.mp4, audio, 35)`. tmp 삭제.
- 콘솔 마지막 줄: `ok <출력> <길이>s, <자막 수> captions, test=<검사>, result=<결과 카드 제목>, type=<유형 이름>`. 결과 카드 제목은 결과 화면에서 Newsreader 큰 제목(예: `Steady Pace`)을 읽는다(못 읽으면 `?`).

문장 수가 4개면 S3은 `starts[3]`, CTA도 마지막 문장(=3번)에 겹친다. 이때 유형 카드는 최소 2.5초 유지 뒤 CTA(render-f1의 `ctaAt` 계산과 같은 방식).

## 제약
- 주석 밀도·명명은 `render-f1.mts`와 맞춘다(영어 주석, 첫 블록 주석에 목적·사용법·"web rendering of the RN app, not the native build" 경고, 운영 보호 설명).
- 새 npm 패키지 금지. `?qa=` 파라미터 쓰지 않음.
- 화면 글자는 설정 파일에서만 온다(예외: CTA의 `Link in bio`, `Fatesaid`).

## 완료 조건 (muse가 직접 실행)
너(muse)의 샌드박스는 브라우저·localhost가 막혀 있다. 렌더는 실행하지 않는다(이 세션이 한다). 아래만 확인한다.
1. `npx tsc --noEmit 2>&1 | grep -E "render-f4|F4-sample" ; echo done` → render-f4 관련 오류 없음.
2. `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/F1-sample.json marketing/shortform/produce/F4-sample.json` → `2 files, 0 failed`.
3. `npx tsx scripts/shortform/check-copy.test.mts` → `ok`.
- git commit 하지 않는다.

## 참고
- 녹화·자막 패턴: `scripts/shortform/render-f1.mts`, `scripts/record-app-ab.mts`(검사 답하기, 배지).
- 범위·규칙: `SPEC.md`, `TODO.md` 3번.
