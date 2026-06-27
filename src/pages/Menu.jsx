import React from "react";
import { Link } from "react-router-dom";
import { Badge, Icon } from "../components/ds";
import { Photo } from "../site/parts.jsx";
import { SITE } from "../site/data.js";

const LOGO = "/assets/logos/deserto-logo-full.png";

/* ---------- Slim menu-page header ---------- */
function MenuHeader() {
  const { store } = SITE;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(252,238,228,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-default)" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "0 var(--space-6)", height: 70, display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <Link to="/" aria-label="Back to site" title="Back to site" className="menu-back" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          width: 34, height: 34, borderRadius: "50%", color: "var(--ink-400)",
        }}>
          <Icon name="arrow-left" size={18} color="currentColor" />
        </Link>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" style={{ height: 48, width: "auto", display: "block" }} />
        </Link>
        <div className="hide-sm" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, fontSize: "var(--text-sm)", color: "var(--ink-500)" }}>
          <Icon name="map-pin" size={15} color="var(--wine-500)" />
          <span>{store.addr} · {store.hours}</span>
        </div>
      </div>
    </header>
  );
}

/* ---------- Delivery / ordering partners bar ---------- */
function OrderBar() {
  const { delivery, store } = SITE;
  return (
    <div style={{
      background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)", padding: "var(--space-5) var(--space-6)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-xl)", color: "var(--wine-700)" }}>Order for delivery or pickup</div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--ink-500)", marginTop: 2 }}>Tap a partner to order, or call us — fresh froyo, tonics &amp; coffee, your way.</div>
        </div>
        <a href={`tel:${store.phone.replace(/[^0-9+]/g, "")}`} style={{
          display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "11px 20px",
          border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", whiteSpace: "nowrap",
        }}>
          <Icon name="phone" size={16} color="var(--wine-700)" />
          {store.phone}
        </a>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "var(--space-5)" }}>
        {delivery.map((d) => (
          <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer" style={{
            flex: "1 1 180px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
            borderRadius: "var(--radius-lg)", padding: "15px 18px", background: d.brand, color: d.fg,
            fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-md)", boxShadow: "var(--shadow-sm)",
            transition: "transform .15s ease",
          }} className="delivery-btn">
            {d.name}
            <Icon name="arrow-right" size={17} color={d.fg} />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------- One menu card (view-only, photo-forward) ---------- */
function ItemCard({ p, i = 0 }) {
  const tagTone = { Vegan: "olive", GF: "caramel", DF: "mauve", New: "orange" };
  return (
    <div className="menu-card stagger-item" style={{
      display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border-default)", boxShadow: "var(--shadow-sm)", overflow: "hidden", "--i": i,
    }}>
      {/* full-bleed square photo */}
      <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
        <Photo src={p.img} pos={p.pos || "center"} tint={p.tint || "var(--peach-100)"} label={p.name} height="100%" />
        {p.instore && (
          <span style={{ position: "absolute", top: 10, left: 10, fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--olive-700)", background: "var(--leaf-100)", borderRadius: 999, padding: "6px 11px", whiteSpace: "nowrap", boxShadow: "var(--shadow-sm)" }}>In store</span>
        )}
      </div>
      {/* name · badges · description */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "var(--space-4)" }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-md)", color: "var(--ink-900)", lineHeight: 1.1 }}>{p.name}</h3>
        {(p.tags || []).length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {p.tags.map((t) => (<Badge key={t} tone={tagTone[t] || "neutral"} variant="soft">{t}</Badge>))}
          </div>
        )}
        {p.desc && <p style={{ margin: "10px 0 0", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.45 }}>{p.desc}</p>}
      </div>
    </div>
  );
}

/* ---------- Menu page (view the menu, order via a partner) ---------- */
export default function Menu() {
  const { categories, products } = SITE;
  const [activeCat, setActiveCat] = React.useState(categories[0].slug);
  const sectionRefs = React.useRef({});

  const scrollToCat = React.useCallback((slug) => {
    const el = sectionRefs.current[slug];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 128, behavior: "smooth" });
  }, []);

  // Scroll-spy: highlight whichever category is currently in view
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveCat(e.target.dataset.slug); }),
      { rootMargin: "-130px 0px -65% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Reveal each category (and stagger its cards) as it scrolls into view
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Deep link (#coffee) jumps to that category section
  React.useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (slug && sectionRefs.current[slug]) {
      const raf = requestAnimationFrame(() => scrollToCat(slug));
      return () => cancelAnimationFrame(raf);
    }
  }, [scrollToCat]);

  return (
    <div style={{ background: "var(--peach-100)", minHeight: "100vh" }}>
      <MenuHeader />
      <main style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-7) var(--space-6) var(--space-9)" }}>
        <div style={{ marginBottom: "var(--space-5)" }}>
          <span className="eyebrow" style={{ color: "var(--wine-500)" }}>The menu</span>
          <h1 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>What we make</h1>
        </div>

        <OrderBar />

        {/* two-column layout: sticky category rail on the left, scrolling menu on the right */}
        <div className="menu-layout" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "var(--space-7)", marginTop: "var(--space-6)", alignItems: "start" }}>
          {/* sticky side tabs */}
          <nav className="menu-rail" style={{ position: "sticky", top: 90, display: "flex", flexDirection: "column", gap: 4 }}>
            {categories.map((c) => (
              <button key={c.slug} onClick={() => scrollToCat(c.slug)} aria-current={activeCat === c.slug} style={{
                cursor: "pointer", textAlign: "left", borderRadius: "var(--radius-md)", padding: "11px 16px",
                border: "none", background: activeCat === c.slug ? "var(--wine-700)" : "transparent",
                color: activeCat === c.slug ? "var(--cream-50)" : "var(--ink-700)",
                fontFamily: "var(--font-body)", fontWeight: activeCat === c.slug ? 800 : 700, fontSize: "var(--text-md)",
                transition: "all .16s var(--ease-out, ease)",
              }}>{c.name}</button>
            ))}
          </nav>

          {/* every category, stacked — the whole menu visible in one scroll */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", minWidth: 0 }}>
          {categories.map((c) => {
            const list = products.filter((p) => p.cat === c.slug);
            const groups = [...new Set(list.map((p) => p.group))];
            return (
              <section key={c.slug} data-slug={c.slug} className="reveal" ref={(el) => { sectionRefs.current[c.slug] = el; }} style={{ scrollMarginTop: 128 }}>
                <h2 style={{ fontSize: "var(--text-2xl)", margin: "0 0 var(--space-4)", color: "var(--wine-700)" }}>{c.name}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  {groups.map((g) => (
                    <div key={g}>
                      {groups.length > 1 && (
                        <div style={{ margin: "0 0 var(--space-3)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", color: "var(--ink-400)", textTransform: "uppercase", letterSpacing: ".05em" }}>{g}</div>
                      )}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "var(--space-5)" }}>
                        {list.filter((p) => p.group === g).map((p, idx) => (<ItemCard key={p.id} p={p} i={idx} />))}
                      </div>
                    </div>
                  ))}
                </div>
                {c.slug === "froyo" && (
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--ink-500)", margin: "12px 4px 0", fontFamily: "var(--font-editorial)" }}>
                    The full self-serve experience — swirl wall, toppings bar, made your way — happens in the shop. For delivery, grab a cone or a 32 oz take-home tub.
                  </p>
                )}
              </section>
            );
          })}
          </div>
        </div>

        {/* order again at the bottom of the menu */}
        <div style={{ marginTop: "var(--space-8)" }}>
          <OrderBar />
        </div>
      </main>
    </div>
  );
}
