import Slider from "@react-native-community/slider";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { ELEMENT_LABELS_KO } from "../lib/elements";
import { getModuleById } from "../lib/quiz/modules";
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
import { COLORS } from "../theme/colors";

const ELEMENT_COLORS: Record<string, string> = {
  wood: "#4E8368",
  fire: "#CB6249",
  earth: "#B98A4E",
  metal: "#C7C3D1",
  water: "#3E6EA0",
};

export type QuizDiagnosis = {
  moduleId: string;
  moduleTitle: string;
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
  const moduleDef = useMemo(() => getModuleById(moduleId) ?? getModuleById("module1")!, [moduleId]);
  const questions = moduleDef.questions;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);
  const [sliderValue, setSliderValue] = useState(5);
  const [transitioning, setTransitioning] = useState(false);
  const [done, setDone] = useState(false);

  const current = questions[index];
  const progress = done ? 1 : index / questions.length;

  function recordAnswer(label: string, score: number) {
    if (transitioning) return;
    setTransitioning(true);
    setAnswers((prev) => [...prev, { qId: current.id, prompt: current.prompt, label, dimension: current.dimension, score }]);
    setTimeout(() => {
      setSliderValue(5);
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
      } else {
        setDone(true);
      }
      setTransitioning(false);
    }, 280);
  }

  function handleChoiceSelect(opt: { label: string; score: number }) {
    recordAnswer(opt.label, opt.score);
  }

  function handleSliderSubmit() {
    recordAnswer(`${sliderValue}/10`, scoreSliderValue(current.format as "slider" | "slider-reverse", sliderValue));
  }

  function handleRestart() {
    setIndex(0);
    setAnswers([]);
    setSliderValue(5);
    setDone(false);
  }

  const diagnosis = useMemo((): QuizDiagnosis | null => {
    if (!done) return null;
    const dimensionResults = computeAllDimensionResults(answers, moduleDef.dimensionItemCounts);
    const classification = classifyProfile(dimensionResults);
    const typeInfo = resolveTypeName(classification, moduleDef.typeNames, (dims) => ({
      title: dims.map((d) => moduleDef.dimensionShortNames[d] ?? d).join("+") + " 복합형",
      hook: "여러 성향이 함께 나타나는 패턴입니다.",
    }));
    const nuancedSummary = generateNuancedSummary(dimensionResults, moduleDef.dimensionLabels);
    const elements = sajuElements ?? null;
    const dominantElement = elements ? Object.entries(elements).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null : null;
    return {
      moduleId: moduleDef.id,
      moduleTitle: moduleDef.title,
      answers,
      dimensionResults,
      classification,
      typeInfo,
      nuancedSummary,
      dimensionShortNames: moduleDef.dimensionShortNames,
      elements,
      dominantElement,
    };
  }, [answers, done, moduleDef, sajuElements]);

  function handleContinue() {
    if (!diagnosis) return;
    if (sessionId) {
      fetch(`${API_BASE_URL}/api/quiz-result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          moduleId: moduleDef.id,
          moduleTitle: moduleDef.title,
          answers,
          dimensionResults: diagnosis.dimensionResults,
          typeInfo: diagnosis.typeInfo,
          nuancedSummary: diagnosis.nuancedSummary,
        }),
      }).catch(() => {});
    }
    onComplete(diagnosis);
  }

  if (done && diagnosis) {
    const dominantElement = diagnosis.dominantElement;
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.doneContent}>
          <View style={styles.doneBadgeRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.doneBadgeLabel}>첫 블루프린트가 완성됐어요</Text>
          </View>

          <View style={styles.resultCard}>
            {dominantElement && ELEMENT_COLORS[dominantElement] && (
              <View style={styles.elementChip}>
                <View style={[styles.elementDot, { backgroundColor: ELEMENT_COLORS[dominantElement] }]} />
                <Text style={styles.elementChipLabel}>오행 · {ELEMENT_LABELS_KO[dominantElement] ?? dominantElement}</Text>
              </View>
            )}
            <Text style={styles.resultTitle}>{diagnosis.typeInfo.title}</Text>
            <Text style={styles.resultHook}>{diagnosis.typeInfo.hook}</Text>
            <View style={styles.resultFooter}>
              <Text style={styles.resultModuleTitle}>{moduleDef.title}</Text>
              <Text style={styles.resultBrand}>Fatesaid</Text>
            </View>
          </View>

          <Text style={styles.moreDetailNote}>더 자세한 분석(오행 궁합, 성향 상세, 상담 대화 기반 인사이트)은 AI 상담을 마친 뒤 리포트에서 확인하실 수 있어요.</Text>

          <Pressable style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueLabel}>AI 상담으로 이어가기</Text>
            <ArrowRight size={17} strokeWidth={2.25} color={COLORS.ctaText} />
          </Pressable>
          <Pressable style={styles.restartButton} onPress={handleRestart}>
            <RotateCcw size={12} strokeWidth={1.75} color={COLORS.footer} />
            <Text style={styles.restartLabel}>다시 풀기</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {index + 1} / {questions.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.moduleRow}>
          <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
          <Text style={styles.moduleLabel}>{moduleDef.title}</Text>
        </View>
        <Text style={styles.prompt}>{current.prompt}</Text>

        {current.format === "choice" ? (
          <View style={styles.optionList}>
            {(current.options as { label: string; score: number }[]).map((opt) => (
              <Pressable key={opt.label} style={styles.optionButton} onPress={() => handleChoiceSelect(opt)} disabled={transitioning}>
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View>
            <View style={styles.sliderLabelRow}>
              <Text style={styles.sliderEdgeLabel}>{(current.options as { minLabel: string; maxLabel: string }).minLabel}</Text>
              <Text style={styles.sliderEdgeLabel}>{(current.options as { minLabel: string; maxLabel: string }).maxLabel}</Text>
            </View>
            <Slider
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={sliderValue}
              onValueChange={setSliderValue}
              disabled={transitioning}
              minimumTrackTintColor={COLORS.gold}
              maximumTrackTintColor={COLORS.border}
              thumbTintColor={COLORS.gold}
            />
            <Text style={styles.sliderValue}>{sliderValue}</Text>
            <Pressable style={styles.sliderButton} onPress={handleSliderSubmit} disabled={transitioning}>
              <Text style={styles.sliderButtonLabel}>다음</Text>
            </Pressable>
          </View>
        )}
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
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: "#1C1B24",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.gold,
    borderRadius: 2,
  },
  progressLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: COLORS.footer,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
  },
  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  moduleLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.5,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  prompt: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.headline,
    marginBottom: 22,
  },
  optionList: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  optionLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14.5,
    color: COLORS.headline,
  },
  sliderLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  sliderEdgeLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: COLORS.subheadline,
  },
  sliderValue: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 28,
    color: COLORS.gold,
    textAlign: "center",
    marginTop: 6,
  },
  sliderButton: {
    marginTop: 18,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  sliderButtonLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: COLORS.ctaText,
  },
  doneContent: {
    paddingHorizontal: 22,
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: "center",
  },
  doneBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  doneBadgeLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.5,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  resultCard: {
    width: "100%",
    borderRadius: 20,
    padding: 26,
    backgroundColor: "rgba(111,169,139,0.08)",
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.28)",
  },
  elementChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 13,
    marginBottom: 18,
  },
  elementDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  elementChipLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#C7C3D1",
  },
  resultTitle: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 28,
    color: COLORS.headline,
    marginBottom: 10,
  },
  resultHook: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13.5,
    lineHeight: 22,
    color: "#C7C3D1",
    marginBottom: 20,
  },
  resultFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(111,169,139,0.18)",
  },
  resultModuleTitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: COLORS.footer,
  },
  resultBrand: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 13,
    color: COLORS.gold,
  },
  moreDetailNote: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    lineHeight: 20,
    color: COLORS.footer,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 22,
  },
  continueButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 16,
  },
  continueLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: COLORS.ctaText,
  },
  restartButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 14,
    padding: 6,
  },
  restartLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: COLORS.footer,
  },
});
