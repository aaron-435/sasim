import { ArrowRight, Brain, ChevronRight, HelpCircle, ListChecks, Settings, Shapes, Sparkles, Users } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "../components/PatternBackground";
import { DAILY_FORTUNE_CONTENT, getOverview } from "../lib/dailyFortuneContent";
import { ELEMENT_COLORS, ELEMENT_ORDER } from "../lib/elements";
import { getFortuneStreak, isFortuneOpened } from "../lib/fortuneOpenState";
import { useLocale, useStrings } from "../lib/i18n";
import { getDailyInsight } from "../lib/i18n/dailyInsight";
import { hasQaProEntitlement } from "../lib/purchases";
import { getLastQuestion, type LastQuestion } from "../lib/qaHistory";
import type { SajuType } from "../lib/sajuType";
import { formatSajuTypeName } from "../lib/sajuTypeContent";
import { fetchTodayFortune, type TodayFortune } from "../lib/todayFortune";
import type { Track } from "../lib/userConcern";
import { COLORS } from "../theme/colors";

// 2026-09-19 redesign (Impeccable critique of this screen, 25/40): Home used to be a
// feature menu — seven same-size solid jade cards under a permanent philosophy essay,
// with the daily fortune ritual fifth in line. It is now a quiet daily ritual:
//   1. today's fortune as the one filled surface, right under the greeting — sealed /
//      opened + streak for subscribers, a one-line teaser + honest "Pro" chip for free
//      users (the old row looked free and then hit a paywall);
//   2. the five-element chart as "my chart";
//   3. the remaining features as one quiet grouped list, ordered by the onboarding
//      concern, with the chat/report prerequisite collapsed into a single disabled row
//      (a list icon, not a lock — the lock now only ever means payment, on FortuneScreen);
//   4. the philosophy reduced to one line + the existing SajuLearn link.

type TodayState =
  | { kind: "loading" }
  | { kind: "unavailable" }
  | { kind: "sealed"; streak: number }
  | { kind: "opened"; fortune: TodayFortune; streak: number }
  | { kind: "teaser"; fortune: TodayFortune };

type FeatureKey = "qa" | "quiz" | "type" | "compat";

// "romance" is the "사람과의 관계" concern — lead with the relationship feature there.
const FEATURE_ORDER: Record<Track | "default", FeatureKey[]> = {
  romance: ["compat", "qa", "quiz", "type"],
  career: ["qa", "quiz", "type", "compat"],
  default: ["qa", "quiz", "type", "compat"],
};

const FEATURE_ICONS = { qa: HelpCircle, quiz: Brain, type: Shapes, compat: Users } as const;

