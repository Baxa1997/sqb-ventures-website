import { INTL_LOCALE, type Locale } from '@shared/i18n';

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const longDate = (iso: string, locale: Locale) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(INTL_LOCALE[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/** $500K, $2.45M */
export function money(n: number): string {
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(n % 1e6 ? 2 : 0).replace(/0$/, '')}M`;
  if (Math.abs(n) >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${n}`;
}

/** Only absolute http(s) links are rendered as outbound links. */
export const external = (url?: string) => (url && /^https?:\/\//.test(url) ? url : '');

export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(' ');
