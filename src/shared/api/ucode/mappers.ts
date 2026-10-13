import type { ContentPage, NewsCategory, NewsItem, PortfolioEntry, Startup, TeamMember } from '@shared/types';
import type { UcodeItem } from './items';

/*
 * ucode rows → website types. The field slugs each table needs:
 *
 * portfolio  name, industry, stage, status (active|exit), city, country, invested, year, website,
 *            founder, founder_role, founder_linkedin, manager, sort_order, is_visible,
 *            tagline_en, tagline_ru, tagline_uz, quote_en, quote_ru, quote_uz
 * news       slug, date, category (Fund|Portfolio|Events|Press), outlet, url, image, is_published,
 *            title_en|ru|uz, excerpt_en|ru|uz, body_en|ru|uz (HTML)
 * team       name, email, position, linkedin, photo, sort_order, is_visible
 * pages      slug, is_published, title_en|ru|uz, body_en|ru|uz (HTML)
 *
 * Rename a slug here if the ucode table uses another one.
 */

const str = (v: unknown) => (v == null ? '' : String(v));
const num = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);
/** ucode booleans may come as true/false, "true"/"false" or 1/0. Missing counts as true. */
const flag = (v: unknown) =>
  v === undefined || v === null || v === true || v === 'true' || v === 1 || v === '1';
/** File fields may be a link string or a list of links. */
const file = (v: unknown) => (Array.isArray(v) ? str(v[0]) : str(v));
const date = (v: unknown) => str(v).slice(0, 10);
const loc = <K extends string>(row: UcodeItem, keys: K[]) => {
  const out = { en: {}, ru: {}, uz: {} } as Record<'en' | 'ru' | 'uz', Partial<Record<K, string>>>;
  for (const l of ['en', 'ru', 'uz'] as const)
    for (const k of keys) out[l][k] = str(row[`${k}_${l}`]) || undefined;
  return out;
};

export function toPortfolio(row: UcodeItem): { startup: Startup; entry: PortfolioEntry } {
  const id = str(row.guid);
  const t = loc(row, ['tagline', 'quote']);
  return {
    startup: {
      id,
      name: str(row.name),
      industry: str(row.industry)
        .toLowerCase()
        .replace(/[^a-z]+/g, '-'),
      stage: str(row.stage),
      status: str(row.status).toLowerCase() === 'exit' ? 'exit' : 'invested',
      city: str(row.city),
      country: str(row.country),
      invested: num(row.invested),
      committeeDate: '',
      description: t.en.tagline ?? '',
      website: str(row.website),
      manager: str(row.manager),
      owners: [],
      memberEmails: [],
    },
    entry: {
      id,
      startupId: id,
      order: num(row.sort_order),
      year: str(row.year),
      founder: str(row.founder),
      founderRole: str(row.founder_role),
      founderLinkedin: str(row.founder_linkedin),
      t: { en: { tagline: t.en.tagline, quote: t.en.quote }, ru: t.ru, uz: t.uz },
    },
  };
}

const CATEGORIES: NewsCategory[] = ['Fund', 'Portfolio', 'Events', 'Press'];

export function toNews(row: UcodeItem): NewsItem {
  const raw = str(row.category).toLowerCase();
  const t = loc(row, ['title', 'excerpt', 'body']);
  return {
    id: str(row.slug) || str(row.guid),
    date: date(row.date),
    category: CATEGORIES.find((c) => c.toLowerCase() === raw) ?? 'Fund',
    outlet: str(row.outlet) || undefined,
    url: str(row.url) || undefined,
    image: file(row.image) || undefined,
    t: {
      en: { title: t.en.title ?? '', excerpt: t.en.excerpt ?? '', body: t.en.body },
      ru: t.ru.title ? { title: t.ru.title, excerpt: t.ru.excerpt ?? '', body: t.ru.body } : undefined,
      uz: t.uz.title ? { title: t.uz.title, excerpt: t.uz.excerpt ?? '', body: t.uz.body } : undefined,
    },
  };
}

export function toTeamMember(row: UcodeItem): TeamMember {
  return {
    name: str(row.name),
    email: str(row.email),
    position: str(row.position),
    linkedin: str(row.linkedin),
    photo: file(row.photo),
  };
}

export function toPage(row: UcodeItem): ContentPage {
  const t = loc(row, ['title', 'body']);
  return {
    slug: str(row.slug),
    t: {
      en: { title: t.en.title ?? '', body: t.en.body },
      ru: t.ru.title ? { title: t.ru.title, body: t.ru.body } : undefined,
      uz: t.uz.title ? { title: t.uz.title, body: t.uz.body } : undefined,
    },
  };
}

export const isVisible = (row: UcodeItem) => flag(row.is_visible);
export const isPublished = (row: UcodeItem) => flag(row.is_published);
export const sortOrder = (a: UcodeItem, b: UcodeItem) => num(a.sort_order) - num(b.sort_order);
