import { ArrowRight, Bot, Brain, FileText, HelpCircle, Lock, MessageCircleQuestion, Settings, Shapes, Sparkles, Users } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "../components/PatternBackground";
import { ELEMENT_COLORS, ELEMENT_ORDER } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { getDailyInsight } from "../lib/i18n/dailyInsight";
import { getLastQuestion, type LastQuestion } from "../lib/qaHistory";
import type { SajuType } from "../lib/sajuType";
import { formatSajuTypeName } from "../lib/sajuTypeContent";
import { COLORS } from "../theme/colors";

// "AI 상담" and "심층 리포트" stay non-interactive even though ChatScreen/ReportScreen
// are now built — they're not independently reachable, only as the tail end of the
// 심리테스트 chain (chat needs a quiz diagnosis, report needs quiz+chat context; see
// App.tsx). Giving them their own tappable card with nothing behind it would repeat
// the exact dead-affordance bug already found and fixed on web's QAChat (see
// lib/i18n/ko.ts's qa.appComingSoonLabel) — "ready" here means "has a real entry
// point from Home", not "the screen exists". Only icon/ready are static; label/description
// come from useStrings() so they translate.
const FEATURE_META = [
  { key: "qa", icon: HelpCircle, ready: true },
  { key: "quiz", icon: Brain, ready: true },
  { key: "type", icon: Shapes, ready: true },
  { key: "compat", icon: Users, ready: true },
  { key: "chat", icon: Bot, ready: false },
  { key: "report", icon: FileText, ready: false },
] as const;

const SECTION_COUNT = 6; // header, chart, insight, explainer, feature list, recap

