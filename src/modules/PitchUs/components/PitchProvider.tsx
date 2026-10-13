'use client';

import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Locale } from '@shared/i18n';

// the form and its styles load only when someone opens it
const PitchFlow = dynamic(() => import('./PitchFlow').then((m) => m.PitchFlow), { ssr: false });

const CLOSE = { en: 'Close', ru: 'Закрыть', uz: 'Yopish' } as const;

/**
 * Every link to /apply opens the Pitch Us pop-up instead of leaving the page.
 * On /apply itself it scrolls to the form there.
 */
export function PitchProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a[href]');
      if (!a || !/\/apply\/?$/.test(new URL((a as HTMLAnchorElement).href).pathname)) return;
      e.preventDefault();
      const inline = document.getElementById('pitch');
      if (inline) return inline.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMounted(true);
      dialog.current?.showModal();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <>
      {children}
      <dialog
        ref={dialog}
        className="pitch-dlg"
        aria-labelledby="pitchTitle"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div className="pitch-bar">
          <b id="pitchTitle">Pitch Us</b>
          <button
            type="button"
            className="x"
            aria-label={CLOSE[locale]}
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <div className="pitch-body" ref={body}>
          {mounted && <PitchFlow locale={locale} onTop={() => body.current?.scrollTo(0, 0)} />}
        </div>
      </dialog>
    </>
  );
}
