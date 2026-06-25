import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { FlavorCarousel } from "./FlavorCarousel.jsx";
import { SITE } from "./data.js";

/* ---------------- Hero (peach, bold editorial) ----------------
   Giant uppercase headline beside an auto-rotating flavor carousel. */
export function Hero({ onMenu }) {
  const { heroFlavors } = SITE;
  return (
    <section id="top" style={{ background: "var(--peach-100)", position: "relative" }}>
      {/* soft decorative bloom */}
      <div style={{ position: "absolute", top: -120, left: -80, width: 320, height: 320, borderRadius: "50%", background: "var(--peach-200)", opacity: 0.5, filter: "blur(8px)" }} />
      <div style={{
        position: "relative", maxWidth: "var(--container-xl)", margin: "0 auto",
        padding: "var(--space-8) var(--space-6)",
        display: "grid", gridTemplateColumns: "1.06fr 0.94fr", gap: "var(--space-7)", alignItems: "center", paddingTop: "var(--space-10)",
      }}>
        {/* ---- Text column ---- */}
        <div>
          <span style={{
            display: "inline-block", background: "var(--wine-700)", color: "var(--lime-400)",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".02em",
            padding: "8px 18px", borderRadius: 999,
          }}>Open daily 10–10 · River Rd, Tucson</span>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
            fontSize: "clamp(56px, 6.4vw, 104px)", lineHeight: 0.9, letterSpacing: "-0.01em",
            margin: "var(--space-5) 0 0", color: "var(--wine-700)",
          }}>
            Where coffee<br />meets creamy<br /><span style={{ color: "var(--orange-500)" }}>bliss.</span>
          </h1>

          <p style={{
            fontFamily: "var(--font-editorial)", fontSize: "var(--text-lg)", color: "var(--ink-700)",
            lineHeight: 1.55, margin: "var(--space-5) 0 0", maxWidth: 460,
          }}>
            Self-serve frozen yogurt with curated toppings, espresso classics, fruity tonics in our signature cans, and fresh-baked pastries — made to fit your taste and your lifestyle.
          </p>

          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
            <Link to="/menu" className="btn-wine" style={{
              borderRadius: 999, padding: "16px 30px",
              background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
              fontSize: "var(--text-md)", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-md)",
            }}>
              View menu
              <Icon name="arrow-right" size={20} color="var(--cream-50)" />
            </Link>
            <button onClick={onMenu} style={{
              cursor: "pointer", borderRadius: 999, padding: "16px 30px", background: "transparent",
              border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)",
              fontWeight: 800, fontSize: "var(--text-md)",
            }}>See the menu</button>
          </div>
        </div>

        {/* ---- Auto-rotating flavor carousel ---- */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FlavorCarousel flavors={heroFlavors} />
        </div>
      </div>
    </section>
  );
}
