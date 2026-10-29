# TODO (2026-10-29): iOS 4.3(b) 대응 — 홈 개편 + 재제출

SPEC: `SPEC.md`. 숏폼 TODO는 `TODO_2026-10-29_shortform.md`로 보관했다.
순서: 1번(사용자 확인)과 2번은 바로 시작할 수 있고, 3→4→5는 이어서, 6·7은 5번 뒤, 8~10은 사용자 실행.
항목마다 세션 하나로 끝낼 크기다. 3·4번은 파일이 3개 이상이라 muse 위임 가능(문구는 이 세션이 쓰고 muse는 적용만). 5번에서 diff와 출력으로 확인한다.
결제·유료 프롬프트·엔진 코드는 건드리지 않는다.

- [x] 1. (user check) 거절된 1.2.0에 새 빌드(9)를 붙일 수 있는지 확인
  - 단계: App Store Connect → fate said → iOS 앱 1.2.0 → 빌드 섹션에서 빌드 교체(`편집`) 가능한지 본다. 불가하면 새 버전 1.2.1을 만들어야 한다.
  - 결과 기록: 이 항목 아래에 "1.2.0(9) 가능" 또는 "1.2.1로 간다(iOS+Android)"를 적는다.
  - **결과(2026-10-29): 1.2.0(9) 가능.** 근거: 사용자 스크린샷(ASC 1.2.0 빌드 섹션, 빌드 8 줄의 − 버튼 활성). 1.2.1·Android 버전 변경 없음, `mobile/app.json` 버전 1.2.0 유지.
  - 1.2.1이면 `mobile/app.json` 버전과 Android 쪽 제출 계획(Play 관리형 게시)도 같이 정리한다. 1.2.0 OTA는 계속 보류한다.
  - QA: 사용자 확인(스크린샷 또는 한 줄 답).

- [x] 2. 문구 인벤토리와 새 문구표 (코드 변경 없음) — `COPY_2026-10-29_4.3b.md` 작성. QA: grep 출력 en 14줄·es 3줄이 모두 표에 있음(줄 번호 대조 스크립트로 확인). 사용자 결정 대기: 문서 §4 A(DOB 서양 별자리 카드 제거)·B(intro "Your fate has already spoken" 교체)·C(lucky points 위치)
  - 변경: 새 파일 `COPY_2026-10-29_4.3b.md`(코드 없음). en·es에서 사용자에게 보이는 `fortune`/`horoscope`/`astrology`/`zodiac` 위치 전부와 바꿀 문구를 `파일:줄 | 현재 | 새 문구` 표로 쓴다. 대상: `home.*`(today*), `fortune.*`, 알림 `daily*`/`weekly*`/`notification*`, 봉인 카드. 홈의 "My saju chart" 새 이름과 경로 카드 문구(제목·본문·CTA)도 같은 표에 쓴다. "압박 규칙"과 "계산된 것만" 원칙을 지킨다.
  - 새 이름 방향: "Today's fortune" → "Today's rhythm", "My saju chart" → "Your pattern". 문구는 이 세션이 쓰고 사용자가 훑어 본다.
  - QA: `grep -rniE "fortune|horoscope|astrology|zodiac" mobile/lib/i18n/en.ts mobile/lib/i18n/es.ts` 출력의 모든 줄이 표에 들어 있거나 "사용자에게 안 보임"으로 분류됐다. 철학 문장(`philosophyLine`의 "isn't fortune-telling")은 유지 여부를 표에 표시한다.

- [x] 3. 홈 위계 개편 (`mobile/screens/HomeScreen.tsx`) — 경로 카드를 채움(gradient) 카드로 인사 바로 아래로 올리고 오늘 카드는 raised 표면·작은 제목으로 내림, 사주 차트는 경로 카드 아래 유지. QA: mobile tsc(큰 스택) exit 0(오류 없음)
  - 변경: 경로 카드(검사 → 대화 → 리포트)를 인사·유형 배지 바로 아래의 채움 중심 표면으로 올린다. 오늘 카드는 보조 위계(채움 아님, 크기 축소)로 내리되 상태(봉인/열림/티저/연속일수)는 유지한다. 사주 차트 섹션은 경로 카드 아래. 파일 상단 주석의 "daily fortune ritual" 설명도 새 위계에 맞게 고친다. 새 모션 없음, reduced motion 유지, 팔레트·`FONTS`만 사용.
  - iPad: 넓은 화면(`readableColumn`)에서도 경로 카드가 스크롤 전에 보이게 한다.
  - QA: mobile tsc(큰 스택) → 오류 없음. 5번에서 화면 확인.

