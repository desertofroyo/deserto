/* Deserto app — sample content. Global: window.APP */
window.APP = {
  user: { name: "Ana", points: 240, nextReward: 300 },
  categories: [
    { key: "Froyo", icon: "ice-cream-bowl", tone: { soft: "var(--rose-100)", solid: "var(--rose-500)", ink: "var(--rose-700)", onSolid: "var(--cream-50)" } },
    { key: "Refreshers", icon: "cup-soda", tone: { soft: "var(--orange-100)", solid: "var(--orange-500)", ink: "var(--orange-700)", onSolid: "var(--wine-900)" } },
    { key: "Coffee", icon: "coffee", tone: { soft: "var(--caramel-100)", solid: "var(--caramel-500)", ink: "var(--caramel-600)", onSolid: "var(--cream-50)" } },
    { key: "Treats", icon: "cookie", tone: { soft: "var(--olive-100)", solid: "var(--olive-600)", ink: "var(--olive-700)", onSolid: "var(--cream-50)" } },
  ],
  featured: [
    { id: 1, name: "Taro Swirl", price: 6.5, cal: 240, img: "froyo-cup-mauve.jpg", pos: "center 35%", tag: "Popular" },
    { id: 2, name: "Strawberry Refresher", price: 5.5, cal: 130, img: "strawberry-flatlay.jpg", pos: "center 35%", tag: "Vegan" },
    { id: 3, name: "Iced Horchata Latte", price: 5.5, cal: 180, img: "tulips-drinks.jpg", pos: "right center", tag: "New" },
  ],
  bases: [
    { key: "Tart original", tint: "var(--olive-500)" },
    { key: "Taro", tint: "var(--wine-500)" },
    { key: "Strawberry", tint: "var(--rose-500)" },
    { key: "Vanilla bean", tint: "var(--orange-400)" },
  ],
  toppings: [
    "Fresh strawberries", "Granola", "Mochi", "Toasted coconut", "Honey drizzle",
    "Dark chocolate", "Pistachio", "Boba", "Fresh blueberries",
  ],
  sizes: [
    { key: "Regular", add: 0 },
    { key: "Large", add: 1.5 },
  ],
};
