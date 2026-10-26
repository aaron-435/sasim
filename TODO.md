# TODO (2026-10-25) — 레딧 리스닝 도구

SPEC: `SPEC.md`. 근거: `REDDIT_RESEARCH_2026-10-25.md`.
코드 위치: `scripts/reddit/*.mts`(진입점 `scripts/reddit/digest.mts`), 설정 `marketing/reddit/config.json`, 결과 `marketing/reddit/digest/`(git 무시), 상태 `marketing/reddit/state/`(git 무시).
위임: 1~6(3a 포함)은 muse 위임 가능. 7·8은 이 세션이 직접(엔진·프롬프트).

- [x] 1. 설정 파일과 뼈대
  - 변경: `marketing/reddit/config.json`(감시 서브레딧 7곳 + 서브레딧별 메타: 링크 허용, AI 금지, 홍보 규칙 한 줄, 가중치 / 키워드 6개와 보조 키워드 `bazi` / 경쟁사 이름·도메인 5개 / 상위 N=10, 요청 간격 3초, 하루 요청 상한 200), `scripts/reddit/config.mts`(로드 + 형식 검증), `scripts/reddit/digest.mts`(인자 `--dry-run`, `--limit N` 파싱만), `package.json`에 `reddit:digest`, `reddit:utm` 스크립트, `.gitignore`에 `marketing/reddit/digest/`, `marketing/reddit/state/`.
  - QA: `npx tsc --noEmit` 오류 0, `npm run reddit:digest -- --dry-run`이 설정을 읽고 "config ok"와 서브레딧·키워드 개수를 출력하고 종료 코드 0. 설정에서 필수 키 하나를 지우면 종료 코드 1과 어떤 키인지 출력.
  - QA: `npx tsc --noEmit` → exit 0. `.mts` 직접 검사 `npx tsc --noEmit --strict --target esnext --module esnext --moduleResolution bundler --allowImportingTsExtensions --skipLibCheck --types node scripts/reddit/*.mts` → exit 0. `npm run reddit:digest -- --dry-run` → "config ok: 7 subreddits, 6 keywords (+1 aux), 5 competitors", exit 0. `--config <weight 지운 사본>` → `config: "subreddits[2].weight" is missing` exit 1, `keywords` 지운 사본 → `config: "keywords" is missing` exit 1. `--limit x` → exit 1. (2026-10-25)

- [x] 2. 수집기 (읽기 전용, 느리게)
  - 선행: 1
  - 변경: `scripts/reddit/fetch.mts`(쿠키 없는 `fetch`, 식별 가능한 User-Agent, 요청 간격, 하루 상한, 429·403 지수 백오프 2회 후 포기하고 실패 기록, JSON 실패 시 `.rss` 대체), `scripts/reddit/collect.mts`(서브레딧 `/new.json`, 사이트 `/search.json?sort=new&t=week`, 글 정규화: id·서브레딧·제목·본문·작성자·작성 시각·댓글 수·퍼머링크), `scripts/reddit/state.mts`(본 글 id 저장, 14일 지나면 정리).
  - QA: `npm run reddit:digest -- --dry-run`을 두 번 연속 실행. 첫 실행 콘솔에 서브레딧 7곳·키워드 6개별 수집 수와 실패 수가 나오고, 두 번째 실행의 신규 글 수가 첫 실행보다 확연히 적다(이미 본 글 제외). 실행 중 429가 나와도 종료 코드 0.
  - QA: tsc `.mts` 직접 검사·루트 `npx tsc --noEmit` → exit 0. 모의 서버(`REDDIT_BASE_URL=http://localhost:8765`, 429/403 응답) → 429는 6s·12s 백오프 후 RSS, 403은 바로 RSS, 403 뒤 출처는 JSON 생략, 쿠키 없음·UA 확인, 중복 id 합침, exit 0. 실레딧 연속 2회 → 13줄+total, 둘 다 exit 0, 두 번 다 성공한 출처는 새 글 0(ChineseZodiac 50→0, 50→0). 단 RSS 429로 회당 13곳 중 5곳만 성공(발견 사항 참고). (2026-10-25, 간격 3초 기준)

