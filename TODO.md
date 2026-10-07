# TODO: 이달 달력 + 공유 이미지화 + 웹 SEO

기준 문서: `SPEC.md`(2026-10-07 승인). 이전 작업은 `SPEC_2026-10-07.md` / `TODO_2026-10-07.md`로 보관했다. 한 번의 `/work`에 항목 하나. 항목은 서로 독립이지만 "선행"이 적힌 것은 순서를 지킨다.

검증 명령 약칭 — 루트 타입: `npx tsc --noEmit` / 루트 빌드: `npm run lint && npm run build` / 앱 타입: `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit`. 화면 확인은 iOS 시뮬레이터 dev-client(구독자 화면은 `mobile-web`에서 못 본다). 결과에는 어느 쪽에서 확인했는지 적는다.

## A. 이달 달력 (앱 + 서버 한 줄)

- [x] 1. `/api/goodDays`에 `scope: "month"` 추가
  - 변경: `lib/goodDays.ts`(범위 계산을 순수 함수로 뽑고 `getGoodDays`에 범위 옵션: 없으면 오늘~+29일 그대로, `"month"`면 오늘~이번 달 말일 KST), `app/api/goodDays/route.ts`(`scope` 검증, 알 수 없는 값은 400 `bad_request`, 구독 확인보다 앞에서). 점수 규칙·개수(3~5, 리듬당 최대 2)는 그대로, 남은 날이 3일 미만이면 있는 만큼.
  - QA: `npx tsc --noEmit` 통과. 범위 함수 스크래치 확인 `npx tsx scripts/check-goodDays-range.mts`(새로 만들되 네트워크 없이 날짜만 주입): 10/1(31일 달)=31일치, 10/25=7일치, 10/31=1일치, 2월 말, scope 없음=30일치. 로컬 서버에 `curl -s -X POST localhost:3000/api/goodDays -H 'Content-Type: application/json' -d '{"selfDayMasterChar":"갑","purpose":"move","scope":"x"}'` → 400, `scope` 없이 같은 요청은 400이 아니라 기존대로 401(`no_user`).
  - QA: `npx tsx scripts/check-goodDays-range.mts` → 9건 모두 ok(10/1=31, 10/25=7, 10/31=1, 평년 2/28=1, 윤년 2/1=29, scope 없음=30). `npx tsc --noEmit` → 오류 없음. 로컬 `next dev`(3100) curl: `scope:"x"` → 400 bad_request, scope 없음·`scope:"month"` → 401 no_user. (구독 통과 후 실제 응답은 RevenueCat이 필요해 서버에서만 확인 가능 — 이달 탭 연동은 4번 시뮬레이터 QA에서)

- [x] 2. 저널의 달력 칸 코드를 공용 부품으로 뽑기
  - 변경: `mobile/components/`에 월 격자 부품(칸 배열 만들기·요일줄·격자 스타일, 칸 안 내용은 바깥에서 받음). `mobile/screens/JournalScreen.tsx`가 그걸 쓰도록. 저널의 모습·동작은 바뀌면 안 된다.
  - QA: 앱 타입 통과. 시뮬레이터에서 저널을 열어 변경 전과 같은지(요일 위치·기록 있는 날 배경·선택 테두리·오늘 테두리·달 이동) 스크린샷 비교.
  - QA: 앱 타입(`tsc --noEmit`) → 오류 없음. iOS 시뮬레이터 dev-client(한국어): 10월 1일=목, 9월 1일=화로 요일 위치 일치, 기록한 7일 칸에 배경+선택 테두리, 이전 달 이동 정상(기록 없음 문구). 새 부품 `mobile/components/MonthGrid.tsx`(`buildMonthCells` + 요일줄·격자·칸 껍데기, 칸 안은 `renderDay`). 스타일 값은 기존 저널 것을 그대로 옮김. 변경 전 스크린샷은 찍지 않아 나란히 비교는 못 했고, 위 항목들로 확인.

