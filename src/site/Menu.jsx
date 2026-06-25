import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { Photo, Arch } from "./parts.jsx";
import { SITE } from "./data.js";

/* "What we make" highlights — arch-framed cards linking to the order page. */
export function MenuSection({ sectionRef }) {
  const { highlights } = SITE;
  return (
    <section id="menu" ref={sectionRef} style={{ background: "var(--leaf-100)" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--wine-500)" }}>The menu</span>
            <h2 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>What we make</h2>
          </div>
          <Link to="/order" className="nav-link" style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", color: "var(--wine-700)", display: "inline-flex", alignItems: "center", gap: 7 }}>
            See the full menu & order
            <Icon name="arrow-right" size={17} color="var(--wine-700)" />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-5)", marginTop: "var(--space-7)" }}>
          {highlights.map((h, i) => (
            <Link key={h.slug} to={"/order?tab=" + h.slug} className="season-card" style={{
              display: "block", background: "var(--white)", borderRadius: "var(--radius-xl)", overflow: "hidden",
              boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-default)",
              animation: `fadeUp .4s ${i * 0.05}s var(--ease-out, ease) both`,
            }}>
              <Arch style={{ height: 200 }} radius="50% 50% 0 0 / 30% 30% 0 0">
                <Photo src={h.img} pos={h.pos || "center"} label={h.name} height="100%" />
              </Arch>
              <div style={{ padding: "var(--space-4)" }}>
                <h3 style={{ margin: 0, fontSize: "var(--text-lg)", color: "var(--ink-900)" }}>{h.name}</h3>
                <p style={{ margin: "6px 0 12px", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 }}>{h.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 800, color: "var(--wine-700)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>Order</span>
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--orange-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="arrow-right" size={16} color="var(--wine-900)" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
