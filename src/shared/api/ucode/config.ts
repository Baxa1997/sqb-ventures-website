import 'server-only';

/**
 * ucode platform settings. Server-only: the API key never reaches the browser.
 * Set them in the environment (see .env.example). Without UCODE_API_KEY the site runs on the
 * sample content in src/shared/data and the forms answer in demo mode.
 */
export const UCODE = {
  /** Items, files and functions API, e.g. https://api.client.u-code.io */
  baseUrl: (process.env.UCODE_BASE_URL || 'https://api.client.u-code.io').replace(/\/+$/, ''),
  /** Project API key (ucode: Settings → API keys). Sent as X-API-KEY. */
  apiKey: process.env.UCODE_API_KEY || '',
  /** Optional, for projects with several resources or environments. */
  projectId: process.env.UCODE_PROJECT_ID || '',
  resourceId: process.env.UCODE_RESOURCE_ID || '',
  environmentId: process.env.UCODE_ENVIRONMENT_ID || '',
  /** Folder in ucode Files for uploaded pitch decks. */
  decksFolder: process.env.UCODE_DECKS_FOLDER || 'PitchDecks',
  timeoutMs: Number(process.env.UCODE_TIMEOUT_MS) || 15000,
  /** How long content read from ucode is cached before it is fetched again (seconds). */
  revalidate: Number(process.env.UCODE_REVALIDATE_SECONDS) || 300,
} as const;

export const ucodeEnabled = () => UCODE.apiKey.length > 0;

/**
 * ucode table slugs. Override any of them with UCODE_TABLE_<NAME>, e.g. UCODE_TABLE_NEWS=site_news.
 * The field slugs each table needs are listed in mappers.ts and the README.
 */
export const TABLES = {
  applications: process.env.UCODE_TABLE_APPLICATIONS || 'applications',
  partnerRequests: process.env.UCODE_TABLE_PARTNER_REQUESTS || 'partner_requests',
  portfolio: process.env.UCODE_TABLE_PORTFOLIO || 'portfolio',
  news: process.env.UCODE_TABLE_NEWS || 'news',
  team: process.env.UCODE_TABLE_TEAM || 'team',
  pages: process.env.UCODE_TABLE_PAGES || 'pages',
} as const;

export type TableName = keyof typeof TABLES;
