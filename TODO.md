# TODO (2026-10-27) — 챗 스크립트 보정 + 스페인어 성별·중남미 기준

SPEC: `SPEC.md`. 한 번에 한 항목(`/work`). 문구는 이 프로젝트의 Claude 세션이 직접 쓴다. muse와 외부 AI에는 맡기지 않는다(핵심 콘텐츠).
공통 QA: 루트 `npx tsc --noEmit`, `npm run lint && npm run build`(dev 서버를 내리고).
스크립트 린트: `npx tsx scripts/check-choice-scripts.mts <모듈…>`, 영어·스페인어는 앞에 `LOCALE=en` / `LOCALE=es`.

- [x] 1. module12 ko 중립화
  - 변경: `lib/choiceScripts/module12.ts`의 3·15·17·18·19·21턴, 마무리, 머리 주석. "새 자리·장소" 전제를 "새로운 상황·새 일상"으로 바꾼다. 19턴 gist는 `anchor_in_new` 설명(사람, 장소, 습관)과 맞게 쓴다.
  - QA: `npx tsx scripts/check-choice-scripts.mts module12` 오류 0. `run-choice-script.mts`로 1턴 보기 3가지 경로를 각각 끝까지 출력한다. `grep -nE "짐|새 자리|단골|떠나던|익숙한 곳"` 결과가 남지 않거나, 남긴 것마다 이유가 있다.
  - 결과(2026-10-27): 3·6·15·17·18·19·21턴, 마무리 3줄·perspectiveLine, 머리 주석을 고쳤다. 6턴 "새 자리가 어긋날 때"도 같은 전제라 함께 고쳤다. 장소는 19턴 보기 "자주 찾는 곳 하나"로만 남는다.
  - QA: `npx tsx scripts/check-choice-scripts.mts module12` → 오류 0, 경고 1(끝맺음 "군요" 편중, 기존).
  - QA: `MODULE_ID=module12 PICK=0|1|2 npx tsx scripts/run-choice-script.mts` → `.agents/qa/choice-paths-2026-10-27/ko-module12-pick{0,1,2}.txt`(1턴 헤어짐·일/학교·사는 곳, 22턴까지). 이 출력에 `grep -nE "짐을|새 자리|단골|떠나던|익숙한 곳|예전 자리"` → 0건. 파일 grep의 남은 2건은 머리 주석(바꾼 이유 설명)과 "헤어짐"의 "짐" 오탐.
  - `run-choice-script.mts`에 `PICK`(매 턴 N번째 보기 경로 하나만) 옵션을 더했다. 3번 en/es 경로 출력에도 쓴다.
- [x] 2. module3 ko 업무량 중복 해소
  - 변경: `lib/choiceScripts/module3.ts` 7·8턴(필요하면 체크포인트·마무리 틀), `CHOICE_SCRIPT_GUIDE.md` 5절 원문을 같이 고친다. `demand_drain`=8턴 매핑은 유지하고, 8턴 보기에서 "일의 양"을 뺀다.
  - QA: 린트 module3 오류 0. "일의 양" 경로(2턴 일의 양)로 끝까지 출력해서 일의 양을 묻는 턴이 1개 이하인지 확인한다. 체크포인트와 마무리 조사가 자연스러운지 확인한다.
  - 결과(2026-10-27): 7턴은 "이 버거움이 시작될 무렵, 무엇이 달라졌어요?"(일의 뜻 / 생활 리듬 / 딱 집히는 건 없음)로 바꿨다. 8턴은 "일의 양"을 빼고 "잘해야 한다는 압박"을 넣었다(감정 쓰는 일 / 뜻대로 안 되는 것 / 압박. `demand_drain` 설명의 "등"에 든다). 매핑은 그대로다. 가이드 5절 T7·T8도 같이 고쳤다.
  - QA: `npx tsx scripts/check-choice-scripts.mts module3 module12` → 오류 0, 경고 2(끝맺음 편중, 기존).
  - QA: `MODULE_ID=module3 PICK=0 npx tsx scripts/run-choice-script.mts` → `ko-module3-pick0-workload.txt`. 일의 양을 묻는 턴은 T2 하나다(6턴 보기 "일이 몰려 있었어요"는 지난 시기의 기억을 묻는 보기라 남겼다). PICK=1·2로 8턴 보기 3개가 모두 체크포인트("…압박처럼 보여요")와 마무리("…압박이었어요")에 들어가는 것을 확인했다.
  - QA: `npx tsc --noEmit` → 0, `npm run lint && npm run build` → ESLint 0, 빌드 성공.