- [x] 2a. 요청 묶기로 429 줄이기
  - 선행: 2, 4 (9번보다 먼저)
  - 배경: 비로그인 요청은 레딧의 IP별 속도 한도에 걸린다. `Retry-After`·지수 백오프는 이미 있지만, 출처 18곳(서브레딧 7·키워드 6·경쟁사 5)을 하나씩 부르니 연속 요청이 쌓여 2026-10-26 실행에서 6곳이 429로 빠졌다(실행당 요청 약 46회, 7분대). 한도를 우회하지 않고(프록시·IP 교체 금지) 요청 수 자체를 줄인다.
  - 변경: `collect.mts`
    - 서브레딧은 `/r/A+B+C/new.rss?limit=100` 한 번으로 합친다. 글이 많아 다른 곳을 밀어내는 서브레딧(기본 `astrology`)은 따로 부른다. 따로 부를 목록은 `config.json`(예: `separateSubreddits`)에 두고 `config.mts`에서 검증한다.
    - 키워드 6개는 `saju OR "four pillars" OR …` 검색 한 번으로, 경쟁사 이름도 OR 검색 한 번으로 합친다. 쿼리가 너무 길면 2개로 나눈다.
    - 수집 통계는 요청 단위가 아니라 기존처럼 출처별(`sub:<이름>`, `kw:<키워드>`, `comp:<이름>`)로 다시 센다. 서브레딧은 글의 subreddit, 키워드·경쟁사는 제목·본문 일치로 센다. 합친 요청이 실패하면 거기 속한 출처를 모두 실패로 표시한다.
    - 선택: 요청 간격에 작은 무작위 지터를 넣는다.
    - 실패 출처 재시도 라운드: 첫 바퀴가 끝난 뒤 실패한 요청만 모아 쉬었다가 다시 부른다. 실행 시간이 늘어나도 된다(사용자 결정 2026-10-26). 기본값은 2라운드, 대기 60초 → 180초이고, `config.json`(예: `retryRounds`, `retryCooldownMs`)에서 바꿀 수 있게 한다. 레딧이 `Retry-After`를 주면 그 값과 대기 시간 중 긴 쪽을 따른다. 하루 요청 상한 안에서만 돌고, 상한에 닿으면 남은 재시도는 건너뛰고 기록한다. 끝까지 실패한 출처만 요약에 실패로 남긴다. 수집 통계 비고에는 "재시도 1회차 성공"처럼 어느 라운드에서 받았는지 적는다.
    - `score.mts`·`seen` 처리·`fetch.mts` 백오프 규칙은 그대로 둔다.
  - QA:
    - `.mts` 직접 tsc·루트 `npx tsc --noEmit` exit 0.
    - `score.test.mts`·`competitors.test.mts`·`memo.test.mts`가 그대로 통과한다.
  - QA: `.mts` 직접 tsc → exit 0, 루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/collect.test.mts`(새, 오프라인 가짜 Fetcher) → "collect tests ok"(묶음 4요청, 출처별 재집계, Retry-After 90s>60s 대기, 2회차 성공/2회 후 실패 비고, 하루 상한 도달 시 재시도 생략, 설정 검증). score 52·competitors 29·memo 27 통과. 실레딧 `npm run reddit:digest -- --dry-run` → 출처 18곳 모두 성공(sub:astrology·경쟁사 묶음은 60초 뒤 재시도 1회차 성공), 요청 12회(이전 약 46회), 3분 16초, exit 0. 지터는 넣지 않음(선택 항목, `fetch.mts` 간격 규칙 유지). (2026-10-26)
    - 모의 서버(`REDDIT_BASE_URL`)로 합친 경로가 맞는지 확인한다(`+`로 이은 서브레딧, OR 검색). 합친 요청 하나가 429로 실패하면 속한 출처가 모두 실패로 표시되고 exit 0인지 본다.
    - 모의 서버에서 첫 요청은 429, 재시도 라운드에서는 200을 주게 해서 다음을 본다: 최종 성공, 비고 "재시도 1회차 성공", 대기 시간 준수(테스트에서는 짧은 값으로 바꿔 돌림). 계속 429면 2라운드 뒤 실패로 남고 exit 0인지 본다. 상한에 닿으면 재시도를 건너뛰는지도 본다.
    - 실레딧 `npm run reddit:digest -- --dry-run` 1회로 다음을 확인한다: 첫 바퀴 요청 수 12회 이하, 최종 실패 출처 0곳(재시도 포함), 요약 수집 통계에 서브레딧 7·키워드 6·경쟁사 5줄이 모두 있음, 재시도 라운드 수, 전체 실행 시간. 그날 첫 실행으로 돌린다.

- [x] 3. 점수화와 dry-run 요약 파일
  - 선행: 2
  - 변경: `scripts/reddit/score.mts`(키워드 일치, `bazi`는 다른 키워드와 함께일 때만 가산, 출생 정보 패턴(날짜·시각) 가산, 글 나이, 댓글 수 적을수록 가산, 서브레딧 가중치. 점수 근거 문자열 반환), `scripts/reddit/render.mts`(요약 마크다운: 수집 통계 → 상위 글 → 경쟁사 → 섀도 점검 자리. 메모·사주 칸은 비어 있으면 "(dry-run)").
  - QA: `npm run reddit:digest -- --dry-run` 후 `marketing/reddit/digest/<오늘>.md`가 생기고, 상위 글이 최대 10개, 각 글에 제목·퍼머링크·서브레딧·나이·댓글 수·점수 근거가 있다. `npx tsx scripts/reddit/score.test.mts`(고정 샘플 5개: bazi 단독 글은 0점 근처, saju+생년월일 글이 최상위)가 통과.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/score.test.mts` → "score tests: 26 passed" exit 0. 실레딧 `npm run reddit:digest -- --dry-run` → exit 0, 13곳 중 9곳 성공(429 4곳은 요약 표에 실패로 기록), 새 글 87·점수 있는 글 84, `marketing/reddit/digest/2026-10-25.md`에 상위 10개(제목·링크·서브레딧·나이·댓글·점수 근거)와 섹션 4개. 같은 날 재실행은 `-2.md`로 따로 쓴다. 구현은 muse(지시서 20, 브랜치 task-20). (2026-10-25)

