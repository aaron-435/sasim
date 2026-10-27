# TODO (2026-10-27) — 측정 신뢰도 → 웹→앱 이동 → 공개 전 정비

SPEC: `SPEC.md`. 한 세션에 한 항목. 순서: 1·2(측정)가 웹→앱(9~13)보다 먼저다. 3~8, 14~16은 서로 독립이라 나란히 해도 된다. 마케팅 예산은 월 약 $300(2026-10-27 결정), 이 TODO에서는 집행하지 않는다.

## A. 측정 신뢰도와 정합성

- [x] 1. Codex 퍼널 리포트 변경 검토·반영
  - 변경: `scripts/funnel-report.mts`(작업 트리에 이미 고쳐져 있음), `scripts/funnel-report.test.mts`(미추적). 다시 만들지 않고 읽고 검토한 뒤, 고칠 곳만 고친다.
  - QA: `npx tsx scripts/funnel-report.test.mts` → 22개 이상 통과. 루트 `npx tsc --noEmit` → 0. `npx tsx --env-file=.env.local scripts/funnel-report.mts` → 실행 성공(출력에 ID·생일·자유 문구 없음을 눈으로 확인, 출력은 채팅이나 외부 도구에 붙이지 않음).
  - 결과(2026-10-27): 코드 수정 없이 받아들임. 검토한 점 — `.order("id")`는 세 테이블 모두 `id` 기본키가 있어 안전, 이벤트 이름(`onboarding_complete`·`type_reveal_view` 등)은 `lib/eventSchema.ts` 허용 목록에 있음, D1/D7 분모는 끝난 KST 날만, 모르는 product·surface는 가림.
  - QA: `npx tsx scripts/funnel-report.test.mts` → "22 passed". 루트 `npx tsc --noEmit` → exit 0. `npx tsx --env-file=.env.local scripts/funnel-report.mts` → exit 0, 67줄, UUID 꼴 0건·날짜 꼴 0건(grep), product·surface 이름은 알려진 값과 `other_or_missing_*`만.

- [x] 2. 테스터 기기 표시
  - 선행: 1
  - 변경: 앱 `mobile/lib/analytics.ts` + 숨은 스위치(설정 화면), 웹 `lib/analytics.ts`, 서버 `lib/eventSchema.ts`, `funnel-report.mts`(테스터 포함/제외 나눠 출력), 테스트.
  - QA: funnel 테스트에 테스터 사례 추가 → 통과. `lib/eventSchema` 허용 목록 테스트(있으면). 루트·mobile tsc 0. mobile-web에서 스위치를 켜고 이벤트 요청 본문에 테스터 표시가 붙는지 `read_network_requests`로 확인.
  - 결과(2026-10-27): 배치 필드 `tester: true` → 서버가 각 행 `props.tester`로 저장(DB 열 추가 없음, SQL 불필요, 클라이언트의 이벤트별 `tester` 속성은 400). 앱은 설정 © 줄 7번 탭으로 켜고 끔(켜지면 "· T", 초기화에도 유지, 알림 문구 ko/en/es). 웹은 `?tester=1`/`?tester=0`. 리포트는 테스터 기기를 그 이전 행까지 사용자 섹션에서 빼고 맨 끝 "tester-marked native devices" 섹션에만 센다. 구버전 서버·앱과 호환(모르는 배치 필드는 무시, 필드가 없으면 false).
  - QA: `npx tsx scripts/funnel-report.test.mts` → "31 passed"(기존 22 + 테스터 9). 새 `npx tsx scripts/event-schema.test.mts` → "9 passed". 루트 `npx tsc --noEmit` → exit 0. mobile tsc(큰 스택) → exit 0. mobile-web(`?qa=free&persona=sam&lang=en`, 375x812): 설정 © 7번 탭 → "© 2026 Studio Aaron · T", localStorage `fatesaid_tester`="1" → 운세 "Helpful" 탭 → `/api/events` 본문 `{platform:"app-web", dev:true, tester:true, events:[feedback]}`. 증거 출처: 브라우저 패널은 교차 출처 fetch를 `read_network_requests`에 잡지 못해(API 요청 0건으로 보임), 페이지 안 fetch 래퍼로 본문을 읽음.
  - (사용자 확인, 미확인 2 해소용) 웹 배포(19번)와 OTA(20번) 뒤: 휴대폰 앱 설정 맨 아래 © 줄 7번 탭 → "테스터 모드를 켰어요" → 온보딩·검사·대화·리포트 한 바퀴 → `npx tsx --env-file=.env.local scripts/funnel-report.mts`의 "tester-marked native devices" 섹션에서 `onboarding_complete`·`chat_start`·`chat_complete`·`report_generate`가 1/1인지 확인. 지금 깔린 1.2.0 빌드에는 스위치가 없다.

