// Concept test v2 (matches user's reference): crushed-ice refresher where the
// fruit SYRUP blends down THROUGH the crushed ice in a smooth vertical ombre,
// with a few thin fruit pieces resting at the top. Strawberry, 2 variations.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/spark`;
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
  "Edit ONLY the drink inside the clear glass can. Make it a strawberry sparkling tonic — the body is clear SPARKLING " +
  "CARBONATED WATER with fine natural bubbles throughout (a fizzy sparkling drink, NOT crushed ice, NOT a slushie, NOT " +
  "frozen). At the very top, cluster a few thin strawberry slices and small cut strawberry pieces resting at the surface — " +
  "ONLY the red strawberry fruit, absolutely NO green leaves, NO stems, NO hulls, NO green caps. At the very bottom, a rich " +
  "glossy deep-red strawberry syrup settled and pooled as a layer. The red syrup color blends and diffuses smoothly UPWARD " +
  "from the bottom syrup pool and gently downward from the fruit at the top, through the clear sparkling water, in a soft " +
  "gradient with NO hard seam or boundary line — palest and clearest through the middle — so it reads as one cohesive " +
  "blended drink. Keep everything else exactly identical: the clear glass can shape, the aluminum lid, the printed DESERTO " +
  "logo and all its text, every water droplet, the background, framing and lighting. Do not add any text, extra logos, " +
  "labels, watermarks, or sparkle effects.";

const buf = fs.readFileSync(`${SP}/base.png`);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("ice-test strawberry…");
const res = await fal.subscribe("fal-ai/bytedance/seedream/v4/edit", {
  input: { prompt, image_urls: [image_url], num_images: 2, seed: 61001 },
});
const imgs = res?.data?.images || res?.images || [];
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${OUT}/strawberry-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
}
console.log(`saved ${imgs.length} → ${OUT}`);
