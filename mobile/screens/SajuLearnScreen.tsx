import { useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { SAJU_TYPE_CONTENT } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import DayMasterLessonsScreen from "./DayMasterLessonsScreen";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

// Split out from HomeScreen's home.philosophy* block (2026-09-16) — the home screen
// keeps just the quote + three principles as a short, emotionally-anchored teaser, and
// this screen holds the longer "how to use Fatesaid" walkthrough plus a proper Saju
// primer (Four Pillars, Day Master, Five Elements, decade cycles) for anyone who taps
// through wanting more. See lib/i18n/*.ts's sajuLearn section for the copy.
// 2026-10-06: the "Your Day Master in 10 days" lessons open from a card at the top (a
// sub-view of this screen, like GoodDays inside Fortune), when the reading has a saju type.
export default function SajuLearnScreen({ sajuType, onBack }: { sajuType?: SajuType | null; onBack: () => void }) {
  const strings = useStrings();
  const { locale } = useLocale();
  const s = strings.sajuLearn;
  const [showLessons, setShowLessons] = useState(false);

  if (showLessons && sajuType) return <DayMasterLessonsScreen sajuType={sajuType} onBack={() => setShowLessons(false)} />;
  const archetypeName = sajuType ? (SAJU_TYPE_CONTENT[locale] ?? SAJU_TYPE_CONTENT.en).archetypes[sajuType.archetype]?.name ?? "" : "";

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.pageTitle}>{s.pageTitle}</Text>

        {sajuType && (
          <Pressable
            style={styles.lessonCard}
            onPress={() => setShowLessons(true)}
            accessibilityRole="button"
            accessibilityLabel={`${strings.lessons.entryTitle}. ${strings.lessons.entryBody(archetypeName)}`}
          >
            <Text style={styles.lessonEyebrow}>{strings.lessons.entryEyebrow}</Text>
            <Text style={styles.lessonTitle}>{strings.lessons.entryTitle}</Text>
            <Text style={styles.lessonBody}>{strings.lessons.entryBody(archetypeName)}</Text>
            <View style={styles.lessonCtaRow}>
              <ArrowRight size={16} strokeWidth={2} color={COLORS.gold} />
            </View>
          </Pressable>
        )}

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
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  pageTitle: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 24,
    lineHeight: 31,
    color: COLORS.headline,
    marginBottom: 24,
  },
  lessonCard: {
    borderWidth: 1,
    borderColor: "rgba(111,169,139,0.4)",
    backgroundColor: "rgba(111,169,139,0.08)",
    borderRadius: 14,
    padding: 18,
    marginBottom: 8,
  },
  lessonEyebrow: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold },
  lessonTitle: { fontFamily: FONTS.display, fontSize: 20, lineHeight: 27, color: COLORS.headline, marginTop: 6 },
  lessonBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, marginTop: 6 },
  lessonCtaRow: { alignItems: "flex-end", marginTop: 8 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  section: { marginTop: 24 },
  sectionHeading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 20,
    color: COLORS.headline,
    marginBottom: 10,
  },
  sectionBody: {
    fontFamily: FONTS.regular,
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
  termLabel: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.gold },
  termBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, marginTop: 6 },
});
