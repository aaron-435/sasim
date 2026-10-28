# TODO (2026-10-28) — OTA 전 측정 보강

SPEC: `SPEC.md`. 한 세션에 한 항목. 1 → 2 순서(2가 1의 이벤트를 센다). 웹 배포(4)는 OTA(5)보다 먼저.

## 구현

- [x] 1. 검사·넘김 실패 이벤트 (서버 허용 목록 + 앱)
  - 변경: `lib/eventSchema.ts`(`quiz_start`·`quiz_complete`·`handoff_fail`), `mobile/lib/analytics.ts` `EventName`, `mobile/screens/QuizScreen.tsx`(진입 시 한 번 `quiz_start` new/resume — 이어 풀기 판정 뒤에, 끝날 때 `quiz_complete`), `mobile/screens/VerifyCodeScreen.tsx`(실패 시 `handoff_fail` via·kind), `scripts/event-schema.test.mts`.
  - QA: `npx tsx scripts/event-schema.test.mts` 통과(새 이름 허용, 새 prop 키 없음). 루트 `npx tsc --noEmit` → 0. mobile `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 0. mobile-web(앱 API를 로컬 dev 서버로)에서 검사 시작·완료·중간 이탈 후 재진입, 없는 코드 입력 → `read_network_requests`로 요청 본문 확인(이벤트 이름·prop만, 값에 답·코드 없음).
  - 결과(2026-10-28): 허용 목록·앱 `EventName`에 `quiz_start`·`quiz_complete`·`handoff_fail`. `QuizScreen`은 이어 풀기 판정 뒤 `quiz_start`(new/resume) 한 번, "처음부터"도 new, 마지막 문항 뒤 `quiz_complete`. `VerifyCodeScreen`은 실패하면 `handoff_fail`(via, kind=`redeemHandoff`의 오류 코드 그대로: bad_request·not_found·expired·update_app·unavailable·too_many·network).
  - QA: `npx tsx scripts/event-schema.test.mts` → "30 passed". 루트 `npx tsc --noEmit` → 0. mobile tsc(큰 스택) → 0. **mobile-web**(`/api/events`·`/api/handoff` 요청을 페이지 안에서 가로채 운영에 보내지 않음, 본문만 확인): 번아웃 검사 진입 → `quiz_start {module3, new}` 1건, 4문항 답하고 뒤로 → 다시 열면 5/30에서 이어지고 `quiz_start {module3, resume}`, 끝까지 → `quiz_complete {module3}` 1건. 초기화 상태에서 "Started on the website?" → `123456` → 화면 "We couldn't find that code…", 이벤트 `handoff_fail {via: code, kind: not_found}`, 요청 본문에 코드 값 없음. 테스트 뒤 브라우저 저장소 복구.

- [x] 2. 퍼널 리포트: 검사 단계 + 넘김 실패
  - 선행: 1
  - 변경: `scripts/funnel-report.mts`(모듈별 `quiz_start`(new/resume)·`quiz_complete`·`chat_start`·`chat_complete`·`report_generate` 고유 기기 수, 넘김 섹션에 `handoff_fail` via×kind, 모르는 값 가림, 사용자/테스터·dev 분리), `scripts/funnel-report.test.mts`.
  - QA: `npx tsx scripts/funnel-report.test.mts` → 42개 + 새 사례 통과. 루트 tsc 0. `npx tsx --env-file=.env.local scripts/funnel-report.mts` → exit 0, 새 섹션 존재, UUID·날짜 꼴 0건(grep). 출력은 채팅에 붙이지 않음.
  - 결과(2026-10-28): "quiz → chat → report by module" 섹션(사용자·테스터 각각, 모듈 1~12 숫자순, 모르는 모듈은 `other_or_missing_module`, 이벤트가 없으면 한 줄), 넘김 섹션에 `app handoff_fail`과 via·kind 나눔(모르는 오류는 `other_or_missing_error`).
  - QA: `npx tsx scripts/funnel-report.test.mts` → "54 passed"(42 + 12). 루트 tsc 0. `npx tsx --env-file=.env.local scripts/funnel-report.mts` → exit 0, 112줄, 새 섹션 2개·`app handoff_fail` 줄 2개, UUID 꼴 0건·날짜 꼴 0건(grep). 출력은 채팅에 붙이지 않음.

- [x] 3. 배포 전 점검
  - 선행: 1, 2
  - QA: `npm run lint && npm run build` 통과. 커밋 메시지 초안 제안.
  - QA: `npm run lint` → 경고·오류 0, `npm run build` → 성공, `npx tsx scripts/handoff.test.mts` → "110 passed".

## 사용자 확인·실행

- [ ] 4. (사용자 실행) 커밋·푸시 → Vercel 배포 확인 — **OTA보다 먼저**. 배포 뒤 `curl`로 `/api/events`가 `quiz_start` 배치를 받는지(테스트 배치는 `dev: true`).
- [ ] 5. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update` 한 번(iOS·Android 함께) — 이전 TODO 20. 순서·명령은 `HANDOFF_2026-10-25_ota_pending.md`.
- [ ] 6. (사용자 확인, 5 뒤) 앱 이어받기 실기 확인 — 이전 TODO 11의 절차 그대로(`TODO_2026-10-27_web2app.md` 11번). 같은 김에 설정 © 7번 탭으로 본인 기기 테스터 표시.
- [ ] 7. (사용자 실행, 5 뒤) 영어 사용자 5명 관찰 — 이전 TODO 21. 기록표를 공유하면 웹 검사 맛보기와 주력 상품 판단에 쓴다.

## 발견 사항
- (1번 중) mobile-web에서 검사 슬라이더는 브라우저 도구의 클릭·드래그로 움직이지 않는다(포인터 이벤트를 직접 보내야 함). 앞으로 웹 검증 스크립트를 쓸 때 참고.
