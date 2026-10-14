import type { ReactNode } from "react";
import { Platform, StyleSheet, View, type ViewProps } from "react-native";
import { BlurView } from "expo-blur";

/**
 * Frosted backing for a panel. iOS gets a real blur; Android and web fall back to a
 * 92% SURFACE.floating fill (blur is costly on Android and unsupported on web).
 * Callers pass layout (padding, radius, margins) through `style`.
 */
export default function FrostedSurface({ children, style, ...rest }: ViewProps & { children?: ReactNode }) {
  if (Platform.OS === "ios") {
    return (
      <View {...rest} style={[styles.clip, style]}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        {children}
      </View>
    );
  }
  return <View {...rest} style={[styles.fallback, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  clip: { overflow: "hidden", backgroundColor: "rgba(31,51,39,0.35)" },
  // SURFACE.floating (#1F3327) at 0.92.
  fallback: { backgroundColor: "rgba(31,51,39,0.92)" },
});
