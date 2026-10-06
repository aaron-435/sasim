# App Store Connect 인앱 상품 입력값 (비소모품, 각 4줄: 식별 정보 / 제품 ID / 표시 이름 / 설명)

```
Deep Report - Module 1 Love & Attachment
com.fatesaid.app.report.module1
Love & Attachment Deep Report
Saju × psychology deep report: love & attachment
```

```
Deep Report - Module 2 Money
com.fatesaid.app.report.module2
Money Deep Report
Saju × psychology deep report: money
```

```
Deep Report - Module 3 Burnout
com.fatesaid.app.report.module3
Burnout Deep Report
Saju × psychology deep report: burnout
```

```
Deep Report - Module 4 The Mask
com.fatesaid.app.report.module4
The Mask Deep Report
Saju × psychology deep report: the mask you wear
```

```
Deep Report - Module 5 Follow-Through
com.fatesaid.app.report.module5
Follow-Through Deep Report
Saju × psychology deep report: follow-through
```

```
Deep Report - Module 6 Anger
com.fatesaid.app.report.module6
Anger Deep Report
Saju × psychology deep report: anger
```

```
Deep Report - Module 7 Sensitivity
com.fatesaid.app.report.module7
Sensitivity Deep Report
Saju × psychology deep report: sensitivity
```

```
Deep Report - Module 8 Sleep
com.fatesaid.app.report.module8
Sleep Deep Report
Saju × psychology deep report: sleep & a restless mind
```

```
Deep Report - Module 9 Family of Origin
com.fatesaid.app.report.module9
Family of Origin Deep Report
Saju × psychology deep report: family of origin
```

```
Deep Report - Module 10 Focus
com.fatesaid.app.report.module10
Focus Deep Report
Saju × psychology deep report: focus
```

```
Deep Report - Module 11 Self-Expression
com.fatesaid.app.report.module11
Self-Expression Deep Report
Saju × psychology deep report: self-expression
```

```
Deep Reports - All 11 Bundle
com.fatesaid.app.report.bundle_all
All 11 Deep Reports
All 11 saju × psychology deep reports
```

```
Year-Ahead Report 2027
com.fatesaid.app.report.year_2027
2027 Year-Ahead Report
2027 saju report: 5 areas, 12 months, action plan
```

## 소모품 (Consumable)

궁합 상세 리포트 — 상대 한 사람마다 한 번 구매(2026-10-06). 가격은 $6.99 가정, 사용자가 정한다.
- App Store Connect: 유형 **소모품**, 아래 4줄.
- Play Console: 일회성 제품, 제품 ID `compat_report`(소모성으로 처리됨 — 앱이 RevenueCat으로 구매하면 자동 소비).
- RevenueCat: 두 스토어 상품을 "reports" 오퍼링에 패키지 id `compat_report`로 추가. **entitlement는 붙이지 않는다**(서버가 거래 id로 확인: `lib/revenuecat.ts`의 `checkConsumablePurchase`, 상품 id 목록은 `app/api/compatReport/paid/route.ts`의 `COMPAT_PRODUCT_IDS`).

```
Compatibility Report
com.fatesaid.app.report.compat
Compatibility Report
Saju compatibility report for you and one other person
```
