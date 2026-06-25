---
name: deserto-design
description: Use this skill to generate well-branded interfaces and assets for Deserto (frozen yogurt & café), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

Deserto is a frozen-yogurt & café brand — warm, appetizing, modern and a little playful. Two leads (Wine `#762F35` + Orange `#FF9425`), warm cream surfaces, soft generous radii, Anisette for display + Proxima Nova/Avenir for text. Voice is warm, welcoming and bilingual ("Mi gusto, mi estilo"). No emoji in copy.

Key files:
- `readme.md` — full brand guide: content fundamentals, visual foundations, iconography, manifest.
- `styles.css` — link this one file to get all tokens + webfonts.
- `tokens/` — colors, typography, spacing/radii/shadow/motion CSS custom properties.
- `assets/logos/` — logo lockup, isotype, reversed isotype. `assets/fonts/` — webfonts.
- `components/` — React primitives (Button, IconButton, Input, Switch, Card, Badge, Avatar, Tag).
- `ui_kits/website/` & `ui_kits/app/` — full-screen product recreations to learn from or extend.
- `guidelines/cards/` — foundation specimen cards.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view, linking `styles.css` for tokens and fonts. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
