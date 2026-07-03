// One-off proof: inpaint the mango tonic FILL from a plain-language recipe,
// keeping the can + logo (protected by the mask). Delete after we're happy.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";

// FAL_KEY from repo .env (never printed)
if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// Corrected recipe: strawberry-only garnish (no fruit chunks), amber syrup at
// bottom, clean sparkling water, crisp focus (no blur), fine subtle bubbles.
const prompt =
  "a tall clear glass can of sparkling fruit tonic on a plain white background, " +
  "filled with crystal-clear golden carbonated sparkling water with only tiny fine even carbonation bubbles, " +
  "a smooth glossy layer of amber fruit syrup pooled at the bottom, fading gently upward into the clear sparkling water, " +
  "topped with a small cluster of fresh diced red strawberry chunks (small cut pieces of strawberry) floating at the very top, no whole strawberry, no other fruit, " +
  "clean minimal refreshing beverage, crisp sharp focus throughout, sharp fine detail, everything in focus, " +
  "bright even studio product photography, photorealistic, high resolution, " +
  "no fruit chunks, no cubes, no froth, no foam, no blur, no bokeh, " +
  "no text, no words, no letters, no logo, no label, no watermark, no sparkle effects, no star glints";

const up = async (f) => await fal.storage.upload(new Blob([fs.readFileSync(f)], { type: "image/png" }));
console.log("uploading base + mask…");
const [image_url, mask_url] = await Promise.all([up(`${SP}/base.png`), up(`${SP}/mask.png`)]);

console.log("inpainting (2 variations)…");
const res = await fal.subscribe("fal-ai/flux-lora/inpainting", {
  input: {
    prompt, image_url, mask_url,
    image_size: "square_hd",
    strength: 0.85,
    num_inference_steps: 40,
    guidance_scale: 4.0,
    num_images: 2,
    output_format: "png",
    enable_safety_checker: false,
  },
});
const imgs = res?.data?.images || res?.images || [];
if (!imgs.length) { console.error("no images:", JSON.stringify(res).slice(0, 400)); process.exit(1); }
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${SP}/result-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  console.log(`saved result-${i}.png (${im.width}x${im.height})`);
}
console.log("seed:", res?.data?.seed ?? res?.seed);
