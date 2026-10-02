# TODO: 챗봇 5세트 개편

SPEC: `SPEC.md` (설계 근거: `CHAT_SETS_DRAFT.md`). 이전 작업: `TODO_2026-09-23.md`.
한 번의 `/work`에 항목 하나. 순서대로 진행하되 "선행"이 없는 항목은 순서를 바꿔도 된다.

## 사용자 실행 (선행)

- [x] 0. (사용자 실행) 지난 배치 먼저 배포
  - 이유: 지난 챗봇 개편(이전 TODO 1~16)이 아직 웹·OTA 미배포다. 이번 개편과 섞여 나가지 않게 먼저 내보낸다.
  - 절차: `TODO_2026-09-23.md` 17번의 "사용자 절차" 1~4 그대로(16번 커밋 → `git push origin main` → Vercel Ready 확인 → 프로덕션 웹 확인 → OTA → TestFlight 확인).
  - 이번 작업의 코드 항목(1번~)은 이 배포와 별개로 로컬에서 진행할 수 있다. 다만 이번 작업의 웹 배포(13번)는 0번이 끝난 뒤에 한다.
  - 상태 점검(2026-10-02, 에이전트 실행): 배포는 이미 끝났고 실기기 확인만 남음.
    - QA: `git fetch origin && git log origin/main..main` → 비어 있음(`main` = `origin/main` = `5f42006`). 16번(Q2 `d22bc62`)과 그 뒤 커밋까지 모두 푸시됨.
    - QA: `gh api repos/{owner}/{repo}/commits/5f42006/status` → `Vercel success Deployment has completed`, Production 배포 존재.
    - QA: `npx eas-cli update:list --branch production --limit 3` → 최신 OTA "리포트 품질 3건 + 목차 탭 이동 + 페이월 챕터 목록"(1일 전), 그 전 "챗봇 개편 + 모듈 전용 페이지·…"(3일 전), runtime 1.0.0, ios+android.
    - QA: `git diff --stat 97fa0b1..HEAD -- mobile lib app` → 변경 없음. 마지막 OTA 이후 앱·서버 코드 변경 없음(5f42006은 핸드오프 문서만).
  - 실기기 확인: 사용자 확인 완료(2026-10-02). 절차: TestFlight 앱 완전 종료 후 두 번 열기 → `TODO_2026-09-23.md` 17번 "확인할 것"(모듈 대화 2개, 10턴 이후 조기 종료, 무료 페이지 `module_map`·강점 3개·다가오는 시기 미리보기, 페이월 챕터 목록, 목차 탭 이동, 배지). 첫 대화가 에러 없이 이어지면 프로덕션 키의 `gpt-5.6-luna` 접근도 확인된 것. 구매 단계는 Apple 유료 앱 계약 활성화 전이면 "구매 불가"가 정상.

## 데이터

