import { apiFetch } from '@shared/api/client';

export interface PartnerRequest {
  name: string;
  email: string;
  phone: string;
  country: string;
  request: string;
  locale?: string;
}

/** Sends a partnership request to /api/partner-requests. */
export async function sendPartnerRequest(data: PartnerRequest): Promise<void> {
  await apiFetch('/api/partner-requests', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });
}
