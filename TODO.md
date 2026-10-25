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

- [x] 3. 점수화와 dry-run 요약 파일
  - 선행: 2
  - 변경: `scripts/reddit/score.mts`(키워드 일치, `bazi`는 다른 키워드와 함께일 때만 가산, 출생 정보 패턴(날짜·시각) 가산, 글 나이, 댓글 수 적을수록 가산, 서브레딧 가중치. 점수 근거 문자열 반환), `scripts/reddit/render.mts`(요약 마크다운: 수집 통계 → 상위 글 → 경쟁사 → 섀도 점검 자리. 메모·사주 칸은 비어 있으면 "(dry-run)").
  - QA: `npm run reddit:digest -- --dry-run` 후 `marketing/reddit/digest/<오늘>.md`가 생기고, 상위 글이 최대 10개, 각 글에 제목·퍼머링크·서브레딧·나이·댓글 수·점수 근거가 있다. `npx tsx scripts/reddit/score.test.mts`(고정 샘플 5개: bazi 단독 글은 0점 근처, saju+생년월일 글이 최상위)가 통과.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/score.test.mts` → "score tests: 26 passed" exit 0. 실레딧 `npm run reddit:digest -- --dry-run` → exit 0, 13곳 중 9곳 성공(429 4곳은 요약 표에 실패로 기록), 새 글 87·점수 있는 글 84, `marketing/reddit/digest/2026-10-25.md`에 상위 10개(제목·링크·서브레딧·나이·댓글·점수 근거)와 섹션 4개. 같은 날 재실행은 `-2.md`로 따로 쓴다. 구현은 muse(지시서 20, 브랜치 task-20). (2026-10-25)

- [ ] 3a. 점수 잡음 줄이기와 가중치 설정화
  - 선행: 3
  - 배경: 3번 실측에서 `"four pillars"`가 카지노 스팸·해커톤·D&D·개인 프로필(`r/u_*`) 글에 걸려 상위 10개 중 절반 이상이 잡음. 키워드 외 가중치가 `score.mts`에 고정돼 SPEC("규칙과 가중치는 설정 파일에")과 어긋남. RSS 본문에 HTML 엔티티가 두 번 인코딩돼 남음(`&#39;`, `&quot;`).
  - 변경: `marketing/reddit/config.json`에 `scoring` 블록(키워드·보조 키워드·생년월일·시각·감시 서브레딧·질문 가산값, 나이·댓글 곱셈 구간, 문맥 필요 키워드 목록과 문맥어 목록, 프로필 글 곱셈) 추가 + `config.mts` 검증. `score.mts`가 설정값을 읽고, 감시 서브레딧 밖에서는 문맥 필요 키워드(`four pillars` 등)에 문맥어(bazi·saju·astrology·zodiac·chart·element·day master 등)가 같이 있어야 가산, `r/u_*` 글은 감점. `collect.mts` RSS 본문·제목 엔티티를 한 번 더 디코드.
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` exit 0. `npx tsx scripts/reddit/score.test.mts` 통과(샘플 추가: 비감시 서브레딧의 "four pillars of healthcare" 글 0점, `r/u_*` 사주 글은 같은 내용의 감시 서브레딧 글보다 낮음, RSS 이중 인코딩 `&amp;#39;` → `'`). 설정에서 `scoring` 키 하나를 지우면 exit 1과 키 이름. 실레딧 dry-run 1회로 상위 10개 중 사주 무관 글이 2개 이하인지 직접 읽어 확인하고 결과를 여기 적는다.
  - QA(코드): `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/score.test.mts` → "score tests: 39 passed" exit 0(기존 26개 점수 그대로). `--config <scoring.contextWords 지운 사본>` → `config: "scoring.contextWords" is missing` exit 1. 구현은 muse(지시서 21, 브랜치 task-21) + 이 세션이 한 줄 추가: 감시 서브레딧 밖에서 인정된 키워드가 없으면 생년월일·시각이 있어도 0점(카지노 스팸이 날짜·시각 +4로 남던 문제). (2026-10-25)
  - QA(오프라인 재채점): 아침 요약 `2026-10-25.md`의 상위 10개(제목 + 잘린 본문)를 새 규칙으로 다시 매김 → 사주 무관 5개(카지노, D&D, 해커톤, Scroll 2개) 모두 0점, `r/u_*` 바쯔 글 5.0→2.5, 남은 5개는 전부 점성·바쯔 글. 본문이 잘린 상태라 근사치.
  - 남은 것: 실레딧 dry-run 확인. 2026-10-25에는 하루 요청 상한 200을 다 써서(`today 200/200`, 13곳 중 4곳만 성공·새 글 0) 못 했다. 2026-10-26 이후 `npm run reddit:digest -- --dry-run` 1회 → 상위 10개 중 사주 무관 글 2개 이하면 `[x]`.

