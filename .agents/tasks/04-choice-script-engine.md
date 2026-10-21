# 작업 지시서 04: flowVersion 4 고정 스크립트 엔진 (서버)

## 목표
챗 22턴을 모델 호출 없이 고정 스크립트로 진행하는 서버 엔진을 만든다. 질문·보기·반응·gist 문구는 이미 사람이 써 둔 데이터(`lib/choiceScripts/`)에 있다. **문구를 새로 쓰거나 고치지 않는다.** 읽을 문서: `SPEC.md`, `CHOICE_SCRIPT_GUIDE.md`(1·2·4절), `lib/choiceScripts/types.ts`·`common.ts`·`module3.ts`(이미 작성됨, 수정 금지).

## 수정할 파일 / 새로 만들 파일
1. 새 `lib/choiceScripts/index.ts`: `getModuleScript(moduleId): ModuleScript | undefined` (지금은 module3만).
2. 새 `lib/chatScript.ts`: **순수 함수**(OpenAI·네트워크 import 금지, `npx tsx`로 환경변수 없이 돌아가야 함).
   `buildScriptReply({ script, turnNumber, history, quoteLabel }): { lines: string[]; choices?: string[]; inputOnly?: boolean }`
   - `history`는 `{role, content}[]`. 봇 메시지 k번째 = k턴, 그 바로 뒤 첫 사용자 메시지 = k턴의 답(`lib/chatChoices.ts`의 `collectAnswerByTurn` 방식. 필요하면 export).
   - N턴 응답(1≤N≤8, 10≤N≤21) lines = [N−1턴 답에 대한 반응 줄(N=1이면 없음)] + [N=20이면 `PERSPECTIVE_LEAD_LINE`] + [turn.quote && quoteLabel이면 `QUOTE_LINE_TEMPLATE`의 `{label}` 치환] + [question]. `choices` = 그 턴 options의 text(21턴은 options 없음 → `choices` 생략하고 `inputOnly: true`).
   - 반응 줄 결정: N−1턴 답 텍스트(공백 정규화)가 N−1턴 options[].text와 정확히 일치하면 그 option의 reaction. 일치하지 않으면(직접 쓴 글) `FREE_REACTION_POOL`에서 고른다: 상태 없이 history로 결정한다 — 직전 봇 메시지의 첫 줄이 풀에 있으면 그 인덱스를 피하고, 끝 두 글자가 같은 줄도 피하며(예: "군요."끼리), 나머지에서 `turnNumber`와 답 길이로 결정적으로 고른다. 답이 `SKIP_ANSWER_TEXT`이거나 비면 반응 줄 없음.
   - 9턴(체크포인트): lines = [8턴 답 반응 줄] + `script.checkpoint`(템플릿 치환). `choices` 없음(앱이 두 버튼을 이미 처리).
   - 22턴 이상(마무리): lines = [21턴 답 반응 줄(직접 쓴 글이면 풀, 건너뜀·비면 없음)] + `closing.summary` 치환 + (21턴에 실제 글이 있을 때만 `closing.perspectiveLine`) + `closing.finalLine`. `choices` 없음. 시간 제한으로 22턴 전에 마무리하는 경우에도 같은 함수가 쓰이므로, 답이 없는 턴의 gist는 `FREE_GIST`로 채운다.
   - 템플릿 치환: `{gN}` = N턴 답이 보기와 일치하면 그 option.gist, 아니면 `FREE_GIST`. `{gN:A/B}` = 위 gist 뒤에 받침이 있으면 A, 없으면 B를 붙인다(한글 음절 `(code-0xAC00)%28!==0`이 받침. 마지막 글자가 한글이 아니면 받침 있음으로 본다). 받침 판정 함수는 export.
   - 조사 `ㄹ` 받침(예 "말")은 일반 받침으로 취급한다(이/가는 그대로 맞다).
