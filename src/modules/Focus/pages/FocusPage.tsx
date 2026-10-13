import { ClosingCta, PageHead, Words } from '@shared/components';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { dict as home } from '@modules/Home/locales';
import { ANTI_THESIS, FACTS, GEOGRAPHY, SECTORS, THREE_YES } from '../constants';
import { dict } from '../locales';
import '../styles.css';

export function FocusPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, home, dict);
  const h2 = (text: string) => (
    <h2 className="words">
      <Words text={t(text)} />
    </h2>
  );

  return (
    <>
      <PageHead title={t('Investment Focus')} lede={t('What we invest in, where, and what we say no to.')} />

      <section className="sec white">
        <div className="wrap">
          <dl className="facts four">
            {FACTS.map(([k, v]) => (
              <div key={k}>
                <dt>{t(k)}</dt>
                <dd>{t(v)}</dd>
              </div>
            ))}
          </dl>
          <p className="hint" style={{ marginTop: 12 }}>
            {t('The amount includes follow-on investment.')}
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-h">{h2('Focus')}</div>
          <div className="cols3">
            {SECTORS.map(({ icon: Icon, title, points }) => (
              <div className="focus-card" key={title}>
                <Icon />
                <h3>{t(title)}</h3>
                {points.map(([dt, dd]) => (
                  <dl key={dt}>
                    <dt>{t(dt)}</dt>
                    <dd>{t(dd)}</dd>
                  </dl>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec ink">
        <div className="wrap">
          <div className="sec-h">
            <div>
              {h2('Anti-thesis')}
              <p className="lede">{t('We value founders’ time and say openly what we do not invest in.')}</p>
            </div>
          </div>
          <ul className="x-list">
            {ANTI_THESIS.map((x) => (
              <li key={x}>{t(x)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <div className="sec-h">
            <div>
              {h2('Geography')}
              <p className="lede">
                {t(
                  'We invest in regions with strong growth potential and back founders with local roots who build global businesses.',
                )}
              </p>
            </div>
          </div>
          <div className="cols3">
            {GEOGRAPHY.map(({ icon: Icon, title, text }) => (
              <div className="prop" key={title}>
                <Icon />
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-h">
            <div>
              {h2('Smart Capital')}
              <p className="lede">
                {t(
                  'Venture money has become a commodity. We enter a deal only when we can guarantee three times “Yes”.',
                )}
              </p>
            </div>
          </div>
          <ol className="yes">
            {THREE_YES.map(([title, text]) => (
              <li key={title}>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </li>
            ))}
          </ol>
          <p className="lede" style={{ marginTop: 36, maxWidth: '70ch' }}>
            {t(
              'If we see that we cannot strengthen your business on each of these points, we will honestly decline the deal so as not to waste your time. We invest only where we bring a win.',
            )}
          </p>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}
