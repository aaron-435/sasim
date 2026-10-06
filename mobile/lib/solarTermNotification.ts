// 24-solar-term notifications (절기 알림, 2026-10-06): on each of the next year's solar terms,
// a local notification at 9:00 that day — "the season's energy shifts" + one line on what that
// season means for the reader's Day Master element. Dates come from the server engine
// (/api/solarTerms); the words from elementColorContent.ts. Re-planned every time the app
// reaches Home (like decadeNotification.ts), so a stale language or a passed year never sticks.
//
// Its own on/off switch in Settings; the routine reminder's "off" (notificationPreference.ts)
// also silences it, the same rule the decade heads-up follows.
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import "./notificationSetup";
import { API_BASE_URL } from "../config";
import { getNotificationPreference } from "./notificationPreference";
import { SOLAR_TERM_COPY, SOLAR_TERM_NAMES, seasonRelation } from "./elementColorContent";
import type { Locale } from "./i18n/types";
import type { ElementKey } from "./sajuType";

const ID_PREFIX = "fatesaid-solar-term-";
const STORAGE_KEY = "fatesaid_solar_term_notifications";
const NOTIFY_HOUR = 9;

type SolarTermEvent = { key: string; at: string; seasonElement: ElementKey };

const STEM_ELEMENT: Record<string, ElementKey> = {
  갑: "wood", 을: "wood", 병: "fire", 정: "fire", 무: "earth", 기: "earth", 경: "metal", 신: "metal", 임: "water", 계: "water",
};

/** Default on: it is part of the routine reminders, which are opt-out too. */
export async function getSolarTermPreference(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(STORAGE_KEY)) !== "off";
  } catch {
    return true;
  }
}

export async function setSolarTermPreference(on: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // best-effort
  }
}

export async function clearSolarTermPreference(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // best-effort
  }
}

async function cancelSolarTermNotifications(): Promise<void> {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      scheduled
        .filter((n) => n.identifier.startsWith(ID_PREFIX))
        .map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier).catch(() => {}))
    );
  } catch {
    // nothing scheduled / not supported (web) — fine
  }
}

/** 9:00 local time on the calendar day (in the device's time zone) the term begins. */
function notifyDateFor(atIso: string): Date {
  const at = new Date(atIso);
  return new Date(at.getFullYear(), at.getMonth(), at.getDate(), NOTIFY_HOUR, 0, 0);
}

/**
 * Cancels and re-plans every solar-term notification. `askPermission` is true only when the
 * user just switched the toggle on in Settings — the automatic re-plan on app open never
 * prompts, it just skips when permission isn't there.
 * Returns false when permission was needed and refused.
 */
export async function refreshSolarTermNotifications(
  locale: Locale,
  dayMasterChar: string | null,
  { askPermission = false }: { askPermission?: boolean } = {}
): Promise<boolean> {
  if (Platform.OS === "web") return true;
  await cancelSolarTermNotifications();

  const me = dayMasterChar ? STEM_ELEMENT[dayMasterChar] : undefined;
  if (!me) return true;
  if (!(await getSolarTermPreference())) return true;
  if ((await getNotificationPreference()) === "off") return true;

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    if (!askPermission) return true;
    const { status: requested } = await Notifications.requestPermissionsAsync();
    if (requested !== "granted") return false;
  }

  let terms: SolarTermEvent[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/solarTerms`);
    if (!res.ok) return true;
    terms = ((await res.json()).terms ?? []) as SolarTermEvent[];
  } catch {
    return true; // offline — the next app open tries again
  }

  const names = SOLAR_TERM_NAMES[locale] ?? SOLAR_TERM_NAMES.en;
  const copy = SOLAR_TERM_COPY[locale] ?? SOLAR_TERM_COPY.en;
  const now = Date.now();
  for (const term of terms) {
    const name = names[term.key];
    if (!name || !STEM_ELEMENT_VALUES.has(term.seasonElement)) continue;
    const date = notifyDateFor(term.at);
    if (date.getTime() <= now) continue;
    await Notifications.scheduleNotificationAsync({
      identifier: `${ID_PREFIX}${term.key}-${term.at.slice(0, 10)}`,
      content: { title: copy.title(name), body: copy.body[seasonRelation(term.seasonElement, me)] },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        ...(Platform.OS === "android" ? { channelId: "default" } : {}),
      },
    }).catch(() => {});
  }
  return true;
}

const STEM_ELEMENT_VALUES = new Set<string>(["wood", "fire", "earth", "metal", "water"]);
