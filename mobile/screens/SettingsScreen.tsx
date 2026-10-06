import { useEffect, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Check from "lucide-react-native/icons/check";
import { ActivityIndicator, Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { API_BASE_URL } from "../config";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { LOCALE_LABELS, useLocale, useStrings, type Locale } from "../lib/i18n";
import { getNotificationPreference, setNotificationPreference, type NotificationPreference } from "../lib/notificationPreference";
import { applyNotificationPreference } from "../lib/routineNotification";
import { hasQaProEntitlement, restoreReports } from "../lib/purchases";
import { getSavedPair, unlinkPair, type SavedPair } from "../lib/pairs";
import { track } from "../lib/analytics";
import { confirmUnlink } from "../components/CoupleModeSection";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

const NOTIFICATION_OPTIONS: NotificationPreference[] = ["off", "daily", "weekly"];


// Same order as the first-run language picker: target markets (EN, ES) first.
const LANGUAGE_ORDER: Locale[] = ["en", "es", "ko"];
export default function SettingsScreen({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const strings = useStrings();
  const { locale, setLocale } = useLocale();
  const [notificationPref, setNotificationPrefState] = useState<NotificationPreference | null>(null);
  const [applying, setApplying] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    getNotificationPreference().then(setNotificationPrefState);
    getSavedPair().then(setPair);
  }, []);

  // Couple mode: unlinking lives here too (either side can unlink from either place).
  const [pair, setPair] = useState<SavedPair | null>(null);
  const [unlinking, setUnlinking] = useState(false);
  async function handleUnlink() {
    if (unlinking || !(await confirmUnlink(strings))) return;
    setUnlinking(true);
    const ok = await unlinkPair();
    setUnlinking(false);
    if (!ok) {
      Alert.alert(strings.couple.unlinkError);
      return;
    }
    track("pair_unlink", { surface: "settings" });
    setPair(null);
  }

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

  // Restore lives here too, not only on paywalls: someone on a new phone looks for it in Settings.
  const [restoring, setRestoring] = useState(false);
  async function handleRestore() {
    if (restoring) return;
    setRestoring(true);
    const ok = await restoreReports();
    setRestoring(false);
    Alert.alert(ok ? strings.settings.restoreDone : strings.settings.restoreFailed);
  }
  const manageSubscriptionUrl =
    Platform.OS === "android" ? "https://play.google.com/store/account/subscriptions" : "https://apps.apple.com/account/subscriptions";
  const legalLinks = [
    { label: strings.settings.manageSubscription, url: manageSubscriptionUrl },
    { label: strings.settings.termsLinkSettings, url: `${API_BASE_URL}/terms?lang=${locale}` },
    { label: strings.settings.privacyLinkSettings, url: `${API_BASE_URL}/privacy?lang=${locale}` },
  ];

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
          {LANGUAGE_ORDER.map((l: Locale) => (
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

        {pair?.status === "linked" && (
          <>
            <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.couple.sectionTitle}</Text>
            <View style={styles.optionList}>
              <View style={styles.option}>
                <Text style={[styles.optionLabel, styles.coupleLabel]} numberOfLines={1}>
                  {strings.couple.linkedTitle(pair.partnerName || strings.couple.partnerFallback)}
                </Text>
                <Pressable onPress={handleUnlink} disabled={unlinking} hitSlop={8} style={styles.unlinkButton} accessibilityRole="button">
                  {unlinking ? <ActivityIndicator size="small" color={COLORS.danger} /> : <Text style={styles.unlinkLabel}>{strings.couple.unlinkButton}</Text>}
                </Pressable>
              </View>
            </View>
          </>
        )}

        <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.settings.legalSectionLabel}</Text>
        <View style={styles.optionList}>
          <Pressable
            style={styles.option}
            onPress={handleRestore}
            disabled={restoring}
            accessibilityRole="button"
            accessibilityState={{ disabled: restoring, busy: restoring }}
          >
            <Text style={styles.optionLabel}>{strings.qa.restoreButton}</Text>
            {restoring && <ActivityIndicator size="small" color={COLORS.gold} />}
          </Pressable>
          {legalLinks.map((link) => (
            <Pressable key={link.label} style={styles.option} onPress={() => Linking.openURL(link.url)} accessibilityRole="link">
              <Text style={styles.optionLabel}>{link.label}</Text>
            </Pressable>
          ))}
        </View>

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
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline, marginBottom: 24 },
  sectionLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.subheadline,
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
  optionLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.headline },
  optionLabelActive: { color: COLORS.gold },
  optionDescription: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.footer },
  warning: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 19,
    color: COLORS.danger,
    marginTop: 14,
  },
  coupleLabel: { flex: 1, marginRight: 12 },
  unlinkButton: { minHeight: 32, justifyContent: "center" },
  unlinkLabel: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.danger },
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
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.danger,
  },
});
