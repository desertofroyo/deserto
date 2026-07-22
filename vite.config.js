import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { buildBusinessSchema } from "./tools/business-schema.js";

export const SITE_ORIGIN = "https://desertofroyo.com";
const OG_IMAGE = "/assets/og/deserto-share.jpg";
const LOGO = "/assets/logos/deserto-mark.svg";
// No `email` in the schema on purpose. schema.org allows it and Google ignores
// it for local results, but it would put the shop's address in plain text in
// every page's HTML, where address-harvesting bots find it within days.
// Visitors reach the shop through the contact form, which never exposes it.

/* Injects the LocalBusiness JSON-LD into index.html, derived from
   content/site.json rather than hand-copied. Runs in dev and build, so what you
   see locally is what ships. Replaces the <!--business-jsonld--> placeholder. */
function businessSchemaPlugin() {
  return {
    name: "deserto-business-schema",
    transformIndexHtml(html) {
      const raw = fs.readFileSync(path.resolve("content/site.json"), "utf8");
      const { schema, warnings } = buildBusinessSchema(JSON.parse(raw), {
        origin: SITE_ORIGIN,
        ogImage: OG_IMAGE,
        logo: LOGO,
      });

      // Surfaced loudly: a silent fallback here would ship wrong hours/address
      // to Google without anyone noticing.
      for (const w of warnings) console.warn(`[business-schema] ${w}`);

      const tag =
        `<script type="application/ld+json">\n` +
        `${JSON.stringify(schema, null, 2)}\n` +
        `    </script>`;
      return html.replace("<!--business-jsonld-->", tag);
    },
  };
}

// Deserto — Vite + React. Assets live under public/assets and are referenced
// with absolute paths (/assets/...) so the DS token CSS and React kits can
// share them across the marketing site, order page, and mobile app demo.
export default defineConfig({
  plugins: [react(), businessSchemaPlugin()],
  server: { open: true },
});
