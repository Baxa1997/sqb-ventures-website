import Link from 'next/link';
import { ROUTES, href } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { Words } from './Words';

/** "Want to share with us your story…" band closing most pages. */
export function ClosingCta({ locale }: { locale: Locale }) {
  const t = createT(locale, common);
  return (
    <section className="closing small">
      <div className="wrap">
        <h2 className="words">
          <Words text={t('Want to share with us your story and what you are building?')} />
        </h2>
        <p className="lede">{t('It takes just a few clicks.')}</p>
        <p>
          <Link className="btn" href={href(locale, ROUTES.apply)}>
            Pitch Us
          </Link>
        </p>
      </div>
    </section>
  );
}
