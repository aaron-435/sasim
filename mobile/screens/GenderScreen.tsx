import { Pressable, StyleSheet, Text, View } from "react-native";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { COLORS } from "../theme/colors";

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
  return (
    <OnboardingShell stepIndex={1} onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading}>성별</Text>
        <View style={styles.row}>
          <Pressable
            style={[styles.option, isFemale === false && styles.optionActive]}
            onPress={() => onChange(false)}
          >
            <Text style={[styles.optionLabel, isFemale === false && styles.optionLabelActive]}>남성</Text>
          </Pressable>
          <Pressable
            style={[styles.option, isFemale === true && styles.optionActive]}
            onPress={() => onChange(true)}
          >
            <Text style={[styles.optionLabel, isFemale === true && styles.optionLabelActive]}>여성</Text>
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
    fontFamily: "CormorantGaramond_500Medium",
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
    fontFamily: "Manrope_600SemiBold",
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
