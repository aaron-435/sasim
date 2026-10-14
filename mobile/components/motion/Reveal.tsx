// Staggered entrance wrapper — children fade in rising 12px, each `index`
// step delayed by STAGGER_MS so lists unfold instead of flashing in whole.
// Shared-value driven (not a layout `entering` preset) so it also runs in the
// web preview, where reanimated's layout animations got stuck hidden.
import { useEffect, type ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { DURATION, EASING, STAGGER_MS } from "../../theme/motion";
import useReducedMotion from "../../lib/useReducedMotion";

const RISE = 12;

export default function Reveal({
  index = 0,
  delay,
  style,
  children,
}: {
  index?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const progress = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      progress.value = 1;
      return;
    }
    progress.value = withDelay(delay ?? index * STAGGER_MS, withTiming(1, { duration: DURATION.reveal, easing: EASING.enter }));
  }, [reduceMotion, delay, index, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: RISE * (1 - progress.value) }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
