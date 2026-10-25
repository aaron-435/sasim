# 작업 지시서 20: 레딧 글 점수화와 dry-run 요약 파일

## 목표
수집기(`scripts/reddit/collect.mts`)가 모은 새 글에 점수를 매기고, 상위 글을 마크다운 요약 파일 `marketing/reddit/digest/YYYY-MM-DD.md`로 쓴다. `npm run reddit:digest -- --dry-run`이 수집 → 점수 → 파일 쓰기까지 하고 종료 코드 0으로 끝나야 한다. LLM 메모·사주 계산·경쟁사·섀도 점검은 이번 작업이 아니다. 요약 파일에 그 자리만 만든다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/reddit/score.mts`, `scripts/reddit/render.mts`, `scripts/reddit/score.test.mts`
- 수정: `scripts/reddit/digest.mts` (수집 뒤에 점수화와 파일 쓰기를 붙인다. 기존 출력 줄은 모두 유지)

### score.mts
- export `scorePost(post: RedditPost, config: RedditConfig, now: number /*ms*/): Scored`
  `Scored = { post: RedditPost; score: number /*소수 1자리 반올림*/; reasons: string[]; birth: { date: boolean; time: boolean } }`
- export `rankPosts(posts, config, now): Scored[]` — 점수 0 초과만, 점수 내림차순, 같으면 최신 글 먼저.
- 검사 대상 텍스트 = 제목 + 본문, 대소문자 무시.
- 키워드: `config.keywords`에서 따옴표 `"`를 지운 값. ASCII 키워드는 단어 경계(`\b`) 정규식, 공백은 `\s+`로. 비ASCII(예: `사주`)는 부분 문자열.
- 관련도(relevance) 점수 — 다음을 더한다:
  - 일치한 서로 다른 키워드마다 +3, 최대 +6. 근거 예: `키워드 saju, four pillars +6`
  - 보조 키워드(`config.auxKeywords`, 예: bazi): 위 키워드가 하나 이상 같이 있을 때만 +1. 단독이면 0점이고 근거에 `bazi 단독(가산 없음)`.
  - 생년월일 패턴이 있으면 +3 (`생년월일 +3`), 출생 시각 패턴이 있으면 +1 (`출생 시각 +1`).
  - 글 서브레딧이 `config.subreddits`에 있는 감시 서브레딧이면 +2 (`감시 서브레딧 +2`). 비교는 대소문자 무시.
  - 질문 신호(제목에 `?`, 또는 제목·본문에 `help|read my|interpret|anyone|what does|meaning`)는 위 항목 합이 0보다 클 때만 +1 (`질문 +1`).
  - 위 합이 0이면 최종 점수 0. 이후 곱셈 단계는 하지 않는다.
- 곱셈 단계(관련도 × 아래 셋):
  - 서브레딧 가중치: 감시 서브레딧이면 그 `weight`, 아니면 1.0. 근거 `×1.5 r/ChineseZodiac`
  - 글 나이: 24시간 이내 1.0, 그 뒤 7일까지 선형으로 0.3까지, 7일 넘으면 0.2. `createdUtc`가 0이면 0.5. 근거 `5시간 ×1.0`
  - 댓글 수: `null`(RSS)이면 곱하지 않고 근거 `댓글 수 없음(RSS, 제외)`. 0개 ×1.3, 1~3개 ×1.1, 4~10개 ×1.0, 11개 이상 ×0.7. 근거 `댓글 0 ×1.3`
- 생년월일 패턴(영어·숫자·한국어, 연도는 1900~2030만 인정):
  `1990-05-12`, `1990/5/12`, `05/12/1990`, `12.05.1990`, `May 12, 1990`, `12 May 1990`, `May 12th 1990`, `1990년 5월 12일`. 월 이름은 영어 전체·3글자 약어.
