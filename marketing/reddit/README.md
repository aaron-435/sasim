# 레딧 리스닝 사용법

레딧에서 사주·바쯔·차트 질문을 찾아 아침 요약을 만든다. 읽기 전용이다. 도구는 게시·댓글·투표·로그인을 하지 않고, 답글은 사람이 자기 말로 쓴다.

## 아침 루틴 (하루 1시간 이내)

1. 실행 (맥에서, 하루 한 번)

   ```bash
   npm run reddit:digest
   ```

   - 3~10분 걸린다. 429가 나면 60초 → 180초 쉬었다가 실패한 묶음만 다시 부른다.
   - OpenAI 비용은 하루 상위 10개 기준 약 $0.02 이하. 요약 맨 위에 그날 비용이 적힌다.
   - LLM 없이 수집·점수만 보려면 `npm run reddit:digest -- --dry-run`, 메모 개수를 줄이려면 `-- --limit 3`.
2. 요약 읽기: `marketing/reddit/digest/YYYY-MM-DD.md` (같은 날 다시 돌리면 `-2.md`). 섹션은 다음 순서다.
   - 맨 위: 섀도밴 경고(있을 때만), 모드·LLM 비용·요청 수·실행 시간
   - 1. 수집 통계: 서브레딧 7곳, 키워드 6개, 경쟁사 5곳. 실패한 출처는 "실패"로 남는다.
   - 2. 상위 글: 링크, 점수 근거, 사주 계산, 답할 포인트 메모
   - 3. 경쟁사 언급: 점수와 무관하게 전부. 경쟁사 자사 글은 "(자사 글)"
   - 4. 섀도 필터 점검: 내 계정과 최근 댓글이 로그아웃 상태에서 보이는지
3. 직접 답글: 메모는 방향만 준다. 문장은 자기 말로 쓴다. 메모 아래의 서브레딧 규칙 줄(AI 금지, 링크 금지)을 먼저 본다. 민감한 글(자해·사별·건강)은 리딩하지 않는다.
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
- 경쟁사 이름·별칭·도메인·계정·서브레딧
- 요청 간격, 하루 요청 상한(기본 200), 재시도 라운드와 대기 시간, 섀도 점검 계정

## 서브레딧별 홍보 규칙

45곳 조사 결과는 [`REDDIT_RESEARCH_2026-10-25.md`](../../REDDIT_RESEARCH_2026-10-25.md)에 있다. 요점은 다음과 같다.

- 점성술 본진(astrology, AstrologyCharts)은 AI 글과 홍보가 금지라서 답변으로 신뢰를 쌓는 곳이다.
- 링크를 걸 수 있는 곳은 대부분 빌더·앱 소개 서브레딧이나 정해진 메가스레드다.
- 앱이 AI 채팅을 쓴다는 사실을 숨기지 않는다.

## 파일 위치

- 코드: `scripts/reddit/*.mts` (진입점 `digest.mts`)
- 결과: `marketing/reddit/digest/`, 상태(본 글, 하루 요청 수): `marketing/reddit/state/`. 둘 다 git 제외.
- 테스트: `npx tsx scripts/reddit/{score,competitors,memo,collect}.test.mts` (오프라인), `chart.test.mts` (OpenAI 호출, 유료)
