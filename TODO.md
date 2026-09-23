# TODO: 심층 리포트 무료 파트에 "다가오는 시기" 페이지 추가

SPEC.md 승인 완료(2026-09-22). 항목마다 새 세션에서 `/work`로 하나씩 처리.

- [x] 1. 프롬프트: 무료 미리보기 필드 추가 + 본편이 반복하지 않고 이어쓰게
  - 변경:
    - `lib/reportPrompts.ts` — `freeFields`에 `upcoming_period_preview_heading`/`upcoming_period_preview_body` 추가. 지시문은 기존 `upcoming_period_heading`/`body`의 톤 규칙(나이 숫자를 문장 맨 앞에 명확히, 기운 전환은 확정 문장, "머지않아/언젠가" 금지, 데이터 없으면 숫자 없이 일반 문장)을 재사용하되, 결과·이유·준비할 것은 쓰지 않고 나이+원소 전환 사실 + 감각적 장면만 쓰도록 명시.
    - `FREE_PART_TEXT_FIELDS` 배열에 두 필드명 추가(`describeFreePart()`가 paid 프롬프트의 "이미 쓰인 앞부분"에 자동 포함).
    - `paidFields`의 `upcoming_period_body` 지시문을 수정: 미리보기와 같은 문장 구조로 나이+원소 사실을 다시 여는 대신 곧바로 왜 의미 있는지·무엇이 달라지는지·무엇을 준비하면 좋을지로 들어가도록. (1차 초안은 "첫 문장부터 나이 숫자로 시작"을 그대로 남겨 미리보기 첫 문장과 거의 동일한 문장이 나오는 회귀가 실측으로 발견되어 재작성 — 아래 QA 참고.)
    - `describeUpcomingPeriod()`의 데이터 줄과 전역 규칙 4(스페인어 나이 문법 규칙)에 새 필드명 추가 — 실측에서 스페인어 미리보기가 "38 años marcan..."처럼 나이를 문법적 주어로 쓰는 위반이 나와 재확인 후 수정.
    - `lib/report.ts` — `ReportContent`와 `parseReport()`에 두 필드 추가(optional, `oheng_intro`/`quiz_reading`과 같은 패턴 — 이 날짜 이전 저장된 리포트엔 없음).
    - `lib/reportQuality.ts` — `checkDensity()`의 `need()` 목록에 `upcoming_period_preview_body`(최소 3문장) 추가. 나이 환각 검사(`path.startsWith("upcoming_period")`)는 접두어가 같아 코드 변경 없이 새 필드에도 자동 적용됨 — 코드 리뷰로 확인 완료.
  - QA: `npx tsc --noEmit`(루트) 통과. `npx tsx --env-file=.env.local scripts/gen-qa-fixtures.mts`를 3회 실행(7개 페르소나 전부 매번 `ok`) — 1회차: 스페인어 나이 문법 위반·미리보기/본편 첫 문장 중복 발견 → 프롬프트 수정 → 2·3회차 재생성으로 해결 확인. 최종 `mobile/dev/qaData.ts`의 `QA_DEEP_REPORT`에서 jisoo(ko)/mia(en)/lucia(es) 3개 언어 모두 `upcoming_period_preview_heading/body`와 `upcoming_period_heading/body`를 나란히 읽어 확인: (a) 미리보기 나이가 문장 앞쪽 숫자로 또렷하고 확정 문장 (b) 미리보기에 왜/준비 문장 없음, 장면 묘사만 (c) 본편이 미리보기와 같은 문장을 반복하지 않고 왜/변화/준비로 곧장 이어짐 — 복붙 수준 중복 없음. `checkReportDeterministic()`을 jordan/casey 최종 콘텐츠에 직접 재실행해 빈 배열(문제 없음) 확인.