- [x] 3. module12·module3 en/es 반영
  - 선행: 1, 2
  - 변경: `lib/choiceScripts/en|es/module12.ts`, `en|es/module3.ts`. ko에서 바꾼 뜻을 번역투 없이 옮기고, es는 성별 중립으로 쓴다.
  - QA: `LOCALE=en` / `LOCALE=es` 린트 module3 module12 오류 0. 경로별 출력(en/es 각 module12 3경로, module3 일의 양 경로)을 확인한다.
  - 결과(2026-10-27): module12는 ko와 같은 턴(3·6·15·17·18·19·21, 마무리 3줄째·perspectiveLine, 머리 주석)을 "new everyday life" / "tu nueva rutina" 기준으로 고쳤다. es 18턴 "como de invitado"(남성형)는 "como de visita"로, es 19턴 보기 "Una rutina que sea solo mía"는 질문과 rutina가 겹쳐 "Un hábito que sea solo mío"로 바꿨다. module3은 7턴 질문 교체(뜻 흐려짐 / 생활 리듬 / 딱 집히는 것 없음), 8턴은 일의 양을 빼고 "잘해야 한다는 압박"을 넣었다.
  - QA: `LOCALE=en npx tsx scripts/check-choice-scripts.mts module3 module12` → 오류 0, 경고 0. `LOCALE=es …` → 오류 0, 경고 0.
  - QA: `LOCALE=en|es MODULE_ID=module12 PICK=0|1|2 npx tsx scripts/run-choice-script.mts` → `.agents/qa/choice-paths-2026-10-27/{en,es}-module12-pick{0,1,2}.txt`. `grep -niE "old place|new place|regular spot|sorting|my place|last day|sitio|recoger|lugar de siempre|último día"` → 0건.
  - QA: `LOCALE=en|es MODULE_ID=module3 PICK=0 …` → `{en,es}-module3-pick0-workload.txt`. 일의 양 grep(`amount|too much|cantidad|demasiado|montón`)은 T2 한 턴만 걸린다. PICK=1·2로 8턴 새 보기가 체크포인트·마무리("…is the pressure to do well" / "…es la presión de hacerlo bien")에 들어가는 것을 확인했다.
- [x] 4. 스페인어 성별 표지 검사 공용화 + 스크립트 린트
  - 변경: `ES_GENDERED_READER`를 `lib/reportQuality.ts`에서 공용 모듈로 꺼낸다(리포트 동작은 그대로). `scripts/check-choice-scripts.mts`의 es 모드에서 보기, 반응, gist, 틀에 적용한다. 걸린 es 스크립트 문구(12개 모듈 + `common.ts`)를 고친다.
  - QA: `LOCALE=es npx tsx scripts/check-choice-scripts.mts` 전체 오류 0. 리포트 품질 기존 테스트가 있으면 통과. tsc 0.
  - 결과(2026-10-27): 새 `lib/esGender.ts`에 `ES_GENDERED_READER`(리포트 목록, 글자 그대로 옮김)와 `ES_GENDERED_READER_CHAT`(보조 목록: `ti/mí mismo`, estar·sentirse·quedarse·hacerse·ser 바로 뒤 형용사 callado·quieto·despreciado·tranquilo·adulto 등), 둘을 차례로 보는 `matchEsGenderedReader`를 두었다. 리포트(`reportQuality.ts`)는 지금처럼 리포트 목록만 쓴다. 리포트 목록만으로는 스크립트에서 5건만 잡혀서(1건은 "Excitación inquieta" 오탐) 보조 목록을 더했다. 린트는 질문·보기·반응·gist·틀과 `common.ts` 공통 문구(성별 표지만)에 건다.
  - 고친 곳: 린트 오류 21건(8개 모듈) + 엔진이 안 쓰는 짝수 턴 반응 2건. module1 T4 반응, module3 T10 gist·perspectiveLine("a ti mismo" → "a tu yo"), module4 T6·T11·T20 보기, module5 T11 gist, module6 T4·T7·T14, module7·module8·module9 T20 gist, module8 T4 반응, module10 T4·T20. `common.ts`는 걸린 곳이 없었다.
  - QA: `LOCALE=es npx tsx scripts/check-choice-scripts.mts` → 오류 0, 경고 3(module4 `{g1}`·`{g14}` gist 필수 목록 밖, 기존). ko·en 전체도 오류 0.
  - QA: 일회용 스크립트(스크래치패드 `same.mts`)로 옮긴 정규식이 HEAD의 `reportQuality.ts` 원문과 같은지(true), 걸림 3건·통과 4건("el mismo lugar", "ver a tu familia tranquila" 포함)을 확인했다. 리포트 품질 전용 테스트는 저장소에 없다.
  - QA: `npx tsc --noEmit` → 0, `npm run lint && npm run build` → ESLint 0, 빌드 성공(3000번 dev 서버가 떠 있는 채로 빌드했다).