- [x] 1. 플레이북 세트 데이터: 타입 + 모듈 1~4
  - 변경: `lib/modulePlaybooks.ts`에 세트 타입(세트 번호·주제, 퀴즈 후보 문항 ID, 후보가 없을 때 기본 질문, ③④⑤ 질문, 세트 5 점수 방향)과 24턴 고정 문구(ko/en/es)를 추가한다. 모듈 1~4 데이터를 `CHAT_SETS_DRAFT.md` 2장(후보)·8·9장(질문)에서 옮긴다. 세트 2는 ③④ + 대체 질문(⑤). 질문·보기는 ko/en/es `LocalizedText`(EN/ES는 `mobile/lib/i18n/STYLE_GUIDE.md`, es는 tú·성별 중립). 기존 `stages`는 그대로 둔다.
  - 변경: 새 `scripts/check-playbook-sets.mts` — 모든 후보 문항 ID가 `mobile/lib/quiz/module*.ts`에 실제로 있는지, 슬라이더 문항·제외 문항(모듈 3 E6, 4 AS2, 6 E6, 8 S8)이 없는지, 한 모듈 안에서 세트끼리 후보가 겹치지 않는지, 세트 1~4 후보가 2개 이상의 차원을 덮는지, 3개 언어 문구가 비어 있지 않은지 검사한다.
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npx tsx scripts/check-playbook-sets.mts` → 모듈 1~4 오류 0 (5~11은 "데이터 없음"으로 건너뜀)
  - 결과(2026-10-02):
    - QA: `npx tsc --noEmit`(루트) → exit 0
    - QA: `npx tsx scripts/check-playbook-sets.mts` → 24턴 고정 문구·module1~4 오류 0, module5~11 "데이터 없음", exit 0
    - QA(검사기 자체): 후보를 일부러 깨뜨림(슬라이더 A1, 없는 ID, 모듈 3 E6, 세트 간 겹침, 단일 차원) → 6건 모두 감지, exit 1. 원복 후 다시 오류 0.
    - 구조: 세트 데이터는 기존 플레이북 객체에 넣지 않고 `MODULE_CHAT_SETS`(+ `getModuleChatSets()`)로 따로 뒀다. ★ 질문은 `MODULEn.signatureQuestion`을 그대로 참조한다(검사기가 문구 일치를 확인). 세트 2는 `questions` ③④ + `alternate`(⑤), 세트 5는 ③만. 24턴 고정 문구는 `PERSPECTIVE_SHIFT_LEAD`, 세트 주제(모델용)는 `CHAT_SET_THEMES`.
    - 기본 질문(후보가 없을 때)은 초안에 문구가 없어 세트의 focus에서 새로 썼다(ko/en/es). 사용자 문구 검토 권장.

- [x] 2. 플레이북 세트 데이터: 모듈 5~11
  - 선행: 1
  - 변경: `lib/modulePlaybooks.ts` 모듈 5~11 세트 데이터. 모듈 7·10은 세트 5 점수 방향 "높음".
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npx tsx scripts/check-playbook-sets.mts` → 11개 모듈 전부 오류 0
  - 결과(2026-10-02):
    - QA: `npx tsx scripts/check-playbook-sets.mts` → 24턴 고정 문구·module1~11 전부 오류 0, "전체 오류 0", exit 0
    - QA: `npx tsc --noEmit`(루트) → exit 0
    - 구조는 1번과 같다(`MODULE5_SETS`~`MODULE11_SETS`를 `MODULE_CHAT_SETS`에 등록). ★ 위치: 모듈 5·6·8·11 세트 1, 모듈 9 세트 2, 모듈 7·10 세트 3. 모듈 6·9의 ★는 선택형이라 `free` 없음.
    - 모듈 10 세트 5 후보는 H4·H2 두 개만 넣었다. 초안의 H1·I1("1세트에서 안 쓴 경우")은 세트 1 후보와 겹쳐 "한 문항은 한 세트에서만" 규칙·검사기와 충돌한다. 두 문항이 모두 낮으면 기본 질문으로 묻는다.
    - 기본 질문(후보 없을 때)은 1번처럼 세트 focus에서 새로 썼다(ko/en/es). 사용자 문구 검토 권장.

## 챗봇 서버

