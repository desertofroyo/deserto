// Nano Banana (Gemini) edit proof: convert the can's contents to a strawberry
// tonic while keeping the can + logo intact. Instruction-based, no mask.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const prompt =
  "Edit ONLY the drink inside this clear glass can. Make it a strawberry tonic with THREE clear layers: " +
  "(1) at the VERY TOP, a cluster of small cut freeze-dried strawberry pieces gathered together at the surface — angular, " +
  "matte, lightweight dried-strawberry bits (not fresh juicy whole strawberries), and these dried pieces are sitting in and " +
  "soaking up a small amount of glossy, wet, deep-red strawberry syrup so they look saucy and juicy — a little pool of red " +
  "syrupy liquid mingling with the freeze-dried strawberry pieces at the top; " +
  "(2) the middle body is clear, lightly pink-tinted sparkling carbonated water with fine natural bubbles and NO fruit pieces; " +
  "(3) at the VERY BOTTOM, a rich deep-red strawberry syrup settled as a layer. " +
  "Keep the strawberry bits gathered ONLY at the top — do NOT scatter or suspend any strawberry pieces through the " +
  "middle or bottom of the drink. Keep the can shape, the glass, the metallic lid, the water droplets, the reflections, " +
  "and the maroon 'DESERTO' logo and its tagline EXACTLY as they are — unchanged, sharp, and undistorted. Photorealistic " +
  "studio product photography on a plain white background, crisp sharp focus. Do not add any text, extra logos, labels, " +
  "watermarks, or sparkle effects.";

const buf = fs.readFileSync(`${SP}/base.png`);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("editing with Nano Banana (2 variations)…");
const res = await fal.subscribe("fal-ai/nano-banana/edit", {
  input: { prompt, image_urls: [image_url], num_images: 2, aspect_ratio: "1:1", output_format: "png" },
});
const imgs = res?.data?.images || res?.images || [];
if (!imgs.length) { console.error("no images:", JSON.stringify(res).slice(0, 400)); process.exit(1); }
let i = 0;
for (const im of imgs) {
  const r = await fetch(im.url);
  fs.writeFileSync(`${SP}/nano-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  console.log(`saved nano-${i}.png (${im.width}x${im.height})`);
}
console.log("desc:", (res?.data?.description || res?.description || "").slice(0, 200));
