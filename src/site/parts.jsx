import React from "react";

/* Deserto website — primitives, season theme engine, kinetic marquee. */

export const IMG = "/assets/images/";
export const ISO = "/assets/logos/deserto-isotype.png";

/* ---------- Photo — real café photography w/ graceful fallback ---------- */
export function Photo({ src, tint = "var(--peach-100)", label, height = "100%", radius = 0, pos = "center", style = {} }) {
  return (
    <div style={{
      position: "relative", height, width: "100%", background: tint, borderRadius: radius,
      overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", ...style,
    }}>
      {src ? (
        <img src={src[0] === "/" ? src : IMG + src} alt={label || ""} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} />
      ) : (
        <img src={ISO} alt="" style={{ height: "38%", opacity: 0.14, filter: "saturate(0.6)" }} />
      )}
    </div>
  );
}

/* ---------- useReveal — fade + rise an element into view on scroll ----------
   Returns a ref; attach it to any element to make it (and any .stagger-item
   children) animate in once, the first time it enters the viewport. */
export function useReveal(options = {}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- Arch — the café's signature arched silhouette ---------- */
export function Arch({ children, radius = "50% 50% 0 0 / 38% 38% 0 0", style = {}, ...rest }) {
  return (
    <div style={{ borderRadius: radius, overflow: "hidden", ...style }} {...rest}>
      {children}
    </div>
  );
}

/* ---------- Chip — selectable pill (menu tabs, order page) ---------- */
export function Chip({ on, color, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: on ? "2px solid var(--wine-700)" : "2px solid var(--border-default)",
      background: on ? "var(--wine-700)" : "var(--white)", color: on ? "var(--cream-50)" : "var(--ink-700)",
      cursor: "pointer", borderRadius: 999, padding: "9px 16px", display: "inline-flex", alignItems: "center", gap: 9,
      fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)", whiteSpace: "nowrap",
      transition: "all .16s var(--ease-out, ease)",
    }}>
      {color && <span style={{ width: 13, height: 13, borderRadius: "50%", background: color, boxShadow: on ? "0 0 0 2px rgba(255,255,255,0.4)" : "none" }} />}
      {children}
    </button>
  );
}

/* ---------- Season state (auto by date) ---------- */
export function useSeasonState(seasons) {
  /* Auto-pick by current date: Mar–May spring, Jun–Aug summer, else autumn. */
  const m = new Date().getMonth();
  const byDate = m >= 2 && m <= 4 ? 0 : m >= 5 && m <= 7 ? 1 : 2;
  const [idx, setIdx] = React.useState(byDate);
  const season = seasons[idx];
  const setSeason = React.useCallback((i) => setIdx(i), []);
  const vars = {
    "--accent": season.accent,
    "--accent-soft": season.soft,
  };
  return { seasons, idx, season, setSeason, vars };
}

/* ---------- Kinetic sparkle marquee (wine band, lime text) ---------- */
export function Marquee() {
  const items = [
    "Where coffee meets creamy bliss", "Self-serve froyo", "Tonics in a can",
    "NYC cookies", "Espresso bar", "Cake jars", "Mi gusto, mi estilo",
  ];
  const Row = ({ ariaHidden }) => (
    <div aria-hidden={ariaHidden} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {items.map((text, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 30, padding: "0 30px", whiteSpace: "nowrap" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
            fontSize: "var(--text-md)", letterSpacing: ".03em", color: "var(--lime-400)",
          }}>{text}</span>
          <span style={{ color: "var(--orange-500)", fontSize: 14, lineHeight: 0 }}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div style={{ overflow: "hidden", background: "var(--wine-700)", height: 64, display: "flex", alignItems: "center" }}>
      <div className="ds-marquee" style={{ display: "flex", width: "max-content" }}>
        <Row /><Row ariaHidden />
      </div>
    </div>
  );
}
