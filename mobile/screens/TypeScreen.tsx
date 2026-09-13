import { useRef, useState } from "react";
import { ArrowLeft, Droplets, Flame, Gem, Mountain, Share2, TreePine } from "lucide-react-native";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { formatSajuTypeName, getTypePieces } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";

const ELEMENT_ICON = { wood: TreePine, fire: Flame, earth: Mountain, metal: Gem, water: Droplets } as const;

export default function TypeScreen({
  nickname,
  sajuType,
  onBack,
}: {
  nickname: string;
  sajuType: SajuType;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();
  const cardRef = useRef<View>(null);
  const [sharing, setSharing] = useState(false);

  const { archetype, mode } = getTypePieces(locale, sajuType);
  const typeName = formatSajuTypeName(locale, sajuType);
  const ArchetypeIcon = ELEMENT_ICON[sajuType.dayMasterElement];
  const ModeIcon = ELEMENT_ICON[sajuType.dominantElement];
  const tint = ELEMENT_COLORS[sajuType.dayMasterElement] ?? COLORS.gold;

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    try {
      const uri = await captureRef(cardRef, { format: "png", quality: 1 });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best-effort — sharing is a bonus action, not something worth surfacing an error screen for.
    } finally {
      setSharing(false);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <View ref={cardRef} collapsable={false} style={[styles.card, { borderColor: `${tint}55` }]}>
          <Text style={styles.brandLabel}>FATESAID</Text>
          <View style={[styles.iconRow]}>
            <View style={[styles.iconBubble, { backgroundColor: `${tint}22` }]}>
              <ArchetypeIcon size={26} strokeWidth={1.75} color={tint} />
            </View>
          </View>
          <Text style={styles.typeName}>{typeName}</Text>
          <Text style={styles.greeting}>{strings.home.greeting(nickname)}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ArchetypeIcon size={16} strokeWidth={2} color={tint} />
            <Text style={styles.sectionLabel}>{strings.sajuType.archetypeLabel}</Text>
          </View>
          <Text style={styles.pieceName}>{archetype.name}</Text>
          <Text style={styles.pieceTagline}>{archetype.tagline}</Text>
          <Text style={styles.pieceBody}>{archetype.body}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ModeIcon size={16} strokeWidth={2} color={ELEMENT_COLORS[sajuType.dominantElement]} />
            <Text style={styles.sectionLabel}>{strings.sajuType.modeLabel}</Text>
          </View>
          <Text style={styles.pieceName}>{mode.name}</Text>
          <Text style={styles.pieceTagline}>{mode.tagline}</Text>
          <Text style={styles.pieceBody}>{mode.body}</Text>
        </View>

        <Pressable style={styles.shareButton} onPress={handleShare} disabled={sharing}>
          {sharing ? (
            <ActivityIndicator color={COLORS.ctaText} />
          ) : (
            <>
              <Share2 size={16} strokeWidth={2} color={COLORS.ctaText} />
              <Text style={styles.shareButtonLabel}>{strings.sajuType.shareButton}</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: -8,
    marginBottom: 12,
  },
  backLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
  },
  card: {
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 20,
    gap: 10,
  },
  brandLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
  },
  iconRow: {
    marginTop: 6,
  },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  typeName: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 28,
    color: COLORS.headline,
    marginTop: 4,
  },
  greeting: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    color: COLORS.subheadline,
  },
  section: {
    marginTop: 26,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  sectionLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12.5,
    letterSpacing: 0.3,
    color: COLORS.subheadline,
  },
  pieceName: {
    fontFamily: "CormorantGaramond_500Medium",
    fontVariant: ["lining-nums"],
    fontSize: 22,
    color: COLORS.headline,
  },
  pieceTagline: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13.5,
    color: COLORS.gold,
    marginTop: 4,
  },
  pieceBody: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14.5,
    lineHeight: 22,
    color: COLORS.subheadline,
    marginTop: 10,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 32,
  },
  shareButtonLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14.5,
    color: COLORS.ctaText,
  },
});
