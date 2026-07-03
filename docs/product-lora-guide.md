# Deserto product cutouts — LoRA workflow (hosted, no-code)

Goal: generate **consistent product images** for the menu cards, where the *same
container looks the same every time*. We train a small LoRA per **container
family** (not per menu item), generate one image per flavor, cut it out to a
transparent PNG, and drop it into `public/assets/products/`. **Labels/logos are
added at the very end** (or skipped) — image models garble text, so we don't ask
them to render it.

This mirrors how the six `swirl-*.png` cutouts already work: a transparent PNG at
`/assets/products/<name>.png`, referenced by each item's `img` in
`content/menu.json`.

---

## 1. Container families (what to actually train)

You do **not** need a LoRA per menu item. Items that share a physical container
share one LoRA; flavors are just prompt variations (color / garnish / fill).

| LoRA | Trigger word | Covers (menu ids) | Vary per flavor by |
|------|-------------|-------------------|--------------------|
| **Tonic vessel** | `dsrttonic` | to-blueberry, to-kiwi, to-mango, to-raspberry, to-pineapple, to-strawberry, to-peach | liquid color + fruit garnish |
| **Hot coffee cup** | `dsrthotcup` | c-latte, c-macch, c-chai, c-amer, c-capp, c-esp* | crema/foam color, drink tone |
| **Iced coffee cup** | `dsrticedcup` | c-ichai, c-imacch, c-ilatte, c-iamer | drink color through ice |
| **Cake jar** | `dsrtjar` | p-gansito, p-oreo | layer colors |
| **NYC cookie** (style) | `dsrtcookie` | p-macad, p-redv, p-ccw | dough color + mix-ins |
| **Scone** (style) | `dsrtscone` | p-bluelem, p-vanilla | glaze + inclusions |

\* Espresso single (`c-esp`) uses a small demitasse — either shoot a couple of
demitasse refs into the hot-cup set, or just reuse the hot-cup look small.

**Swirl / self-serve froyo:** already done (`swirl-*.png`), skip.

**Start order (most payoff first):** Tonic vessel (7 cards) → Hot coffee (6) →
Iced coffee (4) → Cake jar (2) → cookies/scones last.

> Cookies and scones have no container, so those are *style* LoRAs (consistent
> "thick NYC cookie" / "triangular scone" look) rather than a locked object.

---

## 2. Reference photos to gather

Per family, **15–25 images** of the **same container**:

- Varied angles: front, ¾ left, ¾ right, a slight top-down. A few distances.
- Soft, even lighting. Product fills most of the frame. Sharp focus.
- Plain uncluttered background (white wall / paper sweep is ideal).
- Empty *and* filled versions if the filled look matters (tonics: yes).
- ❌ No other brands, hands, clutter, or text overlays in frame.

You already have single shots in `public/assets/products/*.jpg` (e.g.
`blueberry-tonic.jpg`, `hot-latte.jpg`, `gansito-cake-jar.jpg`). Use these as
seeds, but **add more angles of the same physical cup/can/jar** — one photo isn't
enough to lock a product.

