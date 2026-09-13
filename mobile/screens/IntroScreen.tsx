import { Sparkles } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing, Linking, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import AuraNextButton from "../components/AuraNextButton";
import PatternBackground from "../components/PatternBackground";
import { API_BASE_URL } from "../config";
import { COLORS } from "../theme/colors";

const TERMS_URL = `${API_BASE_URL}/terms`;
const PRIVACY_URL = `${API_BASE_URL}/privacy`;

export default function IntroScreen({ onNext }: { onNext: () => void }) {
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
            운명은 이미 말했습니다.{"\n"}이제 당신이 답할 차례입니다.
          </Text>
          <Text style={styles.subheadline}>운명을 바꾸고 싶나요? 사주를 분석하고 지금 시작하세요.</Text>
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
          무료 10분 리딩 · 신용카드 불필요{"\n"}
          만 14세 이상만 이용할 수 있어요 ·{" "}
          <Text style={styles.footerLink} onPress={() => Linking.openURL(TERMS_URL)}>
            이용약관
          </Text>{" "}
          및{" "}
          <Text style={styles.footerLink} onPress={() => Linking.openURL(PRIVACY_URL)}>
            개인정보처리방침
          </Text>
          에 동의합니다
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
