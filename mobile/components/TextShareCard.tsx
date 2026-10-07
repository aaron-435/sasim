import type { RefObject } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "./AppText";
import { useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

/** Shown as text inside the image: a picture can't carry a tappable link. */
const ADDRESS_TEXT = "fatesaidapp.com";

/**
 * Captures the card as a 1080px-wide PNG and opens the share sheet. Resolves true only when the
 * sheet was offered; failures and a missing share sheet (web preview) end quietly.
 */
export async function shareCardImage(cardRef: RefObject<View | null>): Promise<boolean> {
  try {
    // width-only, like TypeScreen: a consistent export width, height following the content.
    const uri = await captureRef(cardRef, { format: "png", quality: 1, width: 1080 });
    if (!(await Sharing.isAvailableAsync())) return false;
    await Sharing.shareAsync(uri, { mimeType: "image/png" });
    return true;
  } catch {
    // Sharing is a bonus action — a dismissed or failed sheet needs no error screen.
    return false;
  }
}

/**
 * The one image-share card for text summaries: brand line, eyebrow, big line, body, address.
 * Rendered on screen as a labelled preview (screen readers skip it), and `cardRef` is what gets captured.
 */
export default function TextShareCard({
  cardRef,
  eyebrow,
  headline,
  body,
}: {
  cardRef: RefObject<View | null>;
  eyebrow: string;
  headline: string;
  body?: string;
}) {
  const strings = useStrings();
  return (
    <View style={styles.previewFrame}>
      <Text style={styles.previewLabel}>{strings.common.shareCardPreviewLabel}</Text>
      <View ref={cardRef} collapsable={false} style={styles.card} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <View style={styles.inner}>
          <Text style={styles.brand}>FATESAID</Text>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.headline}>{headline}</Text>
          {!!body && <Text style={styles.body}>{body}</Text>}
          <Text style={styles.address}>{ADDRESS_TEXT}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewFrame: {
    marginTop: 14,
    padding: 14,
    paddingTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.disabledText,
    backgroundColor: COLORS.inputBg,
  },
  previewLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.footer, textAlign: "center", marginBottom: 10 },
  card: { width: "100%", borderRadius: 20, overflow: "hidden", backgroundColor: COLORS.background },
  inner: { paddingHorizontal: "9%", paddingVertical: "9%", alignItems: "center" },
  brand: { fontFamily: FONTS.bold, fontSize: 13, letterSpacing: 3, color: COLORS.gold, marginBottom: 28 },
  eyebrow: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold, marginBottom: 8, textAlign: "center" },
  headline: { fontFamily: FONTS.display, fontSize: 26, lineHeight: 34, color: COLORS.headline, textAlign: "center" },
  body: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 22, color: COLORS.subheadline, textAlign: "center", marginTop: 16 },
  address: { fontFamily: FONTS.medium, fontSize: 12.5, letterSpacing: 0.4, color: COLORS.subheadline, textAlign: "center", marginTop: 32 },
});
