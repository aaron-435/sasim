import { useEffect, useRef, useState } from "react";
import ArrowLeft from "lucide-react-native/icons/arrow-left";
import ChevronRight from "lucide-react-native/icons/chevron-right";
import Send from "lucide-react-native/icons/send";
import Share2 from "lucide-react-native/icons/share-2";
import { ActivityIndicator, Image, Platform, Pressable, ScrollView, Share, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import Text from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../config";
import { track } from "../lib/analytics";
import { ELEMENT_COLORS } from "../lib/elements";
import { useLocale, useStrings } from "../lib/i18n";
import { COMPATIBILITY_CONTENT } from "../lib/compatibilityContent";
import { createInvite, getSavedInvites, refreshInvites, type SavedInvite } from "../lib/invites";
import type { CompatibilityResult } from "../lib/compatibility";
import { formatSajuTypeName } from "../lib/sajuTypeContent";
import type { SajuType } from "../lib/sajuType";
import { COLORS } from "../theme/colors";
import { readableColumn } from "../theme/layout";
import { FONTS } from "../theme/fonts";
import { OtherBirthFields, useOtherBirthForm, type OtherBirthPayload } from "../components/OtherBirthForm";
import CompatReportScreen from "./CompatReportScreen";
import GroupChemistryScreen from "./GroupChemistryScreen";
import CoupleModeSection from "../components/CoupleModeSection";

type ApiResult = {
  other: { sajuType: SajuType | null; dominantElement: string | null; elements: Record<string, number> };
  compatibility: CompatibilityResult | null;
};

export default function CompatibilityScreen({
  selfNickname,
  selfDayMasterChar,
  selfDayBranch,
  selfElements,
  selfSajuType,
  sessionId,
  onBack,
}: {
  selfNickname: string;
  selfDayMasterChar: string | null;
  /** For the detailed report (optional so older callers keep working). */
  selfDayBranch?: string | null;
  selfElements?: Record<string, number> | null;
  /** The group chemistry map starts from the user's own two element signals (hidden without it). */
  selfSajuType?: SajuType | null;
  sessionId?: string;
  onBack: () => void;
}) {
  const strings = useStrings();
  const { locale } = useLocale();

  const form = useOtherBirthForm();
  const otherName = form.otherName;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [sharing, setSharing] = useState(false);
  // The detailed report opens over the result and returns to it (the result stays as it was).
  const [reportFor, setReportFor] = useState<OtherBirthPayload | null>(null);
  const shareCardRef = useRef<View>(null);
  // Friend invites (SPEC §6): links this device sent, and the answers that came back.
  const [invites, setInvites] = useState<SavedInvite[]>([]);
  const [inviting, setInviting] = useState(false);
  const [inviteNote, setInviteNote] = useState<{ text: string; error: boolean } | null>(null);
  // Set while a received answer is open in the result view (it has no birth data, so no report entry).
  const [received, setReceived] = useState<SavedInvite | null>(null);
  const [groupOpen, setGroupOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    getSavedInvites().then((list) => alive && setInvites(list));
    refreshInvites().then((list) => alive && setInvites(list));
    return () => {
      alive = false;
    };
  }, []);

  const canSubmit = !!selfDayMasterChar && form.isComplete;

  async function handleSubmit() {
    if (!canSubmit || submitting || !selfDayMasterChar) {
      if (!canSubmit) setError(strings.compatibility.errorMissing);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/compatibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selfDayMasterChar,
          other: form.toPayload(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || strings.compatibility.errorDefault);
        return;
      }
      setResult(json);
    } catch {
      setError(strings.compatibility.errorNetwork);
    } finally {
      setSubmitting(false);
    }
  }

  function handleTryAgain() {
    setResult(null);
    setReceived(null);
    setError(null);
  }

  async function shareInviteLink(url: string) {
    const message = strings.invite.shareMessage(url);
    if (Platform.OS === "web") {
      // react-native-web's Share needs navigator.share, which most desktop browsers lack: copy instead.
      const nav = globalThis.navigator as Navigator | undefined;
      if (nav?.share) {
        try {
          await nav.share({ text: message });
          return;
        } catch (e) {
          if ((e as Error)?.name === "AbortError") return;
        }
      }
      await nav?.clipboard?.writeText(url);
      setInviteNote({ text: strings.invite.copied, error: false });
      return;
    }
    await Share.share({ message });
  }

  async function handleInvite(existing?: SavedInvite) {
    if (inviting || !selfDayMasterChar) return;
    setInviting(true);
    setInviteNote(null);
    try {
      let invite = existing;
      if (!invite) {
        invite = await createInvite({ senderName: selfNickname, senderDayMaster: selfDayMasterChar, locale });
        track("invite_create", { surface: "compatibility" });
        setInvites(await getSavedInvites());
      }
      await shareInviteLink(invite.url);
    } catch {
      if (!existing) setInviteNote({ text: strings.invite.errorCreate, error: true });
    } finally {
      setInviting(false);
    }
  }

  function openReceived(item: SavedInvite) {
    if (!item.result?.compatibility) return;
    setReceived(item);
    setResult(item.result);
  }

  async function handleShare() {
    if (sharing) return;
    setSharing(true);
    try {
      // width-only: forces a consistent 1080px-wide export regardless of the on-screen
      // preview's rendered size or device pixel ratio, while height scales to match
      // whatever this card's actual (content-driven) aspect ratio turns out to be — see
      // the shareCard style comment for why that's not a hardcoded 1080x1920.
      const uri = await captureRef(shareCardRef, { format: "png", quality: 1, width: 1080 });
      if (await Sharing.isAvailableAsync()) {
        track("share", { kind: "compatibility_card" });
        await Sharing.shareAsync(uri, { mimeType: "image/png" });
      }
    } catch {
      // Best-effort — sharing is a bonus action, not something worth surfacing an error screen for.
    } finally {
      setSharing(false);
    }
  }

  if (groupOpen && selfSajuType) {
    return (
      <GroupChemistryScreen
        selfNickname={selfNickname}
        selfSajuType={selfSajuType}
        receivedInvites={invites}
        onBack={() => setGroupOpen(false)}
      />
    );
  }

  if (reportFor && selfDayMasterChar) {
    return (
      <CompatReportScreen
        nickname={selfNickname}
        otherName={otherName}
        other={reportFor}
        selfDayMasterChar={selfDayMasterChar}
        selfDayBranch={selfDayBranch ?? null}
        selfElements={selfElements ?? null}
        sessionId={sessionId}
        onBack={() => setReportFor(null)}
      />
    );
  }

  if (result?.compatibility) {
    const content = COMPATIBILITY_CONTENT[locale] ?? COMPATIBILITY_CONTENT.ko;
    const relationCopy = content.relations[result.compatibility.relation];
    const tint = ELEMENT_COLORS[result.compatibility.selfDayMasterElement] ?? COLORS.gold;
    // A blank name must not fall back to the input's example text ("e.g. Jamie").
    const shownName = received ? received.friendName ?? "" : otherName;
    const hasOtherName = shownName.trim().length > 0;
    const otherDisplayName = hasOtherName ? shownName.trim() : strings.compatibility.unnamedOther;

    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
            <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
            <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
          </Pressable>

          <View style={[styles.resultHero, { borderColor: `${tint}55` }]}>
            <Text style={styles.resultNames}>
              {selfNickname} · {otherDisplayName}
            </Text>
            <Text style={styles.relationHeadline} accessibilityRole="header">
              {relationCopy.headline}
            </Text>
            <Text style={styles.scoreLine}>
              {strings.compatibility.scoreLabel} · <Text style={[styles.scoreValue, { color: tint }]}>{result.compatibility.score}</Text>
            </Text>
          </View>

          {result.other.sajuType && (
            <Text style={styles.otherTypeLine}>
              {hasOtherName
                ? strings.compatibility.otherTypeLabel(otherDisplayName, formatSajuTypeName(locale, result.other.sajuType))
                : strings.compatibility.otherTypeLabelUnnamed(formatSajuTypeName(locale, result.other.sajuType))}
            </Text>
          )}

          <Text style={styles.relationBody}>{relationCopy.body}</Text>

          {result.compatibility.stemBond && <Text style={styles.bondNote}>{content.bondNote}</Text>}

          {/* The image is a separate artifact from the reading above, so it gets a labelled
              frame and carries the good-point / caution split instead of repeating the body. */}
          <View style={styles.previewFrame}>
            <Text style={styles.previewLabel}>{strings.compatibility.sharePreviewLabel}</Text>
            <View ref={shareCardRef} collapsable={false} style={styles.shareCard}>
              <Image source={require("../assets/patterns/onboarding-bg.png")} resizeMode="cover" style={StyleSheet.absoluteFill} />
              <View style={styles.shareCardInner}>
                <Text style={styles.shareBrandLabel}>FATESAID</Text>

                <View style={styles.shareCardMid}>
                  <Text style={styles.shareEyebrow}>{strings.compatibility.shareCardEyebrow}</Text>
                  <Text style={styles.shareNames}>
                    {selfNickname} · {otherDisplayName}
                  </Text>
                  <Text style={styles.shareHeadline}>{relationCopy.headline}</Text>
                  <Text style={styles.shareScoreLine}>
                    {strings.compatibility.scoreLabel} · <Text style={{ color: tint }}>{result.compatibility.score}</Text>
                  </Text>

                  <View style={styles.shareDetailBlock}>
                    <Text style={[styles.shareDetailLabel, { color: "#8FBF9E" }]}>{strings.compatibility.shareCardGoodPointLabel}</Text>
                    <Text style={styles.shareDetailText}>{relationCopy.goodPoint}</Text>
                  </View>

                  <View style={styles.shareDetailBlock}>
                    <Text style={[styles.shareDetailLabel, { color: "#D9A26C" }]}>{strings.compatibility.shareCardCautionLabel}</Text>
                    <Text style={styles.shareDetailText}>{relationCopy.caution}</Text>
                  </View>

                  {result.compatibility.stemBond && <Text style={styles.shareBondNote}>{content.bondNote}</Text>}
                </View>

                <Text style={styles.shareFooter}>{strings.compatibility.shareCardFooter}</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.shareButton}
            onPress={handleShare}
            disabled={sharing}
            accessibilityRole="button"
            accessibilityLabel={strings.compatibility.shareButton}
          >
            {sharing ? (
              <ActivityIndicator color={COLORS.ctaText} />
            ) : (
              <>
                <Share2 size={16} strokeWidth={2} color={COLORS.ctaText} />
                <Text style={styles.shareButtonLabel}>{strings.compatibility.shareButton}</Text>
              </>
            )}
          </Pressable>

          {/* A friend's answer carries no birth data (it stays with them), so it has no report entry. */}
          {!received && (
          <Pressable
            onPress={() => setReportFor(form.toPayload())}
            android_ripple={{ color: "rgba(111,169,139,0.12)" }}
            style={({ pressed }) => [styles.reportEntry, pressed && styles.reportEntryPressed]}
            accessibilityRole="button"
            accessibilityLabel={`${strings.compatReport.entryEyebrow}. ${strings.compatReport.entryTitle}`}
          >
            <View style={styles.reportEntryText}>
              <Text style={styles.reportEntryEyebrow}>{strings.compatReport.entryEyebrow}</Text>
              <Text style={styles.reportEntryTitle}>{strings.compatReport.entryTitle}</Text>
              <Text style={styles.reportEntryBody}>{strings.compatReport.entryBody}</Text>
            </View>
            <ChevronRight size={18} strokeWidth={1.75} color={COLORS.subheadline} />
          </Pressable>
          )}

          <Pressable style={styles.tryAgainButton} onPress={handleTryAgain} accessibilityRole="button">
            <Text style={styles.tryAgainLabel}>{strings.compatibility.tryAgainButton}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton} accessibilityRole="button" accessibilityLabel={strings.common.backLabel}>
          <ArrowLeft size={16} strokeWidth={2} color={COLORS.subheadline} />
          <Text style={styles.backLabel}>{strings.common.backLabel}</Text>
        </Pressable>

        <Text style={styles.heading}>{strings.compatibility.heading}</Text>
        <Text style={styles.subtitle}>{strings.compatibility.subtitle}</Text>

        <OtherBirthFields form={form} />

        {error && <Text style={styles.error}>{error}</Text>}
        {/* Say why the button is dimmed instead of leaving a silent disabled state. */}
        {!error && !canSubmit && !form.dobInvalid && <Text style={styles.submitHint}>{strings.compatibility.errorMissing}</Text>}

        <Pressable
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit || submitting}
          accessibilityRole="button"
          accessibilityLabel={strings.compatibility.submitButton}
        >
          {submitting ? <ActivityIndicator color={COLORS.ctaText} /> : <Text style={styles.submitButtonLabel}>{strings.compatibility.submitButton}</Text>}
        </Pressable>

        <View style={styles.inviteSection}>
          <Text style={styles.inviteTitle} accessibilityRole="header">{strings.invite.sectionTitle}</Text>
          <Text style={styles.inviteBody}>{strings.invite.sectionBody}</Text>
          <Pressable
            style={({ pressed }) => [styles.inviteButton, pressed && styles.inviteButtonPressed, !selfDayMasterChar && styles.submitButtonDisabled]}
            onPress={() => handleInvite()}
            disabled={inviting || !selfDayMasterChar}
            accessibilityRole="button"
            accessibilityLabel={strings.invite.sendButton}
          >
            {inviting ? (
              <ActivityIndicator color={COLORS.gold} />
            ) : (
              <>
                <Send size={16} strokeWidth={2} color={COLORS.gold} />
                <Text style={styles.inviteButtonLabel}>{strings.invite.sendButton}</Text>
              </>
            )}
          </Pressable>
          {inviteNote && <Text style={[styles.inviteNote, inviteNote.error && styles.inviteNoteError]}>{inviteNote.text}</Text>}

          {invites.length > 0 && (
            <View style={styles.receivedList}>
              <Text style={styles.receivedTitle} accessibilityRole="header">{strings.invite.receivedTitle}</Text>
              {invites.map((item) => {
                if (item.status === "answered" && item.result?.compatibility) {
                  const content = COMPATIBILITY_CONTENT[locale] ?? COMPATIBILITY_CONTENT.ko;
                  const name = item.friendName?.trim() || strings.compatibility.unnamedOther;
                  const headline = content.relations[item.result.compatibility.relation].headline;
                  return (
                    <Pressable
                      key={item.code}
                      onPress={() => openReceived(item)}
                      android_ripple={{ color: "rgba(111,169,139,0.12)" }}
                      style={({ pressed }) => [styles.receivedRow, pressed && styles.reportEntryPressed]}
                      accessibilityRole="button"
                      accessibilityLabel={`${name}. ${headline}`}
                    >
                      <View style={styles.receivedText}>
                        <Text style={styles.receivedName}>{name}</Text>
                        <Text style={styles.receivedHeadline}>{headline}</Text>
                      </View>
                      <ChevronRight size={18} strokeWidth={1.75} color={COLORS.subheadline} />
                    </Pressable>
                  );
                }
                const daysLeft = Math.max(1, Math.ceil((Date.parse(item.expiresAt) - Date.now()) / 864e5));
                return (
                  <Pressable
                    key={item.code}
                    onPress={() => handleInvite(item)}
                    style={({ pressed }) => [styles.receivedRow, styles.waitingRow, pressed && styles.reportEntryPressed]}
                    accessibilityRole="button"
                    accessibilityLabel={`${strings.invite.waitingName}. ${strings.invite.waitingLabel(daysLeft)}`}
                    accessibilityHint={strings.invite.resendHint}
                  >
                    <View style={styles.receivedText}>
                      <Text style={styles.waitingName}>{strings.invite.waitingName}</Text>
                      <Text style={styles.waitingLabel}>{strings.invite.waitingLabel(daysLeft)}</Text>
                    </View>
                    <Share2 size={16} strokeWidth={1.75} color={COLORS.subheadline} />
                  </Pressable>
                );
              })}
            </View>
          )}
          <Text style={styles.invitePrivacy}>{strings.invite.privacyNote}</Text>

          {selfSajuType && (
            <Pressable
              onPress={() => setGroupOpen(true)}
              android_ripple={{ color: "rgba(111,169,139,0.12)" }}
              style={({ pressed }) => [styles.reportEntry, styles.groupEntry, pressed && styles.reportEntryPressed]}
              accessibilityRole="button"
              accessibilityLabel={`${strings.groupChemistry.entryEyebrow}. ${strings.groupChemistry.entryTitle}`}
            >
              <View style={styles.reportEntryText}>
                <Text style={styles.reportEntryEyebrow}>{strings.groupChemistry.entryEyebrow}</Text>
                <Text style={styles.reportEntryTitle}>{strings.groupChemistry.entryTitle}</Text>
                <Text style={styles.reportEntryBody}>{strings.groupChemistry.entryBody}</Text>
              </View>
              <ChevronRight size={18} strokeWidth={1.75} color={COLORS.subheadline} />
            </Pressable>
          )}
        </View>

        <CoupleModeSection selfNickname={selfNickname} selfDayMasterChar={selfDayMasterChar} selfDayBranch={selfDayBranch ?? null} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { ...readableColumn, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", padding: 8, marginLeft: -8, marginBottom: 12, minHeight: 44 },
  backLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.subheadline },
  heading: { fontFamily: FONTS.display, fontVariant: ["lining-nums"], fontSize: 26, color: COLORS.headline },
  subtitle: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: 8, marginBottom: 20 },
  error: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.danger, marginTop: 14 },
  submitHint: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, marginTop: 14 },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 28,
  },
  submitButtonDisabled: { opacity: 0.4 },
  submitButtonLabel: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.ctaText },
  resultHero: {
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  resultNames: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.subheadline, textAlign: "center" },
  relationHeadline: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center", marginTop: 10 },
  scoreLine: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, marginTop: 12 },
  scoreValue: { fontFamily: FONTS.semibold, fontVariant: ["lining-nums"] },
  otherTypeLine: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.gold, marginTop: 18, textAlign: "center" },
  relationBody: { fontFamily: FONTS.regular, fontSize: 14.5, lineHeight: 22, color: COLORS.subheadline, marginTop: 12 },
  bondNote: { fontFamily: FONTS.medium, fontSize: 13.5, lineHeight: 20, color: COLORS.gold, marginTop: 16 },
  previewFrame: {
    marginTop: 32,
    padding: 14,
    paddingTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.disabledText,
    backgroundColor: COLORS.inputBg,
  },
  previewLabel: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.footer, textAlign: "center", marginBottom: 10 },
  shareCard: {
    // Deliberately no fixed aspectRatio — the content below (body + good-point + caution,
    // and sometimes a bond note) varies in length across relations/locales, and a hard
    // 9:16 box would clip or overflow whichever combination runs long. Natural,
    // content-driven height instead; handleShare captures at width:1080 only (no forced
    // height) so the exported image keeps this same vertical proportion, uncut.
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.background,
  },
  shareCardInner: {
    paddingHorizontal: "9%",
    paddingVertical: "9%",
    alignItems: "center",
  },
  shareBrandLabel: { fontFamily: FONTS.bold, fontSize: 13, letterSpacing: 3, color: COLORS.gold, marginBottom: 28 },
  shareCardMid: { alignItems: "center", width: "100%" },
  shareEyebrow: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2, color: COLORS.gold, marginBottom: 4 },
  shareNames: { fontFamily: FONTS.semibold, fontSize: 17, color: COLORS.headline, textAlign: "center" },
  shareHeadline: { fontFamily: FONTS.display, fontSize: 30, lineHeight: 36, color: COLORS.headline, textAlign: "center", marginTop: 18 },
  shareScoreLine: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.subheadline, textAlign: "center", marginTop: 10, marginBottom: 8 },
  shareDetailBlock: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  shareDetailLabel: { fontFamily: FONTS.bold, fontSize: 12, letterSpacing: 0.2 },
  shareDetailText: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.headline, marginTop: 6 },
  shareBondNote: { fontFamily: FONTS.medium, fontSize: 12.5, lineHeight: 19, color: COLORS.gold, textAlign: "center", marginTop: 16 },
  shareFooter: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline, textAlign: "center", marginTop: 30 },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 28,
  },
  shareButtonLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.ctaText },
  reportEntry: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: 18,
  },
  groupEntry: { marginTop: 26 },
  reportEntryPressed: { backgroundColor: "rgba(111,169,139,0.08)" },
  reportEntryText: { flex: 1, gap: 3 },
  reportEntryEyebrow: { fontFamily: FONTS.semibold, fontSize: 12, color: COLORS.gold },
  reportEntryTitle: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21, color: COLORS.headline },
  reportEntryBody: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 19, color: COLORS.subheadline, marginTop: 2 },
  inviteSection: { marginTop: 40, paddingTop: 28, borderTopWidth: 1, borderTopColor: COLORS.border },
  inviteTitle: { fontFamily: FONTS.display, fontSize: 22, color: COLORS.headline },
  inviteBody: { fontFamily: FONTS.regular, fontSize: 13.5, lineHeight: 20, color: COLORS.subheadline, marginTop: 8 },
  inviteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 18,
    minHeight: 48,
  },
  inviteButtonPressed: { backgroundColor: "rgba(111,169,139,0.08)" },
  inviteButtonLabel: { fontFamily: FONTS.semibold, fontSize: 14.5, color: COLORS.gold },
  inviteNote: { fontFamily: FONTS.regular, fontSize: 12.5, lineHeight: 18, color: COLORS.subheadline, marginTop: 10 },
  inviteNoteError: { color: COLORS.danger },
  receivedList: { marginTop: 26, gap: 10 },
  receivedTitle: { fontFamily: FONTS.semibold, fontSize: 13, color: COLORS.subheadline, marginBottom: 2 },
  receivedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  waitingRow: { borderStyle: "dashed", backgroundColor: "transparent" },
  receivedText: { flex: 1, gap: 3 },
  receivedName: { fontFamily: FONTS.medium, fontSize: 12.5, color: COLORS.subheadline },
  receivedHeadline: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21, color: COLORS.headline },
  waitingName: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.headline },
  waitingLabel: { fontFamily: FONTS.regular, fontSize: 12.5, color: COLORS.subheadline },
  invitePrivacy: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, color: COLORS.footer, marginTop: 16 },
  tryAgainButton: { alignItems: "center", paddingVertical: 14, marginTop: 10 },
  tryAgainLabel: { fontFamily: FONTS.medium, fontSize: 13.5, color: COLORS.subheadline },
});
