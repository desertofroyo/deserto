import React from "react";
import { Link } from "react-router-dom";
import { IMG, useReveal } from "./parts.jsx";
import { SITE } from "./data.js";

/* Resolve a highlight image: absolute/remote paths pass through, bare filenames
   come from the editorial image folder. */
const srcOf = (s) => (s[0] === "/" || /^https?:\/\//.test(s) ? s : IMG + s);

/* "What we make" — a clean, airy product showcase: each category is a cutout
   product shot floating on the calm sand section, with its name and a single
   "View menu" link beneath. No frames, no color blocks — the photography and
   generous whitespace do the work. Cake jars live within the pastries card. */
export function MenuSection({ sectionRef }) {
  const { highlights } = SITE;
  const reveal = useReveal();
  return (
    <section id="menu" ref={sectionRef} style={{ background: "var(--surface-sunken)" }}>
      <div ref={reveal} style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "var(--wine-500)" }}>The menu</span>
          <h2 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>What we make</h2>
        </div>

        <div className="showcase">
          {highlights.map((h, i) => (
            <Link key={h.slug} to={h.to} className="showcase-item stagger-item" style={{ "--i": i }}>
              <div className="showcase-photo">
                <img src={srcOf(h.img)} alt={h.name} loading="lazy" />
              </div>
              <h3 className="showcase-name">{h.name}</h3>
              <span className="showcase-link">View menu</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
