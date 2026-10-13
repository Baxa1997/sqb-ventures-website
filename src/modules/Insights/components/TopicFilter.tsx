'use client';

import { useState } from 'react';

interface TopicFilterProps {
  /** id of the grid whose cards carry data-cat */
  target: string;
  label: string;
  topics: { id: string; label: string; count: number }[];
}

/** Topic chips. Filtering is a data attribute on the grid, so the cards stay server-rendered. */
export function TopicFilter({ target, label, topics }: TopicFilterProps) {
  const [active, setActive] = useState('');
  const pick = (id: string) => {
    setActive(id);
    const grid = document.getElementById(target);
    if (grid) grid.dataset.filter = id;
  };
  return (
    <div className="chips" role="group" aria-label={label}>
      {topics.map((topic) => (
        <button
          key={topic.id}
          type="button"
          className="chip"
          aria-pressed={active === topic.id}
          onClick={() => pick(topic.id)}
        >
          {topic.label}
          <span>{topic.count}</span>
        </button>
      ))}
    </div>
  );
}
