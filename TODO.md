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
- [ ] 3. module12·module3 en/es 반영
  - 선행: 1, 2
  - 변경: `lib/choiceScripts/en|es/module12.ts`, `en|es/module3.ts`. ko에서 바꾼 뜻을 번역투 없이 옮기고, es는 성별 중립으로 쓴다.
  - QA: `LOCALE=en` / `LOCALE=es` 린트 module3 module12 오류 0. 경로별 출력(en/es 각 module12 3경로, module3 일의 양 경로)을 확인한다.
- [ ] 4. 스페인어 성별 표지 검사 공용화 + 스크립트 린트
  - 변경: `ES_GENDERED_READER`를 `lib/reportQuality.ts`에서 공용 모듈로 꺼낸다(리포트 동작은 그대로). `scripts/check-choice-scripts.mts`의 es 모드에서 보기, 반응, gist, 틀에 적용한다. 걸린 es 스크립트 문구(12개 모듈 + `common.ts`)를 고친다.
  - QA: `LOCALE=es npx tsx scripts/check-choice-scripts.mts` 전체 오류 0. 리포트 품질 기존 테스트가 있으면 통과. tsc 0.
- [ ] 5. 챗 모델 응답 es 성별 표지 후처리
  - 변경: 챗에서 아직 모델이 es 글을 쓰는 경로를 찾는다(위기 응답, v4가 아닌 흐름 등). 응답에 4번 검사를 건다. 걸리면 리포트의 방식(재시도 또는 교정)을 따른다. 어느 경로에 걸었는지 WIKI 또는 이 항목에 적는다.
  - 선행: 4
  - QA: 성별 표지가 든 가짜 응답으로 오프라인 테스트(걸림, 통과 각 1건 이상), tsc 0, `npm run lint && npm run build`. 모델 호출 시뮬레이션은 필요할 때만 `sim-chat` 2턴 이하로 한다(비용).
- [ ] 6. 스페인어 기준을 중남미 중립(es-419)으로 명시 + 표지 정리
  - 변경: `lib/promptLocale.ts` es 규칙 문장, `mobile/lib/i18n/STYLE_GUIDE.md`에 es-419 기준을 적는다.
    - `tú` 유지, 복수 `ustedes`
    - 끝난 일은 단순과거, `vale` 금지
    - 어휘는 `computadora`·`celular`

    `check-choice-scripts.mts` es 모드에 스페인식 표지 경고를 넣는다(`vale`, `vosotros/os`, 현재완료). 그리고 es 스크립트와 `common.ts` 반응 풀("Vale, te escucho.", "Sí, lo he leído." 등)을 고친다. 지금과 이어지는 현재완료는 남기고 이유를 적는다. `lib/i18n/es.ts`, `mobile/lib/i18n/es.ts`는 같은 grep으로 걸린 곳만 고친다.
  - QA: `LOCALE=es` 린트 전체 오류 0, 경고는 남긴 것마다 이유가 있다. `grep -rniE "\bvale\b" lib/choiceScripts/es lib/choiceScripts/common.ts` 결과 0("vale la pena"는 예외). 루트 tsc, 앱 tsc(`mobile/`에서 `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`).
- [ ] 7. (사용자 확인) 문구 판정
  - 1~3의 경로별 출력 파일을 열어 ko는 직접 읽고, en/es는 어색한 곳을 표시한다. 문제가 있으면 이 항목에 적고 해당 항목을 다시 연다.
- [ ] 8. (사용자 실행) 커밋·푸시 → Vercel 웹 배포
  - 스크립트는 서버 데이터라 웹 배포로 앱에도 반영된다. 앱 문구(`mobile/lib/i18n/es.ts`)를 고쳤다면 그 부분만 다음 OTA에 실린다(iOS 1.2.0 승인 뒤).

## 발견 사항
- (1번) `lib/modulePlaybooks.ts` module12의 boundary·C단계·`anchor_in_new` 설명이 아직 "새 자리"라고 쓴다. v2 모델 프롬프트(지금 en/es 기본 흐름)와 리포트에 들어가는 문장이라 이번 범위(고정 스크립트) 밖. 같은 전제 문제가 있는지 다음 SPEC에서 볼 것.
- (2번) `CHOICE_SCRIPT_GUIDE.md` 5절은 T7·T8 말고도 `module3.ts`와 이미 다르다(T1 반응 등이 코드에서 바뀜). 가이드를 원문으로 쓰려면 한 번 맞춰야 한다.
