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

- [x] 5. sim-chat / judge-chat v2
  - 선행: 4
  - 변경: `scripts/sim-chat.mts` — `--flow v2`면 페르소나가 30문항 답을 갖고 25턴을 돈다(페르소나별 30문항 답은 모듈 유형에 맞게 스크립트 안에서 정한다). `--checkpoint finish`면 10턴에서 마무리. 결과 JSON에 세트 재료 묶음과 턴별 세트 위치를 남긴다.
  - 변경: `scripts/judge-chat.mts` — v2 결과면 루브릭에 세트 준수(세트 ① 인용 정확도, ③④⑤ 축 분리, 같은 장면 반복 없음), 세트 시작 정리·재확인, 24턴 고정 문구 항목을 더한다.
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts 25 <모듈1 ko 페르소나> module1 --flow v2` → 25턴 완주, 1·6·11·16·21턴 인용 문항이 `check-chat-sets` 선택 결과와 같음, 24턴이 고정 문구로 시작, `set_packets` 5개. (OpenAI 비용 발생, 1회만)
  - QA: 같은 명령에 `--checkpoint finish` → 11턴째가 마무리, `set_packets` 세트 3~5 "대화 없음"
  - QA: `npx tsx --env-file=.env.local scripts/judge-chat.mts <위 결과 파일>` → 채점표 생성, 세트 준수 항목이 채워짐
  - 결과(2026-10-02):
    - QA: `npx tsc --noEmit`(루트) → exit 0. 루트 tsconfig는 `.mts`를 포함하지 않아, 스크래치 tsconfig(루트 설정 상속 + `scripts/sim-chat.mts`·`judge-chat.mts`만 include)로 따로 `tsc -p` → exit 0
    - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts 25 attach module1 --flow v2` → 25턴 완주(턴 1~25), 세트 ① 인용 1턴 A6·6턴 A5·11턴 A15·16턴 A14·21턴 V9 = `selectAllSetQuizAnswers` 선택값과 같고 5개 모두 보기 문구가 응답에 그대로 들어감, 24턴 첫 줄 "마지막으로 묻고 싶은 게 있어요." 일치, `set_packets` 5개(모두 `has_chat: true`, 세트 5 `perspective_answer` 있음). 비용 $0.073. 파일 `scripts/out/sim_20261002T075129_attach_module1_v2.json`
    - QA: 같은 명령 + `--checkpoint finish` → 요청 턴 1~10, 25(11번째가 마무리, 10턴 뒤 사용자 답 없음), `set_packets` 세트 1·2 `has_chat: true`, 세트 3~5 `false`(인용 문항은 남음, 원문 0개, `perspective_answer: null`). 비용 $0.023. 파일 `..._v2_finish.json`
    - QA: `npx tsx --env-file=.env.local scripts/judge-chat.mts --label q5-v2 <위 두 파일>` → `scripts/out/q5-v2_20261002T075557.{json,md}`. 세트 준수 항목 채워짐: ① 인용 2/2, ③④⑤ 축 2/2, 장면 반복 없음 2/2, 시작 정리·재확인 1/0, 24턴 고정 문구 2/–. 세트 준수 평균 1.80 / 1.50. 공통 항목 평균 1.56 / 1.56(참고: `q1e-baseline` 1.17, `q1e-mini` 1.63 — 정식 비교는 11번). 채점 비용 $0.37.
    - sim-chat: `--flow v2`면 페르소나별 강한 차원(`V2_HIGH_DIMS`, 2~3점)과 나머지(0~1점)로 실제 퀴즈 30문항 답을 만들고, 사용자 시뮬레이터에게 인용될 5문항을 알려 준다. 서버의 마지막 턴(v2 `isFinalTurn`)에서 멈추고 extract에 `attachSetPackets`를 붙인다. 결과 JSON에 `flowVersion`, `checkpoint`, `setQuotes`, 턴별 `seq`·`turn`·`role`(세트·위치·정리), 결정론적 `checks`(인용 일치·24턴 문구·`set_packets`)가 남는다. `--flow` 없이 돌리면 20턴 흐름 그대로.
    - judge-chat: v2 파일이면 20턴 단계 대신 세트 구조·턴 배치·세트 ① 기대값·30문항 답을 채점자에게 주고, t6·v_extension의 턴 번호만 v2로 바꾼다. 세트 항목 `s_quote`·`s_axes`·`s_no_repeat_scene`·`s_recap`은 채점자, `s_lead`는 코드가 24턴 첫 줄로 판정. 표의 "전 항목 평균"은 공통 항목만이라 `q1e-*`와 그대로 비교되고, "세트 준수 평균" 줄이 따로 붙는다.

## 앱 대화

- [x] 6. ChatScreen v2
  - 선행: 4
  - 변경: `mobile/screens/ChatScreen.tsx` — 대화 요청 `context`에 `flowVersion: 2`와 30문항 답(문항 ID, 차원, 질문, 고른 보기, 점수, 사용자 언어 문구)을 보낸다. `TOTAL_TURNS` 25, `TIME_LIMIT_MINUTES` 30(서버 상수와 맞춘다는 기존 주석 유지). 중간 점검·조기 종료 로직은 그대로.
  - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0
  - (사용자 확인) 앱은 항상 프로덕션 API를 부르므로 실제 25턴 대화는 웹 배포 후 13번에서 확인한다.
  - 결과(2026-10-02):
    - 변경: `FLOW_VERSION = 2`, `TOTAL_TURNS` 25, `TIME_LIMIT_MINUTES` 30(서버 `TOTAL_TURNS_V2`·`TIME_LIMIT_MINUTES_V2`와 맞춤, 주석 유지). `context`에 `flowVersion`과 `quizAnswers`(QuizScreen이 기록한 30문항 `{qId, dimension, prompt, label, score}`, 사용자 언어 문구 그대로)를 더함. 기존 `quizAnswer`·`quizAnswerPool`은 서버의 20턴 폴백용으로 남김. 중간 점검(10턴)·7분 조기 종료·마무리 버튼은 손대지 않음(모두 `TOTAL_TURNS`로 점프하므로 25턴 마무리로 감).
    - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0
    - QA(보완): 스크래치 스크립트로 11개 모듈 × ko/en/es의 실제 문항(`getLocalizedQuestions`)으로 앱과 같은 모양의 30문항을 만들어 JSON 왕복 후 서버 `sanitizeQuizAnswers` → 33건 모두 30/30 통과, 질문·보기 문구 잘림 없음, `selectAllSetQuizAnswers`가 세트별 인용 문항을 고름(`npx tsx <scratchpad>/check-payload.mts` → `ALL OK`).

