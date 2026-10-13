import { NextResponse } from 'next/server';
import { badRequest, withApi } from '@shared/api/server';
import { createPartnerRequest } from '@shared/services/partner.server';

/** POST /api/partner-requests — "Become a partner" (JSON). */
export const POST = withApi(
  async ({ req }) => {
    const body = await req.json().catch(() => {
      throw badRequest('Expected a JSON body');
    });
    await createPartnerRequest(body as Record<string, unknown>);
    return NextResponse.json({ ok: true }, { status: 201 });
  },
  { sameOrigin: true, rateLimit: { limit: 5, windowMs: 10 * 60_000 }, maxBytes: 32 * 1024 },
);
