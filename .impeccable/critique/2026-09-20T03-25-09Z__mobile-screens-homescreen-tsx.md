---
target: 홈 화면 (재점검 3)
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/kwonhyunjo/Desktop/sasim/work/mobile/screens/HomeScreen.tsx"
target_fingerprint: "sha256:d5ddc81830eaad6c797ca6b60ed946cb10f34eb5e641f55f2a770058ea447771"
target_path: /Users/kwonhyunjo/Desktop/sasim/work/mobile/screens/HomeScreen.tsx
timestamp: 2026-09-20T03-25-09Z
slug: mobile-screens-homescreen-tsx
---
Method: dual-agent (A: design review · B: detector + browser overlay)
Home 26/40 (was 23). 1 Status 3 · 2 Match 2 (coined rhythm names, saju terms unexplained) · 3 Control 3 · 4 Consistency 2 (chart card looks tappable but isn't; emoji beside lucide icons) · 5 Error prevention 3 · 6 Recognition 3 · 7 Efficiency 2 · 8 Minimal 3 · 9 Recovery 3 · 10 Help 2.
Detector: CLI 0; overlay 31 all false positives; real contrast ≥4.7:1 everywhere.
Issues: [P1] free CTA reads free, lands on paywall (no gating cue). [P1] subscriber daily ritual = two seals/three taps (FIXED: Home tap now marks opened). [P2] teaser headline (rhythm name) + independent insight body can disagree; the locked "why" isn't visibly locked. [P2] hero/chart generic; chart card non-tappable but styled like the tappable list; emoji vs lucide icons. [P3] Dynamic Type: fixed line heights, no maxFontSizeMultiplier.