- [x] 3. 이달 탭을 달력으로 (칩 없이: 리듬 색 + 오늘 + 날짜 상세)
  - 선행: 2
  - 변경: `mobile/screens/FortuneScreen.tsx` 이달 탭(`weekList`와 "가장 좋은 날/페이스 조절" 카드 두 장을 달력 + 상세 카드로 대체. `goodDaysEntry`는 유지). 리듬 5가지 색은 기존 팔레트 토큰에서 정해 한 곳(예: `mobile/lib/rhythmColors.ts`)에 둔다. 고르는 리듬은 빨강·주황·경고 표시 없이 가장 차분한 중립 톤. 오늘 테두리, 지난 날은 옅게, 처음 들어오면 오늘 선택. 상세 카드 = 날짜 + `rhythmNames` + 기존 한 줄(고르는 리듬이면 `paceFree*` 톤). 칸 접근성 라벨 = 날짜 + 리듬 이름, `MAX_FONT_SCALE.control`. ko/en/es 문구(상세 카드 라벨, 접근성 라벨)를 `ko.ts` `en.ts` `es.ts`에 같이.
  - QA: 앱 타입 통과. 시뮬레이터(구독 상태)에서 이달 탭 스크린샷 3언어: 해당 달 1일 요일이 기기 달력과 일치, 오늘 표시, 고르는 리듬 칸에 붉은 계열 없음, 날짜 누르면 상세 카드가 바뀜. 글자 크기를 키워도 격자가 깨지지 않음.
  - QA: 앱 타입(`tsc --noEmit`) → 오류 없음. **mobile-web 미리보기 + `?qa=pro` 구독자 모드**(시뮬레이터 dev-client는 구독 상태를 만들 수 없어 쓰지 못함, 실제 `/api/dailyFortune` 응답): ko·en·es 모두 2026년 10월 1일=목, 오늘(8일) 테두리, 지난 날 옅게, 날짜 누르면 상세 카드(날짜·리듬 이름·한 줄)가 바뀜, 고르는 리듬 칸(en 10/9·10·19·20·29·30)은 회색 중립 톤(붉은 계열 없음, 접근성 라벨 "10/19 (Mon), A pacing rhythm"). 새 파일 `mobile/lib/rhythmColors.ts`, 문구 `fortune.monthCellLabel`(ko/en/es). 고르는 리듬 날의 상세는 `paceFreeHeadline`. 글자 크기 확대(`MAX_FONT_SCALE.control` 적용)는 웹에서 흉내 내기 어려워 못 봄 → 5번 마감 QA 또는 (사용자 확인) 실기기에서.

- [x] 4. 목적 칩 + 좋은 날 강조 + 이유 한 줄
  - 선행: 1, 3
  - 변경: `FortuneScreen.tsx` 이달 탭 위쪽에 칩 5개(`GOOD_DAYS_CONTENT[locale].purposes` 라벨 재사용, 처음엔 선택 없음, 같은 칩 다시 누르면 해제, 한 번에 하나). 칩을 누를 때만 `/api/goodDays`를 `scope: "month"`로 호출(칩별 결과는 화면이 떠 있는 동안 보관해 재호출 안 함, 일괄 호출 없음). 돌아온 날을 달력에서 강조, 선택한 강조일의 상세 카드에 `goodDayReason`(같은 리듬 두 번째 날은 두 번째 문구). 로딩은 칩 줄 안, 오류는 `goodDays.verifyError`/`fortune.loadErrorText` + 다시 시도(달력과 리듬 색은 유지). 0개일 때 차분한 한 줄. `track("calendar_purpose", {kind})`는 앱·서버 이벤트 이름 목록(`lib/eventSchema.ts`, `mobile/lib/analytics.ts`)을 함께 고친다. 문구 ko/en/es.
  - QA: 앱 타입 + 루트 `npx tsc --noEmit` 통과. 시뮬레이터: 칩 선택 시 네트워크 호출이 칩당 1회(Metro 로그 또는 서버 로그), 강조일이 모두 오늘 이후·이번 달 안, 칩 해제/전환/재선택 동작, 강조된 날 상세에 이유 한 줄. 서버를 끄고 칩을 누르면 오류 + 다시 시도, 달력은 그대로.
  - QA: 앱 타입·루트 `tsc --noEmit` → 오류 없음, `npm run lint` → 경고·오류 없음. **mobile-web `?qa=pro` + 브라우저에서 `/api/goodDays` fetch를 가로채 가짜 응답·호출 기록**(운영 서버는 아직 `scope`를 모르고 구독 확인도 못 넘겨서, 시뮬레이터/실서버로는 성공 경로를 못 봄): 칩 탭마다 요청 body가 `purpose`+`scope:"month"` 1회, 같은 칩 해제→재선택은 재호출 없음(탭 4번에 호출 2번), 다른 칩 전환 시 강조 교체, 강조일(이번 달·오늘 이후)에 금색 테두리+점, 강조일을 누르면 상세 카드에 "Good day for Job interview" + 이유 한 줄. 서버 오류(500) 시 "Couldn't load your fortune." + "Try again", 달력·리듬 색 유지, 다시 시도하면 해제됨. ko·en·es 칩 줄 줄바꿈 정상. 이벤트 `calendar_purpose`(kind=목적)를 `lib/eventSchema.ts`·`mobile/lib/analytics.ts`에 추가. 남은 것: 실제 서버 응답(`scope:"month"` 배포 후)과 시뮬레이터 확인은 5번 마감 QA 또는 (사용자 확인) 웹 배포 뒤 실기기에서. 서버를 끄고 누르는 확인은 500 응답 모사로 대신함.

