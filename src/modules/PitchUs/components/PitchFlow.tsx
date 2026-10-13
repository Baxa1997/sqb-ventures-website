'use client';

import { ArrowRight, Check, Clock, FileUp, MailCheck, RotateCcw, Target } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ROUTES, SITE, href } from '@shared/config';
import { INDUSTRIES } from '@shared/data/industries';
import { createT, type Locale, type TFunction } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { partner } from '@shared/locales/partner';
import { validate } from '@shared/utils/validate';
import { FAQ, HEARD_FROM, MAX_DECK_BYTES, STAGES, STEPS } from '../constants';
import { clearDraft, readDraft, saveDraft } from '../helpers/draft';
import { dict } from '../locales';
import { emailTaken, submitApplication, type Credentials } from '../services/pitch.service';
import '../styles.css';

type View = { name: 'intro' } | { name: 'form' } | { name: 'done'; creds: Credentials };

/** "Pitch Us": intro, a three-step application and the Founder Account login. */
export function PitchFlow(props: { locale: Locale; onTop?: () => void }) {
  return (
    <div className="pitch-flow">
      <PitchView {...props} />
    </div>
  );
}

function PitchView({ locale, onTop }: { locale: Locale; onTop?: () => void }) {
  const t = createT(locale, common, partner, dict);
  const [view, setView] = useState<View>({ name: 'intro' });
  const go = (v: View) => {
    setView(v);
    onTop?.();
  };

  if (view.name === 'intro')
    return (
      <div className="pitch-intro">
        <h2 className="caps">{t('Get funded by SQB Ventures')}</h2>
        <p className="lede">{t('Share with us your story and what you are building.')}</p>
        <p className="note">
          {t(
            'Reminder: we accept one deck per startup because of the high number of applicants, and we respond as soon as possible.',
          )}
        </p>
        <h3 className="sub-h">{t('Before you start')}</h3>
        <div className="pre">
          <div>
            <FileUp />
            <h4>{t('What you need')}</h4>
            <p>
              {t('Your pitch deck as a PDF or PPTX file up to 20 MB, and one sentence about your startup.')}
            </p>
          </div>
          <div>
            <Target />
            <h4>{t('Who we back')}</h4>
            <p>
              {t(
                'Seed and Pre-Series A teams in FinTech, B2B SaaS, Vertical AI, marketplaces and e-commerce. First investment from $50K to $500K.',
              )}
            </p>
          </div>
          <div>
            <MailCheck />
            <h4>{t('What happens next')}</h4>
            <p>
              {t(
                'You get a reference number and a Founder Account. We reply by email within ten working days.',
              )}
            </p>
          </div>
        </div>
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{t(q)}</summary>
            <p>{t(a)}</p>
          </details>
        ))}
        <div className="grow" />
        <div className="pitch-foot">
          <span className="foot-note">
            <Clock /> {t('About 5 minutes, 3 steps')}
          </span>
          <button type="button" className="btn primary" onClick={() => go({ name: 'form' })} autoFocus>
            {t('Start application')} <ArrowRight />
          </button>
        </div>
      </div>
    );

  if (view.name === 'done') {
    const { creds } = view;
    const account = `${SITE.founderAccountUrl}?email=${encodeURIComponent(creds.login)}`;
    return (
      <>
        <Stepper t={t} step={STEPS.length} />
        <div className="pitch-done">
          <h2>{t('Thank you!')}</h2>
          <p className="lede">
            {t('We will reach you via email, or you can track your progress in your Founder Account.')}
          </p>
          <dl className="creds">
            <dt>{t('Reference number')}</dt>
            <dd>{creds.ref}</dd>
            <dt>{t('Login')}</dt>
            <dd>{creds.login}</dd>
            <dt>{t('Password')}</dt>
            <dd>{creds.password}</dd>
          </dl>
          <p className="hint">{t('Save the login and password now. We reply within ten working days.')}</p>
          <div className="grow" />
          <div className="pitch-foot">
            <button type="button" className="btn" onClick={() => go({ name: 'intro' })}>
              <RotateCcw /> {t('Reload')}
            </button>
            <a className="btn primary" href={account}>
              {t('Open Founder Account')} <ArrowRight />
            </a>
          </div>
        </div>
      </>
    );
  }

  return <PitchForm locale={locale} t={t} onTop={onTop} onDone={(creds) => go({ name: 'done', creds })} />;
}

