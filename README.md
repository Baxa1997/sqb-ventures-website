# SQB Ventures — website

Public website of SQB Ventures in **Next.js 16 (App Router) + TypeScript**, rebuilt from the October
prototype with the same design (brandbook colours, Mulish, layout and motion).

- Three languages: **UZ / RU / EN** at `/uz/…`, `/ru/…`, `/en/…`
- Every page is **prerendered to static HTML** at build time (in all three languages)
- No UI framework, no icon font: plain CSS (≈7 KB gzipped) and tree-shaken `lucide-react` icons
- The Pitch Us form is loaded only when someone opens it

## Getting started

```bash
nvm use            # Node 22
yarn install
cp .env.example .env.local
yarn dev           # http://localhost:3000
```

| Script               | What it does                                         |
| -------------------- | ---------------------------------------------------- |
| `yarn dev`           | Development server                                   |
| `yarn build`         | Production build (static pages + standalone server)  |
| `yarn start`         | Runs the production build                            |
| `yarn lint`          | ESLint (Next.js core-web-vitals + TypeScript rules)  |
| `yarn typecheck`     | `tsc --noEmit`                                       |
| `yarn check:locales` | Lists texts that have no Russian / Uzbek translation |

### Docker

```bash
docker compose up --build   # http://localhost:3000
```

## Environment

Copy `.env.example` to `.env.local` (development) or `.env` (Docker) and fill it in.

| Variable                                                        | Where  | Purpose                                                        |
| --------------------------------------------------------------- | ------ | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                          | public | Public URL: canonical links, sitemap, Open Graph               |
| `NEXT_PUBLIC_FOUNDER_ACCOUNT_URL`                               | public | Where the "Founder Account" links point                        |
| `UCODE_BASE_URL`                                                | server | ucode API, default `https://api.client.u-code.io`              |
| `UCODE_API_KEY`                                                 | server | ucode project API key. **Empty = sample content + demo forms** |
| `UCODE_RESOURCE_ID`, `UCODE_ENVIRONMENT_ID`, `UCODE_PROJECT_ID` | server | Only for projects with several resources / environments        |
| `UCODE_TABLE_*`                                                 | server | Table slugs, if yours differ from the defaults (see below)     |
| `UCODE_DECKS_FOLDER`                                            | server | ucode Files folder for pitch decks (default `PitchDecks`)      |
| `UCODE_TIMEOUT_MS`, `UCODE_REVALIDATE_SECONDS`                  | server | Request timeout; content cache time (default 300 s)            |
| `REVALIDATE_SECRET`                                             | server | Secret for `POST /api/revalidate`                              |

## ucode integration

```
Browser ──► /api/* (Next.js route handlers) ──► ucode  (X-API-KEY added on the server)
Pages   ──► shared/services/* ─────────────────► ucode  (cached, refreshed every 5 min or on webhook)
```

The API key is only read on the server (`src/shared/api/ucode/config.ts` imports `server-only`).
The browser talks to the site's own `/api` routes, never to ucode directly.

**Client** — `src/shared/api/ucode/`

- `client.ts`: every call sends `authorization: API-KEY` and `X-API-KEY` (plus `Resource-Id` /
  `Environment-Id` when set), with a timeout, one retry for GETs on timeouts/429/5xx, and errors as
  `UcodeError`.
- `items.ts`: `listItems`, `listAll`, `getItem`, `createItem`, `updateItem`, `deleteItem` over
  `/v2/items/{table}` (bodies wrapped as `{ data, disable_faas }`, as the ucode SDKs do).
- `files.ts`: `uploadFile` → `POST /v1/files/folder_upload`.
- `mappers.ts`: ucode rows → website types. **The field slugs live here.**

**API routes** (all wrapped by `withApi` in `src/shared/api/server/middleware.ts`: request id,
same-origin check, per-IP rate limit, body size limit, JSON errors; ucode errors are logged and
answered as `502` without details)

| Route                                 | Does                                                          | Limit       |
| ------------------------------------- | ------------------------------------------------------------- | ----------- |
| `POST /api/applications` (multipart)  | Validates, uploads the deck to Files, creates the application | 5 / 10 min  |
| `GET /api/applications/exists?email=` | One deck per startup: is the email already used?              | 20 / 10 min |
| `POST /api/partner-requests` (JSON)   | Validates and creates a partner request                       | 5 / 10 min  |
| `POST /api/revalidate`                | Refreshes cached content; header `x-revalidate-secret`        | 30 / min    |
| `GET /api/health`                     | `{ ok, ucode: "configured" \| "demo" }` for uptime checks     | —           |

