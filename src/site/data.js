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
    { en: "Menu", id: "menu" },
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

  /* ---- "What we make" highlight cards (main page) ---- */
  highlights: [
    { slug: "froyo", name: "Self-Serve Froyo", desc: "Six rotating flavors at the swirl wall, with a bar of curated toppings.", img: "product-froyo-cup.jpg", pos: "center 55%" },
    { slug: "tonics", name: "Tonic Drinks", desc: "Eight fruity sparklers, served in our signature cans.", img: "product-tonic-berry.jpg", pos: "center 45%" },
    { slug: "coffee", name: "Coffee", desc: "Espresso classics — lattes, macchiatos, chai — hot or iced.", img: "product-iced-macchiato.jpg", pos: "center 45%" },
    { slug: "pastries", name: "Pastries & Cake Jars", desc: "NYC-style cookies, scones, and layered cake jars.", img: "tulips-drinks.jpg", pos: "center 78%" },
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
  products: [
    /* --- Frozen Yogurt — self-serve only (flavors rotate seasonally) --- */
    { id: "fy-selfserve", cat: "froyo", group: "", name: "Self-Serve Frozen Yogurt", desc: "Build your own at the swirl wall — seasonal rotating flavors and a full toppings bar. Made your way, in the shop.", instore: true, img: "macro-swirl.jpg" },
    /* --- Tonics — one house entry (seasonal flavors; recipe kept in-house) --- */
    { id: "tonic-house", cat: "tonics", group: "", name: "House Tonics", desc: "Sparkling fruit tonics in our signature cans — refreshing seasonal flavors that rotate through the year. Ask about today's lineup.", tags: ["Seasonal"], img: "/assets/products/strawberry-tonic.jpg", tint: "var(--rose-200)" },
    /* --- Coffee --- */
    { id: "c-esp1", cat: "coffee", group: "Hot", name: "Espresso · Single", tint: "var(--caramel-100)" },
    { id: "c-esp2", cat: "coffee", group: "Hot", name: "Espresso · Double", tint: "var(--caramel-200)" },
    { id: "c-capp", cat: "coffee", group: "Hot", name: "Cappuccino", img: "/assets/products/cappuccino.jpg", tint: "var(--peach-100)" },
    { id: "c-latte", cat: "coffee", group: "Hot", name: "Hot Latte", img: "/assets/products/hot-latte.jpg", tint: "var(--caramel-100)" },
    { id: "c-macch", cat: "coffee", group: "Hot", name: "Hot Macchiato", img: "/assets/products/hot-macchiato.jpg", tint: "var(--caramel-100)" },
    { id: "c-chai", cat: "coffee", group: "Hot", name: "Hot Chai Latte", tint: "var(--peach-200)" },
    { id: "c-amer", cat: "coffee", group: "Hot", name: "Americano", img: "/assets/products/americano.jpg", tint: "var(--sand-200)" },
    { id: "c-ilatte", cat: "coffee", group: "Iced", name: "Iced Latte", img: "/assets/products/iced-latte.jpg", tint: "var(--caramel-100)" },
    { id: "c-iamer", cat: "coffee", group: "Iced", name: "Iced Americano", img: "/assets/products/iced-americano.jpg", tint: "var(--caramel-100)" },
    { id: "c-imacch", cat: "coffee", group: "Iced", name: "Iced Macchiato", img: "/assets/products/iced-macchiato.jpg", tint: "var(--caramel-200)" },
    { id: "c-ichai", cat: "coffee", group: "Iced", name: "Iced Chai Latte", img: "/assets/products/iced-chai-latte.jpg", tint: "var(--sand-200)" },
    /* --- Pastries --- */
    { id: "p-redv", cat: "pastries", group: "Cookies NYC", name: "Red Velvet & White Chocolate", img: "/assets/products/red-velvet-and-white-chocolate.jpg", tint: "var(--rose-100)" },
    { id: "p-ccw", cat: "pastries", group: "Cookies NYC", name: "Chocolate Chip & Walnut", img: "/assets/products/chocolate-chip-and-walnut.jpg", tint: "var(--caramel-100)" },
    { id: "p-dcw", cat: "pastries", group: "Cookies NYC", name: "Double Chocolate & Walnut", tint: "var(--caramel-200)" },
    { id: "p-matcha", cat: "pastries", group: "Cookies NYC", name: "Matcha Chocolate Chip", tint: "var(--leaf-100)" },
    { id: "p-macad", cat: "pastries", group: "Cookies NYC", name: "White Chocolate Macadamia", img: "/assets/products/white-chocolate-macadamia.jpg", tint: "var(--peach-100)" },
    { id: "p-vanilla", cat: "pastries", group: "Scones", name: "Vanilla Almond Scone", img: "/assets/products/vanilla-almond.jpg", tint: "var(--sand-200)" },
    { id: "p-bluelem", cat: "pastries", group: "Scones", name: "Blueberry Lemon Scone", img: "/assets/products/blueberry-lemon.jpg", tint: "var(--rose-200)" },
    { id: "p-nutella", cat: "pastries", group: "Cake jars", name: "Chocolate Nutella Jar", tint: "var(--caramel-200)" },
    { id: "p-gansito", cat: "pastries", group: "Cake jars", name: "Gansito Cake Jar", img: "/assets/products/gansito-cake-jar.jpg", tint: "var(--rose-100)" },
    { id: "p-oreo", cat: "pastries", group: "Cake jars", name: "Oreo Cake Jar", img: "/assets/products/oreo-cake-jar.jpg", tint: "var(--sand-200)" },
    { id: "p-dot", cat: "pastries", group: "Cake jars", name: "Dot Cake", tint: "var(--peach-200)" },
    /* --- Extras --- */
    { id: "x-fiji", cat: "extras", group: "Drinks", name: "Fiji Water", tint: "var(--leaf-100)" },
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
