---
target: 홈 화면 (리디자인 후)
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/kwonhyunjo/Desktop/sasim/work/mobile/screens/HomeScreen.tsx"
target_fingerprint: "sha256:3a4e6bbb36ccbedf6b45356c5acf0b7fb9ddc3f12f02f1f7dc5f7bfce123c8ff"
target_path: /Users/kwonhyunjo/Desktop/sasim/work/mobile/screens/HomeScreen.tsx
timestamp: 2026-09-19T04-46-03Z
slug: mobile-screens-homescreen-tsx
---
Method: dual-agent (A: design review · B: detector + browser overlay)

## Design Health Score — 23/40 (was 25)
1 Status 2 (loading looks like a finished card; stale streak) · 2 Match 3 (EN "The wind at their back" unclear) · 3 Control 3 · 4 Consistency 2 (two paths to type; disabled row inside tappable list) · 5 Error prevention 2 (tap during loading → paywall without price) · 6 Recognition 3 · 7 Efficiency 2 · 8 Minimalist 3 (single filled surface) · 9 Error recovery 1 (API failure stays as loading look, no retry) · 10 Help 2 (0% elements, "psych test" unexplained)

## Design Specificity
LLM: mostly authored (jade hero, calculated chart, Cormorant); list reads like settings; hero and chart not connected; Korean loses Cormorant and gets faux italic.
Detector: CLI 0; overlay 31, all false positives. Real contrast ≥4.70:1 everywhere; hero title 6.55, secondary 5.16, Pro chip 5.17. Previous contrast P1 resolved.

## Priority Issues
1. [P1] Free teaser pairs negative headlines ("A headwind") with "opens with Pro" — fear-driven upsell. Show free insight in teaser, Pro only in CTA, or pacing-toned teaser headlines. /impeccable clarify
2. [P1] Loading/unavailable states masquerade as the normal card; no retry. Skeleton + busy state, error + retry, resolve entitlement separately. /impeccable harden
3. [P1] Teaser CTA "See the full reading" lands on the paywall. Use "Unlock the full reading with Pro". /impeccable clarify
4. [P2] Subscriber data honesty: stale streak after a gap, opened body (dominant-element insight) can contradict the day's headline, sealed state shows insight. /impeccable harden
5. [P2] List: duplicate type entry; disabled prereq row inside tappable group — fold into psych-test description. /impeccable distill

## Persona Red Flags
Jordan: 0% reads as lacking; "why headwind?" → paywall. Sam: type badge unlabeled; hero label omits lock note; no announce on state change. Casey: day rollover not refreshed. Mia (28, US, Co-Star): free daily line may be "A headwind"; free insight hidden in teaser.

## Minor
ES chip can push title to 3 lines at 320pt; width-based bar animation on JS driver; ripple only on list rows; dailyInsight repeats every 3 days.
