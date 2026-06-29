import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";

const ROTATE_MS = 5500;
// Each slide is a self-contained product promo (Dutch Bros / Yogen Früz style):
// its own café scene + headline + subcopy + CTA, so every rotation actively
// sells one product line instead of static copy sitting over wallpaper.
// The artworks are composed ~2:1 café scenes: product center-right, the left
// third soft/blurred for the headline. The hero box is held at ~2:1 (see
// .r-hero-inner) so object-fit: cover trims very little. `pos` is the per-image
// focal point — biased toward the bottom so the product and its grounding
// (podium/counter/berries) always stay in frame.
const SLIDES = [
  {
    src: "/assets/images/hero-froyo-scene.jpg",
    alt: "A Deserto frozen yogurt cup topped with berries, granola and caramel on the café counter",
    pos: "center 58%",
    eyebrow: "Self-serve froyo",
    title: "Pile it",
    accent: "high.",
    sub: "Frozen yogurt your way — swirl it, stack the toppings, zero limits.",
    ctaLabel: "Build yours",
    ctaTo: "/menu#froyo",
  },
  {
    src: "/assets/images/hero-tonics-scene.jpg",
    alt: "Three Deserto fruit tonics on the café counter, arches glowing behind",
    pos: "center 62%",
    eyebrow: "Signature tonics",
    title: "Sip something",
    accent: "bright.",
    sub: "Sparkling fruit tonics in our signature cans, made fresh every day.",
    ctaLabel: "See the tonics",
    ctaTo: "/menu#tonics",
  },
  {
    src: "/assets/images/hero-cakejars-scene.jpg",
    alt: "Three Deserto layered cake jars on the café counter with berries and chocolate",
    pos: "center 62%",
    eyebrow: "Cake jars",
    title: "Layered to",
    accent: "love.",
    sub: "Cream, crumb and berries — dessert, stacked in a jar.",
    ctaLabel: "Order a jar",
    ctaTo: "/menu#pastries",
  },
];

/* ---------------- Hero (crossfading product promos) ----------------
   Finished café scenes crossfade behind a left column whose copy changes with
   each slide — eyebrow, headline, subcopy and CTA all tied to the product on
   screen. The images are right-anchored so the product stays in frame; a
   left-weighted scrim (top-weighted on phones) keeps the copy readable, and the
   promo text fades up on each rotation. */
export function Hero({ onVisit }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = SLIDES.length;
  const slide = SLIDES[i];

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
      {/* ---- Crossfading scenes ----
         Capped at maxWidth and centered so the image stops expanding once it
         hits the same width where the height caps (≈1840px). Beyond that the
         box is frozen at a constant ratio → cover never re-crops, and the peach
         section background fills the gutters on ultra-wide screens. */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 1840, zIndex: 0,
      }}>
        {SLIDES.map((s, idx) => (
          <div
            key={s.src}
            aria-hidden={idx !== i}
            style={{
              position: "absolute", inset: 0,
              opacity: idx === i ? 1 : 0, transition: "opacity 1s var(--ease-out, ease)",
            }}
          >
            <img
              className="r-hero-img"
              src={s.src}
              alt={idx === i ? s.alt : ""}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: s.pos,
                // gentle pop so the products read rich, not flat/washed
                filter: "saturate(1.1) contrast(1.05)",
              }}
            />
          </div>
        ))}
        {/* left-weighted scrim — keeps the headline crisp, clears toward the product
            (becomes a top-weighted veil on phones, see .r-hero-scrim) */}
        <div className="r-hero-scrim" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, var(--peach-100) 0%, rgba(252,238,228,0.95) 17%, rgba(252,238,228,0.72) 30%, rgba(252,238,228,0.32) 42%, rgba(252,238,228,0.06) 52%, rgba(252,238,228,0) 60%)",
        }} />
        {/* right-edge fade — melts the capped image into the peach gutters on wide
            screens so there's no hard vertical seam (only the far-right background
            is touched, products sit well inside this) */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(270deg, var(--peach-100) 0%, rgba(252,238,228,0.6) 4%, rgba(252,238,228,0) 11%)",
        }} />
      </div>

      {/* ---- Foreground content (left column) ---- */}
      <div className="r-hero-inner" style={{
        position: "relative", zIndex: 2, maxWidth: "var(--container-xl)", margin: "0 auto",
        padding: "var(--space-6) var(--space-6)",
        // Height tracks width at ~1/2 of it so the box holds a ~2:1 ratio that
        // matches the artworks → cover trims almost nothing and the crop stays
        // identical as you resize (constant within the clamp band).
        minHeight: "clamp(460px, 49vw, 900px)",
        display: "flex", alignItems: "center",
      }}>
        <div className="r-hero-text" style={{ maxWidth: 540 }}>
          {/* Promo block — re-mounts on slide change (key={i}) so the entrance
              animation replays and the copy fades up with each new product. */}
          <div key={i} className="r-hero-promo">
            <span style={{
              display: "inline-block", background: "var(--wine-700)", color: "var(--lime-400)",
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".04em",
              textTransform: "uppercase", padding: "7px 16px", borderRadius: 999,
            }}>{slide.eyebrow}</span>

            <h1 className="r-hero-h1" style={{
              fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
              fontSize: "clamp(44px, 5vw, 76px)", lineHeight: 0.92, letterSpacing: "-0.01em",
              margin: "var(--space-4) 0 0", color: "var(--wine-700)",
            }}>
              {slide.title}<br /><span style={{ color: "var(--orange-500)" }}>{slide.accent}</span>
            </h1>

            <p style={{
              fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", color: "var(--ink-700)",
              lineHeight: 1.5, margin: "var(--space-4) 0 0", maxWidth: 440,
            }}>
              {slide.sub}
            </p>

            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-5)", flexWrap: "wrap" }}>
              <Link to={slide.ctaTo} className="btn-wine" style={{
                borderRadius: 999, padding: "13px 26px",
                background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
                fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", gap: 9, boxShadow: "var(--shadow-md)",
              }}>
                {slide.ctaLabel}
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
          </div>

          {/* carousel dots (persistent) */}
          <div style={{ display: "flex", gap: 8, marginTop: "var(--space-5)" }}>
            {SLIDES.map((s, idx) => (
              <button key={s.src} aria-label={`Show ${s.eyebrow}`} onClick={() => setI(idx)} style={{
                width: idx === i ? 26 : 10, height: 10, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
                background: idx === i ? "var(--wine-700)" : "rgba(118,47,53,0.3)", transition: "all .25s var(--ease-out, ease)",
              }} />
            ))}
          </div>

          {/* persistent brand/utility line — keeps the info-scent the old pill had */}
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--ink-500, var(--ink-700))",
            fontWeight: 700, margin: "var(--space-4) 0 0", letterSpacing: ".01em",
          }}>
            Open daily 10–10 · River Rd, Tucson
          </p>
        </div>
      </div>
    </section>
  );
}