- [x] 5. 달력 마감 QA (월말·1일·3언어)
  - QA: `npx tsx scripts/check-goodDays-range.mts` → 9건 모두 ok(10/1=31, 10/25=7, 10/31=1, 2/28=1, 2/1 윤년=29, scope 없음=30). 루트 `npx tsc --noEmit`·앱 `tsc --noEmit` → 오류 없음. `GoodDaysScreen.tsx`는 이번 달력 커밋 4개에서 변경 없음(`git diff HEAD~4` 무변경) → 30일 목록 회귀 없음. **mobile-web `?qa=pro` + `/api/goodDays` fetch를 `{goodDays:{days:[]}}`로 가로채** 월말(남은 날 0개) 모사: ko·en·es 모두 칩 1회 호출(`scope:"month"`) 뒤 오류 없이 차분한 한 줄("이번 달은 남은 날이 적어요…" / "Not many days are left this month…" / "Quedan pocos días este mes…")만 뜨고 달력·리듬 색 유지, 칩 줄 줄바꿈 정상. 코드 수정 없음(문제 없었음). 시뮬레이터 dev-client는 구독 상태를 못 만들어 쓰지 않음(3번과 같은 이유).
  - 못 본 것: 글자 크기 확대 시 격자(웹에서 흉내 불가), 실제 서버의 `scope:"month"` 응답(웹 배포 뒤) → 아래 (사용자 확인).
  - 선행: 4
  - 변경: 문제가 나온 곳만 고친다(새 기능 금지).
  - QA: 서버 스크래치(1번 스크립트 재사용)로 1일·월말 범위 확인. 시뮬레이터 날짜를 바꾸거나 `getGoodDays` 호출 인자로 월말을 흉내 내 월말(남은 날 < 3, 0개)에서 오류가 아닌 차분한 한 줄이 나오는지 확인. ko·en·es 각각 이달 탭 스크린샷, `GoodDaysScreen`(30일 목록)이 전과 같은지. 앱 타입 + 루트 타입 통과.
  - [ ] (사용자 확인) 웹 배포 + OTA 뒤 실기기에서: ① 이달 탭 달력의 색이 햇빛 아래에서도 구분되는지, ② 기기 설정 > 글자 크기를 최대로 키워도 격자 칸이 깨지지 않는지, ③ 칩을 누르면 실제 서버 응답으로 이번 달 안·오늘 이후 날만 금색으로 강조되는지.

## B. 공유 버튼을 전부 이미지로 (앱)

