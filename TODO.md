# TODO: ingan.ai 경쟁 분석 반영 — 기능 → 디자인 → 퀄리티

SPEC.md, MODULE_PLAYBOOK.md v2 승인 완료(2026-09-27). 항목마다 **새 세션에서 `/work`로 하나씩** 처리한다.

공통 메모:
- 루트 tsc: `npx tsc --noEmit`
- mobile tsc: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`
- `sim-chat`, `judge-chat`, `gen-qa-fixtures`는 OpenAI를 호출해서 돈이 든다. 턴 수와 모듈 수를 항목에 적힌 만큼만 쓴다.
- **Q0(평가 도구와 기준선)은 반드시 Q1(챗봇 개편) 전에 끝낸다.** F1-a는 추출 프롬프트만 바꾸고 챗봇 응답 지침은 건드리지 않으므로 기준선에 영향이 없다.

## 기능

- [x] 1. F0-a: `lib/modulePlaybooks.ts` 타입 정의 + 모듈 1~4 데이터
  - 변경: 새 파일. 플레이북 항목(전문 관점, 경계, 시그니처 질문, 7단계 흐름, 이지선다 축, 감정 팔레트, 모순 축, 리프레이밍, 19턴 관점 전환 대상, 추출 필드 2개, 리포트 페이지 제목과 지시문, 강점 방향)을 담는 타입을 만들고, 모듈 1~4를 채운다. 사용자에게 보이는 문구는 ko/en/es, 모델 지시문은 한국어.
  - QA: 루트 tsc 통과.
  - QA: `npx tsc --noEmit`(루트) → exit 0, 오류 없음 (2026-09-27)
  - 메모(F0-b용): `MODULE_PLAYBOOKS`는 지금 `Partial<Record<…>>`다. 모듈 5~11을 채우면 `Record<PlaybookModuleId, ModulePlaybook>`로 바꿔 누락을 타입으로 막는다. 7번째 턴 문구를 옮길 필드(예: `patternTurnInstruction`)는 F0-b에서 타입에 추가한다.

- [x] 2. F0-b: 모듈 5~11 데이터 + 7번째 턴 지침 흡수
  - 선행: 1
  - 변경: 모듈 5~11 데이터 추가. `lib/chatPrompts.ts`의 `MODULE_PATTERN_INSTRUCTIONS`를 플레이북 파일에서 읽도록 옮긴다(이 항목에서는 문구를 바꾸지 않아 동작이 같아야 한다).
  - QA: 루트 tsc 통과. 변경 전후로 `buildChatSystemPrompt(7, ctx)`를 11개 모듈에 대해 출력해 비교하는 일회성 스크립트(스크래치 디렉터리)로 7번째 턴 문구가 동일함을 확인.
  - QA: `npx tsc --noEmit`(루트) → exit 0, 오류 없음. 스크래치 스크립트로 `buildChatSystemPrompt(7, ctx, 0)` 전체 프롬프트를 module1~11 + moduleId 없음 + 알 수 없는 id(13개)에 대해 변경 전/후 JSON으로 저장 → `cmp` 결과 IDENTICAL (2026-09-27)
  - 메모: `MODULE_PLAYBOOKS`는 이제 `Record<PlaybookModuleId, ModulePlaybook>`. 7번째 턴 문구는 `patternTurnInstruction` 필드로 옮겼고 `chatPrompts.ts`의 `MODULE_PATTERN_INSTRUCTIONS`는 삭제됨. `getModulePlaybook()`은 own-property만 인정(`"toString"` 같은 id로 프로토타입 값이 나오지 않게).

- [x] 3. F1-a: 대화 추출 확장
  - 선행: 2
  - 변경: `lib/chatPrompts.ts`의 `buildExtractionPrompt()`에 공통 필드 `coping`, `relational`, `desired_change`와 모듈 추출 필드 2개(`module_fields`)를 추가한다. 말하지 않은 건 `null`. `lib/chat.ts`의 `ChatExtract`, 저장/전달 경로(`app/api/chat/route.ts`, 앱에서 리포트 요청으로 넘기는 곳)를 따라가며 타입을 맞춘다. 필드는 모두 optional(구버전 호환).
  - QA: 루트 tsc + mobile tsc 통과. `npx tsx --env-file=.env.local scripts/sim-chat.mts 20 talkative module2 4` 1회 실행 후 extract에 새 필드가 채워지는지 확인(sim-chat이 extract를 출력하지 않으면 이 항목에서 출력만 추가).
  - QA: `npx tsc --noEmit`(루트) → exit 0. mobile tsc → exit 0. `sim-chat.mts 20 talkative module2 4` → `coping`/`relational`/`desired_change` 모두 채워짐, `module_fields`(`money_script`, `money_loop`)는 번아웃 페르소나가 돈 얘기를 안 해서 둘 다 JSON null(의도대로). 보강으로 `sim-chat.mts 8 talkative module3 4` → `module_fields.demand_drain`/`resource_left` 채워짐, 8턴이라 `desired_change`는 null (2026-09-27)
  - 메모: 앱(`mobile/screens/ChatScreen.tsx`의 `ChatExtract = Record<string, unknown>`)과 `/api/chat`, 리포트 요청은 extract를 그대로 넘겨서 코드 변경이 필요 없었다. `describeReportData()`(`lib/reportQuality.ts`)는 문자열 값만 싣기 때문에 `module_fields`(객체)는 아직 리포트 리뷰어에게 안 간다. 리포트 프롬프트에 넣는 건 F1-b. 플레이북에 없는 moduleId면 `module_fields`는 스키마와 결과 모두에서 빠진다. 파싱은 플레이북 key만 남기고 문자열 "null"/빈 문자열은 null로 바꾼다.

- [x] 4. F1-b: 리포트 서버 — `module_map`(무료), `module_deep`(유료)
  - 선행: 3
  - 변경: `lib/reportPrompts.ts`(리포트 데이터에 모듈 관점, 핵심 질문, 추출 필드, 강점 방향 추가, 두 필드 스키마와 지시문은 플레이북에서), `lib/report.ts`(타입, `parseReport`), `lib/reportLock.ts`(`module_deep`을 `LOCKED_KEYS`에), `lib/reportQuality.ts`(밀도 검사).
  - QA: 루트 tsc 통과. `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts` 실행 후 `mobile/dev/qaData.ts`에서 모듈이 다른 페르소나 2명 이상, 3개 언어의 `module_map`/`module_deep`을 읽고 모듈마다 다른 관점과 제목인지 확인. 잠금 응답에서 `module_deep`이 가려지는지 코드 리뷰로 확인.
  - QA: `npx tsc --noEmit`(루트) → exit 0, mobile tsc → exit 0. `gen-qa-fixtures.mts` 3회 실행(3회차 최종) → 7명 모두 `module_map`/`module_deep` 4~6문장, 모듈 1(mia·riley en, lucia es)은 "Your relationship alarm"/"Tu alarma en las relaciones" + 안전기지, 모듈 3(jisoo ko, jordan·sam en, casey es)은 "에너지 수지표"/"다시 채우는 순서" 계열로 관점과 제목이 다름. 남은 코드 결함은 기존 `oheng_intro` 일간 문장(jisoo, lucia)뿐. 스크래치 실행(ko 모듈 1, part "free") → `module_map` 채워짐, `module_deep` = `{title:"나에게 안전기지가 되는 관계", body:""}`, 다른 유료 필드 비어 있음. `moduleId` 없는 요청의 프롬프트에는 `module_map` 없음 (2026-09-27)
  - 작업 중 고친 것: 모델이 모듈 페이지를 객체로 감싸 보내 본문이 빈 경우(1·2회차 casey)가 있어 파서가 객체 안의 문자열을 받게 하고, 본문이 비면 결함으로 잡아 재작성한다. `countSentences`가 따옴표로 끝나는 문장(`?”`)을 세지 못하던 것을 고쳤다(모듈 1 유료 페이지가 부탁 문장을 인용함). ES 성별 검사가 "apego ansioso"를 독자 성별로 오탐해 예외 처리. 무료 응답은 이제 유료 필드를 코드로 비워서 보낸다(모델이 스키마 밖 필드를 써도 새지 않게).
  - 메모(F1-c용): 두 필드는 `{ title, body }`. 무료 응답(`locked_pending`)에는 `module_deep`이 `{ title, body: "" }`로 온다. 제목은 잠금 페이지와 TOC에 쓰고, 본문은 구매 후 `/api/report/paid`의 `locked.module_deep`으로 온다. `locked_shape`는 바꾸지 않았다. 픽스처는 이제 연애 페르소나(mia, riley=en, lucia=es)가 모듈 1, 나머지(jisoo=ko, jordan, sam=en, casey=es)가 모듈 3이다.

- [x] 5. F1-c: 리포트 화면 — 모듈 전용 페이지 2장 + i18n
  - 선행: 4
  - 변경: `mobile/screens/ReportScreen.tsx` 타입과 `pages`: `module_map`은 무료 구간의 "다가오는 시기" 미리보기 앞, `module_deep`은 유료 구간의 행동 가이드 앞. 필드가 없으면 건너뜀. TOC 라벨. `mobile/lib/i18n/{ko,en,es}.ts`.
  - QA: mobile tsc 통과. `mobile-web` 프리뷰(375×812)에서 무료 사용자로 3개 언어 리포트를 열고 `get_page_text`로 순서와 잠금 상태 확인. 이전 형식 픽스처도 에러 없이 열리는지 확인.
  - QA: mobile tsc → exit 0. `mobile-web`(375×812, `?qa=free`) 본문 텍스트 확인: jisoo(ko) 목차 05 "에너지 수지표" p12 → 06 다가오는 시기 p13, 잠긴 11 "다시 채우는 순서"(강점과 취약점 뒤, 행동 지침 앞), 41쪽 중 13쪽 미리보기. mia(en) "Your relationship alarm" p12 / 잠긴 "A relationship that feels like a safe base". lucia(es) "Tu alarma en las relaciones" p14 / 잠긴 "Una relación que sea tu base segura". 세 언어 모두 무료 페이지 본문은 보이고 유료 페이지는 페이월로 대체됨. 이전 형식 픽스처(커밋 `8303000`의 `qaData.ts`로 잠시 교체 후 원복, 해시 동일 확인) → 모듈 페이지 없이 39쪽으로 열림, 콘솔 에러 없음 (2026-09-27)
  - 구현: 두 페이지는 새 `ModulePage`(눈썹 문구 `report.moduleLensEyebrow` + 플레이북 제목 + 본문). 목차 라벨은 페이지 제목 그대로. `module_deep`은 제목만 있어도 잠긴 페이지 자리를 잡는다(무료 응답은 본문 빈 문자열). 구매 후 `/api/report/paid`에 보내는 `freePart`에 `module_map`을 추가해 유료 파트가 무료 모듈 페이지를 반복하지 않게 했다(서버 `describeFreePart`가 이미 읽음).

- [x] 6. F2-a: 강점 서버 — 무료 3개 + 잠긴 핵심 1개
  - 선행: 4 (같은 파일을 만짐)
  - 변경: `lib/reportPrompts.ts`(`strengths_preview` 3개를 `freeFields`와 `FREE_PART_TEXT_FIELDS`에, `strengths`는 겹치지 않는 핵심 1개로, 강점 방향은 플레이북에서), `lib/report.ts`, `lib/reportLock.ts`(`locked_shape.strengths` = 1), `lib/reportQuality.ts`.
  - QA: 루트 tsc 통과. `gen-qa-fixtures` 재실행 후 3개 언어에서 `strengths_preview` 3개, `strengths` 1개, 서로 겹치지 않는지 확인.
  - QA: `npx tsc --noEmit`(루트) → exit 0, mobile tsc → exit 0. `gen-qa-fixtures.mts` 4회 실행(4회차 최종) → 7명(ko 1, en 4, es 2) 모두 `strengths_preview` 3개 + `strengths` 1개, 결정론적 검사 0건. 핵심 강점은 mia "Direction setting", jisoo "구조 감각", jordan "Directional sense", lucia "Dirección interna"처럼 무료 3개(알아채는 감각·버팀·책임 계열)와 다른 능력. 전체 생성 모드에서 sam "Relentless completion", casey "Criterio claro"는 아직 무료 강점과 가깝다. 실제 앱 경로(무료 → `freePart`에 `strengths_preview`를 넣은 유료)를 스크래치 스크립트로 jisoo·mia·casey·lucia·sam 실행 → 5명 모두 유료 프롬프트에 무료 강점 줄이 들어가고 핵심 1개가 따로 나옴(sam "Directional clarity", casey "Criterio que ordena"). `strengthsSplit` 없는 요청의 프롬프트에는 `strengths_preview`가 없음(구버전 앱 호환) (2026-09-27)
  - 구현: 구버전 앱(이미 `moduleId`를 보냄)이 새 서버에서 유료 강점 1개만 받게 되는 걸 막으려고, 분할은 앱이 `context.strengthsSplit: true`를 보낼 때만 한다(레이아웃 플래그, 유료 내용 노출 없음). 유료 절반은 `freePart.strengths_preview`가 있을 때만 1개로 쓴다. `strengths_preview`는 배열이라 `FREE_PART_TEXT_FIELDS` 대신 `describeFreePart`가 따로 싣는다. 무료 응답의 `locked_shape.strengths`는 무료 강점이 있으면 1, 없으면 4. 핵심 강점 겹침 방지는 근거를 나눠서 했다(무료 3개: 심리검사 답·상담, 플레이북 강점 방향 3개에 하나씩 / 핵심 1개: 일간 기질, 강점 방향 3개 금지). 제목 단어 겹침 검사(제목·본문 함께 재작성), 리뷰어 규칙 5에 중복 추가, "free preview" 같은 메타 발언을 `META_LEAK`에 추가. `gen-qa-fixtures`는 `strengthsSplit: true`로 생성한다.
  - 메모(F2-b용): 앱이 할 일 두 가지 — `buildReportContext()`에 `strengthsSplit: true`, 구매 후 `/api/report/paid`에 보내는 `freePart`에 `strengths_preview` 추가. 이 둘이 없으면 서버는 예전 4개 방식으로 동작한다. 지금 `qaData.ts`는 분할 형식이라 F2-b 전까지 `mobile-web` 리포트에는 강점이 1장만 보인다.

- [x] 7. F2-b: 강점 화면
  - 선행: 6
  - 변경: `mobile/screens/ReportScreen.tsx` — 무료 강점 3장은 잠금 없이 무료 구간에, 핵심 강점 1장은 유료 구간에 제목까지 가려서. `strengths_preview`가 없는 이전 리포트는 기존 4장 유료 렌더링 유지. i18n "핵심 강점" 라벨.
  - QA: mobile tsc 통과. `mobile-web`에서 무료 사용자 3개 언어로 확인(`get_page_text` + 핵심 강점 페이지 스크린샷 1장). 이전 형식 픽스처 확인.
  - QA: mobile tsc → exit 0. `mobile-web`(375×812, `?qa=free`) 본문 텍스트 확인: jisoo(ko) 목차 06 "강점" p13 → 07 다가오는 시기 p16, 잠긴 11 "핵심 강점과 취약점", 41쪽 중 16쪽 미리보기, "강점 · 01~03 / 03" 세 장이 페이월 앞에 보이고 핵심 강점 제목("구조 감각")은 무료 화면 어디에도 없음. mia(en) "Strengths" p13 / "STRENGTH · 01~03 OF 03" / 잠긴 "Core Strength & Weaknesses", 42쪽 중 16쪽. lucia(es) "Fortalezas" p14 / "FORTALEZA · 01~03 DE 03" / 잠긴 "Fortaleza central y puntos débiles", 43쪽 중 17쪽. `?qa=all` jisoo에서 핵심 강점 페이지("핵심 강점" 라벨 + "구조 감각") 스크린샷 확인. 이전 형식 픽스처(커밋 `8303000`의 `qaData.ts`로 잠시 교체 후 원복, 해시 동일 확인) → 무료 강점 없이 39쪽, 목차 "강점과 취약점", `qa=all`에서 "강점 · 01~04 / 04", 콘솔 에러 없음 (2026-09-27)
  - 구현: 무료 강점 3장은 기존 `CardPage`(jade)로 모듈 페이지(`module_map`) 뒤, 다가오는 시기 미리보기 앞에 둔다(미리보기가 페이월 직전 자리를 유지). `strengths_preview`가 있으면 유료 쪽 `strengths`는 "핵심 강점" 라벨 1장이고 목차 라벨이 "핵심 강점과 취약점"으로 바뀐다. 잠긴 페이지는 페이월 한 장으로 대체되므로 핵심 강점 제목은 구매 전 어디에도 나오지 않는다. `buildReportContext()`에 `strengthsSplit: true`, 구매 후 `freePart`에 `strengths_preview` 추가. i18n 새 키 `sectionCoreStrengthWeaknessesToc`, `coreStrengthIndex`(무료 목차 라벨은 기존 `sectionStrengths` 재사용 — 무료 강점이 3개 미만일 수 있어 개수를 넣지 않음).

## 디자인

- [x] 8. D1: 페이월 카드에 잠긴 챕터 목록
  - 변경: `PaywallPage`에 잠긴 TOC 항목 제목 목록(자물쇠 아이콘 + 제목). `YearReportScreen`의 `lockedRow` 모양과 맞춤. `impeccable` 1패스(점검 → 일괄 수정 → 확인 1회).
  - QA: mobile tsc 통과. `mobile-web`(375×812)에서 3개 언어 스크린샷 — 목록이 보이고 구매 버튼이 첫 화면 안에 있음.
  - QA: mobile tsc → exit 0. `mobile-web`(375×812, `?qa=free`) 페이월 스크린샷 3장 + 구매 버튼 위치 측정: jisoo(ko) 잠긴 챕터 7개("직접 나눈 이야기"~"마무리", 모듈 제목 "다시 채우는 순서" 포함), 구매 버튼 하단 y=525 / 812, 면책 문구까지 한 화면. mia(en) 7개("A relationship that feels like a safe base" 포함), y=525, 한 화면. lucia(es) 7개("Una relación que sea tu base segura" 포함), y=544, 면책 문구만 첫 화면 아래(세로 스크롤로 보임). 콘솔 에러 없음 (2026-09-27)
  - 구현: 목록은 이미 계산된 `tocEntries` 중 잠긴 항목의 라벨을 그대로 쓴다(새 i18n 키 없음, 모듈 페이지 제목과 "핵심 강점과 취약점"이 자동 반영). 모양은 신년 리포트 `lockedRow`(자물쇠 + 제목 + 구분선)를 페이월 카드 안에 맞게 줄인 것(행 30pt, 탭 대상 아님). 목록이 본문 나열을 대신하므로 `paywallBody`를 3개 언어 모두 한 문장으로 줄였다. 작은 화면이나 큰 글자에서 잘리지 않게 카드 영역을 세로 `ScrollView`로 감쌌다(375×812에서는 스크롤 없이 들어감).

- [ ] 9. D2: 계산 근거 배지
  - 변경: 심층 리포트 커버와 사주 결과 화면에 정적 배지. i18n 3개 언어. 탭 가능해 보이지 않게. `impeccable` 1패스.
  - QA: mobile tsc 통과. `mobile-web`에서 두 화면 × 3개 언어 스크린샷.

## 퀄리티

- [ ] 10. Q0-a: `sim-chat` 확장 — 모듈별 페르소나
  - 변경: `scripts/sim-chat.mts`에 모듈별 페르소나 11개(모듈 주제에 맞는 상황, 말투, 일부는 자책 발언) + EN/ES 페르소나 2개. 모듈에 맞는 퀴즈 결과와 답변 풀을 페르소나마다 둔다. 대화 기록과 extract를 JSON 파일로 저장(`scripts/out/`, `.gitignore`에 추가).
  - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts 3 <persona> module6` 1회 스모크 실행, 결과 파일 생성 확인.

