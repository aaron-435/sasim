import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Share2 from "lucide-react-native/icons/share-2";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import ReportPager, { type ReaderPage } from "../components/ReportPager";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { ElementMedallion, elementBackdropColor } from "../components/ReportCover";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import type { CompatibilityResult, CompatRelation } from "../lib/compatibility";
import { useLocale, useStrings } from "../lib/i18n";
import { getQaTopicSummary, type QaTopicSummary } from "../lib/qaHistory";
import { QA_TOPIC_GROUPS, type QaTopicGroupId } from "../lib/qaTopicGroups";
import { WRAPPED_CONTENT } from "../lib/wrappedContent";
import { YEAR_FORTUNE_CONTENT } from "../lib/yearFortuneContent";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { RADIUS, SPACE, SURFACE } from "../theme/tokens";

// Year Wrapped (연말 회고, 2026-10-06). Free, opened from Home between December 1 and
// January 31 (lib/wrapped.ts). Up to five cards, each its own share image:
//   1. the energy that led the year   — /api/yearFortune for the year (its relation to the Day Master)
//   2. the best-flowing month         — the same year's monthly mode, February to December only
//   3. the most-asked Q&A topic       — device-only counts (lib/qaHistory.ts); skipped when empty
//   4. the year in one sentence       — keyed by the year's relation (lib/wrappedContent.ts)
//   5. a first look at the coming year — facts only (element, rhythm name, headline) + the year report
// Every reading comes from the engine; nothing is generated, so it costs nothing to open.

type YearFortune = { year: number; yearMaster: { branch: string }; compatibility: CompatibilityResult | null };
type MonthFortune = { monthIndex: number; calendarYear: number; calendarMonth: number; compatibility: CompatibilityResult | null; branchRelation: "hap" | "chung" | "none" };

type WrappedData = {
  thisYear: { element: string; branch: string; relation: CompatRelation };
  bestMonth: { month: number; relation: CompatRelation } | null;
  months: number[];
  topic: QaTopicSummary | null;
  nextYear: { element: string; branch: string; relation: CompatRelation };
};

const TOPIC_ORDER = QA_TOPIC_GROUPS.map((g) => g.id);

