import { Pressable, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { useStrings } from "../lib/i18n";
import { ONBOARDING_STEP_INDEX } from "../lib/onboardingSteps";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

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
      <View style={styles.top}>
        <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.gender.heading}</Text>
        <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={strings.gender.heading}>
          <Pressable
            style={[styles.option, isFemale === false && styles.optionActive]}
            onPress={() => onChange(false)}
            accessibilityRole="radio"
            accessibilityLabel={strings.gender.male}
            accessibilityState={{ selected: isFemale === false, checked: isFemale === false }}
            aria-selected={isFemale === false}
            aria-checked={isFemale === false}
          >
            <Text style={[styles.optionLabel, isFemale === false && styles.optionLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.gender.male}</Text>
          </Pressable>
          <Pressable
            style={[styles.option, isFemale === true && styles.optionActive]}
            onPress={() => onChange(true)}
            accessibilityRole="radio"
            accessibilityLabel={strings.gender.female}
            accessibilityState={{ selected: isFemale === true, checked: isFemale === true }}
            aria-selected={isFemale === true}
            aria-checked={isFemale === true}
          >
            <Text style={[styles.optionLabel, isFemale === true && styles.optionLabelActive]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.gender.female}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.middle}>
        <AuraNextButton disabled={isFemale === null} onPress={onNext} size={190} />
      </View>
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
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
  },
  option: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
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
