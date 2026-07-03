// Cake-jars hero — the scene is one seamless peach cyclorama, so the jars have
// no horizon and the ground "blends" into the wall. Introduce a distinct FLOOR
// plane: a warm CARAMEL counter (caramel #AE6434 → coffee #714826 at the base),
// meeting the peach wall at a crisp horizon so the jars are grounded. Keep the
// three jars + DESERTO logos, all berries/Oreos/chocolate, the orange arch and
// the palm-frond shadows EXACTLY as they are. 2 images.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/hero";
fs.mkdirSync(SP, { recursive: true });
const TEMPLATE = "C:/Users/zkare/Repo/deserto/public/assets/images/hero-cakejars-scene.jpg";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const EDIT =
  "This scene is currently one seamless peach backdrop with no distinct floor, so the products look ungrounded. Introduce " +
  "a clear FLOOR PLANE: turn the lower portion of the frame (the surface the jars, berries and cookies rest on) into a " +
  "smooth, matte WARM CARAMEL tabletop — a rich caramel-brown counter (colour like #AE6434) that deepens gently toward a " +
  "darker coffee-brown (#714826) at the very bottom edge. It meets the peach-cream wall at a soft but crisp HORIZON line " +
  "running behind the base of the jars, so there is a clear separation between wall and floor. The caramel surface is " +
  "clean and even — a subtle soft sheen is fine, but NO wood grain, NO planks, NO tile, NO marble veining, NO speckle or " +
  "busy pattern. Add a gentle soft contact shadow beneath each jar and beneath the scattered strawberries, blueberries, " +
  "raspberries, Oreo cookies and chocolate crumbs so they sit realistically ON the caramel counter.";

const KEEP =
  "Keep EVERYTHING ELSE EXACTLY the same: the three tall Deserto cake jars on the right (strawberry-cream, Oreo-cream and " +
  "chocolate layers) with their metal lids and their printed 'DESERTO' wordmark + 'Frozen Yogurt & Café' line, in the same " +
  "position, size and grouping; all of the scattered fresh strawberries, blueberries, raspberries, whole Oreo cookies and " +
  "chocolate shavings around the jars; the warm PEACH-CREAM wall above the new horizon; the bright ORANGE arch / circle at " +
  "the top-right; and the soft palm-frond leaf shadows in the upper-left. Preserve the overall composition, the empty " +
  "peach negative space on the left for headline text, the framing, the soft warm studio lighting, the colours and the " +
  "crisp high resolution, and keep the whole image the same wide banner aspect ratio. Do not move, resize, add or remove " +
  "any jar, fruit or cookie. Do NOT add any text, labels, watermarks, sparkle effects, star glints, decorative artifacts, " +
  "or any third-party logos.";

const buf = fs.readFileSync(TEMPLATE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
console.log("template uploaded. editing cake-jars floor…\n");

try {
  const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: { prompt: `${EDIT} ${KEEP}`, image_urls: [image_url], num_images: 2 },
  });
  const imgs = res?.data?.images || res?.images || [];
  let i = 0;
  for (const im of imgs) {
    const r = await fetch(im.url);
    fs.writeFileSync(`${SP}/hero-cakejars-caramelfloor-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  }
  console.log(`saved ${imgs.length}`);
} catch (e) { console.log(`FAILED: ${e.message}`); }
console.log(`\nraw → ${SP}`);
