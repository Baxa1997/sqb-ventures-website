/** Browser → our own /api routes. The ucode API key stays on the server. */

export class ApiRequestError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, { ...init, credentials: 'same-origin' });
  } catch {
    throw new ApiRequestError(0, 'network_error', 'Network error');
  }
  const json = (await res.json().catch(() => ({}))) as {
    error?: { code?: string; message?: string; fields?: Record<string, string> };
  };
  if (!res.ok)
    throw new ApiRequestError(
      res.status,
      json.error?.code ?? 'error',
      json.error?.message ?? res.statusText,
      json.error?.fields,
    );
  return json as T;
}

/** A message for the visitor, in the page language via `t`. */
export function errorMessage(e: unknown, t: (s: string) => string) {
  if (e instanceof ApiRequestError && e.status === 429)
    return t('Too many attempts. Please wait a few minutes.');
  return t('Something went wrong. Please try again in a minute.');
}
