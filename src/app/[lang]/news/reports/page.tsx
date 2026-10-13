import type { Metadata } from 'next';
import type { Locale } from '@shared/i18n';
import { renderTab, tabMetadata } from '../tab';

export async function generateMetadata({ params }: PageProps<'/[lang]/news/reports'>): Promise<Metadata> {
  return tabMetadata((await params).lang as Locale, 'reports');
}

export default async function Page({ params }: PageProps<'/[lang]/news/reports'>) {
  return renderTab((await params).lang as Locale, 'reports');
}
