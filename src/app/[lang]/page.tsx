import type { Metadata } from 'next';
import { HomePage } from '@modules/Home';
import { dict } from '@modules/Home/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return {
    ...pageMetadata(
      lang,
      'Beyond Capital — Create Value',
      '/',
      t(
        'SQB Ventures is the VC arm backed by SQB. We invest in technology startups with the prospect of becoming global companies.',
      ),
    ),
    title: { absolute: 'Beyond Capital — Create Value — SQB Ventures' },
  };
}

export default async function Page({ params }: PageProps<'/[lang]'>) {
  return <HomePage locale={(await params).lang as Locale} />;
}
