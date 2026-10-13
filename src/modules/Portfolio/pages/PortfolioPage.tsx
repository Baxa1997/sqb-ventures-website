import { ClosingCta, PageHead } from '@shared/components';
import { ROUTES, href } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { getPortfolio, isExit } from '@shared/services/portfolio.service';
import { initials, money } from '@shared/utils';
import { PortfolioList } from '../components/PortfolioList';
import { toRow } from '../helpers';
import { dict } from '../locales';
import '../styles.css';

export function PortfolioPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, dict);
  const items = getPortfolio(locale);
  const total = items.reduce((sum, i) => sum + (i.startup.invested || 0), 0);
  const sectors = new Set(items.map((i) => i.startup.industry)).size;
  const stats: [string | number, string][] = [
    [items.length, 'Investments'],
    [items.filter(isExit).length, 'Exits'],
    [money(total), 'Invested'],
    [sectors, 'Sectors'],
  ];

  return (
    <>
      <PageHead
        className="pf-head"
        title={t('Portfolio')}
        lede={t(
          'Companies we proudly invested in. We support you with pilots, integrations and scaling to global markets.',
        )}
      >
        <dl className="stats">
          {stats.map(([v, k]) => (
            <div key={k}>
              <dd>{v}</dd>
              <dt>{t(k)}</dt>
            </div>
          ))}
        </dl>
      </PageHead>
      <section className="sec white">
        <div className="wrap">
          <PortfolioList
            locale={locale}
            base={href(locale, ROUTES.portfolio)}
            rows={items.map((i) => toRow(i, initials(i.startup.name)))}
          />
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}
