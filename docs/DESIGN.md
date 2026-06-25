---
name: Deserto
description: Frozen Yogurt & Café — warm, vibrant, photography-led. "Where coffee meets creamy bliss."
colors:
  wine: "#762F35"
  wine-deep: "#551F25"
  orange: "#FF9425"
  orange-deep: "#E67D1B"
  olive: "#6A704B"
  lime: "#C4C934"
  pale-lime: "#DBEBA9"
  caramel: "#AE6434"
  coffee: "#714826"
  rose: "#B16E74"
  peach-cream: "#F8D8C5"
  espresso-ink: "#2A1D11"
  cream-page: "#FBF1E8"
  sand: "#F4ECE1"
  border-warm: "#EADFD0"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Anisette, Avenir, system-ui, sans-serif"
    fontSize: "clamp(56px, 6.4vw, 104px)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Anisette, Avenir, system-ui, sans-serif"
    fontSize: "3.052rem"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Proxima Nova, Avenir, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  editorial:
    fontFamily: "Avenir, Proxima Nova, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "Proxima Nova, Avenir, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  xxl: "40px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.cream-page}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.wine-deep}"
    textColor: "{colors.cream-page}"
  button-accent:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.wine}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-accent-hover:
    backgroundColor: "{colors.orange-deep}"
    textColor: "{colors.wine}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.wine}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  chip-selected:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.cream-page}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  chip-unselected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.espresso-ink}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
---

# Design System: Deserto

## 1. Overview

**Creative North Star: "The Warm Desert Scoop"**

Deserto is *dessert* meeting *desierto* — health and indulgence at the same
table, in warm desert daylight. The system feels like a contemporary café that is
completely unafraid of color: bold full-bleed blocks of wine, orange, olive and
lime, the way the brand book bands its palette, anchored by espresso-warm
neutrals and led by real, appetite-forward photography. Big geometric Anisette
display type carries the joy; soft pill shapes and the winking isotype carry the
play. Nothing here is cold, clinical, or grey.

It is expressive by default (register: **brand**) — the marketing surface is the
product. The app and order page reuse the same tokens but tighten into a calmer,
task-first rhythm. Across both, the discipline is warmth and confidence: warm
surfaces, warm shadows, color used in deliberate blocks rather than timid tints.

This system explicitly rejects the look the brand book and the project's own
history warn against: generic restaurant templates, blue/tech gradients and
glassmorphism, emoji decoration, the reverted cool/pastel mauve drift, and stark
grey-on-grey minimalism.

**Key Characteristics:**
- Warm espresso/peach-cream neutrals — never pure grey or black.
- Nine-color brand palette used in confident full-bleed blocks.
- Anisette display + Proxima Nova UI + Avenir editorial — three faces on purpose.
- Soft, generous radii (pill buttons, 14–40px surfaces); nothing sharp.
- Real café photography leads; the winking isotype is the only "icon" that is
  truly the brand's own.

## 2. Colors

A warm, vibrant, contemporary palette of nine official brand-book colors plus
espresso-leaning neutrals. Wine grounds, orange is the rare pop, olive/lime are
the fresh "yogur" side, caramel/coffee the warm "café" side.

### Primary
- **Wine / Maroon** (`#762F35`): The anchor and the ink. The wordmark, primary
  buttons, headlines on light, and any full-bleed "this is Deserto" moment (the
  story band, the hero disc, app welcome & confirmation). Deepens to `#551F25`
  on hover.

### Secondary
- **Bright Orange** (`#FF9425`): The signature energetic pop. Primary-CTA accent,
  highlights, the bag badge, the focus ring. Always carries dark wine text, never
  white. Deepens to `#E67D1B` on hover.
- **Olive** (`#6A704B`): The grounding green of the fresh side; section blocks,
  the app build-CTA, success states. **Lime** (`#C4C934`) is its high-energy
  partner (marquee text, progress bars, on-wine accents); **Pale Lime**
  (`#DBEBA9`) softens.

### Tertiary
- **Caramel** (`#AE6434`) & **Coffee** (`#714826`): the warm café side — drinks,
  depth, the footer band. **Rose** (`#B16E74`) and **Peach Cream** (`#F8D8C5`)
  are the soft appetite accents (strawberry/taro, citrus, latte foam).

