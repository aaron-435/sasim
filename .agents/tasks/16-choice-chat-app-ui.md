# 작업 지시서 16: 챗 화면 보기 탭 UI (flowVersion 3, 개발용 스위치)

## 목표
앱 챗 화면(`mobile/screens/ChatScreen.tsx`)이 서버의 새 응답 필드 `choices`(보기 2~3개)를 받아, 마지막 봇 말풍선 아래에 탭 가능한 칩으로 보여 준다. 칩을 탭하면 그 문구가 사용자 말풍선이 되어 다음 턴을 요청한다. 칩 줄 끝에는 항상 "직접 쓸게요"가 있고, 누르면 칩이 접히고 입력창에 포커스가 간다. flowVersion 3은 **개발용 스위치로만** 켠다(기본값은 지금처럼 2). 먼저 `SPEC.md`(제약), `CHOICE_CHAT_DESIGN.md`(1~3절)를 읽는다.

## 수정할 파일 (이 목록만)
1. `mobile/screens/ChatScreen.tsx`
2. `mobile/lib/i18n/types.ts`, `mobile/lib/i18n/ko.ts`, `mobile/lib/i18n/en.ts`, `mobile/lib/i18n/es.ts` — `chat` 섹션에 새 키 (ko/en/es 동시):
   - `writeOwnChoice` (ko "직접 쓸게요" / en "I'll write it" / es "Lo escribo yo")
   - `choicesA11y` (보기 영역 접근성 라벨, 예: ko "답 보기" / en "Answer options" / es "Opciones de respuesta")
3. 새 파일 `mobile/lib/chatFlow.ts` — 개발용 스위치 한 곳. 아래 "개발용 스위치" 참고.

