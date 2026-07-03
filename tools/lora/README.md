# Deserto product-cutout LoRA pipeline

Turn a batch of phone photos of a product into a clean, transparent menu-card
cutout — consistently, one flavor at a time. This is the **runnable** version of
[`../../docs/product-lora-guide.md`](../../docs/product-lora-guide.md); read that
for the *why*. This README is the *how to run it*.

You do four manual things. The script does the rest:

1. **Shoot photos** of each container family (I can't do this).
2. **Paste your fal.ai key** into the shell (I never see it).
3. Run the commands below.
4. **Slap the logo on** at the very end, by hand (the model never renders text).

---

## Why it's safe to run

- **Dry-run by default.** `train`, `generate`, and `cutout` print exactly what
  they *would* send and call nothing. Add `--go` only when you mean it.
- **Your key stays yours.** The key is read from the `FAL_KEY` environment
  variable at call time. It is never printed, logged, or written to disk.
- **Nothing auto-commits.** `wire` edits `content/menu.json` locally; you review
  and commit yourself.

---

## One-time setup

```powershell
cd tools/lora
npm install                       # installs @fal-ai/client here only, not in the site
$env:FAL_KEY = "your-fal-key"     # current PowerShell window only; I never see this
```

Get a key at <https://fal.ai/dashboard/keys> (you create/pay for the account — I can't).

---

## Container families

One LoRA per **container**, not per flavor. Flavors are just prompt tweaks.

| Family    | Trigger        | Flavors it covers |
|-----------|----------------|-------------------|
| `tonic`   | `dsrttonic`    | 7 tonic flavors |
| `hotcup`  | `dsrthotcup`   | 6 hot coffees |
| `icedcup` | `dsrticedcup`  | 4 iced coffees |
| `jar`     | `dsrtjar`      | 2 cake jars |
| `cookie`  | `dsrtcookie`   | 3 NYC cookies |
| `scone`   | `dsrtscone`    | 2 scones |

Full config (trigger words, per-flavor prompts, output filenames) lives in
[`families.json`](families.json).

**You only need to train families that still have gaps.** Right now the 6 missing
cards are: Hot Chai (`hotcup`), Espresso (`hotcup`), Mango & Pineapple Tonic
(`tonic`), Vanilla Almond scone (`scone`), Oreo Cake Jar (`jar`). Run
`node run.mjs status` to see the live list.

---

## Full walkthrough (one family: `tonic`)

```powershell
# 0. See where things stand
node run.mjs status

# 1. Make the off-repo dataset folders + per-folder photo instructions
node run.mjs scaffold                      # → C:\Users\zkare\Desktop\deserto-lora\tonic\ ...

# 2. Put 15-25 photos of the SAME can into  ...\deserto-lora\tonic\
#    (front, 3/4 left, 3/4 right, slight top-down; plain background; sharp)

# 3. Auto-write a caption .txt beside each photo
node run.mjs caption tonic

# 4. Train the family LoRA  (dry-run first to preview, then --go)
node run.mjs train tonic                   # dry-run: shows the plan
node run.mjs train tonic --go              # ~$2, ~25 min; saves the LoRA to .state.json

# 5. Render one white-background image per flavor
node run.mjs generate tonic                # dry-run: shows every prompt
node run.mjs generate tonic --go           # → tools/lora/out/tonic/*.png
#    (or a subset:  node run.mjs generate tonic to-mango to-pineapple --go)

# 6. Background-remove to transparent PNGs in the site's assets folder
node run.mjs cutout out/tonic/*.png --go   # → public/assets/products/*.png

# 7. Wire the new PNGs into the menu data
node run.mjs wire                          # dry-run: shows what it'll set
node run.mjs wire --go                     # updates content/menu.json

# 8. Add the label/logo by hand in any editor, re-save the PNG. Done.
```

Repeat 1–8 per family. Skip families that are already fully covered.

---

## Commands

| Command | Key needed? | What it does |
|---------|:-----------:|--------------|
| `scaffold [dir]` | no | Creates dataset folders + a photo how-to in each. Default dir `C:\Users\zkare\Desktop\deserto-lora`. |
| `caption <family> [dir]` | no | Writes a `.txt` caption next to every photo that lacks one. |
| `train <family> [--go]` | yes (`--go`) | Zips the dataset, uploads, trains the family LoRA, saves its URL to `.state.json`. |
| `generate <family> [id..] [--go]` | yes (`--go`) | Renders one white-bg image per flavor (or just the ids you list). |
| `cutout <file..> [--go]` | yes (`--go`) | Background-removes images → transparent PNGs in `public/assets/products/`. |
| `wire [--go]` | no | Sets each item's `img` in `content/menu.json` for any PNG that now exists. |
| `status` | no | Lists families, which LoRAs are trained, and which cutouts exist vs. gaps. |

Notes:
- `.state.json`, `out/`, and `node_modules/` are git-ignored — local only.
- `wire` re-serializes `content/menu.json` with 2-space indent (keeps `img` as the
  second key). Review the diff before committing.
- No fal account yet, or no photos? You can still run `scaffold`, `caption`,
  `status`, and every dry-run to see the whole flow cost-free.

---

## Alternative for the 6 gaps: just re-shoot them

The pipeline shines for full consistency, but for **only 6 missing cards** the
cheapest path is often: photograph those 6 products on a plain white background,
drop the JPGs in `public/assets/products/`, and background-remove them (fal
`cutout`, remove.bg, or the local `rembg` we already used). No training needed.
Train a LoRA when you want *every* flavor to match perfectly or you'll refresh the
lineup often.
