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

| Variable                          | Purpose                                                                   |
| --------------------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Public URL, used for canonical links, sitemap and Open Graph              |
| `NEXT_PUBLIC_API_URL`             | Backend for Pitch Us and partner requests. Empty = demo mode (no network) |
| `NEXT_PUBLIC_FOUNDER_ACCOUNT_URL` | Where the "Founder Account" links point                                   |

In demo mode the forms validate and show the same result screens as the prototype, but nothing is sent.
With `NEXT_PUBLIC_API_URL` set they call:

- `GET  {API}/applications/exists?email=…` → `{ exists: boolean }`
- `POST {API}/applications` (multipart, includes the `deck` file) → `{ ref, login, password }`
- `POST {API}/partner-requests` (JSON)

See `src/modules/PitchUs/services/pitch.service.ts` and `src/shared/services/partner.service.ts`.

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
