// Image-to-image on a REAL Deserto can photo. Keep the real can/lid/logo/light/
// bg; blend the flavor syrup smoothly through the body as a soft vertical gradient
// (rich at bottom -> pale at top, fine pulp), thin sliced fruit swirled at top,
// COLD sparkling water (not ice). Test: mango from the real pineapple can. 2 imgs.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/realedit`;
fs.mkdirSync(OUT, { recursive: true });
const BASE = "C:/Users/zkare/Repo/deserto/reference/design-system/project/assets/images/product-tonic-pineapple.jpg";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const SYRUP = "warm golden-orange mango syrup";
const FRUIT = "strawberry";
const prompt =
  "Edit this real photograph of a Deserto tonic can. Keep the photo exactly as-is — the same clear can, the silver " +
  "screw-band lid, the cold sparkling water with fine bubbles and condensation/water droplets on the outside, the " +
  "tone-on-tone translucent burgundy DESERTO logo and its 'Frozen Yogurt & Café' text, the real casual daylight, shadows, " +
  "and background. Do not change the lighting, framing, or can shape, and do not make it look like a studio 3D render — it " +
  "stays a real casual photograph. It is cold sparkling water — NOT crushed ice, NOT a slushie, NOT frozen. " +
  `Change the drink so its color is ${SYRUP} blended smoothly through the whole body in a soft continuous vertical ` +
  "gradient — richest and deepest at the bottom, fading gently upward to a pale, light tint near the top, with fine fruit " +
  "pulp and flecks suspended throughout so the color looks blended into the drink, not just pooled at the bottom. The " +
  "transition is smooth with no hard line or seam. " +
  `At the very top under the lid, cluster THIN SLICES of ${FRUIT} mingled and swirled together with the syrup — thinly ` +
  "sliced, not whole. Muted, natural color, not bright candy color. " +
  `Only real ${FRUIT} — no green leaves, stems, hulls or caps, and no other kind of fruit. Do not add any text, extra ` +
  "logos, labels, watermarks, sparkle effects, or star glints.";

const buf = fs.readFileSync(BASE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
console.log("real-edit mango (from pineapple base)…");
const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
  input: { prompt, image_urls: [image_url], num_images: 2 },
});
const imgs = res?.data?.images || res?.images || [];
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${OUT}/mango-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
}
console.log(`saved ${imgs.length} → ${OUT}`);
