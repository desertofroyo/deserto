// Bake-off: same strawberry BLEND prompt + same base can through several edit
// models, to compare blending quality. Robust to per-endpoint input shape and
// failures (logs + continues). 2 images each where supported.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/bakeoff2`;
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
  "Change ONLY the drink inside the clear glass can into a strawberry sparkling tonic. It must look like ONE single " +
  "continuous liquid whose color is a smooth vertical ombre gradient: a rich, glossy deep-red strawberry color at the " +
  "very bottom that fades gradually and seamlessly upward — through soft pink in the middle — to almost clear near the " +
  "top. The color transition is completely smooth with NO hard line, NO seam, NO separate layers or bands: the red is " +
  "diffused and dissolved into the sparkling water like fruit syrup mixing through soda. Fine natural carbonation bubbles " +
  "throughout. It is clear sparkling water tinted by the syrup — NOT crushed ice, NOT a slushie, NOT frozen, NOT opaque. " +
  "At the very top surface, rest just a few thin real strawberry slices and small cut strawberry pieces — only the red " +
  "strawberry fruit, absolutely NO green leaves, stems, hulls or caps. Keep everything else exactly identical: the clear " +
  "glass can shape, the aluminum lid, the printed DESERTO logo and all its text, every water droplet, the background, " +
  "framing and lighting. Do not add any text, extra logos, labels, watermarks, or sparkle effects.";

const buf = fs.readFileSync(`${SP}/base.png`);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));

// Each model: endpoint + input builder. Some use image_urls[], some image_url.
const MODELS = [
  { label: "nano-pro",     ep: "fal-ai/nano-banana-pro/edit",      input: { prompt, image_urls: [image_url], num_images: 2 } },
  { label: "flux-kontext", ep: "fal-ai/flux-pro/kontext/max",      input: { prompt, image_url, num_images: 2 } },
  { label: "qwen",         ep: "fal-ai/qwen-image-edit",           input: { prompt, image_url, num_images: 2 } },
  { label: "seedream",     ep: "fal-ai/bytedance/seedream/v4/edit", input: { prompt, image_urls: [image_url], num_images: 2, seed: 61001 } },
];

for (const m of MODELS) {
  try {
    console.log(`→ ${m.label} (${m.ep}) …`);
    const res = await fal.subscribe(m.ep, { input: m.input });
    const imgs = res?.data?.images || res?.images || [];
    let i = 0;
    for (const im of imgs) {
      const r = await fetch(im.url);
      fs.writeFileSync(`${OUT}/${m.label}-${++i}.png`, Buffer.from(await r.arrayBuffer()));
    }
    console.log(`   ✓ ${m.label}: saved ${imgs.length}`);
  } catch (e) {
    console.log(`   ✗ ${m.label} FAILED: ${e?.message || e}`);
  }
}
console.log(`done → ${OUT}`);
