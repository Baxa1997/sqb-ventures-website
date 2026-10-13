import { NAV, ROUTES, SITE, href } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { HeaderNav, type HeaderLabels, type HeaderLink } from './HeaderNav';

export function Header({ locale }: { locale: Locale }) {
  const t = createT(locale, common);
  const link = (path: string, external?: boolean) => (external ? SITE.founderAccountUrl : href(locale, path));
  const items: HeaderLink[] = NAV.map((n) => ({
    href: link(n.path),
    label: t(n.label),
    sub: n.sub?.map((s) => ({ href: link(s.path, s.external), label: t(s.label) })),
  }));
  const labels: HeaderLabels = {
    home: t('SQB Ventures home'),
    main: t('Main'),
    language: t('Language'),
    menu: t('Menu'),
    pitch: t('Pitch Us'),
  };
  return (
    <HeaderNav
      locale={locale}
      items={items}
      labels={labels}
      homeHref={href(locale)}
      applyHref={href(locale, ROUTES.apply)}
    />
  );
}
