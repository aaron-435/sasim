# SPEC: 무료 AI 상담 챗봇 — 종료 버튼 + 모듈별 핵심 질문 + 퀴즈 답변 재활용

## 배경 (조사 결과)

실기기(TestFlight) 캡처 여러 건에서 확인된 문제 3가지.

1. **체크포인트 이후에도 원할 때 못 끊음** — [mobile/screens/ChatScreen.tsx:217](mobile/screens/ChatScreen.tsx:217)의 `canFinishEarly`는 턴이 이미 `CHECKPOINT_TURN`(10, "계속하기"를 이미 고른 뒤)을 지났어도 `elapsedSeconds >= EARLY_FINISH_SECONDS`(7분)를 별도로 다시 요구한다. 빠르게 타이핑하면 체크포인트를 지나고도 한참 더 기다려야 종료 버튼이 뜬다. 자유 텍스트로 "이제 그만"을 쳐도 `handleSend`는 턴을 1만 올릴 뿐이라(`requestNextTurn(turn+1, ...)`) 모델이 "멈출게요"라고 답해도 세션은 실제로 안 끝나고 입력창이 그대로 남는 불일치가 스크린샷에 보였다.
2. **7번째 턴(반복 패턴 질문)이 11개 모듈 전부 동일** — [lib/chatPrompts.ts:251](lib/chatPrompts.ts:251) 근처 `PHASE_INSTRUCTIONS[7]`이 "이런 일이 처음인지 반복됐는지"를 모든 모듈에 똑같이 묻는다. `mobile/lib/quiz/modules.ts`에 이미 11개 모듈의 실제 차원(애착=불안/회피, 분노=억압/폭발/반추 등)이 정의돼 있는데 챗봇 프롬프트는 이걸 전혀 쓰지 않는다.
3. **퀴즈 답변이 오프닝에서만 쓰이고 버려짐** — `ChatSessionContext.quizAnswer`(가장 강하게 고른 답 1개)는 턴1 오프닝에서만 스치듯 언급되고 이후 재사용되지 않는다. 흥미롭게도 `mobile/lib/quiz/quizProfile.ts`에 이미 정확히 이 용도로 만들어진 `generateFollowUpPrompt()`("아까 '~' 질문에서 '~'라고 답변해주셨는데, ~")와 `findTopAnswersOverall()`(점수 상위 답변 여러 개 추출)이 있는데, 지금 어디서도 호출되지 않는 죽은 코드다.

관련 코드 확인:
- `ChatSessionContext`(`lib/chatPrompts.ts`)는 `track`/`sajuElements`/`psychTestType`/`quizAnswer`/`locale`만 갖고 있고 모듈 ID 자체는 없다. `mobile/screens/QuizScreen.tsx`의 `QuizDiagnosis`엔 이미 `moduleId: string`이 있지만 `ChatScreen.tsx`의 `requestNextTurn`이 API로 넘길 때 빠뜨리고 있다.
- `app/api/chat/route.ts`, `lib/chat.ts`는 `context`를 그대로 통과시키는 얇은 레이어라 새 필드를 옵셔널로 추가해도 코드 변경이 필요 없다.
- 웹 `components/ChatScreen.jsx` + `components/AppFlow.jsx`도 같은 `/api/chat`을 호출하는 20턴 챗 화면을 아직 갖고 있다(`chatContext.headlineAnswer`만 보냄). 다만 메모리 기록상 실제 라이브 웹 퍼널에는 모듈 선택으로 가는 링크가 없어 사실상 도달 불가에 가깝다(PRODUCT.md: "web ... gets a free taste of Q&A ... sent to install the app"). 새 필드를 옵셔널로 만들면 이 경로는 그냥 기존처럼 동작해 건드릴 필요가 없다.
- `EARLY_FINISH_SECONDS`(7분)/`CHECKPOINT_TURN`(10)/`TOTAL_TURNS`(20)은 `mobile/screens/ChatScreen.tsx`에 있고, 종료 경로(`requestNextTurn(TOTAL_TURNS, ...)` → 마감턴 응답 → `extractChatSummary` → `onComplete` → 리포트 화면)는 이미 `handleFinishEarly`/`handleWrapUpAtCheckpoint`로 검증돼 있다 — 새 버튼도 이 경로를 그대로 재사용한다.

## 목표

