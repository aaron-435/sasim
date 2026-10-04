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
| `mobile/` | Expo SDK 57 / React Native 0.86 앱. 별도 `package.json`. `screens/`, `lib/`, `components/`, `theme/`. `theme/colors.ts`(팔레트)와 `theme/fonts.ts`(글꼴 토큰 `FONTS.display/displayItalic/regular/medium/semibold/bold` — 2026-10-04부터 표시용 Newsreader, UI용 Plus Jakarta Sans, 한글은 시스템 글꼴. PDF `lib/pdf/reportPdf.tsx`도 같은 글꼴, 파일은 `next.config.mjs`로 함수에 포함) — 화면은 글꼴 이름을 직접 쓰지 않고 토큰만 참조, 실제 로딩은 `App.tsx`의 `useFonts`. 같은 파일의 `MAX_FONT_SCALE`(display/control/body)이 시스템 글자 크기 상한(`maxFontSizeMultiplier`)이며 온보딩·퀴즈·Q&A 화면에 적용. `theme/layout.ts`의 `readableColumn`(최대 폭 640pt, 가운데)이 넓은 화면(iPad 등)용 본문 폭 — 홈·운세·검사 목록·타입·궁합·공유 카드·신년 미리보기의 스크롤 내용과 `components/ReportPager.tsx`의 각 페이지·상단 막대에 적용, 휴대폰에서는 변화 없음 |
| `supabase/schema.sql` | 테이블: `sessions`, `saju_results`, `quiz_results`, `chat_sessions`, `report_results`, `llm_usage_log`. 일부는 배포 DB에 SQL Editor로 직접 실행해야 했다(파일 주석 참고) |
| `scripts/` | 개발용 스크립트: `validate-manseryeok`, `sim-chat`, `judge-chat`, `dump-chat-prompt`, `check-chat-sets`, `check-playbook-sets`, `usage-report`, `gen-qa-fixtures`, `gen-reconciled` (용도는 5장) |

## 3. 핵심 흐름

### 온보딩 → 사주 계산
앱 온보딩 화면들(언어(en·es·ko 순) → 인트로 → 닉네임 → 성별 → 생년월일 → 시간 → 도시 → 고민)이 정보를 모아 `POST /api/saju`를 호출한다. 화면 전환은 `mobile/App.tsx`의 `step` 상태로 관리한다(react-navigation/expo-router 없음). 웹에서 시작한 사용자는 `/api/verification-code`로 받은 코드를 `VerifyCodeScreen`에서 입력해 웹에서 모은 생년월일을 복원한다. 이 화면은 순서에 끼어 있지 않고 인트로 아래 작은 링크("웹에서 시작했나요? 코드 입력하기")로만 들어간다(2026-10-04).

### 사주 엔진 (자체 구현)
`lib/sazu.ts`의 `calculateSaju()` → 자체 엔진 `lib/manseryeok.ts` 우선, 어떤 오류든 나면 외부 SAZU API로 폴백.
- 일주: KASI 공공 API(`lib/kasi.ts`). 연주·월주: 태양 황경으로 절기 시각을 직접 계산(`lib/solarTerms.ts`). 시주: 오자시 조견표.
- 출생 도시의 경도·IANA 시간대로 진태양시 보정(`lib/worldCities.ts`, `lib/birthCities.ts`). 도시 검색은 서버(`/api/cities/search`).
- 회귀 검사: `npm run validate:manseryeok`(골든 샘플 5개).
- 이미 결정됨: 진태양시 방식 유지, 한국 기준 시간 변환 방식으로 바꾸지 않는다.

