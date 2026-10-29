# TODO (2026-10-29): 숏폼 실행 1차, 주 10개 · 형식 5개

SPEC: `SPEC.md`. 한 세션에 한 항목만 한다. (2026-10-29: iOS 4.3(b) SPEC·TODO는 1~9 완료 후 `*_2026-10-29_ios43b.md`로 보관, 남은 10번은 심사 결과 대기. 사용자 결정으로 숏폼 재개.) 근거 자료는 `marketing/shortform/REPORT_2026-10-28.md`, `REFERENCES_2026-10-28.md`.

순서: 1 먼저(나머지가 이 틀과 점검 스크립트를 쓴다). 2~6은 서로 독립이라 순서는 상관없다. 7은 2~6 뒤, 8은 7 뒤, 9는 7 뒤.

코딩 항목(1~6)은 CLAUDE.md 분담 규칙상 muse 위임 대상이다. 사업 핵심 로직이 아니기 때문이다. 단 F2·F6 문구 출처 확인은 이 세션이 직접 한다.

공통 렌더 조건: mobile-web이 떠 있어야 한다. `cd mobile && npx expo start --web --port 8082`. 결과물 `marketing/video/`는 git에서 제외된다.

## 구현

- [x] 1. 공통 제작 틀 + 문구 점검 스크립트 (2026-10-29, muse 지시서 `.agents/tasks/24-shortform-check-copy.md`, 브랜치 `task-24`)
  - QA: `npx tsx scripts/shortform/check-copy.test.mts` → `ok 50 checks`(규칙 12종 각각 걸리는 사례 + 경계 통과 사례 + 구조·교차 파일·CLI exit 0/1/2), `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/*.json` → `1 files, 0 failed`, 루트 `npx tsc --noEmit` → exit 0 출력 없음
  - 결과: 설정 형식·로더 `loadConfigFile`은 `check-copy.mts`에 있다(렌더 2~6번이 import). 예시 `marketing/shortform/produce/F1-sample.json`(2번 QA의 `F1-sample`). 같은 `birth.date` 중복은 `duplicate-birth`로 잡혀 7번 QA의 중복 0 확인도 이 명령 하나로 된다.
  - 변경:
    - `marketing/shortform/produce/`: 영상 1개 = JSON 1개. 키, 형식(F1~F6), 훅, 대본 문장, 화면 글자, 생년월일·시간·도시, 캡션, 해시태그, UTM 플랫폼, AI 음성 여부.
    - `scripts/shortform/check-copy.mts`: `video-kit.md` 9장 금지어를 넓힌다. 정확도·예언·불운, "worst/bad match", % 점수, 유명인 이름 목록, "comment your birth" 류, 가짜 후기 1인칭("I tried this app"). AI 음성이면 캡션에 "Voiceover is AI-generated."가 있는지도 본다.
    - `scripts/shortform/check-copy.test.mts`.
  - QA: `npx tsx scripts/shortform/check-copy.test.mts` 통과. 금지 사례와 통과 사례가 각각 하나 이상 있어야 한다. 루트 `npx tsc --noEmit` → 0.

