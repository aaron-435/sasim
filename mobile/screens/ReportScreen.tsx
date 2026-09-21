import { ArrowLeft, BookOpen, Download, Lock, Sparkles } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings, type Dictionary } from "../lib/i18n";
import { getRevenueCatUserId, isUnavailableMessage, purchaseIssueDetail, purchaseReportBundle, purchaseReportModule, restoreReports } from "../lib/purchases";
import { findTopAnswers, INTENSITY_LABEL } from "../lib/quiz/quizProfile";
import { isReportUnlocked, ownedReportCount } from "../lib/reportEntitlement";
import { elementWithEmoji } from "../lib/elements";
import { saveReport } from "../lib/reportStorage";
import { exportReportPdf, pdfErrorMessage } from "../lib/reportPdf";
import { BUNDLE_PRICE, bundleDiscountPercent, formatUsd, fullIndividualTotal, REPORT_PRICE, TOTAL_MODULES } from "../lib/reportPricing";
import { COLORS } from "../theme/colors";
import type { ChatExtract } from "./ChatScreen";
import type { QuizDiagnosis } from "./QuizScreen";

const ELEMENT_COLOR: Record<string, string> = {
  wood: "#4E8368",
  fire: "#C1503B",
  earth: "#B98A4E",
  metal: "#C7CAD1",
  water: "#3E6EA0",
};
const ELEMENT_KEYS = ["wood", "fire", "earth", "metal", "water"] as const;
const DIMENSION_BAR_COLORS = ["#C1503B", "#3E6EA0", "#B98A4E", "#4E8368", "#8B6BB0"];
const DEFAULT_ELEMENTS: Record<string, number> = { fire: 20, earth: 20, wood: 20, metal: 20, water: 20 };
const PAPER_BG = "#EFE7D8";

/** Puts each sentence on its own line so a page reads as short deliberate beats instead of one
 * dense block. It breaks at sentence ends only — an earlier version also broke at every comma,
 * which chopped longer 3-sentence pages into a ragged, poem-like column. A sentence that is
 * still too long for one line wraps normally. No space follows the "." in a decimal
 * (e.g. "14.99"), so numbers are safe. */
/** Hanja are never shown in the app (elements carry an emoji instead). New reports are cleaned on the
 * server; this also cleans reports saved on the device before that ("화(火)", "대운(大運)"). */
function noHanja(text: string): string {
  return text
    .replace(/([목화토금수])\s?\(([木火土金水])\)/g, "$1")
    .replace(/\s?\([\u4E00-\u9FFF]+\)/g, "")
    .replace(/[\u4E00-\u9FFF]/g, "");
}

