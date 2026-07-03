// Concept test: "melted-in" fruit. The strawberry is muddled/dissolved INTO the
// drink as an infused wash of color with only a hint of pulp — NO distinct slices
// or countable pieces. One flavor (strawberry), 2 variations. Seedream 4 edit.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/melt`;
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
  "Edit ONLY the liquid inside the clear glass can. Make it a photorealistic strawberry-infused sparkling tonic: a smooth, " +
  "cohesive wash of natural strawberry red-pink color, as if ripe strawberries were muddled and blended INTO the sparkling " +
  "water and dissolved through it. The fruit has MELTED into the liquid — only a soft hint of very fine strawberry pulp and " +
  "tiny flecks suspended in the drink, slightly denser and richer toward the bottom, fading a touch lighter near the top. " +
  "Absolutely NO distinct or countable fruit anywhere: no whole strawberries, no strawberry slices, no chunks, no berries, " +
  "no fruit pieces sitting in the liquid — the fruit is fully dissolved so it reads as one cohesive infused beverage. Fine " +
  "natural carbonation bubbles throughout. Keep everything else exactly identical: the clear glass can shape, the aluminum " +
  "lid, the printed DESERTO logo and all its text, every water droplet, the background, framing and lighting. Do not add " +
  "any text, extra logos, labels, watermarks, or sparkle effects.";

const buf = fs.readFileSync(`${SP}/base.png`);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("melt-test strawberry…");
const res = await fal.subscribe("fal-ai/bytedance/seedream/v4/edit", {
  input: { prompt, image_urls: [image_url], num_images: 2, seed: 51001 },
});
const imgs = res?.data?.images || res?.images || [];
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${OUT}/strawberry-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
}
console.log(`saved ${imgs.length} → ${OUT}`);
