/* Deserto website — content model.

   Owner-editable content now lives in /content/*.json and is managed through the
   Sveltia CMS at /admin (see docs/CMS-SETUP.md). This file is a thin assembler:
   it imports those JSON files and exposes them as the SITE object the app already
   expects, so every component keeps working unchanged. The non-content bits
   (nav structure, seasonal accents, brand personality) stay inline because they
   are structural/design, not things the owner edits.

   Deserto Frozen Yogurt & Café · 5635 E River Rd Unit 101, Tucson, AZ 85750
   Prices are intentionally omitted everywhere. */
import site from "../../content/site.json";
import hero from "../../content/hero.json";
import highlights from "../../content/highlights.json";
import categories from "../../content/categories.json";
import story from "../../content/story.json";
import menu from "../../content/menu.json";

export const SITE = {
  /* ---- Store details (CMS: "Store details") ---- */
  store: site.store,

  /* ---- Delivery / ordering partners (CMS: "Store details") ----
     Deserto doesn't take orders on this site — guests browse the menu here and
     order through a delivery partner (or call / walk in). */
  delivery: site.delivery,

  /* ---- Social profiles (CMS: "Store details") ---- */
  social: site.social || [],

  /* ---- Hero (CMS: "Home — Hero banner") ----
     The homepage photo carousel + the copy block beneath it (badge, headline,
     subtext, buttons). `photos` drives the carousel; the rest is the copy. */
  hero: hero,

  /* ---- "What we make" highlight cards (CMS: "Home — What we make") ---- */
  highlights: highlights.items,

  /* ---- "Our story" gallery carousel (CMS: "Home — Our story gallery") ---- */
  storyGallery: story.gallery,

  /* ---- Menu catalog (CMS: "Menu items") ---- */
  categories: categories.items,
  products: menu.items,

  /* ---- Navigation (structural — not owner-edited) ---- */
  nav: [
    { en: "What we make", id: "menu" },
    { en: "Our Story", id: "story" },
    { en: "Visit", id: "locations" },
  ],

  /* ---- Brand personality (design copy — not owner-edited) ---- */
  personality: [
    ["Cálida", "Warm"],
    ["Innovadora", "Innovative"],
    ["Creativa", "Creative"],
  ],
};

export default SITE;
