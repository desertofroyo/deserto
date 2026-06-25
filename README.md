# Deserto — Frozen Yogurt & Café

A real **Vite + React** implementation of the Deserto design handoff (from
`claude.ai/design`). It recreates the prototypes pixel-for-pixel as a runnable
app, built on the brand's design-system foundation.

> Brand: Deserto Frozen Yogurt & Café · 5635 E River Rd, Unit 101, Tucson, AZ
> "Where coffee meets creamy bliss."

## Run it

```bash
npm install
npm run dev      # opens http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Routes

| Path     | What it is |
|----------|------------|
| `/`      | Marketing home — peach hero with the froyo-on-wine-disc, sparkle marquee, "What we make" arch cards, wine *Dessert, meet desierto* story, Visit-us card, footer. |
| `/order` | Online ordering — the real Toast catalog (Froyo / Tonics / Coffee / Pastries / Extras), grouped item rows, and a sticky bag with pickup/delivery. The bag persists in `localStorage` and the home header reflects its count. |
| `/app`   | Mobile ordering app — an interactive click-through demo in a phone frame: welcome → home → build-your-froyo → bag → place order → confirmation, plus a rewards tab. |

## How it's organized

```
public/assets/        fonts, images, logos (+ the froyo hero cutout)
src/
  styles/             the design-system CSS, ported verbatim
    styles.css        entry — @imports fonts → colors → typography → spacing → base
    app.css           shared keyframes + interaction utilities
  components/ds/       the 8 brand primitives + an Icon wrapper
    Button, IconButton, Input, Switch, Card, Badge, Avatar, Tag, Icon
  lib/bag.js          shared localStorage shopping bag
  site/               marketing-site sections + data + season engine
  app/                mobile-app shell, screens, and data
  pages/              Home.jsx, Order.jsx, AppDemo.jsx
  App.jsx             react-router routes
```

### Design system

- **Colors** — the nine official 2024 brand-book Pantone colors (wine ink,
  orange pop, olive/lime fresh side, caramel/coffee warm side, rose/peach soft),
  with derived tint/shade ramps and semantic aliases. See `src/styles/colors.css`.
- **Type** — Anisette (display/wordmark), Proxima Nova (UI/body), Avenir
  (editorial). Real webfonts under `public/assets/fonts`.
- **Components** — self-contained React primitives styled only through the CSS
  custom properties; no CSS-in-JS libraries.
- **Icons** — `lucide-react`, wrapped by `components/ds/Icon` so the brand's
  kebab-case names (`shopping-bag`, `ice-cream-bowl`, …) port straight across.

## Notes & known gaps

- This is a faithful recreation of the design prototypes, not production
  commerce — checkout is a demo (it would hand off to Toast).
- Some catalog items (cookies, scones, cake jars, several tonics) have no source
  photo and fall back to a tinted swatch with a faded isotype, exactly as in the
  handoff. Drop real photos into `public/assets/images` to fill them in.
- The original handoff bundle lives under `reference/design-system/` for reference
  (chat transcripts, brand book, the HTML/JSX prototypes, the `SKILL.md`).
