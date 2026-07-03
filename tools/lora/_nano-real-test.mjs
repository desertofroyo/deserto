// Match the REAL Deserto strawberry can (owner's photo):
//   TOP    = whole/halved fresh strawberries packed densely, rich deep-red syrup
//   MIDDLE = clear, pale, sparkling carbonated water (see-through)
//   BOTTOM = deep-red strawberry syrup pooled as a layer — NO fruit pieces down here
// Natural, slightly muted red (not candy-pink). nano-banana-pro. 3 variations.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/real`;
fs.mkdirSync(OUT, { recursive: true });

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const prompt =
  "Change ONLY the drink inside the clear glass can into a real strawberry sparkling tonic, photographed like a real product. " +
  "Three zones, top to bottom: " +
  "TOP THIRD — densely PACKED whole and halved fresh red strawberries clustered together and filling the top of the can, " +
  "generous and abundant, real chunky whole fruit (NOT thin slices, NOT dainty), sitting in rich deep-red strawberry syrup " +
  "concentrated around the fruit, with some fine carbonation bubbles. " +
  "MIDDLE — clear, pale, see-through SPARKLING CARBONATED WATER with fine natural bubbles; you can see straight through it " +
  "(NOT crushed ice, NOT a slushie, NOT frozen, NOT opaque). " +
  "BOTTOM — a rich, glossy deep-red strawberry syrup settled and pooled as a layer at the very bottom, its color rising " +
  "softly upward into the clear middle with no hard seam. IMPORTANT: NO strawberries and NO fruit pieces at the bottom — " +
  "the bottom is only smooth syrup. " +
  "Use only red strawberry fruit — absolutely NO green leaves, stems, hulls or caps, and no other kind of fruit. Keep the " +
  "color a natural, slightly muted strawberry red, not a bright candy pink. Keep everything else exactly identical: the " +
  "clear glass can shape, the aluminum lid, the printed DESERTO logo and all its text, every water droplet, the background, " +
  "framing and lighting. Do not add any text, extra logos, labels, watermarks, or sparkle effects.";

const buf = fs.readFileSync(`${SP}/base.png`);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("real-match strawberry (nano-pro)…");
const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
  input: { prompt, image_urls: [image_url], num_images: 3 },
});
const imgs = res?.data?.images || res?.images || [];
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${OUT}/strawberry-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
}
console.log(`saved ${imgs.length} → ${OUT}`);
