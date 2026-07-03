// Balance the hero carousel — bring tonics, coffee & cake-jars onto ONE unified
// template that matches the refined froyo slide, color-coded per the brand book:
//   tonics → rose/berry · coffee → caramel · cake jars → wine
// Every slide: LIGHT peach-cream LEFT (headline-safe negative space) → a soft
// brand-colour Deserto ARCH on the RIGHT behind the product → one consistent
// matte peach-cream SHELF floor with a soft horizon edge → product right at its
// existing scale → faint palm-frond shadow upper-left → orange only as pops.
// Products + DESERTO logos are preserved by editing the existing scene. 2 imgs.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/hero-balance";
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

// The shared template — identical for every slide except the {COLOR} accent and
// the per-slide "remove" clause. Wide cinematic hero banner aspect.
const templ = (color, colorField, removeClause, product, garnish) =>
  `Re-stage this wide hero banner into a clean, minimal, premium studio scene while keeping ${product} EXACTLY as they are. ` +
  `LAYOUT: the LEFT 55% of the frame must be smooth, LIGHT PEACH-CREAM with lots of clear empty negative space and only a ` +
  `faint soft palm-frond shadow in the upper-left corner — this area holds headline text so keep it light and uncluttered. ` +
  `On the RIGHT, directly BEHIND the products, place ONE soft ${colorField} shaped as a gentle rounded Deserto ARCH ` +
  `(tall arch silhouette) that frames the products. FLOOR: replace whatever surface the products stand on with a smooth MATTE ` +
  `PEACH-CREAM SHELF that meets the wall at a soft, crisp horizon edge, with a gentle soft contact shadow grounding the ` +
  `products. ${removeClause} ` +
  `KEEP the ${product} untouched: same DESERTO wordmark logos, same shapes, contents and ${garnish}, same size, grouping and ` +
  `right-of-centre position, resting on the shelf. Do not move, resize, add or remove any product. Soft even warm studio ` +
  `lighting, appetite-forward, photorealistic, crisp high resolution, same wide banner aspect ratio. Keep the colour ${color} ` +
  `confined to the arch on the right; keep any orange ONLY as tiny natural fruit pops, never as a background wash. Do NOT add ` +
  `any text, labels, watermarks, sparkle effects, star glints, decorative artifacts, or any third-party logos.`;

const SLIDES = [
  { key: "hero-froyo-scene", src: "hero-froyo-scene.jpg",
    prompt: templ(
      "soft peach / blush",
      "soft PEACH / blush color field",
      "Remove the sage-green tint in the background and the wispy white clouds so the wall is an even, clean, warm peach-cream; keep the existing peach-cream shelf.",
      "the single frozen-yogurt cup",
      "swirl, caramel drizzle, granola and berry garnish") },
  { key: "hero-tonics-scene", src: "hero-tonics-scene.jpg",
    prompt: templ(
      "rose / dusty-berry pink",
      "warm ROSE / dusty-berry pink color field",
      "Remove the glossy reflective MARBLE floor, the dark wine curved side panel and the heavy busy palm shadows.",
      "the three fruit-tonic cans",
      "fruit garnish (berries, citrus, mint)") },
  { key: "hero-coffee-scene", src: "hero-coffee-scene.jpg",
    prompt: templ(
      "caramel / warm coffee brown",
      "warm CARAMEL / coffee-brown color field",
      "Remove the olive-green and peach organic blob shapes and the olive-green floor; keep a few loose coffee beans scattered on the peach-cream shelf.",
      "the three coffee cups",
      "loose coffee beans") },
  { key: "hero-cakejars-scene", src: "hero-cakejars-scene.jpg",
    prompt: templ(
      "deep wine / maroon",
      "deep WINE / maroon color field",
      "Remove the bright orange arch/circle and the busy overlapping palm shadows.",
      "the three layered cake jars",
      "scattered berries, oreo cookies and chocolate") },
];

const only = process.argv.slice(2);
for (const s of SLIDES) {
  if (only.length && !only.includes(s.key)) continue;
  process.stdout.write(`${s.key}: `);
  try {
    const buf = fs.readFileSync(`${IMGDIR}/${s.src}`);
    const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
    const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: { prompt: s.prompt, image_urls: [image_url], num_images: 2 },
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
