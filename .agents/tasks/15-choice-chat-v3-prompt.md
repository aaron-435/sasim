# 작업 지시서 15: flowVersion 3 턴 지침과 모듈 3 묶음 데이터

## 목표
선택지 분기형 챗(flowVersion 3)의 서버 쪽 뼈대를 만든다. 22턴 번호표대로 턴의 역할을 정하는 순수 함수, 모듈 3(번아웃) 한국어 묶음 데이터, v3 시스템 프롬프트 조립, v3 응답 후처리를 넣는다. 반드시 먼저 `CHOICE_CHAT_DESIGN.md`(설계 전문, 22턴 번호표 2절·공통 규칙 3절·세트별 4절·체크포인트 5절)와 `SPEC.md`를 읽고 그대로 따른다. **v1(20턴)·v2(25턴) 동작과 프롬프트 출력은 한 글자도 바뀌면 안 된다.**

## 수정할 파일 / 새로 만들 파일 (이 목록만)
1. **새 파일 `lib/chatChoices.ts`** — 순수 함수만(OpenAI·프롬프트 문장 없음). `lib/chatSets.ts` 모양을 따른다.
   - 상수: `TOTAL_TURNS_V3 = 22`, `CHECKPOINT_TURN_V3 = 9`, `PERSPECTIVE_LEAD_TURN_V3 = 20`(세트 5 B1, 서버가 고정 문구를 붙이는 턴).
   - `ChoiceTurnRole` = `{ turn, kind: "set" | "checkpoint" | "closing", set: ChatSetNumber | null, bundle: "A" | "B" | null, step: 1 | 2 | null, field: string | null, greeting: boolean }`.
   - `getChoiceTurnRole(turn)`: 설계 2절 번호표 그대로. 세트 턴 1–8, 체크포인트 9, 세트 턴 10–21, 마무리 22 이상은 closing. 1 미만·비정수는 1턴. `field`는 A2·B2 턴에서만 값(1–2 `trigger_point`/`emotional_state`, 5–8 `repeat_pattern`/`demand_drain`, 10–13 `core_fear_or_meaning`/`resource_left`, 14–17 `coping`/`relational`, 18–21 `desired_change`/`perspective_answer`), 나머지 null. 세트 번호는 1턴~4: 1, 5~8: 2, 9: 2(체크포인트), 10~13: 3, 14~17: 4, 18~21: 5.
   - `CHOICE_FIELD_BY_TURN`(턴→필드 키 맵)도 export한다(TODO 5가 쓴다).
