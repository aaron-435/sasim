/**
 * lib/analytics.ts
 * ------------------------------------------------------------------
 * Funnel event names for Vercel Web Analytics (already mounted as
 * <Analytics/> in app/layout.tsx, but nothing ever called track() before
 * 2026-09-10 — the dashboard had page views only, no funnel steps).
 * Centralized here so a typo in an event name can't silently create a
 * disconnected step in the Vercel dashboard.
 *
 * This only covers the web funnel (onboarding → quiz → chat → report →
 * Q&A). "설치"(install) and "구매"(purchase) steps aren't trackable from
 * here — they only exist once the native app ships (see the launch
 * roadmap's Phase 2/3); add them at that point, not now.
 * ------------------------------------------------------------------
 */

import { track } from "@vercel/analytics";

/** Which of the landing page's three CTAs (hero / bottom / sticky phone bar) got the click. */
export function trackLandingCtaClick(position: string) {
  track("landing_cta_click", { position });
}

export function trackOnboardingComplete(userTrack: string) {
  track("onboarding_complete", { track: userTrack });
}

export function trackQuizComplete(moduleId: string) {
  track("quiz_complete", { moduleId });
}

export function trackChatComplete() {
  track("chat_complete");
}

export function trackReportViewed() {
  track("report_viewed");
}

export function trackQaQuestionAsked() {
  track("qa_question_asked");
}

export function trackQaInstallPitchShown() {
  track("qa_install_pitch_shown");
}
