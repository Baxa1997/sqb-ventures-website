import type { PortfolioEntry } from '@shared/types';
import { STARTUPS } from './startups';

/* Sample founder quotes for the sample portfolio companies. */
const QUOTES: Record<string, string> = {
  s1: 'The bank gave us real repayment data to test the model on. No other investor could have done that.',
  s2: 'Our first twelve enterprise customers came through introductions from the fund.',
  s3: 'They helped us plan the harvest season financing, not only the round.',
  s12: 'From the pilot inside the bank to the acquisition, the team stayed next to us at every step.',
};

export const PORTFOLIO: PortfolioEntry[] = STARTUPS.filter(
  (s) => s.status === 'invested' || s.status === 'exit',
).map((s, i) => ({
  id: `f${i + 1}`,
  startupId: s.id,
  order: i + 1,
  year: s.committeeDate.slice(0, 4),
  founder: s.owners[0]?.name ?? '',
  founderRole: s.owners[0]?.role ?? '',
  founderLinkedin: 'https://www.linkedin.com/',
  t: { en: { tagline: s.description, quote: QUOTES[s.id] ?? '' } },
}));
