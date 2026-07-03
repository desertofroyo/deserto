#!/usr/bin/env node
/*
 * Deserto product-cutout LoRA pipeline runner.
 *
 * SAFE BY DEFAULT: every command that would call fal.ai or spend money is a
 * DRY RUN unless you pass --go. Dry runs print exactly what would happen
 * (payloads, prompts, files) and call nothing.
 *
 * The fal.ai API key is read from the FAL_KEY environment variable. It is never
 * printed, logged, or written to disk by this script.
 *
 *   Setup once:   cd tools/lora && npm install
 *   Set your key: $env:FAL_KEY = "..."   (PowerShell, current shell only)
 *
 * Commands (run from tools/lora/):
 *   node run.mjs scaffold [targetDir]      make off-repo dataset folders + caption guide (no key)
 *   node run.mjs caption <family> [dir]    auto-write .txt captions next to each photo (no key)
 *   node run.mjs train <family> [--go]     zip dataset, upload, train the family LoRA
 *   node run.mjs generate <family> [ids..] [--go]   render one white-bg image per flavor
 *   node run.mjs cutout <file..> [--go]    background-remove images to transparent PNG
 *   node run.mjs wire                      patch content/menu.json img paths for existing PNGs (no key)
 *   node run.mjs status                    show families, trained LoRAs, and which cutouts exist
 *
 * Typical flow for one family (e.g. the tonic vessel):
 *   1. Shoot 15-25 photos of the SAME can into  <targetDir>/tonic/
 *   2. node run.mjs caption tonic
 *   3. node run.mjs train tonic --go            (~$2, ~25 min)
 *   4. node run.mjs generate tonic --go         (renders every tonic flavor)
 *   5. node run.mjs cutout ./out/tonic/*.png --go
 *   6. node run.mjs wire                         (updates menu.json)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const CFG = JSON.parse(fs.readFileSync(path.join(__dirname, "families.json"), "utf8"));
const STATE_PATH = path.join(__dirname, ".state.json");
const PRODUCTS_DIR = path.join(REPO, "public", "assets", "products");
const OUT_DIR = path.join(__dirname, "out");
const DEFAULT_DATASET = "C:/Users/zkare/Desktop/deserto-lora";

const args = process.argv.slice(2);
const GO = args.includes("--go");
const rest = args.filter((a) => a !== "--go");
const cmd = rest[0];

const c = { dim: "\x1b[2m", red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m", cyan: "\x1b[36m", bold: "\x1b[1m", reset: "\x1b[0m" };
const say = (s = "") => console.log(s);
const dry = (s) => console.log(`${c.yellow}[dry-run]${c.reset} ${s}`);
const ok = (s) => console.log(`${c.green}✓${c.reset} ${s}`);
const die = (s) => { console.error(`${c.red}✗ ${s}${c.reset}`); process.exit(1); };

function loadState() { try { return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")); } catch { return { loras: {} }; } }
function saveState(s) { fs.writeFileSync(STATE_PATH, JSON.stringify(s, null, 2)); }
function fam(name) { const f = CFG.families[name]; if (!f) die(`Unknown family "${name}". Known: ${Object.keys(CFG.families).join(", ")}`); return f; }
function itemById(id) { for (const f of Object.values(CFG.families)) { const it = f.items.find((i) => i.id === id); if (it) return it; } return null; }

// Pull FAL_KEY from the repo .env if not already in the environment. The value
// is loaded straight into process.env and is never printed or logged.
function loadEnvKey() {
  if (process.env.FAL_KEY) return;
  const envPath = path.join(REPO, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*FAL_KEY\s*=\s*(.*)$/);
    if (m) { process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, ""); return; }
  }
}

async function getFal() {
  loadEnvKey();
  if (!process.env.FAL_KEY) die("FAL_KEY not set and not found in .env. Add it to .env, or:  $env:FAL_KEY = \"your-key\"");
  let mod;
  try { mod = await import("@fal-ai/client"); }
  catch { die("@fal-ai/client not installed. Run:  cd tools/lora && npm install"); }
  mod.fal.config({ credentials: process.env.FAL_KEY });
  return mod.fal;
}

/* ------------------------------------------------------------------ scaffold */
function scaffold() {
  const target = rest[1] || DEFAULT_DATASET;
  say(`${c.bold}Dataset scaffold${c.reset} → ${target}`);
  for (const [name, f] of Object.entries(CFG.families)) {
    const dir = path.join(target, name);
    fs.mkdirSync(dir, { recursive: true });
    const guide = [
      `# ${name} — reference photos for LoRA "${f.trigger}"`,
      ``,
      `Drop 15-25 photos of the SAME physical ${name} into this folder.`,
      `Vary ANGLE and DISTANCE (front, 3/4 left, 3/4 right, slight top-down), not the object.`,
      `Plain white/gray background, soft even light, product fills the frame, sharp focus.`,
      `No other brands, no hands, no text overlays.`,
      ``,
      `Then from tools/lora/:   node run.mjs caption ${name}`,
      `(auto-writes a .txt caption beside each photo using the "${f.trigger}" trigger word)`,
    ].join("\n");
    fs.writeFileSync(path.join(dir, "_READ-ME-FIRST.txt"), guide);
    ok(`${name}/  (trigger ${c.cyan}${f.trigger}${c.reset}, covers ${f.items.length} flavors)`);
  }
  say(`\nNext: put photos in each folder, then  ${c.cyan}node run.mjs caption <family>${c.reset}`);
}

