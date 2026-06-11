# Deserto — Design System

> **"Mi gusto, mi estilo."** — Frozen Yogurt & Café

Deserto is a frozen-yogurt & café concept built on the fusion of two ideas: **dessert** + **desierto** (desert) — a single invented name in two languages with two very different meanings. The brand sells *health meets indulgence*: bowls of frozen yogurt, energizing coffee blends, and wholesome treats for the modern urban foodie who wants to savor every moment, their way.

This repository is the canonical design system used to build Deserto's **website** and **mobile app**. It contains the brand's typographic and color foundations, real logo assets, reusable React UI primitives, and full-screen UI-kit recreations of both products.

## Sources

Everything here is derived from the official materials the brand provided:

- **`uploads/Deserto-BrandBook-2024.pdf`** — 26-page brand book (Spanish). Verbal identity (naming, slogan, personality, target), and visual identity (logo construction, typography, color, applications). Primary source of truth.
- **`uploads/Gemini_Generated_Image_*.png`** — the full-color primary logo lockup (wordmark + isotype + tagline). Cleaned, background knocked out, and split into the isotype in `assets/logos/`.
- **Fonts** — original `.otf` / `.ttf` / `.woff` files for Anisette Std Petite, Avenir, and Proxima Nova, copied into `assets/fonts/`.

> No live codebase or Figma file was provided. The product UI kits in this system are an *original, faithful interpretation* of the brand foundations (there were no existing screens to recreate). Treat them as a strong starting point, not a copy of shipped product.

---

## Brand at a glance

| | |
|---|---|
| **Category** | Frozen yogurt & specialty café |
| **Personality** | Cálida (warm), Innovadora (innovative), Creativa (creative) |
| **Promise** | A fusion of health and indulgence — *mi gusto, mi estilo* |
| **Targets** | Urban Foodie · The Busy Parent · Fitness Enthusiast |
| **Display type** | Anisette Std Petite |
| **Text type** | Proxima Nova (UI/body) · Avenir (editorial) |
| **Lead colors** | Wine `#762F35` · Orange `#FF9425` · Olive `#6A704B` · Lime `#C4C934` |

> **Palette source of truth:** the official **2024 Brand Book, COLOR page (03)** — nine Pantone colors forming a warm, vibrant, contemporary system: coffee `#714826`, caramel `#AE6434`, **orange `#FF9425`**, olive `#6A704B`, lime `#C4C934`, pale lime `#DBEBA9`, **wine `#762F35`**, dusty rose `#B16E74`, peach cream `#F8D8C5`. **Wine** is the wordmark & ink, **orange** is the hero accent/pop, **olive + lime** are the fresh "yogur" side, **caramel + coffee** are the warm "café" side, **rose + peach** soften. Print uses **max three inks**. Compat token names `--mauve-*` (→ rose), `--sage-*` (→ olive) and `--amber-*` (→ orange/caramel) still resolve so older work stays on-brand.

---

## CONTENT FUNDAMENTALS

How Deserto writes.

**Voice.** Warm and welcoming, pairing **sophistication with accessibility**. Friendly and enthusiastic, never clinical. The brand book describes it as *cálida, innovadora, creativa* — it should feel like a knowledgeable friend who's genuinely excited about good food and good coffee, inviting you to slow down and enjoy.

**Tone by surface.**
- *Marketing / hero copy* — sensory and aspirational. Leans into joy, indulgence, and the ritual of treating yourself. ("Savor every moment, your style.")
- *App / transactional* — friendly but efficient. Short, clear, encouraging. ("Built fresh, your way." / "Your bowl is on the way.")
- *Menu / editorial* — descriptive and appetite-driven, highlighting freshness, quality ingredients, and the health-indulgence balance.

**Person & address.** Speak to the guest as **you**; the brand is **we / Deserto**. It's personal and direct — the whole positioning ("*mi* gusto, *mi* estilo") centers the individual's own taste and lifestyle.

**Casing.**
- Display headlines are usually **sentence case** ("Mi gusto, mi estilo", "Built fresh, your way").
- The wordmark **DESERTO** is all-caps.
- **Eyebrows / section labels** use UPPERCASE with wide tracking ("NEW THIS SEASON", "OUR STORY").
- Avoid ALL-CAPS for long strings or body copy.

**Bilingual.** The brand is Spanish-first in its book (Tucson, AZ market) but works bilingually. Spanish slogans/headlines (`Mi gusto, mi estilo`, `Primavera / Verano / Otoño`) sit comfortably next to English UI. Use Spanish for emotional/brand moments, English (or both) for functional UI.

