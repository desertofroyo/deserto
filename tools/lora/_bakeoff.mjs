// Controlled bake-off: KIWI tonic, same physics-based prompt, fixed seed.
//   A) fal-ai/bytedance/seedream/v4/edit  (no mask, whole-image edit)
//   B) fal-ai/flux-lora/inpainting        (mask = liquid interior only)
// Raw outputs saved as *-raw-N.png. Logo is composited back in a separate
// python step so the brand is pixel-perfect regardless of model.
import fs from "node:fs";
import path from "node:path";

const SP = "C:/Users/zkare/AppData/Local/Temp/claude/C--Users-zkare-Repo-deserto/f843377a-c1f0-4ddc-98ad-0e3fd9d314a9/scratchpad/inpaint";
const OUT = `${SP}/bakeoff`;
fs.mkdirSync(OUT, { recursive: true });

if (!process.env.FAL_KEY) {
  for (const l of fs.readFileSync(path.resolve("../../.env"), "utf8").split(/\r?\n/)) {
    const m = l.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); break; }
  }
}
const { fal } = await import("@fal-ai/client");
fal.config({ credentials: process.env.FAL_KEY });

const SEED = 70707;

// Physics-based prompt: describe how the fruit SITS in the liquid, forbid pasted-on.
const prompt =
  "Edit ONLY the liquid inside the clear glass can. Make it a photorealistic kiwi tonic: soft green flavored sparkling " +
  "water. Floating at and just beneath the liquid surface are thin, flat freeze-dried strawberry slices — thinly cut, " +
  "semi-translucent where backlit, refracting through the sparkling water and lit by the same light as the can. A little " +
  "red strawberry syrup bleeds and blends smoothly downward from the fruit into the green tonic in a soft gradient — no " +
  "hard seam, no sharp boundary line. The liquid grows slightly richer green toward the bottom, with fine natural " +
  "carbonation bubbles throughout. The fruit shares the can's lighting, shadows and the refraction and distortion of the " +
  "curved glass. NO pasted-on or sticker-like fruit, no flat cut-out edges, no fruit resting flat on top as an overlay. " +
  "Keep everything else exactly identical: the clear glass can shape, the aluminum lid, the printed DESERTO logo and all " +
  "its text, every water droplet, the background, framing and lighting. Do not add any text, extra logos, labels, " +
  "watermarks, or sparkle effects.";

const up = async (f) => await fal.storage.upload(new Blob([fs.readFileSync(f)], { type: "image/png" }));
const save = async (imgs, prefix) => {
  let i = 0;
  for (const im of imgs) {
    const r = await fetch(im.url);
    fs.writeFileSync(`${OUT}/${prefix}-raw-${++i}.png`, Buffer.from(await r.arrayBuffer()));
  }
  return imgs.length;
};

console.log("uploading base + full mask…");
const [baseUrl, maskUrl] = await Promise.all([up(`${SP}/base.png`), up(`${SP}/mask_full.png`)]);

// A) Seedream 4 edit
try {
  process.stdout.write("seedream: ");
  const res = await fal.subscribe("fal-ai/bytedance/seedream/v4/edit", {
    input: { prompt, image_urls: [baseUrl], num_images: 2, seed: SEED },
  });
  const imgs = res?.data?.images || res?.images || [];
  console.log(`saved ${await save(imgs, "seedream")}`);
} catch (e) { console.log("FAILED:", e.message); }

// B) Flux-lora inpainting (mask-confined)
try {
  process.stdout.write("flux-inpaint: ");
  const res = await fal.subscribe("fal-ai/flux-lora/inpainting", {
    input: {
      prompt, image_url: baseUrl, mask_url: maskUrl, image_size: "square_hd",
      strength: 0.95, num_inference_steps: 40, guidance_scale: 4.0, num_images: 2,
      output_format: "png", enable_safety_checker: false, seed: SEED,
    },
  });
  const imgs = res?.data?.images || res?.images || [];
  console.log(`saved ${await save(imgs, "flux")}`);
} catch (e) { console.log("FAILED:", e.message); }

console.log(`\nraw outputs → ${OUT}`);
