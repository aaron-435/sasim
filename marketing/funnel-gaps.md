# 퍼널 이벤트 점검 (TODO 10번, 2026-10-19)

읽기만 했다. 코드·DB는 바꾸지 않았다. 목적: `UNIT_ECONOMICS.xlsx`가 가정으로 둔 값을 지금 구조로 얼마나 잴 수 있는지 확인한다.

근거: `lib/eventSchema.ts`(웹 허용 목록), `mobile/lib/analytics.ts`, `mobile/lib/purchases.ts` 등 발생 지점, `supabase/schema.sql`, 운영 DB의 `events`·`sessions` 등 읽기 전용 조회(2026-10-19).

## 1. 지표별 측정 가능 여부

| # | 필요한 지표 | 지금 잴 수 있나 | 방법 또는 막히는 이유 | 필요한 조치 |
|---|---|---|---|---|
| 1 | 설치→첫 실행 | 부분 | `events`에서 anon_id별 첫 이벤트(`onboarding_step`)를 첫 실행으로 본다. 스토어의 설치 수와는 별개 | 스토어 콘솔 수치와 나란히 보는 표만 만들면 됨 |
| 2 | D1·D7 리텐션 | **부정확** | 앱 열기 전용 이벤트가 없다. `fortune_first_view`는 `trackOnce`라 한 번만 찍힌다. 다른 이벤트로 "활동한 날"을 추정하면 실제보다 낮게 나온다 | `app_open` 이벤트 추가(하루 1회, 앱이 전경으로 올 때) |
| 3 | 상담 1세트 완료율 | **불가** | 상담 시작·완료 이벤트가 없다. `chat_sessions` 테이블은 `session_id` 기준이고 `events`의 anon_id와 설계상 연결하지 않는다(schema.sql 주석) | `chat_start`, `chat_complete`(속성 `kind`: 끝까지/중간 마무리) 추가 |
| 4 | 딥 리포트 생성률 | **불가** (페이월 도달은 가능) | 생성 이벤트가 없고 `report_results`도 session_id 기준. 다만 `paywall_view`에 `surface: report`가 있어 리포트 앞 페이월 도달은 센다 | `report_generate` 이벤트 추가 |
| 5 | 페이월 노출률 | **가능** | `paywall_view`(surface: report, fortune, year_report, compat_report, qa, qa_person) 고유 anon 수 ÷ `onboarding_complete` 고유 anon 수 | 없음 |
| 6 | 체험 시작률 | **불가** | `purchase_start`·`purchase_success`에 `product`만 있고 체험 여부 속성이 없다 | 속성 `kind: trial\|paid` 추가, 또는 RevenueCat 대시보드의 체험 지표를 정본으로 사용 |
| 7 | 구독 이탈 | 이벤트 범위 밖 | 웹훅이나 구독 상태 테이블이 없다 | RevenueCat 대시보드(Churn, Retention)를 주 1회 수동으로 보고 시트에 입력 |
| 8 | 설치당 AI 비용 | 부분 | `llm_usage_log`가 session_id를 가지지만 anon_id와 연결되지 않아 설치 코호트별로 못 나눈다. 기간 총비용 ÷ 같은 기간 신규 `sessions` 수로 근사 | 코호트 단위가 꼭 필요할 때만 연결 방식 설계(개인정보 정책 검토 필요) |
| 9 | 채널(출처) | 웹만 | `utm_*` 4개는 웹 이벤트에 실린다. 앱 설치에는 출처가 없고, 웹 anon_id와 앱 anon_id는 서로 연결되지 않는다 | 7번(스토어 링크 교체) 때 App Store 캠페인 토큰·Play referrer를 링크에 붙이는 것을 같이 검토 |

## 2. 현재 데이터의 품질 (측정 기준선으로 쓰면 안 되는 이유)

- `events` 전체 753행 중 dev 표시 214행을 빼면 539행, 고유 anon 46개, 기간 2026-10-06~10-18이다.
- 이 46개는 대부분 개발자·테스트 기기일 가능성이 높다(총 설치 약 6회라는 전제와 맞지 않음). **어느 anon이 테스터인지 구분하는 표시가 없다.** 이 숫자로 D1·전환율을 계산하면 현실과 크게 다르다.
- 예시: android `purchase_start` 27건 / `purchase_success` 11건 / `purchase_cancel` 11건은 테스트 구매로 보인다(미확인).
- `sessions` 104행, `chat_sessions` 14행, `report_results` 14행, `quiz_results` 8행도 테스트 혼입 가능성이 같다.

## 3. 추가할 이벤트 (규모)

| 이벤트 | 위치 | 코드 규모 |
|---|---|---|
| `app_open` (하루 1회) | `mobile/lib/analytics.ts`에 이름 추가, 앱 전경 진입 지점에서 1회 호출, 하루 중복 방지는 `trackOnce` 방식을 날짜 키로 | 약 15줄 |
| `chat_start`, `chat_complete` | `ChatScreen` 시작·종료 지점, `kind` 속성 | 약 10줄 |
| `report_generate` | 리포트 생성 성공 지점 | 약 5줄 |
| 구매 이벤트의 `kind` 속성 | `mobile/lib/purchases.ts` 3~4줄 | 약 5줄 |
| 서버 허용 목록 | `lib/eventSchema.ts`(`EVENT_NAMES`, 필요하면 `PROP_KEYS`)와 `mobile/lib/analytics.ts`의 타입을 맞춤 | 약 5줄 |

배포 순서: 웹(`lib/eventSchema.ts`)을 먼저 배포한 뒤 앱 JS를 OTA로 보낸다. 새 이름을 서버가 400으로 거절하기 때문이다. 네이티브 의존성은 필요 없다. 파일이 3개 이상이므로 CLAUDE.md의 위임 절차(muse)를 쓸 수 있다.

## 4. 결론

- 손익 시트의 가정 중 **지금 바로 실측할 수 있는 것은 페이월 노출률뿐**이다.
- D1·D7, 상담 완료율, 딥 리포트 생성률, 체험 시작률은 이벤트를 추가해야 잴 수 있다. 추가는 작은 코드 변경이고 OTA로 나간다.
- 구독 이탈은 RevenueCat 대시보드가 정본이다.
- 현재 events 데이터는 테스트가 섞여 있어, 스토어 공개 뒤 첫 실사용자 코호트부터 기준선으로 삼는다.