- [x] 5. 챗 모델 응답 es 성별 표지 후처리
  - 변경: 챗에서 아직 모델이 es 글을 쓰는 경로를 찾는다(위기 응답, v4가 아닌 흐름 등). 응답에 4번 검사를 건다. 걸리면 리포트의 방식(재시도 또는 교정)을 따른다. 어느 경로에 걸었는지 WIKI 또는 이 항목에 적는다.
  - 선행: 4
  - QA: 성별 표지가 든 가짜 응답으로 오프라인 테스트(걸림, 통과 각 1건 이상), tsc 0, `npm run lint && npm run build`. 모델 호출 시뮬레이션은 필요할 때만 `sim-chat` 2턴 이하로 한다(비용).
  - 결과(2026-10-27): 챗에서 모델이 글을 쓰는 곳은 `lib/chat.ts`의 `getChatReply` 하나다. en/es 기본 흐름(v2), 웹·구버전 앱(20턴), v3, 그리고 v4 고정 스크립트의 위기 응답·스크립트 없는 폴백이 모두 이 함수를 거친다(`extractChatSummary`는 사용자에게 보이지 않고 리포트 검사가 따로 본다). es 응답에서 `matchEsGenderedReaderInReply`(`lib/esGender.ts`, 두 목록, 따옴표 안의 사용자 말·퀴즈 답 인용은 제외)가 걸리면 리포트처럼 걸린 말과 고치는 법을 적어 한 번 다시 요청하고, 두 번째는 경고만 남기고 그대로 받는다. 인용 누락 재요청과 같은 1회 재시도 안에서 두 메모를 함께 붙인다.
  - QA: 스크래치패드 `chat-gender.mts`(8건: 걸림 4 "estás agotada"·"atrapado"·"ti misma"·"Te quedas callada", 통과 4 따옴표 인용 2·중립 문장 2) → 전부 통과.
  - QA: `npx tsc --noEmit` → 0, `npm run lint && npm run build` → ESLint 0, 빌드 성공. 재요청 배선은 모델 호출로 확인하지 않았다(sim-chat 생략, 비용). 실제로 걸리는지는 배포 후 서버 로그의 `[chat] … 스페인어 성별 표지` 경고로 본다.
- [x] 6. 스페인어 기준을 중남미 중립(es-419)으로 명시 + 표지 정리
  - 변경: `lib/promptLocale.ts` es 규칙 문장, `mobile/lib/i18n/STYLE_GUIDE.md`에 es-419 기준을 적는다.
    - `tú` 유지, 복수 `ustedes`
    - 끝난 일은 단순과거, `vale` 금지
    - 어휘는 `computadora`·`celular`

    `check-choice-scripts.mts` es 모드에 스페인식 표지 경고를 넣는다(`vale`, `vosotros/os`, 현재완료). 그리고 es 스크립트와 `common.ts` 반응 풀("Vale, te escucho.", "Sí, lo he leído." 등)을 고친다. 지금과 이어지는 현재완료는 남기고 이유를 적는다. `lib/i18n/es.ts`, `mobile/lib/i18n/es.ts`는 같은 grep으로 걸린 곳만 고친다.
  - QA: `LOCALE=es` 린트 전체 오류 0, 경고는 남긴 것마다 이유가 있다. `grep -rniE "\bvale\b" lib/choiceScripts/es lib/choiceScripts/common.ts` 결과 0("vale la pena"는 예외). 루트 tsc, 앱 tsc(`mobile/`에서 `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`).
  - 결과(2026-10-27): `promptLocale.ts` es 규칙을 "español latinoamericano neutro (es-419)"로 바꾸고 `ustedes`, 끝난 일은 단순과거(이어지는 일만 현재완료), 중남미 어휘(computadora·celular·carro/auto·enojarse)를 적었다. `STYLE_GUIDE.md` es 절도 같은 내용으로 바꿨다. 린트 es 모드에 스페인식 표지 경고(`vale`, `vosotros·os`, 스페인 어휘 enfado·pillar·cartera·ordenador·móvil·coche·conducir, 끝난 일의 현재완료)를 넣었다. 현재완료는 같은 문장에 이어짐 표지(todavía·aún·nunca·alguna vez·últimamente·con el tiempo·ya 등)가 있으면 넘기고, 그 밖에 남긴 것은 `ES_PERFECT_KEPT`에 이유와 함께 적었다(가족 안 역할·결과 상태·"has mantenido" 등 16구절). JS `\b`가 ñ·á를 단어 밖으로 봐서("Pequeños"의 "os") 글자 경계를 직접 쓴다.
  - 고친 곳: `common.ts` "Vale, te escucho." → "De acuerdo, te escucho.", "Sí, lo he leído." → "Sí, lo leí."; 12개 모듈 체크포인트·마무리 "me has contado" → "me contaste"(24곳); module6 enfado → enojo 전부, T19 "estando enfadado"(성별 표지인데 린트가 못 잡음) → "en pleno enojo", T17 질문·T7 반응·마무리 틀 단순과거; module2 cartera → billetera; module4 "me han pillado / te pillen" → "me descubrieron / te descubran", T12 질문·T17 반응 단순과거; module3 T6, module12 T1("que viviste hace poco"), module10 T5 반응 2개·T11 질문·T14 보기 단순과거. 웹 `lib/i18n/es.ts` "Ya he contado suficiente" → "Ya conté suficiente". 나머지 UI 현재완료(ya ha hablado, se ha usado, se han restaurado, ha llegado, has usado, aún no has explorado, todo lo que has compartido)는 방금 생긴·지금까지의 상태라 남겼다. 앱 `mobile/lib/i18n/es.ts`는 고친 곳이 없다("vale la espera"는 예외) → OTA 불필요.
  - QA: `LOCALE=es npx tsx scripts/check-choice-scripts.mts` → 오류 0, 경고 3(module4 `{g1}`·`{g14}` gist, 기존). 스페인식 표지 경고 0. ko(오류 0, 경고 22 — 고치기 전 HEAD와 같은 수, 끝맺음 편중)·en(오류 0, 경고 3) 전체도 확인.
  - QA: 스크래치패드 `spain.mts`로 린트 정규식 확인 — 옛 문구 "Vale, te escucho."·"lo he leído"·"me has contado"·"enfado"·"Os"·"cartera"는 걸리고 "vale la pena"·"Pequeños logros"·"ha crecido últimamente"·"Todavía no has fijado"는 통과.
  - QA: `grep -rniE "\bvale\b" lib/choiceScripts/es lib/choiceScripts/common.ts | grep -vi "vale la pena"` → 0. `npx tsc --noEmit` → 0, `npm run lint && npm run build` → ESLint 0, 빌드 성공. 앱 tsc(`mobile/`, 큰 스택) → 0.
