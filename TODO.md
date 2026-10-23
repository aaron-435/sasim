# TODO: 웹 SEO 보강

`SPEC.md` 기준. SPEC 승인 완료(2026-10-23). 항목마다 **새 세션에서 `/work`로 하나씩** 처리한다. 이전 작업 기록은 `TODO_2026-10-20_choicechat_v4.md`.

공통 메모:
- 루트 검증: `npx tsc --noEmit`, `npm run lint && npm run build`
- 웹만 건드린다. 커밋·푸시·배포는 사용자가 한다. 문구는 Opus가 쓴다.
- 3개 파일 이상 반복 구현은 muse(표준 모델)에 위임, 메인이 검수.

- [x] 1. SEO 현황 점검 스크립트
  - 변경: `scripts/check-seo.mts`(새 파일). 빌드된 서버를 띄워 모든 공개 URL의 title, description, canonical, hreflang 상호성, JSON-LD 유효성, `Cache-Control`, sitemap 일치를 출력한다. 이후 모든 항목의 QA 기준선이 된다.
  - QA: `npm run build && npx next start` 후 `npx tsx scripts/check-seo.mts` → 현재 상태의 실패 목록을 읽고 TODO에 기록.
  - QA: `npm run build` 통과 → `next start -p 3100` + `npx tsx scripts/check-seo.mts http://localhost:3100` → 39 URL, FAIL 0, WARN 49. 서버를 내리면 종료 코드 1(접속 실패를 잡음). `npx tsc --noEmit` 오류 없음.
  - 사용법: 인자는 baseUrl(기본 3000). FAIL = 구조 오류(title·description·canonical 자기 참조·`<html lang>`·hreflang 페이지=sitemap 일치와 상호성·JSON-LD 파싱·robots Sitemap 줄). WARN = 이후 항목이 해결할 알려진 빈틈(캐시, JSON-LD 없음, `?lang=` 308, 중복 description).
  - 기준선(현재 WARN): ① 39개 URL 모두 `private, no-cache, no-store` → TODO 3 ② JSON-LD 없는 페이지 9개(랜딩 3, 계산기 3, `/day-master` 목록 3) → TODO 4 ③ `/day-master/oak?lang=es`가 200(308 아님) → TODO 2. build 출력상 `/`, `/saju-calculator`, `/day-master`, `/day-master/[type]`, privacy 등 전부 `ƒ`(동적).
  - 한계: 응답 헤더·HTML 정적 검사만 한다(Google 리치 결과 테스트 대체 아님). `/privacy`·`/terms`는 sitemap에 없어 검사 밖.

- [x] 2. 언어 경로 전환 (결정 확정)
  - 선행: 1
  - 변경: `middleware.ts`(`/es`, `/ko` 접두 처리, `?lang=` → 308), `app/` 라우트 구조, `app/sitemap.ts`, hreflang·canonical, 내부 링크 헬퍼(`articlePath` 등), 모바일 앱이 여는 웹 URL이 있으면 호환 확인.
  - QA: check-seo 통과, `curl -I "/day-master/oak?lang=es"` → 308 `/es/day-master/oak`, 기존 `/` `/saju-calculator` 200.
  - QA: `npx tsc --noEmit`, `npm run lint`, `npm run build` 통과 → `next start -p 3100`에서 `/day-master/oak?lang=es` 308 `/es/day-master/oak`, `/?lang=ko` 308 `/ko`, `/saju-calculator?lang=ko&utm_source=x` 308 `/ko/saju-calculator?utm_source=x`, `/en/day-master/oak` 308 `/day-master/oak`, `/es/...` `/ko` `/` `/saju-calculator` 200, `/es/nope` 404. `check-seo.mts` → 39 URL, FAIL 0, WARN 48(legacy 308 경고 사라짐, 남은 건 캐시·JSON-LD로 TODO 3·4). `check-seo-links.mts` → ALL OK.
  - 구현: `lib/i18n/paths.ts`(`localizedPath`, `splitLocalePath`, `isLocalizedSeoPath`)가 규칙의 단일 출처. `middleware.ts`가 SEO 경로(`/`, `/saju-calculator`, `/day-master…`)의 `/ko`·`/es` 접두를 내부적으로 `?lang=`로 rewrite하고(페이지 코드는 그대로), `?lang=`·`/en/…`는 308. SEO 경로는 쿠키·Accept-Language를 더 보지 않아 URL 하나 = 언어 하나. 그 밖의 경로(법적 페이지, `/c`, `/p`, 404)는 예전 규칙 유지.
  - 행동 변화(사용자 판단 필요): 예전엔 스페인어 브라우저로 `/`에 오면 스페인어로 보였지만, 이제 `/`는 항상 영어이고 스페인어는 `/es`다. 광고 링크는 `/es`로 걸어야 한다. 필요하면 `/` 한정 Accept-Language 리다이렉트를 따로 검토.
  - 이어서 TODO 3: 지금은 rewrite가 `?lang=`를 만들어 페이지가 동적이다. `[locale]` 폴더 구조로 옮기면서 정적화.

