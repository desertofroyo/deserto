// Blended-tonic recipe applied to the LoRA-generated clean can (base.png) instead
// of the real photo -> menu-ready white bg + logo-mask alignment. Cold sparkling,
// syrup blended through the body as a soft gradient, thin sliced fruit at top.
// Mango, 2 images. Logo composited afterward by composite_lora_edit.py.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/loraedit`;
fs.mkdirSync(OUT, { recursive: true });
const BASE = `${SP}/base.png`;

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
  "Edit ONLY the drink inside this Deserto tonic can. Keep everything else exactly identical — the clear can shape, the " +
  "aluminum lid, the printed DESERTO logo and all its text, every water droplet, the clean white background, the framing " +
  "and the lighting. It is a photorealistic product photo. The drink is COLD SPARKLING WATER with fine natural bubbles and " +
  "condensation — NOT crushed ice, NOT a slushie, NOT frozen. " +
  `Make the drink's color ${SYRUP} blended smoothly through the whole body in a soft continuous vertical gradient — ` +
  "richest and deepest at the bottom, fading gently upward through the middle, with fine fruit pulp and flecks suspended " +
  "throughout so the color looks blended into the drink, not just pooled at the bottom, and the very top taking on a RED " +
  "to REDDISH strawberry-syrup tint around the fruit. The transitions are smooth with no hard line or seam. " +
  `At the very top, scatter FINELY CHOPPED, tiny diced ${FRUIT} — small confetti-sized bits and very thin small slivers ` +
  "only, mingled and swirled together with a red to reddish strawberry syrup. NO large slices, NO halves, NO whole " +
  "strawberries; every piece is small and finely chopped. Muted, natural color, not bright candy color. " +
  `Only real ${FRUIT} — no green leaves, stems, hulls or caps, and no other kind of fruit. Do not add any text, extra ` +
  "logos, labels, watermarks, sparkle effects, or star glints.";

const buf = fs.readFileSync(BASE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("lora-edit mango (from base.png)…");
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
