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
      position: "relative", overflow: "hidden",
    }}>
      <div ref={reveal} style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "var(--wine-500)" }}>The menu</span>
          <h2 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>What we make</h2>
        </div>

        {/* Swiggly brand ribbon behind the product row — Tea Leaf & Creamery
            style: a soft peach band with wavy top and bottom edges, full-bleed
            behind the cutouts while the names sit on its lower curve. */}
        <div style={{ position: "relative", marginTop: "var(--space-10)" }}>
          <div aria-hidden style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            width: "100vw", top: -58, bottom: -64, zIndex: 0, pointerEvents: "none",
          }}>
            <svg width="100%" height="100%" viewBox="0 0 1200 360" preserveAspectRatio="none" style={{ display: "block" }}>
              <path d="M0,54 Q300,30 600,54 T1200,54 L1200,306 Q900,330 600,306 T0,306 Z" fill="var(--peach-200)" />
            </svg>
          </div>

          <div className="showcase" style={{ position: "relative", zIndex: 1, marginTop: 0 }}>
            {highlights.map((h, i) => (
              <Link key={h.slug} to={h.to} data-slug={h.slug} className="showcase-item stagger-item" style={{ "--i": i }}>
                <div className="showcase-photo">
                  <img src={srcOf(h.img)} alt={h.name} loading="lazy" />
                </div>
                <h3 className="showcase-name">{h.name}</h3>
              </Link>
            ))}
          </div>
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