- [x] 3. 세트 로직 (순수 함수)
  - 선행: 1
  - 변경: 새 `lib/chatSets.ts`
    - 턴 번호 → (세트, 위치, 정리 여부, 점검 턴, 관점 전환 턴, 마무리 턴) 매핑. SPEC 1의 턴 배치 그대로.
    - 30문항 답 + 플레이북 → 세트별 인용 문항 선택(세트 1~4 최고점 2~3점, 세트 5 최저점 0~1점, 모듈 7·10 세트 5 최고점, 동점은 후보 순서, 없으면 null).
    - 대화 기록 → 세트 재료 묶음(세트 번호, 인용 문항, ①② 답 원문, ③④⑤ 답 원문, 대화 여부). 원문은 길이 상한으로 자른다.
    - 요청의 30문항 답 정제(`sanitizeQuizAnswers`, 길이·개수·점수 범위).
  - 변경: 새 `scripts/check-chat-sets.mts` — 위 함수들의 사례 검사(턴 1·6·10·11·16·21·24·25 매핑, 동점, 후보 전부 0~1점, 세트 5 낮은/높은 방향, 10턴 조기 종료 기록에서 세트 3~5가 "대화 없음"인지).
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npx tsx scripts/check-chat-sets.mts` → 모든 사례 통과
  - 결과(2026-10-02):
    - QA: `npx tsx scripts/check-chat-sets.mts` → "통과 92 · 실패 0", exit 0 (턴 매핑 17, 인용 선택 15 + 11개 모듈 전체 33, 정제 6, 세트 묶음 21)
    - QA: `npx tsc --noEmit`(루트) → exit 0
    - QA(검사기 자체): 인용 하한 2→1점, 11턴에 세트 2 정리 추가, ①② 경계를 ①만으로 바꾼 3개 뮤테이션 → 9건 FAIL, exit 1. 원복 후 다시 92/92.
    - 구조: `getSetTurnRole()`(턴 → kind `set`/`checkpoint`/`perspective`/`closing`, 세트, 위치, `recapSets`, `greeting`), `sanitizeQuizAnswers()`(ID·차원 형식, 0~3점, 중복 ID 제거, 최대 40개, 질문 300자·보기 200자), `selectSetQuizAnswer()`/`selectAllSetQuizAnswers()`, `buildSetPackets()`. 상수 `TOTAL_TURNS_V2`(25)·`CHECKPOINT_TURN_V2`(10)·`PERSPECTIVE_SHIFT_TURN_V2`(24)도 여기 둔다(4번에서 `chatPrompts.ts`가 가져다 쓰면 된다).
    - 세트 재료 묶음(`SetPacket`, extract용 snake_case): `set`, `theme`, `quiz`(id·dimension·prompt·label·score 또는 null), `opening_answers`(①②), `module_answers`(③④⑤), `has_chat`, 세트 5만 `perspective_answer`(24턴 답, `closing` 근거). 답 원문은 600자에서 자른다. k번째 봇 메시지 = k턴, 그 뒤 첫 사용자 메시지 = k턴의 답으로 매핑하므로 마무리 버튼으로 25턴을 앞당겨 요청해도 실제 대화한 턴만 들어간다. 10턴 답("조금 더" 뒤 사용자가 쓴 말)은 어느 세트에도 넣지 않는다.

- [x] 4. 챗봇 프롬프트·라우트 v2
  - 선행: 2, 3
  - 변경: `lib/chatPrompts.ts`에 v2 시스템 프롬프트 빌더. 턴 역할(세트 ① 인용 질문, ② 상세, ③④⑤ 다른 축 + 앞머리 한 줄, 세트 시작 정리·재확인, 10턴 정리+점검, 24턴 고정 문구는 코드가 응답 앞에 붙이고 모델은 관점 전환 질문만, 25턴 마무리), 이번 세트에 필요한 문항만 프롬프트에 넣기, 모순 짚기는 세트 3·4 앞머리에서 한 번, 기존 안전 규칙·기법·`formulation` 유지. `TOTAL_TURNS_V2 = 25`, `TIME_LIMIT_MINUTES_V2 = 30`, `isFinalTurn`이 흐름 버전을 받는다.
  - 변경: `lib/chat.ts`, `app/api/chat/route.ts` — `context.flowVersion === 2`이고 30문항 답이 있을 때만 v2. 마지막 턴 extract에 세트 재료 묶음(`set_packets`)을 넣는다(`ChatExtract` 타입 optional 필드). v2가 아니면 지금 코드 경로 그대로.
  - 변경: 새 `scripts/dump-chat-prompt.mts` — OpenAI 호출 없이 모듈·턴·로케일을 받아 시스템 프롬프트를 출력한다.
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npm run lint && npm run build`(루트) → 경고·오류 없음
  - QA: `npx tsx scripts/dump-chat-prompt.mts module1 1,6,10,11,24,25 ko` → 1턴에 세트 1 인용 문항, 6턴에 정리+세트 2 인용, 10턴 점검, 11턴 정리 없음, 24턴 관점 전환 대상이 모듈 1 값, 25턴 마무리. 30문항 전체가 프롬프트에 들어가지 않음.
  - QA: `npx tsx scripts/dump-chat-prompt.mts module1 7 ko --legacy` → 지금(개편 전) 프롬프트와 동일(`git stash`로 만든 기준 출력과 diff 0)
  - 결과(2026-10-02):
    - QA: `npx tsc --noEmit`(루트) → exit 0
    - QA: `npm run lint && npm run build`(루트) → "No ESLint warnings or errors", "Compiled successfully", 경고 없음
    - QA: `npx tsx scripts/dump-chat-prompt.mts module1 1,6,10,11,24,25 ko` → 1턴 세트 1 인용 A6, 6턴 세트 1 정리 + 세트 2 인용 A5, 10턴 정리+점검(퀴즈 0문항), 11턴 정리 없이 세트 3 인용 A15, 24턴 관점 전환 "지금의 나 → 다음 사랑을 시작할 미래의 나" + 고정 문구는 서버가 붙인다는 지시, 25턴 마무리. 프롬프트 속 퀴즈 문항은 세트 턴 4~5/30, 점검·관점 전환·마무리 0/30.
    - QA: 기준 출력은 코드 수정 전에 같은 context로 떠 둔 프롬프트(`git stash` 대신 수정 전 스크래치 스크립트). `dump-chat-prompt.mts <m> <t> <l> --legacy`를 module1·module7·moduleId 없음 × ko/en/es × 1~21턴 + 시간 초과(21분) 198건과 비교 → 전부 diff 0 (`module1 7 ko --legacy` 포함).
    - QA(추가, 회귀): `npx tsx scripts/check-chat-sets.mts` → 92/92, `npx tsx scripts/check-playbook-sets.mts` → 전체 오류 0. 스크래치 검사(`chatFlowVersion`: flowVersion 없음·답 0개·모르는 모듈 → 1, 정상 → 2 / `isFinalTurn` v2: 20턴 false·25턴 true·30분 true / `prependPerspectiveLead`: 모델이 고정 문구를 직접 써도 한 번만, 위기 안내 응답은 그대로 / `attachSetPackets`: v2만 `set_packets` 5개) 전부 기대값.
    - 구조: `chatFlowVersion(context)`가 `flowVersion === 2` + 퀴즈 답 1개 이상 + 세트 데이터가 있는 moduleId일 때만 2. `buildChatSystemPrompt`가 맨 앞에서 v2면 `buildChatSystemPromptV2`로 넘기고, 아니면 기존 코드 그대로. 규칙 3의 마지막 턴 번호·숨고르기 줄, 기법 절(`TECHNIQUES_BODY_V2`), 예시 대화의 ⑥ 설명, 가설 메모 절만 v2용으로 갈랐다. 세트 시작 정리 틀은 기존 숨고르기 틀을 6→6, 16→13, 21→17로 옮겨 쓴다. 모순 짚기는 세트 3·4의 ③(13·18턴) 앞머리 평서문. 입력값에는 이번 세트 후보 문항의 답만 들어간다.
    - 24턴 고정 문구: `lib/chat.ts`의 `prependPerspectiveLead()`가 응답 맨 앞에 붙인다(모델에게는 쓰지 말라고 지시). 위기 안내가 담긴 응답에는 붙이지 않는다.
    - 라우트: `context.quizAnswers`를 `sanitizeQuizAnswers()`로 거른 뒤 쓰고, 마지막 턴이면 `attachSetPackets()`가 extract에 `set_packets`를 붙인다(`ChatExtract.set_packets` optional). `TIME_LIMIT_MINUTES_V2 = 30`, `isFinalTurn(turn, elapsed, flowVersion)`. 기존 `TOTAL_TURNS`/`TIME_LIMIT_MINUTES`(20/20)는 웹 `components/ChatScreen.jsx`가 쓰므로 그대로.
    - 실제 모델 응답(인용 정확도, 24턴 문구)은 5번 sim-chat에서 확인한다.