무료 AI 상담 챗봇에서 (1) 체크포인트 이후엔 헤더의 상시 버튼으로 언제든 대화를 끝내고 바로 리포트로 넘어갈 수 있게 하고, (2) 7번째 턴(반복 패턴 질문)을 11개 심리테스트 모듈마다 다른 핵심 질문으로 바꾸고, (3) 대화 곳곳(서로 다른 4개 턴)에서 사용자가 실제로 고른 퀴즈 답변을 소재로 녹여, 상담마다 판박이처럼 느껴지지 않게 한다.

## 포함 범위

### 1. 헤더 종료 버튼 (요청 1)
- `mobile/screens/ChatScreen.tsx`: 하단의 조건부 `finishRow`(현재 `canFinishEarly`) 버튼을 제거하고, 헤더(뒤로가기·"무료 AI 상담" 라벨·타이머와 같은 줄)에 종료 버튼을 추가한다.
- 노출 조건을 `turn > CHECKPOINT_TURN(10) || elapsedSeconds >= EARLY_FINISH_SECONDS(7분)`으로 바꾼다 — 체크포인트에서 "계속하기"를 고른 뒤(턴 11부터)는 실시간 추가 대기 없이 바로 노출. 체크포인트 이전(턴 2~9)은 기존과 동일하게 7분 최소 대기 유지. `showCheckpoint`가 떠 있는 동안과 `isTyping`/`done`/`errorText` 중에는 기존과 동일하게 숨김.
- 클릭 시 기존 `handleFinishEarly`와 동일하게 `requestNextTurn(TOTAL_TURNS, turnHistoryRef.current)`를 호출한다(새 종료 경로를 만들지 않고 이미 검증된 경로 재사용) — 마감 턴 응답 후 자동으로 리포트 화면으로 전환된다.
- `mobile/lib/i18n/{ko,en,es}.ts`: 헤더 배치에 맞는 버튼 라벨(기존 `chat.finishEarlyButton` 문구를 재사용하거나 다듬음, 3개 언어 동시).
- `lib/chatPrompts.ts` (`ABSOLUTE_RULES_BODY`): "사용자가 자유 텍스트로 그만하고 싶다는 의사를 밝히면, 이미 끝난 것처럼 말하지 말고 위 '그만 얘기할래요' 버튼을 눌러달라고 짧게 안내한다"는 규칙 한 줄 추가 — 모델이 실제로 세션을 끝낼 수단이 없는데 "멈출게요"라고 답해 상태 불일치가 생기는 걸 막는다.

### 2. 모듈별 7번째 턴 핵심 질문 (요청 2)
- `lib/chatPrompts.ts`: `ChatSessionContext`에 `moduleId?: string`(`"module1"`~`"module11"`) 추가.
- `PHASE_INSTRUCTIONS[7]`을 모듈별로 분기하는 함수(예: `buildPatternPhaseInstruction(moduleId)`)로 교체 — `mobile/lib/quiz/modules.ts`의 실제 차원을 근거로 11개 모듈마다 다른 각도의 핵심 질문을 쓴다(아래 "가정"의 11개 방향 참고, 정확한 문구는 TODO 작업 세션에서 확정). `moduleId`가 없거나 매핑에 없는 값이면 현재의 일반 "반복 패턴" 문구로 폴백(웹의 구버전 호출 대비).
- 8번째 턴("구체화")은 그대로 둔다 — 이미 사용자의 7번째 답변 내용을 따라가는 구조라 모듈별 분기의 실익이 적다(제외 범위 참고).
- `mobile/screens/ChatScreen.tsx`: `requestNextTurn`의 API 요청 바디 `context`에 `moduleId: quizDiagnosis.moduleId` 추가(이미 prop으로 갖고 있어 전달만 하면 됨).

