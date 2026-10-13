import 'server-only';
import { cache } from 'react';
import { listAll } from '@shared/api/ucode';
import { isVisible, sortOrder, toPortfolio } from '@shared/api/ucode/mappers';
import { PORTFOLIO, startupById } from '@shared/data';
import { pick, type Locale } from '@shared/i18n';
import type { PortfolioEntry, PortfolioItem, Startup } from '@shared/types';
import { fromSource } from './source';

type Row = { startup: Startup; entry: PortfolioEntry };

const loadRows = cache(() =>
  fromSource<Row[]>(
    'portfolio',
    async () =>
      (await listAll('portfolio', { cacheTags: ['portfolio'] }))
        .filter(isVisible)
        .sort(sortOrder)
        .map(toPortfolio),
    () =>
      [...PORTFOLIO]
        .sort((a, b) => a.order - b.order)
        .flatMap((entry) => {
          const startup = startupById(entry.startupId);
          return startup ? [{ startup, entry }] : [];
        }),
    [],
  ),
);

export async function getPortfolio(locale: Locale): Promise<PortfolioItem[]> {
  return (await loadRows()).map(({ startup, entry }) => ({
    id: entry.id,
    startup,
    entry,
    text: pick(entry.t, 'tagline', locale) || startup.description,
    quote: pick(entry.t, 'quote', locale),
  }));
}

export const getPortfolioItem = async (locale: Locale, id: string) =>
  (await getPortfolio(locale)).find((i) => i.id === id);

export const isExit = (item: PortfolioItem) => item.startup.status === 'exit';
