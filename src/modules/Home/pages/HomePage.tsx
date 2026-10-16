import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PostCard, SliderControls, Words, wordCount } from '@shared/components';
import { ROUTES, href } from '@shared/config';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { getPosts } from '@shared/services/news.service';
import { getPortfolio, isExit } from '@shared/services/portfolio.service';
import { initials } from '@shared/utils';
import { HeroShapes } from '../components/HeroShapes';
import { RotatingWord } from '../components/RotatingWord';
import { BENEFITS, PROCESS, ROTATING_WORDS } from '../constants';
import { dict } from '../locales';
import '../styles.css';

export async function HomePage({ locale }: { locale: Locale }) {
  const t = createT(locale, common, dict);
  const to = (path: string) => href(locale, path);
  const [portfolio, posts] = await Promise.all([getPortfolio(locale), getPosts()]);
  const quotes = portfolio.filter((i) => i.quote);
  const line1 = 'Beyond Capital —';

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <p className="eyebrow">{t('Corporate venture capital fund of SQB')}</p>
            <h1 className="words">
              <span>
                <Words text={line1} />
              </span>{' '}
              <em>
                <Words text="Create Value" start={wordCount(line1)} />
              </em>
            </h1>
            <p className="hero-lede">
              {t(
                'We invest in Seed and Pre-Series A technology companies from Central Asia and help them scale with the clients, infrastructure and expertise of SQB.',
              )}
            </p>
            <div className="acts">
              <Link className="btn primary" href={to(ROUTES.apply)}>
                Pitch Us <ArrowRight />
              </Link>
              <Link className="btn text" href={`${to(ROUTES.investors)}#partner`}>
                {t('Co-invest with us')} <ArrowRight />
              </Link>
            </div>
            <dl className="hero-terms">
              <div>
                <dt>{t('Fund size')}</dt>
                <dd>$10M</dd>
              </div>
              <div>
                <dt>{t('Ticket size')}</dt>
                <dd>$50K – $500K</dd>
              </div>
              <div>
                <dt>{t('Focus sectors')}</dt>
                <dd>FinTech · B2B SaaS · AI</dd>
              </div>
            </dl>
          </div>
        </div>
        <HeroShapes />
      </section>

      <section className="sec white story">
        <div className="wrap split">
          <div>
            <h2 className="mk words">
              <Words text={t('Our Story')} />
            </h2>
            <dl className="bigstats">
              <div>
                <dd data-count="">$10M</dd>
                <dt>{t('Fund')}</dt>
              </div>
              <div>
                <dd data-count="">$500K</dd>
                <dt>{t('Investment, up to')}</dt>
              </div>
              <div>
                <dd data-count="">{portfolio.length}</dd>
                <dt>{t('Portfolio companies')}</dt>
              </div>
              <div>
                <dd data-count="">{portfolio.filter(isExit).length}</dd>
                <dt>{t('Exits')}</dt>
              </div>
              <div>
                <dd data-count="">15%</dd>
                <dt>{t('Stake, up to')}</dt>
              </div>
              <div>
                <dd>Seed</dd>
                <dt>{t('and Pre-Series A')}</dt>
              </div>
            </dl>
          </div>
          <div className="story-text reveal">
            <p className="lede">
              {t(
                'A $10 million venture capital fund supporting early-stage teams from first traction through scale.',
              )}
            </p>
            <p>
              <Link className="btn" href={to(ROUTES.about)}>
                {t('More')}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sec pale">
        <div className="wrap">
          <div className="sec-h">
            <h2 className="mk words">
              <Words text={t('What founders get besides money')} />
            </h2>
          </div>
        </div>
        <div className="marquee">
          <div className="track">
            {[false, true].map((copy) =>
              BENEFITS.map(({ icon: Icon, title, text }) => (
                <div className="prop" key={`${title}${copy}`} aria-hidden={copy || undefined}>
                  <Icon />
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </div>
              )),
            )}
          </div>
        </div>
      </section>

      <section className="sec blue statement">
        <div className="wrap">
          <h2 className="words">
            <Words
              text={t(
                'Capital is a commodity. Our real edge is access to regulators, to the banking infrastructure of SQB and to strategic partners in the region.',
              )}
            />
          </h2>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <div className="sec-h">
            <h2 className="mk words">
              <Words text={t('How an application moves')} />
            </h2>
          </div>
          <ol className="slides" id="process" tabIndex={0} aria-label={t('How an application moves')}>
            {PROCESS.map(([title, text]) => (
              <li key={title}>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </li>
            ))}
          </ol>
          <div className="slider-nav">
            <Link className="btn" href={to(ROUTES.founders)}>
              {t('Details for startups')}
            </Link>
            <SliderControls target="process" prevLabel={t('Previous step')} nextLabel={t('Next step')} />
          </div>
        </div>
      </section>

      {quotes.length > 0 && (
        <section className="sec white founders">
          <div className="wrap">
            <div className="pill-h">
              <Link className="pill-label words" href={to(ROUTES.portfolio)}>
                <Words text={t('Meet the founders')} />
              </Link>
              <SliderControls target="homeFounders" prevLabel={t('Previous')} nextLabel={t('Next')} />
            </div>
            <div className="slides fcards" id="homeFounders" tabIndex={0}>
              {quotes.map((it) => (
                <Link className="fcard" key={it.id} href={to(`${ROUTES.portfolio}/${it.id}`)}>
                  <span className="av">{initials(it.entry.founder || it.startup.name)}</span>
                  <blockquote>“{it.quote}”</blockquote>
                  <span className="who">
                    <b>{it.entry.founder}</b>
                    <span>{[it.entry.founderRole, it.startup.name].filter(Boolean).join(', ')}</span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="center">
              <Link className="btn" href={to(ROUTES.portfolio)}>
                {t('All companies')}
              </Link>
            </p>
          </div>
        </section>
      )}

      <section className="sec white">
        <div className="wrap cols2">
          <div className="panel reveal">
            <h2>{t('For startups')}</h2>
            <ul>
              <li>{t('Pilots and integrations with the bank')}</li>
              <li>{t('Mentorship in business development, legal, PR and marketing')}</li>
              <li>{t('Follow-on investment and access to new markets')}</li>
            </ul>
            <Link className="btn" href={to(ROUTES.apply)}>
              Pitch Us
            </Link>
          </div>
          <div className="panel blue reveal">
            <h2>{t('For investors')}</h2>
            <ul>
              <li>{t('Pitch sessions and access to reviewed deal flow')}</li>
              <li>{t('Direct introductions to startups for co-investment')}</li>
              <li>{t('Shared due diligence materials for each deal')}</li>
            </ul>
            <Link className="btn" href={`${to(ROUTES.investors)}#partner`}>
              {t('Become a partner')}
            </Link>
          </div>
        </div>
      </section>

      <section className="sec pale">
        <div className="wrap">
          <div className="pill-h">
            <Link className="pill-label words" href={to(ROUTES.news)}>
              <Words text="Content Hub" />
            </Link>
            <Link className="btn" href={to(ROUTES.news)}>
              {t('All insights')}
            </Link>
          </div>
          <div className="post-grid swipe">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.id} post={p} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <p className="tagline">
            <RotatingWord words={ROTATING_WORDS.map((w) => t(w))} />{' '}
            <em className="words">
              <Words text={t('beyond capital')} />
            </em>
          </p>
          <p className="lede">
            {t('Want to share with us your story and what you are building? It takes just a few clicks.')}
          </p>
          <p>
            <Link className="btn" href={to(ROUTES.apply)}>
              Pitch Us
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