- [x] 4. 경쟁사 언급 모음
  - 선행: 2
  - 변경: `scripts/reddit/competitors.mts`(설정의 이름·도메인을 제목·본문·URL에서 대소문자 무시로 찾음, 점수와 무관하게 전부), 사이트 검색에 경쟁사 이름 질의 추가(하루 상한 안에서), `render.mts`의 경쟁사 섹션.
  - QA: `npx tsx scripts/reddit/competitors.test.mts`(샘플 4개: "getpalja.com" 링크, "PAL:JA" 표기, 무관한 "pal" 단어는 미검출) 통과, dry-run 요약에 경쟁사 섹션이 있다(0건이면 "없음").
  - QA: `.mts` 직접 tsc·루트 `npx tsc --noEmit` → exit 0. `npx tsx scripts/reddit/competitors.test.mts` → "competitor tests: 13 passed" exit 0(getpalja.com 링크·PAL:JA 표기 검출, pal·palette·yourself 미검출, `starlit-alley` URL, 한 글 2개 경쟁사 설정 순서, `renderDigest` 0건 "없음"·히트 줄에 제목·이름·링크). `score.test.mts` 여전히 39 passed. 구현은 muse(지시서 22, 브랜치 task-22). 실레딧 dry-run은 오늘 상한 초과라 못 했고, 3a의 2026-10-26 dry-run에서 `comp:` 5곳 수집 통계와 섹션을 같이 본다. (2026-10-25)

- [x] 5. 섀도 필터 점검
  - 선행: 1
  - 변경: `scripts/reddit/shadow.mts`(쿠키 없이 `/user/Ok_Mind_8887/about.json`·`/comments.json`, 최근 댓글 최대 10개의 퍼머링크 JSON에서 본문이 `[removed]`이거나 스레드에 없는지 확인. 결과: 계정 보임/없음(404), 댓글별 보임/숨김), 계정명은 설정에서. 요약 맨 위에 계정 안 보이면 경고.
  - QA: `npx tsx scripts/reddit/shadow.mts`가 현재 계정에 대해 "계정 보임, 댓글 0개"처럼 결과를 출력하고 종료 코드 0. 존재하지 않는 계정명을 인자로 주면 "계정 없음(404)".
  - QA: `.mts` 직접 tsc → exit 0. 실레딧(하루 상한을 210으로 올린 임시 설정 사본 `--config`, 실제 설정은 그대로) `npx tsx scripts/reddit/shadow.mts` → "u/Ok_Mind_8887: 계정 보임, 최근 댓글 0개 중 숨김 0개" exit 0, `zz_no_such_user_8f3k2q9x` → "WARNING: … 안 보임(404). 섀도밴 의심" + "계정 없음(404)" exit 0. `.json`은 403이라 둘 다 RSS로 판정(계정당 요청 2회). 댓글 판정(`parseUserComments`·`judgeComment`)은 레딧 Atom 형식 샘플로 오프라인 확인만(보임/`[removed]`/스레드에 없음, JSON 중첩 replies). `about.json`은 비로그인 `.json`이 막혀 있고 RSS 대체가 없어 뺐다: 계정 판정은 댓글 목록의 404로 한다. 요약 연결(`shadowSummary` → `renderDigest`의 `shadow`)은 9번. 이 세션 직접 작성. (2026-10-25)

