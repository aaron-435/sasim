# Fatesaid WIKI

아키텍처 지도. 큰 그림과 흐름만 적는다. 진행 중인 작업은 `TODO.md`, 프로젝트 전체 상태와 결정은 `HANDOFF_*.md`, 제품 원칙은 `PRODUCT.md`.
`/wiki`로 갱신한다. `(미확인)`은 코드로 확인하지 못한 부분이다.

_최초 작성: 2026-09-21 (코드 구조 조사 기반)_

## 1. 한 장 요약

- 사주 + 심리 기반 자기이해 앱. 글로벌 우선(EN/ES), 한국어 병행. 사용자 경험의 본체는 **네이티브 앱**(`mobile/`)이고, 루트의 Next.js는 **API 서버 + 웹 광고용 Q&A**다.
- 앱은 항상 **프로덕션 API**(`https://www.fatesaidapp.com`)를 호출한다(`mobile/config.ts`). 로컬 API로 붙는 개발 경로는 없다. 그래서 API가 바뀌는 작업은 **웹 배포가 먼저, OTA가 나중**이다.
- LLM은 OpenAI(`openai` SDK). 결제는 RevenueCat(앱 SDK + 서버 검증). DB는 Supabase.

## 2. 저장소 지도

| 위치 | 역할 |
|---|---|
| `app/` | Next.js App Router. `app/page.tsx`는 `components/AppFlow.jsx`를 렌더. `app/api/*`가 API. `privacy`, `terms`, `data-deletion` 법적 페이지 |
| `components/` | 웹 UI(JSX). Landing, OnboardingWizard, QAChat 등. AppFlow에 모듈 선택·퀴즈·챗·리포트 화면 코드도 남아 있다(웹에서 실제로 노출되는 범위는 `(미확인)`, 메모리상 웹은 Q&A 전용 광고 표면) |
| `lib/` | 서버/공용 로직. 사주 엔진, 프롬프트, LLM 호출, 결제 검증, i18n, 콘텐츠 |
| `middleware.ts` | `/api/*`에 CORS 허용 헤더. 인증 없는 공개 API + `lib/rateLimit.ts` |
| `mobile/` | Expo SDK 57 / React Native 0.86 앱. 별도 `package.json`. `screens/`, `lib/`, `components/`, `theme/` |
| `supabase/schema.sql` | 테이블: `sessions`, `saju_results`, `quiz_results`, `chat_sessions`, `report_results`, `llm_usage_log`. 일부는 배포 DB에 SQL Editor로 직접 실행해야 했다(파일 주석 참고) |
| `scripts/` | 개발용 스크립트: `validate-manseryeok`, `sim-chat`, `usage-report`, `gen-qa-fixtures`, `gen-reconciled` |

## 3. 핵심 흐름

### 온보딩 → 사주 계산
앱 온보딩 화면들(언어 → 인트로 → 닉네임 → 성별 → 생년월일 → 시간 → 도시 → 고민)이 정보를 모아 `POST /api/saju`를 호출한다. 화면 전환은 `mobile/App.tsx`의 `step` 상태로 관리한다(react-navigation/expo-router 없음). 웹에서 시작한 사용자는 `/api/verification-code`로 받은 코드를 `VerifyCodeScreen`에서 입력해 웹에서 모은 생년월일을 복원한다.

### 사주 엔진 (자체 구현)
`lib/sazu.ts`의 `calculateSaju()` → 자체 엔진 `lib/manseryeok.ts` 우선, 어떤 오류든 나면 외부 SAZU API로 폴백.
- 일주: KASI 공공 API(`lib/kasi.ts`). 연주·월주: 태양 황경으로 절기 시각을 직접 계산(`lib/solarTerms.ts`). 시주: 오자시 조견표.
- 출생 도시의 경도·IANA 시간대로 진태양시 보정(`lib/worldCities.ts`, `lib/birthCities.ts`). 도시 검색은 서버(`/api/cities/search`).
- 회귀 검사: `npm run validate:manseryeok`(골든 샘플 5개).
- 이미 결정됨: 진태양시 방식 유지, 한국 기준 시간 변환 방식으로 바꾸지 않는다.

