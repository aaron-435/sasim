# TODO: UI 개편 2차 → 1.2.0 빌드

SPEC: `SPEC.md` (2026-10-14 승인). 브랜치 `task-02`.
되돌리기용 백업: 로컬 브랜치 `backup/ui-overhaul-1-2026-10-14`(= `28d085e`, 1차 개편 + 핸드오프 커밋). 2차를 통째로 버리려면 `git switch task-02 && git reset --hard backup/ui-overhaul-1-2026-10-14`(사용자 실행, 커밋 안 한 변경도 사라짐).

공통 QA(앱 항목 모두): `mobile/`에서 `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` 오류 없음. 화면 확인은 `mobile-web` 미리보기(포트 8082, `mobile` 프리셋 375×812, `?qa=all&persona=jisoo`, 언어는 `persona=mia`(en)·`?qa=pro`(es) 픽스처). 증거가 웹 미리보기인지 시뮬레이터인지 적는다.

간격 grep(C 항목 완료 기준): `grep -nE '(padding|margin|gap|borderRadius)[A-Za-z]*: *[0-9]' <파일들>` → 0줄. 테두리 두께·아이콘 크기·`lineHeight` 같은 비간격 숫자는 대상 아님. 토큰에 없는 값(예: 6, 20)은 가까운 토큰으로 맞추고, 정말 필요하면 `tokens.ts`에 추가한다(임의 숫자 금지).

## A. 이미지 자리

- [x] 1. 그림 매니페스트 + `ArtImage` 부품
  - 변경: `mobile/data/art/manifest.ts`(새: 키 목록 = `IMAGE_PROMPTS_2026-10-14.md` A~G의 키, 각 항목 `{ source?: number | { uri }, width, height, blurhash? }`, 처음엔 전부 비움), `mobile/components/ArtImage.tsx`(새: `expo-image`, `placeholder={{ blurhash }}`, `transition` 200ms(동작 줄이기면 0), 키에 그림이 없거나 `onError`면 `fallback` prop을 그린다), `mobile/assets/art/.gitkeep`.
  - QA: 공통 tsc. 아직 쓰는 화면 없음 → 웹 미리보기에서 변화 없음, 콘솔 오류 없음.
  - QA: `mobile/`에서 tsc --noEmit → 오류 없음(exit 0). 아직 어느 화면도 `ArtImage`를 쓰지 않아 웹 미리보기는 열지 않음(3번에서 확인). 키 목록은 `IMAGE_PROMPTS` 파일 이름 기준 70개, `manifest.ts`의 `ENTRIES-START/END` 블록은 2번 스크립트가 다시 쓴다.

- [x] 2. 후보정 스크립트
  - QA: 루트 `npx tsc --noEmit` → `.next/types` 쪽 기존 오류만(우리 파일 오류 0). 시험 PNG 2장 + 모르는 이름 1장으로 `npm run art:process` → `mobile/assets/art/element-wood.webp`(512²), `public/art/module1-love.webp`(1024×1280) 생성, `manifest.ts`에 두 키만 채워짐(blurhash 포함), `bogus.png`는 경고 후 건너뜀, 재실행해도 항목 유지, 앱 tsc exit 0. 시험 파일·매니페스트 변경은 되돌림. 참고: 시험 키는 TODO 예시의 `module-01` 대신 매니페스트 키 `module1-love`를 썼다.
  - 선행: 1
  - 변경: `scripts/art-process.mts`(새), 루트 `package.json` devDependency `sharp`·`blurhash`, 스크립트 `art:process`. 동작: `art-inbox/<키>.(png|jpg|webp)` → 묶음별 규격(크기는 `IMAGE_PROMPTS` "규격" 절) → WebP(품질 80) → 작은 묶음(오행·12지·빈 화면·질감)은 `mobile/assets/art/`, 큰 묶음(일간·모듈 표지·절기)은 `public/art/` → blurhash 계산 → `manifest.ts`의 해당 키만 다시 씀(번들은 `require`, 서버는 `{ uri: "https://www.fatesaidapp.com/art/<키>.webp" }`). 모르는 파일 이름은 경고만 하고 건너뛴다. 번들 합계가 3MB를 넘으면 경고.
  - QA: `npx tsc --noEmit`(루트) 통과. 시험 PNG 2장(`art-inbox/element-wood.png`, `art-inbox/module-01.png`, 아무 그림)을 넣고 `npm run art:process` → `mobile/assets/art/element-wood.webp`, `public/art/module-01.webp` 생성, `manifest.ts`에 두 키만 채워짐, 앱 tsc 통과. 확인 뒤 시험 파일과 매니페스트 변경은 되돌린다.