- [x] 3. 캐시 가능 렌더로 전환
  - 선행: 2
  - 변경: 언어를 경로에서 읽어 `headers()`·`cookies()` 의존을 제거(`app/layout.tsx`의 `LOCALE_HEADER`, 랜딩 여부 헤더). 정적/ISR 대상 확인.
  - QA: build 출력에서 해당 라우트가 `●`/`○`(정적·SSG)로 나오고, `curl -I`에 `no-store`가 없다.
  - QA: `npm run lint`, `npx tsc --noEmit`, `npm run build` 통과 → build 출력에서 `/[locale]`, `/[locale]/saju-calculator`, `/[locale]/day-master`, `/[locale]/day-master/[type]`가 `●`(SSG, 40개 HTML 생성). `next start -p 3100`에서 `/` `/ko` `/es` `/saju-calculator` `/es/saju-calculator` `/day-master` `/ko/day-master/oak` 모두 200 + `Cache-Control: s-maxage=31536000, stale-while-revalidate`(no-store 아님). `?lang=`·`/en/` 308 유지, `/es/nope`·`/nope`·`/es/day-master/nope` 404(언어별 문구), `/privacy` 동적 유지. `check-seo.mts` → 39 URL, FAIL 0, WARN 9(캐시 경고 사라짐, 남은 건 JSON-LD로 TODO 4). `check-seo-links.mts` → ALL OK.
  - 구현: 루트 레이아웃을 `app/(site)/[locale]/layout.tsx`(정적)와 `app/(legal)/layout.tsx`(동적)로 나눔. 공용 틀 `components/RootShell.tsx`(기존 `app/layout.tsx` 이동). 페이지는 `searchParams` 대신 `params.locale`을 받고 랜딩 canonical·hreflang은 이제 페이지 `generateMetadata`에서 낸다(`LANDING_HEADER` 제거). middleware는 `?lang=` 대신 경로 rewrite. 404는 `(site)` 쪽이 `headers()`를 쓰면 모든 페이지가 동적이 되므로 `components/NotFoundView.tsx`(클라이언트, URL 접두로 언어 결정)를 씀. 미등록 URL은 `app/(legal)/[...slug]/page.tsx`가 404로 보냄(루트 레이아웃이 둘이면 `app/not-found`가 안 쓰임).
  - 사이트맵 변경: 영어 랜딩 URL을 슬래시 없는 `https://www.fatesaidapp.com`으로(Next가 canonical을 그렇게 출력).
  - 한계: 404 `<title>`은 `(site)` 쪽에서 영어 고정("Fatesaid", noindex). 404 meta description은 빠짐. `requestLocale`은 법적 페이지 메타(`lib/legalMeta.ts`)만 씀.

- [x] 4. JSON-LD 보강
  - 변경: 랜딩(Organization, MobileApplication), 계산기(WebApplication), 일간 상세(BreadcrumbList 추가). 공통 헬퍼 `lib/jsonLd.ts`.
  - QA: check-seo의 JSON-LD 검사 통과, 스키마 검사에서 오류 0.
  - QA: `npx tsc --noEmit`, `npm run lint`, `npm run build` 통과 → `next start -p 3100` + `check-seo.mts` → 39 URL, FAIL 0, WARN 0(JSON-LD 경고 사라짐). curl로 확인한 타입: 랜딩 `/`·`/es` = Organization·WebSite·MobileApplication·FAQPage, 계산기 = WebApplication·BreadcrumbList, `/day-master` = BreadcrumbList·ItemList, 일간 상세 = Article·BreadcrumbList.
  - 구현: `lib/jsonLd.ts`(빌더), `components/JsonLd.tsx`(`<` 이스케이프 렌더). MobileApplication은 Android만(`operatingSystem: "Android"`, `installUrl`=Play 링크), iOS 승인 뒤 추가. FAQPage는 랜딩에 실제로 보이는 FAQ(`landing.faq`)만 사용. Organization `logo`는 쓸 만한 공개 이미지 URL이 없어 뺌.
  - 한계: check-seo는 구조(파싱, @context/@type)만 본다. Google 리치 결과 테스트는 (사용자 확인) 배포 후 `https://search.google.com/test/rich-results`에 랜딩·계산기·일간 상세 URL을 넣어 오류 0인지 확인.

