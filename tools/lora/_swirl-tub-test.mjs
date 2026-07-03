// Proof: turn the small froyo serving cup (swirl-vanilla.png) into a taller 32 oz
// take-home PINT TUB, keeping the froyo swirl + DESERTO logo + clean white bg.
// Vanilla only, 2 images. Lock the container look before batching all 6 flavors.
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

// Flatten transparent PNG onto white so the edit model gets a clean white bg.
const { execSync } = await import("node:child_process");
const FLAT = `${SP}/vanilla-flat.png`;
execSync(`python -c "from PIL import Image; im=Image.open(r'${SRC}').convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); bg.convert('RGB').save(r'${FLAT}')"`);

const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const prompt =
  "Edit this product photo. Make the frozen-yogurt cup a SMALLER, standard single-serve froyo cup — a compact, short " +
  "round white paper cup (NOT a tall pint tub). The cup must be COMPLETELY BLANK: a plain clean white paper cup with " +
  "ABSOLUTELY NO logo, NO text, NO printing, NO markings of any kind on it — totally empty white surface. Keep the creamy " +
  "vanilla soft-serve froyo swirl rising in a neat peak above the rim, proportional to the smaller cup. Keep the clean " +
  "white background, the same soft studio lighting, the same straight-on framing and camera angle, with the cup roughly " +
  "centered in the frame. It is a photorealistic product photo. Do not add any text, logos, labels, watermarks, sparkle " +
  "effects, or star glints.";

const buf = fs.readFileSync(FLAT);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("swirl-tub vanilla proof (BLANK cup)…");
const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
  input: { prompt, image_urls: [image_url], num_images: 2 },
});
const imgs = res?.data?.images || res?.images || [];
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${SP}/vanilla-tub-${++i}.png`, Buffer.from(await r.arrayBuffer()));
}
console.log(`saved ${imgs.length} → ${SP}`);
