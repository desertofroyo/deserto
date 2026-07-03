// Final tonic generator: Seedream 4 edit from ONE clean can template (base.png),
// physics-based prompt, fruit clustered in the UPPER THIRD, per-flavor seed.
// Raw outputs -> bakeoff/seedream-batch/<key>-raw-N.png ; logo composited back
// afterward by composite_batch.py. Pass flavor keys as args to restrict.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/seedream-batch`;
fs.mkdirSync(OUT, { recursive: true });

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// Garnish clauses (physics-based). Only strawberry (thin freeze-dried slices) or
// blueberries, per the toppings rule. Both cluster in the UPPER THIRD.
const STRAW =
  "float thin, flat freeze-dried strawberry slices — thinly cut, semi-translucent where backlit, refracting through the " +
  "sparkling water and lit by the same light as the can; a few stray slices drift a little lower but the cluster stays in " +
  "the top third. A little red strawberry syrup bleeds and blends smoothly downward from the fruit";
const BLUE =
  "float whole fresh blueberries, partially submerged at and just beneath the surface, refracting through the sparkling " +
  "water with tiny bubbles clinging to their skins and lit by the same light as the can; a few drift a little lower but the " +
  "cluster stays in the top third. A little blue-purple blueberry juice bleeds and blends smoothly downward from the fruit";

const FLAVORS = [
  { key: "strawberry", name: "strawberry",   body: "soft red-pink",       short: "red-pink",  top: STRAW, garnish: "strawberry slices", forbid: "",                                  seed: 70701 },
  { key: "raspberry",  name: "raspberry",     body: "soft rosy-pink",      short: "rosy-pink", top: STRAW, garnish: "strawberry slices", forbid: "raspberries or raspberry pieces",    seed: 70702 },
  { key: "blueberry",  name: "blueberry",     body: "soft blue-purple",    short: "blue-purple", top: BLUE, garnish: "blueberries",       forbid: "",                                  seed: 70703 },
  { key: "mango",      name: "mango",         body: "soft golden-orange",  short: "golden-orange", top: STRAW, garnish: "strawberry slices", forbid: "mango slices or mango chunks",    seed: 70704 },
  { key: "peach",      name: "golden peach",  body: "soft warm peach-amber", short: "peach-amber", top: STRAW, garnish: "strawberry slices", forbid: "peach slices or peach chunks",  seed: 70705 },
  { key: "pineapple",  name: "pineapple",     body: "soft pale golden-yellow", short: "pale yellow", top: BLUE, garnish: "blueberries",     forbid: "pineapple slices or pineapple chunks", seed: 70706 },
  { key: "kiwi",       name: "kiwi",          body: "soft green",          short: "green",     top: STRAW, garnish: "strawberry slices", forbid: "kiwi slices or kiwi fruit",         seed: 70707 },
];

// NOTE: we deliberately never name the flavor fruit (e.g. "kiwi") — naming it makes
// Seedream drop that fruit into the glass. Flavor is conveyed purely by liquid COLOR;
// the only fruit ever shown is the strawberry/blueberry garnish.
const promptFor = (f) =>
  `Edit ONLY the liquid inside the clear glass can. Make it a photorealistic ${f.short}-colored sparkling fruit tonic — ` +
  `${f.body} flavored sparkling water. Concentrated in the upper third of the can, at and just beneath the liquid surface, ` +
  `${f.top} into the ${f.short} tonic in a soft gradient — no hard seam, no sharp boundary line. The liquid grows slightly ` +
  `richer ${f.short} toward the bottom, with fine natural carbonation bubbles throughout. The fruit shares the can's lighting, ` +
  `shadows and the refraction and distortion of the curved glass. The ONLY fruit visible anywhere in the entire glass is the ` +
  `${f.garnish} at the top — absolutely NO other fruit of any kind elsewhere in the drink: no kiwi, no mango, no peach, no ` +
  `pineapple, no raspberry, no citrus, no melon, no whole fruit and no fruit slices other than the ${f.garnish}. ` +
  `NO pasted-on or sticker-like fruit, no flat cut-out edges, no fruit resting flat on top as an overlay. Keep everything ` +
  `else exactly identical: the clear glass can shape, the aluminum lid, the printed DESERTO logo and all its text, every ` +
  `water droplet, the background, framing and lighting. Do not add any text, extra logos, labels, watermarks, or sparkle effects.`;

const only = process.argv.slice(2);
const buf = fs.readFileSync(`${SP}/base.png`);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("base uploaded. generating…\n");

for (const f of FLAVORS) {
  if (only.length && !only.includes(f.key)) continue;
  process.stdout.write(`${f.key}: `);
  try {
    const res = await fal.subscribe("fal-ai/bytedance/seedream/v4/edit", {
      input: { prompt: promptFor(f), image_urls: [image_url], num_images: 2, seed: f.seed },
    });
    const imgs = res?.data?.images || res?.images || [];
    let i = 0;
    for (const im of imgs) {
      const r = await fetch(im.url);
      fs.writeFileSync(`${OUT}/${f.key}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
    }
    console.log(`saved ${imgs.length}`);
  } catch (e) { console.log(`FAILED: ${e.message}`); }
}
console.log(`\nraw → ${OUT}  (run composite_batch.py next)`);
