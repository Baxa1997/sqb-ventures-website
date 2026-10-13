import { PORTFOLIO, startupById } from '@shared/data';
import { pick, type Locale } from '@shared/i18n';
import type { PortfolioItem } from '@shared/types';

export function getPortfolio(locale: Locale): PortfolioItem[] {
  return [...PORTFOLIO]
    .sort((a, b) => a.order - b.order)
    .flatMap((entry) => {
      const startup = startupById(entry.startupId);
      if (!startup) return [];
      return [
        {
          id: entry.id,
          startup,
          entry,
          text: pick(entry.t, 'tagline', locale) || startup.description,
          quote: pick(entry.t, 'quote', locale),
        },
      ];
    });
}

export const getPortfolioItem = (locale: Locale, id: string) => getPortfolio(locale).find((i) => i.id === id);

export const isExit = (item: PortfolioItem) => item.startup.status === 'exit';
