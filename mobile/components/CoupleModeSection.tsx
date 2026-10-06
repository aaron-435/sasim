import { useEffect, useState } from "react";
import Heart from "lucide-react-native/icons/heart";
import Share2 from "lucide-react-native/icons/share-2";
import { ActivityIndicator, Alert, Platform, Pressable, Share, StyleSheet, TextInput, View } from "react-native";
import Text from "./AppText";
import { track } from "../lib/analytics";
import { useStrings } from "../lib/i18n";
import { createPairCode, fetchCoupleDaily, formatPairCode, getSavedPair, joinPair, unlinkPair, type SavedPair } from "../lib/pairs";
import { getRevenueCatUserId } from "../lib/purchases";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

// Couple mode setup, under the compatibility screen's invite section (SPEC 2026-10-05 §7):
// make a code for the partner, or type in the one they sent. Once linked, Home shows
// "today, the two of you" (HomeScreen) and either side can unlink here or in Settings.

export async function confirmUnlink(strings: ReturnType<typeof useStrings>): Promise<boolean> {
  if (Platform.OS === "web") {
    // react-native-web's Alert has no buttons; the browser's confirm keeps the two-step guard.
    return globalThis.confirm?.(`${strings.couple.unlinkConfirmTitle}\n${strings.couple.unlinkConfirmBody}`) ?? false;
  }
  return new Promise((resolve) =>
    Alert.alert(strings.couple.unlinkConfirmTitle, strings.couple.unlinkConfirmBody, [
      { text: strings.settings.cancelLabel, style: "cancel", onPress: () => resolve(false) },
      { text: strings.couple.unlinkButton, style: "destructive", onPress: () => resolve(true) },
    ]),
  );
}

