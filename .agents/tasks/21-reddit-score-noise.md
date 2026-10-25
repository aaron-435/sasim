# 작업 지시서 21: 레딧 점수 잡음 줄이기와 가중치 설정화

## 목표
`scripts/reddit/score.mts`의 고정 가산값·곱셈 구간을 `marketing/reddit/config.json`의 `scoring` 블록으로 옮기고, 사주와 무관한 `"four pillars"` 글(카지노 스팸, 해커톤, D&D 등)과 개인 프로필(`r/u_*`) 글이 상위에 오르지 않게 한다. RSS 본문·제목에 이중 인코딩으로 남는 HTML 엔티티(`&#39;`, `&quot;`)도 고친다. **현재 config 값으로 기존 테스트 점수(19.5, 6.3, 3.5, 2.2 등)가 그대로 나와야 한다.**

## 수정할 파일 / 새로 만들 파일
- 수정: `marketing/reddit/config.json`, `scripts/reddit/config.mts`, `scripts/reddit/score.mts`, `scripts/reddit/collect.mts`, `scripts/reddit/score.test.mts`
- 그 외 파일은 건드리지 않는다.

### config.json에 추가할 `scoring` 블록 (값은 정확히 이대로)
```json
"scoring": {
  "keywordPoints": 3,
  "keywordMaxPoints": 6,
  "auxPoints": 1,
  "birthDatePoints": 3,
  "birthTimePoints": 1,
  "watchedPoints": 2,
  "questionPoints": 1,
  "age": { "fullHours": 24, "fadeHours": 168, "fadeTo": 0.3, "after": 0.2, "unknown": 0.5 },
  "comments": { "bands": [ { "upTo": 0, "factor": 1.3 }, { "upTo": 3, "factor": 1.1 }, { "upTo": 10, "factor": 1.0 } ], "over": 0.7 },
  "contextKeywords": ["four pillars"],
  "contextWords": ["bazi", "saju", "사주", "astrology", "zodiac", "horoscope", "chart", "element", "elements", "day master", "destiny", "fortune", "heavenly stem", "earthly branch", "luck pillar", "yin", "yang", "metaphysics"],
  "profileMultiplier": 0.5
}
```

### config.mts
- `RedditConfig`에 `scoring: ScoringConfig` 추가, 타입 export.
- 기존 헬퍼(`num`, `strArr`, `arr`, `isObj`)로 검증. 키가 없으면 기존과 같은 형식 `config: "scoring.age.fadeTo" is missing`, 배열 원소는 `scoring.comments.bands[1].factor`처럼 경로를 정확히.
- 범위: 가산값들 >= 0, `age.fullHours` >= 0, `age.fadeHours` >= `fullHours`(아니면 `must be >= scoring.age.fullHours` 같은 메시지), factor·multiplier 류 >= 0, `bands`는 비어 있지 않고 `upTo`가 오름차순(아니면 오류). `contextKeywords`·`contextWords`는 빈 배열 허용.

### score.mts
- 고정 숫자(3, 6, 1, 3, 1, 2, 1, 24, 168, 0.3, 0.2, 0.5, 1.3, 1.1, 1.0, 0.7)를 모두 `config.scoring`에서 읽는다. 나이 공식: `h <= fullHours` → 1.0, `h >= fadeHours` → `after`, 그 사이는 1.0에서 `fadeTo`까지 선형. `createdUtc`가 0이면 `unknown`. 댓글: `null`은 기존처럼 제외, 그 외 `n <= upTo`인 첫 구간의 factor, 없으면 `over`.
- 근거 문자열의 숫자도 설정값을 반영(`키워드 saju +3`, `생년월일 +3` 등 형식 유지).
- **문맥 필요 키워드**: 감시 서브레딧(`config.subreddits`) **밖**의 글에서 `scoring.contextKeywords`에 든 키워드(따옴표 제거 후 대소문자 무시 비교)가 일치하면, 그 글에 (a) 문맥 필요 키워드가 아닌 다른 키워드 일치가 있거나 (b) `contextWords` 중 하나가 일치해야(기존 `hit()` 규칙: ASCII는 단어 경계, 비ASCII는 부분 문자열) 키워드로 인정한다. 인정 못 받으면 키워드 점수에서 빼고 근거에 `four pillars 문맥 없음(가산 없음)`. 감시 서브레딧 안에서는 지금처럼 바로 인정.
- 보조 키워드(bazi) "함께일 때만 가산"의 기준은 **인정된** 키워드 수. (bazi는 contextWords에도 있으므로 "four pillars + bazi" 글은 four pillars가 인정되고 bazi도 +1.)
- **프로필 글**: `post.subreddit`이 `u_`로 시작하면(대소문자 무시) 관련도가 0보다 클 때 최종 곱에 `profileMultiplier`를 곱하고 근거 `프로필 글 ×0.5`. 관련도 0이면 기존처럼 0.
- 반올림·정렬·`detectBirth`·export 이름은 바꾸지 않는다.

