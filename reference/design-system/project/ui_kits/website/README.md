# Deserto — Website UI Kit

A high-fidelity recreation of the Deserto marketing site homepage, composed entirely from the design system's tokens and React primitives.

> **Note:** No production website code or Figma was provided, so this is an *original, on-brand interpretation* built from the 2024 brand book — not a copy of a shipped site. It demonstrates how the foundations and components come together for the marketing surface.

## Run
Open `index.html`. It loads `styles.css`, the compiled component bundle (`_ds_bundle.js`), Lucide icons, and the screen scripts.

## Screens / sections
| File | What |
|---|---|
| `site-data.jsx` | Sample content (`window.SITE`) — nav, menu products, locations. |
| `site-parts.jsx` | `Icon`, `Photo` (branded placeholder), `Header` (sticky, blur, bag count), `Hero`. |
| `site-sections.jsx` | `MenuSection` (category-filterable product grid), `StoryStrip`, `SeasonalBanner`, `LocationsSection`, `Footer`. |
| `site-app.jsx` | `App` shell — bag state, nav, smooth-scroll to menu. |

## Interactions
- **Menu filter** — category Tags (Bowls / Smoothies / Coffee / Treats) swap the product grid.
- **Add to bag** — increments the header bag count with a springy pop.
- **Nav → Menu** smooth-scrolls to the menu section.
- **Newsletter** input in the footer.

## Composition notes
- Uses `Button`, `IconButton`, `Card`, `Badge`, `Tag` from the system — no re-implemented primitives.
- Photography is represented by `Photo` placeholders (warm tint + faded isotype). Swap in real food photography for production.
- Layout: `1320px` max container, sticky translucent header, wine "Our story" band, orange seasonal banner, dark footer.