- [ ] 5. sim-chat / judge-chat v2
  - 선행: 4
  - 변경: `scripts/sim-chat.mts` — `--flow v2`면 페르소나가 30문항 답을 갖고 25턴을 돈다(페르소나별 30문항 답은 모듈 유형에 맞게 스크립트 안에서 정한다). `--checkpoint finish`면 10턴에서 마무리. 결과 JSON에 세트 재료 묶음과 턴별 세트 위치를 남긴다.
  - 변경: `scripts/judge-chat.mts` — v2 결과면 루브릭에 세트 준수(세트 ① 인용 정확도, ③④⑤ 축 분리, 같은 장면 반복 없음), 세트 시작 정리·재확인, 24턴 고정 문구 항목을 더한다.
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts 25 <모듈1 ko 페르소나> module1 --flow v2` → 25턴 완주, 1·6·11·16·21턴 인용 문항이 `check-chat-sets` 선택 결과와 같음, 24턴이 고정 문구로 시작, `set_packets` 5개. (OpenAI 비용 발생, 1회만)
  - QA: 같은 명령에 `--checkpoint finish` → 11턴째가 마무리, `set_packets` 세트 3~5 "대화 없음"
  - QA: `npx tsx --env-file=.env.local scripts/judge-chat.mts <위 결과 파일>` → 채점표 생성, 세트 준수 항목이 채워짐

## 앱 대화

- [ ] 6. ChatScreen v2
  - 선행: 4
  - 변경: `mobile/screens/ChatScreen.tsx` — 대화 요청 `context`에 `flowVersion: 2`와 30문항 답(문항 ID, 차원, 질문, 고른 보기, 점수, 사용자 언어 문구)을 보낸다. `TOTAL_TURNS` 25, `TIME_LIMIT_MINUTES` 30(서버 상수와 맞춘다는 기존 주석 유지). 중간 점검·조기 종료 로직은 그대로.
  - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0
  - (사용자 확인) 앱은 항상 프로덕션 API를 부르므로 실제 25턴 대화는 웹 배포 후 13번에서 확인한다.

## 리포트

- [ ] 7. 리포트 서버: 카드 + 30문항 + 섹션 근거
  - 선행: 3
  - 변경: `lib/reportPrompts.ts` — v2 컨텍스트(30문항 답, `set_packets`)를 받으면: 퀴즈 답 데이터는 차원별로 묶고 2~3점·0점 표시. 카드 필드(카드 1은 무료 필드, `FREE_PART_TEXT_FIELDS`에 포함 / 카드 2~5는 유료 필드). 카드마다 `quote`(사용자 원문에서 고른 짧은 인용, 원문이 없으면 빈 값)와 `note` 3문장. 섹션별 근거 지시(`CHAT_SETS_DRAFT.md` 3-2: `opening_scene` ← 세트 1, `module_map` ← 세트 2, `strengths_preview` ← 세트 5, `module_deep` ← 세트 3, `weaknesses`·`behavior_guides` ← 세트 4, `closing` ← 24턴 답 등). v2에서는 `answer_notes`·`chat_*_note`를 요구하지 않는다.
  - 변경: `lib/report.ts`(파싱, 퀴즈 문구·세트 번호는 모델이 아니라 코드가 `set_packets`에서 붙임), `lib/reportLock.ts`(카드 2~5 잠금, 무료 응답 `locked_shape`), `app/api/report*/route.ts`(v2 컨텍스트 받기, 구버전 요청은 그대로).
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npm run lint && npm run build`(루트) → 경고·오류 없음
  - QA: 5번의 sim-chat 결과로 리포트 무료 → 유료를 생성하는 스크래치 스크립트 1회(모듈 1 ko) → 무료에 카드 1장, 유료에 카드 4장, `opening_scene`에 세트 1 원문 장면, `closing`에 24턴 답이 드러남. (OpenAI 비용 발생)

