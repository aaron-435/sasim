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

- [ ] 3. 레딧 다이제스트: 질문 아닌 글 감점
  - 변경: `scripts/reddit/score.mts`, `scripts/reddit/config.mts`(검증), `marketing/reddit/config.json`(감점 값·무시 서브레딧·패턴), `scripts/reddit/score.test.mts`, `marketing/reddit/README.md` "설정 바꾸기"
  - 내용: 강좌 연재 제목 패턴("[BaZi Basics 01]" 류), r/FreeBaziReading 같은 1인 SEO 서브레딧(무시 목록), 같은 문구를 여러 서브레딧에 뿌린 홍보 글, 사주 문맥 없는 서양 점성 차트 글을 감점하거나 제외. 규칙 기반, LLM 없음.
  - QA: 고치기 전에 `npm run reddit:digest -- --dry-run` 상위 10개를 기록한다. `npx tsx scripts/reddit/score.test.mts` → 새 사례 4종 포함 전부 통과, 기존 테스트(`collect`·`competitors`·`memo`·`draft` `.test.mts`) 통과. 루트 `npx tsc --noEmit` → 0, `npm run lint` → 0. 고친 뒤 `--dry-run`을 다시 돌려 상위 10개에서 해당 유형이 줄었는지 전후를 비교해 적는다.

- [ ] 4. 모듈 영상 설정 3개 추가 (수면·몰입·가면)
  - 변경: `scripts/record-app-ab.mts`의 `CONFIGS`에 A4(가면, module4)·A6(수면, module8)·A7(몰입, module10) 키 추가. 대본·TTS가 없으면 `marketing/video-kit.md` 형식으로 대본을 쓰고 TTS(`generate.py`)를 만든다.
  - 형식: A3x처럼 "매번 가장 낮은 답 vs 가장 높은 답", 샘플 답변임을 화면에 표시, "Voiceover is AI-generated." 표기.
  - QA: mobile-web(8082)을 띄운 상태에서 `node --import tsx scripts/record-app-ab.mts <KEY>`를 키마다 실행 → exit 0, `marketing/video/<KEY>.mp4` 생성. `ffprobe`로 1080x1920·오디오 트랙 확인. 영상에서 프레임 몇 장을 뽑아 결과 화면·자막이 보이는지 확인. `.mts` tsc는 루트 `npx tsc --noEmit` → 0.

- [ ] 5. 모듈 영상 네이티브 컷 필요 여부 판단
  - 선행: 4
  - 변경: `marketing/video-kit.md`에 판단 표 추가(모듈, mobile-web과 네이티브의 차이, 네이티브 컷 필요 여부, 이유)
  - QA: iOS 시뮬레이터 dev-client로 세 모듈의 결과 화면을 캡처하고, 4번 영상 프레임과 나란히 비교한 이미지를 `.agents/qa/video-native-2026-10/`에 둔다. 차이(글꼴, 레이아웃, 애니메이션)를 표에 적는다. 증거는 시뮬레이터에서 나온 것임을 밝힌다. 시뮬레이터 빌드가 안 되면 `(사용자 확인)`으로 바꾸고 절차를 적는다.

- [ ] 6. 스페인어 텍스트 검사 스크립트
  - 변경: 새 `scripts/check-es-text.mts`. md·txt 파일을 받아 `lib/esGender.ts`의 `matchEsGenderedReader`와 `check-choice-scripts.mts`의 스페인식 표지 검사(`vale`, `vosotros/os`, 현재완료 남용)를 돌린다. 스페인식 표지 검사는 공용 함수로 꺼내 두 스크립트가 같이 쓴다.
  - QA: `LOCALE=es npx tsx scripts/check-choice-scripts.mts` → 꺼내기 전과 같은 결과(오류 0, 경고 수 동일). 일부러 "Vale, vosotros…" 문장을 넣은 임시 파일로 `npx tsx scripts/check-es-text.mts <파일>` → 경고, 지우면 0. 루트 `npx tsc --noEmit` → 0.

