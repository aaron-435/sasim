// Drop-in Pressable with springy press-shrink feedback plus a haptic tick —
// the one press affordance for the overhaul, so screens stop hand-rolling
// `pressed && { opacity }` styles with no physicality.
import { useState } from "react";
import { Pressable, type GestureResponderEvent, type PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SPRING } from "../../theme/motion";
import { select, tap } from "../../lib/haptics";
import useReducedMotion from "../../lib/useReducedMotion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
  haptic?: "tap" | "select" | "none";
  pressedScale?: number;
};

export default function PressableScale({
  haptic = "tap",
  pressedScale = 0.97,
  style,
  disabled,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const reduceMotion = useReducedMotion();
  const [pressed, setPressed] = useState(false);
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      // Transform and opacity only — never layout props — so this stays on the UI thread.
      transform: [{ scale: reduceMotion ? 1 : 1 - (1 - pressedScale) * p }],
      opacity: reduceMotion ? 1 - 0.15 * p : 1,
    };
  }, [reduceMotion, pressedScale]);

  // Function-form styles are resolved here against local pressed state because
  // an Animated style array can't carry a `({ pressed }) => ...` entry.
  const resolvedStyle = typeof style === "function" ? style({ pressed }) : style;

  function handlePressIn(e: GestureResponderEvent) {
    setPressed(true);
    progress.value = withSpring(1, SPRING.press);
    if (haptic === "tap") tap();
    else if (haptic === "select") select();
    onPressIn?.(e);
  }

  function handlePressOut(e: GestureResponderEvent) {
    setPressed(false);
    progress.value = withSpring(0, SPRING.press);
    onPressOut?.(e);
  }

  return (
    <AnimatedPressable
      style={[animatedStyle, resolvedStyle]}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    />
  );
}
