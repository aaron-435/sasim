import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Text from "../components/AppText";
import AuraNextButton from "../components/AuraNextButton";
import OnboardingShell from "../components/OnboardingShell";
import ElementsLoader from "../components/motion/ElementsLoader";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { track } from "../lib/analytics";
import { redeemHandoff, type HandoffData, type HandoffErrorCode, type LegacySessionData } from "../lib/handoff";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SPACE, SURFACE } from "../theme/tokens";

const CODE_LENGTH = 6;

export type VerifiedData = LegacySessionData;

// The app half of the web→app handoff (lib/handoff.ts). Someone who tapped "Continue in the
// app" on the website (or finished the web Q&A) types the 6-digit code shown there; a
// fatesaid://handoff link lands here with `token` and redeems it without typing. An older
// Q&A code restores the full reading (onVerified); a newer handoff carries only what that
// page asked, and onboarding asks the rest (onHandoff). Skipping goes into normal onboarding.
//
// Errors come from the response's `code`, not the server's message (Korean only), so each
// language gets its own wording.
export default function VerifyCodeScreen({
  token = null,
  onVerified,
  onHandoff,
  onSkip,
  onBack,
}: {
  token?: string | null;
  onVerified: (data: VerifiedData) => void;
  onHandoff: (data: HandoffData) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState<string | null>(null);
  const canSubmit = code.length === CODE_LENGTH;
  const tokenTried = useRef<string | null>(null);

  const errorText = (e: HandoffErrorCode) => {
    const m = strings.verifyCode.errors;
    if (e === "network") return strings.verifyCode.errorNetwork;
    if (token && e === "not_found") return m.linkUsed;
    return m[e];
  };

  async function redeem(query: { t: string } | { code: string }) {
    setLoading(true);
    setError(null);
    const result = await redeemHandoff(query);
    setLoading(false);
    if (!result.ok) return setError(errorText(result.error));
    // Counts only (lib/eventSchema.ts): how it arrived, which web page, how many fields came along.
    const via = "t" in query ? "link" : "code";
    if (result.kind === "session") {
      track("handoff_redeem", { via, kind: "session" });
      onVerified(result.session);
    } else {
      track("handoff_redeem", { via, kind: "handoff", ...(result.source ? { surface: result.source } : {}), value: Object.keys(result.data).length });
      onHandoff(result.data);
    }
  }

  // A link redeems once on arrival; if it fails, the code field below still works.
  useEffect(() => {
    if (!token || tokenTried.current === token) return;
    tokenTried.current = token;
    redeem({ t: token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function handleVerify() {
    if (!canSubmit || loading) return;
    redeem({ code });
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
            autoFocus={!token}
          />
        </Reveal>
        {error && <Text style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{error}</Text>}
      </View>

      {/* Skip sits right under the button, inside the same centered group, rather than
          pinned to the bottom edge — that's what put the old "다음" pill close enough
          to collide with Android's gesture nav bar (see AuraNextButton.tsx's note). */}
      <Reveal index={1} style={styles.middle}>
        {loading ? (
          <>
            <ElementsLoader size="large" />
            {token && <Text style={styles.opening} accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.verifyCode.openingLink}</Text>}
          </>
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
  opening: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    color: COLORS.subheadline,
    marginTop: SPACE.lg,
    textAlign: "center",
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
