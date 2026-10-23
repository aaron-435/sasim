import type { Metadata } from "next";
import InviteAccept from "@/components/InviteAccept";
import { getDictionary, LOCALES, type Locale } from "@/lib/i18n";
import { getPublicInvite } from "@/lib/invites";

// Friend-compatibility invite page (SPEC 2026-10-05 §6). The app shares this link; the friend
// enters their birth date here and sees a short reading. Language: `?lang=` if given, otherwise
// the sender's language. Links are personal, so nothing here is indexed.

export const dynamic = "force-dynamic";
// supabase-js reads over fetch, and Next would otherwise keep the first answer in its data cache:
// a link answered or expired after its first view would still show the form.
export const fetchCache = "force-no-store";

type Props = { params: { code: string }; searchParams?: { lang?: string } };

function pick(lang: string | undefined): Locale | null {
  return (LOCALES as string[]).includes(lang ?? "") ? (lang as Locale) : null;
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const c = getDictionary(pick(searchParams?.lang) ?? "en").invite;
  return { title: c.metaTitle, description: c.metaDescription, robots: { index: false, follow: false } };
}

export default async function InvitePage({ params, searchParams }: Props) {
  let invite: Awaited<ReturnType<typeof getPublicInvite>> = null;
  let unavailable = false;
  try {
    invite = await getPublicInvite(params.code);
  } catch (err) {
    console.error("[c/code] lookup failed", err);
    unavailable = true;
  }
  const locale = pick(searchParams?.lang) ?? invite?.locale ?? "en";
  const state = unavailable ? "unavailable" : !invite ? "notFound" : invite.status;
  return <InviteAccept code={params.code} locale={locale} state={state} senderName={invite?.senderName ?? ""} />;
}
