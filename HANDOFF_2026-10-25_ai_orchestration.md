# HANDOFF 2026-10-25: 멀티 AI 위임 체계

## 목표
사용자는 Claude 세션에만 말하고, 세션이 다른 AI(Muse, Gemini, Codex, Aside)를 직접 호출한다.

## 끝난 것
- **연결 확인 (실측)**
  - Gemini: Gemini CLI는 개인 계정 로그인이 막혀(2026-06-18 종료) Antigravity CLI(`agy`)로 전환. `agy -p ... --mode plan`으로 호출.
  - Codex: ChatGPT 구독 로그인(`auth_mode: chatgpt`), `codex exec -s read-only`로 호출.
  - Aside: CLI(`aside "작업"`)와 MCP 설치·로그인 완료. MCP는 이 프로젝트 로컬 범위로만 등록(`claude mcp add aside -- aside mcp`). 새 세션부터 도구가 로드된다.
- **실전 검증**
  - Codex 코드 리뷰 합격: 가이드 내부 링크 누락을 찾았고 코드로 확인해 수정함(랜딩 en/es, 계산기, 일간·가이드 Shell).
  - Gemini: 큰 질문은 3분 타임아웃, 한 주제로 쪼개면 성공(경쟁 사이트 4곳). 유튜브는 헤드리스에서 명령 권한이 필요해 실패 → Aside로 대체해 성공.
  - Aside: Search Console 읽기 성공. `sc-domain:fatesaidapp.com` 속성 1개, 색인 데이터는 "처리 중"이라 아직 없음(며칠 뒤 재확인).
- **지시문 점검 (Opus 5.5 기준)**: 모순·낡은 사실 7건 수정. `CLAUDE.md` 작업 분담 규칙, `~/.claude/CLAUDE.md`(전역), `mobile/AGENTS.md`.

## 결정
- Muse는 기여자 모델(`muse-spark-1.3-contributor`)만 쓴다. 그래서 사업 핵심 로직(채점, 유료 프롬프트, 결제)은 Muse에 위임하지 않고 직접 한다.
- 어떤 외부 AI에도 `.env*`, 키, 실제 사용자 데이터, 핵심 로직은 보내지 않는다.
- Aside는 로그인을 사용자가 먼저 해 둬야 하고, 읽기 전용부터 시킨다. 결제·게시·메시지·설정 변경은 사용자 승인.

## 남은 것
- Search Console 색인 상태 재확인(며칠 뒤, Aside).
- Gemini 데이터 사용 동의가 해제됐는지 `agy`의 `/config`에서 확인(사용자).
- 가이드 페이지에 Shell이 가이드 링크를 한 번 더 그린다(GuidePage 안의 목록 링크와 중복). 거슬리면 정리.
- 전역 `~/.claude/agents/design-ui-designer.md`, `engineering-frontend-developer.md`는 강조·고정 절차가 많고 impeccable과 겹친다. 삭제 여부는 사용자 판단.

## 주의
- 이 변경은 웹(Next.js) 쪽뿐이다. 배포는 사용자가 한다. OTA/스토어와 무관.
