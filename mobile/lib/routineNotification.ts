// Schedules (or clears) the recurring "check today's/this week's fortune" reminder
// per the user's Settings choice (lib/notificationPreference.ts). Uses expo-notifications'
// native DAILY/WEEKLY triggers — the OS re-fires these on its own schedule, so unlike
// lib/decadeNotification.ts's one-shot heads-up there's no re-scheduling-on-app-open
// needed once this is set. Content is a static "come check the app" prompt rather than
// the actual day's reading, on purpose: a local notification's body is fixed at schedule
// time, so it can't carry "today's" content for a date that hasn't arrived yet without
// silently going stale for a user who doesn't open the app that day.
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import "./notificationSetup";
import type { NotificationPreference } from "./notificationPreference";
import type { Dictionary } from "./i18n/dictionaries";

const DAILY_ID = "fatesaid-daily-fortune";
const WEEKLY_ID = "fatesaid-weekly-fortune";
const REMINDER_HOUR = 9;
const REMINDER_MINUTE = 0;
const WEEKLY_WEEKDAY = 2; // expo-notifications: 1=Sunday..7=Saturday — Monday morning

async function cancelRoutineNotifications(): Promise<void> {
  await Promise.all([
    Notifications.cancelScheduledNotificationAsync(DAILY_ID).catch(() => {}),
    Notifications.cancelScheduledNotificationAsync(WEEKLY_ID).catch(() => {}),
  ]);
}

/** true if permission is (or becomes, after asking) granted. */
async function ensurePermission(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === "granted") return true;
  const { status: requested } = await Notifications.requestPermissionsAsync();
  return requested === "granted";
}

export async function applyNotificationPreference(pref: NotificationPreference, strings: Dictionary): Promise<{ permissionDenied: boolean }> {
  await cancelRoutineNotifications();
  if (pref === "off") return { permissionDenied: false };

  if (!(await ensurePermission())) return { permissionDenied: true };

  const channelId = Platform.OS === "android" ? "default" : undefined;

  if (pref === "daily") {
    await Notifications.scheduleNotificationAsync({
      identifier: DAILY_ID,
      content: { title: strings.routineNotification.dailyTitle, body: strings.routineNotification.dailyBody },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: REMINDER_HOUR, minute: REMINDER_MINUTE, ...(channelId ? { channelId } : {}) },
    });
  } else {
    await Notifications.scheduleNotificationAsync({
      identifier: WEEKLY_ID,
      content: { title: strings.routineNotification.weeklyTitle, body: strings.routineNotification.weeklyBody },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: WEEKLY_WEEKDAY,
        hour: REMINDER_HOUR,
        minute: REMINDER_MINUTE,
        ...(channelId ? { channelId } : {}),
      },
    });
  }

  return { permissionDenied: false };
}