**Emoji.** Not part of the brand voice — **do not use emoji** in product or marketing copy. The "expression" comes from the winking isotype, color, and photography, not emoji.

**Do say / Don't say.**
- ✅ *Savor · fresh · your way · indulge · wholesome · crafted · seasonal · treat yourself*
- ❌ *cheap · diet · guilt-free · low-fat (as a primary hook) · corporate jargon · hype-y exclamation spam*

**Examples.**
- Hero: **"Mi gusto, mi estilo."** → sub: *Frozen yogurt & café, built fresh your way.*
- Promo eyebrow: **NEW THIS SEASON** → *Otoño bowls are here.*
- App empty state: *Nothing in your bag yet — let's build something good.*
- Order confirm: *We're on it. Your bowl will be ready at 4:25.*

---

## VISUAL FOUNDATIONS

The look and feel, and the rules behind it.

**Overall feel.** Warm, vibrant and a little playful — a contemporary café that's confident with color. The **bright orange** and **lime** bring energy and appetite; **wine** grounds and adds sophistication; **olive, caramel and coffee** give it an earthy, wholesome warmth. Modern and dynamic, with a youthful pop — indulgent café meets fresh frozen-yogurt. Think warm daylight, bold color blocks, and the winking isotype.

**Color.**
- **Anchor:** **Wine / Maroon `#762F35`** — the wordmark, primary ink on light, primary buttons.
- **Hero accent:** **Orange `#FF9425`** — the brand's signature energetic pop. High-energy CTAs, highlights, brand moments. Carries dark (wine) text.
- **Fresh side:** **Olive `#6A704B`** grounds, **Lime `#C4C934`** pops, **pale lime `#DBEBA9`** softens — the "yogur / good-for-you" green family; olive also drives success states.
- **Warm café side:** **Caramel `#AE6434`** and **coffee `#714826`** for drinks, depth and grounding.
- **Soft accents:** **Rose `#B16E74`** (strawberry & taro) and **peach cream `#F8D8C5`** (citrus, latte foam) for gentle fills.
- **Seasonal palettes** rotate with the menu: *Primavera* (lime-led), *Verano* (wine + olive + lime), *Otoño* (wine + rose + caramel).
- **Neutrals are warm/espresso-leaning** — espresso inks (`#2A1D11`) and warm peach-cream surfaces (`#FBF1E8`), **never pure grey or pure black**.
- **Print:** maximum **three inks** per printed piece (brand book rule).

**Type.**
- **Anisette Std Petite** for display/headlines — geometric, friendly, with a distinctive round `O`. This is the wordmark's voice. Weights: Light, Bold, ExBold. Caps get `+0.08em` tracking; large display is set tight.
- **Proxima Nova** for UI and body — clean, neutral, highly legible. The workhorse across web and app.
- **Avenir** for editorial / long-form / menu copy — a slightly softer humanist companion.
- Three families on purpose ("un sinfín de posibilidades"), but never more than display + one text face in a single composition.

**Backgrounds.** Predominantly **warm solid surfaces** — peach-cream `#FBF1E8` pages, white cards, and bold full-bleed brand color blocks (orange, wine, olive, lime) used confidently à la the brand book's color-banding. Hero & feature moments use **full-bleed café photography**. No busy patterns; keep texture to subtle paper warmth. **Avoid** blue/tech gradients — off-brand. The bright orange is a brand asset, not a thing to avoid.

**Imagery.** Warm natural daylight with a rich, appetizing grade (orange, olive, caramel, cream). Candid lifestyle moments — a hand holding a branded can on a café table, swirled froyo cups against bold color walls, fresh fruit, macro froyo texture. Lively, fresh, appetite-forward. Never harsh flash, clinical, or washed-out. Real assets live in `assets/images/`.

**Corner radii.** Soft and generous, echoing a scoop of fro-yo — cards `14–20px`, large surfaces up to `28–40px`, and **pill-shaped** primary buttons & chips. Nothing sharp-cornered.

**Cards.** White or peach-cream fill, soft warm-brown shadow (`--shadow-sm`/`--shadow-md`), `14–20px` radius, hairline border (`--border-default`) when on white. No colored left-border accents; no harsh grey outlines.

**Shadows.** Warm brown-tinted (`rgba(42,29,17,…)`), soft and diffuse — they suggest depth gently. An **accent shadow** (orange glow) can lift primary CTAs. Never use cold grey/black shadows.

**Borders.** Hairline (`1px`), soft warm taupe (`--border-default #EADFD0`). `2px` for emphasis or focus.

