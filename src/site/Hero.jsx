import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";

const HERO_BG = "/assets/images/hero-tonics-scene.jpg";

/* ---------------- Hero (composed tonic-counter scene) ----------------
   One finished photograph — the three signature tonics on the café counter,
   arches softly blurred behind. The left of the frame is open counter, so the
   headline + copy + buttons sit there over a left-weighted scrim; a slow
   ken-burns drift keeps the scene alive. */
export function Hero({ onMenu }) {
  return (
    <section
      id="top"
      style={{ position: "relative", overflow: "hidden", background: "var(--peach-100)" }}
    >
      {/* ---- Full-bleed composed scene ---- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          className="hero-kenburns"
          src={HERO_BG}
          alt="Three Deserto fruit tonics — mixed berry, frozen yogurt and peach berry — on the café counter, arches glowing behind"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "right 55%" }}
        />
        {/* left-weighted scrim — keeps the headline crisp, clears toward the cans
            (becomes a top-weighted veil on phones, see .r-hero-scrim) */}
        <div className="r-hero-scrim" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, var(--peach-100) 0%, rgba(252,238,228,0.92) 22%, rgba(252,238,228,0.55) 44%, rgba(252,238,228,0.12) 64%, rgba(252,238,228,0) 80%)",
        }} />
      </div>

      {/* ---- Foreground content (left column) ---- */}
      <div className="r-hero-inner" style={{
        position: "relative", zIndex: 2, maxWidth: "var(--container-xl)", margin: "0 auto",
        padding: "var(--space-10) var(--space-6) var(--space-9)", minHeight: 620,
        display: "flex", alignItems: "center",
      }}>
        <div className="r-hero-text" style={{ maxWidth: 540 }}>
          <span style={{
            display: "inline-block", background: "var(--wine-700)", color: "var(--lime-400)",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".02em",
            padding: "8px 18px", borderRadius: 999,
          }}>Open daily 10–10 · River Rd, Tucson</span>

          <h1 className="r-hero-h1" style={{
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
              cursor: "pointer", borderRadius: 999, padding: "16px 30px", background: "rgba(255,255,255,0.55)",
              border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)",
              fontWeight: 800, fontSize: "var(--text-md)",
            }}>See the menu</button>
          </div>
        </div>
      </div>
    </section>
  );
}