- [x] 3a. 점수 잡음 줄이기와 가중치 설정화
  - 선행: 3
  - 배경: 3번 실측에서 `"four pillars"`가 카지노 스팸·해커톤·D&D·개인 프로필(`r/u_*`) 글에 걸려 상위 10개 중 절반 이상이 잡음. 키워드 외 가중치가 `score.mts`에 고정돼 SPEC("규칙과 가중치는 설정 파일에")과 어긋남. RSS 본문에 HTML 엔티티가 두 번 인코딩돼 남음(`&#39;`, `&quot;`).
  - 변경: `marketing/reddit/config.json`에 `scoring` 블록(키워드·보조 키워드·생년월일·시각·감시 서브레딧·질문 가산값, 나이·댓글 곱셈 구간, 문맥 필요 키워드 목록과 문맥어 목록, 프로필 글 곱셈) 추가 + `config.mts` 검증. `score.mts`가 설정값을 읽고, 감시 서브레딧 밖에서는 문맥 필요 키워드(`four pillars` 등)에 문맥어(bazi·saju·astrology·zodiac·chart·element·day master 등)가 같이 있어야 가산, `r/u_*` 글은 감점. `collect.mts` RSS 본문·제목 엔티티를 한 번 더 디코드.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` exit 0. `npx tsx scripts/reddit/score.test.mts` 통과(샘플 추가: 비감시 서브레딧의 "four pillars of healthcare" 글 0점, `r/u_*` 사주 글은 같은 내용의 감시 서브레딧 글보다 낮음, RSS 이중 인코딩 `&amp;#39;` → `'`). 설정에서 `scoring` 키 하나를 지우면 exit 1과 키 이름. 실레딧 dry-run 1회로 상위 10개 중 사주 무관 글이 2개 이하인지 직접 읽어 확인하고 결과를 여기 적는다.
  - QA(코드): `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/score.test.mts` → "score tests: 39 passed" exit 0(기존 26개 점수 그대로). `--config <scoring.contextWords 지운 사본>` → `config: "scoring.contextWords" is missing` exit 1. 구현은 muse(지시서 21, 브랜치 task-21) + 이 세션이 한 줄 추가: 감시 서브레딧 밖에서 인정된 키워드가 없으면 생년월일·시각이 있어도 0점(카지노 스팸이 날짜·시각 +4로 남던 문제). (2026-10-25)
  - QA(오프라인 재채점): 아침 요약 `2026-10-25.md`의 상위 10개(제목 + 잘린 본문)를 새 규칙으로 다시 매김 → 사주 무관 5개(카지노, D&D, 해커톤, Scroll 2개) 모두 0점, `r/u_*` 바쯔 글 5.0→2.5, 남은 5개는 전부 점성·바쯔 글. 본문이 잘린 상태라 근사치.
  - QA(실레딧): npm run reddit:digest -- --dry-run → exit 0, 13곳 중 9곳 성공(429: AstrologyCharts, astrology, kw "four pillars", kw "korean astrology"), 새 글 62, 요청 45(today 45/200), 상위 10개 중 무관 0개(전부 바쯔·사주·중국 점성 글. 단 1~5위는 같은 작성자의 같은 글 크로스포스트 5개, 6·8위는 경쟁사 Youra·PAL:JA 자사 글). 주의: 잡음의 주 출처였던 kw "four pillars"가 429로 빠져 문맥 필터는 이번 실측에서 거의 안 거쳤다. (2026-10-26)

