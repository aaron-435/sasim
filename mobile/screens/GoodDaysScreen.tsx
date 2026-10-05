import { useEffect, useRef, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import { ActivityIndicator, BackHandler, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings } from "../lib/i18n";
import { GOOD_DAY_PURPOSES, GOOD_DAYS_CONTENT, goodDayReason, type GoodDayPurpose, type GoodDayRelation } from "../lib/goodDaysContent";
import { getRevenueCatUserId } from "../lib/purchases";
import { formatShortDate } from "../lib/shortDate";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// "좋은 날 찾기" — a subscriber sub-screen of FortuneScreen. Pick a purpose, and the server
// (app/api/goodDays, lib/goodDays.ts) returns the 3-5 best-matched days in the next 30
// after checking the subscription itself. Only good days are listed; there is no
// "avoid" list (pressure rule).
type GoodDay = { date: string; relation: GoodDayRelation; pillarIndex: number; lifeStageIndex: number; sinsalIndex: number | null };

export default function GoodDaysScreen({
  selfDayMasterChar,
  selfDayBranch,
  todayIso,
  onBack,
}: {
  selfDayMasterChar: string;
  selfDayBranch: string | null;
  todayIso: string | null;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const content = GOOD_DAYS_CONTENT[locale] ?? GOOD_DAYS_CONTENT.en;

  const [purpose, setPurpose] = useState<GoodDayPurpose | null>(null);
  const [days, setDays] = useState<GoodDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef(0);

  // Android back: from a result, back to the purpose list; from the list, out of this screen.
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (purpose) handleChangePurpose();
      else onBack();
      return true;
    });
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purpose, onBack]);

  async function load(next: GoodDayPurpose) {
    const request = ++requestRef.current;
    setLoading(true);
    setError(null);
    setDays(null);
    try {
      const appUserId = await getRevenueCatUserId();
      const res = await fetch(`${API_BASE_URL}/api/goodDays`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appUserId, selfDayMasterChar, selfDayBranch, purpose: next }),
      });
      const json = await res.json().catch(() => ({}));
      if (request !== requestRef.current) return;
      if (!res.ok) {
        setError(res.status === 401 || res.status === 403 || res.status === 503 ? strings.goodDays.verifyError : strings.fortune.loadErrorText);
        return;
      }
      setDays(json.goodDays?.days ?? []);
    } catch {
      if (request === requestRef.current) setError(strings.fortune.loadErrorText);
    } finally {
      if (request === requestRef.current) setLoading(false);
    }
  }

  function handlePick(next: GoodDayPurpose) {
    setPurpose(next);
    load(next);
  }

  function handleChangePurpose() {
    requestRef.current++;
    setPurpose(null);
    setDays(null);
    setError(null);
    setLoading(false);
  }

  // Which wording of the reason to use: the second day with the same rhythm gets the second line.
  const seen = new Map<GoodDayRelation, number>();
  const rows = (days ?? []).map((day) => {
    const occurrence = seen.get(day.relation) ?? 0;
    seen.set(day.relation, occurrence + 1);
    return { day, reason: purpose ? goodDayReason(locale, purpose, day.relation, occurrence) : "" };
  });

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={purpose ? handleChangePurpose : onBack}
          hitSlop={12}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={strings.common.backLabel}
        >
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </Pressable>

        {!purpose && (
          <>
            <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.goodDays.heading}</Text>
            <Text style={styles.intro}>{strings.goodDays.intro}</Text>
            <View style={styles.purposeList}>
              {GOOD_DAY_PURPOSES.map((p) => (
                <Pressable
                  key={p}
                  onPress={() => handlePick(p)}
                  style={({ pressed }) => [styles.purposeCard, pressed && styles.pressed]}
                  accessibilityRole="button"
                  accessibilityLabel={`${content.purposes[p].label}. ${content.purposes[p].hint}`}
                >
                  <View style={styles.purposeText}>
                    <Text style={styles.purposeLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{content.purposes[p].label}</Text>
                    <Text style={styles.purposeHint} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{content.purposes[p].hint}</Text>
                  </View>
                  <ArrowRight size={16} strokeWidth={2.25} color={COLORS.gold} />
                </Pressable>
              ))}
            </View>
          </>
        )}

        {purpose && (
          <>
            <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>
              {strings.goodDays.resultHeading(content.purposes[purpose].label)}
            </Text>
            {loading && <ActivityIndicator color={COLORS.gold} style={styles.spinner} />}
            {!loading && error && (
              <View style={styles.errorBlock}>
                <Text style={styles.errorText} accessibilityLiveRegion="polite">{error}</Text>
                <Pressable onPress={() => load(purpose)} style={styles.retryButton} accessibilityRole="button">
                  <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
                </Pressable>
              </View>
            )}
            {!loading && !error && days && (
              <>
                <Text style={styles.intro}>{strings.goodDays.resultNote}</Text>
                <View style={styles.dayList}>
                  {rows.map(({ day, reason }) => {
                    const isToday = day.date === todayIso;
                    return (
                      <View key={day.date} style={styles.dayCard}>
                        <View style={styles.dayHeader}>
                          <Text style={styles.dayDate} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{formatShortDate(day.date, locale)}</Text>
                          {isToday && (
                            <View style={styles.todayBadge}>
                              <Text style={styles.todayBadgeText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.fortune.todayBadge}</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.dayRhythm} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.fortune.rhythmNames[day.relation]}</Text>
                        <Text style={styles.dayReason}>{reason}</Text>
                      </View>
                    );
                  })}
                </View>
                <Text style={styles.disclaimer}>{strings.goodDays.disclaimer}</Text>
              </>
            )}
            <Pressable onPress={handleChangePurpose} style={styles.changeLink} accessibilityRole="button">
              <Text style={styles.changeLinkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.goodDays.changePurpose}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 48 },
  backButton: { minHeight: 44, flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 8 },
  backLabel: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, lineHeight: 32, color: COLORS.headline, marginBottom: 8 },
  intro: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginBottom: 18 },
  purposeList: { gap: 10 },
  purposeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 60,
  },
  pressed: { opacity: 0.85 },
  purposeText: { flex: 1, gap: 3 },
  purposeLabel: { fontFamily: FONTS.semibold, fontSize: 15.5, color: COLORS.headline },
  purposeHint: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.footer },
  spinner: { marginTop: 32 },
  dayList: { gap: 12 },
  dayCard: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 16, gap: 6 },
  dayHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  dayDate: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 19, color: COLORS.headline },
  dayRhythm: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold },
  dayReason: { fontFamily: FONTS.regular, fontSize: 14.5, lineHeight: 22, color: COLORS.headline },
  todayBadge: { borderRadius: 999, borderWidth: 1, borderColor: COLORS.gold, paddingHorizontal: 8, paddingVertical: 2 },
  todayBadgeText: { fontFamily: FONTS.medium, fontSize: 11.5, color: COLORS.gold },
  disclaimer: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.footer, marginTop: 18 },
  errorBlock: { gap: 10, marginTop: 12, alignItems: "flex-start" },
  errorText: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.danger },
  retryButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border },
  retryLabel: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.headline },
  changeLink: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start", marginTop: 12 },
  changeLinkText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.gold, textDecorationLine: "underline" },
});
