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
 *
 * 2026-10-05: the landing and Q&A steps are also written to our own
 * event log (/api/events → Supabase `events`, same table the app
 * writes to) via logEvent() below, so the web funnel and the app
 * funnel can be read side by side. Only names and prop keys allowed
 * by lib/eventSchema.ts get through.
 * ------------------------------------------------------------------
 */

import { track } from "@vercel/analytics";
import type { EventName, PROP_KEYS } from "./eventSchema";

const ANON_ID_KEY = "fatesaid_anon_id";

function anonId(): string {
  const make = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
  try {
    const stored = localStorage.getItem(ANON_ID_KEY);
    if (stored) return stored;
    const id = make();
    localStorage.setItem(ANON_ID_KEY, id);
    return id;
  } catch {
    return make();
  }
}

// Same key lib/i18n/LocaleContext.tsx persists the picked language under; falls back to
// the browser language. Read here so a call made before the provider settles still gets it.
function currentLocale(): string | null {
  const ok = (v: string | null | undefined) => (v === "ko" || v === "en" || v === "es" ? v : null);
  try {
    const stored = ok(localStorage.getItem("fatesaid_locale"));
    if (stored) return stored;
  } catch {
    // storage blocked
  }
  return ok(navigator.language?.slice(0, 2).toLowerCase());
}

/** Fire-and-forget write to our own event log. Never throws, never awaited. */
export function logEvent(name: EventName, props?: Partial<Record<(typeof PROP_KEYS)[number], string | number | boolean>>, locale?: string) {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      anonId: anonId(),
      platform: "site",
      locale: locale ?? currentLocale(),
      dev: window.location.hostname === "localhost",
      events: [{ name, props, ts: Date.now() }],
    });
    fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch {
    // analytics must never break the page
  }
}

/** Which of the landing page's three CTAs (hero / bottom / sticky phone bar) got the click. */
export function trackLandingCtaClick(position: string, locale?: string) {
  track("landing_cta_click", { position });
  logEvent("landing_cta_click", { position }, locale);
}

export function trackLandingView(locale?: string) {
  logEvent("landing_view", undefined, locale);
}

export function trackOnboardingComplete(userTrack: string, locale?: string) {
  track("onboarding_complete", { track: userTrack });
  logEvent("onboarding_complete", { via: "site", ...(userTrack ? { topic: userTrack } : {}) }, locale);
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

export function trackQaQuestionAsked(locale?: string) {
  track("qa_question_asked");
  logEvent("qa_ask", undefined, locale);
}

/** Web's free questions are used up and the install pitch takes over — web's version of the Q&A limit. */
export function trackQaInstallPitchShown(locale?: string) {
  track("qa_install_pitch_shown");
  logEvent("qa_limit_reached", undefined, locale);
}