### 콘텐츠 기능 (API ↔ 앱 화면)
| 기능 | API | 앱 |
|---|---|---|
| Q&A(무료 일일 한도) | `/api/qa-answer` (`lib/qaChat.ts`, 한도는 `lib/qaQuota.ts`, `llm_usage_log` 행 수로 집계) | `QAScreen`(헤더에 오늘 남은 수, 앱 `lib/qaQuota.ts`), `QASubcategoryScreen`, `QAQuestionScreen`. 앱 첫 주제는 질문 은행 8개 분류를 5개로 묶어 보여 준다(`mobile/lib/qaTopicGroups.ts`, 표시용만, 은행·웹은 8개 그대로) |
| 퀴즈(11개 모듈, 홈에서는 히어로 아래 별도 카드로 진입) | `/api/quiz-result`는 결과를 Supabase에 저장만 한다. 문항·채점은 앱 안(`mobile/lib/quiz/`)에 있고, 루트 `lib/module*.ts`·`lib/quizProfile.ts`는 웹 컴포넌트용 | `ModuleSelectScreen`, `QuizScreen` |
| AI 상담(앱: 5세트 25턴, 웹·구버전 앱: 20턴) | `/api/chat` (`lib/chat.ts`, `lib/chatPrompts.ts`). 흐름이 두 갈래다 — 아래 앞부분은 `flowVersion`이 없는 요청이 쓰는 **20턴 흐름**, 굵은 글씨 뒤가 지금 앱이 쓰는 **5세트 흐름**이다. 모듈별 대화·리포트 설계 데이터는 `lib/modulePlaybooks.ts`(`MODULE_PLAYBOOK.md`의 코드판, 11개 모듈). 챗봇은 `moduleId`가 있으면 2~19턴 중 고정 역할 턴(6·10·13·17)을 뺀 14턴 지침을 플레이북의 7단계 흐름(A 장면 2–3, B 감정 4–5, C 패턴 7–9, D 뿌리 11–12, E 대처 14–15, F 관계 16, G 변화 18)과 모듈별 시그니처 질문(단계의 둘째 턴), 19턴 관점 전환 대상으로 만들고, 프롬프트에 모듈의 관점·경계를 붙인다. `moduleId`가 없거나 모르는 id(웹, 구버전 앱)면 예전 공통 단계 지침을 쓴다. 시스템 프롬프트 순서는 예시 대화 → 절대 규칙(안전 프로토콜 + 핵심 원칙 10개) → 대화 기법 ①~⑦(모듈이 있으면 이지선다 축·감정 팔레트·모순 축·리프레이밍 재료 포함) → 모듈 관점 → 이번 턴 지침이다. 턴마다 쓸 기법이 정해져 있다(좁히기 ①, 감정 ⑤, 뿌리 ③, 숨고르기 6·13·17의 정리·재확인 ⑥, 자책 직후 ⑦ 우선). 퀴즈 답 인용은 7·14턴 두 번이다(앱은 답 풀을 4개까지 보내고 서버가 앞 2개만 쓴다). 챗봇 응답 JSON에는 사용자에게 보이지 않는 `formulation`(지금까지의 핵심 가설, 근거 발언, 모순 후보, 다음 수)이 `lines` 앞에 온다. 앱(`ChatScreen`)은 이 값을 화면에도 기록에도 두지 않고 다음 요청에 그대로 돌려주며, 서버는 길이·값을 걸러서 시스템 프롬프트의 "지금 해야 할 일" 바로 앞에 참고 메모로 넣는다. 그래서 질문과 숨고르기 재확인이 턴마다 새로 시작하지 않고 한 가설로 모인다. 웹과 구버전 앱은 돌려주지 않아 메모 없이 동작하고, 마지막 턴 응답과 `chat_sessions` 저장에는 이 값이 없다. 대화 턴 모델은 gpt-5.6-luna(추론 강도 low), 마지막 턴 추출은 gpt-5.4-mini다(`lib/chat.ts`의 `CHAT_MODEL`, `EXTRACT_MODEL`). 서버는 모델 응답을 코드로도 다듬는다: 질문이 여러 개면 첫 질문만 남기고, 마지막 턴은 "잠시 기다려 달라"는 마무리 안내를 맨 끝으로 옮기거나 없으면 언어별 문장을 붙인다(위기 안내가 담긴 응답은 건드리지 않음). 빈 응답이나 `lines`가 없는 JSON은 한 번 다시 요청한다. 모델을 gpt-5.5·5.6 계열로 바꾸면 temperature 대신 추론 강도(`reasoning_effort`)를 보낸다(`chatSamplingParams`). 매 턴 지침 맨 앞에 위기 신호 확인 한 줄이 붙는다. 리포트 프롬프트는 전문 관점·경계·핵심 질문·강점 방향·모듈 페이지 지시를 읽는다. 마지막 턴의 추출(extract)은 공통 필드(고민, 감정, 촉발 사건, 반복 패턴, 두려움, 대처·관계·바라는 변화, 요약)에 더해 플레이북의 모듈 필드 2개를 `module_fields`로 뽑는다(말하지 않았으면 null, 새 필드는 모두 optional). 앱은 extract를 해석하지 않고 저장했다가 리포트 요청에 그대로 넘긴다. **5세트 25턴 흐름(2026-10-02 구현, 지금 앱의 기본)**: 요청 `context.flowVersion === 2`에 퀴즈 30문항 답(`quizAnswers`)이 있고 moduleId에 세트 데이터가 있을 때만 쓰고, 아니면 위 20턴 흐름이 그대로 돈다(`chatFlowVersion`). 턴 → 세트·위치 매핑, 세트 ① 인용 문항 선택, 세트 재료 묶음은 `lib/chatSets.ts`(순수 함수), 세트별 질문 데이터는 `lib/modulePlaybooks.ts`의 `MODULE_CHAT_SETS`, 프롬프트는 `lib/chatPrompts.ts`의 `buildChatSystemPromptV2`. 세트 1 장면·2 반복·3 속마음·4 대처·5 힘, 세트마다 ① 퀴즈 답 인용 → ② 상세 → ③④⑤ 모듈 질문. 숨고르기 턴 대신 6·16·21턴 앞머리에서 직전 세트를 정리하고(정리 → 재확인·정정 허락 한 줄 → 인용 → 질문 순서, 정정 허락 줄이 빠지면 서버의 `ensureRecapRecheck()`가 언어별 한 줄을 끼운다. 11턴은 정리 없이 바로 인용), 10턴 점검도 정리 → 재확인 한 줄(빠지면 서버 보충) → 계속 여부를 중립적으로 묻는 질문 순서다, 10턴은 정리+점검, 24턴은 서버가 고정 문구("마지막으로 묻고 싶은 게 있어요.")를 응답 앞에 붙이고 모델은 관점 전환 질문만 쓴다, 25턴 마무리(사용자가 답할 수 없으므로 확인 질문 없이 "이렇게 정리가 되겠군요" 같은 평서문으로 맺는다). 같은 틀 반복을 막으려고 이지선다 출구 문장은 세트 ③ 자리(3·8·13·18턴)에만 턴별로 다른 뜻으로 붙이고, 재진술 앞머리 모양은 턴마다 코드가 4가지 중 하나로 정한다("~군요/~네요" 끝맺음 금지). 24턴 고정 문구는 모델이 같은 문구를 또 써도(따옴표 모양이 달라도) 서버가 한 번만 남긴다. 한국어가 아닌 대화에서 응답에 한글이 섞이면 서버가 한 번 다시 요청하고, 또 섞이면 한글이 든 줄을 뺀다(20턴 흐름에도 적용). 프롬프트에는 이번 세트 후보 문항의 답만 넣는다. 시간 제한 30분. 마지막 턴 extract에 서버가 대화 기록과 턴 번호로 만든 `set_packets`(세트별 인용 문항, 사용자 원문)가 붙는다. 앱(`ChatScreen`)은 항상 `flowVersion: 2`와 QuizScreen이 기록한 30문항(사용자 언어 문구)을 보내고, 화면 상수는 25턴(중간 점검 10턴, 마무리 버튼은 25턴으로 점프)이고, 헤더에는 시계 대신 "이야기 N / 5" 세트 진행이 보이고, 서버가 마무리로 이끄는 27분부터는 "정리 중"으로 바뀐다(2026-10-04 카운트다운 제거 — 30분 상한 자체는 서버 `isFinalTurn`에 그대로). 20턴 폴백용 `quizAnswer`·`quizAnswerPool`도 계속 보낸다. 웹 `components/ChatScreen.jsx`는 v2를 보내지 않아 20턴 그대로다 | `ChatScreen`, `useReplyScroll` |
| 심층 리포트 | `/api/report`, `/api/report/paid`, `/api/report/unlock`, `/api/report-pdf` | `ReportScreen`, `MyReportsScreen` |
| 오늘/올해 운세 | `/api/dailyFortune`, `/api/yearFortune` | `FortuneScreen` (탭 4개: 오늘·이번 주·이달·신년, 상단 제목은 탭마다 다름. 오늘·신년 탭은 같은 구조: 리듬 이름 + 총론 주인공 카드 → 영역별 묶음 카드 한 장 → (오늘만) 행운 포인트(색·숫자, 방향은 ko만) → 12운성·12신살은 접힌 "더 알아보기". 무료는 총론 카드 + 잠긴 혜택 목록. 속도를 늦추는 리듬(`otherChallengesSelf`)의 날에는 무료 총론 대신 판단 없는 페이싱 문구(`fortune.paceFree*`)를 보여 줘 경고 톤이 구독 카드 바로 위에 오지 않게 한다), `HomeScreen` |
| 궁합 | `/api/compatibility` (계산만, DB 기록·LLM 없음) | `CompatibilityScreen` (결과: 두 이름 → 관계 이름 크게 → 점수는 작은 한 줄 → 본문 한 번. 아래 점선 틀 "공유 이미지 미리보기" 안의 공유 카드는 같은 위계에 본문 대신 좋은 점·주의할 점, 틀은 캡처 밖) |
| 신년 리포트 | `/api/yearReport` (`lib/yearReport*.ts`) | `YearReportScreen` (구매 전 미리보기는 세로 스크롤, 구매 후 읽기는 심층 리포트와 같은 페이지 넘김: 표지 → 한눈에 보기 → 5개 영역 → 12개월 3개월씩 4쪽 → 실행 계획 → 마무리) |
| 사주 유형·공유 카드 | 유형 분류는 서버(`lib/sajuType.ts`)에서 하고 `/api/saju`, `/api/verification-code` 응답에 실린다. 앱의 `mobile/lib/sajuType.ts`는 타입 정의뿐이라 서버와 키를 맞춰야 한다 | `TypeScreen`(공유 카드는 궁합처럼 점선 틀 "공유 이미지 미리보기" 안, 같은 유형 유명인: `mobile/lib/sajuTypeCelebrities.ts`, 사용자 언어권 인물 먼저 최대 3명, 인물마다 지역 태그·한국 인물 한글 이름, 생년월일 출처는 항목 주석. 웹 사본 `lib/sajuTypeCelebrities.ts`는 import하는 곳 없음), `ShareCardsScreen` |

