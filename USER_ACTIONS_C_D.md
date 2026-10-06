# 사용자 실행 C·D 상세 안내 (2026-10-07)

`TODO.md`의 "사용자 실행" C(스토어·RevenueCat 설정)와 D(개인정보 문서 갱신)를 콘솔에서 따라 할 수 있게 풀어 쓴 문서입니다. 다른 AI(Gemini 등)와 함께 볼 때를 위해 맨 앞에 규칙을 적었습니다.

## 0. 함께 보는 AI에게 (먼저 읽기)

- 이 문서의 **제품 ID, entitlement 이름, 오퍼링·패키지 이름은 앱 코드와 글자 하나까지 같아야** 합니다. 추측하거나 "더 좋은 이름"으로 바꾸지 마세요. 2026-09-14에 `qa_pro`와 `qa_premium` 이름이 어긋나 결제가 열리지 않은 적이 있습니다.
- RevenueCat entitlement 식별자는 만든 뒤 바꿀 수 없습니다. 만들기 전에 철자를 한 번 더 확인하세요.
- 가격은 사용자가 정합니다. 앱은 스토어 가격(`priceString`)을 그대로 보여 주므로, 가격을 바꿔도 코드를 고칠 필요는 없습니다.
- 콘솔 화면이 이 문서와 다르면(메뉴 이름 변경 등) 멈추고 화면을 확인한 뒤 진행하세요. 기억으로 메뉴를 지어내지 마세요.
- 무엇을 했는지 끝에 있는 "완료 보고" 칸에 적어 두면, 다음 Claude 세션이 그걸 보고 앱 쪽 확인을 이어갑니다.

## 전체 순서 한눈에

| 순서 | 할 일 | 어디서 | 언제 |
|---|---|---|---|
| C-1 | 새 상품 2개 등록: `report_module12`(비소모성), `compat_report`(소모성) | App Store Connect, Play Console | 지금 가능 |
| C-2 | 번들 상품에 module12 열어 주기 + 이름 "12개"로 | RevenueCat, App Store Connect | C-1 뒤 |
| C-3 | 구독 연간 요금제 + 7일 무료 체험 | App Store Connect, Play Console, RevenueCat | 가격 정한 뒤 |
| C-4 | RevenueCat 오퍼링 연결 | RevenueCat | C-1·C-3 뒤 |
| C-5 | 심사 제출 시점 | App Store Connect | Apple 2.3.1(a) 회신 뒤, 1.1.0 빌드와 함께 |
| D-1 | 개인정보처리방침 본문 갱신 | 코드(`lib/legalContent.ts`) → 웹 배포 | Claude 세션에서 |
| D-2 | App Store 개인정보 라벨 | App Store Connect | 1.1.0 제출 전 |
| D-3 | Play 데이터 보안 양식 | Play Console | 다음 Android 출시 전 |

참고: 앱의 1.1.0 스토어 빌드(위젯·리뷰 요청 포함)는 아직 만들지 않았습니다. C-5의 심사 제출은 그 빌드가 나온 뒤에 합니다. C-1~C-4는 미리 해 둬도 기존 앱에 영향이 없습니다(앱이 해당 패키지를 찾을 때만 씀).

---

## C-1. 새 상품 2개 등록

### C-1-a. 새 출발 심층 리포트 `report_module12` (비소모성, 기존 리포트와 같은 가격 $14.99 가정)

**App Store Connect** → 앱 "Fate Said" → 수익화(Monetization) → 앱 내 구입(In-App Purchases) → `+`

- 유형: **비소모품(Non-Consumable)**
- 아래 4줄을 그대로 입력 (기존 module1~11과 같은 형식, `IAP_PRODUCTS.md`에도 있음)

```
참조 이름: Deep Report - Module 12 Fresh Start
제품 ID: com.fatesaid.app.report.module12
표시 이름(영어): Fresh Start Deep Report
설명(영어): Saju × psychology deep report: fresh starts & transitions
```

- 가격: 기존 module1~11과 같은 가격 등급(현재 $14.99)
- 판매 국가: 전 세계(기존 상품과 같게)
- 심사용 스크린샷: `mobile/store-assets/iap-review/report-paywall-1290x2796.png` 재사용 가능
- 심사 메모(영어 예시): "Unlocks the full in-depth report for the 'Fresh Start' test. Purchase screen: Home → Choose a test → Fresh Start → finish the 30 questions and the AI conversation → report → locked page → 'Unlock this report'."