- [x] 3. 그림 자리 연결 (대체 그림 유지)
  - QA: 앱 tsc --noEmit → exit 0. mobile-web `?qa=all&persona=jisoo` 홈(PatternBackground 질감 자리) 정상 렌더, 콘솔 오류 0. muse 2건(08a/08b)이 만든 diff를 직접 읽어 확인(그림 키 없음 → fallback 경로가 기존 렌더와 동일). 못 한 것: 시험 그림을 넣어 표지·원소 자리에 뜨는지 스크린샷 확인과 모듈 선택·유형·리포트·운세·저널 빈 화면의 웹 개별 확인 → 15번(그림 넣기)에서 함께 확인. 오류 그림은 공용 오류 부품이 없어 `CompatibilityScreen`의 오류 문구 한 곳만 연결. 절기 키는 `mobile/lib/currentSolarTerm.ts`(고정 월/일 표, ±1일 오차).
  - 선행: 1
  - 변경: `ModuleArt.tsx`(모듈 표지 키, 대체 = 지금 그라데이션+번호), `TypeScreen`/`RevealCard`의 유형 공개(일간 키, 대체 = 지금 빛 고리), `ReportScreen` 원소 페이지(오행 키, 대체 = `ElementMap`/아이콘), `FortuneScreen` 오늘 헤더 절기 그림(절기 키, 대체 = `RhythmWave` 단독), 저널·받은 궁합·오류 빈 화면(빈 화면 키, 대체 = 지금 글자만), `PatternBackground` 질감(불투명도 0.04~0.06, 대체 = 지금 패턴). 절기 키는 이미 있는 절기 계산(`lib` 쪽)에서 얻는다. 화면당 몇 줄씩만 바꾼다.
  - QA: 공통 tsc. 웹 미리보기에서 모듈 선택·유형·리포트 원소 페이지·운세 오늘·저널 빈 화면이 1차와 똑같이 보이고 콘솔 오류 없음(그림 0장 상태). 2번의 시험 그림 2장을 넣으면 모듈 1 표지와 나무 원소 자리에 그림이 뜸(스크린샷), 확인 뒤 되돌림.

## B. blur, Lottie

- [x] 4. Lottie 제거 + blur 두 곳
  - 변경: `mobile/package.json`·`package-lock.json`에서 `lottie-react-native` 제거(`cd mobile && npm uninstall lottie-react-native`), `app.json` 플러그인에 있으면 제거. `PlanPicker.tsx` 패널 뒤 배경, `FortuneScreen.tsx` 위쪽 슬라이딩 탭 줄에 `BlurView`(iOS만, intensity 낮게, tint dark). Android·웹은 `SURFACE.floating` + 불투명도 0.92. 플랫폼 분기는 작은 부품 `mobile/components/FrostedSurface.tsx` 하나로.
  - QA: 공통 tsc. `grep -rn lottie mobile --include='*.ts*' --exclude-dir=node_modules` 무결과, `mobile/package.json`에 없음. 웹 미리보기 운세 탭 줄·페이월(`?qa=` 무료 상태)에 반투명 표면, 글자 대비 유지. iOS blur는 15번에서 확인.
  - QA: 앱 tsc --noEmit → exit 0. `grep -rn lottie mobile --include=*.ts* --include=app.json` 무결과, `package.json`에 없음. mobile-web `?qa=all&persona=jisoo` 운세 화면 탭 줄이 반투명 표면(`FrostedSurface` 폴백)으로 정상, 글자 대비 유지. 못 한 것: 페이월(`PlanPicker`) 웹 스크린샷은 무료 상태 픽스처로 못 열어 코드만 확인, iOS blur는 나번(네이티브 확인). 탭 줄은 스크롤 안의 요소라 "위쪽에 붙는" 구조가 아니어서 blur 효과가 약함 — 빌드 전에 어색하면 SPEC 가정대로 `SURFACE.floating`으로 되돌리고 `expo-blur`를 뺀다.

