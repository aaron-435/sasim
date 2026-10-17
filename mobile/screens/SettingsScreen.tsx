import { useEffect, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Check from "lucide-react-native/icons/check";
import { ActivityIndicator, Alert, Linking, Platform, ScrollView, StyleSheet, View } from "react-native";
import { API_BASE_URL } from "../config";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { LOCALE_LABELS, useLocale, useStrings, type Locale } from "../lib/i18n";
import { getNotificationPreference, setNotificationPreference, type NotificationPreference } from "../lib/notificationPreference";
import { applyNotificationPreference } from "../lib/routineNotification";
import { getSolarTermPreference, refreshSolarTermNotifications, setSolarTermPreference } from "../lib/solarTermNotification";
import { hasQaProEntitlement, restoreReports } from "../lib/purchases";
import { getSavedPair, unlinkPair, type SavedPair } from "../lib/pairs";
import { track } from "../lib/analytics";
import { confirmUnlink } from "../components/CoupleModeSection";
import { COLORS } from "../theme/colors";
import { RADIUS, SPACE, SURFACE } from "../theme/tokens";
import { FONTS } from "../theme/fonts";

const NOTIFICATION_OPTIONS: NotificationPreference[] = ["off", "daily", "weekly"];


// Same order as the first-run language picker: target markets (EN, ES) first.
const LANGUAGE_ORDER: Locale[] = ["en", "es", "ko"];
export default function SettingsScreen({
  onBack,
  onLogout,
  selfDayMasterChar = null,
}: {
  onBack: () => void;
  onLogout: () => void;
  /** For re-planning the solar-term notifications (their text depends on the Day Master). */
  selfDayMasterChar?: string | null;
}) {
  const strings = useStrings();
  const { locale, setLocale } = useLocale();
  const [notificationPref, setNotificationPrefState] = useState<NotificationPreference | null>(null);
  const [applying, setApplying] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  // Solar-term notifications: their own switch, silenced too while reminders are "off".
  const [solarTermsOn, setSolarTermsOn] = useState<boolean | null>(null);
  const [solarApplying, setSolarApplying] = useState(false);

  async function toggleSolarTerms() {
    if (solarApplying || solarTermsOn === null || notificationPref === "off") return;
    const next = !solarTermsOn;
    setSolarApplying(true);
    setPermissionDenied(false);
    setSolarTermsOn(next);
    try {
      await setSolarTermPreference(next);
      const ok = await refreshSolarTermNotifications(locale, selfDayMasterChar, { askPermission: next });
      if (!ok) {
        setPermissionDenied(true);
        setSolarTermsOn(false);
        await setSolarTermPreference(false);
      } else {
        track("solar_term_toggle", { value: next ? 1 : 0 });
      }
    } finally {
      setSolarApplying(false);
    }
  }

  useEffect(() => {
    getNotificationPreference().then(setNotificationPrefState);
    getSolarTermPreference().then(setSolarTermsOn);
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
        // "off" silences the solar terms too; turning reminders back on brings them back.
        await refreshSolarTermNotifications(locale, selfDayMasterChar);
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
        <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </PressableScale>

        <Reveal index={0}>
          <Text style={styles.heading} accessibilityRole="header">{strings.settings.heading}</Text>
        </Reveal>

        <Reveal index={1}>
          <Text style={styles.sectionLabel} accessibilityRole="header">{strings.settings.languageSectionLabel}</Text>
          <View style={styles.optionList}>
            {LANGUAGE_ORDER.map((l: Locale) => (
              <PressableScale
                key={l}
                style={[styles.option, l === locale && styles.optionActive]}
                onPress={() => setLocale(l)}
                haptic="select"
                accessibilityRole="radio"
                accessibilityState={{ checked: l === locale }}
                aria-checked={l === locale}
                accessibilityLabel={LOCALE_LABELS[l]}
              >
                <Text style={[styles.optionLabel, l === locale && styles.optionLabelActive]}>{LOCALE_LABELS[l]}</Text>
                {l === locale && <Check size={16} strokeWidth={2.5} color={COLORS.gold} />}
              </PressableScale>
            ))}
          </View>
        </Reveal>

        <Reveal index={2}>
          <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.settings.notificationSectionLabel}</Text>
          <View style={styles.optionList}>
            {NOTIFICATION_OPTIONS.map((pref) => (
              <PressableScale
                key={pref}
                style={[styles.optionRich, pref === notificationPref && styles.optionActive]}
                onPress={() => handlePickNotification(pref)}
                haptic="select"
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
              </PressableScale>
            ))}
          </View>
          {solarTermsOn !== null && (
            <View style={[styles.optionList, styles.solarRow]}>
              <PressableScale
                style={[styles.optionRich, notificationPref === "off" && styles.optionDisabled]}
                onPress={toggleSolarTerms}
                haptic="select"
                disabled={solarApplying || notificationPref === "off"}
                accessibilityRole="switch"
                accessibilityState={{ checked: solarTermsOn && notificationPref !== "off", disabled: solarApplying || notificationPref === "off" }}
                aria-checked={solarTermsOn && notificationPref !== "off"}
                accessibilityLabel={`${strings.solarTerms.settingLabel}. ${notificationPref === "off" ? strings.solarTerms.settingDisabledDescription : strings.solarTerms.settingDescription}`}
              >
                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionLabel}>{strings.solarTerms.settingLabel}</Text>
                  <Text style={styles.optionDescription}>
                    {notificationPref === "off" ? strings.solarTerms.settingDisabledDescription : strings.solarTerms.settingDescription}
                  </Text>
                </View>
                {solarApplying ? (
                  <ActivityIndicator size="small" color={COLORS.gold} />
                ) : (
                  <View style={[styles.toggleTrack, solarTermsOn && notificationPref !== "off" && styles.toggleTrackOn]}>
                    <View style={[styles.toggleThumb, solarTermsOn && notificationPref !== "off" && styles.toggleThumbOn]} />
                  </View>
                )}
              </PressableScale>
            </View>
          )}
          {permissionDenied && <Text style={styles.warning}>{strings.settings.notificationPermissionDenied}</Text>}
        </Reveal>

        {pair?.status === "linked" && (
          <Reveal index={3}>
            <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.couple.sectionTitle}</Text>
            <View style={styles.optionList}>
              <View style={styles.option}>
                <Text style={[styles.optionLabel, styles.coupleLabel]} numberOfLines={1}>
                  {strings.couple.linkedTitle(pair.partnerName || strings.couple.partnerFallback)}
                </Text>
                <PressableScale onPress={handleUnlink} disabled={unlinking} hitSlop={8} style={styles.unlinkButton} accessibilityRole="button" haptic="none">
                  {unlinking ? <ActivityIndicator size="small" color={COLORS.danger} /> : <Text style={styles.unlinkLabel}>{strings.couple.unlinkButton}</Text>}
                </PressableScale>
              </View>
            </View>
          </Reveal>
        )}

        <Reveal index={4}>
          <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.settings.legalSectionLabel}</Text>
          <View style={styles.optionList}>
            <PressableScale
              style={styles.option}
              onPress={handleRestore}
              disabled={restoring}
              accessibilityRole="button"
              accessibilityState={{ disabled: restoring, busy: restoring }}
            >
              <Text style={styles.optionLabel}>{strings.qa.restoreButton}</Text>
              {restoring && <ActivityIndicator size="small" color={COLORS.gold} />}
            </PressableScale>
            {legalLinks.map((link) => (
              <PressableScale key={link.label} style={styles.option} onPress={() => Linking.openURL(link.url)} accessibilityRole="link" haptic="none">
                <Text style={styles.optionLabel}>{link.label}</Text>
              </PressableScale>
            ))}
          </View>

          <Text style={[styles.sectionLabel, styles.sectionSpacing]} accessibilityRole="header">{strings.settings.resetSectionLabel}</Text>
          <PressableScale style={styles.resetRow} onPress={handleResetPress} accessibilityRole="button">
            <Text style={styles.resetLabel}>{strings.settings.resetButton}</Text>
          </PressableScale>

          <Text style={styles.copyright}>© 2026 Studio Aaron</Text>
        </Reveal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACE.xl, paddingTop: SPACE.sm, paddingBottom: SPACE.xxxl },
  backButton: { flexDirection: "row", alignItems: "center", gap: SPACE.xs, alignSelf: "flex-start", padding: SPACE.sm, marginLeft: -SPACE.sm, marginBottom: SPACE.md, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline, marginBottom: SPACE.xl },
  sectionLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.subheadline,
    marginBottom: SPACE.md,
  },
  sectionSpacing: { marginTop: SPACE.xxl },
  optionList: { gap: SPACE.md },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
  },
  optionRich: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    gap: SPACE.md,
  },
  optionActive: {
    backgroundColor: "rgba(111,169,139,0.12)",
    borderColor: "rgba(111,169,139,0.4)",
  },
  optionTextWrap: { flex: 1, gap: SPACE.xs },
  solarRow: { marginTop: SPACE.md },
  optionDisabled: { opacity: 0.55 },
  toggleTrack: { width: 40, height: 24, borderRadius: RADIUS.sm, backgroundColor: COLORS.disabledBg, borderWidth: 1, borderColor: SURFACE.hairline, padding: SPACE.xs, justifyContent: "center" },
  toggleTrackOn: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  toggleThumb: { width: 18, height: 18, borderRadius: RADIUS.sm, backgroundColor: COLORS.subheadline },
  toggleThumbOn: { backgroundColor: COLORS.ctaText, alignSelf: "flex-end" },
  optionLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.headline },
  optionLabelActive: { color: COLORS.gold },
  optionDescription: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.footer },
  copyright: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.footer, textAlign: "center", marginTop: SPACE.xxl },
  warning: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 19,
    color: COLORS.danger,
    marginTop: SPACE.lg,
  },
  coupleLabel: { flex: 1, marginRight: SPACE.md },
  unlinkButton: { minHeight: 32, justifyContent: "center" },
  unlinkLabel: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.danger },
  resetRow: {
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    alignItems: "center",
  },
  resetLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.danger,
  },
});
