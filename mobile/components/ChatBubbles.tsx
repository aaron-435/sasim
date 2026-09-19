import { memo, useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Text from "./AppText";
import { COLORS } from "../theme/colors";

// Shared by ChatScreen (quiz→counseling chat) and QAScreen (saju Q&A) — both used to
// carry byte-identical copies of these bubbles, the typing indicator and their styles.

/** memo'd so a parent re-render that doesn't touch the message (ChatScreen's 1-second
 * countdown tick, a typing-state flip) skips re-rendering every bubble already on screen. */
export const ChatBubble = memo(function ChatBubble({ role, text }: { role: "bot" | "user"; text: string }) {
  const isUser = role === "user";
  return (
    <View style={[styles.bubbleRow, isUser ? styles.bubbleRowUser : styles.bubbleRowBot]}>
      <View style={isUser ? styles.bubbleUser : styles.bubbleBot}>
        <Text style={isUser ? styles.bubbleTextUser : styles.bubbleTextBot}>{text}</Text>
      </View>
    </View>
  );
});

export function TypingDots() {
  const anims = useRef([0, 1, 2].map(() => new Animated.Value(0.2))).current;

  useEffect(() => {
    const loops = anims.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(v, { toValue: 1, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0.2, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.delay((2 - i) * 150),
        ])
      )
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [anims]);

  return (
    <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
      <View style={[styles.bubbleBot, styles.typingBubble]}>
        {anims.map((v, i) => (
          <Animated.View key={i} style={[styles.typingDot, { opacity: v }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleRow: {
    marginBottom: 10,
    flexDirection: "row",
  },
  bubbleRowUser: {
    justifyContent: "flex-end",
  },
  bubbleRowBot: {
    justifyContent: "flex-start",
  },
  bubbleBot: {
    maxWidth: "82%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  bubbleUser: {
    maxWidth: "82%",
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  bubbleTextBot: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14.5,
    lineHeight: 22,
    color: COLORS.headline,
  },
  bubbleTextUser: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14.5,
    lineHeight: 22,
    color: COLORS.ctaText,
  },
  typingBubble: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  typingDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.subheadline,
  },
});
