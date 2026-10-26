# TODO (2026-10-26) — 레딧 aside 수집·답글 초안·매일 실행

범위는 `SPEC.md`. 이 세션에서 1~4를 한 번에 진행(사용자 요청).

- [x] 1. aside 수집
  - 변경: `fetch.mts`(`Transport`, `aside repl` GET + 글 목록 필드 줄이기, `asideAccount`), `config.mts`·`config.json`(`transport: "aside"`), `digest.mts`(`--transport`, 계정 확인 후 direct 대체, 섀도 점검은 direct Fetcher).
  - QA: aside repl로 `/api/me.json` → `Ok_Mind_8887`. `npm run reddit:digest -- --limit 3` → "transport: aside (u/Ok_Mind_8887)", 출처 18곳 모두 json 성공(실패 0, 429 0), 요청 6(수집 4 + 섀도 2), 실행 46초(이전 direct 3분 34초). 상위 글에 댓글 수 표시("댓글 0", "댓글 1").

- [x] 2. 답글 초안
  - 변경: `draft.mts`(새, 이 세션 직접 작성), `memo.mts`(`linkAndBrandWarnings` 분리), `render.mts`(초안 칸, 수집 경로), `digest.mts`(메모 뒤 초안).
  - QA: `npx tsx scripts/reddit/draft.test.mts` → "draft tests: 26 passed". 위 실행 `marketing/reddit/digest/2026-10-26-5.md`: 상위 3개 초안, OpenAI 6회 $0.0067, 메모·초안 경고 0. 직접 읽음: 인사말·목록·링크·DM 없음, 차트 없는 글이라 차트 사실 없이 출생 정보를 물음, AstrologyCharts 글에 "AI 글 금지" 경고 줄 표시.

- [x] 3. 매일 자동 실행 스크립트
  - 변경: `scripts/reddit/run-daily.sh`. (launchd plist는 4번에서 막혀 지움)
  - QA: `scripts/reddit/run-daily.sh --dry-run` → exit 0, `marketing/reddit/state/daily-2026-10-26.log`에 시작·종료(exit 0) 기록.

- [x] 4. 매일 자동 실행 등록과 첫 실행 (사용자 확인)
  - QA: 사용자가 예약 작업 "지금 실행" 후 정상 작동 확인(2026-10-26). 로그 `daily-2026-10-26.log`에 aside 수집 출처 전부 json, 실패 0. 다음 날 07:30 자동 실행은 아직 확인 전.
  - launchd 시도(2026-10-26, 사용자 설치): `last exit code = 126`, `/tmp/fatesaid-reddit-digest.err`에 `run-daily.sh: Operation not permitted` → `~/Desktop` 보호 폴더라 launchd 불가. 사용자 선택으로 bootout·plist 삭제 후 Claude 예약 작업 `reddit-digest-daily`(매일 07:30, Auto 모드로 저장)로 교체. 이 세션의 "지금 실행"은 권한 분류기가 막음.
  - 확인(사용자): Claude 앱 사이드바 Scheduled → "레딧 아침 요약" → 지금 실행 → 실행 세션이 요약 파일 경로와 "수집 aside (u/Ok_Mind_8887)"를 보고하고 "레딧 요약" 알림이 뜨면 `[x]`. 다음 날 07:30 실행도 한 번 확인.

- [x] 5. 문서
  - `marketing/reddit/README.md`(aside 수집, 자동 실행, 초안 쓰는 법), `WIKI.md` 레딧 줄.
  - QA: 루트 `npx tsc --noEmit` → exit 0, `.mts` 직접 tsc → exit 0, `npm run lint` → "No ESLint warnings or errors", score 52·competitors 29·memo 27·draft 26 통과.

- [x] 6. 감시 서브레딧 조정 (사용자 요청, 2026-10-26)
  - 이유: 지금까지 요약 상위 글 약 55개 중 30개가 r/AstrologyCharts(본문 없는 서양 점성 차트 사진). 그 서브레딧이 묶음 100개 중 약 70개를 차지해 사주 서브레딧 글도 밀어냄.
  - 변경(`config.json`, 사용자 선택: 서양은 빼지 않고 가중치만 낮춤): chineseastrology(1.5)·EasternOccult(1.2) 추가(aside로 최근 7일 글 6·9개, 규칙 확인), AstrologyCharts 1.2→0.4, AstrologyChartShare 1.0→0.4, astrology 0.8→0.4, Horoscope 1.0→0.5, AstrologyCharts를 `separateSubreddits`로(요청 +1). 테스트 기대값 갱신(`collect.test.mts` 묶음 5개, `score.test.mts` s3 1.8·s5 1.1).
  - QA: 상태 파일 안 쓰는 미리보기(스크래치패드 `rank-preview.mts`, aside 수집, 최근 3일 글) → 상위 12개에 AstrologyCharts 0개, 1~7위 ChineseZodiac·EasternOccult·chineseastrology·FreeBaziReading 사주 글. score 52·competitors 29·memo 27·draft 31·collect ok, `.mts` tsc exit 0, lint 통과.

## 발견 사항

- 상위 글이 대부분 r/AstrologyCharts의 서양 점성 차트 글(이미지 글)이라 사주 초안이 어긋난다("생년월일시 주세요"). 점수에서 사주 문맥 없는 감시 서브레딧 글을 낮추는 일은 보관본 발견 사항과 같은 문제. 다음 SPEC에서 처리.
- aside 수집 대체 경로(aside 꺼짐 → direct)는 코드로만 넣었고 실제로 aside를 끈 상태로는 돌려 보지 않았다.
- aside로 요청이 4회로 줄어 하루 상한 200은 여유가 크다. 간격 7초도 줄일 수 있지만 계정 보호를 위해 그대로 둠.
- 이미지만 있는 글(본문 비어 있음, url이 `i.redd.it`)은 메모·초안이 이미지를 못 보고 "차트 없음, 생년월일시 달라"로 쓴다. 실례: r/AstrologyCharts 1xfql6z(r/Free_Vedic_Astro 크로스포스트, 이미지는 베딕 쿤달리에 생년월일·시각까지 있음) → 초안이 "Without a chart"로 시작해 봇처럼 보임. 수집 때 `post_hint`/이미지 url을 남겨 "이미지 글: 초안 생략 또는 감점" 처리 검토. (2026-10-26 사용자 확인 요청) → 같은 날 해결: `draft.mts`의 `imageOnlyReason`(본문 비어 있고 url이 i.redd.it·preview.redd.it·imgur·이미지 확장자·gallery)이면 `digest.mts`가 사주·메모·초안 모두 생략하고 "이미지 글: 직접 보고 판단" 표시. QA: `draft.test.mts` → 31 passed(이 글 url 포함 5건), `.mts` tsc·루트 tsc exit 0, lint 통과, score 52·competitors 29·memo 27.
- 6번 미리보기 상위권에 질문이 아닌 글이 섞인다: 다른 사람의 바쯔 강좌 연재("[BaZi Basics 01]"), 1인 SEO 서브레딧 r/FreeBaziReading, 여러 서브레딧(r/Scorpio, r/LoveIslandUSA, r/Taurusgang)에 "Chinese astrology has 10 birthday types" 식으로 뿌리는 홍보 글. 답할 질문이 아니므로 질문 신호 없는 글 감점 또는 FreeBaziReading을 경쟁사·무시 목록에 넣는 것 검토. (6번)
