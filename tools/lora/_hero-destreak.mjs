// Froyo hero — remove ONLY the weird thin vertical caramel drip streak falling
// from the top edge (and its stray droplet), filling with the clean peach-cream
// background. Everything else — cup, DESERTO logo, garnish, drizzle on the
// froyo, splash, wall, peach shelf — stays identical. 2 images.
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
  "Remove ONLY the thin vertical CARAMEL DRIP STREAK that falls from the TOP EDGE of the image down toward the frozen " +
  "yogurt — the long thin caramel line, its elongated drip and the small stray caramel droplet hanging in mid-air below " +
  "it. Cleanly paint that whole vertical strip out with the SAME smooth peach-cream gradient background that surrounds it, " +
  "so absolutely nothing remains where the streak was — no faint line, no smudge. Do NOT touch the caramel drizzle that " +
  "sits ON TOP of the swirled froyo in the cup; keep that exactly as it is.";

const KEEP =
  "Keep EVERYTHING ELSE in the image EXACTLY the same: the white frozen-yogurt cup with its printed brown 'DESERTO' " +
  "wordmark and golden 'Frozen Yogurt & Café' line, the swirled froyo and the caramel drizzle on it, the falling granola " +
  "clusters, the strawberries, blueberries and orange slice, the white milk splash, the soft peach-to-sage gradient wall " +
  "with its wispy white clouds, the clean peach-cream shelf, and the overall composition, product position, framing, soft " +
  "studio lighting, colours, aspect ratio and crisp high resolution. Do not move, resize, add or remove any product or " +
  "garnish. Do NOT add any text, labels, watermarks, sparkle effects, star glints, decorative artifacts, or any " +
  "third-party logos.";

const buf = fs.readFileSync(TEMPLATE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
console.log("template uploaded. removing streak…\n");

try {
  const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: { prompt: `${EDIT} ${KEEP}`, image_urls: [image_url], num_images: 2 },
  });
  const imgs = res?.data?.images || res?.images || [];
  let i = 0;
  for (const im of imgs) {
    const r = await fetch(im.url);
    fs.writeFileSync(`${SP}/hero-froyo-nostreak-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  }
  console.log(`saved ${imgs.length}`);
} catch (e) { console.log(`FAILED: ${e.message}`); }
console.log(`\nraw → ${SP}`);