### 리포트 (무료/유료 분리)
무료 절반을 먼저 생성하고, 유료 절반은 구매 후 `/api/report/paid`가 만든다. 잠금은 `lib/reportLock.ts`. 생성 품질은 `lib/reportQuality.ts`: 결정론적 검사 → 표적 패치 → 리뷰어 1회 → 패치 1회 → 최종 게이트(한자 제거·ES 성별/usted 등 포함). 프롬프트는 `lib/reportPrompts.ts`, 호출은 `lib/report.ts`.
무료 파트 마지막(페이월 직전)에 실제 계산된 나이+기운 전환을 사실만 담백하게 미리 보여주는 페이지가 있다(`upcoming_period_preview_heading`/`_body`, `FREE_PART_TEXT_FIELDS`에 포함되어 유료 파트 프롬프트에 "이미 쓰인 앞부분"으로 전달됨). 잠긴 본편(`upcoming_period_heading`/`_body`)은 같은 사실을 반복하지 않고 왜/무엇을 준비하면 좋을지로 이어 쓴다 — 두 필드 모두 `describeUpcomingPeriod()`가 만든 같은 나이 데이터 줄을 쓰므로 나이 환각 가드(`path.startsWith("upcoming_period")`)가 둘 다에 자동 적용된다.
모듈 전용 페이지 2장: `module_map`(무료, "다가오는 시기" 미리보기 앞)과 `module_deep`(유료, `LOCKED_KEYS`, 행동 가이드 앞). 둘 다 `{ title, body }`이고, 제목은 플레이북의 고정 문구를 코드(`parseReport`)가 붙이며 모델은 본문만 쓴다. 서버가 요청의 검증된 `moduleId`를 `ReportContext.moduleId`에 넣어야 생기므로, `moduleId`를 안 보내는 구버전 요청과 이전 리포트에는 두 필드가 없다. 무료 응답은 유료 필드를 모두 비워서 보내되 `module_deep`의 제목만 남긴다(잠긴 챕터 이름을 보여 주기 위함, 비밀 아님). 앱(`ReportScreen`의 `ModulePage`)은 두 제목을 목차 라벨로도 쓰고, 필드가 없으면 페이지를 건너뛴다. 구매 후 유료 절반 요청의 `freePart`에 `module_map`을 실어 보내 반복을 막는다.

