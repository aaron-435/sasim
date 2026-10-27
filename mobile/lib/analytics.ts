import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, Platform } from "react-native";
import { API_BASE_URL } from "../config";

// Our own event log (no third-party analytics SDK): small batches to /api/events, which
// stores them in the Supabase `events` table. Fire-and-forget — nothing here may throw
// into a screen or hold it up, and a lost batch is simply lost (no retry queue).
//
// The server accepts only the names below and the prop keys in lib/eventSchema.ts at the
// repo root; keep the two lists in step. Props are short ids ("module3", "fortune"),
// never a birth date, a name or anything the user typed.

export type EventName =
  | "onboarding_step"
  | "onboarding_complete"
  | "type_reveal_view"
  | "fortune_first_view"
  | "qa_ask"
  | "qa_limit_reached"
  | "app_open"
  | "chat_start"
  | "chat_complete"
  | "report_generate"
  | "paywall_view"
  | "purchase_start"
  | "purchase_success"
  | "purchase_cancel"
  | "purchase_error"
  | "share"
  | "invite_create"
  | "invite_accept"
  | "group_chemistry_view"
  | "pair_create"
  | "pair_join"
  | "pair_unlink"
  | "notification_tap"
  | "feedback"
  | "journal_save"
  | "journal_report"
  | "lesson_read"
  | "solar_term_toggle"
  | "wrapped_view"
  | "review_prompt"
  | "widget_tap"
  | "calendar_purpose"
  | "handoff_redeem";

type PropKey = "step" | "surface" | "product" | "kind" | "value" | "topic" | "position" | "module" | "via";
export type EventProps = Partial<Record<PropKey, string | number | boolean>>;

type QueuedEvent = { name: EventName; props?: EventProps; ts: number };

const ANON_ID_KEY = "fatesaid_anon_id";
const TESTER_KEY = "fatesaid_tester";
const ONCE_KEY_PREFIX = "fatesaid_event_once_";
const FLUSH_DELAY_MS = 4000;
const MAX_BATCH = 20;

let queue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let anonIdPromise: Promise<string> | null = null;
let currentLocale: string | null = null;

const PLATFORM = Platform.OS === "ios" ? "ios" : Platform.OS === "android" ? "android" : "app-web";

function randomId(): string {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// One random id per install, unrelated to the per-launch sessionId App.tsx sends to the
// reading APIs — lets the funnel follow a device across launches without any account.
function getAnonId(): Promise<string> {
  if (!anonIdPromise) {
    anonIdPromise = (async () => {
      try {
        const stored = await AsyncStorage.getItem(ANON_ID_KEY);
        if (stored) return stored;
        const id = randomId();
        await AsyncStorage.setItem(ANON_ID_KEY, id);
        return id;
      } catch {
        return randomId();
      }
    })();
  }
  return anonIdPromise;
}

// Tester mark: our own and invited testers' phones run the same store build as everyone
// else, so `dev` alone can't keep them out of the funnel. A hidden switch in Settings sets
// this; it rides along as one boolean per batch and survives "reset my info".
let testerPromise: Promise<boolean> | null = null;

function getTester(): Promise<boolean> {
  if (!testerPromise) testerPromise = AsyncStorage.getItem(TESTER_KEY).then((v) => v === "1").catch(() => false);
  return testerPromise;
}

export function isTesterDevice(): Promise<boolean> {
  return getTester();
}

export async function setTesterDevice(on: boolean): Promise<void> {
  testerPromise = Promise.resolve(on);
  try {
    if (on) await AsyncStorage.setItem(TESTER_KEY, "1");
    else await AsyncStorage.removeItem(TESTER_KEY);
  } catch {
    // stays in memory for this launch
  }
}

/** App.tsx keeps this in step with the picked language. */
export function setAnalyticsLocale(locale: string) {
  currentLocale = locale;
}

export function track(name: EventName, props?: EventProps) {
  queue.push({ name, props, ts: Date.now() });
  if (queue.length >= MAX_BATCH) {
    flush();
    return;
  }
  if (!flushTimer) flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
}

/** Records an event only the first time it ever happens on this device (e.g. the first fortune). */
export async function trackOnce(name: EventName, props?: EventProps) {
  try {
    const key = ONCE_KEY_PREFIX + name;
    if (await AsyncStorage.getItem(key)) return;
    await AsyncStorage.setItem(key, "1");
  } catch {
    return;
  }
  track(name, props);
}

/** Records an event at most once per calendar day on this device (e.g. app_open for D1/D7 retention). */
export async function trackDaily(name: EventName, props?: EventProps) {
  try {
    const key = ONCE_KEY_PREFIX + "daily_" + name;
    const d = new Date();
    const today = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    if ((await AsyncStorage.getItem(key)) === today) return;
    await AsyncStorage.setItem(key, today);
  } catch {
    return;
  }
  track(name, props);
}

export function flush() {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (queue.length === 0) return;
  const events = queue.slice(0, MAX_BATCH);
  queue = queue.slice(MAX_BATCH);
  if (queue.length > 0) flushTimer = setTimeout(flush, FLUSH_DELAY_MS);

  Promise.all([getAnonId(), getTester()])
    .then(([anonId, tester]) =>
      fetch(`${API_BASE_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonId, platform: PLATFORM, locale: currentLocale, dev: __DEV__, ...(tester ? { tester: true } : {}), events }),
      })
    )
    .catch(() => {});
}

// Send what's queued when the app goes to the background, so the last few taps before
// the user leaves aren't dropped with the process.
AppState.addEventListener("change", (state) => {
  if (state !== "active") flush();
});
