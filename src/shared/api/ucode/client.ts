import 'server-only';
import { UCODE } from './config';
import { UcodeError } from './errors';

type Query = Record<string, string | number | boolean | undefined>;

export interface UcodeRequest {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** Path after the base URL, e.g. /v2/items/news */
  path: string;
  query?: Query;
  /** JSON body (wrapped by the caller as ucode expects, e.g. { data: {...} }) or FormData for files. */
  body?: unknown;
  /** Cache the response for this many seconds and tag it, so /api/revalidate can refresh it. GET only. */
  cache?: { revalidate?: number; tags?: string[] };
  /** Extra attempts for GET requests on timeouts, 429 and 5xx. */
  retries?: number;
}

/** The headers every ucode call carries (as the official ucode SDKs send them): the API key and, when set, resource and environment. */
export function ucodeHeaders(): Record<string, string> {
  const h: Record<string, string> = { authorization: 'API-KEY', 'X-API-KEY': UCODE.apiKey };
  if (UCODE.resourceId) h['Resource-Id'] = UCODE.resourceId;
  if (UCODE.environmentId) h['Environment-Id'] = UCODE.environmentId;
  return h;
}

function buildUrl(path: string, query?: Query) {
  const url = new URL(UCODE.baseUrl + (path.startsWith('/') ? path : `/${path}`));
  for (const [k, v] of Object.entries(query ?? {})) if (v !== undefined) url.searchParams.set(k, String(v));
  return url;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** One call to the ucode API. Throws UcodeError with the platform's answer on failure. */
export async function ucodeFetch<T>(req: UcodeRequest): Promise<T> {
  const method = req.method ?? 'GET';
  const url = buildUrl(req.path, req.query);
  const isForm = typeof FormData !== 'undefined' && req.body instanceof FormData;
  const headers: Record<string, string> = { ...ucodeHeaders(), accept: 'application/json' };
  if (req.body !== undefined && !isForm) headers['content-type'] = 'application/json';

  const attempts = 1 + (method === 'GET' ? (req.retries ?? 1) : 0);
  let last: UcodeError | undefined;

  for (let i = 0; i < attempts; i++) {
    if (i) await sleep(300 * 2 ** (i - 1));
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: req.body === undefined ? undefined : isForm ? (req.body as FormData) : JSON.stringify(req.body),
        signal: AbortSignal.timeout(UCODE.timeoutMs),
        ...(method === 'GET' && req.cache
          ? { next: { revalidate: req.cache.revalidate ?? UCODE.revalidate, tags: req.cache.tags } }
          : { cache: 'no-store' as const }),
      });
      const text = await res.text();
      let json: unknown = undefined;
      try {
        json = text ? JSON.parse(text) : undefined;
      } catch {
        json = text;
      }
      if (!res.ok) {
        const msg =
          (json as { description?: string; message?: string } | undefined)?.description ||
          (json as { message?: string } | undefined)?.message ||
          res.statusText;
        throw new UcodeError(`ucode ${method} ${url.pathname}: ${res.status} ${msg}`, res.status, json);
      }
      return json as T;
    } catch (e) {
      last =
        e instanceof UcodeError
          ? e
          : new UcodeError(
              `ucode ${method} ${url.pathname}: ${(e as Error).name === 'TimeoutError' ? 'timeout' : (e as Error).message}`,
              0,
            );
      if (!last.retryable) break;
    }
  }
  throw last;
}