## C. 나머지 화면 개편 + 간격 토큰

각 항목 공통: 카드 `SURFACE.raised`+`SHADOW.raised`, 제목·눈썹·본문 위계는 1차 홈·운세 오늘 탭 규칙, 첫 진입 요소에 `Reveal`(순차 간격은 `theme/motion.ts`), 누름은 `PressableScale`(이미 교체됨), 위 간격 grep 0줄. 문구·흐름은 바꾸지 않는다. ko/en/es 잘림 확인.

- [x] 5. 운세 이번 주·이달·신년 탭
  - QA: 앱 tsc --noEmit → exit 0. mobile-web(`?qa=pro`, 375×812, ko)에서 이번 주·이달·신년 세 탭 렌더 확인(스크린샷), 이달 칩 선택·날짜 선택 동작 그대로, 콘솔 오류는 칩 누를 때 `/api/goodDays` 401 두 건뿐(미리보기 픽스처에 구독 확인이 없어서 나는 기존 동작). 못 한 것: en/es 확인(이 미리보기에서 언어 전환을 하지 않음) → 14번 마감 QA에서 함께. 파일 전체 간격 grep은 11번 몫. 이 항목에서 바꾼 것: 세 탭 요소에 `Reveal`(주간 3, 이달 2, 신년 5단계), 이 탭들이 쓰는 스타일의 간격·모서리를 `SPACE`/`RADIUS`로, `MonthGrid`의 셀 간격 3→`SPACE.xs`(4, 저널 달력도 같이 1px 넓어짐). `heroCard`(패딩 20)·`heroDivider`는 오늘 탭과 공유라 11번에서.
  - 선행: 4 (같은 파일)
  - 변경: `FortuneScreen.tsx`의 weekly·month·yearly 렌더 부분과 그 스타일, `MonthGrid.tsx`(이달 달력, 동작은 그대로). 오늘 탭 부분은 건드리지 않음(7번 몫).
  - QA: 공통 tsc. 웹 미리보기 `?qa=pro`에서 세 탭 각각 ko/en/es 스크린샷, 이달 달력 칩·날짜 상세 동작 그대로. 간격 grep은 7번에서 파일 전체로.

- [x] 6. 궁합·궁합 리포트·그룹 케미
  - QA: 앱 tsc --noEmit → exit 0. 다섯 파일 간격 grep(`: 0` 제외) → 0줄. `git diff -w`로 muse 변경을 확인: 간격·모서리 토큰, `Reveal` 래핑, 태그 이동만이고 문구·`Purchases.` 변경 없음(`Reveal` 추가 29줄). mobile-web(375×812, `?qa=all&persona=jisoo`)에서 궁합 입력 화면 렌더 확인. 못 한 것: 궁합 결과·리포트·그룹 케미 화면은 웹 픽스처로 못 열어 코드만 확인, en/es 잘림 확인은 14번 마감 QA로. 참고: 콘솔에 GroupChemistryScreen `Reveal` 닫는 태그 오류가 남아 있으나 muse 편집 중 시점의 로그이며, 파일은 `<Reveal` 5개/`</Reveal>` 5개로 짝이 맞고 tsc 통과. 지시서 `.agents/tasks/09a-compat-a.md`, `09b-compat-b.md`(contributor 모델, 결제·프롬프트 로직 아님).
  - 변경: `CompatibilityScreen.tsx`, `CompatReportScreen.tsx`, `GroupChemistryScreen.tsx`, `CoupleModeSection.tsx`, `OtherBirthForm.tsx`. 오행 색 테두리는 유지(1차 리뷰 결정).
  - QA: 공통 tsc, 다섯 파일 간격 grep 0줄. 웹 미리보기 궁합 입력·결과·그룹 화면 ko/en/es.

