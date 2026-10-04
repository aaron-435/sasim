import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ArrowRight from "lucide-react-native/icons/arrow-right";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "./AppText";
import { hasSeenReaderHint, markReaderHintSeen, type ReaderHintId } from "../lib/readerHint";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS } from "../theme/fonts";

// The page-turning reader shared by the in-depth report (ReportScreen) and the year-ahead
// report (YearReportScreen): a top bar (back, progress bar, "03/13" counter, an optional
// action such as the PDF button), one full-width page per idea that turns by swiping, and
// narrow tap zones at both edges for previous/next.
//
// First open only: a quiet "swipe to turn" note sits over the bottom of page one until the
// reader turns a page once (remembered per report kind, lib/readerHint.ts). Static, so no
// reduced-motion handling is needed.
//
// Controlled: the screen owns pageIndex (so a table of contents can jump to a page) and the
// pager scrolls to it whenever it changes.

export type ReaderPage = { key: string; node: ReactNode };

export default function ReportPager({
  pages,
  pageIndex,
  onPageIndexChange,
  onBack,
  labels,
  edgeTaps = true,
  trailing,
  footer,
  swipeHint,
}: {
  pages: ReaderPage[];
  pageIndex: number;
  onPageIndexChange: (index: number) => void;
  onBack: () => void;
  labels: { back: string; previous: string; next: string };
  /** Off on pages whose own buttons sit near the edges (the deep report's paywall). Swiping still works. */
  edgeTaps?: boolean;
  /** Extra control at the right end of the top bar. */
  trailing?: ReactNode;
  /** Shown under the pages (e.g. a home button on the last page). */
  footer?: ReactNode;
  /** One-time first-page note; `id` keys the "already seen" flag. */
  swipeHint?: { id: ReaderHintId; label: string };
}) {
  // Read live (not once at module load) so rotation, iPad Split View and window resizes
  // keep the page width and offsets correct.
  const { width: screenWidth } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  // Pages get the pager's measured height explicitly: on react-native-web a flex:1 page
  // inside the horizontal scroller collapses to its content, which left cover footers and
  // centred closings floating at the top.
  const [pageHeight, setPageHeight] = useState<number | undefined>(undefined);

  // Hidden until storage answers, so a returning reader never sees it flash.
  const [hintVisible, setHintVisible] = useState(false);
  const hintId = swipeHint?.id;
  useEffect(() => {
    if (!hintId) return;
    let alive = true;
    hasSeenReaderHint(hintId).then((seen) => {
      if (alive && !seen) setHintVisible(true);
    });
    return () => {
      alive = false;
    };
  }, [hintId]);
  useEffect(() => {
    if (!hintVisible || pageIndex === 0 || !hintId) return;
    setHintVisible(false);
    markReaderHintSeen(hintId);
  }, [hintVisible, pageIndex, hintId]);

  // Also re-applied once the pager is measured, so a page chosen before layout still lands.
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: pageIndex * screenWidth, animated: true });
  }, [pageIndex, screenWidth, pageHeight]);

  const goTo = (index: number) => onPageIndexChange(Math.max(0, Math.min(pages.length - 1, index)));

  function handleMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    goTo(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
  }

  const total = pages.length;
  const progressPct = total > 0 ? ((pageIndex + 1) / total) * 100 : 0;

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <View style={styles.chrome}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.chromeBack} accessibilityRole="button" accessibilityLabel={labels.back}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
        </Pressable>
        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: total, now: pageIndex + 1, text: `${pageIndex + 1} / ${total}` }}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={pageIndex + 1}
          aria-valuetext={`${pageIndex + 1} / ${total}`}
        >
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
        <Text style={styles.progressCount} accessibilityLiveRegion="polite">
          {String(pageIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </Text>
        {trailing}
      </View>

      <View style={styles.pagerWrap} onLayout={(e) => setPageHeight(e.nativeEvent.layout.height)}>
        <ScrollView ref={scrollRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={handleMomentumEnd}>
          {pages.map((p) => (
            <View key={p.key} style={{ width: screenWidth, height: pageHeight }}>
              {/* Full-width page for paging math; the page itself reads as a centered column on iPad. */}
              <View style={styles.pageColumn}>{p.node}</View>
            </View>
          ))}
        </ScrollView>

        {hintVisible && pageIndex === 0 && swipeHint && (
          <View style={styles.hintWrap} pointerEvents="none">
            <View style={styles.hint}>
              <Text style={styles.hintLabel}>{swipeHint.label}</Text>
              <ArrowRight size={14} strokeWidth={2} color={COLORS.gold} />
            </View>
          </View>
        )}

        {/* Edge tap zones only. Covering the whole pager would swallow taps meant for
            buttons on the pages themselves. */}
        {edgeTaps && (
          <>
            <Pressable style={styles.tapLeft} onPress={() => goTo(pageIndex - 1)} accessibilityRole="button" accessibilityLabel={labels.previous} />
            <Pressable style={styles.tapRight} onPress={() => goTo(pageIndex + 1)} accessibilityRole="button" accessibilityLabel={labels.next} />
          </>
        )}
      </View>

      {footer}
    </SafeAreaView>
  );
}

/** Square icon button sized for the pager's top bar (pass as `trailing`). */
export const readerChromeButtonStyle = { width: 44, height: 44, alignItems: "center", justifyContent: "center", marginRight: -10 } as const;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  chrome: { ...readableColumn, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  chromeBack: { padding: 10, minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center", marginLeft: -10 },
  progressTrack: { flex: 1, height: 3, borderRadius: 2, backgroundColor: "rgba(217,201,163,0.16)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2, backgroundColor: COLORS.headline },
  progressCount: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline, letterSpacing: 0.5, minWidth: 44, textAlign: "right" },
  pagerWrap: { flex: 1, position: "relative" },
  pageColumn: { ...readableColumn, flex: 1 },
  hintWrap: { position: "absolute", left: 0, right: 0, bottom: 64, alignItems: "center", paddingHorizontal: 24 },
  hint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  hintLabel: { fontFamily: FONTS.medium, fontSize: 13, lineHeight: 18, color: COLORS.headline, flexShrink: 1 },
  tapLeft: { position: "absolute", top: 0, bottom: 0, left: 0, width: "16%" },
  tapRight: { position: "absolute", top: 0, bottom: 0, right: 0, width: "16%" },
});
