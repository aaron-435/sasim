import Lock from "lucide-react-native/icons/lock";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, BackHandler, Pressable, ScrollView, Share, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import Text from "../components/AppText";
import CalcSourceBadge from "../components/CalcSourceBadge";
import ReportClosingPage from "../components/ReportClosingPage";
import ReportPager, { type ReaderPage } from "../components/ReportPager";
import type { OtherBirthPayload } from "../components/OtherBirthForm";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import {
  compatPairKey,
  getSavedCompatReport,
  saveCompatReport,
  type CompatFreePart,
  type CompatPaidPart,
} from "../lib/compatReportStorage";
import { useLocale, useStrings, type Dictionary } from "../lib/i18n";
import { getCompatReportPackage, getRevenueCatUserId, isUnavailableMessage, purchaseCompatReport, purchaseIssueDetail } from "../lib/purchases";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS } from "../theme/fonts";

// The paid compatibility report (product compat_report, one purchase per other person).
// Server: app/api/compatReport (free preview) and app/api/compatReport/paid (verifies the
// purchase's transaction with RevenueCat and binds it to this pair before generating).
//
// Reader: cover → how the energies meet → what you give each other (free) → paywall page, or
// after purchase → three friction pages → rhythm → closing. Same pager and closing page as the
// deep and year reports. Everything is kept on the device (lib/compatReportStorage.ts); the
// purchase's transaction id is saved before the paid half is requested, so a failed generation
// is retried without buying again.
//
// The text names the other person with an {other} token (their name never goes to the server);
// it is swapped for the name here.

type Phase = "loading" | "reader" | "generating" | "error";
type ErrorKind = "preview" | "paid";

