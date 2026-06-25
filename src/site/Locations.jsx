import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { Photo } from "./parts.jsx";
import { SITE } from "./data.js";

/* Visit us — the one real store (River & Craycroft, Tucson). */
export function Locations() {
  const { store } = SITE;
  return (
    <section id="locations" style={{ background: "var(--peach-100)" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr", alignItems: "stretch",
          background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-md)", overflow: "hidden",
        }}>
          <div style={{ minHeight: 380 }}>
            <Photo src={store.img} pos="center" label={store.name} height="100%" />
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
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)" }}>
                <Icon name="phone" size={17} color="var(--wine-500)" />
                <span style={{ fontSize: "var(--text-md)" }}>{store.phone}</span>
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
              <Link to="/order" style={{
                borderRadius: 999, padding: "14px 26px", border: "2px solid var(--wine-700)", color: "var(--wine-700)",
                fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center",
              }}>Order pickup</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
