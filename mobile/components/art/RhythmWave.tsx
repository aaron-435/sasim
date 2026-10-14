// "Today's rhythm wave" — stacked sine bands whose count, height and spacing
// follow today's rhythm, so the band reads as data rather than decoration.
import { useEffect, useState } from "react";
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../theme/colors";
import useReducedMotion from "../../lib/useReducedMotion";

export type RhythmRelation = "mirror" | "selfNurturesOther" | "otherNurturesSelf" | "selfChallengesOther" | "otherChallengesSelf";

const SHAPES: Record<RhythmRelation, { layers: number; amplitude: number; wavelength: number }> = {
  mirror: { layers: 2, amplitude: 8, wavelength: 0.5 },
  selfNurturesOther: { layers: 3, amplitude: 12, wavelength: 0.6 },
  otherNurturesSelf: { layers: 3, amplitude: 10, wavelength: 0.8 },
  selfChallengesOther: { layers: 3, amplitude: 16, wavelength: 0.35 },
  // A pacing day stays low and calm — never spiky or alarming.
  otherChallengesSelf: { layers: 2, amplitude: 6, wavelength: 0.3 },
};

const LAYER_OPACITY = [0.6, 0.35, 0.2];
const POINTS_PER_WAVE = 20;

function wavePath(span: number, wavePx: number, center: number, amplitude: number, phase: number, closeBottom: number): { line: string; area: string } {
  const count = Math.max(2, Math.ceil((span / wavePx) * POINTS_PER_WAVE));
  let line = "";
  for (let i = 0; i <= count; i++) {
    const x = (span * i) / count;
    const y = center + amplitude * Math.sin((2 * Math.PI * x) / wavePx + phase);
    line += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  const area = `${line}L ${span.toFixed(1)} ${closeBottom} L 0 ${closeBottom} Z`;
  return { line, area };
}

function WaveLayer({
  line,
  area,
  span,
  height,
  wavePx,
  duration,
  color,
  opacity,
  fill,
  still,
}: {
  line: string;
  area: string;
  span: number;
  height: number;
  wavePx: number;
  duration: number;
  color: string;
  opacity: number;
  fill: boolean;
  still: boolean;
}) {
  const x = useSharedValue(0);

  useEffect(() => {
    if (still) {
      x.value = 0;
      return;
    }
    // The strip is two widths wide and periodic in wavePx, so sliding it one
    // wavelength loops seamlessly.
    x.value = withRepeat(withTiming(-wavePx, { duration, easing: Easing.linear }), -1);
  }, [still, wavePx, duration, x]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]} pointerEvents="none">
      <Svg width={span} height={height} viewBox={`0 0 ${span} ${height}`}>
        {fill && <Path d={area} fill={color} fillOpacity={0.06} stroke="none" />}
        <Path d={line} fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={1.5} />
      </Svg>
    </Animated.View>
  );
}

export default function RhythmWave({
  relation,
  color = COLORS.gold,
  height = 72,
  style,
}: {
  relation: RhythmRelation;
  color?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const reduceMotion = useReducedMotion();
  const [width, setWidth] = useState(0);

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && Math.abs(w - width) > 0.5) setWidth(w);
  }

  const shape = SHAPES[relation];
  const span = width * 2;
  const wavePx = width * shape.wavelength;

  return (
    <View
      style={[{ width: "100%", height, overflow: "hidden" }, style]}
      onLayout={onLayout}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      aria-hidden
    >
      {width > 0 &&
        Array.from({ length: shape.layers }, (_, i) => {
          const center = height * (0.5 + (i - (shape.layers - 1) / 2) * 0.18);
          const phase = (i * 2 * Math.PI) / shape.layers;
          const { line, area } = wavePath(span, wavePx, center, shape.amplitude, phase, height);
          return (
            <WaveLayer
              key={i}
              line={line}
              area={area}
              span={span}
              height={height}
              wavePx={wavePx}
              duration={4000 + ((i + 1) * 3000) / shape.layers}
              color={color}
              opacity={LAYER_OPACITY[i] ?? 0.2}
              fill={i === 0}
              still={reduceMotion}
            />
          );
        })}
    </View>
  );
}
