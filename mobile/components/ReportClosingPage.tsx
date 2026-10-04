import ArrowRight from "lucide-react-native/icons/arrow-right";
import Download from "lucide-react-native/icons/download";
import Share2 from "lucide-react-native/icons/share-2";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "./AppText";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

// The last page of both report readers (ReportScreen, YearReportScreen), so the two end
// the same way: the report's own closing words, then one line to keep (with share and PDF
// right under it), then one thing to do next, and the disclaimers small at the very end.
// Scrolls, because a long closing plus the cards can run past a small screen.

export type ClosingNext = {
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
  ctaLabel: string;
  onPress: () => void;
};

/** Keeps the writer's own line breaks; a single unbroken block becomes two-sentence paragraphs. */
function closingParagraphs(text: string): string[] {
  const byBreaks = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  if (byBreaks.length > 1) return byBreaks;
  const sentences = text.split(/(?<=[.!?…。])\s+/).filter(Boolean);
  const groups: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) groups.push(sentences.slice(i, i + 2).join(" "));
  return groups.length ? groups : [text];
}

export default function ReportClosingPage({
  title,
  body,
  summaryEyebrow,
  summary,
  share,
  pdf,
  next,
  disclaimers,
}: {
  title?: string;
  body: string;
  summaryEyebrow: string;
  summary: string;
  share: { label: string; onPress: () => void };
  pdf?: { label: string; busyLabel: string; busy: boolean; onPress: () => void };
  next?: ClosingNext | null;
  disclaimers: string[];
}) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {title ? (
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
      ) : null}
      {closingParagraphs(body).map((para, i) => (
        <Text key={i} style={[styles.body, i > 0 && styles.bodyNext]}>
          {para}
        </Text>
      ))}

      {summary ? (
        <View style={styles.summaryBlock}>
          <Text style={styles.eyebrow}>{summaryEyebrow}</Text>
          <Text style={styles.summary}>{summary}</Text>
          <View style={styles.actions}>
            <Pressable onPress={share.onPress} style={styles.action} accessibilityRole="button" accessibilityLabel={share.label}>
              <Share2 size={15} strokeWidth={1.75} color={COLORS.gold} />
              <Text style={styles.actionLabel}>{share.label}</Text>
            </Pressable>
            {pdf ? (
              <Pressable
                onPress={pdf.onPress}
                disabled={pdf.busy}
                style={[styles.action, pdf.busy && styles.actionBusy]}
                accessibilityRole="button"
                accessibilityLabel={pdf.busy ? pdf.busyLabel : pdf.label}
                accessibilityState={{ busy: pdf.busy, disabled: pdf.busy }}
              >
                {pdf.busy ? <ActivityIndicator size="small" color={COLORS.gold} /> : <Download size={15} strokeWidth={1.75} color={COLORS.gold} />}
                <Text style={styles.actionLabel}>{pdf.busy ? pdf.busyLabel : pdf.label}</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}

      {next ? (
        <Pressable
          onPress={next.onPress}
          style={({ pressed }) => [styles.nextCard, pressed && styles.nextCardPressed]}
          accessibilityRole="button"
          accessibilityLabel={`${next.eyebrow}. ${next.title}. ${next.body}${next.meta ? `. ${next.meta}` : ""}. ${next.ctaLabel}`}
        >
          <Text style={styles.eyebrow}>{next.eyebrow}</Text>
          <Text style={styles.nextTitle}>{next.title}</Text>
          <Text style={styles.nextBody}>{next.body}</Text>
          {next.meta ? <Text style={styles.nextMeta}>{next.meta}</Text> : null}
          <View style={styles.nextCta}>
            <Text style={styles.nextCtaLabel}>{next.ctaLabel}</Text>
            <ArrowRight size={15} strokeWidth={2} color={COLORS.gold} />
          </View>
        </Pressable>
      ) : null}

      <View style={styles.disclaimers}>
        {disclaimers.map((d, i) => (
          <Text key={i} style={styles.disclaimer}>
            {d}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 26, paddingTop: 28, paddingBottom: 40 },
  title: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 25, lineHeight: 32, color: COLORS.headline, marginBottom: 14 },
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 25, color: COLORS.headline },
  bodyNext: { marginTop: 14 },

  summaryBlock: { marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopColor: COLORS.border },
  eyebrow: { fontFamily: FONTS.semibold, fontSize: 12.5, color: COLORS.gold, marginBottom: 10 },
  summary: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 22, lineHeight: 31, color: COLORS.headline },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 18 },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBusy: { opacity: 0.6 },
  actionLabel: { fontFamily: FONTS.semibold, fontSize: 13.5, color: COLORS.headline },

  nextCard: { marginTop: 28, padding: 18, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.inputBg },
  nextCardPressed: { opacity: 0.75 },
  nextTitle: { fontFamily: FONTS.semibold, fontSize: 16.5, lineHeight: 23, color: COLORS.headline },
  nextBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: 6 },
  nextMeta: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.footer, marginTop: 8 },
  nextCta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
  nextCtaLabel: { fontFamily: FONTS.semibold, fontSize: 14, color: COLORS.gold },

  disclaimers: { marginTop: 36 },
  disclaimer: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 17, color: COLORS.footer, marginTop: 8 },
});
