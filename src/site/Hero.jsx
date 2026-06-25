import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";

const ROTATE_MS = 4500;

/* ---------------- Hero (color-blocked flavor carousel) ----------------
   The whole hero background is a palette band that changes per slide, with the
   signature tonic-can cutout floating on it. The left column — badge, headline,
   copy, buttons — persists on top as the band and product rotate. */
export function Hero({ onMenu }) {
  const { heroFlavors } = SITE;
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = heroFlavors.length;
  const go = (d) => setI((p) => (p + d + n) % n);

  React.useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  const f = heroFlavors[i];

  return (
    <section
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", overflow: "hidden", background: f.band, transition: "background .7s var(--ease-out, ease)" }}
    >
      <div style={{
        position: "relative", zIndex: 2, maxWidth: "var(--container-xl)", margin: "0 auto",
        padding: "var(--space-10) var(--space-6) var(--space-9)", minHeight: 600,
        display: "grid", gridTemplateColumns: "1.06fr 0.94fr", gap: "var(--space-7)", alignItems: "center",
      }}>
        {/* ---- Persistent left column ---- */}
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

        {/* ---- Rotating tonic-can cutout on the band ---- */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--space-4)", minHeight: 540 }}>
          {/* cutout stage */}
          <div style={{ position: "relative", width: "100%", height: 430 }}>
            {/* soft halo disc for depth */}
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 360, height: 360, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "rgba(255,255,255,0.42)", filter: "blur(3px)" }} />
            {heroFlavors.map((fl, idx) => (
              <img
                key={fl.name}
                src={fl.img}
                alt={idx === i ? `${fl.name} — signature can` : ""}
                aria-hidden={idx !== i}
                style={{
                  position: "absolute", inset: 0, margin: "auto", maxWidth: "78%", maxHeight: "100%", objectFit: "contain",
                  opacity: idx === i ? 1 : 0, transform: idx === i ? "scale(1)" : "scale(.95)",
                  transition: "opacity .7s var(--ease-out, ease), transform .7s var(--ease-out, ease)",
                  filter: "drop-shadow(0 26px 36px rgba(58,12,20,0.32))",
                }}
              />
            ))}
          </div>

          {/* caption */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-3xl)", color: "var(--wine-700)", lineHeight: 1 }}>{f.name}</div>
            {f.note && <div style={{ fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", color: "var(--ink-700)", marginTop: 6 }}>{f.note}</div>}
          </div>

          {/* controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4 }}>
            <button onClick={() => go(-1)} aria-label="Previous flavor" style={arrowStyle}>
              <Icon name="arrow-left" size={18} color="var(--wine-700)" />
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              {heroFlavors.map((fl, idx) => (
                <button key={fl.name} aria-label={`Show ${fl.name}`} onClick={() => setI(idx)} style={{
                  width: idx === i ? 24 : 9, height: 9, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
                  background: idx === i ? "var(--wine-700)" : "rgba(118,47,53,0.30)", transition: "all .25s var(--ease-out, ease)",
                }} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next flavor" style={arrowStyle}>
              <Icon name="arrow-right" size={18} color="var(--wine-700)" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const arrowStyle = {
  width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
  background: "rgba(255,255,255,0.82)", border: "1.5px solid var(--wine-700)", boxShadow: "var(--shadow-sm)",
  display: "flex", alignItems: "center", justifyContent: "center",
};