/* ------------------------------------------------------------------- caption */
function caption() {
  const name = rest[1] || die("Usage: node run.mjs caption <family> [dir]");
  const f = fam(name);
  const dir = rest[2] || path.join(DEFAULT_DATASET, name);
  if (!fs.existsSync(dir)) die(`Folder not found: ${dir}`);
  const imgs = fs.readdirSync(dir).filter((n) => /\.(jpe?g|png|webp)$/i.test(n));
  if (!imgs.length) die(`No images in ${dir}. Add photos first.`);
  const tpls = CFG.captionTemplates.map((t) => t.replace("{trigger}", f.caption));
  let wrote = 0, skipped = 0;
  imgs.forEach((img, i) => {
    const txt = path.join(dir, img.replace(/\.[^.]+$/, ".txt"));
    if (fs.existsSync(txt)) { skipped++; return; }
    fs.writeFileSync(txt, tpls[i % tpls.length] + "\n");
    wrote++;
  });
  ok(`${name}: ${wrote} caption(s) written, ${skipped} already existed  (${imgs.length} photos)`);
  if (imgs.length < 15) say(`${c.yellow}note:${c.reset} only ${imgs.length} photos — 15+ recommended for a stable LoRA.`);
}

/* --------------------------------------------------------------------- train */
async function train() {
  const name = rest[1] || die("Usage: node run.mjs train <family> [--go]");
  const f = fam(name);
  const dir = rest[2] && rest[2] !== "--go" ? rest[2] : path.join(DEFAULT_DATASET, name);
  if (!fs.existsSync(dir)) die(`Dataset folder not found: ${dir}. Run scaffold + add photos first.`);
  const imgs = fs.readdirSync(dir).filter((n) => /\.(jpe?g|png|webp)$/i.test(n));
  const caps = fs.readdirSync(dir).filter((n) => /\.txt$/i.test(n) && n !== "_READ-ME-FIRST.txt");
  say(`${c.bold}Train ${name}${c.reset}  trigger=${c.cyan}${f.trigger}${c.reset}  photos=${imgs.length}  captions=${caps.length}`);
  if (!imgs.length) die("No photos found.");
  if (caps.length < imgs.length) say(`${c.yellow}warn:${c.reset} ${imgs.length - caps.length} photo(s) lack captions — run  node run.mjs caption ${name}`);

  const zipPath = path.join(OUT_DIR, `${name}-dataset.zip`);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (!GO) {
    dry(`zip ${dir}  →  ${zipPath}`);
    dry(`upload zip to fal storage`);
    dry(`fal.subscribe("fal-ai/flux-lora-fast-training", { images_data_url, trigger_word: "${f.trigger}", steps: 1200 })`);
    dry(`save resulting .safetensors URL to ${path.relative(REPO, STATE_PATH)} under loras.${name}`);
    say(`\nAdd ${c.cyan}--go${c.reset} to actually run (~$2, ~25 min).`);
    return;
  }

  // real run
  zipDir(dir, zipPath);
  ok(`zipped → ${zipPath}`);
  const fal = await getFal();
  say("uploading dataset…");
  const url = await fal.storage.upload(new Blob([fs.readFileSync(zipPath)], { type: "application/zip" }));
  ok("uploaded");
  say("training (this takes ~20-30 min)…");
  const res = await fal.subscribe("fal-ai/flux-lora-fast-training", {
    input: { images_data_url: url, trigger_word: f.trigger, steps: 1200 },
    logs: true,
    onQueueUpdate: (u) => u.status && process.stdout.write(`  ${u.status}\r`),
  });
  const loraUrl = res?.data?.diffusers_lora_file?.url || res?.diffusers_lora_file?.url;
  if (!loraUrl) die(`Training finished but no LoRA file URL in response: ${JSON.stringify(res).slice(0, 400)}`);
  const st = loadState(); st.loras[name] = loraUrl; saveState(st);
  ok(`trained. LoRA saved to state → loras.${name}`);
}

