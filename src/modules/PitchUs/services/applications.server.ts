import 'server-only';
import { ApiError, badRequest, pickFields } from '@shared/api/server';
import { createItem, listItems, ucodeEnabled, uploadFile } from '@shared/api/ucode';
import { INDUSTRIES } from '@shared/data/industries';
import { STARTUPS } from '@shared/data/startups';
import { LOCALES } from '@shared/i18n';
import { HEARD_FROM, MAX_DECK_BYTES, STAGES } from '../constants';
import type { Credentials } from './pitch.service';

const DECK_TYPES = /\.(pdf|ppt|pptx)$/i;

/*
 * ucode table `applications` (TABLES.applications). Field slugs written:
 * ref, status, contact_name, email, phone, startup_name, website, industry, stage, one_liner,
 * ask_amount (number), source, pitch_deck (file link), locale, submitted_at
 */

/** True when an application with this email already exists (one deck per startup). */
export async function applicationExists(email: string): Promise<boolean> {
  const mail = email.trim().toLowerCase();
  if (!ucodeEnabled()) return STARTUPS.some((s) => s.memberEmails.includes(mail));
  const { count } = await listItems('applications', { filter: { email: mail }, limit: 1, fields: ['guid'] });
  return count > 0;
}

/** Reference shown to the founder, e.g. SQBV-2026-7K3QX9. */
const makeRef = () =>
  `SQBV-${new Date().getFullYear()}-${Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'[b % 32]).join('')}`;

/**
 * Checks the form, stores the pitch deck in ucode Files and creates the application row.
 * ucode functions on the table run for the new row (create the Founder Account, email the login).
 */
export async function submitApplication(form: FormData): Promise<Credentials> {
  const f = pickFields(form, {
    contactName: { required: true, max: 120 },
    email: { required: true, email: true, max: 160 },
    phone: { required: true, max: 40 },
    name: { required: true, max: 120 },
    website: { max: 200, url: true },
    industry: { required: true, oneOf: INDUSTRIES.map((i) => i.id) },
    stage: { required: true, oneOf: STAGES },
    oneLiner: { required: true, max: 200 },
    ask: { required: true, number: true, max: 15 },
    source: { required: true, oneOf: HEARD_FROM },
    locale: { oneOf: LOCALES },
  });
  if (form.get('consent') !== 'on') throw badRequest('Consent is required', { consent: 'required' });
  const deck = form.get('deck');
  if (!(deck instanceof File) || deck.size === 0)
    throw badRequest('Attach the pitch deck', { deck: 'required' });
  if (deck.size > MAX_DECK_BYTES)
    throw badRequest('The pitch deck is larger than 20 MB', { deck: 'too_large' });
  if (!DECK_TYPES.test(deck.name))
    throw badRequest('The pitch deck must be PDF or PPTX', { deck: 'invalid_type' });

  const email = f.email.toLowerCase();
  const ref = makeRef();

  if (!ucodeEnabled()) {
    // demo mode: nothing is stored, the login is made up so the flow can be tried end to end
    return { ref, login: email, password: Math.random().toString(36).slice(2, 10) };
  }

  if (await applicationExists(email))
    throw new ApiError(409, 'duplicate_application', 'An application with this email already exists');

  const file = await uploadFile(deck);
  await createItem(
    'applications',
    {
      ref,
      status: 'new',
      contact_name: f.contactName,
      email,
      phone: f.phone,
      startup_name: f.name,
      website: f.website,
      industry: f.industry,
      stage: f.stage,
      one_liner: f.oneLiner,
      ask_amount: Number(f.ask),
      source: f.source,
      pitch_deck: file.link,
      locale: f.locale || 'en',
      submitted_at: new Date().toISOString(),
    },
    true,
  );
  return { ref, login: email };
}
