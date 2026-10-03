---
target: 앱 전체 (mobile/screens)
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/kwonhyunjo/Desktop/sasim/work/mobile/screens"
timestamp: 2026-10-03T02-35-14Z
slug: mobile-screens
---
Method: dual-agent (A: design review · B: detector + browser overlay). Evidence: mobile-web 8082 at mobile preset, source, store screenshots. Onboarding source-only; chat not driven; no simulator.
App-wide 27/40. 1 Status 3 (no Q&A quota on topic screens; Home hero stale after reading) · 2 Match 2 (Module N, clinical subtitles, 12-stage terms in year report, "manseryeok engine") · 3 Control 3 · 4 Consistency 2 (deep report paged vs year report scroll; emoji vs lucide; "Daily Fortune" header on Year tab) · 5 Error prev 3 (quiz slider defaults to 5) · 6 Recognition 3 · 7 Efficiency 2 (Q&A 3 levels; no resume quiz/chat on Home) · 8 Minimal 3 (8 identical fortune cards; compat paragraph x3) · 9 Recovery 3 · 10 Help 3.
Specificity: deep report hanji TOC, Type screen, share cards authored; Home/Fortune/Settings/Q&A/modules/Compat generic. Four-pillar chart never visual.
Detector: CLI 0 but cannot parse RN StyleSheet (verified with fixtures) -> no coverage. Overlay 46 across 5 pages, nearly all false positives (31 contrast on Home vs transparent body; RNW hidden img; safe-area probe transition). Real: PatternBackground lacks backgroundColor fallback; Report 81-char tracked all-caps cover kicker (ReportScreen.tsx:1540).
[P1] Home hero body = rotating generic pool (lib/i18n/dailyInsight.ts, HomeScreen.tsx:201) contradicts real daily overview one tap later. Fix: neutral sentence from real overview or rhythm name only. /impeccable clarify
[P1] A11y gap: onboarding (OnboardingShell back, Language/Gender/Concern/Tob/City/Verify, AuraNextButton), Quiz slider, QAScreen have ~0 a11y props; GoldAura.tsx:12 loop + IntroScreen entrance ignore reduce motion; fixed font sizes. /impeccable audit -> harden
[P1] Deep report paged w/o affordance vs year report unbroken scroll; deep report ends on disclaimer + Back to Home. Unify model; design closing page. /impeccable layout -> delight
[P2] ModuleSelect 11 options, Module N, clinical subtitles, no time cost; Q&A 8 overlapping topics -> subtopic -> 10+ questions. /impeccable distill -> clarify
[P2] Compatibility: bare "58" score vs no-bad-matches; paragraph x3; name field/gender row gap; gold focus ring. /impeccable polish
Personas: Jordan (Earth vs Dew confusion, no paging cue, skippable quiz); Sam (unlabeled back, no selected state, fixed type, pulsing aura); Casey (quiz Next upper third, exit bar over buy button); Lucía (US celebrities, lucky direction, manseryeok untranslated, ES tab overflow).
Minor: report p1 title/subtitle run together, no paragraph spacing; perfectionism 82% red bar; "26 of 42 locked" vs "17/17"; share chips wrap; store screenshot qa-iphone65.png claims "team of saju and psychology experts from Korea" vs app's "written by AI".