- [x] 3b. 크로스포스트 묶기와 경쟁사 자사 글 제외
  - 선행: 3a, 4
  - 배경: 2026-10-26 dry-run 상위 1~5위가 한 작성자가 같은 질문을 5개 서브레딧에 올린 글, 6·8위가 경쟁사(Youra·PAL:JA) 자사 글. 8번 메모가 상위 글마다 OpenAI를 부르므로 그대로면 같은 글에 메모 5개.
  - 변경: `score.mts`(또는 새 `dedupe.mts`)에서 같은 작성자 + 제목·본문 앞부분(정규화 후 앞 200자) 일치 글을 한 글로 묶는다. 대표는 점수 최고 글, 나머지 서브레딧·링크는 대표 글에 목록으로 붙이고 상위 N칸을 차지하지 않는다. `render.mts`는 대표 글 아래 "같은 글: r/A, r/B …" 한 줄. 경쟁사 자사 글(작성자가 설정의 경쟁사 계정이거나, 서브레딧이 경쟁사 서브레딧이거나, 본문이 경쟁사 도메인 링크를 홍보하는 글)은 상위에서 빼고 경쟁사 섹션에만 둔다. 경쟁사 계정·서브레딧 목록은 `config.json`의 `competitors[]`에 `accounts`·`subreddits` 필드로 추가 + `config.mts` 검증.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` exit 0. `npx tsx scripts/reddit/score.test.mts` 통과(샘플 추가: 같은 작성자·같은 본문 3개 서브레딧 → 상위 1칸 + "같은 글" 2개, 작성자만 같고 본문이 다르면 따로, 경쟁사 서브레딧 글은 상위에 없고 경쟁사 섹션에 있음). `competitors.test.mts` 통과. 실레딧 dry-run은 하지 않고 `2026-10-26.md`의 상위 10개를 오프라인 재채점해 1~5위가 1칸으로, 6·8위가 빠지는지 확인(본문이 잘려 근사치). 실레딧 확인은 9번 전체 실행 때.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/score.test.mts` → "score tests: 52 passed" exit 0(크로스포스트 3개 → 1칸 + 같은 글 2개, 작성자만 같음·본문만 같음·작성자 없음은 따로, 짧은 본문은 제목 비교, 공백·구두점 차이는 묶음, "같은 글" 줄 렌더). `npx tsx scripts/reddit/competitors.test.mts` → "competitor tests: 29 passed" exit 0(작성자 getpalja·서브레딧 youra_official·링크 URL getpalja.com → 자사 글, 본문 속 도메인 언급만은 자사 아님, "(자사 글)" 렌더, `competitors[0].accounts` 빠지면 ConfigError). 오프라인 재채점(`2026-10-26.md` 상위 10개를 잘린 본문으로 재구성, 임시 스크립트) → 1~5위가 1칸(같은 글 r/Bazi_Astrology, r/chineseastrology, r/AskBazi, r/FengShui), 6·8위(Youra_Official·u/getpalja) 제외되고 경쟁사 섹션에 own=true, 상위 4개 남음. `score.mts` 점수 계산·`lib/` 변경 없음. 구현은 muse(지시서 23, 브랜치 task-23). 판단: SPEC 문구의 "본문이 경쟁사 도메인 링크를 홍보하는 글"은 링크 글의 대상 URL로만 판정했다. 본문 언급까지 빼면 "getpalja 써 본 사람?" 같은 답할 질문도 사라진다. (2026-10-26)

