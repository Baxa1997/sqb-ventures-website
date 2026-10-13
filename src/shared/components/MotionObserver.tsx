'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Blocks that fade up. Keep in sync with motion.css. */
const REVEAL =
  '.reveal,.prop,.panel,.post,.focus-card,.program,.person,.pf-row,.src,.bigstats>div,.slides,.hsteps>li,.yes>li,.timeline>li,.belief>li,.x-list>li,.accordion,.facts>div,.pagehead p,.hero-copy>p,.hero-copy>.acts,.hero-terms,.lede,.pf-quote,.pf-facts';
const SKIP = '.marquee,dialog,.pitch-inline,.hdr,.ftr';

function countUp(el: HTMLElement) {
  const m = el.textContent?.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!m) return;
  const end = parseFloat(m[2].replace(/,/g, ''));
  const dec = (m[2].split('.')[1] || '').length;
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / 1400);
    el.textContent = m[1] + (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + m[3];
    if (p < 1) requestAnimationFrame(tick);
  };
  el.textContent = m[1] + (0).toFixed(dec) + m[3];
  requestAnimationFrame(tick);
}

/** Word-by-word headlines, fade-up blocks and count-up figures, played as they scroll into view. */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    (window as unknown as { __motion?: boolean }).__motion = true;
    if (!root.classList.contains('motion')) return;
    const main = document.querySelector('main');
    if (!main) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add('in');
          if (el.hasAttribute('data-count')) countUp(el);
          io.unobserve(el);
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const blocks = (scope: ParentNode) =>
      Array.from(scope.querySelectorAll<HTMLElement>(REVEAL)).filter((el) => !el.closest(SKIP));

    blocks(main).forEach((el) => {
      const row = Array.from(el.parentElement?.children ?? []).filter((x) => x.matches(REVEAL));
      el.style.transitionDelay = `${Math.min(row.indexOf(el), 6) * 70}ms`;
    });
    main
      .querySelectorAll('.words, [data-count]')
      .forEach((el) => el.classList.contains('in') || io.observe(el));
    blocks(main).forEach((el) => el.classList.contains('in') || io.observe(el));

    // lists redrawn later (filters, tabs) appear without waiting for the scroll
    const mo = new MutationObserver((records) =>
      records.forEach((r) =>
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement) || n.closest('dialog')) return;
          [n, ...blocks(n)].forEach((x) => {
            if (!x.matches(REVEAL) || x.closest(SKIP)) return;
            x.style.transitionDelay = '0ms';
            requestAnimationFrame(() => x.classList.add('in'));
          });
        }),
      ),
    );
    mo.observe(main, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

/** Runs before first paint: turns motion on unless the visitor prefers reduced motion.
 *  If the app never starts, motion is switched off again so nothing stays hidden. */
export const MOTION_BOOT = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;d.classList.add('motion');setTimeout(function(){if(!window.__motion)d.classList.remove('motion')},4000)}catch(e){}})();`;
