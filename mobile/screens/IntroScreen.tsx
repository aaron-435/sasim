import { Sparkles } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing, Linking, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import AuraNextButton from "../components/AuraNextButton";
import PatternBackground from "../components/PatternBackground";
import { API_BASE_URL } from "../config";
import { useStrings, useLocale } from "../lib/i18n";
import { COLORS } from "../theme/colors";

export default function IntroScreen({ onNext }: { onNext: () => void }) {
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
    Animated.stagger(180, [
      Animated.timing(contentAnim, { toValue: 1, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(ctaAnim, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
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
            <Text style={styles.brandLabel}>FATESAID</Text>
          </View>
          <Text style={styles.headline}>
            {strings.intro.headlineLine1}
            {"\n"}
            {strings.intro.headlineLine2}
          </Text>
          <Text style={styles.subheadline}>{strings.intro.subheadline}</Text>
        </Animated.View>

        {/* Absolutely centered on the FULL screen, independent of how much space the
            headline/footer take up — keeps the rings and button sharing one exact
            center point instead of drifting toward whichever side has less content.
            No pointerEvents override here — see GoldAura.tsx's note on why "box-none"
            broke the button's touches under react-native-web. */}
        <View style={styles.centerLayer}>
          <Animated.View style={ctaStyle}>
            <AuraNextButton onPress={onNext} size={260} />
          </Animated.View>
        </View>

        <View style={{ flex: 1 }} />

        <Text style={styles.footer}>
          {strings.intro.freeNote}
          {"\n"}
          {strings.intro.ageNoticePrefix}{" "}
          <Text style={styles.footerLink} onPress={() => Linking.openURL(termsUrl)}>
            {strings.intro.termsLinkLabel}
          </Text>{" "}
          {strings.intro.ageNoticeAnd}{" "}
          <Text style={styles.footerLink} onPress={() => Linking.openURL(privacyUrl)}>
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
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  headline: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 32,
    lineHeight: 40,
    color: COLORS.headline,
    textAlign: "center",
  },
  subheadline: {
    fontFamily: "Manrope_400Regular",
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
  footer: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
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
