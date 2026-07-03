// Batch the 6 remaining tonic flavors from base.png with the locked blended-tonic
// recipe (nano-banana-pro, 2 imgs each). Reddish strawberry top + finely chopped
// fruit on all; flavor syrup color at the bottom. Blueberry = reddish-magenta
// syrup + dark blueberry bits. Logo composited afterward by composite_lora_batch.py.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/loraedit`;
fs.mkdirSync(OUT, { recursive: true });
const BASE = `${SP}/base.png`;

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

// Each: name, SYRUP (bottom→body color), FRUIT (top garnish), TOP (top syrup tint phrase)
const FLAVORS = [
  { name: "strawberry", syrup: "deep natural strawberry red syrup",       fruit: "strawberry", top: "a red to reddish strawberry syrup" },
  { name: "raspberry",  syrup: "deep magenta-red raspberry syrup",        fruit: "strawberry", top: "a red to reddish strawberry syrup" },
  { name: "kiwi",       syrup: "soft muted natural green kiwi syrup",      fruit: "strawberry", top: "a red to reddish strawberry syrup" },
  { name: "blueberry",  syrup: "deep reddish-magenta burgundy blueberry syrup", fruit: "blueberry",  top: "a deep reddish-magenta burgundy blueberry syrup" },
  { name: "peach",      syrup: "soft golden peach-pink syrup",            fruit: "strawberry", top: "a red to reddish strawberry syrup" },
  { name: "pineapple",  syrup: "bright natural yellow pineapple syrup",   fruit: "strawberry", top: "a red to reddish strawberry syrup" },
];

function buildPrompt({ syrup, fruit, top }) {
  return (
    "Edit ONLY the drink inside this Deserto tonic can. Keep everything else exactly identical — the clear can shape, the " +
    "aluminum lid, the printed DESERTO logo and all its text, every water droplet, the clean white background, the framing " +
    "and the lighting. It is a photorealistic product photo. The drink is COLD SPARKLING WATER with fine natural bubbles and " +
    "condensation — NOT crushed ice, NOT a slushie, NOT frozen. " +
    `Make the drink's color ${syrup} blended smoothly through the whole body in a soft continuous vertical gradient — ` +
    "richest and deepest at the bottom, fading gently upward through the middle, with fine fruit pulp and flecks suspended " +
    `throughout so the color looks blended into the drink, not just pooled at the bottom, and the very top taking on ${top} ` +
    "tint around the fruit. The transitions are smooth with no hard line or seam. " +
    `At the very top, scatter FINELY CHOPPED, tiny diced ${fruit} — small confetti-sized bits and very thin small slivers ` +
    `only, mingled and swirled together with ${top}. NO large slices, NO halves, NO whole ` +
    `${fruit === "blueberry" ? "berries" : "strawberries"}; every piece is small and finely chopped. Muted, natural color, not bright candy color. ` +
    `Only real ${fruit} — no green leaves, stems, hulls or caps, and no other kind of fruit. Do not add any text, extra ` +
    "logos, labels, watermarks, sparkle effects, or star glints."
  );
}

const buf = fs.readFileSync(BASE);
const image_url = await fal.storage.upload(new Blob([buf], { type: "image/png" }));

for (const f of FLAVORS) {
  console.log(`lora-edit ${f.name}…`);
  const res = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
    input: { prompt: buildPrompt(f), image_urls: [image_url], num_images: 2 },
  });
  const imgs = res?.data?.images || res?.images || [];
  let i = 0;
  for (const im of imgs) {
    const r = await fetch(im.url);
    fs.writeFileSync(`${OUT}/${f.name}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  }
  console.log(`  saved ${imgs.length} → ${OUT}/${f.name}-raw-*.png`);
}
console.log("batch done");
