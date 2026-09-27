import Telescope from "lucide-react-native/icons/telescope";
import { StyleSheet, View } from "react-native";
import Text from "./AppText";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";

// Static "where the chart comes from" note (report cover, saju type result). Deliberately
// not a pill: no border, no fill, no press state, so it can't read as a button (PRODUCT.md
// "honest affordances"). Copy avoids authority words like "verified" or "clinical".
export default function CalcSourceBadge({ align = "center" }: { align?: "center" | "start" }) {
  const strings = useStrings();
  return (
    <View style={[styles.row, align === "start" && styles.rowStart]} accessible accessibilityRole="text">
      <Telescope size={13} strokeWidth={1.75} color={COLORS.gold} style={styles.icon} />
      <Text style={[styles.label, align === "start" && styles.labelStart]}>{strings.common.calcSourceBadge}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: 6, maxWidth: "100%" },
  rowStart: { justifyContent: "flex-start" },
  icon: { marginTop: 2 },
  label: { flexShrink: 1, fontFamily: "Manrope_500Medium", fontSize: 12, lineHeight: 17, letterSpacing: 0.2, color: COLORS.footer, textAlign: "center" },
  labelStart: { textAlign: "left" },
});
