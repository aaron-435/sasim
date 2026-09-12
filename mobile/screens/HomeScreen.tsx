import { ArrowRight, Bot, Brain, FileText, HelpCircle, MessageCircleQuestion, Sparkles } from "lucide-react-native";
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
  { key: "qa", icon: HelpCircle, label: "사주 Q&A", ready: true },
  { key: "quiz", icon: Brain, label: "심리테스트", ready: true },
  { key: "chat", icon: Bot, label: "AI 상담", ready: false },
  { key: "report", icon: FileText, label: "심층 리포트", ready: false },
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
            <Text style={styles.sectionLabel}>무엇을 해볼까요</Text>
            <View style={styles.grid}>
              {FEATURES.map(({ key, icon: Icon, label, ready }) => (
                <Pressable
                  key={key}
                  disabled={!ready}
                  onPress={ready ? handlers[key] : undefined}
                  style={({ pressed }) => [styles.card, ready && styles.cardReady, ready && pressed && styles.cardPressed]}
                >
                  <Icon size={22} strokeWidth={1.75} color={ready ? COLORS.gold : COLORS.subheadline} />
                  <Text style={[styles.cardLabel, ready && styles.cardLabelReady]}>{label}</Text>
                  {!ready && <Text style={styles.cardBadge}>심리테스트 완료 후 이용 가능</Text>}
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
    lineHeight: 24,
    color: COLORS.headline,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    minHeight: 132,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  cardReady: {
    borderStyle: "solid",
    borderColor: "rgba(111,169,139,0.35)",
    backgroundColor: "rgba(111,169,139,0.08)",
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: COLORS.headline,
  },
  cardLabelReady: {
    color: COLORS.gold,
  },
  cardBadge: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10.5,
    color: COLORS.footer,
    textAlign: "center",
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
