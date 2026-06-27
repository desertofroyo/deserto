/* build-menu.mjs — turns the owner's Google Sheet into the menu the site shows.
 *
 * WHAT IT DOES
 *   Runs automatically before every build (see package.json "prebuild").
 *   - If MENU_SHEET_CSV_URL is set (the owner's "publish to web" CSV link), it
 *     fetches that sheet, parses the rows, and writes src/site/menu.products.json.
 *   - If the variable is missing OR the fetch fails for any reason, it falls back
 *     to the seed catalog in src/site/data.js, so the build ALWAYS succeeds and
 *     the live site never shows a blank menu.
 *
 *   Prices are never read or written. The site does not show prices.
 *
 * SHEET COLUMNS (header row, any order, case-insensitive):
 *   Category | Group | Name | Description | Tags | Photo | InStoreOnly
 *     Category    one of: Frozen Yogurt, Tonics, Coffee, Pastries, Extras
 *     Group       optional sub-heading (e.g. "Hot", "Iced", "Cookies")
 *     Name        required — the row is skipped if this is blank
 *     Description optional one-liner
 *     Tags        optional, comma-separated (e.g. "Vegan, GF")
 *     Photo       optional — paste a full https:// image link, or leave blank
 *     InStoreOnly optional — "yes" shows an "In store" badge
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { SITE } from "../src/site/data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/site/menu.products.json");
const CSV_URL = process.env.MENU_SHEET_CSV_URL?.trim();

/* Friendly category names (and slugs) -> internal slug. Built from data.js so the
   two never drift. */
const CAT_BY_KEY = (() => {
  const map = {};
  for (const c of SITE.categories) {
    map[c.slug.toLowerCase()] = c.slug;
    map[c.name.toLowerCase()] = c.slug;
  }
  // a couple of forgiving aliases
  map["froyo"] = "froyo";
  map["frozen yoghurt"] = "froyo";
  return map;
})();

/* On-brand fallback tile color per category, for items with no photo. */
const TINT_BY_CAT = {
  froyo: "var(--leaf-100)", tonics: "var(--rose-100)", coffee: "var(--caramel-100)",
  pastries: "var(--peach-100)", extras: "var(--sand-200)",
};

/* Minimal RFC-4180 CSV parser: handles quoted fields, commas/newlines inside
   quotes, and "" escaped quotes. Returns an array of string arrays. */
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  const s = text.replace(/\r\n?/g, "\n");
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inQuotes) {
      if (ch === '"') {
        if (s[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function normalizePhoto(raw) {
  const v = (raw || "").trim();
  if (!v) return undefined;
  if (v.startsWith("/") || /^https?:\/\//.test(v)) return v;   // absolute path or link
  return "/assets/products/" + v;                               // bare filename
}

/* Turn parsed CSV rows into the product objects the menu page renders. */
function rowsToProducts(rows) {
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name) => header.indexOf(name);
  const iCat = col("category"), iGroup = col("group"), iName = col("name"),
        iDesc = col("description"), iTags = col("tags"), iPhoto = col("photo"),
        iStore = col("instoreonly");
  if (iName < 0) throw new Error('Sheet is missing a "Name" column.');

  const seen = new Set();
  const out = [];
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const name = (cells[iName] || "").trim();
    if (!name) continue;                                        // blank row
    const catKey = (cells[iCat] || "").trim().toLowerCase();
    const cat = CAT_BY_KEY[catKey];
    if (!cat) { console.warn(`  · skipped "${name}" — unknown category "${cells[iCat] || ""}"`); continue; }

    let id = slugify(name) || `item-${r}`;
    while (seen.has(id)) id += "-x";
    seen.add(id);

    const tags = iTags >= 0
      ? (cells[iTags] || "").split(/[,;]/).map((t) => t.trim()).filter(Boolean)
      : [];
    const store = iStore >= 0 && /^(yes|y|true|x|1)$/i.test((cells[iStore] || "").trim());

    const p = { id, cat, group: (iGroup >= 0 ? cells[iGroup] : "").trim(), name };
    const desc = iDesc >= 0 ? (cells[iDesc] || "").trim() : "";
    if (desc) p.desc = desc;
    if (tags.length) p.tags = tags;
    const img = normalizePhoto(iPhoto >= 0 ? cells[iPhoto] : "");
    if (img) p.img = img;
    p.tint = TINT_BY_CAT[cat] || "var(--peach-100)";
    if (store) p.instore = true;
    out.push(p);
  }
  return out;
}

/* Strip price fields from the seed — the site never shows prices. */
function cleanSeed() {
  return SITE.products.map(({ price, priceLg, plus, ...keep }) => keep);
}

async function build() {
  let products, source;
  if (CSV_URL) {
    try {
      const res = await fetch(CSV_URL, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const parsed = rowsToProducts(parseCSV(await res.text()));
      if (!parsed.length) throw new Error("no usable rows");
      products = parsed;
      source = `Google Sheet (${parsed.length} items)`;
    } catch (err) {
      products = cleanSeed();
      source = `SEED FALLBACK — sheet fetch failed: ${err.message}`;
    }
  } else {
    products = cleanSeed();
    source = "seed (MENU_SHEET_CSV_URL not set)";
  }

  const json = JSON.stringify(products, null, 2) + "\n";
  writeFileSync(OUT, json);
  console.log(`[build-menu] wrote ${products.length} items from ${source}`);
}

build().catch((err) => {
  // Last-resort guard: never fail the build over the menu. Write the seed.
  console.error("[build-menu] unexpected error, writing seed:", err);
  writeFileSync(OUT, JSON.stringify(cleanSeed(), null, 2) + "\n");
});