export default function HomeScreen({
  nickname,
  dominantElement,
  elements,
  sajuType,
  selfDayMasterChar,
  selfDayBranch,
  preferredTrack,
  onOpenQA,
  onOpenQuiz,
  onOpenType,
  onOpenCompatibility,
  onOpenFortune,
  onOpenSajuLearn,
  onOpenSettings,
}: {
  nickname: string;
  dominantElement: string | null;
  elements: Record<string, number> | null;
  sajuType: SajuType | null;
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  preferredTrack: Track | null;
  onOpenQA: () => void;
  onOpenQuiz: () => void;
  onOpenType: () => void;
  onOpenCompatibility: () => void;
  onOpenFortune: () => void;
  onOpenSajuLearn: () => void;
  onOpenSettings: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const fortuneContent = DAILY_FORTUNE_CONTENT[locale] ?? DAILY_FORTUNE_CONTENT.ko;

  const [today, setToday] = useState<TodayState>({ kind: "loading" });
  const [lastQuestion, setLastQuestion] = useState<LastQuestion | null>(null);

  useEffect(() => {
    getLastQuestion().then(setLastQuestion);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!selfDayMasterChar) {
        setToday({ kind: "unavailable" });
        return;
      }
      const [entitled, fortune] = await Promise.all([hasQaProEntitlement(), fetchTodayFortune(selfDayMasterChar, selfDayBranch)]);
      if (!alive) return;
      if (!fortune?.compatibility) {
        setToday({ kind: "unavailable" });
        return;
      }
      if (!entitled) {
        setToday({ kind: "teaser", fortune });
        return;
      }
      const [opened, streak] = await Promise.all([isFortuneOpened(fortune.date), getFortuneStreak()]);
      if (!alive) return;
      setToday(opened ? { kind: "opened", fortune, streak } : { kind: "sealed", streak });
    })();
    return () => {
      alive = false;
    };
  }, [selfDayMasterChar, selfDayBranch]);

  // One authored moment: the hero settles into place and the chart bars grow. Everything
  // starts visible, so nothing is lost if an animation never runs, and Reduce Motion
  // (iOS) / Remove animations (Android) skips straight to the end state.
  const heroSettle = useRef(new Animated.Value(0)).current;
  const barGrowth = useRef(new Animated.Value(0)).current;
  const heroPress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduceMotion) => {
        if (cancelled) return;
        if (reduceMotion) {
          heroSettle.setValue(1);
          barGrowth.setValue(1);
          return;
        }
        Animated.timing(heroSettle, { toValue: 1, duration: 520, easing: Easing.out(Easing.exp), useNativeDriver: true }).start();
        // Bar width is a layout property, so this one stays JS-driven — fine for a one-off
        // entrance on five thin bars.
        Animated.timing(barGrowth, { toValue: 1, duration: 850, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pressIn() {
    Animated.spring(heroPress, { toValue: 0.98, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  }
  function pressOut() {
    Animated.spring(heroPress, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  }

  const insight = getDailyInsight(strings, dominantElement);
  const headline =
    today.kind === "opened" || today.kind === "teaser"
      ? getOverview(fortuneContent, today.fortune.compatibility!.relation, today.fortune.dayMaster.pillarIndex).headline
      : null;
  const heroTitle = today.kind === "sealed" ? strings.home.todaySealedTitle : strings.home.todayTitle;
  const heroBody = today.kind === "teaser" ? strings.home.todayProNote : insight;
  const heroCta =
    today.kind === "sealed"
      ? strings.home.todayOpenCta
      : today.kind === "opened"
        ? strings.home.todayRevisitCta
        : strings.home.todayFullCta;
  const heroChip =
    today.kind === "teaser"
      ? strings.home.proChip(strings.qa.subscriptionPriceLabel)
      : (today.kind === "sealed" || today.kind === "opened") && today.streak > 0
        ? strings.fortune.streakBadge(today.streak)
        : null;

  const featureMeta: Record<FeatureKey, { label: string; description: string; onPress: () => void; available: boolean }> = {
    qa: {
      label: strings.home.featureQaLabel,
      description: lastQuestion ? `${strings.home.recentQuestionPrefix} ${lastQuestion.question}` : strings.home.featureQaDescription,
      onPress: onOpenQA,
      available: true,
    },
    quiz: { label: strings.home.featureQuizLabel, description: strings.home.featureQuizDescription, onPress: onOpenQuiz, available: true },
    // Only reachable when a saju type exists — App.tsx renders TypeScreen only then.
    type: { label: strings.home.featureTypeLabel, description: strings.home.featureTypeDescription, onPress: onOpenType, available: !!sajuType },
    compat: { label: strings.home.featureCompatLabel, description: strings.home.featureCompatDescription, onPress: onOpenCompatibility, available: true },
  };
  const features = FEATURE_ORDER[preferredTrack ?? "default"].filter((key) => featureMeta[key].available);

  const maxPercent = elements ? Math.max(...ELEMENT_ORDER.map((k) => elements[k] ?? 0), 1) : 1;
  const elementName = dominantElement
    ? (strings.common.elementLabels[dominantElement as keyof typeof strings.common.elementLabels] ?? dominantElement)
    : null;

  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerTopRow}>
              <View style={styles.brandRow}>
                <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
                <Text style={styles.brandLabel}>FATESAID</Text>
              </View>
              <Pressable
                onPress={onOpenSettings}
                hitSlop={10}
                style={styles.settingsButton}
                accessibilityRole="button"
                accessibilityLabel={strings.home.settingsLabel}
              >
                <Settings size={20} strokeWidth={1.75} color={COLORS.subheadline} />
              </Pressable>
            </View>
            <Text style={styles.greeting} accessibilityRole="header">
              {strings.home.greeting(nickname)}
            </Text>
            <View style={styles.identityRow}>
              {elementName && (
                <Text style={styles.elementLine}>
                  {strings.home.elementBadgePrefix} {elementName}
                </Text>
              )}
              {sajuType && (
                <Pressable
                  style={styles.typeBadge}
                  onPress={onOpenType}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityHint={strings.home.typeBadgeHint}
                >
                  <Text style={styles.typeBadgeText}>{formatSajuTypeName(locale, sajuType)}</Text>
                  <ChevronRight size={14} strokeWidth={2} color={COLORS.gold} />
                </Pressable>
              )}
            </View>
          </View>

          <Pressable
            onPress={onOpenFortune}
            onPressIn={pressIn}
            onPressOut={pressOut}
            accessibilityRole="button"
            accessibilityLabel={[heroTitle, headline, heroChip].filter(Boolean).join(", ")}
            accessibilityHint={heroCta}
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
              <Text style={styles.heroBody}>{heroBody}</Text>
              <View style={styles.heroCtaRow}>
                <Text style={styles.heroCta}>{heroCta}</Text>
                <ArrowRight size={16} strokeWidth={2} color={COLORS.ctaText} />
              </View>
            </Animated.View>
          </Pressable>

          {elements && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                {strings.home.myChartTitle}
              </Text>
              <View style={styles.chartCard}>
                {ELEMENT_ORDER.map((key) => {
                  const value = elements[key] ?? 0;
                  const widthPct = Math.max((value / maxPercent) * 100, 4);
                  const label = strings.common.elementLabels[key as keyof typeof strings.common.elementLabels];
                  return (
                    <View key={key} style={styles.elementRow} accessible accessibilityLabel={`${label} ${Math.round(value)}%`}>
                      <Text style={styles.elementRowLabel}>{label}</Text>
                      <View style={styles.elementBarTrack}>
                        <Animated.View
                          style={[
                            styles.elementBarFill,
                            {
                              backgroundColor: ELEMENT_COLORS[key],
                              width: barGrowth.interpolate({ inputRange: [0, 1], outputRange: ["0%", `${widthPct}%`] }),
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.elementRowValue}>{Math.round(value)}%</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle} accessibilityRole="header">
              {strings.home.featuresTitle}
            </Text>
            <View style={styles.list}>
              {features.map((key, index) => {
                const { label, description, onPress } = featureMeta[key];
                const Icon = FEATURE_ICONS[key];
                return (
                  <Pressable
                    key={key}
                    onPress={onPress}
                    android_ripple={{ color: "rgba(111,169,139,0.12)" }}
                    style={({ pressed }) => [styles.listRow, index > 0 && styles.listRowDivider, pressed && styles.listRowPressed]}
                    accessibilityRole="button"
                    accessibilityLabel={`${label}. ${description}`}
                  >
                    <Icon size={20} strokeWidth={1.75} color={COLORS.gold} />
                    <View style={styles.listRowText}>
                      <Text style={styles.listRowLabel}>{label}</Text>
                      <Text style={styles.listRowDescription} numberOfLines={2}>
                        {description}
                      </Text>
                    </View>
                    <ChevronRight size={18} strokeWidth={1.75} color={COLORS.subheadline} />
                  </Pressable>
                );
              })}
              <View
                style={[styles.listRow, styles.listRowDivider]}
                accessible
                accessibilityState={{ disabled: true }}
                accessibilityLabel={`${strings.home.prereqLabel}. ${strings.home.prereqDescription}`}
              >
                <ListChecks size={20} strokeWidth={1.75} color={COLORS.disabledText} />
                <View style={styles.listRowText}>
                  <Text style={[styles.listRowLabel, styles.listRowLabelMuted]}>{strings.home.prereqLabel}</Text>
                  <Text style={styles.listRowDescription}>{strings.home.prereqDescription}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.philosophyLine}>{strings.home.philosophyLine}</Text>
            <Pressable onPress={onOpenSajuLearn} style={styles.learnMoreLink} accessibilityRole="link">
              <Text style={styles.learnMoreLinkText}>{strings.home.learnMoreLink}</Text>
              <ArrowRight size={14} strokeWidth={2} color={COLORS.gold} />
            </Pressable>
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
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brandLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
  },
  settingsButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -12,
  },
  greeting: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 30,
    lineHeight: 36,
    color: COLORS.headline,
  },
  identityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  elementLine: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: COLORS.subheadline,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minHeight: 32,
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.45)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
  },
  typeBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: COLORS.gold,
  },
  hero: {
    backgroundColor: COLORS.gold,
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  heroTitle: {
    flex: 1,
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 24,
    lineHeight: 29,
    color: COLORS.ctaText,
  },
  heroChip: {
    backgroundColor: "rgba(15,26,21,0.14)",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 3,
  },
  heroChipText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: COLORS.ctaText,
  },
  heroHeadline: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.ctaText,
  },
  heroBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: HERO_SECONDARY,
  },
  heroCtaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    minHeight: 24,
  },
  heroCta: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: COLORS.ctaText,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 15,
    color: COLORS.headline,
    marginBottom: 12,
  },
  chartCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  elementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  elementRowLabel: {
    minWidth: 44,
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: COLORS.headline,
  },
  elementBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  elementBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  elementRowValue: {
    minWidth: 40,
    textAlign: "right",
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    fontVariant: ["tabular-nums"],
    color: COLORS.subheadline,
  },
  list: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    overflow: "hidden",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  listRowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  listRowPressed: {
    backgroundColor: "rgba(111,169,139,0.08)",
  },
  listRowText: {
    flex: 1,
    gap: 2,
  },
  listRowLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 15,
    color: COLORS.headline,
  },
  listRowLabelMuted: {
    color: COLORS.subheadline,
  },
  listRowDescription: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
  },
  footer: {
    marginTop: 30,
    gap: 4,
  },
  philosophyLine: {
    fontFamily: "CormorantGaramond_500Medium",
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.subheadline,
  },
  learnMoreLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 44,
    alignSelf: "flex-start",
  },
  learnMoreLinkText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: COLORS.gold,
  },
});
