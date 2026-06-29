import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";

const LOGO = "/assets/logos/deserto-primary-cream.svg";

const MENU_LINKS = [
  ["Frozen Yogurt", "/menu#froyo"],
  ["Tonics", "/menu#tonics"],
  ["Coffee", "/menu#coffee"],
  ["Pastries & Cake Jars", "/menu#pastries"],
];

const DESERTO_LINKS = [
  ["Our story", "/#story"],
  ["Visit us", "/#locations"],
  ["View menu", "/menu"],
];

const linkStyle = { color: "var(--ink-300)", fontSize: "var(--text-sm)", marginBottom: 9, display: "block", textDecoration: "none" };

/* Footer — coffee-brown band with brand, social links, quick links and ordering. */
export function Footer() {
  const { store, social, delivery } = SITE;
  return (
    <footer style={{ background: "var(--coffee-600)", color: "var(--sand-200)" }}>
      <div className="r-footer" style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--space-6)", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "var(--space-6)" }}>
        {/* Brand + tagline + socials */}
        <div>
          <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" style={{ height: 50, width: "auto", display: "block", opacity: 0.95 }} />
          <p style={{ marginTop: 16, color: "var(--ink-300)", fontSize: "var(--text-sm)", maxWidth: 280, fontFamily: "var(--font-editorial)", lineHeight: 1.55 }}>
            Where coffee meets creamy bliss. 5635 E River Rd, Unit 101 — Tucson, Arizona.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            {social.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                style={{
                  width: 38, height: 38, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.10)", color: "var(--cream-50)", transition: "background .2s ease",
                }}
                className="r-social-btn"
              >
                <Icon name={s.icon} size={18} color="var(--cream-50)" />
              </a>
            ))}
          </div>
        </div>

        {/* Menu links */}
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".04em" }}>Menu</div>
          {MENU_LINKS.map(([label, to]) => (
            <Link key={label} to={to} style={linkStyle}>{label}</Link>
          ))}
        </div>

        {/* Deserto links + ordering */}
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".04em" }}>Deserto</div>
          {DESERTO_LINKS.map(([label, to]) => (
            <Link key={label} to={to} style={linkStyle}>{label}</Link>
          ))}
          <a href={`tel:${store.phone.replace(/[^0-9+]/g, "")}`} style={linkStyle}>{store.phone}</a>
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            {delivery.map((d) => (
              <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: "var(--text-xs)", fontWeight: 800, fontFamily: "var(--font-body)",
                color: "var(--cream-50)", background: "rgba(255,255,255,0.10)", borderRadius: 999,
                padding: "8px 14px", textDecoration: "none",
              }}>{d.name}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="r-footer-bottom" style={{ padding: "16px var(--space-6)", maxWidth: "var(--container-xl)", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--ink-400)", fontSize: "var(--text-xs)" }}>
          <span>© 2026 Deserto Group LLC. All rights reserved.</span>
          <span>{store.hours}</span>
        </div>
      </div>
    </footer>
  );
}
