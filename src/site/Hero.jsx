import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";

const ROTATE_MS = 5500;
// Each scene is a finished photograph; the product is framed to the right so it
// sits in the photo stage beside the headline column. pos picks which part of
// the wide photo stays centered in that stage.
const SLIDES = [
  { src: "/assets/images/hero-froyo-scene.jpg",  alt: "A Deserto frozen yogurt cup topped with berries, granola and caramel", pos: "center 50%" },
  { src: "/assets/images/hero-tonics-scene.jpg", alt: "Three Deserto fruit tonics on the café counter, arches glowing behind", pos: "center 52%" },
  { src: "/assets/images/hero-cakejars-scene.jpg", alt: "Three Deserto layered cake jars on the café counter with berries and chocolate", pos: "center 50%" },
];

/* ---------------- Hero (crossfading composed scenes) ----------------
   The hero is capped to the site max width and centered. A photo stage sits in
   the right ~60%, with the product centered inside it; a left color-fade melts
   the photo into the peach headline column, and a soft blur feathers the right
   edge. The fixed left column (headline, copy, buttons) overlays on top. */
export function Hero({ onVisit }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = SLIDES.length;

  React.useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", overflow: "hidden", background: "var(--peach-100)" }}
    >
      <div className="r-hero-inner" style={{
        position: "relative", maxWidth: "var(--container-xl)", margin: "0 auto",
        padding: "var(--space-6) var(--space-6)", minHeight: "clamp(420px, 42vw, 620px)",
        display: "flex", alignItems: "center",
      }}>
        {/* ---- Product photo stage (right side, centered) ---- */}
        <div className="r-hero-stage" aria-hidden style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: "62%", zIndex: 0, overflow: "hidden",
        }}>
          {SLIDES.map((s, idx) => (
            <img
              key={s.src}
              className="r-hero-img"
              src={s.src}
              alt={idx === i ? s.alt : ""}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: s.pos,
                opacity: idx === i ? 1 : 0, transition: "opacity 1s var(--ease-out, ease)",
              }}
            />
          ))}
          {/* left color-fade — melts the photo into the peach headline column */}
          <div className="r-hero-scrim" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, var(--peach-100) 0%, rgba(252,238,228,0.7) 20%, rgba(252,238,228,0) 54%)",
          }} />
        </div>

        {/* ---- Foreground content (left column) ---- */}
        <div className="r-hero-text" style={{ position: "relative", zIndex: 2, maxWidth: 540 }}>
          <span style={{
            display: "inline-block", background: "var(--wine-700)", color: "var(--lime-400)",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".02em",
            padding: "8px 18px", borderRadius: 999,
          }}>Open daily 10–10 · River Rd, Tucson</span>

          <h1 className="r-hero-h1" style={{
            fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
            fontSize: "clamp(40px, 4.4vw, 68px)", lineHeight: 0.92, letterSpacing: "-0.01em",
            margin: "var(--space-4) 0 0", color: "var(--wine-700)",
          }}>
            Where coffee<br />meets creamy<br /><span style={{ color: "var(--orange-500)" }}>bliss.</span>
          </h1>

          <p style={{
            fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", color: "var(--ink-700)",
            lineHeight: 1.5, margin: "var(--space-4) 0 0", maxWidth: 440,
          }}>
            Self-serve frozen yogurt with curated toppings, espresso classics, fruity tonics in our signature cans, and fresh-baked pastries — made to fit your taste and your lifestyle.
          </p>

          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-5)" }}>
            <Link to="/menu" className="btn-wine" style={{
              borderRadius: 999, padding: "13px 26px",
              background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
              fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", gap: 9, boxShadow: "var(--shadow-md)",
            }}>
              View menu
              <Icon name="arrow-right" size={18} color="var(--cream-50)" />
            </Link>
            <button onClick={onVisit} style={{
              cursor: "pointer", borderRadius: 999, padding: "13px 26px", background: "rgba(255,255,255,0.55)",
              border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)",
              fontWeight: 800, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", gap: 9,
            }}>
              Visit us
              <Icon name="map-pin" size={17} color="var(--wine-700)" />
            </button>
          </div>

          {/* carousel dots */}
          <div style={{ display: "flex", gap: 8, marginTop: "var(--space-5)" }}>
            {SLIDES.map((s, idx) => (
              <button key={s.src} aria-label={`Show slide ${idx + 1}`} onClick={() => setI(idx)} style={{
                width: idx === i ? 26 : 10, height: 10, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
                background: idx === i ? "var(--wine-700)" : "rgba(118,47,53,0.3)", transition: "all .25s var(--ease-out, ease)",
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
