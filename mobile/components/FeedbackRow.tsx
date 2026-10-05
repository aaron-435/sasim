import ThumbsDown from "lucide-react-native/icons/thumbs-down";
import ThumbsUp from "lucide-react-native/icons/thumbs-up";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "./AppText";
import { track } from "../lib/analytics";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// "Does this sound like you?" 👍/👎 under a reading (Q&A answer, today's fortune).
// One answer per row; it's recorded as a `feedback` event and the row turns into a
// thank-you line. Nothing about the reading itself is sent, only where it was and the vote.
export default function FeedbackRow({ surface, topic }: { surface: "qa" | "fortune"; topic?: string }) {
  const strings = useStrings();
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  function handleVote(value: "up" | "down") {
    if (vote) return;
    setVote(value);
    track("feedback", { surface, value, ...(topic ? { topic } : {}) });
  }

  if (vote) {
    return (
      <Text style={styles.thanks} accessibilityLiveRegion="polite" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
        {strings.feedback.thanks}
      </Text>
    );
  }

  return (
    <View style={styles.row}>
      <Text style={styles.prompt} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.feedback.prompt}</Text>
      <View style={styles.buttons}>
        <Pressable
          onPress={() => handleVote("up")}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          accessibilityRole="button"
          accessibilityLabel={strings.feedback.upLabel}
          hitSlop={4}
        >
          <ThumbsUp size={16} strokeWidth={1.75} color={COLORS.gold} />
        </Pressable>
        <Pressable
          onPress={() => handleVote("down")}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          accessibilityRole="button"
          accessibilityLabel={strings.feedback.downLabel}
          hitSlop={4}
        >
          <ThumbsDown size={16} strokeWidth={1.75} color={COLORS.subheadline} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 44,
  },
  prompt: {
    flexShrink: 1,
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.subheadline,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: COLORS.disabledBg,
  },
  thanks: {
    minHeight: 44,
    textAlignVertical: "center",
    paddingVertical: 12,
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.subheadline,
  },
});
