# 작업 지시서 17: 묶음 → 추출 필드 → 세트 카드 (flowVersion 3)

## 목표
선택지 분기형 챗(flowVersion 3, 22턴)의 대화 결과가 리포트까지 이어지게 한다. (1) 마지막 턴 `extract`의 필드 10개 중 묶음(A2·B2)에서 정해진 값이 우선하게 하고, (2) `set_packets`를 v3 턴 번호표대로 만들며, (3) 사용자가 **보기를 탭해서 고른 답**과 **직접 쓴 말**을 구분해 세트 카드가 보기 문구만으로도 비지 않게 한다. 먼저 `SPEC.md`, `CHOICE_CHAT_DESIGN.md`(2절 번호표, 6절 필드 매핑)을 읽고, `lib/chatChoices.ts`의 `getChoiceTurnRole`·`CHOICE_FIELD_BY_TURN`, `lib/chatSets.ts`의 `buildSetPackets`(v2 방식)를 본다. **v1·v2 동작과 출력은 바뀌면 안 된다.**

## 앞제: 보기 탭 구분 방법
앱이 `/api/chat` 요청 body 최상위에 `choicePicks: number[]`를 보낸다 = "보기를 탭해서 답한 봇 턴 번호". 예: 봇 2턴 질문에 보기를 탭했으면 2가 들어 있다. `history` 항목에는 필드를 더하지 않는다(서버가 history를 OpenAI에 그대로 넘기기 때문). 직접 쓴 답은 목록에 없다. 이 값은 클라이언트가 보낸 것이므로 서버가 정제한다(정수 1~22, 중복 제거, 최대 22개, 그 밖은 버림).

## 수정할 파일 (이 목록만)
1. `lib/chatChoices.ts` (이미 있음, 이어서 추가)
   - `sanitizeChoicePicks(raw: unknown): number[]` — 위 정제 규칙.
   - `buildSetPacketsV3(history, chatSets, answers, picks)` → `SetPacket[]`(5개). v2의 `buildSetPackets`와 같은 방식으로 `answerByTurn`(봇 k턴 뒤 첫 사용자 메시지 = k턴 답, `SET_ANSWER_MAX`로 자름)을 만든 뒤 v3 번호표로 나눈다: 세트 1 = 1–4턴, 2 = 5–8, 3 = 10–13, 4 = 14–17, 5 = 18–21(9턴 체크포인트 답은 어느 세트에도 안 넣음). 세트마다 A묶음 턴(시작, 시작+1) 답 → `opening_answers`, B묶음 턴(시작+2, 시작+3) 답 → `module_answers`. 세트 5는 `module_answers`에 20턴 답만, `perspective_answer`에 21턴 답을 넣는다. 단 **보기를 탭한 턴(`picks`에 있는 턴)의 답은 위 배열에 넣지 말고** 세트의 새 필드 `picked_choices`(턴 순서 문자열 배열)에 넣는다. 직접 쓴 말이 하나라도 있으면 `has_chat: true`, 보기만 있으면 `has_chat: false`에 `picked_choices`만 채워진다(이 값이 있다는 뜻 = 보기 문구로 카드를 만든다). `quiz`는 v2와 같이 `selectAllSetQuizAnswers`로. 세트 5의 21턴 답이 보기 탭이면 `perspective_answer`는 null이 아니라 그 문구를 넣고(마무리 문장이 그 말에 기대므로) `picked_choices`에도 넣는다.
   - `applyChoiceFieldHints` 같은 이름으로 `CHOICE_FIELD_BY_TURN`에 따라 필드별 "묶음 답" 목록을 만드는 순수 함수: `buildChoiceFieldPicks(history): Array<{ field: string; a1: string | null; a2: string }>` — 필드의 A2 턴 답(a2)과 바로 앞 A1 턴 답(a1, 없으면 null)을 모은다(답이 없는 필드는 건너뜀). 보기 탭인지 직접 쓴 말인지 상관없이 해당 턴의 사용자 답 원문을 쓴다.
2. `lib/chatSets.ts` — `SetPacket` 인터페이스에 선택 필드 `picked_choices?: string[]`만 추가한다(주석 한 줄). `buildSetPackets`(v2)는 수정하지 않는다.
3. `lib/chat.ts`
   - `attachSetPackets(extract, transcript, context)`에 v3 분기: `chatFlowVersion(context) === 3`이면 `buildSetPacketsV3`를 쓴다(서명을 바꿔야 하면 `picks`를 선택 인자로 추가하고 v2 호출부 동작은 그대로). 
   - 마지막 턴 추출 후, v3이면 `buildChoiceFieldPicks`로 얻은 값을 `ChatExtract`에 반영하는 함수 `applyChoicePicksToExtract(extract, history)`(순수, 파일 안에 export): 모델이 `null`이나 빈 문자열로 둔 필드(`trigger_point`, `emotional_state`, `repeat_pattern`, `core_fear_or_meaning`, `coping`, `relational`, `desired_change`, `module_fields.demand_drain`, `module_fields.resource_left`)에 한해 `"a1 / a2"`(a1이 없으면 `a2`) 형태 문자열을 넣는다. 모델이 이미 채웠으면 덮어쓰지 않는다(우선권은 프롬프트로 준다, 아래 4). `emotional_state`는 한 단어 필드라서 a2 답만 넣는다.
   - 위 두 가지는 v3일 때만 동작해야 한다. `extractChatSummary`가 v3이면 추출 프롬프트에 묶음 답을 넘기도록 호출을 맞춘다(아래 4).
