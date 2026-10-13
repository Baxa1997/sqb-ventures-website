import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@modules/Legal';
import { PAGES } from '@shared/data/pages';
import { LOCALES, pick, type Locale } from '@shared/i18n';
import { pageMetadata } from '@shared/utils/seo';

export const dynamicParams = false;
export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => PAGES.map((p) => ({ lang, slug: p.slug })));

const find = (slug: string) => PAGES.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<'/[lang]/legal/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = find(slug);
  return page ? pageMetadata(lang as Locale, pick(page.t, 'title', lang as Locale), `/legal/${slug}`) : {};
}

export default async function Page({ params }: PageProps<'/[lang]/legal/[slug]'>) {
  const { lang, slug } = await params;
  const page = find(slug);
  if (!page) notFound();
  return <LegalPage locale={lang as Locale} page={page} />;
}