## 리포트

- [x] 7. 리포트 서버: 카드 + 30문항 + 섹션 근거
  - 선행: 3
  - 변경: `lib/reportPrompts.ts` — v2 컨텍스트(30문항 답, `set_packets`)를 받으면: 퀴즈 답 데이터는 차원별로 묶고 2~3점·0점 표시. 카드 필드(카드 1은 무료 필드, `FREE_PART_TEXT_FIELDS`에 포함 / 카드 2~5는 유료 필드). 카드마다 `quote`(사용자 원문에서 고른 짧은 인용, 원문이 없으면 빈 값)와 `note` 3문장. 섹션별 근거 지시(`CHAT_SETS_DRAFT.md` 3-2: `opening_scene` ← 세트 1, `module_map` ← 세트 2, `strengths_preview` ← 세트 5, `module_deep` ← 세트 3, `weaknesses`·`behavior_guides` ← 세트 4, `closing` ← 24턴 답 등). v2에서는 `answer_notes`·`chat_*_note`를 요구하지 않는다.
  - 변경: `lib/report.ts`(파싱, 퀴즈 문구·세트 번호는 모델이 아니라 코드가 `set_packets`에서 붙임), `lib/reportLock.ts`(카드 2~5 잠금, 무료 응답 `locked_shape`), `app/api/report*/route.ts`(v2 컨텍스트 받기, 구버전 요청은 그대로).
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: `npm run lint && npm run build`(루트) → 경고·오류 없음
  - QA: 5번의 sim-chat 결과로 리포트 무료 → 유료를 생성하는 스크래치 스크립트 1회(모듈 1 ko) → 무료에 카드 1장, 유료에 카드 4장, `opening_scene`에 세트 1 원문 장면, `closing`에 24턴 답이 드러남. (OpenAI 비용 발생)
  - 결과(2026-10-02):
    - QA: `npx tsc --noEmit`(루트) → exit 0
    - QA: `npm run lint && npm run build`(루트) → "No ESLint warnings or errors", "Compiled successfully", 경고 없음
    - QA: 스크래치 `report-v2.mts`로 `sim_20261002T083650_attach_module1_v2.json`(모듈 1 ko) → 무료 → 유료 생성 1회(무료 17초, 유료 16초, 품질 루프 정상). 결과 `scripts/out/report_v2_20261002T085054.json`. 무료에 `set_card_1` 1장(`set_cards_2to5` 없음), 유료에 `set_cards_2to5` 4장(세트 2~5), 두 구간 모두 `answer_notes` `[]`·`chat_*_note` 빈 값. 카드 5장 인용이 모두 해당 세트 원문의 부분 문자열이고 퀴즈 문구가 앱이 보낸 30문항과 같음(node 검사). `opening_scene`이 세트 1 원문 장면("친구들과 술자리에 간 남자친구", "3시간이 넘도록", "내가 뭘 잘못했나"), `module_map`이 세트 2(휴대폰 계속 확인, 참다가), `behavior_guides`가 세트 4 장면(답장 2~3시간 공백, 싸운 뒤 연결 시간), `closing_body` 마지막 문장이 24턴 답 원문("너무 빨리 결론 내리지 말고, 먼저 사실부터 차분히 보자")으로 맺음.
    - QA(구버전 회귀): 수정 전 HEAD를 임시 worktree로 떠서 같은 context 72건(ko/en/es × full/free/paid × 상담 유무 × moduleId 유무 × 강점 분할 유무, 모두 `flowVersion: 2`·`quizAnswers`를 보내되 서버 판정 `reportSets` 없음)의 `buildReportPrompt`·`buildReviewPrompt`·`describeReportData` 출력 비교 → diff 0.
    - QA(보완): 스크래치 `check-report-sets.mts` → 13/13 통과(flowVersion 없음·1·모듈 없음·퀴즈 답 없음 → v2 아님, `set_packets` 없음 → 대화 없는 세트 5개, 클라이언트가 보낸 quiz 무시·서버 재선택, 원문 개수 상한, 10턴 마무리 → 세트 1·2만 대화, 대화 없는 세트 카드 quote 비움, 무료 응답에서 카드 2~5 잠금). `check-chat-sets` 92/92, `check-playbook-sets` 전체 오류 0.
    - 구조: 새 `lib/reportSets.ts` — `resolveReportSets()`(flowVersion 2 + 세트 데이터 있는 모듈 + 정제 후 30문항 1개 이상일 때만 재료 생성, 클라이언트 `set_packets`에서는 사용자 원문만 받아 자르고 인용 문항은 같은 30문항으로 서버가 다시 고름), `buildSetCard()`(세트·주제·퀴즈는 코드가 붙임, 대화 없는 세트는 quote 비움, 인용 문항이 없던 세트는 후보 중 방향에 가장 가까운 답을 카드에 씀), 프롬프트용 `describeQuizAnswersByDimension()`·`describeSetPackets()`. 두 라우트(`/api/report`, `/api/report/paid`)가 `reportSets`를 만들어 `ReportContext`에 넣는다(클라이언트 값은 덮어씀).
    - 필드: `set_card_1`(무료, `quiz_reading` 뒤 자리)과 `set_cards_2to5`(유료, `LOCKED_KEYS`), 각 `{ set, theme, quiz{id,prompt,label,score}|null, quote, note }`. 무료 응답 `locked_shape`에 v2일 때만 `set_cards_2to5: 4`. 유료 절반은 `freePart.set_card_1`을 받아 이어 쓰고(`describeFreePart`), 카드 코드 필드(set/theme/quiz)는 패치 대상에서 뺐다. `FREE_PART_TEXT_FIELDS`는 문자열 필드 목록이라 그대로 두고 카드 1은 `describeFreePart`에서 따로 넣는다.
    - 프롬프트(v2만): 30문항 전체(차원별, ★2~3점·○0점), 세트 재료 묶음 5개(대화 없는 세트는 후보 답만, 세트 5에 24턴 답), 섹션별 근거 표(`CHAT_SETS_DRAFT.md` 3-2), 규칙 6을 카드 인용 규칙으로 교체, `answer_notes`·`chat_*_note`·`topAnswers` 줄 없음. 리뷰어·패치 근거 데이터에도 세트 묶음을 넣고, 결정론적 검사는 카드의 quiz·quote(사용자 원문)를 문체 검사에서 뺀다(인용 검사는 8번).