function sentenceLines(text: string): string {
  return noHanja(text)
    .split(/(?<=[.!?…。])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join("\n");
}

type ElementReading = { heading: string; body: string };

export type ReportContent = {
  /** Present while the paid half is still sealed on the server (2026-09-20): the fields
   * below that belong to the paid pages come back empty until /api/report/unlock opens them
   * for a confirmed purchase. */
  locked_token?: string;
  /** Item counts of the sealed half, sent with the token so page counts don't change on unlock. */
  locked_shape?: { cross_analysis_quotes: number; strengths: number; weaknesses: number; behavior_guides: number };
  title_line1: string;
  title_line2: string;
  subtitle: string;
  opening_scene: string;
  case_tag: string;
  case_paragraphs: string[];
  /** 2026-09-20: short reading under the element bar chart (absent in older saved reports). */
  oheng_intro?: string;
  /** 2026-09-20: short reading under the psych-test bars (absent in older saved reports). */
  quiz_reading?: string;
  element_readings: Record<string, ElementReading>;
  upcoming_period_heading: string;
  upcoming_period_body: string;
  cross_analysis_quotes: string[];
  answer_notes: string[];
  /** 2026-09-20: a written reading under each chat-derived page (absent in older saved reports). */
  chat_snapshot_note?: string;
  chat_trigger_note?: string;
  chat_repeat_note?: string;
  chat_fear_note?: string;
  psychology_fact_heading: string;
  psychology_fact_body: string;
  psychology_takeaway: string;
  strengths: { title: string; body: string }[];
  weaknesses: { title: string; body: string }[];
  fit_good: string;
  fit_bad: string;
  behavior_guides: { title: string; body: string }[];
  mindset_guide: string;
  closing_title: string;
  closing_body: string;
};

type PageDef = {
  key: string;
  tocLabel?: string;
  locked?: boolean;
  node: React.ReactNode;
};

// 2026-09-14 rewrite — replaces the old single continuous ScrollView (13 sections) with a
// paginated, page-per-idea reader (confirmed design direction: see the "리포트 플립북"
// prototype). Each atomic idea (one strength, one element reading, one quote) now gets its
// own full screen instead of being bundled into a long scroll — this is also what makes the
// report substantially longer without padding: more real content units, not denser text.
export default function ReportScreen({
  nickname,
  elements,
  decadeFortune,
  currentAge,
  dayMaster,
  quizDiagnosis,
  chatExtract,
  sessionId,
  savedContent,
  onBack,
}: {
  nickname: string;
  elements: Record<string, number> | null;
  decadeFortune?: unknown;
  /** The reader's Day Master from the engine; lets the report explain how their elements relate to it. */
  dayMaster?: { char: string; element: string } | null;
  currentAge?: number;
  quizDiagnosis: QuizDiagnosis;
  chatExtract: ChatExtract | null;
  sessionId: string;
  /** A report reopened from "My reports" — skips generation entirely. */
  savedContent?: ReportContent | null;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  // Read live (not once at module load) so rotation, iPad Split View and window resizes
  // keep the pager's page width and offsets correct.
  const { width: screenWidth } = useWindowDimensions();
  const LOADING_MESSAGES = strings.report.loadingMessages;
  const [content, setContent] = useState<ReportContent | null>(savedContent ?? null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockState, setUnlockState] = useState<"idle" | "working" | "failed">("idle");
  const [ownedCount, setOwnedCount] = useState(0);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const firedRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const [exporting, setExporting] = useState(false);
  const resolvedElements = elements ?? DEFAULT_ELEMENTS;

  // The single highest-scoring (most extreme) literal answer for each of this module's
  // psych-test dimensions — sorted by how prominent that dimension is (percentOfMax desc)
  // so the narrative goes from most-to-least defining. Computed once and reused both for
  // the /api/report request (so the model can write a real note about each one) and for
  // rendering the matching AnswerQuotePage below.
  const topAnswers = useMemo(() => {
    return (quizDiagnosis.dimensionResults ?? [])
      .slice()
      .sort((a, b) => b.percentOfMax - a.percentOfMax)
      .map((r) => {
        const top = findTopAnswers(quizDiagnosis.answers, r.dimension, 1)[0];
        if (!top) return null;
        return { dimension: r.dimension, dimensionLabel: quizDiagnosis.dimensionShortNames?.[r.dimension] ?? r.dimension, prompt: top.prompt, label: top.label };
      })
      .filter((x): x is { dimension: string; dimensionLabel: string; prompt: string; label: string } => !!x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizDiagnosis]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (content) return;
    const id = setInterval(() => setLoadingMsgIndex((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1)), 7000);
    return () => clearInterval(id);
  }, [content]);

  async function fetchReport() {
    setErrorText(null);
    // The report is written, checked and reviewed before it is shown (up to ~2 minutes) — give up
    // after 175s (the server stops at 180s) instead of spinning forever.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 175_000);
    try {
      // Sent so the server can confirm a purchase and include the paid half right away; without
      // one (or if it can't confirm) that half comes back sealed instead.
      const appUserId = await getRevenueCatUserId();
      const res = await fetch(`${API_BASE_URL}/api/report`, {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          moduleId: quizDiagnosis.moduleId,
          appUserId,
          context: {
            nickname,
            track: quizDiagnosis.track,
            elements: resolvedElements,
            decadeFortune,
            currentAge,
            dayMaster: dayMaster ?? undefined,
            moduleTitle: quizDiagnosis.moduleTitle,
            psychTestTypeTitle: quizDiagnosis.typeInfo?.title ?? "",
            psychTestTypeHook: quizDiagnosis.typeInfo?.hook ?? "",
            dimensionResults: (quizDiagnosis.dimensionResults ?? []).map((r) => ({
              dimension: r.dimension,
              direction: r.direction,
              percentOfMax: r.percentOfMax,
              intensity: r.intensity,
            })),
            dimensionShortNames: quizDiagnosis.dimensionShortNames ?? {},
            nuancedSummary: quizDiagnosis.nuancedSummary ?? "",
            topAnswers,
            chatExtract: chatExtract ?? null,
            locale,
          },
        }),
      });
      const json = await res.json();
      if (!mountedRef.current) return;
      if (!res.ok) {
        // Never show json.error: the server's messages are Korean, whatever the app locale.
        setErrorText(res.status === 429 ? strings.report.errorRateLimited : strings.report.errorDefault);
        return;
      }
      setContent(json);
      // Keep a local copy so the report can be reopened after leaving this screen.
      saveReport({ moduleId: quizDiagnosis.moduleId, moduleTitle: quizDiagnosis.moduleTitle, quizDiagnosis, chatExtract: chatExtract ?? null, content: json });
    } catch {
      if (!mountedRef.current) return;
      setErrorText(strings.report.errorNetwork);
    } finally {
      clearTimeout(timeout);
    }
  }

  useEffect(() => {
    if (firedRef.current || savedContent) return;
    firedRef.current = true;
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The paid half is complete only once there is no sealed token left.
  const lockedOpen = unlocked && !!content && !content.locked_token;

  // Bought (or restored) but the paid half is still sealed → ask the server to open it. It
  // re-checks the purchase itself, so this can't be talked into opening anything early.
  async function unlockReport() {
    if (!content?.locked_token) return;
    setUnlockState("working");
    const appUserId = await getRevenueCatUserId();
    if (!appUserId) {
      setUnlockState("failed");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/report/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: content.locked_token, appUserId }),
      });
      const json = await res.json();
      if (!mountedRef.current) return;
      if (res.ok) {
        const { locked_token: _sealed, ...rest } = content;
        const merged = { ...rest, ...json.locked } as ReportContent;
        setContent(merged);
        setUnlockState("idle");
        saveReport({ moduleId: quizDiagnosis.moduleId, moduleTitle: quizDiagnosis.moduleTitle, quizDiagnosis, chatExtract: chatExtract ?? null, content: merged });
      } else if (json?.code === "invalid_token") {
        // A token we can no longer open (server key rotated): regenerate — a confirmed buyer
        // gets the full report straight away.
        setUnlockState("idle");
        setContent(null);
        fetchReport();
      } else {
        setUnlockState("failed");
      }
    } catch {
      if (mountedRef.current) setUnlockState("failed");
    }
  }

  useEffect(() => {
    if (unlocked && content?.locked_token && unlockState === "idle") unlockReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, content?.locked_token, unlockState]);

  const refreshEntitlement = useCallback(async () => {
    const [u, c] = await Promise.all([isReportUnlocked(quizDiagnosis.moduleId), ownedReportCount()]);
    if (!mountedRef.current) return;
    setUnlocked(u);
    setOwnedCount(c);
  }, [quizDiagnosis.moduleId]);

  useEffect(() => {
    refreshEntitlement();
  }, [refreshEntitlement]);

  async function handleBuyModule() {
    if (purchasing || restoring) return;
    setPurchasing(true);
    setPurchaseNotice(null);
    const outcome = await purchaseReportModule(quizDiagnosis.moduleId);
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      await refreshEntitlement();
    } else if (outcome.status === "error") {
      setPurchaseNotice(isUnavailableMessage(outcome.message) ? `${strings.report.purchaseUnavailable}${purchaseIssueDetail(outcome.message) ? `\n(${purchaseIssueDetail(outcome.message)})` : ""}` : `${strings.report.purchaseErrorDefault}${outcome.message ? `\n(${outcome.message.slice(0, 160)})` : ""}`);
    }
  }

  async function handleBuyBundle() {
    if (purchasing || restoring) return;
    setPurchasing(true);
    setPurchaseNotice(null);
    const outcome = await purchaseReportBundle();
    if (!mountedRef.current) return;
    setPurchasing(false);
    if (outcome.status === "success") {
      await refreshEntitlement();
    } else if (outcome.status === "error") {
      setPurchaseNotice(isUnavailableMessage(outcome.message) ? `${strings.report.purchaseUnavailable}${purchaseIssueDetail(outcome.message) ? `\n(${purchaseIssueDetail(outcome.message)})` : ""}` : `${strings.report.purchaseErrorDefault}${outcome.message ? `\n(${outcome.message.slice(0, 160)})` : ""}`);
    }
  }

  async function handleRestore() {
    if (purchasing || restoring) return;
    setRestoring(true);
    setPurchaseNotice(null);
    const countBefore = ownedCount;
    const ok = await restoreReports();
    if (!mountedRef.current) return;
    if (!ok) {
      // A failed request is not the same as "nothing to restore".
      setRestoring(false);
      setPurchaseNotice(strings.report.restoreFailed);
      return;
    }
    const newCount = await ownedReportCount();
    if (!mountedRef.current) return;
    setRestoring(false);
    if (ok && newCount > countBefore) {
      setOwnedCount(newCount);
      setUnlocked(await isReportUnlocked(quizDiagnosis.moduleId));
    } else {
      setPurchaseNotice(strings.report.restoreNotFound);
    }
  }

  const pages = useMemo<PageDef[]>(() => {
    if (!content) return [];
    // While the paid half is sealed its arrays arrive empty; lay the pages out from the sealed
    // half's item counts instead so the TOC, page totals and the paywall note are the same
    // before and after buying (the placeholder pages are replaced by the paywall anyway).
    const shape = content.locked_shape;
    const placeholders = <T,>(real: T[], count: number | undefined, blank: T): T[] =>
      real.length > 0 ? real : Array.from({ length: count ?? 0 }, () => blank);
    const crossList = placeholders(content.cross_analysis_quotes, shape?.cross_analysis_quotes, "");
    const strengthsList = placeholders(content.strengths, shape?.strengths, { title: "", body: "" });
    const weaknessesList = placeholders(content.weaknesses, shape?.weaknesses, { title: "", body: "" });
    const guidesList = placeholders(content.behavior_guides, shape?.behavior_guides, { title: "", body: "" });

    const sortedKeys = ELEMENT_KEYS.slice().sort((a, b) => (resolvedElements[b] ?? 0) - (resolvedElements[a] ?? 0));
    const dominantKey = sortedKeys[0];

    const body: PageDef[] = [];

    body.push({
      key: "opening",
      tocLabel: strings.report.sectionOpeningScene,
      node: <NarrativePage body={content.opening_scene} caption={`${nickname}${strings.report.nicknameSuffix}`} />,
    });

    body.push({
      key: "quiz-analysis",
      tocLabel: strings.report.sectionQuizAnalysisToc,
      node: (
        <QuizAnalysisPage
          title={quizDiagnosis.typeInfo?.title ?? ""}
          subtitle={`${quizDiagnosis.moduleTitle ?? strings.report.defaultModuleTitle} ${strings.report.quizAnalysisSuffix}`}
          hook={quizDiagnosis.typeInfo?.hook}
          dimensionResults={quizDiagnosis.dimensionResults}
          dimensionShortNames={quizDiagnosis.dimensionShortNames}
          nuancedSummary={quizDiagnosis.nuancedSummary}
          reading={content.quiz_reading}
          locale={locale}
        />
      ),
    });

    content.case_paragraphs.forEach((p, i) => {
      body.push({
        key: `case-${i}`,
        tocLabel: i === 0 ? strings.report.sectionCaseStudy : undefined,
        node: <CaseStudyPage tag={i === 0 ? content.case_tag : undefined} body={p} />,
      });
    });

    body.push({
      key: "oheng-overview",
      tocLabel: strings.report.sectionSajuPatternSubtitle,
      node: <OhengBarsPage title={strings.report.sectionSajuPattern} elements={resolvedElements} dominantKey={dominantKey} intro={content.oheng_intro} />,
    });

    sortedKeys.forEach((key) => {
      const reading = content.element_readings[key];
      if (!reading) return;
      body.push({
        key: `element-${key}`,
        node: <ElementReadingPage pct={resolvedElements[key] ?? 0} reading={reading} elementKey={key} />,
      });
    });

    // ---- everything below this line is the paid half of the report ----

    body.push({
      key: "upcoming",
      tocLabel: strings.report.sectionUpcomingPeriod,
      locked: true,
      node: <ForecastPage heading={content.upcoming_period_heading} body={content.upcoming_period_body} note={strings.report.upcomingPeriodNote} />,
    });

    if (chatExtract) {
      body.push({
        key: "chat-story",
        tocLabel: strings.report.sectionChatStory,
        locked: true,
        node: <ChatStoryPage chatExtract={chatExtract} strings={strings} />,
      });

      const concern = chatExtract.primary_concern;
      const emotion = chatExtract.emotional_state;
      if ((typeof concern === "string" && concern.trim()) || (typeof emotion === "string" && emotion.trim())) {
        body.push({
          key: "chat-snapshot",
          locked: true,
          node: (
            <ConcernSnapshotPage
              eyebrow={strings.report.chatSnapshotEyebrow}
              concernLabel={strings.report.chatConcernLabel}
              concern={typeof concern === "string" ? concern : ""}
              emotionLabel={strings.report.chatEmotionLabel}
              emotion={typeof emotion === "string" ? emotion : ""}
              note={content.chat_snapshot_note}
            />
          ),
        });
      }

      const trigger = chatExtract.trigger_point;
      if (typeof trigger === "string" && trigger.trim()) {
        body.push({
          key: "chat-trigger",
          locked: true,
          node: <QuotePage eyebrow={strings.report.chatTriggerEyebrow} quote={trigger} note={content.chat_trigger_note} />,
        });
      }

      const repeatPattern = chatExtract.repeat_pattern;
      if (typeof repeatPattern === "string" && repeatPattern.trim()) {
        body.push({
          key: "chat-repeat-pattern",
          locked: true,
          node: <QuotePage eyebrow={strings.report.chatRepeatPatternEyebrow} quote={repeatPattern} note={content.chat_repeat_note} />,
        });
      }

      const coreFear = chatExtract.core_fear_or_meaning;
      if (typeof coreFear === "string" && coreFear.trim()) {
        body.push({
          key: "chat-core-fear",
          locked: true,
          node: <QuotePage eyebrow={strings.report.chatCoreFearEyebrow} quote={coreFear} note={content.chat_fear_note} />,
        });
      }
    }

    topAnswers.forEach((a, i) => {
      body.push({
        key: `quiz-answer-${i}`,
        tocLabel: i === 0 ? strings.report.sectionAnswerQuotesToc : undefined,
        locked: true,
        node: (
          <AnswerQuotePage
            eyebrow={strings.report.quizAnswerEyebrow(a.dimensionLabel)}
            prompt={a.prompt}
            answer={a.label}
            note={content.answer_notes[i]}
          />
        ),
      });
    });

    crossList.forEach((q, i) => {
      body.push({
        key: `cross-${i}`,
        tocLabel: i === 0 ? strings.report.sectionCrossAnalysisToc : undefined,
        locked: true,
        node: <QuotePage quote={q} leadOnly />,
      });
    });

    body.push({
      key: "breather",
      locked: true,
      node: (
        <BreatherPage
          label={strings.report.breatherLabel}
          heading={content.psychology_fact_heading}
          body={content.psychology_fact_body}
          takeawayLabel={strings.report.takeawayBold}
          takeaway={content.psychology_takeaway}
        />
      ),
    });

    strengthsList.forEach((s, i) => {
      body.push({
        key: `strength-${i}`,
        tocLabel: i === 0 ? strings.report.sectionStrengthsWeaknessesToc : undefined,
        locked: true,
        node: <CardPage kind="jade" indexLabel={strings.report.strengthIndex(i + 1, strengthsList.length)} title={s.title} body={s.body} />,
      });
    });

    weaknessesList.forEach((w, i) => {
      body.push({
        key: `weakness-${i}`,
        locked: true,
        node: <CardPage kind="warm" indexLabel={strings.report.weaknessIndex(i + 1, weaknessesList.length)} title={w.title} body={w.body} />,
      });
    });

    body.push({ key: "fit-good", locked: true, node: <FitPage kind="good" label={strings.report.fitGoodLabel} body={content.fit_good} /> });
    body.push({ key: "fit-bad", locked: true, node: <FitPage kind="bad" label={strings.report.fitBadLabel} body={content.fit_bad} /> });

    guidesList.forEach((g, i) => {
      body.push({
        key: `behavior-${i}`,
        tocLabel: i === 0 ? strings.report.sectionBehaviorMindsetToc : undefined,
        locked: true,
        node: <CardPage kind="blue" indexLabel={strings.report.guideIndex(i + 1, guidesList.length)} title={g.title} body={g.body} />,
      });
    });

    body.push({ key: "mindset", locked: true, node: <MindsetPage label={strings.report.sectionMindset} body={content.mindset_guide} /> });

    body.push({
      key: "closing",
      tocLabel: strings.report.tocClosing,
      locked: true,
      node: <ClosingPage title={content.closing_title} body={content.closing_body} disclaimer1={strings.report.disclaimer1} disclaimer2={strings.report.disclaimer2} />,
    });

    const tocEntries = body
      .map((p, i) => (p.tocLabel ? { label: p.tocLabel, pageNumber: i + 3, locked: !lockedOpen && !!p.locked } : null))
      .filter((x): x is { label: string; pageNumber: number; locked: boolean } => !!x);

    const lockedTotal = body.filter((p) => p.locked).length;
    // One paywall page in place of every locked page (was ~29 identical copies to swipe
    // through). The full page count still shows on the cover and in the paywall note.
    let paywallPlaced = false;
    const gated = body.flatMap((p): PageDef[] => {
      if (lockedOpen || !p.locked) return [p];
      if (paywallPlaced) return [];
      paywallPlaced = true;
      return [
        {
          ...p,
          node: unlocked ? (
            // Bought, but the sealed half hasn't been opened yet (or opening failed).
            <UnlockingPage strings={strings} failed={unlockState === "failed"} onRetry={() => setUnlockState("idle")} />
          ) : (
            <PaywallPage
              ownedCount={ownedCount}
              lockedCount={lockedTotal}
              totalCount={body.length + 2}
              strings={strings}
              purchasing={purchasing}
              restoring={restoring}
              purchaseNotice={purchaseNotice}
              onBuyModule={handleBuyModule}
              onBuyBundle={handleBuyBundle}
              onRestore={handleRestore}
            />
          ),
        },
      ];
    });

    const total = body.length + 2;

    return [
      { key: "cover", node: <CoverPage title1={content.title_line1} title2={content.title_line2} subtitle={content.subtitle} nickname={`${nickname}${strings.report.nicknameSuffix}`} previewLabel={lockedOpen ? "" : strings.report.previewLabel} totalPagesLabel={lockedOpen ? strings.report.totalPagesLabel(total) : strings.report.previewPagesLabel(body.filter((p) => !p.locked).length + 2, total)} /> },
      { key: "toc", node: <TocPage eyebrow={strings.report.tocEyebrow} title={strings.report.tocTitle} entries={tocEntries} /> },
      ...gated,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, resolvedElements, chatExtract, unlocked, lockedOpen, unlockState, ownedCount, purchasing, restoring, purchaseNotice, strings, locale, quizDiagnosis, nickname, topAnswers]);

  // PDF of the whole report — only offered once it's unlocked. The server re-verifies the
  // purchase (app/api/report-pdf), so this button is a convenience, not the gate.
  async function handleExportPdf() {
    if (exporting || !content) return;
    setExporting(true);
    const result = await exportReportPdf(
      {
        kind: "deep",
        moduleId: quizDiagnosis.moduleId,
        locale,
        nickname,
        content,
        extras: {
          moduleTitle: quizDiagnosis.moduleTitle,
          typeTitle: quizDiagnosis.typeInfo?.title ?? "",
          typeHook: quizDiagnosis.typeInfo?.hook ?? "",
          nuancedSummary: quizDiagnosis.nuancedSummary ?? "",
          dimensions: (quizDiagnosis.dimensionResults ?? []).map((r) => ({
            name: quizDiagnosis.dimensionShortNames?.[r.dimension] ?? r.dimension,
            percent: r.percentOfMax,
          })),
          elements: resolvedElements,
          topAnswers: topAnswers.map((a) => ({ dimensionLabel: a.dimensionLabel, prompt: a.prompt, answer: a.label })),
          chat: chatExtract ?? null,
        },
      },
      strings.pdf.dialogTitle,
    );
    if (!mountedRef.current) return;
    setExporting(false);
    if (!result.ok) Alert.alert(strings.pdf.button, pdfErrorMessage(result.reason, strings.pdf));
  }

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(pages.length - 1, index));
    scrollRef.current?.scrollTo({ x: clamped * screenWidth, animated: true });
    setPageIndex(clamped);
  }

  function handleMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const idx = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setPageIndex(idx);
  }

  if (errorText) {
    return (
      <SafeAreaView style={styles.centerRoot}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorText}</Text>
          <Pressable onPress={fetchReport} style={styles.retryButton}>
            <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
          </Pressable>
          <Pressable onPress={onBack} style={styles.retryButton}>
            <Text style={styles.backLabel}>{strings.report.homeLinkLabel}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!content || pages.length === 0) {
    return (
      <SafeAreaView style={styles.centerRoot}>
        <ActivityIndicator color={COLORS.gold} size="large" />
        <Text style={styles.loadingText}>{LOADING_MESSAGES[loadingMsgIndex]}</Text>
      </SafeAreaView>
    );
  }

  const progressPct = ((pageIndex + 1) / pages.length) * 100;
  const onPaywall = !lockedOpen && !!pages[pageIndex]?.locked;

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <View style={styles.chrome}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.chromeBack} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
        </Pressable>
        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: pages.length, now: pageIndex + 1, text: `${pageIndex + 1} / ${pages.length}` }}
          aria-valuemin={0}
          aria-valuemax={pages.length}
          aria-valuenow={pageIndex + 1}
          aria-valuetext={`${pageIndex + 1} / ${pages.length}`}
        >
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
        <Text style={styles.progressCount} accessibilityLiveRegion="polite">
          {String(pageIndex + 1).padStart(2, "0")}/{String(pages.length).padStart(2, "0")}
        </Text>
        {lockedOpen && (
          <Pressable
            onPress={handleExportPdf}
            disabled={exporting}
            hitSlop={8}
            style={styles.chromePdf}
            accessibilityRole="button"
            accessibilityLabel={exporting ? strings.pdf.preparing : strings.pdf.button}
          >
            {exporting ? <ActivityIndicator size="small" color={COLORS.subheadline} /> : <Download size={18} strokeWidth={1.75} color={COLORS.subheadline} />}
          </Pressable>
        )}
      </View>

      <View style={styles.pagerWrap}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumEnd}
        >
          {pages.map((p) => (
            <View key={p.key} style={{ width: screenWidth }}>
              {p.node}
            </View>
          ))}
        </ScrollView>

        {/* Edge tap zones only, and none on a paywall page. These used to cover the whole
            pager above the pages, so they sat on top of — and swallowed the taps meant
            for — the paywall's buy, bundle and restore buttons. Swiping still turns pages
            everywhere. */}
        {!onPaywall && (
          <>
            <Pressable
              style={styles.tapLeft}
              onPress={() => goTo(pageIndex - 1)}
              accessibilityRole="button"
              accessibilityLabel={strings.report.previousPageLabel}
            />
            <Pressable
              style={styles.tapRight}
              onPress={() => goTo(pageIndex + 1)}
              accessibilityRole="button"
              accessibilityLabel={strings.report.nextPageLabel}
            />
          </>
        )}
      </View>

      {pageIndex === pages.length - 1 && (
        <Pressable onPress={onBack} style={styles.homeButton}>
          <Text style={styles.homeButtonLabel}>{strings.report.homeButtonLabel}</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

// ------------------------------------------------------------------
// Page templates — one component per visual template, reused across
// however many real content items exist (e.g. CardPage renders every
// strength/weakness/behavior-guide, one per page).
// ------------------------------------------------------------------

function PageShell({ paper, children }: { paper?: boolean; children: React.ReactNode }) {
  return <View style={[pageStyles.shell, paper ? pageStyles.shellPaper : pageStyles.shellDark]}>{children}</View>;
}

function Eyebrow({ children, ink }: { children: React.ReactNode; ink?: boolean }) {
  return <Text style={[pageStyles.eyebrow, ink && pageStyles.eyebrowInk]}>{children}</Text>;
}

function CoverPage({
  title1,
  title2,
  subtitle,
  nickname,
  previewLabel,
  totalPagesLabel,
}: {
  title1: string;
  title2: string;
  subtitle: string;
  nickname: string;
  previewLabel: string;
  totalPagesLabel: string;
}) {
  return (
    <PageShell>
      <View style={pageStyles.brandRow}>
        <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={pageStyles.brandLabel}>FATESAID</Text>
      </View>
      <View style={pageStyles.coverMid}>
        <Eyebrow>{subtitle}</Eyebrow>
        <Text style={pageStyles.coverTitle}>
          {title1}
          {"\n"}
          {title2}
        </Text>
        <View style={pageStyles.coverRule} />
        <Text style={pageStyles.coverSub}>{nickname}</Text>
      </View>
      <View style={pageStyles.pageFoot}>
        <Text style={pageStyles.pageFootText}>{previewLabel}</Text>
        <Text style={pageStyles.pageFootText}>{totalPagesLabel}</Text>
      </View>
    </PageShell>
  );
}

function TocPage({ eyebrow, title, entries }: { eyebrow: string; title: string; entries: { label: string; pageNumber: number; locked: boolean }[] }) {
  return (
    <PageShell paper>
      <Text style={pageStyles.tocEyebrow}>{eyebrow}</Text>
      <Text style={pageStyles.tocTitle} accessibilityRole="header">{title}</Text>
      <View style={pageStyles.tocList}>
        {entries.map((e, i) => (
          <View key={e.label} style={pageStyles.tocRow}>
            <Text style={pageStyles.tocIdx}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={pageStyles.tocName} numberOfLines={2}>
              {e.label}
            </Text>
            <View style={pageStyles.tocDots} />
            {e.locked ? <Lock size={12} strokeWidth={2} color="#5C5237" /> : <Text style={pageStyles.tocPage}>{String(e.pageNumber).padStart(2, "0")}</Text>}
          </View>
        ))}
      </View>
    </PageShell>
  );
}

function NarrativePage({ body, caption }: { body: string; caption: string }) {
  return (
    <PageShell>
      <View style={pageStyles.narrativeMid}>
        <Text style={pageStyles.narrativeBody}>{sentenceLines(body)}</Text>
      </View>
      <Text style={pageStyles.narrativeCaption}>{caption}</Text>
    </PageShell>
  );
}

function CaseStudyPage({ tag, body }: { tag?: string; body: string }) {
  return (
    <PageShell>
      {tag && <Text style={pageStyles.caseTag}>{tag}</Text>}
      <Text style={pageStyles.caseBody}>{sentenceLines(body)}</Text>
    </PageShell>
  );
}

function QuizAnalysisPage({
  title,
  subtitle,
  hook,
  dimensionResults,
  dimensionShortNames,
  nuancedSummary,
  reading,
  locale,
}: {
  title: string;
  subtitle: string;
  hook?: string;
  dimensionResults?: QuizDiagnosis["dimensionResults"];
  dimensionShortNames?: Record<string, string>;
  nuancedSummary?: string;
  reading?: string;
  locale: ReturnType<typeof useLocale>["locale"];
}) {
  return (
    <PageShell>
      <Text style={pageStyles.dataTitle} accessibilityRole="header">{title}</Text>
      <Text style={pageStyles.dataSubtitle}>{subtitle}</Text>
      {hook && <Text style={pageStyles.caseBody}>{sentenceLines(hook)}</Text>}
      <View style={pageStyles.bars}>
        {dimensionResults?.map((r, i) => (
          <View key={r.dimension} style={pageStyles.barRow}>
            <View style={pageStyles.barLabelRow}>
              <Text style={pageStyles.barLabel}>{dimensionShortNames?.[r.dimension] ?? r.dimension}</Text>
              <Text style={pageStyles.barLabel}>
                {Math.round(r.percentOfMax)}% · {INTENSITY_LABEL[locale]?.[r.intensity] ?? r.intensity}
              </Text>
            </View>
            <View style={pageStyles.barTrack}>
              <View style={[pageStyles.barFill, { width: `${r.percentOfMax}%`, backgroundColor: DIMENSION_BAR_COLORS[i % DIMENSION_BAR_COLORS.length] }]} />
            </View>
          </View>
        ))}
      </View>
      {!!nuancedSummary && <Text style={pageStyles.dataNote}>{sentenceLines(nuancedSummary)}</Text>}
      {!!reading && <Text style={[pageStyles.dataNote, pageStyles.readingNote]}>{sentenceLines(reading)}</Text>}
    </PageShell>
  );
}

function OhengBarsPage({ title, elements, dominantKey, intro }: { title: string; elements: Record<string, number>; dominantKey: string; intro?: string }) {
  const strings = useStrings();
  return (
    <PageShell>
      <Text style={pageStyles.dataTitle} accessibilityRole="header">{title}</Text>
      <View style={pageStyles.bars}>
        {ELEMENT_KEYS.map((key) => (
          <View key={key} style={pageStyles.barRow}>
            <View style={pageStyles.barLabelRow}>
              <Text style={pageStyles.barLabel}>
                {elementWithEmoji(key, strings.common.elementLabels[key])}
              </Text>
              <Text style={pageStyles.barLabel}>{Math.round(elements[key] ?? 0)}%</Text>
            </View>
            <View style={pageStyles.barTrack}>
              <View style={[pageStyles.barFill, { width: `${elements[key] ?? 0}%`, backgroundColor: ELEMENT_COLOR[key] }]} />
            </View>
          </View>
        ))}
      </View>
      {!!intro && <Text style={pageStyles.dataNote}>{sentenceLines(intro)}</Text>}
    </PageShell>
  );
}

/** Element headings carry the element's emoji (older reports don't) and never a hanja. */
function headingWithEmoji(elementKey: string, heading: string): string {
  const clean = noHanja(heading).trim();
  return /^\p{Extended_Pictographic}/u.test(clean) ? clean : elementWithEmoji(elementKey, clean);
}

function ElementReadingPage({ pct, reading, elementKey }: { pct: number; reading: ElementReading; elementKey: string }) {
  return (
    <PageShell>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.elemNum}>{Math.round(pct)}%</Text>
        <Text style={pageStyles.elemHeading} accessibilityRole="header">{headingWithEmoji(elementKey, reading.heading)}</Text>
        <Text style={pageStyles.caseBody}>{sentenceLines(reading.body)}</Text>
      </View>
    </PageShell>
  );
}

function ForecastPage({ heading, body, note }: { heading: string; body: string; note: string }) {
  return (
    <PageShell>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.elemHeading} accessibilityRole="header">{heading}</Text>
        <Text style={pageStyles.caseBody}>{sentenceLines(body)}</Text>
      </View>
      <Text style={pageStyles.narrativeCaption}>{note}</Text>
    </PageShell>
  );
}

