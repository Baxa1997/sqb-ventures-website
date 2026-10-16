import { ArrowLeft, ExternalLink, Globe, Quote } from 'lucide-react';
import Link from 'next/link';
import { ClosingCta } from '@shared/components';
import { ROUTES, href } from '@shared/config';
import { industryName } from '@shared/data/industries';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { dict as home } from '@modules/Home/locales';
import { getPortfolio } from '@shared/services/portfolio.service';
import type { PortfolioItem } from '@shared/types';
import { external, initials, money } from '@shared/utils';
import { PortfolioRow } from '../components/PortfolioRow';
import { statusOf, toRow } from '../helpers';
import { dict } from '../locales';
import '../styles.css';

export async function CompanyPage({ locale, item }: { locale: Locale; item: PortfolioItem }) {
  const t = createT(locale, common, home, dict);
  const base = href(locale, ROUTES.portfolio);
  const { startup: s, entry: f, quote } = item;
  const status = statusOf(item);
  const web = external(s.website);
  const li = external(f.founderLinkedin);
  const others = (await getPortfolio(locale)).filter((x) => x.id !== item.id).slice(0, 3);
  const facts = (
    [
      ['Sector', industryName(s.industry)],
      ['Stage', s.stage],
      ['Investment', s.invested ? money(s.invested) : ''],
      ['Year', f.year],
      ['Location', [s.city, s.country].filter(Boolean).join(', ') || '—'],
      ['Status', t(status)],
    ] as [string, string][]
  ).filter(([, v]) => v);

  return (
    <>
      <section className="sec white">
        <div className="wrap">
          <Link className="btn sm" href={base}>
            <ArrowLeft /> <span>{t('Back to portfolio')}</span>
          </Link>
          <div className="pf-detail">
            <div className="pf-main">
              <div className="tags">
                <span className="tag">{industryName(s.industry)}</span>
                <span className={status === 'Exited' ? 'st exit' : 'st active'}>{t(status)}</span>
              </div>
              <div className="pf-id">
                <span className="logo big">{initials(s.name)}</span>
                <h1>{s.name}</h1>
              </div>
              <p className="pf-tagline">{item.text}</p>
              <dl className="pf-facts">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{t(k)}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="co-links">
                {web && (
                  <a href={web} target="_blank" rel="noopener">
                    <Globe />
                    <span>{t('Website')}</span>
                  </a>
                )}
                {li && (
                  <a href={li} target="_blank" rel="noopener">
                    <ExternalLink />
                    <span>LinkedIn</span>
                  </a>
                )}
              </p>
            </div>
            {(quote || f.founder) && (
              <figure className="pf-quote">
                {quote && (
                  <>
                    <Quote />
                    <blockquote>{quote}</blockquote>
                  </>
                )}
                <figcaption>
                  <span className="logo">{initials(f.founder || s.name)}</span>
                  <span>
                    <b>{f.founder}</b>
                    <span>{[f.founderRole, s.name].filter(Boolean).join(', ')}</span>
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
          {others.length > 0 && (
            <>
              <h2 className="sub-h">{t('More from the portfolio')}</h2>
              <div className="pf-list">
                {others.map((o) => {
                  const row = toRow(o, initials(o.startup.name));
                  return (
                    <PortfolioRow key={o.id} row={row} href={`${base}/${o.id}`} statusLabel={t(row.status)} />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}
