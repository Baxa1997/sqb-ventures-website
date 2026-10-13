'use client';

import { Plus } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index of the item open on load. */
  defaultOpen?: number;
  /** Let several items stay open at once (otherwise opening one closes the others). */
  multiple?: boolean;
  className?: string;
}

/** Questions that slide open; the panel height animates from 0 to its content (see base.css). */
export function Accordion({ items, defaultOpen, multiple = false, className }: AccordionProps) {
  const id = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen == null ? [] : [defaultOpen]);
  const toggle = (i: number) =>
    setOpen((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : multiple ? [...cur, i] : [i]));

  return (
    <div className={className ? `accordion ${className}` : 'accordion'}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div className={isOpen ? 'acc-item open' : 'acc-item'} key={item.title}>
            <h3 className="acc-h">
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => toggle(i)}
              >
                <span>{item.title}</span>
                <span className="acc-icon" aria-hidden="true">
                  <Plus />
                </span>
              </button>
            </h3>
            <div
              className="acc-panel"
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-b${i}`}
              inert={!isOpen}
            >
              <div className="acc-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
