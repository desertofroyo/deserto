// Back to Gemini (nano-banana) for the LIQUID — the model that gave the user's
// reference its smooth continuous blend. Logo weakness is patched later by the
// logo-composite step, so here we optimize purely for the blend. Strawberry, 3 variations.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/nano-blend`;
fs.mkdirSync(OUT, { recursive: true });

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// Blend-first wording: describe ONE continuous liquid whose color is a seamless
// vertical ombre (rich red at the bottom, fading to nearly clear near the top),
// with only a few fruit pieces at the very top. No "layers", no seam.
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
console.log("nano-blend strawberry (Gemini)…");
const res = await fal.subscribe("fal-ai/nano-banana/edit", {
  input: { prompt, image_urls: [image_url], num_images: 3 },
});
const imgs = res?.data?.images || res?.images || [];
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${OUT}/strawberry-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
}
console.log(`saved ${imgs.length} → ${OUT}`);