/* ------------------------------------------------------------------ generate */
async function generate() {
  const name = rest[1] || die("Usage: node run.mjs generate <family> [id..] [--go]");
  const f = fam(name);
  const ids = rest.slice(2).filter((a) => a !== "--go");
  const items = ids.length ? f.items.filter((i) => ids.includes(i.id)) : f.items;
  if (!items.length) die(`No matching items. Family ${name} has: ${f.items.map((i) => i.id).join(", ")}`);
  const st = loadState();
  const loraUrl = st.loras[name];
  const outDir = path.join(OUT_DIR, name);

  say(`${c.bold}Generate ${name}${c.reset}  (${items.length} flavor${items.length > 1 ? "s" : ""})  lora=${loraUrl ? c.green + "trained" + c.reset : c.red + "NOT trained" + c.reset}`);
  for (const it of items) {
    const prompt = CFG.basePrompt.replace("{trigger}", f.trigger).replace("{flavor}", it.flavor);
    say(`\n${c.cyan}${it.id}${c.reset} → ${it.file}${it.gap ? c.yellow + "  [gap — no photo yet]" + c.reset : ""}`);
    say(`  ${c.dim}${prompt}${c.reset}`);
    if (!GO) { dry(`fal-ai/flux-lora  scale 1.0, 1024x1024 → ${path.join(outDir, it.file)}`); continue; }
  }
  if (!GO) {
    say(`\n${c.dim}negative: ${CFG.negativePrompt}${c.reset}`);
    say(`\nAdd ${c.cyan}--go${c.reset} to render. (These are white-bg renders; cutout them next.)`);
    return;
  }
  if (!loraUrl) die(`Family "${name}" has no trained LoRA. Run:  node run.mjs train ${name} --go`);
  const fal = await getFal();
  fs.mkdirSync(outDir, { recursive: true });
  for (const it of items) {
    const prompt = CFG.basePrompt.replace("{trigger}", f.trigger).replace("{flavor}", it.flavor);
    process.stdout.write(`  rendering ${it.id}… `);
    const res = await fal.subscribe("fal-ai/flux-lora", {
      input: { prompt, negative_prompt: CFG.negativePrompt, loras: [{ path: loraUrl, scale: 1.0 }], image_size: "square_hd", num_images: 1, enable_safety_checker: false },
    });
    const imgUrl = (res?.data?.images || res?.images || [])[0]?.url;
    if (!imgUrl) { say(`${c.red}no image${c.reset}`); continue; }
    await download(imgUrl, path.join(outDir, it.file));
    say(`${c.green}✓${c.reset} ${it.file}`);
  }
  ok(`rendered to ${outDir}. Next:  node run.mjs cutout ${path.join(outDir, "*.png")} --go`);
}

/* -------------------------------------------------------------------- cutout */
async function cutout() {
  const files = rest.slice(1).filter((a) => a !== "--go").flatMap(expandGlob);
  if (!files.length) die("Usage: node run.mjs cutout <file..> [--go]");
  say(`${c.bold}Cutout${c.reset}  ${files.length} file(s) → ${path.relative(REPO, PRODUCTS_DIR)}`);
  if (!GO) {
    for (const fpath of files) dry(`fal-ai/birefnet background-removal  ${path.basename(fpath)} → ${path.join(PRODUCTS_DIR, path.basename(fpath).replace(/\.[^.]+$/, ".png"))}`);
    say(`\nAdd ${c.cyan}--go${c.reset} to remove backgrounds and write transparent PNGs.`);
    return;
  }
  const fal = await getFal();
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  for (const fpath of files) {
    process.stdout.write(`  ${path.basename(fpath)}… `);
    const url = await fal.storage.upload(new Blob([fs.readFileSync(fpath)]));
    const res = await fal.subscribe("fal-ai/birefnet", { input: { image_url: url } });
    const outUrl = res?.data?.image?.url || res?.image?.url;
    if (!outUrl) { say(`${c.red}failed${c.reset}`); continue; }
    const out = path.join(PRODUCTS_DIR, path.basename(fpath).replace(/\.[^.]+$/, ".png"));
    await download(outUrl, out);
    say(`${c.green}✓${c.reset} ${path.basename(out)}`);
  }
  ok(`done. Now:  node run.mjs wire`);
}

