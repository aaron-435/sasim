import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import ElementsLoader from "../components/motion/ElementsLoader";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { API_BASE_URL } from "../config";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SPACE, SURFACE } from "../theme/tokens";

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
  const strings = useStrings();
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
        setError(json.error || strings.verifyCode.errorDefault);
        return;
      }
      onVerified(json);
    } catch {
      setError(strings.verifyCode.errorNetwork);
    } finally {
      setLoading(false);
    }
  }

  return (
    <OnboardingShell onBack={onBack}>
      <View style={styles.top}>
        <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>{strings.verifyCode.heading}</Text>
        <Reveal index={0}>
          <Text style={styles.subtext} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.verifyCode.subtext}</Text>
          <TextInput
            style={styles.input}
            placeholder={strings.verifyCode.placeholder}
            accessibilityLabel={strings.verifyCode.inputLabel}
            maxFontSizeMultiplier={MAX_FONT_SCALE.control}
            placeholderTextColor={COLORS.placeholder}
            value={code}
            onChangeText={(v) => setCode(v.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH))}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            autoFocus
          />
        </Reveal>
        {error && <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{error}</Text>}
      </View>

      {/* Skip sits right under the button, inside the same centered group, rather than
          pinned to the bottom edge — that's what put the old "다음" pill close enough
          to collide with Android's gesture nav bar (see AuraNextButton.tsx's note). */}
      <Reveal index={1} style={styles.middle}>
        {loading ? (
          <ElementsLoader size="large" />
        ) : (
          <AuraNextButton disabled={!canSubmit} onPress={handleVerify} size={190} />
        )}
        <PressableScale
          onPress={onSkip}
          hitSlop={12}
          style={styles.skipButton}
          accessibilityRole="button"
          accessibilityLabel={strings.verifyCode.skipLabel}
          haptic="none"
        >
          <Text style={styles.skipLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.verifyCode.skipLabel}</Text>
        </PressableScale>
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
  subtext: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
    marginTop: SPACE.md,
    marginBottom: SPACE.xl,
  },
  input: {
    fontFamily: FONTS.semibold,
    fontSize: 20,
    letterSpacing: 6,
    textAlign: "center",
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACE.lg,
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: COLORS.danger,
    marginTop: SPACE.md,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  skipButton: {
    marginTop: SPACE.xl,
    padding: SPACE.sm,
  },
  skipLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    color: COLORS.subheadline,
    textDecorationLine: "underline",
  },
});
