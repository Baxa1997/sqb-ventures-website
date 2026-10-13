# CLAUDE.md

SQB Ventures public website. Next.js 16 App Router, React 19, TypeScript, plain CSS. Yarn 1, Node 22.

## Commands

- `yarn dev` / `yarn build` / `yarn start`
- `yarn lint`, `yarn typecheck`, `yarn check:locales` — run all three before committing

## Conventions

- `src/app` holds routes only. A `page.tsx` reads `params.lang`, builds metadata with `pageMetadata()`
  and renders a page component from `src/modules/<Module>`.
- A module owns its `components/`, `constants/`, `helpers/`, `locales/`, `pages/`, `services/`
  and `styles.css`. Only create the folders it needs. Export public pieces from `index.ts`.
- Anything used by two or more modules goes to `src/shared`.
- Server components by default. Add `'use client'` only for interaction (forms, sliders, menu) and
  pass translated strings or `locale` in as props.
- Import client components by file path, not through a module barrel, from layouts: a barrel can pull
  other client code into every page.
- Translations: English text is the key, value is `[ru, uz]`. Use `createT(locale, common, dict)`.
  Texts used across modules live in `src/shared/locales/common.ts`.
- Styles: tokens in `src/shared/styles/tokens.css`; global rules in `src/shared/styles`; page-only rules
  in the module's `styles.css`. Elements that fade in on scroll are listed in both `motion.css` and
  `MotionObserver.tsx` (`REVEAL`) — keep them in sync.
- Paths aliases: `@shared/*`, `@modules/*`, `@assets/*`, `@app/*`.
- Prettier: single quotes, semicolons, width 110.
