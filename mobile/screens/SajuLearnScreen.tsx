import { useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocale, useStrings } from "../lib/i18n";
import { SAJU_TYPE_CONTENT } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import DayMasterLessonsScreen from "./DayMasterLessonsScreen";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";

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
        <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </PressableScale>

        <Reveal index={0}>
          <Text style={styles.pageTitle}>{s.pageTitle}</Text>
        </Reveal>

        {sajuType && (
          <Reveal index={1}>
            <PressableScale
              style={styles.lessonCard}
              onPress={() => setShowLessons(true)}
              accessibilityRole="button"
              accessibilityLabel={`${strings.lessons.entryTitle}. ${strings.lessons.entryBody(archetypeName)}`}
              pressedScale={0.98}
            >
              <Text style={styles.lessonEyebrow}>{strings.lessons.entryEyebrow}</Text>
              <Text style={styles.lessonTitle}>{strings.lessons.entryTitle}</Text>
              <Text style={styles.lessonBody}>{strings.lessons.entryBody(archetypeName)}</Text>
              <View style={styles.lessonCtaRow}>
                <ArrowRight size={16} strokeWidth={2} color={COLORS.gold} />
              </View>
            </PressableScale>
          </Reveal>
        )}

        <Reveal index={2}>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{s.usageHeading}</Text>
            <Text style={styles.sectionBody}>{s.usageBody}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{s.introHeading}</Text>
            <Text style={styles.sectionBody}>{s.introBody}</Text>
          </View>
        </Reveal>

        <Reveal index={3}>
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
        </Reveal>

        <Reveal index={4}>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{s.elementsHeading}</Text>
            <Text style={styles.sectionBody}>{s.elementsBody}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{s.cyclesHeading}</Text>
            <Text style={styles.sectionBody}>{s.cyclesBody}</Text>
          </View>
        </Reveal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACE.xl, paddingTop: SPACE.sm, paddingBottom: SPACE.xxxl },
  backButton: { flexDirection: "row", alignItems: "center", gap: SPACE.xs, alignSelf: "flex-start", padding: SPACE.sm, marginLeft: -SPACE.sm, marginBottom: SPACE.md, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  pageTitle: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 24,
    lineHeight: 31,
    color: COLORS.headline,
    marginBottom: SPACE.xl,
  },
  lessonCard: {
    backgroundColor: "rgba(111,169,139,0.08)",
    borderRadius: RADIUS.md,
    padding: SPACE.lg,
    marginBottom: SPACE.sm,
    ...SHADOW.raised,
  },
  lessonEyebrow: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold },
  lessonTitle: { fontFamily: FONTS.display, fontSize: 20, lineHeight: 27, color: COLORS.headline, marginTop: SPACE.sm },
  lessonBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, marginTop: SPACE.sm },
  lessonCtaRow: { alignItems: "flex-end", marginTop: SPACE.sm },
  divider: { height: 1, backgroundColor: SURFACE.hairline, marginVertical: SPACE.sm },
  section: { marginTop: SPACE.xl },
  sectionHeading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 20,
    color: COLORS.headline,
    marginBottom: SPACE.md,
  },
  sectionBody: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.subheadline,
  },
  termList: { gap: SPACE.md },
  termCard: {
    backgroundColor: SURFACE.raised,
    borderRadius: RADIUS.md,
    padding: SPACE.lg,
    ...SHADOW.raised,
  },
  termLabel: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.gold },
  termBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, marginTop: SPACE.sm },
});
