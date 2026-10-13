import 'server-only';
import { ucodeEnabled } from '@shared/api/ucode';

/**
 * Reads content from ucode when it is configured, from the sample data otherwise.
 * If ucode fails, the error is logged and `onError` is shown (an empty list, never sample data):
 * during a refresh Next.js keeps serving the last good page, and the next refresh tries again.
 */
export async function fromSource<T>(
  name: string,
  remote: () => Promise<T>,
  sample: () => T,
  onError: T,
): Promise<T> {
  if (!ucodeEnabled()) return sample();
  try {
    return await remote();
  } catch (e) {
    console.error(`[content] ${name}: ${(e as Error).message}`);
    return onError;
  }
}

/** Cache tags; POST /api/revalidate with one of them refreshes the pages that use it. */
export const CONTENT_TAGS = ['portfolio', 'news', 'team', 'pages'] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];