- [x] 8. 리포트 품질 검사: 카드
  - 선행: 7
  - 변경: `lib/reportQuality.ts` — 카드 `quote`가 해당 세트 사용자 원문의 부분 문자열인지(공백·문장부호 정규화 후), 대화 없는 세트의 `quote`가 비어 있는지, 카드 수가 세트 수와 같은지, `note`가 3문장인지. 어긋나면 기존 패치 경로(인용만 다시 고르게).
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: 스크래치 스크립트 — 지어낸 인용, 원문 일부 인용, 대화 없는 세트에 인용 있음, 카드 4장 사례 → 결함 3건 감지, 정상 1건 통과
  - 결과(2026-10-02):
    - QA: `npx tsc --noEmit`(루트) → exit 0. `npm run lint` → "No ESLint warnings or errors"
    - QA: 스크래치 `check-card-quality.mts`(7번 실제 리포트 `report_v2_20261002T085054.json` + 그 sim 파일의 30문항·`set_packets`) → "통과 19 · 실패 0". 결함 감지: 지어낸 인용(세트 3), 대화 없는 세트 4에 인용, 카드 4장(유료 3장) + 추가로 note 2문장, 퀴즈 보기 변조, 자리 바뀐 카드, 대화 있는 세트의 빈 인용, 무료 구간 카드 1 누락. 정상 통과: 실제 리포트 카드 5장, 원문 일부 인용(문장부호 빼고 "…"로 끝냄), 대화 없는 세트 3~5의 빈 인용, 무료·유료 구간 각각, `reportSets` 없는 구버전 컨텍스트(카드 검사 없음).
    - QA(회귀): `npx tsx scripts/check-chat-sets.mts` → 92/92
    - 구조: `checkSetCards()`가 `checkReportDeterministic` 안에서 `reportSets`가 있을 때만 돈다. 구간별로 쓴 카드만 본다(무료 → `set_card_1`, 유료 → `set_cards_2to5` 4장). 인용 일치는 `quoteMatchesSource()` — 소문자·공백·문장부호 제거 후, "…"로 나뉜 조각이 같은 답 원문(①②③④⑤, 24턴 답 제외) 안에 순서대로 있는지. 퀴즈는 `cardQuizFor()` 재계산값과 같은지. 인용 결함 메시지에 그 세트 원문을 담아 기존 패치 호출이 그중 한 구절을 고르게 했고, `lib/report.ts` 패치 프롬프트에 quote 경로가 있을 때만 "다시 쓰지 말고 원문 구절을 글자 그대로" 한 줄을 붙인다(구버전 리포트 프롬프트는 그대로). 카드 수·세트·퀴즈 결함은 문자열이 아니라 패치 대상이 아니다 — `parseReport`/`buildSetCard`가 이미 코드로 고정하므로 안전장치다.
    - 실제 모델 패치로 인용이 고쳐지는지는 OpenAI 호출이 필요해 돌리지 않았다. 9번 픽스처 생성(`gen-qa-fixtures`)의 품질 루프 로그(`code checks: N finding(s)`)에서 함께 확인할 것.