function ChatStoryPage({ chatExtract, strings }: { chatExtract: ChatExtract; strings: Dictionary }) {
  return (
    <PageShell>
      <Text style={pageStyles.caseBody}>{sentenceLines(strings.report.chatStoryIntro)}</Text>
      <View style={pageStyles.chatQuoteBox}>
        <View style={pageStyles.chatQuoteHeader}>
          <BookOpen size={13} strokeWidth={2} color="#7FA8D6" />
          <Text style={pageStyles.chatQuoteLabel}>{strings.report.chatQuoteLabel}</Text>
        </View>
        <Text style={pageStyles.chatQuoteText}>&quot;{String(chatExtract.summary_quote || chatExtract.trigger_point || "")}&quot;</Text>
      </View>
      {!!chatExtract.integrated_summary && <Text style={pageStyles.caseBody}>{sentenceLines(String(chatExtract.integrated_summary))}</Text>}
    </PageShell>
  );
}

/** The first sentence of `text` and everything after it. */
function splitLead(text: string): { lead: string; rest: string } {
  const m = text.match(/^(.+?[.!?…。]+)(\s+)([\s\S]+)$/);
  return m ? { lead: m[1], rest: m[3] } : { lead: text, rest: "" };
}

/** A pull-quote page. `note` is a written reading underneath (the chat pages quote the user's
 * own words, then say what they mean). `leadOnly` treats the text itself as "quote + reasoning":
 * the first sentence is the big quotable line, the rest is body text. */