- [ ] 3. 랜딩 약속 일치 (ko/en/es)
  - 변경: `lib/i18n/{en,ko,es}.ts` 랜딩 CTA·보조 문구, 필요하면 `components/AppFlow.jsx`·`Landing.jsx`·`LandingTypeCard.jsx`의 CTA 뒤 첫 화면. (가) 문구를 실제 입력에 맞추기 vs (나) 짧은 첫 화면, 근거를 적고 하나를 고른다. 새 결과 화면은 만들지 않는다.
  - QA: `npm run lint && npm run build` → 통과. 웹 preview(데스크톱 + mobile 뷰포트)에서 en/ko/es 랜딩 → CTA → 첫 화면 캡처, 문구와 실제 입력이 맞는지 확인.

- [ ] 4. 결과 이름 버그 수정 (전 모듈, 직접 처리·muse 위임 금지)
  - 변경: `mobile/lib/quiz/quizProfile.ts`(`classifyProfile` 조회), 필요하면 `QuizScreen.tsx` 대체 제목 경로. 먼저 저장된 결과·리포트 프롬프트·이벤트가 `typeKey` 순서에 기대는지 grep으로 확인. 분류 기준은 그대로.
  - QA: 모든 모듈의 2·3개 조합 키 순열을 도는 검사 스크립트(새로, `scripts/`) → 대체 제목 0건. mobile tsc 0. mobile-web(`?qa=free&persona=sam&lang=en`) 가면 30문항 최고값 → 정의된 제목 캡처. 옛 순서로 저장된 결과를 다시 열어도 맞는 이름(스크립트 사례로).

- [ ] 5. 개인정보 설명 정합성 (ko/en/es)
  - 변경: `lib/legalContent.ts`(KASI 호출 사실: 양력 날짜만 한국천문연구원 공공 API로), 보관 1년 → 실제 삭제 작업 SQL(`supabase/` 새 파일, 사용자 실행) 또는 문구를 실제에 맞추기. 앱 안 처리방침 사본이 있으면 함께.
  - QA: `grep -n "외부 계산\|outside calculation\|cálculo externo" lib/legalContent.ts` → 사실과 다른 문장 0. `npm run lint && npm run build` 통과. `/privacy?lang=en|ko|es` 웹 preview 확인. SQL을 만들었다면 파일 경로와 실행 절차를 18번에 적는다.

- [ ] 6. 결과 문구 단정·진단 표현 정리 (모듈 2·4~10, ko/en/es)
  - 변경: `mobile/lib/quiz/module{2,4,5,6,7,8,9,10}*.ts` 결과 `title`·`hook`, 웹 `lib/module*.ts`의 같은 문구. 수면 "Deep-Sleep Deprived", module7 "전형적인 고감각민감자(HSP)" 포함.
  - QA: `grep -rnE "패턴입니다|You tend to|Tiendes a|증후군|syndrome|síndrome|Deprived|전형적인" mobile/lib/quiz lib/module*.ts` → 결과 문구 0건(주석 제외). 루트·mobile tsc 0. `npx tsx scripts/check-es-text.mts`로 es 결과 문구 확인(필요하면 임시 추출 파일). mobile-web에서 수면 최고점 결과 캡처.