- [ ] 7. es-419 키트: 훅 24개 + 대본 7개
  - 선행: 6
  - 변경: `marketing/es/hooks.md`, `marketing/es/scripts.md`(영어 원본: `marketing/video-kit.md`, `hook-analysis.md` 등 영어 키트 위치를 먼저 확인)
  - 기준: 직역이 아니라 현지화. `mobile/lib/i18n/STYLE_GUIDE.md`의 es-419 규칙, 압박 규칙·정확도 표현 금지, 1·2번에서 바뀐 결과 문구를 반영. 원문 대응표(영어 번호 ↔ es) 포함.
  - QA: `npx tsx scripts/check-es-text.mts marketing/es/hooks.md marketing/es/scripts.md` → 경고 0. 훅 24개·대본 7개 개수 확인(`grep -c`).

- [ ] 8. es-419 키트: ASO 등록정보 + 시딩 키트
  - 선행: 6
  - 변경: `marketing/es/aso.md`(원본 `marketing/aso-en.md`), `marketing/es/seeding-kit.md`(원본 `marketing/seeding-kit.md`)
  - 기준: App Store(이름 30·부제 30·키워드 100·프로모션 문구 170자), Play(제목 30·짧은 설명 80·긴 설명 4000자) 글자 수 제한. 등록 이름은 "Fate Said". 스페인어(멕시코/중남미) 로케일 기준.
  - QA: `npx tsx scripts/check-es-text.mts marketing/es/aso.md marketing/es/seeding-kit.md` → 경고 0. 각 필드 글자 수를 표로 함께 적고 제한 안인지 확인.

- [ ] 9. (사용자 확인) es 키트·영상 확정
  - 선행: 4, 7, 8
  - 절차: `marketing/es/` 네 파일을 읽고 고칠 곳을 알려 주기, `marketing/video/` 새 영상 3개를 보고 게시 후보 여부를 정하기. 확정 전까지는 초안.

- [ ] 10. (사용자 실행) 커밋·푸시 → Vercel 웹 배포
  - 1·2번 웹 문구, 3번 레딧 설정이 실린다. 배포 Ready 확인.

- [ ] 11. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update`
  - 1·2번 앱 문구(`mobile/lib/quiz/*`)는 OTA로만 나간다. 순서는 `HANDOFF_2026-10-25_ota_pending.md`를 따른다(웹 먼저).

## 발견 사항
- (1번 중) A3x 영상 소재에 옛 제목 "Full Burnout"이 남아 있다: `scripts/record-app-ab.mts` A3x `highlight`, `marketing/tts-samples/scripts.json` A3x 대본, 기존 `marketing/video/A3x.mp4`. 대본·TTS·영상을 "Running on Empty"로 다시 만들어야 한다.
- (1번 중) `mobile/lib/i18n/ko.ts:289` 안내 문구 "심리테스트로 나의 성향과 패턴을 진단해보면" — 결과 문구 밖이라 손대지 않음, "진단" 표현.
- (1번 중) `record-app-ab.mts` 기본 브라우저 경로(`~/Library/Caches/ms-playwright/chromium_headless_shell-1243`)가 이 기기에 없다. 4번 녹화 때 `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`로 지정해야 할 수 있다.
- (2번 중) 다른 모듈 결과 hook에도 "~하는 패턴입니다" 단정이 남아 있다: `mobile/lib/quiz/module2Money.ts`·`module4Mask.ts`·`module5Execution.ts`·`module6Anger.ts`·`module7Sensitivity.ts`·`module8Sleep.ts`·`module9Family.ts`·`module10Focus.ts` ko hook(en/es 대응 문구 포함 여부는 미확인). module7은 "전형적인 고감각민감자(HSP)"라 진단처럼 읽힐 수 있다. 이번 SPEC은 번아웃·애착만이라 손대지 않음.
