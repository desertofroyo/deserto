import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";

const ROTATE_MS = 5500;
// Each scene is a finished photograph; the product is framed to the right so it
// sits in the photo stage beside the headline column. pos picks which part of
// the wide photo stays centered in that stage.
// pos is right-biased: each scene has the product right-of-center with a soft,
// out-of-focus café/decoration on the left. Anchoring the crop to the right
// centers the product in the stage, keeps the right-side badges/splash in frame,
// and trims away the blurry left edge.
// Each slide carries its own headline + copy so the words match the photo on
// screen. The eyebrow (store hours) and the buttons stay fixed beneath.
const ORANGE = { color: "var(--orange-500)" };
const SLIDES = [
  {
    src: "/assets/images/hero-froyo-scene.jpg",
    alt: "A Deserto frozen yogurt cup topped with strawberries, blueberries, granola and caramel",
    pos: "right 50%",
    head: (<>Where coffee<br />meets creamy<br /><span style={ORANGE}>bliss.</span></>),
    copy: "Self-serve frozen yogurt with curated toppings, caramel drizzle and fresh fruit — swirled exactly your way at the topping wall.",
  },
  {
    src: "/assets/images/hero-tonics-scene.jpg",
    alt: "Three Deserto fruit tonics in signature cans over crushed ice with berries and citrus",
    pos: "right 50%",
    head: (<>Real fruit.<br /><span style={ORANGE}>Real refreshment.</span></>),
    copy: "Naturally energizing drinks made with real ingredients and vibrant flavors.",
    features: [
      { icon: "leaf", label: "real ingredients", tint: "var(--olive-100)", fg: "var(--olive-600)" },
      { icon: "snowflake", label: "refreshingly chilled", tint: "var(--rose-200)", fg: "var(--wine-700)" },
      { icon: "zap", label: "good energy", tint: "var(--peach-200)", fg: "var(--caramel-500)" },
    ],
  },
  {
    src: "/assets/images/hero-coffee-scene.jpg",
    alt: "Three Deserto iced coffees — a paper cup, an iced latte and a caramel iced coffee — over a scatter of roasted beans",
    pos: "right 50%",
    head: (<>My taste,<br /><span style={ORANGE}>my lifestyle</span></>),
    copy: "Indulge in what makes you happy. From creamy frozen yogurt to energizing coffee, every sip is a moment just for you.",
  },
  {
    src: "/assets/images/hero-cakejars-scene.jpg",
    alt: "Three Deserto layered cake jars — strawberry, Oreo cream and chocolate — on a marble board with fresh berries and Oreo cookies",
    pos: "right 50%",
    head: (<>Crafted<br /><span style={ORANGE}>to crave.</span></>),
    copy: "Creamy frozen yogurt, real ingredients and irresistible layers in every jar.",
    features: [
      { icon: "leaf", label: "real ingredients", tint: "var(--olive-100)", fg: "var(--olive-600)" },
      { icon: "clock", label: "crafted fresh daily", tint: "var(--rose-200)", fg: "var(--wine-700)" },
      { icon: "star", label: "made to satisfy", tint: "var(--peach-200)", fg: "var(--caramel-500)" },
    ],
  },
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
      /* bg inherits the page wrapper's cream (#FFF1DE), which is matched to the
         hero photos' baked cream wall — so the transparent nav band, the hero
         canvas and the photo wall are all one cream with no seam at the crisp top. */
      style={{ position: "relative", overflow: "hidden", background: "transparent" }}
    >
      {/* unsharp-mask convolution — crisps the in-focus product edges. The kernel
          sums to 1 (no divisor) so brightness is preserved; mild so soft café
          background doesn't turn noisy. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="hero-sharpen">
          <feConvolveMatrix order="3" preserveAlpha="true"
            kernelMatrix="0 -0.6 0  -0.6 3.4 -0.6  0 -0.6 0" />
        </filter>
      </svg>
      {/* ---- Product photo stage ----
          Full-bleed: the photo spans the entire hero width (edge to edge) so each
          scene's own soft backdrop — cream for froyo/tonics, blush-pink for the
          cake jars — becomes the headline column too. No separate flat color panel
          beside the photo, so there's no seam where a panel meets the image. The
          product sits in the right ~40% of every scene; the headline overlays the
          light left third. */}
      <div className="r-hero-stage" aria-hidden style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: "100%", zIndex: 0, overflow: "hidden",
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
              filter: "url(#hero-sharpen) contrast(1.05) saturate(1.04)",
              // full-bleed — no left feather. Each scene's own backdrop carries the
              // headline column; the light left scrim below keeps the copy legible.
              opacity: idx === i ? 1 : 0, transition: "opacity 1s var(--ease-out, ease)",
            }}
          />
        ))}
        {/* light left veil — lifts the copy off the photo's left third for a legible
            headline on both the cream (froyo/tonics) and pink (cake-jar) scenes,
            without tinting either toward a single flat color. */}
        <div className="r-hero-scrim" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(255,247,240,0.66) 0%, rgba(255,247,240,0.28) 24%, rgba(255,247,240,0) 46%)",
        }} />
      </div>

      <div className="r-hero-inner" style={{
        position: "relative", maxWidth: "var(--container-xl)", margin: "0 auto",
        padding: "var(--space-6) var(--space-6)", minHeight: "clamp(420px, 42vw, 620px)",
        display: "flex", alignItems: "center",
      }}>
        {/* ---- Foreground content (left column) ---- */}
        <div className="r-hero-text" style={{ position: "relative", zIndex: 2, maxWidth: 540 }}>
          <span style={{
            display: "inline-block", background: "var(--wine-700)", color: "var(--lime-400)",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".02em",
            padding: "8px 18px", borderRadius: 999,
          }}>Open daily 10–10 · River Rd, Tucson</span>

          {/* keyed so the headline + copy crossfade in step with the photo */}
          <div className="r-hero-copy" key={i}>
            <h1 className="r-hero-h1" style={{
              fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
              fontSize: "clamp(40px, 4.4vw, 68px)", lineHeight: 0.92, letterSpacing: "-0.01em",
              margin: "var(--space-4) 0 0", color: "var(--wine-700)",
            }}>
              {SLIDES[i].head}
            </h1>

            <p style={{
              fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", color: "var(--ink-700)",
              lineHeight: 1.5, margin: "var(--space-4) 0 0", maxWidth: 440,
            }}>
              {SLIDES[i].copy}
            </p>

            {/* per-slide feature trio (e.g. tonics): icon chip + label, in the
                site's own type + palette — same layout as the product art. */}
            {SLIDES[i].features && (
              <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-5)" }}>
                {SLIDES[i].features.map((f) => (
                  <div key={f.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: 96 }}>
                    <span style={{
                      width: 46, height: 46, borderRadius: "50%", marginBottom: 9,
                      display: "inline-flex", alignItems: "center", justifyContent: "center", background: f.tint,
                    }}>
                      <Icon name={f.icon} size={21} color={f.fg} />
                    </span>
                    <span style={{
                      fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-xs)",
                      color: "var(--ink-700)", lineHeight: 1.25,
                    }}>{f.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

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
