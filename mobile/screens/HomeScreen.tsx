import ArrowRight from "lucide-react-native/icons/arrow-right";
import Brain from "lucide-react-native/icons/brain";
import CalendarDays from "lucide-react-native/icons/calendar-days";
import ChevronRight from "lucide-react-native/icons/chevron-right";
import FileText from "lucide-react-native/icons/file-text";
import Heart from "lucide-react-native/icons/heart";
import HelpCircle from "lucide-react-native/icons/circle-question-mark";
import Settings from "lucide-react-native/icons/settings";
import Share2 from "lucide-react-native/icons/share-2";
import Sparkles from "lucide-react-native/icons/sparkles";
import Users from "lucide-react-native/icons/users";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { AppState, Animated, Easing, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import FourPillarsChart, { parseFourPillars } from "../components/FourPillarsChart";
import PatternBackground from "../components/PatternBackground";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import ElementMap from "../components/art/ElementMap";
import ElementColorCard from "../components/ElementColorCard";
import type { ElementColor } from "../lib/elementColorContent";
import { DAILY_FORTUNE_CONTENT, getOverview } from "../lib/dailyFortuneContent";
import { getFortuneStreak, isFortuneOpened, markFortuneOpened } from "../lib/fortuneOpenState";
import { useLocale, useStrings } from "../lib/i18n";
import { hasQaProEntitlement } from "../lib/purchases";
import { getLastQuestion, type LastQuestion } from "../lib/qaHistory";
import { listSavedReports } from "../lib/reportStorage";
import { listPurchasedCompatReports } from "../lib/compatReportStorage";
import { fetchCoupleDaily, type CoupleDaily } from "../lib/pairs";
import type { CompatibilityResult, CompatRelation } from "../lib/compatibility";
import type { SajuType } from "../lib/sajuType";
import { formatSajuTypeName } from "../lib/sajuTypeContent";
import { comingSajuYear } from "../lib/sajuYear";
import { fetchTodayFortune, type TodayFortune } from "../lib/todayFortune";
import { updateTodayWidget } from "../lib/todayWidget";
import { buildTodayWidgetData } from "../lib/todayWidgetData";
import { currentWrappedYear } from "../lib/wrapped";
import type { Track } from "../lib/userConcern";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";
import { FONTS, koDisplay } from "../theme/fonts";
import useReducedMotion from "../lib/useReducedMotion";

// 2026-09-19 redesign (Impeccable critique of this screen, 25/40): Home used to be a
// feature menu — seven same-size solid jade cards under a permanent philosophy essay,
// with the daily rhythm card fifth in line. It is now a path-first home:
//   1. (2026-10-29, iOS 4.3(b) response) the test → conversation → report path card is the one
//      filled surface, right under the greeting; today's rhythm is a quiet secondary card below
//      it — sealed / opened + streak for subscribers, a one-line teaser for free users;
//   2. the five-element chart as "my chart" (since 2026-10-03 the four-pillars picture,
//      which also carries the "most present element" vs "your core" distinction that used
//      to sit under the greeting);
//   3. the remaining features as one quiet grouped list, ordered by the onboarding
//      concern; the chat/report prerequisite is folded into the psych test row's
//      description (the saju type has its own entry: the badge under the greeting);
//   4. the philosophy reduced to one line + the existing SajuLearn link.

type TodayState =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "sealed"; date: string; streak: number }
  | { kind: "opened"; fortune: TodayFortune; streak: number }
  | { kind: "teaser"; relation: CompatibilityResult["relation"] | null };

type FeatureKey = "qa" | "yearReport" | "quiz" | "compat" | "cards" | "reports";

// "romance" is the "사람과의 관계" concern — lead with the relationship feature there.
const FEATURE_ORDER: Record<Track | "default", FeatureKey[]> = {
  // The psych test is not a list row: it is the product's core loop (test → chat → report)
  // and gets its own card under the hero.
  romance: ["compat", "yearReport", "cards", "qa", "reports"],
  career: ["qa", "yearReport", "cards", "compat", "reports"],
  default: ["qa", "yearReport", "cards", "compat", "reports"],
};

