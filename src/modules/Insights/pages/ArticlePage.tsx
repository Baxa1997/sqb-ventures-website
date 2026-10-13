import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PostCard, PostCover, readingTime } from '@shared/components';
import { ROUTES, href } from '@shared/config';
import { createT, pick, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { getPosts } from '@shared/services/news.service';
import type { NewsItem } from '@shared/types';
import { external, longDate } from '@shared/utils';
import { dict } from '../locales';
import '../styles.css';

export function ArticlePage({ locale, post }: { locale: Locale; post: NewsItem }) {
  const t = createT(locale, common, dict);
  const press = post.category === 'Press';
  const back = href(locale, press ? `${ROUTES.news}/press` : ROUTES.news);
  const src = external(post.url);
  const label = t(press ? post.outlet || 'Press' : post.category);
  const body = pick(post.t, 'body', locale) || `<p>${pick(post.t, 'excerpt', locale)}</p>`;
  const more = getPosts(press)
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <section className="sec white">
      <div className="wrap">
        <article className="article">
          <Link href={back} className="btn sm">
            <ArrowLeft /> {t(press ? 'Newsroom' : 'Content Hub')}
          </Link>
          <p className="article-meta">
            <span className="tag">{label}</span>
            <time dateTime={post.date}>{longDate(post.date, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>{t('{n} min read', { n: readingTime(post, locale) })}</span>
          </p>
          <h1>{pick(post.t, 'title', locale)}</h1>
          <p className="lede">{pick(post.t, 'excerpt', locale)}</p>
          <div className="article-cover">
            <PostCover post={post} label={label} big />
          </div>
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
        {more.length > 0 && (
          <div className="article-foot">
            <h2 className="sub-h">{t(press ? 'Newsroom' : 'More from the Content Hub')}</h2>
            <div className="post-grid">
              {more.map((p) => (
                <PostCard key={p.id} post={p} locale={locale} t={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