### Neutral
- **Espresso Ink** (`#2A1D11`): primary text — a near-black *warm* espresso,
  never `#000`.
- **Cream Page** (`#FBF1E8`): the default warm peach-cream page surface.
- **White** (`#FFFFFF`): card fill. **Sand** (`#F4ECE1`): sunken sections.
- **Warm Border** (`#EADFD0`): hairline borders and dividers — soft taupe.

### Named Rules
**The Warm-Neutral Rule.** Neutrals are *never* pure grey or pure black. Every
background, text, border and shadow leans espresso, peach, or sand. A cold grey
(`#888`, `#000`) anywhere is a bug.

**The One-Pop Rule.** Orange is the energetic pop, not a field color. Use it for
small, high-intent hits (the CTA, the badge, the focus ring) — never as a large
background wash. Wine and olive carry the big blocks; orange punctuates.

## 3. Typography

**Display Font:** Anisette Std Petite (with Avenir, system-ui fallback)
**Body Font:** Proxima Nova (with Avenir, system-ui fallback)
**Editorial Font:** Avenir (long-form / menu / story copy)

**Character:** Anisette is geometric, friendly and round — the wordmark's own
voice, joyful at large display sizes. Proxima Nova is the clean, neutral
workhorse for UI and body. Avenir adds a softer humanist warmth to editorial
passages. Three families on purpose, but never more than display + one text face
in a single composition.

### Hierarchy
- **Display** (Anisette ExBold 800, `clamp(56px,6.4vw,104px)`, line-height 0.9,
  uppercase, tracking -0.01em): hero headlines only — e.g. "WHERE COFFEE MEETS
  CREAMY BLISS."
- **Headline** (Anisette Bold 700, ~39px / `--text-3xl`, line-height 1.04):
  section titles ("What we make", "Our story").
- **Title** (Anisette Bold 700, ~25–31px): card and screen titles.
- **Body** (Proxima Nova 400, 16px, line-height 1.5): UI and paragraph text.
  Editorial passages use Avenir at ~20px, line-height 1.62.
- **Label / Eyebrow** (Proxima Nova Bold 700, ~12.8px, tracking 0.16em,
  UPPERCASE): section eyebrows ("THE MENU", "OUR STORY").

### Named Rules
**The Eyebrow Rule.** Small section labels are always UPPERCASE Proxima Nova with
wide `0.16em` tracking, tinted wine or accent. Long strings and body copy are
never set in all-caps.

## 4. Elevation

Soft, warm, and structural — the system uses real shadows, but they are gentle
and always **warm brown-tinted** (`rgba(42,29,17,…)`), never cold grey or black.
Depth suggests a scoop lifted off a warm surface, not a hard drop. Cards lift
slightly on hover; the primary CTA may carry a soft orange glow.

### Shadow Vocabulary
- **xs / sm** (`0 1px 2px` / `0 2px 6px rgba(42,29,17,.06–.09)`): resting cards,
  chips, search fields.
- **md** (`0 6px 18px rgba(42,29,17,.11)`): elevated cards, the bag panel, header.
- **lg / xl** (`0 14px 36px` / `0 28px 60px rgba(42,29,17,.15–.18)`): the story
  arch image, toasts, the phone frame.
- **accent glow** (`0 10px 24px rgba(255,148,37,.38)`): lifts an orange accent CTA.
- **wine glow** (`0 10px 24px rgba(118,47,53,.28)`): lifts a wine surface.

### Named Rules
**The Warm-Shadow Rule.** Every shadow tints espresso-brown. A `rgba(0,0,0,…)`
shadow is forbidden — it reads cold and breaks the daylight feel.

## 5. Components

### Buttons
- **Shape:** fully pill-shaped (`999px`). Never sharp-cornered.
- **Primary:** wine fill (`#762F35`), cream text, padding `12px 22px` (md).
- **Accent:** orange fill (`#FF9425`) with a soft orange glow, **dark wine text**,
  for high-energy CTAs. Used sparingly (the One-Pop Rule).
