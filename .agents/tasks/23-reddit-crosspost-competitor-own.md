# 작업 지시서 23: 레딧 크로스포스트 묶기와 경쟁사 자사 글 제외

## 목표
아침 요약의 상위 N개에서 (1) 한 작성자가 같은 글을 여러 서브레딧에 올린 크로스포스트를 한 칸으로 묶고, (2) 경쟁사가 직접 올린 자사 글을 빼서 경쟁사 섹션에만 둔다. 실측(2026-10-26)에서 상위 10칸 중 5칸이 한 사람의 크로스포스트, 2칸이 경쟁사 자사 글이었다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/reddit/dedupe.mts`
- 수정: `marketing/reddit/config.json`, `scripts/reddit/config.mts`, `scripts/reddit/competitors.mts`, `scripts/reddit/render.mts`, `scripts/reddit/digest.mts`, `scripts/reddit/score.test.mts`, `scripts/reddit/competitors.test.mts`
- 그 외 파일은 건드리지 않는다. `scripts/reddit/score.mts`의 점수 계산은 바꾸지 않는다.

### config.json / config.mts
- `competitors[]` 각 항목에 `accounts: string[]`(레딧 사용자명, `u/` 없이), `subreddits: string[]`(서브레딧명, `r/` 없이) 필드를 추가한다. 둘 다 필수, 빈 배열 허용. 기존 `aliases`·`domains`와 같은 `strArr(..., true)` 방식으로 검증하고 `Competitor` 타입에 추가.
- 값: PAL:JA `accounts: ["getpalja"]`, `subreddits: []` / Youra `accounts: []`, `subreddits: ["Youra_Official"]` / 나머지 셋은 둘 다 `[]`.

### competitors.mts
- `export function competitorOwner(post: RedditPost, competitors: Competitor[]): string | null` — 경쟁사가 직접 올린 글이면 그 경쟁사 `name`, 아니면 `null`. 설정 순서상 첫 번째 일치를 반환. 판정(하나라도 맞으면):
  1. `post.author`가 `accounts` 중 하나와 대소문자 무시로 같음(빈 작성자는 불일치).
  2. `post.subreddit`이 `subreddits` 중 하나와 대소문자 무시로 같음.
  3. `post.url`(링크 글의 대상 주소)에 경쟁사 `domains` 중 하나가 기존 `termRe` 규칙으로 걸림. 본문 속 도메인 언급만으로는 자사 글로 보지 않는다(사용자가 경쟁사에 대해 묻는 글은 답할 대상이라서).
- `CompetitorHit`에 `own: boolean` 추가. `findCompetitorMentions`는 이름·별칭·도메인 언급이 없어도 `competitorOwner`가 걸리면 그 경쟁사를 `matched`에 넣고 `own: true`로 결과에 포함한다. `matched`는 여전히 중복 없이 설정 순서. 언급만 있는 글은 `own: false`.

### dedupe.mts (새 파일, 첫 줄 한 줄 주석)
- `export type TopPost = Scored & { crossposts: RedditPost[] }`
- `export function postFingerprint(post: RedditPost): string` — 본문을 `normalize("NFKC")`·소문자화하고 `\p{L}`·`\p{N}` 외 문자를 전부 지운 뒤 앞 200자. 그 결과가 20자 미만이면 대신 제목을 같은 방식으로 정규화한 앞 200자. (실제 크로스포스트는 제목 오타가 서로 달라서 "weak guy day master" / "weak gui master" 본문 기준이 우선이다.)
- `export function groupCrossposts(ranked: Scored[]): TopPost[]` — 입력은 이미 점수 내림차순. 앞에서부터 순회하며 키 = `author.toLowerCase()` + `"\n"` + `postFingerprint(post)`. 처음 나온 글이 대표(점수 최고), 이후 같은 키 글은 대표의 `crossposts`에 순서대로 추가하고 결과 배열에는 넣지 않는다. 작성자가 빈 문자열이면 묶지 않는다(각자 `crossposts: []`). 결과 순서는 대표 글의 입력 순서.

### render.mts
- `DigestInput.top` 타입을 `TopPost[]`로 바꾼다(`dedupe.mts`에서 type import).
- `topBlock`에서 `- 링크:` 줄 바로 다음에, `crossposts`가 비어 있지 않을 때만 한 줄: `- 같은 글: r/A, r/B` (서브레딧명을 `, `로, 입력 순서).
- 경쟁사 섹션 줄: `own`이면 matched 뒤에 ` (자사 글)`을 붙인다. 형식: `- [r/<sub>] <제목> — <matched> (자사 글) — <permalink>`. 그 외 형식은 그대로.

### digest.mts
- `rankPosts` 결과에서 `competitorOwner(s.post, config.competitors) === null`인 글만 남기고, `groupCrossposts`로 묶은 뒤 `slice(0, config.topN)`을 `top`으로 쓴다.
- 콘솔 `scored:` 줄 다음에 `excluded competitor-own: N, crossposts folded: M` 한 줄(N = 상위 후보에서 뺀 자사 글 수, M = 대표에 접혀 들어간 글 수 합계).

### score.test.mts (기존 단언은 그대로 두고 추가, 기존 `check()` 방식)
- 같은 작성자 `u/dup`, 같은 본문(40자 이상), 서로 조금 다른 제목, 서브레딧 `ChineseZodiac`·`Bazi_Astrology`·`AskBazi` 3개 글 → `groupCrossposts(rankPosts(...))` 결과 1개, 대표는 점수 최고 글, `crossposts` 길이 2.
- 같은 작성자인데 본문이 다른 두 글 → 따로 2개.
- 다른 작성자가 같은 본문 → 따로 2개.
- 작성자 빈 문자열 + 같은 본문 → 따로.
- 본문이 비었거나 20자 미만이면 제목으로 비교(같은 제목 → 묶임).
- 공백·구두점·대소문자만 다른 본문 → 묶임.
- `renderDigest` 출력에 `- 같은 글: r/Bazi_Astrology, r/AskBazi` 한 줄(대표 서브레딧 제외 순서는 crossposts 순서), crossposts가 빈 글엔 `같은 글` 줄 없음.

### competitors.test.mts (기존 단언은 그대로 두고 추가)
- 설정은 `loadConfig()` 그대로.
- 작성자 `getpalja`(대소문자 섞어 `GetPalja`), 본문에 경쟁사 이름 없음 → `competitorOwner` = `"PAL:JA"`, `findCompetitorMentions` 결과에 포함, `own: true`.
- 서브레딧 `youra_official`, 본문에 이름 없음 → `"Youra"`, `own: true`.
- 링크 글 `url: "https://getpalja.com/x"` → `"PAL:JA"`.
- 본문에만 `Has anyone tried getpalja.com?`, 작성자·서브레딧 무관 → `competitorOwner` = `null`, 언급 결과에는 `own: false`로 포함.
- 무관한 글 → `null`, 결과에 없음.
- `renderDigest`에 own 히트 → 줄에 `(자사 글)`, 언급만인 히트 → 없음.
- `parseConfig`에 `competitors[0].accounts`를 뺀 설정 → `ConfigError` 메시지에 `competitors[0].accounts`.

## 제약
- 새 npm 의존성 금지. `lib/`, `mobile/`, `app/`, 위 목록 밖 `scripts/` 파일 수정 금지. `score.mts` 수정 금지.
- 기존 스타일: 파일 첫 줄 한 줄 주석, 짧은 헬퍼, 프레임워크 없는 테스트. 참고 `scripts/reddit/score.mts`, `scripts/reddit/competitors.mts`, `scripts/reddit/score.test.mts`.
- 레딧에 실제 요청하지 않는다(`digest.mts` 실행 금지, `npm run reddit:digest` 금지).
- 커밋하지 않는다.

## 완료 조건
- `npx tsc --noEmit --strict --target esnext --module esnext --moduleResolution bundler --allowImportingTsExtensions --skipLibCheck --types node scripts/reddit/*.mts` → 오류 0
- 루트 `npx tsc --noEmit` → 오류 0
- `npx tsx scripts/reddit/score.test.mts` → `score tests: N passed` (N > 39), 종료 코드 0
- `npx tsx scripts/reddit/competitors.test.mts` → `competitor tests: N passed` (N > 13), 종료 코드 0
- `npx tsx --env-file=.env.local scripts/reddit/chart.test.mts`는 실행하지 않는다(OpenAI 비용).
