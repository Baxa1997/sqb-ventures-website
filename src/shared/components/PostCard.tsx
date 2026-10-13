import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Landmark,
  Newspaper,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES, href } from '@shared/config';
import { pick, type Locale, type TFunction } from '@shared/i18n';
import type { NewsCategory, NewsItem } from '@shared/types';
import { external, longDate } from '@shared/utils';

const ICONS: Record<NewsCategory, LucideIcon> = {
  Fund: Landmark,
  Portfolio: Briefcase,
  Events: CalendarDays,
  Press: Newspaper,
};

/** Minutes to read the post, from its body (or excerpt). */
export function readingTime(post: NewsItem, locale: Locale) {
  const text = (pick(post.t, 'body', locale) || pick(post.t, 'excerpt', locale)).replace(/<[^>]+>/g, ' ');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
}

/** Branded cover drawn from the category when a post has no image. */
export function PostCover({ post, label, big }: { post: NewsItem; label: string; big?: boolean }) {
  const Icon = ICONS[post.category];
  return (
    <div className={`post-cover cat-${post.category.toLowerCase()}${big ? ' big' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- optional cover set in data */}
      {post.image ? <img src={post.image} alt="" loading="lazy" /> : <Icon aria-hidden="true" />}
      <span className="post-cat">{label}</span>
    </div>
  );
}

interface PostCardProps {
  post: NewsItem;
  locale: Locale;
  t: TFunction;
  /** The lead story: cover and text side by side. */
  featured?: boolean;
}

/** A news card. Press mentions with a link open the publication. */
export function PostCard({ post, locale, t, featured }: PostCardProps) {
  const out = post.category === 'Press' ? external(post.url) : '';
  const label = t(post.category === 'Press' ? post.outlet || 'Press' : post.category);
  const inner = (
    <>
      <PostCover post={post} label={label} big={featured} />
      <div className="post-body">
        <p className="post-meta">
          <time dateTime={post.date}>{longDate(post.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{t('{n} min read', { n: readingTime(post, locale) })}</span>
        </p>
        <h3>{pick(post.t, 'title', locale)}</h3>
        <p className="post-excerpt">{pick(post.t, 'excerpt', locale)}</p>
        <span className="post-more">
          {t('Read more')} {out ? <ArrowUpRight /> : <ArrowRight />}
        </span>
      </div>
    </>
  );
  const cls = featured ? 'post featured' : 'post';
  return out ? (
    <a className={cls} href={out} target="_blank" rel="noopener" data-cat={post.category}>
      {inner}
    </a>
  ) : (
    <Link className={cls} href={href(locale, `${ROUTES.news}/${post.id}`)} data-cat={post.category}>
      {inner}
    </Link>
  );
}
