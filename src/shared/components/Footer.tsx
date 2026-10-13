import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@assets/img/logo-white.png';
import { ROUTES, SITE, href } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';

export function Footer({ locale }: { locale: Locale }) {
  const t = createT(locale, common);
  const to = (path: string) => href(locale, path);
  return (
    <footer className="ftr">
      <div className="wrap">
        <div>
          <Link className="mark" href={to('/')}>
            <Image src={logoWhite} alt="SQB Ventures" sizes="160px" />
          </Link>
          <p className="motto">Beyond Capital — Create Value</p>
          <p>{t('The venture capital arm backed by SQB.')}</p>
        </div>
        <div>
          <Link href={to(ROUTES.about)}>{t('About')}</Link>
          <Link href={to(ROUTES.founders)}>{t('For Founders')}</Link>
          <Link href={to(ROUTES.focus)}>{t('Investment Focus')}</Link>
          <Link href={to(ROUTES.portfolio)}>{t('Portfolio')}</Link>
          <Link href={to(ROUTES.news)}>{t('Insights')}</Link>
          <Link href={to(ROUTES.apply)}>Pitch Us</Link>
        </div>
        <div>
          <h3>{t('Contacts')}</h3>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <p>{t(SITE.address)}</p>
          <Link href={`${to(ROUTES.investors)}#partner`}>{t('Become a partner')}</Link>
        </div>
        <div className="legal">
          <span>{t('© 2026 SQB Ventures. All rights reserved.')}</span>
          <span>
            <Link href={to(ROUTES.privacy)}>{t('Privacy policy')}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
