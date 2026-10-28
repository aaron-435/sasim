import Slider from "@react-native-community/slider";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import RotateCcw from "lucide-react-native/icons/rotate-ccw";
import Sparkles from "lucide-react-native/icons/sparkles";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Text from "../components/AppText";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import { elementWithEmoji } from "../lib/elements";
import { success } from "../lib/haptics";
import { useLocale, useStrings } from "../lib/i18n";
import { getLocalizedQuestions, getModuleById, moduleDisplayTitle, resolveModuleLocale } from "../lib/quiz/modules";
import {
  classifyProfile,
  computeAllDimensionResults,
  generateNuancedSummary,
  resolveTypeName,
  scoreSliderValue,
  type DimensionResult,
  type ProfileClassification,
  type QuizAnswerRecord,
} from "../lib/quiz/quizProfile";
import { clearQuizProgress, loadQuizProgress, saveQuizProgress } from "../lib/quizProgressStorage";
import useReducedMotion from "../lib/useReducedMotion";
import { COLORS } from "../theme/colors";
import { EASING } from "../theme/motion";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";
import { ELEMENT_COLORS } from "../lib/elements";


export type QuizDiagnosis = {
  moduleId: string;
  moduleTitle: string;
  /** From this module's ModuleDefinition.track (see lib/quiz/modules.ts) — replaces an
   * earlier hardcoded "romance" that ChatScreen/ReportScreen sent regardless of module. */
  track: "romance" | "career";
  answers: QuizAnswerRecord[];
  dimensionResults: DimensionResult[];
  classification: ProfileClassification;
  typeInfo: { title: string; hook: string };
  nuancedSummary: string;
  dimensionShortNames: Record<string, string>;
  elements: Record<string, number> | null;
  dominantElement: string | null;
};

