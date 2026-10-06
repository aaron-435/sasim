import { useRef, useState } from "react";
import ChevronRight from "lucide-react-native/icons/chevron-right";
import Share2 from "lucide-react-native/icons/share-2";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "./AppText";
import { ELEMENT_COLORS } from "../lib/elements";
import { ELEMENT_COLOR_CONTENT, elementColorMood, type ElementColor } from "../lib/elementColorContent";
import { useLocale, useStrings } from "../lib/i18n";
import { formatShortDate } from "../lib/shortDate";
import { track } from "../lib/analytics";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

// "오늘 나를 채우는 색" (2026-10-06): the element today's pillar and the reader's chart leave
// emptiest (server: lib/elementColor.ts), shown as a swatch, a color name and a mood line.
// Home shows the compact card; Fortune's today tab shows the full one, which is also the
// share image (width-only capture like the compatibility and group cards).
export default function ElementColorCard({
  color,
  dateIso,
  compact = false,
  onPress,
}: {
  color: ElementColor;
  dateIso?: string | null;
  compact?: boolean;
  /** Compact only: Home opens the Fortune screen, where the full card can be shared. */
  onPress?: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const content = ELEMENT_COLOR_CONTENT[locale] ?? ELEMENT_COLOR_CONTENT.en;
  const swatch = ELEMENT_COLORS[color.element] ?? COLORS.gold;
  const name = content.colorName[color.element];
  const mood = elementColorMood(locale, color);
  const cardRef = useRef<View>(null);
  const [sharing, setSharing] = useState(false);

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    try {
      const uri = await captureRef(cardRef, { format: "png", quality: 1, width: 1080 });
      if (await Sharing.isAvailableAsync()) {
        track("share", { kind: "element_color" });
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best effort, like the other share cards.
    } finally {
      setSharing(false);
    }
  }

  if (compact) {
    return (
      <Pressable
        style={({ pressed }) => [styles.compact, pressed && styles.compactPressed]}
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? "button" : "summary"}
        accessibilityLabel={`${strings.elementColor.title}: ${name}. ${mood}`}
      >
        <View style={[styles.compactSwatch, { backgroundColor: swatch }]} />
        <View style={styles.compactText}>
          <Text style={styles.eyebrow}>{strings.elementColor.title}</Text>
          <Text style={styles.compactName}>{name}</Text>
          <Text style={styles.compactMood}>{mood}</Text>
        </View>
        {onPress && <ChevronRight size={16} strokeWidth={2} color={COLORS.subheadline} />}
      </Pressable>
    );
  }

  return (
    <View style={styles.wrap}>
      <View ref={cardRef} collapsable={false} style={[styles.card, { borderColor: `${swatch}66` }]}>
        <Text style={styles.eyebrow}>{strings.elementColor.shareEyebrow}</Text>
        {dateIso ? <Text style={styles.date}>{formatShortDate(dateIso, locale)}</Text> : null}
        <View style={[styles.swatch, { backgroundColor: swatch }]} />
        <Text style={styles.label}>{strings.elementColor.title}</Text>
        <Text style={styles.name} accessibilityRole="header">{name}</Text>
        <Text style={styles.mood}>{mood}</Text>
        <Text style={styles.note}>{strings.elementColor.note}</Text>
        <Text style={styles.brand}>FATESAID</Text>
      </View>
      <Pressable
        style={styles.shareRow}
        onPress={handleShare}
        disabled={sharing}
        accessibilityRole="button"
        accessibilityState={{ busy: sharing, disabled: sharing }}
      >
        {sharing ? <ActivityIndicator size="small" color={COLORS.gold} /> : <Share2 size={16} strokeWidth={1.75} color={COLORS.gold} />}
        <Text style={styles.shareLabel}>{strings.elementColor.shareButton}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 16 },
  card: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 22,
    alignItems: "center",
  },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 12, letterSpacing: 0.2, color: COLORS.subheadline },
  date: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.footer, marginTop: 4 },
  swatch: { width: 72, height: 72, borderRadius: 36, marginTop: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  label: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline, marginTop: 16 },
  name: { fontFamily: FONTS.display, fontSize: 26, lineHeight: 33, color: COLORS.headline, marginTop: 4, textAlign: "center" },
  mood: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 22, color: COLORS.headline, marginTop: 10, textAlign: "center" },
  note: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.footer, marginTop: 12, textAlign: "center" },
  brand: { fontFamily: FONTS.semibold, fontSize: 10, letterSpacing: 2, color: COLORS.subheadline, marginTop: 18 },
  shareRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 44, marginTop: 4 },
  shareLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.gold },
  compact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    marginTop: 12,
  },
  compactPressed: { opacity: 0.8 },
  compactSwatch: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  compactText: { flex: 1, gap: 2 },
  compactName: { fontFamily: FONTS.display, fontSize: 18, lineHeight: 24, color: COLORS.headline },
  compactMood: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19, color: COLORS.subheadline },
});