**Play Console** → Fate Said → 수익 창출 → 제품 → **인앱 상품(일회성 제품)** → 제품 만들기

```
제품 ID: report_module12
이름: Fresh Start Deep Report
설명: Saju × psychology deep report: fresh starts & transitions
```

- 가격: 기존 `report_module1`~`11`과 같게. 활성화(Activate)까지 누르기.

### C-1-b. 궁합 상세 리포트 `compat_report` (소모성, $6.99 가정 — 사용자가 결정)

상대 한 사람마다 한 번 사는 상품입니다. 같은 사람이 다른 상대로 다시 살 수 있어야 해서 **소모품**입니다.

**App Store Connect** → 앱 내 구입 → `+` → 유형 **소모품(Consumable)**

```
참조 이름: Compatibility Report
제품 ID: com.fatesaid.app.report.compat
표시 이름(영어): Compatibility Report
설명(영어): Saju compatibility report for you and one other person
```

- 심사 메모(영어 예시): "One-time report for one pair of people. Purchase screen: Home → Compatibility → enter the other person's birth date → result → 'Compatibility report' → preview pages → 'Open the report'."

**Play Console** → 인앱 상품 → 제품 만들기

```
제품 ID: compat_report
이름: Compatibility Report
설명: Saju compatibility report for you and one other person
```

- Play에는 "소모성" 체크가 따로 없습니다. RevenueCat으로 사면 자동으로 소비 처리됩니다.

> 서버는 이 두 제품 ID(`com.fatesaid.app.report.compat`, `compat_report`)만 궁합 구매로 인정합니다(`app/api/compatReport/paid/route.ts`). 다른 ID로 만들면 구매해도 리포트가 열리지 않습니다.

---

## C-2. 기존 번들 구매자에게 module12 열어 주기

번들 상품(`com.fatesaid.app.report.bundle_all` / Play `report_bundle_all`)은 RevenueCat에서 모든 `report_moduleN` entitlement에 붙어 있습니다. module12만 새로 붙이면 됩니다.

**RevenueCat** → 프로젝트 Fatesaid → Product catalog

1. **Products**: App Store와 Play의 새 상품을 가져옵니다(Import). `com.fatesaid.app.report.module12`, `report_module12`, `com.fatesaid.app.report.compat`, `compat_report`.
2. **Entitlements** → `+ New`
   - Identifier: **`report_module12`** (철자 확인)
   - Description: Fresh Start deep report
   - Attach products: `com.fatesaid.app.report.module12`, `report_module12`, **그리고 번들 상품 둘**(`com.fatesaid.app.report.bundle_all`, `report_bundle_all`)
3. **궁합 상품(`compat_report`)은 어떤 entitlement에도 붙이지 마세요.** 서버가 거래 id로 직접 확인합니다.

**App Store Connect** (선택이지만 권장): 번들 상품의 표시 이름·설명을 "12"로 바꿉니다. 제품 ID는 그대로 둡니다.

```
참조 이름: Deep Reports - All 12 Bundle
표시 이름(영어): All 12 Deep Reports
설명(영어): All 12 saju × psychology deep reports
```

Play의 `report_bundle_all` 이름·설명도 같은 문구로 바꿉니다. 번들 가격을 바꿀지는 사용자 결정입니다(현재 $119.99, 앱은 스토어 가격을 그대로 보여 주고 "따로 사면 합계·할인율"도 스토어 가격으로 계산합니다).

---

## C-3. 구독: 연간 요금제 + 7일 무료 체험

현재 구독: App Store 구독 그룹 **"Fatesaid Pro"**, 월간 상품 `com.fatesaid.app.qapro.monthly`, RevenueCat entitlement **`qa_premium`**, 오퍼링 **`default`**(current)의 Monthly 패키지.

앱은 `default` 오퍼링의 **Annual 패키지 타입**과 **Monthly 패키지 타입**을 찾고, 무료 체험은 상품의 intro offer(가격 0)에서 읽습니다. 연간 패키지나 체험이 없으면 예전처럼 월간만 보입니다.

### C-3-a. 연간 가격 정하기 (사용자 결정)

SPEC 가정은 $49.99/년. 월간 요금의 몇 달치로 할지 정한 뒤 진행하세요.

### C-3-b. App Store Connect — 연간 상품

수익화 → 구독(Subscriptions) → 그룹 **Fatesaid Pro** → `+` (같은 그룹에 넣어야 월간↔연간 전환이 됩니다)