- [x] 4. 경쟁사 언급 모음
  - 선행: 2
  - 변경: `scripts/reddit/competitors.mts`(설정의 이름·도메인을 제목·본문·URL에서 대소문자 무시로 찾음, 점수와 무관하게 전부), 사이트 검색에 경쟁사 이름 질의 추가(하루 상한 안에서), `render.mts`의 경쟁사 섹션.
  - QA: `npx tsx scripts/reddit/competitors.test.mts`(샘플 4개: "getpalja.com" 링크, "PAL:JA" 표기, 무관한 "pal" 단어는 미검출) 통과, dry-run 요약에 경쟁사 섹션이 있다(0건이면 "없음").
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/competitors.test.mts` → "competitor tests: 13 passed" exit 0(getpalja.com 링크·PAL:JA 표기 검출, pal·palette·yourself 미검출, `starlit-alley` URL, 한 글 2개 경쟁사 설정 순서, `renderDigest` 0건 "없음"·히트 줄에 제목·이름·링크). `score.test.mts` 여전히 39 passed. 구현은 muse(지시서 22, 브랜치 task-22). 실레딧 dry-run은 오늘 상한 초과라 못 했고, 3a의 2026-10-26 dry-run에서 `comp:` 5곳 수집 통계와 섹션을 같이 본다. (2026-10-25)
  - QA(실레딧): 3a와 같은 dry-run 1회 → `comp:` 5곳 중 3곳 성공(K-Sajupalja 1·Starlit Alley 0·TKB_Studio 0, PAL:JA·Youra는 429), 요약 "3. 경쟁사 언급"에 2건(r/KoreanSaju PAL:JA 글, r/Youra_Official Youra 글, 둘 다 다른 출처로 수집된 글에서 검출). (2026-10-26)

- [x] 5. 섀도 필터 점검
  - 선행: 1
  - 변경: `scripts/reddit/shadow.mts`(쿠키 없이 `/user/Ok_Mind_8887/about.json`·`/comments.json`, 최근 댓글 최대 10개의 퍼머링크 JSON에서 본문이 `[removed]`이거나 스레드에 없는지 확인. 결과: 계정 보임/없음(404), 댓글별 보임/숨김), 계정명은 설정에서. 요약 맨 위에 계정 안 보이면 경고.
  - QA: `npx tsx scripts/reddit/shadow.mts`가 현재 계정에 대해 "계정 보임, 댓글 0개"처럼 결과를 출력하고 종료 코드 0. 존재하지 않는 계정명을 인자로 주면 "계정 없음(404)".
  - QA: `.mts` 직접 tsc → exit 0. 실레딧(하루 상한을 210으로 올린 임시 설정 사본 `--config`, 실제 설정은 그대로) `npx tsx scripts/reddit/shadow.mts` → "u/Ok_Mind_8887: 계정 보임, 최근 댓글 0개 중 숨김 0개" exit 0, `zz_no_such_user_8f3k2q9x` → "WARNING: … 안 보임(404). 섀도밴 의심" + "계정 없음(404)" exit 0. `.json`은 403이라 둘 다 RSS로 판정(계정당 요청 2회). 댓글 판정(`parseUserComments`·`judgeComment`)은 레딧 Atom 형식 샘플로 오프라인 확인만(보임/`[removed]`/스레드에 없음, JSON 중첩 replies). `about.json`은 비로그인 `.json`이 막혀 있고 RSS 대체가 없어 뺐다: 계정 판정은 댓글 목록의 404로 한다. 요약 연결(`shadowSummary` → `renderDigest`의 `shadow`)은 9번. 이 세션 직접 작성. (2026-10-25)

- [x] 6. UTM 링크 생성기
  - 선행: 1
  - 변경: `scripts/reddit/utm.mts`(`npm run reddit:utm -- --sub ChineseZodiac --medium comment --content dm-intro` → `https://www.fatesaidapp.com/?utm_source=reddit&utm_medium=comment&utm_campaign=chinesezodiac&utm_content=dm-intro`, 경로 옵션 `--path /saju-calculator`, 값은 소문자·영숫자·하이픈만), 키 이름은 `lib/eventSchema.ts`의 `UTM_KEYS`를 import해서 씀.
  - QA: `npm run reddit:utm -- --sub ChineseZodiac --medium comment --content dm-intro` 출력이 위 URL과 정확히 같다. `--medium dm`처럼 post/comment 외 값은 종료 코드 1.
  - QA: `npm run -s reddit:utm -- --sub ChineseZodiac --medium comment --content dm-intro` → 기대 URL과 문자열 일치, exit 0. `--medium dm` → exit 1. `--sub Bazi_Astrology --content "Day Master Q" --path /saju-calculator` → `…/saju-calculator?…utm_campaign=bazi-astrology&utm_content=day-master-q` exit 0. 날짜형 `--content 1990-05-12`, `--path https://…`, `--sub` 누락 → 모두 exit 1. 값 검증은 웹과 같은 `cleanUtmValue`를 씀. `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. 이 세션 직접 작성. (2026-10-25)

- [x] 7. 출생 정보 추출과 사주 계산 (이 세션 직접)
  - 선행: 1
  - 변경: `scripts/reddit/chart.mts`(LLM 구조화 추출: 연·월·일·시·분·도시·성별·음력 여부, JSON 스키마 강제 → 코드로 범위 검증 → `lib/worldCities.ts`로 도시 id 찾기 → `calculateManseryeok` 호출 → 4기둥·일간·오행 분포 요약 문자열. 시각 없음 = "시주 없음", 도시 못 찾음 = 표시, 음력 = 계산 생략, 성별 없음 = 대운 생략), 픽스처 `scripts/reddit/fixtures/chart-posts.json`(시각 있음/없음/도시 없음/음력 4개). 엔진 파일은 수정하지 않는다.
  - QA: `npx tsx --env-file=.env.local scripts/reddit/chart.test.mts`(LLM 추출은 픽스처의 기대 구조와 비교, 계산 결과는 같은 입력으로 엔진을 직접 부른 값과 일치) 통과. `npm run validate:manseryeok` 여전히 통과. OpenAI 호출 4회(비용 미미).
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx --env-file=.env.local scripts/reddit/chart.test.mts` → "chart tests: 59 passed · OpenAI 4 calls, 1727+204 tokens, $0.0022" exit 0(오프라인: 2월 30일·미래 연도·본문에 없는 연도·시 25·분 61 거부, 시 없는 분 버림, 음력 30일 허용/31일 거부, 도시 찾기, 연도 없는 글은 LLM 미호출 / 온라인: 픽스처 4개 추출 필드 전부 일치, 3개의 4기둥·오행이 엔진 직접 호출과 일치, 시주 없음·도시 없음·성별 없음·음력 생략 표기). `npm run validate:manseryeok` → "All golden samples match". `score.test.mts` 39 passed. `lib/` 변경 없음(`git status`). 모델 `REDDIT_EXTRACT_MODEL`(기본 gpt-5.4-mini, JSON 스키마 strict). 도시 없음은 엔진 기본값(서울 KST)으로 근사하고 그 사실을 적는다. 이 세션 직접 작성. (2026-10-25)

