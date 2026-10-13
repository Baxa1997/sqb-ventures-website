import { NextResponse } from 'next/server';
import { applicationExists } from '@modules/PitchUs/services/applications.server';
import { badRequest, withApi } from '@shared/api/server';

/** GET /api/applications/exists?email= — one deck per startup: tells the form to stop early. */
export const GET = withApi(
  async ({ req }) => {
    const email = req.nextUrl.searchParams.get('email')?.trim() ?? '';
    if (!email || email.length > 160) throw badRequest('email is required');
    return NextResponse.json({ exists: await applicationExists(email) });
  },
  { sameOrigin: true, rateLimit: { limit: 20, windowMs: 10 * 60_000 } },
);
