import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { ApiError, withApi } from '@shared/api/server';
import { CONTENT_TAGS, type ContentTag } from '@shared/services/source';

const secretOk = (given: string) => {
  const expected = process.env.REVALIDATE_SECRET || '';
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
};

/**
 * POST /api/revalidate — refreshes cached content after an edit in ucode.
 * Call it from a ucode webhook/function with header `x-revalidate-secret: <REVALIDATE_SECRET>`
 * and body { "tags": ["news"] } (portfolio | news | team | pages; all when omitted).
 */
export const POST = withApi(
  async ({ req }) => {
    if (!secretOk(req.headers.get('x-revalidate-secret') ?? ''))
      throw new ApiError(401, 'unauthorized', 'Bad secret');
    const body = (await req.json().catch(() => ({}))) as { tags?: string[] };
    const tags = (body.tags?.length ? body.tags : CONTENT_TAGS).filter((t): t is ContentTag =>
      (CONTENT_TAGS as readonly string[]).includes(t),
    );
    tags.forEach((t) => revalidateTag(t, 'max'));
    return NextResponse.json({ revalidated: tags });
  },
  { rateLimit: { limit: 30, windowMs: 60_000 }, maxBytes: 4 * 1024 },
);
