# Deserto — Mobile App UI Kit

A high-fidelity, click-through recreation of the Deserto ordering app, composed from the design system's tokens and React primitives, rendered inside a phone shell.

> **Note:** No production app code or Figma was provided — this is an *original, on-brand interpretation* built from the 2024 brand book, demonstrating the foundations and components on the mobile surface.

## Run
Open `index.html`. Loads `styles.css`, the compiled bundle (`_ds_bundle.js`), Lucide icons, and the screen scripts. Renders a 390×844 phone.

## Screens / files
| File | What |
|---|---|
| `app-data.jsx` | Sample content (`window.APP`) — user, categories, featured items, bases, toppings, sizes. |
| `app-parts.jsx` | `Icon`, `Photo`, `StatusBar`, `TabBar`, `Phone` shell. |
| `app-screens.jsx` | `Welcome`, `Home`, `Build`, `Bag`, `Rewards`, `Confirm`. |
| `app-main.jsx` | Flow controller (screen/tab/overlay state, bag) + mount. |

## Flow (fully interactive)
1. **Welcome** — wine splash, phone field, *Continue* / *Continue as guest*.
2. **Home** — greeting, search, Rewards card, category switcher, popular items, "Build your own bowl" CTA. Bottom tab bar.
3. **Build your bowl** — choose base (Tags), pile on toppings (multi-select Tags), pick size; live running total; *Add to bag*.
4. **Bag** — line items, removable; pickup info; subtotal/tax/total; *Place order* (also has an empty state).
5. **Confirmation** — animated check, pickup time, order number.
6. **Rewards** — points balance, progress to next free bowl, perks list.

Tapping a popular item also opens the Build screen pre-filled.

## Composition notes
- Uses `Button`, `Tag`, `Badge`, `Avatar` from the system.
- `Photo` placeholders stand in for real food photography — swap for production assets.
- Warm cream app background, wine brand moments, orange accents & CTAs, soft 18–44px radii, springy add-to-bag/confirm motion.
