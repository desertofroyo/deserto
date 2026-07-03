// Uniform Cookies NYC set: take ONE clean round front-facing cookie as the shape
// template and edit only dough color + inclusions so all three share the exact
// same silhouette, angle, lighting and shadow. 2 images per flavor.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/cookies";
const OUT = `${SP}/uniform`;
fs.mkdirSync(OUT, { recursive: true });
const TEMPLATE = `${SP}/white-chocolate-macadamia-raw-2.png`; // clean round front face

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const KEEP =
  "Keep the EXACT SAME cookie SHAPE, round silhouette, size, position, straight-on front-facing camera angle, soft studio " +
  "lighting, the single soft contact shadow, and the plain seamless WHITE background — do not move, rotate, reshape or " +
  "resize the cookie. Photorealistic thick NEW-YORK-STYLE cookie. Do NOT add any text, labels, watermarks, sparkle effects, " +
  "star glints, decorative artifacts, packaging, or any third-party logos.";

const COOKIES = [
  { key: "red-velvet-and-white-chocolate",
    edit: "Change ONLY the cookie's dough color and inclusions: recolor the whole crumb to a rich, even DEEP RED VELVET " +
          "cocoa-red (uniform velvety red, not brown, not blotchy), and add only 3 to 4 creamy WHITE CHOCOLATE chips that " +
          "look genuinely BAKED IN — softened and slightly MELTED into the dough, partly sunk below the surface with red " +
          "crumb rising around and over their edges, NOT whole chips sitting proud on top. They should be subtle and easy " +
          "to miss, half-hidden in the crumb, placed with natural off-center randomness (not evenly spaced, not in a ring or " +
          "grid) with large areas of completely bare red surface. Remove any macadamia nuts. Keep the surface smooth and " +
          "evenly craggy." },
  { key: "chocolate-chip-and-walnut",
    edit: "Change ONLY the cookie's inclusions: keep the warm GOLDEN dough but replace the white chocolate and macadamias " +
          "with dark CHOCOLATE CHIPS and toasted WALNUT pieces scattered evenly across the surface. Keep the surface evenly " +
          "craggy and golden." },
];

const only = process.argv.slice(2);
const buf = fs.readFileSync(TEMPLATE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("template uploaded. editing…\n");

for (const c of COOKIES) {
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