- [ ] 7. "AI Counseling" 용어 정리 (ko/en/es)
  - 변경: 결과 화면 버튼·안내 문구(`mobile/lib/i18n/*`, 해당 화면). 챗 프롬프트는 건드리지 않는다.
  - QA: `grep -rniE "counsel|asesor" mobile/lib/i18n` → 결과 화면 문구 0건(남는 것은 이유를 적음). mobile tsc 0. mobile-web 결과 화면 캡처.

- [ ] 8. 문서 사실 고치기
  - 변경: `PRODUCT.md`(모듈 11 → 12 등), 코드와 어긋난 수치(대화 턴 수 등)를 대조해 고침.
  - QA: `grep -n "11 psych\|11 개\|11개" PRODUCT.md WIKI.md` → 0. 고친 수치마다 근거 파일을 커밋 메시지 초안에 적음.

## B. 웹→앱 이동 (결제 없음)

- [ ] 9. 넘김 저장·코드 서버
  - 선행: 1
  - 변경: `app/api/verification-code/route.ts`(또는 새 `app/api/handoff`), 저장 위치(`sessions` 확장 or 새 테이블 SQL), 6자리 코드 + 긴 토큰, 7일 만료, 꺼내면 삭제, 속도 제한. 기존 GET 응답 모양 유지.
  - QA: 라우트 테스트(새 `.test.mts`: 만료·1회용·토큰/코드 두 경로·옛 응답 모양) 통과. `npm run lint && npm run build` 통과. 새 테이블이면 SQL 파일 + 18번에 실행 절차.

- [ ] 10. 웹 진입점 버튼 + 기기별 설치 안내
  - 선행: 9
  - 변경: `LandingTypeCard`·`SajuCalculator`·일간 글·`InviteAccept`·`QAChat` 끝의 "앱에서 이어 보기", `components/AppInstall.tsx`(iOS/Android/데스크톱 구분, 데스크톱 QR, App Store 링크는 설정 하나로 켜기 — 지금은 "iOS는 곧"). ko/en/es.
  - QA: `npm run lint && npm run build` 통과. 웹 preview 데스크톱(QR 보임)·mobile 뷰포트(스토어 버튼 하나) 캡처. 버튼을 누르기 전에는 넘김 저장 요청이 없는지 network로 확인.

- [ ] 11. 앱 이어받기: 딥링크 + 코드 버튼 + 빠진 단계만
  - 선행: 9
  - 변경: `mobile/App.tsx`(`fatesaid://handoff?t=` 처리), 인트로의 코드 입력을 보조 버튼으로, `VerifyCodeScreen`, 일부만 넘어온 경우 빠진 온보딩 단계만 묻고 유형 공개로. ko/en/es. OTA 가능(네이티브 변경 없음).
  - QA: mobile tsc 0. iOS 시뮬레이터 dev-client에서 `xcrun simctl openurl booted "fatesaid://handoff?t=<테스트 토큰>"` → 자동 이어받기 캡처. 코드 경로: 생년월일만 넘어온 코드 → 시각·도시 등만 묻는지 캡처. 증거 출처(시뮬레이터) 명시.

- [ ] 12. 넘김 측정
  - 선행: 2, 10, 11
  - 변경: `handoff_create`(진입점)·`handoff_redeem`(딥링크/코드, 항목 수)·`store_click` 이벤트를 앱·웹·`lib/eventSchema.ts`에, `funnel-report.mts`에 "웹 넘김 → 앱 이어받기" 줄.
  - QA: funnel 테스트에 넘김 사례 추가 → 통과. 허용 목록 밖 값은 400인지 라우트 테스트. 루트·mobile tsc 0.

- [ ] 13. (조건부) 웹 애착 검사 맛보기 → 앱에서 이어서
  - 선행: 9, 11, 그리고 21번 관찰 또는 퍼널에서 "검사 시작 전 이탈"이 병목으로 보일 것. 아니면 이 항목은 다음 SPEC으로 넘긴다고 적고 닫는다.
  - 변경: 웹 module1 앞 몇 문항 화면, 넘김에 답 싣기, 앱 검사 이어하기 저장소에 넣기.
  - QA: `npm run lint && npm run build`, mobile tsc 0. 웹에서 몇 문항 → 코드 → 앱(mobile-web 또는 시뮬레이터)에서 다음 문항부터 시작하는 캡처.