- [x] 4. 앱 안 문구 교체 (en·es) — COPY 문서 §2·§3 적용(en·es 각 18줄 대칭 diff, `git diff --stat` 36줄씩). QA: grep 재실행 → 남은 줄은 `zodiacLabels`·`promptFortune` 키 이름·`philosophyLine`(유지)·`fortune: {` 키뿐, 화면에 보이는 문구 0(`philosophyLine` 제외). mobile tsc exit 0. §4 A·B·C(DOB 별자리 카드, intro 'fate' 문구, lucky points)는 사용자 결정 전이라 **적용 안 함**
  - 변경: 2번 표를 `mobile/lib/i18n/en.ts`, `es.ts`에 적용(en·es 키 동기). 알림 문구·위젯(`widgets/`, `TodayWidget`)에 같은 단어가 있으면 함께 본다. ko는 이번에 건드리지 않는다(후속).
  - QA: 2번의 grep 재실행 → 사용자에게 보이는 줄 0개(예외는 표의 "유지"뿐). mobile tsc(큰 스택) → 오류 없음. 키가 en에만 있고 es에 없는 경우가 없는지 diff로 확인.

- [x] 4-추가. COPY §4 A·B·C 적용(사용자 승인 2026-10-29) — A: `DobScreen.tsx`의 서양 별자리 카드·`getZodiac` 호출 제거, `lib/zodiac.ts`의 `ZODIAC`·`getZodiac` 삭제(쓰는 곳이 DobScreen뿐이었음, `toISODateString`·`to24HourString`은 유지), `common.zodiacLabels`를 ko·en·es에서 삭제(`en: typeof ko` 타입 동기 때문에 ko 키 삭제 포함, 문구 변경 아님). B: `intro.headlineLine1/2` en·es 교체(ko 그대로, subheadline 그대로). C: `FortuneScreen.tsx`에서 lucky points 카드를 상세(DetailList) 뒤 맨 아래로 이동(문구·`lockedBenefits` 그대로, 섹션 애니메이션 인덱스 2·3으로 정리: `DAILY_SECTION_COUNT`가 4라 인덱스 4를 쓰면 깨짐). QA: mobile tsc(큰 스택) exit 0; grep(fortune|horoscope|astrology|zodiac) en·es → `promptFortune` 키, `philosophyLine`(유지), `fortune: {` 키뿐; `mobile-web`(8082, mobile 프리셋, 저장소 비우고 처음부터): 인트로 `get_page_text`에 새 헤드라인, DOB 화면에 유효한 날짜(05/14/1990)를 넣어도 별자리 카드 없이 레이아웃 정상·다음 버튼 활성, 콘솔 오류 0. **못 본 것**: 구독자 전용 오늘 화면(lucky points 새 위치)은 미리보기로 못 봄 → TestFlight에서 확인(9번 단계 2)
- [x] 5. 홈 검증 (증거) — `mobile-web` 미리보기(8082, `?qa=free`): mobile 375x812·tablet 768x1024 스크린샷으로 경로 카드(채움)가 인사 바로 아래 첫 화면, 오늘 카드는 그 아래 보조, `get_page_text`에 'fortune/horoscope/astrology' 없음(철학 한 줄의 'fortune-telling' 제외), `read_console_messages` 오류 0. 구독자 전용 화면·iOS 시뮬레이터 iPad는 이번에 못 봄(미리보기 한계, dev-client 없음) → 9번 TestFlight 확인
  - 단계: `mobile-web` 미리보기(8082)에서 `mobile` 프리셋과 `tablet` 프리셋(768x1024)으로 새 홈 스크린샷. iOS 시뮬레이터 dev-client가 있으면 iPad에서도 한 번. 어느 쪽에서 나온 증거인지 기록. 구독자 전용 화면은 미리보기로 못 본다고 명시.
  - 확인: 스크롤 전에 경로 카드가 중심 표면인지, "fortune/horoscope/astrology"가 없는지, 오늘 카드가 보조로 보이는지, 콘솔 오류가 없는지(`read_console_messages`).
  - QA: 스크린샷 + `grep` 출력 + tsc 출력. 문제 시 3·4번으로 돌아가 한 번에 고치고 한 번만 다시 본다.

