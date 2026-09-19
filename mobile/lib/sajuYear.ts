// The saju year switches on 입춘 (~Feb 4), not Jan 1. Mirrors the server's
// currentSajuYear() (lib/yearFortune.ts) — a rough Feb 4 cutoff (KST) is plenty for
// "which year should the app talk about"; nothing here depends on the exact hour.
export function currentSajuYear(): number {
  const kstNow = new Date(Date.now() + 9 * 3600 * 1000);
  const year = kstNow.getUTCFullYear();
  const month = kstNow.getUTCMonth() + 1;
  const day = kstNow.getUTCDate();
  return month < 2 || (month === 2 && day < 4) ? year - 1 : year;
}

/** The year the year fortune / year report default to: the coming saju year. */
export function comingSajuYear(): number {
  return currentSajuYear() + 1;
}
