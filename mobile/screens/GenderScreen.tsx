import { StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { useStrings } from "../lib/i18n";
import { ONBOARDING_STEP_INDEX } from "../lib/onboardingSteps";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SPACE, SURFACE } from "../theme/tokens";

export default function GenderScreen({
  isFemale,
  onChange,
  onNext,
  onBack,
}: {
  isFemale: boolean | null;
  onChange: (v: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  return (
    <OnboardingShell stepIndex={ONBOARDING_STEP_INDEX.gender} onBack={onBack}>
      {/* Index 0 is the Shell header. */}
      <Reveal index={1} style={styles.top}>
        <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.gender.heading}</Text>
        <Text style={styles.why} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.gender.why}</Text>
        <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={strings.gender.heading}>
          <PressableScale
            style={[styles.option, isFemale === false && styles.optionActive]}
            onPress={() => onChange(false)}
            accessibilityRole="radio"
            accessibilityLabel={strings.gender.male}
            accessibilityState={{ selected: isFemale === false, checked: isFemale === false }}
            aria-selected={isFemale === false}
            aria-checked={isFemale === false}
            haptic="select"
          >
            <Text style={[styles.optionLabel, isFemale === false && styles.optionLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.gender.male}</Text>
          </PressableScale>
          <PressableScale
            style={[styles.option, isFemale === true && styles.optionActive]}
            onPress={() => onChange(true)}
            accessibilityRole="radio"
            accessibilityLabel={strings.gender.female}
            accessibilityState={{ selected: isFemale === true, checked: isFemale === true }}
            aria-selected={isFemale === true}
            aria-checked={isFemale === true}
            haptic="select"
          >
            <Text style={[styles.optionLabel, isFemale === true && styles.optionLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.gender.female}</Text>
          </PressableScale>
        </View>
      </Reveal>

      <Reveal index={2} style={styles.middle}>
        <AuraNextButton disabled={isFemale === null} onPress={onNext} size={190} />
      </Reveal>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: "6%",
  },
  heading: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 26,
    color: COLORS.headline,
  },
  why: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
    marginTop: SPACE.md,
  },
  row: {
    flexDirection: "row",
    gap: SPACE.md,
    marginTop: SPACE.xl,
  },
  option: {
    flex: 1,
    paddingVertical: SPACE.lg,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
  },
  optionActive: {
    backgroundColor: "rgba(111,169,139,0.12)",
    borderColor: "rgba(111,169,139,0.4)",
  },
  optionLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14.5,
    color: COLORS.subheadline,
  },
  optionLabelActive: {
    color: COLORS.gold,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
