'use client';

import { useMemo, useState } from 'react';
import { createT, type Locale } from '@shared/i18n';
import { dict } from '../locales';
import type { Row } from '../helpers';
import { PortfolioRow } from './PortfolioRow';

type Key = 'sector' | 'stage' | 'geo' | 'status';
const EMPTY: Record<Key, string> = { sector: '', stage: '', geo: '', status: '' };

const uniq = (rows: Row[], value: (r: Row) => string, label: (r: Row) => string = value) => {
  const seen = new Map<string, string>();
  rows.forEach((r) => value(r) && !seen.has(value(r)) && seen.set(value(r), label(r)));
  return [...seen];
};

/** Drop-down filters and the list of companies. */
export function PortfolioList({ rows, locale, base }: { rows: Row[]; locale: Locale; base: string }) {
  const t = createT(locale, dict);
  const [f, setF] = useState(EMPTY);

  const options: Record<Key, [string, string, [string, string][]]> = useMemo(
    () => ({
      sector: [
        'Sector',
        'All sectors',
        uniq(
          rows,
          (r) => r.sector,
          (r) => r.sectorName,
        ),
      ],
      stage: ['Stage', 'All stages', uniq(rows, (r) => r.stage)],
      geo: ['Geography', 'All locations', uniq(rows, (r) => r.geo)],
      status: ['Status', 'All statuses', uniq(rows, (r) => r.status)],
    }),
    [rows],
  );

  const res = rows.filter(
    (r) =>
      (!f.sector || r.sector === f.sector) &&
      (!f.stage || r.stage === f.stage) &&
      (!f.geo || r.geo === f.geo) &&
      (!f.status || r.status === f.status),
  );
  const any = Object.values(f).some(Boolean);

  return (
    <>
      <div className="pf-bar">
        {(Object.keys(options) as Key[]).map((k) => {
          const [label, all, opts] = options[k];
          return (
            <label key={k}>
              <span>{t(label)}</span>
              <select value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}>
                <option value="">{t(all)}</option>
                {opts.map(([v, l]) => (
                  <option key={v} value={v}>
                    {k === 'status' ? t(l) : l}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
        <div className="pf-count">
          <b>{t(res.length === 1 ? '{n} company' : '{n} companies', { n: res.length })}</b>
          {any && (
            <button type="button" className="pf-clear" onClick={() => setF(EMPTY)}>
              {t('Clear filters')}
            </button>
          )}
        </div>
      </div>
      {res.length ? (
        <div className="pf-list">
          {res.map((r) => (
            <PortfolioRow key={r.id} row={r} href={`${base}/${r.id}`} statusLabel={t(r.status)} />
          ))}
        </div>
      ) : (
        <p className="pf-empty">{t('No companies match these filters.')}</p>
      )}
    </>
  );
}
