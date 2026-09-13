import { Sparkles } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import PatternBackground from "../components/PatternBackground";
import { LOCALES, LOCALE_LABELS, useLocale, type Locale } from "../lib/i18n";
import { COLORS } from "../theme/colors";

// The very first screen, before IntroScreen — picked manually here rather than
// auto-detected from the device locale (explicit user choice per product decision).
// A real settings screen to change it later doesn't exist yet; this picker's choice
// is the only way to set it for now, persisted via LocaleContext/AsyncStorage.
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
            <Text style={styles.brandLabel}>FATESAID</Text>
          </View>
          {/* No dictionary lookup here on purpose — the user hasn't picked a locale
              yet, so this heading is shown in all three languages at once rather than
              guessing one. */}
          <Text style={styles.heading}>언어를 선택하세요 · Choose your language · Elige tu idioma</Text>

          <View style={styles.optionList}>
            {LOCALES.map((locale) => (
              <Pressable key={locale} style={styles.option} onPress={() => handlePick(locale)}>
                <Text style={styles.optionLabel}>{LOCALE_LABELS[locale]}</Text>
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
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.gold,
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "Manrope_500Medium",
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
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
    color: COLORS.headline,
  },
});
