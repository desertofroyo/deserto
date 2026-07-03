import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";
import { DeliveryButtons } from "./Delivery.jsx";

const LOGO = "/assets/logos/deserto-lockup-cream.png";

const MENU_LINKS = [
  ["Frozen Yogurt", "/menu"],
  ["Tonics", "/menu"],
  ["Coffee", "/menu#coffee"],
  ["Pastries & Cake Jars", "/menu#pastries"],
];

const DESERTO_LINKS = [
  ["Our story", "/#story"],
  ["Visit us", "/#locations"],
  ["View menu", "/menu"],
];

const linkStyle = { color: "var(--ink-300)", fontSize: "var(--text-sm)", marginBottom: 9, display: "block", textDecoration: "none", textTransform: "uppercase", letterSpacing: ".04em" };

/* Footer — coffee-brown band with brand, social links, quick links and ordering. */
export function Footer() {
  const { store, social } = SITE;
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
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".08em", textTransform: "uppercase" }}>Menu</div>
          {MENU_LINKS.map(([label, to]) => (
            <Link key={label} to={to} style={linkStyle}>{label}</Link>
          ))}
        </div>

        {/* Deserto links + ordering */}
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".08em", textTransform: "uppercase" }}>Deserto</div>
          {DESERTO_LINKS.map(([label, to]) => (
            <Link key={label} to={to} style={linkStyle}>{label}</Link>
          ))}
          {store.nutritionUrl && (
            <a href={store.nutritionUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>Nutrition &amp; allergens (PDF)</a>
          )}

          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", margin: "var(--space-5) 0 0", fontSize: "var(--text-sm)", letterSpacing: ".08em", textTransform: "uppercase" }}>Order delivery</div>
          <DeliveryButtons />
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="r-footer-bottom" style={{ padding: "16px var(--space-6)", maxWidth: "var(--container-xl)", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--ink-400)", fontSize: "var(--text-xs)" }}>
          <span>© 2026 Deserto Group LLC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
