import React from "react";
import { Photo, Arch } from "./parts.jsx";

/* Story — the dessert + desierto wordplay, on a wine canvas. */
export function Story() {
  return (
    <section id="story" style={{ background: "var(--wine-700)", color: "var(--cream-50)", overflow: "hidden" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "var(--space-8)", alignItems: "center" }}>
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
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <Arch style={{ width: 360, height: 460, boxShadow: "var(--shadow-lg)", border: "10px solid rgba(255,255,255,0.10)" }}>
            <Photo src="interior-froyo-arches.jpg" pos="center" label="Our café" height="100%" />
          </Arch>
        </div>
      </div>
    </section>
  );
}
