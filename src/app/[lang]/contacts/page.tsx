import type { Metadata } from 'next';
import { ContactsPage } from '@modules/Contacts';
import { dict } from '@modules/Contacts/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/contacts'>): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = createT(lang, common, dict);
  return pageMetadata(
    lang,
    t('Contacts & FAQ'),
    '/contacts',
    t('Questions about investments, partnerships or media requests.'),
  );
}

export default async function Page({ params }: PageProps<'/[lang]/contacts'>) {
  return <ContactsPage locale={(await params).lang as Locale} />;
}
