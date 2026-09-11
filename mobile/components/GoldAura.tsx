import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

// The slow-breathing gold rings used to fill otherwise-empty space behind a focal
// element (the intro screen's CTA, and now reused behind every onboarding step). Sized
// via `size` (outer ring diameter) so a step with less vertical room can use a smaller
// instance than the intro screen's hero-sized one.
export default function GoldAura({ size = 260, children }: { size?: number; children?: React.ReactNode }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 2600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const outerScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const outerOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] });
  const midScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });

  return (
    // NOTE: pointerEvents="box-none" here previously broke touches on the button passed
    // as `children` — react-native-web computed it down to a literal CSS `pointer-events:
    // none` on this node without restoring `auto` on the nested Pressable, so the ring
    // decoration silently ate every tap. Not needed anyway: nothing else occupies this
    // area, so there's nothing to click "through" — default (auto) is correct here.
    <View style={styles.wrap}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: "rgba(201,162,75,0.06)" },
          { transform: [{ scale: outerScale }], opacity: outerOpacity },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          { width: size * 0.7, height: size * 0.7, borderRadius: (size * 0.7) / 2, backgroundColor: "rgba(201,162,75,0.09)" },
          { transform: [{ scale: midScale }] },
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
  },
});
