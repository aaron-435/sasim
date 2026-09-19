# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

Primary: English- and Spanish-speaking adults in their 20s–30s who already use astrology/personality apps (Co-Star, The Pattern style) and open Fatesaid when they want to understand themselves better — their temperament, current life rhythm, and how they relate to people. Korean is also shipped (ko/en/es), but overseas EN/ES users are the target market; Korean-only assumptions are not acceptable defaults.

## Product Purpose

Fatesaid reads a person's Korean saju (Four Pillars) chart from their birth date, time, and city, and combines it with psychology-based self-tests and AI conversation so the user ends up with a grounded, personal picture of who they are and what phase they are in. Success is a user who comes back daily (fortune ritual, Q&A) and pays for depth (subscription, deep reports).

## Positioning

Saju and psychology fused on one person's data: a real calendar-based saju calculation (self-hosted engine on KASI astronomical data, not invented readings) feeds the same profile as the psych-test modules and the AI counseling chat, so the report can cross-analyze "what your chart says" with "what you actually answered and said."

## Operating Context

- Primary product: native app (React Native / Expo) on iOS and Android, currently dark appearance only. iPad support is enabled in the build config.
- Web (fatesaidapp.com, Next.js) is a lead-gen surface only: ad traffic lands on a landing page (real-calculation pitch, labelled fictional report sample, FAQ, single "see my chart, free" CTA), gets a free taste of Q&A, and is sent to install the app. No payment or login on web.
- No account or signup: anonymous session data; purchases authenticate through the OS store sheet (Apple ID / Google account), restored via restore-purchases.
- Daily-use rituals: opening today's fortune (streak), daily Q&A quota, a local reminder notification.

## Capabilities and Constraints

- Onboarding: language → intro (or web verification-code handoff) → nickname, gender, birth date, birth time (unknown allowed), birth city (worldwide) → concern (relationships vs. self & daily life) → Home.
- Free core: saju reading (five-element distribution, saju type among 50, decade fortune), compatibility with another person, 1 Q&A question/day.
- Subscription ($7.99/month, RevenueCat): 10 Q&A questions/day, daily/weekly/this-month/year fortune.
- 11 psych-test modules → 20-turn AI counseling chat → paginated deep report; the report's back half is sold per module ($14.99) or as a bundle.
- Share cards exported as images for social stories: saju type, compatibility, and 9:16 domain cards (how I find money, what sets my heart racing free; my bright spot this year is Pro).
- Year-ahead report (one-time purchase per year, `year_report_<year>`): five life areas, a 12-month timeline, a four-step action plan; generated on the server only after it verifies the purchase with RevenueCat. Finished reports (year and deep) can be exported as a magazine-style PDF via the OS share sheet.
- Delivery: EAS OTA updates for JS-only changes; anything adding a native dependency needs a new store build.
- Undecided: account/auth provider for cross-device sync; tablet-specific layouts; light appearance.

## Brand Commitments

- Name: Fatesaid. Tagline (ko): "운명은 이미 말했습니다, 이제 답할 차례는 당신입니다".
- Palette direction confirmed by the user on 2026-09-19: keep "Celadon & Hanji"; do not return to the earlier "Obsidian & Gold".
- Voice: warm counselor, never cynical. The AI chat is a completed 20-turn conversation with safety and no-direct-advice rules; no forced cut-offs or fake urgency timers.
- Classical saju terms are re-expressed for EN/ES readers in non-frightening language rather than translated literally.

## Evidence on Hand

- Real engine output (four pillars, elements, 12 life stages, 12 sinsal, decade/year/month fortunes) and a 530-question Q&A bank (`mobile/data/questionBank.json`).
- Celebrity examples per saju type (`mobile/lib/sajuTypeCelebrities.ts`).
- Store screenshots under `mobile/store-assets/`.
- No user testimonials, reviews, press, or usage metrics exist yet. Do not fabricate any.

## Product Principles

- No bad days, no bad matches: readings describe different rhythms (e.g. "best day / a day to pace yourself", never "unlucky day"). Same rule in compatibility.
- Pressure without fear: conversion copy may use mild tension and curiosity (name what is coming, keep the why and the what-to-do behind Pro) and subscriber content may use vivid metaphors, but never fake urgency, health/death/accident/disaster predictions, flat negative predictions, or a negative prediction used as the hook right above a paywall. (User decision 2026-09-19, replacing the earlier blanket "no fear-driven design".)
- Calculated, not invented: every reading traces back to the engine's structured output; the AI never makes up chart facts.
- A tool for self-understanding, not fortune-telling or clinical diagnosis: disclaimers stay, and crisis-response protocols in chat are non-negotiable.
- Global first: every feature must work for someone born and living outside Korea, in English or Spanish.
- Honest affordances: nothing that looks tappable without a working destination; paywalls say exactly what is locked.

## Accessibility & Inclusion

- Minimum age 14 (terms of service).
- Gender-neutral copy for family/child questions; content must read naturally in EN/ES, not as a translation of Korean idioms.
