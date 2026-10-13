import type { Metadata } from 'next';
import { ApplyPage } from '@modules/PitchUs';
import { dict } from '@modules/PitchUs/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/apply'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return pageMetadata(
    lang,
    t('Pitch Us'),
    '/apply',
    t('Share with us your story and what you are building.'),
  );
}

export default async function Page({ params }: PageProps<'/[lang]/apply'>) {
  return <ApplyPage locale={(await params).lang as Locale} />;
}
