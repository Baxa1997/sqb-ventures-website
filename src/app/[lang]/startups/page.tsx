import type { Metadata } from 'next';
import { FoundersPage } from '@modules/Founders';
import { dict } from '@modules/Founders/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/startups'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return pageMetadata(
    lang,
    t('For Founders'),
    '/startups',
    t('What becomes possible with a bank-backed fund next to you.'),
  );
}

export default async function Page({ params }: PageProps<'/[lang]/startups'>) {
  return <FoundersPage locale={(await params).lang as Locale} />;
}
