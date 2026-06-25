import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";

const LOGO = "/assets/logos/deserto-logo-full.png";

/* ---------------- Header (light / cream, sticky, blurred) ---------------- */
export function Header({ onNav }) {
  const { nav } = SITE;
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, background: "rgba(252,238,228,0.86)",
      backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-default)",
    }}>
      <div style={{
        maxWidth: "var(--container-xl)", margin: "0 auto", padding: "0 var(--space-6)", height: 74,
        display: "flex", alignItems: "center", gap: "var(--space-6)",
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); onNav("top"); }} style={{ display: "flex", alignItems: "center" }}>
          <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" style={{ height: 48, width: "auto", display: "block" }} />
        </a>
        <nav style={{ display: "flex", gap: "var(--space-5)", marginLeft: "var(--space-4)" }}>
          {nav.map((n) => (
            <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); onNav(n.id); }}
              className="nav-link"
              style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--ink-700)", letterSpacing: ".01em", whiteSpace: "nowrap" }}>{n.en}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <Link to="/menu" className="nav-link" style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--ink-700)", whiteSpace: "nowrap" }}>View menu</Link>
          <Link to="/menu" className="btn-wine" style={{
            borderRadius: 999, padding: "11px 22px", flexShrink: 0, whiteSpace: "nowrap",
            background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
            fontSize: "var(--text-sm)",
          }}>Order delivery</Link>
        </div>
      </div>
    </header>
  );
}
