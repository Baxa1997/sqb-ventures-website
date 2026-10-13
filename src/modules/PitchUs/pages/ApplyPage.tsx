import type { Locale } from '@shared/i18n';
import { InlinePitch } from '../components/InlinePitch';

export function ApplyPage({ locale }: { locale: Locale }) {
  return (
    <section className="sec">
      <div className="wrap">
        <InlinePitch locale={locale} />
      </div>
    </section>
  );
}