const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function CompatReportScreen({
  nickname,
  otherName,
  other,
  selfDayMasterChar,
  selfDayBranch,
  selfElements,
  sessionId,
  onBack,
}: {
  nickname: string;
  otherName: string;
  other: OtherBirthPayload;
  selfDayMasterChar: string;
  selfDayBranch: string | null;
  selfElements: Record<string, number> | null;
  sessionId?: string;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const s = strings.compatReport;
  const mountedRef = useRef(true);
  const pairKey = compatPairKey(other);
  const otherLabel = otherName.trim() ? s.otherWithName(otherName.trim()) : s.otherFallback;
  const fill = useCallback((text: string) => text.split("{other}").join(otherLabel), [otherLabel]);

  const [phase, setPhase] = useState<Phase>("loading");
  const [free, setFree] = useState<CompatFreePart | null>(null);
  const [paid, setPaid] = useState<CompatPaidPart | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<{ kind: ErrorKind; text: string } | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Android back leaves the report (back to the compatibility result), not the whole screen.
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onBack();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  useEffect(() => {
    if (phase !== "loading" && phase !== "generating") return;
    setMsgIndex(0);
    const id = setInterval(() => setMsgIndex((i) => Math.min(i + 1, 2)), 2600);
    return () => clearInterval(id);
  }, [phase]);

  const requestBody = useCallback(
    () => ({ locale, nickname, selfDayMasterChar, selfDayBranch, selfElements, other, sessionId }),
    [locale, nickname, selfDayMasterChar, selfDayBranch, selfElements, other, sessionId],
  );

  const errorText = useCallback(
    (status: number, code: string | undefined, kind: ErrorKind) => {
      // Never show the server's own message: it is Korean whatever the app locale.
      if (code === "not_purchased") return s.errorNotPurchased;
      if (code === "used_for_other") return s.errorUsedForOther;
      if (code === "regen_limit") return s.errorRegenLimit;
      if (status === 429) return s.errorRateLimited;
      return kind === "paid" ? s.errorPaidButFailed : s.errorGeneric;
    },
    [s],
  );

  const generatePaid = useCallback(
    async (transactionId: string, freePart: CompatFreePart) => {
      setPhase("generating");
      setError(null);
      const appUserId = await getRevenueCatUserId();
      if (!mountedRef.current) return;
      if (!appUserId) {
        setError({ kind: "paid", text: s.errorNotPurchased });
        setPhase("error");
        return;
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 120_000);
      try {
        const res = await fetch(`${API_BASE_URL}/api/compatReport/paid`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ ...requestBody(), appUserId, transactionId, freePart }),
        });
        const json = await res.json();
        if (!mountedRef.current) return;
        if (!res.ok) {
          setError({ kind: "paid", text: errorText(res.status, json?.code, "paid") });
          setPhase("error");
          return;
        }
        const content = json as CompatPaidPart;
        setPaid(content);
        // First paid page: after the cover and the two free chapters.
        setPageIndex(3);
        setPhase("reader");
        saveCompatReport({ pairKey, locale, otherName, other, free: freePart, transactionId, paid: content });
      } catch {
        if (!mountedRef.current) return;
        setError({ kind: "paid", text: s.errorNetwork });
        setPhase("error");
      } finally {
        clearTimeout(timeout);
      }
    },
    [requestBody, errorText, pairKey, locale, otherName, other, s],
  );

  const loadPreview = useCallback(async () => {
    setPhase("loading");
    setError(null);
    try {
      const saved = await getSavedCompatReport(pairKey);
      if (!mountedRef.current) return;
      if (saved?.free) {
        setFree(saved.free);
        if (saved.paid) {
          setPaid(saved.paid);
          setPhase("reader");
          return;
        }
        // Bought earlier but the paid half never arrived: finish it, no new purchase.
        if (saved.transactionId) {
          generatePaid(saved.transactionId, saved.free);
          return;
        }
        setPhase("reader");
      } else {
        const res = await fetch(`${API_BASE_URL}/api/compatReport`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody()),
        });
        const json = await res.json();
        if (!mountedRef.current) return;
        if (!res.ok) {
          setError({ kind: "preview", text: errorText(res.status, json?.code, "preview") });
          setPhase("error");
          return;
        }
        const { relation: _relation, ...part } = json as CompatFreePart & { relation?: string };
        setFree(part);
        setPhase("reader");
        saveCompatReport({ pairKey, locale, otherName, other, free: part });
      }
      track("paywall_view", { surface: "compat_report" });
      getCompatReportPackage().then((pkg) => {
        if (mountedRef.current) setPrice(pkg?.product.priceString ?? null);
      });
    } catch {
      if (!mountedRef.current) return;
      setError({ kind: "preview", text: s.errorNetwork });
      setPhase("error");
    }
  }, [pairKey, locale, otherName, other, requestBody, errorText, generatePaid, s]);

  useEffect(() => {
    loadPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleBuy() {
    if (purchasing || !free) return;
    setPurchasing(true);
    setNotice(null);
    const outcome = await purchaseCompatReport();
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      if (!outcome.transactionId) {
        setError({ kind: "paid", text: s.errorPaidButFailed });
        setPhase("error");
        return;
      }
      await saveCompatReport({ pairKey, locale, otherName, other, free, transactionId: outcome.transactionId });
      generatePaid(outcome.transactionId, free);
    } else if (outcome.status === "error") {
      const detail = purchaseIssueDetail(outcome.message);
      setNotice(isUnavailableMessage(outcome.message) ? `${s.purchaseUnavailable}${detail ? `\n(${detail})` : ""}` : `${s.purchaseError}${outcome.message ? `\n(${outcome.message.slice(0, 160)})` : ""}`);
    }
  }

  async function retry() {
    if (error?.kind === "paid") {
      const saved = await getSavedCompatReport(pairKey);
      if (saved?.transactionId && saved.free) {
        generatePaid(saved.transactionId, saved.free);
        return;
      }
    }
    loadPreview();
  }

  async function handleShare() {
    if (!free) return;
    track("share", { kind: "compat_report_summary" });
    try {
      await Share.share({ message: `"${fill(free.subtitle)}"\n\n${s.shareTitle}\n${API_BASE_URL}` });
    } catch {
      // dismissed or unsupported
    }
  }

  const backButton = (
    <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
      <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
      <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
    </Pressable>
  );

  if (phase === "loading" || phase === "generating") {
    const messages = phase === "loading" ? s.generatingPreview : s.generatingPaid;
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.backRow}>{backButton}</View>
        <View style={styles.center}>
          <ActivityIndicator color={COLORS.gold} size="large" />
          <Text style={styles.centerText}>{messages[msgIndex]}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (phase === "error" || !free) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.backRow}>{backButton}</View>
        <View style={styles.center}>
          <Text style={styles.centerText}>{error?.text ?? s.errorGeneric}</Text>
          <Pressable style={styles.retryButton} onPress={retry} accessibilityRole="button">
            <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const pages = compatReaderPages({
    strings,
    nickname,
    otherLabel,
    fill,
    free,
    paid,
    paywall: { price, purchasing, notice, onBuy: handleBuy },
    onShare: handleShare,
  });
  const lastPage = pageIndex === pages.length - 1;
  return (
    <ReportPager
      pages={pages}
      pageIndex={Math.min(pageIndex, pages.length - 1)}
      onPageIndexChange={setPageIndex}
      onBack={onBack}
      labels={{ back: strings.common.backLabel, previous: strings.report.previousPageLabel, next: strings.report.nextPageLabel }}
      // The paywall page has its own buttons near the edges.
      edgeTaps={!!paid || !lastPage}
      swipeHint={{ id: "compat", label: strings.reader.swipeHint }}
      reviewAtEnd={!!paid}
      footer={
        paid && lastPage ? (
          <Pressable onPress={onBack} style={styles.homeButton} accessibilityRole="button">
            <Text style={styles.homeButtonLabel}>{strings.common.backLabel}</Text>
          </Pressable>
        ) : null
      }
    />
  );
}

