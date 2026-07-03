// Background-remove the 6 composed swirl cups with fal birefnet and overwrite
// public/assets/products/swirl-<flavor>.png (transparent).
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/swirltub";
const DEST = "C:/Users/zkare/Repo/deserto/public/assets/products";

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const FLAVORS = ["vanilla", "tarte", "orange", "caramel", "taro", "guava"];

for (const flavor of FLAVORS) {
  const src = `${SP}/${flavor}-logo.png`;
  if (!fs.existsSync(src)) { console.log(`  MISSING ${src}`); continue; }
  process.stdout.write(`  ${flavor}… `);
  const url = await fal.storage.upload(new Blob([fs.readFileSync(src)], { type: "image/png" }));
  const res = await fal.subscribe("fal-ai/birefnet", { input: { image_url: url } });
  const outUrl = res?.data?.image?.url || res?.image?.url;
  if (!outUrl) { console.log("FAILED"); continue; }
  const r = await fetch(outUrl);
  fs.writeFileSync(`${DEST}/swirl-${flavor}.png`, Buffer.from(await r.arrayBuffer()));
  console.log(`✓ swirl-${flavor}.png`);
}
console.log("swirl cutout done →", DEST);