4. `lib/chatPrompts.ts` — `buildExtractionPrompt`에 v3 전용 섹션 추가. `chatFlowVersion(context) === 3`일 때만 시스템 프롬프트 끝에 "## 사용자가 고른 묶음 답(우선 근거)" 블록을 붙인다: 필드별 `필드: A1 "…" → A2 "…"` 줄들. 지시문: "이 필드는 사용자가 고른 보기나 직접 쓴 말로 이미 정해져 있다. 이 값을 바꾸거나 뒤집지 말고 한 문장으로 풀어 쓴다. 새 감정·이유를 지어 붙이지 않는다. 고른 보기 문구 그대로를 따옴표로 인용하지는 않아도 된다." 블록의 데이터는 새 선택 인자(예: `choiceFieldPicks`)로 받는다. v1·v2일 때 출력은 한 글자도 바뀌면 안 된다(기존 시그니처에 선택 인자만 추가).
5. `lib/reportSets.ts`
   - `resolveReportSets`: 받은 `set_packets`에서 `picked_choices`도 `clipList(r.picked_choices, 4)`로 정제해 넣고, `has_chat`은 기존 계산(opening+module+perspective)을 그대로 쓰되, `picked_choices`만 있는 세트는 `has_chat: false`로 둔다. `flowVersion !== 2` 반환 null 조건은 건드리지 않는다(앱은 리포트 요청에도 v2를 보낸다).
   - `describeSetPackets`: 대화 없는 세트(`!has_chat`)이면서 `picked_choices`가 있으면 "대화 없음" 줄 아래에 `- 사용자가 고른 보기(직접 쓴 말이 아님): "…"` 줄들을 넣고, 이 보기들을 카드 해설의 근거로 쓰되 "사용자가 직접 한 말처럼 인용하지 않는다"고 적는다. `picked_choices`가 있고 `has_chat`이 true면(직접 쓴 말과 섞임) 직접 쓴 말 줄 뒤에 같은 방식으로 추가.
   - `describeCardSlots`: 대화 없음 + 보기 있음 슬롯은 "대화 없음 — quote는 빈 문자열, note는 검사 답 하나와 사용자가 고른 보기(이름 붙여 '고른 보기') 로만" 식으로 문구를 바꾼다. 보기가 없으면 지금 문구 그대로.
   - 카드의 `quote` 처리(`buildSetCard`)와 `lib/reportQuality.ts`는 건드리지 않는다: `has_chat`이 false이므로 인용은 비게 되고 기존 검사가 그대로 통과한다.
6. `app/api/chat/route.ts` — body에서 `choicePicks`를 읽어 `sanitizeChoicePicks`로 정제하고 `attachSetPackets`와 `extractChatSummary`에 넘긴다. 응답 모양은 그대로. `history`는 건드리지 않는다.
7. `scripts/gen-qa-fixtures.mts` — **수정하지 않는다**(검증은 메인 세션이 별도 스크립트로 한다).

## 제약
- 건드리면 안 되는 파일: 위 목록 밖 전부. 특히 `mobile/` 전체(다른 작업이 동시에 ChatScreen을 고치고 있다), `.env*`, `lib/reportQuality.ts`, `lib/reportPrompts.ts`.
- v1·v2의 시그니처는 선택 인자를 더하는 것 외에 바꾸지 않는다. v2 `buildSetPackets` 출력은 동일해야 한다.
- 코드 스타일: 2칸, 큰따옴표, 세미콜론, 주석은 한국어로 날짜(2026-10-20)와 이유 한 줄.
- 새 의존성 금지. 압박 규칙(건강·사고 예측, 단정적 부정 예측 금지)을 프롬프트 문구에 어기지 않는다.

## 완료 조건 (루트에서 직접 실행)
- `npx tsc --noEmit` → 오류 0.
- v1·v2 프롬프트 불변: `npx tsx scripts/dump-chat-prompt.mts module3 1,2,5,6,9,10,11,22,24,25 ko`와 `module3 1,10,25 en`의 stdout(`2>/dev/null`)이 변경 전 출력과 `cmp` 동일. 변경 **전에** 먼저 스크래치 디렉터리(`/private/tmp/claude-501/-Users-kwonhyunjo-Desktop-sasim-work/7de10284-a5d7-4f22-8e95-91d1294106f3/scratchpad/`)에 `base17_v2_ko.txt`, `base17_v2_en.txt`로 저장해 둘 것.
- 순수 함수 단위 확인용 일회성 스크립트를 위 스크래치 디렉터리에 `packets-v3-test.mts`로 만들어 `npx tsx`로 돌린다: (a) 22턴 가짜 대화(보기 탭 12개·직접 쓴 말 몇 개 섞음, `picks` 포함)로 `buildSetPacketsV3`가 5개 패킷을 만들고, 보기만 쓴 세트는 `has_chat:false`+`picked_choices` 채워짐, 직접 쓴 말 있는 세트는 `has_chat:true`, 9턴 답이 어느 패킷에도 없음, 세트 5 `perspective_answer`가 21턴 답임을 `console.assert`로 6건 이상 확인. (b) `sanitizeChoicePicks`가 비배열·0·23·소수·문자열·중복을 걸러냄 확인. (c) `applyChoicePicksToExtract`가 빈 필드만 채우고 채워진 필드는 덮어쓰지 않음 확인. 전부 PASS 출력.
- 위 스크립트와 `base17_*`는 프로젝트 안에 두지 않는다(스크래치 디렉터리만).

## 참고
- v2 패킷이 리포트로 가는 길: `app/api/report/route.ts`의 `resolveReportSets` → `lib/reportPrompts.ts`(근거 섹션) → 카드. `has_chat`이 false면 카드 인용은 비고 해설만 쓴다.
- 앱은 리포트 요청에도 `flowVersion: 2`를 보내므로 리포트 쪽 판정은 v2 그대로다.