## 동작 (꼭 지킬 것)
- **flow 설정**: `chatFlow.ts`가 `{ flowVersion: 2 | 3, totalTurns: 25 | 22, checkpointTurn: 10 | 9 }`를 돌려준다. ChatScreen의 상수 `FLOW_VERSION`, `TOTAL_TURNS`, `CHECKPOINT_TURN`을 이 값으로 바꾼다. `TURNS_PER_SET`는 v2에서 5, v3에서는 세트가 4턴 단위(1–4, 5–8, 10–13, 14–17, 18–21)이므로 헤더의 "이야기 N / 5"는 v3에서 아래 함수로 계산한다: 턴 1–4→1, 5–9→2(9는 체크포인트, 세트 2 끝), 10–13→3, 14–17→4, 18 이상→5. `totalSets`는 항상 5. v2 계산식은 건드리지 않는다.
- **개발용 스위치**: 웹 미리보기(`Platform.OS === "web"` 이고 `__DEV__`)에서 URL의 `?chat=3`이면 v3, `?chat=2`나 없으면 v2. `mobile/dev/qaMode.ts`의 `getQaMode`처럼 `__DEV__ && Platform.OS === "web"`가 아니면 항상 v2를 돌려준다(릴리스·OTA 번들·네이티브는 바뀌지 않아야 한다). localStorage에 저장하지 않는다(URL만).
- **보기 수신**: `/api/chat` 응답 JSON의 `choices`가 문자열 배열이고 2~3개일 때만 쓴다(그 밖은 무시, 열린 질문). 보기는 `revealLines`로 마지막 봇 말풍선이 다 나온 **뒤에** 상태에 넣는다. 마무리(extract 응답)·오류·체크포인트 턴에는 보기를 표시하지 않는다. 새 턴을 요청하거나 사용자가 보낼 때마다 보기 상태를 비운다.
- **칩 UI**: 스크롤 영역 아래, 입력창 위(체크포인트 버튼과 같은 자리 스타일)에 칩 줄. 보기가 있고 `!isTyping && !done && !errorText && !showCheckpoint`일 때만. 칩은 `PressableScale`(`../components/motion/PressableScale`), 한 줄에 다 안 들어가면 줄바꿈(`flexWrap`). 모양은 기존 `checkpointButtonSecondary`와 같은 톤(hairline 테두리, `RADIUS.pill`, `FONTS.medium`)이고 "직접 쓸게요"는 점선 테두리 같은 보조 모양으로 구분(색은 `COLORS`/`SURFACE` 토큰만, 새 팔레트 금지). 최소 터치 높이 44. `accessibilityRole="button"`, 칩 영역은 `accessibilityLabel={strings.chat.choicesA11y}`.
- **칩 탭**: 이미 있는 `handleContinueAtCheckpoint`와 같은 패턴 — `Keyboard.dismiss()`, 사용자 말풍선 추가, `turnHistoryRef`에 `{ role: "user", content: 문구 }` 추가, 보기 비움, `requestNextTurn(turn + 1, nextHistory)`. 추가로 이 턴 번호(`turn`, 방금 답한 봇 턴)를 `choicePicksRef`(number[])에 기록한다.
- **choicePicks 전송**: 모든 `/api/chat` 요청 body에 `choicePicks: choicePicksRef.current`(탭으로 답한 봇 턴 번호들, 중복 없이 오름차순)를 최상위 필드로 추가한다(`history` 항목에 필드를 더하지 말 것 — 서버가 history를 OpenAI에 그대로 보낸다). 직접 쓴 답은 기록하지 않는다. v2에서는 항상 빈 배열이어야 하고 v2 요청 본문의 다른 부분은 그대로.
- **직접 쓸게요**: 칩 줄을 접고(`ownInputOpen` 상태) 입력창에 포커스한다(`TextInput`에 ref). 입력창은 보기가 보이는 동안에도 계속 보이므로 포커스만 주면 된다. 새 턴이 오면 상태를 초기화한다. 입력창으로 직접 보내는 `handleSend`는 `choicePicksRef`에 기록하지 않는다.
- **모션**: 칩 줄 등장은 기존 `Reveal`(`../components/motion/Reveal`)을 쓴다 — 이미 `useReducedMotion`을 따르므로 새 모션 코드를 만들지 않는다. 칩 개별 stagger 애니메이션 금지.
- **v3 체크포인트**: `showCheckpoint`는 `turn === CHECKPOINT_TURN`(v3에서 9)일 때. 기존 두 버튼 그대로. `canFinishEarly`의 `turn > CHECKPOINT_TURN` 조건도 새 상수를 따른다.
- **v2 동작 불변**: 스위치가 꺼진 상태에서 요청 본문(`flowVersion: 2` 등)·화면 동작이 지금과 같아야 한다. `choicePicks: []`만 늘어난다.

## 제약
- 건드리면 안 되는 파일: 위 목록 밖 전부(특히 루트 `lib/`, `app/`, `mobile/screens/` 중 ChatScreen 외, `mobile/package.json`).
- 새 네이티브 의존성 금지(OTA 가능해야 함). 글꼴은 `FONTS` 토큰만, 색은 `COLORS`/`SURFACE`, 간격은 `SPACE`/`RADIUS` 토큰.
- 코드 스타일: 주변 코드와 같게(2칸, 큰따옴표, 세미콜론). 주석은 영어 또는 한국어로 날짜(2026-10-20)와 이유 한 줄. 문구는 화면에 하드코딩하지 말고 i18n 키로.
- 서버(`lib/`, `app/api/`)는 다른 작업이 동시에 고치고 있다. 건드리지 않는다.

## 완료 조건 (직접 실행)
- `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 오류 0.
- ko/en/es 세 사전에 새 키가 모두 있다(`types.ts` 타입과 일치, tsc가 확인).
- 브라우저 확인은 이 작업에서 하지 않는다(메인 세션이 한다).

## 참고
- 서버 응답 모양: `{ lines: string[], formulation?, choices?: string[] }`. 마지막 턴은 `{ lines, extract }`.
- 22턴 번호표: `CHOICE_CHAT_DESIGN.md` 2절. 9턴이 체크포인트, 22턴이 마무리(마무리 버튼은 `requestNextTurn(TOTAL_TURNS, ...)`로 점프하는 기존 경로를 그대로 쓴다).