// Ported from components/QuizScreen.jsx — a generic 30-question runner that renders
// whichever module lib/quiz/modules.ts resolves to. No module-specific UI code here;
// supports "choice" and "slider"/"slider-reverse" item formats (see quizProfile.ts).
export default function QuizScreen({
  moduleId,
  sajuElements,
  sessionId,
  onComplete,
  onBack,
}: {
  moduleId: string;
  sajuElements: Record<string, number> | null;
  sessionId: string;
  onComplete: (diagnosis: QuizDiagnosis) => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const moduleDef = useMemo(() => getModuleById(moduleId) ?? getModuleById("module1")!, [moduleId]);
  const { title: moduleTitle, dimensionLabels, typeNames, dimensionShortNames } = useMemo(
    () => resolveModuleLocale(moduleDef, locale),
    [moduleDef, locale]
  );
  const questions = useMemo(() => getLocalizedQuestions(moduleDef, locale), [moduleDef, locale]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);
  const [sliderValue, setSliderValue] = useState(5);
  // The slider starts at 5, so "Next" without touching it used to record a 5 the
  // user never chose. Require a touch first and say why instead of advancing.
  const [sliderTouched, setSliderTouched] = useState(false);
  const [showSliderHint, setShowSliderHint] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [done, setDone] = useState(false);
  // Display-only highlight for the tapped choice; scoring never reads this.
  const [picked, setPicked] = useState<string | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const reduceMotion = useReducedMotion();
  const questionOpacity = useSharedValue(0);
  const questionX = useSharedValue(0);
  const fillX = useSharedValue(0);

  // Resume: answers saved by an earlier, unfinished run of this module (same language).
  // `loaded` keeps question 1 from flashing before the saved position is applied.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let cancelled = false;
    loadQuizProgress(moduleDef.id, locale).then((saved) => {
      if (cancelled) return;
      const valid = saved.length > 0 && saved.length < questions.length && saved.every((a, i) => a.qId === questions[i]?.id);
      if (valid) {
        setAnswers(saved);
        setIndex(saved.length);
      }
      setLoaded(true);
      // Module id and new/resume only — never the answers or the question number.
      track("quiz_start", { module: moduleDef.id, kind: valid ? "resume" : "new" });
    });
    return () => {
      cancelled = true;
    };
  }, [moduleDef.id, locale, questions]);

  useEffect(() => {
    if (!loaded || done) return;
    if (answers.length > 0) saveQuizProgress(moduleDef.id, locale, answers);
  }, [answers, loaded, done, moduleDef.id, locale]);

  useEffect(() => {
    if (!done) return;
    clearQuizProgress(moduleDef.id);
    track("quiz_complete", { module: moduleDef.id });
  }, [done, moduleDef.id]);

  const current = questions[index];
  const progress = done ? 1 : index / questions.length;

  // Question enter: the block remounts on key={index}, so reset then fade/slide in.
  useEffect(() => {
    questionOpacity.value = 0;
    questionX.value = reduceMotion ? 0 : 20;
    questionOpacity.value = withTiming(1, { duration: 260, easing: EASING.enter });
    questionX.value = withTiming(0, { duration: 260, easing: EASING.enter });
    setPicked(null);
  }, [index, reduceMotion, questionOpacity, questionX]);

  // Question exit: fade/slide out while the 280ms recordAnswer timer runs.
  useEffect(() => {
    if (!transitioning) return;
    questionOpacity.value = withTiming(0, { duration: 200, easing: EASING.exit });
    if (!reduceMotion) {
      questionX.value = withTiming(-20, { duration: 200, easing: EASING.exit });
    }
  }, [transitioning, reduceMotion, questionOpacity, questionX]);

  useEffect(() => {
    fillX.value = withTiming(-(1 - progress) * trackWidth, { duration: 320, easing: EASING.standard });
  }, [progress, trackWidth, fillX]);

  useEffect(() => {
    if (done) success();
  }, [done]);

  const questionStyle = useAnimatedStyle(() => ({
    opacity: questionOpacity.value,
    transform: [{ translateX: questionX.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: fillX.value }],
  }));

  function recordAnswer(label: string, score: number) {
    if (transitioning) return;
    setTransitioning(true);
    setAnswers((prev) => [...prev, { qId: current.id, prompt: current.prompt, label, dimension: current.dimension, score }]);
    setTimeout(() => {
      setSliderValue(5);
      setSliderTouched(false);
      setShowSliderHint(false);
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
      } else {
        setDone(true);
      }
      setTransitioning(false);
    }, 280);
  }

  function handleChoiceSelect(opt: { label: string; score: number }) {
    setPicked(opt.label);
    recordAnswer(opt.label, opt.score);
  }

  function handleSliderTouch() {
    setSliderTouched(true);
    setShowSliderHint(false);
  }

  function handleSliderChange(value: number) {
    setSliderValue(Math.round(value));
    handleSliderTouch();
  }

  function handleSliderSubmit() {
    if (!sliderTouched) {
      setShowSliderHint(true);
      return;
    }
    recordAnswer(`${sliderValue}/10`, scoreSliderValue(current.format as "slider" | "slider-reverse", sliderValue));
  }

  function handleRestart() {
    clearQuizProgress(moduleDef.id);
    track("quiz_start", { module: moduleDef.id, kind: "new" });
    setIndex(0);
    setAnswers([]);
    setSliderValue(5);
    setSliderTouched(false);
    setShowSliderHint(false);
    setDone(false);
  }

  const diagnosis = useMemo((): QuizDiagnosis | null => {
    if (!done) return null;
    const dimensionResults = computeAllDimensionResults(answers, moduleDef.dimensionItemCounts);
    const classification = classifyProfile(dimensionResults);
    const typeInfo = resolveTypeName(classification, typeNames, (dims) => ({
      title: dims.map((d) => dimensionShortNames[d] ?? d).join("+") + " " + strings.quiz.combinedTypeSuffix,
      hook: strings.quiz.combinedTypeHook,
    }));
    const nuancedSummary = generateNuancedSummary(dimensionResults, dimensionLabels, locale);
    const elements = sajuElements ?? null;
    const dominantElement = elements ? Object.entries(elements).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null : null;
    return {
      moduleId: moduleDef.id,
      moduleTitle,
      track: moduleDef.track,
      answers,
      dimensionResults,
      classification,
      typeInfo,
      nuancedSummary,
      dimensionShortNames,
      elements,
      dominantElement,
    };
  }, [answers, done, moduleDef, moduleTitle, sajuElements, strings, dimensionLabels, typeNames, dimensionShortNames, locale]);

  function handleContinue() {
    if (!diagnosis) return;
    if (sessionId) {
      fetch(`${API_BASE_URL}/api/quiz-result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          moduleId: moduleDef.id,
          moduleTitle,
          answers,
          dimensionResults: diagnosis.dimensionResults,
          typeInfo: diagnosis.typeInfo,
          nuancedSummary: diagnosis.nuancedSummary,
        }),
      }).catch(() => {});
    }
    onComplete(diagnosis);
  }

  if (!loaded) return <SafeAreaView style={styles.root} />;

  if (done && diagnosis) {
    const dominantElement = diagnosis.dominantElement;
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.doneContent}>
          <Reveal index={0}>
            <View style={styles.doneBadgeRow}>
              <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
              <Text style={styles.doneBadgeLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.quiz.doneHeader}</Text>
            </View>
          </Reveal>

          <Reveal index={1} style={styles.revealFullWidth}>
            <View style={styles.resultCard}>
              {dominantElement && ELEMENT_COLORS[dominantElement] && (
                <View style={styles.elementChip}>
                  <View style={[styles.elementDot, { backgroundColor: ELEMENT_COLORS[dominantElement] }]} />
                  <Text style={styles.elementChipLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                    {strings.quiz.elementBadgePrefix} {elementWithEmoji(dominantElement, strings.common.elementLabels[dominantElement as keyof typeof strings.common.elementLabels] ?? dominantElement)}
                  </Text>
                </View>
              )}
              <Text style={styles.resultTitle} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{diagnosis.typeInfo.title}</Text>
              <Text style={styles.resultHook} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{diagnosis.typeInfo.hook}</Text>
              <View style={styles.resultFooter}>
                <Text style={styles.resultModuleTitle} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{moduleDisplayTitle(moduleTitle)}</Text>
                <Text style={styles.resultBrand} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.brand}</Text>
              </View>
            </View>
          </Reveal>

          <Reveal index={2}>
            <Text style={styles.moreDetailNote} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.quiz.moreDetail}</Text>
          </Reveal>

          <Reveal index={3} style={styles.revealFullWidth}>
            <PressableScale style={styles.continueButton} onPress={handleContinue} accessibilityRole="button" accessibilityLabel={strings.quiz.continueToChatButton}>
              <Text style={styles.continueLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.quiz.continueToChatButton}</Text>
              <ArrowRight size={17} strokeWidth={2.25} color={COLORS.ctaText} />
            </PressableScale>
          </Reveal>
          <Reveal index={4}>
            <PressableScale style={styles.restartButton} onPress={handleRestart} accessibilityRole="button" accessibilityLabel={strings.quiz.restartButton} haptic="none">
              <RotateCcw size={12} strokeWidth={1.75} color={COLORS.footer} />
              <Text style={styles.restartLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.quiz.restartButton}</Text>
            </PressableScale>
          </Reveal>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const sliderOptions = current.options as { minLabel: string; maxLabel: string };
  // Untouched, the thumb only sits at the midpoint by default; announce that instead of "5 of 10".
  const sliderValueText = sliderTouched
    ? strings.quiz.sliderValueText(sliderValue, 1, 10, sliderOptions.minLabel, sliderOptions.maxLabel)
    : strings.quiz.sliderUnset;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
        </PressableScale>
        <View
          style={styles.progressTrack}
          onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
          accessibilityRole="progressbar"
          accessibilityLabel={strings.quiz.progressA11yLabel(index + 1, questions.length)}
          accessibilityValue={{ min: 1, max: questions.length, now: index + 1 }}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={index + 1}
        >
          <Animated.View style={[styles.progressFill, { width: trackWidth, opacity: trackWidth > 0 ? 1 : 0 }, fillStyle]} />
        </View>
        <Text style={styles.progressLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">{strings.quiz.progressLabel(index + 1, questions.length)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.moduleRow}>
          <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={styles.moduleLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{moduleDisplayTitle(moduleTitle)}</Text>
        </View>
        <Animated.View key={index} style={questionStyle}>
          <Text style={styles.prompt} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{current.prompt}</Text>

          {current.format === "choice" ? (
            <View style={styles.optionList}>
              {(current.options as { label: string; score: number }[]).map((opt) => (
                <PressableScale
                  key={opt.label}
                  style={[styles.optionButton, picked === opt.label && styles.optionButtonPicked]}
                  onPress={() => handleChoiceSelect(opt)}
                  disabled={transitioning}
                  accessibilityRole="button"
                  accessibilityLabel={opt.label}
                  haptic="select"
                  pressedScale={0.98}
                >
                  <Text style={[styles.optionLabel, picked === opt.label && styles.optionLabelPicked]} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{opt.label}</Text>
                </PressableScale>
              ))}
            </View>
          ) : (
            <View>
              <View style={styles.sliderLabelRow} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <Text style={styles.sliderEdgeLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{sliderOptions.minLabel}</Text>
                <Text style={styles.sliderEdgeLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{sliderOptions.maxLabel}</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={10}
                // Ten integer positions have no middle one: untouched, the thumb rests at 5.5 (true
                // center, continuous) and only snaps to whole steps once the user grabs it.
                // 2026-10-12: at 5 it sat visibly left of center on Android.
                step={sliderTouched ? 1 : 0}
                value={sliderTouched ? sliderValue : 5.5}
                onValueChange={handleSliderChange}
                onSlidingStart={handleSliderTouch}
                disabled={transitioning}
                accessibilityLabel={current.prompt}
                accessibilityValue={{ min: 1, max: 10, now: sliderValue, text: sliderValueText }}
                aria-valuemin={1}
                aria-valuemax={10}
                aria-valuenow={sliderValue}
                aria-valuetext={sliderValueText}
                // Untouched: no filled track, muted thumb and a dash, so the default middle
                // position doesn't read as an answer already given.
                minimumTrackTintColor={sliderTouched ? COLORS.gold : COLORS.border}
                maximumTrackTintColor={COLORS.border}
                thumbTintColor={sliderTouched ? COLORS.gold : COLORS.footer}
              />
              <Text
                style={[styles.sliderValue, !sliderTouched && styles.sliderValueUntouched]}
                maxFontSizeMultiplier={MAX_FONT_SCALE.display}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                {sliderTouched ? sliderValue : "–"}
              </Text>
              {showSliderHint && (
                <Text style={styles.sliderHint} maxFontSizeMultiplier={MAX_FONT_SCALE.body} accessibilityLiveRegion="polite" aria-live="polite">
                  {strings.quiz.sliderHint}
                </Text>
              )}
              <PressableScale
                style={[styles.sliderButton, !sliderTouched && styles.sliderButtonUntouched]}
                onPress={handleSliderSubmit}
                disabled={transitioning}
                accessibilityRole="button"
                accessibilityLabel={strings.quiz.nextButton}
                accessibilityHint={sliderTouched ? undefined : strings.quiz.sliderHint}
              >
                <Text style={styles.sliderButtonLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.quiz.nextButton}</Text>
              </PressableScale>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.md,
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.sm,
  },
  backButton: {
    minHeight: 44,
    padding: SPACE.sm,
    marginLeft: -SPACE.sm,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.sm,
  },
  progressLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.footer,
  },
  content: {
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.xl,
    paddingBottom: SPACE.xxl,
  },
  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.lg,
  },
  moduleLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.gold,
  },
  prompt: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.headline,
    marginBottom: SPACE.xl,
  },
  optionList: {
    gap: SPACE.md,
  },
  optionButton: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg,
    ...SHADOW.raised,
  },
  optionLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14.5,
    color: COLORS.headline,
  },
  optionButtonPicked: {
    backgroundColor: "rgba(111,169,139,0.18)",
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  optionLabelPicked: {
    color: COLORS.headline,
  },
  revealFullWidth: {
    width: "100%",
  },
  sliderLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACE.sm,
  },
  sliderEdgeLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.subheadline,
  },
  sliderValue: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 28,
    color: COLORS.gold,
    textAlign: "center",
    marginTop: SPACE.sm,
  },
  sliderValueUntouched: {
    color: COLORS.footer,
  },
  sliderHint: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.subheadline,
    textAlign: "center",
    marginTop: SPACE.md,
  },
  sliderButton: {
    marginTop: SPACE.lg,
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACE.lg,
    alignItems: "center",
  },
  sliderButtonUntouched: {
    opacity: 0.55,
  },
  sliderButtonLabel: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.ctaText,
  },
  doneContent: {
    paddingHorizontal: SPACE.xl,
    paddingTop: SPACE.xxxl,
    paddingBottom: SPACE.xxl,
    alignItems: "center",
  },
  doneBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.xl,
  },
  doneBadgeLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.gold,
  },
  resultCard: {
    width: "100%",
    borderRadius: RADIUS.lg,
    padding: SPACE.xl,
    backgroundColor: "rgba(111,169,139,0.08)",
    ...SHADOW.raised,
  },
  elementChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    alignSelf: "flex-start",
    backgroundColor: SURFACE.floating,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.md,
    marginBottom: SPACE.lg,
  },
  elementDot: {
    width: 7,
    height: 7,
    borderRadius: RADIUS.pill,
  },
  elementChipLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    color: COLORS.headline,
  },
  resultTitle: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 28,
    color: COLORS.headline,
    marginBottom: SPACE.md,
  },
  resultHook: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 22,
    color: COLORS.headline,
    marginBottom: SPACE.xl,
  },
  resultFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACE.lg,
    borderTopWidth: 1,
    borderTopColor: "rgba(111,169,139,0.18)",
  },
  resultModuleTitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.footer,
  },
  resultBrand: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 13,
    color: COLORS.gold,
  },
  moreDetailNote: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 20,
    color: COLORS.footer,
    textAlign: "center",
    marginTop: SPACE.lg,
    marginBottom: SPACE.xl,
  },
  continueButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.sm,
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACE.lg,
  },
  continueLabel: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.ctaText,
  },
  restartButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginTop: SPACE.lg,
    padding: SPACE.sm,
  },
  restartLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.footer,
  },
});
