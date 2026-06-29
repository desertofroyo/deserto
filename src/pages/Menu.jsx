import React from "react";
import { Badge, Icon } from "../components/ds";
import { Header } from "../site/Header.jsx";
import { Photo, Arch } from "../site/parts.jsx";
import { SITE } from "../site/data.js";
// Menu items are owner-editable via the CMS (content/menu.json → SITE.products).

/* Per-category icon used for headers and for the photoless item chips. */
const CAT_ICON = { froyo: "ice-cream-bowl", tonics: "cup-soda", coffee: "coffee", pastries: "cookie", extras: "gift" };

/* The two seasonal "experiences" get an editorial feature block instead of a
   card — they're concepts (rotating flavors, recipe kept in-house), not SKUs.
   Copy lives here so the owner's sheet only ever populates the café staples. */
const FEATURES = {
  froyo: {
    img: "macro-swirl.jpg",
    pos: "center 55%",
    kicker: "At the swirl wall",
    chips: ["Rotating flavors", "Full toppings bar", "Dairy & vegan bases", "Swirl it your way"],
    note: "Flavors rotate with the seasons — the full self-serve experience lives in the shop.",
    nutri: "Nutrition varies by flavor & toppings — ask in store for today's panels and allergens.",
  },
  tonics: {
    img: "cans-white-arches.jpg",
    pos: "center 50%",
    kicker: "In our signature cans",
    chips: ["Real fruit", "Lightly sparkling", "Seasonal lineup", "Ask for today's flavors"],
    note: "A refreshing rotation of fruit tonics — the recipe stays in-house.",
    nutri: "Vegan · gluten-free · lightly sparkling. Calories vary by seasonal flavor.",
  },
};

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
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-xl)", color: "var(--wine-700)" }}>Order through our partners</div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--ink-600, var(--ink-700))", marginTop: 2 }}>Delivery &amp; pickup are handled by DoorDash and Grubhub — tap a partner to order, or call us direct.</div>
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

/* ---------- Small concept chip (feature blocks) ---------- */
function Chip({ children, dark }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "7px 14px",
      fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)", whiteSpace: "nowrap",
      background: dark ? "rgba(251,241,232,0.12)" : "var(--white)",
      color: dark ? "var(--cream-50)" : "var(--wine-700)",
      border: dark ? "1px solid rgba(251,241,232,0.28)" : "1px solid var(--wine-200)",
    }}>{children}</span>
  );
}

/* ---------- Feature block — the froyo & tonics experiences ----------
   Photography-led, alternating sides; froyo on a warm cream panel with the
   signature arch, tonics on a bold wine color-block. */
function FeatureBlock({ cat, product, reverse }) {
  const f = FEATURES[cat];
  const dark = cat === "tonics";
  const Media = (
    <div className="mfeat-media">
      {cat === "froyo" ? (
        <Arch style={{ height: "100%", boxShadow: "var(--shadow-lg)" }}>
          <Photo src={f.img} pos={f.pos} label={product.name} height="100%" tint="var(--peach-200)" />
        </Arch>
      ) : (
        <div style={{ height: "100%", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
          <Photo src={f.img} pos={f.pos} label={product.name} height="100%" tint="var(--rose-300)" />
        </div>
      )}
    </div>
  );
  const ink = dark ? "var(--cream-50)" : "var(--wine-700)";
  const body = dark ? "rgba(251,241,232,0.86)" : "var(--ink-700)";
  return (
    <div className={"mfeat" + (reverse ? " mfeat-rev" : "")} style={{
      background: dark ? "var(--wine-700)" : "var(--white)",
      border: dark ? "none" : "1px solid var(--border-default)",
      borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-md)",
    }}>
      {!reverse && Media}
      <div className="mfeat-body">
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
          <Icon name={CAT_ICON[cat]} size={20} color={dark ? "var(--orange-400)" : "var(--orange-600)"} />
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".04em", textTransform: "uppercase", color: dark ? "var(--orange-300)" : "var(--orange-600)" }}>{f.kicker}</span>
        </div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-3xl)", lineHeight: 1.04, color: ink, textWrap: "balance" }}>{product.name}</h2>
        {product.desc && <p style={{ margin: "14px 0 0", fontSize: "var(--text-md)", lineHeight: 1.5, color: body, maxWidth: "44ch", fontFamily: "var(--font-editorial)" }}>{product.desc}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, margin: "20px 0 0" }}>
          {f.chips.map((c) => <Chip key={c} dark={dark}>{c}</Chip>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 22, paddingTop: 18, borderTop: dark ? "1px solid rgba(251,241,232,0.18)" : "1px solid var(--border-subtle)" }}>
          <Badge tone={cat === "froyo" ? "sage" : "rose"} variant={dark ? "solid" : "soft"}>Seasonal</Badge>
          <span style={{ fontSize: "var(--text-sm)", color: dark ? "rgba(251,241,232,0.7)" : "var(--ink-500)", fontFamily: "var(--font-editorial)" }}>{f.note}</span>
        </div>
        {f.nutri && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 12, fontSize: "var(--text-xs)", color: dark ? "rgba(251,241,232,0.62)" : "var(--ink-500)" }}>
            <Icon name="info" size={14} color={dark ? "rgba(251,241,232,0.62)" : "var(--ink-400)"} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{f.nutri}</span>
          </div>
        )}
      </div>
      {reverse && Media}
    </div>
  );
}

