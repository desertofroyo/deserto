/* Tests for the opening-hours / address parsing behind the LocalBusiness
   JSON-LD. Run with: npm run test:schema

   These exist because the schema is the copy Google reads out to customers.
   The important cases are the refusals: anything ambiguous must yield null so
   the build warns and omits the field, rather than publishing wrong hours. */

import assert from "node:assert/strict";
import fs from "node:fs";
import { parseCityLine, parseDaySpec, parseHours, buildBusinessSchema } from "./business-schema.js";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (err) {
    failed++;
    console.error(`  ✗ ${name}\n      ${err.message.split("\n")[0]}`);
  }
}

/* Compact view of a spec list: "Mon,Tue 10:00-22:00" */
const fmt = (specs) =>
  specs === null
    ? null
    : specs
        .map((s) => `${s.dayOfWeek.map((d) => d.slice(0, 3)).join(",")} ${s.opens}-${s.closes}`)
        .join(" | ");

// ---------------------------------------------------------------- city lines
test("city: standard", () =>
  assert.deepEqual(parseCityLine("Tucson, AZ 85750"), {
    locality: "Tucson",
    region: "AZ",
    postalCode: "85750",
  }));

test("city: zip+4", () =>
  assert.equal(parseCityLine("Tucson, AZ 85750-1234").postalCode, "85750-1234"));

test("city: two-word locality", () =>
  assert.equal(parseCityLine("Oro Valley, AZ 85737").locality, "Oro Valley"));

test("city: refuses garbage", () => assert.equal(parseCityLine("nonsense"), null));
test("city: refuses empty", () => assert.equal(parseCityLine(""), null));

// ----------------------------------------------------------------- day specs
test("days: daily", () => assert.equal(parseDaySpec("Open daily ·").length, 7));
test("days: everyday", () => assert.equal(parseDaySpec("everyday").length, 7));
test("days: weekdays", () => assert.deepEqual(parseDaySpec("weekdays").length, 5));
test("days: weekends", () => assert.deepEqual(parseDaySpec("weekends"), ["Saturday", "Sunday"]));

test("days: simple range", () =>
  assert.deepEqual(parseDaySpec("Mon-Thu"), ["Monday", "Tuesday", "Wednesday", "Thursday"]));

test("days: wrapping range", () =>
  assert.deepEqual(parseDaySpec("Fri-Mon"), ["Friday", "Saturday", "Sunday", "Monday"]));

test("days: en-dash range", () => assert.equal(parseDaySpec("Mon–Wed").length, 3));
test("days: 'through'", () => assert.equal(parseDaySpec("Mon through Wed").length, 3));

test("days: comma list", () =>
  assert.deepEqual(parseDaySpec("Mon, Wed, Fri"), ["Monday", "Wednesday", "Friday"]));

test("days: ampersand list", () =>
  assert.deepEqual(parseDaySpec("Sat & Sun"), ["Saturday", "Sunday"]));

test("days: long names", () =>
  assert.deepEqual(parseDaySpec("Monday-Tuesday"), ["Monday", "Tuesday"]));

test("days: dedupes", () => assert.deepEqual(parseDaySpec("Mon, Mon"), ["Monday"]));
test("days: refuses unknown", () => assert.equal(parseDaySpec("Funday"), null));
test("days: refuses empty", () => assert.equal(parseDaySpec(""), null));

// --------------------------------------------------------------------- hours
test("hours: the live value", () =>
  assert.equal(fmt(parseHours("Open daily · 10 AM – 10 PM")), "Mon,Tue,Wed,Thu,Fri,Sat,Sun 10:00-22:00"));

test("hours: minutes", () =>
  assert.equal(fmt(parseHours("Open daily · 7:30 AM – 9:15 PM")).endsWith("07:30-21:15"), true));

test("hours: noon and midnight", () =>
  assert.equal(fmt(parseHours("Open daily 12 PM - 12 AM")).endsWith("12:00-00:00"), true));

test("hours: lowercase with dots", () =>
  assert.equal(fmt(parseHours("open daily 10 a.m. - 10 p.m.")).endsWith("10:00-22:00"), true));

test("hours: 'to' separator", () =>
  assert.equal(fmt(parseHours("Open daily 10 AM to 10 PM")).endsWith("10:00-22:00"), true));

// The case that previously fell back to nothing — now supported.
test("hours: per-day schedule", () =>
  assert.equal(
    fmt(parseHours("Mon–Thu 10 AM – 9 PM, Fri–Sun 10 AM – 11 PM")),
    "Mon,Tue,Wed,Thu 10:00-21:00 | Fri,Sat,Sun 10:00-23:00"
  ));

test("hours: weekday/weekend split", () =>
  assert.equal(
    fmt(parseHours("Weekdays 7 AM – 6 PM, Weekends 8 AM – 8 PM")),
    "Mon,Tue,Wed,Thu,Fri 07:00-18:00 | Sat,Sun 08:00-20:00"
  ));

test("hours: three segments", () =>
  assert.equal(parseHours("Mon 10 AM – 5 PM, Tue–Thu 10 AM – 9 PM, Fri–Sun 10 AM – 11 PM").length, 3));

test("hours: split shift on one day", () =>
  assert.equal(
    fmt(parseHours("Mon 8 AM – 11 AM, Mon 5 PM – 9 PM")),
    "Mon 08:00-11:00 | Mon 17:00-21:00"
  ));

test("hours: skips a closed clause", () =>
  assert.equal(fmt(parseHours("Closed Mon, Tue–Sun 10 AM – 10 PM")), "Tue,Wed,Thu,Fri,Sat,Sun 10:00-22:00"));

// ------------------------------------------------------------- the refusals
test("hours: refuses missing meridiem (ambiguous)", () =>
  assert.equal(parseHours("Mon-Thu 10-9, Fri-Sun 10-11"), null));

test("hours: refuses bare times", () => assert.equal(parseHours("10 - 10"), null));
test("hours: refuses no times at all", () => assert.equal(parseHours("Open daily"), null));
test("hours: refuses empty", () => assert.equal(parseHours(""), null));
test("hours: refuses 'call us'", () => assert.equal(parseHours("Call for hours"), null));

test("hours: refuses unknown day word", () =>
  assert.equal(parseHours("Funday 10 AM – 9 PM"), null));

// ------------------------------------------------------ end-to-end on real data
test("schema: real site.json produces no warnings", () => {
  const site = JSON.parse(fs.readFileSync(new URL("../content/site.json", import.meta.url), "utf8"));
  const { schema, warnings } = buildBusinessSchema(site, {
    origin: "https://desertofroyo.com",
    email: "hello@desertofroyo.com",
    ogImage: "/assets/og/deserto-share.jpg",
    logo: "/assets/logos/deserto-mark.svg",
  });
  assert.deepEqual(warnings, []);
  assert.equal(schema.address.addressLocality, "Tucson");
  assert.equal(schema.openingHoursSpecification[0].opens, "10:00");
  assert.ok(schema.sameAs.length >= 1);
});

test("schema: omits hours rather than guessing", () => {
  const { schema, warnings } = buildBusinessSchema(
    { store: { name: "X", addr: "1 A St", city: "Tucson, AZ 85750", hours: "call us" } },
    { origin: "https://x.test", ogImage: "/a.jpg", logo: "/l.svg" }
  );
  assert.equal(schema.openingHoursSpecification, undefined);
  assert.equal(warnings.length, 1);
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
