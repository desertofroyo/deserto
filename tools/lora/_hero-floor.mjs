// Froyo hero — swap ONLY the distracting pink marble floor for a clean solid
// peach-cream studio shelf (no veining), keeping the cup, DESERTO logo, all
// garnish, the gradient wall, composition and resolution identical. 2 images.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/hero";
fs.mkdirSync(SP, { recursive: true });
const TEMPLATE = "C:/Users/zkare/Repo/deserto/public/assets/images/hero-froyo-scene.jpg";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const EDIT =
  "Change ONLY the surface/floor that the frozen-yogurt cup and the fruit are resting on. Replace the pink-beige MARBLE " +
  "slab and ALL of its veining and stone texture with a clean, solid PEACH-CREAM studio SHELF: a smooth matte warm " +
  "peach-cream tabletop with NO marble veins, NO stone speckle, NO pattern of any kind — just an even, soft peach-cream " +
  "tone that harmonises with the backdrop wall. It meets the wall at a soft, crisp horizon edge, with a gentle soft " +
  "contact shadow beneath the cup, strawberries, blueberries, orange slice and granola so they stay grounded and realistic.";

const KEEP =
  "Keep EVERYTHING ELSE in the image EXACTLY the same: the white frozen-yogurt cup with its printed brown 'DESERTO' " +
  "wordmark and golden 'Frozen Yogurt & Café' line, the swirled froyo, the caramel drizzle, the granola clusters, the " +
  "strawberries, blueberries and orange slice, the white milk splash, the falling toppings and the thin caramel drip from " +
  "the top, the soft peach-to-sage gradient wall with its wispy white clouds, and the overall composition, product " +
  "position, framing, soft studio lighting, colours and crisp high resolution. Do not move, resize, add or remove any " +
  "product or garnish, and keep the whole image the same wide aspect ratio. Do NOT add any text, labels, watermarks, " +
  "sparkle effects, star glints, decorative artifacts, or any third-party logos.";

const buf = fs.readFileSync(TEMPLATE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
console.log("template uploaded. editing floor…\n");

try {
  const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: { prompt: `${EDIT} ${KEEP}`, image_urls: [image_url], num_images: 2 },
  });
  const imgs = res?.data?.images || res?.images || [];
  let i = 0;
  for (const im of imgs) {
    const r = await fetch(im.url);
    fs.writeFileSync(`${SP}/hero-froyo-peachfloor-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  }
  console.log(`saved ${imgs.length}`);
} catch (e) { console.log(`FAILED: ${e.message}`); }
console.log(`\nraw → ${SP}`);
