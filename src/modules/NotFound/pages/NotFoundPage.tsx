import Link from 'next/link';
import { PageHead } from '@shared/components';
import { href } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';

export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common);
  return (
    <>
      <PageHead title={t('Page not found')} />
      <section className="sec white">
        <div className="wrap prose">
          <p>{t('This page does not exist or is not published.')}</p>
          <p>
            <Link href={href(locale)}>{t('Go to the home page')}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
