// Generate the two MISSING coffee items so the set is complete + homogeneous:
//   Hot Chai Latte (c-chai)  and  Espresso · Single (c-esp).
// Base = the clean existing hot-latte.png cutout (same white DESERTO paper cup),
// flattened onto white, edited via nano-banana-pro so the cup/logo/framing/lighting
// stay identical to the rest of the hot-cup family. 2 images each, cut out afterward.
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

// Flatten the transparent cutout onto white for a clean edit base.
const { execSync } = await import("node:child_process");
const FLAT = `${SP}/hot-latte-flat.png`;
execSync(`python -c "from PIL import Image; im=Image.open(r'${SRC}').convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); bg.convert('RGB').save(r'${FLAT}')"`);

const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const COMMON =
  "Keep the EXACT same white paper cup, the same printed DESERTO 'Frozen Yogurt & Café' logo in the same place and " +
  "size, the same clean white background, the same soft studio lighting, and the same straight-on framing and camera " +
  "angle. It is a photorealistic product photo. Do not change the cup or the logo. Do not add any extra text, labels, " +
  "watermarks, sparkle effects, star glints, or any third-party logos.";

const ITEMS = [
  {
    name: "hot-chai-latte",
    prompt:
      "Edit this product photo of a hot drink in a white paper cup. Change the drink inside to a HOT CHAI LATTE: the " +
      "surface visible above the rim should be warm creamy spiced-chai colored — a light golden cinnamon-tan latte with " +
      "a smooth microfoam top and a gentle dusting of cinnamon / chai spice, steamed-milk texture. Natural, appetizing, " +
      "not orange. " + COMMON,
  },
  {
    name: "espresso",
    prompt:
      "Edit this product photo of a hot drink in a white paper cup. Change the drink inside to a SINGLE ESPRESSO SHOT: " +
      "the surface visible above the rim should show a small amount of freshly pulled espresso — dark rich coffee topped " +
      "with a thick, glossy hazelnut-brown crema (natural fine-bubbled espresso crema), sitting lower in the cup as a " +
      "single short shot. Rich and concentrated looking. " + COMMON,
  },
];

const buf = fs.readFileSync(FLAT);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));

for (const it of ITEMS) {
  console.log(`${it.name}…`);
  const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: { prompt: it.prompt, image_urls: [image_url], num_images: 2 },
  });
  const imgs = res?.data?.images || res?.images || [];
  let i = 0;
  for (const im of imgs) {
    const r = await fetch(im.url);
    fs.writeFileSync(`${SP}/${it.name}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  }
  console.log(`  saved ${imgs.length} → ${it.name}-raw-*.png`);
}
console.log("coffee batch done →", SP);