강점 3+1 분할: 요청 `context.strengthsSplit: true`를 보내는 앱에만 적용된다(보내지 않는 구버전 앱은 예전처럼 유료 강점 4개). 분할이면 무료 절반에 `strengths_preview`(3개, 심리검사 답·상담 근거, 플레이북 강점 방향 3개에 하나씩)가 들어가고, 유료 `strengths`는 핵심 강점 1개(일간의 기질에서 찾는, 강점 방향 밖의 능력)다. 유료 절반은 `freePart`에 `strengths_preview`가 실려 와야 1개로 쓴다(`strengthsSplitFor()`). 모델이 무료 강점을 빠뜨리면 그 리포트는 유료 4개로 돌아가고, 무료 응답의 `locked_shape.strengths`도 그에 맞춰 1 또는 4다. 핵심 강점 제목이 무료 강점 제목과 단어가 겹치면 결정론적 검사가 제목·본문을 함께 다시 쓰게 한다. 앱(`ReportScreen`)은 `strengthsSplit: true`를 보내고, 무료 강점을 모듈 페이지 뒤·다가오는 시기 미리보기 앞에 잠금 없이 보여 준다. 유료 쪽은 "핵심 강점" 1장(목차 "핵심 강점과 취약점")이며, 구매 후 유료 절반 요청의 `freePart`에 `strengths_preview`를 실어 보낸다. `strengths_preview`가 없는 이전 리포트는 예전처럼 유료 강점 4장.

