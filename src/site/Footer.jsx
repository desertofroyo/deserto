import React from "react";
import { Button, Icon } from "../components/ds";

const LOGO = "/assets/logos/deserto-logo-full.png";

/* Footer — coffee-brown band with newsletter signup. */
export function Footer() {
  const [email, setEmail] = React.useState("");
  return (
    <footer style={{ background: "var(--coffee-600)", color: "var(--sand-200)" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--space-6)", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr", gap: "var(--space-6)" }}>
        <div>
          <img src={LOGO} alt="Deserto" style={{ height: 46, filter: "brightness(0) invert(1)", opacity: 0.92 }} />
          <p style={{ marginTop: 16, color: "var(--ink-300)", fontSize: "var(--text-sm)", maxWidth: 260, fontFamily: "var(--font-editorial)" }}>Where coffee meets creamy bliss. 5635 E River Rd, Unit 101 — Tucson, Arizona.</p>
        </div>
        {[["Menu", ["Frozen Yogurt", "Tonics", "Coffee", "Pastries"]], ["Deserto", ["Our story", "Visit us", "Order online"]]].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".04em" }}>{h}</div>
            {items.map((i) => (<div key={i} style={{ color: "var(--ink-300)", fontSize: "var(--text-sm)", marginBottom: 9 }}>{i}</div>))}
          </div>
        ))}
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".04em" }}>Get our drops</div>
          <p style={{ color: "var(--ink-300)", fontSize: "var(--text-sm)", marginBottom: 12 }}>Seasonal flavors &amp; rewards, no spam.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={{ flex: 1, minWidth: 0, border: "none", borderRadius: "var(--radius-md)", padding: "11px 13px", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }} />
            <Button variant="accent" size="md">Join</Button>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ padding: "16px var(--space-6)", maxWidth: "var(--container-xl)", margin: "0 auto", display: "flex", justifyContent: "space-between", color: "var(--ink-400)", fontSize: "var(--text-xs)" }}>
          <span>© 2026 Deserto Group LLC. All rights reserved.</span>
          <span style={{ display: "flex", gap: 16 }}>
            <Icon name="instagram" size={18} /><Icon name="facebook" size={18} /><Icon name="twitter" size={18} />
          </span>
        </div>
      </div>
    </footer>
  );
}