- [ ] 6. 공통 이미지 공유 카드 + 오늘 총론 공유
  - 변경: `mobile/components/TextShareCard.tsx`(새, `TypeScreen`의 `shareCard` + 미리보기 라벨 방식과 같은 골격: `FATESAID` 브랜드 줄, 눈썹, 큰 한 줄, 본문 2~3문장, 아래 `fatesaidapp.com` 글자). `captureRef(width: 1080)` + `Sharing.shareAsync` 헬퍼는 기존 화면 코드와 같은 방식으로. `FortuneScreen.tsx`의 `shareOverview`(228줄)를 이미지 공유로. 고르는 리듬(`otherChallengesSelf`)의 날은 `paceFree*` 톤 문장을 카드에 쓴다. `track("share", {kind: "fortune_overview"})` 유지. 문구 ko/en/es. 웹 미리보기는 `Sharing.isAvailableAsync()`가 거짓이면 조용히 끝.
  - QA: 앱 타입 통과. 시뮬레이터에서 총론 공유 → 공유 시트에 PNG가 올라가고 메시지/저장 시 글자가 아니라 이미지(스크린샷). 고르는 리듬 날(기기 날짜가 아니라 해당 리듬이 나오는 계정/날로 확인, 어려우면 카드에 넘기는 문장을 로그로 확인)과 일반 날 한 장씩. 긴 문장이 잘리지 않음.
  - 구현 완료, 네이티브 확인만 남음: `mobile/components/TextShareCard.tsx`(카드 + `shareCardImage` 캡처·공유 헬퍼, 7번이 재사용), `FortuneScreen.tsx`의 `OverviewShare`(무료·구독 두 자리, 고르는 리듬 날은 `paceFree*` 문장을 카드에 씀), 문구 `common.shareCardPreviewLabel`·`fortune.shareCardEyebrow`(ko/en/es).
  - QA(부분): 앱 타입(`tsc --noEmit`) → 오류 없음. mobile-web `?qa=pro`(es 픽스처): 총론 카드 아래 "Vista previa de la imagen para compartir" 틀 안에 FATESAID·"Resumen de hoy · Un ritmo generoso"·큰 한 줄·본문 2문장·`fatesaidapp.com`이 그려지고, Compartir 버튼을 눌러도 콘솔 오류 없음(웹은 `Sharing`이 없어 조용히 끝). 못 본 것: 시뮬레이터/실기기의 PNG 공유 시트, 고르는 리듬 날의 카드 문장(코드 분기만 확인), ko·en 긴 문장 잘림.
  - [ ] (사용자 확인) dev-client(시뮬레이터 또는 실기기)에서 오늘 탭 "공유하기" → 공유 시트에 PNG가 올라가고 메시지에 붙이면 이미지로 보이는지, 카드에 앱 이름과 주소 글자가 있고 문장이 안 잘리는지(ko·en·es). 고르는 리듬 날(예: 이달 달력에서 "고르는 리듬"으로 칠해진 날짜가 오늘일 때)은 카드에 "자기 페이스를 지키는 날" 문장이 나오는지.

- [ ] 7. 리포트 3곳 이미지 공유
  - 선행: 6
  - 변경: `ReportScreen.tsx`(901줄 `handleShare`), `CompatReportScreen.tsx`(255줄), `YearReportScreen.tsx`(230줄)를 6번 카드로 교체. 지금과 같은 분량(한 줄 요약/부제 + 출처)만, 닉네임·생년월일·상대 이름 넣지 않기. kind 3개(`report_summary`, `compat_report_summary`, `year_report_summary`) 그대로. 문구 ko/en/es.
  - QA: 앱 타입 통과. 시뮬레이터에서 세 곳 각각 공유 → PNG 확인(스크린샷). 이미지에 이름·날짜 같은 개인정보가 없음. 긴 부제 하나씩 ko/en/es로 잘림 확인.

- [ ] 8. 공유 마감 QA
  - 선행: 7
  - 변경: 문제가 나온 곳만.
  - QA: `grep -rn "Share.share" mobile/screens mobile/components`로 남은 텍스트 공유가 초대 링크 두 곳(`CompatibilityScreen`, `CoupleModeSection`)뿐인지 확인. 초대 링크 공유는 시뮬레이터에서 전과 같이 링크 텍스트. 이벤트 `share`의 kind 4개가 나가는지 Metro/서버 로그 확인. 앱 타입 통과.

## C. 웹 SEO (웹만, 앱 변경 없음)

