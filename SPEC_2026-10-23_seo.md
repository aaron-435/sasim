# SPEC (2026-10-23) — 웹 SEO 보강

이전 SPEC(고정 스크립트 챗 v4)은 `SPEC_2026-10-20_choicechat_v4.md`, TODO는 `TODO_2026-10-20_choicechat_v4.md`로 보관했다. 그 TODO 9·10(사용자 판정, 기본 흐름 결정)은 여기서 다루지 않는다.

## 왜 하나
웹은 리드 생성용 랜딩이고, 광고 없이 들어오는 유입이 사실상 검색뿐이다. 앱은 Google Play에 게시됐고(1.2.0, 2026-10-23 확인) iOS 1.2.0은 심사 중이다. SEO는 효과가 나오기까지 2~3개월이라 늦출수록 손해다.

## 이미 있는 것 (다시 만들지 않는다)
- `app/sitemap.ts`(en/ko/es 대체 언어 포함), `app/robots.ts`(`/api/`, `/c/` 차단), 랜딩 canonical + hreflang(`app/layout.tsx`).
- 무료 도구 `/saju-calculator`, 일간 설명 `/day-master` 목록 + 10개 상세(en/ko/es), 상세 페이지 JSON-LD(`components/DayMasterPage.tsx`), OG 이미지.

## 빠진 것 (조사 결과)
1. **언어가 쿼리(`?lang=`)다.** 언어별 URL 구분이 약하고, 검색엔진이 `?lang=es`를 별개 페이지로 안정적으로 색인하지 못할 수 있다. 또 페이지가 `headers()`를 읽어 `no-store` 동적 렌더라 캐시가 안 되고 느리다.
2. **JSON-LD가 일간 상세에만 있다.** 랜딩(Organization, MobileApplication)과 계산기(WebApplication)에는 없다.
3. **앱 연결이 "coming soon"이다.** Android는 이미 게시됐다. 설치 버튼과 Smart App Banner가 없다.
4. **콘텐츠가 10개 페이지뿐이다.** 검색 유입의 대부분이 나올 곳인데 부족하다.
5. **Search Console / 색인 확인을 한 적 없다**(sitemap 제출 안 함, TODO_2026-10-14).

## 목표
검색 유입이 들어오는 길(올바른 URL, 빠른 응답, 풍부한 결과, 앱 설치 연결)을 만들고, 콘텐츠를 안전한 범위에서 늘린다.

## 범위 안
- 언어별 경로(`/es/...`, `/ko/...`, 영어는 루트) 전환 검토와 구현. 기존 `?lang=` URL은 308 리다이렉트로 유지, sitemap·hreflang·canonical·내부 링크 전부 새 경로로 맞춘다. (결정 필요: 아래 질문 1)
- 가능한 페이지는 정적/ISR 렌더로 바꿔 캐시되게 한다(`headers()` 의존 제거).
- 랜딩·계산기·일간 상세 JSON-LD 보강(Organization, MobileApplication, WebApplication, BreadcrumbList, FAQ가 있는 곳은 FAQPage).
- 웹 "coming soon" 문구 중 Android 부분을 Play 스토어 링크로 교체. iOS는 승인 전까지 "coming soon" 유지. `<meta name="google-play-app">` 같은 앱 배너 태그는 iOS 링크 확정 후.
- 콘텐츠 확장: 일간 외 주제 페이지 en/es(ko는 선택) 설계와 첫 묶음. 문구 작성은 Opus가 한다.
- Search Console 등록과 sitemap 제출 절차(사용자가 계정에서 직접).

## 범위 밖
- 유료 광고, 백링크 캠페인, 블로그 엔진 신설.
- 앱(`mobile/`) 변경 없음. 이 작업은 웹 한정이라 OTA·네이티브 빌드와 무관하다.
- 디자인 개편. 기존 `dm-*` 스타일과 팔레트(Celadon & Hanji), 폰트 규칙을 그대로 쓴다.
- 압박 마케팅 규칙(`PRODUCT.md`): 불안·공포 소구 키워드와 문구는 쓰지 않는다. "불행한 날", 건강·사망 예측 같은 주제는 제외.

## 제약
- 경로 전환은 기존 색인과 공유된 링크를 깨면 안 된다(리다이렉트로 보존).
- 배포 순서: 웹 먼저, 앱 OTA와 무관. 커밋·푸시는 사용자가 한다.
- 검증은 로컬 빌드 출력 기준: `npm run lint && npm run build`, `npx tsc --noEmit`.

## 완료 기준
- 모든 공개 페이지가 언어별 고유 URL을 가지고, hreflang·canonical·sitemap이 서로 일치한다(스크립트로 자동 점검).
- 옛 `?lang=` URL이 새 경로로 308 이동한다.
- 랜딩·계산기·일간 상세가 응답 헤더에서 캐시 가능하다(`no-store` 아님).
- Google 리치 결과 테스트(또는 스키마 검사 스크립트)에서 JSON-LD 오류 0.
- Android 스토어 링크가 웹 CTA에 연결돼 있다.
- 새 콘텐츠 페이지 첫 묶음이 sitemap에 들어간다.

## 사용자 결정 (2026-10-23 확정)
1. 언어 경로를 하위 경로(`/es/`, `/ko/`, 영어는 루트)로 옮긴다. 기존 `?lang=` URL은 308 리다이렉트로 보존.
2. 콘텐츠 첫 묶음: "일간 + 오행 궁합", "사주 vs 별자리", "사주 기둥 읽는 법" 계열 8~10개, en/es 우선.
3. 대표 도메인은 `https://www.fatesaidapp.com`.
