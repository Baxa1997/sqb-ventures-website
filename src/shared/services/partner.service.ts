import { SITE } from '@shared/config';

export interface PartnerRequest {
  name: string;
  email: string;
  phone: string;
  country: string;
  request: string;
}

/** Sends a partnership request. Without NEXT_PUBLIC_API_URL it runs in demo mode. */
export async function sendPartnerRequest(data: PartnerRequest): Promise<void> {
  if (!SITE.apiUrl) {
    await new Promise((r) => setTimeout(r, 300));
    return;
  }
  const res = await fetch(`${SITE.apiUrl}/partner-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
}
