import type { Metadata } from 'next';
import { InvestorsPage } from '@modules/Investors';
import { dict } from '@modules/Investors/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/investors'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return pageMetadata(
    lang,
    t('For investors'),
    '/investors',
    t('Co-invest alongside the fund and see companies that have already passed our review.'),
  );
}

export default async function Page({ params }: PageProps<'/[lang]/investors'>) {
  return <InvestorsPage locale={(await params).lang as Locale} />;
}