- [x] 7. Q&A 4화면 + 채팅
  - QA: 앱 tsc --noEmit → exit 0. 여섯 파일 간격 grep(`: 0` 제외) → 0줄. `git diff -w`로 muse 변경에서 `Purchases.`·fetch·`/api`·문구 키 변경 없음 확인, `Reveal` 11곳 추가(QA 화면 위계, 채팅은 헤더·점검 줄·입력 줄만, 말풍선은 건드리지 않음). mobile-web(`?qa=pro&persona=jisoo`, 375×812, ko)에서 Q&A 주제 화면 → 하위 분류 화면 렌더 확인(스크린샷). 못 한 것: 질문 → 결과, 채팅 첫 화면, 사람 폼은 웹 픽스처로 열지 못해 코드만 확인; en/es 잘림은 14번 마감 QA로. 콘솔의 `Reveal` 닫는 태그 오류는 muse 편집 중 시점의 로그이고 최종 파일은 tsc 통과. 지시서 `.agents/tasks/10a-qa.md`, `10b-chat.md`(contributor 모델, 결제·프롬프트 로직 아님). 브랜치 `task-04`.
  - 변경: `QAScreen.tsx`, `QASubcategoryScreen.tsx`, `QAQuestionScreen.tsx`, `QAPersonFormScreen.tsx`, `ChatScreen.tsx`, `ChatBubbles.tsx`. 채팅 말풍선 등장은 이미 있는 애니메이션이 있으면 유지, 없으면 `Reveal` 한 단계만.
  - QA: 공통 tsc, 여섯 파일 간격 grep 0줄. 웹 미리보기 Q&A 흐름 끝까지(질문 고르기→결과), 채팅 첫 화면 ko/en/es. 채팅 API는 부르지 않아도 됨(픽스처).

- [x] 8. 저널·좋은 날·설정·내 리포트·공유 카드
  - QA: 앱 tsc --noEmit → exit 0. 여섯 파일 간격 grep(`: 0` 제외) → 0줄. `git diff -w`로 muse 변경에서 `Purchases.`·fetch·`/api`·`t(` 변경 없음, `Reveal` 25곳 추가(파일별 여는·닫는 태그 수 일치: 저널 5, 카드 1, 좋은 날 6, 설정 5, 내 리포트 3, 공유 카드 5). mobile-web(`?qa=pro&persona=jisoo`, 375×812, ko)에서 홈 → 설정 화면 내용 전부 렌더 확인(스크린샷은 페이드 중이라 비어 보여 페이지 텍스트로 확인). 못 한 것: 저널·좋은 날·내 리포트·공유 카드 화면 웹 개별 확인, en/es 잘림(14번 마감 QA로). 콘솔의 `Reveal` 닫는 태그 오류는 muse 편집 중 시점의 오래된 로그, 최종 파일은 tsc 통과. 지시서 `.agents/tasks/11a-journal-gooddays.md`, `11b-settings-reports-share.md`(contributor 모델, 결제·프롬프트 로직 아님, 병렬 실행). 브랜치 `task-04`.
  - 변경: `JournalScreen.tsx`, `JournalEntryCard.tsx`, `GoodDaysScreen.tsx`, `SettingsScreen.tsx`, `MyReportsScreen.tsx`, `ShareCardsScreen.tsx`. 설정은 토큰·`Reveal`만.
  - QA: 공통 tsc, 여섯 파일 간격 grep 0줄. 웹 미리보기 각 화면 ko/en/es, 저널 빈 상태와 글 있는 상태.

