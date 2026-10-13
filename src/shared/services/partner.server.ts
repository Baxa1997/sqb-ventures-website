import 'server-only';
import { pickFields } from '@shared/api/server';
import { createItem, ucodeEnabled } from '@shared/api/ucode';
import { COUNTRIES } from '@shared/data/countries';
import { LOCALES } from '@shared/i18n';

/*
 * ucode table `partner_requests` (TABLES.partnerRequests). Field slugs written:
 * name, email, phone, country, request, locale, submitted_at
 */
export async function createPartnerRequest(body: Record<string, unknown>) {
  const f = pickFields(body, {
    name: { required: true, max: 120 },
    email: { required: true, email: true, max: 160 },
    phone: { required: true, max: 40 },
    country: { required: true, oneOf: COUNTRIES },
    request: { required: true, max: 3000 },
    locale: { oneOf: LOCALES },
  });
  if (!ucodeEnabled()) return; // demo mode
  await createItem(
    'partnerRequests',
    { ...f, email: f.email.toLowerCase(), locale: f.locale || 'en', submitted_at: new Date().toISOString() },
    true,
  );
}
