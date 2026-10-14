import ArrowLeft from "lucide-react-native/icons/arrow-left";
import { ScrollView, StyleSheet } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtherBirthFields, type OtherBirthForm } from "../components/OtherBirthForm";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SPACE } from "../theme/tokens";

// "그 사람에 대해 묻기" step 1 (subscribers): the other person's birth data, then the fixed
// question list (QAQuestionScreen). The form state belongs to QAScreen, so coming back here
// from the question list — or asking a second question — keeps what was typed. Nothing here
// is stored; the server uses it for one answer (app/api/qa-answer).
export default function QAPersonFormScreen({
  form,
  onBack,
  onNext,
}: {
  form: OtherBirthForm;
  onBack: () => void;
  onNext: () => void;
}) {
  const strings = useStrings();
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <PressableScale onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel} haptic="none">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </PressableScale>

        <Reveal index={0}>
          <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.qa.personFormHeading}</Text>
          <Text style={styles.intro}>{strings.qa.personFormIntro}</Text>
        </Reveal>

        <OtherBirthFields form={form} showName={false} />

        <Reveal index={1}>
          <Text style={styles.note}>{strings.qa.personFormNote}</Text>
          {/* Say why the button is dimmed instead of leaving a silent disabled state. */}
          {!form.isComplete && !form.dobInvalid && <Text style={styles.hint}>{strings.compatibility.errorMissing}</Text>}

          <PressableScale
            style={[styles.nextButton, !form.isComplete && styles.nextButtonDisabled]}
            onPress={onNext}
            disabled={!form.isComplete}
            accessibilityRole="button"
            accessibilityState={{ disabled: !form.isComplete }}
            accessibilityLabel={strings.qa.personFormNext}
          >
            <Text style={styles.nextButtonLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.personFormNext}</Text>
          </PressableScale>
        </Reveal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: SPACE.xl, paddingTop: SPACE.sm, paddingBottom: SPACE.xxxl },
  backButton: { flexDirection: "row", alignItems: "center", gap: SPACE.xs, alignSelf: "flex-start", padding: SPACE.sm, marginLeft: -SPACE.sm, marginBottom: SPACE.md, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline },
  intro: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: SPACE.sm, marginBottom: SPACE.xs },
  note: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.footer, marginTop: SPACE.xl },
  hint: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, marginTop: SPACE.md },
  nextButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACE.lg,
    marginTop: SPACE.xl,
  },
  nextButtonDisabled: { opacity: 0.4 },
  nextButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
});
