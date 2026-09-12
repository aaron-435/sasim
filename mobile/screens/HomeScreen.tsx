import { Bot, Brain, FileText, HelpCircle, Sparkles } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "../components/PatternBackground";
import { ELEMENT_LABELS_KO } from "../lib/elements";
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
  onOpenQA,
  onOpenQuiz,
}: {
  nickname: string;
  dominantElement: string | null;
  onOpenQA: () => void;
  onOpenQuiz: () => void;
}) {
  const handlers: Record<string, () => void> = { qa: onOpenQA, quiz: onOpenQuiz };
  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
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
              {!ready && <Text style={styles.cardBadge}>준비 중</Text>}
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </PatternBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 24,
  },
  header: {
    marginTop: "10%",
    marginBottom: 32,
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    aspectRatio: 1.1,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
    fontSize: 11,
    color: COLORS.footer,
  },
});