## C. 소재와 관찰 (돈 쓰지 않음)

- [ ] 14. Year Wrapped 영상 5개 (12/1 마감)
  - 변경: `video-kit.md` 8장 훅 16~20 → 대본·TTS(`marketing/tts-samples/`), 녹화 설정(`scripts/record-app*.mts`). 노출 기간 밖에서 Wrapped를 여는 방법이 필요하면 dev 전용.
  - QA: 녹화 명령 키마다 exit 0, `ffprobe` → 1080x1920 + 오디오, 프레임 몇 장으로 자막·화면 확인. 루트 tsc 0.

- [ ] 15. A4x·A6x 재렌더
  - 선행: 4, 6
  - 변경: `marketing/tts-samples/scripts.json` A4x·A6x 대본을 새 제목에 맞춤, TTS 재생성, `record-app-ab.mts` `highlight`. A3x의 옛 "Full Burnout"도 함께(이전 TODO 발견 사항).
  - QA: `node --import tsx scripts/record-app-ab.mts A4x|A6x|A3x` → exit 0, `ffprobe` 확인, 결과 화면 프레임이 대본과 같은 제목.

- [ ] 16. 영어 사용자 5명 관찰 키트 (문서만)
  - 변경: 새 `marketing/user-observation-kit.md` — 모집 문구(규칙이 허용하는 커뮤니티 1~2곳, 무단 DM·자동 댓글 금지), 관찰 과제(유형 카드 → 앱 이동 → 애착 검사·대화 → 리포트 미리보기 → 페이월), 기록표(멈춘 곳, 낼 것/안 낼 것과 이유), 사례비와 구매비 보상 분리, 주력 상품을 바꿀 조건(SPEC 사업 가설).
  - QA: 키트 금지어 점검(압박·정확도 표현) 0. 사례비가 월 $300 예산 안의 항목으로 적혀 있는지 확인.

## 사용자 확인·실행

- [ ] 17. (사용자 확인) 구매 성공 5건 대조
  - RevenueCat 대시보드 → Customers/Transactions에서 구매 날짜·상품·샌드박스 여부·무료 체험·환불을 확인하고, 본인·테스터 구매인지 알려 주기. 키·원시 기록은 채팅이나 외부 도구에 붙이지 않는다.

- [ ] 18. (사용자 확인·실행) Supabase 삭제 작업 확인 / SQL 실행
  - 대시보드 Database → Cron(또는 Functions)에 보관 기간 삭제 작업이 있는지 확인. 5·9번에서 SQL 파일이 생기면 SQL Editor에서 실행.

- [ ] 19. (사용자 실행) 커밋·푸시 → Vercel 웹 배포 확인
  - 웹 변경(2·3·5·9·10·12)이 실린다. 앱 OTA보다 먼저.

- [ ] 20. (사용자 실행) iOS 1.2.0 승인 뒤 `eas update`
  - 이전 TODO 11번(결과 문구 1·2)에 이번 앱 변경(2·4·6·7·11)까지 함께 실린다. 순서는 `HANDOFF_2026-10-25_ota_pending.md`(웹 먼저).

- [ ] 21. (사용자 실행) 영어 사용자 5명 관찰
  - 선행: 16, 그리고 19·20으로 넘김이 배포된 뒤가 좋다. 결과 기록표를 공유하면 13번 진행 여부와 주력 상품 판단에 쓴다.

## 발견 사항
- (1번 중) 운영 이벤트의 `purchase_success`가 모두 `kind` 없음(unknown) — `kind`는 커밋 3046e93부터라 구버전 빌드 신호로 보임. 미확인 1·2와 같이 확인.
- (1번 중) 구독 SKU는 코드에 이름이 없고(RevenueCat 오퍼링에서 옴) 리포트에서 `other_or_missing_product`로 묶인다. 구독을 따로 세려면 ASC/Play의 실제 구독 상품 ID를 받아 `productFamily`에 넣는다(2번이나 12번에서).
