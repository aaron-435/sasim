# Fatesaid

Product truth (users, positioning, principles, brand commitments) lives in `PRODUCT.md`. Read it before any design or copy work. The native app is `mobile/` (Expo / React Native, see `mobile/CLAUDE.md`); the Next.js app at the root is the API plus the web lead-gen surface.

## Design skills

Three design skills are installed in `.claude/skills/`. Which one applies depends on the surface:

| Skill | Use for | Notes |
|---|---|---|
| `impeccable` | All app UI work: critique, audit, polish, layout, typeset, animate, harden, onboard | Platform is `adaptive`, so its iOS + Android references apply. Native commands have `.native.md` variants (audit, adapt). |
| `emil-design-eng` | Motion, press feedback, gestures, component feel | Examples are CSS/web. Translate them to RN `Animated` (`useNativeDriver: true`, transform/opacity only) instead of copying CSS. |
| `design-taste-frontend` | The web landing surface (`app/`, `components/`) only | The skill says it is for landing pages, not multi-step product UI. Don't apply it to `mobile/` screens. |

### Taste dials for the web landing

Set conversationally here instead of editing the skill file (it says overrides happen in conversation, and edits would be lost on `npx skills update`). Read: premium consumer, calm and warm, not experimental.

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 3`

### Fixed constraints any skill must respect

- Palette: Celadon & Hanji (`mobile/theme/colors.ts`). Don't propose Obsidian & Gold or a new palette unless the user asks for a rebrand.
- Fonts: Cormorant Garamond for display moments, Manrope for UI text.
- Pressure rule (decided 2026-09-19, the "middle path"): mild tension and curiosity are allowed — name what's coming and lock the why/what-to-do ("today asks you to pace yourself — why and what to do open with Pro"), and strong metaphors ("a headwind") are fine inside subscriber content. Still off-limits: fake countdowns or scarcity, "unlucky day" red alerts, health/death/accident/disaster predictions, flat negative predictions ("you will lose money"), and a negative prediction placed directly above a paywall as the hook. Reasons: store/consumer-protection rules for a subscription product, and vulnerable users. See `PRODUCT.md` principles.
- Any new motion honors reduced motion (`AccessibilityInfo.isReduceMotionEnabled()` on native).
- UI changes must stay OTA-shippable unless the user approves a native build: no new native dependencies without asking.

### Verifying UI

- Quick loop: the `mobile-web` preview (port 8082) at the `mobile` viewport preset. It can't show subscriber-only screens (RevenueCat is native-only) or native-only behavior.
- Native truth: the iOS Simulator with a dev-client build (Expo Go no longer works). Say which one produced the evidence.
- Impeccable asks for bounded passes: inspect once, fix in one batch, confirm with at most one more round.
