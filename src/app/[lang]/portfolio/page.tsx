import type { Metadata } from 'next';
import { PortfolioPage } from '@modules/Portfolio';
import { dict } from '@modules/Portfolio/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/portfolio'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return pageMetadata(
    lang,
    t('Portfolio'),
    '/portfolio',
    t(
      'Companies we proudly invested in. We support you with pilots, integrations and scaling to global markets.',
    ),
  );
}

export default async function Page({ params }: PageProps<'/[lang]/portfolio'>) {
  return <PortfolioPage locale={(await params).lang as Locale} />;
}
