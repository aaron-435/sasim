import type { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";

// The celadon-jade taegeuk/wave motif baked at ~4.5% opacity onto the jade-charcoal
// background color itself (mobile/assets/patterns/onboarding-bg.png) — one flat image
// instead of tiling a small PNG at runtime, since RN has no simple cross-platform
// "repeat" image mode. Source pattern: 공유마당(gongu.copyright.or.kr) "태극패턴" by
// 한국저작권위원회, CC BY licensed, recolored from black/white to celadon jade.
//
// The background Image is an explicit sibling positioned with StyleSheet.absoluteFill
// — NOT an ImageBackground wrapping `children` — because when `children` is a ScrollView,
// react-native-web's ImageBackground rendered the Image at its raw 1080x2400 intrinsic
// size instead of covering the viewport, which inflated the ScrollView's content height
// into a huge empty scrollable area. Keeping the Image as a plain sibling of a separate
// `children` wrapper (both direct children of one flex:1 root) sidesteps that entirely,
// regardless of what `children` is.
export default function PatternBackground({ children }: { children: ReactNode }) {
  return (
    <View style={styles.root}>
      <Image
        source={require("../assets/patterns/onboarding-bg.png")}
        resizeMode="cover"
        // RN's Image sets a default style from the local asset's own static
        // width/height metadata — StyleSheet.absoluteFill alone (position+inset,
        // no explicit size) lost to that default, so the image rendered at its
        // native 1080x2400 instead of covering the screen. Explicit 100%/100%
        // forces it to stretch regardless.
        style={[StyleSheet.absoluteFill, styles.fillSize]}
      />
      <View style={styles.fill}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fillSize: {
    width: "100%",
    height: "100%",
  },
  fill: {
    flex: 1,
  },
});