/* ---------------------------------------------------------------------- wire */
function wire() {
  const menuPath = path.join(REPO, "content", "menu.json");
  const raw = fs.readFileSync(menuPath, "utf8");
  const menu = JSON.parse(raw);
  let changed = 0;
  const report = [];
  for (const f of Object.values(CFG.families)) {
    for (const it of f.items) {
      const png = path.join(PRODUCTS_DIR, it.file);
      const item = menu.items.find((m) => m.id === it.id);
      if (!item) continue;
      const want = `/assets/products/${it.file}`;
      if (fs.existsSync(png) && item.img !== want) { item.img = want; changed++; report.push(`${c.green}+ ${it.id}${c.reset} → ${it.file}`); }
      else if (!fs.existsSync(png) && !item.img) report.push(`${c.dim}· ${it.id} still on coin (no ${it.file})${c.reset}`);
    }
  }
  report.forEach((r) => say("  " + r));
  if (!changed) { say(`\n${c.yellow}No changes${c.reset} — no new PNGs to wire.`); return; }
  if (!GO) { dry(`would set img on ${changed} item(s) in content/menu.json`); say(`\nAdd ${c.cyan}--go${c.reset} to write menu.json.`); return; }
  // preserve img as the 2nd field (after id) to match existing style
  fs.writeFileSync(menuPath, serializeMenu(menu));
  ok(`wired ${changed} item(s) into content/menu.json`);
}

/* -------------------------------------------------------------------- status */
function status() {
  const st = loadState();
  say(`${c.bold}Deserto LoRA pipeline status${c.reset}\n`);
  for (const [name, f] of Object.entries(CFG.families)) {
    const lora = st.loras[name] ? `${c.green}trained${c.reset}` : `${c.dim}not trained${c.reset}`;
    say(`${c.cyan}${name}${c.reset} (${f.trigger}) — LoRA ${lora}`);
    for (const it of f.items) {
      const has = fs.existsSync(path.join(PRODUCTS_DIR, it.file));
      const mark = has ? `${c.green}✓ cutout${c.reset}` : it.gap ? `${c.yellow}gap${c.reset}` : `${c.dim}coin${c.reset}`;
      say(`   ${mark.padEnd(20)} ${it.id.padEnd(13)} ${it.file}`);
    }
    say("");
  }
  const gaps = Object.values(CFG.families).flatMap((f) => f.items).filter((i) => i.gap && !fs.existsSync(path.join(PRODUCTS_DIR, i.file)));
  say(`${gaps.length} gap(s) still on the coin: ${gaps.map((g) => g.id).join(", ") || "none"}`);
}

/* ------------------------------------------------------------------- helpers */
function zipDir(dir, zipPath) {
  if (fs.existsSync(zipPath)) fs.rmSync(zipPath);
  // Windows PowerShell Compress-Archive (no extra npm dep). Zips the folder contents.
  execFileSync("powershell", ["-NoProfile", "-Command", `Compress-Archive -Path '${path.join(dir, "*")}' -DestinationPath '${zipPath}' -Force`], { stdio: "inherit" });
}
async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) die(`download failed ${r.status} for ${url}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
}
function expandGlob(pattern) {
  if (!/[*?]/.test(pattern)) return [pattern];
  const dir = path.dirname(pattern);
  const rx = new RegExp("^" + path.basename(pattern).replace(/[.]/g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "i");
  try { return fs.readdirSync(dir).filter((n) => rx.test(n)).map((n) => path.join(dir, n)); } catch { return []; }
}
// Re-serialize menu.json keeping "img" as the 2nd key so diffs stay clean.
function serializeMenu(menu) {
  const items = menu.items.map((it) => {
    const { id, img, ...restKeys } = it;
    const ordered = img ? { id, img, ...restKeys } : { id, ...restKeys };
    return ordered;
  });
  return JSON.stringify({ items }, null, 2) + "\n";
}

/* ---------------------------------------------------------------------- main */
const table = { scaffold, caption, train, generate, cutout, wire, status };
(async () => {
  if (!cmd || !table[cmd]) {
    say(`${c.bold}Deserto product-cutout LoRA runner${c.reset}`);
    say(`Commands: ${Object.keys(table).join(", ")}`);
    say(`Everything that spends money is a ${c.yellow}dry-run${c.reset} until you add ${c.cyan}--go${c.reset}.`);
    say(`\nSee tools/lora/README.md for the full walkthrough.`);
    process.exit(cmd ? 1 : 0);
  }
  await table[cmd]();
})().catch((e) => die(e?.message || String(e)));
