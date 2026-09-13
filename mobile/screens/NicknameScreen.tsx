import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { useStrings } from "../lib/i18n";
import { ONBOARDING_STEP_INDEX } from "../lib/onboardingSteps";
import { COLORS } from "../theme/colors";

const MAX_LENGTH = 20;

export default function NicknameScreen({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const [focused, setFocused] = useState(false);
  const canProceed = value.trim().length > 0;

  return (
    <OnboardingShell stepIndex={ONBOARDING_STEP_INDEX.nickname} onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading}>{strings.nickname.heading}</Text>
        <Text style={styles.subtext}>{strings.nickname.subtext}</Text>
        <TextInput
          style={[styles.input, focused && styles.inputFocused]}
          placeholder={strings.nickname.placeholder}
          placeholderTextColor={COLORS.disabledText}
          value={value}
          onChangeText={onChange}
          maxLength={MAX_LENGTH}
          autoFocus
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={canProceed ? onNext : undefined}
          returnKeyType="next"
        />
      </View>

      <View style={styles.middle}>
        <AuraNextButton disabled={!canProceed} onPress={onNext} />
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: "6%",
  },
  heading: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 26,
    color: COLORS.headline,
  },
  subtext: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13.5,
    color: COLORS.subheadline,
    marginTop: 10,
    marginBottom: 24,
  },
  input: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputFocused: {
    borderColor: COLORS.gold,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
