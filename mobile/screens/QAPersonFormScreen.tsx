import ArrowLeft from "lucide-react-native/icons/arrow-left";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtherBirthFields, type OtherBirthForm } from "../components/OtherBirthForm";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

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
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.qa.personFormHeading}</Text>
        <Text style={styles.intro}>{strings.qa.personFormIntro}</Text>

        <OtherBirthFields form={form} showName={false} />

        <Text style={styles.note}>{strings.qa.personFormNote}</Text>
        {/* Say why the button is dimmed instead of leaving a silent disabled state. */}
        {!form.isComplete && !form.dobInvalid && <Text style={styles.hint}>{strings.compatibility.errorMissing}</Text>}

        <Pressable
          style={[styles.nextButton, !form.isComplete && styles.nextButtonDisabled]}
          onPress={onNext}
          disabled={!form.isComplete}
          accessibilityRole="button"
          accessibilityState={{ disabled: !form.isComplete }}
          accessibilityLabel={strings.qa.personFormNext}
        >
          <Text style={styles.nextButtonLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.qa.personFormNext}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline },
  intro: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: 8, marginBottom: 2 },
  note: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.footer, marginTop: 22 },
  hint: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, marginTop: 10 },
  nextButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
  },
  nextButtonDisabled: { opacity: 0.4 },
  nextButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
});
