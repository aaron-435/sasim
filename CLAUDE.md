# Fatesaid

Product truth (users, positioning, principles, brand commitments) lives in `PRODUCT.md`. Read it before any design or copy work. The native app is `mobile/` (Expo / React Native, see `mobile/CLAUDE.md`); the Next.js app at the root is the API plus the web lead-gen surface.

## Design skills

Four design skills are installed in `.claude/skills/`. Which one applies depends on the surface:

| Skill | Use for | Notes |
|---|---|---|
| `impeccable` | All app UI work: critique, audit, polish, layout, typeset, animate, harden, onboard | Platform is `adaptive`, so its iOS + Android references apply. Native commands have `.native.md` variants (audit, adapt). |
| `emil-design-eng` | Motion, press feedback, gestures, component feel | Examples are CSS/web. Translate them to RN `Animated` (`useNativeDriver: true`, transform/opacity only) instead of copying CSS. |
| `design-taste-frontend` | The web landing surface (`app/`, `components/`) only | The skill says it is for landing pages, not multi-step product UI. Don't apply it to `mobile/` screens. |
| `redesign-existing-projects` | Audit pass on an existing screen to spot generic/AI-looking patterns before `impeccable` fixes them | CSS/web examples; translate to RN styles. Palette and fonts stay fixed (see below). |

### Taste dials for the web landing