- [x] 8. 답할 포인트 메모 (이 세션 직접)
  - 선행: 3, 3a, 3b, 7
  - 변경: `scripts/reddit/memo.mts`(시스템 지시: 질문 요지 1줄 / 답할 포인트 2~3개 / 피할 것 / 서브레딧 규칙 주의. 완성 문단 금지, 앱·웹 이름·URL 금지, `PRODUCT.md` 원칙 반영(나쁜 날·궁합 없음, 건강·죽음·사고·재정 손실 예측 없음, 단정적 부정 예측 없음, 미성년 연애 없음). 사주 계산 결과가 있으면 그것만 근거로 쓰고 없는 차트 사실은 만들지 않음. 응답 후 검사기: URL·"Fatesaid"·경쟁사 이름·3문장 넘는 연속 문단이 있으면 메모에 경고 표시), 모델은 환경 변수 `REDDIT_MEMO_MODEL`(기본 기존 소형 모델), 사용량으로 비용 합산.
  - QA: `npm run reddit:digest -- --limit 3`(OpenAI 3~6회 호출) 후 요약 파일에 메모 3개, 맨 위에 LLM 비용, 검사기 경고 0개. 메모를 직접 읽어 완성 답글처럼 보이지 않는지 확인하고 결과를 여기 적는다.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/memo.test.mts` → "memo tests: 27 passed" exit 0(URL·맨 도메인·Fatesaid·Fate Said·경쟁사 이름/별칭 검출, "pal" 미검출, 5문장 문단·인사말·포인트 1개/4개 경고, 서브레딧 규칙 줄, 차트 없으면 프롬프트가 차트 사실 금지, 렌더: 비용 헤더·메모 들여쓰기·`--limit 밖`·dry-run). `score.test.mts` 52·`competitors.test.mts` 29 그대로. 실레딧 `npm run reddit:digest -- --limit 3` → exit 0, 13곳+경쟁사 5곳 중 12곳 성공(429 6곳), 새 글 128, 요청 46(오늘 91/200), `marketing/reddit/digest/2026-10-26-2.md` 맨 위 "LLM 비용: $0.0057 (OpenAI 5회)"(추출 2 + 메모 3), 메모 3개, 검사기 경고 0. 직접 읽은 결과: 세 메모 모두 요지 1줄·포인트 3개·피할 것 3개의 메모 형태이고 그대로 붙여 넣을 문단·인사말·앱/URL 없음. 1번(1999-03-19, 시각·도시 없음) 메모의 차트 근거(庚 일간, 수 0, 卯·午)는 계산 결과와 일치, 2·3번은 차트 없음이라 "생년월일시를 받아야" 쪽으로 감. 건강·죽음 예측 금지가 피할 것에 들어감. 구현: `memo.mts`(새), `digest.mts`(상위 `--limit`개에 사주 → 메모 연결, 비용 합산), `render.mts`(사주·메모 칸, 비용 헤더), `chart.mts`(`addUsage`·`PRICES`·`samplingParams` 공유), `competitors.mts`(`termRe` export). 이 세션 직접 작성. (2026-10-26)

- [x] 9. 통합 실행과 사용법 문서
  - 선행: 2a, 3, 3b, 4, 5, 8
  - 변경: `digest.mts`에서 전 과정 연결(수집 → 점수 → 사주 → 메모 → 경쟁사 → 섀도 → 렌더), 실행 시간과 요청 수 출력, `marketing/reddit/README.md`(아침 루틴: 실행 → 요약 읽기 → 직접 답글 → 로그아웃 확인. 링크 노출 시작 조건: 계정 활동 2~3주 + iOS 공개. 서브레딧별 홍보 규칙 요약은 `REDDIT_RESEARCH_2026-10-25.md` 링크).
  - QA: `npm run reddit:digest`(전체, OpenAI 10~20회) 종료 코드 0, 요약 파일에 네 섹션 모두 존재. 루트 `npx tsc --noEmit` 오류 0, `npm run lint` 통과. `git status`에 digest·state 파일이 안 보인다.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0, `npm run lint` → "No ESLint warnings or errors". score 52·competitors 29·memo 27·collect ok 그대로. 실레딧 전체 `npx tsx --env-file=.env.local scripts/reddit/digest.mts`(= `npm run reddit:digest`) → exit 0, 출처 18곳 모두 성공, 요청 14(수집 11 + 섀도 3), 3분 34초, `marketing/reddit/digest/2026-10-26-4.md`에 맨 위 "LLM 비용: $0.0047 (OpenAI 4회) · 요청 14 · 실행 3분 34초"와 섹션 1~4 모두, 상위 4개 메모 4개, 검사기 경고 0, 경쟁사 3건(Youra). 섀도 점검은 429로 "확인 실패"가 요약 4번에 기록되고 프로세스는 계속(발견 사항). 같은 날 네 번째 실행이라 새 글이 7개뿐이어서 OpenAI는 기대(10~20회)보다 적은 4회. `git status`에 digest·state 없음. 변경: `digest.mts`(섀도 점검 연결, 실행 시간·요청 수 출력), `render.mts`(헤더에 실행 시간), `marketing/reddit/README.md`(새). 이 세션 직접 작성. (2026-10-26)

- [x] 10. UTM 유입 확인 (사용자 확인)
  - 선행: 6
  - 절차: `npm run reddit:utm -- --sub test --medium post --content utm-check`로 만든 링크를 휴대폰 브라우저에서 연다 → 랜딩에서 아무 버튼이나 한 번 누른다 → 이 세션에 알리면 Supabase `events`에서 `utm_source=reddit`, `utm_content=utm-check` 이벤트를 조회해 확인(읽기 전용).
  - 준비(2026-10-26): `npm run reddit:utm -- --sub test --medium post --content utm-check` → `https://www.fatesaidapp.com/?utm_source=reddit&utm_medium=post&utm_campaign=test&utm_content=utm-check`, exit 0. 조회 스크립트(세션 스크래치패드, 이벤트 이름·플랫폼·utm 4개만 출력) 기준선: 최근 2일 `props->>utm_source = reddit` 이벤트 0건. 사용자가 링크를 열고 버튼을 누른 뒤 다시 조회해 1건 이상 + `utm_content=utm-check`이면 `[x]`.
  - QA: 사용자가 휴대폰으로 링크를 열고 버튼 클릭(2026-10-26) → 읽기 전용 events 조회 `npx tsx --env-file=.env.local <scratchpad>/utm-check.mts` → 2건: `site landing_view`, `site landing_cta_click`, 둘 다 utm_source=reddit, utm_medium=post, utm_campaign=test, utm_content=utm-check.