### 콘텐츠 기능 (API ↔ 앱 화면)
| 기능 | API | 앱 |
|---|---|---|
| Q&A(무료 일일 한도) | `/api/qa-answer` (`lib/qaChat.ts`, 한도는 `lib/qaQuota.ts`, `llm_usage_log` 행 수로 집계) | `QAScreen`, `QAQuestionScreen` |
| 퀴즈(11개 모듈) | `/api/quiz-result`는 결과를 Supabase에 저장만 한다. 문항·채점은 앱 안(`mobile/lib/quiz/`)에 있고, 루트 `lib/module*.ts`·`lib/quizProfile.ts`는 웹 컴포넌트용 | `ModuleSelectScreen`, `QuizScreen` |
| AI 상담(20턴) | `/api/chat` (`lib/chat.ts`, `lib/chatPrompts.ts`). 모듈별 대화·리포트 설계 데이터는 `lib/modulePlaybooks.ts`(`MODULE_PLAYBOOK.md`의 코드판, 11개 모듈). 현재 챗봇은 7번째 턴 지침만 여기서 읽고, 리포트 프롬프트는 전문 관점·경계·핵심 질문·강점 방향·모듈 페이지 지시를 읽는다. 마지막 턴의 추출(extract)은 공통 필드(고민, 감정, 촉발 사건, 반복 패턴, 두려움, 대처·관계·바라는 변화, 요약)에 더해 플레이북의 모듈 필드 2개를 `module_fields`로 뽑는다(말하지 않았으면 null, 새 필드는 모두 optional). 앱은 extract를 해석하지 않고 저장했다가 리포트 요청에 그대로 넘긴다 | `ChatScreen`, `useReplyScroll` |
| 심층 리포트 | `/api/report`, `/api/report/paid`, `/api/report/unlock`, `/api/report-pdf` | `ReportScreen`, `MyReportsScreen` |
| 오늘/올해 운세 | `/api/dailyFortune`, `/api/yearFortune` | `FortuneScreen`, `HomeScreen` |
| 궁합 | `/api/compatibility` | `CompatibilityScreen` |
| 신년 리포트 | `/api/yearReport` (`lib/yearReport*.ts`) | `YearReportScreen` |
| 사주 유형·공유 카드 | 유형 분류는 서버(`lib/sajuType.ts`)에서 하고 `/api/saju`, `/api/verification-code` 응답에 실린다. 앱의 `mobile/lib/sajuType.ts`는 타입 정의뿐이라 서버와 키를 맞춰야 한다 | `TypeScreen`, `ShareCardsScreen` |

### 리포트 (무료/유료 분리)
무료 절반을 먼저 생성하고, 유료 절반은 구매 후 `/api/report/paid`가 만든다. 잠금은 `lib/reportLock.ts`. 생성 품질은 `lib/reportQuality.ts`: 결정론적 검사 → 표적 패치 → 리뷰어 1회 → 패치 1회 → 최종 게이트(한자 제거·ES 성별/usted 등 포함). 프롬프트는 `lib/reportPrompts.ts`, 호출은 `lib/report.ts`.
무료 파트 마지막(페이월 직전)에 실제 계산된 나이+기운 전환을 사실만 담백하게 미리 보여주는 페이지가 있다(`upcoming_period_preview_heading`/`_body`, `FREE_PART_TEXT_FIELDS`에 포함되어 유료 파트 프롬프트에 "이미 쓰인 앞부분"으로 전달됨). 잠긴 본편(`upcoming_period_heading`/`_body`)은 같은 사실을 반복하지 않고 왜/무엇을 준비하면 좋을지로 이어 쓴다 — 두 필드 모두 `describeUpcomingPeriod()`가 만든 같은 나이 데이터 줄을 쓰므로 나이 환각 가드(`path.startsWith("upcoming_period")`)가 둘 다에 자동 적용된다.
모듈 전용 페이지 2장: `module_map`(무료, "다가오는 시기" 미리보기 앞)과 `module_deep`(유료, `LOCKED_KEYS`, 행동 가이드 앞). 둘 다 `{ title, body }`이고, 제목은 플레이북의 고정 문구를 코드(`parseReport`)가 붙이며 모델은 본문만 쓴다. 서버가 요청의 검증된 `moduleId`를 `ReportContext.moduleId`에 넣어야 생기므로, `moduleId`를 안 보내는 구버전 요청과 이전 리포트에는 두 필드가 없다. 무료 응답은 유료 필드를 모두 비워서 보내되 `module_deep`의 제목만 남긴다(잠긴 챕터 이름을 보여 주기 위함, 비밀 아님). 앱(`ReportScreen`의 `ModulePage`)은 두 제목을 목차 라벨로도 쓰고, 필드가 없으면 페이지를 건너뛴다. 구매 후 유료 절반 요청의 `freePart`에 `module_map`을 실어 보내 반복을 막는다.

