import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./AppText";
import JournalSafetyNote from "./JournalSafetyNote";
import { track } from "../lib/analytics";
import { useStrings } from "../lib/i18n";
import {
  getJournalEntry,
  hasCrisisSignal,
  JOURNAL_MOODS,
  MAX_NOTE_LENGTH,
  saveJournalEntry,
  type JournalEntry,
  type JournalMood,
} from "../lib/journalStorage";
import { COLORS } from "../theme/colors";
import { FONTS, MAX_FONT_SCALE } from "../theme/fonts";

// "오늘 한 줄" under today's reading (FortuneScreen, once the day is opened). A mood is required,
// the line is optional; both stay on the device (lib/journalStorage.ts). If the line reads like a
// self-harm signal, the help lines show right under it — the entry is still saved.
export default function JournalEntryCard({ dateIso, onOpenJournal }: { dateIso: string; onOpenJournal: () => void }) {
  const strings = useStrings();
  const [saved, setSaved] = useState<JournalEntry | null>(null);
  const [editing, setEditing] = useState(false);
  const [mood, setMood] = useState<JournalMood | null>(null);
  const [note, setNote] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    getJournalEntry(dateIso).then((entry) => {
      if (!alive) return;
      setSaved(entry);
      setEditing(!entry);
      setMood(entry?.mood ?? null);
      setNote(entry?.note ?? "");
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, [dateIso]);

  async function handleSave() {
    if (!mood) return;
    const isNew = !saved;
    const entry = await saveJournalEntry(dateIso, mood, note);
    setSaved(entry);
    setEditing(false);
    track("journal_save", { kind: mood, value: entry.note ? 1 : 0, ...(isNew ? {} : { step: "edit" }) });
  }

  if (!loaded) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.label} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.journal.cardLabel}</Text>

      {editing ? (
        <>
          <Text style={styles.prompt}>{strings.journal.cardPrompt}</Text>
          <View style={styles.moodGrid} accessibilityRole="radiogroup" accessibilityLabel={strings.journal.moodGroupLabel}>
            {JOURNAL_MOODS.map((m) => {
              const selected = mood === m;
              return (
                <Pressable
                  key={m}
                  onPress={() => setMood(m)}
                  style={({ pressed }) => [styles.moodChip, selected && styles.moodChipSelected, pressed && styles.pressed]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  aria-checked={selected}
                >
                  <Text style={[styles.moodLabel, selected && styles.moodLabelSelected]} numberOfLines={1} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>
                    {strings.journal.moods[m]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={strings.journal.notePlaceholder}
            placeholderTextColor={COLORS.placeholder}
            maxLength={MAX_NOTE_LENGTH}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            style={styles.input}
            maxFontSizeMultiplier={MAX_FONT_SCALE.body}
            accessibilityLabel={strings.journal.notePlaceholder}
          />
          <View style={styles.footerRow}>
            <Text style={styles.storageNote} maxFontSizeMultiplier={MAX_FONT_SCALE.body}>{strings.journal.storageNote}</Text>
            <Pressable
              onPress={handleSave}
              disabled={!mood}
              style={({ pressed }) => [styles.saveButton, !mood && styles.saveButtonDisabled, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityState={{ disabled: !mood }}
            >
              <Text style={[styles.saveLabel, !mood && styles.saveLabelDisabled]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.saveButton}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        saved && (
          <>
            <View style={styles.savedRow}>
              <View style={[styles.moodChip, styles.moodChipSelected, styles.savedChip]}>
                <Text style={[styles.moodLabel, styles.moodLabelSelected]} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.moods[saved.mood]}</Text>
              </View>
              {!!saved.note && <Text style={styles.savedNote}>{saved.note}</Text>}
            </View>
            <View style={styles.linkRow}>
              <Pressable onPress={() => setEditing(true)} style={styles.link} accessibilityRole="button">
                <Text style={styles.linkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.editLink}</Text>
              </Pressable>
              <Pressable onPress={onOpenJournal} style={styles.link} accessibilityRole="button">
                <Text style={styles.linkText} maxFontSizeMultiplier={MAX_FONT_SCALE.control}>{strings.journal.openJournalLink}</Text>
              </Pressable>
            </View>
            {hasCrisisSignal(saved.note) && <JournalSafetyNote />}
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 18, gap: 12, marginTop: 16, marginBottom: 14 },
  label: { fontFamily: FONTS.semibold, fontSize: 13, letterSpacing: 0.3, color: COLORS.gold },
  prompt: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21, color: COLORS.subheadline },
  moodGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  moodChip: {
    flexGrow: 1,
    flexBasis: "45%",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
  },
  moodChipSelected: { borderColor: COLORS.gold, backgroundColor: "rgba(111,169,139,0.12)" },
  moodLabel: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.subheadline },
  moodLabelSelected: { color: COLORS.headline },
  pressed: { opacity: 0.85 },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.headline,
    backgroundColor: COLORS.inputBg,
  },
  footerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  storageNote: { flexShrink: 1, fontFamily: FONTS.regular, fontSize: 12, lineHeight: 17, color: COLORS.footer },
  saveButton: { minHeight: 44, minWidth: 88, alignItems: "center", justifyContent: "center", borderRadius: 999, backgroundColor: COLORS.gold, paddingHorizontal: 20 },
  saveButtonDisabled: { backgroundColor: COLORS.disabledBg },
  saveLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  saveLabelDisabled: { color: COLORS.disabledText },
  savedRow: { gap: 10, alignItems: "flex-start" },
  savedChip: { flexGrow: 0, flexBasis: "auto", paddingHorizontal: 16 },
  savedNote: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23, color: COLORS.headline },
  linkRow: { flexDirection: "row", gap: 20 },
  link: { minHeight: 44, justifyContent: "center" },
  linkText: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.gold, textDecorationLine: "underline" },
});