**Dataset folders** (keep raw refs out of the app; put them anywhere off-repo,
e.g. `C:\Users\zkare\Desktop\deserto-lora\`):

```
deserto-lora/
  tonic/      img01.jpg img01.txt  img02.jpg img02.txt ...
  hotcup/
  icedcup/
  jar/
  cookie/
  scone/
```

---

## 3. Captions (one .txt per image, same base name)

Rule: name the trigger, describe only the **variable** stuff (angle, background,
lighting) — never the container's fixed traits. That forces the model to bake the
fixed container into the trigger word.

**Tonic** (`tonic/img01.txt`):
```
a dsrttonic drink on a white background, front view, studio lighting
```
```
a dsrttonic drink on a light gray background, three-quarter angle
```
```
a dsrttonic drink, slight top-down view, soft even lighting
```

**Hot cup** (`hotcup/img01.txt`):
```
a dsrthotcup of coffee on a white background, front view
```

Same pattern for `dsrticedcup`, `dsrtjar`, `dsrtcookie`, `dsrtscone`. Keep them
short; vary the background/angle words to match each photo.

---

## 4. Train on fal.ai (no GPU needed)

1. Go to **fal.ai** → model **`fal-ai/flux-lora-fast-training`** (or the Ostris
   "flux-dev LoRA trainer").
2. Zip one family folder (images + matching `.txt` captions) and upload.
3. Settings:
   - **Trigger word:** the family token (e.g. `dsrttonic`)
   - **Steps:** ~1000–1500 (single concept)
   - **Learning rate / rank:** leave defaults
4. Run (~20–30 min, roughly ~$2). Download the **`.safetensors`** LoRA.
5. Repeat per family.

---

## 5. Generate the cutouts

On fal.ai use a **Flux** text-to-image model with your LoRA loaded (set LoRA
scale ~0.9–1.1). One generation per flavor.

**Base prompt** (fill in the trigger + the flavor bits):
```
<TRIGGER>, <flavor description>, single product centered on a seamless
pure-white background, studio product photography, soft even lighting,
full product visible, sharp focus, high detail, photorealistic
```

**Negative prompt / avoid** (always — matches our house rule):
```
text, letters, words, brand logo, label, watermark, signature, sparkles,
star glints, lens flare, glare artifacts, extra objects, hands, people,
busy background, reflections, blurry, low quality
```

### Per-flavor variation snippets

**Tonic** (`dsrttonic`):
- Blueberry → `deep blue-purple sparkling drink with fresh blueberries`
- Kiwi → `bright green sparkling drink with kiwi slices`
- Mango → `golden-orange sparkling drink with mango`
- Raspberry → `pink-red sparkling drink with raspberries`
- Pineapple → `pale yellow sparkling drink with pineapple`
- Strawberry → `red sparkling drink with fresh strawberry`
- Golden Peach → `warm amber sparkling drink with peach slices`

**Hot coffee** (`dsrthotcup`):
- Latte → `latte with smooth microfoam, light tan surface`
- Macchiato → `espresso with a small dollop of foam`
- Chai Latte → `spiced chai latte, warm amber with foam`
- Americano → `black americano, dark surface`
- Cappuccino → `cappuccino with a tall domed foam cap`
- Espresso → `small demitasse of espresso with crema`

**Iced coffee** (`dsrticedcup`):
- Iced Chai → `iced spiced chai, amber through ice cubes`
- Iced Macchiato → `iced espresso layered over milk and ice`
- Iced Latte → `iced latte, light coffee color over ice`
- Iced Americano → `iced black americano over ice cubes`

**Cake jar** (`dsrtjar`):
- Gansito → `layers of sponge cake, cream and chocolate, red accents`
- Oreo → `layers of cookies-and-cream crumble and white cream`

**NYC cookie** (`dsrtcookie`) — thick, cracked-top NYC style:
- White Choc Macadamia → `pale golden cookie with white chocolate chunks and macadamia`
- Red Velvet → `deep red cookie with white chocolate chips`
- Choc Chip & Walnut → `golden brown cookie with chocolate chips and walnuts`

**Scone** (`dsrtscone`) — triangular:
- Blueberry Lemon → `scone with blueberries and lemon glaze`
- Vanilla Almond → `scone with sliced almonds and vanilla glaze`

---

## 6. Make it transparent

Generate on the white background, then background-remove:
- fal.ai: **`birefnet`** or **`rembg`** background-removal model, **or**
- browser: **remove.bg**, **or** any editor (Photoshop "Remove Background").

Export a **transparent PNG**, trimmed so the product roughly fills the frame
(the card scales it and adds a drop shadow).

---

## 7. (Optional, last) add the label

Only after the clean cutout looks right: paste your real Deserto logo/label onto
the container in any editor, or leave it plain. We never ask the model to render
the branding.

---

## 8. Wire it into the site

Save each cutout to `public/assets/products/` and set the item's `img` in
`content/menu.json`. Suggested names (match the `swirl-*.png` pattern):

| Item id | File |
|---------|------|
| to-blueberry | `tonic-blueberry.png` |
| to-kiwi | `tonic-kiwi.png` |
| … tonics | `tonic-<flavor>.png` |
| c-latte | `coffee-hot-latte.png` |
| c-ilatte | `coffee-iced-latte.png` |
| … coffee | `coffee-<name>.png` |
| p-gansito | `cakejar-gansito.png` |
| p-oreo | `cakejar-oreo.png` |
| p-macad / p-redv / p-ccw | `cookie-<name>.png` |
| p-bluelem / p-vanilla | `scone-<name>.png` |

Then in `content/menu.json`, add to that item:
```json
"img": "/assets/products/tonic-blueberry.png"
```
The card swaps the fallback coin for the overhanging cutout automatically. If a
file is missing/misnamed, the card falls back to the coin — no breakage.

Hand me the finished PNGs (or just tell me they're in the folder) and I'll wire
all the `img` paths in one pass.

---

## Cost / effort snapshot
- 6 LoRA trainings ≈ **$12** and a couple hours total on fal.ai.
- Generations are cents each; budget a few tries per flavor.
- Biggest time cost is **gathering good multi-angle reference photos** — that's
  what makes or breaks product consistency.
