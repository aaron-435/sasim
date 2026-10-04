import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import Sparkles from "lucide-react-native/icons/sparkles";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { localizedText } from "../lib/qaBankLocale";
import type { QaSubcategory, QaTopicGroup } from "../lib/qaTopicGroups";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// Ported from components/QASubcategoryPage.jsx — full-screen 중분류 picker. In the app it
// shows one display group (lib/qaTopicGroups.ts), which can hold more than one bank
// category; those then read as labelled sections. No third tier in the data today, so
// picking a subcategory always goes straight to QAQuestionScreen.
export default function QASubcategoryScreen({
  group,
  onBack,
  onSelect,
}: {
  group: QaTopicGroup;
  onBack: () => void;
  onSelect: (sub: QaSubcategory) => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const sectioned = group.categories.length > 1;
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.categoryRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.categoryLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.topicGroups[group.id]}</Text>
          </View>
          <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.qa.categoryHeading}</Text>
        </View>

        {group.categories.map((category) => (
          <View key={category.id} style={sectioned && styles.section}>
            {sectioned && (
              <Text style={styles.sectionLabel} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                {localizedText(category.name_ko, category.name_en, category.name_es, locale)}
              </Text>
            )}
            {category.subcategories.map((sub) => (
              <Pressable
                key={sub.id}
                style={styles.card}
                onPress={() => onSelect(sub)}
                accessibilityRole="button"
                accessibilityLabel={localizedText(sub.name_ko, sub.name_en, sub.name_es, locale)}
              >
                <Text style={styles.cardLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{localizedText(sub.name_ko, sub.name_en, sub.name_es, locale)}</Text>
                <ArrowRight size={16} strokeWidth={2.25} color={COLORS.gold} />
              </Pressable>
            ))}
          </View>
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
    fontFamily: FONTS.regular,
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
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.2,
    color: COLORS.gold,
  },
  heading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 24,
    color: COLORS.headline,
  },
  section: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.subheadline,
    marginBottom: 10,
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
    fontFamily: FONTS.regular,
    fontSize: 14.5,
    color: COLORS.headline,
    flex: 1,
  },
});
