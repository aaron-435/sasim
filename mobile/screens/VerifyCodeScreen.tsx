import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import { API_BASE_URL } from "../config";
import { COLORS } from "../theme/colors";

const CODE_LENGTH = 6;

export type VerifiedData = {
  nickname: string;
  track: string;
  sajuResult: unknown;
};

// The other half of the web→app handoff (app/api/verification-code/route.ts's GET):
// someone who ran the Q&A funnel on web gets a 6-digit code there and is meant to enter
// it here to restore the birth data already collected, instead of re-doing all of
// onboarding. Sits between the intro and the nickname step — skipping it goes into
// normal onboarding, same as before this screen existed.
export default function VerifyCodeScreen({
  onVerified,
  onSkip,
  onBack,
}: {
  onVerified: (data: VerifiedData) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canSubmit = code.length === CODE_LENGTH;

  async function handleVerify() {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/verification-code?code=${encodeURIComponent(code)}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "유효하지 않거나 이미 사용된 코드입니다.");
        return;
      }
      onVerified(json);
    } catch {
      setError("네트워크 오류로 코드를 확인하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <OnboardingShell onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading}>인증코드가 있으신가요?</Text>
        <Text style={styles.subtext}>
          웹에서 Q&A를 진행하셨다면, 그때 안내된 6자리 코드를 입력해주세요. 지금까지 입력하신 정보를 그대로 이어서
          사용할 수 있어요.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="000000"
          placeholderTextColor={COLORS.disabledText}
          value={code}
          onChangeText={(v) => setCode(v.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH))}
          keyboardType="number-pad"
          maxLength={CODE_LENGTH}
          autoFocus
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      {/* Skip sits right under the button, inside the same centered group, rather than
          pinned to the bottom edge — that's what put the old "다음" pill close enough
          to collide with Android's gesture nav bar (see AuraNextButton.tsx's note). */}
      <View style={styles.middle}>
        {loading ? (
          <ActivityIndicator color={COLORS.gold} size="large" />
        ) : (
          <AuraNextButton disabled={!canSubmit} onPress={handleVerify} size={190} />
        )}
        <Pressable onPress={onSkip} hitSlop={12} style={styles.skipButton}>
          <Text style={styles.skipLabel}>코드가 없어요, 새로 시작할게요</Text>
        </Pressable>
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
    lineHeight: 20,
    color: COLORS.subheadline,
    marginTop: 10,
    marginBottom: 24,
  },
  input: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 20,
    letterSpacing: 6,
    textAlign: "center",
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 14,
  },
  error: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12.5,
    color: "#CB6249",
    marginTop: 10,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  skipButton: {
    marginTop: 20,
    padding: 8,
  },
  skipLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: COLORS.subheadline,
    textDecorationLine: "underline",
  },
});
