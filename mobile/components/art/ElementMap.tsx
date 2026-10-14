// "My energy map" — a deterministic roundel drawn from the user's five-element
// shares, so the shape is computed from real data, never invented decoration.
import { useEffect, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Circle, G, Path } from "react-native-svg";
import { COLORS } from "../../theme/colors";
import { ELEMENT_COLORS, ELEMENT_ORDER } from "../../lib/elements";
import { hashString, mulberry32 } from "../../lib/seededRandom";
import useReducedMotion from "../../lib/useReducedMotion";

const ENTER_MS = 900;
const SPIN_MS = 90000;

type Grain = { r: number; opacity: number; dash: string | undefined };

export default function ElementMap({
  elements,
  seed,
  size,
  animated = true,
  style,
}: {
  elements: Record<string, number>;
  seed: string;
  size: number;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const reduceMotion = useReducedMotion();
  const still = !animated || reduceMotion;

  const shares = ELEMENT_ORDER.map((k) => elements[k] ?? 0);
  const total = shares.reduce((a, b) => a + b, 0);
  const max = Math.max(0, ...shares);

  const art = useMemo(() => {
    const hash = hashString(seed);
    const startAngle = ((hash % 72) + 72) % 72;
    const rng = mulberry32(hash);
    const grainCount = 3 + Math.floor(rng() * 3);
    const dashes = ["2 4", "1 6", undefined] as const;
    const grains: Grain[] = Array.from({ length: grainCount }, () => ({
      r: 20 + rng() * 70,
      opacity: 0.06 + rng() * 0.08,
      dash: dashes[Math.floor(rng() * dashes.length)],
    })).sort((a, b) => a.r - b.r);
    return { startAngle, grains };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const enter = useSharedValue(still ? 1 : 0);
  const spin = useSharedValue(0);

  useEffect(() => {
    if (still) {
      enter.value = 1;
      spin.value = 0;
      return;
    }
    enter.value = withTiming(1, { duration: ENTER_MS });
    spin.value = withRepeat(withTiming(360, { duration: SPIN_MS, easing: Easing.linear }), -1);
  }, [still, enter, spin]);

  const enterStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [{ scale: 0.6 + 0.4 * enter.value }],
  }));
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  if (shares.length === 0 || total <= 0 || max <= 0) return null;

  return (
    <Animated.View
      style={[{ width: size, height: size }, style, enterStyle]}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      aria-hidden
    >
      <Animated.View style={[{ width: size, height: size }, spinStyle]}>
        <Svg width={size} height={size} viewBox="-100 -100 200 200">
          <Circle cx={0} cy={0} r={96} fill="none" stroke={COLORS.headline} strokeOpacity={0.12} />
          {art.grains.map((g, i) => (
            <Circle
              key={i}
              cx={0}
              cy={0}
              r={g.r}
              fill="none"
              stroke={COLORS.headline}
              strokeOpacity={g.opacity}
              strokeWidth={1}
              strokeDasharray={g.dash}
            />
          ))}
          {ELEMENT_ORDER.map((key, i) => {
            const ratio = shares[i] / max;
            const empty = shares[i] <= 0;
            const len = empty ? 18 : 30 + 60 * ratio;
            const hw = empty ? 1.5 : (len * 0.42) / 2;
            const color = ELEMENT_COLORS[key];
            // Teardrop pointing up, swung into place by rotation — quadratic
            // curves keep the petal soft (no sharp fortune-telling spikes).
            const d = `M 0 0 Q ${-hw * 1.7} ${-len * 0.45} 0 ${-len} Q ${hw * 1.7} ${-len * 0.45} 0 0 Z`;
            return (
              <G key={key} transform={`rotate(${art.startAngle + i * 72})`}>
                <Path
                  d={d}
                  fill={color}
                  fillOpacity={empty ? 0.08 : 0.35}
                  stroke={color}
                  strokeOpacity={empty ? 0.3 : 0.7}
                  strokeWidth={1}
                />
              </G>
            );
          })}
          <Circle cx={0} cy={0} r={5} fill={COLORS.headline} />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}