- [ ] 11. Q0-b: `judge-chat` + 개편 전 기준선
  - 선행: 10
  - 변경: 새 스크립트 `scripts/judge-chat.mts`. SPEC Q0의 루브릭(기법 ①~⑦, 모듈 전문성, 옆 모듈로 새지 않음, 반복 없음, 자연스러움, 위반 없음 — 항목별 0~2점)으로 대화 파일을 채점하고 점수표(JSON + 요약 표)를 저장. 채점자는 상위 모델.
  - QA: **현재 프롬프트 그대로** 모듈 4개(1, 2, 6, 9) × 20턴 × 페르소나 1개씩 실행 → 채점. 기준선 점수표를 `scripts/out/baseline_*.json`으로 남기고, 요약 표를 이 항목 아래에 붙인다. 호출 비용도 함께 적는다.

- [ ] 12. Q1-a: 모듈별 20턴 흐름
  - 선행: 2, 11
  - 변경: `lib/chatPrompts.ts` — 2~19턴 공통 `PHASE_INSTRUCTIONS`를 플레이북의 7단계 흐름(모듈별 질문, 시그니처 질문 위치, 19턴 관점 전환 대상)으로 생성. 턴 1·6·10·13·17·20의 고정 역할 유지. `moduleId` 없으면 기존 공통 지침으로 폴백.
  - QA: 루트 tsc 통과. 모듈 2개(1, 9) × 12턴으로 `sim-chat` → `judge-chat`. 모듈 전문성 점수가 기준선보다 오르는지, 위반 점수가 나빠지지 않는지 확인. 두 대화를 나란히 읽어 겹치는 느낌이 없는지 발췌를 남긴다.