- [x] 9. 신년 리포트·Wrapped·일간 수업·사주 배우기
  - QA: 앱 tsc --noEmit → exit 0. 네 파일 간격 grep(`: 0` 제외) → 0줄. `git diff -w`로 `Purchases.`·fetch·`/api`·`t(` 변경 없음, `Reveal` 열고 닫는 태그 수 일치(신년 5, Wrapped 2, 일간 수업 8, 사주 배우기 5). 못 한 것: mobile-web 스크린샷(이번 세션에서 미리보기를 열지 않음; Wrapped는 12/1~1/31에만 보이고 신년 리포트는 픽스처로 못 열음) → 코드만 확인, ko/en/es 잘림은 14번 마감 QA로. 판단: 토큰에 없는 값은 가장 가까운 토큰(동점은 큰 쪽), 원형 swatch는 `RADIUS.pill`로 원 유지, 일간 수업 진입 카드의 민트 틴트는 강조 의미라 표면 교체 없이 간격만. 지시서 `.agents/tasks/12a-yearreport.md`, `12b-wrapped-lessons.md`(contributor 모델, 병렬). 브랜치 `task-05`.
  - 변경: `YearReportScreen.tsx`, `WrappedScreen.tsx`, `DayMasterLessonsScreen.tsx`, `SajuLearnScreen.tsx`.
  - QA: 공통 tsc, 네 파일 간격 grep 0줄. 웹 미리보기에서 열리는 화면은 ko/en/es 스크린샷, 픽스처가 없어 못 여는 화면(신년 리포트 등)은 "코드만 확인"으로 적는다.

- [x] 10. 온보딩 9화면
  - QA: 앱 tsc --noEmit → exit 0. 열 파일 간격 grep(`: 0` 제외) → 0줄. `git diff -w`로 `fetch`·`/api`·`Purchases.`·`t(`·`setStep`·`AsyncStorage` 변경 없음, `Reveal` 여는·닫는 태그 수 파일마다 일치. mobile-web(375×812, 저장 데이터 지운 새 창, en)에서 언어 → 인트로 → 닉네임 → 성별 → 생년월일(자동 칸 이동·별자리 카드) → 시간("Unknown") → 도시(검색·결과) → 고민까지 끝까지 진행, 콘솔 오류 0. 생년월일 화면에서 포커스 때 위로 밀리는 것은 변경 전 코드(stash)에서도 같게 나와 기존 웹 동작. 손댄 것: muse가 별자리 카드의 민트 틴트·테두리를 `SURFACE.raised`로 바꿔서 강조 의미가 사라져 원래 틴트로 되돌림(9번 판단과 같음). 못 한 것: es·ko 잘림 확인(Dob·City) → 14번 마감 QA로. 지시서 `.agents/tasks/13a-onboard-a.md`, `13b-onboard-b.md`(contributor 모델, 병렬). 브랜치 `task-05`. `OnboardingShell`의 제목에 `Reveal`을 한 번 넣었고 화면 본문 블록은 2~3단계.
  - 변경: `IntroScreen`, `LanguageScreen`, `NicknameScreen`, `GenderScreen`, `DobScreen`, `TobScreen`, `CityScreen`, `ConcernScreen`, `VerifyCodeScreen`, 공용 `OnboardingShell.tsx`. 가능한 한 `OnboardingShell`에서 한 번에 처리하고 화면별로는 숫자만 바꾼다. muse 한도 때문에 두 묶음(Intro~Gender / Dob~VerifyCode + Shell)으로 나눠 돌려도 됨.
  - QA: 공통 tsc, 열 파일 간격 grep 0줄. 웹 미리보기에서 저장 데이터 없이(새 창) 온보딩 처음부터 끝까지 ko/en/es 중 1개 언어 전체 + 나머지 두 언어는 Dob·City 화면만.

- [x] 11. 1차 화면 숫자 정리
  - QA: 앱 tsc --noEmit → exit 0. 여섯 파일 간격 grep(`: 0` 제외) → 0줄. `git diff -w`로 `Purchases.`·fetch·`/api`·`t(`·`Reveal` 변경 없음(숫자→토큰만, 새 import 없이 기존 `tokens` import 사용). mobile-web(`?qa=pro&persona=jisoo`, 375×812, ko)에서 홈·심리테스트 선택·퀴즈 첫 문항 렌더 확인(스크린샷), 새 오류 없음(콘솔의 `SPACE is not defined`는 muse 편집 중 핫리로드 시점 로그이고 새로 불러온 뒤 퀴즈가 정상 렌더, import 6파일 모두 있음). 값이 바뀐 곳: 가까운 토큰으로 맞춤(예: 14→16, 18→16, 22→24, 6→8). 못 한 것: 운세 오늘 탭·리포트·유형 공개의 웹 스크린샷 비교와 en/es 잘림 → 14번 마감 QA로. 지시서 `.agents/tasks/14a-home-fortune.md`, `14b-report.md`, `14c-type-quiz-module.md`(contributor 모델, 병렬). 브랜치 `task-06`.
  - 선행: 3, 4, 5 (같은 파일)
  - 변경: `HomeScreen.tsx`, `FortuneScreen.tsx`(오늘 탭 포함 파일 전체), `ReportScreen.tsx`, `TypeScreen.tsx`, `QuizScreen.tsx`, `ModuleSelectScreen.tsx`. 숫자만 토큰으로, 구성은 그대로. 파일이 커서 두 묶음(Home·Fortune / 나머지 넷)으로 나눈다.
  - QA: 공통 tsc, 여섯 파일 간격 grep 0줄. 웹 미리보기에서 1차 스크린샷과 비교해 눈에 띄는 어긋남 없음(값이 바뀐 곳은 보고).