- [x] 2. 화면: 무료 페이지 추가 (페이월 직전) + i18n
  - 선행: 1 (새 콘텐츠 필드가 응답에 있어야 화면에 연결 가능)
  - 변경:
    - `mobile/screens/ReportScreen.tsx` — 로컬 `ReportContent` 타입에 `upcoming_period_preview_heading?`/`upcoming_period_preview_body?` 두 필드 추가(older saved reports엔 없을 수 있어 optional). `pages` useMemo의 `body` 배열에서 원소별 해설 루프 다음·"이 줄 아래부터 유료 파트" 주석 앞에, 두 필드가 모두 있을 때만(구버전 저장 리포트 폴백) `locked` 없는 새 페이지 `upcoming-preview`를 push. 기존 `ForecastPage` 컴포넌트를 그대로 재사용(`heading`/`body`는 새 필드, `note`는 새 i18n 키 `upcomingGlimpseNote`). `sectionUpcomingPeriod` tocLabel을 이 새 페이지로 옮기고 잠긴 "upcoming" 페이지의 tocLabel은 제거(목차에 잠금/비잠금 중복 방지). `PaywallPage`의 `decadePreviewLine`은 손대지 않음.
    - `mobile/lib/i18n/{ko,en,es}.ts` — `upcomingPeriodNote` 바로 아래에 `upcomingGlimpseNote` 추가: CLAUDE.md 압박 규칙(이름만 대고 왜/할 일은 Pro에 잠근다) 톤. ko "왜 그런지, 무엇을 준비하면 좋을지는 이 리포트 뒤에서 이어집니다.", en "Why it matters, and what to do about it, continue later in this report.", es "Por qué importa y qué hacer al respecto continúa más adelante en este informe."
  - QA:
    - `cd mobile && ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` → 에러 없이 통과.
    - `mobile-web` 프리뷰(포트 8082, 375×812)에서 `?qa=free&persona=mia`(en)·`?persona=jisoo`(ko)·`?persona=lucia`(es) 3개 언어 모두 홈 → 샘플 심층 리포트 열어 확인. 페이지 넘김 스크린샷은 이 환경에서 탭 클릭과 애니메이션 스크롤 타이밍이 어긋나 카운터와 실제 렌더 페이지가 어긋나는 경우가 있어(가로 ScrollView가 전체 페이지를 한 번에 DOM에 렌더하는 구조), `get_page_text`로 전체 DOM 텍스트를 한 번에 덤프해 순서·잠금 상태·문구를 확인하는 방식으로 검증(스크린샷보다 신뢰도 높음). 세 언어 모두: (a) TOC의 "다가오는 시기"/"What's Coming"/"Lo que viene" 항목에 잠금 아이콘 없음(예: ko "05 다가오는 시기 ... 12") (b) DOM 순서상 마지막 원소 해설 다음·페이월 카드("여기부터는 심층 리포트예요"/"The in-depth report continues here"/"Aquí continúa el informe profundo") 바로 앞에 새 페이지가 위치 (c) heading에 나이가 문장 앞쪽 숫자로 또렷함 — ko "36세부터, 수의 계절이 열립니다", en "33 years old, the Water season opens", es "Desde los 38 años, se abre una etapa de fuego"(스페인어도 나이를 문법적 주어로 쓰지 않는 규칙 유지) (d) note 문구가 각 언어로 보임 (e) 커버의 "미리보기 N페이지" 문구(en "13 OF 40 PAGES", ko "12페이지 미리보기", es "12 DE 39 PÁGINAS")가 새 페이지를 포함해 자동으로 맞음(추가 카운팅 로직 없이).
    - TOC 항목 탭→해당 페이지 이동은 확인하지 못함: `TocPage`의 각 행이 애초에 `Pressable`이 아니라 탭이 불가능한 기존 구조(이번 변경과 무관, 발견 사항에 기록).
    - 정보 없음 폴백(생일 없는 구세션)은 픽스처가 항상 decadeFortune을 포함해 화면 재현이 어려우므로 코드 리뷰로만 확인: `if (content.upcoming_period_preview_heading && content.upcoming_period_preview_body)` 가드로 둘 중 하나라도 비면(구버전 저장 리포트, 폴백 문장 없음 등) 페이지 자체를 push하지 않아 빈 페이지가 뜨지 않음(이전 항목 2와 동일한 한계).

- [ ] 3. (사용자 실행) 배포 및 실기기 확인
  - 항목 1~2가 모두 `[x]`가 된 뒤: 웹(`app/api/report`, `app/api/report/paid`)이 Vercel에 배포됐는지 확인 → OTA(`eas update --branch production`) 발행 → TestFlight 또는 iOS 시뮬레이터 dev-client에서 실제 심층 리포트를 열어 새 무료 페이지와 구매 후 본편(잠긴 upcoming_period_body)이 서로 반복 없이 이어지는지 최종 확인
  - (사용자 확인) — 자동화 불가, 실제 리포트 생성 플로우와 실기기 필요