The rate limit is kept in memory per container; with several replicas add a shared limiter in front.

**Tables and field slugs** (create these in ucode, or rename the slugs in `mappers.ts` /
`applications.server.ts` / `partner.server.ts`)

| Table (`UCODE_TABLE_…`)      | Fields                                                                                                                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applications` (written)     | ref, status, contact_name, email, phone, startup_name, website, industry, stage, one_liner, ask_amount (number), source, pitch_deck, locale, submitted_at                                       |
| `partner_requests` (written) | name, email, phone, country, request, locale, submitted_at                                                                                                                                      |
| `portfolio` (read)           | name, industry, stage, status (active/exit), city, country, invested, year, website, founder, founder_role, founder_linkedin, manager, sort_order, is_visible, tagline_en/ru/uz, quote_en/ru/uz |
| `news` (read)                | slug, date, category (Fund/Portfolio/Events/Press), outlet, url, image, is_published, title_en/ru/uz, excerpt_en/ru/uz, body_en/ru/uz (HTML)                                                    |
| `team` (read)                | name, email, position, linkedin, photo, sort_order, is_visible                                                                                                                                  |
| `pages` (read)               | slug, is_published, title_en/ru/uz, body_en/ru/uz (HTML)                                                                                                                                        |

Rows are created with `disable_faas: false`, so ucode functions on `applications` can create the
Founder Account and email the login (the success screen then says the login was emailed).

**Keeping pages fresh.** Content pages are prerendered and re-read from ucode at most every
`UCODE_REVALIDATE_SECONDS`. To publish at once, call this from a ucode function/webhook after an edit:

```bash
curl -X POST https://<site>/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" -H "content-type: application/json" \
  -d '{"tags":["news"]}'          # portfolio | news | team | pages; all when omitted
```

New portfolio companies, news posts and pages get their URL on first visit (no rebuild needed).
If ucode is unreachable, the last good page keeps being served and the error is logged.

**Docker.** The build prerenders pages from ucode, so pass the key as a build secret (it is not
stored in the image) and the rest at runtime:

```bash
UCODE_API_KEY=... docker compose up --build     # compose passes it as the ucode_api_key secret
```

## Structure

```
src/
├── app/                    Routes only: each page.tsx renders a module page
│   ├── [lang]/             layout (html, header, footer), one folder per route
│   ├── sitemap.ts, robots.ts
├── assets/                 fonts (Mulish) and logo images
├── modules/                One folder per page / feature
│   ├── Home/
│   │   ├── components/     parts used only by this module
│   │   ├── constants/      static content (lists, steps)
│   │   ├── locales/        RU / UZ translations of this module's texts
│   │   ├── pages/          the page component
│   │   ├── styles.css      styles loaded only with this page
│   │   └── index.ts        public exports
│   ├── About/  Founders/  Focus/  Portfolio/  Insights/
│   ├── Investors/  Contacts/  PitchUs/  Legal/  NotFound/
├── shared/
│   ├── components/         Header, Footer, PageHead, PartnerForm, motion…
│   ├── config/             routes, navigation, site settings
│   ├── data/               sample content (portfolio, team, news, pages)
│   ├── i18n/               locales and the translate function
│   ├── locales/            translations shared by several modules
│   ├── services/           data access (portfolio, news, partner requests)
│   ├── styles/             tokens, fonts, base, header/footer, motion
│   ├── types/  utils/
└── proxy.ts                sends paths without a language to the visitor's one
```

## Translations

English text is the key. Each dictionary maps it to `[Russian, Uzbek]`:

```ts
export const dict: Dict = {
  'Our Story': ['Наша история', 'Bizning tarix'],
};
```

Pages call `createT(locale, common, dict)` and write `t('Our Story')`. A text with no entry stays in
English. Run `yarn check:locales` after adding texts.

## Content

Portfolio companies, team members, founder quotes, news and contact details in `src/shared/data` are
**sample content** carried over from the prototype. Replace them, or point the services in
`src/shared/services` at the CMS / CRM.

Video slots on For Founders and For investors show a placeholder until a file is set
(`FOUNDERS_VIDEO` in `src/modules/Founders/constants`, `INVESTORS_VIDEO` in the Investors page).

## Not included

The **Founder Account** (cabinet) and the fund's admin/CRM from the prototype are separate apps and are
not part of this repository. Links to the Founder Account use `NEXT_PUBLIC_FOUNDER_ACCOUNT_URL`.
