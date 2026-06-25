import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";

const ROTATE_MS = 4500;

/* ---------------- Hero (full-bleed flavor carousel) ----------------
   The background cycles through froyo flavor photos (crossfade, auto-advance),
   while the left column — badge, headline, copy, buttons — stays fixed on top.
   A left-weighted peach scrim keeps the burgundy headline legible. */
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
      style={{ position: "relative", overflow: "hidden", background: "var(--peach-100)" }}
    >
      {/* ---- Background carousel ---- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {heroFlavors.map((fl, idx) => (
          <img
            key={fl.name}
            src={fl.img}
            alt={idx === i ? `${fl.name} frozen yogurt` : ""}
            aria-hidden={idx !== i}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: idx === i ? 1 : 0, transition: "opacity .9s var(--ease-out, ease)",
            }}
          />
        ))}
        {/* left-weighted scrim — solid peach under the text, clearing toward the photo */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, var(--peach-100) 0%, rgba(252,238,228,0.97) 30%, rgba(252,238,228,0.55) 58%, rgba(252,238,228,0.08) 82%, rgba(252,238,228,0) 100%)",
        }} />
      </div>

      {/* ---- Foreground content ---- */}
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
              cursor: "pointer", borderRadius: 999, padding: "16px 30px", background: "rgba(255,255,255,0.55)",
              border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)",
              fontWeight: 800, fontSize: "var(--text-md)",
            }}>See the menu</button>
          </div>
        </div>

        {/* right column intentionally empty — the photo shows through here */}
        <div aria-hidden="true" />
      </div>

      {/* ---- Current-flavor caption + carousel controls (bottom-right) ---- */}
      <div style={{
        position: "absolute", right: "var(--space-6)", bottom: "var(--space-6)", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14,
      }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginBottom: 8, flexWrap: "wrap" }}>
            {(f.tags || []).map((t) => (
              <span key={t} style={{
                background: "var(--lime-500)", color: "var(--wine-900)", borderRadius: 999, padding: "4px 11px",
                fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-xs)", letterSpacing: ".02em",
              }}>{t}</span>
            ))}
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-3xl)", lineHeight: 1,
            color: "var(--cream-50)", textShadow: "0 2px 14px rgba(58,12,20,0.55)",
          }}>{f.name}</div>
          {f.note && (
            <div style={{
              fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", marginTop: 4,
              color: "var(--cream-50)", textShadow: "0 2px 12px rgba(58,12,20,0.6)",
            }}>{f.note}</div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* dots */}
          <div style={{ display: "flex", gap: 8 }}>
            {heroFlavors.map((fl, idx) => (
              <button key={fl.name} aria-label={`Show ${fl.name}`} onClick={() => setI(idx)} style={{
                width: idx === i ? 24 : 9, height: 9, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
                background: idx === i ? "var(--wine-700)" : "rgba(118,47,53,0.35)", transition: "all .25s var(--ease-out, ease)",
              }} />
            ))}
          </div>
          {/* arrows */}
          <button onClick={() => go(-1)} aria-label="Previous flavor" style={arrowStyle}>
            <Icon name="arrow-left" size={18} color="var(--wine-700)" />
          </button>
          <button onClick={() => go(1)} aria-label="Next flavor" style={arrowStyle}>
            <Icon name="arrow-right" size={18} color="var(--wine-700)" />
          </button>
        </div>
      </div>
    </section>
  );
}

const arrowStyle = {
  width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer",
  background: "rgba(252,238,228,0.92)", backdropFilter: "blur(6px)", boxShadow: "var(--shadow-md)",
  display: "flex", alignItems: "center", justifyContent: "center",
};