- [x] 6. 스토어 등록정보 새 초안 (`marketing/aso-en.md`) — iOS 키워드·프로모션·설명·캡션 순서 갱신. QA: 글자 수 스크립트 FAIL count 0(키워드 97/100, 프로모션 154/170, 설명 2336/4000, 캡션 29~36) + 금지어 grep은 규칙·메모 줄만 남음. Play 영어 문구는 건드리지 않음("A daily reading" 등 남아 있음, 원하면 후속)
  - 변경: iOS 키워드에서 `horoscope,astrology,zodiac` 제거 후 자리에 `self-insight,reflection,personality test` 같은 실제 기능어로 교체(글자 수 100 이내, 남의 상표 없음). 설명은 맨 앞을 "30문항 검사 → 선택형 대화 → 개인 리포트"로 다시 배열하고 사주 유형·차트·궁합은 그 뒤로, "A daily reading"은 "Today's rhythm"으로 이름을 맞춘다. 프로모션 텍스트와 스크린샷 캡션 순서(검사 목록 → 대화 → 리포트 → 유형 → 오늘)를 새로 쓴다. 기존 규칙(금융어·예언어 금지, 면책, 구독 문구)은 그대로. Google Play 영어 문구는 이번에 건드리지 않는다(사용자가 원하면 후속).
  - QA: `marketing/aso-en.md` 맨 아래 "글자 수 점검" 스크립트 실행 출력(모든 필드 제한 이내) + 금지어 grep.

- [x] 7. 회신 [A]·심사자 메모 최종본 — `APPEAL_2026-10-29_ios_4.3b.md` 재작성([A]·[N]·[B]·16행 체크리스트). QA: 영어 본문 grep 4줄 모두 허용 용도, 체크리스트 미확인 3건(4·15·16번)은 사용자 확인 후 문장 유지/삭제로 표시 → 미확인 0개 조건은 **사용자 확인 대기**. 이전 초안의 'KASI 검증' 문장은 근거 부족으로 삭제, 심사받은 빌드 8은 v2 챗이었다는 정정 포함
  - 변경: `APPEAL_2026-10-29_ios_4.3b.md`를 재작성한다. ① 맨 앞에 핵심 개념 한 줄("검사 결과 위에서 진행되는 구조화된 대화와 리포트로 자기 패턴을 이해하게 하는 도구"), ② 챗 설명 문장은 심사 빌드 기준으로 사실만(새 빌드에서 고정 스크립트가 기본인지 `mobile/lib/chatFlow.ts`로 확인 후 그 범위에서만 주장), ③ **이번 빌드에서 실제로 바꾼 것**(홈 위계, 문구, 스토어 등록정보)을 구체적으로, ④ 정당성 증거 문단은 사실만(개인 계정, 사업자 등록 완료, 처리방침·KASI 데이터 사용 — 등록번호·개인정보는 메시지에 넣지 않는다), ⑤ 통화 제안은 유지. 별도로 App Review Information Notes용 단계별 경로(Choose a test → 30문항 → 대화 → 리포트)와 "구독 화면까지 보려면" 안내를 영어 10줄 이내로 쓴다. 데모 계정이 필요하면 사용자가 만든 테스트 값을 쓰고 이 문서에는 적지 않는다.
  - QA: 문서 속 모든 사실 주장 옆에 근거(코드 위치 또는 사용자 확인) 체크리스트를 달고 미확인 항목 0개. 영어 문장에 `fortune-telling` 부정 표현 외의 운세 단어가 없는지 grep.