- [x] 5. 앱 설치 링크 (Android 먼저)
  - 변경: `lib/i18n/{en,ko,es}.ts`의 "coming soon" 문구에서 Android를 Play 링크로, iOS는 유지. 설치 버튼 컴포넌트(웹 랜딩, 일간 상세, 계산기).
  - QA: 세 언어 렌더 확인(mobile 프리셋 스크린샷), 링크 `https://play.google.com/store/apps/details?id=com.fatesaid.app` 응답 확인.
  - QA: `npx tsc --noEmit`, `npm run lint`, `npm run build` 통과 → `next start -p 3100`에서 `/` `/ko` `/es` `/saju-calculator` `/es/saju-calculator` `/ko/day-master/oak` HTML에 Play 링크와 언어별 버튼 문구(Get it on Google Play / Google Play에서 받기 / Disponible en Google Play) 확인, Play URL curl 200, `check-seo.mts` → 39 URL, FAIL 0, WARN 0. (mobile 프리셋 스크린샷은 찍지 않음: HTML 출력과 빌드로만 확인)
  - 구현: 공용 `components/AppInstall.tsx`(Play 버튼 + "iOS는 곧" 한 줄)를 랜딩 하단, 유형 카드, 계산기, 일간 상세, 초대, Q&A 완료 화면(가짜 점선 배지 대체)에 넣음. i18n `common.playCta`·`iosSoon` 추가, `appNote`·`appComingSoonLabel` 삭제, `appBody`의 "곧 iOS와 Android" 문장 삭제. Q&A의 인증번호 안내·"앱은 아직 출시 전" 문구도 출시 사실에 맞게 고침.
  - (user check) 눈으로 확인: 모바일 폭에서 버튼 모양(초록 버튼, 계산기·랜딩 하단). iOS 승인 후 App Store 링크 교체와 Smart App Banner는 별도 항목으로 이어서.

- [x] 6. 콘텐츠 설계와 첫 묶음 (주제 계열 확정, 8~10개 en/es 우선)
  - 변경: 주제 목록 + 페이지당 목표 검색어를 `SEO_CONTENT_PLAN.md`에 정리, 첫 3개 페이지(en/es) 작성, `lib/seoArticles` 형식 재사용 또는 확장.
  - QA: check-seo 통과, 새 페이지가 sitemap에 있다. 압박 마케팅 규칙 위반 문구 없음(사용자 확인).
  - QA: `npx tsc --noEmit`, `npm run lint`, `npm run build` 통과(`/[locale]/guides`, `/[locale]/guides/[slug]` `●` 정적) → `next start -p 3100` + `check-seo.mts` → 47 URL, FAIL 0, WARN 0. `check-seo-links.mts` → ALL OK. sitemap에 guides URL 포함, `/guides` `/es/guides` 200, `/ko/guides` 404, `/guides?lang=es` 308 `/es/guides`, Cache-Control `s-maxage=31536000`.
  - 구현: `SEO_CONTENT_PLAN.md`(주제 10개 + 목표 검색어, 3개 작성). 새 경로 `/guides`, `/guides/<slug>`: `lib/seoGuides/`, `components/GuidePage.tsx`, `app/(site)/[locale]/guides/`. `lib/i18n/paths.ts`에 `/guides` 추가, sitemap은 글이 있는 언어(en/es)만 URL·hreflang에 넣음(ko 없음). `DayMasterPage`의 `Shell`을 export하고 언어 버튼 목록을 선택 인자로 만듦. 첫 3개: 오행 궁합, 사주 vs 점성술, 사주 네 기둥 읽는 법(en/es).
  - (사용자 확인) 6개 글(en/es)의 문구가 압박 마케팅 규칙(나쁜 궁합 판정·예측·공포 소구 없음)에 맞는지, 스페인어 어투(tú/ustedes) 읽기. 글 본문은 모델이 쓴 것이라 사실 확인(천간합 5쌍, 상생·상극, 조합 수 "50만 개 이상" = 60×12×60×12)도 한 번 봐 주세요.

- [ ] 7. Search Console 등록 (user check)
  - 사용자 단계: 도메인 속성 추가 → DNS TXT 확인 → `https://www.fatesaidapp.com/sitemap.xml` 제출 → 색인 상태 1주 뒤 확인.
  - Claude가 도울 수 있는 것: Chrome에서 화면을 같이 보며 안내.

## 발견 사항
- (TODO 6) `/guides`로 가는 내부 링크가 아직 없다(sitemap에만 있음). 랜딩 하단·`/day-master` 목록·일간 글에서 링크를 거는 건 글이 늘 때(두 번째 묶음) 함께.
- (TODO 6) 가이드 Article JSON-LD는 일간 글처럼 `datePublished` 없음. 필요하면 별도 항목.
- (TODO 2) 법적 페이지(`/privacy`, `/terms`, `/data-deletion`)는 색인 가치가 낮고 앱이 `?lang=` URL로 링크하므로 접두 경로로 옮기지 않고 `?lang=` 유지로 결정. sitemap에도 계속 제외.
- (TODO 2) `components/Landing.jsx`의 언어 버튼은 클라이언트 상태만 바꾸고 URL은 그대로다. `/`에서 스페인어를 눌러도 canonical은 영어 URL. TODO 3~5에서 `/es`로 이동하는 링크로 바꿀지 판단.
- (TODO 1) `/privacy`, `/terms`, `/data-deletion`은 sitemap에 없고 canonical·JSON-LD 상태 미확인. 법적 페이지라 색인 필요성은 낮지만 TODO 2에서 경로 규칙을 정할 때 함께 결정.
- (TODO 1) 중복 meta description 검사는 WARN으로만 둠(언어별 페이지는 설명이 같을 수 있어서).
