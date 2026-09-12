import type { ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";

// The celadon-jade taegeuk/wave motif baked at ~9% opacity onto the jade-charcoal
// background color itself (mobile/assets/patterns/onboarding-bg.png) — one flat image
// instead of tiling a small PNG at runtime, since RN has no simple cross-platform
// "repeat" image mode. Source pattern: 공유마당(gongu.copyright.or.kr) "태극패턴" by
// 한국저작권위원회, CC BY licensed, recolored from black/white to celadon jade.
export default function PatternBackground({ children }: { children: ReactNode }) {
  return (
    <ImageBackground
      source={require("../assets/patterns/onboarding-bg.png")}
      resizeMode="cover"
      style={styles.fill}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
