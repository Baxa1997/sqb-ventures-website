import Link from 'next/link';
import { ROUTES, href } from '@shared/config';
import { pick, type Locale, type TFunction } from '@shared/i18n';
import type { NewsItem } from '@shared/types';
import { external, longDate } from '@shared/utils';

/** A news card. Press mentions with a link open the publication. */
export function PostCard({ post, locale, t }: { post: NewsItem; locale: Locale; t: TFunction }) {
  const out = post.category === 'Press' ? external(post.url) : '';
  const body = (
    <>
      <time dateTime={post.date}>{longDate(post.date, locale)}</time>{' '}
      <span className="tag plain">
        {t(post.category === 'Press' ? post.outlet || 'Press' : post.category)}
      </span>
      <h3>{pick(post.t, 'title', locale)}</h3>
      <p>{pick(post.t, 'excerpt', locale)}</p>
    </>
  );
  return out ? (
    <a className="post" href={out} target="_blank" rel="noopener">
      {body}
    </a>
  ) : (
    <Link className="post" href={href(locale, `${ROUTES.news}/${post.id}`)}>
      {body}
    </Link>
  );
}
