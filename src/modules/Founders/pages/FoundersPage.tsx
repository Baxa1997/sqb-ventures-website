import { BENEFITS } from '@modules/Home';
import { Accordion, ClosingCta, MediaSlot, PageHead, Words } from '@shared/components';
import { SITE } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { dict as home } from '@modules/Home/locales';
import { BELIEFS, DOCUMENTS, FOUNDERS_VIDEO, FOUNDER_STATUSES, TIMELINE } from '../constants';
import { dict } from '../locales';
import '../styles.css';

export function FoundersPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, home, dict);
  const h2 = (text: string) => (
    <h2 className="words">
      <Words text={t(text)} />
    </h2>
  );

  return (
    <>
      <PageHead
        title={t('For Founders')}
        lede={t('What becomes possible with a bank-backed fund next to you.')}
      />

      <section className="sec white">
        <div className="wrap split">
          <div>{h2('Who we believe in')}</div>
          <ul className="belief">
            {BELIEFS.map((b) => (
              <li key={b}>{t(b)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-h">{h2('What we open for you')}</div>
          <div className="cols3" style={{ gap: '36px 28px' }}>
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

      <section className="sec white" id="programs">
        <div className="wrap">
          <div className="sec-h">
            <div>
              {h2('Founder Programs')}
              <p className="lede">{t('Ways to work with us before or alongside an investment.')}</p>
            </div>
          </div>
          <div className="cols2">
            <div className="program">
              <span className="tag">{t('Open')}</span>
              <h3>{t('Pilot program')}</h3>
              <p>
                {t(
                  'A paid or co-funded pilot of your product inside SQB or with one of its corporate clients. You get a sponsor in the bank, a scope agreed in advance and a clear success measure.',
                )}
              </p>
            </div>
            <div className="program">
              <span className="tag plain">{t('Planned')}</span>
              <h3>{t('Accelerator')}</h3>
              <p>
                {t(
                  'A cohort program for teams at the first-traction stage: weekly sessions with mentors, access to the bank’s sandbox and a demo day for investors. We will announce the dates here.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-h">{h2('From application to investment')}</div>
          <ol className="hsteps">
            {TIMELINE.map(([step, time]) => (
              <li key={step}>
                <h3>{t(step)}</h3>
                <span>{t(time)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap split">
          <div>
            {h2('What to prepare')}
            <p className="lede" style={{ marginTop: 14 }}>
              {t(
                'A short video about the documents and the data room for due diligence. You need them after screening, not with the application.',
              )}
            </p>
            <Accordion
              className="docs-acc"
              items={[
                {
                  title: t('Read it as a list'),
                  content: (
                    <ul className="doc-list">
                      {DOCUMENTS.map((d) => (
                        <li key={d}>{t(d)}</li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />
          </div>
          <MediaSlot src={FOUNDERS_VIDEO} placeholder={t('Video: add the file assets/video/founders.mp4')} />
        </div>
      </section>

      <section className="sec ink" id="account">
        <div className="wrap split">
          <div>
            {h2('Founder Account')}
            <p className="lede" style={{ marginTop: 14 }}>
              {t(
                'You get it as soon as you submit the application. Sign in to see the result and to work with the fund.',
              )}
            </p>
            <p style={{ marginTop: 24 }}>
              <a className="btn" href={SITE.founderAccountUrl}>
                {t('Sign in')}
              </a>
            </p>
          </div>
          <ul className="belief">
            {FOUNDER_STATUSES.map((s) => (
              <li key={s}>{t(s)}</li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}
