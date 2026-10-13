'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import logo from '@assets/img/logo.png';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Locale } from '@shared/i18n';

export interface HeaderLink {
  href: string;
  label: string;
  sub?: { href: string; label: string }[];
}
export interface HeaderLabels {
  home: string;
  main: string;
  language: string;
  menu: string;
  pitch: string;
}

interface HeaderNavProps {
  locale: Locale;
  items: HeaderLink[];
  labels: HeaderLabels;
  homeHref: string;
  applyHref: string;
}

export function HeaderNav({ locale, items, labels, homeHref, applyHref }: HeaderNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    // keep the page still while the menu sheet is open
    document.documentElement.classList.add('menu-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('menu-open');
    };
  }, [open]);

  const isCurrent = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="hdr">
      <div className="wrap">
        <Link className="mark" href={homeHref} aria-label={labels.home}>
          <Image src={logo} alt="SQB Ventures" priority sizes="160px" />
        </Link>
        <nav className={open ? 'nav open' : 'nav'} id="nav" aria-label={labels.main}>
          {items.map((n) => (
            <div className="nav-i" key={n.href}>
              <Link href={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                {n.label}
                {n.sub && <ChevronDown />}
              </Link>
              {n.sub && (
                <div className="sub">
                  {n.sub.map((s) => (
                    <Link key={s.href + s.label} href={s.href} onClick={() => setOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link className="btn primary nav-cta" href={applyHref} onClick={() => setOpen(false)}>
            {labels.pitch}
          </Link>
        </nav>
        <div className="hdr-end">
          <LanguageSwitcher locale={locale} label={labels.language} />
          <Link className="btn sm hdr-cta" href={applyHref}>
            {labels.pitch}
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-label={labels.menu}
            aria-expanded={open}
            aria-controls="nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