function QuotePage({ quote, eyebrow, note, leadOnly }: { quote: string; eyebrow?: string; note?: string; leadOnly?: boolean }) {
  const { lead, rest } = leadOnly ? splitLead(quote) : { lead: quote, rest: note ?? "" };
  return (
    <PageShell>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <View style={pageStyles.quoteMid}>
        <Text style={pageStyles.pullQuote}>{sentenceLines(lead)}</Text>
        {!!rest && <Text style={[pageStyles.caseBody, pageStyles.answerNote]}>{sentenceLines(rest)}</Text>}
      </View>
    </PageShell>
  );
}

/** Quotes the user's own literal answer back at them — the exact question and the
 * exact option they picked (via findTopAnswers(), the highest-scoring/most-extreme
 * answer for their dominant psych-test dimension), instead of a paraphrased summary.
 * "이거 완전 나잖아" lands harder from the user's own words than from a description
 * of them. */
function AnswerQuotePage({ eyebrow, prompt, answer, note }: { eyebrow: string; prompt: string; answer: string; note?: string }) {
  return (
    <PageShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <View style={pageStyles.quoteMid}>
        <Text style={pageStyles.quotePrompt}>{prompt}</Text>
        <Text style={[pageStyles.pullQuote, pageStyles.answerQuoteSpacing]}>{sentenceLines(answer)}</Text>
        {!!note && <Text style={[pageStyles.caseBody, pageStyles.answerNote]}>{sentenceLines(note)}</Text>}
      </View>
    </PageShell>
  );
}

