# 레딧 리스닝 사용법

레딧에서 사주·바쯔·차트 질문을 찾아 아침 요약과 답글 초안을 만든다. 도구는 게시·댓글·투표·DM을 하지 않는다. 초안은 출발점일 뿐이고, 사람이 고쳐서 직접 올린다.

수집은 기본으로 Aside 브라우저(로그인된 u/Ok_Mind_8887)를 거친다(`config.json`의 `transport: "aside"`). 로그인 상태라 `.json`이 열려 댓글 수가 생기고 429가 거의 없다. Aside가 꺼져 있거나 다른 계정이면 그 실행은 쿠키 없는 직접 요청으로 대체하고 요약 맨 위 "수집" 칸에 이유를 적는다. 섀도 점검은 로그아웃 시야가 목적이라 항상 쿠키 없이 읽는다.

## 매일 자동 실행 (Claude 예약 작업)

Claude 앱의 예약 작업 "레딧 아침 요약"(`reddit-digest-daily`, 매일 07:30)이 `scripts/reddit/run-daily.sh`를 한 번 돌리고, 요약 파일 경로·비용·섀도 경고·aside 대체 여부를 한국어로 짧게 보고한다. 스크립트는 끝날 때 macOS 알림("레딧 요약")도 띄운다. 로그는 `marketing/reddit/state/daily-YYYY-MM-DD.log`.

- Claude 앱이 켜져 있어야 돈다. 꺼져 있었으면 다음 실행 때 한 번 돈다.
- Aside 앱이 켜져 있고 레딧에 u/Ok_Mind_8887로 로그인돼 있어야 aside 수집이 된다.
- 관리(지금 실행, 끄기, 시간 변경): Claude 앱 사이드바 "Scheduled".
- launchd는 쓰지 않는다. 저장소가 `~/Desktop`(macOS 보호 폴더)에 있어 launchd 작업이 `Operation not permitted`로 막혔다(2026-10-26).

## 아침 루틴 (하루 1시간 이내)

1. 실행 (맥에서, 하루 한 번)

   ```bash
   npm run reddit:digest
   ```

   - aside 수집이면 1분 안팎, 직접 요청이면 3~10분. 429가 나면 60초 → 180초 쉬었다가 실패한 묶음만 다시 부른다.
   - OpenAI 비용은 하루 상위 10개(추출 + 메모 + 초안) 기준 약 $0.03 이하. 요약 맨 위에 그날 비용이 적힌다.
   - LLM 없이 수집·점수만 보려면 `npm run reddit:digest -- --dry-run`, 메모·초안 개수를 줄이려면 `-- --limit 3`, 한 번만 쿠키 없이 돌리려면 `-- --transport direct`.
2. 요약 읽기: `marketing/reddit/digest/YYYY-MM-DD.md` (같은 날 다시 돌리면 `-2.md`). 섹션은 다음 순서다.
   - 맨 위: 섀도밴 경고(있을 때만), 모드·LLM 비용·요청 수·실행 시간
   - 1. 수집 통계: 서브레딧 9곳(사주 4곳 가중치 1.2~1.5, 서양 점성 4곳 0.4~0.5, kpoppers), 키워드 6개, 경쟁사 5곳. 실패한 출처는 "실패"로 남는다.
   - 2. 상위 글: 링크, 점수 근거, 사주 계산, 답할 포인트 메모, 답글 초안
   - 3. 경쟁사 언급: 점수와 무관하게 전부. 경쟁사 자사 글은 "(자사 글)"
   - 4. 섀도 필터 점검: 내 계정과 최근 댓글이 로그아웃 상태에서 보이는지
3. 답글: 초안을 읽고 고쳐서 직접 올린다. 먼저 메모 아래 서브레딧 규칙 줄(AI 금지, 링크 금지)을 본다.
   - "⚠️ AI 글 금지 서브레딧"이 붙은 초안(AstrologyCharts, astrology)은 그대로 올리면 밴 위험이 크다. 내용만 참고하고 문장은 다시 쓴다.
   - "검사기 경고"가 붙은 초안(링크, 브랜드, DM 유도, AI 티 나는 표현, 목록)은 그 부분을 고친다.
   - 자살·자해 언급 글은 초안을 만들지 않는다("민감 글: 초안 생략"). 사별·건강 글도 리딩하지 않는다.
   - 본문 없이 이미지만 있는 글은 메모·초안을 만들지 않는다("이미지 글"). 도구가 이미지를 못 보기 때문이다. 링크를 열어 직접 보고, 사주 차트가 아니면(베딕·서양 차트) 건너뛴다.
   - 서양 점성 차트 글(AstrologyCharts 이미지 글)에는 사주 초안이 어긋날 수 있다. 맞지 않으면 건너뛴다.
