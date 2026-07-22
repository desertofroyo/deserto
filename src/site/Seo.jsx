import React from "react";
import { useLocation } from "react-router-dom";

/* Per-route <head> management.

   index.html carries the site-wide defaults (Open Graph, Twitter, JSON-LD) that
   non-JavaScript scrapers read. This component layers the per-page title,
   description and canonical on top once React mounts, so each route reads
   correctly in search results and in the browser tab.

   Deliberately dependency-free — the site has no head library and one small
   effect is cheaper than adding one. */

const SITE_NAME = "Deserto Frozen Yogurt & Café";
const ORIGIN = "https://desertofroyo.com";

/* Upsert a <meta> tag, matching on `name` or `property`. */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * @param {string}  title    Page title, without the brand suffix.
 * @param {string}  description  Meta description (~155 chars reads best).
 * @param {boolean} noindex  Keep thin/boilerplate pages out of search results.
 */
export function Seo({ title, description, noindex = false }) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Page headings are written as sentences ("Your privacy."); drop the full
    // stop so it doesn't collide with the " — Brand" suffix in the tab/SERP.
    const lead = title ? title.replace(/\.\s*$/, "") : "";
    const fullTitle = lead ? `${lead} — ${SITE_NAME}` : SITE_NAME;
    // Trailing slash only on the homepage, matching the sitemap.
    const url = ORIGIN + (pathname === "/" ? "/" : pathname);

    document.title = fullTitle;
    setCanonical(url);
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    // Legal pages are boilerplate; let them resolve but keep them out of the index.
    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, follow");
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, noindex, pathname]);

  return null;
}

export default Seo;
