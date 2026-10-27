/**
 * lib/eventSchema.ts
 * ------------------------------------------------------------------
 * What /api/events accepts. Anything outside these lists is rejected
 * with 400 rather than stored, so a birth date, a name or free text
 * can't end up in the `events` table by accident (a new prop key has
 * to be added here on purpose first).
 *
 * The app keeps its own copy of the event names as a type
 * (mobile/lib/analytics.ts) — keep the two in step.
 * ------------------------------------------------------------------
 */

export const EVENT_NAMES = [
  // onboarding
  "onboarding_step",
  "onboarding_complete",
  "type_reveal_view",
  // first value
  "fortune_first_view",
  "qa_ask",
  "qa_limit_reached",
  // funnel (added 2026-10-20: retention, chat completion, report generation)
  "app_open",
  "chat_start",
  "chat_complete",
  "report_generate",
  // money
  "paywall_view",
  "purchase_start",
  "purchase_success",
  "purchase_cancel",
  "purchase_error",
  // growth
  "share",
  "invite_create",
  "invite_accept",
  "group_chemistry_view",
  "pair_create",
  "pair_join",
  "pair_unlink",
  "notification_tap",
  "feedback",
  // return visits
  "journal_save",
  "journal_report",
  "lesson_read",
  "solar_term_toggle",
  "wrapped_view",
  "review_prompt",
  "widget_tap",
  "calendar_purpose",
  // web site
  "landing_view",
  "landing_cta_click",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/** Short, enumerable values only — never a date, a name or something the user typed. */
export const PROP_KEYS = ["step", "surface", "product", "kind", "value", "topic", "position", "module", "via", "utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

/** Campaign tags (web arrivals from ads/videos): lowercase letters, digits, "_" and "-", up to 40 chars. */
export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export const MAX_UTM_LENGTH = 40;
const UTM_PATTERN = /^[a-z0-9_-]+$/;
const UTM_SET = new Set<string>(UTM_KEYS);

/** Returns the tag lowercased if it is a valid campaign tag, else null (never a date, name or free text). */
export function cleanUtmValue(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim().toLowerCase();
  return v.length > 0 && v.length <= MAX_UTM_LENGTH && UTM_PATTERN.test(v) && !DATE_LIKE.test(v) ? v : null;
}

export const PLATFORMS = ["ios", "android", "app-web", "site"] as const;
export const LOCALES = ["ko", "en", "es"] as const;

export const MAX_EVENTS_PER_BATCH = 20;
export const MAX_PROP_VALUE_LENGTH = 48;
export const MAX_ANON_ID_LENGTH = 64;

const NAME_SET = new Set<string>(EVENT_NAMES);
const KEY_SET = new Set<string>(PROP_KEYS);
// Values are ids like "module3", "report_bundle", "fortune" — no spaces, no slashes, no digits-only dates.
const VALUE_PATTERN = /^[A-Za-z0-9_.:-]+$/;
const DATE_LIKE = /\d{4}[-./]?\d{1,2}[-./]?\d{1,2}/;

export interface CleanEvent {
  name: EventName;
  props: Record<string, string | number | boolean> | null;
  clientTs: string | null;
}

export interface CleanBatch {
  anonId: string;
  locale: string | null;
  platform: (typeof PLATFORMS)[number];
  dev: boolean;
  /** Our own / invited testers on a store build (hidden switch in the app, ?tester=1 on the site). */
  tester: boolean;
  events: CleanEvent[];
}

/**
 * Props as stored: a tester batch gets `tester: true` on every row, so the mark lives in
 * the existing jsonb column (no new DB column) and can't be sent per event by a client.
 */
export function storedProps(batch: CleanBatch, event: CleanEvent): CleanEvent["props"] {
  return batch.tester ? { ...(event.props ?? {}), tester: true } : event.props;
}

/** Returns the cleaned batch, or a short reason string when anything is off (whole batch rejected). */
export function parseEventBatch(body: unknown): CleanBatch | string {
  if (!body || typeof body !== "object") return "body";
  const b = body as Record<string, unknown>;

  const anonId = b.anonId;
  if (typeof anonId !== "string" || !anonId || anonId.length > MAX_ANON_ID_LENGTH || !VALUE_PATTERN.test(anonId)) return "anonId";
  const platform = b.platform;
  if (typeof platform !== "string" || !(PLATFORMS as readonly string[]).includes(platform)) return "platform";
  const locale = b.locale ?? null;
  if (locale !== null && (typeof locale !== "string" || !(LOCALES as readonly string[]).includes(locale))) return "locale";
  if (b.dev !== undefined && typeof b.dev !== "boolean") return "dev";
  if (b.tester !== undefined && typeof b.tester !== "boolean") return "tester";

  const raw = b.events;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_EVENTS_PER_BATCH) return "events";

  const events: CleanEvent[] = [];
  for (const e of raw) {
    if (!e || typeof e !== "object") return "event";
    const ev = e as Record<string, unknown>;
    if (typeof ev.name !== "string" || !NAME_SET.has(ev.name)) return "name";

    let clientTs: string | null = null;
    if (ev.ts !== undefined) {
      if (typeof ev.ts !== "number" || !Number.isFinite(ev.ts)) return "ts";
      // Clamp to a sane window; a wrong device clock shouldn't poison ordering by years.
      const now = Date.now();
      if (ev.ts > now - 7 * 864e5 && ev.ts < now + 864e5) clientTs = new Date(ev.ts).toISOString();
    }

    let props: CleanEvent["props"] = null;
    if (ev.props !== undefined && ev.props !== null) {
      if (typeof ev.props !== "object" || Array.isArray(ev.props)) return "props";
      const entries = Object.entries(ev.props as Record<string, unknown>);
      if (entries.length > PROP_KEYS.length) return "props";
      props = {};
      for (const [key, value] of entries) {
        if (!KEY_SET.has(key)) return `prop:${key}`;
        if (UTM_SET.has(key)) {
          if (cleanUtmValue(value) !== value) return `prop:${key}`;
          props[key] = value as string;
          continue;
        }
        if (typeof value === "boolean") props[key] = value;
        else if (typeof value === "number") {
          // Small counts only (a step index, a page number) — keeps a birth year from passing as a number.
          if (!Number.isInteger(value) || value < 0 || value > 999) return `prop:${key}`;
          props[key] = value;
        } else if (typeof value === "string") {
          if (!value || value.length > MAX_PROP_VALUE_LENGTH || !VALUE_PATTERN.test(value) || DATE_LIKE.test(value)) return `prop:${key}`;
          props[key] = value;
        } else return `prop:${key}`;
      }
      if (entries.length === 0) props = null;
    }

    events.push({ name: ev.name as EventName, props, clientTs });
  }

  return { anonId, locale: locale as string | null, platform: platform as CleanBatch["platform"], dev: b.dev === true, tester: b.tester === true, events };
}
