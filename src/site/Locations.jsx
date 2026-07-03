import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";
import { useReveal } from "./parts.jsx";

/* Visit us — the one real store (River & Craycroft, Tucson). */
export function Locations() {
  const { store } = SITE;
  const reveal = useReveal();
  return (
    <section id="locations" style={{ background: "var(--surface-page)" }}>
      <div ref={reveal} style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
        <div className="r-split" style={{
          display: "grid", gridTemplateColumns: "1.35fr 0.85fr", alignItems: "stretch",
          background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-md)", overflow: "hidden",
        }}>
          <div className="r-map" style={{ minHeight: 480, position: "relative" }}>
            <iframe
              title={`Map to ${store.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(store.addr + ", " + store.city)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }}
            />
          </div>
          <div style={{ padding: "var(--space-7)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="eyebrow" style={{ color: "var(--wine-500)" }}>Visit us</span>
            <h2 style={{ fontSize: "var(--text-4xl)", margin: "10px 0 0", color: "var(--wine-700)", lineHeight: 1 }}>River &amp; Craycroft,<br />Tucson</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--text-muted)" }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}><Icon name="map-pin" size={17} color="var(--olive-600)" /></span>
                <span style={{ fontSize: "var(--text-md)", lineHeight: 1.45 }}>{store.addr}<br />{store.city}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)" }}>
                <Icon name="clock" size={17} color="var(--caramel-500)" />
                <span style={{ fontSize: "var(--text-md)" }}>{store.hours}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: "var(--space-6)", flexWrap: "wrap" }}>
              <a href={store.maps} target="_blank" rel="noopener" className="btn-wine" style={{
                borderRadius: 999, padding: "14px 26px", background: "var(--wine-700)", color: "var(--cream-50)",
                fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", gap: 9,
              }}>
                Get directions
                <Icon name="map-pin" size={16} color="var(--cream-50)" />
              </a>
              <Link to="/menu" style={{
                borderRadius: 999, padding: "14px 26px", border: "2px solid var(--wine-700)", color: "var(--wine-700)",
                fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center",
              }}>View menu</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
