import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { ProductMockup } from "../site/ProductMockup.jsx";

/* Preview of the illustrated product-mockup system — one branded vessel per
   flavor, no photo required. Swap any of these onto a menu item, or render
   them to PNG for static use. */
const ITEMS = [
  { kind: "can", name: "Raspberry Tonic", color: "#C97E86", accent: "#762F35", fruit: "berry" },
  { kind: "can", name: "Pineapple Tonic", color: "#E9C24B", accent: "#6A704B", fruit: "citrus" },
  { kind: "can", name: "Strawberry Tonic", color: "#D87A74", accent: "#762F35", fruit: "berry" },
  { kind: "can", name: "Prickly Pear Tonic", color: "#C56A9A", accent: "#762F35", fruit: "berry" },
  { kind: "can", name: "Mango Tonic", color: "#F0A444", accent: "#762F35", fruit: "citrus" },
  { kind: "can", name: "Kiwi Tonic", color: "#A9C24E", accent: "#6A704B", fruit: "leaf" },
  { kind: "cup", name: "Taro Swirl", color: "#9C7FB0", accent: "#762F35" },
  { kind: "cup", name: "Premium Tart", color: "#F2E9DE", accent: "#762F35" },
  { kind: "cup", name: "Pomegranate", color: "#B0405A", accent: "#762F35" },
  { kind: "cup", name: "Salted Caramel", color: "#C68B4E", accent: "#714826" },
  { kind: "cone", name: "Matcha", color: "#9BAE5C", accent: "#6A704B" },
  { kind: "cone", name: "Vanilla Bean", color: "#EBD9B8", accent: "#714826" },
  { kind: "latte", name: "Lavender Latte", color: "#7A5C42", accent: "#762F35" },
  { kind: "latte", name: "Horchata Latte", color: "#C49A6C", accent: "#714826" },
  { kind: "latte", name: "Iced Macchiato", color: "#6B4630", accent: "#762F35" },
];

export default function Mockups() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)" }}>
      <header style={{ borderBottom: "1px solid var(--border-default)", background: "var(--peach-100)" }}>
        <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <Link to="/" className="nav-link" style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--ink-700)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="arrow-left" size={15} color="var(--ink-700)" /> Home
          </Link>
          <div>
            <span className="eyebrow" style={{ color: "var(--wine-500)" }}>Illustrated mockups · no photo needed</span>
            <h1 style={{ fontSize: "var(--text-3xl)", margin: "4px 0 0", color: "var(--wine-700)" }}>Product mockup system</h1>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-7) var(--space-6) var(--space-9)" }}>
        <p style={{ maxWidth: "60ch", color: "var(--text-muted)", fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", marginBottom: "var(--space-7)" }}>
          Each tile is drawn in code (SVG) and tinted to the flavor — a Deserto can, froyo cup, waffle cone, or latte glass on the brand peach backdrop, with the wordmark and fruit garnish. Drop any onto a menu item that has no photo, or export to PNG for static use.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "var(--space-5)" }}>
          {ITEMS.map((it) => (
            <div key={it.name} style={{ background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <ProductMockup {...it} radius="0" />
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--ink-900)" }}>{it.name}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)", textTransform: "capitalize" }}>{it.kind} mockup</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
