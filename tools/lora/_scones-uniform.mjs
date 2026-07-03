// Uniform Scones set: take ONE clean front-facing triangular scone wedge as the
// shape template and edit only the crumb/toppings so both share the exact same
// silhouette, angle, lighting and shadow. 2 images per flavor.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/scones";
const OUT = `${SP}/uniform`;
fs.mkdirSync(OUT, { recursive: true });
const TEMPLATE = `${SP}/blueberry-lemon-raw-1.png`; // clean front-facing wedge

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const KEEP =
  "Keep the EXACT SAME scone SHAPE, triangular wedge silhouette, size, upright standing position, straight-on front-facing " +
  "camera angle, soft studio lighting, the single soft contact shadow, and the plain seamless WHITE background — do not " +
  "move, rotate, reshape or resize the scone. Photorealistic rustic golden-baked scone with a soft crumbly texture. Do NOT " +
  "add any text, labels, watermarks, sparkle effects, star glints, decorative artifacts, packaging, or any third-party logos.";

const SCONES = [
  { key: "vanilla-almond",
    edit: "Change ONLY the scone's crumb and toppings: make it a plain golden VANILLA scone — remove ALL blueberries and any " +
          "purple color so the crumb is an even warm golden vanilla. Top it with toasted SLICED ALMONDS scattered naturally " +
          "across the top and a thin drizzle of white VANILLA glaze zig-zagged over it. Keep the crumb crumbly and rustic." },
];

const only = process.argv.slice(2);
const buf = fs.readFileSync(TEMPLATE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("template uploaded. editing…\n");

for (const c of SCONES) {
  if (only.length && !only.includes(c.key)) continue;
  process.stdout.write(`${c.key}: `);
  try {
    const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: { prompt: `${c.edit} ${KEEP}`, image_urls: [image_url], num_images: 2 },
    });
    const imgs = res?.data?.images || res?.images || [];
    let i = 0;
    for (const im of imgs) {
      const r = await fetch(im.url);
      fs.writeFileSync(`${OUT}/${c.key}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
    }
    console.log(`saved ${imgs.length}`);
  } catch (e) { console.log(`FAILED: ${e.message}`); }
}
console.log(`\nraw → ${OUT}`);
