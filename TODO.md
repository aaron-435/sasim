# TODO: 무료 AI 상담 챗봇 — 종료 버튼 + 모듈별 핵심 질문 + 퀴즈 답변 재활용

SPEC.md 승인 완료(2026-09-22). 항목마다 새 세션에서 `/work`로 하나씩 처리.

- [x] 1. 헤더 종료 버튼 — 체크포인트 이후 즉시 노출 (요청 1)
  - 변경:
    - `mobile/screens/ChatScreen.tsx` — 하단 `finishRow`(조건부 버튼)를 제거하고 헤더(뒤로가기·"무료 AI 상담" 라벨·타이머와 같은 줄)에 종료 버튼 추가. `canFinishEarly` 조건을 `!done && !isTyping && !errorText && !showCheckpoint && (turn > CHECKPOINT_TURN || elapsedSeconds >= EARLY_FINISH_SECONDS)`로 변경(기존 `!showCheckpoint` 등은 그대로 계승, 시간 조건만 OR로 확장). 클릭 핸들러는 기존 `handleFinishEarly`(`requestNextTurn(TOTAL_TURNS, turnHistoryRef.current)`) 그대로 재사용.
    - `mobile/lib/i18n/{ko,en,es}.ts` — 헤더 배치에 맞는 버튼 라벨로 다듬음(`chat.finishEarlyButton`: ko "마무리할게요" / en "Wrap up" / es "Terminar" — 기존 문구는 하단 전용 긴 문장이라 헤더 폭에 맞게 줄임. 웹 `lib/i18n/*.ts`는 별도 파일이라 영향 없음).
    - `lib/chatPrompts.ts`(`ABSOLUTE_RULES_BODY`) — 규칙 13번으로 "사용자가 대화를 그만하고 싶어할 때는 이미 끝난 것처럼 말하지 말고 화면 상단 종료 버튼을 안내한다" 추가.
  - QA:
    - `npx tsc --noEmit` (루트) → 에러 없음
    - `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 에러 없음
    - `mobile-web` 프리뷰(포트 8082, `?qa=free&persona=jisoo`로 온보딩 스킵)에서 모듈2(돈) 퀴즈 30문항을 실제로 풀고 챗봇에 진입, 실제 OpenAI 호출로 9턴을 짧게 주고받아 턴10 체크포인트 도달 → "조금 더 이야기할게요" 클릭 → 턴11 응답 직후(경과 시간 4분대, 7분 미만) 헤더에 "마무리할게요" 버튼이 즉시 노출되는 것을 스크린샷으로 확인. 버튼 클릭 → 마감 턴 응답 후 "사주와 심리검사를 함께 읽고 있어요..." 리포트 생성 화면으로 자동 전환되는 것까지 확인. 턴2~9(체크포인트 이전) 동안은 매 턴 스크린샷에서 헤더에 버튼이 뜨지 않음을 확인(회귀 없음). 부수적으로 테스트 중 한 답변("그냥 다 내려놓고 싶은 느낌이에요")이 위기 신호로 잘못 해석되어 규칙 0 안전 프로토콜이 발동됨 — 버그 아니라 규칙 0이 의도대로 최우선 동작한 것.

- [x] 2. 7번째 턴을 11개 모듈별 핵심 질문으로 분기 (요청 2)
  - 변경:
    - `lib/chatPrompts.ts` — `ChatSessionContext`에 `moduleId?: string` 추가. `PHASE_INSTRUCTIONS[7]`(고정 문자열)을 제거하고, `MODULE_PATTERN_INSTRUCTIONS`(11개 모듈별 문구 맵) + `buildPatternPhaseInstruction(moduleId?: string)` 함수로 대체 — `mobile/lib/quiz/modules.ts`의 실제 차원을 근거로 11개 모듈 각각 다른 각도의 "반복 패턴" 질문을 쓴다(SPEC "가정"의 11개 방향 그대로). `buildChatSystemPrompt`가 `effectiveTurn === 7`일 때만 이 함수를 호출하도록 분기. `moduleId`가 없거나 매핑에 없으면 기존 일반 문구(`GENERIC_PATTERN_INSTRUCTION`)로 폴백.
    - `mobile/screens/ChatScreen.tsx` — `requestNextTurn`의 API 요청 `context`에 `moduleId: quizDiagnosis.moduleId` 추가.
    - `scripts/sim-chat.mts` — 하드코딩된 `ctx`에 `moduleId: process.argv[4] ?? "module3"` 추가해 4번째 인자로 모듈을 바꿔가며 실행할 수 있게 확장.
  - QA:
    - `npx tsc --noEmit` (루트) → 에러 없음 (출력 없음)
    - `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 에러 없음 (출력 없음)
    - `npx tsx --env-file=.env.local scripts/sim-chat.mts 8 talkative module1` / `...module6` / `...module9` 3회 실행 → 7번째 턴 질문이 모듈마다 다른 각도로 나옴을 출력으로 직접 확인: module1은 "관계가 가까워지거나 멀어지려는 순간... 반응이 이번이 처음인지"(애착), module6은 "그 긴장이 처음부터 있었던 건지, 예전 번아웃 뒤로 더 자주 반복되는 쪽인지"(분노 문구가 사용자의 실제 발화 흐름에 맞춰 자연스럽게 적용됨), module9는 "예전에도 가족이랑 너무 얽히거나, 반대로 마음을 닫아버리거나, 일찍부터 어른 역할을 떠맡았던 때에 비슷하게 이렇게 긴장이 올라온 적이 있었나요?"(원가족 문구 거의 그대로 반영) — 세 실행 모두 서로 다르고 "이런 일이나 이런 감정이 이번이 처음인지"라는 동일 문구로 시작하지 않음.
    - 나머지 8개 모듈(module2/4/5/7/8/10/11)은 코드 리뷰로 `MODULE_PATTERN_INSTRUCTIONS`의 문구와 `mobile/lib/quiz/modules.ts`의 `dimensionShortNames` 차원을 1:1 대조 확인 — 전부 일치.
    - `npx tsx --env-file=.env.local scripts/sim-chat.mts 8 talkative none` (매핑에 없는 moduleId) 1회 실행 → 7번째 턴이 "이런 일이 예전에도 또 있었는지, 아니면 그때 그 한 번이 특히 크게 남은 건지 궁금해요?" 같은 일반 문구 취지로 폴백함을 확인(구버전 앱/웹 대비 회귀 없음).