- [ ] 13. Q1-b: 대화 기법 7종 + 규칙 정리 + 예시 대화
  - 선행: 12
  - 변경: `lib/chatPrompts.ts` — SPEC Q1-b 표대로 기법 ①~⑦ 도입(⑧ 제외), 규칙 9 완화(사용자 재료 기반 확인형 가설만 허용), 규칙 13개와 누적 패치 문장을 핵심 원칙 중심으로 재작성(안전 프로토콜, 조언 금지, 질문 1개, 몸 위치 금지, 내부 이름 금지, 종료 의사 처리 유지), 한국어 예시 대화 1~2개(6~8턴 발췌). 변경 이력은 코드 주석에 날짜와 함께.
  - QA: 루트 tsc 통과. 모듈 2개(2, 6, 자책 발언 페르소나 포함) × 14턴 `sim-chat` → `judge-chat`. 기법 ②⑥⑦ 점수가 기준선보다 오르고 위반 점수가 나빠지지 않는지 확인.

- [ ] 14. Q1-c: 가설 이어 가기(`formulation`)
  - 선행: 13
  - 변경: 챗봇 응답 JSON에 숨김 필드 `formulation`(핵심 가설 한 문장, 근거 발언, 모순 후보, 다음 수). `lib/chat.ts`가 파싱해 반환하고, `app/api/chat/route.ts`가 요청의 직전 `formulation`을 프롬프트에 넣는다. `mobile/screens/ChatScreen.tsx`는 값을 보관했다가 다음 요청에 보낸다(화면과 저장 기록에는 노출 안 함). 없으면 기존 동작. `scripts/sim-chat.mts`도 같은 방식으로 전달.
  - QA: 루트 tsc + mobile tsc 통과. 모듈 1개 × 20턴 `sim-chat` → `judge-chat`으로 깔때기(②)와 재확인(⑥) 점수 확인, 출력 토큰 증가량 기록. `mobile-web`에서 대화 1회를 10턴 이후 "다 얘기했어요"로 끝내고 리포트까지 이어지는지, `formulation`이 화면에 안 보이는지 확인.