Set conversationally here instead of editing the skill file (it says overrides happen in conversation, and edits would be lost on `npx skills update`). Read: premium consumer, calm and warm, not experimental.

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 3`

### Fixed constraints any skill must respect

- Palette: Celadon & Hanji (`mobile/theme/colors.ts`). Don't propose Obsidian & Gold or a new palette unless the user asks for a rebrand.
- Fonts: Newsreader for display moments and Plus Jakarta Sans for UI text (user pick 2026-10-04; Korean stays on the system font). Reference them only through `FONTS` in `mobile/theme/fonts.ts`, never by family name; use `FONTS.displayItalic` instead of `fontStyle: "italic"`. The PDF (`lib/pdf/reportPdf.tsx`) uses the same faces.
- Pressure rule (decided 2026-09-19, the "middle path"): mild tension and curiosity are allowed — name what's coming and lock the why/what-to-do ("today asks you to pace yourself — why and what to do open with Pro"), and strong metaphors ("a headwind") are fine inside subscriber content. Still off-limits: fake countdowns or scarcity, "unlucky day" red alerts, health/death/accident/disaster predictions, flat negative predictions ("you will lose money"), and a negative prediction placed directly above a paywall as the hook. Reasons: store/consumer-protection rules for a subscription product, and vulnerable users. See `PRODUCT.md` principles.
- Any new motion honors reduced motion (`AccessibilityInfo.isReduceMotionEnabled()` on native).
- UI changes must stay OTA-shippable unless the user approves a native build: no new native dependencies without asking.

### Verifying UI

- Quick loop: the `mobile-web` preview (port 8082) at the `mobile` viewport preset. It can't show subscriber-only screens (RevenueCat is native-only) or native-only behavior.
- Native truth: the iOS Simulator with a dev-client build (Expo Go no longer works). Say which one produced the evidence.
- Impeccable asks for bounded passes: inspect once, fix in one batch, confirm with at most one more round.

## Agent workflow (multi-step work)

For a task that spans several files or steps (a new feature, a refactor, a pipeline change), work through files instead of chat memory. One-line fixes and questions skip this. Design lives in `WIKI.md`; each task's scope and progress live in `SPEC.md` / `TODO.md`.

| File | Holds | Written by |
|---|---|---|
| `SPEC.md` | Goal, in/out of scope, constraints, done criteria for the current task only. Overwritten per task. | `/spec` |
| `TODO.md` | Checkbox items, each small enough for one session and carrying its own QA command. | `/spec`, after the user approves SPEC |
| `WIKI.md` | Durable architecture map: big picture and flows, no code. Read at the start of a work session. | `/work`, `/wiki` |

Flow: `/spec <requirements>` → user approves SPEC, then TODO → **fresh session** → `/work` (one TODO item per run) → repeat. Planning chatter should not be billed again as development context, so don't continue into `/work` in the session that planned.

Rules:
- Done means evidence. Run the item's QA command and read its output before ticking `[x]`; say which command produced it. Anything only the user can check (real device, RevenueCat, store consoles) stays `[ ]` marked `(user check)` with exact steps. Don't fake entitlements or stub around it.
- Session start order: `SPEC.md`, `TODO.md`, `WIKI.md`. Stable documents first, then the work.
- Stay inside the picked TODO item. Things found on the way go under "발견 사항" in `TODO.md`, not into the diff.
- If failures repeat or the session fills with error logs, stop at the last green state, record it in `TODO.md`, and recommend a fresh session.
- Commits, pushes, `eas update` and store submissions stay user-triggered (deploy order is in the latest `HANDOFF_*.md`). At the end of an item, propose a commit message and wait.
- `HANDOFF_<date>.md` keeps project-wide state (deploys, business, open decisions). `SPEC.md` / `TODO.md` are per task only.
- Write `SPEC.md`, `TODO.md` and `WIKI.md` in Korean.

### Verification commands (pick these for TODO QA lines)

| Change | Command | Where |
|---|---|---|
| Web / API types | `npx tsc --noEmit` | root |
| Web / API build, routes | `npm run lint && npm run build` | root |
| Native app types | `ulimit -s 65500; node --stack-size=60000 node_modules/typescript/lib/tsc.js --noEmit` (default stack overflows) | `mobile/` |
| Saju engine (`lib/manseryeok.ts`, `solarTerms.ts`, `kasi.ts`) | `npm run validate:manseryeok` | root |
| Chat prompts / logic | `npx tsx --env-file=.env.local scripts/sim-chat.mts [turns] [styles]` (calls OpenAI, costs money; keep turns low) | root |
| Native UI | `mobile-web` preview, or iOS Simulator dev-client (see "Verifying UI") | |

## 작업 분담 규칙 (Opus 기획 / Muse 코딩 / Haiku·Sonnet 검증)
- 이 세션(Opus)은 기획, 설계, 최종 판단, 지시서 작성만 한다.
- 3개 파일 이상 수정하거나 반복 구현이 필요한 코딩은 직접 하지 말고 muse에 위임한다. 한두 줄짜리 수정 등 작은 작업은 위임 비용이 더 크므로 직접 한다.
- 위임 절차:
  1. `.agents/tasks/_template.md`를 복사해 `.agents/tasks/NN-제목.md` 지시서를 쓴다.
  2. `git switch -c task-NN` 으로 작업 브랜치를 만든다.
  3. 실행: `muse exec --model muse-spark-1.3-contributor --disable-approval --trust-workspace --max-model-steps 60 --prompt-file .agents/tasks/NN-제목.md`
  4. `git diff`로 결과를 확인한다.
  5. verifier-lite(Haiku)로 테스트, 빌드, 린트를 1차 점검한다.
  6. 통과하면, 변경이 크거나 핵심 로직(결제, API 연동, 채점 로직 등)일 때만 verifier(Sonnet)로 리뷰한다.
  7. 문제가 있으면 지시서를 보강해 muse를 다시 실행한다. 같은 작업이 3회 실패하면 직접 수정하거나 사용자에게 보고한다.
- muse exec의 종료 코드 0은 "작업을 끝냈다"는 뜻일 뿐 정답이라는 뜻이 아니다. 반드시 테스트 명령으로 확인한다.
- 추론 강도는 기본값(high)을 쓰고 max는 쓰지 않는다.
- 보안: `.env*`, 키 파일, 실제 사용자 데이터는 muse 작업에 쓰지 않는다. 기여자 모델(-contributor)은 입출력이 Meta 모델 학습에 쓰이므로, 사업 핵심 로직(채점 로직, 유료 콘텐츠 프롬프트 등)을 건드리는 작업은 `--model muse-spark-1.3`(표준)으로 실행한다.