/** Two very short chat-extract fields (a 2-6자 noun phrase and a single emotion word) that
 * don't carry enough text for a pull-quote page on their own — shown together as a small
 * labeled snapshot instead. */
function ConcernSnapshotPage({
  eyebrow,
  concernLabel,
  concern,
  emotionLabel,
  emotion,
  note,
}: {
  eyebrow: string;
  concernLabel: string;
  concern: string;
  emotionLabel: string;
  emotion: string;
  note?: string;
}) {
  return (
    <PageShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <View style={pageStyles.elemMid}>
        {!!concern && (
          <>
            <Text style={pageStyles.quotePrompt}>{concernLabel}</Text>
            <Text style={pageStyles.snapshotValue}>{concern}</Text>
          </>
        )}
        {!!emotion && (
          <>
            <Text style={[pageStyles.quotePrompt, pageStyles.snapshotSecondLabel]}>{emotionLabel}</Text>
            <Text style={pageStyles.snapshotValue}>{emotion}</Text>
          </>
        )}
        {!!note && <Text style={[pageStyles.caseBody, pageStyles.answerNote]}>{sentenceLines(note)}</Text>}
      </View>
    </PageShell>
  );
}

function BreatherPage({
  label,
  heading,
  body,
  takeawayLabel,
  takeaway,
}: {
  label: string;
  heading: string;
  body: string;
  takeawayLabel: string;
  takeaway: string;
}) {
  return (
    <PageShell>
      <View style={pageStyles.breatherLabelBox}>
        <Text style={pageStyles.breatherLabelText}>{label}</Text>
      </View>
      <Text style={pageStyles.breatherTitle} accessibilityRole="header">{heading}</Text>
      <Text style={pageStyles.caseBody}>{sentenceLines(body)}</Text>
      <View style={pageStyles.takeawayBox}>
        <Text style={pageStyles.takeawayText}>
          <Text style={pageStyles.takeawayBold}>{takeawayLabel} </Text>
          {sentenceLines(takeaway)}
        </Text>
      </View>
    </PageShell>
  );
}

