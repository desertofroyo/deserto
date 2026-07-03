// Unify the 4 hero scenes so the PRODUCTS share one stage — same right-anchored
// position, same floor baseline, and physically-graded relative sizes — WITHOUT
// flattening each scene's distinct background (that "advertisement spirit" the
// owner wants kept). We re-stage each product on a shared 2172x724 banner layout
// and outpaint each background to fill it. Relative product heights:
//   coffee cups 64%  >  tonics jars 58%  >  froyo cup 54% (medium)  >  cake jars 48%
// Shared anchor: group horizontal centre ~75% across; BASE on the floor at ~84%
// down; left ~56% kept open for the headline. 2 images per slide.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/hero-unify";
fs.mkdirSync(SP, { recursive: true });
const IMGDIR = "C:/Users/zkare/Repo/deserto/public/assets/images";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// Shared placement clause — IDENTICAL across all four so they line up when the
// carousel flips. {H} = how tall the tallest product stands (share of frame ht).
const layout = (product, H) =>
  `Re-stage this into a WIDE horizontal hero banner (3:1). Keep ${product} EXACTLY as they are — same shapes, contents, ` +
  `garnish, and the printed brown 'DESERTO' wordmark + golden 'Frozen Yogurt & Café' line, undistorted and fully legible. ` +
  `Do NOT redesign the product; only change its SIZE and POSITION in the frame. PLACEMENT (must match exactly): position the ` +
  `product group on the RIGHT with its horizontal CENTRE about 75% of the way across the frame and a comfortable margin from ` +
  `the right edge; the BASE of the products must rest on the floor at about 84% of the way DOWN the frame (a consistent ` +
  `baseline); scale the group so the TALLEST item stands about ${H}% of the total frame height. Keep the LEFT ~56% of the ` +
  `frame as open, uncluttered background with generous negative space for headline text. `;

const NEG =
  `Do NOT add any text, labels, watermarks, sparkle effects, star glints, decorative artifacts, or any third-party logos.`;

const SLIDES = [
  {
    key: "hero-coffee-scene", src: "hero-coffee-scene.jpg", H: 68,
    product: "the three coffee cups (one white hot cup and two clear iced cups) and the scattered coffee beans at their base",
    keep:
      "KEEP this scene's own background and extend/outpaint it to fill the wider banner: the warm PEACH-CREAM upper wall, the " +
      "soft OLIVE-GREEN organic wave that forms the lower floor, the pale peach organic blob shapes, the faint dotted-texture " +
      "accents and the soft tree-leaf shadow in the upper-left. Continue the olive floor curve and peach wall naturally into " +
      "the newly extended left area. Keep the loose coffee beans clustered at the base of the cups, resting on the floor.",
  },
  {
    key: "hero-tonics-scene", src: "hero-tonics-scene.jpg", H: 54,
    product: "the three tall clear fruit-tonic jars (berry-red, golden and orange) and their fruit garnish",
    keep:
      "All THREE jars stand DIRECTLY on the marble floor at the same level — NO riser, pedestal or stand under the middle jar. " +
      "Keep the printed 'DESERTO' wordmark HORIZONTAL and upright across each jar (reading left-to-right), NOT rotated or " +
      "vertical. KEEP this scene's own background and extend/outpaint it to fill the wider banner: the cream STUCCO wall with " +
      "its heavy PALM-FROND leaf shadows, the deep WINE curved side panel behind the jars on the right, and the glossy pale " +
      "MARBLE floor with its soft reflections and a few scattered ICE CUBES. Continue the marble floor and stucco wall " +
      "naturally into the extended left area. Keep the fresh raspberries, blueberries, lime wheel, orange wedge, strawberry " +
      "and mint at the base.",
  },
  {
    key: "hero-froyo-scene", src: "hero-froyo-scene.jpg", H: 50,
    product: "the single white frozen-yogurt cup with its swirl, caramel drizzle, granola and berry topping, the orange slice and the milk splash",
    keep:
      "KEEP this scene's own background and extend/outpaint it to fill the wider banner: the soft PEACH-CREAM wall with its " +
      "wispy white clouds fading toward pale sage, and the smooth matte PEACH-CREAM shelf the cup rests on, meeting the wall at " +
      "a soft horizon. Continue the wall and peach shelf naturally into the extended left area. Keep the strawberries, " +
      "blueberries, orange slice, granola clusters and the white milk splash beside the cup.",
  },
  {
    key: "hero-cakejars-scene", src: "hero-cakejars-scene.jpg", H: 40,
    product: "the three SHORT, stout layered Deserto cake jars (small dessert jars, clearly smaller than a coffee cup) and the scattered strawberries, blueberries, raspberries, Oreo cookies and chocolate crumbs",
    keep:
      "KEEP this scene's own background and extend/outpaint it to fill the wider banner: the warm PEACH-CREAM wall, the bright " +
      "ORANGE arch/circle at the top-right, the soft PALM-FROND shadows in the upper-left, and the smooth matte CARAMEL counter " +
      "(caramel deepening to coffee-brown at the base) meeting the wall at a crisp horizon. Continue the caramel counter and " +
      "peach wall naturally into the extended left area. Keep the berries and Oreo cookies grouped at the base of the jars.",
  },
];

const only = process.argv.slice(2);
for (const s of SLIDES) {
  if (only.length && !only.includes(s.key)) continue;
  process.stdout.write(`${s.key}: `);
  try {
    const buf = fs.readFileSync(`${IMGDIR}/${s.src}`);
    const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
    const prompt = `${layout(s.product, s.H)} ${s.keep} Keep the soft warm studio lighting, the scene's colours and crisp high resolution, and make the whole image a wide 3:1 banner. ${NEG}`;
    const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: { prompt, image_urls: [image_url], num_images: 2 },
    });
    const imgs = res?.data?.images || res?.images || [];
    let i = 0;
    for (const im of imgs) {
      const r = await fetch(im.url);
      fs.writeFileSync(`${SP}/${s.key}-${++i}.png`, Buffer.from(await r.arrayBuffer()));
    }
    console.log(`saved ${imgs.length}`);
  } catch (e) { console.log(`FAILED: ${e.message}`); }
}
console.log(`\nraw → ${SP}`);
