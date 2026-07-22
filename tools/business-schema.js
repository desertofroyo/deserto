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

/* "10 AM" / "10:30 PM" -> "10:00" / "22:30" (schema.org wants 24h HH:MM).
   `meridiem` is the captured a/p initial, so match on the first letter only. */
function to24h(hour, minute, meridiem) {
  let h = parseInt(hour, 10);
  if (h === 12) h = 0;
  if (/^p/i.test(meridiem)) h += 12;
  return `${String(h).padStart(2, "0")}:${minute || "00"}`;
}

/* Day words -> canonical schema.org day name. */
const DAY_WORDS = {
  mon: "Monday", monday: "Monday",
  tue: "Tuesday", tues: "Tuesday", tuesday: "Tuesday",
  wed: "Wednesday", weds: "Wednesday", wednesday: "Wednesday",
  thu: "Thursday", thur: "Thursday", thurs: "Thursday", thursday: "Thursday",
  fri: "Friday", friday: "Friday",
  sat: "Saturday", saturday: "Saturday",
  sun: "Sunday", sunday: "Sunday",
};

/* A day phrase -> the days it covers.
   Handles "Mon-Thu" (inclusive, wrapping: "Fri-Mon"), "Mon, Wed & Fri",
   "daily", "weekdays", "weekends". Returns null if nothing is recognisable. */
export function parseDaySpec(spec) {
  const s = (spec || "").toLowerCase();
  if (/daily|every\s*day|everyday|all\s*week|7\s*days/.test(s)) return [...DAYS];
  if (/weekday/.test(s)) return DAYS.slice(0, 5);
  if (/weekend/.test(s)) return [DAYS[5], DAYS[6]];

  // Split on list separators, keeping "x-y" ranges intact.
  const parts = s.split(/\s*(?:,|&|\band\b|\/|\+)\s*/).filter(Boolean);
  const out = [];

  for (const part of parts) {
    const range = /^([a-z]+)\s*(?:–|—|-|\bto\b|\bthru\b|\bthrough\b)\s*([a-z]+)$/.exec(part.trim());
    if (range) {
      const from = DAY_WORDS[range[1]];
      const to = DAY_WORDS[range[2]];
      if (!from || !to) return null;
      // Inclusive walk forward, so "Fri-Mon" wraps the weekend correctly.
      let i = DAYS.indexOf(from);
      const end = DAYS.indexOf(to);
      for (let guard = 0; guard < 7; guard++) {
        out.push(DAYS[i]);
        if (i === end) break;
        i = (i + 1) % 7;
      }
      continue;
    }
    const single = DAY_WORDS[part.trim()];
    if (!single) return null;
    out.push(single);
  }

  return out.length ? [...new Set(out)] : null;
}

/* Free-text opening hours -> schema.org OpeningHoursSpecification[].

   Understands a single daily range ("Open daily · 10 AM – 10 PM") and per-day
   schedules ("Mon–Thu 10 AM – 9 PM, Fri–Sun 10 AM – 11 PM"), including split
   shifts for the same day. Segments marked closed are skipped — schema.org
   treats absent days as closed.

   Both ends of a range must carry AM/PM: "10–9" could mean 10 AM–9 PM or
   10 PM–9 AM, and a wrong guess publishes the wrong opening time. Returns null
   for anything it can't read, so the caller can warn and omit. */
export function parseHours(hours) {
  const s = hours || "";
  const TIME_RANGE =
    /(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?\s*(?:–|—|-|\bto\b)\s*(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?/gi;

  const specs = [];
  let cursor = 0;
  let m;

  while ((m = TIME_RANGE.exec(s)) !== null) {
    // The days this range applies to are described just before it.
    const lead = s.slice(cursor, m.index);
    cursor = TIME_RANGE.lastIndex;

    // "Closed Mon, Tue–Sun 10 AM – 10 PM": drop whole clauses that describe a
    // closure, so their days don't get folded into the following range. Days
    // absent from the output are already treated as closed by schema.org.
    const cleaned = lead
      .split(/[,;·]/)
      .filter((part) => part.trim() && !/closed?\b/i.test(part))
      .join(",")
      .replace(/\b(open|hours?)\b/gi, " ");

    const days = parseDaySpec(cleaned);
    if (!days) return null;

    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens: to24h(m[1], m[2], m[3]),
      closes: to24h(m[4], m[5], m[6]),
    });
  }

  return specs.length ? specs : null;
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
