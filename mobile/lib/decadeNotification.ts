// Schedules a one-time local notification a week before the user's next 대운
// (decade fortune) transition — the one piece of content no competing
// personality app can offer, since it needs the actual saju engine. Purely
// local (expo-notifications), no push server involved.
//
// NOTE: requires expo-notifications' native module, so it only works in a
// dev-client/production build, not Expo Go (same constraint already true for
// react-native-purchases — see the IAP memory).
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import "./notificationSetup";
import { findNextDecadeTransition } from "./decadeTransition";
import { getNotificationPreference } from "./notificationPreference";
import type { Dictionary } from "./i18n/dictionaries";

const NOTIFICATION_ID = "fatesaid-decade-transition";
const HEADS_UP_DAYS = 7;

/**
 * Called whenever a saju reading is available (app start / onboarding done) — clears
 * the already-scheduled heads-up and re-plans it 7 days before the next decade
 * transition. Never prompts for permission (App Store guideline 5.1.1(ii): the system
 * dialog only follows an explicit user tap) — without granted permission, or with no
 * upcoming transition, or with routine reminders off, it quietly does nothing.
 */
export async function scheduleDecadeTransitionNotification(
  strings: Dictionary,
  decadeFortune: unknown,
  currentAge: number | undefined,
  birthYear: number | undefined,
  birthMonth: number | undefined,
  birthDay: number | undefined
): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID);
  } catch {
    // nothing was scheduled yet — fine
  }

  if ((await getNotificationPreference()) === "off") return;

  const transition = findNextDecadeTransition(decadeFortune, currentAge, birthYear, birthMonth, birthDay);
  if (!transition) return;

  const notifyDate = new Date(transition.targetDate.getTime() - HEADS_UP_DAYS * 24 * 60 * 60 * 1000);
  if (notifyDate.getTime() <= Date.now()) return; // already inside the heads-up window or past — skip rather than fire late

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") return;

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_ID,
    content: {
      title: strings.decadeNotification.title,
      body: strings.decadeNotification.body(transition.pillarLabel),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: notifyDate,
      // Android needs a channel to actually show heads-up notifications on API 26+.
      ...(Platform.OS === "android" ? { channelId: "default" } : {}),
    },
  });
}