- [ ] 11. 계정 준비와 커밋 (사용자 실행)
  - 레딧 프로필 표시 이름과 소개 설정(예: "Building a Korean saju app. Ask me about Four Pillars."). 사용자명은 바꿀 수 없음.
  - 첫 2~3주는 링크 없이 ChineseZodiac, Bazi_Astrology, AstrologyCharts 위주로 하루 1시간 이내 답변. 글은 자기 말로(AI 금지 서브레딧 많음).
  - 각 항목 끝에 제안하는 커밋 메시지로 사용자가 커밋·푸시.

## 발견 사항

- 섀도 점검은 수집 직후 같은 IP로 부르므로 429가 나기 쉽고, `collect.mts`와 달리 재시도 라운드가 없어 9번 실행에서 "확인 실패(http 429)"로 끝났다. 섀도 점검에도 60초 쉬고 한 번 더 부르는 재시도를 붙일지, 또는 수집 전에 먼저 돌릴지 검토. (9번)
- 묶은 서브레딧 RSS는 100개 상한이라 글 많은 `AstrologyCharts`가 69개를 차지하고 `ChineseZodiac` 2·`Bazi_Astrology` 1만 들어왔다(2a 실측). 하루 한 번 실행이면 사주 서브레딧 글이 밀려 빠질 수 있다 → `AstrologyCharts`도 `separateSubreddits`에 넣을지(요청 +1) 다음 실행들 보고 판단. (2a번)
- `score.test.mts`(3곳)·`competitors.test.mts`(1곳)에 기존 `no-explicit-any` lint 오류가 있다. `npm run lint`가 scripts를 보는지에 따라 9번 완료 기준(lint 통과)에 걸릴 수 있음. (2a번)
- `chart.test.mts`는 `OPENAI_API_KEY`가 있어야 돈다(유료). 키 없이 돌리면 OpenAI 생성자에서 바로 죽는다. (2a번)

