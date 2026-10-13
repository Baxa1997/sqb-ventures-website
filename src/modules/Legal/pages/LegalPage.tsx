import { PageHead } from '@shared/components';
import { pick, type Locale } from '@shared/i18n';
import type { ContentPage } from '@shared/types';

/** Service pages such as the privacy policy. */
export function LegalPage({ locale, page }: { locale: Locale; page: ContentPage }) {
  return (
    <>
      <PageHead title={pick(page.t, 'title', locale)} />
      <section className="sec white">
        <div className="wrap">
          {/* body is trusted content from the fund's own data */}
          <div className="prose article" dangerouslySetInnerHTML={{ __html: pick(page.t, 'body', locale) }} />
        </div>
      </section>
    </>
  );
}