- [x] 3. 퀴즈 답변 pool을 4개 턴(4·7·11·14번)에 재활용 (요청 3)
  - 선행: 2 (7번째 턴이 함수형으로 바뀌어 있어야 그 위에 인용 조각을 자연스럽게 얹을 수 있음) — 완료 상태에서 진행함.
  - 변경:
    - `lib/chatPrompts.ts` — `ChatSessionContext`에 `quizAnswerPool?: QuizAnswerQuote[]`(최대 4개) 추가. `QUIZ_QUOTE_TURN_INDEX`(4→0, 7→1, 11→2, 14→3)와 공용 헬퍼 `buildQuizQuotePreamble(item?)`를 추가해 `buildChatSystemPrompt`가 해당 턴의 `phaseInstruction` 앞에 인용 조각을 붙이도록 조립(7번은 모듈별 질문 앞에 붙음). 해당 인덱스에 항목이 없으면 그 턴은 인용 없이 기존 문구 그대로.
      - 최초 문구는 "이 문항/답을 소재로 삼아라"는 권유 톤이었는데, 실사용 시뮬레이션에서 모델이 대화 흐름을 이유로 자주 생략함(4턴 중 1턴만 인용) — "지금 대화가 이미 다른 소재로 흘러가고 있더라도 반드시 포함시켜라(생략하지 말 것)"는 강제 톤으로 재작성 후 4턴 모두 안정적으로 인용됨.
    - `mobile/screens/ChatScreen.tsx` — `findTopAnswersOverall(quizDiagnosis.answers, 6)`(이번에 처음 호출)로 오프닝에 쓴 `headlineAnswerRaw`와 `qId`가 다른 항목을 점수 순으로 최대 4개 뽑아 `quizAnswerPool`로 API 요청에 포함.
    - `scripts/sim-chat.mts` — `ctx`에 샘플 `quizAnswerPool`(4개) 추가, 4번째 argv(`quizPoolSize`, 기본 4)로 풀 크기를 잘라 폴백 테스트를 명령줄에서 바로 돌릴 수 있게 확장.
  - QA:
    - `npx tsc --noEmit` (루트) → 에러 없음 (출력 없음)
    - `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 에러 없음 (출력 없음)
    - `npx tsx --env-file=.env.local scripts/sim-chat.mts 15 talkative module3 4` 2회 실행(quizAnswerPool 4개) → 두 실행 모두 4번째 턴이 pool[0]("감정을 잘 못 느끼고 그냥 멍해진다")을, 7번째 턴이 pool[1]("예전에도 몇 번 이렇게 지쳐본 적 있다")을 각각 다른 표현으로 자연스럽게 인용함을 출력에서 직접 확인. 두 실행 모두 "talkative" 페르소나가 체크포인트(10번)에서 조기 종료를 선택해 11·14번 실제 대화 흐름 검증은 못 함 — 아래 별도 스크립트로 보완.
    - 스크래치 스크립트(`getChatReply`를 turn=11/14로 직접 호출, 턴1~10은 합성 history)로 보완 확인: pool 4개 모두 채운 상태에서 11번 턴이 pool[2]("이러다 아예 무너져버릴까 봐")를 따옴표째 인용, 14번 턴이 pool[3]("아무렇지 않은 척 계속 일한다")을 자연스럽게 바꿔 표현 — 4개 턴 모두 서로 다른 항목을 인용하고 중복 없음 확인.
    - 같은 스크래치 스크립트로 `quizAnswerPool`을 2개(pool[0], pool[1]만)로 줄여 11·14번 턴 재실행 → 두 턴 모두 인용 없이 일반 질문으로 자연스럽게 폴백함을 확인(뒤 턴부터 생략되는 우선순위 규칙 검증).
    - `quizAnswerPool`을 아예 생략(undefined)하고 4번·7번 턴 재실행 → 인용 없이 정상 동작, 7번째 턴의 module3 반복패턴 문구는 그대로 유지됨을 확인(구버전 앱/웹 대비 회귀 체크).

- [ ] 4. (사용자 실행) 배포 및 실기기 확인
  - 항목 1~3이 모두 `[x]`가 된 뒤: 웹(`app/api/chat`)이 Vercel에 배포됐는지 확인 → OTA(`eas update --branch production`) 발행 → TestFlight 또는 iOS 시뮬레이터 dev-client에서 실제 대화로 헤더 종료 버튼, 모듈별 질문, 퀴즈 답변 인용이 실사용 흐름에서 자연스러운지 최종 확인
  - (사용자 확인) — 자동화 불가, 실제 배포와 실기기 필요

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

- 항목 2 작업 시작 시점에 항목 1(헤더 종료 버튼)의 코드 변경(`mobile/screens/ChatScreen.tsx`의 헤더 버튼, `lib/chatPrompts.ts` 규칙 13)이 이미 작업 트리에 uncommitted 상태로 들어와 있었음(체크박스는 `[ ]`). QA가 실행/기록된 흔적이 없어 이번 세션에서는 손대지 않고 항목 2만 진행함 — 항목 1은 다음 세션에서 `/work 1`로 QA부터 마저 진행 권장.
