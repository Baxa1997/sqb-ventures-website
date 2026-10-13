import type { Metadata } from 'next';
import type { Locale } from '@shared/i18n';
import { renderTab, tabMetadata } from './tab';

export async function generateMetadata({ params }: PageProps<'/[lang]/news'>): Promise<Metadata> {
  return tabMetadata((await params).lang as Locale, 'hub');
}

export default async function Page({ params }: PageProps<'/[lang]/news'>) {
  return renderTab((await params).lang as Locale, 'hub');
}
