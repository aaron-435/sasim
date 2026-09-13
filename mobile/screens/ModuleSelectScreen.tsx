import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { MODULES } from "../lib/quiz/modules";
import { COLORS } from "../theme/colors";

// Ported from components/ModuleSelect.jsx — picks which of the 11 30-question modules
// to run. Same list web uses (lib/modules.ts, copied verbatim into mobile/lib/quiz/).
export default function ModuleSelectScreen({ onSelect, onBack }: { onSelect: (moduleId: string) => void; onBack: () => void }) {
  const strings = useStrings();
  const { locale } = useLocale();
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.badgeLabel}>{strings.moduleSelect.badge}</Text>
          </View>
          <Text style={styles.heading}>{strings.moduleSelect.heading}</Text>
        </View>

        {MODULES.map((m) => (
          <Pressable key={m.id} style={styles.card} onPress={() => onSelect(m.id)}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{m.title[locale] ?? m.title.ko}</Text>
              <Text style={styles.cardSubtitle}>{m.subtitle[locale] ?? m.subtitle.ko}</Text>
            </View>
            <ArrowRight size={17} strokeWidth={2.25} color={COLORS.gold} />
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
    alignItems: "center",
    marginBottom: 28,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  badgeLabel: {
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
    textAlign: "center",
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
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: COLORS.headline,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    color: COLORS.subheadline,
  },
});
