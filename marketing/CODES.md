# 시딩용 무료 리포트 코드 방식 조사 (TODO 1, 2026-10-16)

결론부터: **추천은 (c) 자체 코드 + RevenueCat 프로모션 권한 부여**. Apple/Google 공식 코드는 보조로만 쓴다. 사용자가 방식을 승인하기 전에는 TODO 3(구현)에 착수하지 않는다.

표기: 출처 링크가 있는 것은 확인한 사실, `(추정)`은 근거 없이 추론한 것, `(미확인)`은 확인하지 못한 것.

## 1. 방식 비교

### (a) Apple 오퍼 코드 (App Store Connect)
- 오퍼 코드는 소모성·비소모성·비갱신 구독·자동갱신 구독 모든 IAP 유형에 쓸 수 있고, 무료로도 줄 수 있다. 비소모성은 iOS 16.3부터. [Apple 문서](https://developer.apple.com/documentation/storekit/supporting-offer-codes-in-your-app)
- 한도: 동시에 활성 오퍼 10개, 앱당 분기 1,000,000개 코드. 코드 종류는 일회용·커스텀·샌드박스 3가지. 같은 문서.
- 사용: 리딤 URL, App Store에서 코드 입력, 앱 안 리딤 시트. 리딤하면 일반 구매와 같은 거래가 생긴다. 같은 문서.
- 주의: 2025-10 개발자 포럼에 "무료 비소모성 코드가 not available 오류로 안 된다, 48시간 뒤 됐다"는 보고가 있다. [포럼](https://developer.apple.com/forums/thread/824524) 일시적 문제인지 `(미확인)`.
- 앱 쪽: 앱 안 리딤 시트는 `react-native-purchases`가 제공하는 것으로 `(추정, 미확인)`. 지금 코드에 호출은 없다(`mobile/`에서 `presentCodeRedemptionSheet` 검색 결과 없음). 리딤 URL·App Store 입력만 쓰면 앱 변경은 필요 없다.
- 제약: **iOS 결제(Paid Apps 계약)가 열려야 상품이 심사·판매 상태가 된다.** 지금은 계약 대기 중이라 시딩 시점이 그 뒤로 밀린다. 시딩 대상이 안드로이드 사용자면 쓸 수 없다.

### (b) Google Play 프로모 코드
- 일회성 제품: 앱당 **분기 500개**(관리형 제품 전체 합산). 일회용 자동 생성 코드, 미사용 코드는 분기 말 만료(만료는 RevenueCat 가이드 기준). [Google 문서](https://developer.android.com/google/play/billing/promo), [RevenueCat 가이드](https://www.revenuecat.com/docs/google-play-offers)
- 커스텀 코드는 구독 전용이다. 같은 문서.
- 제약: 안드로이드 사용자 전용. 리포트(일회성)는 분기 500개 한도.

### (c) 자체 코드 + RevenueCat 프로모션 권한 부여 (추천)
- RevenueCat REST `POST /v1/subscribers/{app_user_id}/entitlements/{entitlement_identifier}/promotional`에 `end_time_ms` 또는 `duration`(lifetime 포함, 단 `duration`은 deprecated 표기)을 보내면 즉시 그 권한이 생긴다. Secret API 키 필요. 응답 201에 `store: "promotional"` 항목. [RevenueCat API](https://www.revenuecat.com/docs/api-v1/entitlements)
- 우리 서버·앱이 이미 권한 기준이다.
  - 서버 `checkEntitlement`는 RevenueCat 구독자 정보의 `entitlements[...]`를 읽고 만료일이 없으면 활성, 있으면 미래일 때 활성으로 본다(`lib/revenuecat.ts:24-50`). 프로모션 권한도 같은 자리에 나타날 것 `(추정: 응답 모양은 코드로 가정, 실제 호출로 확인 필요 → 구현 단계 첫 QA)`.
  - 앱은 `Purchases.getCustomerInfo()`의 `entitlements.active`로 잠금을 푼다(`mobile/lib/purchases.ts:68-81, 279-280`). 프로모션 지급 뒤 CustomerInfo 새로고침이 필요하다(RevenueCat 문서 요지, 위 API 문서·블로그).
- 장점: 플랫폼 무관(iOS·안드로이드 모두), 결제 계약 대기와 무관(**지금 구현·시험 가능**, 사용자는 시딩 때 코드만 입력), 코드 수 한도 없음, 만료·1회 사용·크리에이터 구분 우리가 통제, 서버만 바꾸면 되므로 **OTA 또는 웹 배포로 끝**(새 네이티브 의존성 없음). 필요한 것은 앱 안 "코드 입력" 입구 하나(JS만).
- 한계(중요):
  - **궁합 리포트는 소모성이고 권한이 없어서**(`IAP_PRODUCTS.md:107-108`, 서버는 거래 id로 확인) 프로모션 권한으로는 못 연다. 시딩 대상은 **심층 리포트 `report_<moduleId>`와 신년 `year_report_<year>`**로 한정하는 게 맞다.
  - 프로모션 지급은 가격 정보가 없어 RevenueCat 매출 보고에 안 잡힌다(RevenueCat 커뮤니티 직원 답변, 2024년 글이라 최신 여부 `미확인`). 우리는 자체 발급·사용 기록(Supabase 테이블)으로 센다.
  - RevenueCat 호출이 실패하면 코드를 소진하지 않고 실패 반환해야 한다(구현 요구사항).
  - 앱이 익명 RevenueCat id로 동작하므로(`$RCAnonymousID`) 재설치 시 권한이 사라질 수 있다 `(추정, 미확인)`. 구현 때 확인하고, 안내 문구에 "기기 복원 불가" 여부를 정한다.
  - 스토어 정책: 앱 안에서 디지털 콘텐츠를 여는 코드 입력은 일반적으로 허용되는 방식(프로모 코드 입력 화면은 흔함)이나, 리뷰어가 이 입력창을 이상하게 볼 수 있다 `(추정)`. 입구는 설정 안 작은 링크로 두고 거절 이력(2.3.1(a))을 고려해 표현을 중립으로 한다.

## 2. 비교표

| 항목 | (a) Apple 오퍼 코드 | (b) Google 프로모 | (c) 자체 + RevenueCat |
|---|---|---|---|
| 지금 시험 가능 | 아니오(결제 계약 대기) | 부분(프로덕션 전, 시험 트랙 `미확인`) | 예 |
| 플랫폼 | iOS만 | 안드로이드만 | 둘 다 |
| 궁합(소모성) 지원 | 가능(소모성도 지원) | 가능 `(추정)` | 불가 |
| 수량 한도 | 분기 1,000,000 | 분기 500 | 없음 |
| 앱 변경 | 없음 또는 JS | 없음 | JS(입력창) + 서버 |
| 통제 | 낮음 | 낮음 | 높음 |
| 매출 보고 | 스토어 거래로 기록 | 스토어 거래로 기록 | 안 잡힘 |

## 3. 추천안

**(c)를 기본으로**, 심층 리포트(와 필요 시 신년 리포트)만 시딩 상품으로 쓴다. 이유: 시딩은 결제 열리기 전부터 DM·협상이 시작되고, 크리에이터 팔로워는 양쪽 OS에 걸쳐 있으며, 통제(1회 사용·만료·크리에이터별 추적)가 필요하다. 궁합 리포트를 선물하고 싶으면 그 한 건만 (a)/(b) 코드로 보완한다(수요 확인 뒤).

### 최소 설계안 (TODO 3 구현 전 승인용)
- 발급: 로컬 스크립트가 `seed_codes` 테이블에 코드 N개 생성(12자 영숫자, 모호 문자 제외, 크리에이터 라벨·권한 id·만료일 포함, 해시만 저장). 사용자 실행.
- 사용: 앱 설정의 작은 "코드가 있나요?" → `POST /api/redeem-code { code, appUserId }` → 서버가 코드 검증(미사용·미만료) → RevenueCat 프로모션 권한 부여 → 성공 시에만 사용 처리(원자적) → 앱이 CustomerInfo 새로고침.
- 보호: IP·ID 기준 속도 제한(`lib/rateLimit.ts`), 오류 문구 동일화(존재 여부 노출 금지), RevenueCat 키 없으면 fail closed, 코드 원문은 로그에 남기지 않음.
- 개인정보: 크리에이터 신원은 라벨(예: `seed_a01`)만, 이메일·계정 저장 없음.
- 테스트: RevenueCat 테스트 사용자에게 지급 → `checkEntitlement`가 active인지, 앱 잠금이 풀리는지(구현 단계 QA).
- 협찬 표기: 코드를 받은 크리에이터는 광고/협찬 표기 의무가 있다 → 시딩 DM에 `#ad` 안내(TODO 6에서 문구).

## 결정 (2026-10-16)
사용자가 (c) 대신 **Apple 오퍼 코드 + Google 프로모 코드**를 선택했다. 궁합(소모성) 포함, 시딩은 결제 계약 이후로 연기. TODO 3(자체 코드 구현)은 취소. 위 (c) 설계안은 참고용으로 남긴다.

## 4. (결정 전) 사용자 결정 필요
1. (c) 승인 여부(승인하면 TODO 3 진행, 보완책으로 (a) 병행 여부).
2. 시딩 상품 범위: 심층 리포트 모듈 몇 개? 신년 리포트 포함?
3. 코드 수량·만료(예: 크리에이터당 1개, 발급 후 30일).

## 출처
- [Apple: Supporting offer codes in your app](https://developer.apple.com/documentation/storekit/supporting-offer-codes-in-your-app)
- [Apple 개발자 포럼: 비소모성 오퍼 코드 not available](https://developer.apple.com/forums/thread/824524)
- [Google Play: Promo codes](https://developer.android.com/google/play/billing/promo)
- [RevenueCat: Google Play offers](https://www.revenuecat.com/docs/google-play-offers)
- [RevenueCat API v1: Entitlements (promotional)](https://www.revenuecat.com/docs/api-v1/entitlements)
