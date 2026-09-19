---
target: 홈 화면
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/kwonhyunjo/Desktop/sasim/work/mobile/screens/HomeScreen.tsx"
target_fingerprint: "sha256:821dc6aae011917281b97041359bc905f97662c2389cd17f09b6105974c289a6"
target_path: /Users/kwonhyunjo/Desktop/sasim/work/mobile/screens/HomeScreen.tsx
timestamp: 2026-09-19T04-25-16Z
slug: mobile-screens-homescreen-tsx
---
Method: dual-agent (A: design review · B: detector + browser overlay)

## Design Health Score — 25/40 (Acceptable)
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | No fortune-opened/streak, Q&A quota or subscription state on Home; recap card flashes empty while loading |
| 2 | Match System / Real World | 3 | Warm tone; no one-line "what is saju" for EN/ES users |
| 3 | User Control and Freedom | 3 | Root screen, little to undo |
| 4 | Consistency and Standards | 2 | Lock icon means both prerequisite and paywall; look-alike badges behave differently |
| 5 | Error Prevention | 3 | Free users hit an unannounced paywall from the fortune row |
| 6 | Recognition Rather Than Recall | 3 | Icon + label + description on every row |
| 7 | Flexibility and Efficiency | 2 | Daily fortune ~2 screens down; onboarding concern unused for ordering |
| 8 | Aesthetic and Minimalist Design | 2 | Five equal solid jade slabs + always-expanded philosophy block |
| 9 | Error Recovery | 2 | Sections vanish silently when elements/sajuType are null |
| 10 | Help and Documentation | 3 | SajuLearn link exists |

## Design Specificity Verdict
LLM: mixed — palette, taegeuk pattern, Cormorant greeting and calculated element chart are authored; the essay + 7-row menu + recap below are category-interchangeable.
Detector: CLI 0 findings (HomeScreen/PatternBackground/AppText; web-oriented rules, limited on RN StyleSheet). Browser overlay 30 findings, all false positives (28 low-contrast on an image background — resampled contrast ≥4.96:1; buried-raster and layout-transition come from react-native-web / safe-area internals).

## Priority Issues
1. [P1] Daily ritual buried; Home is a feature menu, not today's reading. Fix: fortune hero card under greeting (sealed/opened + streak), merge Today's Insight, demote chart, order rows by onboarding concern. /impeccable layout
2. [P1] Paid fortune row styled as free; Lock icon overloaded. Fix: Pro/$7.99 chip for non-subscribers, step icon for prerequisites, Lock = payment only. /impeccable clarify
3. [P1] Accessibility/native gaps: settings button unlabeled, no roles/disabled state, type badge 79x30 and learn-more ~34pt targets, COLORS.footer 3.2:1 and ready-row description 4.0:1, entrance motion ignores Reduce Motion. /impeccable audit → /impeccable harden
4. [P2] Philosophy essay + 7 equal slabs flatten hierarchy; accent covers ~1/3 of screen. Fix: one-line essay + link, single filled hero, quiet rows, fold recap into Q&A row. /impeccable distill + /impeccable quieter
5. [P2] Edge cases: recap empty flash (undefined state), elementRowLabel width 40 clips ES/large type, paddingTop "10%" grows on iPad. /impeccable harden

## Persona Red Flags
Casey: settings top-right, fortune 2 screens down, no Android ripple. Jordan: 3 entries to the same type screen, no recommended next step, Lock reads as pay. Sam: unlabeled settings, 30pt badge, 3.2:1 small text, motion ignores Reduce Motion. Lucía (24, ES, new to saju): menu instead of her day, paywall surprise, long uppercase labels wrap, masculine default "mismo".

## Minor Observations
Brand row costs a line every visit; 0% elements may read as lacking; Cormorant has no Hangul (ko loses display face); hard-coded sizes, no type-scale tokens.

## Questions
1. Home as "today + one next step", other features to a tab bar or second screen?
2. Why does the philosophy essay own the most space on the daily screen?
3. Can a one-line fortune teaser show free users the value before the paywall?