- [x] 9. 리포트 화면 + i18n + QA 픽스처
  - 선행: 7
  - 변경: `mobile/screens/ReportScreen.tsx` — 카드 페이지 컴포넌트(세트 주제 eyebrow, "검사에서 고른 답", "대화에서 한 말", 읽어 주기). 카드 1은 무료 구간 `quiz_reading` 뒤, 카드 2~5는 유료 구간에서 지금 상담·퀴즈 해설 페이지 자리. 카드 필드가 있으면 `chat-snapshot`/`chat-trigger`/`chat-repeat-pattern`/`chat-core-fear`/`quiz-answer-*` 페이지를 띄우지 않는다(없으면 지금 그대로). 목차·페이월 잠긴 챕터 목록에 카드 챕터. 리포트 요청에 30문항 답과 `flowVersion: 2`를 보낸다.
  - 변경: `mobile/lib/i18n/{ko,en,es}.ts` — 세트 주제 라벨 5개, 카드 라벨, 목차 라벨.
  - 변경: `mobile/dev/qaData.ts` + `scripts/gen-qa-fixtures.mts` — v2 페르소나 최소 2명(ko 1, es 1)에 30문항 답·`set_packets` 픽스처와 v2 리포트를 생성. 기존 픽스처는 이전 리포트 확인용으로 그대로.
  - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0
  - QA: `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts` → v2 픽스처 생성 (OpenAI 비용 발생)
  - QA: `mobile-web` 프리뷰 375×812, v2 픽스처 `?qa=free`와 `?qa=paid`(ko, es) → 카드 1 무료·2~5 유료로 보임, 잘림 없음, 페이월 잠긴 챕터 목록에 카드 챕터, 구매 버튼이 첫 화면 안. 기존 픽스처는 지금 화면 그대로. 스크린샷 첨부.
  - 결과(2026-10-02):
    - 변경: `ReportScreen` — `SetCardPage`(eyebrow "검사 × 대화 N/5 · 주제", "검사에서 고른 답" 질문+보기, "대화에서 한 말" 인용, 읽어 주기; 작은 화면에서 넘치면 세로 스크롤). `set_card_1`이 있으면 카드 모드: 카드 1은 심리검사 분석 뒤(무료), 카드 2~5는 "직접 나눈 이야기" 뒤(유료, 잠긴 동안 `locked_shape.set_cards_2to5` 수만큼 자리), 상담 스냅샷·사건·반복·두려움·실제 응답 인용 페이지는 빼고 `chat-story`는 유지. 목차 "검사 × 대화" / "검사 × 대화 — 이어지는 4장". 리포트 요청 `context`에 `flowVersion: 2`·`quizAnswers`(30문항), 유료 절반 `freePart`에 `set_card_1`. i18n ko/en/es에 `setCardEyebrow`·`setThemes`(5개)·`setCardQuizLabel`·`setCardQuoteLabel`·`sectionSetCardsToc`·`sectionSetCardsContinuedToc`.
    - 변경: `scripts/gen-qa-fixtures.mts --v2-only` → `QA_DEEP_REPORT_V2`(jisoo ko 모듈 3 25턴, lucia es 모듈 1 10턴 마무리). 퀴즈는 실제 문항 30개, 세트 묶음은 손으로 쓴 사용자 답을 서버 `buildSetPackets`에 통과시켜 만들고, 앱처럼 무료 → 유료(`getPaidPart`, `freePart.set_card_1`)로 생성. QA 패널에 "Open sample 5-set report (v2)" 버튼(그 언어 픽스처가 있을 때만), `qaDeepReport(locale, nickname, v2)`. 기존 `QA_DEEP_REPORT`·`QA_YEAR_REPORT`는 그대로(`git diff mobile/dev/qaData.ts` 삭제 줄 0). `mobile/dev/README.md` 갱신.
    - QA: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → exit 0. 루트 `npx tsc --noEmit` → exit 0.
    - QA: `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts --v2-only` → "jisoo v2 ok", "lucia v2 ok", qaData 기록. 품질 루프 로그 정상(무료 1건 미해결로 출고 — 아래 검사에서 `oheng_intro` 2문장으로 확인, 카드와 무관).
    - QA(보완): 스크래치 `check-v2-fixtures.mts`(픽스처 + `resolveReportSets` + `checkReportDeterministic`) → 두 픽스처 모두 카드 5장(무료 1·유료 4), `answer_notes` 0개·`chat_*_note` 빈 값, 카드 결함 0. jisoo 인용 5/5가 해당 세트 원문, lucia는 세트 1·2만 인용하고 3~5는 빈 값, 세트 5 퀴즈는 0점 문항(C3, V9). `opening_scene`에 세트 1 장면(일요일 밤 메신저 알림, 메일 다시 읽기), `module_map`에 세트 2·5 원문(거절 못 함, 동생과 통화 10분), `behavior_guides[0]`에 세트 4 장면(밤에 메일 다시 읽기), `closing_body`에 24턴 답 방향.
    - QA: `mobile-web` 프리뷰 375×812(브라우저 패널) — ko `?qa=free&persona=jisoo`: 목차 03 "검사 × 대화"·10 "검사 × 대화 — 이어지는 4장", 5쪽 카드 1/5 잘림 없음, 17/17 페이월 잠긴 챕터 목록에 카드 챕터, 구매 버튼 첫 화면 안. ko `?qa=all`: 39쪽, 카드 5장(1·19~23쪽 구간), 구버전 페이지 라벨("가장 걸리는 것"·"느껴진 감정" 등) 없음, 카드 3/5 화면 확인. es `?qa=all&persona=lucia`: 카드 1/5·2/5 인용 있음, 4/5는 인용 칸 없이 답·해설만, "Lo que dijiste…" 2회·"Lo que elegiste…" 5회. es `?qa=free`: 19/19 페이월 챕터 목록에 "Test × conversación — 4 tarjetas más", 구매 버튼 첫 화면 안. 기존 픽스처(`Open sample deep report`, jisoo): 41쪽, 카드 0장, 상담 스냅샷·사건·반복·두려움·실제 응답 인용 페이지 그대로. 콘솔 오류 없음.
    - 확인 못 한 것: 잠긴 동안의 카드 자리(`locked_shape`만 있고 `set_cards_2to5`가 빈 상태)는 픽스처가 합친 리포트라 화면에서 안 탔다. 그 자리는 페이월/여는 중 페이지로 대체되고 열린 뒤에만 실제 카드가 보이므로 빈 카드가 그려지는 경로는 없다(코드 확인). 실제 앱 흐름은 13번 실기기 확인에서 본다.

- [x] 10. PDF
  - 선행: 7
  - 변경: `app/api/report-pdf/route.ts`(카드 파싱), `lib/pdf/reportPdf.tsx`(v2 리포트면 상담·퀴즈 해설 자리에 카드 5장, ko/en/es 라벨). 이전 리포트는 그대로.
  - QA: `npx tsc --noEmit`(루트) → exit 0
  - QA: 로컬 `next dev` + RevenueCat 목 서버로 v2 픽스처를 `/api/report-pdf`에 POST → 200, PDF에 카드 5장(이전 방식과 동일한 절차, `TODO_2026-09-23.md` 발견 사항의 F1-b 참고)
  - 결과(2026-10-02):
    - 변경: `route.ts` — `cleanSetCard()`로 `set_card_1`·`set_cards_2to5` 파싱(세트 번호·주제가 자리와 맞아야 받음, 길이 상한, 퀴즈 없으면 null). 앱은 이미 `content` 전체를 보내므로 앱 변경 없음.
    - 변경: `reportPdf.tsx` — `DeepPdfSetCard` 타입, `SetCardBlock`(eyebrow "검사 × 대화 n/5 · 주제", "검사에서 고른 답" 질문 → 보기, "대화에서 한 말" 인용, 읽어 주기; 한 장은 페이지에서 쪼개지지 않음). 카드 1은 심리테스트 분석 뒤, 카드 2~5는 "직접 나눈 이야기" 자리. 카드가 있으면 상담 카드(핵심 고민 등)·`chat_*_note`·"내가 고른 답" 섹션을 빼고, 없으면 지금 그대로. 라벨 ko/en/es는 앱 i18n 문구와 같음. 섹션 라벨을 카드 위에 따로 달면 페이지 끝에 혼자 남아서(1차 렌더에서 확인) 카드 eyebrow만 둠.
    - QA: `npx tsc --noEmit`(루트) → exit 0. `npx eslint app/api/report-pdf/route.ts lib/pdf/reportPdf.tsx` → exit 0.
    - QA: 임시 launch 설정(목 RevenueCat 3199 + `REVENUECAT_API_BASE`/`REVENUECAT_SECRET_KEY=sk_test_mock`로 `next dev -p 3005`)에서 스크래치 페이로드(`QA_DEEP_REPORT_V2` jisoo ko·lucia es, lucia 페이로드를 en으로, 기존 `QA_DEEP_REPORT` jisoo)를 `curl`로 `/api/report-pdf`에 POST → 4건 모두 200 `application/pdf`. `pdftotext`: v2 ko 10쪽 카드 eyebrow 5·퀴즈 라벨 5·인용 라벨 5, v2 es 12쪽 카드 5·인용 2(세트 3~5는 대화 없어 인용 칸 없음), v2 en eyebrow 5개 "TEST × CONVERSATION 1/5 · THE MOMENT"~"5/5 · WHAT ALREADY WORKS", 세 v2 PDF 모두 구버전 상담·답 섹션 0. 기존 리포트 9쪽, 카드 0, "직접 나눈 이야기"·"핵심 고민"·"내가 고른 답" 그대로. `pdftoppm` 이미지로 ko 2·5쪽, es 6쪽 확인: 카드 잘림·겹침 없음. 끝난 뒤 임시 launch 설정은 원래대로 되돌림.