/** Three numbered steps; finished ones show a tick and can be revisited. */
function Stepper({ t, step, onPick }: { t: TFunction; step: number; onPick?: (n: number) => void }) {
  return (
    <ol className="stepper" aria-label={t('Progress')}>
      {STEPS.map((name, i) => {
        const state = i < step ? 'done' : i === step ? 'on' : '';
        return (
          <li key={name} className={state} aria-current={i === step ? 'step' : undefined}>
            <button type="button" disabled={!onPick || i >= step} onClick={() => onPick?.(i)}>
              <span className="dot">{i < step ? <Check /> : i + 1}</span>
              <span className="name">{t(name)}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

interface PitchFormProps {
  locale: Locale;
  t: TFunction;
  onTop?: () => void;
  onDone: (creds: Credentials) => void;
}

function PitchForm({ locale, t, onTop, onDone }: PitchFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState<{ text: string; account?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const last = step === STEPS.length - 1;

  // restore the draft once the fields exist
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const draft = readDraft();
    for (const [k, v] of Object.entries(draft)) {
      const field = form.elements.namedItem(k);
      const ok =
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement;
      if (ok && field.type !== 'file' && field.type !== 'checkbox') field.value = v;
    }
    setCount(draft.oneLiner?.length ?? 0);
  }, []);

  const show = (n: number) => {
    setStep(n);
    setMsg(null);
    onTop?.();
  };

  // move the cursor to the first field of the step, so typing can start right away
  useEffect(() => {
    formRef.current
      ?.querySelectorAll<HTMLElement>('.stepbox')
      [step]?.querySelector<HTMLElement>('input, select, textarea')
      ?.focus({ preventScroll: true });
  }, [step]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const box = form.querySelectorAll<HTMLElement>('.stepbox')[step];
    if (!validate(box, t)) return;
    const data = new FormData(form);
    setBusy(true);
    try {
      if (step === 0 && (await emailTaken(String(data.get('email'))))) {
        const mail = String(data.get('email')).trim().toLowerCase();
        setMsg({
          text: t('An application with this email already exists. We accept one deck per startup.'),
          account: `${SITE.founderAccountUrl}?email=${encodeURIComponent(mail)}`,
        });
        return;
      }
      const deck = data.get('deck');
      if (last && deck instanceof File && deck.size > MAX_DECK_BYTES) {
        setMsg({ text: t('The file is larger than 20 MB. Attach a smaller one.') });
        return;
      }
      if (!last) return show(step + 1);
      const creds = await submitApplication(data);
      clearDraft();
      onDone(creds);
    } finally {
      setBusy(false);
    }
  }

  const box = (i: number) => (i === step ? 'stepbox on' : 'stepbox');

  return (
    <>
      <p className="hi">{t('Hi founder, just a few clicks and you can submit your application')}</p>
      <Stepper t={t} step={step} onPick={show} />
      <form
        ref={formRef}
        className="pitch-form"
        noValidate
        onSubmit={onSubmit}
        onInput={(e) => {
          saveDraft(e.currentTarget);
          setCount((e.currentTarget.elements.namedItem('oneLiner') as HTMLTextAreaElement).value.length);
        }}
      >
        <div className={box(0)}>
          <h3>{t(STEPS[0])}</h3>
          <div className="form">
            <label>
              {t('Full name')}
              <input name="contactName" required autoComplete="name" />
            </label>
            <div className="row2">
              <label>
                {t('Email')}
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                {t('Phone or Telegram')}
                <input name="phone" required autoComplete="tel" />
              </label>
            </div>
          </div>
        </div>
        <div className={box(1)}>
          <h3>{t(STEPS[1])}</h3>
          <div className="form">
            <div className="row2">
              <label>
                {t('Startup name')}
                <input name="name" required />
              </label>
              <label>
                {t('Website')}
                <input name="website" inputMode="url" autoComplete="url" />
              </label>
            </div>
            <div className="row2">
              <label>
                {t('Industry')}
                <select name="industry" required defaultValue="">
                  <option value="">{t('Select an industry')}</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t('Stage')}
                <select name="stage" required defaultValue="">
                  <option value="">{t('Select a stage')}</option>
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              {t('Describe your startup in one sentence')}
              <textarea name="oneLiner" required maxLength={200} rows={2} />
              <small className="count">{count} / 200</small>
            </label>
            <label>
              {t('Amount you are raising, USD')}
              <input name="ask" type="number" min={0} step={1000} required inputMode="numeric" />
            </label>
          </div>
        </div>
        <div className={box(2)}>
          <h3>{t(STEPS[2])}</h3>
          <div className="form">
            <label>
              {t('Pitch deck')} <small>{t('PDF or PPTX, up to 20 MB')}</small>
              <input name="deck" type="file" accept=".pdf,.ppt,.pptx" required />
            </label>
            <label>
              {t('How did you hear about us?')}
              <select name="source" required defaultValue="">
                <option value="">{t('Select an option')}</option>
                {HEARD_FROM.map((s) => (
                  <option key={s} value={s}>
                    {t(s)}
                  </option>
                ))}
              </select>
            </label>
            <label className="check">
              <input type="checkbox" name="consent" required />
              <span>
                {t(
                  'I confirm the information is accurate and agree to the processing of this data as described in the',
                )}{' '}
                <Link href={href(locale, ROUTES.privacy)} target="_blank">
                  {t('privacy policy')}
                </Link>
              </span>
            </label>
          </div>
        </div>
        {msg && (
          <p className="form-msg" role="alert">
            {msg.text} {msg.account && <a href={msg.account}>{t('Sign in to your Founder Account')}</a>}
          </p>
        )}
        <div className="grow" />
        <div className="pitch-foot">
          <button
            type="button"
            className="btn"
            style={{ visibility: step ? 'visible' : 'hidden' }}
            onClick={() => show(step - 1)}
          >
            {t('Back')}
          </button>
          <span className="foot-note">
            {t('Step {n} of {total}', { n: step + 1, total: STEPS.length })}
            <span className="saved"> · {t('Draft saved in this browser')}</span>
          </span>
          <button className="btn primary" disabled={busy}>
            {last ? (
              t('Submit')
            ) : (
              <>
                {t('Continue')} <ArrowRight />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