### 3. 퀴즈 답변을 대화 여러 지점(서로 다른 4개 턴)에서 소재로 재활용 (요청 3, 사용자 피드백으로 확장)
- `lib/chatPrompts.ts`: `ChatSessionContext`에 `secondaryQuizAnswer?: QuizAnswerQuote | null` 대신 **`quizAnswerPool?: QuizAnswerQuote[]`**(최대 4개, 순서 있음) 추가.
- `mobile/screens/ChatScreen.tsx`: `findTopAnswersOverall(quizDiagnosis.answers, 6)`로 점수 상위 답변들을 뽑아, 오프닝에 이미 쓴 `headlineAnswerRaw`와 `qId`가 다른 항목들을 점수 순으로 앞에서부터 최대 4개 골라 `quizAnswerPool` 배열로 전송. 후보가 4개 미만이면 있는 만큼만 보낸다(빈 배열도 가능).
- **턴 배정(고정, 순서대로 소비)**: `quizAnswerPool[0]` → 4번째 턴(감정, 열림) · `quizAnswerPool[1]` → 7번째 턴(반복 패턴, 열림 — 모듈별 핵심 질문과 함께) · `quizAnswerPool[2]` → 11번째 턴(의미/두려움, 열림) · `quizAnswerPool[3]` → 14번째 턴(대처 방식, 열림). 이 4개 턴은 체크포인트(10번) 전후로 고르게 퍼져 있고 서로 다른 심리적 각도(감정·반복패턴·의미·대처)라 같은 퀴즈 답변이 겹쳐 인용될 일이 없다.
- 배열 길이가 4개보다 짧으면 **뒤 턴부터** 인용을 생략한다(14번 → 11번 → 7번 → 4번 순으로 깎임) — 감정·반복패턴처럼 앞쪽 턴을 우선 살린다. `moduleId`가 없어 7번째 턴이 일반 문구로 폴백하는 경우에도 `quizAnswerPool[1]`이 있으면 그 일반 문구 앞에 인용만 붙는다(독립적으로 동작).
- 각 턴의 지침에 공용 지시 조각을 추가한다(헬퍼 함수 하나로 4곳에서 재사용, 예: `buildQuizQuotePreamble(poolItem)`): "배정된 `quizAnswerPool` 항목이 있으면, 그 문항/답을 소재로 자연스러운 한두 문장을 새로 써서 이어지는 질문의 계기로 삼을 것 — 아래 예시는 취지일 뿐 그대로 베끼지 말고 지금 대화 흐름과 언어에 맞게 새로 쓸 것"(규칙 0.5/12와 동일한 패턴). 7번째 턴은 이 조각 뒤에 모듈별 핵심 질문(요청 2)을 이어붙인다.
- `quizProfile.ts`의 `findTopAnswersOverall()`는 그대로 재사용하고, `generateFollowUpPrompt()`(고정 문자열 반환 함수) 자체는 호출하지 않는다 — 매번 그대로 노출되면 오히려 요청 2가 고치려는 "판박이" 문제를 반복하기 때문. 죽은 코드로 남겨두되 삭제도 하지 않는다(이번 범위 밖 정리).

## 제외 범위

- 자유 텍스트 "그만"/"여기까지" 같은 의사를 자동으로 감지해 세션을 종료하는 의도-분류 로직은 만들지 않는다 — 상단 버튼 방식으로 대체(사용자 결정).
- 체크포인트 이전(턴 2~9)의 7분 최소 대기 자체를 없애거나 줄이지 않는다.
- 8번째~20번째 턴의 모듈별 분기는 만들지 않는다 — 이번엔 가장 판박이로 느껴진다고 지목된 7번째 턴만 고친다. 다른 턴도 진부하다는 피드백이 나오면 별도 TODO로.
- `app/api/chat/route.ts`, `lib/chat.ts` 로직 변경 없음(타입 확장만 자연스럽게 흘러감, 코드 수정 불필요).
- `buildExtractionPrompt`(마감 후 리포트용 요약 추출)는 건드리지 않는다.
- 웹 `components/ChatScreen.jsx`/`AppFlow.jsx`는 손대지 않는다 — 새 필드가 옵셔널이라 안 보내도 기존처럼 동작.
- `quizProfile.ts`의 죽은 코드(`generateFollowUpPrompt`) 삭제/정리는 이번 범위 밖.

## 제약

- CLAUDE.md 압박 규칙(middle path) — 11개 모듈 핵심 질문도 ABSOLUTE_RULES_BODY의 조언 금지·단정 금지 등 기존 규칙 전체를 그대로 따른다(별도 규칙 세트를 만들지 않고 같은 프롬프트 안에 편입).
- HANDOFF 결정 사항: "20턴 완결형, 따뜻한 상담 톤, 강제 컷오프·FOMO 없음" — 새 종료 버튼은 컷오프가 아니라 사용자가 스스로 누르는 선택지여야 한다.
- ko/en/es 3개 언어 동시 처리(버튼 라벨은 i18n 키, 프롬프트 지시문은 한국어로 쓰되 규칙 0.5에 따라 출력은 각 언어로 새로 작성됨 — 기존 구조 그대로).
- OTA로 배포 가능해야 함 — 전부 프롬프트/타입/화면 텍스트 변경이라 신규 네이티브 의존성 없음.
- 웹 배포 후 OTA 순서 — `ChatSessionContext`에 필드가 늘어나므로 API(Vercel)가 먼저 반영되어야 하고, 신규 필드는 전부 옵셔널로 만들어 구버전 앱이 안 보내도 안전하게 폴백해야 한다(웹 배포와 OTA 사이 시차에 깨지지 않도록).