/* ---------- One café-list row (coffee / pastries / extras) ----------
   Photo when we have one; otherwise an honest tinted icon chip — never a
   blank colored square pretending to be a photo. */
function MenuRow({ p, cat, i }) {
  const tagTone = { Vegan: "olive", GF: "caramel", DF: "mauve", New: "orange", Seasonal: "rose" };
  const m = p.macros || {};
  // Compact nutrition line — cal · fat · protein (carbs stay in the data but
  // are dropped here to keep the row scannable).
  const nutriBits = [
    p.cal != null && `${p.cal} cal`,
    m.fat != null && `${m.fat}g fat`,
    m.protein != null && `${m.protein}g protein`,
  ].filter(Boolean);
  return (
    <div className="mrow stagger-item" style={{ "--i": i }}>
      <div className="mrow-thumb" style={{ background: p.img ? "var(--sand-100)" : (p.tint || "var(--peach-100)") }}>
        {p.img
          ? <Photo src={p.img} pos={p.pos || "center"} label={p.name} height="100%" tint="var(--sand-100)" />
          : <Icon name={CAT_ICON[cat]} size={22} color="var(--wine-700)" style={{ opacity: 0.5 }} />}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div className="mrow-name">{p.name}</div>
        {(p.tags || []).length > 0 && (
          <div className="mrow-tags">
            {p.tags.map((t) => <Badge key={t} tone={tagTone[t] || "neutral"} variant="soft">{t}</Badge>)}
          </div>
        )}
        {nutriBits.length > 0 && <div className="mrow-nutri">{nutriBits.join(" · ")}</div>}
        {(p.allergens || []).length > 0 && (
          <div className="mrow-allergens">Contains {p.allergens.join(", ")}</div>
        )}
      </div>
    </div>
  );
}

