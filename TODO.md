# TODO: 선택지 분기형 챗 프로토타입 (모듈 3, ko)

`SPEC_2026-10-20_choicechat.md` 기준. 항목마다 **새 세션에서 `/work`로 하나씩** 처리한다. 사용자가 SPEC을 승인한 뒤 시작한다.

공통 메모:
- 루트 tsc: `npx tsc --noEmit`
- mobile tsc: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`
- `sim-chat`은 OpenAI 비용이 든다. 항목에 적힌 턴 수만 쓴다.
- 작업 브랜치: `git switch -c task-NN` (NN은 `.agents/tasks`의 다음 번호). 백업 태그 `backup-before-choice-chat-2026-10-20`는 건드리지 않는다.
- 3개 파일 이상은 `.agents/tasks/NN-제목.md` 지시서를 쓰고 `muse exec --model muse-spark-1.3 ...`로 위임한다(챗 프롬프트는 표준 모델).

## 설계

- [x] 1. 턴 배치와 묶음 설계 확정 (사용자 승인 필요)
  - 변경: 새 파일 `CHOICE_CHAT_DESIGN.md`(코드 없음). SPEC에서 확정된 결정(22턴, 오프닝 즉시 시작, 10턴 체크포인트는 짧은 분석 느낌)을 따른다. 모듈 3의 5세트 각각에 대해 묶음 A·B의 A1/A2 질문 의도, 보기 재료(번아웃 플레이북 이지선다 축·감정 팔레트), 채우는 추출 필드, 22턴 번호표(오프닝, 세트 사이 정리, 10턴 체크포인트 위치, 마무리)를 적는다. 현재 10턴 응답(`chatPrompts.ts` 체크포인트 지침과 `getSetTurnRole`의 checkpoint 역할)이 얼마나 긴지 확인해 어느 정도로 줄일지 쓴다.
  - QA: 사용자가 읽고 승인하거나 수정한다. 턴 번호표가 오프닝~마무리까지 빈틈과 겹침 없이 22턴으로 이어지는지 문서 안에서 직접 센다.
  - QA: 번호표 22행 awk로 1~22 연속 확인(세트 20턴 + 9턴 체크포인트 + 22턴 마무리) → 통과. 사용자 승인 2026-10-20("추천대로"): 선택 입력칸 보류, 세트 5 B=관점 전환 두 턴, 체크포인트 9턴.

## 서버

- [x] 2. `choices` 응답 필드와 검증
  - 선행: 1
  - 변경: `lib/chat.ts`의 응답 타입·파서에 `choices?: string[]`를 더하고, 개수 2~3·길이 24자·중복·위기/마무리 턴 제거 규칙을 검증 함수로 둔다(어기면 `choices`만 버림). `app/api/chat/route.ts`가 그대로 내려 보낸다.
  - QA: 루트 tsc 통과. 검증 함수에 대한 일회성 스크립트(스크래치 디렉터리)로 정상·초과·빈 값·위기 턴 입력 6건 이상을 돌려 기대 출력과 일치함을 확인.
  - QA: `npx tsc --noEmit` → 오류 없음(exit 0). 스크래치 `choices-test.mts`(tsx)로 `sanitizeChoices` 14건(정상 2·3개, 1개·4개, 빈 값, 25자, 24자 경계, 문장부호 중복, 비문자열, 배열 아님, undefined, suppress, 위기 줄 1393·988) → 전부 PASS.

- [x] 3. flowVersion 3 턴 지침과 모듈 3 묶음 데이터
  - 선행: 1, 2
  - 변경: 새 순수 함수 파일 `lib/chatChoices.ts`(턴→역할, `chatSets.ts` 모양을 따름), `lib/modulePlaybooks.ts`에 모듈 3 묶음 데이터, `lib/chatPrompts.ts`에 v3 지침 조립. 위기 신호가 있으면 기존 안전 응답이 우선하도록 순서를 확인한다.
  - QA: 루트 tsc 통과. `buildChatSystemPrompt`를 v3·모듈 3으로 1~22턴 출력해 턴 번호표(TODO 1)와 역할이 일치함을 비교. v1·v2 프롬프트 출력이 변경 전후 동일함(`cmp`)을 확인.
  - QA: `npx tsc --noEmit` → exit 0. `dump-chat-prompt --v3` module3 1~22턴 → 턴·세트·묶음·단계·필드가 번호표와 일치. v1(module1·3 legacy)·v2(module1·3 ko, module3 en) 덤프 5건 기준선과 `cmp` 동일. muse 기여자 모델(사용자 지정, task-15 브랜치, 변경 uncommitted).

## 앱

- [x] 4. 보기 탭 UI
  - 선행: 2
  - 변경: `mobile/screens/ChatScreen.tsx`에 마지막 봇 말풍선 아래 보기 칩, "직접 쓸게요"(입력창 포커스), 탭하면 그 문구가 사용자 말풍선으로 들어가 다음 턴을 요청하는 처리를 더한다. 개발용 스위치로만 flowVersion 3을 보낸다. 칩 등장 모션은 동작 줄이기를 따른다. 문구는 i18n 키로.
  - QA: mobile tsc 통과. `mobile-web` 미리보기(mobile 프리셋)에서 탭 → 말풍선 → 다음 턴 흐름과 "직접 쓸게요"를 확인하고 스크린샷을 남긴다. 네이티브 전용 동작은 못 본다고 적는다.
  - QA: mobile tsc(스택 옵션) → exit 0. mobile-web 미리보기(`?qa=pro&persona=jisoo&lang=ko&chat=3`, 375x812)에서 `/api/chat`을 브라우저 안 가짜 응답으로 바꿔(서버가 아직 프로덕션이라 v3 없음) 확인: 1턴 요청 `flowVersion:3, choicePicks:[]` → 칩 3개+점선 "직접 쓸게요" 표시 → "일하는 중" 탭 → 사용자 말풍선, 2턴 요청 `choicePicks:[1]` → "직접 쓸게요"로 칩 접힘+입력창 포커스 → 직접 타이핑해 전송하면 3턴 요청의 `choicePicks`가 `[1]` 그대로(직접 쓴 답은 기록 안 됨). 스크린샷 확인. 못 본 것: 9턴 체크포인트 버튼, 실제 서버 보기, 네이티브, 동작 줄이기 켠 상태(기존 `Reveal`이 처리). muse 기여자 모델(작업 16), 변경 uncommitted.

## 리포트 연결

- [x] 5. 묶음 → 추출 필드 → 세트 카드
  - 선행: 3
  - 변경: 묶음에서 정해진 값이 추출 결과(`ChatExtract`)와 `set_packets`에 들어가게 한다. 인용(자유 서술)이 없는 세트는 퀴즈 답과 보기 문구로 카드를 만든다. `lib/reportSets.ts`가 빈 인용을 허용하는지 확인하고, 약하면 세트당 선택 입력 한 줄을 추가하는 안을 `발견 사항`에 적는다.
  - QA: 루트 tsc 통과. 시뮬 대화 결과를 `gen-qa-fixtures`(또는 동등 경로)로 리포트까지 돌려 세트 카드 5장이 비지 않는지 확인.
  - QA: `npx tsc --noEmit` → exit 0. 스크래치 `packets-v3-test.mts`(27건)·`extract-v3-test.mts`(7건) → ALL PASS. v1·v2 프롬프트 덤프(module3 ko 10턴·en 3턴)를 변경 전(git stash)과 `cmp` → 동일. 스크래치 `cards-v3-test.mts`: 가짜 22턴 전부 보기 탭 → `resolveReportSets`·`describeCardSlots`·`describeSetPackets`가 세트 5개 모두 `picked_choices` 4개로 카드 슬롯 5개를 만들고 "보기" 근거 줄 20개 생성. **LLM 리포트 생성(`gen-qa-fixtures`)은 돌리지 않음** — v3 시뮬 대화가 TODO 6에서 생기므로 거기서 실제 리포트까지 확인한다. muse 표준 모델(작업 17), 변경 uncommitted.

## 검증과 판정

- [ ] 6. v2 대비 시뮬 비교
  - 선행: 3, 5
  - 변경: `scripts/sim-chat.mts`에 flowVersion 3 옵션과 지표(총 턴, 시뮬 사용자 입력 글자 수, 열린 질문 비율)를 더한다.
  - QA: `npx tsx --env-file=.env.local scripts/sim-chat.mts` v3·모듈 3·페르소나 2명 1회씩, v2도 같은 페르소나로 1회씩 실행해 표로 보고(비용 수 달러 이내). 보기 개수·위기 턴 보기 없음을 출력에서 확인.

- [ ] 7. (user check) 직접 해 보고 판정
  - 선행: 4, 6
  - 단계: ① `mobile-web` 미리보기를 열고 모듈 3을 선택한다. ② 보기 위주로 끝까지 한 번 진행한다(5분 안쪽). ③ "질질 끄는 느낌이 줄었나", "고르게 만든 답이 내 마음과 다르게 느껴졌나", "직접 쓸게요를 눌러야 했던 곳이 몇 군데인가"를 알려 준다.
  - QA: 사용자의 판정이 있어야 닫는다. 대신 확인할 수 없다.

## 발견 사항
(작업 중 발견한 것만 여기에 적고, 해당 항목 diff에는 넣지 않는다.)
- TODO 3에서 할 것: `ChatFlowVersion` 타입에 3 추가, `getChatReply`의 `sanitizeChoices` `suppress`에 9턴 체크포인트 조건 추가(지금은 마지막 턴만 억제), v3 프롬프트가 모델에게 JSON `choices` 키를 쓰게 지시. 보기 위기 억제는 응답에 위기 안내 번호(1393·988 등)가 있는지로 판정한다.
- TODO 3 후속: v3 프롬프트의 예시 대화·절대 규칙·기법 절은 v2 것을 재사용해 v2 턴 번호(25·10·6·16·21)가 남아 있다. sim-chat(TODO 6)에서 모델이 헷갈리면 `TECHNIQUES_BODY_V3` 분리. 모듈 5 등 묶음 없는 모듈은 flowVersion 3을 보내도 v1로 떨어진다.
- TODO 5에서 정한 것: 보기를 탭한 턴 번호를 앱이 요청 body 최상위 `choicePicks`로 보낸다(history에 필드를 더하면 OpenAI로 그대로 가서). 서버는 보기만 쓴 세트를 `has_chat:false` + `picked_choices`로 두고 리포트 카드는 인용 칸을 비운 채 검사 답 + 고른 보기로 해설한다. 묶음 필드는 모델 추출을 우선하고 빈 필드만 `"A1 / A2"`로 채운다(SPEC의 "묶음 값 우선"을 프롬프트 지시 + 빈칸 보충으로 구현). 보기만으로 카드 해설이 얇으면 세트 끝 선택 입력 한 줄을 추가하는 안은 TODO 6 결과를 보고 판단.
- TODO 5 위험: 한 문장 필드(`trigger_point` 등)가 `"퇴근 뒤 / 일의 양"`처럼 짧게 채워질 수 있다. 리포트 프롬프트가 이걸 문장으로 취급하는지는 실제 리포트에서 확인 필요(TODO 6).
- 진행 중 muse 작업 16·17을 병렬로 돌렸더니 같은 파일을 서로 겹쳐 고치는 일이 있었다(최종 상태는 tsc·테스트 통과). 다음부터 같은 지시서를 두 번 실행하지 않는다.
