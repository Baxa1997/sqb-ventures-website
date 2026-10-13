'use client';

import { Check, ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { LOCALES, LOCALE_COOKIE, type Locale } from '@shared/i18n';

const NAMES: Record<Locale, string> = { uz: 'O‘zbekcha', ru: 'Русский', en: 'English' };

/** UZ / RU / EN drop-down: the same page in another language. The choice is remembered for the next visit. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="langs" ref={box}>
      <button
        type="button"
        className="langs-btn"
        aria-label={`${label}: ${NAMES[locale]}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        <Globe />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown className="chev" />
      </button>
      {open && (
        <ul className="langs-menu" id={menuId}>
          {LOCALES.map((l) => (
            <li key={l}>
              <Link
                href={`/${l}${rest}`}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? 'true' : undefined}
                onClick={() => {
                  document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
                  setOpen(false);
                }}
              >
                <b>{l.toUpperCase()}</b>
                <span>{NAMES[l]}</span>
                {l === locale && <Check />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