// Highest score wins (the same score the fortune screen ranks days by); a tie goes to the
// month with a branch bond (합), then to the earlier month.
function pickBestMonth(months: MonthFortune[]): MonthFortune | null {
  let best: MonthFortune | null = null;
  for (const m of months) {
    if (!m.compatibility) continue;
    if (!best || m.compatibility.score > best.compatibility!.score) {
      best = m;
    } else if (m.compatibility.score === best.compatibility!.score && m.branchRelation === "hap" && best.branchRelation !== "hap") {
      best = m;
    }
  }
  return best;
}

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function WrappedScreen({
  year,
  nickname,
  sajuTypeName,
  selfDayMasterChar,
  selfDayBranch,
  onOpenYearReport,
  onBack,
}: {
  /** The calendar year being looked back on. */
  year: number;
  nickname: string;
  sajuTypeName: string | null;
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  onOpenYearReport: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const content = WRAPPED_CONTENT[locale] ?? WRAPPED_CONTENT.en;
  const yearContent = YEAR_FORTUNE_CONTENT[locale] ?? YEAR_FORTUNE_CONTENT.en;

  const [phase, setPhase] = useState<"loading" | "error" | "ready">("loading");
  const [data, setData] = useState<WrappedData | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [sharingKey, setSharingKey] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, View | null>>({});
  const mountedRef = useRef(true);
  const viewedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setPhase("loading");
    try {
      if (!selfDayMasterChar) throw new Error("no day master");
      const url = (forYear: number, mode?: "monthly") => {
        const params = new URLSearchParams({ selfDayMasterChar, year: String(forYear) });
        if (selfDayBranch) params.set("selfDayBranch", selfDayBranch);
        if (mode) params.set("mode", mode);
        return `${API_BASE_URL}/api/yearFortune?${params.toString()}`;
      };
      const [thisJson, monthJson, nextJson, topic] = await Promise.all([
        getJson(url(year)) as Promise<{ yearFortune?: YearFortune }>,
        getJson(url(year, "monthly")) as Promise<{ monthly?: MonthFortune[] }>,
        getJson(url(year + 1)) as Promise<{ yearFortune?: YearFortune }>,
        getQaTopicSummary(year, TOPIC_ORDER),
      ]);
      const thisCompat = thisJson.yearFortune?.compatibility;
      const nextCompat = nextJson.yearFortune?.compatibility;
      if (!thisCompat || !nextCompat) throw new Error("no reading");
      // The saju year starts at 입춘, so its last month (축월) falls in the next January.
      const months = (monthJson.monthly ?? []).filter((m) => m.calendarYear === year);
      const best = pickBestMonth(months);
      if (!mountedRef.current) return;
      setData({
        thisYear: { element: thisCompat.otherDayMasterElement, branch: thisJson.yearFortune!.yearMaster.branch, relation: thisCompat.relation },
        bestMonth: best ? { month: best.calendarMonth, relation: best.compatibility!.relation } : null,
        months: months.map((m) => m.calendarMonth),
        topic,
        nextYear: { element: nextCompat.otherDayMasterElement, branch: nextJson.yearFortune!.yearMaster.branch, relation: nextCompat.relation },
      });
      setPhase("ready");
    } catch {
      if (mountedRef.current) setPhase("error");
    }
  }, [year, selfDayMasterChar, selfDayBranch]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleShare(key: string) {
    const ref = cardRefs.current[key];
    if (!ref || sharingKey) return;
    setSharingKey(key);
    try {
      const uri = await captureRef(ref, { format: "png", quality: 1, width: 1080 });
      if (await Sharing.isAvailableAsync()) {
        track("share", { kind: "wrapped", position: key });
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best effort, like the other share cards.
    } finally {
      if (mountedRef.current) setSharingKey(null);
    }
  }

  // One page = the card (what gets captured) + its share link (+ the closing actions on the last page).
  function page(key: string, label: string, body: ReactNode, after?: ReactNode): ReaderPage {
    return {
      key,
      node: (
        <ScrollView contentContainerStyle={styles.pageScroll} showsVerticalScrollIndicator={false}>
          <View ref={(r) => { cardRefs.current[key] = r; }} collapsable={false} style={styles.card}>
            <Text style={styles.eyebrow}>{strings.wrapped.cardEyebrow(year)}</Text>
            <Text style={styles.label} accessibilityRole="header">{label}</Text>
            {body}
            <Text style={styles.brand}>FATESAID</Text>
          </View>
          <Reveal index={0}>
            <PressableScale
              style={styles.shareRow}
              onPress={() => handleShare(key)}
              disabled={!!sharingKey}
              accessibilityRole="button"
              accessibilityState={{ busy: sharingKey === key, disabled: !!sharingKey }}
            >
              {sharingKey === key ? <ActivityIndicator size="small" color={COLORS.gold} /> : <Share2 size={16} strokeWidth={1.75} color={COLORS.gold} />}
              <Text style={styles.shareLabel}>{strings.wrapped.shareButton}</Text>
            </PressableScale>
          </Reveal>
          {after && <Reveal index={1}>{after}</Reveal>}
        </ScrollView>
      ),
    };
  }

  const pages: ReaderPage[] = [];
  if (data) {
    const { thisYear, bestMonth, topic, nextYear } = data;
    pages.push(
      page(
        "year",
        strings.wrapped.yearLabel,
        <>
          <ElementMedallion element={thisYear.element} />
          <Text style={styles.big}>{content.yearName(thisYear.element, thisYear.branch)}</Text>
          <Text style={styles.rhythm}>{strings.fortune.rhythmNames[thisYear.relation]}</Text>
          <Text style={styles.body}>{content.yearLines[thisYear.relation]}</Text>
        </>
      )
    );
    if (bestMonth) {
      const bestName = strings.wrapped.monthLongName(bestMonth.month);
      pages.push(
        page(
          "month",
          strings.wrapped.monthLabel,
          <>
            <Text style={[styles.big, styles.bigMonth]}>{bestName}</Text>
            <Text style={styles.rhythm}>{strings.fortune.rhythmNames[bestMonth.relation]}</Text>
            <Text style={styles.body}>{content.monthLines[bestMonth.relation]}</Text>
            <View style={styles.monthStrip} accessible accessibilityLabel={strings.wrapped.monthStripLabel(bestName)}>
              {data.months.map((m) => (
                <View key={m} style={[styles.monthCell, m === bestMonth.month && styles.monthCellBest]}>
                  <Text style={[styles.monthCellText, m === bestMonth.month && styles.monthCellTextBest]}>{m}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.note}>{strings.wrapped.monthNote}</Text>
          </>
        )
      );
    }
    if (topic) {
      const topicId = topic.topic as QaTopicGroupId;
      pages.push(
        page(
          "topic",
          strings.wrapped.topicLabel,
          <>
            <Text style={styles.big}>{strings.qa.topicGroups[topicId] ?? topic.topic}</Text>
            <Text style={styles.rhythm}>{strings.wrapped.topicCount(topic.count, topic.total)}</Text>
            <Text style={styles.body}>{content.topicLines[topicId] ?? ""}</Text>
            <Text style={styles.note}>{strings.wrapped.topicNote}</Text>
          </>
        )
      );
    }
    pages.push(
      page(
        "motto",
        strings.wrapped.mottoLabel,
        <>
          <Text style={styles.quote}>“{content.mottos[thisYear.relation]}”</Text>
          <Text style={styles.by}>{strings.wrapped.mottoBy(sajuTypeName || nickname, year)}</Text>
        </>
      )
    );
    pages.push(
      page(
        "next",
        strings.wrapped.nextLabel(year + 1),
        <>
          <ElementMedallion element={nextYear.element} />
          <Text style={styles.big}>{content.yearName(nextYear.element, nextYear.branch)}</Text>
          <Text style={styles.rhythm}>{strings.fortune.rhythmNames[nextYear.relation]}</Text>
          <Text style={styles.body}>{yearContent.relations[nextYear.relation].headline}</Text>
          <Text style={styles.note}>{strings.wrapped.nextNote}</Text>
        </>,
        <View style={styles.actions}>
          <PressableScale onPress={onOpenYearReport} style={styles.primary} accessibilityRole="button">
            <Text style={styles.primaryLabel}>{strings.wrapped.yearReportCta(year + 1)}</Text>
          </PressableScale>
          <PressableScale onPress={onBack} style={styles.secondary} accessibilityRole="button">
            <Text style={styles.secondaryLabel}>{strings.wrapped.homeButton}</Text>
          </PressableScale>
        </View>
      )
    );
  }

  useEffect(() => {
    if (phase !== "ready" || viewedRef.current) return;
    viewedRef.current = true;
    track("wrapped_view", { value: pages.length });
  }, [phase, pages.length]);

  if (phase !== "ready") {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.center}>
          {phase === "loading" ? (
            <>
              <ActivityIndicator color={COLORS.gold} />
              <Text style={styles.loadingText}>{strings.wrapped.loading}</Text>
            </>
          ) : (
            <>
              <Text style={styles.loadingText}>{strings.fortune.loadErrorText}</Text>
              <PressableScale onPress={load} style={styles.secondary} accessibilityRole="button">
                <Text style={styles.secondaryLabel}>{strings.common.retryLabel}</Text>
              </PressableScale>
              <PressableScale onPress={onBack} style={styles.textButton} accessibilityRole="button" haptic="none">
                <Text style={styles.textButtonLabel}>{strings.wrapped.homeButton}</Text>
              </PressableScale>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ReportPager
      pages={pages}
      pageIndex={pageIndex}
      onPageIndexChange={setPageIndex}
      onBack={onBack}
      labels={{ back: strings.common.backLabel, previous: strings.report.previousPageLabel, next: strings.report.nextPageLabel }}
      swipeHint={{ id: "wrapped", label: strings.reader.swipeHint }}
      // The year pages take their element's tint (this year, next year); the rest stay on the plain backdrop.
      pageColors={pages.map((p) => elementBackdropColor(p.key === "year" ? data?.thisYear.element : p.key === "next" ? data?.nextYear.element : null))}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: SPACE.lg, paddingHorizontal: SPACE.xxl },
  loadingText: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, textAlign: "center" },
  pageScroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: SPACE.xl, paddingVertical: SPACE.xl },
  card: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingTop: SPACE.xl,
    paddingBottom: SPACE.xl,
    paddingHorizontal: SPACE.xl,
    alignItems: "center",
    minHeight: 420,
  },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.4, color: COLORS.subheadline },
  label: { fontFamily: FONTS.medium, fontSize: 14, lineHeight: 20, color: COLORS.gold, marginTop: SPACE.sm, textAlign: "center" },
  big: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 38, color: COLORS.headline, marginTop: SPACE.lg, textAlign: "center" },
  bigMonth: { fontSize: 40, lineHeight: 48, marginTop: SPACE.xxl },
  rhythm: { fontFamily: FONTS.semibold, fontSize: 14, lineHeight: 20, color: COLORS.subheadline, marginTop: SPACE.sm, textAlign: "center" },
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 24, color: COLORS.headline, marginTop: SPACE.lg, textAlign: "center" },
  note: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.footer, marginTop: SPACE.lg, textAlign: "center" },
  quote: { fontFamily: FONTS.displayItalic, fontSize: 26, lineHeight: 36, color: COLORS.headline, marginTop: SPACE.xxxl, textAlign: "center" },
  by: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19, color: COLORS.subheadline, marginTop: SPACE.lg, textAlign: "center" },
  monthStrip: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: SPACE.sm, marginTop: SPACE.xl },
  monthCell: { width: 28, height: 28, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },
  monthCellBest: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  monthCellText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline },
  monthCellTextBest: { color: COLORS.ctaText, fontFamily: FONTS.bold },
  brand: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 2, color: COLORS.subheadline, marginTop: "auto", paddingTop: SPACE.xl },
  shareRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SPACE.sm, minHeight: 44, marginTop: SPACE.sm },
  shareLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold },
  actions: { gap: SPACE.md, marginTop: SPACE.sm },
  primary: { backgroundColor: COLORS.headline, borderRadius: RADIUS.sm, paddingVertical: SPACE.lg, paddingHorizontal: SPACE.lg, alignItems: "center" },
  primaryLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText, textAlign: "center" },
  secondary: { borderWidth: 1, borderColor: SURFACE.hairline, borderRadius: RADIUS.sm, paddingVertical: SPACE.lg, paddingHorizontal: SPACE.xl, alignItems: "center", minWidth: 160 },
  secondaryLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.headline },
  textButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: SPACE.md },
  textButtonLabel: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.subheadline },
});