## D. 핵심 장면

- [x] 12. 리포트 원소 페이지 색 이어짐
  - QA: 앱 tsc --noEmit → exit 0(디버그 코드 제거 뒤 다시 실행). mobile-web(`?qa=all&persona=mia`, 375×812, en) 심층 리포트에서 원소 페이지 배경이 오행 색을 14% 섞은 어두운 색으로 바뀜(나무 7번째 쪽 `rgb(26,46,36)`, 금 `rgb(43,56,51)` 값 확인, 스크린샷). 스크롤 위치 6.5에서 스크린샷 → 두 쪽 사이가 한 배경으로 이어지고 상단 바까지 같은 색(이음새 없음). 못 한 것: 동작 줄이기 에뮬레이션은 도구로 못 켜서 코드만 확인(`useReducedMotion`이면 `pageColors[pageIndex]` 고정색, 보간 없음). 참고: 이 웹 미리보기는 "다음" 누름이나 `scrollLeft` 대입으로 쪽이 넘어가지 않는 기존 현상이 있어(원래 `ReportPager`로 되돌려도 같음) 위 값은 직접 스크롤 위치를 대입해 읽었다. 구현: `ReportPager`에 선택 prop `pageColors`(쪽마다 배경색), 화면 전체 뒤에 깔리는 `Animated.View` 배경을 `interpolateColor`(UI 스레드, 공유 값은 일반 `onScroll`에서 씀 — reanimated 스크롤 핸들러는 웹에서 값이 안 바뀌어 뺌)로 보간. `ReportScreen`은 쪽 key가 `element-*`면 그 오행 색을 섞은 색, 아니면 기본 배경색 배열만 넘기고 `shellDark`를 투명으로 바꿈(신년·Wrapped·궁합 리포트는 `pageColors`를 안 넘겨 변화 없음).
  - 선행: 11 (`ReportScreen.tsx`)
  - 변경: `ReportPager.tsx`(스크롤 위치 → reanimated `interpolateColor`로 배경을 앞뒤 페이지 오행 색 사이에서 보간), `ReportScreen.tsx`는 페이지별 색 배열만 넘김. 동작 줄이기면 페이지가 바뀔 때 색만 즉시 바뀜.
  - QA: 공통 tsc. 웹 미리보기 `?qa=all&persona=mia` 심층 리포트에서 원소 페이지 사이를 반쯤 끌었을 때 배경이 중간색(스크린샷 2장: 반쯤, 다 넘김). 동작 줄이기(브라우저 `prefers-reduced-motion` 에뮬레이션)에서 보간 없음.

