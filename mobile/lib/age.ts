// 2026-09-12: added a real enforcement layer behind the onboarding intro's "만 14세
// 이상만 이용할 수 있으며..." text, which previously was just a notice nobody actually
// checked — DobScreen already collects the exact birth date needed to enforce it for
// real. MIN_AGE matches the age already stated in lib/i18n/ko.ts's onboarding.ageNoticePrefix
// — keep both in sync if that copy ever changes.
export const MIN_AGE = 14;

export function calculateAge(iso: string): number | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  const birth = new Date(y, m - 1, d);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hadBirthdayThisYear = now.getMonth() > birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hadBirthdayThisYear) age--;
  return age;
}
