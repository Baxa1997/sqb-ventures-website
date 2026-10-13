import { ExternalLink, Mail } from 'lucide-react';
import { ClosingCta, PageHead, Words } from '@shared/components';
import { TEAM } from '@shared/data/team';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { getPortfolio } from '@shared/services/portfolio.service';
import { external, initials } from '@shared/utils';
import { dict } from '../locales';
import '../styles.css';

const HISTORY = [
  ['2024', 'SQB sets up SQB Ventures as its venture capital arm. The fund makes its first investment.'],
  [
    '2025',
    'Three more companies join the portfolio. The first pilots with the bank’s corporate clients start.',
  ],
  [
    '2026',
    'The first exit from the portfolio. The Founder Account opens: applications, the data room and reporting move online.',
  ],
];

export function AboutPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, dict);
  const portfolio = getPortfolio(locale);

  return (
    <>
      <PageHead
        title={t('About')}
        lede={t(
          'A $10 million venture capital fund supporting early-stage teams from first traction through scale.',
        )}
      />

      <section className="sec white" id="people-sec">
        <div className="wrap">
          <div className="sec-h">
            <h2 className="words">
              <Words text={t('People')} />
            </h2>
          </div>
          <div className="people" id="people">
            {TEAM.length ? (
              TEAM.map((p) => {
                const led = portfolio
                  .filter((it) => it.startup.manager === p.name)
                  .map((it) => it.startup.name);
                const li = external(p.linkedin);
                return (
                  <article className="person" key={p.email}>
                    <div className="ph" data-ini={initials(p.name)}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- optional portrait set in data */}
                      {p.photo && <img src={p.photo} alt={p.name} loading="lazy" />}
                    </div>
                    <h3>{p.name}</h3>
                    <p className="pos">{t(p.position)}</p>
                    <p className="led">
                      <span>{t('Projects led')}</span>
                      {led.length ? led.join(', ') : '—'}
                    </p>
                    <p className="co-links">
                      {li && (
                        <a href={li} target="_blank" rel="noopener">
                          <ExternalLink />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      <a href={`mailto:${p.email}`}>
                        <Mail />
                        <span>{p.email}</span>
                      </a>
                    </p>
                  </article>
                );
              })
            ) : (
              <p>{t('The team will be published here soon.')}</p>
            )}
          </div>
        </div>
      </section>

      <section className="sec" id="mission">
        <div className="wrap split">
          <div>
            <h2 className="words">
              <Words text={t('Mission')} />
            </h2>
          </div>
          <div>
            <p className="mission">
              {t(
                'We invest in founders who build companies that change the economy of Uzbekistan and Central Asia.',
              )}
            </p>
            <p className="lede" style={{ marginTop: 22 }}>
              {t(
                'Capital is a commodity. Our real edge is access to regulators, to the banking infrastructure of SQB and to strategic partners in the region.',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="sec ink" id="history">
        <div className="wrap split">
          <div>
            <h2 className="words">
              <Words text={t('History')} />
            </h2>
          </div>
          <ol className="timeline">
            {HISTORY.map(([year, text]) => (
              <li key={year}>
                <b>{year}</b>
                <p>{t(text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}
