'use client';

import { useParams } from 'next/navigation';
import { NotFoundPage } from '@modules/NotFound';
import { isLocale } from '@shared/i18n';

export default function NotFound() {
  const { lang } = useParams<{ lang: string }>();
  return <NotFoundPage locale={isLocale(lang) ? lang : 'en'} />;
}
