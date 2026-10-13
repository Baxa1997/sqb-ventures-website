import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CompanyPage } from '@modules/Portfolio';
import { LOCALES, type Locale } from '@shared/i18n';
import { getPortfolio, getPortfolioItem } from '@shared/services/portfolio.service';
import { pageMetadata } from '@shared/utils/seo';

// companies added in ucode later are rendered on first visit, then cached
export const dynamicParams = true;
export const generateStaticParams = async () =>
  (
    await Promise.all(
      LOCALES.map(async (lang) => (await getPortfolio(lang)).map((i) => ({ lang, id: i.id }))),
    )
  ).flat();

export async function generateMetadata({ params }: PageProps<'/[lang]/portfolio/[id]'>): Promise<Metadata> {
  const { lang, id } = await params;
  const item = await getPortfolioItem(lang as Locale, id);
  return item ? pageMetadata(lang as Locale, item.startup.name, `/portfolio/${id}`, item.text) : {};
}

export default async function Page({ params }: PageProps<'/[lang]/portfolio/[id]'>) {
  const { lang, id } = await params;
  const item = await getPortfolioItem(lang as Locale, id);
  if (!item) notFound();
  return <CompanyPage locale={lang as Locale} item={item} />;
}
