// One-time Home card offering the 9 a.m. reminder. This is one of the two places
// allowed to show the system permission dialog (the other is the Settings toggle) —
// App Store guideline 5.1.1(ii): the system dialog only follows an explicit user tap,
// so everywhere else schedules silently and skips without permission.
import Bell from "lucide-react-native/icons/bell";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Text from "./AppText";
import PressableScale from "./motion/PressableScale";
import { useStrings } from "../lib/i18n";
import { getNotificationPreference } from "../lib/notificationPreference";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";

const DISMISSED_KEY = "fatesaid_notification_prompt_dismissed";

export default function NotificationPromptCard({ onEnabled }: { onEnabled: () => void }) {
  const strings = useStrings();
  // null until the mount-time check below resolves — nothing renders before that.
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      let show = Platform.OS !== "web";
      if (show) {
        const [{ status }, pref, dismissed] = await Promise.all([
          Notifications.getPermissionsAsync(),
          getNotificationPreference(),
          AsyncStorage.getItem(DISMISSED_KEY),
        ]);
        show = status === "undetermined" && pref !== "off" && dismissed === null;
      }
      if (alive) setVisible(show);
    })().catch(() => {
      if (alive) setVisible(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!visible) return null;

  async function dismiss() {
    setVisible(false);
    try {
      await AsyncStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // best-effort — the permission state itself still gates a re-show
    }
  }

  async function enable() {
    let granted = false;
    try {
      granted = (await Notifications.requestPermissionsAsync()).status === "granted";
    } catch {
      // treated as denied below
    }
    await dismiss();
    if (granted) onEnabled();
  }

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Bell size={14} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={styles.title} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
          {strings.notificationPrompt.title}
        </Text>
      </View>
      <Text style={styles.body} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
        {strings.notificationPrompt.body}
      </Text>
      <View style={styles.buttonRow}>
        <PressableScale
          onPress={enable}
          style={styles.primaryButton}
          accessibilityRole="button"
          accessibilityLabel={strings.notificationPrompt.enable}
        >
          <Text style={styles.primaryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
            {strings.notificationPrompt.enable}
          </Text>
        </PressableScale>
        <PressableScale
          onPress={dismiss}
          style={styles.laterButton}
          haptic="none"
          accessibilityRole="button"
          accessibilityLabel={strings.notificationPrompt.later}
        >
          <Text style={styles.laterLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
            {strings.notificationPrompt.later}
          </Text>
        </PressableScale>
      </View>
    </View>
  );
}

// Same card family as HomeScreen's pathCard (background, radius, shadow tokens).
const styles = StyleSheet.create({
  card: {
    marginTop: SPACE.md,
    padding: SPACE.lg,
    borderRadius: RADIUS.md,
    backgroundColor: SURFACE.raised,
    ...SHADOW.raised,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.sm,
  },
  title: {
    flex: 1,
    fontFamily: FONTS.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.headline,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.md,
    marginTop: SPACE.lg,
  },
  primaryButton: {
    minHeight: 44,
    paddingHorizontal: SPACE.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.sm,
  },
  primaryLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.ctaText,
  },
  laterButton: {
    minHeight: 44,
    paddingHorizontal: SPACE.md,
    alignItems: "center",
    justifyContent: "center",
  },
  laterLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.gold,
  },
});
