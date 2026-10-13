import type { MetadataRoute } from 'next';
import { ROUTES, SITE } from '@shared/config';
import { NEWS } from '@shared/data/news';
import { PAGES } from '@shared/data/pages';
import { PORTFOLIO } from '@shared/data/portfolio';
import { LOCALES } from '@shared/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...Object.values(ROUTES).filter((p) => p !== ROUTES.apply),
    `${ROUTES.news}/reports`,
    `${ROUTES.news}/press`,
    ...PORTFOLIO.map((f) => `${ROUTES.portfolio}/${f.id}`),
    ...NEWS.map((n) => `${ROUTES.news}/${n.id}`),
    ...PAGES.map((p) => `/legal/${p.slug}`),
  ];
  const unique = [...new Set(paths)];
  return unique.map((path) => {
    const suffix = path === '/' ? '' : path;
    return {
      url: `${SITE.url}/en${suffix}`,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}${suffix}`])) },
    };
  });
}