// The one home screen reached from either onboarding path: finishing the full
// nickname→gender→dob→tob→city flow (real /api/saju call), or redeeming a web
// verification code (app/api/verification-code's GET). Both converge on the same
// state — a nickname and a saju reading — so there's exactly one landing screen, not
// two near-duplicates.
export default function HomeScreen({
  nickname,
  dominantElement,
  elements,
  sajuType,
  onOpenQA,
  onOpenQuiz,
  onOpenType,
  onOpenCompatibility,
  onOpenSettings,
}: {
  nickname: string;
  dominantElement: string | null;
  elements: Record<string, number> | null;
  sajuType: SajuType | null;
  onOpenQA: () => void;
  onOpenQuiz: () => void;
  onOpenType: () => void;
  onOpenCompatibility: () => void;
  onOpenSettings: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const FEATURES = [
    { ...FEATURE_META[0], label: strings.home.featureQaLabel, description: strings.home.featureQaDescription },
    { ...FEATURE_META[1], label: strings.home.featureQuizLabel, description: strings.home.featureQuizDescription },
    // ready depends on sajuType actually being available — a null saju type (e.g. an
    // edge case the day-master char failed to parse for) would otherwise land on a
    // blank screen, since App.tsx only renders TypeScreen when sajuType is non-null.
    { ...FEATURE_META[2], ready: !!sajuType, label: strings.home.featureTypeLabel, description: strings.home.featureTypeDescription },
    { ...FEATURE_META[3], label: strings.home.featureCompatLabel, description: strings.home.featureCompatDescription },
    { ...FEATURE_META[4], label: strings.home.featureChatLabel, description: strings.home.featureChatDescription },
    { ...FEATURE_META[5], label: strings.home.featureReportLabel, description: strings.home.featureReportDescription },
  ];
  const handlers: Record<string, () => void> = { qa: onOpenQA, quiz: onOpenQuiz, type: onOpenType, compat: onOpenCompatibility };
  const [lastQuestion, setLastQuestion] = useState<LastQuestion | null | undefined>(undefined);

  useEffect(() => {
    getLastQuestion().then(setLastQuestion);
  }, []);

  const maxPercent = elements ? Math.max(...ELEMENT_ORDER.map((k) => elements[k] ?? 0), 1) : 1;

  const sectionAnims = useRef([...Array(SECTION_COUNT)].map(() => new Animated.Value(0))).current;
  const barGrowth = useRef(new Animated.Value(0)).current;
  const rowScales = useRef(FEATURES.map(() => new Animated.Value(1))).current;
  const recapScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.stagger(
      90,
      sectionAnims.map((anim) =>
        Animated.timing(anim, { toValue: 1, duration: 480, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ),
    ).start();
    // Bar width is a layout property, so it can't ride the native driver like the
    // section fades above — this one animation stays JS-driven, which is fine for a
    // one-off entrance on five thin bars.
    Animated.timing(barGrowth, {
      toValue: 1,
      duration: 850,
      delay: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sectionStyle(index: number) {
    const anim = sectionAnims[index];
    return {
      opacity: anim,
      transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
    };
  }

  function pressIn(anim: Animated.Value) {
    Animated.spring(anim, { toValue: 0.97, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  }
  function pressOut(anim: Animated.Value) {
    Animated.spring(anim, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  }

  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.header, sectionStyle(0)]}>
            <View style={styles.headerTopRow}>
              <View style={styles.brandRow}>
                <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
                <Text style={styles.brandLabel}>FATESAID</Text>
              </View>
              <Pressable onPress={onOpenSettings} hitSlop={10} style={styles.settingsButton}>
                <Settings size={18} strokeWidth={1.75} color={COLORS.subheadline} />
              </Pressable>
            </View>
            <Text style={styles.greeting}>{strings.home.greeting(nickname)}</Text>
            <View style={styles.badgeRow}>
              {dominantElement && (
                <View style={styles.elementBadge}>
                  <Text style={styles.elementBadgeText}>
                    {strings.home.elementBadgePrefix} {strings.common.elementLabels[dominantElement as keyof typeof strings.common.elementLabels] ?? dominantElement}
                  </Text>
                </View>
              )}
              {sajuType && (
                <Pressable style={styles.typeBadge} onPress={onOpenType}>
                  <Text style={styles.typeBadgeText}>{formatSajuTypeName(locale, sajuType)}</Text>
                </Pressable>
              )}
            </View>
            {sajuType && <Text style={styles.typeBadgeTap}>{strings.home.typeBadgeTap}</Text>}
          </Animated.View>

          {elements && (
            <Animated.View style={[styles.section, sectionStyle(1)]}>
              <Text style={styles.sectionLabel}>{strings.home.elementDistribution}</Text>
              <View style={styles.elementChart}>
                {ELEMENT_ORDER.map((key) => {
                  const value = elements[key] ?? 0;
                  const widthPct = Math.max((value / maxPercent) * 100, 4);
                  return (
                    <View key={key} style={styles.elementRow}>
                      <Text style={styles.elementRowLabel}>{strings.common.elementLabels[key as keyof typeof strings.common.elementLabels]}</Text>
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
            </Animated.View>
          )}

          <Animated.View style={[styles.insightCard, sectionStyle(2)]}>
            <Text style={styles.insightLabel}>{strings.home.dailyInsightLabel}</Text>
            <Text style={styles.insightText}>{getDailyInsight(strings, dominantElement)}</Text>
          </Animated.View>

          <Animated.View style={[styles.section, sectionStyle(3)]}>
            <Text style={styles.sectionLabel}>{strings.home.explainerSectionLabel}</Text>
            <View style={styles.explainCard}>
              <Text style={styles.explainHeading}>{strings.home.explainerHeading1}</Text>
              <Text style={styles.explainBody}>{strings.home.explainerBody1}</Text>
              <Text style={styles.explainHeading}>{strings.home.explainerHeading2}</Text>
              <Text style={styles.explainBody}>{strings.home.explainerBody2}</Text>
            </View>
          </Animated.View>

          <Animated.View style={[styles.section, sectionStyle(4)]}>
            <Text style={styles.sectionLabel}>{strings.home.featuresSectionLabel}</Text>
            <View style={styles.featureList}>
              {FEATURES.map(({ key, icon: Icon, label, description, ready }, index) => (
                <Pressable
                  key={key}
                  disabled={!ready}
                  onPress={ready ? handlers[key] : undefined}
                  onPressIn={ready ? () => pressIn(rowScales[index]) : undefined}
                  onPressOut={ready ? () => pressOut(rowScales[index]) : undefined}
                  style={[styles.row, ready && styles.rowReady]}
                >
                  <Animated.View style={[styles.rowInner, { transform: [{ scale: rowScales[index] }] }]}>
                    <View style={[styles.rowIconWrap, ready && styles.rowIconWrapReady]}>
                      <Icon size={20} strokeWidth={1.75} color={ready ? COLORS.ctaText : COLORS.subheadline} />
                    </View>
                    <View style={styles.rowTextWrap}>
                      <Text style={[styles.rowLabel, ready && styles.rowLabelReady]}>{label}</Text>
                      <Text style={[styles.rowDescription, ready && styles.rowDescriptionReady]}>{description}</Text>
                    </View>
                    {ready ? (
                      <ArrowRight size={18} strokeWidth={2} color={COLORS.ctaText} />
                    ) : (
                      <Lock size={15} strokeWidth={1.75} color={COLORS.subheadline} />
                    )}
                  </Animated.View>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          <Animated.View style={[styles.section, sectionStyle(5)]}>
            <Text style={styles.sectionLabel}>{strings.home.recentQuestionLabel}</Text>
            {lastQuestion ? (
              <Pressable
                onPress={onOpenQA}
                onPressIn={() => pressIn(recapScale)}
                onPressOut={() => pressOut(recapScale)}
                style={styles.recapCard}
              >
                <Animated.View style={[styles.recapInner, { transform: [{ scale: recapScale }] }]}>
                  <MessageCircleQuestion size={18} strokeWidth={1.75} color={COLORS.gold} />
                  <View style={styles.recapTextWrap}>
                    <Text style={styles.recapQuestion} numberOfLines={1}>
                      {lastQuestion.question}
                    </Text>
                    <Text style={styles.recapAnswer} numberOfLines={2}>
                      {lastQuestion.answerPreview}
                    </Text>
                  </View>
                  <ArrowRight size={16} strokeWidth={2} color={COLORS.subheadline} />
                </Animated.View>
              </Pressable>
            ) : (
              <Pressable
                onPress={onOpenQA}
                onPressIn={() => pressIn(recapScale)}
                onPressOut={() => pressOut(recapScale)}
                style={styles.recapEmptyCard}
              >
                <Animated.View style={[styles.recapInner, { transform: [{ scale: recapScale }] }]}>
                  <MessageCircleQuestion size={18} strokeWidth={1.75} color={COLORS.subheadline} />
                  <Text style={styles.recapEmptyText}>{strings.home.recentQuestionEmpty}</Text>
                  <ArrowRight size={16} strokeWidth={2} color={COLORS.subheadline} />
                </Animated.View>
              </Pressable>
            )}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </PatternBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: "10%",
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  settingsButton: {
    padding: 6,
    marginRight: -6,
  },
  brandLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  greeting: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 26,
    color: COLORS.headline,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  elementBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(111,169,139,0.12)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.35)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  elementBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12.5,
    color: COLORS.gold,
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.gold,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  typeBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12.5,
    color: COLORS.ctaText,
  },
  typeBadgeTap: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: COLORS.footer,
    marginTop: 6,
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.5,
    color: COLORS.subheadline,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  elementChart: {
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
    width: 40,
    fontFamily: "Manrope_500Medium",
    fontSize: 12.5,
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
    width: 38,
    textAlign: "right",
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: COLORS.subheadline,
  },
  insightCard: {
    backgroundColor: "rgba(111,169,139,0.08)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.25)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 28,
  },
  insightLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.5,
    color: COLORS.gold,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  insightText: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 17,
    lineHeight: 25,
    color: COLORS.headline,
  },
  explainCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 18,
    gap: 8,
  },
  explainHeading: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13.5,
    color: COLORS.headline,
    marginTop: 8,
  },
  explainBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.subheadline,
  },
  featureList: {
    gap: 10,
  },
  row: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowReady: {
    borderStyle: "solid",
    borderColor: COLORS.gold,
    backgroundColor: COLORS.gold,
  },
  rowInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rowIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  rowIconWrapReady: {
    backgroundColor: "rgba(15,26,21,0.14)",
  },
  rowTextWrap: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 15,
    color: COLORS.headline,
  },
  rowLabelReady: {
    color: COLORS.ctaText,
  },
  rowDescription: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: COLORS.footer,
  },
  rowDescriptionReady: {
    color: "rgba(15,26,21,0.72)",
  },
  recapCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
  },
  recapInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  recapTextWrap: {
    flex: 1,
    gap: 4,
  },
  recapQuestion: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13.5,
    color: COLORS.headline,
  },
  recapAnswer: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    lineHeight: 18,
    color: COLORS.subheadline,
  },
  recapEmptyCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
  },
  recapEmptyText: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
  },
});