// ------------------------------------------------------------------
// Reader pages
// ------------------------------------------------------------------

function compatReaderPages({
  strings,
  nickname,
  otherLabel,
  fill,
  free,
  paid,
  paywall,
  onShare,
}: {
  strings: Dictionary;
  nickname: string;
  otherLabel: string;
  fill: (text: string) => string;
  free: CompatFreePart;
  paid: CompatPaidPart | null;
  paywall: { price: string | null; purchasing: boolean; notice: string | null; onBuy: () => void };
  onShare: () => void;
}): ReaderPage[] {
  const s = strings.compatReport;
  const pages: ReaderPage[] = [];
  pages.push({ key: "meeting", node: <SectionPage eyebrow={s.chapterMeeting} title={fill(free.meeting.heading)} body={fill(free.meeting.body)} /> });
  pages.push({ key: "gifts", node: <SectionPage eyebrow={s.chapterGifts} title={fill(free.gifts.heading)} body={fill(free.gifts.body)} /> });

  if (!paid) {
    pages.push({ key: "paywall", node: <PaywallPage strings={strings} otherLabel={otherLabel} {...paywall} /> });
  } else {
    paid.friction.forEach((f, i) => {
      pages.push({
        key: `friction-${i}`,
        node: <SectionPage eyebrow={`${s.chapterFriction} · ${s.frictionCount(i + 1, paid.friction.length)}`} title={fill(f.title)} body={fill(f.body)} />,
      });
    });
    pages.push({ key: "rhythm", node: <SectionPage eyebrow={s.chapterRhythm} title={fill(paid.rhythm.heading)} body={fill(paid.rhythm.body)} /> });
    pages.push({
      key: "closing",
      node: (
        <ReportClosingPage
          title={s.chapterClosing}
          body={fill(paid.closing)}
          summaryEyebrow={strings.reader.summaryEyebrow}
          summary={fill(free.subtitle)}
          share={{ label: strings.reader.shareLabel, onPress: onShare }}
          disclaimers={[s.noVerdictNote, strings.report.disclaimer1]}
        />
      ),
    });
  }

  pages.unshift({
    key: "cover",
    node: <CoverPage eyebrow={s.coverEyebrow} title={fill(free.title)} subtitle={fill(free.subtitle)} names={`${nickname} · ${otherLabel}`} />,
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

function CoverPage({ eyebrow, title, subtitle, names }: { eyebrow: string; title: string; subtitle: string; names: string }) {
  return (
    <View style={pageStyles.cover}>
      <View style={pageStyles.brandRow}>
        <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={pageStyles.brandLabel}>FATESAID</Text>
      </View>
      <Text style={pageStyles.eyebrow}>{eyebrow}</Text>
      <View style={pageStyles.coverMid}>
        <Text style={pageStyles.coverName}>{names}</Text>
        <Text style={pageStyles.coverTitle} accessibilityRole="header">
          {title}
        </Text>
        <View style={pageStyles.coverRule} />
        <Text style={pageStyles.coverSub}>{subtitle}</Text>
        <View style={pageStyles.coverSource}>
          <CalcSourceBadge align="start" />
        </View>
      </View>
    </View>
  );
}

function SectionPage({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <PageScroll>
      <Text style={pageStyles.eyebrow}>{eyebrow}</Text>
      <Text style={pageStyles.title} accessibilityRole="header">
        {title}
      </Text>
      {paragraphs(body).map((p, i) => (
        <Text key={i} style={pageStyles.body}>
          {p}
        </Text>
      ))}
    </PageScroll>
  );
}

function PaywallPage({
  strings,
  otherLabel,
  price,
  purchasing,
  notice,
  onBuy,
}: {
  strings: Dictionary;
  otherLabel: string;
  price: string | null;
  purchasing: boolean;
  notice: string | null;
  onBuy: () => void;
}) {
  const s = strings.compatReport;
  const locked = [s.lockedFriction, s.chapterRhythm, s.chapterClosing];
  return (
    <PageScroll>
      <Text style={pageStyles.eyebrow}>{s.paywallEyebrow}</Text>
      <Text style={pageStyles.title} accessibilityRole="header">
        {s.paywallHeading}
      </Text>
      <Text style={pageStyles.paywallBody}>{s.paywallBody}</Text>
      <View style={pageStyles.list}>
        {locked.map((label, i) => (
          <View key={label} style={[pageStyles.lockedRow, i > 0 && pageStyles.rowDivider]}>
            <Lock size={16} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={pageStyles.lockedLabel}>{label}</Text>
          </View>
        ))}
      </View>
      <Pressable style={[pageStyles.buyButton, purchasing && pageStyles.buttonDisabled]} onPress={onBuy} disabled={purchasing} accessibilityRole="button">
        {purchasing ? <ActivityIndicator color={COLORS.ctaText} /> : <Text style={pageStyles.buyLabel}>{s.buyButton(price)}</Text>}
      </Pressable>
      <Text style={pageStyles.oneTime}>{price ? s.oneTimeNote(otherLabel) : `${strings.yearReport.priceAtCheckout} ${s.oneTimeNote(otherLabel)}`}</Text>
      {notice && <Text style={pageStyles.notice}>{notice}</Text>}
      <Text style={pageStyles.disclaimer}>{s.noVerdictNote}</Text>
    </PageScroll>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  backRow: { ...readableColumn, paddingHorizontal: 22, paddingTop: 8 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", minHeight: 44, marginLeft: -8, paddingHorizontal: 8 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 16 },
  centerText: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline, textAlign: "center" },
  retryButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12 },
  retryLabel: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.gold },
  homeButton: { marginHorizontal: 22, marginBottom: 16, marginTop: 6, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  homeButtonLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.headline },
});

const pageStyles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 26, paddingTop: 20, paddingBottom: 40 },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold, marginBottom: 12 },
  title: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, lineHeight: 33, color: COLORS.headline, marginBottom: 18 },
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 25, color: COLORS.headline, marginBottom: 16 },

  cover: { flex: 1, paddingHorizontal: 26, paddingTop: 20, paddingBottom: 24 },
  coverMid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  coverName: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline, marginBottom: 14 },
  coverTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 32, lineHeight: 40, color: COLORS.headline },
  coverRule: { width: 30, height: 1, backgroundColor: COLORS.gold, marginVertical: 18 },
  coverSub: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23, color: COLORS.subheadline },
  coverSource: { marginTop: 22 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 18 },
  brandLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 3, color: COLORS.gold, textTransform: "uppercase" },

  paywallBody: { fontFamily: FONTS.regular, fontSize: 14.5, lineHeight: 22, color: COLORS.subheadline, marginBottom: 18 },
  list: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, overflow: "hidden" },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.border },
  lockedRow: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 48, paddingHorizontal: 16, paddingVertical: 10 },
  lockedLabel: { flex: 1, fontFamily: FONTS.medium, fontSize: 14.5, lineHeight: 20, color: COLORS.headline },
  buyButton: { backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 15, alignItems: "center", marginTop: 22, minHeight: 50, justifyContent: "center" },
  buyLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  buttonDisabled: { opacity: 0.6 },
  oneTime: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: 12 },
  notice: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.danger, textAlign: "center", marginTop: 8 },
  disclaimer: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 17, color: COLORS.footer, marginTop: 20 },
});