```
참조 이름: Fatesaid Pro Annual
제품 ID: com.fatesaid.app.qapro.annual
구독 기간: 1년
표시 이름(영어): Fatesaid Pro (Annual)
설명(영어): Daily fortune readings and up to 10 saju Q&A questions a day
```

- 제품 ID는 위 제안을 써도 되고 다르게 해도 됩니다(앱은 ID가 아니라 RevenueCat 패키지 타입으로 찾음). 다만 정한 ID를 완료 보고에 적어 주세요.
- 가격: C-3-a에서 정한 값. 판매 국가: 전 세계.
- 그룹 안 순위(Subscription level): 월간과 같은 레벨로 두면 "기간만 다른 같은 혜택"으로 처리됩니다.

### C-3-c. App Store Connect — 7일 무료 체험

월간·연간 각각의 구독 상품 화면 → 구독 가격(Subscription Prices) 옆 **소개 혜택(Introductory Offers)** → `+`

- 국가: 전체
- 유형: **무료(Free)**, 기간: **1주(1 Week)**
- 시작일: 오늘, 종료일: 없음
- 자격: Apple 규칙상 그룹에서 처음 구독하는 사람만 받습니다(앱이 iOS에서 사용자별 자격을 확인해 자격 없는 사람에게는 "7일 무료" 문구를 안 보여 줌).

체험을 월간에만 줄지, 연간에만 줄지, 둘 다 줄지는 사용자 결정입니다. 앱은 어느 쪽이든 패키지 정보대로 보여 줍니다.

### C-3-d. Play Console — 구독

메모리 기준으로 Play에는 아직 구독 상품이 없을 수 있습니다(인앱 상품만 등록됨). 먼저 확인하세요: 수익 창출 → 제품 → **구독**.

- **구독이 없다면**: 이번엔 건너뛰고 완료 보고에 "Play 구독 없음"이라고 적어 주세요. Android 구독은 따로 계획합니다(현재 Android는 비공개 테스트 단계).
- **구독이 있다면**: 그 구독에 기본 요금제(Base plan)를 하나 더 만듭니다.
  - 기본 요금제 ID: `annual`, 결제 기간 1년, 자동 갱신, 가격 C-3-a
  - 혜택(Offer) → 무료 체험: 혜택 ID `free-trial-7d`, 자격 "신규 고객", 단계 "무료 체험 7일"
  - 월간 기본 요금제에도 같은 무료 체험 혜택을 원하면 추가

### C-3-e. RevenueCat

1. Products에서 새 연간 상품(App Store, 있으면 Play)을 Import
2. Entitlement **`qa_premium`** → Attach products → 연간 상품(들) 추가 (월간과 같은 entitlement여야 구독 혜택이 열림)
3. Offerings → **`default`** → `+ Add package`
   - Identifier: **`$rc_annual`** (드롭다운에서 **Annual** 선택)
   - App Store 상품: 연간 상품 / Play 상품: 연간 기본 요금제(있으면)
4. `default`가 계속 **Current**인지 확인(바꾸지 않기)

---

## C-4. RevenueCat 오퍼링 연결 (리포트 상품)

Offerings → **`reports`** (current가 아닌 오퍼링, 그대로 두기) → `+ Add package` 두 번

| Package identifier (Custom) | App Store 상품 | Play 상품 |
|---|---|---|
| **`module12`** | `com.fatesaid.app.report.module12` | `report_module12` |
| **`compat_report`** | `com.fatesaid.app.report.compat` | `compat_report` |

- 패키지 식별자는 "Custom"으로 직접 입력합니다. 앱이 `module12`, `compat_report`라는 이름으로 찾습니다.
- 기존 패키지(`module1`~`module11`, `report_bundle_all`, `year_report_2027`)는 건드리지 않습니다.

---

## C-5. 심사 제출 시점

- Apple 2.3.1(a) 회신을 먼저 봅니다. 그 결과에 따라 제출 시점을 정합니다(사용자 결정).
- 새 인앱 상품과 구독 변경은 **앱 1.1.0 빌드와 함께 제출**하는 걸 권합니다. module12 화면과 위젯·리뷰 요청이 1.1.0에 들어 있고, 심사자가 구매 화면을 실제로 볼 수 있어야 하기 때문입니다.
- 1.1.0 빌드는 다음 Claude 세션에서 `/work 12`로 시뮬레이터 확인을 끝낸 뒤 만듭니다(EAS 프로덕션 빌드 → TestFlight → 샌드박스 구매 확인 → 제출).

