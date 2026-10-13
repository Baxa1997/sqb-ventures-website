'use client';

import { useEffect, useState } from 'react';

/** Swaps one word after another in the closing line. */
export function RotatingWord({ words }: { words: string[] }) {
  const [k, setK] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return;
    let swap: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setOut(true);
      swap = setTimeout(() => {
        setK((n) => (n + 1) % words.length);
        setOut(false);
      }, 420);
    }, 2600);
    return () => {
      clearInterval(id);
      clearTimeout(swap);
    };
  }, [words.length]);
  return <span className={out ? 'rot out' : 'rot'}>{words[k]}</span>;
}
