/* Deserto website — content model.
   The menu catalog below is the SEED / fallback for the menu page. At build
   time, scripts/build-menu.mjs swaps it for the owner's Google Sheet (when
   MENU_SHEET_CSV_URL is set) and writes src/site/menu.products.json, which the
   menu page reads. Prices are intentionally omitted everywhere.
   Deserto Frozen Yogurt & Café · 5635 E River Rd Unit 101, Tucson, AZ 85750 */
export const SITE = {
  store: {
    name: "Deserto Frozen Yogurt & Café",
    addr: "5635 E River Rd, Unit 101",
    city: "Tucson, AZ 85750",
    phone: "(520) 981-1029",
    hours: "Open daily · 10 AM – 10 PM",
    maps: "https://www.google.com/maps/search/?api=1&query=5635%20E%20River%20Rd%20Unit%20101%2C%20Tucson%2C%20AZ%2085750",
    img: "interior-froyo-arches.jpg",
  },

  /* ---- Delivery / ordering partners ----
     Deserto doesn't take orders on this site — guests browse the menu here and
     order through a delivery partner (or call / walk in). REPLACE the url of
     each partner below with Deserto's real store page on that platform. */
  delivery: [
    { name: "DoorDash", url: "https://www.doordash.com/", brand: "#FF3008", fg: "#fff" },
    { name: "Grubhub",  url: "https://www.grubhub.com/",  brand: "#E04A28", fg: "#fff" },
  ],

  nav: [
    { en: "What We Make", id: "menu" },
    { en: "Our Story", id: "story" },
    { en: "Visit", id: "locations" },
  ],

  /* ---- Seasonal hero imagery (rotates by date) ---- */
  seasons: [
    { id: "primavera", en: "Spring", accent: "var(--lime-500)", soft: "var(--leaf-100)", hero: "froyo-cup-mauve.jpg", heroPos: "center 38%" },
    { id: "verano", en: "Summer", accent: "var(--orange-500)", soft: "var(--orange-100)", hero: "strawberry-hand.jpg", heroPos: "center 42%" },
    { id: "otono", en: "Autumn", accent: "var(--caramel-500)", soft: "var(--peach-100)", hero: "cans-white-arches.jpg", heroPos: "center 50%" },
  ],

  /* ---- Hero product carousel (cutout product trios over the café interior) ---- */
  heroProducts: [
    { name: "Cake Jars", note: "Layered froyo, crumble & fruit", img: "/assets/products/hero-cakejars.png", tags: ["Layered", "New"] },
    { name: "Fruit Tonics", note: "Sparkling fruit, in our signature cans", img: "/assets/products/hero-tonics.png", tags: ["Sparkling", "Real fruit"] },
    { name: "Café Coffee", note: "Cold brew, lattes & more — hot or iced", img: "/assets/products/hero-coffee.png", tags: ["Espresso", "Iced"] },
  ],

  /* ---- "Our story" gallery carousel (wine section, arch frame) ---- */
  storyGallery: [
    { img: "hero-cafe-interior.jpg",     caption: "Our River Road flagship" },
    { img: "interior-froyo-arches.jpg",  caption: "Arches & soft desert light" },
    { img: "cans-white-arches.jpg",      caption: "Tonics in our signature cans" },
    { img: "strawberry-hand.jpg",        caption: "Fresh fruit, every day" },
    { img: "tulips-drinks.jpg",          caption: "Coffee, blooms & good company" },
  ],

  /* ---- "What we make" highlight cards (main page) ----
     Clean floating-product showcase: a cutout product shot, the category name,
     and one "View menu" link each. Replacement art should be a TRANSPARENT PNG
     cutout (product on no background, soft shadow baked out) so it floats on the
     sand section like the hero-*.png set. `to` is the menu anchor (cake jars
     live under the pastries category). */
  highlights: [
    { slug: "froyo", name: "Froyo", img: "/assets/products/froyo-cutout.png", to: "/menu#froyo" },
    { slug: "tonics", name: "Tonics", img: "/assets/products/hero-tonics.png", to: "/menu#tonics" },
    { slug: "coffee", name: "Coffee", img: "/assets/products/hero-coffee.png", to: "/menu#coffee" },
    { slug: "pastries", name: "Pastries & Cake Jars", img: "/assets/products/hero-cakejars.png", to: "/menu#pastries" },
  ],

  /* ---- The real catalog (Toast, June 2026) ---- */
  categories: [
    { slug: "froyo", name: "Frozen Yogurt" },
    { slug: "tonics", name: "Tonics" },
    { slug: "coffee", name: "Coffee" },
    { slug: "pastries", name: "Pastries" },
    { slug: "extras", name: "Extras" },
  ],
  /* `img` paths beginning with "/assets/products/" are catalog photos in
     /public/assets/products/; plain filenames are editorial/lifestyle shots in
     /assets/images/. `tint` is the colored load-fallback when there's no photo.
     Froyo flavors and tonic flavors rotate seasonally, so the menu deliberately
     shows the self-serve concept and a single house-tonics entry rather than a
     fixed flavor list the owner would have to keep correcting. */
  /* NUTRITION NOTE: `cal` (calories) and `macros` below are PLACEHOLDER
     estimates so the nutrition UI is visible — REPLACE them with Deserto's real
     lab/recipe figures via the owner's Google Sheet (Calories / Fat / Carbs /
     Protein columns). `allergens` are conservative "contains" lists derived from
     the listed ingredients; verify against actual recipes. Self-serve froyo and
     toppings carry no fixed numbers on purpose — they vary by build. */
  products: [
    /* --- Frozen Yogurt — self-serve only (flavors rotate seasonally) --- */
    { id: "fy-selfserve", cat: "froyo", group: "", name: "Self-Serve Frozen Yogurt", desc: "Build your own at the swirl wall — seasonal rotating flavors and a full toppings bar. Made your way, in the shop.", instore: true, img: "macro-swirl.jpg" },
    /* --- Tonics — one house entry (seasonal flavors; recipe kept in-house) --- */
    { id: "tonic-house", cat: "tonics", group: "", name: "House Tonics", desc: "Sparkling fruit tonics in our signature cans — refreshing seasonal flavors that rotate through the year. Ask about today's lineup.", tags: ["Seasonal", "Vegan", "GF"], img: "/assets/products/tonic-raspberry.jpg", tint: "var(--rose-200)" },
    /* --- Coffee --- */
    { id: "c-esp1", cat: "coffee", group: "Hot", name: "Espresso · Single", tags: ["Vegan", "GF"], cal: 5, tint: "var(--caramel-100)" },
    { id: "c-esp2", cat: "coffee", group: "Hot", name: "Espresso · Double", tags: ["Vegan", "GF"], cal: 10, tint: "var(--caramel-200)" },
    { id: "c-capp", cat: "coffee", group: "Hot", name: "Cappuccino", img: "/assets/products/cappuccino.jpg", allergens: ["Dairy"], cal: 130, tint: "var(--peach-100)" },
    { id: "c-latte", cat: "coffee", group: "Hot", name: "Hot Latte", img: "/assets/products/hot-latte.jpg", allergens: ["Dairy"], cal: 190, tint: "var(--caramel-100)" },
    { id: "c-macch", cat: "coffee", group: "Hot", name: "Hot Macchiato", img: "/assets/products/hot-macchiato.jpg", allergens: ["Dairy"], cal: 20, tint: "var(--caramel-100)" },
    { id: "c-chai", cat: "coffee", group: "Hot", name: "Hot Chai Latte", allergens: ["Dairy"], cal: 240, tint: "var(--peach-200)" },
    { id: "c-amer", cat: "coffee", group: "Hot", name: "Americano", img: "/assets/products/americano.jpg", tags: ["Vegan", "GF"], cal: 15, tint: "var(--sand-200)" },
    { id: "c-ilatte", cat: "coffee", group: "Iced", name: "Iced Latte", img: "/assets/products/iced-latte.jpg", allergens: ["Dairy"], cal: 180, tint: "var(--caramel-100)" },
    { id: "c-iamer", cat: "coffee", group: "Iced", name: "Iced Americano", img: "/assets/products/iced-americano.jpg", tags: ["Vegan", "GF"], cal: 15, tint: "var(--caramel-100)" },
    { id: "c-imacch", cat: "coffee", group: "Iced", name: "Iced Macchiato", img: "/assets/products/iced-macchiato.jpg", allergens: ["Dairy"], cal: 25, tint: "var(--caramel-200)" },
    { id: "c-ichai", cat: "coffee", group: "Iced", name: "Iced Chai Latte", img: "/assets/products/iced-chai-latte.jpg", allergens: ["Dairy"], cal: 230, tint: "var(--sand-200)" },
    /* --- Pastries --- */
    { id: "p-redv", cat: "pastries", group: "Cookies NYC", name: "Red Velvet & White Chocolate", img: "/assets/products/red-velvet-and-white-chocolate.jpg", allergens: ["Wheat", "Dairy", "Eggs", "Soy"], cal: 600, macros: { fat: 30, carbs: 76, protein: 7 }, tint: "var(--rose-100)" },
    { id: "p-ccw", cat: "pastries", group: "Cookies NYC", name: "Chocolate Chip & Walnut", img: "/assets/products/chocolate-chip-and-walnut.jpg", allergens: ["Wheat", "Dairy", "Eggs", "Nuts", "Soy"], cal: 620, macros: { fat: 33, carbs: 74, protein: 8 }, tint: "var(--caramel-100)" },
    { id: "p-dcw", cat: "pastries", group: "Cookies NYC", name: "Double Chocolate & Walnut", allergens: ["Wheat", "Dairy", "Eggs", "Nuts", "Soy"], cal: 640, macros: { fat: 34, carbs: 76, protein: 9 }, tint: "var(--caramel-200)" },
    { id: "p-matcha", cat: "pastries", group: "Cookies NYC", name: "Matcha Chocolate Chip", allergens: ["Wheat", "Dairy", "Eggs", "Soy"], cal: 590, macros: { fat: 29, carbs: 75, protein: 7 }, tint: "var(--leaf-100)" },
    { id: "p-macad", cat: "pastries", group: "Cookies NYC", name: "White Chocolate Macadamia", img: "/assets/products/white-chocolate-macadamia.jpg", allergens: ["Wheat", "Dairy", "Eggs", "Nuts", "Soy"], cal: 620, macros: { fat: 34, carbs: 73, protein: 7 }, tint: "var(--peach-100)" },
    { id: "p-vanilla", cat: "pastries", group: "Scones", name: "Vanilla Almond Scone", img: "/assets/products/vanilla-almond.jpg", allergens: ["Wheat", "Dairy", "Eggs", "Nuts"], cal: 430, macros: { fat: 22, carbs: 52, protein: 7 }, tint: "var(--sand-200)" },
    { id: "p-bluelem", cat: "pastries", group: "Scones", name: "Blueberry Lemon Scone", img: "/assets/products/blueberry-lemon.jpg", allergens: ["Wheat", "Dairy", "Eggs"], cal: 410, macros: { fat: 19, carbs: 55, protein: 6 }, tint: "var(--rose-200)" },
    { id: "p-nutella", cat: "pastries", group: "Cake jars", name: "Chocolate Nutella Jar", allergens: ["Wheat", "Dairy", "Eggs", "Nuts", "Soy"], cal: 540, macros: { fat: 28, carbs: 66, protein: 8 }, tint: "var(--caramel-200)" },
    { id: "p-gansito", cat: "pastries", group: "Cake jars", name: "Gansito Cake Jar", img: "/assets/products/gansito-cake-jar.jpg", allergens: ["Wheat", "Dairy", "Eggs", "Soy"], cal: 500, macros: { fat: 24, carbs: 64, protein: 6 }, tint: "var(--rose-100)" },
    { id: "p-oreo", cat: "pastries", group: "Cake jars", name: "Oreo Cake Jar", img: "/assets/products/oreo-cake-jar.jpg", allergens: ["Wheat", "Dairy", "Soy"], cal: 520, macros: { fat: 25, carbs: 68, protein: 5 }, tint: "var(--sand-200)" },
    { id: "p-dot", cat: "pastries", group: "Cake jars", name: "Dot Cake", allergens: ["Wheat", "Dairy", "Eggs", "Soy"], cal: 470, macros: { fat: 22, carbs: 62, protein: 5 }, tint: "var(--peach-200)" },
    /* --- Extras --- */
    { id: "x-fiji", cat: "extras", group: "Drinks", name: "Fiji Water", tags: ["Vegan", "GF"], cal: 0, tint: "var(--leaf-100)" },
    { id: "x-cstraw", cat: "extras", group: "DiLuna candles", name: "Strawberry Guava Candle", img: "guava-diluna.jpg", pos: "center 40%" },
    { id: "x-ccafe", cat: "extras", group: "DiLuna candles", name: "Cafecito Candle", tint: "var(--caramel-100)" },
  ],

  personality: [
    ["Cálida", "Warm"],
    ["Innovadora", "Innovative"],
    ["Creativa", "Creative"],
  ],
};

export default SITE;
