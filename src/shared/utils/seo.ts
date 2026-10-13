import type { Metadata } from 'next';
import { SITE } from '@shared/config';
import { LOCALES, type Locale } from '@shared/i18n';

/** Title, description and language alternates for a page. `path` is without the language prefix. */
export function pageMetadata(locale: Locale, title: string, path: string, description?: string): Metadata {
  const suffix = path === '/' ? '' : path;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}${suffix}`])),
    },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      locale,
      siteName: SITE.name,
      type: 'website',
    },
  };
}
