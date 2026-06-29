import React from "react";
import { Icon } from "../components/ds";

const LOGO = "/assets/logos/deserto-primary-cream.svg";

/* Footer — coffee-brown band with brand + quick links. */
export function Footer() {
  return (
    <footer style={{ background: "var(--coffee-600)", color: "var(--sand-200)" }}>
      <div className="r-footer" style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--space-6)", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "var(--space-6)" }}>
        <div>
          <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" style={{ height: 50, width: "auto", display: "block", opacity: 0.95 }} />
          <p style={{ marginTop: 16, color: "var(--ink-300)", fontSize: "var(--text-sm)", maxWidth: 260, fontFamily: "var(--font-editorial)" }}>Where coffee meets creamy bliss. 5635 E River Rd, Unit 101 — Tucson, Arizona.</p>
        </div>
        {[["Menu", ["Frozen Yogurt", "Tonics", "Coffee", "Pastries"]], ["Deserto", ["Our story", "Visit us", "View menu"]]].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".04em" }}>{h}</div>
            {items.map((i) => (<div key={i} style={{ color: "var(--ink-300)", fontSize: "var(--text-sm)", marginBottom: 9 }}>{i}</div>))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="r-footer-bottom" style={{ padding: "16px var(--space-6)", maxWidth: "var(--container-xl)", margin: "0 auto", display: "flex", justifyContent: "space-between", color: "var(--ink-400)", fontSize: "var(--text-xs)" }}>
          <span>© 2026 Deserto Group LLC. All rights reserved.</span>
          <span style={{ display: "flex", gap: 16 }}>
            <Icon name="instagram" size={18} /><Icon name="facebook" size={18} /><Icon name="twitter" size={18} />
          </span>
        </div>
      </div>
    </footer>
  );
}
