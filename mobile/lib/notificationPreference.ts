import AsyncStorage from "@react-native-async-storage/async-storage";

// User's chosen cadence for the routine fortune-reminder notification (Settings screen).
// Separate from the one-off decade-transition heads-up (lib/decadeNotification.ts) in
// content and purpose, but "off" here also suppresses that one — a user who turned
// notifications off shouldn't still get pinged for a different reason.
//
// Default is "daily" (opt-out, not opt-in) — App.tsx applies it automatically the first
// time a user reaches Home (see getStoredNotificationPreference()'s null case), the same
// moment it already schedules the decade-transition notification. isPreference()/the
// STORAGE_KEY split below exists specifically so that moment can tell "never chosen, apply
// the default" apart from "explicitly chose daily" — getNotificationPreference() collapses
// that distinction for callers (like Settings) that just want the effective value to show.
export type NotificationPreference = "off" | "daily" | "weekly";

export const DEFAULT_NOTIFICATION_PREFERENCE: NotificationPreference = "daily";

const STORAGE_KEY = "fatesaid_notification_preference";

function isPreference(value: string | null): value is NotificationPreference {
  return value === "off" || value === "daily" || value === "weekly";
}

/** null means the user has never explicitly chosen — caller should apply the default. */
export async function getStoredNotificationPreference(): Promise<NotificationPreference | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return isPreference(stored) ? stored : null;
  } catch {
    return null;
  }
}

export async function getNotificationPreference(): Promise<NotificationPreference> {
  return (await getStoredNotificationPreference()) ?? DEFAULT_NOTIFICATION_PREFERENCE;
}

export async function setNotificationPreference(pref: NotificationPreference): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, pref);
  } catch {
    // best-effort — worst case the choice doesn't persist across app restarts
  }
}
