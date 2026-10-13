import 'server-only';

/**
 * Fixed-window rate limit kept in memory, per server instance. Enough for one container;
 * behind several replicas put a shared limiter (e.g. at the load balancer or in Redis) in front.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export interface RateLimit {
  /** Requests allowed per window. */
  limit: number;
  windowMs: number;
}

export function takeToken(key: string, { limit, windowMs }: RateLimit) {
  const now = Date.now();
  if (buckets.size > 10_000) for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  let b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(key, b);
  }
  b.count++;
  return {
    ok: b.count <= limit,
    remaining: Math.max(0, limit - b.count),
    retryAfter: Math.ceil((b.resetAt - now) / 1000),
  };
}