- 출생 시각 패턴: `14:30`, `2:30 pm`, `2pm`, `2 am`, `오전 3시`, `오후 11시`, `새벽 3시`. (숫자:숫자는 날짜 구분자와 헷갈리지 않게 `\b\d{1,2}:\d{2}\b`.)
- 날짜·시각 패턴 함수는 `export function detectBirth(text: string): { date: boolean; time: boolean }`로 따로 내보낸다(7번에서 재사용).

### render.mts
- export `renderDigest(input): string`, export `writeDigest(markdown: string, date: string, dir?: string): string /*쓴 파일 경로*/`.
- 결과 폴더 기본값 `marketing/reddit/digest/` (`state.mts`의 `DEFAULT_STATE_DIR`처럼 `new URL(..., import.meta.url)`). 없으면 만든다.
- 같은 날 파일이 이미 있으면 덮어쓰지 않고 `YYYY-MM-DD-2.md`, `-3.md`처럼 번호를 붙인다(첫 실행 결과를 지키기 위해).
- input 타입:
  `{ date: string; generatedAt: Date; dryRun: boolean; stats: SourceStat[]; requests: number; todayCount: number; cap: number; totalNew: number; top: Scored[]; competitors?: RedditPost[]; shadow?: { alert: string | null; lines: string[] } }`
- 파일 구성(제목·라벨은 한국어):
  ```
  # 레딧 요약 2026-10-26

  > 모드: dry-run · LLM 비용: $0 (dry-run) · 요청 26 (오늘 180/200) · 새 글 34 · 생성 08:12

  ## 1. 수집 통계
  | 출처 | 가져옴 | 새 글 | 비고 |
  |---|---|---|---|
  | sub:ChineseZodiac | 25 | 7 | rss |
  | kw:saju | 0 | 0 | 실패 (http 429) |

  ## 2. 상위 글 (3)
  ### 1. <제목>
  - r/ChineseZodiac · 5시간 전 · 댓글 0 (RSS면 `댓글 알 수 없음`) · 작성자 u/xxx
  - 링크: <퍼머링크>
  - 점수 21.1 — 키워드 saju +3 · 생년월일 +3 · 감시 서브레딧 +2 · ×1.5 r/ChineseZodiac · 5시간 ×1.0 · 댓글 수 없음(RSS, 제외)
  - 본문: > 본문 앞 200자(줄바꿈은 공백으로, 넘치면 …)
  - 메모: (dry-run)
  - 사주: (dry-run)

  ## 3. 경쟁사 언급
  (아직 연결 안 됨)

  ## 4. 섀도 필터 점검
  (아직 연결 안 됨)
  ```
- `shadow.alert`가 있으면 맨 위 `#` 제목 바로 아래에 `> ⚠️ <alert>` 한 줄.
- `competitors`가 배열이면 섹션 3에 글마다 `- [r/sub] 제목 — 링크` 줄, 빈 배열이면 `없음`. undefined면 `(아직 연결 안 됨)`. 섹션 4도 같은 방식으로 `shadow.lines`.
- 상위 글이 0개면 섹션 2에 `새 글 중 점수 있는 글 없음`.
- dry-run이 아니면 메모·사주 칸에 `(미연결)` (8·7번에서 채운다).
- 나이 표기: 60분 미만 `N분 전`, 48시간 미만 `N시간 전`, 그 외 `N일 전`, createdUtc 0이면 `시각 모름`.
- 제목·본문의 마크다운 깨짐 방지: 줄바꿈 제거, `[`, `]`, `|`, `` ` ``, 줄 앞 `#` 이스케이프(`\`).
- 시간·날짜는 로컬 시간 기준. 날짜 문자열은 `state.mts`의 로컬 날짜 계산과 같은 방식(필요하면 `state.mts`에 있는 `todayLocal`을 export해서 쓴다. 로직은 바꾸지 않는다).