- [ ] 7. (사용자 확인) 문구 판정
  - 1~3의 경로별 출력 파일을 열어 ko는 직접 읽고, en/es는 어색한 곳을 표시한다. 문제가 있으면 이 항목에 적고 해당 항목을 다시 연다.
- [ ] 8. (사용자 실행) 커밋·푸시 → Vercel 웹 배포
  - 스크립트는 서버 데이터라 웹 배포로 앱에도 반영된다. 앱 문구(`mobile/lib/i18n/es.ts`)를 고쳤다면 그 부분만 다음 OTA에 실린다(iOS 1.2.0 승인 뒤).

## 발견 사항
- (3번) es module3 체크포인트·마무리 "lo que más pesa en tus días es las personas", "En tus días pesa sobre todo las personas": 2턴 gist가 복수일 때 동사 수 일치가 깨진다(기존 문장). 틀을 "lo que más pesa… son…" 꼴로 바꾸거나 gist를 단수로 써야 한다.
- (4번) 짝수 턴 반응은 엔진이 쓰지 않는데 데이터에 남아 있고 린트도 보지 않는다. 이번에 성별 표지가 있던 짝수 턴 반응 2건(module1·module8 T4)은 같이 고쳤다.
- (5번 참고) 챗 응답 검사는 `matchEsGenderedReader`(두 목록)를 쓰면 된다.
- (1번) `lib/modulePlaybooks.ts` module12의 boundary·C단계·`anchor_in_new` 설명이 아직 "새 자리"라고 쓴다. v2 모델 프롬프트(지금 en/es 기본 흐름)와 리포트에 들어가는 문장이라 이번 범위(고정 스크립트) 밖. 같은 전제 문제가 있는지 다음 SPEC에서 볼 것.
- (2번) `CHOICE_SCRIPT_GUIDE.md` 5절은 T7·T8 말고도 `module3.ts`와 이미 다르다(T1 반응 등이 코드에서 바뀜). 가이드를 원문으로 쓰려면 한 번 맞춰야 한다.
- (5번) `lib/esGender.ts`의 `ES_GENDERED_READER_CHAT` 동사 목록에 "estando"가 없어 module6 "estando enfadado"를 못 잡았다(문구는 6번에서 고침). 다음에 목록에 더할 것.
- (6번) `lib/promptLocale.ts` es 규칙에 "Evita las fórmulas de IA…" 문장이 거의 같은 꼴로 두 번 들어 있다(기존). 하나로 합칠 것.
- (6번) 리포트 본문 데이터·법적 문서·SEO 글의 스페인식 현재완료·어휘는 이번에 손대지 않았다(SPEC 제외 범위). 규칙이 바뀌었으니 다음 생성분부터 따른다.
