// Ceremonial reveal wrapper for the post-onboarding type card — a beat of
// stillness, an expanding five-element light ring behind the card, then the
// card turning to face the reader. The everyday entry (ceremony=false) gets a
// light fade only. Transform/opacity stay on the UI thread throughout.
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { success } from "../../lib/haptics";
import useReducedMotion from "../../lib/useReducedMotion";
import { EASING } from "../../theme/motion";

const RING_DELAY_MS = 300;
const RING_ECHO_DELAY_MS = 500;
const RING_DURATION_MS = 900;
const CARD_DELAY_MS = 400;
const CARD_DURATION_MS = 700;
const HAPTIC_DELAY_MS = 1100;
const SIMPLE_DURATION_MS = 360;

export default function RevealCard({
  tint,
  ceremony,
  onSettled,
  style,
  children,
}: {
  tint: string;
  ceremony: boolean;
  onSettled?: () => void;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const card = useSharedValue(reduceMotion ? 1 : 0);
  const ring1 = useSharedValue(reduceMotion ? 1 : 0);
  const ring2 = useSharedValue(reduceMotion ? 1 : 0);
  const settledRef = useRef(false);
  const settledCallbackRef = useRef(onSettled);
  settledCallbackRef.current = onSettled;

  const fireSettled = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;
    settledCallbackRef.current?.();
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      card.value = 1;
      ring1.value = 1;
      ring2.value = 1;
      fireSettled();
      return;
    }
    if (ceremony) {
      ring1.value = withDelay(RING_DELAY_MS, withTiming(1, { duration: RING_DURATION_MS, easing: EASING.exit }));
      ring2.value = withDelay(RING_ECHO_DELAY_MS, withTiming(1, { duration: RING_DURATION_MS, easing: EASING.exit }));
      card.value = withDelay(
        CARD_DELAY_MS,
        withTiming(1, { duration: CARD_DURATION_MS, easing: EASING.enter }, (finished) => {
          if (finished) runOnJS(fireSettled)();
        }),
      );
    } else {
      card.value = withTiming(1, { duration: SIMPLE_DURATION_MS, easing: EASING.enter }, (finished) => {
        if (finished) runOnJS(fireSettled)();
      });
    }
  }, [reduceMotion, ceremony, card, ring1, ring2, fireSettled]);

  useEffect(() => {
    if (!ceremony) return;
    const timer = setTimeout(() => success(), HAPTIC_DELAY_MS);
    return () => clearTimeout(timer);
  }, [ceremony]);

  const cardStyle = useAnimatedStyle(() => {
    const p = card.value;
    if (!ceremony) {
      return {
        opacity: p,
        transform: [{ scale: 0.98 + 0.02 * p }],
      };
    }
    return {
      opacity: p,
      transform: [
        { perspective: 1000 },
        { rotateY: `${-70 * (1 - p)}deg` },
        { scale: 0.94 + 0.06 * p },
      ],
    };
  }, [ceremony]);

  const ringStyle1 = useAnimatedStyle(() => ({
    opacity: 0.6 * (1 - ring1.value),
    transform: [{ scale: 0.6 + 0.9 * ring1.value }],
  }));

  const ringStyle2 = useAnimatedStyle(() => ({
    opacity: 0.6 * (1 - ring2.value),
    transform: [{ scale: 0.6 + 0.9 * ring2.value }],
  }));

  return (
    <View style={[styles.wrap, style]}>
      {ceremony && !reduceMotion && (
        <View
          style={styles.ringLayer}
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          aria-hidden
        >
          <View style={styles.ringCenter} pointerEvents="none">
            <Animated.View style={[styles.ring, { borderColor: tint }, ringStyle1]} />
          </View>
          <View style={styles.ringCenter} pointerEvents="none">
            <Animated.View style={[styles.ring, { borderColor: tint }, ringStyle2]} />
          </View>
        </View>
      )}
      <Animated.View style={cardStyle}>{children}</Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  ringLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  ringCenter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 9999,
    borderWidth: 2,
  },
});
