# Deserto — repository layout

Everything for the Deserto project now lives in this one repo. This file explains where things are.

## Code (the canonical site)
- `src/` — the **React app** (Vite). This is the real, active build.
  - `src/site/` — marketing home sections (Hero, Menu, Locations, Story, …)
  - `src/app/` — `/app` mobile demo
  - `src/components/ds/` — design-system components
  - `src/styles/` — design tokens (`colors.css` is the brand-book source of truth)
- `public/assets/` — the optimized assets the site actually serves (fonts, logos, product cutouts).
- `index.html`, `vite.config.js`, `package.json` — app entry / build config.

## Brand reference  *(committed)*
- `brand/Deserto-BrandBook-2024.pdf` — the official 2024 brand book.
- `brand/logo-original/deserto_logo.png` — master logo (1659×640).
- `brand/deserto_reconstructed.svg` — vector logo reconstruction.
- `brand/fonts-original/` — original font masters (ProximaNova, Avenir, Anisette — all weights).
- `brand/study/` — store photos used for the color study.

## Source assets  *(committed)*
- `assets-source/products/` — the 119 raw product photos.

> This repo is the **single source of truth**. The former iCloud vault has been
> removed; all assets now live here and are backed up via the git remote.

## Reference & history
- `deserto-design-system/` — the original design handoff bundle (chats, tokens, screenshots).
- `prototypes/static-site/` — an earlier standalone static-HTML version, archived for reference.
  Its `index.html` is committed; its heavy `assets/` are git-ignored.
- `docs/` — project docs. `wip-screenshots/` holds older work-in-progress captures (git-ignored).
- `DESIGN.md`, `PRODUCT.md`, `.menu-real.md`, `README.md` — project notes at the root.

## What's git-ignored on purpose
Only `node_modules/`, build output (`dist/`), `.DS_Store`, and Claude Code tooling
(`.claude/`, `.impeccable/`). Everything else — including all heavy assets — is committed.
