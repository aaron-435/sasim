import { ArrowRight, Bot, Brain, FileText, HelpCircle, Lock, MessageCircleQuestion, Sparkles } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "../components/PatternBackground";
import { getDailyInsight } from "../lib/dailyInsight";
import { ELEMENT_COLORS, ELEMENT_LABELS_KO, ELEMENT_ORDER } from "../lib/elements";
import { getLastQuestion, type LastQuestion } from "../lib/qaHistory";
import { COLORS } from "../theme/colors";

// "AI 상담" and "심층 리포트" stay non-interactive even though ChatScreen/ReportScreen
// are now built — they're not independently reachable, only as the tail end of the
// 심리테스트 chain (chat needs a quiz diagnosis, report needs quiz+chat context; see
// App.tsx). Giving them their own tappable card with nothing behind it would repeat
// the exact dead-affordance bug already found and fixed on web's QAChat (see
// lib/i18n/ko.ts's qa.appComingSoonLabel) — "ready" here means "has a real entry
// point from Home", not "the screen exists".
const FEATURES = [
  { key: "qa", icon: HelpCircle, label: "사주 Q&A", description: "궁금한 순간, 지금 바로 물어보세요", ready: true },
  { key: "quiz", icon: Brain, label: "심리테스트", description: "나를 이해하는 첫걸음", ready: true },
  { key: "chat", icon: Bot, label: "AI 상담", description: "심리테스트 완료 후 이용 가능", ready: false },
  { key: "report", icon: FileText, label: "심층 리포트", description: "심리테스트 완료 후 이용 가능", ready: false },
] as const;

// The one home screen reached from either onboarding path: finishing the full
// nickname→gender→dob→tob→city flow (real /api/saju call), or redeeming a web
// verification code (app/api/verification-code's GET). Both converge on the same
// state — a nickname and a saju reading — so there's exactly one landing screen, not
// two near-duplicates.
export default function HomeScreen({
  nickname,
  dominantElement,
  elements,
  onOpenQA,
  onOpenQuiz,
}: {
  nickname: string;
  dominantElement: string | null;
  elements: Record<string, number> | null;
  onOpenQA: () => void;
  onOpenQuiz: () => void;
}) {
  const handlers: Record<string, () => void> = { qa: onOpenQA, quiz: onOpenQuiz };
  const [lastQuestion, setLastQuestion] = useState<LastQuestion | null | undefined>(undefined);

  useEffect(() => {
    getLastQuestion().then(setLastQuestion);
  }, []);

  const maxPercent = elements ? Math.max(...ELEMENT_ORDER.map((k) => elements[k] ?? 0), 1) : 1;

  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
              <Text style={styles.brandLabel}>FATESAID</Text>
            </View>
            <Text style={styles.greeting}>안녕하세요, {nickname}님</Text>
            {dominantElement && (
              <View style={styles.elementBadge}>
                <Text style={styles.elementBadgeText}>오행 · {ELEMENT_LABELS_KO[dominantElement] ?? dominantElement}</Text>
              </View>
            )}
          </View>

          {elements && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>나의 오행 분포</Text>
              <View style={styles.elementChart}>
                {ELEMENT_ORDER.map((key) => {
                  const value = elements[key] ?? 0;
                  const widthPct = Math.max((value / maxPercent) * 100, 4);
                  return (
                    <View key={key} style={styles.elementRow}>
                      <Text style={styles.elementRowLabel}>{ELEMENT_LABELS_KO[key]}</Text>
                      <View style={styles.elementBarTrack}>
                        <View style={[styles.elementBarFill, { width: `${widthPct}%`, backgroundColor: ELEMENT_COLORS[key] }]} />
                      </View>
                      <Text style={styles.elementRowValue}>{Math.round(value)}%</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          <View style={styles.insightCard}>
            <Text style={styles.insightLabel}>오늘의 한마디</Text>
            <Text style={styles.insightText}>{getDailyInsight(dominantElement)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>사주, 어떻게 활용하면 좋을까요</Text>
            <View style={styles.explainCard}>
              <Text style={styles.explainHeading}>사주명리학이란?</Text>
              <Text style={styles.explainBody}>
                사주(四柱)는 태어난 연·월·일·시 네 기둥에 담긴 기운을 오행(목·화·토·금·수)으로 풀어, 타고난 성향과 삶의 흐름을 해석하는
                동양의 전통 학문이에요. 정해진 운명을 점치기보다는, 나를 이루는 균형을 이해하고 스스로를 더 잘 알아가기 위한 도구로 보면
                가장 잘 어울려요.
              </Text>
              <Text style={styles.explainHeading}>이렇게 활용해보세요</Text>
              <Text style={styles.explainBody}>
                먼저 사주 Q&A에서 지금 가장 궁금한 질문 하나를 편하게 물어보세요. 그다음 심리테스트로 나의 성향과 패턴을 진단해보면,
                오행 데이터와 심리 데이터가 함께 맞물리면서 훨씬 입체적인 이해가 가능해져요. 심리테스트를 마치면 AI 상담으로 자연스럽게
                이어지고, 상담이 끝나면 지금까지의 답변을 모두 엮은 나만의 심층 리포트를 받아볼 수 있어요.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>무엇을 해볼까요</Text>
            <View style={styles.featureList}>
              {FEATURES.map(({ key, icon: Icon, label, description, ready }) => (
                <Pressable
                  key={key}
                  disabled={!ready}
                  onPress={ready ? handlers[key] : undefined}
                  style={({ pressed }) => [styles.row, ready && styles.rowReady, ready && pressed && styles.rowPressed]}
                >
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
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>최근 질문</Text>
            {lastQuestion ? (
              <Pressable style={styles.recapCard} onPress={onOpenQA}>
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
              </Pressable>
            ) : (
              <Pressable style={styles.recapEmptyCard} onPress={onOpenQA}>
                <MessageCircleQuestion size={18} strokeWidth={1.75} color={COLORS.subheadline} />
                <Text style={styles.recapEmptyText}>아직 질문한 기록이 없어요 · 첫 질문 물어보기</Text>
                <ArrowRight size={16} strokeWidth={2} color={COLORS.subheadline} />
              </Pressable>
            )}
          </View>
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
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
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
    fontSize: 26,
    color: COLORS.headline,
  },
  elementBadge: {
    alignSelf: "flex-start",
    marginTop: 12,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
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
  rowPressed: {
    opacity: 0.85,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
