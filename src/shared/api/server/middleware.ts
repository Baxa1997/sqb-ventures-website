import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { UcodeError } from '@shared/api/ucode/errors';
import { ApiError } from './errors';
import { takeToken, type RateLimit } from './rate-limit';

export interface ApiContext {
  req: NextRequest;
  requestId: string;
  ip: string;
}

interface ApiOptions {
  /** Requests per client IP for this route. */
  rateLimit?: RateLimit;
  /** Reject requests coming from other sites (CSRF). On for the browser-facing routes. */
  sameOrigin?: boolean;
  /** Largest accepted body in bytes. */
  maxBytes?: number;
}

export const clientIp = (req: NextRequest) =>
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

/** The browser sends Origin on POST; it must be this site. Sec-Fetch-Site covers the rest. */
function isSameOrigin(req: NextRequest) {
  const site = req.headers.get('sec-fetch-site');
  if (site && site !== 'same-origin' && site !== 'none') return false;
  const origin = req.headers.get('origin');
  if (!origin) return true;
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const error = (status: number, code: string, message: string, requestId: string, extra?: object) =>
  NextResponse.json(
    { error: { code, message, requestId, ...extra } },
    { status, headers: { 'x-request-id': requestId } },
  );

/**
 * Wraps a route handler with the API middleware chain:
 * request id → same-origin check → rate limit → body size limit → handler → JSON errors.
 * ucode errors are logged with their details and answered as 502 without leaking them.
 */
export function withApi(handler: (ctx: ApiContext) => Promise<Response>, options: ApiOptions = {}) {
  return async (req: NextRequest) => {
    const requestId = req.headers.get('x-request-id') || crypto.randomUUID();
    const ip = clientIp(req);
    const route = req.nextUrl.pathname;

    if (options.sameOrigin && !isSameOrigin(req))
      return error(403, 'forbidden_origin', 'Cross-site request refused', requestId);

    if (options.rateLimit) {
      const r = takeToken(`${route}:${ip}`, options.rateLimit);
      if (!r.ok) {
        const res = error(429, 'rate_limited', 'Too many requests', requestId);
        res.headers.set('retry-after', String(r.retryAfter));
        return res;
      }
    }

    const length = Number(req.headers.get('content-length') || 0);
    if (options.maxBytes && length > options.maxBytes)
      return error(413, 'payload_too_large', 'Request body is too large', requestId);

    try {
      const res = await handler({ req, requestId, ip });
      res.headers.set('x-request-id', requestId);
      res.headers.set('cache-control', 'no-store');
      return res;
    } catch (e) {
      if (e instanceof ApiError)
        return error(e.status, e.code, e.message, requestId, e.fields ? { fields: e.fields } : undefined);
      if (e instanceof UcodeError) {
        console.error(`[api ${requestId}] ${route}: ${e.message}`, e.details ?? '');
        return error(502, 'upstream_error', 'The service is temporarily unavailable', requestId);
      }
      console.error(`[api ${requestId}] ${route}:`, e);
      return error(500, 'internal_error', 'Unexpected error', requestId);
    }
  };
}
