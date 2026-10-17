import Sparkles from "lucide-react-native/icons/sparkles";
import { useEffect, useRef } from "react";
import { Animated, Easing, Linking, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import AuraNextButton from "../components/AuraNextButton";
import PatternBackground from "../components/PatternBackground";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { API_BASE_URL } from "../config";
import { useStrings, useLocale } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { SPACE } from "../theme/tokens";
import useReducedMotion from "../lib/useReducedMotion";

export default function IntroScreen({ onNext, onVerifyCode }: { onNext: () => void; onVerifyCode: () => void }) {
  const strings = useStrings();
  const { locale } = useLocale();
  // 2026-09-13: web's /terms and /privacy now read this — without it, a
  // non-Korean app user tapping these footer links got a Korean-only page
  // even though the content is fully translated (see lib/legalContent.ts).
  const termsUrl = `${API_BASE_URL}/terms?lang=${locale}`;
  const privacyUrl = `${API_BASE_URL}/privacy?lang=${locale}`;
  const reduceMotion = useReducedMotion();
  const contentAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMotion) {
      contentAnim.setValue(1);
      ctaAnim.setValue(1);
      return;
    }
    const run = Animated.stagger(180, [
      Animated.timing(contentAnim, { toValue: 1, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(ctaAnim, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]);
    run.start();
    return () => run.stop();
  }, [contentAnim, ctaAnim, reduceMotion]);

  const contentStyle = {
    opacity: contentAnim,
    transform: [{ translateY: contentAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
  };
  const ctaStyle = {
    opacity: ctaAnim,
    transform: [{ scale: ctaAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }],
  };

  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
        <Animated.View style={[styles.content, contentStyle]}>
          <View style={styles.brandRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.brandLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>Fatesaid</Text>
          </View>
          <Text style={styles.headline} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.display}>
            {strings.intro.headlineLine1}
            {"\n"}
            {strings.intro.headlineLine2}
          </Text>
          <Text style={styles.subheadline} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.intro.subheadline}</Text>
        </Animated.View>

        {/* Absolutely centered on the FULL screen, independent of how much space the
            headline/footer take up — keeps the rings and button sharing one exact
            center point instead of drifting toward whichever side has less content.
            No pointerEvents override here — see GoldAura.tsx's note on why "box-none"
            broke the button's touches under react-native-web. */}
        <View style={styles.centerLayer}>
          <Animated.View style={ctaStyle}>
            <AuraNextButton onPress={onNext} size={260} accessibilityLabel={strings.intro.startLabel} />
          </Animated.View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Web-to-app handoff is the minority path, so it waits behind a quiet link instead of
            being a screen every store install has to pass. */}
        {/* Hero keeps its bespoke entrance above; these footer Reveals follow it. */}
        <Reveal index={2} style={styles.footerReveal}>
          <PressableScale onPress={onVerifyCode} style={styles.verifyLink} accessibilityRole="button" hitSlop={8} haptic="none">
            <Text style={styles.verifyLinkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.intro.verifyCodeLink}</Text>
          </PressableScale>
        </Reveal>

        <Reveal index={3} style={styles.footerReveal}>
          <Text style={styles.footer} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
            {strings.intro.freeNote}
            {"\n"}
            {strings.intro.ageNoticeShort}
          </Text>
        </Reveal>
        {/* Real buttons with a 44pt target. Inline links inside the sentence were a few pixels
            tall and hard to hit on a phone (2026-10-04 device test). */}
        <Reveal index={3} style={styles.legalRow}>
          <PressableScale onPress={() => Linking.openURL(termsUrl)} style={styles.legalLink} accessibilityRole="link" hitSlop={6} haptic="none">
            <Text style={styles.footerLink} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.intro.termsLinkLabel}</Text>
          </PressableScale>
          <Text style={styles.legalDot} importantForAccessibility="no" accessibilityElementsHidden>·</Text>
          <PressableScale onPress={() => Linking.openURL(privacyUrl)} style={styles.legalLink} accessibilityRole="link" hitSlop={6} haptic="none">
            <Text style={styles.footerLink} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.intro.privacyLinkLabel}</Text>
          </PressableScale>
        </Reveal>
      </SafeAreaView>
    </PatternBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: SPACE.xl,
    paddingTop: "10%",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.lg,
  },
  brandLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    letterSpacing: 0.4,
    color: COLORS.gold,
  },
  headline: {
    fontFamily: FONTS.display,
    fontVariant: ["lining-nums"],
    fontSize: 32,
    lineHeight: 40,
    color: COLORS.headline,
    textAlign: "center",
  },
  subheadline: {
    fontFamily: FONTS.regular,
    fontSize: 14.5,
    lineHeight: 24,
    color: COLORS.subheadline,
    textAlign: "center",
    marginTop: SPACE.lg,
  },
  centerLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    // react-native-web gives every View an implicit z-index:0, so without an explicit
    // higher value this absolutely-positioned layer still paints BELOW the later
    // flex:1 spacer sibling (same z-index falls back to DOM order) — which silently
    // ate every tap on the button underneath it.
    zIndex: 1,
  },
  // zIndex above centerLayer (1): that full-screen layer otherwise sits on top of these taps.
  // Footer Reveal wrappers carry the same zIndex so taps stay above centerLayer.
  footerReveal: {
    zIndex: 2,
  },
  verifyLink: {
    alignSelf: "center",
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: SPACE.md,
    marginBottom: SPACE.sm,
    zIndex: 2,
  },
  verifyLinkText: {
    fontFamily: FONTS.medium,
    fontSize: 13.5,
    color: COLORS.gold,
    textDecorationLine: "underline",
  },
  footer: {
    zIndex: 2,
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.footer,
    textAlign: "center",
    paddingHorizontal: SPACE.xl,
    paddingBottom: SPACE.xs,
  },
  legalRow: {
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACE.xs,
    paddingBottom: SPACE.lg,
  },
  legalLink: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: SPACE.md,
  },
  legalDot: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.footer,
  },
  footerLink: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    textDecorationLine: "underline",
    color: COLORS.footer,
  },
});