- 상위 글 품질(8번 실측): 2위가 사별·PTSD·자살 언급 글, 3위가 "생년월일 주면 봐 줄게" 식의 리딩 제공 글(답할 질문이 아님). 메모 자체는 안전했지만, 자살·자해 언급 글은 답할 대상에서 빼거나 "민감 글" 표시, 리딩 제공 글(`Tell me your`, `I'll read`)은 감점을 검토. 또 1·2위가 `AstrologyCharts`의 서양 점성 글이라 3a 발견 사항(감시 서브레딧 사주 문맥)이 다시 확인됨. 점수의 "생년월일 +3"이 2번 글에서는 추출기가 생년월일 없음으로 판정(사건 연도 "96"을 패턴이 잡은 듯). (8번)
- 루트 `tsconfig.json`의 `include`가 `**/*.ts`라서 `scripts/**/*.mts`는 `npx tsc --noEmit`에 안 잡힌다. 이 TODO의 tsc QA는 1번에 적은 `.mts` 직접 검사 명령을 같이 돌린다. (1번)
- 경쟁사 도메인은 `getpalja.com`만 확인됨. K-Sajupalja, Starlit Alley, Youra, TKB_Studio는 이름·별칭만 넣었다. 도메인을 알게 되면 `config.json`에 추가. (1번)
- 레딧은 지금 이 UA의 비로그인 `.json`을 항상 403으로 막는다. 수집은 사실상 RSS뿐이라 댓글 수가 없다(`numComments: null`) → 3번 점수화에서 댓글 수 가중치는 RSS 글이면 빼야 한다. (2번)
- RSS도 3초 간격이면 429가 잦아 회당 13곳 중 5곳만 성공. `requestIntervalMs` 7000으로 올린 뒤 실측 13곳 중 9곳 성공, 실행 7분 40초, 요청 32회(3번 dry-run). 더 올릴지는 다음 실행들을 보고 판단. (2번, 3번에서 확인)
- `reddit:utm` 스크립트 항목은 넣었지만 `scripts/reddit/utm.mts`는 6번에서 만든다. 그 전엔 실행하면 파일 없음 오류. (1번) → 6번에서 해결.
- 웹 페이지는 `app/(site)/[locale]/` 아래라 `--path /saju-calculator`처럼 로캘 없는 경로는 로캘 리다이렉트를 거친다. 리다이렉트 뒤에도 `utm_*` 쿼리가 남는지 10번 확인 때 경로 링크로도 한 번 볼 것. (6번)
- 점수 품질: `"four pillars"`가 사주와 무관한 글(카지노 스팸, 해커톤, D&D, 개인 프로필 `r/u_*`)에 걸려 실제 상위 10개 중 절반 이상이 잡음. 개선안: 감시 서브레딧 밖에서는 `four pillars`에 사주 문맥어(bazi·saju·astrology·zodiac·chart·element·day master 등)가 같이 있어야 가산, `r/u_*` 프로필 글은 감점. 키워드 외 가중치(키워드 +3, 생년월일 +3 등)가 지금 `score.mts`에 고정돼 있어 SPEC의 "규칙과 가중치는 설정 파일에" 와도 어긋난다 → 함께 `config.json`으로 옮기는 소항목 추천. (3번) → 3a로 옮김.
- RSS 본문에 HTML 엔티티가 두 번 인코딩돼 남는다(`&#39;`, `&quot;`, `&amp;`). `collect.mts`의 `decodeEntities`를 한 번 더 돌리면 될 듯. 8번 메모 입력 품질에도 영향. (3번) → 3a로 옮김.
- 하루 요청 상한 200은 한 번 실행(약 32회)보다 훨씬 크지만, 같은 날 개발 중 여러 번 돌리면 금방 찬다. 상한에 걸린 실행도 빈 요약 파일(`-2.md`)을 남긴다. 8·9번 QA는 하루에 몰지 말 것. (3a번)
- 감시 서브레딧 `AstrologyCharts`의 서양 점성 질문(형제 궁합, 학교 고르기)이 감시 +2·질문 +1로 3.6점을 받아 상위에 든다. 사주 문맥이 없는 감시 서브레딧 글을 낮출지는 실제 답글 경험을 보고 판단. (3a번)
- 섀도 점검의 댓글별 판정은 실제 댓글이 없어 실레딧에서 안 돌았다(AutoModerator 공개 피드는 빈 피드). 첫 댓글을 단 다음 날 `npx tsx scripts/reddit/shadow.mts`로 "보임" 1줄이 나오는지 확인. (5번)
- 사주 계산은 글당 KASI 호출 1회가 더 든다(일주 조회). 레딧 하루 상한과는 별개지만 data.go.kr 일일 한도 안인지 9번 전체 실행 때 볼 것. 한 글에 여러 사람(궁합 질문)이 있으면 첫 사람만 계산한다. (7번)
- 크로스포스트 중복: 2026-10-26 dry-run 상위 1~5위가 한 작성자(u/Lanky_Lobster_5554)의 같은 질문을 5개 서브레딧에 올린 글이라 상위 10칸 중 5칸을 차지했다. 같은 작성자·같은 본문 앞부분이면 한 글로 묶고 나머지 서브레딧은 목록으로만 붙이는 처리가 필요해 보인다. 경쟁사 자사 서브레딧(r/Youra_Official, r/KoreanSaju의 u/getpalja 글)도 상위에 든다 → 답할 대상이 아니니 경쟁사 섹션에만 두고 상위에서 뺄지 검토. 또 이번 실행은 kw "four pillars"가 429로 빠져 3a 문맥 필터를 실측으로는 거의 확인 못 했다. 다음 실행들에서 그 출처가 성공한 날의 상위 10개를 한 번 더 볼 것. (3a번)
- 전체 실행 요청 수가 경쟁사 검색 5곳 + 섀도 2회 이상으로 약 40회로 는다. 7초 간격에서도 연속 요청 4번째에 RSS 429가 났다(5번 QA 중). (4·5번)
