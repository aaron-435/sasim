import { ArrowLeft, Download, Lock } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import type { CompatibilityResult } from "../lib/compatibility";
import { useLocale, useStrings } from "../lib/i18n";
import { exportReportPdf, pdfErrorMessage } from "../lib/reportPdf";
import { getRevenueCatUserId, getYearReportPackage, hasYearReportEntitlement, purchaseYearReport, restoreReports } from "../lib/purchases";
import { qaYearReport } from "../dev/qaMode";
import { getSavedYearReport, saveYearReport, type YearReportContent } from "../lib/yearReportStorage";
import { YEAR_FORTUNE_CONTENT } from "../lib/yearFortuneContent";
import { COLORS } from "../theme/colors";

// The paid year-ahead report: five life areas, a 12-month timeline and a four-step action
// plan (server: app/api/yearReport, which verifies the purchase itself before generating).
//
// Free side: a preview built from the same engine data the Year tab already shows (no GPT
// call): the year's leaning + overview, and the list of what the report contains, locked.
// Paid side: generated once, kept on the device (lib/yearReportStorage.ts), reopened
// instantly afterwards.

type Phase = "loading" | "preview" | "generating" | "reader" | "error";

const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function YearReportScreen({
  nickname,
  selfDayMasterChar,
  selfDayBranch,
  elements,
  sajuTypeName,
  onBack,
}: {
  nickname: string;
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  elements: Record<string, number> | null;
  sajuTypeName: string | null;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const yearContent = YEAR_FORTUNE_CONTENT[locale] ?? YEAR_FORTUNE_CONTENT.ko;
  const mountedRef = useRef(true);

  const [phase, setPhase] = useState<Phase>("loading");
  const [year, setYear] = useState<number | null>(null);
  const [relation, setRelation] = useState<CompatibilityResult["relation"] | null>(null);
  const [report, setReport] = useState<YearReportContent | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (phase !== "generating") return;
    setMsgIndex(0);
    const id = setInterval(() => setMsgIndex((i) => Math.min(i + 1, strings.yearReport.generating.length - 1)), 2600);
    return () => clearInterval(id);
  }, [phase, strings]);

  const generate = useCallback(
    async (forYear: number) => {
      // Persona test mode (dev web only): show a pre-generated report instead of calling the
      // paid endpoint. Null in every real build.
      const qaFixture = qaYearReport(locale, nickname) as YearReportContent | null;
      if (qaFixture) {
        setReport({ ...qaFixture, year: forYear });
        setPhase("reader");
        return;
      }
      setPhase("generating");
      setErrorText(null);
      const appUserId = await getRevenueCatUserId();
      if (!appUserId) {
        setErrorText(strings.yearReport.errorNotPurchased);
        setPhase("error");
        return;
      }
      // The report is a long GPT call — give up after two minutes instead of spinning.
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 120_000);
      try {
        const res = await fetch(`${API_BASE_URL}/api/yearReport`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ appUserId, locale, nickname, selfDayMasterChar, selfDayBranch, elements, sajuTypeName, year: forYear }),
        });
        const json = await res.json();
        if (!mountedRef.current) return;
        if (!res.ok) {
          // Never show json.error: the server's messages are Korean whatever the app locale.
          const code = json?.code as string | undefined;
          setErrorText(
            code === "not_purchased"
              ? strings.yearReport.errorNotPurchased
              : code === "unavailable"
                ? strings.yearReport.errorPaidButFailed
                : res.status === 429
                  ? strings.yearReport.errorRateLimited
                  : strings.yearReport.errorGeneric,
          );
          setPhase("error");
          return;
        }
        const content = json as YearReportContent;
        setReport(content);
        setPhase("reader");
        saveYearReport(locale, content);
      } catch {
        if (!mountedRef.current) return;
        setErrorText(strings.yearReport.errorNetwork);
        setPhase("error");
      } finally {
        clearTimeout(timeout);
      }
    },
    [strings, locale, nickname, selfDayMasterChar, selfDayBranch, elements, sajuTypeName],
  );

  const init = useCallback(async () => {
    setPhase("loading");
    setErrorText(null);
    try {
      if (!selfDayMasterChar) throw new Error("no day master");
      const params = new URLSearchParams({ selfDayMasterChar });
      if (selfDayBranch) params.set("selfDayBranch", selfDayBranch);
      const res = await fetch(`${API_BASE_URL}/api/yearFortune?${params.toString()}`);
      const json = await res.json();
      const rel = json?.yearFortune?.compatibility?.relation as CompatibilityResult["relation"] | undefined;
      if (!res.ok || !rel) throw new Error("failed");
      if (!mountedRef.current) return;
      const forYear = json.yearFortune.year as number;
      setYear(forYear);
      setRelation(rel);

      const [entitled, saved] = await Promise.all([hasYearReportEntitlement(forYear), getSavedYearReport(forYear, locale)]);
      if (!mountedRef.current) return;
      if (entitled && saved) {
        setReport(saved);
        setPhase("reader");
      } else if (entitled) {
        generate(forYear);
      } else {
        setPhase("preview");
        getYearReportPackage(forYear).then((pkg) => {
          if (mountedRef.current) setPrice(pkg?.product.priceString ?? null);
        });
      }
    } catch {
      if (!mountedRef.current) return;
      setErrorText(strings.yearReport.errorNetwork);
      setPhase("error");
    }
  }, [selfDayMasterChar, selfDayBranch, locale, generate, strings]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleBuy() {
    if (purchasing || restoring || year === null) return;
    setPurchasing(true);
    setNotice(null);
    const outcome = await purchaseYearReport(year);
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      generate(year);
    } else if (outcome.status === "error") {
      setNotice(outcome.message === "no offering available" ? strings.yearReport.purchaseUnavailable : strings.yearReport.purchaseError);
    }
  }

  async function handleRestore() {
    if (purchasing || restoring || year === null) return;
    setRestoring(true);
    setNotice(null);
    const ok = await restoreReports();
    if (!mountedRef.current) return;
    if (!ok) {
      setRestoring(false);
      setNotice(strings.yearReport.restoreFailed);
      return;
    }
    const entitled = await hasYearReportEntitlement(year);
    if (!mountedRef.current) return;
    setRestoring(false);
    if (entitled) {
      generate(year);
    } else {
      setNotice(strings.yearReport.restoreNotFound);
    }
  }

  async function handleExportPdf() {
    if (exporting || !report) return;
    setExporting(true);
    const result = await exportReportPdf({ kind: "year", locale, nickname, content: report }, strings.pdf.dialogTitle);
    if (!mountedRef.current) return;
    setExporting(false);
    if (!result.ok) Alert.alert(strings.pdf.button, pdfErrorMessage(result.reason, strings.pdf));
  }

  const heading = year !== null ? strings.yearReport.heading(year) : strings.yearReport.heading(new Date().getFullYear() + 1);

  const lockedChapters = [
    strings.yearReport.chapterWealth,
    strings.yearReport.chapterLove,
    strings.yearReport.chapterCareer,
    strings.yearReport.chapterStudy,
    strings.yearReport.chapterHealth,
    strings.yearReport.chapterTimeline,
    strings.yearReport.chapterPlan,
  ];

  const backButton = (
    <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
      <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
      <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
    </Pressable>
  );

  if (phase === "loading" || phase === "generating") {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.backRow}>{backButton}</View>
        <View style={styles.center}>
          <ActivityIndicator color={COLORS.gold} size="large" />
          {phase === "generating" && <Text style={styles.centerText}>{strings.yearReport.generating[msgIndex]}</Text>}
        </View>
      </SafeAreaView>
    );
  }

  if (phase === "error") {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.backRow}>{backButton}</View>
        <View style={styles.center}>
          <Text style={styles.centerText}>{errorText ?? strings.yearReport.errorGeneric}</Text>
          <Pressable style={styles.retryButton} onPress={init} accessibilityRole="button">
            <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (phase === "reader" && report) {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          {backButton}
          <Text style={styles.heading} accessibilityRole="header">
            {report.title}
          </Text>
          <Text style={styles.subtitle}>{report.subtitle}</Text>

          <Pressable style={styles.pdfButton} onPress={handleExportPdf} disabled={exporting} accessibilityRole="button">
            {exporting ? (
              <ActivityIndicator size="small" color={COLORS.gold} />
            ) : (
              <>
                <Download size={16} strokeWidth={1.75} color={COLORS.gold} />
                <Text style={styles.pdfButtonLabel}>{strings.pdf.button}</Text>
              </>
            )}
          </Pressable>

          <Text style={styles.chapterHeading} accessibilityRole="header">{strings.yearReport.chapterOverview}</Text>
          {paragraphs(report.overview).map((p, i) => (
            <Text key={i} style={styles.body}>
              {p}
            </Text>
          ))}

          {(["wealth", "love", "career", "study", "health"] as const).map((key) => (
            <View key={key} style={styles.card}>
              <Text style={styles.cardHeading} accessibilityRole="header">{report.chapters[key].heading}</Text>
              {paragraphs(report.chapters[key].body).map((p, i) => (
                <Text key={i} style={styles.body}>
                  {p}
                </Text>
              ))}
            </View>
          ))}

          <Text style={[styles.chapterHeading, styles.sectionGap]} accessibilityRole="header">{strings.yearReport.timelineHeading}</Text>
          <Text style={styles.timelineNote}>{strings.yearReport.timelineNote}</Text>
          <View style={styles.list}>
            {report.months.map((m, i) => {
              const calendarMonth = ((i + 1) % 12) + 1; // saju months run from 입춘 (Feb) to the next January
              return (
                <View key={i} style={[styles.monthRow, i > 0 && styles.rowDivider]}>
                  <Text style={styles.monthName}>{strings.yearReport.monthName(calendarMonth)}</Text>
                  <View style={styles.monthText}>
                    <Text style={styles.monthHeadline}>{m.headline}</Text>
                    <Text style={styles.monthBody}>{m.body}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <Text style={[styles.chapterHeading, styles.sectionGap]} accessibilityRole="header">{strings.yearReport.planHeading}</Text>
          {report.action_plan.map((a, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardHeading} accessibilityRole="header">{a.title}</Text>
              <Text style={styles.body}>{a.body}</Text>
            </View>
          ))}

          <Text style={[styles.closing, styles.sectionGap]}>{report.closing}</Text>

          <Text style={styles.disclaimer}>{strings.report.disclaimer1}</Text>
          <Text style={styles.disclaimer}>{strings.report.disclaimer2}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // preview (not purchased)
  const relationCopy = relation ? yearContent.relations[relation] : null;
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        {backButton}
        <Text style={styles.heading} accessibilityRole="header">
          {heading}
        </Text>
        <Text style={styles.subtitle}>{strings.yearReport.subtitle}</Text>

        {relationCopy && (
          <View style={styles.card}>
            <Text style={styles.previewLabel}>{strings.yearReport.previewLabel}</Text>
            <Text style={styles.cardHeading} accessibilityRole="header">{relationCopy.headline}</Text>
            <Text style={styles.body}>{relationCopy.overview}</Text>
          </View>
        )}

        <Text style={styles.vsProNote}>{strings.yearReport.vsProNote}</Text>
        <Text style={styles.lockedNote}>{strings.yearReport.lockedNote}</Text>
        <View style={styles.list}>
          {lockedChapters.map((label, i) => (
            <View key={label} style={[styles.lockedRow, i > 0 && styles.rowDivider]}>
              <Lock size={16} strokeWidth={1.75} color={COLORS.gold} />
              <Text style={styles.lockedLabel}>{label}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={[styles.buyButton, (purchasing || restoring) && styles.buttonDisabled]}
          onPress={handleBuy}
          disabled={purchasing || restoring}
          accessibilityRole="button"
        >
          {purchasing ? <ActivityIndicator color={COLORS.ctaText} /> : <Text style={styles.buyLabel}>{strings.yearReport.buyButton(price)}</Text>}
        </Pressable>
        <Text style={styles.oneTime}>{price ? strings.yearReport.oneTimeNote : `${strings.yearReport.priceAtCheckout} ${strings.yearReport.oneTimeNote}`}</Text>
        <Pressable style={styles.restoreButton} onPress={handleRestore} disabled={purchasing || restoring} accessibilityRole="button">
          <Text style={styles.restoreLabel}>{restoring ? strings.yearReport.restoring : strings.yearReport.restore}</Text>
        </Pressable>
        {notice && <Text style={styles.notice}>{notice}</Text>}

        <Text style={styles.disclaimer}>{strings.report.disclaimer1}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 48 },
  backRow: { paddingHorizontal: 22, paddingTop: 8 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", minHeight: 44, marginLeft: -8, paddingHorizontal: 8 },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 16 },
  centerText: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 21, color: COLORS.subheadline, textAlign: "center" },
  retryButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12 },
  retryLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 14, color: COLORS.gold },
  heading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 30, lineHeight: 36, color: COLORS.headline, marginTop: 4 },
  subtitle: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginTop: 8, marginBottom: 20 },
  pdfButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 44, alignSelf: "flex-start", paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, borderColor: "rgba(111,169,139,0.45)", marginBottom: 22 },
  pdfButtonLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.gold },
  chapterHeading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 22, color: COLORS.headline, marginBottom: 10 },
  sectionGap: { marginTop: 30 },
  body: { fontFamily: "Manrope_400Regular", fontSize: 14.5, lineHeight: 23, color: COLORS.headline, marginBottom: 12 },
  card: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 18, marginTop: 14 },
  cardHeading: { fontFamily: "Manrope_600SemiBold", fontSize: 16, lineHeight: 23, color: COLORS.gold, marginBottom: 10 },
  previewLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: COLORS.subheadline, marginBottom: 6 },
  list: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, overflow: "hidden" },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.border },
  vsProNote: { fontFamily: "Manrope_400Regular", fontSize: 13, lineHeight: 20, color: COLORS.subheadline, marginTop: 4, marginBottom: 14 },
  timelineNote: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 19, color: COLORS.footer, marginTop: -4, marginBottom: 10 },
  monthRow: { flexDirection: "row", gap: 14, paddingVertical: 12, paddingHorizontal: 16 },
  monthName: { width: 40, fontFamily: "Manrope_600SemiBold", fontSize: 13, color: COLORS.gold },
  monthText: { flex: 1, gap: 2 },
  monthHeadline: { fontFamily: "Manrope_600SemiBold", fontSize: 14, color: COLORS.headline },
  monthBody: { fontFamily: "Manrope_400Regular", fontSize: 13, lineHeight: 20, color: COLORS.subheadline },
  closing: { fontFamily: "CormorantGaramond_500Medium", fontSize: 19, lineHeight: 28, color: COLORS.headline },
  disclaimer: { fontFamily: "Manrope_400Regular", fontSize: 12, lineHeight: 17, color: COLORS.subheadline, marginTop: 16 },
  lockedNote: { fontFamily: "Manrope_600SemiBold", fontSize: 13, color: COLORS.gold, marginTop: 22, marginBottom: 10 },
  lockedRow: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 48, paddingHorizontal: 16 },
  lockedLabel: { fontFamily: "Manrope_500Medium", fontSize: 14.5, color: COLORS.headline },
  buyButton: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 15, alignItems: "center", marginTop: 22, minHeight: 50, justifyContent: "center" },
  buyLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 14.5, color: COLORS.ctaText },
  buttonDisabled: { opacity: 0.6 },
  oneTime: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: 12 },
  restoreButton: { minHeight: 44, alignItems: "center", justifyContent: "center", marginTop: 4 },
  restoreLabel: { fontFamily: "Manrope_500Medium", fontSize: 12.5, color: COLORS.subheadline, textDecorationLine: "underline" },
  notice: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 19, color: "#E0A296", textAlign: "center", marginTop: 4 },
});
