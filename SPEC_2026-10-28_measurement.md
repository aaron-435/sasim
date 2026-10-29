# SPEC (2026-10-28) — OTA 전 측정 보강: 검사 단계 + 넘김 실패

이전 SPEC(측정 신뢰도 → 웹→앱 이동)은 `SPEC_2026-10-27_web2app.md`, TODO는 `TODO_2026-10-27_web2app.md`로 보관했다. 남은 사용자 항목(11 실기 확인, 20 OTA, 21 관찰)은 이 TODO 끝으로 옮겼다.

## 목표
iOS 1.2.0 승인 뒤 iOS·Android에 한 번에 보낼 OTA(사용자 결정 2026-10-28)에 측정 두 가지를 같이 싣는다. (1) 퍼널이 검사(퀴즈) 단계를 보게 한다. (2) 웹→앱 넘김이 **실패한** 경우도 남긴다. 이 OTA를 놓치면 5명 관찰과 공개 첫 주 기준선에서 "유형 공개 → 검사 → 대화" 중 어디서 멈추는지 숫자로 볼 수 없다.

## 확인 사실 (코드, 2026-10-28)
- 서버 허용 목록 `lib/eventSchema.ts` `EVENT_NAMES`에 검사 이벤트가 없다. 앱 사본은 `mobile/lib/analytics.ts` `EventName`(둘을 같이 고쳐야 함).
- `parseEventBatch`는 모르는 이름이 하나라도 있으면 **배치 전체를 거절**한다(400). 새 이벤트를 앱이 먼저 보내면 같은 배치의 다른 이벤트까지 잃는다. → 웹 배포가 OTA보다 반드시 먼저다.
- 검사 화면은 `mobile/screens/QuizScreen.tsx` 하나(12모듈 공통). 이어 풀기(`loadQuizProgress`)가 있고, 끝나면 `onComplete(diagnosis)`.
- 대화·리포트는 이미 `chat_start`·`chat_complete`·`report_generate`에 `module`이 붙는다.
- 넘김: `VerifyCodeScreen`이 성공일 때만 `handoff_redeem`을 보낸다. 실패는 `redeemHandoff` 결과의 오류 코드(`bad_request`·`not_found`·`expired`·`update_app`·`unavailable`, 429, 네트워크)로 이미 분류되어 있지만 기록되지 않는다.
- `scripts/funnel-report.mts`에 검사 줄이 없고 넘김 섹션은 성공만 센다. 테스트는 `scripts/funnel-report.test.mts`(42개), 허용 목록 테스트는 `scripts/event-schema.test.mts`.

## 포함 범위
1. **검사 이벤트**: `quiz_start`(`module`, `kind`: `new`/`resume`)와 `quiz_complete`(`module`). 한 번 화면 진입에 `quiz_start`는 한 번만. 답·점수·유형·문항 번호는 보내지 않는다(이탈 문항 위치가 필요한지는 관찰 뒤에 정함).
2. **넘김 실패 이벤트**: `handoff_fail`(`via`: link/code, `kind`: 위 오류 코드 또는 `rate_limited`·`network`). 코드·토큰 값은 보내지 않는다. `handoff_redeem`의 뜻(성공)은 바꾸지 않는다.
3. **허용 목록**: 웹 `lib/eventSchema.ts`와 앱 `EventName`에 세 이름 추가. 새 prop 키는 만들지 않는다(기존 `module`·`kind`·`via`로 충분).
4. **퍼널 리포트**: "검사 단계" 섹션 — 모듈별 고유 기기 수 `quiz_start → quiz_complete → chat_start → chat_complete → report_generate`, `kind` new/resume 나눔, 사용자/테스터·dev 분리는 기존 규칙. 순서가 확인된 퍼널이라고 부르지 않는다(단계별 고유 기기 수). 넘김 섹션에 실패를 `via`×`kind`로 더하고, 모르는 값은 가린다.

## 제외 범위
- 문항별 이탈 위치, 검사 소요 시간, iPhone "앱에서 열기" 링크 탭 기록(발견 사항으로 남김).
- 검사·채점·문구·화면 변경. 새 분석 SDK. 웹 검사 맛보기(이전 TODO 13).
- 커밋·푸시·웹 배포·`eas update`(사용자 실행).

## 제약
- 순서: 웹(허용 목록) 배포 → iOS 승인 → OTA. 앱 쪽 이벤트는 구버전 서버에서 배치가 버려지므로 웹 배포 전에 OTA를 내지 않는다.
- 개인정보: 이벤트에 생년월일·답·코드·토큰·자유 문구 없음. 기존 `VALUE_PATTERN`·`DATE_LIKE` 검사를 그대로 통과해야 한다.
- 앱 변경은 OTA 가능(네이티브 의존성·설정 변경 없음). 화면 문구 변화 없음 → ko/en/es 문구 작업 없음.
- 숫자 해석 원칙은 이전 SPEC과 같다(익명 ID ≠ 사람, 고유 기기 수 ≠ 순서 퍼널).

## 완료 기준
- `npx tsx scripts/event-schema.test.mts`·`scripts/funnel-report.test.mts` 통과(새 이벤트 허용, 모르는 prop 거절, 검사 섹션·넘김 실패 사례 추가).
- 루트 `npx tsc --noEmit` 0, `npm run lint && npm run build` 통과. mobile tsc 0.
- mobile-web(로컬 dev 서버로 이벤트를 받음)에서 검사 시작 → 끝까지 → 이벤트 요청 본문에 `quiz_start`(new)·`quiz_complete`가 각각 한 번, 중간에 나갔다 다시 열면 `quiz_start`(resume). 없는 코드 입력 → `handoff_fail`(code, not_found). `read_network_requests`로 확인, 증거 출처 명시.
- `npx tsx --env-file=.env.local scripts/funnel-report.mts`가 운영 데이터로 실행되고 새 섹션이 나온다(지금은 0이어도 됨). 출력은 채팅·외부 도구에 붙이지 않는다.
