// Batch the 6 take-home swirl flavors: edit swirl-vanilla.png into a SMALLER blank
// white froyo cup with each flavor's swirl color (no logo — composited afterward by
// compose_logo.py, then cut out). nano-banana-pro, 2 images each.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/swirltub";
fs.mkdirSync(SP, { recursive: true });
const SRC = "C:/Users/zkare/Repo/deserto/public/assets/products/swirl-vanilla.png";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}

// Flatten transparent PNG onto white for a clean edit base.
const { execSync } = await import("node:child_process");
const FLAT = `${SP}/base-flat.png`;
execSync(`python -c "from PIL import Image; im=Image.open(r'${SRC}').convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); bg.convert('RGB').save(r'${FLAT}')"`);

const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// name → swirl froyo color description
const FLAVORS = [
  { name: "vanilla", color: "warm creamy pale ivory vanilla (soft natural cream, not bright white)" },
  { name: "tarte",   color: "cool bright tangy plain-yogurt white — a crisp cool white, clearly whiter and cooler than warm vanilla" },
  { name: "orange",  color: "bright natural orange, like orange sorbet (muted, not neon)" },
  { name: "caramel", color: "warm golden caramel tan (salted caramel)" },
  { name: "taro",    color: "soft muted lavender-purple (taro)" },
  { name: "guava",   color: "soft natural coral pink (guava)" },
];

function buildPrompt(color) {
  return (
    "Edit this product photo. Make the frozen-yogurt cup a SMALLER, standard single-serve froyo cup — a compact, short " +
    "round white paper cup (NOT a tall pint tub). The cup must be COMPLETELY BLANK: a plain clean white paper cup with " +
    "ABSOLUTELY NO logo, NO text, NO printing, NO markings of any kind on it — a totally empty white surface. " +
    `Recolor the soft-serve froyo swirl to ${color}, keeping the same swirl shape rising in a neat peak above the rim, ` +
    "the natural soft-serve texture, and the same soft studio lighting. Keep the clean white background, the same " +
    "straight-on framing and camera angle, with the cup roughly centered in the frame. It is a photorealistic product " +
    "photo. Do not add any text, logos, labels, watermarks, sparkle effects, or star glints."
  );
}

const buf = fs.readFileSync(FLAT);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));

for (const f of FLAVORS) {
  console.log(`swirl ${f.name}…`);
  const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: { prompt: buildPrompt(f.color), image_urls: [image_url], num_images: 2 },
  });
  const imgs = res?.data?.images || res?.images || [];
  let i = 0;
  for (const im of imgs) {
    const r = await fetch(im.url);
    fs.writeFileSync(`${SP}/${f.name}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  }
  console.log(`  saved ${imgs.length} → ${f.name}-raw-*.png`);
}
console.log("swirl batch done");
