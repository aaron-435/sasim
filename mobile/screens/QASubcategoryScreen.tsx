import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";

type Subcategory = { id: string; name_ko: string; questions: { id: string; text_ko: string }[] };
type Category = { id: string; name_ko: string; subcategories: Subcategory[] };

// Ported from components/QASubcategoryPage.jsx — full-screen 중분류 picker for one
// 대분류. No third tier in the data today, so picking a subcategory always goes
// straight to QAQuestionScreen (see that file's caller for the branch point).
export default function QASubcategoryScreen({
  category,
  onBack,
  onSelect,
}: {
  category: Category;
  onBack: () => void;
  onSelect: (sub: Subcategory) => void;
}) {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>이전</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.categoryRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.categoryLabel}>{category.name_ko}</Text>
          </View>
          <Text style={styles.heading}>더 자세히 골라주세요</Text>
        </View>

        {category.subcategories.map((sub) => (
          <Pressable key={sub.id} style={styles.card} onPress={() => onSelect(sub)}>
            <Text style={styles.cardLabel}>{sub.name_ko}</Text>
            <ArrowRight size={16} strokeWidth={2.25} color={COLORS.gold} />
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
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  categoryLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 24,
    color: COLORS.headline,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  cardLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14.5,
    color: COLORS.headline,
    flex: 1,
  },
});