- [ ] 6. UTM 링크 생성기
  - 선행: 1
  - 변경: `scripts/reddit/utm.mts`(`npm run reddit:utm -- --sub ChineseZodiac --medium comment --content dm-intro` → `https://www.fatesaidapp.com/?utm_source=reddit&utm_medium=comment&utm_campaign=chinesezodiac&utm_content=dm-intro`, 경로 옵션 `--path /saju-calculator`, 값은 소문자·영숫자·하이픈만), 키 이름은 `lib/eventSchema.ts`의 `UTM_KEYS`를 import해서 씀.
  - QA: `npm run reddit:utm -- --sub ChineseZodiac --medium comment --content dm-intro` 출력이 위 URL과 정확히 같다. `--medium dm`처럼 post/comment 외 값은 종료 코드 1.

- [ ] 7. 출생 정보 추출과 사주 계산 (이 세션 직접)
  - 선행: 1
  - 변경: `scripts/reddit/chart.mts`(LLM 구조화 추출: 연·월·일·시·분·도시·성별·음력 여부, JSON 스키마 강제 → 코드로 범위 검증 → `lib/worldCities.ts`로 도시 id 찾기 → `calculateManseryeok` 호출 → 4기둥·일간·오행 분포 요약 문자열. 시각 없음 = "시주 없음", 도시 못 찾음 = 표시, 음력 = 계산 생략, 성별 없음 = 대운 생략), 픽스처 `scripts/reddit/fixtures/chart-posts.json`(시각 있음/없음/도시 없음/음력 4개). 엔진 파일은 수정하지 않는다.
  - QA: `npx tsx --env-file=.env.local scripts/reddit/chart.test.mts`(LLM 추출은 픽스처의 기대 구조와 비교, 계산 결과는 같은 입력으로 엔진을 직접 부른 값과 일치) 통과. `npm run validate:manseryeok` 여전히 통과. OpenAI 호출 4회(비용 미미).

- [ ] 8. 답할 포인트 메모 (이 세션 직접)
  - 선행: 3, 3a, 7
  - 변경: `scripts/reddit/memo.mts`(시스템 지시: 질문 요지 1줄 / 답할 포인트 2~3개 / 피할 것 / 서브레딧 규칙 주의. 완성 문단 금지, 앱·웹 이름·URL 금지, `PRODUCT.md` 원칙 반영(나쁜 날·궁합 없음, 건강·죽음·사고·재정 손실 예측 없음, 단정적 부정 예측 없음, 미성년 연애 없음). 사주 계산 결과가 있으면 그것만 근거로 쓰고 없는 차트 사실은 만들지 않음. 응답 후 검사기: URL·"Fatesaid"·경쟁사 이름·3문장 넘는 연속 문단이 있으면 메모에 경고 표시), 모델은 환경 변수 `REDDIT_MEMO_MODEL`(기본 기존 소형 모델), 사용량으로 비용 합산.
  - QA: `npm run reddit:digest -- --limit 3`(OpenAI 3~6회 호출) 후 요약 파일에 메모 3개, 맨 위에 LLM 비용, 검사기 경고 0개. 메모를 직접 읽어 완성 답글처럼 보이지 않는지 확인하고 결과를 여기 적는다.

- [ ] 9. 통합 실행과 사용법 문서
  - 선행: 3, 4, 5, 8
  - 변경: `digest.mts`에서 전 과정 연결(수집 → 점수 → 사주 → 메모 → 경쟁사 → 섀도 → 렌더), 실행 시간과 요청 수 출력, `marketing/reddit/README.md`(아침 루틴: 실행 → 요약 읽기 → 직접 답글 → 로그아웃 확인. 링크 노출 시작 조건: 계정 활동 2~3주 + iOS 공개. 서브레딧별 홍보 규칙 요약은 `REDDIT_RESEARCH_2026-10-25.md` 링크).
  - QA: `npm run reddit:digest`(전체, OpenAI 10~20회) 종료 코드 0, 요약 파일에 네 섹션 모두 존재. 루트 `npx tsc --noEmit` 오류 0, `npm run lint` 통과. `git status`에 digest·state 파일이 안 보인다.

- [ ] 10. UTM 유입 확인 (사용자 확인)
  - 선행: 6
  - 절차: `npm run reddit:utm -- --sub test --medium post --content utm-check`로 만든 링크를 휴대폰 브라우저에서 연다 → 랜딩에서 아무 버튼이나 한 번 누른다 → 이 세션에 알리면 Supabase `events`에서 `utm_source=reddit`, `utm_content=utm-check` 이벤트를 조회해 확인(읽기 전용).

