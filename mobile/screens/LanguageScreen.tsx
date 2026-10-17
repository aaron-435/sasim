import Sparkles from "lucide-react-native/icons/sparkles";
import { StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "../components/PatternBackground";
import PressableScale from "../components/motion/PressableScale";
import Reveal from "../components/motion/Reveal";
import { LOCALE_LABELS, useLocale, type Locale } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SHADOW, SPACE, SURFACE } from "../theme/tokens";

// The very first screen, before IntroScreen — picked manually here rather than
// auto-detected from the device locale (explicit user choice per product decision).
// A real settings screen to change it later doesn't exist yet; this picker's choice
// is the only way to set it for now, persisted via LocaleContext/AsyncStorage.

// Target markets first (EN, ES); Korean is shipped but not the default audience.
const LANGUAGE_ORDER: Locale[] = ["en", "es", "ko"];
export default function LanguageScreen({ onNext }: { onNext: () => void }) {
  const { setLocale } = useLocale();

  function handlePick(locale: Locale) {
    setLocale(locale);
    onNext();
  }

  return (
    <PatternBackground>
      <SafeAreaView style={styles.root}>
        <View style={styles.content}>
          <Reveal index={0} style={styles.brandRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.brandLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>Fatesaid</Text>
          </Reveal>
          {/* No dictionary lookup here on purpose — the user hasn't picked a locale
              yet, so this heading is shown in all three languages at once rather than
              guessing one. */}
          <Reveal index={1}>
            <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>Choose your language · Elige tu idioma · 언어를 선택하세요</Text>
          </Reveal>

          <Reveal index={2} style={styles.optionList}>
            {LANGUAGE_ORDER.map((locale) => (
              <PressableScale
                key={locale}
                style={styles.option}
                onPress={() => handlePick(locale)}
                accessibilityRole="button"
                accessibilityLabel={LOCALE_LABELS[locale]}
                accessibilityLanguage={locale}
                haptic="select"
                pressedScale={0.98}
              >
                <Text style={styles.optionLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{LOCALE_LABELS[locale]}</Text>
              </PressableScale>
            ))}
          </Reveal>
        </View>
      </SafeAreaView>
    </PatternBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACE.xxl,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.xl,
  },
  brandLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    letterSpacing: 0.4,
    color: COLORS.gold,
  },
  heading: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.headline,
    textAlign: "center",
    marginBottom: SPACE.xxl,
  },
  optionList: {
    width: "100%",
    gap: SPACE.md,
  },
  option: {
    width: "100%",
    paddingVertical: SPACE.lg,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    backgroundColor: SURFACE.raised,
    borderWidth: 1,
    borderColor: SURFACE.hairline,
    ...SHADOW.raised,
  },
  optionLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 16,
    color: COLORS.headline,
  },
});
