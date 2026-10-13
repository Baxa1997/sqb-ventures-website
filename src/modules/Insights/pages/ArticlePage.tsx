import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PageHead } from '@shared/components';
import { ROUTES, href } from '@shared/config';
import { createT, pick, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import type { NewsItem } from '@shared/types';
import { external, longDate } from '@shared/utils';
import { dict } from '../locales';
import '../styles.css';

export function ArticlePage({ locale, post }: { locale: Locale; post: NewsItem }) {
  const t = createT(locale, common, dict);
  const press = post.category === 'Press';
  const back = href(locale, press ? `${ROUTES.news}/press` : ROUTES.news);
  const src = external(post.url);
  const body = pick(post.t, 'body', locale) || `<p>${pick(post.t, 'excerpt', locale)}</p>`;

  return (
    <>
      <PageHead
        title={t('Insights')}
        lede={t('News, research and press about the fund and the venture market of the region.')}
      />
      <section className="sec white">
        <div className="wrap">
          <article className="article">
            <Link href={back} className="btn sm">
              <ArrowLeft /> {t(press ? 'Newsroom' : 'Content Hub')}
            </Link>
            <p style={{ marginTop: 28 }}>
              <time dateTime={post.date}>{longDate(post.date, locale)}</time>{' '}
              <span className="tag plain">{t(post.outlet || post.category)}</span>
            </p>
            <h1>{pick(post.t, 'title', locale)}</h1>
            {/* body is trusted content from the fund's own data */}
            <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
            {src && (
              <p>
                <a className="btn" href={src} target="_blank" rel="noopener">
                  {t('Read the publication')} <ArrowUpRight />
                </a>
              </p>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
