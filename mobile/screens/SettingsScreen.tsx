import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react-native";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { LOCALES, LOCALE_LABELS, useLocale, useStrings, type Locale } from "../lib/i18n";
import { getNotificationPreference, setNotificationPreference, type NotificationPreference } from "../lib/notificationPreference";
import { applyNotificationPreference } from "../lib/routineNotification";
import { hasQaProEntitlement } from "../lib/purchases";
import { COLORS } from "../theme/colors";

const NOTIFICATION_OPTIONS: NotificationPreference[] = ["off", "daily", "weekly"];

export default function SettingsScreen({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const strings = useStrings();
  const { locale, setLocale } = useLocale();
  const [notificationPref, setNotificationPrefState] = useState<NotificationPreference | null>(null);
  const [applying, setApplying] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    getNotificationPreference().then(setNotificationPrefState);
  }, []);

  const notificationLabels: Record<NotificationPreference, { label: string; description: string }> = {
    off: { label: strings.settings.notificationOff, description: strings.settings.notificationOffDescription },
    daily: { label: strings.settings.notificationDaily, description: strings.settings.notificationDailyDescription },
    weekly: { label: strings.settings.notificationWeekly, description: strings.settings.notificationWeeklyDescription },
  };

  async function commitNotificationPreference(pref: NotificationPreference) {
    if (applying || pref === notificationPref) return;
    setApplying(true);
    setPermissionDenied(false);
    const previous = notificationPref;
    setNotificationPrefState(pref);
    try {
      const { permissionDenied: denied } = await applyNotificationPreference(pref, strings, await hasQaProEntitlement());
      if (denied) {
        setPermissionDenied(true);
        setNotificationPrefState(previous);
      } else {
        await setNotificationPreference(pref);
      }
    } finally {
      setApplying(false);
    }
  }

  function handlePickNotification(pref: NotificationPreference) {
    if (applying || pref === notificationPref) return;
    // Going straight from daily to off skips a lighter middle ground — offer weekly as
    // an alternative before actually turning everything off. Already-weekly has no
    // lighter step below it, so that case turns off directly.
    if (pref === "off" && notificationPref === "daily") {
      Alert.alert(strings.settings.turnOffPromptTitle, strings.settings.turnOffPromptBody, [
        { text: strings.settings.cancelLabel, style: "cancel" },
        { text: strings.settings.turnOffPromptSwitchToWeekly, onPress: () => commitNotificationPreference("weekly") },
        { text: strings.settings.turnOffPromptConfirm, style: "destructive", onPress: () => commitNotificationPreference("off") },
      ]);
      return;
    }
    commitNotificationPreference(pref);
  }

  function handleResetPress() {
    Alert.alert(strings.settings.resetConfirmTitle, strings.settings.resetConfirmBody, [
      { text: strings.settings.cancelLabel, style: "cancel" },
      { text: strings.settings.resetConfirmButton, style: "destructive", onPress: onLogout },
    ]);
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading} accessibilityRole="header">{strings.settings.heading}</Text>

        <Text style={styles.sectionLabel} accessibilityRole="header">{strings.settings.languageSectionLabel}</Text>
        <View style={styles.optionList}>
          {LOCALES.map((l: Locale) => (
            <Pressable
              key={l}
              style={[styles.option, l === locale && styles.optionActive]}
              onPress={() => setLocale(l)}
              accessibilityRole="radio"
              accessibilityState={{ checked: l === locale }}
              aria-checked={l === locale}
              accessibilityLabel={LOCALE_LABELS[l]}
            >
              <Text style={[styles.optionLabel, l === locale && styles.optionLabelActive]}>{LOCALE_LABELS[l]}</Text>
              {l === locale && <Check size={16} strokeWidth={2.5} color={COLORS.gold} />}
            </Pressable>
          ))}
        </View>

        <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.settings.notificationSectionLabel}</Text>
        <View style={styles.optionList}>
          {NOTIFICATION_OPTIONS.map((pref) => (
            <Pressable
              key={pref}
              style={[styles.optionRich, pref === notificationPref && styles.optionActive]}
              onPress={() => handlePickNotification(pref)}
              disabled={applying}
              accessibilityRole="radio"
              accessibilityState={{ checked: pref === notificationPref, disabled: applying }}
              aria-checked={pref === notificationPref}
              accessibilityLabel={`${notificationLabels[pref].label}. ${notificationLabels[pref].description}`}
            >
              <View style={styles.optionTextWrap}>
                <Text style={[styles.optionLabel, pref === notificationPref && styles.optionLabelActive]}>{notificationLabels[pref].label}</Text>
                <Text style={styles.optionDescription}>{notificationLabels[pref].description}</Text>
              </View>
              {applying && pref === notificationPref ? (
                <ActivityIndicator size="small" color={COLORS.gold} />
              ) : (
                pref === notificationPref && <Check size={16} strokeWidth={2.5} color={COLORS.gold} />
              )}
            </Pressable>
          ))}
        </View>
        {permissionDenied && <Text style={styles.warning}>{strings.settings.notificationPermissionDenied}</Text>}

        <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.settings.resetSectionLabel}</Text>
        <Pressable style={styles.resetRow} onPress={handleResetPress} accessibilityRole="button">
          <Text style={styles.resetLabel}>{strings.settings.resetButton}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12, minHeight: 44 },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline, marginBottom: 24 },
  sectionLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: COLORS.subheadline,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  sectionSpacing: { marginTop: 28 },
  optionList: { gap: 10 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionRich: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  optionActive: {
    backgroundColor: "rgba(111,169,139,0.12)",
    borderColor: "rgba(111,169,139,0.4)",
  },
  optionTextWrap: { flex: 1, gap: 3 },
  optionLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 14.5, color: COLORS.headline },
  optionLabelActive: { color: COLORS.gold },
  optionDescription: { fontFamily: "Manrope_400Regular", fontSize: 12, color: COLORS.footer },
  warning: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    lineHeight: 19,
    color: COLORS.danger,
    marginTop: 14,
  },
  resetRow: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  resetLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: COLORS.danger,
  },
});
