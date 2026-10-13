import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@modules/Legal';
import { LOCALES, pick, type Locale } from '@shared/i18n';
import { getPage, getPages } from '@shared/services/pages.service';
import { pageMetadata } from '@shared/utils/seo';

export const dynamicParams = true;
export const generateStaticParams = async () => {
  const pages = await getPages();
  return LOCALES.flatMap((lang) => pages.map((p) => ({ lang, slug: p.slug })));
};

export async function generateMetadata({ params }: PageProps<'/[lang]/legal/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = await getPage(slug);
  return page ? pageMetadata(lang as Locale, pick(page.t, 'title', lang as Locale), `/legal/${slug}`) : {};
}

export default async function Page({ params }: PageProps<'/[lang]/legal/[slug]'>) {
  const { lang, slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  return <LegalPage locale={lang as Locale} page={page} />;
}
