import Sparkles from "lucide-react-native/icons/sparkles";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "../components/PatternBackground";
import { LOCALE_LABELS, useLocale, type Locale } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

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
          <View style={styles.brandRow}>
            <Sparkles size={12} strokeWidth={1.75} color={COLORS.gold} />
            <Text style={styles.brandLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>FATESAID</Text>
          </View>
          {/* No dictionary lookup here on purpose — the user hasn't picked a locale
              yet, so this heading is shown in all three languages at once rather than
              guessing one. */}
          <Text style={styles.heading} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>Choose your language · Elige tu idioma · 언어를 선택하세요</Text>

          <View style={styles.optionList}>
            {LANGUAGE_ORDER.map((locale) => (
              <Pressable
                key={locale}
                style={styles.option}
                onPress={() => handlePick(locale)}
                accessibilityRole="button"
                accessibilityLabel={LOCALE_LABELS[locale]}
                accessibilityLanguage={locale}
              >
                <Text style={styles.optionLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{LOCALE_LABELS[locale]}</Text>
              </Pressable>
            ))}
          </View>
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
    paddingHorizontal: 32,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  brandLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.headline,
    textAlign: "center",
    marginBottom: 36,
  },
  optionList: {
    width: "100%",
    gap: 12,
  },
  option: {
    width: "100%",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 16,
    color: COLORS.headline,
  },
});