/* ---------- Café-list category (coffee, pastries, extras) ---------- */
function CafeCategory({ cat, list }) {
  const groups = [...new Set(list.map((p) => p.group))];
  return (
    <div className="mlist-panel">
      {groups.map((g) => (
        <div key={g} className="mlist-group">
          {g && <div className="mlist-grouplabel">{g}</div>}
          <div className="mlist-grid">
            {list.filter((p) => p.group === g).map((p, idx) => (
              <MenuRow key={p.id || `${p.name}-${idx}`} p={p} cat={cat} i={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Menu page (view the menu, order via a partner) ---------- */
export default function Menu() {
  const { categories } = SITE;
  const products = SITE.products;
  const [activeCat, setActiveCat] = React.useState(categories[0].slug);
  const sectionRefs = React.useRef({});

  const byCat = (slug) => products.filter((p) => p.cat === slug);

  const scrollToCat = React.useCallback((slug) => {
    const el = sectionRefs.current[slug];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 138, behavior: "smooth" });
  }, []);

  // Scroll-spy: highlight whichever category is currently in view
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveCat(e.target.dataset.slug); }),
      { rootMargin: "-148px 0px -62% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Reveal each section (and stagger any rows) as it scrolls into view
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" }
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

  const froyo = byCat("froyo")[0];
  const tonic = byCat("tonics")[0];
  const cafeCats = categories.filter((c) => !["froyo", "tonics"].includes(c.slug));

  return (
    <div style={{ background: "var(--peach-100)", minHeight: "100vh" }}>
      <Header />

      {/* page intro */}
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-7) var(--space-6) var(--space-5)" }}>
        <span style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: "var(--text-md)", color: "var(--wine-500)", letterSpacing: ".01em" }}>Mi gusto, mi estilo</span>
        <h1 style={{ fontSize: "var(--text-4xl)", margin: "6px 0 0", color: "var(--wine-700)", lineHeight: 1.02, textWrap: "balance" }}>What we make</h1>
        <p style={{ margin: "14px 0 0", maxWidth: "54ch", fontSize: "var(--text-md)", lineHeight: 1.55, color: "var(--ink-700)", fontFamily: "var(--font-editorial)" }}>
          Self-serve froyo and house tonics that rotate with the season — alongside an espresso bar, NYC-style cookies, and layered cake jars, made fresh in the shop.
        </p>
      </div>

      {/* sticky category nav */}
      <nav className="menu-cats" aria-label="Menu categories">
        <div className="menu-cats-inner">
          {categories.map((c) => (
            <button key={c.slug} onClick={() => scrollToCat(c.slug)} aria-current={activeCat === c.slug} className={"menu-cat-pill" + (activeCat === c.slug ? " on" : "")}>
              <Icon name={CAT_ICON[c.slug]} size={15} color="currentColor" />
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-6) var(--space-6) var(--space-9)" }}>
        <OrderBar />

        {/* ---- the two seasonal experiences, as feature blocks ---- */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginTop: "var(--space-7)" }}>
          {froyo && (
            <section data-slug="froyo" className="reveal" ref={(el) => { sectionRefs.current.froyo = el; }} style={{ scrollMarginTop: 150 }}>
              <FeatureBlock cat="froyo" product={froyo} />
            </section>
          )}
          {tonic && (
            <section data-slug="tonics" className="reveal" ref={(el) => { sectionRefs.current.tonics = el; }} style={{ scrollMarginTop: 150 }}>
              <FeatureBlock cat="tonics" product={tonic} reverse />
            </section>
          )}
        </div>

        {/* ---- the café staples, as a refined menu list ---- */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", marginTop: "var(--space-9)" }}>
          {cafeCats.map((c) => {
            const list = byCat(c.slug);
            if (!list.length) return null;
            return (
              <section key={c.slug} data-slug={c.slug} className="reveal" ref={(el) => { sectionRefs.current[c.slug] = el; }} style={{ scrollMarginTop: 150 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "var(--space-4)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "var(--wine-700)", flexShrink: 0 }}>
                    <Icon name={CAT_ICON[c.slug]} size={20} color="var(--cream-50)" />
                  </span>
                  <h2 style={{ fontSize: "var(--text-2xl)", margin: 0, color: "var(--wine-700)", lineHeight: 1 }}>{c.name}</h2>
                  <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
                </div>
                <CafeCategory cat={c.slug} list={list} />
              </section>
            );
          })}
        </div>

        {/* allergen disclaimer — guides only; the kitchen handles shared equipment */}
        <p style={{ marginTop: "var(--space-8)", textAlign: "center", fontSize: "var(--text-xs)", color: "var(--ink-500)", maxWidth: "62ch", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6, fontFamily: "var(--font-editorial)" }}>
          Nutrition and allergen details are a guide and may vary; items are made in a kitchen that also handles milk, eggs, wheat, soy, and tree nuts. If you have a food allergy, please tell us before you order.
        </p>
      </main>
    </div>
  );
}
