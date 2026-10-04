---
target: 앱 전체 (mobile/screens)
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
target_identity: "file:/Users/kwonhyunjo/Desktop/sasim/work/mobile/screens"
timestamp: 2026-10-04T02-16-28Z
slug: mobile-screens
---
Method: dual-agent (A: design review · B: detector + browser overlay). Evidence: mobile-web 8082 at 375×812 (+ iPad 1024×1366), source. Onboarding live to Gender (City not submitted); chat source-only; no simulator. State: uncommitted fix batch for the 29/40 run (TODO 20).
App-wide 30/40 (prev 29, 27). 1 Status 3 (chat shows 30:00 countdown, no set progress) · 2 Match 3 ("Your core" vs report "Day Master", type names unexplained, Year month tags "Bond/Shift") · 3 Control 3 (no resume quiz/chat; chat auto-wraps at 30 min) · 4 Consistency 3 (Title vs sentence case; year cover lacks mark/KASI/TOC; Settings language order ko-first) · 5 Error prev 3 (compat validation fixed; 1 free Q&A/day picked from 20 near-duplicates) · 6 Recognition 3 (legend hides 0% elements; truncated quiz stem in report) · 7 Efficiency 3 (Psych Test row 4–5 of 5, no resume) · 8 Minimal 3 (report pages 2/3 empty; Type share preview repeats screen; Year months duplicate text in pairs) · 9 Recovery 3 · 10 Help 3 (gender explained; chart/type names not).
Specificity: hanji TOC, chart + legend, Type card, Newsreader italic, relationship-first compat, exact paywall list = authored. Home Explore list, Fortune card stack, Settings, Q&A chips, onboarding halo = generic. Chart not tappable/explained.
Detector: CLI [] exit 0 (38 files; blind to RN StyleSheet). Overlay 9 views: SVG low-contrast 63 (reads CSS color not fill; real 5.45–10.9:1), buried-raster, safe-area layout-transition, intended share clip = FP. Borderline: kicker-above-heading tocEyebrow (ReportScreen.tsx:1575), monotonous 12px spacing. Grep: 0 fontFamily literals; all 103 Pressable/Touchable tags have a role; off-palette #C7C3D1 x11 (Chat/Quiz/Report body), report paper palette undocumented; fontSize 11 at ChatScreen:447, ReportScreen:1638, chart SVG 163/175.
[P1] Chat countdown: ChatScreen.tsx:36 TIME_LIMIT_MINUTES=30, MM:SS clock turning red (#CB6249) at ≤60 s (:242-247, :266-270) in an emotional 25-turn conversation; conflicts with PRODUCT "no forced cut-offs or fake urgency timers", colour-only warning. Fix: hide clock, show "Set 2 of 5"; silent server budget + gentle wrap-up. /impeccable clarify -> distill
[P2] Core loop buried, no resume: Psych Test is row 4–5 of 5 identical Home rows (HomeScreen.tsx:251-268, 382); half-done quiz/chat cannot resume. Fix: one continue/start card under hero, trim list to 4. /impeccable layout -> onboard
[P2] Term drift: "Your core · Water" vs report "Water Day Master"; type names ungl ossed; Year tags "Bond/Shift"; "In this module" in closing. /impeccable clarify
[P2] Report density/consistency: 2/3-empty pages (23, 25, 28); year cover w/o brand/KASI/TOC; mixed case in TOC ("Core Strength & Weaknesses" vs card "Growth edge"); emoji element headers p3. /impeccable layout + typeset
[P3] Q&A question wall: 20 near-duplicate questions per subtopic with 1/day free quota. Fix: ~6 curated + more, dedupe bank. /impeccable distill
Personas: Jordan (Dew·Order, core vs Day Master, chart not tappable, Psych Test buried); Sam (untouched slider announces "5 out of 10" while showing "–" QuizScreen.tsx:279-283; TOC rows 32pt+6 hitSlop <44; locked TOC rows no locked state; chat red minute colour-only); Casey (quiz Next y≈280–326; closing footer covers next-test card; 20-question list); Lucía (natural es, honest gender line; lowercase "may – jul" timeline heading).
Resolved since 29/40 (verified): pacing-day copy + neutral free line (ko/en live), compat validation/hint/blank name, edge tap zones (phone + iPad), a11y roles/labels/typing dots, onboarding promise + optional verify + EN-first + gender why, stage names/bondNote/Module N/Growth edge, chart legend, off-palette hex + unified element colours, report eyebrow/tracking/12px, closing paragraphs, year preview softened, slider untouched look.
Minor: free pacing overview 2 sentences vs 7 on other days; year preview hides price vs deep report $14.99; verify input blue focus ring (web); iPad chart circles phone-sized; Year tab "favorable for investments" + Q&A invest question (financial-prediction rule); health-adjacent subscriber stage copy ("Winding Down", "Small Hiccups"); Settings lacks restore/legal/support.