- [x] 13. 페이월·결제 완료 장면
  - QA: 앱 tsc --noEmit → exit 0. `git diff -w`에서 `Purchases.`·`purchase*(`·entitlement 줄 변경 없음(구매 호출 줄은 그대로, `success()` 6곳만 `playPurchaseSuccess()`로 교체). mobile-web(`?qa=free&persona=jisoo`, ko) 오늘 운세 무료 페이월 렌더 확인(페이지 텍스트): 카운트다운·부정 예측 없음, 구독 버튼 위 문구는 "구독하면 나머지가 모두 열려요", 새 콘솔 오류 없음. 못 한 것: 웹은 월간 단일 상품·체험 없음이라 `PlanPicker`가 null을 돌려줘 패널 등장과 결제 완료 연출은 화면으로 못 봄 → 코드만 확인, 15번이 아니라 "나"(네이티브 확인)에서 확인. 판단: 6곳이 서로 다른 화면(페이월 뷰가 구매 후 다른 뷰로 바뀜)이라 연출을 `App.tsx` 루트의 `PurchaseSuccessHost` 하나로 띄우고 각 화면은 `playPurchaseSuccess()`(햅틱+연출)만 호출. 동작 줄이기면 연출 없음(햅틱만). muse·verifier는 쓰지 않음(수정 8줄·새 파일 1개, 결제 로직 변경 없음).
  - 선행: 4
  - 변경: `PlanPicker.tsx` 패널 등장(아래서 올라옴 + 페이드, `FrostedSurface` 위), 결제 완료 연출(성공 진동 6곳 옆에 짧은 빛 고리/체크 등장, 공용 부품 `mobile/components/motion/PurchaseSuccess.tsx` 하나). 결제 로직·RevenueCat 호출은 건드리지 않는다. muse 표준 모델 + verifier 리뷰.
  - QA: 공통 tsc. `git diff`에 `Purchases.`·entitlement 관련 줄 변경 없음. 웹 미리보기 무료 상태 페이월 등장(스크린샷), 압박 규칙 확인(페이월 바로 위에 부정 예측·카운트다운 없음). 결제 완료 장면은 웹에서 못 띄우면 "코드만 확인"으로 적고 15번에서 확인.

## E. 마감

- [x] 14. 2차 마감 QA
  - QA: 앱 tsc --noEmit → exit 0. `grep -nE '(padding|margin|gap|borderRadius)[A-Za-z]*: *[0-9]' mobile/screens/*.tsx`에서 `: 0` 제외 0줄(`: 0` 2줄은 값 0이라 대상 아님). `grep -rn lottie` 무결과. `du -sh mobile/assets/art` → 0B(그림 0장, 3MB 이하). `Reveal`·`PurchaseSuccess`는 `useReducedMotion`을 따르는 것을 코드로 확인(`Reveal`은 reduce면 progress 1로 시작). mobile-web(375×812) 홈을 ko(`?qa=pro&persona=jisoo`)·en(`persona=mia`)·es(`?qa=pro&lang=es`)로 확인, 잘림 없음. 콘솔의 `SPACE is not defined`(QuizScreen)는 muse 편집 중 핫리로드 시점의 오래된 로그이고 import 존재·tsc 통과·새로 불러온 화면 정상. 못 한 것: 화면별 ko/en/es 전수 확인과 브라우저 `prefers-reduced-motion` 에뮬레이션(도구로 못 켬) → 코드 확인으로 대체, 나머지 화면의 en/es 잘림과 동작 줄이기는 TODO "나"(네이티브 확인)에서 함께 봄.
  - 선행: 1~13
  - 변경: 문제가 나온 곳만.
  - QA: 공통 tsc. `grep -nE '(padding|margin|gap|borderRadius)[A-Za-z]*: *[0-9]' mobile/screens/*.tsx` 0줄(남으면 이유를 적음). 웹 미리보기 주요 화면 ko/en/es 한 바퀴, 콘솔 오류 없음. 동작 줄이기 에뮬레이션에서 `Reveal`·전환이 꺼짐. `mobile/assets/art` 합계 3MB 이하(`du -sh`).

