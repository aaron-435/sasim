import { StyleSheet, View } from "react-native";
import Text from "./AppText";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

// The help lines the chat and Q&A give for a self-harm signal (lib/promptLocale.ts CRISIS_RESOURCES),
// shown by the journal when a saved line or a month's entries carry one. Calm, no alarm styling.
export default function JournalSafetyNote({ note }: { note?: string }) {
  const strings = useStrings();
  return (
    <View style={styles.box} accessibilityLiveRegion="polite">
      <Text style={styles.heading} accessibilityRole="header">{strings.journal.safetyHeading}</Text>
      {!!note && <Text style={styles.body}>{note}</Text>}
      <Text style={styles.body}>{strings.journal.safetyBody}</Text>
      {strings.journal.safetyLines.map((line) => (
        <Text key={line} style={styles.line} selectable>
          {line}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: COLORS.gold, borderRadius: 14, padding: 16, gap: 8 },
  heading: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.headline },
  body: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline },
  line: { fontFamily: FONTS.medium, fontSize: 14, lineHeight: 21, color: COLORS.headline },
});
