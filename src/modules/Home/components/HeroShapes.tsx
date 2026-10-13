'use client';

import { useEffect, useRef } from 'react';

/** Two large overlapping blue forms that drift with the scroll. */
export function HeroShapes() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        ref.current?.style.setProperty('--sy', `${Math.min(window.scrollY, 900)}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="shapes" aria-hidden="true" ref={ref}>
      <i />
      <i />
    </div>
  );
}
