import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Download from "lucide-react-native/icons/download";
import Lock from "lucide-react-native/icons/lock";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import CalcSourceBadge from "../components/CalcSourceBadge";
import ReportClosingPage from "../components/ReportClosingPage";
import ReportPager, { readerChromeButtonStyle, type ReaderPage } from "../components/ReportPager";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import type { CompatibilityResult } from "../lib/compatibility";
import { useLocale, useStrings, type Dictionary } from "../lib/i18n";
import { exportReportPdf, pdfErrorMessage } from "../lib/reportPdf";
import { getRevenueCatUserId, getYearReportPackage, hasYearReportEntitlement, isUnavailableMessage, purchaseIssueDetail, purchaseYearReport, restoreReports } from "../lib/purchases";
import { qaYearReport } from "../dev/qaMode";
import { getSavedYearReport, saveYearReport, type YearReportContent } from "../lib/yearReportStorage";
import { YEAR_FORTUNE_CONTENT } from "../lib/yearFortuneContent";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS } from "../theme/fonts";

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
  decadeFortune,
  currentAge,
  onBack,
}: {
  nickname: string;
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  elements: Record<string, number> | null;
  sajuTypeName: string | null;
  decadeFortune?: unknown;
  currentAge?: number;
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
  const [pageIndex, setPageIndex] = useState(0);

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
          body: JSON.stringify({ appUserId, locale, nickname, selfDayMasterChar, selfDayBranch, elements, sajuTypeName, decadeFortune, currentAge, year: forYear }),
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
    [strings, locale, nickname, selfDayMasterChar, selfDayBranch, elements, sajuTypeName, decadeFortune, currentAge],
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
        track("paywall_view", { surface: "year_report" });
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
      setNotice(isUnavailableMessage(outcome.message) ? `${strings.yearReport.purchaseUnavailable}${purchaseIssueDetail(outcome.message) ? `\n(${purchaseIssueDetail(outcome.message)})` : ""}` : `${strings.yearReport.purchaseError}${outcome.message ? `\n(${outcome.message.slice(0, 160)})` : ""}`);
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

  // The closing page shares the subtitle as an image card; this only records it.
  function handleShared() {
    track("share", { kind: "year_report_summary" });
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
    const pages = yearReaderPages(report, strings, nickname, {
      onShared: handleShared,
      pdf: { label: strings.pdf.button, busyLabel: strings.pdf.preparing, busy: exporting, onPress: handleExportPdf },
      onOpenPlan: setPageIndex,
    });
    return (
      <ReportPager
        pages={pages}
        pageIndex={pageIndex}
        onPageIndexChange={setPageIndex}
        onBack={onBack}
        labels={{ back: strings.common.backLabel, previous: strings.report.previousPageLabel, next: strings.report.nextPageLabel }}
        swipeHint={{ id: "year", label: strings.reader.swipeHint }}
        reviewAtEnd
        trailing={
          <Pressable
            onPress={handleExportPdf}
            disabled={exporting}
            hitSlop={8}
            style={readerChromeButtonStyle}
            accessibilityRole="button"
            accessibilityLabel={exporting ? strings.pdf.preparing : strings.pdf.button}
          >
            {exporting ? <ActivityIndicator size="small" color={COLORS.subheadline} /> : <Download size={18} strokeWidth={1.75} color={COLORS.subheadline} />}
          </Pressable>
        }
        footer={
          pageIndex === pages.length - 1 ? (
            <Pressable onPress={onBack} style={styles.homeButton} accessibilityRole="button">
              <Text style={styles.homeButtonLabel}>{strings.report.homeButtonLabel}</Text>
            </Pressable>
          ) : null
        }
      />
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

// ------------------------------------------------------------------
// Reader pages: one section per page, same order as before (cover, the year at a glance,
// five life areas, the 12-month timeline in quarters, the action plan, closing). Each page
// scrolls on its own when the text runs longer than the screen.
// ------------------------------------------------------------------

const MONTHS_PER_PAGE = 3;

type ClosingActions = {
  onShared: () => void;
  pdf: { label: string; busyLabel: string; busy: boolean; onPress: () => void };
  /** Jumps the reader to a page index (the closing's "next step" card returns to the plan). */
  onOpenPlan: (pageIndex: number) => void;
};

function yearReaderPages(report: YearReportContent, strings: Dictionary, nickname: string, actions: ClosingActions): ReaderPage[] {
  const y = strings.yearReport;
  const pages: ReaderPage[] = [];
  pages.push({ key: "overview", node: <SectionPage eyebrow={y.chapterOverview} body={report.overview} /> });
  const areaLabels = { wealth: y.chapterWealth, love: y.chapterLove, career: y.chapterCareer, study: y.chapterStudy, health: y.chapterHealth };
  (["wealth", "love", "career", "study", "health"] as const).forEach((key) => {
    pages.push({ key, node: <SectionPage eyebrow={areaLabels[key]} title={report.chapters[key].heading} body={report.chapters[key].body} /> });
  });
  for (let start = 0; start < report.months.length; start += MONTHS_PER_PAGE) {
    pages.push({
      key: `months-${start}`,
      node: <TimelinePage strings={strings} months={report.months.slice(start, start + MONTHS_PER_PAGE)} offset={start} showNote={start === 0} />,
    });
  }
  pages.push({ key: "plan", node: <PlanPage heading={y.planHeading} steps={report.action_plan} /> });
  // +1 for the cover added below.
  const planPageIndex = pages.length;
  const firstStep = report.action_plan[0];
  pages.push({
    key: "closing",
    node: (
      <ReportClosingPage
        // Titled like the deep report's closing page, so both readers end the same way.
        title={y.chapterClosing}
        body={report.closing}
        summaryEyebrow={strings.reader.summaryEyebrow}
        summary={report.subtitle}
        share={{ label: strings.reader.shareLabel, eyebrow: `${strings.reader.shareCredit} · ${y.heading(report.year)}`, onShared: actions.onShared }}
        pdf={actions.pdf}
        next={
          firstStep
            ? {
                eyebrow: strings.reader.nextStepEyebrow,
                title: firstStep.title,
                body: strings.reader.nextStepBody,
                ctaLabel: strings.reader.nextStepCta,
                onPress: () => actions.onOpenPlan(planPageIndex),
              }
            : null
        }
        disclaimers={[strings.report.disclaimer1, strings.report.disclaimer2]}
      />
    ),
  });
  // The cover counts itself in the page total.
  const total = pages.length + 1;
  pages.unshift({
    key: "cover",
    node: (
      <CoverPage
        eyebrow={y.heading(report.year)}
        title={report.title}
        subtitle={report.subtitle}
        nickname={`${nickname}${strings.report.nicknameSuffix}`}
        totalPagesLabel={strings.report.totalPagesLabel(total)}
      />
    ),
  });
  return pages;
}

function PageScroll({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView style={pageStyles.scroll} contentContainerStyle={pageStyles.scrollContent} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

function CoverPage({ eyebrow, title, subtitle, nickname, totalPagesLabel }: { eyebrow: string; title: string; subtitle: string; nickname: string; totalPagesLabel: string }) {
  return (
    <View style={pageStyles.cover}>
      {/* Same masthead and source line as the deep report's cover, so both paid reports open alike. */}
      <View style={pageStyles.brandRow}>
        <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={pageStyles.brandLabel}>FATESAID</Text>
      </View>
      <Text style={pageStyles.eyebrow}>{eyebrow}</Text>
      <View style={pageStyles.coverMid}>
        <Text style={pageStyles.coverTitle} accessibilityRole="header">
          {title}
        </Text>
        <View style={pageStyles.coverRule} />
        <Text style={pageStyles.coverSub}>{subtitle}</Text>
        <Text style={pageStyles.coverName}>{nickname}</Text>
        <View style={pageStyles.coverSource}>
          <CalcSourceBadge align="start" />
        </View>
      </View>
      <Text style={pageStyles.coverFoot}>{totalPagesLabel}</Text>
    </View>
  );
}

function SectionPage({ eyebrow, title, body }: { eyebrow: string; title?: string; body: string }) {
  return (
    <PageScroll>
      <Text style={pageStyles.eyebrow} accessibilityRole={title ? undefined : "header"}>
        {eyebrow}
      </Text>
      {title ? (
        <Text style={pageStyles.title} accessibilityRole="header">
          {title}
        </Text>
      ) : null}
      {paragraphs(body).map((p, i) => (
        <Text key={i} style={pageStyles.body}>
          {p}
        </Text>
      ))}
    </PageScroll>
  );
}

function TimelinePage({ strings, months, offset, showNote }: { strings: Dictionary; months: YearReportContent["months"]; offset: number; showNote: boolean }) {
  // Saju months run from 입춘 (Feb) to the next January.
  const calendarMonth = (i: number) => ((offset + i + 1) % 12) + 1;
  const range = `${strings.yearReport.monthName(calendarMonth(0))} – ${strings.yearReport.monthName(calendarMonth(months.length - 1))}`;
  return (
    <PageScroll>
      <Text style={pageStyles.eyebrow}>{strings.yearReport.timelineHeading}</Text>
      <Text style={pageStyles.title} accessibilityRole="header">
        {range}
      </Text>
      {showNote && <Text style={pageStyles.note}>{strings.yearReport.timelineNote}</Text>}
      {months.map((m, i) => (
        <View key={i} style={[pageStyles.monthBlock, i > 0 && pageStyles.monthDivider]}>
          <Text style={pageStyles.monthName}>{strings.yearReport.monthName(calendarMonth(i))}</Text>
          <Text style={pageStyles.monthHeadline}>{m.headline}</Text>
          <Text style={pageStyles.monthBody}>{m.body}</Text>
        </View>
      ))}
    </PageScroll>
  );
}

function PlanPage({ heading, steps }: { heading: string; steps: YearReportContent["action_plan"] }) {
  return (
    <PageScroll>
      <Text style={pageStyles.eyebrow} accessibilityRole="header">
        {heading}
      </Text>
      {steps.map((a, i) => (
        <View key={i} style={pageStyles.step}>
          <Text style={pageStyles.stepIndex}>{String(i + 1).padStart(2, "0")}</Text>
          <View style={pageStyles.stepText}>
            <Text style={pageStyles.stepTitle}>{a.title}</Text>
            <Text style={pageStyles.monthBody}>{a.body}</Text>
          </View>
        </View>
      ))}
    </PageScroll>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 48 },
  backRow: { paddingHorizontal: 22, paddingTop: 8 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", minHeight: 44, marginLeft: -8, paddingHorizontal: 8 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 16 },
  centerText: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, textAlign: "center" },
  retryButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12 },
  retryLabel: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.gold },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 30, lineHeight: 36, color: COLORS.headline, marginTop: 4 },
  subtitle: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginTop: 8, marginBottom: 20 },
  body: { fontFamily: FONTS.regular, fontSize: 14.5, lineHeight: 23, color: COLORS.headline, marginBottom: 12 },
  card: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 18, marginTop: 14 },
  cardHeading: { fontFamily: FONTS.semibold, fontSize: 16, lineHeight: 23, color: COLORS.gold, marginBottom: 10 },
  previewLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline, marginBottom: 6 },
  list: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, overflow: "hidden" },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.border },
  vsProNote: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline, marginTop: 4, marginBottom: 14 },
  disclaimer: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 17, color: COLORS.subheadline, marginTop: 16 },
  lockedNote: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold, marginTop: 22, marginBottom: 10 },
  lockedRow: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 48, paddingHorizontal: 16 },
  lockedLabel: { fontFamily: FONTS.medium, fontSize: 14.5, color: COLORS.headline },
  buyButton: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 15, alignItems: "center", marginTop: 22, minHeight: 50, justifyContent: "center" },
  buyLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  buttonDisabled: { opacity: 0.6 },
  oneTime: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: 12 },
  restoreButton: { minHeight: 44, alignItems: "center", justifyContent: "center", marginTop: 4 },
  restoreLabel: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, textDecorationLine: "underline" },
  notice: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.danger, textAlign: "center", marginTop: 4 },
  homeButton: { marginHorizontal: 22, marginBottom: 16, marginTop: 6, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  homeButtonLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.headline },
});

