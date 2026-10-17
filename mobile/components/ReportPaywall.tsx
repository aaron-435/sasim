// One paywall treatment for the three paid readers (deep, year-ahead, compatibility), built
// from SURFACE tokens: a raised list of what is locked, the gold buy button, an optional
// secondary offer (the deep report's bundle), the restore link and the purchase notice.
// A long chapter list is cut to `maxVisible` rows plus a "+N more" row, so the buy button
// stays inside the first screen instead of being pushed below ~12 rows.
import Lock from "lucide-react-native/icons/lock";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Text from "./AppText";
import PressableScale from "./motion/PressableScale";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";

/** Title block shared by the reader paywall pages (the year screen has its own heading). */
export function PaywallHeader({ eyebrow, title, body, extras }: { eyebrow?: string; title: string; body?: string; extras?: string }) {
  return (
    <View>
      {!!eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {!!body && <Text style={styles.body}>{body}</Text>}
      {!!extras && <Text style={styles.extras}>{extras}</Text>}
    </View>
  );
}

export default function ReportPaywall({
  lockedLabels,
  maxVisible = 5,
  moreLabel,
  lockedNote,
  detailLine,
  buyLabel,
  onBuy,
  purchasing,
  busy,
  oneTimeNote,
  secondary,
  restore,
  notice,
}: {
  /** What the purchase unlocks, in reading order. */
  lockedLabels: string[];
  /** Rows shown before the list collapses into a "+N more" row. */
  maxVisible?: number;
  moreLabel: (hidden: number) => string;
  lockedNote?: string;
  /** One quiet line under the list (e.g. the decade the reader is about to enter). */
  detailLine?: string | null;
  buyLabel: string;
  onBuy: () => void;
  purchasing: boolean;
  /** True while anything (buy or restore) is in flight. */
  busy: boolean;
  oneTimeNote: string;
  secondary?: { label: string; sub: string; onPress: () => void };
  restore?: { label: string; onPress: () => void };
  notice?: string | null;
}) {
  // Hiding a single row would only swap it for a "+1 more" row, so only collapse from 2 up.
  const collapse = lockedLabels.length > maxVisible + 1;
  const shown = collapse ? lockedLabels.slice(0, maxVisible) : lockedLabels;
  const hidden = lockedLabels.length - shown.length;

  return (
    <View>
      {!!lockedNote && <Text style={styles.lockedNote}>{lockedNote}</Text>}
      {shown.length > 0 && (
        <View style={styles.list}>
          {shown.map((label, i) => (
            <View key={label} style={[styles.row, i > 0 && styles.rowDivider]}>
              <Lock size={14} strokeWidth={1.75} color={COLORS.gold} />
              <Text style={styles.rowLabel} numberOfLines={2}>
                {label}
              </Text>
            </View>
          ))}
          {hidden > 0 && (
            <View style={[styles.row, styles.rowDivider]}>
              <Text style={styles.moreLabel}>{moreLabel(hidden)}</Text>
            </View>
          )}
        </View>
      )}
      {!!detailLine && <Text style={styles.detail}>{detailLine}</Text>}

      <PressableScale
        style={[styles.buyButton, busy && styles.disabled]}
        onPress={onBuy}
        disabled={busy}
        accessibilityRole="button"
        accessibilityLabel={buyLabel}
        accessibilityState={{ disabled: busy, busy: purchasing }}
      >
        {purchasing ? <ActivityIndicator color={COLORS.ctaText} /> : <Text style={styles.buyLabel}>{buyLabel}</Text>}
      </PressableScale>
      <Text style={styles.oneTime}>{oneTimeNote}</Text>

      {secondary && (
        <PressableScale style={[styles.secondary, busy && styles.disabled]} onPress={secondary.onPress} disabled={busy} accessibilityRole="button" accessibilityState={{ disabled: busy }}>
          <Text style={styles.secondaryLabel}>{secondary.label}</Text>
          <Text style={styles.secondarySub}>{secondary.sub}</Text>
        </PressableScale>
      )}

      {restore && (
        <PressableScale style={styles.restoreButton} onPress={restore.onPress} disabled={busy} accessibilityRole="button" haptic="none">
          <Text style={styles.restoreLabel}>{restore.label}</Text>
        </PressableScale>
      )}
      {!!notice && <Text style={styles.notice}>{notice}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold, marginBottom: SPACE.md },
  title: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 24, lineHeight: 31, color: COLORS.headline, marginBottom: SPACE.md },
  body: { fontFamily: FONTS.regular, fontSize: 14.5, lineHeight: 22, color: COLORS.subheadline, marginBottom: SPACE.md },
  extras: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.subheadline, marginBottom: SPACE.md },

  lockedNote: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.gold, marginBottom: SPACE.sm },
  list: { backgroundColor: SURFACE.raised, borderRadius: RADIUS.md, overflow: "hidden", ...SHADOW.raised },
  row: { flexDirection: "row", alignItems: "center", gap: SPACE.md, minHeight: 40, paddingHorizontal: SPACE.lg, paddingVertical: SPACE.sm },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: SURFACE.hairline },
  rowLabel: { flex: 1, fontFamily: FONTS.medium, fontSize: 14, lineHeight: 20, color: COLORS.headline },
  moreLabel: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline },
  detail: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19, color: COLORS.headline, marginTop: SPACE.md },

  buyButton: { backgroundColor: COLORS.gold, borderRadius: RADIUS.sm, paddingVertical: SPACE.lg, alignItems: "center", justifyContent: "center", marginTop: SPACE.lg, minHeight: 50 },
  buyLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  disabled: { opacity: 0.6 },
  oneTime: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.subheadline, textAlign: "center", marginTop: SPACE.md },

  secondary: { backgroundColor: SURFACE.floating, borderRadius: RADIUS.sm, paddingVertical: SPACE.md, paddingHorizontal: SPACE.lg, alignItems: "center", gap: SPACE.xs, marginTop: SPACE.md, minHeight: 50, justifyContent: "center" },
  secondaryLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.headline, textAlign: "center" },
  secondarySub: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.subheadline, textAlign: "center" },

  restoreButton: { minHeight: 44, alignItems: "center", justifyContent: "center", marginTop: SPACE.xs },
  restoreLabel: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, textDecorationLine: "underline" },
  notice: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 19, color: COLORS.danger, textAlign: "center", marginTop: SPACE.xs },
});