## 마무리

- [x] 11. 최종 비교
  - 선행: 5, 6, 8, 9
  - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts 25 <페르소나 3명: 모듈 서로 다르게, ko·en·es 각 1> --flow v2` → 3건 완주 (OpenAI 비용 발생)
  - QA: `npx tsx --env-file=.env.local scripts/judge-chat.mts <위 결과>` → 지난 기준(`scripts/out/q1e-*`)보다 공통 항목 평균이 낮지 않음, 세트 준수 평균 1.5/2 이상. 표로 비교해 이 항목 아래에 기록.
  - QA: `flowVersion` 없는 요청 흉내(`sim-chat` 기본 흐름, 3턴) → 20턴 흐름 프롬프트, 기존 리포트 필드 그대로
  - QA: 루트 `npx tsc --noEmit`, `npm run lint && npm run build`, mobile tsc → 모두 통과
  - 결과(2026-10-02):
    - QA: `sim-chat.mts 25 family,attach_en,anger_es - --flow v2` → 3건 25턴 완주(ko module9, en module1, es module6). 세트 ① 인용 15/15 기대값과 일치(세트 5는 낮은 점수 문항 CO10 0점·V9 1점·R9 1점), 24턴 고정 문구 3/3, `set_packets` 5개씩 모두 `has_chat: true`. 파일 `scripts/out/sim_20261002T091719_*_v2.json`
    - 첫 채점(`q11-final_20261002T092052`)에서 문제 2건 발견 → 수정:
      - attach_en 15턴에 한국어 섞임(`“I have to keep paying attention”이라는 말에, …`, 자연스러움 0). `lib/chatPrompts.ts` `restatementFormV2`가 비한국어 대화에는 "예시는 모양만, 연결 말까지 그 언어로, 한글 금지"를 덧붙이고, `lib/chat.ts` `getChatReply`는 비한국어 응답에 한글이 섞이면 한 번 다시 요청하고 또 섞이면 한글 줄을 뺀다.
      - 24턴 고정 문구가 두 번 나감(모델이 `There’s …`를 둥근 아포스트로피로 써서 서버 중복 검사를 빠져나감). `prependPerspectiveLead`가 따옴표 모양을 무시하고 비교하고, 같은 줄 앞머리에 붙은 문구도 떼어 낸다. QA: 스크래치 사례 6건(둥근·곧은 따옴표, 같은 줄, 없음, ko, es) 모두 문구 1번 + 질문.
    - QA: 수정 후 `sim-chat.mts 25 attach_en - --flow v2`(`sim_20261002T123040_…`) → 25턴, 인용 5/5, 24턴 문구 1번, 한글 0자, 서버 한글 재요청 로그 없음. `judge-chat --label q11-final-en2` → 공통 1.75(자연스러움 0→2, 반복 없음 1→2), 세트 준수 2.00.
    - 비교표(공통 항목 평균, 채점 gpt-5.5):

      | | family·m9 | attach·m1 | anger·m6 | 평균 | 세트 준수 |
      |---|---:|---:|---:|---:|---:|
      | `q1e-baseline` (개편 전, 20턴, mini) | 0.94 | 1.19 | 1.31 | 1.17(4명) | – |
      | `q1e-mini` (20턴, mini) | 1.56 | 1.63 | 1.63 | 1.63(4명) | – |
      | `q1e2-luna` (20턴, 현 운영 모델) | 1.75 | 1.94 | 1.63 | 1.80(4명) | – |
      | **v2 5세트 25턴(luna)** | 1.88 (ko) | 1.75 (en) | 1.81 (es) | **1.81** | **2.00** |

      v2는 페르소나 언어가 en·es로 바뀌어 같은 조건 비교는 아니다. 남은 약점: ④ 확인형 가설(family 1, anger_es 1), ⑤ 감정 어휘 좁히기(attach_en 0~1), ① 이지선다(en·es 1).
    - QA: `dump-chat-prompt --legacy` module1·module7 × ko/en/es × 1~20턴, HEAD의 `chatPrompts.ts`로 만든 출력과 diff 0(2,444,772바이트 동일).
    - QA: `sim-chat.mts 3 attach`(flowVersion 없음, `sim_20261002T122946_attach_module1.json`) → context에 `flowVersion` 없음, 20턴식 1~3턴(인사+퀴즈 인용 → 재진술·모순 → 이지선다), extract는 기존 필드만(`set_packets` 없음).
    - QA: 루트 `npx tsc --noEmit` exit 0, `npm run lint` 경고·오류 없음, `npm run build` exit 0, mobile tsc exit 0.
    - 비용: 시뮬레이션 약 $0.35 + 채점 약 $0.93.

- [x] 12. 문서
  - 선행: 11
  - 변경: `PRODUCT.md`의 "20-turn" 표기 2곳을 25턴으로. `/wiki`로 `WIKI.md` 챗봇(AI 상담 행, 검증 도구)·리포트(카드, 30문항) 흐름 갱신.
  - QA: `grep -n "20-turn" PRODUCT.md` → 결과 없음
  - 결과(2026-10-03):
    - 변경: `PRODUCT.md` 33행(25턴 5세트 + 검사 × 대화 카드), 43행(25턴, 10턴 점검에서 일찍 마무리 가능).
    - 변경: `WIKI.md` — AI 상담 행 라벨을 "앱: 5세트 25턴, 웹·구버전 앱: 20턴"으로, 행 앞머리에 두 흐름 구분 한 줄, "개편 진행 중" → "구현, 지금 앱의 기본". 리포트에 PDF 카드 규칙 한 단락. 검증 도구에 v2 최종 비교(`q11-final*`, 비교표는 11번) 포인터, 옛 "TODO 15번"을 `TODO_2026-09-23.md` 15번으로. 저장소 지도 `scripts/` 목록에 `judge-chat`·`dump-chat-prompt`·`check-*` 추가.
    - QA: `grep -n "20-turn" PRODUCT.md` → 결과 없음(exit 1). `grep -n "개편 진행 중\|TODO 15번" WIKI.md` → 결과 없음(exit 1).

## 사용자 실행 (마지막)

- [ ] 13. (사용자 실행) 배포와 실기기 확인
  - 선행: 0, 12
  - 순서: 커밋 → `git push origin main`(웹·API) → Vercel Ready 확인 → 프로덕션에서 구버전 앱으로 대화 2~3턴과 기존 리포트가 그대로인지 확인 → OTA(`cd mobile && npx --yes eas-cli update --branch production --environment production --message "챗봇 5세트 개편 + 검사×대화 카드" --non-interactive`) → TestFlight 앱 완전 종료 후 두 번 열기.
  - 확인할 것: 모듈 2개 25턴 대화(1·6·11·16·21턴 퀴즈 인용, 24턴 "마지막으로 묻고 싶은 게 있어요"), 10턴 "마무리"로 끝낸 대화 1개, 새 리포트의 무료 카드 1장·유료 카드 4장(구매 가능할 때), 이전에 만든 리포트가 그대로 열리는지.
  - (사용자 확인) 실기기와 RevenueCat 구매가 필요해 자동화할 수 없다.
  - 배포 전 점검(2026-10-03, 에이전트 실행): 1~12번은 모두 커밋됨. `origin/main` 대비 미푸시 커밋 14개(`f90dd8c`~`a4323fb`). 작업 트리 변경은 `CLAUDE.md`(리브랜드 메모, 이번 배치와 무관)뿐.
    - QA: 루트 `npx tsc --noEmit` → exit 0. `npm run lint` → 경고·오류 없음. `npm run build` → 라우트 표 출력까지 성공.
    - QA: `mobile/`의 tsc(큰 스택) → exit 0.
    - OTA 전 결정 필요: 앱 홈 `freeNote`가 아직 "무료 20분 리딩"(발견 사항 6번 항목). → 2026-10-03 30분으로 수정함.

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

- (7번 리포트 생성) 한국어 리포트 `weaknesses[3].body`에 힌디 문자 "शांत"가 섞여 나왔는데 통과됨. 결정론적 검사의 다른 문자 검사는 en/es의 한글·한자만 본다 — ko에도 한글·라틴·숫자·문장부호 밖 문자(데바나가리·키릴 등)를 잡는 검사가 필요. `lib/reportQuality.ts` `checkReportDeterministic`. (v2와 무관, 구버전 리포트에도 해당)
  - 해결(2026-10-03, 사용자 요청): `lib/reportQuality.ts`에 `OTHER_SCRIPT_ALL`(한글·한자·라틴이 아닌 글자 덩어리) 검사를 모든 언어에 추가. 결합 모음 기호까지 덩어리로 잡는다("शांत" 통째로). tsconfig가 ES5라 `u` 플래그 리터럴 대신 `new RegExp`.
    - QA: 스크래치 사례(ko 데바나가리·키릴, en 히라가나 → 잡힘. 한자 "木(목)"·이모지·%·스페인어 악센트 → 통과) 기대대로. 루트 `npx tsc --noEmit` exit 0, `npm run lint` 경고·오류 없음. 실제 리포트 재생성으로는 확인하지 않음.
- (7번 리포트 생성) `strengths_preview[2]`가 24턴 관점 전환 답(closing 재료)을 근거로 써서 `closing_body`와 같은 말이 두 번 나옴. 8번이나 11번에서 섹션별 근거 지시에 "24턴 답은 closing에만" 한 줄 추가 검토. 또 `module_map`에 "이 모듈에서는" 메타 표현이 남음(기존 규칙 11 위반, 검사 없음).
  - 해결(2026-10-03, 사용자 요청): `lib/reportPrompts.ts` 섹션별 근거에서 strengths_preview는 24턴 답을 쓰지 않고, closing_body 줄에 "이 답은 closing_body에만" 명시. 규칙 11에 "module_map·module_deep 본문에는 '이 모듈'을 쓰지 않는다" 추가. `reportQuality.ts`에 `MODULE_META`(이 모듈 / this module / este módulo) 검사를 module_map·module_deep 본문에 추가.
    - QA: 스크래치 사례(ko·en 모듈 페이지의 "이 모듈"·"this module" → 잡힘, 없는 본문 → 통과). 루트 tsc·lint 통과. 프롬프트 효과(중복이 사라지는지)는 리포트 재생성 전이라 미확인.

- (5번 sim/judge, 프롬프트 품질 — 11번 최종 비교 전에 볼 것) `q5-v2` 채점: ① 세트 시작 정리 뒤 재확인이 빠짐(16턴, finish 대화의 6턴) — `s_recap` 1/0. ② 11턴이 "정리 없이 세트 3"이어야 하는데 "지금까지 비슷한 장면이…"로 앞머리 정리를 함. ③ "둘 다 아니면 편하게"·"~군요" 재진술 틀이 7회 이상 반복(`no_repeat` 0, 기준선과 같음). ④ 25턴 마무리에 "이 정리가 맞을까요?" 질문이 대기 안내 앞에 남음(사용자가 답할 수 없는 자리). 모두 `lib/chatPrompts.ts` v2 지시문 쪽 문제.
  - ③④ 해결(2026-10-02, 사용자 요청): v2 전용으로 출구 문장은 세트 ③ 자리(3·8·13·18턴)에만 턴별로 다른 뜻으로 붙이고 "둘 다 아니면 편하게" 표현 금지, 재진술 앞머리 모양을 턴마다 4가지(따옴표 인용·명사 끝·질문에 녹이기·"~라고 하셨어요") 중 하나로 정하고 "~군요/~네요" 끝맺음 금지, v2 예시 대화의 재진술·출구 문장 교체, 25턴은 확인 질문 대신 "이렇게 정리가 되겠군요" 같은 평서문으로 맺기(judge v2 t6 기준도 맞춤). 20턴 흐름 프롬프트는 그대로(`dump-chat-prompt --legacy` module1·module7 × ko/en/es × 1~20턴, 수정 전 출력과 diff 0).
    - QA: `sim-chat.mts 25 attach module1 --flow v2` 재실행(`sim_20261002T080940_…`) → "둘 다 아니면" 류 10회 → 0회(출구는 3·8·13·18턴에만 서로 다른 표현), 첫 줄 "~군요/~네요" 끝 18턴 → 3턴, 25턴 물음표 1 → 0("…이야기로 정리되겠군요."), 인용 5/5·24턴 문구·`set_packets` 5개 그대로.
    - QA: `judge-chat.mts --label q5-v2-fix` → `no_repeat` 0 → 1, 자연스러움 1 → 2, 공통 평균 1.56 → 1.69. `s_recap`은 0(①② 미해결, 그대로 남음).
  - ①② 해결(2026-10-02, 사용자 요청): 세트를 여는 6·16·21턴 지시에 lines 순서(정리 → 재확인·정정 허락 한 줄 필수 → 인용 → 질문)를 명시. 그래도 빠지면 `lib/chat.ts`의 `ensureRecapRecheck()`가 질문 줄 밖에 정정 허락 표현이 없을 때 턴별 언어별 한 줄을 인용 줄 앞(못 찾으면 질문 앞)에 끼운다(위기 안내 응답은 그대로). 11턴은 재진술 지시를 빼고 "정리 없이, 계속하겠다는 답은 짧은 한 구절로만 받고 바로 인용"으로 바꿈. judge v2 `s_recap`·t6 기준에 "이 턴의 재확인은 물음이 아니라 평서문 재확인·정정 허락 줄(질문은 세트 ① 하나)"을 명시(설계와 맞춤).
    - QA: `ensureRecapRecheck` 스크래치 사례 8건(없음→인용 앞 삽입, 이미 있음, 질문 줄에만 있음, 인용 못 찾음, en, es, 위기, 다른 턴) 기대대로. `dump-chat-prompt --legacy` 120건 diff 0, 루트 tsc·스크립트 tsc exit 0, `check-chat-sets` 92/92.
    - QA: `sim-chat.mts 25 attach module1 --flow v2` 재실행(`sim_20261002T081646_…`) → 6턴은 서버 보충 줄, 16·21턴은 모델이 직접 정정 허락 줄을 씀, 11턴 "좋아요, 이어서 조금 더 볼게요." 뒤 바로 인용. 인용 5/5·24턴 문구·`set_packets` 5개·25턴 평서문 맺음 유지. `judge-chat --label q5-v2-recap` → `s_recap` 0 → 2, 세트 준수 평균 2.00, 공통 평균 1.69. 남은 감점: t6 1(10턴 중간 점검에서 정리 뒤 재확인 없이 계속 여부만 물음).
  - 10턴 중간 점검 해결(2026-10-02, 사용자 요청): 점검 지시의 "정정 허락 줄은 쓰지 않는다"를 없애고 lines 순서(정리 → 재확인 한 줄 필수 → 인정 한 줄 → 계속 여부 질문)를 명시. 재확인 줄이 빠지면 `ensureRecapRecheck()`가 10턴용 언어별 한 줄("제가 들은 모습과 다른 데가 있다면, 이어서 이야기하면서 고쳐 주셔도 돼요.")을 질문 앞에 끼운다(es 패턴에 `correg` 추가). 계속 여부 질문은 사용자 뜻을 묻는 중립 형태로 고정("조금 더 나눠 볼까요?"처럼 계속을 제안하는 형태 금지 — 중간 실행 `q5-v2-checkpoint`에서 '연장' 위반으로 잡힘).
    - QA: 스크래치 사례 3건 추가(10턴 없음→질문 앞 삽입, 이미 있음, es) 기대대로. `dump-chat-prompt --legacy` 120건 diff 0, 루트 tsc exit 0, `npm run lint` 경고·오류 없음.
    - QA: `sim-chat.mts 25 attach module1 --flow v2`(`sim_20261002T083650_…`) → 10턴 정리 → 재확인 줄(서버 보충) → "조금 더 이야기를 나누고 싶으신가요, 아니면 여기서 마무리해도 괜찮으신가요?". `judge-chat --label q5-v2-checkpoint2` → t6 2, 위반 5종 모두 2(위반 목록 비어 있음), `no_repeat`·자연스러움 2, 세트 준수 평균 2.00, 공통 평균 1.69.
    - 참고(이번 수정과 무관한 채점 편차): 중간 실행 `q5-v2-checkpoint`(`sim_20261002T083258_…`)에서 13·22턴 한 줄 안의 "~나요? 반대로 ~나요?" 질문 2개, t7(18턴 "예민한 사람처럼 보일까 봐요" 뒤 리프레이밍 없음), t5 0이 잡혔다. 질문 2개는 `enforceOneQuestionPerReply`가 줄 단위라 한 줄 안의 물음표 둘을 못 거르는 문제 — 11번 최종 비교에서 다시 볼 것.
- (9번 픽스처) 카드 `note`가 인용을 되풀이하는 경우가 있다: jisoo 카드 1 note 첫 문장이 원문("알람을 끄고 … 설친다고 했어요")을 거의 그대로 다시 씀(규칙 6 "인용을 되풀이하지 말고"). 또 lucia 카드 4(세트 4, 퀴즈 A10 SNS 확인)의 note가 세트 3 재료("te quiero"·"la palabra de cariño")를 해설함 — 카드와 세트 재료가 어긋남. 둘 다 결정론적 검사로는 안 잡힌다. 11번 최종 비교에서 리뷰어 루브릭이나 프롬프트 한 줄("카드 N의 note는 세트 N 재료만") 검토.
  - 원인 보충(2026-10-03): lucia는 10턴 마무리라 세트 3~5에 대화가 없는데, 카드 3~5 note가 세트 2 대화나 앞 카드의 검사 답을 해설함(카드 4는 없는 인용을 "La frase…"로 가리킴).
  - 해결(2026-10-03, 사용자 요청): `lib/reportPrompts.ts` 카드 note 지시와 규칙 6에 "카드 N은 세트 N 재료만, 인용·답 원문을 말만 바꿔 옮기지 않기, 대화 없는 세트는 그 카드의 검사 답만·대화 언급 금지" 추가. 리뷰어(`buildReviewPrompt`) 5번 항목에 note의 인용 재진술·다른 세트 재료 해설 추가. `reportQuality.ts` `NOTE_CHAT_REFERENCE`: 대화 없는 세트 카드의 note가 대화를 가리키면(라고 했어요 / you said / la frase 등) 잡음.
    - QA: v2 픽스처에 결정론적 검사 → lucia `set_cards_2to5[2].note`("La frase") 잡힘, jisoo 오탐 0. 인용 재진술(jisoo 카드 1)은 말을 바꾼 재진술이라 코드로는 못 잡고 리뷰어 몫 — 리포트 재생성 전이라 미확인.
- (9번 픽스처) lucia 무료 절반이 `oheng_intro` 2문장(3문장 기준) 결함 1건을 못 고친 채 출고됨 — 품질 루프의 기존 동작(v2와 무관).
  - 해결(2026-10-03, 사용자 요청): `lib/report.ts` `acceptFieldwise()` — 수정 호출 결과를 필드 하나씩, 코드 검사 건수가 늘지 않을 때만 받는다(예전엔 묶음 전체를 받거나 버림).
    - QA: 스크래치(lucia에 oheng_intro 3문장 수정 + 일부러 망친 strengths_preview[0]) → oheng만 받고 망친 필드는 버림, 13 → 12. 단 이 예시는 예전 로직도 13 → 13으로 받아들였을 경우라, 실제 미수정 원인이 이것이었는지는 로그가 없어 확정 못 함(수정 모델이 다시 2문장을 썼을 수도 있음).
- (6번) 앱 홈 무료 안내 문구 `freeNote`가 "무료 20분 리딩"(ko) / "Free 20-minute reading"(en) / "Lectura gratis de 20 minutos"(es) — 새 흐름은 30분. `mobile/lib/i18n/{ko,en,es}.ts` 42·66행 부근. 13번 OTA 전에 고칠지 결정 필요.
  - 해결(2026-10-03, 사용자 요청): `mobile/lib/i18n/{ko,en,es}.ts`를 30분으로("무료 30분 리딩" / "Free 30-minute reading" / "Lectura gratis de 30 minutos"). 웹 `lib/i18n`은 20턴 흐름이라 그대로 둠.
    - QA: `mobile/`의 tsc(큰 스택) exit 0.
- (10번) `app/api/report-pdf/route.ts`의 `cleanDeep()`이 `oheng_intro`·`quiz_reading`(그리고 구버전 `chat_*_note`)을 옮기지 않아, `reportPdf.tsx`가 그 자리를 그리도록 되어 있어도 PDF에는 늘 빠진다(구버전·v2 공통, 이번 변경 전부터). 넣을지 결정 필요.
- (11번) v2 en 대화 한국어 섞임·24턴 고정 문구 중복 — 11번에서 해결. 한글 줄 제거 백스톱은 20턴 흐름 비한국어 응답에도 걸린다(프롬프트는 그대로, 응답 후처리만).
- (11번) 5번·9번 발견 사항의 "11번에서 볼 것"(한 줄 안 질문 2개, 카드 note가 다른 세트 재료를 해설) 중 질문 2개는 최종 3건(family·anger_es·attach_en 재실행)에서 위반 점수 2(위반 없음)였지만, 첫 attach_en 실행에서는 1이 나왔다 — 해결된 것은 아니다. 카드 note 문제는 리포트를 다시 생성하지 않아 확인하지 못함 — 남아 있음.
  - 질문 2개 해결(2026-10-03, 사용자 요청): `lib/chat.ts` `collapseInlineQuestions()`를 `enforceOneQuestionPerReply` 앞에 적용. 한 줄 안 두 번째 질문이 반대로/아니면/혹은/또는·or·o로 시작하면 "~나요, 아니면 ~나요?"로 합치고, 아니면 첫 실질 질문만 남김(앞의 짧은 맞장구 "그렇죠?"는 버림). 인용 안 물음표("왜 나만?")는 문장 끝으로 보지 않음.
    - QA: 스크래치 8건(ko 반대로·맞장구·그리고, en Or, es ¿O, 인용 안 물음표, 질문 1개, 질문 없음) 기대대로. 루트 tsc exit 0, lint 경고·오류 없음, `check-chat-sets` 92/92. sim/judge 재실행은 안 함(OpenAI 비용).
- (10번) PDF의 오행 읽기 제목 앞 이모지(🌲 등)가 Noto Sans KR/Manrope에 없는 글리프라 깨진 기호로 찍힌다(ko 4쪽 "보통 — 확인하고…" 앞). 이번 변경 전부터 있던 문제.
