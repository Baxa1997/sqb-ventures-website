import { NextResponse } from 'next/server';
import { submitApplication } from '@modules/PitchUs/services/applications.server';
import { badRequest, withApi } from '@shared/api/server';

/** POST /api/applications — the Pitch Us form (multipart, with the pitch deck). */
export const POST = withApi(
  async ({ req }) => {
    const form = await req.formData().catch(() => {
      throw badRequest('Expected multipart/form-data');
    });
    return NextResponse.json(await submitApplication(form), { status: 201 });
  },
  { sameOrigin: true, rateLimit: { limit: 5, windowMs: 10 * 60_000 }, maxBytes: 21 * 1024 * 1024 },
);
