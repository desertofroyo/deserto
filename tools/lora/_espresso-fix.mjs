// Redo Espresso · Single: a SMALLER / SHORTER white DESERTO cup (not the tall latte
// cup) with a plain DARK BLACK espresso top (no thick crema foam). Same logo, white
// bg, lighting, framing. 2 images. Base = existing clean hot-latte.png cutout.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/coffee";
fs.mkdirSync(SP, { recursive: true });
const SRC = "C:/Users/zkare/Repo/deserto/public/assets/products/hot-latte.png";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}

const { execSync } = await import("node:child_process");
const FLAT = `${SP}/hot-latte-flat.png`;
if (!fs.existsSync(FLAT)) {
  execSync(`python -c "from PIL import Image; im=Image.open(r'${SRC}').convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); bg.convert('RGB').save(r'${FLAT}')"`);
}

const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const prompt =
  "Edit this product photo so the drink is served in a TINY ESPRESSO-SIZED white paper cup. Keep the EXACT SAME camera " +
  "angle and perspective as the input image — a straight-on, near eye-level front view where the cup opening reads as a " +
  "SHALLOW, narrow ellipse (you barely see down into the cup). Do NOT tilt the camera up or shoot from above; the rim " +
  "must stay a thin shallow ellipse, not a wide open circle. CHANGE THE CUP PROPORTIONS: this must be a SHORT, SQUAT " +
  "little espresso cup — roughly a 3 oz demitasse-sized paper cup that is WIDE relative to its HEIGHT (about as wide as " +
  "it is tall, a stout little cup). It is NOT a tall latte cup and NOT a tall cup scaled down — the walls are short and " +
  "the whole cup is stubby and small, the kind a single espresso shot is served in. Keep the same white paper cup " +
  "material and the same printed DESERTO 'Frozen Yogurt & Café' logo centered on the cup front (scaled to fit the small " +
  "cup), the same clean white background, and the same soft studio lighting. The drink is a SINGLE ESPRESSO: its visible " +
  "top surface is a plain, deep, almost BLACK espresso — a flat dark coffee surface with only a very thin natural crema " +
  "rim, NO thick foam, NO milk, NO latte art. Photorealistic product photo. Do not add any extra text, labels, " +
  "watermarks, sparkle effects, star glints, or any third-party logos.";

const buf = fs.readFileSync(FLAT);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("espresso (small, black top)…");
const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
  input: { prompt, image_urls: [image_url], num_images: 2 },
});
const imgs = res?.data?.images || res?.images || [];
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${SP}/espresso2-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
}
console.log(`saved ${imgs.length} → espresso2-raw-*.png`);
