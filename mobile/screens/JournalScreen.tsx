import { useCallback, useEffect, useRef, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ChevronLeft from "lucide-react-native/icons/chevron-left";
import ChevronRight from "lucide-react-native/icons/chevron-right";
import { ActivityIndicator, BackHandler, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import JournalSafetyNote from "../components/JournalSafetyNote";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import { useLocale, useStrings } from "../lib/i18n";
import {
  entriesForMonth,
  getJournalEntries,
  getSavedJournalReport,
  hasCrisisSignal,
  MIN_REPORT_ENTRIES,
  saveJournalReport,
  type JournalEntry,
  type SavedJournalReport,
} from "../lib/journalStorage";
import { getRevenueCatUserId } from "../lib/purchases";
import { formatMonthLabel, formatShortDate, WEEKDAY_SHORT } from "../lib/shortDate";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// "한 줄 저널" — a sub-screen of FortuneScreen (like GoodDaysScreen). A month calendar of the
// device's journal entries, the picked day's entry, and the month-end pattern report: the
// subscriber sends that month's entries to /api/journalReport (server checks the subscription,
// fails closed, stores nothing) once there are MIN_REPORT_ENTRIES of them, and the result is kept
// on the device per month and language.
const MAX_MONTHS_BACK = 12;

function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function monthsBetween(a: string, b: string): number {
  const [ay, am] = a.split("-").map(Number);
  const [by, bm] = b.split("-").map(Number);
  return (by - ay) * 12 + (bm - am);
}

export default function JournalScreen({
  selfDayMasterChar,
  selfDayBranch,
  todayIso,
  entitled,
  onBack,
}: {
  selfDayMasterChar: string;
  selfDayBranch: string | null;
  todayIso: string;
  entitled: boolean;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const currentMonth = todayIso.slice(0, 7);

  const [month, setMonth] = useState(currentMonth);
  const [all, setAll] = useState<Record<string, JournalEntry>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedJournalReport | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onBack();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  useEffect(() => {
    getJournalEntries().then(setAll);
  }, []);

  const monthEntries = entriesForMonth(all, month);

  const loadMonth = useCallback(
    async (next: string) => {
      requestRef.current++;
      setGenerating(false);
      setError(null);
      setSaved(await getSavedJournalReport(next, locale));
    },
    [locale],
  );

  useEffect(() => {
    loadMonth(month);
  }, [month, loadMonth]);

  // Default to the latest entry of the month on screen.
  useEffect(() => {
    const list = entriesForMonth(all, month);
    setSelected(list.length ? list[list.length - 1].date : null);
  }, [all, month]);

  async function handleGenerate() {
    const request = ++requestRef.current;
    setGenerating(true);
    setError(null);
    try {
      const appUserId = await getRevenueCatUserId();
      const res = await fetch(`${API_BASE_URL}/api/journalReport`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appUserId,
          locale,
          month,
          selfDayMasterChar,
          selfDayBranch,
          entries: monthEntries.map(({ date, entry }) => ({ date, mood: entry.mood, note: entry.note })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (request !== requestRef.current) return;
      if (!res.ok) {
        setError(res.status === 401 || res.status === 403 || res.status === 503 ? strings.goodDays.verifyError : strings.fortune.loadErrorText);
        return;
      }
      const next: SavedJournalReport = {
        month,
        entryCount: monthEntries.length,
        createdAt: new Date().toISOString(),
        report: json.safety ? null : json.report ?? null,
        safety: !!json.safety,
      };
      if (!next.safety && !next.report) {
        setError(strings.fortune.loadErrorText);
        return;
      }
      await saveJournalReport(locale, next);
      setSaved(next);
      track("journal_report", { kind: next.safety ? "safety" : "report", value: monthEntries.length });
    } catch {
      if (request === requestRef.current) setError(strings.fortune.loadErrorText);
    } finally {
      if (request === requestRef.current) setGenerating(false);
    }
  }

  // Calendar cells: blanks before the 1st (weeks start on Sunday, like formatShortDate's weekdays).
  const [y, m] = month.split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`),
  ];
  while (cells.length % 7) cells.push(null);

  const canGoBack = monthsBetween(month, currentMonth) < MAX_MONTHS_BACK;
  const canGoForward = month < currentMonth;
  const selectedEntry = selected ? all[selected] : null;
  const count = monthEntries.length;
  const stale = !!saved && saved.entryCount < count;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.journal.heading}</Text>
        <Text style={styles.intro}>{strings.journal.intro}</Text>

        <View style={styles.monthRow}>
          <Pressable
            onPress={() => setMonth(shiftMonth(month, -1))}
            disabled={!canGoBack}
            style={[styles.monthArrow, !canGoBack && styles.hidden]}
            accessibilityRole="button"
            accessibilityLabel={strings.journal.prevMonthLabel}
          >
            <ChevronLeft size={20} strokeWidth={2} color={COLORS.headline} />
          </Pressable>
          <View style={styles.monthTitleBlock}>
            <Text style={styles.monthTitle} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{formatMonthLabel(month, locale)}</Text>
            <Text style={styles.monthCount} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.journal.monthCount(count)}</Text>
          </View>
          <Pressable
            onPress={() => setMonth(shiftMonth(month, 1))}
            disabled={!canGoForward}
            style={[styles.monthArrow, !canGoForward && styles.hidden]}
            accessibilityRole="button"
            accessibilityLabel={strings.journal.nextMonthLabel}
          >
            <ChevronRight size={20} strokeWidth={2} color={COLORS.headline} />
          </Pressable>
        </View>

        <View style={styles.weekRow}>
          {WEEKDAY_SHORT[locale].map((w) => (
            <Text key={w} style={styles.weekday} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{w}</Text>
          ))}
        </View>
        <View style={styles.grid}>
          {cells.map((date, i) => {
            if (!date) return <View key={`blank-${i}`} style={styles.cell} />;
            const entry = all[date];
            const isSelected = date === selected;
            const isToday = date === todayIso;
            const label = String(Number(date.slice(8)));
            return (
              <View key={date} style={styles.cell}>
                <Pressable
                  onPress={() => entry && setSelected(date)}
                  disabled={!entry}
                  style={[styles.day, entry && styles.dayRecorded, isSelected && styles.daySelected, isToday && !entry && styles.dayToday]}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: !entry, selected: isSelected }}
                  accessibilityLabel={entry ? `${formatShortDate(date, locale)}, ${strings.journal.moods[entry.mood]}` : formatShortDate(date, locale)}
                >
                  <Text style={[styles.dayLabel, entry && styles.dayLabelRecorded]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{label}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        {count === 0 && <Text style={styles.empty}>{strings.journal.emptyMonth}</Text>}

        {selected && selectedEntry && (
          <View style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryDate} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{formatShortDate(selected, locale)}</Text>
              <View style={styles.moodChip}>
                <Text style={styles.moodChipText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.moods[selectedEntry.mood]}</Text>
              </View>
            </View>
            <Text style={selectedEntry.note ? styles.entryNote : styles.entryNoNote}>{selectedEntry.note ?? strings.journal.noNote}</Text>
            {hasCrisisSignal(selectedEntry.note) && <JournalSafetyNote />}
          </View>
        )}

        <View style={styles.reportSection}>
          <Text style={styles.sectionLabel} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.journal.reportHeading}</Text>

          {count < MIN_REPORT_ENTRIES && !saved && <Text style={styles.reportText}>{strings.journal.reportProgress(count, MIN_REPORT_ENTRIES)}</Text>}

          {count >= MIN_REPORT_ENTRIES && !entitled && (
            <>
              <Text style={styles.reportText}>{strings.journal.reportLocked}</Text>
              <Pressable onPress={onBack} style={styles.secondaryButton} accessibilityRole="button">
                <Text style={styles.secondaryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.reportLockedButton}</Text>
              </Pressable>
            </>
          )}

          {saved?.safety && <JournalSafetyNote note={strings.journal.safetyReportNote} />}

          {saved?.report && (
            <View style={styles.reportCard}>
              <Text style={styles.reportTitle} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{saved.report.title}</Text>
              {saved.report.observations.map((o, i) => (
                <View key={i} style={styles.observationRow}>
                  <View style={styles.observationDot} />
                  <Text style={styles.observationText}>{o}</Text>
                </View>
              ))}
              <Text style={styles.reportClosing}>{saved.report.closing}</Text>
              <Text style={styles.disclaimer}>{strings.journal.reportDisclaimer}</Text>
            </View>
          )}

          {count >= MIN_REPORT_ENTRIES && entitled && (!saved || stale) && (
            <>
              {!saved && <Text style={styles.reportText}>{strings.journal.reportIntro}</Text>}
              {generating ? (
                <View style={styles.generatingRow}>
                  <ActivityIndicator color={COLORS.gold} />
                  <Text style={styles.reportText} accessibilityLiveRegion="polite">{strings.journal.generating}</Text>
                </View>
              ) : (
                <Pressable onPress={handleGenerate} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} accessibilityRole="button">
                  <Text style={styles.primaryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{saved ? strings.journal.reportRefreshButton : strings.journal.reportButton}</Text>
                </Pressable>
              )}
              {!!error && <Text style={styles.errorText} accessibilityLiveRegion="polite">{error}</Text>}
              <Text style={styles.privacy}>{strings.journal.reportPrivacy}</Text>
            </>
          )}
        </View>
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
  intro: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginBottom: 20 },
  monthRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  monthArrow: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 22 },
  hidden: { opacity: 0 },
  monthTitleBlock: { alignItems: "center", gap: 2 },
  monthTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 20, color: COLORS.headline },
  monthCount: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.footer },
  weekRow: { flexDirection: "row", marginBottom: 4 },
  weekday: { width: `${100 / 7}%`, textAlign: "center", fontFamily: FONTS.medium, fontSize: 12, color: COLORS.footer },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, padding: 3 },
  day: { flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 999 },
  dayRecorded: { backgroundColor: "rgba(111,169,139,0.18)" },
  daySelected: { borderWidth: 1.5, borderColor: COLORS.gold },
  dayToday: { borderWidth: 1, borderColor: COLORS.border },
  dayLabel: { fontFamily: FONTS.regular, fontVariant: ["lining-nums"], fontSize: 14, color: COLORS.footer },
  dayLabelRecorded: { fontFamily: FONTS.semibold, color: COLORS.headline },
  empty: { fontFamily: FONTS.regular, fontSize: 14, color: COLORS.footer, textAlign: "center", marginTop: 12 },
  entryCard: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 16, gap: 10, marginTop: 16 },
  entryHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  entryDate: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.subheadline },
  moodChip: { borderRadius: 999, borderWidth: 1, borderColor: COLORS.gold, paddingHorizontal: 12, paddingVertical: 4 },
  moodChipText: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.headline },
  entryNote: { fontFamily: FONTS.regular, fontSize: 15.5, lineHeight: 24, color: COLORS.headline },
  entryNoNote: { fontFamily: FONTS.regular, fontSize: 14, color: COLORS.footer },
  reportSection: { marginTop: 28, gap: 12 },
  sectionLabel: { fontFamily: FONTS.semibold, fontSize: 13, letterSpacing: 0.3, color: COLORS.gold },
  reportText: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, flexShrink: 1 },
  reportCard: { gap: 14 },
  reportTitle: { fontFamily: FONTS.display, fontSize: 22, lineHeight: 29, color: COLORS.headline },
  observationRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  observationDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.gold, marginTop: 9 },
  observationText: { flex: 1, fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23, color: COLORS.headline },
  reportClosing: { fontFamily: FONTS.displayItalic, fontSize: 16, lineHeight: 24, color: COLORS.subheadline },
  disclaimer: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.footer },
  generatingRow: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 48 },
  primaryButton: { minHeight: 48, alignItems: "center", justifyContent: "center", borderRadius: 999, backgroundColor: COLORS.gold, paddingHorizontal: 20 },
  primaryLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
  secondaryButton: { minHeight: 44, alignSelf: "flex-start", justifyContent: "center", borderRadius: 999, borderWidth: 1, borderColor: COLORS.gold, paddingHorizontal: 18 },
  secondaryLabel: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.gold },
  pressed: { opacity: 0.85 },
  errorText: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.danger },
  privacy: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.footer },
});
