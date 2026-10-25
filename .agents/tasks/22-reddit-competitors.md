# 작업 지시서 22: 레딧 경쟁사 언급 모음

## 목표
수집한 새 글 중 경쟁사(설정 `competitors`의 이름·별칭·도메인)가 언급된 글을 점수와 무관하게 전부 모아 요약의 "3. 경쟁사 언급" 섹션에 넣는다. 사이트 검색에 경쟁사 이름 질의도 추가한다.

## 수정할 파일 / 새로 만들 파일
- 새로: `scripts/reddit/competitors.mts`, `scripts/reddit/competitors.test.mts`
- 수정: `scripts/reddit/collect.mts`, `scripts/reddit/render.mts`, `scripts/reddit/digest.mts`
- 그 외 파일은 건드리지 않는다.

### competitors.mts
- 첫 줄 한 줄 주석.
- `export type CompetitorHit = { post: RedditPost; matched: string[] }` (`matched`는 걸린 경쟁사의 `name`, 중복 없이 설정 순서대로).
- `export function findCompetitorMentions(posts: RedditPost[], competitors: Competitor[]): CompetitorHit[]`
  - 검사 대상 문자열: `post.title`, `post.body`, `post.url` (permalink는 제외: 레딧 자체 주소라 의미 없음).
  - 경쟁사 하나의 검사어 = `name` + `aliases` + `domains`. 대소문자 무시.
  - 각 검사어는 정규식 특수문자를 escape한 리터럴로 찾고, 양 끝에 영숫자 경계를 둔다: `(?<![A-Za-z0-9])` + 리터럴 + `(?![A-Za-z0-9])`. 그래서 `PAL:JA`·`getpalja.com`은 걸리고 `pal`, `palette`, `yourself`(Youra), `Youram`은 안 걸린다. 공백이 든 이름(`Starlit Alley`, `TKB Studio`)은 리터럴의 공백을 `[\s_-]+`로 바꿔 `starlit-alley`, `TKB_Studio`도 잡는다. 빈 문자열 검사어는 무시.
  - 결과 순서는 입력 `posts` 순서 그대로, 걸린 글만.

### collect.mts
- `targets`에 경쟁사 검색을 추가: 경쟁사마다 `{ source: "comp:<name>", path: "/search.json?q=<encodeURIComponent('"' + name + '"')>&sort=new&t=week&limit=25&raw_json=1" }`. 키워드 검색 뒤에 둔다. 나머지 처리(중복 합침, 실패 기록, 본 글 거르기)는 기존 그대로.

### render.mts
- `DigestInput.competitors` 타입을 `CompetitorHit[]`로 바꾸고(`competitors.mts`에서 type import), 줄 형식을 `- [r/<sub>] <제목> — <matched를 ", "로> — <permalink>`로. 제목은 기존 `esc()` 사용. 아직 `undefined`면 "(아직 연결 안 됨)", 0건이면 "없음"은 그대로.

### digest.mts
- `rankPosts` 다음에 `const competitorHits = findCompetitorMentions(posts, config.competitors);`, `renderDigest` 입력에 `competitors: competitorHits`, 콘솔에 `competitor mentions: N` 한 줄.

### competitors.test.mts (`score.test.mts`와 같은 `check()` 방식, 마지막에 `competitor tests: N passed`)
설정은 `loadConfig()`의 `competitors`를 쓴다. 최소 단언:
1. 본문에 `Try https://getpalja.com/reading` → 걸림, matched `["PAL:JA"]`.
2. 제목 `Has anyone used PAL:JA?` → 걸림.
3. 제목 `My pal and I read our bazi`, 본문 `palette colors` → 안 걸림.
4. 본문 `I asked myself about yourself` → 안 걸림(Youra 오검출 없음).
5. 본문 `Youra app gave me a reading` → `["Youra"]`.
6. `post.url`이 `https://starlit-alley.example/x` → `["Starlit Alley"]`.
7. 한 글에 `getpalja`와 `TKB Studio` → matched 2개, 설정 순서(`PAL:JA`, `TKB_Studio`).
8. 입력 순서 유지, 안 걸린 글 제외(위 글들을 한 배열로 넣고 id 순서 확인).
9. `renderDigest`에 `competitors: []` → 출력에 `## 3. 경쟁사 언급` 다음 줄 `없음`; 히트 1개 → 그 줄에 제목, `PAL:JA`, permalink.

## 제약
- 새 npm 의존성 금지. `lib/`, `mobile/`, `app/`, `marketing/`, 다른 `scripts/` 파일 수정 금지.
- 기존 스타일: 파일 첫 줄 한 줄 주석, 짧은 헬퍼, 프레임워크 없는 테스트. 참고 `scripts/reddit/score.mts`, `scripts/reddit/score.test.mts`.
- 레딧에 실제 요청하지 않는다(`digest.mts` 실행 금지).
- 커밋하지 않는다.

## 완료 조건
- `npx tsc --noEmit --strict --target esnext --module esnext --moduleResolution bundler --allowImportingTsExtensions --skipLibCheck --types node scripts/reddit/*.mts` → 오류 0
- 루트 `npx tsc --noEmit` → 오류 0
- `npx tsx scripts/reddit/competitors.test.mts` → `competitor tests: N passed` (N >= 10), 종료 코드 0
- `npx tsx scripts/reddit/score.test.mts` → 여전히 `score tests: 39 passed`
