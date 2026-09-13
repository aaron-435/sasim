import { ArrowLeft, BookOpen, Lock, Sparkles } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { useLocale, useStrings, type Dictionary } from "../lib/i18n";
import { findTopAnswers, INTENSITY_LABEL } from "../lib/quiz/quizProfile";
import { isReportUnlocked, ownedReportCount } from "../lib/reportEntitlement";
import { formatUsd, REPORT_PRICE, remainingBundlePrice, TOTAL_MODULES } from "../lib/reportPricing";
import { COLORS } from "../theme/colors";
import type { ChatExtract } from "./ChatScreen";
import type { QuizDiagnosis } from "./QuizScreen";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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

/** Breaks generated body copy at sentence/clause boundaries (마침표, 쉼표) instead of
 * leaving RN's own line-wrap to land wherever the container width happens to cut —
 * one clause per line reads as deliberate short beats instead of one dense wrapped
 * block. A clause that's still too long for one line keeps wrapping normally within
 * itself. No space follows the "." in a decimal (e.g. "14.99"), so numbers are safe. */
function sentenceLines(text: string): string {
  return text
    .split(/(?<=[.,!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join("\n");
}

type ElementReading = { heading: string; body: string };

type ReportContent = {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  opening_scene: string;
  case_tag: string;
  case_paragraphs: string[];
  element_readings: Record<string, ElementReading>;
  upcoming_period_heading: string;
  upcoming_period_body: string;
  cross_analysis_quotes: string[];
  answer_notes: string[];
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
  quizDiagnosis,
  chatExtract,
  sessionId,
  onBack,
}: {
  nickname: string;
  elements: Record<string, number> | null;
  decadeFortune?: unknown;
  currentAge?: number;
  quizDiagnosis: QuizDiagnosis;
  chatExtract: ChatExtract | null;
  sessionId: string;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const LOADING_MESSAGES = strings.report.loadingMessages;
  const [content, setContent] = useState<ReportContent | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const mountedRef = useRef(true);
  const firedRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
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
    const id = setInterval(() => setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length), 2200);
    return () => clearInterval(id);
  }, [content]);

  async function fetchReport() {
    setErrorText(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          context: {
            nickname,
            track: "romance",
            elements: resolvedElements,
            decadeFortune,
            currentAge,
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
        setErrorText(json.error || strings.report.errorDefault);
        return;
      }
      setContent(json);
    } catch {
      if (!mountedRef.current) return;
      setErrorText(strings.report.errorNetwork);
    }
  }

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unlocked = isReportUnlocked(quizDiagnosis.moduleId);
  const ownedCount = ownedReportCount();

  const pages = useMemo<PageDef[]>(() => {
    if (!content) return [];
    const sortedKeys = ELEMENT_KEYS.slice().sort((a, b) => (resolvedElements[b] ?? 0) - (resolvedElements[a] ?? 0));
    const dominantKey = sortedKeys[0];

    const body: PageDef[] = [];

    body.push({
      key: "opening",
      tocLabel: strings.report.sectionOpeningScene,
      node: <NarrativePage body={content.opening_scene} caption={`${nickname}${strings.report.nicknameSuffix}`} />,
    });

    content.case_paragraphs.forEach((p, i) => {
      body.push({
        key: `case-${i}`,
        tocLabel: i === 0 ? strings.report.sectionCaseStudy : undefined,
        node: <CaseStudyPage tag={i === 0 ? content.case_tag : undefined} body={p} />,
      });
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
          locale={locale}
        />
      ),
    });

    body.push({
      key: "oheng-overview",
      tocLabel: strings.report.sectionSajuPatternSubtitle,
      node: <OhengBarsPage title={strings.report.sectionSajuPattern} elements={resolvedElements} dominantKey={dominantKey} />,
    });

    sortedKeys.forEach((key) => {
      const reading = content.element_readings[key];
      if (!reading) return;
      body.push({
        key: `element-${key}`,
        node: <ElementReadingPage pct={resolvedElements[key] ?? 0} reading={reading} />,
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
            />
          ),
        });
      }

      const trigger = chatExtract.trigger_point;
      if (typeof trigger === "string" && trigger.trim()) {
        body.push({
          key: "chat-trigger",
          locked: true,
          node: <QuotePage eyebrow={strings.report.chatTriggerEyebrow} quote={trigger} />,
        });
      }

      const repeatPattern = chatExtract.repeat_pattern;
      if (typeof repeatPattern === "string" && repeatPattern.trim()) {
        body.push({
          key: "chat-repeat-pattern",
          locked: true,
          node: <QuotePage eyebrow={strings.report.chatRepeatPatternEyebrow} quote={repeatPattern} />,
        });
      }

      const coreFear = chatExtract.core_fear_or_meaning;
      if (typeof coreFear === "string" && coreFear.trim()) {
        body.push({
          key: "chat-core-fear",
          locked: true,
          node: <QuotePage eyebrow={strings.report.chatCoreFearEyebrow} quote={coreFear} />,
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

    content.cross_analysis_quotes.forEach((q, i) => {
      body.push({
        key: `cross-${i}`,
        tocLabel: i === 0 ? strings.report.sectionCrossAnalysisToc : undefined,
        locked: true,
        node: <QuotePage quote={q} />,
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

    content.strengths.forEach((s, i) => {
      body.push({
        key: `strength-${i}`,
        tocLabel: i === 0 ? strings.report.sectionStrengthsWeaknessesToc : undefined,
        locked: true,
        node: <CardPage kind="jade" indexLabel={`STRENGTH · ${String(i + 1).padStart(2, "0")} OF ${String(content.strengths.length).padStart(2, "0")}`} title={s.title} body={s.body} />,
      });
    });

    content.weaknesses.forEach((w, i) => {
      body.push({
        key: `weakness-${i}`,
        locked: true,
        node: <CardPage kind="warm" indexLabel={`WEAKNESS · ${String(i + 1).padStart(2, "0")} OF ${String(content.weaknesses.length).padStart(2, "0")}`} title={w.title} body={w.body} />,
      });
    });

    body.push({ key: "fit-good", locked: true, node: <FitPage kind="good" label={strings.report.fitGoodLabel} body={content.fit_good} /> });
    body.push({ key: "fit-bad", locked: true, node: <FitPage kind="bad" label={strings.report.fitBadLabel} body={content.fit_bad} /> });

    content.behavior_guides.forEach((g, i) => {
      body.push({
        key: `behavior-${i}`,
        tocLabel: i === 0 ? strings.report.sectionBehaviorMindsetToc : undefined,
        locked: true,
        node: <CardPage kind="blue" indexLabel={`GUIDE · ${String(i + 1).padStart(2, "0")} OF ${String(content.behavior_guides.length).padStart(2, "0")}`} title={g.title} body={g.body} />,
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
      .map((p, i) => (p.tocLabel ? { label: p.tocLabel, pageNumber: i + 3 } : null))
      .filter((x): x is { label: string; pageNumber: number } => !!x);

    const gated = body.map((p) =>
      !unlocked && p.locked ? { ...p, node: <PaywallPage ownedCount={ownedCount} strings={strings} /> } : p
    );

    const total = body.length + 2;

    return [
      { key: "cover", node: <CoverPage title1={content.title_line1} title2={content.title_line2} subtitle={content.subtitle} nickname={`${nickname}${strings.report.nicknameSuffix}`} previewLabel={strings.report.previewLabel} totalPagesLabel={strings.report.totalPagesLabel(total)} /> },
      { key: "toc", node: <TocPage eyebrow={strings.report.tocEyebrow} title={strings.report.tocTitle} entries={tocEntries} /> },
      ...gated,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, resolvedElements, chatExtract, unlocked, ownedCount, strings, locale, quizDiagnosis, nickname, topAnswers]);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(pages.length - 1, index));
    scrollRef.current?.scrollTo({ x: clamped * SCREEN_WIDTH, animated: true });
    setPageIndex(clamped);
  }

  function handleMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
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

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <View style={styles.chrome}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.chromeBack}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
        <Text style={styles.progressCount}>
          {String(pageIndex + 1).padStart(2, "0")}/{String(pages.length).padStart(2, "0")}
        </Text>
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
            <View key={p.key} style={{ width: SCREEN_WIDTH }}>
              {p.node}
            </View>
          ))}
        </ScrollView>

        <Pressable style={styles.tapLeft} onPress={() => goTo(pageIndex - 1)} />
        <Pressable style={styles.tapRight} onPress={() => goTo(pageIndex + 1)} />
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

function TocPage({ eyebrow, title, entries }: { eyebrow: string; title: string; entries: { label: string; pageNumber: number }[] }) {
  return (
    <PageShell paper>
      <Text style={pageStyles.tocEyebrow}>{eyebrow}</Text>
      <Text style={pageStyles.tocTitle}>{title}</Text>
      <View style={pageStyles.tocList}>
        {entries.map((e, i) => (
          <View key={e.label} style={pageStyles.tocRow}>
            <Text style={pageStyles.tocIdx}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={pageStyles.tocName} numberOfLines={1}>
              {e.label}
            </Text>
            <View style={pageStyles.tocDots} />
            <Text style={pageStyles.tocPage}>{String(e.pageNumber).padStart(2, "0")}</Text>
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
  locale,
}: {
  title: string;
  subtitle: string;
  hook?: string;
  dimensionResults?: QuizDiagnosis["dimensionResults"];
  dimensionShortNames?: Record<string, string>;
  nuancedSummary?: string;
  locale: ReturnType<typeof useLocale>["locale"];
}) {
  return (
    <PageShell>
      <Text style={pageStyles.dataTitle}>{title}</Text>
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
    </PageShell>
  );
}

function OhengBarsPage({ title, elements, dominantKey }: { title: string; elements: Record<string, number>; dominantKey: string }) {
  const strings = useStrings();
  return (
    <PageShell>
      <Text style={pageStyles.dataTitle}>{title}</Text>
      <View style={pageStyles.bars}>
        {ELEMENT_KEYS.map((key) => (
          <View key={key} style={pageStyles.barRow}>
            <View style={pageStyles.barLabelRow}>
              <Text style={pageStyles.barLabel}>
                {strings.common.elementLabels[key]}
                {key === dominantKey ? " ·" : ""}
              </Text>
              <Text style={pageStyles.barLabel}>{Math.round(elements[key] ?? 0)}%</Text>
            </View>
            <View style={pageStyles.barTrack}>
              <View style={[pageStyles.barFill, { width: `${elements[key] ?? 0}%`, backgroundColor: ELEMENT_COLOR[key] }]} />
            </View>
          </View>
        ))}
      </View>
    </PageShell>
  );
}

function ElementReadingPage({ pct, reading }: { pct: number; reading: ElementReading }) {
  return (
    <PageShell>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.elemNum}>{Math.round(pct)}%</Text>
        <Text style={pageStyles.elemHeading}>{reading.heading}</Text>
        <Text style={pageStyles.caseBody}>{sentenceLines(reading.body)}</Text>
      </View>
    </PageShell>
  );
}

function ForecastPage({ heading, body, note }: { heading: string; body: string; note: string }) {
  return (
    <PageShell>
      <View style={pageStyles.elemMid}>
        <Text style={pageStyles.elemHeading}>{heading}</Text>
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

function QuotePage({ quote, eyebrow }: { quote: string; eyebrow?: string }) {
  return (
    <PageShell>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <View style={pageStyles.quoteMid}>
        <Text style={pageStyles.pullQuote}>{sentenceLines(quote)}</Text>
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
}: {
  eyebrow: string;
  concernLabel: string;
  concern: string;
  emotionLabel: string;
  emotion: string;
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
      <Text style={pageStyles.breatherTitle}>{heading}</Text>
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
        <Text style={pageStyles.cardTitle}>{title}</Text>
        <Text style={pageStyles.cardBody}>{sentenceLines(body)}</Text>
      </View>
    </PageShell>
  );
}

function FitPage({ kind, label, body }: { kind: "good" | "bad"; label: string; body: string }) {
  const color = kind === "good" ? "#4E8368" : "#C1503B";
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
        <Text style={pageStyles.closingTitle}>{title}</Text>
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
// analysis) — the actionable half of the report. No working purchase button here on
// purpose: real IAP for report unlocks isn't wired yet (see lib/reportEntitlement.ts), and a
// button that looks functional but isn't would repeat the exact dead-affordance bug already
// fixed once this session on web's QAChat install button.
function PaywallPage({ ownedCount, strings }: { ownedCount: number; strings: Dictionary }) {
  const remainingCount = TOTAL_MODULES - ownedCount;
  return (
    <PageShell>
      <View style={pageStyles.paywallMid}>
        <View style={pageStyles.paywallCard}>
          <Lock size={22} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={pageStyles.paywallTitle}>{strings.report.paywallTitle}</Text>
          <Text style={pageStyles.paywallBody}>{strings.report.paywallBody}</Text>
          <Text style={pageStyles.paywallPrice}>
            {formatUsd(REPORT_PRICE)}
            {strings.report.paywallPriceSuffix}
          </Text>
          {ownedCount > 0 && (
            <Text style={pageStyles.paywallBundle}>{strings.report.paywallBundle(remainingCount, formatUsd(remainingBundlePrice(ownedCount)))}</Text>
          )}
          <Text style={pageStyles.paywallComingSoon}>{strings.report.paywallComingSoon}</Text>
        </View>
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
  retryButton: { alignSelf: "flex-start" },
  retryLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12.5, color: COLORS.gold },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 12.5, color: COLORS.subheadline },

  chrome: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  chromeBack: { padding: 4 },
  progressTrack: { flex: 1, height: 3, borderRadius: 2, backgroundColor: "#1C1B24", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2, backgroundColor: COLORS.headline },
  progressCount: { fontFamily: "Manrope_600SemiBold", fontSize: 11, color: COLORS.subheadline, letterSpacing: 0.5, minWidth: 44, textAlign: "right" },

  pagerWrap: { flex: 1, position: "relative" },
  tapLeft: { position: "absolute", top: 0, bottom: 0, left: 0, width: "35%" },
  tapRight: { position: "absolute", top: 0, bottom: 0, left: "35%", right: 0 },

  homeButton: { marginHorizontal: 22, marginBottom: 16, marginTop: 6, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  homeButtonLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.headline },
});

const pageStyles = StyleSheet.create({
  shell: { flex: 1, paddingHorizontal: 26, paddingTop: 8, paddingBottom: 24 },
  shellDark: { backgroundColor: COLORS.background },
  shellPaper: { backgroundColor: PAPER_BG },

  brandRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 18 },
  brandLabel: { fontFamily: "Manrope_700Bold", fontSize: 10, letterSpacing: 3, color: COLORS.gold, textTransform: "uppercase" },

  eyebrow: { fontFamily: "Manrope_700Bold", fontSize: 10.5, letterSpacing: 2, textTransform: "uppercase", color: COLORS.gold, marginBottom: 16 },
  eyebrowInk: { color: "#8A7B54" },

  pageFoot: { marginTop: "auto", flexDirection: "row", justifyContent: "space-between" },
  pageFootText: { fontFamily: "Manrope_600SemiBold", fontSize: 9.5, letterSpacing: 1.5, color: COLORS.footer, textTransform: "uppercase" },

  coverMid: { flex: 1, justifyContent: "flex-start", paddingTop: "18%" },
  coverTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 27, lineHeight: 36, color: COLORS.headline, marginBottom: 4 },
  coverRule: { width: 30, height: 1, backgroundColor: COLORS.gold, marginVertical: 16 },
  coverSub: { fontFamily: "Manrope_500Medium", fontSize: 13, color: COLORS.headline },

  tocEyebrow: { fontFamily: "Manrope_700Bold", fontSize: 10.5, letterSpacing: 2, textTransform: "uppercase", color: "#8A7B54", marginTop: 24, marginBottom: 12 },
  tocTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 24, lineHeight: 31, color: "#22301F", marginBottom: 26 },
  tocList: { gap: 15 },
  tocRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  tocIdx: { fontFamily: "Manrope_600SemiBold", fontSize: 11, color: "#8A7B54", width: 18 },
  tocName: { fontFamily: "Manrope_600SemiBold", fontSize: 13, color: "#22301F", flexShrink: 1 },
  tocDots: { flex: 1, borderBottomWidth: 1, borderBottomColor: "#B7A97D", borderStyle: "dotted", marginBottom: 3 },
  tocPage: { fontFamily: "Manrope_600SemiBold", fontSize: 11.5, color: "#5C5237" },

  narrativeMid: { flex: 1, justifyContent: "flex-start", paddingTop: "16%" },
  narrativeBody: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 19, lineHeight: 31, color: COLORS.headline },
  narrativeCaption: { fontFamily: "Manrope_400Regular", fontSize: 11, lineHeight: 18, color: COLORS.footer, marginTop: 16 },

  caseTag: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
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
  dataSubtitle: { fontFamily: "Manrope_400Regular", fontSize: 11.5, color: COLORS.footer, marginBottom: 18 },
  dataNote: { fontFamily: "Manrope_400Regular", fontSize: 11.5, lineHeight: 18, color: COLORS.footer, marginTop: 18 },
  bars: { gap: 14, marginVertical: 10 },
  barRow: { gap: 5 },
  barLabelRow: { flexDirection: "row", justifyContent: "space-between" },
  barLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 12, color: COLORS.headline },
  barTrack: { height: 8, backgroundColor: "#1C1B24", borderRadius: 999, overflow: "hidden" },
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
  quotePrompt: { fontFamily: "Manrope_400Regular", fontSize: 11, lineHeight: 18, color: COLORS.footer },
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
  chatQuoteLabel: { fontFamily: "Manrope_700Bold", fontSize: 10.5, letterSpacing: 1, color: "#7FA8D6" },
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
  breatherLabelText: { fontFamily: "Manrope_700Bold", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "#4E8368" },
  breatherTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 19, lineHeight: 25, color: COLORS.headline },
  takeawayBox: { marginTop: 18, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14 },
  takeawayText: { fontFamily: "Manrope_400Regular", fontSize: 12.5, lineHeight: 20, color: "#C7C3D1" },
  takeawayBold: { fontFamily: "Manrope_700Bold", color: COLORS.gold },

  cardIndex: { fontFamily: "Manrope_700Bold", fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 20 },
  cardMid: { flex: 1, justifyContent: "flex-start", paddingTop: "20%" },
  cardTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 30, color: COLORS.headline, marginBottom: 14 },
  cardBody: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 23, color: "#C7C3D1" },

  fitLabel: { fontFamily: "Manrope_700Bold", fontSize: 12, marginBottom: 4 },

  closingTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 25, lineHeight: 32, color: COLORS.headline, marginBottom: 4 },
  closingBrand: { paddingTop: 20, borderTopWidth: 1, borderTopColor: COLORS.border },
  disclaimer: { fontFamily: "Manrope_400Regular", fontSize: 10.5, lineHeight: 17, color: COLORS.footer, marginTop: 10 },

  paywallMid: { flex: 1, justifyContent: "center" },
  paywallCard: { alignItems: "center", backgroundColor: "rgba(111,169,139,0.06)", borderWidth: 1, borderColor: "rgba(111,169,139,0.3)", borderRadius: 16, padding: 26, gap: 10 },
  paywallTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 19, color: COLORS.headline, textAlign: "center", marginTop: 4 },
  paywallBody: { fontFamily: "Manrope_400Regular", fontSize: 13, lineHeight: 21, color: "#C7C3D1", textAlign: "center" },
  paywallPrice: { fontFamily: "Manrope_700Bold", fontSize: 17, color: COLORS.gold, marginTop: 6 },
  paywallBundle: { fontFamily: "Manrope_400Regular", fontSize: 12, color: COLORS.subheadline, textAlign: "center" },
  paywallComingSoon: { fontFamily: "Manrope_400Regular", fontSize: 11, color: COLORS.footer, marginTop: 6 },
});