### 샌드박스에서 확인할 것 (TestFlight 1.1.0에서)

1. 검사 목록 → Fresh Start → 30문항 → 대화 → 리포트 → 페이월에 스토어 가격 → 구매 → 전체 열림
2. 번들을 산 테스트 계정이면 module12 리포트가 결제 없이 바로 열림
3. 궁합 → 상세 리포트 → 구매 → 8쪽 → "내 리포트"에 저장, 다른 상대로는 새 결제
4. 운세/Q&A 구독 페이월에 월간·연간 두 줄과 "7일 무료, 이후 …" (체험 자격 있는 새 샌드박스 계정으로)
5. 문제가 있으면 페이월 아래 작은 회색 글씨(진단 메시지)를 캡처해 주세요.

---

## D-1. 개인정보처리방침 본문 갱신 (코드 작업)

방침 본문은 웹사이트 코드 `lib/legalContent.ts`에 ko/en/es로 들어 있고 `/privacy`에 보입니다. 콘솔이 아니라 **코드를 고쳐 웹에 배포**해야 하므로, Claude 세션에서 하는 걸 권합니다(Gemini와 문구를 다듬은 뒤 Claude에게 "이 문구로 lib/legalContent.ts 갱신해 줘"라고 주면 됩니다).

현재 방침(2026-08-31 기준)과 지금 앱이 실제로 하는 일이 어긋난 부분:

| # | 현재 방침 | 실제 | 고칠 곳 |
|---|---|---|---|
| 1 | 사용 기록을 언급하지 않음, 8항 "분석 도구를 쓰지 않음" | 앱·웹 사용 기록(`events` 테이블, 무작위 설치 id) 수집 | 1·2·8항 |
| 2 | "SAZU API 제공업체"에 생년월일 전송 | 2026-09-01부터 자체 계산 엔진, 외부 전송 없음 | 4항, 7항(`SAZU_API_KEY` 언급) |
| 3 | 결제 처리 업체 없음 | RevenueCat(미국)이 구매 기록·앱 사용자 id 처리, 서버가 구매 확인에 사용 | 4항 |
| 4 | 다른 사람 정보 언급 없음 | 궁합·"그 사람에 대해 묻기"·그룹 케미 맵에서 다른 사람 생년월일을 입력(요청 안에서만 계산에 쓰고 저장 안 함, 궁합 리포트 구매는 HMAC 값만 저장) | 1항 |
| 5 | 초대·커플 연결 없음 | 초대 링크: 보낸 사람 표시 이름·일간 한 글자·친구가 적은 이름·친구 결과(일간·유형·오행) 30일 보관. 커플 모드: 양쪽 표시 이름·일간/일지 한 글자·RevenueCat id, 해제하면 삭제 | 1·3항 |
| 6 | 저널 없음 | 한 줄 저널은 기기에만 저장. 월말 리포트를 만들 때만 그 달 기록이 서버·OpenAI로 가고 저장하지 않음(토큰 수만 기록) | 1·4항 |
| 7 | 웹 Vercel Analytics 언급 없음 | 웹은 Vercel Analytics도 사용 | 8항 |

**사용 기록 문단 초안** (TODO 1번에서 만든 것, 그대로 써도 됨)

- ko: "서비스 개선을 위해 앱과 웹사이트 사용 기록(어떤 화면을 열었는지, 어떤 버튼을 눌렀는지, 구매 시도와 결과, 답변이 도움이 되었는지에 대한 👍/👎)을 수집합니다. 이 기록은 기기마다 무작위로 만든 식별자에 묶이며 이름, 생년월일, 직접 입력한 글은 포함하지 않습니다. 기록은 서비스 개선 분석에만 쓰고 광고나 제3자 추적에 쓰지 않습니다."
- en: "To improve the service, we record how the app and website are used (which screens are opened, which buttons are tapped, purchase attempts and results, and 👍/👎 on whether an answer felt accurate). These records are tied to a random identifier created on your device and never include your name, birth date or anything you type. We use them only to analyze and improve the service, not for advertising or third-party tracking."
- es: "Para mejorar el servicio, registramos cómo se usan la app y el sitio web (qué pantallas se abren, qué botones se tocan, los intentos y resultados de compra, y el 👍/👎 sobre si una respuesta te pareció acertada). Estos registros se asocian a un identificador aleatorio creado en tu dispositivo y nunca incluyen tu nombre, tu fecha de nacimiento ni lo que escribes. Solo los usamos para analizar y mejorar el servicio, no para publicidad ni seguimiento de terceros."