- [x] 15. 그림 넣기 (그림이 생기면)
  - QA: `npm run art:process`(루트) → 72장 처리, 경고 0건(모르는 이름 0). 번들 `mobile/assets/art` 26장 1.15MB(3MB 이하), 서버용 `public/art` 46장 8.3MB(앱 크기에 안 들어감). `manifest.ts`에 72키가 `source`·`blurhash`와 함께 채워짐. 앱 tsc --noEmit → exit 0. mobile-web(`?qa=all&persona=mia`)에서 홈 배경에 질감 그림이 깔려 렌더되고 새 오류 없음(콘솔의 `SPACE is not defined`는 14번에 적은 핫리로드 시점의 오래된 로그). 못 한 것: 서버 그림(모듈 표지·절기·일간)은 웹 배포 전이라 URL이 404 → 대체 그림으로 보임("가" 항목 뒤 확인). 오행·12지·빈 화면 개별 자리 스크린샷은 웹 픽스처로 못 열어 코드 연결(3번)만 확인. (사용자 확인) 72장 스타일·팔레트·흉한 상징 눈 검수는 아직 안 함.
  - 선행: 2, 3. 사용자가 `IMAGE_PROMPTS_2026-10-14.md`로 만든 그림을 `art-inbox/<키>.png`로 넣은 뒤 진행. 일부만 있어도 된다.
  - 변경: `npm run art:process` 결과(`mobile/assets/art/`, `public/art/`, `manifest.ts`)만.
  - QA: 스크립트 경고 없음(모르는 이름 0), 번들 3MB 이하, 앱 tsc 통과. 웹 미리보기에서 번들 그림은 바로, 서버 그림은 웹 배포 뒤에 뜸. (사용자 확인) 장마다 스타일·팔레트·흉한 상징 없음을 눈으로 검수.

## 사용자 실행·확인 (마지막)

- [ ] 가. (사용자 실행) 웹 배포 — 서버 그림이 있을 때만, 1.2.0 빌드보다 먼저
  - 커밋 → `git push origin main`(브랜치 병합 결정 후) → Vercel Ready → `curl -sI https://www.fatesaidapp.com/art/<키>.webp` 200.

- [ ] 나. (사용자 확인) dev-client 새 빌드 + 네이티브 확인 — 선행: 14
  - iOS 시뮬레이터: `cd mobile && npx expo run:ios`(로컬 빌드). `eas.json`의 `development` 프로필은 실기기용(internal)이라 시뮬레이터에는 못 쓴다. Android 실기기: `cd mobile && npx --yes eas-cli build --profile development --platform android`. 기존 dev-client에는 새 네이티브 모듈이 없어서 앱이 뜨지 않는다.
  - iOS 시뮬레이터: 화면 전환 속도(웹에서 1~2초 느렸던 것이 정상인지), 누름 햅틱, 유형 공개, 결제 완료 장면, 페이월·운세 탭 줄 blur, 설정 > 손쉬운 사용 > 동작 줄이기 켠 상태.
  - Android 실기기: blur 대체 표면, 그림자, 긴 화면 스크롤 성능(운세·리포트).
  - 직전 TODO 6·7·8번의 공유 PNG 확인도 이 빌드로 함께(아래 "다").

- [ ] 다. (사용자 확인) 직전 TODO에서 옮긴 네이티브 확인 — `TODO_2026-10-14.md` 5번(이달 달력 색·글자 크기·칩 강조), 6번(총론 PNG 공유), 7번(리포트 3곳 PNG 공유), 8번(초대 링크 글자 공유, `share` 이벤트 kind 4개). 절차는 그 파일 그대로.

- [ ] 라. (사용자 실행) 1.2.0 스토어 빌드·제출 — 선행: 나
  - iOS·Android 프로덕션 빌드 → TestFlight·Play 내부 테스트 → 제출. 직전 TODO "바"(12번 새 출발 모듈·위젯·리뷰 요청)도 이 빌드에 포함. 이 빌드가 나올 때까지 `eas update` 금지.

- [ ] 마. (사용자 실행) 직전 TODO에서 옮김 — `TODO_2026-10-14.md`의 "다"(이전 배치 배포와 실기기 확인), "라"(스토어·RevenueCat: 7일 체험, 연간, `compat_report`·`report_module12`), "마"(개인정보 문서: 운영자 정보, 스토어 개인정보 라벨). 내용은 그 파일 그대로.

- [ ] 바. (사용자 결정) `task-02`를 main에 병합할지, push할지.

## 발견 사항

- (직전에서 옮김) `/saju-calculator`도 `<html lang>`이 항상 ko다. 계산기는 `?lang=` 없으면 en이라 글과 규칙이 다르다. 맞추려면 SPEC 결정이 필요하다.
