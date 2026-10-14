// Full-screen loading scene only — five element dots fill in generation order.
// Small in-button spinners stay ActivityIndicator.
import { useEffect } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { ELEMENT_COLORS } from "../../lib/elements";
import useReducedMotion from "../../lib/useReducedMotion";

const ORDER = ["wood", "fire", "earth", "metal", "water"];

const SIZES = {
  large: { radius: 28, dot: 12 },
  medium: { radius: 18, dot: 8 },
} as const;

type Props = {
  size?: "large" | "medium";
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

function ElementDot({
  t,
  index,
  color,
  dot,
  left,
  top,
}: {
  t: SharedValue<number>;
  index: number;
  color: string;
  dot: number;
  left: number;
  top: number;
}) {
  const animated = useAnimatedStyle(() => {
    const raw = t.value - index;
    const p = raw < 0 ? 0 : raw > 1 ? 1 : raw;
    return {
      opacity: 0.25 + 0.75 * p,
      transform: [{ scale: 0.7 + 0.3 * p }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left,
          top,
          width: dot,
          height: dot,
          borderRadius: dot / 2,
          backgroundColor: color,
        },
        animated,
      ]}
    />
  );
}

export default function ElementsLoader({ size = "large", style, accessibilityLabel }: Props) {
  const reduceMotion = useReducedMotion();
  const t = useSharedValue(0);
  const { radius, dot } = SIZES[size];
  const side = (radius + dot / 2) * 2;

  useEffect(() => {
    if (reduceMotion) return;
    t.value = withRepeat(withTiming(5, { duration: 1800, easing: Easing.linear }), -1);
  }, [reduceMotion, t]);

  const spin = useAnimatedStyle(() => ({
    transform: [{ rotate: `${(t.value / 5) * 72}deg` }],
  }));

  const dots = ORDER.map((key, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const left = side / 2 + radius * Math.cos(angle) - dot / 2;
    const top = side / 2 + radius * Math.sin(angle) - dot / 2;
    const color = ELEMENT_COLORS[key];
    if (reduceMotion) {
      return (
        <View
          key={key}
          style={{
            position: "absolute",
            left,
            top,
            width: dot,
            height: dot,
            borderRadius: dot / 2,
            backgroundColor: color,
            opacity: 0.6,
          }}
        />
      );
    }
    return <ElementDot key={key} t={t} index={i} color={color} dot={dot} left={left} top={top} />;
  });

  const inner = reduceMotion ? (
    <View style={{ width: side, height: side }}>{dots}</View>
  ) : (
    <Animated.View style={[{ width: side, height: side }, spin]}>{dots}</Animated.View>
  );

  return (
    <View
      style={[{ alignSelf: "center" }, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ busy: true }}
    >
      {inner}
    </View>
  );
}
