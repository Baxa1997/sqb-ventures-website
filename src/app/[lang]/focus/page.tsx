import type { Metadata } from 'next';
import { FocusPage } from '@modules/Focus';
import { dict } from '@modules/Focus/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/focus'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return pageMetadata(
    lang,
    t('Investment Focus'),
    '/focus',
    t('What we invest in, where, and what we say no to.'),
  );
}

export default async function Page({ params }: PageProps<'/[lang]/focus'>) {
  return <FocusPage locale={(await params).lang as Locale} />;
}
