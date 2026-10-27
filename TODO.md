# TODO (2026-10-27) — 공개 전 마케팅 준비

SPEC: `SPEC.md`. 한 세션에 한 항목. 1·2, 3, 4~6, 7은 서로 독립이다.

- [x] 1. 번아웃 결과 문구에서 진단 표현 빼기 (ko/en/es)
  - 변경: `mobile/lib/quiz/module3Burnout.ts` 결과 7개 `title`·`hook`, 같은 문구가 있는 웹 `lib/module3Burnout.ts`, 공유 카드에서 이 문구를 쓰는 곳(있으면 grep으로 찾기)
  - 기준: "증후군/syndrome/síndrome", "MBI가 정의하는" 같은 검사 권위·진단 표현 금지. 최고점 제목이 진단명처럼 읽히면 바꾼다. es는 es-419.
  - QA: `grep -rniE "syndrome|증후군|síndrome|MBI가 정의" lib mobile/lib` → 결과 문구에서 0건(코드 주석은 제외). 루트 `npx tsc --noEmit` → 0. `mobile/`에서 `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 0. mobile-web(8082, mobile 뷰포트)에서 `?qa=` 페르소나로 번아웃 최고점 결과 화면 캡처, 바뀐 문구가 보이는지 확인.
  - 결과: 최고점 hook을 "이번 응답에서 세 가지 신호가 모두 뚜렷하게 나타났다" 꼴로(ko/en/es), en 제목 "Full Burnout" → "Running on Empty"(ko "완전 소진형"·es "Agotamiento completo"는 진단명으로 읽히지 않아 유지). "MBI에서 흔한 조합"·"burnout research" → "함께 나타나기 쉬운 조합". 탈진형의 "번아웃이 상당히 진행된 상태"(병기처럼 읽힘) → "많이 지쳐 있는 상태", es 제목 "Agotamiento avanzado" → "Sin energía ni ganas". 웹 `lib/module3Burnout.ts`(ko) 같이 수정.
  - QA: `grep -rniE "syndrome|증후군|síndrome|MBI가 정의" lib mobile/lib` → `quizProfile.ts` 주석 2건만(결과 문구 0). 루트 `npx tsc --noEmit` → exit 0. mobile tsc → exit 0. mobile-web(8082, 375x812, `?qa=free&persona=jordan&lang=en|ko|es`)에서 30문항 모두 최고값으로 응답 → 세 언어 결과 화면에 새 제목·hook 표시 확인, 캡처 `.agents/qa/burnout-copy-2026-10/`(증거: mobile-web, 네이티브 아님).

- [x] 2. 애착 결과 문구의 2인칭 단정 풀기 (ko/en/es)
  - 변경: `mobile/lib/quiz/module1Attachment.ts`의 `MODULE1_TYPE_NAMES` hook과 결과 문단(en "You tend to…" 위치는 grep으로 찾기), 웹에 같은 문구가 있으면 함께
  - 기준: "~하는 패턴입니다", "You tend to…"처럼 단정하는 표현을 "이런 경향이 보일 수 있어요" 꼴의 관찰 표현으로. 유형 이름(Secure 등)은 그대로.
  - QA: `grep -rn "You tend to" mobile/lib/quiz lib` → 0건. 루트·mobile tsc 0(1번과 같은 명령). mobile-web에서 애착 결과 화면 1개를 캡처해 확인.
  - 결과: 단정 표현은 4유형 hook에만 있었다(결과 문단은 없음). 앱 hook 12개(ko/en/es)와 웹 `lib/module1Attachment.ts` ko 4개를 "이번 응답에서는 ~ 경향이 보입니다 / Your answers this time suggest… / Tus respuestas de esta vez sugieren…" 꼴로 바꿨다. 제목은 그대로.
  - QA 범위 보정: `lib` 전체 grep은 챗 선택지(`lib/choiceScripts/en/*`)·사주 SEO 글(`lib/seoArticles/*`)의 "You tend to"까지 잡는데, 애착 결과가 아니라 범위 밖이다. 결과 문구만 보도록 좁혔다.
  - QA: `grep -rn "You tend to\|패턴입니다\|Tiendes a" mobile/lib/quiz/module1Attachment.ts lib/module1Attachment.ts` → 0건(`mobile/lib/quiz` 전체에서 "You tend to"도 0건). 루트 `npx tsc --noEmit` → exit 0. mobile tsc → exit 0. mobile-web(8082, 375x812, `?qa=free&persona=jordan&lang=en`)에서 애착 30문항 최고값 응답 → 결과 "Fearful-Avoidant"에 새 hook 표시 확인, 캡처 `.agents/qa/attachment-copy-2026-10/en-fearful-avoidant.jpg`(증거: mobile-web, 네이티브 아님).

- [x] 3. 레딧 다이제스트: 질문 아닌 글 감점
  - 변경: `scripts/reddit/score.mts`, `scripts/reddit/config.mts`(검증), `marketing/reddit/config.json`(감점 값·무시 서브레딧·패턴), `scripts/reddit/score.test.mts`, `marketing/reddit/README.md` "설정 바꾸기"
  - 내용: 강좌 연재 제목 패턴("[BaZi Basics 01]" 류), r/FreeBaziReading 같은 1인 SEO 서브레딧(무시 목록), 같은 문구를 여러 서브레딧에 뿌린 홍보 글, 사주 문맥 없는 서양 점성 차트 글을 감점하거나 제외. 규칙 기반, LLM 없음.
  - QA: 고치기 전에 `npm run reddit:digest -- --dry-run` 상위 10개를 기록한다. `npx tsx scripts/reddit/score.test.mts` → 새 사례 4종 포함 전부 통과, 기존 테스트(`collect`·`competitors`·`memo`·`draft` `.test.mts`) 통과. 루트 `npx tsc --noEmit` → 0, `npm run lint` → 0. 고친 뒤 `--dry-run`을 다시 돌려 상위 10개에서 해당 유형이 줄었는지 전후를 비교해 적는다.
  - 결과: `config.json`에 `scoring.penalties`를 새로 만들었다(검증은 `config.mts`. 정규식이 컴파일되는지, `contextSubreddits`가 감시 목록에 있는지, `ignoreSubreddits`가 감시 목록과 겹치지 않는지 본다). 규칙은 이렇다. 무시 서브레딧 FreeBaziReading은 0점. 연재 제목("[BaZi Basics 01]", "03 |", "EP04")은 ×0.3. 제목이 질문이 아닌 1500자 이상 글은 ×0.5. 홍보 문구(client, consultation, "I'm offering", "readings for ₹49", "I built" 등)는 ×0.3. 한 작성자가 이번 수집에서 3곳 이상에 올렸으면 ×0.5. 이때 서브레딧마다 문구가 다르면 제목이 질문이어도 걸고, 같은 글 크로스포스트면 제목이 질문이 아닐 때만 건다. 서양 점성 서브레딧 5곳에서 사주 키워드도 bazi도 없는 글은 ×0.3. 긴 본문은 질문 패턴에 우연히 걸리기 쉬워서, 질문 여부는 이 감점들에 한해 제목만 본다. 기존 테스트의 기본 작성자를 글마다 다르게 바꿨다(전부 "testuser"라 뿌리기 감점에 걸렸다). s5(r/Horoscope, 사주 문맥 없음) 기대값은 1.1 → 0.3.
  - QA: 고치기 전 `npm run reddit:digest -- --dry-run`(`seen.json`을 비우고 돌린 뒤 복원) → `digest/2026-10-27-2.md` 상위 10개 중 진짜 질문 2개(1·5위). 나머지는 강좌 연재 3(Basics 03·02·01), 사례 연재 "03 |" 1, 긴 글 3(2027 Ding Wei, 같은 띠 다른 삶, Taurus season), 여러 서브레딧 사례 홍보 1. 같은 수집분(스크래치패드 스냅샷 305개)을 옛 점수와 새 점수로 매겨 비교했고, 고친 뒤 실제 `--dry-run`도 돌렸다 → `digest/2026-10-27-3.md` 상위 10개: 연재 0(5에서 줄어듦), 진짜 질문 5(1·2·6·8·10위). 긴 글 3개는 ×0.5로 진짜 질문 두 개보다 아래(6.3·5.1·3.8). 사례 홍보는 "client" ×0.3으로 6위 → 7위(10.9 → 3.3). 뿌리기 글 Scorpio는 ×0.5로 9위(2.8). 서양 차트 글은 전후 모두 상위 10개에 없었다(가중치 0.4가 이미 막음). 전체 241개 중 감점 건수: 무시 5, 연재 7, 긴 글 44, 홍보 18, 뿌리기 23, 사주 문맥 없음 177. `npx tsx scripts/reddit/score.test.mts` → "score tests: 75 passed"(이전 52. 연재·[2027] 비연재·긴 질문 제외, FreeBaziReading 0점, ₹49·client 홍보·"made by" 비홍보, 3곳 뿌리기·질문 크로스포스트 제외·문구 다른 질문 뿌리기, 서양 차트 문맥 없음·문맥 있음·비대상 서브레딧, 설정 오류 3종). collect ok·competitors 29·memo 27·draft 31 passed. 루트 `npx tsc --noEmit` → exit 0, `npm run lint` → 경고·오류 0. `chart.test.mts`는 OpenAI 키가 필요해 바꾸기 전에도 같은 이유로 실패한다(이번 QA 목록 밖, 돌리지 않음).

- [x] 4. 모듈 영상 설정 3개 추가 (수면·몰입·가면)
  - 변경: `scripts/record-app-ab.mts`의 `CONFIGS`에 A4(가면, module4)·A6(수면, module8)·A7(몰입, module10) 키 추가. 대본·TTS가 없으면 `marketing/video-kit.md` 형식으로 대본을 쓰고 TTS(`generate.py`)를 만든다.
  - 형식: A3x처럼 "매번 가장 낮은 답 vs 가장 높은 답", 샘플 답변임을 화면에 표시, "Voiceover is AI-generated." 표기.
  - QA: mobile-web(8082)을 띄운 상태에서 `node --import tsx scripts/record-app-ab.mts <KEY>`를 키마다 실행 → exit 0, `marketing/video/<KEY>.mp4` 생성. `ffprobe`로 1080x1920·오디오 트랙 확인. 영상에서 프레임 몇 장을 뽑아 결과 화면·자막이 보이는지 확인. `.mts` tsc는 루트 `npx tsc --noEmit` → 0.
  - 결과: 키 이름은 A3x·A1x 관례를 따라 `A4x`(가면)·`A6x`(수면)·`A7x`(몰입)로 했다(키트의 A4·A6·A7은 다른 형식의 훅이라 남겨 둠). `scripts.json`에 대본 3개(첫 문장 = 키트 A4·A6·A7의 세 차원, 이어서 A3x와 같은 낮음/높음 비교, "These are sample answers."·"not medical or psychological advice" 포함, 키트 금지어 정규식 통과), `generate.py`로 TTS 3개(21.0·23.6·25.2초). `record-app-ab.mts`: `CONFIGS` 3개(`runAt [1,1]`), 그리고 "Good places to start" 밖의 검사는 "All tests · N more"를 펼쳐야 보여서 녹화 전(화면 밖) 단계에 펼치기·스크롤을 넣었다. 페르소나 sam(가면·수면), riley(몰입).
  - QA: `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node --import tsx scripts/record-app-ab.mts A4x|A6x|A7x` → 셋 다 exit 0, `marketing/video/A4x.mp4`(18.8초)·`A6x.mp4`(21.0초)·`A7x.mp4`(22.5초). `ffprobe` → 셋 다 video 1080x1920 + audio 트랙. 2.5초 간격 프레임 8장씩 확인: 목록 → 문항 → 결과 화면 2개 → 나란히 비교, 자막·배지 표시. A6x는 Peaceful Sleeper / Deep-Sleep Deprived, A7x는 Balanced Attention / Attention at Both Extremes로 대본과 화면이 맞다. **A4x는 최고점 결과가 "Fully Masked"가 아니라 "Image Management+Social Fatigue+Concealment Combined Type"(대체 제목)으로 떠서 대본과 어긋난다**(앱 버그, 아래 발견 사항). A4x는 버그를 고친 뒤 같은 명령으로 다시 렌더할 때까지 게시 후보가 아니다(`video-kit.md` 9장 메모에도 적음). 루트 `npx tsc --noEmit` → exit 0. 증거: mobile-web 렌더(네이티브 아님).

- [x] 5. 모듈 영상 네이티브 컷 필요 여부 판단
  - 선행: 4
  - 변경: `marketing/video-kit.md`에 판단 표 추가(모듈, mobile-web과 네이티브의 차이, 네이티브 컷 필요 여부, 이유)
  - QA: iOS 시뮬레이터 dev-client로 세 모듈의 결과 화면을 캡처하고, 4번 영상 프레임과 나란히 비교한 이미지를 `.agents/qa/video-native-2026-10/`에 둔다. 차이(글꼴, 레이아웃, 애니메이션)를 표에 적는다. 증거는 시뮬레이터에서 나온 것임을 밝힌다. 시뮬레이터 빌드가 안 되면 `(사용자 확인)`으로 바꾸고 절차를 적는다.
  - 결과: 판단은 "세 영상 모두 네이티브 컷 불필요"다. 결과 카드 구성·문구·글꼴이 같고, 차이는 iOS 상태 막대, 결과 카드 페이드인, 목록 이미지 흐림→선명 진입, 목록 카드 말줄임 위치뿐이다. 표는 `video-kit.md` 9장 "비교형 영상의 네이티브 컷 필요 여부"에 있다. A4x는 네이티브에서도 대체 제목("…Combined Type")이 떠서, 4번 발견 사항의 결과 이름 버그가 실제 앱에도 있다는 것을 확인했다.
  - 방법: 기존 dev-client 빌드(10/15, iPhone 17 Pro Max 시뮬레이터)에 Metro(8081)로 현재 JS를 실었다. 30문항을 손으로 누르는 대신, 녹화 스크립트와 같은 규칙(선택지는 마지막, 슬라이더는 10)으로 1~29번 답을 앱의 이어하기 저장소(`fatesaid_quiz_progress_<module>`, AsyncStorage)에 넣었다. 30번째 문항은 화면에서 직접 마지막 선택지를 눌렀다. 끝난 뒤 저장소와 언어(es)를 원래대로 돌렸다.
  - QA: iOS 시뮬레이터(dev-client, 네이티브)에서 세 검사 결과 화면과 검사 목록 캡처 → `.agents/qa/video-native-2026-10/native-{A4x,A6x,A7x}-high.png`·`native-list.png`. 결과는 Deep-Sleep Deprived, Attention at Both Extremes, 그리고 가면은 대체 제목. `ffmpeg -ss 8.5|10`으로 영상 프레임을 뽑아 나란히 붙임 → `compare-{A4x,A6x,A7x,list}.jpg`. 증거: 시뮬레이터(네이티브)와 mobile-web 영상 프레임 비교.

- [x] 6. 스페인어 텍스트 검사 스크립트
  - 변경: 새 `scripts/check-es-text.mts`. md·txt 파일을 받아 `lib/esGender.ts`의 `matchEsGenderedReader`와 `check-choice-scripts.mts`의 스페인식 표지 검사(`vale`, `vosotros/os`, 현재완료 남용)를 돌린다. 스페인식 표지 검사는 공용 함수로 꺼내 두 스크립트가 같이 쓴다.
  - QA: `LOCALE=es npx tsx scripts/check-choice-scripts.mts` → 꺼내기 전과 같은 결과(오류 0, 경고 수 동일). 일부러 "Vale, vosotros…" 문장을 넣은 임시 파일로 `npx tsx scripts/check-es-text.mts <파일>` → 경고, 지우면 0. 루트 `npx tsc --noEmit` → 0.
  - 결과: 스페인식 표지 검사(목록·현재완료 규칙·`ES_PERFECT_KEPT`)를 새 `lib/esSpain.ts`의 `findEsSpainMarkers`로 옮기고, `check-choice-scripts.mts`의 `checkEsSpain`은 그 결과를 경고로 찍는 세 줄만 남겼다. 새 `scripts/check-es-text.mts`는 md·txt를 줄 단위로 보고 `matchEsGenderedReader`(리포트+챗 목록)와 `findEsSpainMarkers`를 돌린다. 훅·대사를 따옴표 안에 쓰므로 챗 응답용 함수와 달리 따옴표 안도 본다. 금지 예시를 일부러 적은 줄은 `es-check: ignore`로 건너뛴다. 걸리면 종료 코드 1.
  - QA: `LOCALE=es npx tsx scripts/check-choice-scripts.mts` → 꺼내기 전후 출력 `diff` 동일(오류 0, 경고 3, exit 0). ko(경고 22)·en(경고 3)도 오류 0. 임시 파일("Vale, vosotros ya lo sabéis." / "Me has contado tu día." / "\"Estás agotada\"…" / ignore 줄)로 `npx tsx scripts/check-es-text.mts` → 경고 4개(vale·vosotros·현재완료·agotada, ignore 줄 제외), exit 1. 고친 문장 파일 → 경고 0, exit 0. 루트 `npx tsc --noEmit` → exit 0.

- [x] 7. es-419 키트: 훅 24개 + 대본 7개
  - 선행: 6
  - 변경: `marketing/es/hooks.md`, `marketing/es/scripts.md`(영어 원본: `marketing/video-kit.md`, `hook-analysis.md` 등 영어 키트 위치를 먼저 확인)
  - 기준: 직역이 아니라 현지화. `mobile/lib/i18n/STYLE_GUIDE.md`의 es-419 규칙, 압박 규칙·정확도 표현 금지, 1·2번에서 바뀐 결과 문구를 반영. 원문 대응표(영어 번호 ↔ es) 포함.
  - QA: `npx tsx scripts/check-es-text.mts marketing/es/hooks.md marketing/es/scripts.md` → 경고 0. 훅 24개·대본 7개 개수 확인(`grep -c`).
  - 결과: 영어 원본은 `video-kit.md` 9·10장 훅 24개(B1~8·A1~8·C1~8)와 `tts-samples/scripts.json` 대본 7개(B1·C7·A3·C5·C1·A3x·A1x)다. `marketing/es/hooks.md`(번호 같은 대응표 + 현지화 메모, es 캡션 틀·UTM, 금지어·A형 tú 점검 스크립트), `marketing/es/scripts.md`(대응표, 대본마다 es 본문·영어 원문·메모). 화면 이름은 앱 es 문구 그대로: 번아웃 "Ritmo propio"/"Agotamiento completo"(1번 기준), 애착 4제목(2번의 새 hook 화면으로 녹화하라고 메모), 모듈 부제, 절기 "Inicio del invierno"(로마자 Lidong 뺌), "Madera yang". 사람을 꾸미는 형용사가 독자 성별 표지가 되는 곳은 명사를 꾸미게 바꿨다(A1 "¿Apego ansioso o evitativo?", A1x "respuestas altas"). A6 "sueños inquietos"는 앱 부제 그대로라 그 줄만 `es-check: ignore`(꿈을 꾸미는 말), 금지 예시를 적은 규칙 줄 2개와 금지어 목록 줄도 ignore.
  - QA: `npx tsx scripts/check-es-text.mts marketing/es/hooks.md marketing/es/scripts.md` → 경고 0, exit 0. `grep -c "^| [ABC][1-8] |" marketing/es/hooks.md` → 24, `grep -c "^### Guion" marketing/es/scripts.md` → 7. `hooks.md`의 점검 스크립트 → 24개 모두 ok(금지어·A형 tú 0). 대본 본문 7개도 같은 금지어 정규식 → 0.

- [x] 8. es-419 키트: ASO 등록정보 + 시딩 키트
  - 선행: 6
  - 변경: `marketing/es/aso.md`(원본 `marketing/aso-en.md`), `marketing/es/seeding-kit.md`(원본 `marketing/seeding-kit.md`)
  - 기준: App Store(이름 30·부제 30·키워드 100·프로모션 문구 170자), Play(제목 30·짧은 설명 80·긴 설명 4000자) 글자 수 제한. 등록 이름은 "Fate Said". 스페인어(멕시코/중남미) 로케일 기준.
  - QA: `npx tsx scripts/check-es-text.mts marketing/es/aso.md marketing/es/seeding-kit.md` → 경고 0. 각 필드 글자 수를 표로 함께 적고 제한 안인지 확인.
  - 결과: `marketing/es/aso.md` — 로케일은 App Store `es-MX`(중남미 공통 로케일이 없음), Play `es-419`. 이름 "Fate Said: saju coreano"(영어판 "Self-Insight"는 30자를 넘어 부제로), 부제 "Autoconocimiento con 4 Pilares", 키워드 100자(검색어로만 "carta natal", 사용자 확인 항목), 프로모션·설명·What's New·캡션 5개, 법적 링크 `?lang=es`(es 본문 `lib/legalContent.ts`에 있음 확인). 금융 연상 단어를 스페인어 목록으로 바꿔 검사(dinero·banco·pago·precio 등), 구독 관리 안내는 "pagos" 메뉴 이름 없이. 글자 수 점검 스크립트를 파일 안에 두었다. `marketing/es/seeding-kit.md` — 원본과 같은 장(선행 조건·자유 의견·코드 표·성과표)은 원본 참조로 두고 라벨 `seed_es01…`·`utm_campaign=seeding_es`·`/es` 랜딩만 바꿈. 중남미 후보 기준(청중 나라, tú/vos, 겁주는 계정 제외), es DM 4개·표기 안내 한 장(publicidad·patrocinado·producto gratis, 크리에이터 성별 표지 없음), 코드 입력 경로는 앱 es "Ajustes". 중남미 각국 광고 표기 규정은 확인하지 않았다고 `(미확인)`으로 적음.
  - QA: `npx tsx scripts/check-es-text.mts marketing/es/aso.md marketing/es/seeding-kit.md` → 경고 0, exit 0(네 파일 함께 돌려도 0). `aso.md`의 글자 수 점검 스크립트 → FAIL 0:

    | 필드 | 글자 수 / 제한 |
    |---|---|
    | iOS 앱 이름 | 23 / 30 |
    | iOS 부제 | 30 / 30 |
    | iOS 키워드 | 100 / 100 |
    | iOS 프로모션 텍스트 | 166 / 170 |
    | iOS 설명 | 2750 / 4000 |
    | iOS What's New | 77 / 4000 |
    | Play 앱 이름 | 23 / 30 |
    | Play 간단한 설명 | 74 / 80 |
    | Play 자세한 설명 | 2665 / 4000 |
    | 스크린샷 캡션 5개 | 38·38·40·37·35 / 40(자체 제한) |

    금지어(금융·정확·예측·남의 상표) 0. 시딩 키트 `grep -inE "garantiz|cinco estrellas|reseña positiva|tienes que decir|testimonio"` → "보내지 않는 것" 목록 줄 1건만(요구 문구 0), 표기 단어 7곳.

- [x] 9. (사용자 확인 → Claude에 위임) es 키트·영상 확정
  - 결과(2026-10-27, 사용자가 "너가 보고 판단해줘"로 위임): es 네 파일을 읽고 앱 es 문구와 대조했다(모듈 부제 `modules.ts`, 번아웃 제목, 유형 이름 "첫 단어·둘째 단어" `es.ts` typeGloss → B1 "dos partes" 맞음, 절기·일간 이름, en ASO와 기능 목록). 고친 곳: B8 "tres apuestas"(도박 연상) → "tres corazonadas", A3 훅·대본 첫 문장의 지시 대상이 어색한 "lo separa" → "así divide en tres partes un test de agotamiento laboral", 시딩 표기 예시 "me regaló esta app" → "este informe"(주는 것은 리포트). "carta natal" 키워드는 검색어로만 유지, 시딩 키트의 중남미 표기 규정 `(미확인)`은 그대로 둠(DM은 공개 뒤라 그 전에 확인). 네 파일 머리말을 "확정"으로 바꿈.
  - 영상: A7x 게시 후보. A6x 보류(최고점 "Deep-Sleep Deprived"가 건강 상태 이름처럼 읽히고 hook이 2인칭 단정, module8 문구 수정 후 재렌더). A4x 보류(결과 이름 버그). `video-kit.md` 9장 메모에 기록.
  - QA: `npx tsx scripts/check-es-text.mts marketing/es/*.md` → 경고 0, exit 0. 훅 금지어 점검 → 24개, 걸림 0. `grep -c "^### Guion" marketing/es/scripts.md` → 7. 영상 프레임은 `ffmpeg fps=1/2.5` 타일로 A6x·A7x 확인(mobile-web 렌더).
  - 선행: 4, 7, 8
  - 절차: `marketing/es/` 네 파일을 읽고 고칠 곳을 알려 주기, `marketing/video/` 새 영상 3개를 보고 게시 후보 여부를 정하기. 확정 전까지는 초안.
  - 준비 확인(2026-10-27): 네 파일 있음(hooks 86줄·scripts 79줄·aso 191줄·seeding-kit 89줄). `npx tsx scripts/check-es-text.mts marketing/es/*.md` → 경고 0, exit 0. `ffprobe` → A4x 18.8초·A6x 21.0초·A7x 22.5초, 셋 다 1080x1920 + 오디오. 영상 3개는 채팅으로 보냄. 남은 것은 사용자 판단뿐.
  - 사용자가 볼 곳:
    1. `marketing/es/hooks.md` — 훅 24개가 자연스러운 중남미 스페인어인지, 앱 화면 이름(번아웃 "Agotamiento completo", 애착 4제목)과 맞는지.
    2. `marketing/es/scripts.md` — 대본 7개. B1 "dos partes"는 es 카드 표기를 녹화 전에 확인(발견 사항 7번 줄).
    3. `marketing/es/aso.md` — 이름 "Fate Said: saju coreano", 부제, 키워드의 "carta natal"(검색어로만 쓸지) 승인.
    4. `marketing/es/seeding-kit.md` — 중남미 광고 표기 규정 `(미확인)` 부분을 그대로 둘지.
    5. 영상: A6x·A7x 게시 후보 여부. A4x는 결과 이름 버그(발견 사항) 수정 뒤 다시 렌더할 때까지 보류.
  - 확정되면 각 파일 맨 위 "초안" 표기를 지우고 이 항목을 `[x]`로.

- [ ] 10. (사용자 실행) 커밋·푸시 → Vercel 웹 배포
  - 1·2번 웹 문구, 3번 레딧 설정이 실린다. 배포 Ready 확인.

- [ ] 11. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update`
  - 1·2번 앱 문구(`mobile/lib/quiz/*`)는 OTA로만 나간다. 순서는 `HANDOFF_2026-10-25_ota_pending.md`를 따른다(웹 먼저).

## 발견 사항
- (3번 중) 경쟁사 설정 보강 후보: Youra 글을 r/ChineseZodiac·promoteMyApp·ShowYourApp에 올리는 u/Kan0521, r/SideProject에 K-Sajupalja를 소개한 u/Whispered_Tales23을 `competitors[].accounts`에 넣으면 자사 글로 빠진다. 계정 주인은 확인하지 않아 손대지 않음.
- (1번 중) A3x 영상 소재에 옛 제목 "Full Burnout"이 남아 있다: `scripts/record-app-ab.mts` A3x `highlight`, `marketing/tts-samples/scripts.json` A3x 대본, 기존 `marketing/video/A3x.mp4`. 대본·TTS·영상을 "Running on Empty"로 다시 만들어야 한다.
- (1번 중) `mobile/lib/i18n/ko.ts:289` 안내 문구 "심리테스트로 나의 성향과 패턴을 진단해보면" — 결과 문구 밖이라 손대지 않음, "진단" 표현.
- (1번 중) `record-app-ab.mts` 기본 브라우저 경로(`~/Library/Caches/ms-playwright/chromium_headless_shell-1243`)가 이 기기에 없다. 4번 녹화 때 `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`로 지정해야 할 수 있다.
- (2번 중) 다른 모듈 결과 hook에도 "~하는 패턴입니다" 단정이 남아 있다: `mobile/lib/quiz/module2Money.ts`·`module4Mask.ts`·`module5Execution.ts`·`module6Anger.ts`·`module7Sensitivity.ts`·`module8Sleep.ts`·`module9Family.ts`·`module10Focus.ts` ko hook(en/es 대응 문구 포함 여부는 미확인). module7은 "전형적인 고감각민감자(HSP)"라 진단처럼 읽힐 수 있다. 이번 SPEC은 번아웃·애착만이라 손대지 않음.
- (4번 중, 중요) 결과 유형 이름 조회 버그: `mobile/lib/quiz/quizProfile.ts` `classifyProfile`이 2개 이상 조합의 `typeKey`를 **점수 높은 순**으로 이어 붙이는데, 각 모듈 `*_TYPE_NAMES`의 키는 **고정 순서**(예: `imageManagement+concealment+socialFatigue`)다. 점수 순서가 키 순서와 다르면 조회가 빠져 `QuizScreen.tsx:216`의 대체 제목("A+B+C Combined Type" + 일반 hook)이 뜬다. 가면 검사 30문항 최고값 응답에서 재현(mobile-web, `?qa=free&persona=sam&lang=en`). 모든 모듈의 2·3개 조합 결과에 해당할 수 있고 실사용자 화면에도 나온다. 고치려면 키를 정렬해 조회하거나 순열을 모두 시도해야 하는데 결과 분류 로직이라 이번 SPEC 밖이고 사업 핵심 로직이라 이 세션에서 직접 다뤄야 한다. 저장된 결과·리포트 프롬프트가 `typeKey` 순서에 기대는지 먼저 확인.
- (5번 중) 위 결과 이름 버그는 iOS 시뮬레이터(dev-client)에서도 재현된다(`.agents/qa/video-native-2026-10/native-A4x-high.png`). 웹 렌더 문제가 아니라 실사용자 화면 문제다.
- (7번 중) 영어 대본 B1 "the card names the type with two words"는 es 카드 이름("El roble" + 모드)이 두 단어가 아닐 수 있다. es판은 "dos partes"로 썼고 실제 es 카드 표기는 녹화 전 확인 필요.
- (8번 중) 영어판 `marketing/aso-en.md`의 글자 수 점검 스크립트가 "Play 앱 이름"을 따로 세지 못한다. 제목 정규식 `### (.+?) \(limit`이 줄을 넘어가서 "iOS 스크린샷 캡션 (… limit 40으로…)" 제목부터 Play 앱 이름 블록까지를 한 항목으로 읽는다(출력 "28/30 iOS 스크린샷 캡션"이 실제로는 Play 이름). 지금 값은 제한 안이라 결과는 맞다. es판은 `([^\n]+?)`로 고쳐 두었다.
- (9번 중) 수면 최고점 결과 en "Deep-Sleep Deprived" / hook "Neither your mind, body, nor subconscious gets a proper rest — a sleep state that needs real recovery."가 건강 상태 이름처럼 읽히고 2인칭 단정이다. 1·2번과 같은 기준으로 module8 ko/en/es 문구를 고쳐야 A6x를 쓸 수 있다.
- (9번 중) 결과 화면 버튼 "Continue to AI Counseling"과 안내 "counseling-based insights"의 "Counseling"이 "의학·심리 조언이 아님" 고지와 부딪힌다. 영상마다 보인다. 앱 용어집은 "conversation with AI"인데 이 버튼만 다르다(es·ko 대응 문구는 확인 안 함).
- (5번 중) 시뮬레이터 탭 자동화 팁: 탭에 `duration: 0.15`를 주지 않으면 탭이 빠지거나 늦게 들어간다. 스크린샷도 한 박자 늦게 오므로 화면 전환 뒤에는 두 번 찍어 확인한다.