function CardPage({ kind, indexLabel, title, body }: { kind: "jade" | "warm" | "blue"; indexLabel: string; title: string; body: string }) {
  const color = kind === "jade" ? COLORS.gold : kind === "warm" ? "#C1846A" : "#7FA8D6";
  return (
    <PageShell>
      <Text style={[pageStyles.cardIndex, { color }]}>{indexLabel}</Text>
      <View style={pageStyles.cardMid}>
        <Text style={pageStyles.cardTitle} accessibilityRole="header">{title}</Text>
        <Text style={pageStyles.cardBody}>{sentenceLines(body)}</Text>
      </View>
    </PageShell>
  );
}

function FitPage({ kind, label, body }: { kind: "good" | "bad"; label: string; body: string }) {
  // Lighter tints than the element bar colors (#4E8368 / #C1503B were 3.8 / 3.6:1 as text).
  const color = kind === "good" ? COLORS.gold : "#D9917A";
  return (
    <PageShell>
      <View style={pageStyles.elemMid}>
        <Text style={[pageStyles.fitLabel, { color }]}>{label}</Text>
        <Text style={pageStyles.caseBody}>{sentenceLines(body)}</Text>
      </View>
    </PageShell>
  );
}

function MindsetPage({ label, body }: { label: string; body: string }) {
  return (
    <PageShell>
      <Eyebrow>{label}</Eyebrow>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.caseBody}>{sentenceLines(body)}</Text>
      </View>
    </PageShell>
  );
}