- [ ] 9. 랜딩 서버 언어 (C0 앞부분: 결정·렌더·메타)
  - 변경: 언어 결정 함수(`?lang=` → 쿠키 → `Accept-Language` → en, 한 곳)와 이를 쓰는 `app/page.tsx`(서버에서 언어 결정, `LocaleProvider`에 시작 언어를 넘김, 마운트 뒤 `localStorage`로 덮어쓰지 않음), `app/layout.tsx`(`<html lang>`·제목·설명을 요청 언어로), `generateMetadata`의 canonical·hreflang(`/`, `/?lang=ko`, `/?lang=es`, `x-default`=`/`), 응답에 `Vary: Accept-Language`. 필요하면 `middleware.ts`에서 요청 헤더로 언어를 넘기되 기존 `/api` CORS 동작은 그대로. `lib/i18n/LocaleContext.tsx` 주석의 "첫 화면 한국어" 한계 문구 갱신.
  - QA: 루트 `npx tsc --noEmit`, `npm run lint && npm run build`. `npm run start` 후 `curl -s -H "Accept-Language: ko-KR" localhost:3000/ | grep -o '<html[^>]*>'`가 `lang="ko"`, `en-US`·`es-MX`·헤더 없음은 en·es·en, `?lang=es`는 헤더가 ko여도 es. en 요청 HTML 본문에 한국어 히어로 문구가 없음(`curl … | grep` 로 확인). `curl -sI`에 `vary`.

- [ ] 10. 랜딩 서버 언어 마무리 + sitemap/robots + 계산기 링크
  - 선행: 9
  - 변경: 랜딩 언어 버튼이 쿠키에도 저장(`Landing.jsx`), `app/sitemap.ts`(랜딩·계산기 3개 언어 URL, 글 URL은 11번 이후 목록 상수를 읽어 자동 포함), `app/robots.ts`, 랜딩에서 `/saju-calculator`로 가는 링크(언어 유지).
  - QA: `npm run lint && npm run build` 통과. `npm run start` 후 `curl -s localhost:3000/sitemap.xml`·`/robots.txt` 열림, sitemap에 `xhtml:link` 대체 주소 포함. 브라우저 미리보기에서 언어 버튼 → 새로고침해도 유지(쿠키), 쿠키 지운 뒤 `Accept-Language: ko`에서 한국어 유지(한국 방문자 회귀 확인).

- [ ] 11. 일간 글 골격 + 샘플 1편(oak 갑)
  - 선행: 9
  - 변경: `lib/seoArticles/`(글 타입, 유형 10개 목록, 샘플 `oak.ts` ko/en/es), `app/day-master/page.tsx`(목록), `app/day-master/[type]/page.tsx`(서버 렌더, 모르는 슬러그는 404, `?lang=` 없으면 9번 결정 함수), `generateMetadata`(제목·설명·canonical·hreflang 같은 일간의 다른 언어 둘), JSON-LD `Article`, 내부 링크(같은 일간 다른 언어·목록·`/saju-calculator`·다른 일간 2~3개), 아래쪽 앱 안내(랜딩·계산기가 쓰는 설치 안내 상태 그대로). 이벤트가 필요하면 `lib/eventSchema.ts`와 `logEvent` 목록을 함께.
  - QA: 루트 타입, `npm run lint && npm run build` 통과. `npm run start` 후 `/day-master/oak`, `?lang=ko`, `?lang=es`, `/day-master`가 200, 모르는 슬러그 404. `curl`로 `<title>`·canonical·hreflang·`application/ld+json` 확인.

- [ ] 12. 일간 글 — 갑·을·병 (oak 보강, vine, sun) × ko/en/es
  - 선행: 11
  - 변경: `lib/seoArticles/oak.ts`(샘플 다듬기), `vine.ts`, `sun.ts`. 하위 에이전트에게 나눠 초안을 맡기고 메인 세션이 검수. 앱 `mobile/lib/dayMasterLessons/<유형>.ts`를 기준 자료로만 쓰고 문장을 복사하지 않는다. 분량 en 600~900단어, ko 1,500~2,200자, es는 en과 같은 분량. es는 `lib/i18n/README.md` 스타일 가이드. 압박 규칙(SPEC C 제약) 준수.
  - QA: 루트 타입 통과. 분량 스크립트(언어별 단어/글자 수 범위), 금지 표현 grep(예: `grep -rniE "반드시 망|불길|재앙|사고|죽|파산|will lose|disaster|doom|scientifically proven|과학적으로 증명|garantiz" lib/seoArticles`) 무결과, 세 편 모두 ko/en/es 200.

