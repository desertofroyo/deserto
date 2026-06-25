import React from "react";
import { Link } from "react-router-dom";
import { Badge, Icon } from "../components/ds";
import { Photo, Chip } from "../site/parts.jsx";
import { SITE } from "../site/data.js";

const LOGO = "/assets/logos/deserto-logo-full.png";

/* ---------- Slim menu-page header ---------- */
function MenuHeader() {
  const { store } = SITE;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(252,238,228,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-default)" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "0 var(--space-6)", height: 70, display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" style={{ height: 48, width: "auto", display: "block" }} />
        </Link>
        <Link to="/" className="nav-link" style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--ink-700)", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon name="arrow-left" size={15} color="var(--ink-700)" />
          Back to site
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, fontSize: "var(--text-sm)", color: "var(--ink-500)" }}>
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

/* ---------- One menu row (view-only) ---------- */
function ItemRow({ p }) {
  const tagTone = { Vegan: "olive", GF: "caramel", DF: "mauve", New: "orange" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px var(--space-5)", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0 }}>
        <Photo src={p.img} pos={p.pos || "center"} tint={p.tint || "var(--peach-100)"} label={p.name} height="100%" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-md)", color: "var(--ink-900)" }}>{p.name}</span>
          {(p.tags || []).map((t) => (<Badge key={t} tone={tagTone[t] || "neutral"} variant="soft">{t}</Badge>))}
        </div>
        {p.desc && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.desc}</div>}
      </div>
      <span style={{ fontFamily: "var(--font-body)", fontWeight: 900, color: "var(--wine-700)", whiteSpace: "nowrap" }}>
        {p.instore ? "By weight" : p.priceLg ? `$${p.price.toFixed(2)} / $${p.priceLg.toFixed(2)}` : `$${p.price.toFixed(2)}`}
      </span>
      {p.instore && (
        <span style={{ flexShrink: 0, fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--olive-700)", background: "var(--leaf-100)", borderRadius: 999, padding: "7px 12px", whiteSpace: "nowrap" }}>In store</span>
      )}
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
      <main style={{ maxWidth: "var(--container-lg, 980px)", margin: "0 auto", padding: "var(--space-7) var(--space-6) var(--space-9)" }}>
        <div style={{ marginBottom: "var(--space-5)" }}>
          <span className="eyebrow" style={{ color: "var(--wine-500)" }}>The menu</span>
          <h1 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>What we make</h1>
        </div>

        <OrderBar />

        {/* sticky jump-nav */}
        <nav style={{ position: "sticky", top: 70, zIndex: 40, background: "var(--peach-100)", margin: "var(--space-6) 0 var(--space-5)", padding: "10px 0", display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "1px solid var(--border-default)" }}>
          {categories.map((c) => (<Chip key={c.slug} on={activeCat === c.slug} onClick={() => scrollToCat(c.slug)}>{c.name}</Chip>))}
        </nav>

        {/* every category, stacked — the whole menu visible in one scroll */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
          {categories.map((c) => {
            const list = products.filter((p) => p.cat === c.slug);
            const groups = [...new Set(list.map((p) => p.group))];
            return (
              <section key={c.slug} data-slug={c.slug} ref={(el) => { sectionRefs.current[c.slug] = el; }} style={{ scrollMarginTop: 128 }}>
                <h2 style={{ fontSize: "var(--text-2xl)", margin: "0 0 var(--space-3)", color: "var(--wine-700)" }}>{c.name}</h2>
                <div style={{ background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden", paddingBottom: 6 }}>
                  {groups.map((g) => (
                    <div key={g}>
                      <div style={{ padding: "16px var(--space-5) 6px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", color: "var(--ink-400)", textTransform: "uppercase", letterSpacing: ".05em" }}>{g}</div>
                      {list.filter((p) => p.group === g).map((p) => (<ItemRow key={p.id} p={p} />))}
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

        {/* order again at the bottom of the menu */}
        <div style={{ marginTop: "var(--space-8)" }}>
          <OrderBar />
        </div>
      </main>
    </div>
  );
}