강점 3+1 분할: 요청 `context.strengthsSplit: true`를 보내는 앱에만 적용된다(보내지 않는 구버전 앱은 예전처럼 유료 강점 4개). 분할이면 무료 절반에 `strengths_preview`(3개, 심리검사 답·상담 근거, 플레이북 강점 방향 3개에 하나씩)가 들어가고, 유료 `strengths`는 핵심 강점 1개(일간의 기질에서 찾는, 강점 방향 밖의 능력)다. 유료 절반은 `freePart`에 `strengths_preview`가 실려 와야 1개로 쓴다(`strengthsSplitFor()`). 모델이 무료 강점을 빠뜨리면 그 리포트는 유료 4개로 돌아가고, 무료 응답의 `locked_shape.strengths`도 그에 맞춰 1 또는 4다. 핵심 강점 제목이 무료 강점 제목과 단어가 겹치면 결정론적 검사가 제목·본문을 함께 다시 쓰게 한다. 앱(`ReportScreen`)은 `strengthsSplit: true`를 보내고, 무료 강점을 모듈 페이지 뒤·다가오는 시기 미리보기 앞에 잠금 없이 보여 준다. 유료 쪽은 "핵심 강점" 1장(목차 "핵심 강점과 취약점")이며, 구매 후 유료 절반 요청의 `freePart`에 `strengths_preview`를 실어 보낸다. `strengths_preview`가 없는 이전 리포트는 예전처럼 유료 강점 4장.

페이월(`ReportScreen`의 `PaywallPage`)은 잠긴 페이지 전체를 한 장으로 대신하고, 카드 안에 목차(`tocEntries`)에서 잠긴 항목의 제목을 자물쇠와 함께 나열한다(신년 리포트 미리보기의 잠긴 챕터 목록과 같은 모양). 모듈 페이지 제목과 핵심 강점 라벨은 목차를 통해 자동으로 들어간다. 카드는 세로 스크롤 영역이라 작은 화면에서도 잘리지 않는다.

### 결제
- 앱: RevenueCat SDK(`mobile/lib/purchases.ts`). 키는 플랫폼별로 `mobile/config.ts`에 있다(공개 SDK 키). 구독 + 모듈별 리포트 + 번들 + 신년 리포트(상품 목록은 `IAP_PRODUCTS.md`).
- 서버: 생성 비용이 드는 유료 콘텐츠는 서버에서 `lib/revenuecat.ts`로 entitlement를 확인한다(`REVENUECAT_SECRET_KEY` 필요, 없으면 fail closed). 앱 쪽 게이트만 믿지 않는다.

### 다국어
ko/en/es. 웹 `lib/i18n/`, 앱 `mobile/lib/i18n/`(스페인어 규칙은 `STYLE_GUIDE.md`). LLM 출력 언어는 `lib/promptLocale.ts`로 지정.

### 앱 로컬 상태
사용자 데이터·리포트·Q&A 기록·알림 설정은 기기에 저장한다(`mobile/lib/*Storage.ts`, `qaHistory.ts`, `qaQuota.ts`). 로그인 없이 동작한다. 저장소 종류(AsyncStorage 등)는 `(미확인)`.

## 4. 배포 경로

| 대상 | 방법 |
|---|---|
| 웹/API | `git push origin main` → Vercel 자동 배포 → 프로덕션 확인 |
| 앱 JS 변경 | 웹 배포 확인 후 OTA: `eas update --branch production`(runtime 1.0.0). 네이티브 모듈이 바뀌면 OTA 불가, EAS 빌드 필요 |
| iOS / Android 빌드 | EAS 프로덕션 빌드 → TestFlight / Play Console(현재 alpha 비공개 테스트) |

상세 명령, 권한 제약, 현재 빌드 상태는 최신 `HANDOFF_*.md`.

## 5. 검증 도구

명령표는 루트 `CLAUDE.md`의 "Verification commands". 그 외:
- 개발용 QA 모드(`?qa=`, 픽스처): `mobile/dev/README.md`
- OpenAI 사용량 집계: `scripts/usage-report.mts`
- 앱 화면 확인: `mobile-web` 프리뷰(포트 8082) 또는 iOS 시뮬레이터 dev-client. 설정은 `.claude/launch.json`

## 6. 환경 변수 (이름만)

`OPENAI_API_KEY`, `KASI_API_KEY`, `REVENUECAT_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. 로컬은 `.env.local`, 프로덕션은 Vercel 프로젝트 설정. 어떤 것이 Vercel에 들어 있는지는 최신 HANDOFF의 확인 항목을 볼 것.