4. 로그아웃 확인: 다음 날 요약 4번 섹션에서 어제 단 댓글이 "보임"인지 본다. 맨 위에 섀도밴 경고가 뜨면 답글 활동을 멈추고 원인부터 확인한다. 따로 확인하려면 `npx tsx scripts/reddit/shadow.mts`.

## 링크 노출 시작 조건

둘 다 충족되기 전에는 어떤 링크도 걸지 않는다.

- 계정 활동 2~3주: 링크 없이 ChineseZodiac, Bazi_Astrology, AstrologyCharts 위주로 답변
- iOS 공개: App Store 심사 통과 후 (Android는 이미 공개)

그 뒤에도 링크는 `linksAllowed`가 true인 서브레딧에서만, 글이 원할 때만 건다. 링크는 서브레딧별 UTM을 붙여 만든다.

```bash
npm run reddit:utm -- --sub Bazi_Astrology --medium comment --content day-master-q
```

## 설정 바꾸기

`marketing/reddit/config.json` 하나로 바꾼다. 코드는 건드리지 않는다.

- 서브레딧 목록과 메타(가중치, 링크 허용, AI 금지, 홍보 규칙 한 줄), 따로 부를 서브레딧(`separateSubreddits`)
- 키워드, 보조 키워드(`bazi`), 점수 가산값(`scoring`)
- 질문 아닌 글 감점(`scoring.penalties`): 무시 서브레딧(`ignoreSubreddits`, 점수 0, 지금은 1인 SEO 서브레딧 FreeBaziReading), 연재 제목 패턴(`seriesTitlePatterns`, "[BaZi Basics 01]"·"03 |"·"EP04"), 제목이 질문이 아닌 긴 글(`articleMinChars` 자 이상), 홍보 문구 패턴(`promoPatterns`: client·consultation·"I'm offering"·"readings for ₹49"·"I built" 등), 한 작성자가 이번 수집에서 `spreadMinSubreddits`곳 이상에 올린 글(서브레딧마다 문구가 다르면 제목이 질문이어도, 같은 글 크로스포스트면 제목이 질문이 아닐 때만), 서양 점성 서브레딧(`contextSubreddits`)에서 사주 키워드·bazi가 없는 글. 걸릴 때마다 해당 배수(`…Multiplier`)를 곱하고 근거 줄에 적는다. 패턴은 대소문자 무시 정규식이고, 잘못된 정규식이나 감시 목록에 없는 `contextSubreddits`는 설정 오류로 멈춘다.
- 경쟁사 이름·별칭·도메인·계정·서브레딧
- 요청 간격, 하루 요청 상한(기본 200), 재시도 라운드와 대기 시간, 섀도 점검 계정

## 서브레딧별 홍보 규칙

45곳 조사 결과는 [`REDDIT_RESEARCH_2026-10-25.md`](../../REDDIT_RESEARCH_2026-10-25.md)에 있다. 요점은 다음과 같다.

- 점성술 본진(astrology, AstrologyCharts)은 AI 글과 홍보가 금지라서 답변으로 신뢰를 쌓는 곳이다.
- 링크를 걸 수 있는 곳은 대부분 빌더·앱 소개 서브레딧이나 정해진 메가스레드다.
- 앱이 AI 채팅을 쓴다는 사실을 숨기지 않는다.

## 파일 위치

- 코드: `scripts/reddit/*.mts` (진입점 `digest.mts`, 초안 `draft.mts`, aside 수집 `fetch.mts`), 매일 실행 `scripts/reddit/run-daily.sh` + `marketing/reddit/launchd/`
- 결과: `marketing/reddit/digest/`, 상태(본 글, 하루 요청 수): `marketing/reddit/state/`. 둘 다 git 제외.
- 테스트: `npx tsx scripts/reddit/{score,competitors,memo,draft,collect}.test.mts` (오프라인), `chart.test.mts` (OpenAI 호출, 유료)