## 발견 사항

(작업 중 발견한 범위 밖 이슈를 여기 적는다.)

- `lib/reportQuality.ts`의 `checkReportDeterministic()`에는 스페인어 "나이 숫자를 문법적 주어로 쓰지 않는다" 규칙(reportPrompts.ts 규칙 4)을 코드로 검사하는 로직이 없다 — 지시문에만 의존. 이번에 `upcoming_period_preview_body`에서 실제로 위반("38 años marcan...")이 한 번 나왔었고 프롬프트 수정으로 해결했지만, 재발을 코드가 잡아주진 못한다. 범위 밖(이번 TODO는 프롬프트 필드 추가만).
- `lib/report.ts`의 `runReport()`가 가끔 "shipped with N unresolved code finding(s)"을 로그로 남긴 채 그대로 내보낸다(재시도 없음, 기존 동작) — 이번 실행에서도 페르소나별로 간헐적으로 발생. 새 필드와 무관해 보이나(직접 재검사 시 통과) 확인은 근사치 컨텍스트로 한 것이라 100% 같은 조건은 아님. 기존 파이프라인 동작이라 범위 밖.
- `mobile/screens/ReportScreen.tsx`의 `TocPage`는 각 행이 `View`일 뿐 `Pressable`이 아니라 목차 항목을 탭해도 해당 페이지로 이동하지 않는다(리포트 전체의 기존 구조, 이번 TODO 범위 밖). SPEC의 "TOC 탭→이동 확인" 완료 기준은 이 제약으로 코드 리뷰로만 확인(구조상 탭 자체가 불가능).
- (2026-09-22, 4개 페르소나 QA 서브에이전트 mia/lucia/jisoo/jordan 실사용 테스트에서 발견, 이번 TODO와 별개 세션) **페이월 미리보기 한 줄이 근거 없이 "좋은 말"처럼 읽힌다**는 지적을 mia·jisoo·jordan 3명이 독립적으로 함— 이 TODO의 항목 1·2(무료 "다가오는 시기" 페이지 추가)가 정확히 그 문제를 겨냥해 만들어진 것이라 실질적으로 해소된 것으로 보임. 배포 후 실기기 확인(항목 3) 때 이 관점도 같이 확인하면 좋음.
- (같은 QA에서 발견, 미해결) **신년 리포트 마무리(closing)가 심층 리포트 마무리(closing_body)보다 더 뭉뚱그려진 표현으로 끝나는 경향** — mia(en): "more focused, more grounded, more able to recognize what truly deserves your strength"(모듈에 안 묶인 일반론에 가까움), jordan(en): "Stay steady, stay specific"(같은 지적, "그냥 좋은 말"). `lib/yearReportPrompts.ts`의 closing 지시문(규칙 3-1)이 심층 리포트 `closing_body`만큼 "그 해에 실제로 한정된 구체적 결과"를 강하게 요구하지 않는 것으로 보임 — 심층 리포트 쪽 규칙(모듈 영역 한정 확정 문장, 보편적 약속 금지)과 같은 수준으로 강화하는 걸 고려할 것.
- (같은 QA에서 발견, 미해결, 이번 세션 작업과 무관한 기존 콘텐츠 이슈일 가능성) **신년 리포트 12개월 타임라인에서 3월만 신살(殺) 이름이 누락** — jisoo(ko) 확인: 2월(지살)·4월(월살)·5월(망신살)·6월(장성살)·7월(반안살)·8월(역마살)·9월(육해살)·10월(화개살)·11월(겁살)·12월(재살)·1월(천살)은 전부 명시되는데 3월만 "지지가 내 일지와 어울려 붙는 관계라서"로 에둘러 표현되고 살 이름이 없음. `lib/yearReportPrompts.ts`의 `sinsalName()`/`branchLine()` 또는 `lib/twelveStagesContent.ts`의 신살 데이터를 먼저 확인해, 실제로 그 달만 신살이 없는 계산 결과인지 아니면 누락 버그인지 판별 필요.
