import type { MetadataRoute } from 'next';
import { ROUTES, SITE } from '@shared/config';
import { LOCALES } from '@shared/i18n';
import { getAllPosts } from '@shared/services/news.service';
import { getPages } from '@shared/services/pages.service';
import { getPortfolio } from '@shared/services/portfolio.service';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [portfolio, posts, pages] = await Promise.all([getPortfolio('en'), getAllPosts(), getPages()]);
  const paths = [
    ...Object.values(ROUTES).filter((p) => p !== ROUTES.apply),
    `${ROUTES.news}/reports`,
    `${ROUTES.news}/press`,
    ...portfolio.map((f) => `${ROUTES.portfolio}/${f.id}`),
    ...posts.map((n) => `${ROUTES.news}/${n.id}`),
    ...pages.map((p) => `/legal/${p.slug}`),
  ];
  return [...new Set(paths)].map((path) => {
    const suffix = path === '/' ? '' : path;
    return {
      url: `${SITE.url}/en${suffix}`,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}${suffix}`])) },
    };
  });
}
