---
target: 앱 전체 (mobile/screens)
total_score: 30
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
target_identity: "file:/Users/kwonhyunjo/Desktop/sasim/work/mobile/screens"
timestamp: 2026-10-04T02-58-13Z
slug: mobile-screens
---
Method: dual-agent (A: design review · B: detector + browser overlay). Evidence: mobile-web 8082 at 375×812 (+ iPad 1024×1366), source. Onboarding live to Gender; chat source-only; no simulator. State: uncommitted batches TODO 20 + 21.
App-wide 30/40 (27 → 29 → 30 → 30), P1 0. All ten heuristics 3. 1 Status 3 (chat shows "Part n of 5" but server still wraps up at 30 min, lib/chatPrompts.ts:693/1071 — addressed after the run: header says "Wrapping up" from 27 min) · 2 Match 3 (Day Master unified, type gloss; monthly 12-stage headings and "Full Power / On the Move" unexplained; "In this module" server text) · 3 Control 3 (no resume quiz/chat) · 4 Consistency 3 (uppercase tracked kickers ~12 places vs sentence-case eyebrows; server Title Case headings; report pages alternate top-aligned/centred; year closing has no title) · 5 Error prev 3 (one tap spends the only free Q&A, no confirm; counter not on question list) · 6 Recognition 3 (monthly rows cut at 2 lines, no expand) · 7 Efficiency 3 (no resume) · 8 Minimal 3 (Type share preview repeats screen unframed; monthly text duplicated in pairs; short pages still 2/3 empty, now centred) · 9 Recovery 3 · 10 Help 3 (chart not tappable/explained).
Specificity: mostly authored — hanji TOC + locks, chart with full legend, Type gloss, Newsreader italic, relationship-first compat, exact paywall, new "Go deeper" path card. Generic: Home Explore list, Fortune stack, Settings, Q&A chips, onboarding halo.
Detector: CLI [] exit 0 (blind to StyleSheet). Overlay 10 views: SVG low-contrast 84, buried-raster, safe-area, share clip = FP. Borderline: kicker-above-heading (tocEyebrow ReportScreen.tsx:1586, QAQuestionScreen.tsx:104), 12px spacing monotony. Grep: 0 fontFamily literals; 107/107 Pressables with role; #C7C3D1 gone; remaining off-palette = report accents (#7FA8D6, #C1846A, #D9917A, dimension bars) + undocumented paper palette (#EFE7D8/#5C5237/#22301F/#B7A97D) + compat share labels; fontSize 11 at ReportScreen.tsx:1650 and chart SVG 163/175.
[P2] No resume for half-done quiz (30 q) or chat (25 turns); path card always "Start". Fix: persist answers + chat session, card becomes "Continue · question 14 of 30". /impeccable onboard -> harden
[P2] Hidden server 30-min cut-off vs "Part n of 5" (fixed after run with 27-min "Wrapping up" label; product choice whether v2 keeps a time cap at all). /impeccable clarify -> harden
[P2] Report composition after CenteredBody: eyebrow pinned top while block centred (fixed after run: label moved inside centred group); pages still alternate top-aligned vs centred; iPad ~500px gap; consider pairing short cards. /impeccable layout
[P3] Typographic voice split: uppercase tracked kickers (Quiz 373/460, ModuleSelect 173, QA 387, QASubcategory 110, QAQuestion 104, Settings 190, Report tocEyebrow/pageFoot/breather, share eyebrows) vs sentence case; server Title Case; lowercase element headings. /impeccable typeset
[P3] Repetition/truncation: unframed Type share preview duplicates screen; monthly flow duplicate pairs + 2-line truncation. /impeccable distill
Personas: Jordan (chart unexplained, month stage names, path card "Start" even with reports); Sam (12px uppercase labels, one-tap quota spend, iPad dead zones); Casey (no quiz resume; "Malentendidos/Imprevistos" read like warnings); Lucía (natural es; lowercase report subtitle; daily "Dinero" mentions investing).
Resolved vs 30/40: chat clock -> set progress, path card + list of 4, Day Master unified, type gloss, Bond/Shift key, year cover brand+KASI, TOC sentence case + growth edges, Q&A 6 + more, slider a11y, legend 0%, Settings EN-first + restore/manage/legal, locked TOC a11y, #C7C3D1 removed, closing footer no longer covers next card.
Minor: Settings weekly reminder offered to free users for Pro feature; Settings lacks support/contact; iPad chart circles phone-sized; year cover "A year of pressure…"; page 16 before paywall "pressure to keep up can feel sharper" (borderline).