2. **`lib/modulePlaybooks.ts`** — 모듈 3 묶음 데이터를 추가한다. 타입 `ChoiceBundleStep = { intent: string; options: string[]; branching?: string }`(의도 한 줄, 보기 재료 문구 2~3개 예시, 갈래별로 보기가 달라지는 턴이면 `branching`에 어떤 갈래에 어떤 보기를 줄지 한국어로 적음), `ModuleChoiceBundles = { turns: Record<number, ChoiceBundleStep> }`(1–8, 10–21 턴 키). `MODULE3_CHOICE_BUNDLES`를 설계 4절 세트 1~5 내용 그대로 옮긴다(보기 문구는 설계 문서의 예시를 우선 사용, 24자 이내). 사용자 언어는 ko만이다. `getModuleChoiceBundles(moduleId?: string | null)`을 `getModuleChatSets`와 같은 방식(`hasOwnProperty` 검사)으로 export한다. 모듈 3만 값이 있다.
3. **`lib/chatPrompts.ts`** — v3 지침 조립.
   - `ChatFlowVersion = 1 | 2 | 3`. `chatFlowVersion(context)`는 기존 v2 조건을 그대로 두고, 추가로 `context.flowVersion === 3 && quizAnswers.length > 0 && getModuleChatSets(moduleId) && getModuleChoiceBundles(moduleId)`이면 3. 묶음 데이터가 없는 모듈은 flowVersion 3을 보내도 **1이 아니라 v2 조건을 따라** 2 또는 1로 떨어진다(flowVersion이 3이므로 v2 조건 `=== 2`는 만족하지 않아 1이 된다 — 그대로 1이면 된다).
   - `isFinalTurn(turn, elapsed, 3)`: `elapsed >= TIME_LIMIT_MINUTES_V2 || turn >= TOTAL_TURNS_V3`.
   - `effectiveChoiceTurnRole(turn, elapsed)`: 시간 초과면 22턴 취급(`effectiveSetTurnRole`과 같은 방식). export.
   - `buildChatSystemPromptV3(...)` + `buildChatSystemPrompt` 맨 앞의 분기 한 줄. 조립은 `buildChatSystemPromptV2`를 거울처럼 따른다(예시 대화·절대 규칙·기법·모듈 관점·흐름 설명·지금 해야 할 일·세션 입력값·출력 형식). 이번 턴 지침은 역할별로:
     - 세트 턴: 설계 3절 공통 규칙을 지침에 담는다 — 응답 모양 "반영 한 줄(사용자가 방금 고른 보기 문구를 살림) + 질문 한 줄"(기본 2줄, 최대 3줄), 질문 1개, 모델은 JSON `choices`에 2~3개 보기(각 24자 이내, 중복 없음)를 쓰고 "직접 쓸게요"는 쓰지 않는다(앱이 붙임), 보기는 감정·이유를 단정하지 않는 후보, 조언·처방 보기 금지, A2·B2는 직전에 고른 쪽(또는 직접 쓴 문장)에 맞는 보기, 건강·사고 예측 금지. 그 턴의 `intent`·`options`·`branching`을 데이터에서 읽어 넣는다. 세트 1턴 1은 인사 한두 줄 뒤 곧바로 A1(퀴즈 답 인용 포함). 위치가 A1인 턴(1,5,10,14,18)은 `selectSetQuizAnswer(chatSets, set, answers)`로 고른 퀴즈 답을 v2의 `buildOpeningQuoteInstruction`과 같은 방식으로 인용하게 한다(재사용 가능하면 재사용, v2 함수는 수정하지 말 것 — 필요하면 v3용 얇은 래퍼를 새로 만든다). 20턴은 서버가 고정 문구를 붙이므로 모델은 그 문구를 쓰지 않는다는 지침(v2 `buildPerspectiveInstructionV2`의 문구를 참고).
     - 체크포인트(9턴): 설계 5절 — **3줄 이내, 약 100~120자**. 1줄: 지금까지 사용자가 고르거나 쓴 문구 2~3개를 엮은 "들은 대로 짧게 분석해 본 느낌", 새 감정·이유를 만들지 않음. 2줄: 정정 허락과 인정을 한 줄로 합침("다르게 들렸다면 계속하면서 고쳐 줘도 돼요" 뜻). 3줄: 계속/마무리를 같은 무게로 묻는 질문(계속 쪽에만 이유를 붙이지 않음). 부정 예측·페이월 언급 금지. 이 턴은 `choices`를 쓰지 않는다(앱의 두 버튼이 선택지).
     - 마무리(22턴): `CLOSING_INSTRUCTION_V2`를 재사용하되 "관점 전환 답" 언급은 "21턴에 건넨 말"로 맞춘 v3용 문자열을 새로 만든다(물음표 없음, 마무리 안내가 마지막 줄). `choices` 없음.
   - 모든 v3 턴의 지침 맨 앞에 v2와 같은 `safetyCheck` 한 줄이 붙고, **위기 신호가 있으면 규칙 0이 우선이며 그 응답에는 `choices`를 쓰지 않는다**고 지침에 명시한다.
   - `OUTPUT_FORMAT_V3`: 기존 `OUTPUT_FORMAT`을 건드리지 말고 새 상수를 만든다. JSON에 `"choices": ["보기1","보기2"]` 키를 `lines` 뒤에 추가하고, 보기를 쓰지 않는 턴(체크포인트·마무리·위기)은 `"choices": []`라고 설명한다.
   - 체크포인트 3줄 검사용 순수 함수 `limitCheckpointLinesV3(lines: string[]): string[]`를 `lib/chatChoices.ts`에 둔다(3줄 초과면 앞의 3줄이 아니라 **질문 줄을 반드시 남기고** 앞에서부터 줄여 총 3줄: 마지막이 질문이면 마지막 줄 + 그 앞 2줄). 위기 안내가 담긴 응답은 건드리지 않으므로 호출부에서 처리한다.
