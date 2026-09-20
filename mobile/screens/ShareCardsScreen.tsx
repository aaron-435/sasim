import { ArrowLeft, Droplets, Flame, Gem, Lock, Mountain, Share2, TreePine } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import type { CompatibilityResult } from "../lib/compatibility";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { hasQaProEntitlement } from "../lib/purchases";
import { SHARE_CARD_CONTENT } from "../lib/shareCardContent";
import type { SajuType } from "../lib/sajuType";
import { getTypePieces } from "../lib/sajuTypeContent";
import { YEAR_FORTUNE_CONTENT } from "../lib/yearFortuneContent";
import { COLORS } from "../theme/colors";

// Domain share cards — "how I find money", "what sets my heart racing", "my bright spot
// this year". Money and love are free and need no network (copy is picked by the saju
// archetype, see lib/shareCardContent.ts) so anyone can post them; the year card is Pro
// and reads the same /api/yearFortune the Fortune screen's year tab does.
//
// Unlike the type / compatibility cards these use a FIXED 9:16 box: the copy is short and
// written to a length budget, and 9:16 is exactly what Instagram/TikTok stories crop to.
// Captured at width 1080 → an exact 1080x1920 export.
const ELEMENT_ICON = { wood: TreePine, fire: Flame, earth: Mountain, metal: Gem, water: Droplets } as const;

type CardKind = "money" | "love" | "year";
type YearDomain = "wealth" | "love" | "career" | "study" | "health";

// Which life area the year card spotlights, by how this year's energy relates to the
// person's own (the relation the year engine already returns). A content mapping, not a
// separate calculation — the spotlight is the area each relation's copy speaks to best.
const YEAR_SPOTLIGHT: Record<CompatibilityResult["relation"], YearDomain> = {
  mirror: "study",
  selfNurturesOther: "love",
  otherNurturesSelf: "career",
  selfChallengesOther: "wealth",
  otherChallengesSelf: "career",
};

type YearData = { year: number; relation: CompatibilityResult["relation"] };

