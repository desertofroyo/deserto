/* Build the LocalBusiness JSON-LD from the same content the owner edits.

   The address, hours and social links live in content/site.json and are edited
   through the Sveltia CMS. They used to also be hand-copied into index.html,
   which meant a seasonal hours change in the CMS would silently leave wrong
   hours in the structured data — the copy Google actually reads.

   This derives the schema from site.json at build time instead, so the two
   cannot drift. It is injected into index.html by the vite plugin in
   vite.config.js, keeping it in the static HTML for crawlers that don't run JS.

   Parsing is deliberately strict: if a field can't be understood, it is omitted
   rather than guessed. Absent structured data degrades gracefully; wrong
   structured data misleads customers about when the shop is open. */

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* "Tucson, AZ 85750" -> { locality, region, postalCode } */
export function parseCityLine(city) {
  const m = /^\s*(.+?)\s*,\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)\s*$/.exec(city || "");
  if (!m) return null;
  return { locality: m[1], region: m[2], postalCode: m[3] };
}

/* "10 AM" / "10:30 PM" -> "10:00" / "22:30" (schema.org wants 24h HH:MM) */
function to24h(hour, minute, meridiem) {
  let h = parseInt(hour, 10);
  if (h === 12) h = 0;
  if (/pm/i.test(meridiem)) h += 12;
  return `${String(h).padStart(2, "0")}:${minute || "00"}`;
}

/* "Open daily · 10 AM – 10 PM" -> [{ dayOfWeek: [...7], opens, closes }]
   Returns null when the string isn't a form we recognise. */
export function parseHours(hours) {
  const s = hours || "";
  const m = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*[–—-]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i.exec(s);
  if (!m) return null;

  // Only "daily"/"every day" is supported; anything else (per-day schedules)
  // is left to a human rather than guessed at.
  if (!/daily|every\s*day/i.test(s)) return null;

  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS,
      opens: to24h(m[1], m[2], m[3]),
      closes: to24h(m[4], m[5], m[6]),
    },
  ];
}

/**
 * @param {object} site   Parsed content/site.json
 * @param {object} opts   { origin, email, ogImage, logo }
 * @returns {{ schema: object, warnings: string[] }}
 */
export function buildBusinessSchema(site, opts) {
  const { origin, email, ogImage, logo } = opts;
  const store = (site && site.store) || {};
  const warnings = [];

  const schema = {
    "@context": "https://schema.org",
    "@type": ["CafeOrCoffeeShop", "IceCreamShop"],
    "@id": `${origin}/#business`,
    name: store.name,
    url: `${origin}/`,
    image: `${origin}${ogImage}`,
    logo: `${origin}${logo}`,
    description:
      "Self-serve frozen yogurt, handcrafted coffee, sparkling tonics and layered desserts in a warm, modern space in Tucson, Arizona.",
  };

  if (email) schema.email = email;

  const city = parseCityLine(store.city);
  if (city && store.addr) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: store.addr,
      addressLocality: city.locality,
      addressRegion: city.region,
      postalCode: city.postalCode,
      addressCountry: "US",
    };
  } else {
    warnings.push(`could not parse address from store.addr/store.city ("${store.city}")`);
  }

  if (store.maps) schema.hasMap = store.maps;

  const hours = parseHours(store.hours);
  if (hours) {
    schema.openingHoursSpecification = hours;
  } else {
    warnings.push(`could not parse hours ("${store.hours}") — omitting openingHoursSpecification`);
  }

  schema.servesCuisine = ["Frozen Yogurt", "Coffee", "Desserts"];
  schema.hasMenu = `${origin}/menu`;
  schema.acceptsReservations = false;

  const sameAs = (site.social || []).map((s) => s.url).filter(Boolean);
  if (sameAs.length) schema.sameAs = sameAs;

  return { schema, warnings };
}
