'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_COOKIE, type Locale } from '@shared/i18n';

/** UZ / RU / EN: the same page in another language. The choice is remembered for the next visit. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
  return (
    <div className="langs" role="group" aria-label={label}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === locale ? 'true' : undefined}
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
          }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
