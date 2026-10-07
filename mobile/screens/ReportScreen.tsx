import BookOpen from "lucide-react-native/icons/book-open";
import Download from "lucide-react-native/icons/download";
import Lock from "lucide-react-native/icons/lock";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View, type StyleProp, type TextStyle } from "react-native";
import Text from "../components/AppText";
import CalcSourceBadge from "../components/CalcSourceBadge";
import ReportClosingPage, { type ClosingNext } from "../components/ReportClosingPage";
import ReportPager, { readerChromeButtonStyle } from "../components/ReportPager";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import { useLocale, useStrings, type Dictionary } from "../lib/i18n";
import { getReportPackages, getRevenueCatUserId, isUnavailableMessage, purchaseIssueDetail, purchaseReportBundle, purchaseReportModule, restoreReports, type ReportPackageMap } from "../lib/purchases";
import { findNextDecadeAge } from "../lib/decadeTransition";
import { findTopAnswers, INTENSITY_LABEL } from "../lib/quiz/quizProfile";
import { isReportUnlocked, ownedReportCount } from "../lib/reportEntitlement";
import { elementWithEmoji } from "../lib/elements";
import { listSavedReports, saveReport } from "../lib/reportStorage";
import { getModuleById, moduleDisplayTitle, MODULES, type ModuleDefinition } from "../lib/quiz/modules";
import { exportReportPdf, pdfErrorMessage } from "../lib/reportPdf";
import { reportPriceLabels, TOTAL_MODULES, type ReportPriceLabels } from "../lib/reportPricing";
import { COLORS } from "../theme/colors";
import type { ChatExtract } from "./ChatScreen";
import type { QuizDiagnosis } from "./QuizScreen";
import { FONTS } from "../theme/fonts";
import { ELEMENT_COLORS } from "../lib/elements";

// One source for element colours (lib/elements.ts); the quiz used to carry a drifted copy.
const ELEMENT_COLOR = ELEMENT_COLORS;
const ELEMENT_KEYS = ["wood", "fire", "earth", "metal", "water"] as const;
// Celadon-led, no red: a high share on a dimension (82% anxiety) is a tendency, not a warning.
const DIMENSION_BAR_COLORS = [COLORS.gold, "#7FA8D6", "#C2A86B", "#9C8FBF", "#8FB09B"];
const DEFAULT_ELEMENTS: Record<string, number> = { fire: 20, earth: 20, wood: 20, metal: 20, water: 20 };
const PAPER_BG = "#EFE7D8";

/** The closing page's "test to try next": one the reader hasn't taken, from the same track as
 * this report when possible (the reason line says which). Null once every module is done. */
function recommendNextModule(currentId: string, takenIds: Set<string>): { module: ModuleDefinition; sameTrack: boolean } | null {
  const track = getModuleById(currentId)?.track;
  const open = MODULES.filter((m) => m.id !== currentId && !takenIds.has(m.id));
  const same = open.find((m) => m.track === track);
  if (same) return { module: same, sameTrack: true };
  return open[0] ? { module: open[0], sameTrack: false } : null;
}

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

/** Body prose with a small gap between sentences. One Text with "\n" breaks (sentenceLines) left
 * no space between beats, so a 5-sentence page read as a solid wall; a full blank line was too
 * loose. The style's outer margins move to the wrapper so the block sits where the Text did. */
function Prose({ text, style }: { text: string; style: StyleProp<TextStyle> }) {
  const { marginTop, marginBottom, ...textStyle } = StyleSheet.flatten(style) ?? {};
  const lines = sentenceLines(text).split("\n");
  return (
    <View style={{ marginTop, marginBottom }}>
      {lines.map((line, i) => (
        <Text key={i} style={[textStyle, i > 0 && pageStyles.sentenceGap]}>
          {line}
        </Text>
      ))}
    </View>
  );
}

type ElementReading = { heading: string; body: string };

export type ReportContent = {
  /** Present while the paid half is still sealed on the server (2026-09-20): the fields
   * below that belong to the paid pages come back empty until /api/report/unlock opens them
   * for a confirmed purchase. */
  locked_token?: string;
  /** 2026-09-22: the back half has not been written yet — it is generated on the server after a
   * purchase is confirmed (POST /api/report/paid), so non-buyers never pay for pages they don't unlock. */
  locked_pending?: boolean;
  /** Item counts of the sealed half, sent with the token so page counts don't change on unlock. */
  locked_shape?: { cross_analysis_quotes: number; strengths: number; weaknesses: number; behavior_guides: number; set_cards_2to5?: number };
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
  /** 2026-09-22: free-part preview of the calculated age+element transition — fact only, no
   * why/prepare (that stays in the locked upcoming_period_body below). Absent in reports saved
   * before this date. */
  upcoming_period_preview_heading?: string;
  upcoming_period_preview_body?: string;
  upcoming_period_heading: string;
  upcoming_period_body: string;
  /** 2026-09-27: module-specific pages from the module playbook (lib/modulePlaybooks.ts on the
   * server). module_map is free (before the upcoming-period preview); module_deep is paid (before
   * the behavior guides) and arrives as { title, body: "" } until the paid half is written. Absent
   * in reports saved before this date and in requests without a moduleId. */
  module_map?: { title: string; body: string };
  module_deep?: { title: string; body: string };
  /** 2026-10-02 (5-set chat flow, flowVersion 2): one "test × conversation" card per chat set.
   * Card 1 is free (after the quiz reading); cards 2–5 are paid and arrive empty until the paid
   * half is written. Their presence replaces the chat_*_note / answer_notes pages. Absent in
   * reports from the 20-turn flow. */
  set_card_1?: SetCard;
  set_cards_2to5?: SetCard[];
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
  /** 2026-09-27: three free strengths shown before the paywall (sent only when the request asked
   * for the split, context.strengthsSplit). With them, `strengths` is the one locked core strength;
   * without them (older reports, older servers) `strengths` stays the four paid cards. */
  strengths_preview?: { title: string; body: string }[];
  strengths: { title: string; body: string }[];
  weaknesses: { title: string; body: string }[];
  fit_good: string;
  fit_bad: string;
  behavior_guides: { title: string; body: string }[];
  mindset_guide: string;
  closing_title: string;
  closing_body: string;
};

