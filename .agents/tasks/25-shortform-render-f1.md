# 작업 지시서 25: 숏폼 F1 렌더 템플릿 ("내 사주 유형 찾는 법" 앱 화면 시연)

## 목표
설정 파일 하나(`marketing/shortform/produce/<key>.json`, 형식 F1)로 세로 영상 1개(1080×1920, 35초 이하, 음성 트랙 포함)를 만드는 스크립트를 만든다. 화면은 mobile-web(Expo web, http://localhost:8082)에서 **새 사용자 온보딩**을 실제로 진행하는 녹화다: 생년월일 → 출생 시간 → **해외 도시** 검색·선택 → 유형 공개(TypeReveal) → 유형 카드 → 끝 CTA "Link in bio". 대본 문장이 자막으로 깔리고 AI 음성이 붙는다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/shortform/render-f1.mts`
- 그 외 파일은 건드리지 않는다. 특히 `mobile/` 앱 코드, `scripts/record-*.mts`, `scripts/shortform/check-copy.mts`, `marketing/tts-samples/` 는 수정 금지.
- `.env*` 파일은 열거나 출력하지 않는다.

## 사용법 (파일 첫 주석에 적기)
```
node --import tsx scripts/shortform/render-f1.mts <key> [--no-tts]
```
- `<key>`: `marketing/shortform/produce/<key>.json`. `loadConfigFile`(`scripts/shortform/check-copy.mts`에서 import)로 읽는다. `format !== "F1"`이면 오류.
- 읽은 뒤 `checkConfig(config)`를 돌려 위반이 있으면 목록을 출력하고 렌더하지 않고 exit 1.
- 출력: `marketing/video/<key>.mp4` (git 제외 폴더).
- `--no-tts`: OpenAI를 부르지 않는다. 대신 문장 글자 수 × 0.065초(문장당 최소 1.6초)로 길이를 잡고 ffmpeg `anullsrc`로 무음 오디오 트랙을 만든다. **너(muse)는 이 모드로만 실행해서 확인한다.**

## 음성 (TTS)
- `--no-tts`가 아니면: 대본 문장(`config.script`)을 공백으로 이어 붙인 텍스트를 OpenAI `/v1/audio/speech`로 보낸다. 모델·목소리·지시문은 `marketing/tts-samples/generate.py`와 같게(`gpt-4o-mini-tts`, `marin`, 같은 INSTRUCTIONS 문자열, mp3).
- 키는 `process.env.OPENAI_API_KEY`만 읽는다(실행은 `npx tsx --env-file=.env.local ...` 또는 `node --env-file=.env.local --import tsx ...`로 한다). 없으면 "OPENAI_API_KEY 없음, --no-tts로 실행하거나 --env-file=.env.local" 오류.
- 캐시: `marketing/video/.tts/<key>-<텍스트 sha1 앞 10자>.mp3`. 있으면 다시 부르지 않는다(비용). 새로 만들면 콘솔에 `tts <글자 수> chars` 출력.
- 속도: `record-app.mts`처럼 `TEMPO`(기본 1.12) `atempo`, 자막 시각도 그 길이에 맞춘다.

## 녹화 방식
`scripts/record-app.mts`를 그대로 따른다: Playwright chromium(같은 `CHROME_PATH` 기본값), viewport 540×960, deviceScaleFactor 2, locale en-US, CDP `Page.startScreencast`로 1080×1920 프레임, 화면 밖 구간은 `capturing=false`+`pausedTotal`로 잘라 내고, 끝에 ffmpeg concat + 오디오 mux(fps 30, libx264 crf 18, yuv420p, aac 160k, `-shortest`). localhost 외 BASE_URL 거부도 같게.

## 운영 데이터 보호 (필수)
앱은 항상 운영 API(`https://www.fatesaidapp.com`)를 부른다. 녹화가 운영 DB와 분석을 더럽히면 안 된다. `page.route`로:
- `**/api/saju` POST: 요청 JSON에서 `sessionId`와 `nickname`을 지운 뒤 `route.continue({ postData })`. (`app/api/saju/route.ts`는 `sessionId`가 없으면 저장하지 않는다. 계산은 그대로 운영 엔진이 한다.)
- `**/api/events`: `route.fulfill({ status: 200, body: "{}" })`로 막는다.
- 그 밖의 운영 API 호출(`/api/cities/search` 등 읽기)은 그대로 둔다.
- `?qa=` 파라미터는 쓰지 않는다(QA 페르소나는 이미 온보딩이 끝난 사용자다). 새 브라우저 컨텍스트라 localStorage가 비어 있으니 첫 실행 화면부터 시작한다.

## 장면 구성
화면 글자는 모두 설정 파일에서 온다. 스크립트 안에 영어 문구를 새로 짓지 않는다(유일한 예외: 끝 CTA 카드의 `Link in bio`와 앱 이름 `Fatesaid`).

1. **0초부터 훅**: 녹화 시작 프레임부터 화면 위쪽(상단 12~30% 영역)에 `config.hook`을 큰 글자 오버레이로 보인다. 첫 대본 문장이 나오는 동안 유지하고, 그 뒤에는 `config.onScreen`의 항목을 순서대로 같은 자리에 바꿔 보인다(장면 2·4에 하나씩, 항목 수만큼). 아래쪽(하단 64% 근처)에는 `record-app.mts`의 `#rec-cap` 같은 자막 상자에 현재 대본 문장.
2. **입력 장면**: 언어 선택 → 소개 → 닉네임 → 성별 → 생년월일 → 출생 시간 → 도시. 앞쪽(언어·소개·닉네임·성별)은 화면 밖(`capturing=false`)에서 처리해도 된다. **생년월일·시간·도시 입력은 화면에 보여야 한다**(사람이 읽을 수 있는 속도, 입력 사이 0.3~0.6초). 닉네임은 화면에 안 나오면 아무 이름이나 되지만, 나온다면 `Alex`로 고정. 성별은 화면 밖에서 아무 쪽이나.
   - 값: `config.birth.date`(YYYY-MM-DD), `config.birth.time`(HH:MM 24h → 화면의 12시간제+AM/PM으로 변환, `null`이면 "모름" 토글), `config.birth.city`(검색창에 입력 → 결과 첫 항목 중 이름이 일치하는 것 선택; 없으면 오류).
   - 화면 구조는 `mobile/App.tsx`의 `step` 흐름과 `mobile/screens/{LanguageScreen,IntroScreen,NicknameScreen,GenderScreen,DobScreen,TobScreen,CityScreen,ConcernScreen,TypeRevealScreen}.tsx`를 읽고 정한다. 선택자는 실제 화면에서 브라우저로 확인한다(`getByText`, `getByRole`, `[role=...]`, placeholder 등). 텍스트 문자열은 `mobile/lib/i18n` 쪽 en 문구에서 찾는다.
3. **도시 제출 → 관심사(Concern) 화면**은 화면 밖에서 넘긴다(아무 선택 또는 건너뛰기). 계산 응답 대기도 화면 밖.
4. **유형 공개**: `TypeRevealScreen`이 뜨는 순간부터 다시 녹화. 공개 애니메이션이 끝나 유형 이름이 보이는 상태를 대본 3번째 문장 근처에 맞춘다. 화면 안 스크롤이 필요하면 천천히(`mouse.wheel` 여러 번).
5. **끝 CTA**: 마지막 대본 문장 동안 마지막 1.5~2초에 화면 전체를 덮는 카드(배경 `#0F1A15` 계열 진한 색, 가운데 `Link in bio` 큰 글자, 아래 작은 `Fatesaid`). 글꼴은 `record-app.mts`처럼 Plus Jakarta Sans 700을 data URL로 넣는다. 색은 `mobile/theme/colors.ts` 값에서 고른다(새 색 만들지 않기).
6. 영상 길이가 35초를 넘으면 ffmpeg 전에 오류로 멈추고 이유를 출력한다(대본을 줄여야 한다는 뜻).

자막 타이밍: `record-app.mts`처럼 문장 글자 수 비례. 장면 전환은 "해당 문장 시작 시각까지 기다렸다가 화면 동작"(`at(sec)` 헬퍼) 패턴.

reduced motion: 이 스크립트는 녹화 도구라 앱 설정과 무관하다. 오버레이에 CSS 애니메이션을 넣는다면 짧은 페이드(≤200ms)만.

## 제약
- 기존 패턴: `scripts/record-app.mts`(CDP 녹화·자막·mux), `scripts/record-app-ab.mts`(강조 자막, 여러 장면). 주석 밀도·명명은 이 두 파일과 맞춘다(영어 주석, 파일 첫 블록 주석에 목적·사용법·"web rendering of the RN app, not the native build" 경고).
- 새 npm 패키지 설치 금지. playwright, tsx, ffmpeg/ffprobe는 이미 있다.
- 실패 시 임시 폴더(`marketing/video/.tmp-<key>`) 정리.
- 콘솔 마지막 줄: `ok <출력 경로> <길이>s, <자막 수> captions, city=<도시>, type=<화면에서 읽은 유형 이름 또는 ?>`.

## 완료 조건 (muse가 직접 실행)
mobile-web은 이미 8082에서 떠 있다(띄우거나 끄지 말 것).
1. `node --import tsx scripts/shortform/render-f1.mts F1-sample --no-tts` → `marketing/video/F1-sample.mp4` 생성, 마지막 줄 `ok ...`.
2. `ffprobe -v error -show_entries stream=codec_type,width,height:format=duration -of compact marketing/video/F1-sample.mp4` → video 1080×1920, audio 스트림 있음, duration ≤ 35.
3. `ffmpeg -y -loglevel error -ss 0 -i marketing/video/F1-sample.mp4 -frames:v 1 marketing/video/.check-0s.png` 그리고 2초·(길이-0.5)초 프레임도 뽑아 이미지로 직접 열어 본다: 0초에 훅 글자, 2초에 앱 입력 화면, 끝에 `Link in bio` 카드. 안 맞으면 고친다.
4. 루트 `npx tsc --noEmit` → 출력 없음.
5. `npx tsx scripts/shortform/check-copy.test.mts` → 여전히 `ok`.
- `--no-tts` 없이 실행하지 않는다(유료 API).
- git commit 하지 않는다.

## 참고
- 설정 예시: `marketing/shortform/produce/F1-sample.json` (Toronto, 1994-08-21 07:30).
- 범위·규칙: `SPEC.md`, `TODO.md` 2번.