- [ ] 15. Q1-e: 최종 비교 + 모델 비교 보고
  - 선행: 14
  - 변경: 코드 변경 없음(필요하면 `sim-chat`/`judge-chat`에 모델 선택 인자만 추가).
  - QA: 기준선과 같은 조건(모듈 1, 2, 6, 9 × 20턴)으로 개편 후 점수표 작성. 같은 조건으로 상위 모델 1~2개도 실행해 점수, 턴당 비용, 응답 시간 비교 표를 만든다. 사람이 직접 모듈 3개 대화를 읽고 발췌를 이 항목 아래에 남긴다. **모델 교체 여부는 사용자에게 보고하고 결정을 기다린다.**

- [ ] 16. Q2: 스페인어 나이 문법 검사
  - 변경: `lib/reportQuality.ts`의 `checkReportDeterministic()`에 ES `upcoming_period*` 필드에서 나이 숫자가 문법적 주어로 쓰인 경우(예: "38 años marcan…")를 결함으로 잡는 검사 추가.
  - QA: 루트 tsc 통과. 스크래치 스크립트로 위반 샘플 2~3개는 결함 반환, 정상 샘플("A partir de los 38 años…")은 통과 확인.

## 사용자 확인

- [ ] 17. (사용자 실행) 배포와 실기기 확인
  - 이전 작업("다가오는 시기" 무료 페이지, 커밋 `a7bfed6`)의 배포와 실기기 확인도 여기에 합친다.
  - 순서: 웹(Vercel) 배포 → OTA(`eas update --branch production`) → TestFlight 또는 iOS 시뮬레이터 dev-client에서 확인.
  - 확인할 것: 모듈 2개 이상 실제 대화(10턴 이후 조기 종료 포함), 새 리포트의 무료 페이지(`module_map`, 강점 3개, 다가오는 시기 미리보기)와 페이월 챕터 목록, 구매 후 잠긴 페이지(`module_deep`, 핵심 강점, 다가오는 시기 본편)가 무료 파트를 반복하지 않고 이어지는지, 배지 표시.
  - (사용자 확인) — RevenueCat 구매와 실기기가 필요해 자동화 불가.

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