- [x] 2. F1 템플릿: "내 사주 유형 찾는 법" 앱 화면 시연 (2026-10-29, muse 지시서 `.agents/tasks/25-shortform-render-f1.md`, 브랜치 `task-25`. muse는 샌드박스에서 브라우저를 못 띄워 렌더 확인과 수정 4건은 이 세션이 함)
  - QA: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node --env-file=.env.local --import tsx scripts/shortform/render-f1.mts F1-sample` → `ok … 13.1s, 4 captions, city=Toronto, type=Field · Order`(TTS 197자 1회, 캐시 `marketing/video/.tts/`). `ffprobe` → video 1080×1920, audio 있음, 14.37초. 프레임 11장(0·2·4·6·7·8·9·10·11·12·끝)을 직접 봄: 0초 훅, 2초 생년월일 입력, 4~6초 시간·Toronto 검색, 7초 공개 연출, 8~11초 유형 카드(Field · Order), 12초~ `Link in bio`. 유명인 이름 안 보임. 루트 `npx tsc --noEmit` → exit 0, `check-copy.test.mts` → `ok 50 checks`, `check-copy.mts produce/*.json` → `1 files, 0 failed`.
  - mobile-web 렌더링이라 네이티브 화면과 다를 수 있다(폰트 렌더링, 공개 연출). 광고로 쓸 장면은 시뮬레이터와 한 번 비교한다.
  - 결과: 녹화 중 `/api/saju` 요청에서 `sessionId`·`nickname`을 빼(운영 DB 저장 없음) `/api/events`는 막는다. 유형 공개 화면은 첫 화면 안에 "People who share this type"(유명인)이 들어오므로 그 아래를 배경색으로 가리고, 가림막 위로 라벨이 보이면 스크린샷을 남기고 멈춘다. `--no-tts`는 무음 확인용.
  - 선행: 1
  - 변경: `scripts/shortform/render-f1.mts`. 기존 `record-app.mts`의 CDP 녹화와 자막 방식을 재사용한다. 장면: 온보딩에 생년월일·시간·**해외 도시** 입력 → 유형 공개 → 유형 카드 → 끝 CTA "link in bio". TTS는 `marketing/tts-samples/generate.py`.
  - QA: `node --import tsx scripts/shortform/render-f1.mts F1-sample` → mp4. `ffprobe`로 1080×1920·35초 이하·오디오 트랙 확인. 0초·2초·끝 프레임을 뽑아 직접 본다(훅 글자, 앱 화면, CTA). mobile-web 렌더링이라 네이티브와 다를 수 있다고 적는다.

- [x] 3. F4 템플릿: 전/후 앱 화면(심리 검사 결과 → 사주 유형 카드) (2026-10-29, muse 지시서 `.agents/tasks/26-shortform-render-f4.md`, 브랜치 `task-26`. 렌더·수정은 이 세션)
  - QA: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node --env-file=.env.local --import tsx scripts/shortform/render-f4.mts F4-sample` → 3회 연속 `ok … 11.2s, 4 captions, test=Sleep, type=Ocean · Order`(TTS 194자 1회, 캐시). `ffprobe` → 1080×1920, audio, 11.17초. 프레임 8장(0~12초·끝): 0초 검사 목록+훅, 2초 질문(훅 숨김), 4초 결과 카드 `Peaceful Sleeper`+배지, 6~8초 유형 카드 `Ocean · Order`+배지(유명인 없음), 끝 `Link in bio`. 자막이 화면과 맞음. `check-copy` 통과.
  - 결과: 설정 `onScreen = [검사 이름, 전 라벨, 후 라벨]`. 장면 박자는 대본 끝에서 센다(뒤에서 3번째 문장=결과, 2번째=유형, 마지막=CTA). 운영 쓰기 감시(GET·`/api/saju`·`/api/events` 외 요청이면 멈춤). 답하기는 문항 번호가 넘어갈 때까지 기다리고 한 번 재시도(자동 넘김 화면에서 문항을 건너뛰던 문제).
  - 선행: 1
  - 변경: `scripts/record-app-ab.mts` `CONFIGS` 확장 또는 `scripts/shortform/render-f4.mts`. 0초부터 앱 UI. "pov"류 시청자 감정 단정 문장 금지.
  - QA: 2번과 같은 ffprobe·프레임 확인. 훅·자막이 `check-copy` 통과.

- [x] 4. F2 템플릿: 유형 × 관계 카드 묶음 (2026-10-29, muse 지시서 `.agents/tasks/27-shortform-render-f2.md`, 브랜치 `task-26`)
  - QA: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node --import tsx scripts/shortform/render-f2.mts F2-sample` (sample2·3도) → `ok F2-sample selfChallengesOther 6 cards`, `ok F2-sample2 selfNurturesOther`, `ok F2-sample3 mirror`. PNG `file` → ig 1080×1350, tt 1080×1920. mp4 `ffprobe` → 1080×1920, audio, 18.0초. `--check`로 다른 관계 문구를 넣으면 `not app copy for Oak × Field (selfChallengesOther)` exit 1(muse 확인). 카드 접촉 시트(tt 6장 ×2세트, ig 6장)를 직접 봄: 잘림 없음, 대비 충분, 표지 두 유형 그림이 쌍과 맞음.
  - 결과: 설정 `onScreen[0] = "<A> × <B>"`, 나머지는 그 쌍의 관계(headline·body·goodPoint) 또는 두 유형 tagline과 글자까지 같아야 한다. 관계는 `lib/compatibility.ts`로 계산. **사용자 결정(2026-10-29): 앱 원문과 정확히 같은 줄만 check-copy의 시청자 단정·정확도 규칙에서 빼준다**(`APP_COPY_EN`, 테스트 54개). 훅·캡션 등 새로 쓴 문장은 그대로 전체 검사.
  - 선행: 1
  - 변경: `scripts/shortform/render-f2.mts`. Playwright로 HTML → PNG. Instagram 캐러셀 1080×1350, TikTok 사진 1080×1920, YouTube용 슬라이드 mp4 각각. 색·글꼴은 Celadon & Hanji와 `FONTS` 기준(Newsreader, Plus Jakarta Sans).
  - 문구 출처는 `mobile/lib/compatibilityContent.ts`(en, 관계 5종 headline·body·goodPoint)와 `mobile/lib/sajuTypeContent.ts`(en, archetype·mode 조각)뿐이다. 스크립트가 카드 문장이 원문 문자열과 일치하는지 검사한다. 새 해석 문장 금지, "나쁜 궁합" 금지, % 금지.
  - QA: 3세트 렌더. 원문 일치 검사 통과, `check-copy` 통과. PNG 크기 확인. 카드 3장을 직접 본다(잘림, 대비).

- [x] 5. F6 템플릿: 한 줄 문구 카드 + 배경 아트 루프 (2026-10-29, muse 지시서 `.agents/tasks/28-shortform-render-f6.md`, 브랜치 `task-26`)
  - QA: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node --import tsx scripts/shortform/render-f6.mts F6-sample` (sample2도) → `ok … 9.1s, type=Mountain · Rooted`, `type=Gem · Well`. `ffprobe` → 1080×1920, audio(무음), 9.1초. tagline이 그 생년월일 유형의 앱 원문과 일치(스크립트 검사). 프레임(0·2초·끝): 훅, 회전하는 생성 그림, tagline 3줄 안, `@fatesaidapp`. `check-copy` 통과.
  - 결과: 배경은 앱 Home의 ElementMap SVG를 그 생년월일로 화면 밖 온보딩해 가져온 것(`common.mts`의 `elementMap`, `marketing/video/.art/` 캐시)이고 `art-layer.mts`가 키워 돌린다. 녹화 루프 mp4 대신 SVG를 재사용한다(F3도 같음).
  - 선행: 1
  - 변경: `scripts/shortform/render-f6.mts`. 배경은 mobile-web의 제너러티브 아트 화면을 한 번 녹화해 루프 mp4로 만든다. 그 위에 `sajuTypeContent` en tagline 한 줄과 계정 이름을 얹는다. 음성 없이 음원 자리만 둔다(음원은 게시할 때 플랫폼에서 고른다).
  - QA: 렌더 2개, ffprobe 1080×1920·7~12초. 문구 원문 일치, `check-copy` 통과. 프레임 확인.

- [x] 6. F3 템플릿 + 절기 날짜표 (2026-10-29, muse 지시서 `.agents/tasks/29-shortform-render-f3.md`, 브랜치 `task-26`)
  - QA: `npx tsx scripts/shortform/solar-term-dates.mts` → 8행 + `check: lidong ok, dongzhi ok`(입동 2026-11-07 18:51 KST, 동지 2026-12-22 05:49 KST = 미 동부 12-21). `npm run validate:manseryeok` → `All golden samples match.` `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node --env-file=.env.local --import tsx scripts/shortform/render-f3.mts F3-sample` → `ok … 15.1s, 3 cards, voice=yes`(TTS 252자). `ffprobe` → 1080×1920, audio, 15.07초. 프레임 8장: 훅(상자 위), 카드 3장이 음성 순서대로, 끝 CTA. 카드 날짜 `Dec 21`이 표의 미 동부 날짜와 일치(스크립트 검사, 틀리면 exit 1). `check-copy` 8 files 0 failed.
  - 결과: 날짜표 `marketing/shortform/dates.md`(엔진 출력, 손으로 고치지 않음). F3은 `aiVoice: false`면 `script: []` 허용(check-copy 스키마 수정).
  - 선행: 1, 5(배경 루프 재사용)
  - 변경: `scripts/shortform/solar-term-dates.mts`. 엔진 `lib/solarTerms.ts`에서 2026-11 ~ 2027-02 절기 시각을 KST와 UTC로 뽑는다. 여기에 Year Wrapped(12/1), 2027 신년을 더해 날짜표 `marketing/shortform/dates.md`를 만든다. `scripts/shortform/render-f3.mts`는 날짜 텍스트 카드 3~4장에 AI 음성을 선택으로 붙인다. 문장은 "리듬·흐름" 표현만 쓴다(예언 금지).
  - QA: `npm run validate:manseryeok` 통과(엔진은 바꾸지 않았으니 기존 결과 그대로). 날짜표의 입동·동지가 엔진 출력과 같다. 렌더 1개는 ffprobe와 프레임으로 확인, `check-copy` 통과.

- [x] 7. 첫 2주 설정 파일 20개(대본·캡션) (2026-10-29, 이 세션이 직접 씀)
  - QA: `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/V*.json` → `20 files, 0 failed`. 샘플 포함 `produce/*.json` → `28 files, 0 failed`(교차 파일 생년월일·키 중복 0). F2 6개 `node --import tsx scripts/shortform/render-f2.mts V0N-F2 --check` → 관계 selfNurturesOther·otherNurturesSelf×2·selfChallengesOther·otherChallengesSelf·mirror(5종 모두), 원문 일치 통과. 생년월일 14개를 엔진(`calculateManseryeok` + `classifySajuType`, 샘플 렌더 결과 5개와 일치 확인)으로 계산 → 유형 14개 전부 다름, 샘플 유형과도 안 겹침.
  - 결과: 키 `V01-F2`~`V06-F2`, `V07-F1`~`V10-F1`, `V11-F4`~`V14-F4`, `V15-F6`~`V18-F6`, `V19-F3`·`V20-F3`. 도시는 전부 해외 14곳. F4 검사는 Burnout·The Mask·Love & Attachment·Focus(샘플의 Sleep 제외). F6 tagline은 Oak·Gem·Flame·Field(F2 카드엔 이 넷의 tagline을 안 씀). F3은 입동(Nov 7, 음성)과 Year Wrapped(Dec 1, 무음). F2 "You…" 시점 문제(발견 사항 4번)는 훅·캡션에 "read from <A>'s side"를 넣어 정함. 해시태그에 `#astrology`는 안 씀.
  - 렌더 전 주의(8번): F6 tagline·F1/F4 유형은 엔진 계산값 기준이라, 앱 도시 검색이 다른 같은 이름 도시(예: London)를 먼저 고르면 F6 검사에서 멈출 수 있다. V19(Nov 7)는 공개일이 11월 7일을 넘기면 대설(US Eastern Dec 6)로 바꾼다.
  - 선행: 2~6
  - 구성: F2 6, F1 4, F4 4, F6 4, F3 2. 영상마다 생년월일·유형·모듈이 달라야 한다. 캡션에 플랫폼별 UTM 링크 문구("link in bio"), AI 음성 표기, 해시태그를 넣는다.
  - QA: `npx tsx scripts/shortform/check-copy.mts marketing/shortform/produce/V*.json` → 20개 전부 통과(샘플 8개는 `*.json`으로 함께 돌려 중복만 본다). 같은 생년월일 중복 0(스크립트로 센다).

- [x] 8. 20개 렌더 + 검수 (2026-10-29, 이 세션)
  - QA: 형식별 `CHROME_PATH=… node --env-file=.env.local --import tsx scripts/shortform/render-<f>.mts V<NN>-<F>` 20개 → 전부 `ok`(첫 회 V19만 실패, 아래 수정 뒤 `ok … 15.0s, 4 cards, voice=yes`). ffprobe 일괄 → `20/20 OK`(1080×1920, aac, 9.1~18.0초, 35초 이하). F2 PNG → 세트마다 ig 1080×1350·tt 1080×1920 같은 수. `check-copy.mts produce/*.json` → `28 files, 0 failed`. 프레임: 20개 0초·2초·끝 접촉 시트 + F1·F4 8개는 1초 간격 전체 + F2 ig 카드 전부를 직접 봄. F1 도시·유형이 설정대로(LA Steel·Harvest, Mexico City Vine·Harvest, London Field·Rooted, Melbourne Mountain·Voice), 유형 화면에 유명인 없음, F6 tagline 원문 검사 통과.
  - 고친 것(설정 파일만): V19-F3 대본 5문장 vs 카드 3장 → CTA 카드 "See this season's rhythm in the app." 추가(4장). V14-F4 첫 문장이 짧아 결과 자막이 질문 화면에 먼저 뜸 → 질문 설명 문장 하나 추가. V02·V05-F2 goodPoint 카드가 다음 body 카드 앞부분과 같은 문장 → goodPoint 카드 뺌(새 문장 없음).
  - TTS: 청구된 글자 2,028자(F1 803, F4 978 = V14 재렌더 155자 포함, F3 247). `gpt-4o-mini-tts`라 몇 센트 수준.
  - 남은 것: mobile-web 렌더라 네이티브와 다를 수 있다. 광고로 증폭할 영상은 시뮬레이터와 한 번 비교. V19(Nov 7)는 공개일이 11/7을 넘기면 대설로 바꿔 다시 렌더.
  - QA: 20개 모두 렌더 성공. ffprobe 일괄 점검(크기·길이·오디오). 영상마다 0초·2초·끝 프레임 접촉 시트를 보고 문제 목록을 적은 뒤 고친다. TTS 비용(문자 수)도 적는다.

- [x] 9. 4주 게시 캘린더 + 성과 기록표 + 예약 게시 안내 (2026-10-29, 이 세션)
  - QA: `npx tsx scripts/shortform/calendar.mts --check` → `ok marketing/shortform/CALENDAR.md: weeks 10/10/10/10, back-to-back 0, F3 2026-11-07 Start of Winter; 2026-11-22 Minor Snow; 2026-11-29 Year Wrapped, made 20/40`. D0 6개(10-30·11-05·11-10·11-20·12-01·12-20)로 만든 캘린더도 전부 `--check` ok, D0가 11-07을 넘기면 "V19 기한 지남" 안내가 나옴. 일부러 망친 파일(같은 형식 연속, 키 중복, F3 날짜 이동) → 3건 FAIL, exit 1. 루트 `npx tsc --noEmit` → exit 0.
  - 결과: `scripts/shortform/calendar.mts --d0 <날짜> [--provisional] [--write]`가 `CALENDAR.md`를 만들고 `--check`가 손으로 고친 파일도 검사한다. 지금 파일은 **임시 D0 2026-11-02**(공개일이 정해지면 다시 만든다). F3은 날짜표 행사(미 동부) 당일, 절기는 1일 전·Wrapped는 3일 전까지 허용. 그 주에 행사가 없으면 F3 자리는 F2로. 만든 20개는 V 번호 순으로 1~2주차에 들어가고 3~4주차 20개는 "제작 필요"(임시 D0 기준 V20 Wrapped는 4주차). `tracker.csv`는 20개 × 플랫폼 3 = 60행. 예약 순서는 `POSTING.md`(TikTok Studio, Business Suite/Instagram 앱, YouTube Studio). 메뉴·예약 기한 중 실제 화면으로 확인 못 한 곳은 "(확인 필요)"로 둠.
  - 선행: 7
  - 변경:
    - `marketing/shortform/CALENDAR.md`: 주 10개. 같은 형식을 연달아 두지 않는다. F3는 날짜에 맞춘다. 공개일을 D0로 둔 상대 날짜로 쓴다.
    - `marketing/shortform/tracker.csv`: 영상 키, 플랫폼, 게시일, 48시간·7일 조회·공유·저장·프로필 방문·링크 클릭.
    - TikTok Studio, Meta Business Suite, YouTube Studio 예약 게시 순서.
  - QA: 캘린더 점검 스크립트로 주별 개수, 연속 같은 형식 0, F3 날짜 일치를 확인한다.

## 사용자 확인·실행

- [ ] 10. (user check) 스토어 공개 확인 → 첫 주 예약 게시
  - 절차: iOS·Android 공개 확인 → 웹 "coming soon"을 스토어 링크로 바꿨는지 확인(이전 마케팅 TODO 7) → CALENDAR의 1주차 10개를 TikTok과 Instagram에 같은 날짜로 예약 → YouTube Shorts에 복사 예약 → 캡션의 AI 음성 표기 확인.
- [ ] 11. (user check) 48시간·7일 수치 기록. `tracker.csv`에 직접 입력하거나, 사용자 승인 뒤 Aside로 각 플랫폼 분석 화면을 읽어 채운다(읽기만).
- [ ] 12. 2주 리뷰(Claude). 형식별 중앙 조회·공유율·프로필 방문율과 퍼널 리포트(`npx tsx --env-file=.env.local scripts/funnel-report.mts`)의 UTM 플랫폼별 방문 → 유형 카드 → 스토어 클릭을 보고 3~4주차 구성을 조정한다.
  - 선행: 11(2주치 수치)
- [ ] 13. 4주 리뷰(Claude). 6개 이상 올렸는데 프로필 방문·링크 클릭이 사실상 0인 형식은 뺀다. 다음 SPEC을 제안한다(스페인어판, 승자 형식 확대, 광고 증폭).
  - 선행: 12

## 이전 TODO에서 옮긴 사용자 항목 (`TODO_2026-10-28_measurement.md` 5~7)
- [ ] 14. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update` 한 번(iOS·Android 함께). 순서·명령은 `HANDOFF_2026-10-25_ota_pending.md`.
- [ ] 15. (사용자 확인, 14 뒤) 앱 이어받기 실기 확인. 절차는 `TODO_2026-10-27_web2app.md` 11번. 같은 김에 설정 © 7번 탭으로 본인 기기를 테스터로 표시한다.
- [ ] 16. (사용자 실행, 14 뒤) 영어 사용자 5명 관찰. 기록표를 공유하면 웹 검사 맛보기와 주력 상품 판단에 쓴다.

## 발견 사항
- (실기기 iPhone, 2026-10-29) 퀴즈 슬라이더 양끝 라벨이 길면 화면 밖으로 잘렸다(모듈 5 D2 "Extremely tangled (…)"). 라벨이 줄의 절반씩 차지하고 줄바꿈하도록 고침. 같은 모양의 도시 검색 결과 줄(도시·국가), 퀴즈 결과 카드 아래 줄, 웹 퀴즈 슬라이더 라벨도 함께 고침. mobile-web 1번 문항에서 오른쪽 라벨 두 줄 확인. iPhone 실기 확인은 OTA 뒤.
- (9번) 임시 D0(11-02) 기준 2주차에는 F3 행사가 없어 F2가 하나 더 필요하다(제작 필요 1개). 공개일이 11-07을 넘기면 V19(입동)는 못 쓰고 다른 절기로 다시 렌더해야 한다. 공개일이 정해지면 `calendar.mts --d0 <날짜> --write`의 "남은 일"을 보고 만든다.
- (8번) F2 관계 중 otherNurturesSelf·mirror는 앱 원문 goodPoint가 body 앞부분과 거의 같다. 다음 F2 설정에서는 둘 중 하나만 카드로 쓴다. `render-f2`는 이 중복을 잡지 않는다.
- (3~6번) F1 영상이 세로로 약 10% 늘어나 있었다(설치된 Chrome의 headless 창이 뷰포트와 달라 CDP 화면이 540×873·1배율). 2026-10-29 `render-f1.mts`를 `common.mts`(창 크기 고정·프레임 크기 검사·`-t` 길이)로 옮겨 고침. QA: `render-f1.mts F1-sample` → `ok … 14.2s, 4 captions, city=Toronto, type=Field · Order`, `ffprobe` 1080×1920·14.24초, 프레임 8장에서 둥근 버튼이 원형, 장면은 이전과 같음. `scripts/record-*.mts`(옛 광고 녹화)는 그대로라 다시 쓸 때 같은 플래그가 필요하다.
- (5번) **앱 도시 검색이 악센트를 못 찾는다**: `/api/cities/search?q=São Paulo` → 결과 0, `Sao Paulo` → 브라질 상파울루. 스페인어·포르투갈어권 사용자가 온보딩에서 막힐 수 있다(앱·서버 코드라 이번 범위 밖). 샘플은 `Sao Paulo`로 씀. → 2026-10-29 고침: `lib/worldCities.ts` 검색이 악센트를 양쪽 다 무시한다(São Paulo·Bogotá·Montreal·Zurich·Malmo 확인, 한글 부분 일치 유지). 앱은 서버 API를 부르므로 웹 배포로 반영된다.
- (7번) 서버 `searchWorldCities("Montreal")`도 결과가 없었다(데이터가 `Montréal`). 위 수정으로 해결. 이번 설정에서는 Montreal을 뺐다.
- (3번) F4 결과 카드 제목 읽기는 뺐다(로그용이었고 화면 요소를 안정적으로 못 골랐다). 유형 이름은 읽는다.
- (4번) F2의 "You…" 문구는 카드 위쪽 쌍 라벨(`Oak × Field`)의 앞쪽 유형이 "나"라는 뜻인데, 화면에 그 설명은 없다. 7번에서 훅이나 캡션으로 "if you're Oak" 같은 틀을 줄지 정한다.
- (2번) Playwright 브라우저 캐시(`~/Library/Caches/ms-playwright`)가 지워져 있다. `record-*.mts`와 `render-f1.mts`의 기본 `CHROME_PATH`가 없는 경로를 가리키므로 지금은 설치된 Chrome을 `CHROME_PATH`로 준다. 3~6번도 같다. → 2026-10-29: `common.mts`가 `CHROME_PATH` → 설치된 Chrome → Playwright 셸 순으로 찾게 바꿨다(F1~F6 렌더). QA: `CHROME_PATH` 없이 `render-f6.mts F6-sample --no-tts` → ok 9.2초, `ffprobe` 1080×1920. 옛 `scripts/record-*.mts`는 창 크기 플래그가 없어 그대로 두었다(설치된 Chrome으로 돌리면 세로로 늘어난다).
- (2번) muse는 샌드박스에서 브라우저·localhost 접속이 막혀 렌더 결과를 못 본다. 3~6번 지시서는 "코드 + `--no-tts`/오프라인 검사까지"로 잡고, 렌더·프레임 검수는 이 세션이 한다.
- (2번) 유형 화면(TypeScreen)의 유명인 섹션과 공유 이미지 미리보기 속 유명인 줄은 F4·F6 등 앱 화면을 녹화하는 다른 형식에서도 보일 수 있다. 그 템플릿에서도 같은 가림·검사를 넣는다.
- (1번) `check-copy`는 금지어를 넓게 잡는다: `heal…`이 "healthy", `treat…`이 "treaty", `stock…`, `will` 단독도 걸린다. 7번에서 문장을 쓸 때 걸리면 단어를 바꾸고, 규칙을 풀어야 하면 그때 결정한다. 해시태그 `#astrology`는 규칙상 통과하지만 4.3(b) 이후 쓸지는 7번에서 판단.
- (분석 중) yt-dlp는 TikTok 댓글을 0개로 받는다. 댓글은 Aside로 읽는다. TikTok은 요청을 가끔 막으니 계정 목록은 재시도가 필요하다(`marketing/shortform/tools/collect.py`).
- (분석 중) 임시 폴더는 재부팅하면 지워진다. 영상·프레임은 `~/.cache/shortform_dl`에 둔다.
- (분석 중) TikTok을 비즈니스 계정으로 바꾸면 상업용 음원만 쓸 수 있다. → 2026-10-29 결정: 계정 종류와 상관없이 상업 이용 가능 음원만 쓰고, 비즈니스로 전환한다(`marketing/video-kit.md` 5-1절, 전환은 사용자가 앱에서).