## 가정

- 모듈별 7번째 턴 핵심 질문의 방향(정확한 문구는 TODO 작업 세션에서 확정):
  1. 애착: 관계가 가까워지거나 멀어질 때 실제로 보인 반응(불안/회피)이 이번이 처음인지 반복인지
  2. 돈: 결핍감·과시·회피가 돈과 관련해 실제로 드러난 장면이 반복되는지
  3. 번아웃: 소진/냉소/효능감 저하가 가장 먼저 드러나는 순간이 처음인지
  4. 가면: 이미지 관리를 위해 숨기거나 꾸며낸 장면이 반복되는지
  5. 실행력: 완벽주의·회피·선택 마비로 미뤄진 일이 반복되는지
  6. 분노: 억압하다 터지거나 반추하는 장면이 반복되는지
  7. 예민함: 자극 과부하로 압도된 상황이 반복되는지
  8. 수면: 잠들기 전 머리/몸이 각성 상태로 남는 밤이 반복되는지
  9. 원가족: 가족과의 얽힘/단절/역할부담이 드러나는 장면이 반복되는지
  10. 몰입: 산만함/과몰입/충동성이 드러나는 순간이 반복되는지
  11. 본능·자기표현: 표현을 억누르거나 확신 없이 물러선 장면이 반복되는지
  (전부 "반복 패턴을 여는 질문"이라는 7번째 턴의 원래 목적은 유지하되, 무엇을 반복 패턴의 소재로 삼을지를 모듈 차원에 맞춘다 — 이렇게 해야 8번째 턴의 기존 "구체화" 로직과도 자연스럽게 이어짐)
- `quizAnswerPool`은 `findTopAnswersOverall(answers, 6)`에서 오프닝에 쓰인 `qId`를 제외하고 점수 순 앞에서부터 최대 4개로 구성하며, 4번(감정)·7번(반복패턴)·11번(의미/두려움)·14번(대처방식) 턴에 이 순서대로 고정 배정한다.
- 헤더 버튼 라벨은 기존 `chat.finishEarlyButton` 문구를 헤더 배치에 맞게 다듬는다(예: 아이콘+짧은 텍스트) — 정확한 배치·아이콘은 TODO 작업 세션에서 기존 헤더 스타일에 맞춰 정한다.
- 헤더 버튼은 기존 `canFinishEarly`가 갖던 `!done && !isTyping && !errorText && !showCheckpoint` 조건은 그대로 계승하고, 시간 조건만 위 OR 조건으로 바꾼다.

## 완료 기준

- 체크포인트(턴10)에서 "계속하기"를 고른 뒤, 7분을 기다리지 않아도 헤더의 종료 버튼이 바로 보이고, 누르면 마감 턴 응답 후 리포트 화면으로 전환된다(`mobile-web` 프리뷰 또는 iOS 시뮬레이터 dev-client로 확인).
- 체크포인트 이전(턴 2~9)에서는 기존과 동일하게 7분 전엔 버튼이 안 보인다(회귀 없음).
- `scripts/sim-chat.mts`(또는 그에 준하는 방식)로 서로 다른 `moduleId` 2~3개를 시뮬레이션했을 때, 7번째 턴 질문이 모듈마다 눈에 띄게 다른 각도로 나오고 "이전에도 그랬나요/이번이 처음인가요"라는 동일 문구로 시작하지 않는다.
- 같은 시뮬레이션에서 `quizAnswerPool`이 채워져 있을 때 4번·7번·11번·14번 네 턴 모두 각각 다른 답변 내용을 자연스럽게 인용한다(같은 턴을 여러 번 실행해도 표현이 매번 달라짐 — 고정 템플릿 복붙이 아님, 같은 답변이 두 턴에 걸쳐 중복 인용되지 않음).
- `quizAnswerPool`이 4개보다 짧을 때 뒤 턴(14→11→7→4 순)부터 인용이 생략되고 그 턴은 일반 질문으로 자연스럽게 폴백한다(코드 리뷰 + 짧은 답변 세트로 1회 시뮬레이션 확인).
- `moduleId`/`quizAnswerPool`이 없는 경우(구버전 앱, 웹) 기존 일반 문구로 안전하게 폴백한다(코드 리뷰로 확인).
- `npx tsc --noEmit`(루트), mobile tsc 모두 통과.

## 발견 사항

(TODO 진행 중 발견한 범위 밖 이슈를 여기 적는다.)