- [ ] 13. 일간 글 — 정·무·기 (flame, mountain, field) × ko/en/es
  - 선행: 11
  - 변경·QA: 12번과 같다(파일 `flame.ts` `mountain.ts` `field.ts`).

- [ ] 14. 일간 글 — 경·신 (steel, gem) × ko/en/es
  - 선행: 11
  - 변경·QA: 12번과 같다(파일 `steel.ts` `gem.ts`).

- [ ] 15. 일간 글 — 임·계 (ocean, dew) × ko/en/es
  - 선행: 11
  - 변경·QA: 12번과 같다(파일 `ocean.ts` `dew.ts`).

- [ ] 16. SEO 마감 QA (30편 전체)
  - 선행: 10, 12, 13, 14, 15
  - 변경: 문제가 나온 곳만.
  - QA: 루트 `npx tsc --noEmit`, `npm run lint && npm run build` 통과. `npm run start` 후 링크 크롤 스크립트(새로 만들어도 됨, `scripts/check-seo-links.mts`)로 `/sitemap.xml`의 모든 URL이 200이고 글 30편(10 × 3언어)이 모두 sitemap에 있으며 글 안 내부 링크에 404가 없음. 30편의 `<title>`이 서로 다르고 canonical이 자기 자신. 금지 표현 grep 무결과. `Accept-Language: ko`·`en`·`es`·없음 4가지로 `/` 확인 재실행.

## 사용자 실행 (마지막)

- [ ] 가. (사용자 실행) 웹 배포 — 먼저
  - A(1번 서버)·C(9~16번)는 웹이다. 커밋 → `git push origin main` → Vercel Ready 확인 → 배포 주소에서 `curl -s -H "Accept-Language: ko-KR" https://www.fatesaidapp.com/ | grep -o '<html[^>]*>'`와 `…/sitemap.xml`, `…/day-master/oak?lang=es` 확인. 앱(OTA)보다 먼저여야 한다(앱의 `scope: "month"`를 서버가 모르면 이번 달 강조가 빈다).
  - 확인 후: Google Search Console에 sitemap 제출(원하면).

- [ ] 나. (사용자 실행) OTA — 웹 배포 뒤
  - A(2~5번)·B(6~8번)는 앱, 네이티브 변경 없음. `cd mobile && npx --yes eas-cli update --branch production --environment production --message "<이달 달력·공유 이미지>" --non-interactive`.
  - (사용자 확인) 실기기에서 이달 탭 칩/달력, 총론·리포트 공유가 이미지로 나가는지.

- [ ] 다. (사용자 실행) 이전 배치 배포와 실기기 확인 — `TODO_2026-10-04.md`의 A·B에서 옮김(직전 TODO A)
  - 순서·확인 항목은 `TODO_2026-10-04.md` A·B 그대로. 이번 작업을 배포하기 전에 먼저 끝내는 것을 권장.

- [ ] 라. (사용자 실행) 스토어·RevenueCat 설정 — 직전 TODO C
  - 구독: 7일 무료 체험(intro offer), 연간 요금제(가격 결정) — App Store Connect·Play Console 등록 후 RevenueCat 오퍼링에 연간 패키지 추가.
  - 새 상품: `compat_report`(소모성, $6.99 가정), `report_module12`(비소모성, $14.99) — 양 스토어 등록, RevenueCat entitlement·오퍼링 연결, 번들 상품에 `report_module12` entitlement 추가.
  - Apple 2.3.1(a) 심사 회신 결과를 본 뒤 시점 결정.

- [ ] 마. (사용자 실행) 개인정보 문서 갱신 — 직전 TODO D
  - 방침·약관 본문(`lib/legalContent.ts` ko/en/es)은 2026-10-07에 새로 씀. 남은 것: 운영자(사업자) 정보 추가(값 제공), App Store 개인정보 라벨·Play 데이터 보안 양식(`USER_ACTIONS_C_D.md` D-2·D-3).

- [ ] 바. (사용자 실행) 스토어 빌드 배포 — 직전 TODO E
  - 직전 12번(새 출발 모듈·위젯·리뷰 요청)만 EAS 프로덕션 빌드 → TestFlight·Play 내부 테스트 → 스토어 제출. 나머지 배치는 항목마다 커밋 → push → Vercel Ready → OTA.

## 발견 사항