- [ ] 11. 계정 준비와 커밋 (사용자 실행)
  - 레딧 프로필 표시 이름과 소개 설정(예: "Building a Korean saju app. Ask me about Four Pillars."). 사용자명은 바꿀 수 없음.
  - 첫 2~3주는 링크 없이 ChineseZodiac, Bazi_Astrology, AstrologyCharts 위주로 하루 1시간 이내 답변. 글은 자기 말로(AI 금지 서브레딧 많음).
  - 각 항목 끝에 제안하는 커밋 메시지로 사용자가 커밋·푸시.

## 발견 사항

- 루트 `tsconfig.json`의 `include`가 `**/*.ts`라서 `scripts/**/*.mts`는 `npx tsc --noEmit`에 안 잡힌다. 이 TODO의 tsc QA는 1번에 적은 `.mts` 직접 검사 명령을 같이 돌린다. (1번)
- 경쟁사 도메인은 `getpalja.com`만 확인됨. K-Sajupalja, Starlit Alley, Youra, TKB_Studio는 이름·별칭만 넣었다. 도메인을 알게 되면 `config.json`에 추가. (1번)
- 레딧은 지금 이 UA의 비로그인 `.json`을 항상 403으로 막는다. 수집은 사실상 RSS뿐이라 댓글 수가 없다(`numComments: null`) → 3번 점수화에서 댓글 수 가중치는 RSS 글이면 빼야 한다. (2번)
- RSS도 3초 간격이면 429가 잦아 회당 13곳 중 5곳만 성공. `requestIntervalMs` 7000으로 올린 뒤 실측 13곳 중 9곳 성공, 실행 7분 40초, 요청 32회(3번 dry-run). 더 올릴지는 다음 실행들을 보고 판단. (2번, 3번에서 확인)
- `reddit:utm` 스크립트 항목은 넣었지만 `scripts/reddit/utm.mts`는 6번에서 만든다. 그 전엔 실행하면 파일 없음 오류. (1번)
- 점수 품질: `"four pillars"`가 사주와 무관한 글(카지노 스팸, 해커톤, D&D, 개인 프로필 `r/u_*`)에 걸려 실제 상위 10개 중 절반 이상이 잡음. 개선안: 감시 서브레딧 밖에서는 `four pillars`에 사주 문맥어(bazi·saju·astrology·zodiac·chart·element·day master 등)가 같이 있어야 가산, `r/u_*` 프로필 글은 감점. 키워드 외 가중치(키워드 +3, 생년월일 +3 등)가 지금 `score.mts`에 고정돼 있어 SPEC의 "규칙과 가중치는 설정 파일에" 와도 어긋난다 → 함께 `config.json`으로 옮기는 소항목 추천. (3번) → 3a로 옮김.
- RSS 본문에 HTML 엔티티가 두 번 인코딩돼 남는다(`&#39;`, `&quot;`, `&amp;`). `collect.mts`의 `decodeEntities`를 한 번 더 돌리면 될 듯. 8번 메모 입력 품질에도 영향. (3번) → 3a로 옮김.
- 하루 요청 상한 200은 한 번 실행(약 32회)보다 훨씬 크지만, 같은 날 개발 중 여러 번 돌리면 금방 찬다. 상한에 걸린 실행도 빈 요약 파일(`-2.md`)을 남긴다. 8·9번 QA는 하루에 몰지 말 것. (3a번)
- 감시 서브레딧 `AstrologyCharts`의 서양 점성 질문(형제 궁합, 학교 고르기)이 감시 +2·질문 +1로 3.6점을 받아 상위에 든다. 사주 문맥이 없는 감시 서브레딧 글을 낮출지는 실제 답글 경험을 보고 판단. (3a번)
- 섀도 점검의 댓글별 판정은 실제 댓글이 없어 실레딧에서 안 돌았다(AutoModerator 공개 피드는 빈 피드). 첫 댓글을 단 다음 날 `npx tsx scripts/reddit/shadow.mts`로 "보임" 1줄이 나오는지 확인. (5번)
- 전체 실행 요청 수가 경쟁사 검색 5곳 + 섀도 2회 이상으로 약 40회로 는다. 7초 간격에서도 연속 요청 4번째에 RSS 429가 났다(5번 QA 중). (4·5번)
