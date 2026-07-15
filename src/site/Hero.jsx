import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";

const ADVANCE_MS = 5000;

// Real brand photography only — one consistent world: the café interior's
// mauve walls, arches and warm sconces, product centered in every frame.
// Derivatives live in /assets/images/hero (1600px, ~100-180KB each);
// the untouched originals stay in /assets/images.
const SLIDES = [
  {
    src: "/assets/images/hero/froyo-sky.webp",
    alt: "An orange-and-vanilla creamsicle frozen yogurt swirl in a Deserto cup, held up against a bright blue cloudy sky",
  },
  {
    src: "/assets/images/hero/tonics-green-table.webp",
    alt: "Three Deserto canned drinks — a mango tonic, a lavender latte and a chai latte — lined up on a green café table",
  },
  {
    src: "/assets/images/hero/cone-hallway.webp",
    alt: "A two-tone chocolate and vanilla swirl in a waffle cone held up in the café's arched hallway",
  },
  {
    src: "/assets/images/hero/tonics-cheers.webp",
    alt: "Two friends toasting with berry Deserto tonics in branded cans inside the warm, sconce-lit café",
  },
  {
    src: "/assets/images/hero/coffee-iced.webp",
    alt: "A layered iced coffee in a branded Deserto cup on the café counter",
  },
  {
    src: "/assets/images/hero/tonics-cans-shelf.webp",
    alt: "Three Deserto sparkling fruit tonics in branded cans lined up on a lit shelf against the café's lavender wall",
  },
];

/* ---------------- Hero (photography carousel) ----------------
   Full-bleed brand photos in a snap-scrolling strip — swipe on touch, arrows +
   dots on desktop — with a quiet centered copy block beneath. The photos carry
   the story; the copy stays put. Auto-advances gently until the visitor touches
   the carousel, then hands over control for good. */
export function Hero({ onVisit }) {
  const carRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const activeRef = React.useRef(0);
  const [hovered, setHovered] = React.useState(false);
  // First real interaction (swipe, wheel, arrow, dot) permanently stops the
  // auto-advance — nothing is more annoying than a carousel that fights you.
  const [interacted, setInteracted] = React.useState(false);
  const n = SLIDES.length;

  const nearest = React.useCallback(() => {
    const car = carRef.current;
    if (!car) return 0;
    const mid = car.scrollLeft + car.clientWidth / 2;
    let best = 0, bd = Infinity;
    for (let i = 0; i < car.children.length; i++) {
      const s = car.children[i];
      const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid);
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }, []);

  // Smooth scroll with a settle-check: some browsers cancel smooth scrollTo on
  // snap containers (or can't animate under reduced motion / throttled frames),
  // so if we haven't landed shortly after, we land instantly instead.
  const goTo = React.useCallback((i) => {
    const car = carRef.current;
    if (!car) return;
    const s = car.children[Math.max(0, Math.min(n - 1, i))];
    const target = s.offsetLeft - (car.clientWidth - s.offsetWidth) / 2;
    car.scrollTo({ left: target, behavior: "smooth" });
    clearTimeout(goTo._t);
    goTo._t = setTimeout(() => {
      if (Math.abs(car.scrollLeft - target) > 4) car.scrollLeft = target;
      const at = nearest();
      activeRef.current = at;
      setActive(at);
    }, 500);
  }, [n, nearest]);

  const onScroll = React.useCallback(() => {
    const at = nearest();
    activeRef.current = at;
    setActive(at);
  }, [nearest]);

  // Gentle auto-advance (wraps), paused on hover, off after any interaction,
  // and never under prefers-reduced-motion.
  React.useEffect(() => {
    if (hovered || interacted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo((activeRef.current + 1) % n), ADVANCE_MS);
    return () => clearInterval(t);
  }, [hovered, interacted, n, goTo]);

  const stopAuto = () => setInteracted(true);
  const arrow = (dir) => { stopAuto(); goTo(activeRef.current + dir); };

  return (
    <section
      id="top"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", background: "transparent", paddingTop: "var(--space-6)" }}
    >
      {/* ---- photo strip ---- */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Deserto in pictures"
        style={{ position: "relative", maxWidth: "var(--container-xl)", margin: "0 auto" }}
      >
        <button className="r-hc-arrow" aria-label="Previous photo" onClick={() => arrow(-1)}
          style={{ left: "var(--space-4)" }}>
          <Icon name="chevron-left" size={20} color="var(--wine-700)" />
        </button>
        <button className="r-hc-arrow" aria-label="Next photo" onClick={() => arrow(1)}
          style={{ right: "var(--space-4)" }}>
          <Icon name="chevron-right" size={20} color="var(--wine-700)" />
        </button>

        <div
          ref={carRef}
          className="r-hc-scroller"
          onScroll={onScroll}
          onPointerDown={stopAuto}
          onWheel={stopAuto}
          onTouchStart={stopAuto}
        >
          {SLIDES.map((s, idx) => (
            <figure className="r-hc-slide" key={s.src}>
              <img
                src={s.src}
                alt={s.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                fetchpriority={idx === 0 ? "high" : undefined}
                draggable={false}
              />
            </figure>
          ))}
        </div>

        {/* dots */}
        <div className="r-hc-dots">
          {SLIDES.map((s, idx) => (
            <button
              key={s.src}
              aria-label={`Show photo ${idx + 1}`}
              aria-current={idx === active}
              className={idx === active ? "on" : undefined}
              onClick={() => { stopAuto(); goTo(idx); }}
            />
          ))}
        </div>
      </div>

      {/* ---- copy block — the words hold still while the photos move ---- */}
      <div style={{
        maxWidth: 760, margin: "0 auto", textAlign: "center",
        padding: "var(--space-4) var(--space-6) var(--space-8)",
      }}>
        <span style={{
          display: "inline-block",
          background: "var(--wine-700)", color: "var(--lime-400)",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)",
          letterSpacing: ".02em", padding: "8px 18px", borderRadius: 999,
        }}>Open daily 10–10 · River Rd, Tucson</span>

        <h1 className="r-hc-h1" style={{
          fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
          fontSize: "clamp(34px, 3.6vw, 52px)", lineHeight: 0.96, letterSpacing: "-0.01em",
          margin: "var(--space-4) 0 0", color: "var(--wine-700)",
        }}>
          Where coffee meets <span style={{ color: "var(--orange-500)" }}>creamy bliss.</span>
        </h1>

        <p style={{
          fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", color: "var(--ink-700)",
          lineHeight: 1.55, margin: "var(--space-4) auto 0", maxWidth: 520,
        }}>
          Self-serve frozen yogurt with endless toppings, fresh fruit,
          premium toppings and rotating seasonal flavors.
        </p>

        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", marginTop: "var(--space-5)" }}>
          <Link to="/menu" className="btn-wine" style={{
            borderRadius: 999, padding: "13px 26px",
            background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
            fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", boxShadow: "var(--shadow-md)",
          }}>
            View menu
          </Link>
          <button onClick={onVisit} style={{
            cursor: "pointer", borderRadius: 999, padding: "13px 26px", background: "rgba(255,255,255,0.55)",
            border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)",
            fontWeight: 800, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center",
          }}>
            Visit us
          </button>
        </div>
      </div>
    </section>
  );
}
