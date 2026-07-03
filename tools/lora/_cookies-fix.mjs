// Cookies NYC → bare cookie cutouts (Dutch-Bros clean style, no bag/label).
// Uses each existing bag photo as a color/inclusion reference and regenerates a
// single thick NYC-style bare cookie on clean white. 2 images per flavor.
// Raw → scratchpad/cookies/<key>-raw-{1,2}.png ; cut out + install afterward.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/cookies";
fs.mkdirSync(SP, { recursive: true });
const PROD = "C:/Users/zkare/Repo/deserto/public/assets/products";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const COMMON =
  "Photorealistic bakery product photo of a SINGLE thick, tall NEW-YORK-STYLE cookie — chunky, craggy, generously domed " +
  "with a slightly cracked crackly top and a soft chewy interior, the kind of oversized gourmet cookie. Show ONLY the bare " +
  "cookie: absolutely NO packaging, NO plastic bag, NO wrapper, NO paper label, NO price tag, NO text of any kind. Shoot the " +
  "cookie STRAIGHT-ON, FRONT-FACING and slightly top-down so the round craggy TOP FACE of the cookie faces the camera " +
  "directly — the full circular surface and all its inclusions are visible, centered and symmetric, with only a thin sliver " +
  "of the side edge showing. Do NOT shoot from a low 3/4 side angle. Center the cookie in the frame. " +
  "Pure seamless PLAIN WHITE studio background, soft even studio lighting, one gentle soft contact shadow directly under " +
  "the cookie for grounding. Appetizing, crisp focus, realistic crumb and texture. Do NOT add any text, labels, watermarks, " +
  "sparkle effects, star glints, decorative artifacts, or any third-party logos.";

const COOKIES = [
  { key: "white-chocolate-macadamia", src: "white-chocolate-macadamia.jpg",
    detail: "Match the cookie visible inside the reference package: a warm GOLDEN-BROWN cookie studded with chunks of creamy " +
            "WHITE CHOCOLATE and whole toasted MACADAMIA nuts, some peeking out of the craggy surface." },
  { key: "red-velvet-and-white-chocolate", src: "red-velvet-and-white-chocolate.jpg",
    detail: "Match the cookie visible inside the reference package: a deep RED VELVET cookie, rich cocoa-red color with a " +
            "lightly crackled top, studded with creamy WHITE CHOCOLATE chips scattered across and peeking out of the surface." },
  { key: "chocolate-chip-and-walnut", src: "chocolate-chip-and-walnut.jpg",
    detail: "Match the cookie visible inside the reference package: a classic GOLDEN chocolate-chip cookie packed with dark " +
            "CHOCOLATE CHIPS and toasted WALNUT pieces, thick and chewy with a craggy golden surface." },
];

const only = process.argv.slice(2);
for (const c of COOKIES) {
  if (only.length && !only.includes(c.key)) continue;
  process.stdout.write(`${c.key}: `);
  try {
    const buf = fs.readFileSync(`${PROD}/${c.src}`);
    const image_url = await fal.storage.upload(new Blob([buf], { type: "image/jpeg" }));
    const prompt = `${c.detail} ${COMMON}`;
    const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: { prompt, image_urls: [image_url], num_images: 2 },
    });
    const imgs = res?.data?.images || res?.images || [];
    let i = 0;
    for (const im of imgs) {
      const r = await fetch(im.url);
      fs.writeFileSync(`${SP}/${c.key}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
    }
    console.log(`saved ${imgs.length}`);
  } catch (e) { console.log(`FAILED: ${e.message}`); }
}
console.log(`\nraw → ${SP}`);
