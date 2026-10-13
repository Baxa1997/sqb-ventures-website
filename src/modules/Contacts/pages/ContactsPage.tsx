import { Clock, Mail, MapPin, Send } from 'lucide-react';
import { ClosingCta, PageHead, PartnerForm, Words } from '@shared/components';
import { SITE } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { FAQ } from '../constants';
import { dict } from '../locales';
import '../styles.css';

export function ContactsPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, dict);
  return (
    <>
      <PageHead
        title={t('Contacts & FAQ')}
        lede={t('Questions about investments, partnerships or media requests.')}
      />
      <section className="sec white">
        <div className="wrap split">
          <div>
            <h2 className="words">
              <Words text={t('Our address')} />
            </h2>
            <div className="contact-list">
              <div>
                <MapPin />
                <span>{t(SITE.address)}</span>
              </div>
              <div>
                <Mail />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
              <div>
                <Clock />
                <span>{t('Monday to Friday, 9:00–18:00')}</span>
              </div>
              <div>
                <Send />
                <span>Telegram, LinkedIn, Instagram</span>
              </div>
            </div>
            <div className="map">
              <div>
                <MapPin style={{ margin: '0 auto 8px' }} />
                <b>{t('3 Shahrisabz Street, Tashkent')}</b>
                <br />
                <a href={SITE.mapUrl} target="_blank" rel="noopener">
                  {t('Open in maps')}
                </a>
              </div>
            </div>
          </div>
          <div className="panel">
            <h2 className="words" style={{ marginBottom: 20, fontSize: '1.4rem' }}>
              <Words text={t('Become a partner')} />
            </h2>
            <PartnerForm locale={locale} />
          </div>
        </div>
      </section>
      <section className="sec" id="faq">
        <div className="wrap split">
          <div>
            <h2 className="words">
              <Words text="FAQ" />
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              {t('What founders ask us most often.')}
            </p>
          </div>
          <div>
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{t(q)}</summary>
                <p>{t(a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}
