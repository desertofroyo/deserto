/* Deserto website — content model.
   SOURCE OF TRUTH: the real store's Toast online-ordering menu (June 2026)
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
    { name: "DoorDash",  url: "https://www.doordash.com/",  brand: "#FF3008", fg: "#fff" },
    { name: "Uber Eats", url: "https://www.ubereats.com/",  brand: "#06C167", fg: "#fff" },
    { name: "Postmates", url: "https://postmates.com/",     brand: "#0E0E0E", fg: "#fff" },
    { name: "Grubhub",   url: "https://www.grubhub.com/",   brand: "#E04A28", fg: "#fff" },
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
  /* `img` paths beginning with "/assets/products/" are the store's official
     Toast catalog photos (scraped from their live menu); plain filenames are
     editorial/lifestyle shots in /assets/images/. `tint` is the load-fallback. */
  products: [
    /* --- Frozen Yogurt --- */
    { id: "fy-weight", cat: "froyo", group: "Self-serve · in the shop", name: "Self-Serve Frozen Yogurt", desc: "Build it at the swirl wall — flavors rotate monthly.", price: 0.89, instore: true, img: "macro-swirl.jpg" },
    { id: "fy-waffle", cat: "froyo", group: "Cones", name: "Froyo with Waffle Cone", price: 6.0, img: "cone-twotone.jpg", pos: "center 30%" },
    { id: "fy-cake", cat: "froyo", group: "Cones", name: "Froyo with Cake Cone", price: 4.5, tint: "var(--peach-200)" },
    { id: "fy-cone-w", cat: "froyo", group: "Cones", name: "Extra Waffle Cone", price: 2.0, tint: "var(--caramel-100)" },
    { id: "fy-cone-c", cat: "froyo", group: "Cones", name: "Extra Cake Cone", price: 1.5, tint: "var(--sand-200)" },
    { id: "th-tarte", cat: "froyo", group: "Take-home 32 oz", name: "Premium Tarte", desc: "32 oz of our self-serve original.", price: 29.0, tags: ["Vegan", "GF", "DF"], img: "/assets/products/premium-tarte.jpg", tint: "var(--peach-100)" },
    { id: "th-guava", cat: "froyo", group: "Take-home 32 oz", name: "Guava", price: 29.0, tags: ["Vegan", "GF", "DF"], img: "/assets/products/guava.jpg", tint: "var(--rose-100)" },
    { id: "th-choc", cat: "froyo", group: "Take-home 32 oz", name: "Vegan Double Chocolate", price: 29.0, tags: ["Vegan", "GF", "DF"], img: "/assets/products/vegan-double-chocolate.jpg", tint: "var(--caramel-200)" },
    { id: "th-caramel", cat: "froyo", group: "Take-home 32 oz", name: "Salted Caramel", price: 29.0, tags: ["Vegan", "GF", "DF"], img: "/assets/products/salted-caramel.jpg", tint: "var(--caramel-100)" },
    { id: "th-taro", cat: "froyo", group: "Take-home 32 oz", name: "Taro", price: 29.0, tags: ["Vegan", "GF", "DF"], img: "/assets/products/taro.jpg", tint: "var(--rose-200)" },
    { id: "th-blue", cat: "froyo", group: "Take-home 32 oz", name: "Blueberry", price: 29.0, tags: ["Vegan", "GF", "DF"], img: "/assets/products/blueberry.jpg", tint: "var(--rose-200)" },
    /* --- Tonics (two sizes: 16 oz / 24 oz) --- */
    { id: "t-straw", cat: "tonics", group: "House tonics", name: "Strawberry Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/strawberry-tonic.jpg", tint: "var(--rose-200)" },
    { id: "t-peach", cat: "tonics", group: "House tonics", name: "Golden Peach Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/golden-peach-tonic.jpg", tint: "var(--peach-200)" },
    { id: "t-prickly", cat: "tonics", group: "House tonics", name: "Prickly Pear Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/prickly-pear-tonic.jpg", tint: "var(--rose-100)" },
    { id: "t-mango", cat: "tonics", group: "House tonics", name: "Mango Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/mango-tonic.jpg", tint: "var(--orange-100)" },
    { id: "t-blue", cat: "tonics", group: "House tonics", name: "Blueberry Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/blueberry-tonic.jpg", tint: "var(--rose-200)" },
    { id: "t-kiwi", cat: "tonics", group: "House tonics", name: "Kiwi Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/kiwi-tonic.jpg", tint: "var(--leaf-100)" },
    { id: "t-rasp", cat: "tonics", group: "House tonics", name: "Raspberry Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/raspberry-tonic.jpg", tint: "var(--rose-100)" },
    { id: "t-pine", cat: "tonics", group: "House tonics", name: "Pineapple Tonic", price: 5.99, priceLg: 7.99, plus: true, img: "/assets/products/pineapple-tonic.jpg", tint: "var(--orange-100)" },
    /* --- Coffee --- */
    { id: "c-esp1", cat: "coffee", group: "Hot", name: "Espresso · Single", price: 1.0, tint: "var(--caramel-100)" },
    { id: "c-esp2", cat: "coffee", group: "Hot", name: "Espresso · Double", price: 3.65, tint: "var(--caramel-200)" },
    { id: "c-capp", cat: "coffee", group: "Hot", name: "Cappuccino", price: 5.75, priceLg: 6.5, plus: true, img: "/assets/products/cappuccino.jpg", tint: "var(--peach-100)" },
    { id: "c-latte", cat: "coffee", group: "Hot", name: "Hot Latte", price: 5.75, priceLg: 6.5, plus: true, img: "/assets/products/hot-latte.jpg", tint: "var(--caramel-100)" },
    { id: "c-macch", cat: "coffee", group: "Hot", name: "Hot Macchiato", price: 5.5, priceLg: 6.25, plus: true, img: "/assets/products/hot-macchiato.jpg", tint: "var(--caramel-100)" },
    { id: "c-chai", cat: "coffee", group: "Hot", name: "Hot Chai Latte", price: 4.95, priceLg: 6.95, plus: true, tint: "var(--peach-200)" },
    { id: "c-amer", cat: "coffee", group: "Hot", name: "Americano", price: 4.75, priceLg: 5.5, plus: true, img: "/assets/products/americano.jpg", tint: "var(--sand-200)" },
    { id: "c-ilatte", cat: "coffee", group: "Iced", name: "Iced Latte", price: 5.95, priceLg: 6.95, plus: true, img: "/assets/products/iced-latte.jpg", tint: "var(--caramel-100)" },
    { id: "c-iamer", cat: "coffee", group: "Iced", name: "Iced Americano", price: 5.25, priceLg: 5.95, plus: true, img: "/assets/products/iced-americano.jpg", tint: "var(--caramel-100)" },
    { id: "c-imacch", cat: "coffee", group: "Iced", name: "Iced Macchiato", price: 5.75, priceLg: 7.25, plus: true, img: "/assets/products/iced-macchiato.jpg", tint: "var(--caramel-200)" },
    { id: "c-ichai", cat: "coffee", group: "Iced", name: "Iced Chai Latte", price: 6.65, priceLg: 7.99, plus: true, img: "/assets/products/iced-chai-latte.jpg", tint: "var(--sand-200)" },
    /* --- Pastries --- */
    { id: "p-redv", cat: "pastries", group: "Cookies NYC", name: "Red Velvet & White Chocolate", price: 5.99, img: "/assets/products/red-velvet-and-white-chocolate.jpg", tint: "var(--rose-100)" },
    { id: "p-ccw", cat: "pastries", group: "Cookies NYC", name: "Chocolate Chip & Walnut", price: 5.99, img: "/assets/products/chocolate-chip-and-walnut.jpg", tint: "var(--caramel-100)" },
    { id: "p-dcw", cat: "pastries", group: "Cookies NYC", name: "Double Chocolate & Walnut", price: 5.99, tint: "var(--caramel-200)" },
    { id: "p-matcha", cat: "pastries", group: "Cookies NYC", name: "Matcha Chocolate Chip", price: 5.99, tint: "var(--leaf-100)" },
    { id: "p-macad", cat: "pastries", group: "Cookies NYC", name: "White Chocolate Macadamia", price: 5.99, img: "/assets/products/white-chocolate-macadamia.jpg", tint: "var(--peach-100)" },
    { id: "p-vanilla", cat: "pastries", group: "Scones", name: "Vanilla Almond Scone", price: 4.99, img: "/assets/products/vanilla-almond.jpg", tint: "var(--sand-200)" },
    { id: "p-bluelem", cat: "pastries", group: "Scones", name: "Blueberry Lemon Scone", price: 4.99, img: "/assets/products/blueberry-lemon.jpg", tint: "var(--rose-200)" },
    { id: "p-nutella", cat: "pastries", group: "Cake jars", name: "Chocolate Nutella Jar", price: 6.25, tint: "var(--caramel-200)" },
    { id: "p-gansito", cat: "pastries", group: "Cake jars", name: "Gansito Cake Jar", price: 6.25, img: "/assets/products/gansito-cake-jar.jpg", tint: "var(--rose-100)" },
    { id: "p-oreo", cat: "pastries", group: "Cake jars", name: "Oreo Cake Jar", price: 6.25, img: "/assets/products/oreo-cake-jar.jpg", tint: "var(--sand-200)" },
    { id: "p-dot", cat: "pastries", group: "Cake jars", name: "Dot Cake", price: 6.25, tint: "var(--peach-200)" },
    /* --- Extras --- */
    { id: "x-fiji", cat: "extras", group: "Drinks", name: "Fiji Water", price: 4.5, tint: "var(--leaf-100)" },
    { id: "x-cstraw", cat: "extras", group: "DiLuna candles", name: "Strawberry Guava Candle", price: 8.5, img: "guava-diluna.jpg", pos: "center 40%" },
    { id: "x-ccafe", cat: "extras", group: "DiLuna candles", name: "Cafecito Candle", price: 8.5, tint: "var(--caramel-100)" },
  ],

  personality: [
    ["Cálida", "Warm"],
    ["Innovadora", "Innovative"],
    ["Creativa", "Creative"],
  ],
};

export default SITE;
