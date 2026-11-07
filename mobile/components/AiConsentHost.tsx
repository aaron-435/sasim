// Modal host for the third-party-AI consent prompt (lib/aiConsent.ts). Mounted once from
// App.tsx next to <ScreenTransition/>; screens reach it through the consent gate helper,
// which resolves with the user's choice. Card styling follows NotificationPromptCard's family.
import ShieldCheck from "lucide-react-native/icons/shield-check";
import { useEffect, useRef, useState } from "react";
import { Linking, Modal, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import Text from "./AppText";
import PressableScale from "./motion/PressableScale";
import { API_BASE_URL } from "../config";
import { registerAiConsentPresenter } from "../lib/aiConsent";
import { useLocale, useStrings } from "../lib/i18n";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";
import { RADIUS, SCRIM, SHADOW, SPACE, SURFACE } from "../theme/tokens";

export default function AiConsentHost() {
  const strings = useStrings();
  const { locale } = useLocale();
  const { height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const resolveRef = useRef<((allowed: boolean) => void) | null>(null);

  useEffect(() => {
    registerAiConsentPresenter(
      () =>
        new Promise<boolean>((resolve) => {
          resolveRef.current = resolve;
          setVisible(true);
        }),
    );
    return () => {
      registerAiConsentPresenter(null);
      // Unmounted with the prompt open (logout resets the tree): treat as declined.
      resolveRef.current?.(false);
      resolveRef.current = null;
    };
  }, []);

  function answer(allowed: boolean) {
    setVisible(false);
    resolveRef.current?.(allowed);
    resolveRef.current = null;
  }

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={() => answer(false)}>
      <View style={styles.scrim}>
        <View style={styles.card}>
          <ScrollView style={[styles.body, { maxHeight: height * 0.7 }]} contentContainerStyle={styles.bodyContent}>
            <View style={styles.titleRow}>
              <ShieldCheck size={16} strokeWidth={2} color={COLORS.gold} />
              <Text style={styles.title} maxFontSizeMultiplier={MAX_FONT_SCALE.body} accessibilityRole="header">
                {strings.aiConsent.title}
              </Text>
            </View>
            <Text style={styles.paragraph} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
              {strings.aiConsent.body}
            </Text>
            {strings.aiConsent.items.map((item) => (
              <View key={item} style={styles.itemRow}>
                <Text style={styles.bullet} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
                  ·
                </Text>
                <Text style={styles.item} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
                  {item}
                </Text>
              </View>
            ))}
            <Text style={styles.footer} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>
              {strings.aiConsent.footer}
            </Text>
            <Text
              style={styles.link}
              maxFontSizeMultiplier={MAX_FONT_SCALE.body}
              accessibilityRole="link"
              onPress={() => Linking.openURL(`${API_BASE_URL}/privacy?lang=${locale}`)}
            >
              {strings.aiConsent.privacyLink}
            </Text>
          </ScrollView>
          <View style={styles.buttonRow}>
            <PressableScale
              onPress={() => answer(true)}
              style={styles.allowButton}
              accessibilityRole="button"
              accessibilityLabel={strings.aiConsent.allow}
            >
              <Text style={styles.allowLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                {strings.aiConsent.allow}
              </Text>
            </PressableScale>
            <PressableScale
              onPress={() => answer(false)}
              style={styles.declineButton}
              haptic="none"
              accessibilityRole="button"
              accessibilityLabel={strings.aiConsent.decline}
            >
              <Text style={styles.declineLabel} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                {strings.aiConsent.decline}
              </Text>
            </PressableScale>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: SCRIM,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACE.xl,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: RADIUS.md,
    backgroundColor: SURFACE.raised,
    ...SHADOW.raised,
    padding: SPACE.lg,
  },
  body: {
    flexGrow: 0,
  },
  bodyContent: {
    paddingBottom: SPACE.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.sm,
    marginBottom: SPACE.sm,
  },
  title: {
    flex: 1,
    fontFamily: FONTS.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.headline,
  },
  paragraph: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
    marginBottom: SPACE.md,
  },
  itemRow: {
    flexDirection: "row",
    gap: SPACE.sm,
    marginBottom: SPACE.xs,
  },
  bullet: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.gold,
  },
  item: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
  },
  footer: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.subheadline,
    marginTop: SPACE.md,
  },
  link: {
    fontFamily: FONTS.semibold,
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.gold,
    marginTop: SPACE.sm,
    paddingVertical: SPACE.sm,
  },
  buttonRow: {
    gap: SPACE.sm,
    marginTop: SPACE.md,
  },
  allowButton: {
    minHeight: 44,
    paddingHorizontal: SPACE.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.sm,
  },
  allowLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.ctaText,
  },
  declineButton: {
    minHeight: 44,
    paddingHorizontal: SPACE.md,
    alignItems: "center",
    justifyContent: "center",
  },
  declineLabel: {
    fontFamily: FONTS.semibold,
    fontSize: 14,
    color: COLORS.gold,
  },
});
