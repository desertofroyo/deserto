// Batch: regenerate all 7 tonic flavors from ONE clean can template (base.png)
// via Nano Banana edit, in the locked three-layer house style. Only syrup color
// + garnish change per flavor. Saves 2 variations each to scratchpad for review.
// Throwaway proof — delete after we pick finals and wire them in.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/tonics`;
fs.mkdirSync(OUT, { recursive: true });

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// House style: ONE cohesive drink that blends top-to-bottom (no pasted-on chunks,
// no hard seams). The GARNISH carries its OWN matching syrup color (strawberry->red,
// blueberry->blue-purple) which bleeds/diffuses down into the flavor-tinted body.
// Garnish is ONLY strawberry (freeze-dried bits) or blueberries, per the toppings rule.
const STRAW =
  `a light scattering of thin, flat, papery freeze-dried strawberry slices floating right at the surface — thinly cut crisp ` +
  `dried strawberry pieces like the freeze-dried strawberry slices you find in cereal, matte and lightweight, pale-to-deep red, ` +
  `some pieces dipping just below the waterline (NOT thick fresh juicy chunks, NOT a whole strawberry, NOT a dense dry mound). ` +
  `A little glossy red strawberry syrup bleeds from among them down into the drink`;
const BLUE =
  `a few whole blueberries floating and partially submerged right at the liquid surface — half above and half below the ` +
  `waterline, bobbing IN the drink with the sparkling water refracting around them and tiny bubbles clinging to their skins, ` +
  `each releasing a soft halo of blue-purple juice into the liquid, so they sit inside the drink rather than resting on top of it`;

const FLAVORS = [
  { key: "strawberry", name: "strawberry", body: "clear, lightly pink-tinted",        top: STRAW },
  { key: "raspberry",  name: "raspberry",  body: "clear, lightly rosy-pink-tinted",    top: STRAW },
  { key: "blueberry",  name: "blueberry",  body: "clear, lightly lavender-tinted",     top: BLUE  },
  { key: "mango",      name: "mango",      body: "soft golden-orange",                 top: STRAW },
  { key: "peach",      name: "golden peach", body: "soft warm peach-amber",            top: STRAW },
  { key: "pineapple",  name: "pineapple",  body: "soft pale golden-yellow",            top: BLUE  },
  { key: "kiwi",       name: "kiwi",       body: "soft green",                         top: STRAW },
];

const promptFor = (f) =>
  `Edit ONLY the drink inside this clear glass can, making it look like ONE cohesive, naturally blended ${f.name} tonic — a ` +
  `single continuous beverage, NOT separate stacked layers with hard lines, and NOT fruit pieces copy-pasted on top of a ` +
  `differently-colored liquid. At the top sits ${f.top}. This fruit and its syrup gently bleed and diffuse a short way downward ` +
  `in soft natural swirls, melting smoothly into the body of the drink with a gradual color transition and NO hard seam or ` +
  `horizontal line between the fruit and the liquid. The body is ${f.body} sparkling carbonated water with fine natural bubbles, ` +
  `growing a little richer and more saturated toward the bottom where a touch of matching ${f.name} syrup settles. Everything ` +
  `blends with smooth gradual gradients from top to bottom so it reads as one real, freshly-mixed beverage. Keep the can shape, ` +
  `the glass, the metallic lid, the water droplets, the reflections, and the maroon 'DESERTO' logo and its tagline EXACTLY as ` +
  `they are — unchanged, sharp, and undistorted. Photorealistic studio product photography on a plain white background, crisp ` +
  `sharp focus. Do not add any text, extra logos, labels, watermarks, or sparkle effects.`;

const only = process.argv.slice(2); // optional: restrict to given flavor keys
const buf = fs.readFileSync(`${SP}/base.png`);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("base uploaded. generating…\n");

for (const f of FLAVORS) {
  if (only.length && !only.includes(f.key)) continue;
  process.stdout.write(`${f.key}: `);
  try {
    const res = await fal.subscribe("fal-ai/nano-banana/edit", {
      input: { prompt: promptFor(f), image_urls: [image_url], num_images: 2, aspect_ratio: "1:1", output_format: "png" },
    });
    const imgs = res?.data?.images || res?.images || [];
    let i = 0;
    for (const im of imgs) {
      const r = await fetch(im.url);
      fs.writeFileSync(`${OUT}/${f.key}-${++i}.png`, Buffer.from(await r.arrayBuffer()));
    }
    console.log(`saved ${imgs.length} → ${f.key}-1.png, ${f.key}-2.png`);
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
  }
}
console.log(`\ndone → ${OUT}`);