const FEATURE_ICONS = { qa: HelpCircle, quiz: Brain, compat: Users, cards: Share2, yearReport: CalendarDays, reports: FileText } as const;

/** One line for the couple card, from the two people's rhythms today (relations are "today vs me"). */
function coupleTip(strings: ReturnType<typeof useStrings>, today: Extract<CoupleDaily, { kind: "today" }>): string {
  const mine = today.self.relation;
  const theirs = today.partner.relation;
  const name = today.partnerName || strings.couple.partnerFallback;
  if (mine === theirs) return strings.couple.tipSame;
  if (mine === "otherChallengesSelf") return strings.couple.tipSelfPace(name);
  if (theirs === "otherChallengesSelf") return strings.couple.tipPartnerPace(name);
  if (mine === "otherNurturesSelf") return strings.couple.tipSelfReceive(name);
  if (theirs === "otherNurturesSelf") return strings.couple.tipPartnerReceive(name);
  return strings.couple.tipDifferent;
}

function localDateKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/** First sentence of a longer body — enough to carry the day's tone on Home without
 * duplicating the full reading. */
function firstSentence(text: string): string {
  const match = text.match(/^.+?[.!?。](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

export default function HomeScreen({
  nickname,
  elements,
  fourPillars,
  sajuType,
  selfDayMasterChar,
  selfDayBranch,
  preferredTrack,
  onOpenQA,
  onOpenQuiz,
  onOpenType,
  onOpenCompatibility,
  onOpenFortune,
  onOpenMyReports,
  onOpenShareCards,
  onOpenYearReport,
  onOpenWrapped,
  qa,
  onOpenSajuLearn,
  onOpenSettings,
}: {
  nickname: string;
  elements: Record<string, number> | null;
  /** The stored reading's `fourPillars`, drawn by FourPillarsChart (null/odd shapes hide it). */
  fourPillars: unknown;
  sajuType: SajuType | null;
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  preferredTrack: Track | null;
  onOpenQA: () => void;
  onOpenQuiz: () => void;
  onOpenType: () => void;
  onOpenCompatibility: () => void;
  onOpenFortune: () => void;
  onOpenMyReports: () => void;
  onOpenShareCards: () => void;
  onOpenYearReport: () => void;
  /** Year Wrapped, offered December 1 – January 31 by the device date (lib/wrapped.ts). */
  onOpenWrapped: (year: number) => void;
  /** Persona test mode (dev web only) — see dev/README.md. Null in every real build. */
  qa?: { level: string; persona: string | null; onOpenSampleReport: () => void; onOpenSampleReportV2?: () => void } | null;
  onOpenSajuLearn: () => void;
  onOpenSettings: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const fortuneContent = DAILY_FORTUNE_CONTENT[locale] ?? DAILY_FORTUNE_CONTENT.ko;
  const dateLine = new Intl.DateTimeFormat(locale, { month: "long", day: "numeric", weekday: "long" }).format(new Date());

  const [today, setToday] = useState<TodayState>({ kind: "loading" });
  const [lastQuestion, setLastQuestion] = useState<LastQuestion | null>(null);
  // Bumped by the retry tap and by returning to the app on a new calendar day.
  const [reloadKey, setReloadKey] = useState(0);
  const loadedDay = useRef(localDateKey());

  const [hasSavedReports, setHasSavedReports] = useState(false);
  // "My reports" also lists purchased compatibility reports, so it opens for those alone too.
  const [hasCompatReports, setHasCompatReports] = useState(false);
  // Couple mode: only when this device is linked (or waiting for the partner to link).
  const [couple, setCouple] = useState<CoupleDaily | null>(null);
  // "오늘 나를 채우는 색" — free for everyone, from the same daily request as the hero.
  const [elementColor, setElementColor] = useState<ElementColor | null>(null);
  const [widgetSource, setWidgetSource] = useState<{ relation: CompatRelation; color: ElementColor | null } | null>(null);
  // Read once per Home visit; the window is a whole month wide, so no live re-check.
  const [wrappedYear] = useState(currentWrappedYear);

  useEffect(() => {
    getLastQuestion().then(setLastQuestion);
    listSavedReports().then((reports) => setHasSavedReports(reports.length > 0));
    listPurchasedCompatReports().then((reports) => setHasCompatReports(reports.length > 0));
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && loadedDay.current !== localDateKey()) setReloadKey((k) => k + 1);
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    let alive = true;
    fetchCoupleDaily().then((c) => alive && setCouple(c));
    return () => {
      alive = false;
    };
  }, [reloadKey]);

  useEffect(() => {
    if (!selfDayMasterChar) return;
    let alive = true;
    loadedDay.current = localDateKey();
    setToday({ kind: "loading" });
    (async () => {
      const [isEntitled, fortune] = await Promise.all([hasQaProEntitlement(), fetchTodayFortune(selfDayMasterChar, selfDayBranch, elements)]);
      if (!alive) return;
      setElementColor(fortune?.elementColor ?? null);
      // Home screen widget: the same free rhythm line + color, for everyone (TODO 12).
      if (fortune?.compatibility) setWidgetSource({ relation: fortune.compatibility.relation, color: fortune.elementColor ?? null });
      if (!isEntitled) {
        // The free teaser works without the reading (a failed request just drops the
        // rhythm line). It names today's rhythm and keeps the why / what-to-do behind Pro.
        setToday({ kind: "teaser", relation: fortune?.compatibility?.relation ?? null });
        return;
      }
      if (!fortune?.compatibility) {
        setToday({ kind: "error" });
        return;
      }
      const [opened, streak] = await Promise.all([isFortuneOpened(fortune.date), getFortuneStreak(fortune.date)]);
      if (!alive) return;
      setToday(opened ? { kind: "opened", fortune, streak } : { kind: "sealed", date: fortune.date, streak });
    })();
    return () => {
      alive = false;
    };
  }, [selfDayMasterChar, selfDayBranch, elements, reloadKey]);

  // Re-run on a language change too, so the widget follows the app language.
  useEffect(() => {
    if (widgetSource) updateTodayWidget(buildTodayWidgetData(strings, locale, widgetSource.relation, widgetSource.color));
  }, [widgetSource, strings, locale]);

  // One authored moment: the hero settles into place. Everything
  // starts visible, so nothing is lost if an animation never runs, and Reduce Motion
  // (iOS) / Remove animations (Android) skips straight to the end state.
  const reduceMotion = useReducedMotion();
  const heroSettle = useRef(new Animated.Value(0)).current;
  const heroPress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduceMotion) {
      heroSettle.setValue(1);
      return;
    }
    const run = Animated.timing(heroSettle, { toValue: 1, duration: 520, easing: Easing.out(Easing.exp), useNativeDriver: true });
    run.start();
    return () => run.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  function pressIn() {
    Animated.spring(heroPress, { toValue: 0.98, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  }
  function pressOut() {
    Animated.spring(heroPress, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  }

  const opened = today.kind === "opened" ? getOverview(fortuneContent, today.fortune.compatibility!.relation, today.fortune.dayMaster.pillarIndex) : null;
  const headline =
    opened?.headline ?? (today.kind === "teaser" && today.relation ? strings.fortune.rhythmNames[today.relation] : null);
  const heroTitle = today.kind === "sealed" ? strings.home.todaySealedTitle : strings.home.todayTitle;
  // Free users see today's real rhythm name (the headline) plus a fixed, judgment-free line
  // pointing at the free overview. 2026-10-03: this used to be a rotating generic sentence
  // (a per-element sentence bank) that could contradict the real overview one tap later. The relation's own
  // body text stays off Home for free users so a warning-toned day never sits above a CTA.
  const heroBody =
    today.kind === "sealed"
      ? strings.fortune.sealBody
      : today.kind === "opened"
        ? firstSentence(opened!.body)
        : today.kind === "error"
          ? strings.fortune.loadErrorText
          : today.kind === "loading"
            ? null
            : strings.home.todayTeaserBody;
  const heroCta =
    today.kind === "sealed"
      ? strings.home.todayOpenCta
      : today.kind === "opened"
        ? strings.home.todayRevisitCta
        : today.kind === "error"
          ? strings.common.retryLabel
          : strings.home.todayOverviewCta;
  // No price or "Pro" tag on Home — the price lives on the screen the card opens, which
  // lays out everything Pro includes. Only the streak shows here.
  const heroChip =
    today.kind === "sealed" && today.streak > 0
      ? strings.fortune.streakBadge(today.streak)
      : today.kind === "opened" && today.streak > 1
        ? strings.fortune.streakBadge(today.streak)
        : null;
  // Tapping the sealed card IS the reveal: mark the day opened here so the Fortune screen opens
  // already revealed. It used to open onto a second seal card, making the daily ritual two
  // taps on two screens.
  const heroPress_ =
    today.kind === "error"
      ? () => setReloadKey((k) => k + 1)
      : today.kind === "loading"
        ? undefined
        : today.kind === "sealed"
          ? () => {
              // Wait for the write so the Fortune screen can't read the day as still unopened.
              markFortuneOpened(today.date)
                .catch(() => {})
                .finally(() => onOpenFortune());
            }
          : onOpenFortune;

  const featureMeta: Record<FeatureKey, { label: string; description: string; onPress: () => void; available: boolean }> = {
    qa: {
      label: strings.home.featureQaLabel,
      description: lastQuestion ? `${strings.home.recentQuestionPrefix} ${lastQuestion.question}` : strings.home.featureQaDescription,
      onPress: onOpenQA,
      available: true,
    },
    quiz: { label: strings.home.featureQuizLabel, description: strings.home.featureQuizDescription, onPress: onOpenQuiz, available: true },
    compat: { label: strings.home.featureCompatLabel, description: strings.home.featureCompatDescription, onPress: onOpenCompatibility, available: true },
    // The cards are built from the saju type, so they need one (same rule as the type badge).
    cards: { label: strings.home.featureCardsLabel, description: strings.home.featureCardsDescription, onPress: onOpenShareCards, available: !!sajuType },
    yearReport: {
      label: strings.home.featureYearReportLabel(comingSajuYear()),
      description: strings.home.featureYearReportDescription,
      onPress: onOpenYearReport,
      available: !!selfDayMasterChar,
    },
    reports: { label: strings.home.featureReportsLabel, description: strings.home.featureReportsDescription, onPress: onOpenMyReports, available: hasSavedReports || hasCompatReports },
  };
  const features = FEATURE_ORDER[preferredTrack ?? "default"].filter((key) => featureMeta[key].available);

  const showChart = !!elements && !!parseFourPillars(fourPillars);

  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Reveal index={0}>
          <View style={styles.header}>
            <View style={styles.headerTopRow}>
              <View style={styles.brandRow}>
                <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
                <Text style={styles.brandLabel}>FATESAID</Text>
              </View>
              <PressableScale
                onPress={onOpenSettings}
                hitSlop={10}
                style={styles.settingsButton}
                accessibilityRole="button"
                accessibilityLabel={strings.home.settingsLabel}
              >
                <Settings size={20} strokeWidth={1.75} color={COLORS.subheadline} />
              </PressableScale>
            </View>
            <View style={styles.greetingRow}>
              <View style={styles.greetingText}>
                <Text style={styles.dateEyebrow}>{dateLine}</Text>
                <Text style={[styles.greeting, locale === "ko" && styles.greetingKo]} accessibilityRole="header">
                  {strings.home.greeting(nickname)}
                </Text>
                <View style={styles.identityRow}>
                  {sajuType && (
                    <PressableScale
                      style={styles.typeBadge}
                      onPress={onOpenType}
                      hitSlop={8}
                      haptic="select"
                      accessibilityRole="button"
                      accessibilityLabel={formatSajuTypeName(locale, sajuType)}
                      accessibilityHint={strings.home.typeBadgeHint}
                    >
                      <Text style={styles.typeBadgeText}>{formatSajuTypeName(locale, sajuType)}</Text>
                      <ChevronRight size={14} strokeWidth={2} color={COLORS.gold} />
                    </PressableScale>
                  )}
                </View>
              </View>
              {elements &&
                (sajuType ? (
                  <PressableScale
                    onPress={onOpenType}
                    haptic="select"
                    accessibilityRole="button"
                    accessibilityLabel={formatSajuTypeName(locale, sajuType)}
                  >
                    <ElementMap elements={elements} seed={selfDayMasterChar ?? nickname} size={76} />
                  </PressableScale>
                ) : (
                  <ElementMap elements={elements} seed={selfDayMasterChar ?? nickname} size={76} />
                ))}
            </View>
          </View>
          </Reveal>

          <Reveal index={1}>
          <PressableScale
            onPress={onOpenQuiz}
            style={styles.pathHero}
            pressedScale={0.98}
            accessibilityRole="button"
            accessibilityLabel={`${hasSavedReports ? strings.home.pathTitleNext : strings.home.pathTitle}. ${strings.home.pathBody}`}
          >
            <LinearGradient
              colors={["#86BCA0", COLORS.gold, "#5C957A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, styles.heroGradient]}
            />
            <View style={styles.pathEyebrowRow}>
              <Brain size={14} strokeWidth={1.75} color={COLORS.ctaText} />
              <Text style={styles.pathHeroEyebrow}>{strings.home.pathEyebrow}</Text>
            </View>
            <Text style={styles.pathHeroTitle}>{hasSavedReports ? strings.home.pathTitleNext : strings.home.pathTitle}</Text>
            <Text style={styles.pathHeroBody}>{strings.home.pathBody}</Text>
            <View style={styles.pathCtaRow}>
              <Text style={styles.pathHeroCta}>{strings.home.pathCta}</Text>
              <ArrowRight size={16} strokeWidth={2} color={COLORS.ctaText} />
            </View>
          </PressableScale>
          </Reveal>

          {selfDayMasterChar && (
          // pressedScale=1: the custom hero spring (pressIn/pressOut) already handles the shrink.
          <PressableScale
            onPress={heroPress_}
            disabled={!heroPress_}
            onPressIn={pressIn}
            onPressOut={pressOut}
            pressedScale={1}
            accessibilityRole="button"
            accessibilityState={{ busy: today.kind === "loading", disabled: !heroPress_ }}
            accessibilityLabel={[heroTitle, headline, heroBody, heroChip].filter(Boolean).join(", ")}
            accessibilityHint={today.kind === "loading" ? undefined : heroCta}
          >
            <Animated.View
              style={[
                styles.hero,
                {
                  transform: [
                    { scale: heroPress },
                    { translateY: heroSettle.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
                  ],
                },
              ]}
            >
              <View style={styles.heroTopRow}>
                <Text style={styles.heroTitle}>{heroTitle}</Text>
                {heroChip && (
                  <View style={styles.heroChip}>
                    <Text style={styles.heroChipText}>{heroChip}</Text>
                  </View>
                )}
              </View>
              {headline && <Text style={styles.heroHeadline}>{headline}</Text>}
              {heroBody ? (
                <Text style={styles.heroBody}>{heroBody}</Text>
              ) : (
                // Fixed-height placeholder lines while the reading loads, so the card
                // doesn't jump when the text arrives.
                <View style={styles.skeletonWrap}>
                  <View style={styles.skeletonLine} />
                  <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
                </View>
              )}
              {today.kind !== "loading" && (
                <View style={styles.heroCtaRow}>
                  <Text style={styles.heroCta}>{heroCta}</Text>
                  <ArrowRight size={15} strokeWidth={2} color={COLORS.gold} />
                </View>
              )}
            </Animated.View>
          </PressableScale>
          )}

          {elementColor && (
            <Reveal index={2}>
              <ElementColorCard color={elementColor} compact onPress={onOpenFortune} />
            </Reveal>
          )}

          {wrappedYear !== null && selfDayMasterChar && (
            <Reveal index={3}>
            <PressableScale
              onPress={() => onOpenWrapped(wrappedYear)}
              style={({ pressed }) => [styles.pathCard, pressed && styles.listRowPressed]}
              pressedScale={0.98}
              accessibilityRole="button"
              accessibilityLabel={`${strings.wrapped.homeTitle(wrappedYear)}. ${strings.wrapped.homeBody}`}
            >
              <View style={styles.pathEyebrowRow}>
                <Sparkles size={14} strokeWidth={1.75} color={COLORS.gold} />
                <Text style={styles.pathEyebrow}>{strings.wrapped.homeEyebrow}</Text>
              </View>
              <Text style={styles.pathTitle}>{strings.wrapped.homeTitle(wrappedYear)}</Text>
              <Text style={styles.pathBody}>{strings.wrapped.homeBody}</Text>
              <View style={styles.pathCtaRow}>
                <Text style={styles.pathCta}>{strings.wrapped.homeCta}</Text>
                <ArrowRight size={15} strokeWidth={2} color={COLORS.gold} />
              </View>
            </PressableScale>
            </Reveal>
          )}

          {couple && couple.kind !== "gone" && (
            <Reveal index={4}>
            <PressableScale
              onPress={
                couple.kind === "locked"
                  ? onOpenFortune
                  : couple.kind === "pending"
                    ? onOpenCompatibility
                    : couple.kind === "error"
                      ? () => setReloadKey((k) => k + 1)
                      : undefined
              }
              disabled={couple.kind === "today"}
              style={({ pressed }) => [styles.coupleCard, pressed && styles.listRowPressed]}
              pressedScale={0.98}
              accessibilityRole={couple.kind === "today" ? "summary" : "button"}
            >
              <View style={styles.pathEyebrowRow}>
                <Heart size={14} strokeWidth={1.75} color={COLORS.gold} />
                <Text style={styles.pathEyebrow}>{strings.couple.homeTitle}</Text>
              </View>
              {couple.kind === "today" && (
                <>
                  <View style={styles.coupleRows}>
                    <View style={styles.coupleRow}>
                      <Text style={styles.coupleName}>{strings.couple.youLabel}</Text>
                      <Text style={styles.coupleRhythm}>{strings.fortune.rhythmNames[couple.self.relation]}</Text>
                    </View>
                    <View style={styles.coupleRow}>
                      <Text style={styles.coupleName} numberOfLines={1}>{couple.partnerName || strings.couple.partnerFallback}</Text>
                      <Text style={styles.coupleRhythm}>{strings.fortune.rhythmNames[couple.partner.relation]}</Text>
                    </View>
                  </View>
                  <Text style={styles.pathBody}>{coupleTip(strings, couple)}</Text>
                </>
              )}
              {couple.kind === "locked" && (
                <>
                  <Text style={styles.pathBody}>{strings.couple.lockedBody}</Text>
                  <View style={styles.pathCtaRow}>
                    <Text style={styles.pathCta}>{strings.couple.lockedCta}</Text>
                    <ArrowRight size={15} strokeWidth={2} color={COLORS.gold} />
                  </View>
                </>
              )}
              {couple.kind === "pending" && <Text style={styles.pathBody}>{strings.couple.pendingHome}</Text>}
              {couple.kind === "error" && <Text style={styles.pathBody}>{strings.fortune.loadErrorText}</Text>}
            </PressableScale>
            </Reveal>
          )}


          {showChart && elements && (
            <Reveal index={6}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, locale === "ko" && styles.sectionTitleKo]} accessibilityRole="header">
                {strings.home.myChartTitle}
              </Text>
              {/* Unboxed on purpose: the tiles below are all tappable cards, so the static
                  chart can't read as something to tap. */}
              <FourPillarsChart fourPillars={fourPillars} elements={elements} />
            </View>
            </Reveal>
          )}

          <Reveal index={7}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, locale === "ko" && styles.sectionTitleKo]} accessibilityRole="header">
              {strings.home.featuresTitle}
            </Text>
            <View style={styles.tileGrid}>
              {features.map((key, i) => {
                const { label, description, onPress } = featureMeta[key];
                const Icon = FEATURE_ICONS[key];
                const fullWidth = i === 0 || (i === features.length - 1 && (features.length - 1) % 2 === 1);
                const iconSize = i === 0 ? 28 : 24;
                return (
                  <Reveal key={key} index={i} delay={400 + i * 50} style={fullWidth ? styles.tileWrapFull : styles.tileWrapHalf}>
                    <PressableScale
                      onPress={onPress}
                      style={[styles.tile, !fullWidth && styles.tileHalf]}
                      pressedScale={0.97}
                      accessibilityRole="button"
                      accessibilityLabel={`${label}. ${description}`}
                    >
                      <View style={styles.tileIconCircle}>
                        <Icon size={iconSize} strokeWidth={1.75} color={COLORS.gold} />
                      </View>
                      <Text style={i === 0 ? styles.tileTitleLarge : styles.tileTitle}>{label}</Text>
                      <Text style={styles.tileDescription} numberOfLines={2}>
                        {description}
                      </Text>
                      {i === 0 && (
                        <View style={styles.tileArrowRow}>
                          <ArrowRight size={16} strokeWidth={2} color={COLORS.gold} />
                        </View>
                      )}
                    </PressableScale>
                  </Reveal>
                );
              })}
            </View>
          </View>
          </Reveal>

          {qa && (
            <View style={styles.qaPanel}>
              <Text style={styles.qaTitle}>
                QA MODE · {qa.level} · persona: {qa.persona ?? "—"}
              </Text>
              <PressableScale onPress={qa.onOpenSampleReport} style={styles.qaButton} accessibilityRole="button" haptic="none">
                <Text style={styles.qaButtonLabel}>Open sample deep report</Text>
              </PressableScale>
              {qa.onOpenSampleReportV2 && (
                <PressableScale onPress={qa.onOpenSampleReportV2} style={styles.qaButton} accessibilityRole="button" haptic="none">
                  <Text style={styles.qaButtonLabel}>Open sample 5-set report (v2)</Text>
                </PressableScale>
              )}
            </View>
          )}

          <View style={styles.footer}>
            <Text style={[styles.philosophyLine, locale === "ko" && styles.philosophyLineKo]}>{strings.home.philosophyLine}</Text>
            <PressableScale onPress={onOpenSajuLearn} style={styles.learnMoreLink} accessibilityRole="link" haptic="none">
              <Text style={styles.learnMoreLinkText}>{strings.home.learnMoreLink}</Text>
              <ArrowRight size={14} strokeWidth={2} color={COLORS.gold} />
            </PressableScale>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PatternBackground>
  );
}

// Secondary text on the jade hero is tinted from the dark foreground (not gray), per the
// contrast rule: rgba(15,26,21,0.85) on #6FA98B stays above 4.5:1.
const HERO_SECONDARY = "rgba(15,26,21,0.85)";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    ...readableColumn,
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.md,
    paddingBottom: SPACE.xxl,
  },
  header: {
    marginBottom: SPACE.xl,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACE.lg,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
  },
  brandLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.gold,
  },
  settingsButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -SPACE.md,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.md,
  },
  greetingText: {
    flex: 1,
  },
  dateEyebrow: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    letterSpacing: 0.4,
    color: COLORS.subheadline,
    marginBottom: SPACE.sm,
  },
  greeting: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.6,
    color: COLORS.headline,
  },
  greetingKo: koDisplay(-0.8),
  identityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: SPACE.md,
    marginTop: SPACE.md,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.xs,
    minHeight: 32,
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.45)",
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.sm,
    paddingLeft: SPACE.md,
    paddingRight: SPACE.sm,
  },
  typeBadgeText: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    color: COLORS.gold,
  },
  hero: {
    marginTop: SPACE.md,
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    padding: SPACE.lg,
    gap: SPACE.xs,
    ...SHADOW.raised,
  },
  pathHero: {
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    padding: SPACE.xl,
    ...SHADOW.raised,
  },
  pathHeroEyebrow: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.ctaText },
  pathHeroTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 24, lineHeight: 29, color: COLORS.ctaText },
  pathHeroBody: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: HERO_SECONDARY, marginTop: SPACE.sm },
  pathHeroCta: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.ctaText },
  heroGradient: {
    borderRadius: RADIUS.lg,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SPACE.md,
  },
  heroTitle: {
    flex: 1,
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.headline,
  },
  heroChip: {
    backgroundColor: "rgba(15,26,21,0.08)",
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.xs,
    paddingHorizontal: SPACE.md,
    marginTop: SPACE.xs,
  },
  heroChipText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.gold,
  },
  heroHeadline: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.headline,
  },
  heroBody: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.subheadline,
  },
  skeletonWrap: {
    gap: SPACE.sm,
    paddingVertical: SPACE.xs,
  },
  skeletonLine: {
    height: 12,
    borderRadius: RADIUS.sm,
    backgroundColor: "rgba(15,26,21,0.08)",
  },
  skeletonLineShort: {
    width: "60%",
  },
  heroCtaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginTop: SPACE.sm,
    minHeight: 24,
  },
  heroCta: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.gold,
  },
  section: {
    marginTop: SPACE.xxl,
  },
  pathCard: {
    marginTop: SPACE.md,
    padding: SPACE.lg,
    borderRadius: RADIUS.md,
    backgroundColor: SURFACE.raised,
    ...SHADOW.raised,
  },
  coupleCard: {
    marginTop: SPACE.md,
    padding: SPACE.lg,
    borderRadius: RADIUS.md,
    backgroundColor: SURFACE.raised,
    ...SHADOW.raised,
  },
  coupleRows: { gap: SPACE.sm, marginBottom: SPACE.xs },
  coupleRow: { flexDirection: "row", alignItems: "baseline", gap: SPACE.md },
  coupleName: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline, minWidth: 56, maxWidth: "45%" },
  coupleRhythm: { flex: 1, fontFamily: FONTS.semibold, fontSize: 15.5, lineHeight: 22, color: COLORS.headline },
  pathEyebrowRow: { flexDirection: "row", alignItems: "center", gap: SPACE.sm, marginBottom: SPACE.sm },
  pathEyebrow: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold },
  pathTitle: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 21, lineHeight: 27, color: COLORS.headline },
  pathBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: SPACE.sm },
  pathCtaRow: { flexDirection: "row", alignItems: "center", gap: SPACE.sm, marginTop: SPACE.lg },
  pathCta: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.gold },
  sectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 20,
    lineHeight: 26,
    color: COLORS.headline,
    marginBottom: SPACE.md,
  },
  sectionTitleKo: koDisplay(),
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: SPACE.md,
  },
  tileWrapFull: {
    width: "100%",
  },
  tileWrapHalf: {
    width: "48%",
  },
  tile: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    padding: SPACE.lg,
    ...SHADOW.raised,
  },
  tileHalf: {
    minHeight: 132,
  },
  tileIconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: "rgba(111,169,139,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  tileTitleLarge: {
    fontFamily: FONTS.semibold,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.headline,
    marginTop: SPACE.md,
  },
  tileTitle: {
    fontFamily: FONTS.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.headline,
    marginTop: SPACE.md,
  },
  tileDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.subheadline,
    marginTop: SPACE.xs,
  },
  tileArrowRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: SPACE.sm,
  },
  listRowPressed: {
    backgroundColor: "rgba(111,169,139,0.08)",
  },
  qaPanel: { marginTop: SPACE.xl, borderWidth: 1, borderStyle: "dashed", borderColor: "rgba(224,162,150,0.6)", borderRadius: RADIUS.sm, padding: SPACE.lg, gap: SPACE.sm },
  qaTitle: { fontFamily: FONTS.semibold, fontSize: 12, color: "#E0A296" },
  qaButton: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start" },
  qaButtonLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold, textDecorationLine: "underline" },
  footer: {
    marginTop: SPACE.xxl,
    gap: SPACE.xs,
  },
  philosophyLine: {
    fontFamily: FONTS.displayItalic,
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.subheadline,
  },
  philosophyLineKo: {
    fontFamily: FONTS.display,
  },
  learnMoreLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    minHeight: 44,
    alignSelf: "flex-start",
  },
  learnMoreLinkText: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    color: COLORS.gold,
  },
});