이전 작업(2026-09-22 "다가오는 시기")에서 넘어온 미해결 항목:
- `lib/report.ts`의 `runReport()`가 가끔 "shipped with N unresolved code finding(s)"을 로그로 남긴 채 재시도 없이 내보낸다(기존 동작).
- `mobile/screens/ReportScreen.tsx`의 `TocPage` 행이 `Pressable`이 아니라 목차 항목을 탭해도 해당 페이지로 이동하지 않는다.
- 신년 리포트 마무리(closing)가 심층 리포트 `closing_body`보다 뭉뚱그려진 표현으로 끝나는 경향(`lib/yearReportPrompts.ts` 규칙 3-1 강화 검토).
- (F1-b) `app/api/report-pdf/route.ts`의 심층 리포트 파서가 아는 필드만 옮겨서 `module_map`/`module_deep`이 PDF에 안 들어간다. PDF에도 넣을지 결정 필요.
- (F1-b) `lib/reportQuality.ts`의 `ES_GENDERED_READER`에 "expuest-", "pegad-" 같은 형용사가 없어 "no quedar tan expuesta", "quedarte pegada al teléfono"가 걸리지 않았다(1·2차 픽스처 lucia). 목록 보강 검토.
- 신년 리포트 12개월 타임라인에서 3월만 신살 이름이 빠짐(jisoo, ko). 계산 결과인지 누락 버그인지 `sinsalName()`/`branchLine()` 확인 필요.
- (F2-a) 전체 생성 모드(구매자가 처음 리포트를 만들 때, 한 번에 전부 씀)에서는 번아웃 모듈 영어·스페인어 페르소나(sam, casey)의 핵심 강점이 무료 강점과 아직 가깝다. 무료 → 유료 두 단계 경로는 괜찮았다. 필요하면 전체 모드에서 핵심 강점 순서를 앞당기거나 리뷰어 중복 규칙을 강화하는 방향 검토.
- (F2-a) 무료 생성 10여 회 중 1회(jisoo, ko) 모델이 `strengths_preview`를 빠뜨렸다. 그 리포트는 유료 4개로 돌아가서 깨지지는 않지만, 빈도가 높으면 무료 강점만 다시 쓰는 표적 호출을 검토.
- (F2-a) 영어 리포트에 "Riley님", "Jordan님"처럼 한국어 호칭이 섞이는 경우가 있다(2회차 riley는 19개 필드). 결정론적 검사가 잡지만 패치 경로가 14개로 잘려서 다 못 고치고 내보냈다. 프롬프트 예시의 "님" 영향으로 보임.
- (F1-c) 모델이 `module_map` 본문 첫 문장에서 페이지 제목을 되풀이한다(lucia es: "Tu alarma en las relaciones se enciende…", jisoo도 비슷). 프롬프트는 되풀이 금지인데 검사가 없음. `reportQuality.ts`에 제목 반복 검사 추가 검토.
- (D1) 첫 번째 잠긴 페이지인 "다가오는 시기" 본편은 목차 라벨이 무료 미리보기 쪽에만 있어서 페이월 챕터 목록에 나오지 않는다. 목록에 "다가오는 시기 — 이어지는 이야기" 같은 항목을 넣을지 검토(압박 규칙상 제목만이면 괜찮음).
