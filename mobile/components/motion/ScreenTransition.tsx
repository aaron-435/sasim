// Screen-level transition for the App step switcher — forward slides in from
// the right, back from the left, modal-like reveals fade with a slight grow.
// Entering only: no exit, so screens never overlap. Driven by a shared value on
// mount (not a layout `entering` preset) because reanimated's web layout
// animations left the screen stuck at `visibility: hidden` in the web preview.
import { useEffect, type ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { DURATION, EASING } from "../../theme/motion";
import useReducedMotion from "../../lib/useReducedMotion";

export type ScreenDirection = "forward" | "back" | "fade";

const OFFSET = 24;

function Entering({ direction, reduceMotion, children }: { direction: ScreenDirection; reduceMotion: boolean; children: ReactNode }) {
  const progress = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    progress.value = reduceMotion ? 1 : withTiming(1, { duration: DURATION.base, easing: EASING.enter });
  }, [progress, reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    if (direction === "fade") {
      return { opacity: p, transform: [{ scale: 0.98 + 0.02 * p }] };
    }
    const from = direction === "forward" ? OFFSET : -OFFSET;
    return { opacity: p, transform: [{ translateX: from * (1 - p) }] };
  }, [direction]);

  return <Animated.View style={[styles.fill, animatedStyle]}>{children}</Animated.View>;
}

export default function ScreenTransition({
  stepKey,
  direction,
  children,
}: {
  stepKey: string;
  direction: ScreenDirection;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  // A new key remounts Entering, which restarts the animation for the new step. Reduced
  // motion only changes the animated value, never the tree: switching element types here
  // would remount the whole screen (losing its state) when the async setting resolves.
  return (
    <Entering key={stepKey} direction={direction} reduceMotion={reduceMotion}>
      {children}
    </Entering>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
