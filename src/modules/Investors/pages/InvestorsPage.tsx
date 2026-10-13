import { Briefcase, FolderLock, Handshake, Presentation } from 'lucide-react';
import { MediaSlot, PageHead, PartnerForm, Words } from '@shared/components';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { dict } from '../locales';

/** Set to a file under /public (e.g. '/video/investors.mp4') to replace the placeholder. */
const INVESTORS_VIDEO = '';

const BENEFITS = [
  {
    icon: Presentation,
    title: 'Regular pitch and deal flow sessions',
    text: 'Meet founders from the current pipeline at scheduled sessions.',
  },
  {
    icon: Handshake,
    title: 'Direct introductions for co-investment',
    text: 'We introduce you to selected startups where a co-investor strengthens the round.',
  },
  {
    icon: FolderLock,
    title: 'Shared due diligence',
    text: 'Access to the data room and the fund’s review materials for deals you join.',
  },
  {
    icon: Briefcase,
    title: 'Trust management',
    text: 'Apply to have the fund manage a venture allocation on your behalf.',
  },
];

export function InvestorsPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, dict);
  const h2 = (text: string) => (
    <h2 className="words">
      <Words text={t(text)} />
    </h2>
  );
  return (
    <>
      <PageHead
        title={t('For investors')}
        lede={t('Co-invest alongside the fund and see companies that have already passed our review.')}
      />
      <section className="sec white">
        <div className="wrap split">
          <div>
            {h2('Opportunities for co-investors')}
            <p className="lede" style={{ marginTop: 14 }}>
              {t('A short video about how co-investment with SQB Ventures works.')}
            </p>
          </div>
          <MediaSlot
            src={INVESTORS_VIDEO}
            placeholder={t('Video: add the file assets/video/investors.mp4')}
          />
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="sec-h">{h2('What partners get')}</div>
          <div className="cols2" style={{ gap: '36px 28px' }}>
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div className="prop" key={title}>
                <Icon />
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec white" id="partner">
        <div className="wrap split">
          <div>
            {h2('Become a partner')}
            <p className="lede" style={{ marginTop: 14 }}>
              {t('Tell us about yourself or your organisation. We reply within three working days.')}
            </p>
          </div>
          <div className="panel">
            <PartnerForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