5세트 흐름 리포트(2026-10-02): 요청 `context.flowVersion === 2`에 퀴즈 30문항 답(`quizAnswers`)이 있고 moduleId에 세트 데이터가 있을 때만 쓰고, 아니면 위 리포트 그대로다. 판정과 재료 정제는 `lib/reportSets.ts`의 `resolveReportSets()`로 두 라우트(`/api/report`, `/api/report/paid`)가 하고 결과를 `ReportContext.reportSets`에 넣는다(클라이언트 값은 믿지 않음). 재료는 30문항 전체(프롬프트에는 차원별로 묶고 2~3점·0점 표시)와 extract의 `set_packets`인데, 묶음에서는 사용자 원문만 받고 인용 문항은 같은 30문항으로 서버가 다시 고른다. 프롬프트는 섹션마다 우선 근거로 쓸 세트를 정한다(`opening_scene` ← 세트 1, `module_map` ← 세트 2, `strengths_preview` ← 세트 5, `module_deep`·`psychology_fact`·`mindset_guide` ← 세트 3, `weaknesses`·`behavior_guides` ← 세트 4, `closing_body` ← 24턴 관점 전환 답; 대화 없는 세트는 그 세트 후보 문항 답). 검사 × 대화 카드가 `answer_notes`·`chat_*_note`를 대신한다: `set_card_1`(무료)과 `set_cards_2to5`(유료 4장, `LOCKED_KEYS`), 각 카드는 세트·주제·"검사에서 고른 답"(코드가 붙임)과 "대화에서 한 말" 인용·읽어 주기 3문장(모델이 씀). 대화 없는 세트는 인용이 빈 값이다. 무료 응답 `locked_shape`에 `set_cards_2to5: 4`가 붙는다. 결정론적 검사(`lib/reportQuality.ts`)는 v2일 때 카드도 본다: 구간별 카드 수와 세트 자리, 퀴즈 답이 30문항 데이터와 같은지, 인용이 그 세트 사용자 원문의 일부인지(공백·문장부호 무시, "…"로 건너뛴 조각 허용), 대화 없는 세트의 인용이 비었는지, 읽어 주기가 3문장인지. 인용이 어긋나면 기존 패치 호출이 그 세트 원문에서 구절을 다시 고른다.
앱(`ReportScreen`)은 리포트 요청 `context`에 `flowVersion: 2`와 30문항 답을 보내고(`set_packets`는 `chatExtract`에 실려 감), 구매 후 유료 절반 요청의 `freePart`에 `set_card_1`을 싣는다. `set_card_1`이 있는 리포트면 카드 페이지(`SetCardPage`: 세트 주제 eyebrow, "검사에서 고른 답", "대화에서 한 말", 읽어 주기)를 쓴다 — 카드 1은 무료 구간 심리검사 분석 바로 뒤, 카드 2~5는 유료 구간 "직접 나눈 이야기" 뒤(잠긴 동안은 `locked_shape.set_cards_2to5` 수만큼 자리만 잡음). 이때 상담 스냅샷·사건·반복 패턴·두려움 페이지와 실제 응답 인용 페이지는 띄우지 않는다. 목차에는 "검사 × 대화"(무료)와 "검사 × 대화 — 이어지는 4장"(잠김, 페이월 챕터 목록에도 나옴)이 들어간다. 카드 필드가 없는 이전 리포트는 예전 페이지 그대로다.
PDF(`/api/report-pdf` → `lib/pdf/reportPdf.tsx`)도 같은 규칙이다: 라우트가 `set_card_1`·`set_cards_2to5`를 세트 자리에 맞는 것만 받아 정리하고, 카드가 있으면 카드 1은 심리테스트 분석 뒤, 카드 2~5는 "직접 나눈 이야기" 자리에 넣으며 상담 카드·`chat_*_note`·"내가 고른 답" 섹션은 뺀다. 카드가 없는 이전 리포트는 예전 PDF 그대로다.