const pageStyles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 26, paddingTop: 20, paddingBottom: 40 },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold, marginBottom: 12 },
  title: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, lineHeight: 33, color: COLORS.headline, marginBottom: 18 },
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 25, color: COLORS.headline, marginBottom: 16 },
  note: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.footer, marginTop: -8, marginBottom: 14 },

  cover: { flex: 1, paddingHorizontal: 26, paddingTop: 20, paddingBottom: 24 },
  coverMid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  coverTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 32, lineHeight: 40, color: COLORS.headline },
  coverRule: { width: 30, height: 1, backgroundColor: COLORS.gold, marginVertical: 18 },
  coverSub: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23, color: COLORS.subheadline },
  coverName: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.headline, marginTop: 22 },
  coverSource: { marginTop: 22 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 18 },
  brandLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 3, color: COLORS.gold, textTransform: "uppercase" },
  coverFoot: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 1.5, color: COLORS.footer },

  monthBlock: { paddingVertical: 16, gap: 4 },
  monthDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.border },
  monthName: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold },
  monthHeadline: { fontFamily: FONTS.semibold, fontSize: 15.5, lineHeight: 22, color: COLORS.headline },
  monthBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 22, color: COLORS.subheadline },

  step: { flexDirection: "row", gap: 14, paddingVertical: 14 },
  stepIndex: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 22, lineHeight: 26, color: COLORS.gold, width: 30 },
  stepText: { flex: 1, gap: 4 },
  stepTitle: { fontFamily: FONTS.semibold, fontSize: 15.5, lineHeight: 22, color: COLORS.headline },

});