**Buttons & interaction.**
- *Primary* — wine fill, cream text, pill shape. *Accent* — orange fill (with a soft glow) for high-energy CTAs, carrying dark wine text.
- *Hover* — darken the fill one step (`wine-700 → wine-800`, `orange-500 → orange-600`); secondary/ghost get a soft tinted wash.
- *Press* — slight **scale-down (`0.97`)** plus the darker fill — playful and tactile.
- *Focus* — `2px` orange focus ring, `2px` offset.

**Motion.** Quick and soft. Standard `ease-out` over `120–220ms` for most transitions; a springy **`ease-bounce`** reserved for playful moments (adding to bag, toggles, the isotype). Fades + gentle rises for entrances; nothing slow or heavy. No infinite decorative loops in product UI.

**Transparency & blur.** Used sparingly — a translucent pearl/blur on sticky headers over photography. Not a glassmorphism-heavy system.

**Layout.** Generous whitespace, clear hierarchy via the type scale, content centered in `1120–1320px` containers on web. Sticky top nav on web; bottom tab bar on app. The winking isotype anchors the top-left.

---

## ICONOGRAPHY

The brand book does **not** define a proprietary icon set — its visual "icon" is the **winking smile isotype** itself (the stylized `D` built from two strokes + a curved bracket, suggesting movement and a friendly wink). That mark is the hero graphic for app icons, favicons, stamps, and loading states.

For functional UI icons, this system standardizes on **[Lucide](https://lucide.dev)** (loaded from CDN) as the closest match to the brand's clean, rounded, contemporary geometry:

- **Style:** outline / stroke icons, `~1.75–2px` stroke, rounded caps & joins — this harmonizes with Anisette's geometry and the soft radii. Render in `currentColor` (usually wine or ink) at `20–24px` in UI.
- **Why Lucide (substitution flag):** no brand-native icon font or SVG set existed in the provided materials, so we substitute Lucide as a high-quality, openly-licensed stand-in. **If Deserto has or commissions a bespoke icon set, replace this.**
- **No emoji** as icons, and avoid unicode-glyph icons except simple typographic marks (× for close, & in copy).

Logo & mark assets live in `assets/logos/`:
- `deserto-logo-full.png` — primary horizontal lockup (transparent).
- `deserto-isotype.png` — winking smile mark, wine, transparent.
- `deserto-isotype-white.png` — reversed (white) mark for dark/colored fills.

---

## CONTENTS / INDEX

Root manifest — where to find things.

| Path | What |
|---|---|
| **`styles.css`** | Global entry point. Consumers link **this one file**. `@import`s everything below. |
| `tokens/fonts.css` | `@font-face` for Anisette, Proxima Nova, Avenir. |
| `tokens/colors.css` | Full palette + semantic aliases (text / surface / feedback). |
| `tokens/typography.css` | Families, weights, type scale, line-height, tracking. |
| `tokens/spacing.css` | Spacing grid, radii, shadows, layout widths, motion. |
| `tokens/base.css` | Light element reset wiring tokens to the document. |
| `guidelines/cards/` | Foundation specimen cards (render in the Design System tab). |
| `assets/fonts/` | Webfont binaries. |
| `assets/logos/` | Logo lockup, isotype, reversed isotype. |
| `assets/images/` | Real café photography (froyo, refreshers, lattes, interiors, the Diluna×Deserto guava collab). |
| `components/` | Reusable React UI primitives (see below). |
| `ui_kits/website/` | Marketing website UI kit. |
| `ui_kits/app/` | Mobile app UI kit. |
| `SKILL.md` | Agent Skill manifest for downstream use. |

**Components** (`components/`): React primitives, grouped by concern. Consume via `const { Button } = window.DesertoDesignSystem_e4c2c1`.

| Group | Components |
|---|---|
| `components/actions/` | `Button`, `IconButton` |
| `components/forms/` | `Input`, `Switch` |
| `components/data-display/` | `Card`, `Badge`, `Avatar`, `Tag` |

Each component ships a `.jsx` (implementation), `.d.ts` (props + JSDoc), `.prompt.md` (usage), and a directory `@dsCard` HTML specimen. `Button`, `Input` and `Card` are also exposed as Starting Points.

**UI kits**: `ui_kits/website/` (marketing site — hero, filterable menu, story, seasonal, locations, footer) · `ui_kits/app/` (mobile ordering app — welcome, home, build-your-bowl, bag, rewards, confirmation).

---

*Namespace for `@dsCard` HTML & consumers: `window.DesertoDesignSystem_e4c2c1`.*
