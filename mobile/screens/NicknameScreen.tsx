import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
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
  const [focused, setFocused] = useState(false);
  const canProceed = value.trim().length > 0;

  return (
    <OnboardingShell stepIndex={0} onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading}>뭐라고 불러 드릴까요?</Text>
        <Text style={styles.subtext}>이 이름으로 결과를 안내해 드릴게요.</Text>
        <TextInput
          style={[styles.input, focused && styles.inputFocused]}
          placeholder="닉네임을 입력하세요"
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
