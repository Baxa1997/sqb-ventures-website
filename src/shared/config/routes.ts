import type { Locale } from '@shared/i18n';

/** Path of a page in a given language, e.g. href('ru', '/about') → '/ru/about'. */
export const href = (locale: Locale, path = '/') => `/${locale}${path === '/' ? '' : path}`;

export const ROUTES = {
  home: '/',
  founders: '/startups',
  about: '/about',
  focus: '/focus',
  portfolio: '/portfolio',
  news: '/news',
  investors: '/investors',
  contacts: '/contacts',
  apply: '/apply',
  privacy: '/legal/privacy',
} as const;

export interface NavItem {
  path: string;
  label: string;
  sub?: { path: string; label: string; external?: boolean }[];
}

/** Six sections; `sub` is the drop-down. */
export const NAV: NavItem[] = [
  {
    path: ROUTES.founders,
    label: 'For Founders',
    sub: [
      { path: `${ROUTES.founders}#programs`, label: 'Founder Programs' },
      { path: 'founder-account', label: 'Founder Account', external: true },
    ],
  },
  {
    path: ROUTES.about,
    label: 'About',
    sub: [
      { path: `${ROUTES.about}#people`, label: 'People' },
      { path: `${ROUTES.about}#mission`, label: 'Mission' },
      { path: `${ROUTES.about}#history`, label: 'History' },
    ],
  },
  { path: ROUTES.focus, label: 'Investment Focus' },
  { path: ROUTES.portfolio, label: 'Portfolio' },
  {
    path: ROUTES.news,
    label: 'Insights',
    sub: [
      { path: ROUTES.news, label: 'Content Hub' },
      { path: `${ROUTES.news}/reports`, label: 'Industry reports' },
      { path: `${ROUTES.news}/press`, label: 'Newsroom' },
    ],
  },
  { path: ROUTES.contacts, label: 'Contacts & FAQ' },
];
