import React from "react";
import { Icon } from "../components/ds";
import { Photo } from "./parts.jsx";

const ROTATE_MS = 4000;

/* ---------------- Hero flavor carousel ----------------
   Auto-rotating showcase of froyo flavors — a big photo per slide with the
   flavor name + diet tags, dot indicators, and prev/next arrows. Pauses on
   hover so guests can read. */
export function FlavorCarousel({ flavors }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = flavors.length;
  const go = (d) => setI((p) => (p + d + n) % n);

  React.useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  const f = flavors[i];
  const arrow = (side, onClick, label, icon) => (
    <button onClick={onClick} aria-label={label} style={{
      position: "absolute", top: "50%", [side]: 12, transform: "translateY(-50%)", zIndex: 4,
      width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer",
      background: "rgba(252,238,228,0.9)", backdropFilter: "blur(6px)", boxShadow: "var(--shadow-md)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon name={icon} size={20} color="var(--wine-700)" />
    </button>
  );

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", width: "100%", maxWidth: 460, margin: "0 auto" }}
    >
      <div style={{
        position: "relative", borderRadius: "var(--radius-2xl)", overflow: "hidden",
        boxShadow: "0 28px 64px -16px rgba(58,12,20,0.45)", aspectRatio: "4 / 5", background: "var(--wine-700)",
      }}>
        {/* slides — crossfade */}
        {flavors.map((fl, idx) => (
          <div key={fl.name} aria-hidden={idx !== i} style={{
            position: "absolute", inset: 0, opacity: idx === i ? 1 : 0,
            transition: "opacity .7s var(--ease-out, ease)",
          }}>
            <Photo src={fl.img} pos="center" tint="var(--rose-200)" label={fl.name} height="100%" />
          </div>
        ))}

        {/* readability gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(58,12,20,0.74) 0%, rgba(58,12,20,0.05) 50%)" }} />

        {/* caption */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "var(--space-5)", color: "var(--cream-50)", zIndex: 3 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {(f.tags || []).map((t) => (
              <span key={t} style={{
                background: "var(--lime-500)", color: "var(--wine-900)", borderRadius: 999, padding: "4px 11px",
                fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-xs)", letterSpacing: ".02em",
              }}>{t}</span>
            ))}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-3xl)", lineHeight: 1 }}>{f.name}</div>
          {f.note && <div style={{ fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", opacity: 0.92, marginTop: 6 }}>{f.note}</div>}
        </div>

        {arrow("left", () => go(-1), "Previous flavor", "arrow-left")}
        {arrow("right", () => go(1), "Next flavor", "arrow-right")}
      </div>

      {/* dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "var(--space-4)" }}>
        {flavors.map((fl, idx) => (
          <button key={fl.name} aria-label={`Show ${fl.name}`} onClick={() => setI(idx)} style={{
            width: idx === i ? 24 : 9, height: 9, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
            background: idx === i ? "var(--wine-700)" : "var(--rose-300)", transition: "all .25s var(--ease-out, ease)",
          }} />
        ))}
      </div>
    </div>
  );
}