export default function CoupleModeSection({
  selfNickname,
  selfDayMasterChar,
  selfDayBranch,
}: {
  selfNickname: string;
  selfDayMasterChar: string | null;
  selfDayBranch: string | null;
}) {
  const strings = useStrings();
  const [pair, setPair] = useState<SavedPair | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [note, setNote] = useState<{ text: string; error: boolean } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const saved = await getSavedPair();
      if (!alive) return;
      setPair(saved);
      setLoaded(true);
      // A code waiting for the partner: ask once whether they've joined (or unlinked) since.
      if (saved) {
        await fetchCoupleDaily();
        if (alive) setPair(await getSavedPair());
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function me() {
    return { name: selfNickname, dayMaster: selfDayMasterChar!, dayBranch: selfDayBranch, appUserId: await getRevenueCatUserId() };
  }

  async function shareCode(code: string) {
    const message = strings.couple.shareMessage(formatPairCode(code));
    if (Platform.OS === "web") {
      const nav = globalThis.navigator as Navigator | undefined;
      if (nav?.share) {
        try {
          await nav.share({ text: message });
          return;
        } catch (e) {
          if ((e as Error)?.name === "AbortError") return;
        }
      }
      await nav?.clipboard?.writeText(formatPairCode(code));
      setNote({ text: strings.couple.copied, error: false });
      return;
    }
    await Share.share({ message });
  }

  async function handleCreate() {
    if (busy || !selfDayMasterChar) return;
    setBusy(true);
    setNote(null);
    try {
      const created = await createPairCode(await me());
      track("pair_create", { surface: "compatibility" });
      setPair(created);
      await shareCode(created.code);
    } catch {
      setNote({ text: strings.couple.errorCreate, error: true });
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin() {
    const code = codeInput.trim();
    if (busy || !selfDayMasterChar || !code) return;
    setBusy(true);
    setNote(null);
    try {
      const joined = await joinPair(code, await me());
      track("pair_join", { surface: "compatibility" });
      setPair(joined);
      setCodeInput("");
    } catch (e) {
      const reason = (e as Error)?.message;
      setNote({
        text:
          reason === "not_found" || reason === "bad_request"
            ? strings.couple.errorJoinNotFound
            : reason === "already_joined"
              ? strings.couple.errorJoinTaken
              : reason === "self"
                ? strings.couple.errorJoinSelf
                : strings.couple.errorJoinDefault,
        error: true,
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleUnlink(ask: boolean) {
    if (busy) return;
    if (ask && !(await confirmUnlink(strings))) return;
    setBusy(true);
    setNote(null);
    const ok = await unlinkPair();
    setBusy(false);
    if (!ok) {
      setNote({ text: strings.couple.unlinkError, error: true });
      return;
    }
    track("pair_unlink", { surface: "compatibility" });
    setPair(null);
  }

  if (!loaded) return null;

  const daysLeft = pair?.codeExpiresAt ? Math.max(1, Math.ceil((Date.parse(pair.codeExpiresAt) - Date.now()) / 864e5)) : 7;

  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <Heart size={18} strokeWidth={1.75} color={COLORS.gold} />
        <Text style={styles.title} accessibilityRole="header">{strings.couple.sectionTitle}</Text>
      </View>
      <Text style={styles.body}>{strings.couple.sectionBody}</Text>

      {pair?.status === "linked" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{strings.couple.linkedTitle(pair.partnerName || strings.couple.partnerFallback)}</Text>
          <Pressable onPress={() => handleUnlink(true)} disabled={busy} style={styles.linkButton} accessibilityRole="button">
            {busy ? <ActivityIndicator color={COLORS.danger} /> : <Text style={styles.unlinkLabel}>{strings.couple.unlinkButton}</Text>}
          </Pressable>
        </View>
      )}

      {pair?.status === "pending" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{strings.couple.pendingTitle}</Text>
          <Text style={styles.code} selectable accessibilityLabel={pair.code.split("").join(" ")}>{formatPairCode(pair.code)}</Text>
          <Text style={styles.cardBody}>{strings.couple.pendingBody(daysLeft)}</Text>
          <Pressable
            style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
            onPress={() => shareCode(pair.code)}
            accessibilityRole="button"
          >
            <Share2 size={16} strokeWidth={2} color={COLORS.gold} />
            <Text style={styles.outlineLabel}>{strings.couple.shareCode}</Text>
          </Pressable>
          <Pressable onPress={() => handleUnlink(false)} disabled={busy} style={styles.linkButton} accessibilityRole="button">
            <Text style={styles.cancelLabel}>{strings.couple.cancelCode}</Text>
          </Pressable>
        </View>
      )}

      {!pair && (
        <>
          <Pressable
            style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed, !selfDayMasterChar && styles.disabled]}
            onPress={handleCreate}
            disabled={busy || !selfDayMasterChar}
            accessibilityRole="button"
          >
            {busy ? <ActivityIndicator color={COLORS.gold} /> : <Text style={styles.outlineLabel}>{strings.couple.makeCode}</Text>}
          </Pressable>
          <Text style={styles.inputLabel}>{strings.couple.enterCodeLabel}</Text>
          <View style={styles.joinRow}>
            <TextInput
              value={codeInput}
              onChangeText={setCodeInput}
              placeholder={strings.couple.codePlaceholder}
              placeholderTextColor={COLORS.placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={12}
              style={styles.input}
              accessibilityLabel={strings.couple.enterCodeLabel}
              onSubmitEditing={handleJoin}
            />
            <Pressable
              style={[styles.joinButton, (!codeInput.trim() || !selfDayMasterChar) && styles.disabled]}
              onPress={handleJoin}
              disabled={busy || !codeInput.trim() || !selfDayMasterChar}
              accessibilityRole="button"
            >
              <Text style={styles.joinLabel}>{strings.couple.joinButton}</Text>
            </Pressable>
          </View>
        </>
      )}

      {note && <Text style={[styles.note, note.error && styles.noteError]}>{note.text}</Text>}
      <Text style={styles.privacy}>{strings.couple.privacyNote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 40, paddingTop: 28, borderTopWidth: 1, borderTopColor: COLORS.border },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontFamily: FONTS.display, fontSize: 22, color: COLORS.headline },
  body: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: 8 },
  card: {
    marginTop: 18,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
  },
  cardTitle: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21, color: COLORS.headline, textAlign: "center" },
  cardBody: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, textAlign: "center", marginTop: 8 },
  code: { fontFamily: FONTS.semibold, fontVariant: ["lining-nums"], fontSize: 28, letterSpacing: 3, color: COLORS.gold, marginTop: 14 },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 12,
    minHeight: 48,
    marginTop: 18,
  },
  outlineLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.gold },
  pressed: { backgroundColor: "rgba(111,169,139,0.08)" },
  disabled: { opacity: 0.4 },
  linkButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12, marginTop: 8 },
  unlinkLabel: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.danger },
  cancelLabel: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.subheadline },
  inputLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.subheadline, marginTop: 22, marginBottom: 8 },
  joinRow: { flexDirection: "row", gap: 10 },
  input: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
    fontFamily: FONTS.medium,
    fontSize: 16,
    letterSpacing: 1,
    color: COLORS.headline,
  },
  joinButton: { minHeight: 48, paddingHorizontal: 18, borderRadius: 12, backgroundColor: COLORS.gold, alignItems: "center", justifyContent: "center" },
  joinLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  note: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, marginTop: 10 },
  noteError: { color: COLORS.danger },
  privacy: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.footer, marginTop: 16 },
});
