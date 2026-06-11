import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";

const FROYO_CUTOUT = "/assets/froyo-cups-cutout.png";

/* ---------------- Hero (peach, bold editorial) ----------------
   Froyo cups burst out of the top of a wine disc, with rotated
   diet labels and a giant uppercase headline ("…creamy bliss."). */
export function Hero({ onMenu }) {
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
            <Link to="/order" className="btn-wine" style={{
              borderRadius: 999, padding: "16px 30px",
              background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
              fontSize: "var(--text-md)", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-md)",
            }}>
              Order now
              <Icon name="arrow-right" size={20} color="var(--cream-50)" />
            </Link>
            <button onClick={onMenu} style={{
              cursor: "pointer", borderRadius: 999, padding: "16px 30px", background: "transparent",
              border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)",
              fontWeight: 800, fontSize: "var(--text-md)",
            }}>See the menu</button>
          </div>
        </div>

        {/* ---- Froyo on wine disc — cups burst out of the top ---- */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 580, paddingTop: 100 }}>
          <div style={{ position: "relative", width: 400, height: 400, flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--wine-700)", boxShadow: "0 28px 64px -12px rgba(58,12,20,0.55)" }} />
            {/* diet labels */}
            {[
              { label: "Gluten Free", top: 22,  left: -24, rotate: -9 },
              { label: "Dairy Free",  top: 300, left: -30, rotate:  7 },
              { label: "Vegan",       top: 175, left: 348, rotate: -6 },
            ].map(({ label, top, left, rotate }) => (
              <div key={label} style={{
                position: "absolute", top, left, transform: `rotate(${rotate}deg)`, zIndex: 3,
                background: "var(--lime-500)", color: "var(--wine-900)", borderRadius: 999,
                padding: "7px 15px", boxShadow: "var(--shadow-md)", whiteSpace: "nowrap",
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".01em",
              }}>{label}</div>
            ))}
            {/* froyo cutout — centered on disc, bursts upward */}
            <img src={FROYO_CUTOUT}
              alt="Taro and Ristachio froyo cups"
              style={{
                position: "absolute",
                left: "50%", bottom: 0,
                transform: "translateX(-50%)",
                width: 400, height: "auto",
                filter: "drop-shadow(0 24px 32px rgba(58,12,20,0.45))",
                zIndex: 2,
                pointerEvents: "none",
              }} />
          </div>
        </div>
      </div>
    </section>
  );
}
