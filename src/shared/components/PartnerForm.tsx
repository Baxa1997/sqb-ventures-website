'use client';

import { useState, type FormEvent } from 'react';
import { createT, type Locale } from '@shared/i18n';
import { common } from '@shared/locales/common';
import { partner } from '@shared/locales/partner';
import { sendPartnerRequest, type PartnerRequest } from '@shared/services/partner.service';
import { clearError, validate } from '@shared/utils/validate';
import { Select } from './Select';

const COUNTRIES = [
  'Uzbekistan',
  'Kazakhstan',
  'Kyrgyzstan',
  'Tajikistan',
  'Turkmenistan',
  'United Arab Emirates',
  'Turkey',
  'United States',
  'Other',
];

/** "Become a partner" request, on For investors and Contacts. */
export function PartnerForm({ locale }: { locale: Locale }) {
  const t = createT(locale, common, partner);
  const [sent, setSent] = useState<PartnerRequest | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form, t)) return;
    const data = Object.fromEntries(new FormData(form)) as unknown as PartnerRequest;
    setBusy(true);
    try {
      await sendPartnerRequest(data);
      setSent(data);
    } finally {
      setBusy(false);
    }
  }

  if (sent)
    return (
      <div className="done-box" role="status">
        <h2>{t('Request sent')}</h2>
        <p style={{ marginTop: 10 }}>
          {t('Thank you, {name}. An investment manager will reply to {email} within three working days.', {
            name: sent.name,
            email: sent.email,
          })}
        </p>
      </div>
    );

  return (
    <form className="form" noValidate onSubmit={onSubmit} onInput={clearError} onChange={clearError}>
      <div className="row2">
        <label>
          {t('Full name')}
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          {t('Email')}
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="row2">
        <label>
          {t('Phone number')}
          <input name="phone" type="tel" required placeholder="+998 90 123-45-67" autoComplete="tel" />
        </label>
        <Select
          label={t('Country')}
          name="country"
          required
          placeholder={t('Select a country')}
          options={COUNTRIES.map((c) => ({ value: c, label: t(c) }))}
        />
      </div>
      <label>
        {t('Request')}
        <textarea
          name="request"
          required
          placeholder={t('Tell us who you are and how you would like to work with the fund')}
        />
      </label>
      <div>
        <button className="btn primary" disabled={busy}>
          {t('Send request')}
        </button>
      </div>
    </form>
  );
}
