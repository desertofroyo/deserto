// Background-remove the chosen chai + espresso variants (fal birefnet) and write
// transparent cutouts into public/assets/products/.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/coffee";
const DEST = "C:/Users/zkare/Repo/deserto/public/assets/products";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// pick → output filename
const PICKS = [
  { src: `${SP}/hot-chai-latte-raw-1.png`, out: "hot-chai-latte.png" },
  { src: `${SP}/espresso-raw-1.png`,        out: "espresso.png" },
];

for (const p of PICKS) {
  if (!fs.existsSync(p.src)) { console.log(`  MISSING ${p.src}`); continue; }
  process.stdout.write(`  ${p.out}… `);
  const url = await fal.storage.upload(new Blob([fs.readFileSync(p.src)], { type: "image/png" }));
  const res = await fal.subscribe("fal-ai/birefnet", { input: { image_url: url } });
  const outUrl = res?.data?.image?.url || res?.image?.url;
  if (!outUrl) { console.log("FAILED"); continue; }
  const r = await fetch(outUrl);
  fs.writeFileSync(`${DEST}/${p.out}`, Buffer.from(await r.arrayBuffer()));
  console.log("✓");
}
console.log("coffee cutout done →", DEST);
