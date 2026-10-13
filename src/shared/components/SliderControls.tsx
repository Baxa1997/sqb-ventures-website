'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SliderControlsProps {
  /** id of the horizontally scrolling track */
  target: string;
  prevLabel: string;
  nextLabel: string;
}

/** Previous / next buttons for a scroll-snap track. */
export function SliderControls({ target, prevLabel, nextLabel }: SliderControlsProps) {
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const track = document.getElementById(target);
    if (!track) return;
    const sync = () =>
      setEdge({
        start: track.scrollLeft < 4,
        end: track.scrollLeft + track.clientWidth > track.scrollWidth - 4,
      });
    sync();
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      track.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [target]);

  const move = (dir: 1 | -1) => {
    const track = document.getElementById(target);
    const first = track?.firstElementChild;
    const step = first ? first.getBoundingClientRect().width + 20 : 300;
    track?.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className="arrows">
      <button type="button" aria-label={prevLabel} disabled={edge.start} onClick={() => move(-1)}>
        <ArrowLeft />
      </button>
      <button type="button" aria-label={nextLabel} disabled={edge.end} onClick={() => move(1)}>
        <ArrowRight />
      </button>
    </div>
  );
}