- **Outline / Ghost:** transparent fill, wine text, `1.5px` wine border (outline)
  or no border (ghost) with a soft sand wash on hover.
- **Hover / Focus / Press:** hover darkens the fill one step
  (`wine→wine-deep`, `orange→orange-deep`); press scales to `0.97`; focus shows a
  `2px` orange ring at `2px` offset. Transitions are quick ease-out
  (`120–220ms`).

### Chips / Tags
- **Style:** pill, `1.5–2px` border. Unselected = white fill, espresso text,
  warm border. Selected = wine fill, cream text. Optional leading color dot
  (e.g. froyo-base swatches).
- **State:** filter chips on the order page and topping/base chips in the app
  build flow share this treatment.

### Cards / Containers
- **Corner Style:** soft (`14–20px`; large feature surfaces up to `28–40px`).
- **Background:** white or peach-cream.
- **Shadow Strategy:** resting `sm`, lift to `lg` on hover (see Elevation).
- **Border:** hairline `1px` warm taupe (`#EADFD0`) when on white. Never a
  colored left-border stripe.
- **Internal Padding:** `16–24px`.

### Inputs / Fields
- **Style:** white fill, `1.5px` warm border, `14px` radius, Proxima Nova text.
- **Focus:** border shifts to orange with a soft `0 0 0 3px rgba(255,148,37,.18)`
  glow.
- **Error:** border and helper text shift to wine (`--danger`).

### Navigation
- **Web:** sticky top bar on a translucent peach-cream blur over photography; the
  full logo lockup at left, Proxima Nova links with an animated orange
  underline-on-hover, wine "Order now" pill at right.
- **App:** bottom tab bar; the active tab is a solid wine pill with a cream icon;
  the bag tab carries an orange count badge.

### Signature Components
- **The Arch.** The café's arched silhouette (`border-radius: 50% 50% 0 0 /
  38% 38% 0 0`) frames hero photos, "What we make" cards, and the story image —
  an ownable shape no generic template has.
- **The Hero Disc.** A wine circle with the froyo-cups cutout bursting out of the
  top and rotated lime diet-labels (Gluten Free / Dairy Free / Vegan) — the
  homepage centerpiece.
- **The Sparkle Marquee.** A wine band of scrolling uppercase lime text separated
  by orange ✦ sparkles.

## 6. Do's and Don'ts

### Do:
- **Do** keep every surface warm — peach-cream pages (`#FBF1E8`), white cards,
  and bold full-bleed brand-color blocks (wine, orange, olive, lime).
- **Do** lead hero and feature moments with real, appetite-forward café
  photography, framed in the arch silhouette where it fits.
- **Do** use wine as the ink/anchor and orange as a rare, high-intent pop with
  dark wine text on it.
- **Do** tint every shadow espresso-brown (`rgba(42,29,17,…)`) and keep corners
  soft (pills for buttons/chips, `14–40px` for surfaces).
- **Do** set section eyebrows in UPPERCASE Proxima Nova with `0.16em` tracking,
  and big headlines in Anisette.
- **Do** support `prefers-reduced-motion`, a `2px` orange focus ring, and label
  meaning with text (not color alone) for WCAG 2.2 AA.

### Don't:
- **Don't** use blue or bluish-purple gradients, glassmorphism, or neon accents —
  they are off-brand AI-slop tells.
- **Don't** decorate with emoji, or use a card with a colored left-border stripe.
- **Don't** drift back to the cool/pastel mauve-walls / sage / dusty-rose
  recalibration — backgrounds are warm, never cool pastel.
- **Don't** use pure grey or pure black (`#000`, `#888`) for text, surfaces, or
  shadows; never a cold `rgba(0,0,0,…)` shadow.
- **Don't** ship a generic restaurant template (plain sticky-nav + split-hero +
  uniform card-grid) with no color blocking, arch motif, or photography.
- **Don't** use bounce / elastic / overshoot easing (`cubic-bezier` with y > 1).
  Motion is quick exponential ease-out (`--ease-out-expo`), smooth deceleration —
  playful through color and shape, not bouncy gimmicks.
- **Don't** set long strings or body copy in ALL-CAPS, or make "diet / low-fat"
  the primary hook.
