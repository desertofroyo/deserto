import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "./data.js";

const LOGO = "/assets/logos/deserto-logo-full.png";

/* ---------------- Header (light / cream, sticky, blurred) ----------------
   Full nav on desktop; on mobile it collapses to a hamburger that opens a
   stacked dropdown panel. */
export function Header({ onNav }) {
  const { nav } = SITE;
  const [open, setOpen] = React.useState(false);
  const handleNav = (id) => { setOpen(false); onNav(id); };

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, background: "rgba(252,238,228,0.86)",
      backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-default)",
    }}>
      <div style={{
        maxWidth: "var(--container-xl)", margin: "0 auto", padding: "0 var(--space-6)", height: 74,
        display: "flex", alignItems: "center", gap: "var(--space-6)",
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); handleNav("top"); }} style={{ display: "flex", alignItems: "center" }}>
          <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" style={{ height: 48, width: "auto", display: "block" }} />
        </a>
        <nav className="hdr-nav" style={{ display: "flex", gap: "var(--space-5)", marginLeft: "var(--space-4)" }}>
          {nav.map((n) => (
            <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); handleNav(n.id); }}
              className="nav-link"
              style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--ink-700)", letterSpacing: ".01em", whiteSpace: "nowrap" }}>{n.en}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <Link to="/menu" className="nav-link hdr-viewmenu" style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--ink-700)", whiteSpace: "nowrap" }}>View menu</Link>
          <Link to="/menu" className="btn-wine" style={{
            borderRadius: 999, padding: "11px 22px", flexShrink: 0, whiteSpace: "nowrap",
            background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
            fontSize: "var(--text-sm)",
          }}>Order delivery</Link>
          <button className="hdr-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
            style={{ width: 42, height: 42, border: "none", background: "transparent", cursor: "pointer", padding: 0, flexShrink: 0 }}>
            <span className={"hb" + (open ? " open" : "")}><span /><span /><span /></span>
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      {open && (
        <div className="hdr-mobile-panel" style={{
          borderTop: "1px solid var(--border-default)", background: "rgba(252,238,228,0.98)",
          padding: "var(--space-3) var(--space-6) var(--space-5)", display: "flex", flexDirection: "column",
        }}>
          {nav.map((n) => (
            <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); handleNav(n.id); }}
              style={{ padding: "14px 2px", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--ink-700)", borderBottom: "1px solid var(--border-subtle)" }}>{n.en}</a>
          ))}
          <Link to="/menu" onClick={() => setOpen(false)}
            style={{ padding: "14px 2px", fontWeight: 800, fontSize: "var(--text-md)", color: "var(--wine-700)" }}>View full menu</Link>
        </div>
      )}
    </header>
  );
}