- [ ] 8. 리포트 품질 검사: 카드
  - 선행: 7
  - 변경: `lib/reportQuality.ts` — 카드 `quote`가 해당 세트 사용자 원문의 부분 문자열인지(공백·문장부호 정규화 후), 대화 없는 세트의 `quote`가 비어 있는지, 카드 수가 세트 수와 같은지, `note`가 3문장인지. 어긋나면 기존 패치 경로(인용만 다시 고르게).
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: 스크래치 스크립트 — 지어낸 인용, 원문 일부 인용, 대화 없는 세트에 인용 있음, 카드 4장 사례 → 결함 3건 감지, 정상 1건 통과

- [ ] 9. 리포트 화면 + i18n + QA 픽스처
  - 선행: 7
  - 변경: `mobile/screens/ReportScreen.tsx` — 카드 페이지 컴포넌트(세트 주제 eyebrow, "검사에서 고른 답", "대화에서 한 말", 읽어 주기). 카드 1은 무료 구간 `quiz_reading` 뒤, 카드 2~5는 유료 구간에서 지금 상담·퀴즈 해설 페이지 자리. 카드 필드가 있으면 `chat-snapshot`/`chat-trigger`/`chat-repeat-pattern`/`chat-core-fear`/`quiz-answer-*` 페이지를 띄우지 않는다(없으면 지금 그대로). 목차·페이월 잠긴 챕터 목록에 카드 챕터. 리포트 요청에 30문항 답과 `flowVersion: 2`를 보낸다.
  - 변경: `mobile/lib/i18n/{ko,en,es}.ts` — 세트 주제 라벨 5개, 카드 라벨, 목차 라벨.
  - 변경: `mobile/dev/qaData.ts` + `scripts/gen-qa-fixtures.mts` — v2 페르소나 최소 2명(ko 1, es 1)에 30문항 답·`set_packets` 픽스처와 v2 리포트를 생성. 기존 픽스처는 이전 리포트 확인용으로 그대로.
  - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0
  - QA: `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts` → v2 픽스처 생성 (OpenAI 비용 발생)
  - QA: `mobile-web` 프리뷰 375×812, v2 픽스처 `?qa=free`와 `?qa=paid`(ko, es) → 카드 1 무료·2~5 유료로 보임, 잘림 없음, 페이월 잠긴 챕터 목록에 카드 챕터, 구매 버튼이 첫 화면 안. 기존 픽스처는 지금 화면 그대로. 스크린샷 첨부.