페이월(`ReportScreen`의 `PaywallPage`)은 잠긴 페이지 전체를 한 장으로 대신하고(잠긴 양은 쪽이 아니라 목차 장 수로 말한다 — 표지 "15개 장 중 7개 공개", 페이월 "8개 장이 잠겨 있어요"; 카운터는 미리보기 쪽 + 페이월 1쪽만 센다), 카드 안에 목차(`tocEntries`)에서 잠긴 항목의 제목을 자물쇠와 함께 나열한다(신년 리포트 미리보기의 잠긴 챕터 목록과 같은 모양). 모듈 페이지 제목과 핵심 강점 라벨은 목차를 통해 자동으로 들어간다. 카드는 세로 스크롤 영역이라 작은 화면에서도 잘리지 않는다.

리포트 읽기 화면의 공용 부품: `mobile/components/ReportPager.tsx`(상단 바 뒤로·진행 막대·쪽 카운터·선택 버튼, 가로 페이지 넘김, 양 가장자리 탭(페이지 여백 안 22pt 띠, 넓은 화면에서는 기둥 밖 여백까지 — 내용 위의 탭을 가로채지 않음), 하단 슬롯). 심층 리포트와 신년 리포트가 함께 쓰고, 현재 쪽은 화면이 들고 있어 목차 점프도 같은 값으로 움직인다. 심층 리포트는 페이월 쪽에서 가장자리 탭을 끈다. 첫 장에는 한 번만 보이는 넘기기 안내가 뜨고(한 장 넘기면 리포트 종류별로 기기에 저장, `lib/readerHint.ts`), 두 리포트의 마지막 장은 공용 `mobile/components/ReportClosingPage.tsx`다: 맺음말 → 한 줄 요약(심층=`psychology_takeaway` 첫 문장, 신년=부제) + 공유(텍스트)·PDF → 다음 할 일 카드(심층=기기에 리포트가 없는 다음 검사 추천, 같은 track 우선, 탭하면 그 퀴즈로 / 신년=실행 계획 1단계, 탭하면 실행 계획 쪽으로) → 작은 면책.