function ClosingPage({ title, body, disclaimer1, disclaimer2 }: { title: string; body: string; disclaimer1: string; disclaimer2: string }) {
  return (
    <PageShell>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.closingTitle} accessibilityRole="header">{title}</Text>
        <Text style={pageStyles.caseBody}>{sentenceLines(body)}</Text>
      </View>
      <View style={pageStyles.closingBrand}>
        <View style={pageStyles.brandRow}>
          <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={pageStyles.brandLabel}>FATESAID</Text>
        </View>
        <Text style={pageStyles.disclaimer}>{disclaimer1}</Text>
        <Text style={pageStyles.disclaimer}>{disclaimer2}</Text>
      </View>
    </PageShell>
  );
}

// Gates everything past the free preview (opening scene, case study, quiz analysis, saju
// analysis) — the actionable half of the report. Real IAP added 2026-09-16: the bundle
// (all 11 at a fixed price) is only offered while the user owns none of them yet, since
// neither store supports charging a price that depends on what's already owned — see
// lib/reportPricing.ts's header comment.
function UnlockingPage({ strings, failed, onRetry }: { strings: Dictionary; failed: boolean; onRetry: () => void }) {
  return (
    <PageShell>
      <View style={pageStyles.paywallMid}>
        <View style={pageStyles.paywallCard}>
          {failed ? (
            <>
              <Text style={pageStyles.paywallBody}>{strings.report.unlockFailed}</Text>
              <Pressable onPress={onRetry} style={pageStyles.paywallRestoreButton} accessibilityRole="button">
                <Text style={pageStyles.paywallRestoreLabel}>{strings.common.retryLabel}</Text>
              </Pressable>
            </>
          ) : (
            <>
              <ActivityIndicator color={COLORS.gold} />
              <Text style={pageStyles.paywallBody}>{strings.report.unlocking}</Text>
            </>
          )}
        </View>
      </View>
    </PageShell>
  );
}

function PaywallPage({
  ownedCount,
  lockedCount,
  totalCount,
  strings,
  purchasing,
  restoring,
  purchaseNotice,
  onBuyModule,
  onBuyBundle,
  onRestore,
}: {
  ownedCount: number;
  lockedCount: number;
  totalCount: number;
  strings: Dictionary;
  purchasing: boolean;
  restoring: boolean;
  purchaseNotice: string | null;
  onBuyModule: () => void;
  onBuyBundle: () => void;
  onRestore: () => void;
}) {
  const busy = purchasing || restoring;
  return (
    <PageShell>
      <View style={pageStyles.paywallMid}>
        <View style={pageStyles.paywallCard}>
          <Lock size={22} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={pageStyles.paywallTitle} accessibilityRole="header">{strings.report.paywallTitle}</Text>
          <Text style={pageStyles.paywallBody}>{strings.report.paywallBody}</Text>
          <Text style={pageStyles.paywallLockedNote}>{strings.report.paywallLockedNote(lockedCount, totalCount)}</Text>

          <Pressable style={[pageStyles.paywallBuyButton, busy && pageStyles.paywallButtonDisabled]} onPress={onBuyModule} disabled={busy}>
            {purchasing ? <ActivityIndicator color={COLORS.background} /> : <Text style={pageStyles.paywallBuyButtonLabel}>{strings.report.paywallBuyLabel(formatUsd(REPORT_PRICE))}</Text>}
          </Pressable>

          <Text style={pageStyles.paywallOneTime}>{strings.report.paywallOneTimeNote}</Text>

          {ownedCount < TOTAL_MODULES && (
            <Pressable style={[pageStyles.paywallBundleButton, busy && pageStyles.paywallButtonDisabled]} onPress={onBuyBundle} disabled={busy}>
              <Text style={pageStyles.paywallBundleButtonLabel}>{strings.report.paywallBundleBuyLabel(formatUsd(BUNDLE_PRICE))}</Text>
              <Text style={pageStyles.paywallBundleSub}>
                {ownedCount === 0
                  ? strings.report.paywallBundleSub(formatUsd(fullIndividualTotal()), bundleDiscountPercent())
                  : strings.report.paywallBundleSubOwned(ownedCount, formatUsd(fullIndividualTotal()))}
              </Text>
            </Pressable>
          )}

          <Pressable onPress={onRestore} disabled={busy} style={pageStyles.paywallRestoreButton} accessibilityRole="button">
            <Text style={pageStyles.paywallRestoreLabel}>{restoring ? strings.report.paywallRestoring : strings.report.paywallRestoreLabel}</Text>
          </Pressable>

          {!!purchaseNotice && <Text style={pageStyles.paywallNotice}>{purchaseNotice}</Text>}
        </View>
        <Text style={pageStyles.paywallDisclaimer}>{strings.report.disclaimer1}</Text>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  centerRoot: { flex: 1, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 16 },
  loadingText: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline, textAlign: "center" },
  errorCard: { width: "100%", backgroundColor: "rgba(203,98,73,0.08)", borderWidth: 1, borderColor: "rgba(203,98,73,0.35)", borderRadius: 12, padding: 16, gap: 12 },
  errorText: { fontFamily: "Manrope_400Regular", fontSize: 13, color: "#E0A296" },
  retryButton: { alignSelf: "flex-start", minHeight: 44, justifyContent: "center", paddingHorizontal: 4 },
  retryLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12.5, color: COLORS.gold },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 12.5, color: COLORS.subheadline },

  chrome: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  chromeBack: { padding: 10, minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center", marginLeft: -10 },
  chromePdf: { width: 44, height: 44, alignItems: "center", justifyContent: "center", marginRight: -10 },
  progressTrack: { flex: 1, height: 3, borderRadius: 2, backgroundColor: "rgba(217,201,163,0.16)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2, backgroundColor: COLORS.headline },
  progressCount: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: COLORS.subheadline, letterSpacing: 0.5, minWidth: 44, textAlign: "right" },

  pagerWrap: { flex: 1, position: "relative" },
  tapLeft: { position: "absolute", top: 0, bottom: 0, left: 0, width: "16%" },
  tapRight: { position: "absolute", top: 0, bottom: 0, right: 0, width: "16%" },

  homeButton: { marginHorizontal: 22, marginBottom: 16, marginTop: 6, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  homeButtonLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.headline },
});

