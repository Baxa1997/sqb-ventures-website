import type { Metadata } from 'next';
import { AboutPage } from '@modules/About';
import { dict } from '@modules/About/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/about'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return pageMetadata(
    lang,
    t('About'),
    '/about',
    t('A $10 million venture capital fund supporting early-stage teams from first traction through scale.'),
  );
}

export default async function Page({ params }: PageProps<'/[lang]/about'>) {
  return <AboutPage locale={(await params).lang as Locale} />;
}
