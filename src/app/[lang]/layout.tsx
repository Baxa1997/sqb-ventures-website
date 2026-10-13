import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { PitchProvider } from '@modules/PitchUs/components/PitchProvider';
import { Footer, Header, MOTION_BOOT, MotionObserver } from '@shared/components';
import { SITE } from '@shared/config';
import { LOCALES, createT, isLocale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import '@shared/styles/globals.css';

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const t = createT(isLocale(lang) ? lang : 'en', common);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: SITE.name, template: `%s — ${SITE.name}` },
    description: t(SITE.description),
    icons: { icon: '/img/mark.png' },
  };
}

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        <Header locale={lang} />
        <PitchProvider locale={lang}>
          <main>{children as ReactNode}</main>
        </PitchProvider>
        <Footer locale={lang} />
        <MotionObserver />
      </body>
    </html>
  );
}
