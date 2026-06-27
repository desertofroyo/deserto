import React from "react";
import { Icon } from "../components/ds";
import { Photo, Arch, useReveal } from "./parts.jsx";
import { SITE } from "./data.js";

const ROTATE_MS = 4000;

/* Story — the dessert + desierto wordplay, on a wine canvas, with an
   arch-framed photo carousel rotating through the café & products. */
export function Story() {
  const { storyGallery } = SITE;
  const reveal = useReveal();
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = storyGallery.length;
  const go = (d) => setI((p) => (p + d + n) % n);

  React.useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section id="story" style={{ background: "var(--wine-700)", color: "var(--cream-50)", overflow: "hidden" }}>
      <div ref={reveal} className="r-split" style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)", display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: "var(--space-8)", alignItems: "center" }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--lime-400)" }}>Our story</span>
          <h2 style={{ fontSize: "var(--text-5xl)", margin: "12px 0 0", lineHeight: 0.98, color: "var(--cream-50)" }}>
            <span style={{ display: "block" }}>Dessert,</span>
            <span style={{ display: "block", color: "var(--lime-400)", fontStyle: "italic", fontFamily: "var(--font-editorial)", fontWeight: 800 }}>meet desierto.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-editorial)", fontSize: "var(--text-lg)", lineHeight: 1.62, color: "rgba(255,255,255,0.84)", maxWidth: 500, marginTop: "var(--space-5)" }}>
            One invented name, two languages, two meanings — <em>dessert</em> and <em>desierto</em> (desert). It's the promise behind every cup: a warm, softly-lit, arched space where health and indulgence finally sit at the same table — crafted for the way you eat, move and treat yourself.
          </p>
        </div>

        {/* ---- Arch-framed photo carousel ---- */}
        <div
          style={{ position: "relative", display: "flex", justifyContent: "center" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Arch className="r-arch" style={{ position: "relative", width: "100%", maxWidth: 460, height: 560, boxShadow: "var(--shadow-lg)", border: "12px solid rgba(255,255,255,0.10)" }}>
            {storyGallery.map((s, idx) => (
              <div key={s.img} aria-hidden={idx !== i} style={{
                position: "absolute", inset: 0, opacity: idx === i ? 1 : 0,
                transition: "opacity .9s var(--ease-out, ease)",
              }}>
                <Photo src={s.img} pos="center" label={s.caption} height="100%" />
              </div>
            ))}
            {/* dots overlaid on a soft bottom gradient */}
            <div style={{
              position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 2,
              padding: "44px var(--space-5) var(--space-5)",
              background: "linear-gradient(0deg, rgba(58,12,20,0.55) 0%, rgba(58,12,20,0) 100%)",
              display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 7,
            }}>
              {storyGallery.map((s, idx) => (
                <button key={s.img} aria-label={`Show photo ${idx + 1}`} onClick={() => setI(idx)} style={{
                  width: idx === i ? 22 : 8, height: 8, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
                  background: idx === i ? "var(--lime-400)" : "rgba(255,255,255,0.45)", transition: "all .25s var(--ease-out, ease)",
                }} />
              ))}
            </div>
          </Arch>

          {/* arrows */}
          <button onClick={() => go(-1)} aria-label="Previous photo" style={{ ...arrowStyle, left: -10 }}>
            <Icon name="arrow-left" size={18} color="var(--wine-700)" />
          </button>
          <button onClick={() => go(1)} aria-label="Next photo" style={{ ...arrowStyle, right: -10 }}>
            <Icon name="arrow-right" size={18} color="var(--wine-700)" />
          </button>
        </div>
      </div>
    </section>
  );
}

const arrowStyle = {
  position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 3,
  width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer",
  background: "rgba(252,238,228,0.94)", boxShadow: "var(--shadow-md)",
  display: "flex", alignItems: "center", justifyContent: "center",
};
