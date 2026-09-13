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
import { findNextDecadeTransition } from "./decadeTransition";
import type { Dictionary } from "./i18n/dictionaries";

const NOTIFICATION_ID = "fatesaid-decade-transition";
const HEADS_UP_DAYS = 7;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

if (Platform.OS === "android") {
  // Required on Android 8+ (API 26+) — a notification with no known channel is dropped.
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

/**
 * homeData가 갖춰질 때마다(앱 시작/온보딩 완료 시) 호출 — 이미 예약된 알림을 정리하고
 * 다음 대운 전환이 있으면 그 7일 전으로 새로 예약한다. 권한이 없거나 다음 전환이
 * 이미 7일 이내로 다가와 있거나 지나갔으면 조용히 아무 것도 하지 않는다(에러 아님).
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

  const transition = findNextDecadeTransition(decadeFortune, currentAge, birthYear, birthMonth, birthDay);
  if (!transition) return;

  const notifyDate = new Date(transition.targetDate.getTime() - HEADS_UP_DAYS * 24 * 60 * 60 * 1000);
  if (notifyDate.getTime() <= Date.now()) return; // already inside the heads-up window or past — skip rather than fire late

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: requested } = await Notifications.requestPermissionsAsync();
    if (requested !== "granted") return;
  }

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
