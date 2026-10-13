import type { Metadata } from 'next';
import { InsightsPage, TABS, type Tab } from '@modules/Insights';
import { dict } from '@modules/Insights/locales';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { pageMetadata } from '@shared/utils/seo';

/** The three Insights tabs share one page; each route passes its tab. */
export function tabMetadata(lang: Locale, tab: Tab): Metadata {
  const t = createT(lang, common, dict);
  const [, label, path] = TABS.find(([id]) => id === tab)!;
  const title = tab === 'hub' ? t('Insights') : `${t(label)} — ${t('Insights')}`;
  return pageMetadata(
    lang,
    title,
    `/news${path}`,
    t('News, research and press about the fund and the venture market of the region.'),
  );
}

export const renderTab = (lang: Locale, tab: Tab) => <InsightsPage locale={lang} tab={tab} />;
