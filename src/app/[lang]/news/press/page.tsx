import type { Metadata } from 'next';
import type { Locale } from '@shared/i18n';
import { renderTab, tabMetadata } from '../tab';

export async function generateMetadata({ params }: PageProps<'/[lang]/news/press'>): Promise<Metadata> {
  return tabMetadata((await params).lang as Locale, 'press');
}

export default async function Page({ params }: PageProps<'/[lang]/news/press'>) {
  return renderTab((await params).lang as Locale, 'press');
}