사주 원국 그림: 공용 `mobile/components/FourPillarsChart.tsx`가 저장된 사주 결과의 `fourPillars`(네 기둥, 시주는 시간 모름이면 null)와 `elements`(오행 비율)로 그린다(`react-native-svg`). 기둥마다 위 천간·아래 지지 칸에 언어별 오행 이름(한자는 작은 보조), 일간 칸에 "나" 표시, 아래 오행 분포 막대와 그 범례(색 점 + 오행 이름 + %), 캡션 두 줄("가장 많은 기운"은 동률이면 모두, "당신 자신"은 일간)로 두 개념을 나눈다. 모양이 맞지 않는 이전 데이터면 그리지 않는다. 홈의 "나의 사주 원국" 칸(탭 불가라 테두리 카드 없이)과 사주 유형 화면(`TypeScreen`, 히어로 카드 아래 + 그 화면의 공유 카드 맨 위, 공유 카드에선 캡션 가운데 정렬)에 쓰인다. 영역 공유 카드(`ShareCardsScreen`, 9:16 고정)에는 없다.

계산 근거 배지: 공용 `mobile/components/CalcSourceBadge.tsx`(문구 `common.calcSourceBadge`)가 심층 리포트 커버와 사주 유형 화면(`TypeScreen`) 히어로 카드에 붙는다. 정적 텍스트이고 탭 대상이 아니다.

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
- 개발용 QA 모드(`?qa=`, 픽스처): `mobile/dev/README.md`. 5세트 리포트 샘플(`QA_DEEP_REPORT_V2`, ko·es)은 `scripts/gen-qa-fixtures.mts --v2-only`로 다시 만든다(퀴즈는 실제 문항, 세트 묶음은 서버 `buildSetPackets`로 만듦).
- 챗봇 시뮬레이션: `scripts/sim-chat.mts`. 모듈별 페르소나 11개(+영어·스페인어 1개씩)가 자기 모듈의 퀴즈 결과로 대화하고, 결과(대화, extract, 턴별 응답 시간·토큰·숨김 메모 `formulation`, 비용)를 `scripts/out/`(git 제외)에 JSON으로 남긴다. 앱처럼 턴마다 `formulation`을 돌려주고, `--no-formulation`이면 웹·구버전 앱처럼 돌려주지 않는다. `--bot-model <id>`로 챗봇 턴만 다른 모델로 돌려 모델을 비교한다(사용자 시뮬레이터와 추출은 mini 고정), `--reasoning <none|low|medium|high>`로 추론 강도 지정). 10턴 중간 점검에서는 항상 "조금 더"를 골라 20턴을 채운다. `--flow v2`면 5세트 25턴 흐름: 페르소나가 실제 퀴즈 30문항 답(페르소나별 강한 차원은 2~3점, 나머지 0~1점)을 갖고 대화하고, 서버의 마지막 턴에서 멈추며 extract에 `set_packets`를 붙인다. `--checkpoint finish`면 10턴에서 마무리를 골라 바로 25턴으로 넘어간다(앱의 마무리 버튼과 같은 요청). v2 결과에는 턴별 세트 위치와 결정론적 점검(세트 ① 인용이 서버 선택과 같은지, 24턴 고정 문구, `set_packets`)이 함께 남는다.
- 챗봇 채점: `scripts/judge-chat.mts`. sim-chat 결과 파일을 상위 모델(기본 gpt-5.5)이 루브릭(기법 ①~⑦, 모듈 전문성, 옆 모듈로 새지 않음, 반복 없음, 자연스러움, 위반 5종, 항목별 0~2점)으로 채점한다. 모듈 플레이북과 겹침 점검표를 기준으로 삼는다. 점수표를 `scripts/out/<label>_*.json`과 `.md`로 남긴다. 채점자에게 사용자가 상담 전에 본 결과(심리검사 유형, 사주, 퀴즈 답)를 같이 넘겨 인용을 지어낸 말로 보지 않게 한다. 개편 전 기준선은 이 채점기로 다시 매긴 `q1e-baseline_*`이고, 개편 후 최종 비교와 모델 비교는 `q1e-{mini,gpt54,sol}_*`다(요약은 `TODO_2026-09-23.md` 15번). 이후 챗봇 변경은 이 기준선과 비교한다. 5세트 흐름의 최종 비교(ko·en·es 3명, 공통 평균 1.81, 세트 준수 2.00)는 `q11-final*`이고 비교표는 `TODO.md` 11번에 있다. v2 결과 파일이면 20턴 단계 대신 세트 구조와 세트 ① 기대값을 채점자에게 주고, 세트 준수 항목 5개(① 인용 정확도, ③④⑤ 축 분리, 같은 장면 반복 없음, 시작 정리·재확인, 24턴 고정 문구 — 마지막은 코드 판정)를 공통 항목과 따로 매긴다. 표의 "전 항목 평균"은 공통 항목만이라 기준선과 그대로 비교되고, "세트 준수 평균"이 별도 줄이다.
- 챗봇 프롬프트 확인(호출 없음): `scripts/dump-chat-prompt.mts <moduleId> <턴,...> [locale] [--legacy] [--elapsed N]`. 기본은 5세트 흐름(실제 퀴즈 정의로 30문항 답을 만듦), `--legacy`는 20턴 흐름. stdout은 프롬프트만, 턴별 요약(세트·위치, 인용 문항, 프롬프트 속 퀴즈 문항 수)은 stderr. 5세트 사례 검사는 `scripts/check-chat-sets.mts`, 세트 데이터 검사는 `scripts/check-playbook-sets.mts`.
- OpenAI 사용량 집계: `scripts/usage-report.mts`
- 디자인 진단 기록: `/impeccable critique` 결과가 `.impeccable/critique/<시각>__<대상>.md`에 쌓인다(앱 전체는 `__mobile-screens`, 2026-10-03 27/40 → 2026-10-04 29/40 → 같은 날 두 차례 수정 후 30/40, P1 0). 탐지기 CLI는 RN StyleSheet를 읽지 못해 앱 코드에선 항상 0건이므로 화면 오버레이와 사람 리뷰가 근거다.
- 앱 화면 확인: `mobile-web` 프리뷰(포트 8082) 또는 iOS 시뮬레이터 dev-client. 설정은 `.claude/launch.json`

## 6. 환경 변수 (이름만)

`OPENAI_API_KEY`, `KASI_API_KEY`, `REVENUECAT_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. 로컬은 `.env.local`, 프로덕션은 Vercel 프로젝트 설정. 어떤 것이 Vercel에 들어 있는지는 최신 HANDOFF의 확인 항목을 볼 것.