- [ ] 10. PDF
  - 선행: 7
  - 변경: `app/api/report-pdf/route.ts`(카드 파싱), `lib/pdf/reportPdf.tsx`(v2 리포트면 상담·퀴즈 해설 자리에 카드 5장, ko/en/es 라벨). 이전 리포트는 그대로.
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: 로컬 `next dev` + RevenueCat 목 서버로 v2 픽스처를 `/api/report-pdf`에 POST → 200, PDF에 카드 5장(이전 방식과 동일한 절차, `TODO_2026-09-23.md` 발견 사항의 F1-b 참고)

## 마무리

- [ ] 11. 최종 비교
  - 선행: 5, 6, 8, 9
  - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts 25 <페르소나 3명: 모듈 서로 다르게, ko·en·es 각 1> --flow v2` → 3건 완주 (OpenAI 비용 발생)
  - QA: `npx tsx --env-file=.env.local scripts/judge-chat.mts <위 결과>` → 지난 기준(`scripts/out/q1e-*`)보다 공통 항목 평균이 낮지 않음, 세트 준수 평균 1.5/2 이상. 표로 비교해 이 항목 아래에 기록.
  - QA: `flowVersion` 없는 요청 흉내(`sim-chat` 기본 흐름, 3턴) → 20턴 흐름 프롬프트, 기존 리포트 필드 그대로
  - QA: 루트 `npx tsc --noEmit`, `npm run lint && npm run build`, mobile tsc → 모두 통과

- [ ] 12. 문서
  - 선행: 11
  - 변경: `PRODUCT.md`의 "20-turn" 표기 2곳을 25턴으로. `/wiki`로 `WIKI.md` 챗봇(AI 상담 행, 검증 도구)·리포트(카드, 30문항) 흐름 갱신.
  - QA: `grep -n "20-turn" PRODUCT.md` → 결과 없음

## 사용자 실행 (마지막)

- [ ] 13. (사용자 실행) 배포와 실기기 확인
  - 선행: 0, 12
  - 순서: 커밋 → `git push origin main`(웹·API) → Vercel Ready 확인 → 프로덕션에서 구버전 앱으로 대화 2~3턴과 기존 리포트가 그대로인지 확인 → OTA(`cd mobile && npx --yes eas-cli update --branch production --environment production --message "챗봇 5세트 개편 + 검사×대화 카드" --non-interactive`) → TestFlight 앱 완전 종료 후 두 번 열기.
  - 확인할 것: 모듈 2개 25턴 대화(1·6·11·16·21턴 퀴즈 인용, 24턴 "마지막으로 묻고 싶은 게 있어요"), 10턴 "마무리"로 끝낸 대화 1개, 새 리포트의 무료 카드 1장·유료 카드 4장(구매 가능할 때), 이전에 만든 리포트가 그대로 열리는지.
  - (사용자 확인) 실기기와 RevenueCat 구매가 필요해 자동화할 수 없다.

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)
