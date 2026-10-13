import Link from 'next/link';
import { PageHead, PostCard } from '@shared/components';
import { ROUTES, href } from '@shared/config';
import { MEDIA, REPORTS } from '@shared/data/sources';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { getPosts } from '@shared/services/news.service';
import { SourceCard } from '../components/SourceCard';
import { TopicFilter } from '../components/TopicFilter';
import { TABS, type Tab } from '../constants';
import { dict } from '../locales';
import '../styles.css';

/** Insights: Content Hub, Industry reports and Newsroom, each at its own address. */
export function InsightsPage({ locale, tab }: { locale: Locale; tab: Tab }) {
  const t = createT(locale, common, dict);
  const base = href(locale, ROUTES.news);
  const posts = tab === 'hub' ? getPosts() : tab === 'press' ? getPosts(true) : [];
  const topics = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <PageHead
        title={t('Insights')}
        lede={t('News, research and press about the fund and the venture market of the region.')}
      />
      <section className="sec white">
        <div className="wrap">
          <nav className="tabs" aria-label={t('Insights')}>
            {TABS.map(([id, label, path]) => (
              <Link key={id} href={base + path} aria-current={id === tab ? 'page' : undefined}>
                {t(label)}
              </Link>
            ))}
          </nav>

          {tab === 'hub' && (
            <>
              <p className="lede tab-lede">
                {t(
                  'Fund announcements, portfolio updates and what we read about the venture market of the region.',
                )}
              </p>
              {posts.length ? (
                <>
                  <TopicFilter
                    target="hub-posts"
                    label={t('Filter by topic')}
                    topics={[
                      { id: '', label: t('All'), count: posts.length },
                      ...topics.map((c) => ({
                        id: c,
                        label: t(c),
                        count: posts.filter((p) => p.category === c).length,
                      })),
                    ]}
                  />
                  <div className="post-grid" id="hub-posts">
                    {posts.map((p, i) => (
                      <PostCard key={p.id} post={p} locale={locale} t={t} featured={i === 0} />
                    ))}
                  </div>
                </>
              ) : (
                <p>{t('Nothing has been published yet.')}</p>
              )}
              <h2 className="sub-h">{t('Media we read')}</h2>
              <div className="srcs small">
                {MEDIA.map((s) => (
                  <SourceCard key={s.name} source={s} t={t} />
                ))}
              </div>
            </>
          )}

          {tab === 'reports' && (
            <>
              <p className="lede tab-lede">
                {t('Research we rely on when we look at markets and compare ecosystems.')}
              </p>
              <div className="srcs">
                {REPORTS.map((s) => (
                  <SourceCard key={s.name} source={s} t={t} />
                ))}
              </div>
            </>
          )}

          {tab === 'press' && (
            <>
              <p className="lede tab-lede">{t('Publications that mention SQB Ventures.')}</p>
              {posts.length ? (
                <div className="post-grid">
                  {posts.map((p) => (
                    <PostCard key={p.id} post={p} locale={locale} t={t} />
                  ))}
                </div>
              ) : (
                <p>{t('No publications have been added yet.')}</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