### collect.mts
- `decodeEntities`를 export.
- 지금 순서(`tag()` 안 1차 디코드 → `.replace(/<[^>]*>/g, "")` 태그 제거)는 그대로 두고, `normalizeRss`의 `title`·`body`에 태그 제거 **뒤** 2차 `decodeEntities`만 추가한다. 예: `&lt;p&gt;It&amp;#39;s&lt;/p&gt;` → 1차 `<p>It&#39;s</p>` → 태그 제거 `It&#39;s` → 2차 `It's`. JSON 경로는 건드리지 않는다.
- `normalizeRss`도 export한다(테스트용).

### score.test.mts (기존 단언 26개는 그대로 통과해야 함, 아래 추가)
- 비감시 서브레딧(`r/healthcare`) 글 "The four pillars of healthcare reform", 본문 "Policy, funding, staffing, access." → `scorePost(...).score === 0`, 근거에 `문맥 없음`.
- 비감시 서브레딧(`r/casino`) "Four Pillars Casino bonus codes" 본문에 생년월일 없음 → 0.
- 비감시 서브레딧(`r/Fantasy`) "Four pillars of destiny — what is my day master?" → 0보다 큼(destiny 문맥어 + day master 키워드).
- 같은 제목·본문·나이·댓글의 사주 글을 `r/u_someone`과 `r/ChineseZodiac`에 두고, `u_` 쪽 점수가 더 낮고 근거에 `프로필 글`.
- `r/u_someone`의 "four pillars" 단독 글(문맥어 없음) → 0.
- `decodeEntities(decodeEntities("I&amp;#39;m &amp;quot;ok&amp;quot;"))` 대신, `normalizeRss`에 최소 `<entry>`(id `t3_abc`, title `I&amp;#39;m here`, content `&lt;p&gt;It&amp;#39;s &amp;quot;fine&amp;quot;&lt;/p&gt;`, category term, link href, published)를 넣어 제목 `I'm here`, 본문 `It's "fine"`이 나오는지.
- `parseConfig`에 `scoring.age.fadeTo`를 지운 사본(구조 복제 후 delete) → `ConfigError` 메시지에 `scoring.age.fadeTo`.
- `parseConfig`에 `scoring` 전체를 지운 사본 → 메시지에 `"scoring" is missing`.
- `bands` 순서를 뒤집은 사본 → 오류.

## 제약
- 새 npm 의존성 금지. `lib/`, `mobile/`, `app/`, 다른 `scripts/` 파일 수정 금지.
- 기존 스타일 그대로: 파일 첫 줄 한 줄 주석, 짧은 헬퍼, 프레임워크 없는 `check()` 테스트. 참고: `scripts/reddit/config.mts`, `scripts/reddit/score.mts`.
- 레딧에 실제 요청하지 않는다(`digest.mts` 실행 금지 — 이 세션이 나중에 한다).
- 커밋하지 않는다.

## 완료 조건
- `npx tsc --noEmit --strict --target esnext --module esnext --moduleResolution bundler --allowImportingTsExtensions --skipLibCheck --types node scripts/reddit/*.mts` → 오류 0
- 루트 `npx tsc --noEmit` → 오류 0
- `npx tsx scripts/reddit/score.test.mts` → `score tests: N passed` (N >= 35), 종료 코드 0

## 참고
- 실측 요약 `marketing/reddit/digest/2026-10-25.md`에서 잡음 글 예시를 볼 수 있다(읽기만).
