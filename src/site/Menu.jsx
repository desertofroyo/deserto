import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { IMG, useReveal } from "./parts.jsx";
import { SITE } from "./data.js";

/* Resolve a highlight image: absolute/remote paths pass through, bare filenames
   come from the editorial image folder. */
const srcOf = (s) => (s[0] === "/" || /^https?:\/\//.test(s) ? s : IMG + s);

/* "What we make" — a clean, airy product showcase: each category is a cutout
   product shot floating on the calm sand section, with its name and a single
   "View menu" link beneath. No frames, no color blocks — the photography and
   generous whitespace do the work. Cake jars live within the pastries card. */
export function MenuSection({ sectionRef }) {
  const { highlights } = SITE;
  const reveal = useReveal();
  return (
    <section id="menu" ref={sectionRef} style={{
      // clean bright stage behind the product cutouts — the white core must reach
      // past the product row (Yogen Früz / Tea Leaf style) or the warm sand tint
      // washes out the white cup, clear can and milky latte. Warmth only at edges.
      background: "radial-gradient(ellipse 150% 130% at 50% 46%, var(--white) 0%, var(--white) 58%, #FCF4EC 82%, var(--sand-100) 100%)",
      position: "relative",
    }}>
      {/* The wine story rises up in a swiggly wave at the bottom; the top edge
          stays clean so the white "What we make" product row reads bright. */}
      {/* -2px overlap into the wine story below so the two wine surfaces never
          leave a subpixel hairline seam at the section boundary. */}
      <div aria-hidden style={{ position: "absolute", bottom: -2, left: 0, width: "100%", lineHeight: 0, zIndex: 0, pointerEvents: "none" }}>
        <svg width="100%" height="48" viewBox="0 0 1200 48" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,48 L1200,48 L1200,26 Q900,8 600,24 T0,26 Z" fill="var(--wine-700)" />
        </svg>
      </div>

      <div ref={reveal} style={{ position: "relative", zIndex: 1, maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "var(--wine-500)" }}>The menu</span>
          <h2 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>What we make</h2>
        </div>

        <div className="showcase">
          {highlights.map((h, i) => (
            <Link key={h.slug} to={h.to} data-slug={h.slug} className="showcase-item stagger-item" style={{ "--i": i }}>
              <div className="showcase-photo">
                <img src={srcOf(h.img)} alt={h.name} loading="lazy" />
              </div>
              <h3 className="showcase-name">{h.name}</h3>
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-8)" }}>
          <Link to="/menu" className="btn-wine" style={{
            borderRadius: 999, padding: "15px 32px", background: "var(--wine-700)", color: "var(--cream-50)",
            fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)",
            display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-md)",
          }}>
            View full menu
            <Icon name="arrow-right" size={18} color="var(--cream-50)" />
          </Link>
        </div>
      </div>
    </section>
  );
}
