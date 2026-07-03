// Scones → bare front-facing scone cutouts (Dutch-Bros clean style, no bag/label).
// Uses each existing bag photo as a color/inclusion reference and regenerates a
// single triangular scone wedge on clean white. 2 images per flavor.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/scones";
fs.mkdirSync(SP, { recursive: true });
const PROD = "C:/Users/zkare/Repo/deserto/public/assets/products";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const COMMON =
  "Photorealistic bakery product photo of a SINGLE triangular SCONE wedge — a thick, rustic, golden-baked scone with a " +
  "soft crumbly texture and a lightly craggy top. Show ONLY the bare scone: absolutely NO packaging, NO plastic bag, NO " +
  "wrapper, NO paper label, NO price tag, NO text of any kind. Shoot the scone STRAIGHT-ON, FRONT-FACING at a natural near " +
  "eye-level angle, standing upright on its flat base with the triangular face toward the camera so its shape and toppings " +
  "are clearly visible. Center the scone in the frame. Pure seamless PLAIN WHITE studio background, soft even studio " +
  "lighting, one gentle soft contact shadow directly under the scone for grounding. Appetizing, crisp focus, realistic " +
  "crumb and texture. Do NOT add any text, labels, watermarks, sparkle effects, star glints, decorative artifacts, or any " +
  "third-party logos.";

const SCONES = [
  { key: "blueberry-lemon", src: "blueberry-lemon.jpg",
    detail: "Match the scone visible inside the reference package: a pale golden buttery scone studded with juicy dark " +
            "BLUEBERRIES bursting purple through the crumb, finished with a light drizzle of white LEMON glaze and a hint of " +
            "lemon zest." },
  { key: "vanilla-almond", src: "vanilla-almond.jpg",
    detail: "Match the scone visible inside the reference package: a golden vanilla scone topped with toasted sliced " +
            "ALMONDS and finished with a drizzle of white VANILLA glaze across the top." },
];

const only = process.argv.slice(2);
for (const c of SCONES) {
  if (only.length && !only.includes(c.key)) continue;
  process.stdout.write(`${c.key}: `);
  try {
    const buf = fs.readFileSync(`${PROD}/${c.src}`);
    const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
    const prompt = `${c.detail} ${COMMON}`;
    const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: { prompt, image_urls: [image_url], num_images: 2 },
    });
    const imgs = res?.data?.images || res?.images || [];
    let i = 0;
    for (const im of imgs) {
      const r = await fetch(im.url);
      fs.writeFileSync(`${SP}/${c.key}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
    }
    console.log(`saved ${imgs.length}`);
  } catch (e) { console.log(`FAILED: ${e.message}`); }
}
console.log(`\nraw → ${SP}`);
