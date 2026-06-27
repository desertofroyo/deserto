import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { Photo, useReveal } from "./parts.jsx";
import { SITE } from "./data.js";

/* Per-category color block — saturated brand bands, Yogen-Früz-style.
   Each tile is one bold color with the product photo on top and a big
   name + circular arrow in the colored footer band. */
const TILE = {
  froyo:    { band: "var(--olive-600)",  fg: "var(--cream-50)", dot: "var(--lime-400)", dotFg: "var(--olive-900)" },
  tonics:   { band: "var(--orange-500)", fg: "var(--wine-900)", dot: "var(--wine-700)", dotFg: "var(--cream-50)" },
  coffee:   { band: "var(--coffee-600)", fg: "var(--cream-50)", dot: "var(--orange-500)", dotFg: "var(--wine-900)" },
  pastries: { band: "var(--rose-500)",   fg: "var(--cream-50)", dot: "var(--cream-50)", dotFg: "var(--wine-700)" },
};

/* "What we make" — four bold color-block category cards linking to the menu. */
export function MenuSection({ sectionRef }) {
  const { highlights } = SITE;
  const reveal = useReveal();
  return (
    <section id="menu" ref={sectionRef} style={{ background: "var(--leaf-100)" }}>
      <div ref={reveal} style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--wine-500)" }}>The menu</span>
            <h2 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>What we make</h2>
          </div>
          <Link to="/menu" className="nav-link" style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", color: "var(--wine-700)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>
            See the full menu
            <Icon name="arrow-right" size={17} color="var(--wine-700)" />
          </Link>
        </div>
        <div className="r-tiles" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-5)", marginTop: "var(--space-7)" }}>
          {highlights.map((h, i) => {
            const t = TILE[h.slug] || TILE.froyo;
            return (
              <Link key={h.slug} to={"/menu#" + h.slug} className="tile-card stagger-item" style={{
                display: "flex", flexDirection: "column", borderRadius: "var(--radius-2xl)", overflow: "hidden",
                background: t.band, boxShadow: "var(--shadow-md)", "--i": i,
              }}>
                {/* product photo fills the top, generously sized */}
                <div style={{ height: 230, overflow: "hidden" }}>
                  <Photo src={h.img} pos={h.pos || "center"} label={h.name} height="100%" />
                </div>
                {/* saturated brand band with the category name + arrow */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "var(--space-5)", color: t.fg }}>
                  <h3 style={{
                    margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
                    fontSize: "var(--text-xl)", lineHeight: 0.98, letterSpacing: "-0.01em", color: t.fg,
                  }}>{h.name}</h3>
                  <p style={{ margin: "8px 0 16px", fontSize: "var(--text-sm)", lineHeight: 1.5, color: t.fg, opacity: 0.9 }}>{h.desc}</p>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 800, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: t.fg }}>View</span>
                    <span className="tile-arrow" style={{ width: 36, height: 36, borderRadius: "50%", background: t.dot, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="arrow-right" size={17} color={t.dotFg} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
