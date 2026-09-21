import { ArrowLeft, MessageCircleQuestion } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { localizedText } from "../lib/qaBankLocale";
import { COLORS } from "../theme/colors";

type Question = { id: string; text_ko: string; text_en?: string; text_es?: string };
type Subcategory = { id: string; name_ko: string; name_en?: string; name_es?: string; questions: Question[] };

// Ported from components/QAQuestionPage.jsx — scrollable question list for one 중분류
// (~20 questions each). Picking one is the only action here; it's handed back to
// QAScreen, which pushes it as a chat message and fires the actual answer request.
export default function QAQuestionScreen({
  subcategory,
  onBack,
  onSelect,
}: {
  subcategory: Subcategory;
  onBack: () => void;
  onSelect: (q: Question) => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.subcategoryLabel}>{localizedText(subcategory.name_ko, subcategory.name_en, subcategory.name_es, locale)}</Text>
          <Text style={styles.heading}>{strings.qa.subcategoryHeading}</Text>
        </View>

        {subcategory.questions.map((q) => (
          <Pressable key={q.id} style={styles.card} onPress={() => onSelect(q)}>
            <MessageCircleQuestion size={15} strokeWidth={1.75} color={COLORS.subheadline} style={styles.cardIcon} />
            <Text style={styles.cardLabel}>{localizedText(q.text_ko, q.text_en, q.text_es, locale)}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
  },
  backButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: -8,
    marginBottom: 12,
  },
  backLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
  },
  header: {
    marginBottom: 20,
  },
  subcategoryLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  heading: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 24,
    color: COLORS.headline,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  cardIcon: {
    marginTop: 2,
  },
  cardLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.headline,
    flex: 1,
  },
});
