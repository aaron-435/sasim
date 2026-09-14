import AsyncStorage from "@react-native-async-storage/async-storage";

// User's chosen cadence for the routine fortune-reminder notification (Settings screen).
// Separate from the one-off decade-transition heads-up (lib/decadeNotification.ts) in
// content and purpose, but "off" here also suppresses that one — a user who turned
// notifications off shouldn't still get pinged for a different reason. "off" is the
// default until the user visits Settings and picks something, matching the app's existing
// pattern of never scheduling a notification before an explicit choice or need.
export type NotificationPreference = "off" | "daily" | "weekly";

const STORAGE_KEY = "fatesaid_notification_preference";
const DEFAULT_PREFERENCE: NotificationPreference = "off";

function isPreference(value: string | null): value is NotificationPreference {
  return value === "off" || value === "daily" || value === "weekly";
}

export async function getNotificationPreference(): Promise<NotificationPreference> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return isPreference(stored) ? stored : DEFAULT_PREFERENCE;
  } catch {
    return DEFAULT_PREFERENCE;
  }
}

export async function setNotificationPreference(pref: NotificationPreference): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, pref);
  } catch {
    // best-effort — worst case the choice doesn't persist across app restarts
  }
}
