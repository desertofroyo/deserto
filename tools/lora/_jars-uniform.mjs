// Uniform Cake Jars: use the crisp, well-shot Gansito jar as the shape template
// and edit ONLY the layered contents seen through the glass into an Oreo
// cookies-and-cream parfait — keeping the identical clear glass jar, aluminum
// screw lid, camera angle, lighting, resolution, printed DESERTO logo and white
// background. Produces an Oreo jar that matches the Gansito exactly. 2 images.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/jars";
const OUT = `${SP}/uniform`;
fs.mkdirSync(OUT, { recursive: true });
const TEMPLATE = "C:/Users/zkare/Repo/deserto/public/assets/products/gansito-cake-jar.png";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const KEEP =
  "Keep the EXACT SAME clear cylindrical GLASS JAR, the brushed aluminum screw-on LID at the identical slightly-elevated " +
  "front-on angle, the same jar size, shape and centered position, the same soft even studio lighting, the same single soft " +
  "contact shadow, the same crisp high resolution, and the plain seamless WHITE background. CRITICAL: preserve the printed " +
  "brown 'DESERTO' wordmark and its golden 'Frozen Yogurt & Café' line on the front of the glass EXACTLY as they are — same " +
  "font, color, size and position, fully legible, undistorted. Do not move, rotate, reshape or resize the jar. Do NOT add any " +
  "extra text, labels, watermarks, sparkle effects, star glints, decorative artifacts, or any third-party logos.";

const JARS = [
  { key: "oreo-cake-jar",
    edit: "Change ONLY the layered dessert visible INSIDE the glass jar (seen through the glass) into a COOKIES-AND-CREAM / " +
          "OREO parfait: clean horizontal layers of thick WHITE whipped cream alternating with generous layers of coarsely " +
          "CRUSHED DARK CHOCOLATE OREO COOKIE CRUMBLE (near-black cookie crumbs). Top layer is a smooth swirl of white cream " +
          "dusted and scattered with dark oreo cookie crumbs, with a few small chunky cookie pieces. Make the layers clean, " +
          "distinct and appetizing. Remove all the chocolate-ganache and golden cake-crumble Gansito filling." },
];

const only = process.argv.slice(2);
const buf = fs.readFileSync(TEMPLATE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));
console.log("template uploaded. editing…\n");

for (const c of JARS) {
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
