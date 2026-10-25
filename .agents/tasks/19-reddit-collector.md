# 작업 지시서 19: 레딧 수집기 (읽기 전용)

## 목표
레딧 공개 JSON 엔드포인트를 로그인·쿠키 없이 천천히 읽어, 감시 서브레딧 새 글과 키워드 검색 결과를 모으고, 이미 본 글은 상태 파일로 거른다. `npm run reddit:digest -- --dry-run`이 수집 통계를 콘솔에 찍고 종료 코드 0으로 끝나야 한다. 레딧에 쓰는 동작(게시·투표·로그인·OAuth)은 절대 만들지 않는다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/reddit/fetch.mts`, `scripts/reddit/collect.mts`, `scripts/reddit/state.mts`
- 수정: `scripts/reddit/digest.mts` (설정 로드 뒤 수집 실행과 통계 출력을 붙인다. 기존 인자 파싱·출력 두 줄은 유지)

### state.mts
- 상태 폴더 기본값: `marketing/reddit/state/` (`config.mts`의 `DEFAULT_CONFIG_PATH`처럼 `new URL(..., import.meta.url)`로 계산). 없으면 만든다(`mkdirSync recursive`).
- `seen.json`: `{ "<post id>": "<처음 본 ISO 시각>" }`. `loadSeen()`, `saveSeen()`. 저장할 때 14일 지난 항목은 지운다.
- `requests.json`: `{ "date": "YYYY-MM-DD"(로컬 날짜), "count": N }`. 날짜가 바뀌면 0부터. 하루 요청 상한(`config.dailyRequestCap`) 계산에 쓴다. 실행 끝에 저장.
- 파일이 깨져 있으면 빈 상태로 시작하고 경고 한 줄만 출력(프로세스를 죽이지 않음).

### fetch.mts
- Node 내장 `fetch`만 사용. 새 npm 의존성 금지. 쿠키·Authorization 헤더 금지.
- 기본 호스트 `https://www.reddit.com`. 환경 변수 `REDDIT_BASE_URL`이 있으면 그걸 쓴다(로컬 모의 서버 테스트용).
- User-Agent: `fatesaid-listening/0.1 (read-only digest; by /u/<config.account>)`.
- 요청 간격: 직전 요청 시작부터 `config.requestIntervalMs` 이상 지나야 다음 요청(첫 요청은 바로).
- 요청마다 20초 타임아웃(`AbortSignal.timeout`).
- 하루 상한: 오늘 요청 수가 상한에 닿으면 요청하지 않고 `{ ok: false, reason: "cap" }` 반환.
- 429·403·5xx: 지수 백오프로 최대 2회 재시도(대기 = 간격 × 2, × 4). 429면 `Retry-After` 헤더가 있으면 그 초(최대 60초)를 대신 쓴다. 그래도 실패하면 같은 경로의 `.rss`를 한 번 시도한다(`/r/x/new.json?...` → `/r/x/new.rss?...`). RSS도 실패하면 `{ ok: false, reason: "http", status, error }`.
- 네트워크 오류·타임아웃도 재시도 대상, 최종 실패는 `reason: "network"`.
- 모든 시도(재시도·RSS 포함)는 요청 수에 센다.
- 반환 타입 예: `{ ok: true, format: "json", data } | { ok: true, format: "rss", xml } | { ok: false, reason, status?, error }`. 예외를 밖으로 던지지 않는다.

### collect.mts
- 공통 글 타입 `RedditPost`를 export:
  `{ id: string; subreddit: string; title: string; body: string; author: string; createdUtc: number /*초*/; numComments: number | null /*RSS면 null*/; permalink: string /*https://www.reddit.com/... 전체 URL*/; url: string; sources: string[] /*예: "sub:ChineseZodiac", "kw:saju"*/ }`
- 수집 대상:
  - 서브레딧마다 `/r/<name>/new.json?limit=50&raw_json=1`
  - 키워드마다 `/search.json?q=<encodeURIComponent(keyword)>&sort=new&t=week&limit=50&raw_json=1` (`config.keywords`만. `auxKeywords`는 단독 검색하지 않는다)
- JSON 정규화: `data.children[].data`에서 `id`, `subreddit`, `title`, `selftext`→body, `author`, `created_utc`, `num_comments`, `permalink`(앞에 `https://www.reddit.com` 붙임), `url`. `kind !== "t3"`는 버린다.
- RSS(Atom) 정규화: 의존성 없이 정규식으로 `<entry>`를 나눠 `<id>`(t3_ 접두사 제거), `<title>`, `<author><name>`(/u/ 접두사 제거), `<published>` 또는 `<updated>`, `<link href>`, `<content>`(HTML 엔티티 풀고 태그 제거), `<category term>`(서브레딧)을 뽑는다. `numComments`는 null.
- 여러 출처에서 같은 id가 나오면 하나로 합치고 `sources`에 출처를 추가.
- 반환: `{ posts: RedditPost[] /*seen에 없던 것만*/, stats: SourceStat[], requests: number }`
  `SourceStat = { source: string; fetched: number; fresh: number; failed: null | { reason: string; status?: number; error?: string }; format: "json" | "rss" | null }`
- 이 함수는 seen을 바꾸지 않는다. seen 갱신은 digest.mts에서.

### digest.mts
- 설정 출력 두 줄 뒤에 수집 실행. 출처별 한 줄씩 출력: `sub:ChineseZodiac  fetched 25  new 7` / 실패면 `FAILED (http 429)`. RSS로 대체됐으면 `(rss)` 표시.
- 마지막 줄: `total new posts: N, failed sources: M, requests: R (today R2/cap)`.
- 새 글 id를 seen에 넣고 저장(dry-run이어도 저장한다). 요청 수 저장.
- 요청 실패가 있어도 종료 코드 0. 설정·인자 오류만 1.
- 요약 파일 쓰기, 점수화, LLM은 이번 작업이 아니다(3번 이후).

## 제약
- 건드리면 안 되는 파일: `lib/**`, `app/**`, `mobile/**`, `marketing/reddit/config.json`, `scripts/reddit/config.mts`(읽어서 import만), `package.json`.
- 스타일: `scripts/reddit/config.mts`를 따른다. 파일 맨 위 1~2줄 주석으로 역할 설명, ESM `.mts`, import 경로에 `.mts` 확장자, 의존성 없음, 짧은 헬퍼 함수. 주석은 적게.
- `.env*` 파일은 읽지도 열지도 않는다.

## 완료 조건
1. `npx tsc --noEmit --strict --target esnext --module esnext --moduleResolution bundler --allowImportingTsExtensions --skipLibCheck --types node scripts/reddit/*.mts` → 오류 0.
2. `npx tsc --noEmit` → 오류 0.
3. `npm run reddit:digest -- --dry-run` 실제 실행 1회 → 13개 출처(서브레딧 7 + 키워드 6) 각각 한 줄과 total 줄이 나오고 종료 코드 0. (레딧이 막아도 실패로 기록되고 0이어야 함.) 실레딧 요청은 이 1회만 하라. 반복 테스트는 `REDDIT_BASE_URL`로 로컬 모의 서버를 써라.
4. `marketing/reddit/state/seen.json`, `requests.json`이 생긴다.

## 참고
- 기존 코드: `scripts/reddit/config.mts`, `scripts/reddit/digest.mts`, `marketing/reddit/config.json`.
- 실행은 `tsx`(package.json `reddit:digest` 스크립트).
