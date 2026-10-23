# TODO: 웹 SEO 보강

`SPEC.md` 기준. SPEC 승인 완료(2026-10-23). 항목마다 **새 세션에서 `/work`로 하나씩** 처리한다. 이전 작업 기록은 `TODO_2026-10-20_choicechat_v4.md`.

공통 메모:
- 루트 검증: `npx tsc --noEmit`, `npm run lint && npm run build`
- 웹만 건드린다. 커밋·푸시·배포는 사용자가 한다. 문구는 Opus가 쓴다.
- 3개 파일 이상 반복 구현은 muse(표준 모델)에 위임, 메인이 검수.

- [ ] 1. SEO 현황 점검 스크립트
  - 변경: `scripts/check-seo.mts`(새 파일). 빌드된 서버를 띄워 모든 공개 URL의 title, description, canonical, hreflang 상호성, JSON-LD 유효성, `Cache-Control`, sitemap 일치를 출력한다. 이후 모든 항목의 QA 기준선이 된다.
  - QA: `npm run build && npx next start` 후 `npx tsx scripts/check-seo.mts` → 현재 상태의 실패 목록을 읽고 TODO에 기록.

- [ ] 2. 언어 경로 전환 (결정 확정)
  - 선행: 1
  - 변경: `middleware.ts`(`/es`, `/ko` 접두 처리, `?lang=` → 308), `app/` 라우트 구조, `app/sitemap.ts`, hreflang·canonical, 내부 링크 헬퍼(`articlePath` 등), 모바일 앱이 여는 웹 URL이 있으면 호환 확인.
  - QA: check-seo 통과, `curl -I "/day-master/oak?lang=es"` → 308 `/es/day-master/oak`, 기존 `/` `/saju-calculator` 200.

- [ ] 3. 캐시 가능 렌더로 전환
  - 선행: 2
  - 변경: 언어를 경로에서 읽어 `headers()`·`cookies()` 의존을 제거(`app/layout.tsx`의 `LOCALE_HEADER`, 랜딩 여부 헤더). 정적/ISR 대상 확인.
  - QA: build 출력에서 해당 라우트가 `●`/`○`(정적·SSG)로 나오고, `curl -I`에 `no-store`가 없다.

- [ ] 4. JSON-LD 보강
  - 변경: 랜딩(Organization, MobileApplication), 계산기(WebApplication), 일간 상세(BreadcrumbList 추가). 공통 헬퍼 `lib/jsonLd.ts`.
  - QA: check-seo의 JSON-LD 검사 통과, 스키마 검사에서 오류 0.

- [ ] 5. 앱 설치 링크 (Android 먼저)
  - 변경: `lib/i18n/{en,ko,es}.ts`의 "coming soon" 문구에서 Android를 Play 링크로, iOS는 유지. 설치 버튼 컴포넌트(웹 랜딩, 일간 상세, 계산기).
  - QA: 세 언어 렌더 확인(mobile 프리셋 스크린샷), 링크 `https://play.google.com/store/apps/details?id=com.fatesaid.app` 응답 확인.
  - (user check) iOS 승인 후 App Store 링크 교체와 Smart App Banner는 별도 항목으로 이어서.

- [ ] 6. 콘텐츠 설계와 첫 묶음 (주제 계열 확정, 8~10개 en/es 우선)
  - 변경: 주제 목록 + 페이지당 목표 검색어를 `SEO_CONTENT_PLAN.md`에 정리, 첫 3개 페이지(en/es) 작성, `lib/seoArticles` 형식 재사용 또는 확장.
  - QA: check-seo 통과, 새 페이지가 sitemap에 있다. 압박 마케팅 규칙 위반 문구 없음(사용자 확인).

- [ ] 7. Search Console 등록 (user check)
  - 사용자 단계: 도메인 속성 추가 → DNS TXT 확인 → `https://www.fatesaidapp.com/sitemap.xml` 제출 → 색인 상태 1주 뒤 확인.
  - Claude가 도울 수 있는 것: Chrome에서 화면을 같이 보며 안내.

## 발견 사항
(작업 중 기록)