/** Mirrors SetCard in lib/reportSets.ts: set/theme/quiz are attached by server code, quote/note by the model. */
type SetCard = {
  set: 1 | 2 | 3 | 4 | 5;
  theme: SetTheme;
  /** "What you picked in the test" — null when the set's candidate questions had no answer. */
  quiz: { id: string; prompt: string; label: string; score: number } | null;
  /** "What you said" — a short verbatim quote; empty for a set the chat never reached. */
  quote: string;
  note: string;
};
type SetTheme = "scene" | "repeat" | "inner" | "coping" | "strength";

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
  onOpenModule,
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
  /** Starts another module's test (the closing page's recommendation). Without it the card is hidden. */
  onOpenModule?: (moduleId: string) => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const LOADING_MESSAGES = strings.report.loadingMessages;
  const [content, setContent] = useState<ReportContent | null>(savedContent ?? null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockState, setUnlockState] = useState<"idle" | "working" | "failed">("idle");
  const [ownedCount, setOwnedCount] = useState(0);
  const [reportPackages, setReportPackages] = useState<ReportPackageMap | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const firedRef = useRef(false);
  const [exporting, setExporting] = useState(false);
  const [takenModuleIds, setTakenModuleIds] = useState<Set<string> | null>(null);
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

  // Personalized line for the (unpurchased) paywall card — "N세부터 완전히 다른 기운이 시작돼요" —
  // computed locally from data already on screen, no AI call. null on older saved sessions
  // that lack decadeFortune/currentAge, or once the reader has already reached that age.
  const decadePreviewLine = useMemo(() => {
    const nextAge = findNextDecadeAge(decadeFortune, currentAge);
    return nextAge === null ? null : strings.report.paywallDecadePreview(nextAge);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decadeFortune, currentAge, strings]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Which modules already have a report on this device — the closing page recommends a new one.
  useEffect(() => {
    listSavedReports().then((saved) => {
      if (mountedRef.current) setTakenModuleIds(new Set(saved.map((r) => r.moduleId)));
    });
  }, []);

  const nextModule = useMemo(
    () => (takenModuleIds ? recommendNextModule(quizDiagnosis.moduleId, takenModuleIds) : null),
    [takenModuleIds, quizDiagnosis.moduleId],
  );

  useEffect(() => {
    if (content) return;
    const id = setInterval(() => setLoadingMsgIndex((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1)), 7000);
    return () => clearInterval(id);
  }, [content]);

  /** The request context both /api/report and /api/report/paid receive. */
  function buildReportContext() {
    return {
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
      // Asks the server for 3 free strengths + 1 locked core strength (older apps omit it and keep 4 paid).
      strengthsSplit: true,
      // 5-set flow: all 30 answers (user's locale) plus chatExtract.set_packets above let the server
      // write the test × conversation cards. It re-checks both and falls back to the old report
      // when either is missing.
      flowVersion: 2,
      quizAnswers: quizDiagnosis.answers.map((a) => ({ qId: a.qId, dimension: a.dimension, prompt: a.prompt, label: a.label, score: a.score })),
    };
  }

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
          context: buildReportContext(),
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
  const lockedOpen = unlocked && !!content && !content.locked_token && !content.locked_pending;

  // Bought (or restored) but the paid half is still sealed → ask the server to open it. It
  // re-checks the purchase itself, so this can't be talked into opening anything early.
  async function unlockReport() {
    if (!content?.locked_token && !content?.locked_pending) return;
    setUnlockState("working");
    const appUserId = await getRevenueCatUserId();
    if (!appUserId) {
      setUnlockState("failed");
      return;
    }
    if (content.locked_pending) {
      // The back half is written now, after the purchase — continuing the front half the reader saw.
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 115_000);
      try {
        const freePart = {
          title_line1: content.title_line1,
          title_line2: content.title_line2,
          subtitle: content.subtitle,
          opening_scene: content.opening_scene,
          case_tag: content.case_tag,
          oheng_intro: content.oheng_intro,
          quiz_reading: content.quiz_reading,
          element_readings: Object.fromEntries(Object.entries(content.element_readings ?? {}).map(([k, v]) => [k, { heading: v?.heading ?? "" }])),
          module_map: content.module_map,
          // Without it the server writes the old four paid strengths, repeating the free three.
          strengths_preview: content.strengths_preview,
          // Card 1 (free) so the paid cards 2–5 continue it instead of repeating it.
          set_card_1: content.set_card_1,
        };
        const res = await fetch(`${API_BASE_URL}/api/report/paid`, {
          signal: controller.signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ moduleId: quizDiagnosis.moduleId, appUserId, context: buildReportContext(), freePart }),
        });
        const json = await res.json();
        if (!mountedRef.current) return;
        if (res.ok && json?.locked) {
          const { locked_pending: _pending, ...rest } = content;
          const merged = { ...rest, ...json.locked } as ReportContent;
          setContent(merged);
          setUnlockState("idle");
          saveReport({ moduleId: quizDiagnosis.moduleId, moduleTitle: quizDiagnosis.moduleTitle, quizDiagnosis, chatExtract: chatExtract ?? null, content: merged });
        } else {
          setUnlockState("failed");
        }
      } catch {
        if (mountedRef.current) setUnlockState("failed");
      } finally {
        clearTimeout(timeout);
      }
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
    if (unlocked && (content?.locked_token || content?.locked_pending) && unlockState === "idle") unlockReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, content?.locked_token, content?.locked_pending, unlockState]);

  const refreshEntitlement = useCallback(async () => {
    const [u, c] = await Promise.all([isReportUnlocked(quizDiagnosis.moduleId), ownedReportCount()]);
    if (!mountedRef.current) return;
    setUnlocked(u);
    setOwnedCount(c);
  }, [quizDiagnosis.moduleId]);

  useEffect(() => {
    refreshEntitlement();
  }, [refreshEntitlement]);

  // Store prices for the paywall (null on mobile-web / offline → USD fallback in reportPriceLabels).
  useEffect(() => {
    getReportPackages().then((pkgs) => {
      if (mountedRef.current) setReportPackages(pkgs);
    });
  }, []);
  const prices = useMemo(() => reportPriceLabels(reportPackages, quizDiagnosis.moduleId, locale), [reportPackages, quizDiagnosis.moduleId, locale]);

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
    // A 5-set report has card 1 from the start; the paid four may still be sealed (shape count).
    const setCardsMode = !!content.set_card_1;
    const paidCards = setCardsMode
      ? placeholders<SetCard | null>(content.set_cards_2to5 ?? [], shape?.set_cards_2to5, null)
      : [];

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
          subtitle={`${moduleDisplayTitle(quizDiagnosis.moduleTitle ?? strings.report.defaultModuleTitle)} ${strings.report.quizAnalysisSuffix}`}
          hook={quizDiagnosis.typeInfo?.hook}
          dimensionResults={quizDiagnosis.dimensionResults}
          dimensionShortNames={quizDiagnosis.dimensionShortNames}
          nuancedSummary={quizDiagnosis.nuancedSummary}
          reading={content.quiz_reading}
          locale={locale}
        />
      ),
    });

    if (content.set_card_1) {
      body.push({
        key: "set-card-1",
        tocLabel: strings.report.sectionSetCardsToc,
        node: <SetCardPage card={content.set_card_1} strings={strings} />,
      });
    }

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

    const strengthsPreview = content.strengths_preview ?? [];
    const coreOnly = strengthsPreview.length > 0;

    const moduleMap = content.module_map;
    if (moduleMap?.title && moduleMap.body) {
      body.push({
        key: "module-map",
        tocLabel: moduleMap.title,
        node: <ModulePage eyebrow={strings.report.moduleLensEyebrow} title={moduleMap.title} body={moduleMap.body} />,
      });
    }

    strengthsPreview.forEach((s, i) => {
      body.push({
        key: `strength-preview-${i}`,
        tocLabel: i === 0 ? strings.report.sectionStrengths : undefined,
        node: <CardPage kind="jade" indexLabel={strings.report.strengthIndex(i + 1, strengthsPreview.length)} title={s.title} body={s.body} />,
      });
    });

    if (content.upcoming_period_preview_heading && content.upcoming_period_preview_body) {
      body.push({
        key: "upcoming-preview",
        tocLabel: strings.report.sectionUpcomingPeriod,
        node: (
          <ForecastPage
            heading={content.upcoming_period_preview_heading}
            body={content.upcoming_period_preview_body}
            note={strings.report.upcomingGlimpseNote}
          />
        ),
      });
    }

    // ---- everything below this line is the paid half of the report ----

    body.push({
      key: "upcoming",
      tocLabel: strings.report.sectionUpcomingPeriodContinued,
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
    }

    // 5-set report: cards 2–5 take the place of the chat-note and answer-quote pages below.
    paidCards.forEach((card, i) => {
      body.push({
        key: `set-card-${i + 2}`,
        tocLabel: i === 0 ? strings.report.sectionSetCardsContinuedToc(paidCards.length) : undefined,
        locked: true,
        node: card ? <SetCardPage card={card} strings={strings} /> : null,
      });
    });

    if (chatExtract && !setCardsMode) {
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

    (setCardsMode ? [] : topAnswers).forEach((a, i) => {
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
        tocLabel: i === 0 ? (coreOnly ? strings.report.sectionCoreStrengthWeaknessesToc : strings.report.sectionStrengthsWeaknessesToc) : undefined,
        locked: true,
        node: (
          <CardPage
            kind="jade"
            indexLabel={coreOnly ? strings.report.coreStrengthIndex : strings.report.strengthIndex(i + 1, strengthsList.length)}
            title={s.title}
            body={s.body}
          />
        ),
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

    // Only the title is needed to lay the page out while the paid half is sealed.
    const moduleDeep = content.module_deep;
    if (moduleDeep?.title) {
      body.push({
        key: "module-deep",
        tocLabel: moduleDeep.title,
        locked: true,
        node: <ModulePage eyebrow={strings.report.moduleLensEyebrow} title={moduleDeep.title} body={moduleDeep.body ?? ""} />,
      });
    }

    guidesList.forEach((g, i) => {
      body.push({
        key: `behavior-${i}`,
        tocLabel: i === 0 ? strings.report.sectionBehaviorMindsetToc : undefined,
        locked: true,
        node: <CardPage kind="blue" indexLabel={strings.report.guideIndex(i + 1, guidesList.length)} title={g.title} body={g.body} />,
      });
    });

    body.push({ key: "mindset", locked: true, node: <MindsetPage label={strings.report.sectionMindset} body={content.mindset_guide} /> });

    const summary = splitLead(noHanja(content.psychology_takeaway ?? "")).lead.trim();
    const next: ClosingNext | null =
      nextModule && onOpenModule
        ? {
            eyebrow: strings.reader.nextModuleEyebrow,
            title: moduleDisplayTitle(nextModule.module.title[locale] ?? nextModule.module.title.ko),
            body: !nextModule.sameTrack
              ? strings.reader.nextModuleReasonNew
              : nextModule.module.track === "romance"
                ? strings.reader.nextModuleReasonRomance
                : strings.reader.nextModuleReasonCareer,
            meta: strings.reader.nextModuleMeta,
            ctaLabel: strings.reader.nextModuleCta,
            onPress: () => onOpenModule(nextModule.module.id),
          }
        : null;
    body.push({
      key: "closing",
      tocLabel: strings.report.tocClosing,
      locked: true,
      node: (
        <ReportClosingPage
          title={content.closing_title}
          body={sentenceLines(content.closing_body)}
          summaryEyebrow={strings.reader.summaryEyebrow}
          summary={summary}
          share={{ label: strings.reader.shareLabel, eyebrow: strings.reader.shareCredit, onShared: handleShared }}
          pdf={{ label: strings.pdf.button, busyLabel: strings.pdf.preparing, busy: exporting, onPress: handleExportPdf }}
          next={next}
          disclaimers={[strings.report.disclaimer1, strings.report.disclaimer2]}
        />
      ),
    });

    const tocEntries = body
      .map((p, i) => (p.tocLabel ? { label: p.tocLabel, pageNumber: i + 3, locked: !lockedOpen && !!p.locked } : null))
      .filter((x): x is { label: string; pageNumber: number; locked: boolean } => !!x);

    // Where a tap on a locked TOC row should land: the single paywall page below replaces every
    // locked page, at the position of the first one (see the `gated` flatMap below).
    const firstLockedBodyIdx = body.findIndex((p) => p.locked);
    const paywallPageIndex = !lockedOpen && firstLockedBodyIdx >= 0 ? firstLockedBodyIdx + 2 : null;

    const lockedChapterCount = tocEntries.filter((e) => e.locked).length;
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
              prices={prices}
              lockedCount={lockedChapterCount}
              totalCount={tocEntries.length}
              lockedChapters={tocEntries.filter((e) => e.locked).map((e) => e.label)}
              strings={strings}
              purchasing={purchasing}
              restoring={restoring}
              purchaseNotice={purchaseNotice}
              decadePreviewLine={decadePreviewLine}
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
      {
        key: "cover",
        node: (
          <CoverPage
            // The server's subtitle runs ~80 characters ("Module 1 · … deep report — saju × psychological
            // test × counseling integration"); the cover kicker is built here instead.
            kicker={`${moduleDisplayTitle(quizDiagnosis.moduleTitle ?? strings.report.defaultModuleTitle)} · ${strings.report.coverKicker}`}
            title1={content.title_line1}
            title2={content.title_line2}
            nickname={`${nickname}${strings.report.nicknameSuffix}`}
            previewLabel={lockedOpen ? "" : strings.report.previewLabel}
            // Preview counts are in chapters, the TOC's unit: a page count ("16 of 42") never matched
            // the reader's counter, which only spans the preview pages plus one paywall page.
            totalPagesLabel={lockedOpen ? strings.report.totalPagesLabel(total) : strings.report.previewChaptersLabel(tocEntries.length - lockedChapterCount, tocEntries.length)}
          />
        ),
      },
      { key: "toc", node: <TocPage eyebrow={strings.report.tocEyebrow} title={strings.report.tocTitle} entries={tocEntries} paywallPageIndex={paywallPageIndex} onSelect={goTo} /> },
      ...gated,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, resolvedElements, chatExtract, unlocked, lockedOpen, unlockState, ownedCount, prices, purchasing, restoring, purchaseNotice, strings, locale, quizDiagnosis, nickname, topAnswers, decadePreviewLine, nextModule, onOpenModule, exporting]);

  // The closing page shares the one-line takeaway as an image card; this only records it.
  function handleShared() {
    track("share", { kind: "report_summary" });
  }

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
    setPageIndex(Math.max(0, Math.min(pages.length - 1, index)));
  }

  // The paywall page coming into view (not just existing in the pager), once per open report.
  const paywallSeenRef = useRef(false);
  const paywallShowing = !lockedOpen && !unlocked && !!pages[pageIndex]?.locked;
  useEffect(() => {
    if (!paywallShowing || paywallSeenRef.current) return;
    paywallSeenRef.current = true;
    track("paywall_view", { surface: "report", module: quizDiagnosis.moduleId });
  }, [paywallShowing, quizDiagnosis.moduleId]);

  if (errorText) {
    return (
      <SafeAreaView style={styles.centerRoot}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorText}</Text>
          <Pressable onPress={fetchReport} style={styles.retryButton} accessibilityRole="button">
            <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
          </Pressable>
          <Pressable onPress={onBack} style={styles.retryButton} accessibilityRole="button">
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

  const onPaywall = !lockedOpen && !!pages[pageIndex]?.locked;

  return (
    <ReportPager
      pages={pages}
      pageIndex={pageIndex}
      onPageIndexChange={setPageIndex}
      onBack={onBack}
      labels={{ back: strings.common.backLabel, previous: strings.report.previousPageLabel, next: strings.report.nextPageLabel }}
      swipeHint={{ id: "deep", label: strings.reader.swipeHint }}
      reviewAtEnd={lockedOpen}
      // None on a paywall page: the zones sat on top of — and swallowed the taps meant for —
      // the paywall's buy, bundle and restore buttons. Swiping still turns pages everywhere.
      edgeTaps={!onPaywall}
      trailing={
        lockedOpen ? (
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
        ) : null
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

// ------------------------------------------------------------------
// Page templates — one component per visual template, reused across
// however many real content items exist (e.g. CardPage renders every
// strength/weakness/behavior-guide, one per page).
// ------------------------------------------------------------------

function PageShell({ paper, children }: { paper?: boolean; children: React.ReactNode }) {
  return <View style={[pageStyles.shell, paper ? pageStyles.shellPaper : pageStyles.shellDark]}>{children}</View>;
}

/** Body of a short page, label included: sits at the optical middle instead of hanging from the
 * top over an empty lower two-thirds, and scrolls (top-aligned) when a long es/en text outgrows
 * the screen. The label goes inside so it stays with the text it names. */
function CenteredBody({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView style={pageStyles.centeredScroll} contentContainerStyle={pageStyles.centeredBody} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

function Eyebrow({ children, ink }: { children: React.ReactNode; ink?: boolean }) {
  return <Text style={[pageStyles.eyebrow, ink && pageStyles.eyebrowInk]}>{children}</Text>;
}

function CoverPage({
  kicker,
  title1,
  title2,
  nickname,
  previewLabel,
  totalPagesLabel,
}: {
  kicker: string;
  title1: string;
  title2: string;
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
        <Eyebrow>{kicker}</Eyebrow>
        <Text style={pageStyles.coverTitle} accessibilityRole="header">{title1}</Text>
        {/* Its own line, smaller and quieter: in one Text the two lines read as one run-on title. */}
        {!!title2 && <Text style={pageStyles.coverTitle2}>{title2}</Text>}
        <View style={pageStyles.coverRule} />
        <Text style={pageStyles.coverSub}>{nickname}</Text>
        <View style={pageStyles.coverSource}>
          <CalcSourceBadge align="start" />
        </View>
      </View>
      <View style={pageStyles.pageFoot}>
        <Text style={pageStyles.pageFootText}>{previewLabel}</Text>
        <Text style={pageStyles.pageFootText}>{totalPagesLabel}</Text>
      </View>
    </PageShell>
  );
}

function TocPage({
  eyebrow,
  title,
  entries,
  paywallPageIndex,
  onSelect,
}: {
  eyebrow: string;
  title: string;
  entries: { label: string; pageNumber: number; locked: boolean }[];
  paywallPageIndex: number | null;
  onSelect: (pageIndex: number) => void;
}) {
  const strings = useStrings();
  return (
    <PageShell paper>
      <Text style={pageStyles.tocEyebrow}>{eyebrow}</Text>
      <Text style={pageStyles.tocTitle} accessibilityRole="header">{title}</Text>
      <View style={pageStyles.tocList}>
        {entries.map((e, i) => (
          <Pressable
            key={e.label}
            style={pageStyles.tocRow}
            hitSlop={6}
            onPress={() => onSelect(e.locked ? (paywallPageIndex ?? e.pageNumber - 1) : e.pageNumber - 1)}
            accessibilityRole="button"
            accessibilityLabel={e.locked ? strings.report.tocLockedA11y(e.label) : e.label}
          >
            <Text style={pageStyles.tocIdx}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={pageStyles.tocName} numberOfLines={2}>
              {e.label}
            </Text>
            <View style={pageStyles.tocDots} />
            {e.locked ? <Lock size={12} strokeWidth={2} color="#5C5237" /> : <Text style={pageStyles.tocPage}>{String(e.pageNumber).padStart(2, "0")}</Text>}
          </Pressable>
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
      <Prose style={pageStyles.caseBody} text={body} />
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
      {hook && <Prose style={pageStyles.caseBody} text={hook} />}
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
      {!!nuancedSummary && <Prose style={pageStyles.dataNote} text={nuancedSummary} />}
      {!!reading && <Prose style={[pageStyles.dataNote, pageStyles.readingNote]} text={reading} />}
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
      {!!intro && <Prose style={pageStyles.dataNote} text={intro} />}
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
        <Prose style={pageStyles.caseBody} text={reading.body} />
      </View>
    </PageShell>
  );
}

function ForecastPage({ heading, body, note }: { heading: string; body: string; note: string }) {
  return (
    <PageShell>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.elemHeading} accessibilityRole="header">{heading}</Text>
        <Prose style={pageStyles.caseBody} text={body} />
      </View>
      <Text style={pageStyles.narrativeCaption}>{note}</Text>
    </PageShell>
  );
}

function ChatStoryPage({ chatExtract, strings }: { chatExtract: ChatExtract; strings: Dictionary }) {
  return (
    <PageShell>
      <Prose style={pageStyles.caseBody} text={strings.report.chatStoryIntro} />
      <View style={pageStyles.chatQuoteBox}>
        <View style={pageStyles.chatQuoteHeader}>
          <BookOpen size={13} strokeWidth={2} color="#7FA8D6" />
          <Text style={pageStyles.chatQuoteLabel}>{strings.report.chatQuoteLabel}</Text>
        </View>
        <Text style={pageStyles.chatQuoteText}>&quot;{String(chatExtract.summary_quote || chatExtract.trigger_point || "")}&quot;</Text>
      </View>
      {!!chatExtract.integrated_summary && <Prose style={pageStyles.caseBody} text={String(chatExtract.integrated_summary)} />}
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
      <CenteredBody>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Text style={pageStyles.pullQuote}>{sentenceLines(lead)}</Text>
        {!!rest && <Prose style={[pageStyles.caseBody, pageStyles.answerNote]} text={rest} />}
      </CenteredBody>
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
      <CenteredBody>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Text style={pageStyles.quotePrompt}>{prompt}</Text>
        <Text style={[pageStyles.pullQuote, pageStyles.answerQuoteSpacing]}>{sentenceLines(answer)}</Text>
        {!!note && <Prose style={[pageStyles.caseBody, pageStyles.answerNote]} text={note} />}
      </CenteredBody>
    </PageShell>
  );
}

/** One test × conversation card (5-set flow): the answer picked in the test, a short line the
 * reader actually said in that chat set, and a three-sentence reading. A set the chat never
 * reached has no quote; a set without a matching test answer has no answer block. Same type
 * scale as AnswerQuotePage, with small labels so the two sources read apart. */
function SetCardPage({ card, strings }: { card: SetCard; strings: Dictionary }) {
  const theme = strings.report.setThemes[card.theme] ?? "";
  return (
    <PageShell>
      <Eyebrow>{strings.report.setCardEyebrow(card.set, theme)}</Eyebrow>
      {/* Three blocks can outgrow a small screen in es/en — scroll instead of clipping. */}
      <ScrollView style={pageStyles.paywallScroll} contentContainerStyle={pageStyles.setCardMid} showsVerticalScrollIndicator={false}>
        {!!card.quiz && (
          <View>
            <Text style={pageStyles.setCardLabel}>{strings.report.setCardQuizLabel}</Text>
            <Text style={pageStyles.quotePrompt}>{card.quiz.prompt}</Text>
            <Text style={pageStyles.setCardAnswer}>{sentenceLines(card.quiz.label)}</Text>
          </View>
        )}
        {!!card.quote && (
          <View style={card.quiz ? pageStyles.setCardBlockGap : undefined}>
            <Text style={pageStyles.setCardLabel}>{strings.report.setCardQuoteLabel}</Text>
            <Text style={pageStyles.pullQuote}>{`“${card.quote}”`}</Text>
          </View>
        )}
        {!!card.note && <Prose style={[pageStyles.caseBody, pageStyles.answerNote]} text={card.note} />}
      </ScrollView>
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
        {!!note && <Prose style={[pageStyles.caseBody, pageStyles.answerNote]} text={note} />}
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
      <Prose style={pageStyles.caseBody} text={body} />
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
      <CenteredBody>
        <Text style={[pageStyles.cardIndex, pageStyles.cardIndexCentered, { color }]}>{indexLabel}</Text>
        <Text style={pageStyles.cardTitle} accessibilityRole="header">{title}</Text>
        <Prose style={pageStyles.cardBody} text={body} />
      </CenteredBody>
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
        <Prose style={pageStyles.caseBody} text={body} />
      </View>
    </PageShell>
  );
}

function ModulePage({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <PageShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.elemHeading} accessibilityRole="header">{noHanja(title)}</Text>
        <Prose style={pageStyles.caseBody} text={body} />
      </View>
    </PageShell>
  );
}

function MindsetPage({ label, body }: { label: string; body: string }) {
  return (
    <PageShell>
      <Eyebrow>{label}</Eyebrow>
      <View style={pageStyles.elemMid}>
        <Prose style={pageStyles.caseBody} text={body} />
      </View>
    </PageShell>
  );
}

// Gates everything past the free preview (opening scene, case study, quiz analysis, saju
// analysis) — the actionable half of the report. Real IAP added 2026-09-16: the bundle
// (every module at a fixed price) is only offered while the user owns none of them yet, since
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
  prices,
  lockedCount,
  totalCount,
  lockedChapters,
  strings,
  purchasing,
  restoring,
  purchaseNotice,
  decadePreviewLine,
  onBuyModule,
  onBuyBundle,
  onRestore,
}: {
  ownedCount: number;
  prices: ReportPriceLabels;
  lockedCount: number;
  totalCount: number;
  /** TOC labels of the sealed chapters, in reading order — the paywall names exactly what it unlocks. */
  lockedChapters: string[];
  strings: Dictionary;
  purchasing: boolean;
  restoring: boolean;
  purchaseNotice: string | null;
  /** "32세부터, 수 기운이 시작돼요" — null when decadeFortune/currentAge aren't available. */
  decadePreviewLine: string | null;
  onBuyModule: () => void;
  onBuyBundle: () => void;
  onRestore: () => void;
}) {
  const busy = purchasing || restoring;
  return (
    <PageShell>
      {/* Scrolls only when the card outgrows the page (small phones, large text); on a
          375×812 screen everything fits and the buy button sits in the first view. */}
      <ScrollView style={pageStyles.paywallScroll} contentContainerStyle={pageStyles.paywallMid} showsVerticalScrollIndicator={false}>
        <View style={pageStyles.paywallCard}>
          <Lock size={20} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={pageStyles.paywallTitle} accessibilityRole="header">{strings.report.paywallTitle}</Text>
          <Text style={pageStyles.paywallBody}>{strings.report.paywallBody}</Text>
          {/* The closing page (takeaway, next test, PDF) sits past the lock, so name it here. */}
          <Text style={pageStyles.paywallExtras}>{strings.report.paywallExtras}</Text>
          <Text style={pageStyles.paywallLockedNote}>{strings.report.paywallLockedNote(lockedCount, totalCount)}</Text>
          {lockedChapters.length > 0 && (
            <View style={pageStyles.paywallChapterList}>
              {lockedChapters.map((label, i) => (
                <View key={label} style={[pageStyles.paywallChapterRow, i > 0 && pageStyles.paywallChapterDivider]}>
                  <Lock size={13} strokeWidth={1.75} color={COLORS.gold} />
                  <Text style={pageStyles.paywallChapterLabel} numberOfLines={1}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {!!decadePreviewLine && <Text style={pageStyles.paywallDecadePreview}>{decadePreviewLine}</Text>}

          <Pressable
            style={[pageStyles.paywallBuyButton, busy && pageStyles.paywallButtonDisabled]}
            onPress={onBuyModule}
            disabled={busy}
            accessibilityRole="button"
            accessibilityLabel={strings.report.paywallBuyLabel(prices.module)}
            accessibilityState={{ disabled: busy, busy: purchasing }}
          >
            {purchasing ? <ActivityIndicator color={COLORS.background} /> : <Text style={pageStyles.paywallBuyButtonLabel}>{strings.report.paywallBuyLabel(prices.module)}</Text>}
          </Pressable>

          <Text style={pageStyles.paywallOneTime}>{strings.report.paywallOneTimeNote}</Text>

          {ownedCount < TOTAL_MODULES && (
            <Pressable
              style={[pageStyles.paywallBundleButton, busy && pageStyles.paywallButtonDisabled]}
              onPress={onBuyBundle}
              disabled={busy}
              accessibilityRole="button"
              accessibilityState={{ disabled: busy }}
            >
              <Text style={pageStyles.paywallBundleButtonLabel}>{strings.report.paywallBundleBuyLabel(TOTAL_MODULES, prices.bundle)}</Text>
              <Text style={pageStyles.paywallBundleSub}>
                {ownedCount === 0
                  ? strings.report.paywallBundleSub(prices.fullTotal, prices.discountPercent)
                  : strings.report.paywallBundleSubOwned(ownedCount, prices.fullTotal)}
              </Text>
            </Pressable>
          )}

          <Pressable onPress={onRestore} disabled={busy} style={pageStyles.paywallRestoreButton} accessibilityRole="button">
            <Text style={pageStyles.paywallRestoreLabel}>{restoring ? strings.report.paywallRestoring : strings.report.paywallRestoreLabel}</Text>
          </Pressable>

          {!!purchaseNotice && <Text style={pageStyles.paywallNotice}>{purchaseNotice}</Text>}
        </View>
        <Text style={pageStyles.paywallDisclaimer}>{strings.report.disclaimer1}</Text>
      </ScrollView>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  centerRoot: { flex: 1, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 16 },
  loadingText: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline, textAlign: "center" },
  errorCard: { width: "100%", backgroundColor: "rgba(203,98,73,0.08)", borderWidth: 1, borderColor: "rgba(203,98,73,0.35)", borderRadius: 12, padding: 16, gap: 12 },
  errorText: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.danger },
  retryButton: { alignSelf: "flex-start", minHeight: 44, justifyContent: "center", paddingHorizontal: 4 },
  retryLabel: { fontFamily: FONTS.semibold, fontSize: 12.5, color: COLORS.gold },
  backLabel: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.subheadline },

  homeButton: { marginHorizontal: 22, marginBottom: 16, marginTop: 6, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  homeButtonLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.headline },
});

const pageStyles = StyleSheet.create({
  shell: { flex: 1, paddingHorizontal: 26, paddingTop: 8, paddingBottom: 24 },
  shellDark: { backgroundColor: COLORS.background },
  shellPaper: { backgroundColor: PAPER_BG },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 18 },
  brandLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 3, color: COLORS.gold, textTransform: "uppercase" },

  // Sentence case, like the fortune screen: these labels run to 40+ characters ("What you actually answered · …").
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 13, letterSpacing: 0.2, color: COLORS.gold, marginBottom: 16 },
  eyebrowInk: { color: "#5C5237" },

  pageFoot: { marginTop: "auto", flexDirection: "row", justifyContent: "space-between" },
  pageFootText: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.footer },

  coverMid: { flex: 1, justifyContent: "flex-start", paddingTop: "18%" },
  coverTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 27, lineHeight: 36, color: COLORS.headline, marginBottom: 4 },
  coverTitle2: { fontFamily: FONTS.displayItalic, fontVariant: ["lining-nums"], fontSize: 20, lineHeight: 28, color: COLORS.footer, marginTop: 10 },
  coverRule: { width: 30, height: 1, backgroundColor: COLORS.gold, marginVertical: 16 },
  coverSub: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.headline },
  coverSource: { marginTop: 22, marginBottom: 28 },

  tocEyebrow: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: "#5C5237", marginTop: 24, marginBottom: 12 },
  tocTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 24, lineHeight: 31, color: "#22301F", marginBottom: 26 },
  // Rows carry their own vertical padding (plus hitSlop) so each is a ~44pt target, not 16pt text.
  tocList: { gap: 0 },
  tocRow: { flexDirection: "row", alignItems: "baseline", gap: 8, paddingVertical: 8 },
  tocIdx: { fontFamily: FONTS.semibold, fontSize: 12, color: "#5C5237", width: 18 },
  tocName: { fontFamily: FONTS.semibold, fontSize: 13, color: "#22301F", flexShrink: 1 },
  tocDots: { flex: 1, borderBottomWidth: 1, borderBottomColor: "#B7A97D", borderStyle: "dotted", marginBottom: 3 },
  tocPage: { fontFamily: FONTS.semibold, fontSize: 12, color: "#5C5237" },

  narrativeMid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  narrativeBody: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 19, lineHeight: 31, color: COLORS.headline },
  narrativeCaption: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.footer, marginTop: 16 },

  caseTag: {
    fontFamily: FONTS.bold,
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
  sentenceGap: { marginTop: 9 },
  caseBody: { fontFamily: FONTS.regular, fontSize: 14.5, lineHeight: 25, color: COLORS.headline, marginTop: 12 },

  dataTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 22, color: COLORS.headline, marginTop: 20, marginBottom: 6 },
  dataSubtitle: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.footer, marginBottom: 18 },
  dataNote: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 22, color: COLORS.headline, marginTop: 18 },
  readingNote: { marginTop: 14 },
  bars: { gap: 14, marginVertical: 10 },
  barRow: { gap: 5 },
  barLabelRow: { flexDirection: "row", justifyContent: "space-between" },
  barLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.headline },
  barTrack: { height: 8, backgroundColor: "rgba(217,201,163,0.14)", borderRadius: 999, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 999 },

  elemMid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  elemNum: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 56, lineHeight: 60, color: COLORS.gold, marginBottom: 6 },
  elemHeading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 21, lineHeight: 28, color: COLORS.headline, marginBottom: 4 },

  centeredScroll: { flex: 1 },
  centeredBody: { flexGrow: 1, justifyContent: "center", paddingTop: 12, paddingBottom: 56 },
  pullQuote: {
    fontFamily: FONTS.displayItalic,
    fontVariant: ["lining-nums"],
    fontSize: 21,
    lineHeight: 32,
    color: COLORS.headline,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.gold,
    paddingLeft: 16,
  },
  answerQuoteSpacing: { marginTop: 10 },
  quotePrompt: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.footer },
  answerNote: { marginTop: 18 },
  setCardMid: { flexGrow: 1, paddingTop: "8%", paddingBottom: 12 },
  setCardLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold, marginBottom: 8 },
  setCardAnswer: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 19, lineHeight: 27, color: COLORS.headline, marginTop: 6 },
  setCardBlockGap: { marginTop: 26 },
  snapshotValue: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 26,
    lineHeight: 33,
    color: COLORS.headline,
    marginTop: 6,
  },
  snapshotSecondLabel: { marginTop: 28 },

  chatQuoteBox: { backgroundColor: "rgba(62,110,160,0.08)", borderWidth: 1, borderColor: "rgba(62,110,160,0.35)", borderRadius: 10, padding: 16, marginVertical: 14 },
  chatQuoteHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  chatQuoteLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: "#7FA8D6" },
  chatQuoteText: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 15, lineHeight: 24, color: COLORS.headline },

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
  breatherLabelText: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold },
  breatherTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 19, lineHeight: 25, color: COLORS.headline },
  takeawayBox: { marginTop: 18, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14 },
  takeawayText: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 20, color: COLORS.headline },
  takeawayBold: { fontFamily: FONTS.bold, color: COLORS.gold },

  cardIndex: { fontFamily: FONTS.semibold, fontSize: 13, letterSpacing: 0.2, marginTop: 20 },
  // Inside the centred group the label sits right above its title, not pinned to the page top.
  cardIndexCentered: { marginTop: 0, marginBottom: 12 },
  cardTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 30, color: COLORS.headline, marginBottom: 14 },
  cardBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 23, color: COLORS.headline },

  fitLabel: { fontFamily: FONTS.bold, fontSize: 12, marginBottom: 4 },


  paywallScroll: { flex: 1 },
  paywallMid: { flexGrow: 1, justifyContent: "center", paddingVertical: 4 },
  paywallCard: { alignItems: "center", backgroundColor: "rgba(111,169,139,0.06)", borderWidth: 1, borderColor: "rgba(111,169,139,0.3)", borderRadius: 16, paddingHorizontal: 22, paddingVertical: 20, gap: 8, width: "100%" },
  paywallChapterList: { alignSelf: "stretch", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "rgba(111,169,139,0.18)", marginBottom: 4 },
  paywallChapterRow: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 30, paddingHorizontal: 4 },
  paywallChapterDivider: { borderTopWidth: 1, borderTopColor: "rgba(111,169,139,0.1)" },
  paywallChapterLabel: { flex: 1, fontFamily: FONTS.medium, fontSize: 13, color: COLORS.headline },
  paywallTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 19, color: COLORS.headline, textAlign: "center", marginTop: 4 },
  paywallBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 21, color: COLORS.headline, textAlign: "center" },
  paywallExtras: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: 4 },
  paywallButtonDisabled: { opacity: 0.6 },
  paywallBuyButton: { width: "100%", backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 8 },
  paywallBuyButtonLabel: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.background },
  paywallOneTime: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.footer, textAlign: "center" },
  paywallBundleButton: { width: "100%", borderWidth: 1, borderColor: "rgba(111,169,139,0.4)", borderRadius: 12, paddingVertical: 12, alignItems: "center", gap: 3 },
  paywallBundleButtonLabel: { fontFamily: FONTS.bold, fontSize: 13, color: COLORS.headline },
  paywallBundleSub: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.subheadline, textAlign: "center" },
  paywallLockedNote: { fontFamily: FONTS.semibold, fontSize: 12.5, color: COLORS.gold, textAlign: "center" },
  paywallDecadePreview: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.headline, textAlign: "center" },
  paywallRestoreButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 8 },
  paywallDisclaimer: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 17, color: COLORS.subheadline, textAlign: "center", marginTop: 14, paddingHorizontal: 6 },
  paywallRestoreLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline, marginTop: 4, textDecorationLine: "underline" },
  paywallNotice: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 17, color: COLORS.danger, textAlign: "center", marginTop: 4 },
});
