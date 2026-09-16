import { ArrowLeft } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";

// Split out from HomeScreen's home.philosophy* block (2026-09-16) — the home screen
// keeps just the quote + three principles as a short, emotionally-anchored teaser, and
// this screen holds the longer "how to use Fatesaid" walkthrough plus a proper Saju
// primer (Four Pillars, Day Master, Five Elements, decade cycles) for anyone who taps
// through wanting more. See lib/i18n/*.ts's sajuLearn section for the copy.
export default function SajuLearnScreen({ onBack }: { onBack: () => void }) {
  const strings = useStrings();
  const s = strings.sajuLearn;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.pageTitle}>{s.pageTitle}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{s.usageHeading}</Text>
          <Text style={styles.sectionBody}>{s.usageBody}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{s.introHeading}</Text>
          <Text style={styles.sectionBody}>{s.introBody}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{s.termsHeading}</Text>
          <View style={styles.termList}>
            {s.terms.map((term) => (
              <View key={term.label} style={styles.termCard}>
                <Text style={styles.termLabel}>{term.label}</Text>
                <Text style={styles.termBody}>{term.body}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{s.elementsHeading}</Text>
          <Text style={styles.sectionBody}>{s.elementsBody}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{s.cyclesHeading}</Text>
          <Text style={styles.sectionBody}>{s.cyclesBody}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12 },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  pageTitle: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 24,
    lineHeight: 31,
    color: COLORS.headline,
    marginBottom: 24,
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  section: { marginTop: 24 },
  sectionHeading: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 20,
    color: COLORS.headline,
    marginBottom: 10,
  },
  sectionBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.subheadline,
  },
  termList: { gap: 12 },
  termCard: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
  },
  termLabel: { fontFamily: "Manrope_700Bold", fontSize: 14, color: COLORS.gold },
  termBody: { fontFamily: "Manrope_400Regular", fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, marginTop: 6 },
});
