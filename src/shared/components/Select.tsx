'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  /** Text shown while nothing is chosen; also the "all" choice for filters. */
  placeholder: string;
  name?: string;
  required?: boolean;
  /** Controlled value (filters). Leave out for form fields. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * A styled drop-down. A hidden native <select> carries the name, the value and `required`,
 * so forms, FormData, drafts and validation work as with a plain select.
 */
export function Select({
  label,
  options,
  placeholder,
  name,
  required,
  value,
  defaultValue = '',
  onChange,
  className,
}: SelectProps) {
  const id = useId();
  const [own, setOwn] = useState(defaultValue);
  const current = value ?? own;
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const all: SelectOption[] = [{ value: '', label: placeholder }, ...options];
  const chosen = options.find((o) => o.value === current);

  const commit = (v: string) => {
    setOwn(v);
    onChange?.(v);
    root.current?.classList.remove('err');
  };

  const show = () => {
    const r = btn.current?.getBoundingClientRect();
    setUp(!!r && innerHeight - r.bottom < 300 && r.top > innerHeight - r.bottom);
    setActive(
      Math.max(
        0,
        all.findIndex((o) => o.value === current),
      ),
    );
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) btn.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    list.current?.focus();
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const onButtonKey = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      show();
    }
  };

  const onListKey = (e: KeyboardEvent) => {
    const last = all.length - 1;
    if (e.key === 'ArrowDown') setActive((i) => Math.min(last, i + 1));
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1));
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(last);
    else if (e.key === 'Enter' || e.key === ' ') {
      commit(all[active].value);
      close();
    } else if (e.key === 'Escape') close();
    else if (e.key === 'Tab') close(false);
    else if (e.key.length === 1) {
      // type-ahead: jump to the next option starting with the letter
      const k = e.key.toLowerCase();
      const next = all.findIndex((o, i) => i > active && o.label.toLowerCase().startsWith(k));
      const first = all.findIndex((o) => o.label.toLowerCase().startsWith(k));
      if (next > -1 || first > -1) setActive(next > -1 ? next : first);
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div className={className ? `field select ${className}` : 'field select'} ref={root}>
      <span className="field-label" id={`${id}-l`}>
        {label}
      </span>
      <select
        className="select-native"
        name={name}
        required={required}
        value={current}
        onChange={(e) => commit(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      >
        {all.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="select-box">
        <button
          ref={btn}
          type="button"
          className={chosen ? 'select-btn' : 'select-btn empty'}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-l ${id}-v`}
          onClick={() => (open ? close() : show())}
          onKeyDown={onButtonKey}
        >
          <span id={`${id}-v`}>{chosen?.label ?? placeholder}</span>
          <ChevronDown />
        </button>
        {open && (
          <ul
            ref={list}
            id={`${id}-list`}
            className={up ? 'select-list up' : 'select-list'}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={`${id}-l`}
            aria-activedescendant={`${id}-o${active}`}
            onKeyDown={onListKey}
          >
            {all.map((o, i) => (
              <li
                key={o.value}
                id={`${id}-o${i}`}
                role="option"
                aria-selected={o.value === current}
                className={[i === active && 'active', !o.value && 'none'].filter(Boolean).join(' ')}
                onPointerEnter={() => setActive(i)}
                onClick={() => {
                  commit(o.value);
                  close();
                }}
              >
                <span>{o.label}</span>
                {o.value === current && <Check />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