- [ ] 8. (user check) 새 스크린샷 캡처
  - 단계(최신): 6번 캡션 순서는 검사 목록 → 대화 → 리포트 → 유형 → 새 홈(`marketing/aso-en.md` 표). 5번 화면 기준으로 iPhone 6.9"와 iPad 13"를 시뮬레이터 또는 실기기에서 캡처: 새 홈, 검사 목록, 대화 화면, 유형 화면, 리포트(구매 전 가능한 화면). 6번 캡션 순서대로 `mobile/store-assets/ios-screenshots/`에 저장. 구독·구매 화면과 "money"가 보이는 화면은 뺀다(기존 규칙).
  - QA: 파일이 해당 폴더에 있고 해상도가 App Store Connect 요구와 맞는다(업로드 시 확인).

- [ ] 9. (user check) 새 빌드 → 업로드 → 재제출
  - 순서(회신과 재제출은 한 번에):
    1. 버전은 1.2.0 유지(1번 결과). iOS buildNumber는 `eas.json`이 `appVersionSource: remote` + `autoIncrement: true`라서 `app.json`에 없고 EAS가 관리한다. 빌드 전 `cd mobile && eas build:version:get -p ios`로 현재 값을 보고, 빌드 뒤 결과가 9이고 ASC에 이미 있는 번호와 겹치지 않는지 확인한다(중복 금지, 8이 나오면 제출하지 않는다).
    2. `eas build`(iOS) 후 TestFlight에서 홈(경로 카드 첫 화면, iPad 포함)·검사·대화·리포트·구독 화면을 확인하고, 7번 체크리스트 4·15·16번(Notes의 구독 경로·소요 시간·구매 필요 여부)을 이때 확정한다.
    3. 새 빌드 9의 처리(Processing)가 끝난 뒤 ASC 1.2.0 빌드 섹션에서 빌드 8을 − 로 제거하고 9를 추가한다. 그다음 새 빌드 선택, 6번 키워드·설명·프로모션 텍스트·캡션 입력, 8번 스크린샷 교체, 7번 [N] Notes 입력(미확인 줄 삭제 후). 문서 §4 A·B·C를 승인했다면 그 변경도 새 빌드에 들어갔는지 확인.
    4. Resolution Center에 7번 회신 보내고, 같은 화면에서 재제출.
    5. 긴급 심사 요청은 하지 않는다(필요하면 며칠 뒤 한 번만).
  - QA: 사용자 확인(상태가 "심사 대기 중"이 되었는지 스크린샷).

- [ ] 10. (user check) 거절이 유지되면
  - 4.3(b)가 다시 오면 같은 빌드를 반복 제출하지 않는다. 선택지: App Review Board 이의제기(`7번 문서`를 줄여 사용), 심사 면담 요청, 조직 계정 전환(D-U-N-S 필요, 별도 SPEC), PWA·웹 중심 전환(별도 SPEC). 결과를 `HANDOFF_2026-10-29.md`에 한 줄 기록한다.
  - QA: 사용자 판단.

## 발견 사항 (작업 중 추가)
- iOS 키워드(`marketing/aso-en.md`)에 `horoscope, astrology, zodiac`가 있다 → 6번에서 해결.
- `mobile/store-assets/subscription/paywall-fortune.png`: 파일명에 fortune. 구독 심사용 캡처 이름이라 심사 판단에는 영향이 없지만, 이미지 안 문구에 fortune이 보이면 새 캡처로 교체 여부를 8번에서 판단한다.
- (해결: 4-추가) DOB 화면(`screens/DobScreen.tsx:88`)이 서양 별자리 카드(Capricorn 등)를 보여준다. grep의 `zodiac` 대상이고 온보딩 첫인상이 점성술이다. 제거 제안, 승인 시 4번에 추가(COPY 문서 §4-A). intro 헤드라인 "Your fate has already spoken."도 같은 이유로 교체 제안(§4-B).
- 새 홈 이후 `marketing/video-kit.md`·숏폼 대본의 "Today's fortune" 화면 소스가 바뀐다 → 숏폼 재개 때 반영.