3. 수정 `lib/chatPrompts.ts`: `ChatFlowVersion`에 4 추가. `chatFlowVersion()`: `context.flowVersion === 4` + 퀴즈 답 1개 이상 + `getModuleChatSets` 있음 + `getModuleScript` 있음 + `(context.locale ?? "ko") === "ko"`면 4. 아니면 기존 규칙(v4 요청이 조건을 못 맞추면 1이 아니라 **flowVersion 2 조건으로 떨어진다**: 즉 4를 요청했는데 스크립트가 없으면 `context.flowVersion`을 2로 간주해 v2 판정). `isFinalTurn`: 4는 v3와 같다(30분 또는 22턴). `grep -n "flowVersion\|chatFlowVersion\|=== 3\|ChatFlowVersion" lib/*.ts app/api/chat/route.ts`로 v3 분기 전부를 찾아 4가 필요한 곳(추출 프롬프트의 묶음 답, set_packets, 체크포인트 억제 등)에서만 `>= 3` 처리하고, v1·v2·v3 동작은 바꾸지 않는다.
4. 수정 `lib/chat.ts`: 새 `getChatReplyV4(params)` — 기존 `getChatReply`와 같은 params. 흐름: 마지막 사용자 메시지에 `JOURNAL_CRISIS_PATTERN`(`lib/journal.ts`에서 import)이 걸리면 기존 `getChatReply`를 **flowVersion을 뺀 context 사본**으로 호출한다(v1 프롬프트의 규칙 0 안전 응답. turnNumber는 `turn>=22 ? turn : Math.min(turn, 19)`), 반환에서 `choices` 제거. 아니면 `buildScriptReply`로 모델 없이 응답한다(`quoteLabel`은 기존 `selectSetQuizAnswer(getModuleChatSets(moduleId), 세트번호, quizAnswers)?.label` — 세트 번호는 `getChoiceTurnRole(turn).set`; 인용 턴은 1·5·10·14·18). `ChatReply`에 `inputOnly?: boolean` 추가. `extractChatSummary`·`attachSetPackets`·`applyChoicePicksToExtract`는 flow 4를 v3와 같은 경로로 태운다(`flow >= 3`). 추가로 flow 4의 `applyChoicePicksToExtract`는 보기를 탭한 턴(`choicePicks`는 정제된 번호 배열이니 시그니처에 선택 인자로 넘기거나, history 답이 해당 턴 options.text와 일치하는 것으로 판정)의 필드값을 답 원문 대신 그 option.gist로 채운다(`a1 / a2` 형식 대신 gist만. 직접 쓴 글은 기존 그대로). `SKIP_ANSWER_TEXT` 답은 `buildSetPacketsV3`의 `perspective_answer`에서 null로 취급한다(`lib/chatChoices.ts` 수정).
5. 수정 `app/api/chat/route.ts`: `chatFlowVersion(context) === 4`이면 `getChatReplyV4`를 부르고, 응답에 `inputOnly`를 그대로 실어 보낸다. 마지막 턴 추출·`saveChatSession`은 기존 경로 그대로.

## 제약
- 건드리면 안 되는 파일: `lib/choiceScripts/types.ts`·`common.ts`·`module3.ts`(문구 데이터), `lib/modulePlaybooks.ts`, `mobile/`, `.env*`. `.env`는 읽지 않는다.
- 문구 금지: 새 한국어 사용자 노출 문구를 코드에 쓰지 않는다. 필요한 문구는 이미 데이터에 있다.
- 스타일: 주변 코드처럼 한국어 주석, 같은 들여쓰기. v1·v2·v3 프롬프트 출력 불변.

## 완료 조건
- `npx tsc --noEmit` (루트) 통과.
- v1·v2·v3 프롬프트가 변하지 않음: 아래 세 명령 출력이 `/private/tmp/claude-501/-Users-kwonhyunjo-Desktop-sasim-work/96d0a4ee-8c88-408c-95c1-2405ca2fe2bb/scratchpad/base/v1.txt`·`v2.txt`·`v3.txt`와 `cmp` 동일해야 한다.
  - `npx tsx scripts/dump-chat-prompt.mts module3 1,6,9,10,20,22 ko --legacy 2>/dev/null`
  - `npx tsx scripts/dump-chat-prompt.mts module3 1,6,9,10,20,22,25 ko 2>/dev/null`
  - `npx tsx scripts/dump-chat-prompt.mts module3 1,2,9,20,21,22 ko --v3 2>/dev/null`
- 새 스크래치 스크립트 `scripts/run-choice-script.mts`(OpenAI 미사용): module3를 `buildScriptReply`만으로 1~22턴 돌려 출력한다. 시나리오 3개: (a) 매 턴 첫 번째 보기, (b) 보기와 직접 쓴 글 섞기(예: 3·7·12턴 직접 입력, 21턴 직접 입력), (c) 21턴 `SKIP_ANSWER_TEXT`. 각 시나리오에서 턴마다 lines와 choices를 찍는다. 조사 치환 결과가 자연스러운지 사람이 읽을 수 있게 9턴과 22턴 줄 전체를 출력한다.