export default function ShareCardsScreen({
  nickname,
  sajuType,
  selfDayMasterChar,
  selfDayBranch,
  onOpenFortune,
  onBack,
}: {
  nickname: string;
  sajuType: SajuType;
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
  onOpenFortune: () => void;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const yearContent = YEAR_FORTUNE_CONTENT[locale] ?? YEAR_FORTUNE_CONTENT.ko;
  const cardRef = useRef<View>(null);
  const mountedRef = useRef(true);

  const [kind, setKind] = useState<CardKind>("money");
  const [sharing, setSharing] = useState(false);
  const [entitled, setEntitled] = useState<boolean | null>(null);
  const [year, setYear] = useState<YearData | null>(null);
  const [yearLoading, setYearLoading] = useState(false);
  const [yearError, setYearError] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    hasQaProEntitlement().then((value) => {
      if (mountedRef.current) setEntitled(value);
    });
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadYear = useCallback(async () => {
    if (!selfDayMasterChar) {
      setYearError(true);
      return;
    }
    setYearLoading(true);
    setYearError(false);
    try {
      const params = new URLSearchParams({ selfDayMasterChar });
      if (selfDayBranch) params.set("selfDayBranch", selfDayBranch);
      const res = await fetch(`${API_BASE_URL}/api/yearFortune?${params.toString()}`);
      const json = await res.json();
      const relation = json?.yearFortune?.compatibility?.relation as CompatibilityResult["relation"] | undefined;
      if (!res.ok || !relation) throw new Error("failed");
      if (mountedRef.current) setYear({ year: json.yearFortune.year, relation });
    } catch {
      if (mountedRef.current) setYearError(true);
    } finally {
      if (mountedRef.current) setYearLoading(false);
    }
  }, [selfDayMasterChar, selfDayBranch]);

  useEffect(() => {
    if (kind === "year" && entitled && !year && !yearLoading && !yearError) loadYear();
  }, [kind, entitled, year, yearLoading, yearError, loadYear]);

  const { archetype } = getTypePieces(locale, sajuType);
  const tint = ELEMENT_COLORS[sajuType.dayMasterElement] ?? COLORS.gold;
  const Icon = ELEMENT_ICON[sajuType.dayMasterElement];

  // What the visible card says. null while the year card is locked / loading / failed.
  let card: { title: string; headline: string; body: string; tipLabel: string; tip: string } | null = null;
  if (kind === "money" || kind === "love") {
    const copy = (SHARE_CARD_CONTENT[locale] ?? SHARE_CARD_CONTENT.ko)[kind][sajuType.archetype];
    card = {
      title: kind === "money" ? strings.shareCards.tabMoney : strings.shareCards.tabLove,
      headline: copy.headline,
      body: copy.body,
      tipLabel: strings.shareCards.tipLabel,
      tip: copy.tip,
    };
  } else if (year) {
    const domain = YEAR_SPOTLIGHT[year.relation];
    const relationCopy = yearContent.relations[year.relation];
    card = {
      title: strings.shareCards.tabYear,
      headline: strings.shareCards.domains[domain],
      body: relationCopy[domain],
      tipLabel: strings.shareCards.spotLabel,
      tip: `${year.year} · ${relationCopy.headline}`,
    };
  }

  async function handleShare() {
    if (sharing || !card) return;
    setSharing(true);
    try {
      // Width-only capture: the card box is 9:16, so this is an exact 1080x1920 export
      // regardless of the device's screen size or pixel ratio.
      const uri = await captureRef(cardRef, { format: "png", quality: 1, width: 1080 });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best-effort — sharing is a bonus action, not worth an error screen.
    } finally {
      setSharing(false);
    }
  }

  const tabs: { key: CardKind; label: string }[] = [
    { key: "money", label: strings.shareCards.tabMoney },
    { key: "love", label: strings.shareCards.tabLove },
    { key: "year", label: strings.shareCards.tabYear },
  ];

  const yearGate = kind === "year" ? (entitled === null || yearLoading ? "loading" : !entitled ? "locked" : yearError ? "error" : null) : null;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button">
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading} accessibilityRole="header">
          {strings.shareCards.heading}
        </Text>
        <Text style={styles.subtitle}>{strings.shareCards.subtitle}</Text>

        <View style={styles.tabRow}>
          {tabs.map((t) => (
            <Pressable
              key={t.key}
              onPress={() => setKind(t.key)}
              style={[styles.tab, kind === t.key && styles.tabActive]}
              accessibilityRole="tab"
              accessibilityState={{ selected: kind === t.key }}
            >
              <View style={styles.tabInner}>
                {t.key === "year" && entitled === false && <Lock size={12} strokeWidth={2} color={kind === t.key ? COLORS.gold : COLORS.subheadline} />}
                <Text style={[styles.tabLabel, kind === t.key && styles.tabLabelActive]}>{t.label}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {card && (
          <View ref={cardRef} collapsable={false} style={styles.card}>
            <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
            <View style={styles.cardInner}>
              <Text style={styles.brand}>FATESAID</Text>

              <View style={styles.cardMid}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <View style={styles.archetypeRow}>
                  <View style={[styles.iconBubble, { backgroundColor: `${tint}22` }]}>
                    <Icon size={18} strokeWidth={1.75} color={tint} />
                  </View>
                  <Text style={styles.archetypeName}>{archetype.name}</Text>
                </View>
                <Text style={styles.headline}>{card.headline}</Text>
                <Text style={styles.body}>{card.body}</Text>
              </View>

              <View style={styles.cardBottom}>
                <View style={styles.tipPanel}>
                  <Text style={styles.tipLabel}>{card.tipLabel}</Text>
                  <Text style={styles.tipText}>{card.tip}</Text>
                </View>
                <Text style={styles.byLine}>{strings.shareCards.cardBy(nickname)}</Text>
                <Text style={styles.footer}>{strings.shareCards.footer}</Text>
              </View>
            </View>
          </View>
        )}

        {yearGate === "loading" && <ActivityIndicator color={COLORS.gold} style={styles.spinner} />}

        {yearGate === "locked" && (
          <View style={styles.gateCard}>
            <Lock size={20} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.gateTitle}>{strings.shareCards.lockedTitle}</Text>
            <Text style={styles.gateBody}>{strings.shareCards.lockedBody}</Text>
            <Pressable style={styles.primaryButton} onPress={onOpenFortune} accessibilityRole="button">
              <Text style={styles.primaryButtonLabel}>{strings.shareCards.lockedCta}</Text>
            </Pressable>
          </View>
        )}

        {yearGate === "error" && (
          <View style={styles.gateCard}>
            <Text style={styles.gateBody}>{strings.shareCards.loadError}</Text>
            <Pressable style={styles.retryButton} onPress={loadYear} accessibilityRole="button">
              <Text style={styles.retryLabel}>{strings.common.retryLabel}</Text>
            </Pressable>
          </View>
        )}

        {card && (
          <Pressable style={styles.primaryButton} onPress={handleShare} disabled={sharing} accessibilityRole="button">
            {sharing ? (
              <ActivityIndicator color={COLORS.ctaText} />
            ) : (
              <>
                <Share2 size={16} strokeWidth={2} color={COLORS.ctaText} />
                <Text style={styles.primaryButtonLabel}>{strings.shareCards.shareButton}</Text>
              </>
            )}
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", minHeight: 44, marginLeft: -8, paddingHorizontal: 8 },
  backLabel: { fontFamily: "Manrope_400Regular", fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline, marginTop: 4 },
  subtitle: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 21, color: COLORS.subheadline, marginTop: 6, marginBottom: 16 },
  tabRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  tab: { minHeight: 44, justifyContent: "center", paddingHorizontal: 14, borderRadius: 999, backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border },
  tabActive: { backgroundColor: "rgba(111,169,139,0.12)", borderColor: "rgba(111,169,139,0.4)" },
  tabInner: { flexDirection: "row", alignItems: "center", gap: 5 },
  tabLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13, color: COLORS.subheadline },
  tabLabelActive: { color: COLORS.gold },
  spinner: { marginVertical: 40 },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    aspectRatio: 9 / 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.background,
  },
  cardInner: { flex: 1, paddingHorizontal: "9%", paddingVertical: "8%", justifyContent: "space-between" },
  brand: { fontFamily: "Manrope_700Bold", fontSize: 12, letterSpacing: 3, color: COLORS.gold, textAlign: "center" },
  cardMid: { alignItems: "center" },
  cardTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center" },
  archetypeRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 14, marginBottom: 16 },
  iconBubble: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  archetypeName: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.headline },
  headline: { fontFamily: "Manrope_600SemiBold", fontSize: 19, lineHeight: 26, color: COLORS.gold, textAlign: "center" },
  body: { fontFamily: "Manrope_400Regular", fontSize: 13.5, lineHeight: 21, color: COLORS.subheadline, textAlign: "center", marginTop: 12 },
  cardBottom: { alignItems: "center", gap: 10 },
  tipPanel: { width: "100%", borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.04)", paddingVertical: 12, paddingHorizontal: 14, alignItems: "center", gap: 4 },
  tipLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 11.5, color: COLORS.gold },
  tipText: { fontFamily: "Manrope_500Medium", fontSize: 14, lineHeight: 20, color: COLORS.headline, textAlign: "center" },
  byLine: { fontFamily: "Manrope_500Medium", fontSize: 12, color: COLORS.headline },
  footer: { fontFamily: "Manrope_400Regular", fontSize: 11.5, color: COLORS.subheadline, textAlign: "center" },
  gateCard: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 22, gap: 10, alignItems: "flex-start" },
  gateTitle: { fontFamily: "CormorantGaramond_500Medium", fontVariant: ["lining-nums"], fontSize: 22, color: COLORS.headline },
  gateBody: { fontFamily: "Manrope_400Regular", fontSize: 14, lineHeight: 21, color: COLORS.subheadline },
  primaryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 15, marginTop: 20, alignSelf: "stretch" },
  primaryButtonLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 14.5, color: COLORS.ctaText },
  retryButton: { minHeight: 44, justifyContent: "center" },
  retryLabel: { fontFamily: "Manrope_600SemiBold", fontSize: 13.5, color: COLORS.gold },
});
