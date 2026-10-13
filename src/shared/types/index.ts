import type { Locale } from '@shared/i18n';

export type Localized<T> = Partial<Record<Locale, T>> & { en: T };

export type StartupStatus = 'draft' | 'new' | 'dd' | 'committee' | 'invested' | 'rejected' | 'exit';

export interface Owner {
  name: string;
  role: string;
  share: number;
}

export interface Startup {
  id: string;
  name: string;
  industry: string;
  stage: string;
  status: StartupStatus;
  city: string;
  country: string;
  invested: number;
  committeeDate: string;
  description: string;
  website: string;
  manager: string;
  owners: Owner[];
  /** Logins of the founder team in the Founder Account. */
  memberEmails: string[];
}

export interface PortfolioEntry {
  id: string;
  startupId: string;
  order: number;
  year: string;
  founder: string;
  founderRole: string;
  founderLinkedin: string;
  t: Localized<{ tagline?: string; quote?: string }>;
}

/** A portfolio entry joined with its startup, as the website shows it. */
export interface PortfolioItem {
  id: string;
  startup: Startup;
  entry: PortfolioEntry;
  text: string;
  quote: string;
}

export interface TeamMember {
  name: string;
  email: string;
  position: string;
  linkedin: string;
  photo: string;
}

export type NewsCategory = 'Fund' | 'Portfolio' | 'Events' | 'Press';

export interface NewsItem {
  id: string;
  date: string;
  category: NewsCategory;
  outlet?: string;
  url?: string;
  t: Localized<{ title: string; excerpt: string; body?: string }>;
}

export interface ContentPage {
  slug: string;
  t: Localized<{ title: string; body?: string }>;
}

export interface Source {
  name: string;
  text?: string;
  url?: string;
}

export interface Industry {
  id: string;
  name: string;
}
