// Short completion flourish for a successful purchase: a ring expands and a
// check pops in, then both fade. Transform/opacity only. With Reduce Motion
// it shows nothing (the success haptic still fires from the caller).
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../../theme/colors";
import { DURATION, EASING, SPRING } from "../../theme/motion";
import { success } from "../../lib/haptics";
import useReducedMotion from "../../lib/useReducedMotion";

const SIZE = 96;

// One host mounted at the app root; screens call playPurchaseSuccess() so the
// flourish survives the paywall view swapping to the unlocked view.
const listeners = new Set<() => void>();

/** Call on purchase success: fires the success haptic and the on-screen flourish. */
export function playPurchaseSuccess(): void {
  success();
  listeners.forEach((fn) => fn());
}

export default function PurchaseSuccessHost() {
  const [playKey, setPlayKey] = useState(0);
  useEffect(() => {
    const fn = () => setPlayKey((k) => k + 1);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return <Burst playKey={playKey} />;
}

function Burst({ playKey }: { playKey: number }) {
  const reduceMotion = useReducedMotion();
  const ring = useSharedValue(0);
  const check = useSharedValue(0);
  const fade = useSharedValue(0);

  useEffect(() => {
    if (playKey === 0 || reduceMotion) return;
    cancelAnimation(ring);
    cancelAnimation(check);
    cancelAnimation(fade);
    ring.value = 0;
    check.value = 0;
    fade.value = 1;
    ring.value = withTiming(1, { duration: DURATION.reveal + DURATION.base, easing: EASING.enter });
    check.value = withSpring(1, SPRING.gentle);
    fade.value = withDelay(DURATION.reveal + DURATION.base, withTiming(0, { duration: DURATION.slow, easing: EASING.exit }));
  }, [playKey, reduceMotion, ring, check, fade]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: fade.value * (1 - ring.value * 0.6),
    transform: [{ scale: 0.6 + ring.value * 0.9 }],
  }));
  const checkStyle = useAnimatedStyle(() => ({
    opacity: fade.value * check.value,
    transform: [{ scale: 0.7 + check.value * 0.3 }],
  }));

  if (playKey === 0 || reduceMotion) return null;
  return (
    <View pointerEvents="none" style={styles.overlay} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Animated.View style={[styles.ring, ringStyle]} />
      <Animated.View style={[styles.disc, checkStyle]}>
        <View style={styles.check} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center", zIndex: 50 },
  ring: { position: "absolute", width: SIZE, height: SIZE, borderRadius: SIZE / 2, borderWidth: 2, borderColor: COLORS.gold },
  disc: {
    width: SIZE * 0.6,
    height: SIZE * 0.6,
    borderRadius: SIZE * 0.3,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    width: 14,
    height: 26,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#10201A",
    transform: [{ rotate: "45deg" }, { translateY: -3 }],
  },
});
