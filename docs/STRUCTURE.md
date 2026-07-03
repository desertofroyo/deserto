# Deserto — repository layout

Everything for the Deserto project lives in this one repo, grouped so the root
stays clean: **app code and build config at the root, project docs in `docs/`,
and all heavy brand/reference material under `reference/`.**

```
deserto/
├── index.html, package.json, vite.config.js   # app entry + build config
├── src/                                        # the React app (Vite)
├── public/                                     # assets the site actually serves
├── docs/                                       # project documentation
└── reference/                                  # brand + archive material (not built)
```

## App — the canonical site  *(root)*
- `src/` — the **React app** (Vite). The real, active build.
  - `src/site/` — marketing home sections (Hero, Menu, Locations, Story, …)
  - `src/app/` — `/app` mobile demo
  - `src/pages/` — routed pages (Home, Order, AppDemo, Mockups)
  - `src/components/ds/` — design-system components
  - `src/lib/` — small helpers (e.g. the order `bag`)
  - `src/styles/` — design tokens (`colors.css` is the brand-book source of truth)
- `public/assets/` — the optimized assets the site serves (fonts, logos, product cutouts).
- `index.html`, `vite.config.js`, `package.json` — app entry / build config.

## Documentation  *(`docs/`)*
- `STRUCTURE.md` — this file.
- `DESIGN.md` — design notes.
- `PRODUCT.md` — product/catalog notes.
- `menu-real.md` — the real menu reference.
- `wip-screenshots/` — older work-in-progress captures.

## Reference & archive  *(`reference/` — not part of the build)*
- `reference/brand/` — official **brand book PDF**, master logo (`logo-original/`),
  vector reconstruction, and original **font masters** (`fonts-original/`:
  Anisette, Avenir, Proxima Nova), plus store color-study photos (`study/`).
- `reference/product-photos/` — the 119 raw product photos (source material).
- `reference/design-system/` — the original design **handoff bundle** (chat
  transcripts, brand book, HTML/JSX prototypes, `SKILL.md`).
- `reference/prototypes/` — an earlier standalone static-HTML version, archived.

> This repo is the **single source of truth**. The former iCloud vault was
> removed; all assets live here and are backed up via the git remote.

## What's git-ignored on purpose
`node_modules/`, build output (`dist/`), `.DS_Store`, and Claude Code tooling
(`.claude/`, `.impeccable/`). Everything else — including all heavy assets — is committed.