const pageStyles = StyleSheet.create({
  shell: { flex: 1, paddingHorizontal: 26, paddingTop: 8, paddingBottom: 24 },
  shellDark: { backgroundColor: COLORS.background },
  shellPaper: { backgroundColor: PAPER_BG },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 18 },
  brandLabel: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 3, color: COLORS.gold, textTransform: "uppercase" },

  eyebrow: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.gold, marginBottom: 16 },
  eyebrowInk: { color: "#5C5237" },

  pageFoot: { marginTop: "auto", flexDirection: "row", justifyContent: "space-between" },
  pageFootText: { fontFamily: "Manrope_600SemiBold", fontSize: 12, letterSpacing: 1.5, color: COLORS.footer, textTransform: "uppercase" },

  coverMid: { flex: 1, justifyContent: "flex-start", paddingTop: "18%" },
  coverTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 27, lineHeight: 36, color: COLORS.headline, marginBottom: 4 },
  coverRule: { width: 30, height: 1, backgroundColor: COLORS.gold, marginVertical: 16 },
  coverSub: { fontFamily: "Manrope_500Medium", fontSize: 13, color: COLORS.headline },

  tocEyebrow: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#5C5237", marginTop: 24, marginBottom: 12 },
  tocTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 24, lineHeight: 31, color: "#22301F", marginBottom: 26 },
  tocList: { gap: 15 },
  tocRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  tocIdx: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: "#5C5237", width: 18 },
  tocName: { fontFamily: "Manrope_600SemiBold", fontSize: 13, color: "#22301F", flexShrink: 1 },
  tocDots: { flex: 1, borderBottomWidth: 1, borderBottomColor: "#B7A97D", borderStyle: "dotted", marginBottom: 3 },
  tocPage: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: "#5C5237" },

  narrativeMid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  narrativeBody: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 19, lineHeight: 31, color: COLORS.headline },
  narrativeCaption: { fontFamily: "Manrope_400Regular", fontSize: 12, lineHeight: 18, color: COLORS.footer, marginTop: 16 },

  caseTag: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 0.5,
    color: COLORS.gold,
    backgroundColor: "rgba(111,169,139,0.1)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.3)",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
    alignSelf: "flex-start",
    marginTop: 24,
    marginBottom: 20,
    overflow: "hidden",
  },
  caseBody: { fontFamily: "Manrope_400Regular", fontSize: 14.5, lineHeight: 25, color: "#C7C3D1", marginTop: 12 },

  dataTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 22, color: COLORS.headline, marginTop: 20, marginBottom: 6 },
  dataSubtitle: { fontFamily: "Manrope_400Regular", fontSize: 12, color: COLORS.footer, marginBottom: 18 },
  dataNote: { fontFamily: "Manrope_400Regular", fontSize: 13.5, lineHeight: 22, color: "#C7C3D1", marginTop: 18 },
  readingNote: { marginTop: 14 },
  bars: { gap: 14, marginVertical: 10 },
  barRow: { gap: 5 },
  barLabelRow: { flexDirection: "row", justifyContent: "space-between" },
  barLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: COLORS.headline },
  barTrack: { height: 8, backgroundColor: "rgba(217,201,163,0.14)", borderRadius: 999, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 999 },

  elemMid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  elemNum: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 56, lineHeight: 60, color: COLORS.gold, marginBottom: 6 },
  elemHeading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 21, lineHeight: 28, color: COLORS.headline, marginBottom: 4 },

  quoteMid: { flex: 1, justifyContent: "flex-start", paddingTop: "22%" },
  pullQuote: {
    fontFamily: "CormorantGaramond_500Medium",
    fontStyle: "italic",
    fontVariant: ["lining-nums"],
    fontSize: 21,
    lineHeight: 32,
    color: COLORS.headline,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.gold,
    paddingLeft: 16,
  },
  answerQuoteSpacing: { marginTop: 10 },
  quotePrompt: { fontFamily: "Manrope_400Regular", fontSize: 12, lineHeight: 18, color: COLORS.footer },
  answerNote: { marginTop: 18 },
  snapshotValue: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 26,
    lineHeight: 33,
    color: COLORS.headline,
    marginTop: 6,
  },
  snapshotSecondLabel: { marginTop: 28 },

  chatQuoteBox: { backgroundColor: "rgba(62,110,160,0.08)", borderWidth: 1, borderColor: "rgba(62,110,160,0.35)", borderRadius: 10, padding: 16, marginVertical: 14 },
  chatQuoteHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  chatQuoteLabel: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 1, color: "#7FA8D6" },
  chatQuoteText: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 15, lineHeight: 24, color: COLORS.headline },

  breatherLabelBox: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(78,131,104,0.12)",
    borderWidth: 1,
    borderColor: "rgba(78,131,104,0.35)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 20,
    marginBottom: 16,
  },
  breatherLabelText: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: COLORS.gold },
  breatherTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 19, lineHeight: 25, color: COLORS.headline },
  takeawayBox: { marginTop: 18, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14 },
  takeawayText: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 20, color: "#C7C3D1" },
  takeawayBold: { fontFamily: "Manrope_700Bold", color: COLORS.gold },

  cardIndex: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 20 },
  cardMid: { flex: 1, justifyContent: "flex-start", paddingTop: "20%" },
  cardTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 30, color: COLORS.headline, marginBottom: 14 },
  cardBody: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 23, color: "#C7C3D1" },

  fitLabel: { fontFamily: "Manrope_700Bold", fontSize: 12, marginBottom: 4 },

  closingTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 25, lineHeight: 32, color: COLORS.headline, marginBottom: 4 },
  closingBrand: { paddingTop: 20, borderTopWidth: 1, borderTopColor: COLORS.border },
  disclaimer: { fontFamily: "Manrope_400Regular", fontSize: 12, lineHeight: 17, color: COLORS.footer, marginTop: 10 },

  paywallMid: { flex: 1, justifyContent: "center" },
  paywallCard: { alignItems: "center", backgroundColor: "rgba(111,169,139,0.06)", borderWidth: 1, borderColor: "rgba(111,169,139,0.3)", borderRadius: 16, padding: 26, gap: 10, width: "100%" },
  paywallTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 19, color: COLORS.headline, textAlign: "center", marginTop: 4 },
  paywallBody: { fontFamily: "Manrope_400Regular", fontSize: 13, lineHeight: 21, color: "#C7C3D1", textAlign: "center" },
  paywallButtonDisabled: { opacity: 0.6 },
  paywallBuyButton: { width: "100%", backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 8 },
  paywallBuyButtonLabel: { fontFamily: "Manrope_700Bold", fontSize: 14, color: COLORS.background },
  paywallOneTime: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 19, color: COLORS.footer, textAlign: "center" },
  paywallBundleButton: { width: "100%", borderWidth: 1, borderColor: "rgba(111,169,139,0.4)", borderRadius: 12, paddingVertical: 12, alignItems: "center", gap: 3 },
  paywallBundleButtonLabel: { fontFamily: "Manrope_700Bold", fontSize: 13, color: COLORS.headline },
  paywallBundleSub: { fontFamily: "Manrope_400Regular", fontSize: 12, color: COLORS.subheadline, textAlign: "center" },
  paywallLockedNote: { fontFamily: "Manrope_600SemiBold", fontSize: 12.5, color: COLORS.gold, textAlign: "center" },
  paywallRestoreButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 8 },
  paywallDisclaimer: { fontFamily: "Manrope_400Regular", fontSize: 12, lineHeight: 17, color: COLORS.subheadline, textAlign: "center", marginTop: 14, paddingHorizontal: 6 },
  paywallRestoreLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: COLORS.subheadline, marginTop: 4, textDecorationLine: "underline" },
  paywallNotice: { fontFamily: "Manrope_400Regular", fontSize: 12, lineHeight: 17, color: "#E0A296", textAlign: "center", marginTop: 4 },
});
