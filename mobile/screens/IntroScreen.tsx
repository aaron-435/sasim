import Sparkles from "lucide-react-native/icons/sparkles";
import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Easing, Linking, Pressable, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import AuraNextButton from "../components/AuraNextButton";
import PatternBackground from "../components/PatternBackground";
import { API_BASE_URL } from "../config";
import { useStrings, useLocale } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

export default function IntroScreen({ onNext, onVerifyCode }: { onNext: () => void; onVerifyCode: () => void }) {
  const strings = useStrings();
  const { locale } = useLocale();
  // 2026-09-13: web's /terms and /privacy now read this — without it, a
  // non-Korean app user tapping these footer links got a Korean-only page
  // even though the content is fully translated (see lib/legalContent.ts).
  const termsUrl = `${API_BASE_URL}/terms?lang=${locale}`;
  const privacyUrl = `${API_BASE_URL}/privacy?lang=${locale}`;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduceMotion) => {
        if (cancelled) return;
        if (reduceMotion) {
          contentAnim.setValue(1);
          ctaAnim.setValue(1);
          return;
        }
        Animated.stagger(180, [
          Animated.timing(contentAnim, { toValue: 1, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.timing(ctaAnim, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]).start();
      });
    return () => {
      cancelled = true;
    };
  }, [contentAnim, ctaAnim]);

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
            <Text style={styles.brandLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>FATESAID</Text>
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
        <Pressable onPress={onVerifyCode} style={styles.verifyLink} accessibilityRole="button" hitSlop={8}>
          <Text style={styles.verifyLinkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.intro.verifyCodeLink}</Text>
        </Pressable>

        <Text style={styles.footer} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
          {strings.intro.freeNote}
          {"\n"}
          {strings.intro.ageNoticePrefix}{" "}
          <Text style={styles.footerLink} accessibilityRole="link" onPress={() => Linking.openURL(termsUrl)}>
            {strings.intro.termsLinkLabel}
          </Text>{" "}
          {strings.intro.ageNoticeAnd}{" "}
          <Text style={styles.footerLink} accessibilityRole="link" onPress={() => Linking.openURL(privacyUrl)}>
            {strings.intro.privacyLinkLabel}
          </Text>
          {strings.intro.ageNoticeSuffix}
        </Text>
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
    paddingHorizontal: 24,
    paddingTop: "10%",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  brandLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
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
    marginTop: 16,
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
  verifyLink: {
    alignSelf: "center",
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: 6,
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
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footerLink: {
    textDecorationLine: "underline",
    color: COLORS.footer,
  },
});