4. **`lib/chat.ts`** — v3 후처리.
   - `getChatReply`에서 `flow === 3`일 때: `role = effectiveChoiceTurnRole(...)`. 20턴(`PERSPECTIVE_LEAD_TURN_V3`)이면 `prependPerspectiveLead`, 체크포인트면 `limitCheckpointLinesV3`(`ensureRecapRecheck`는 쓰지 않음), 마지막이면 `ensureClosingLineLast`. 위기 안내가 있는 응답(`CRISIS_LINE_PATTERN`)은 이 후처리를 건너뛴다(기존 함수 방식과 같게).
   - `sanitizeChoices`의 `suppress`: 마지막 턴 **또는 체크포인트 턴(v3)**. 보기는 `flow === 3`일 때만(`params.context.flowVersion === 3` 대신 `flow === 3`로 바꾼다 — 묶음 데이터 없는 모듈이 v1으로 떨어졌을 때 보기가 나가면 안 됨).
   - 세트 ① 인용 재요청: v3의 A1 턴(1,5,10,14,18)에서도 v2와 같은 방식으로 기대 인용이 빠지면 한 번 재요청한다.
   - 파일 위쪽 `ChatReply`·`sanitizeChoices` 구현은 바꾸지 않는다.
5. **`scripts/dump-chat-prompt.mts`** — `--v3` 플래그 추가: context에 `flowVersion: 3`을 넣고, 요약(stderr)에 `getChoiceTurnRole`의 kind·set·bundle·step·field를 출력한다. 플래그가 없으면 출력이 지금과 똑같아야 한다.
6. **`app/api/chat/route.ts`는 이미 `choices`를 내려 보낸다. 수정 불필요. 건드리지 않는다.**

## 제약
- 건드리면 안 되는 파일: 위 목록 밖 전부. 특히 `lib/chatSets.ts`(v2 로직), `mobile/` 전체, `.env*`.
- v2·v1 코드 경로는 리팩터링하지 않는다. 공유가 필요하면 새 함수를 만들고 기존 함수는 시그니처·출력을 유지한다.
- 코드 스타일: 2칸 들여쓰기, 큰따옴표, 세미콜론, 주석은 한국어로 날짜(2026-10-20)와 이유 한 줄.
- 압박 규칙(CLAUDE.md): 보기와 지침 어디에도 건강·사고·재난 예측, 단정적 부정 예측, 가짜 카운트다운 없음.
- 새 의존성 금지.

## 완료 조건 (루트에서, 모두 직접 실행)
- `npx tsc --noEmit` → 오류 0
- v1·v2 프롬프트 불변: 아래 명령을 변경 후 다시 돌려 기준선과 `cmp`로 동일해야 한다. 기준선 파일은 스크래치 디렉터리 `/private/tmp/claude-501/-Users-kwonhyunjo-Desktop-sasim-work/8c74c682-4dd3-4fbb-a74d-411d0f047b7a/scratchpad/` 의 `base_v2_module3.txt`, `base_v2_module1.txt`, `base_v1_module3.txt`, `base_v1_module1.txt`, `base_v2_en.txt`.
  - `npx tsx scripts/dump-chat-prompt.mts module3 1,2,5,6,9,10,11,22,24,25 ko` (module1도 동일 턴)
  - `npx tsx scripts/dump-chat-prompt.mts module3 1,3,7,10,19,20 ko --legacy` (module1도)
  - `npx tsx scripts/dump-chat-prompt.mts module3 1,10,25 en`
  - 새 파일은 같은 디렉터리에 `after_*.txt`로 저장(stdout만, `2>/dev/null`)하고 `cmp`.
- v3 출력: `npx tsx scripts/dump-chat-prompt.mts module3 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ko --v3` 가 오류 없이 22턴 모두 출력되고, stderr 요약이 설계 2절 번호표(턴·세트·묶음·단계·필드)와 일치한다.
- `buildChatSystemPrompt`에 flowVersion 3 + module5(묶음 데이터 없는 모듈)를 넣으면 v3가 아니라 v1 프롬프트가 나온다(간단한 tsx 일회성 스크립트로 확인, 스크래치 디렉터리에 둘 것).

## 참고
- 설계: `CHOICE_CHAT_DESIGN.md`. 기존 v2 구현 위치: `lib/chatPrompts.ts`의 `buildChatSystemPromptV2`, `buildSetTurnInstruction`, `buildCheckpointInstructionV2`, `buildPerspectiveInstructionV2`, `CLOSING_INSTRUCTION_V2`, `OUTPUT_FORMAT`.
- 모듈 3 세트 데이터: `lib/modulePlaybooks.ts`의 `MODULE3_SETS`(후보 문항·초점), `MODULE3` 플레이북(이지선다 축, 감정 팔레트).
- 보기 검증 함수 `sanitizeChoices`는 `lib/chat.ts` 상단에 이미 있다(TODO 2).
