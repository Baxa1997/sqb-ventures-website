import { Mail } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import mark from '@assets/img/mark.png';
import { ClosingCta, PageHead, Words } from '@shared/components';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { getPortfolio } from '@shared/services/portfolio.service';
import { getTeam } from '@shared/services/team.service';
import { external } from '@shared/utils';
import { dict } from '../locales';
import '../styles.css';

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.76 0-2.03 1.3-2.03 2.66v5.14h-4v-11Z" />
  </svg>
);

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

export async function AboutPage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, dict);
  const [portfolio, team] = await Promise.all([getPortfolio(locale), getTeam()]);

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
          <div className="people" id="people" style={{ '--cols': Math.min(4, team.length) } as CSSProperties}>
            {team.length ? (
              team.map((p) => {
                const led = portfolio
                  .filter((it) => it.startup.manager === p.name)
                  .map((it) => it.startup.name);
                const li = external(p.linkedin);
                return (
                  <article className="person" key={p.email}>
                    <div className={p.photo ? 'ph' : 'ph empty'}>
                      {p.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element -- optional portrait set in data
                        <img src={p.photo} alt={p.name} loading="lazy" />
                      ) : (
                        <Image src={mark} alt="" sizes="72px" />
                      )}
                    </div>
                    <h3>{p.name}</h3>
                    <p className="pos">{t(p.position)}</p>
                    {led.length > 0 && (
                      <p className="led">
                        <span>{t('Projects led')}</span>
                        {led.join(', ')}
                      </p>
                    )}
                    <p className="person-links">
                      {li && (
                        <a
                          href={li}
                          target="_blank"
                          rel="noopener"
                          aria-label={`${p.name} — LinkedIn`}
                          title="LinkedIn"
                        >
                          <LinkedinIcon />
                        </a>
                      )}
                      <a href={`mailto:${p.email}`} aria-label={p.email} title={p.email}>
                        <Mail />
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