### digest.mts
- 수집·통계 출력 뒤, seen 저장 전에: `rankPosts(posts, config, Date.now())`, 상위 `config.topN`개로 `renderDigest` → `writeDigest`.
- 콘솔 끝에 `scored: N posts > 0, top K → <파일 경로>` 한 줄.
- `limit`(`--limit`)은 나중에 메모 개수에 쓰므로 상위 글 수는 `config.topN` 그대로.
- 요청 실패가 있어도 종료 코드 0.

### score.test.mts
- 프레임워크 없이 `node:assert/strict`. `npx tsx scripts/reddit/score.test.mts`로 실행. 실패하면 종료 코드 1, 통과하면 `score tests: N passed`.
- 설정은 실제 `loadConfig()`로 읽는다. `now`는 고정값.
- 샘플 5개(모두 직접 만든 가짜 글, 실제 레딧 글 복사 금지):
  1. r/ChineseZodiac, "Can someone read my saju? Born 1994-03-08 at 14:30", 1시간 전, 댓글 0 → 1위
  2. r/languagelearning, 제목 "Bazi means what in Swahili?", 키워드 없음 → 점수 0 (rankPosts 결과에 없음)
  3. r/astrology, "Four pillars vs western chart", 날짜 없음, 2일 전, 댓글 null
  4. r/Bazi_Astrology, "My day master is Yin Water, bazi beginner", 10시간 전, 댓글 12
  5. r/Horoscope, "Mercury retrograde vibes this week", 키워드 없음, 3시간 전 → 감시 서브레딧이라 점수 > 0이지만 1·3·4보다 낮음
- 추가 단언: `detectBirth`가 위 생년월일 패턴 8개를 모두 date: true, `"I have 2 cats and 1990 dollars"`는 date: false, `"call me at 10:30"`은 time: true. 샘플 3의 reasons에 `RSS`가 들어 있음. 샘플 4의 reasons에 bazi +1 가산이 있음.

## 제약
- 건드리면 안 되는 파일: `lib/**`, `app/**`, `mobile/**`, `marketing/reddit/config.json`, `scripts/reddit/config.mts`, `scripts/reddit/fetch.mts`, `scripts/reddit/collect.mts`, `package.json`. `state.mts`는 `todayLocal` export 추가만 허용.
- 스타일: 기존 `scripts/reddit/*.mts`를 따른다. 파일 맨 위 1~2줄 주석으로 역할 설명, ESM `.mts`, import 경로에 `.mts` 확장자, 새 의존성 없음, 짧은 헬퍼 함수, 주석 적게.
- `.env*` 파일은 읽지도 열지도 않는다.
- **실제 레딧에 요청하지 마라.** 오늘 하루 요청 상한이 거의 찼다. `npm run reddit:digest`를 실행하려면 반드시 `REDDIT_BASE_URL=http://localhost:<port>`로 로컬 모의 서버를 띄워서 해라(RSS `<entry>` 2~3개를 돌려주는 정도면 된다). 모의 실행 뒤 `marketing/reddit/state/seen.json`, `requests.json`은 실행 전 내용으로 되돌려라(먼저 복사해 두고 복원).

## 완료 조건
1. `npx tsc --noEmit --strict --target esnext --module esnext --moduleResolution bundler --allowImportingTsExtensions --skipLibCheck --types node scripts/reddit/*.mts` → 오류 0.
2. `npx tsc --noEmit` → 오류 0.
3. `npx tsx scripts/reddit/score.test.mts` → 통과, 종료 코드 0.
4. 모의 서버로 `npm run reddit:digest -- --dry-run` → `marketing/reddit/digest/<오늘>.md`(또는 `-2.md`)가 생기고 위 섹션 4개가 있다. 확인 뒤 모의 실행으로 만든 digest 파일은 지우고 state 파일은 복원한다.

## 참고
- 기존 코드: `scripts/reddit/digest.mts`, `collect.mts`(`RedditPost`, `SourceStat` 타입), `config.mts`(`RedditConfig`), `state.mts`.
- 실제 수집은 대부분 RSS라 `numComments`가 null인 글이 많다.
