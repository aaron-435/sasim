// One-time expo-notifications setup shared by every notification-scheduling module
// (decadeNotification.ts, routineNotification.ts) — each imports this for its side
// effects rather than repeating the handler/channel setup.
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

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