**다른 사람 정보 문단 초안** (ko, 다듬어서 en/es로)

- "궁합, '그 사람에 대해 묻기', 그룹 케미 맵을 이용할 때 이용자가 입력한 다른 사람의 생년월일·성별·출생 시간은 결과를 계산하는 요청 안에서만 쓰고 저장하지 않습니다. 궁합 상세 리포트를 구매한 경우, 같은 구매를 같은 두 사람에게만 쓰도록 생년월일을 되돌릴 수 없는 값(암호화 해시)으로 바꿔 보관합니다. 다른 사람의 정보를 입력하기 전에 그 사람이 동의하는지 확인해 주세요."

D-1 다음에 할 것: 수정일(`updatedAt`) 갱신 → 웹 배포. 앱 설정의 개인정보처리방침 링크는 같은 페이지를 열므로 앱 수정은 필요 없습니다.

---

## D-2. App Store 개인정보 라벨 (App Store Connect → 앱 → 앱 개인정보 보호)

Apple 정의에서 "수집"은 기기 밖으로 보내서 요청 처리에 필요한 시간보다 오래 접근할 수 있는 경우입니다. 요청 안에서만 쓰고 버리는 데이터(다른 사람 생년월일, 저널 원문)는 수집에 해당하지 않을 수 있지만, 최종 판단은 사용자가 Apple 문서를 보고 합니다.

**새로 추가할 항목**

| 데이터 유형 | 용도 | 사용자와 연결 | 추적 |
|---|---|---|---|
| 사용 데이터 → **제품 상호작용** | 분석 | 아니요 | 아니요 |
| 식별자 → **기기 ID** (무작위 설치 id) | 분석 | 아니요 | 아니요 |

**이미 있어야 하는 항목인지 확인할 것** (기존 라벨을 열어 비교)

- 구매 → 구매 내역 (RevenueCat, 앱 기능)
- 민감한 정보 또는 기타 사용자 콘텐츠: 생년월일·출생 도시·상담 대화(서버에 1년 보관하므로 수집에 해당) — 기존 라벨에 있는지 확인
- 연락처 정보 → 이름: 커플 모드·초대의 **표시 이름**이 서버에 저장됩니다(실명이 아닐 수 있음). 기존 라벨에 이름이 없다면 추가 여부를 결정

---

## D-3. Play 데이터 보안 양식 (Play Console → 앱 콘텐츠 → 데이터 보안)

| Play 분류 | 수집 | 공유 | 목적 | 비고 |
|---|---|---|---|---|
| 앱 활동 → **앱 상호작용** | 예 | 아니요 | 분석 | 이벤트 기록 |
| 기기 또는 기타 ID | 예 | 아니요 | 분석 | 무작위 설치 id |
| 금융 정보 → 구매 내역 | 예 | 아니요 | 앱 기능 | RevenueCat (기존 항목 확인) |

- "전송 중 데이터 암호화: 예"(HTTPS), "사용자가 데이터 삭제를 요청할 수 있음: 예"(방침 6항 연락처, 앱 안 "내 데이터 초기화"는 기기 데이터만 지움).
- Android는 지금 비공개 테스트라 다음 출시(1.1.0) 전에만 하면 됩니다.

---

## 완료 보고 (다 하고 채워서 Claude에게 보여 주기)

```
C-1 report_module12: ASC [ ] / Play [ ]   가격: ____
C-1 compat_report:   ASC [ ] / Play [ ]   가격: ____
C-2 RevenueCat entitlement report_module12 생성, 번들 2개 연결 [ ]
C-2 번들 이름 12로 변경: ASC [ ] / Play [ ]   번들 가격: ____
C-3 연간 상품 ID: ____________________  가격: ____
C-3 무료 체험: 월간 [ ] / 연간 [ ]  (기간: 7일)
C-3 Play 구독: 있음/없음 → ____
C-3 RevenueCat qa_premium에 연간 연결 [ ], default 오퍼링에 $rc_annual [ ]
C-4 reports 오퍼링에 module12 [ ], compat_report [ ]
D-1 방침 문구 확정 [ ] (Claude에게 코드 반영 요청)
D-2 App Store 라벨 [ ]
D-3 Play 데이터 보안 [ ]
막힌 곳·화면이 문서와 달랐던 곳: ____
```
