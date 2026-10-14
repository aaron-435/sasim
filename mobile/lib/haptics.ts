// Thin expo-haptics wrapper — a no-op on web, and every call swallows failure
// so a missing haptics engine never breaks a press handler.
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export function tap(): void {
  if (Platform.OS === "web") return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

export function select(): void {
  if (Platform.OS === "web") return;
  Haptics.selectionAsync().catch(() => {});
}

export function success(): void {
  if (Platform.OS === "web") return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}
