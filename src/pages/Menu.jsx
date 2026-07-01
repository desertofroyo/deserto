import React from "react";
import { Badge, Icon } from "../components/ds";
import { Header } from "../site/Header.jsx";
import { Photo } from "../site/parts.jsx";
import { SITE } from "../site/data.js";
// Menu items are owner-editable via the CMS (content/menu.json → SITE.products).
// We list what the café makes — no prices, no nutrition on the cards; the full
// nutrition + allergen guide lives in one panel at the very end of the page.

/* Per-category icon used for nav pills, section headers and photoless tiles. */
const CAT_ICON = { froyo: "ice-cream-bowl", tonics: "cup-soda", coffee: "coffee", pastries: "cookie", extras: "gift" };
const TAG_TONE = { Vegan: "olive", GF: "caramel", DF: "mauve", New: "orange", Seasonal: "rose" };

/* Hand-styled froyo hero asset (transparent cutout) — the CMS swaps menu copy,
   but this branded cup is a designed feature image, not a generic item photo. */
const FROYO_CUTOUT = "/assets/products/froyo-cutout-v2.png";

/* ============================================================
   Seasonal in-shop features — froyo & tonics aren't a card grid;
   they're experiences. Each is its own art-directed block.
   ============================================================ */

/* Self-serve froyo — a confident wine block with the branded cup floating off
   it; photography leads, the copy says "build your own" in three plain beats. */
function FroyoFeature({ item, refCb }) {
  return (
    <section className="froyo-feat reveal" data-slug="froyo" ref={refCb} style={{ scrollMarginTop: 132 }}>
      <div className="froyo-feat-text">
        <span className="froyo-feat-kicker">Self-serve · in the shop</span>
        <h2 className="froyo-feat-title">Froyo, your way</h2>
        <p className="froyo-feat-beats">Swirl it. Top it. Weigh it.</p>
        <p className="froyo-feat-desc">{item?.desc || "Build your own at the swirl wall — seasonal rotating flavors and a full toppings bar, made your way, in the shop."}</p>
        <div className="froyo-feat-meta">
          <Icon name="leaf" size={16} color="var(--leaf-200)" />
          Vegan &amp; GF flavors · rotates every season
        </div>
        <a className="froyo-feat-cta" href={SITE.store?.maps || "/#locations"} target={SITE.store?.maps ? "_blank" : undefined} rel="noopener noreferrer">
          Find the swirl wall
          <Icon name="arrow-right" size={17} color="var(--wine-700)" />
        </a>
      </div>
      <div className="froyo-feat-photo">
        <img src={FROYO_CUTOUT} alt="A Deserto cup of self-serve frozen yogurt, swirled with caramel and piled with fresh strawberries and blueberries" />
      </div>
    </section>
  );
}

/* House tonics — a lighter, mirrored panel on rose-tinted sand; the seasonal
   sibling to froyo without competing with the wine block above it. */
function TonicsFeature({ item, refCb }) {
  return (
    <section className="tonics-feat reveal" data-slug="tonics" ref={refCb} style={{ scrollMarginTop: 132 }}>
      <div className="tonics-feat-photo">
        <Photo src={item?.img || "/assets/products/tonic-raspberry.jpg"} pos="center" label="House fruit tonic in a Deserto can" height="100%" tint="var(--rose-200)" />
      </div>
      <div className="tonics-feat-text">
        <h2 className="tonics-feat-title">House tonics</h2>
        <p className="tonics-feat-desc">{item?.desc || "Sparkling fruit tonics in our signature cans — refreshing seasonal flavors that rotate through the year. Ask about today's lineup."}</p>
        <div className="tonics-feat-tags">
          {(item?.tags || ["Seasonal", "Vegan", "GF"]).map((t) => (
            <Badge key={t} tone={TAG_TONE[t] || "neutral"} variant="soft">{t}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Café menu — coffee / pastries / extras as clean cards.
   Photo where the food sells on looks; a confident warm café
   coin where it doesn't (every espresso photographs alike).
   ============================================================ */
function MenuCard({ p, cat, i }) {
  const showPhoto = p.img && cat !== "coffee";
  const iced = /iced/i.test(p.group || "");
  const tileIcon = cat === "coffee" && iced ? "cup-soda" : CAT_ICON[cat];
  // Confident café tones, not pale tints: hot coffee = deep coffee brown, iced =
  // caramel, anything else photoless = a softer caramel. Cream mark on top.
  const coinBg = cat === "coffee" ? (iced ? "var(--caramel-500)" : "var(--coffee-600)") : "var(--caramel-400)";
  return (
    <div className="mcard stagger-item" style={{ "--i": i }}>
      <div className="mcard-body">
        <h4 className="mcard-name">{p.name}</h4>
        {(p.tags || []).length > 0 && (
          <div className="mcard-tags">
            {p.tags.map((t) => <Badge key={t} tone={TAG_TONE[t] || "neutral"} variant="soft">{t}</Badge>)}
          </div>
        )}
      </div>
      {showPhoto ? (
        <div className="mthumb" style={{ "--tint": p.tint || "var(--sand-100)" }}>
          <Photo src={p.img} pos={p.pos || "center"} label={p.name} height="100%" tint={p.tint || "var(--sand-100)"} />
        </div>
      ) : (
        <div className="mthumb mthumb-coin" style={{ background: coinBg }}>
          <Icon name={tileIcon} size={30} color="var(--cream-50)" />
        </div>
      )}
    </div>
  );
}

/* Each group (Hot / Iced, Cookies / Scones / Cake jars) gets a label + grid. */
function CafeCategory({ cat, list }) {
  const groups = [...new Set(list.map((p) => p.group))];
  return (
    <div className="mcat-groups">
      {groups.map((g) => (
        <div key={g} className="mcat-group">
          {g && <div className="mcat-grouplabel">{g}</div>}
          <div className="mgrid">
            {list.filter((p) => p.group === g).map((p, idx) => (
              <MenuCard key={p.id || `${p.name}-${idx}`} p={p} cat={cat} i={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Nutrition & allergens — one panel at the very end. Off the
   cards, but honest and complete for anyone who needs it.
   ============================================================ */
function NutritionPanel({ products, categories }) {
  const rows = products.filter((p) => p.cal != null || (p.allergens || []).length);
  return (
    <section className="nutri" id="nutrition" style={{ scrollMarginTop: 132 }}>
      <details className="nutri-panel">
        <summary className="nutri-summary">
          <span className="nutri-summary-text">
            <span className="nutri-summary-title">Nutrition &amp; allergens</span>
            <span className="nutri-summary-sub">Calories and "contains" details for every café item</span>
          </span>
          <Icon name="chevron-right" size={20} color="var(--wine-700)" />
        </summary>
        <div className="nutri-body">
          {categories.map((c) => {
            const list = rows.filter((p) => p.cat === c.slug);
            if (!list.length) return null;
            return (
              <div key={c.slug} className="nutri-group">
                <h3 className="nutri-group-title">{c.name}</h3>
                <table className="nutri-table">
                  <thead>
                    <tr><th scope="col">Item</th><th scope="col">Diet</th><th scope="col">Cal</th><th scope="col">Contains</th></tr>
                  </thead>
                  <tbody>
                    {list.map((p) => (
                      <tr key={p.id || p.name}>
                        <th scope="row">{p.name}</th>
                        <td>{(p.tags || []).filter((t) => t === "Vegan" || t === "GF" || t === "DF").join(", ") || "—"}</td>
                        <td>{p.cal != null ? p.cal : "—"}</td>
                        <td>{(p.allergens || []).length ? p.allergens.join(", ") : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
          <p className="nutri-note">
            Nutrition and allergen details are a guide and may vary; items are made in a kitchen that also handles milk, eggs, wheat, soy, and tree nuts. If you have a food allergy, please tell us before you order.
          </p>
        </div>
      </details>
    </section>
  );
}

/* ---------- Menu page ---------- */
export default function Menu() {
  const products = SITE.products;
  const allCats = SITE.categories;                                   // froyo, tonics, coffee, pastries, extras
  const cafeCats = allCats.filter((c) => !["froyo", "tonics"].includes(c.slug));
  const froyoItem = products.find((p) => p.cat === "froyo");
  const tonicsItem = products.find((p) => p.cat === "tonics");
  const [activeCat, setActiveCat] = React.useState(allCats[0].slug);
  const sectionRefs = React.useRef({});

  const byCat = (slug) => products.filter((p) => p.cat === slug);
  const setRef = (slug) => (el) => { sectionRefs.current[slug] = el; };

  const scrollToCat = React.useCallback((slug) => {
    const el = sectionRefs.current[slug];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 132, behavior: "smooth" });
  }, []);

  // Scroll-spy: highlight whichever section is currently in view
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveCat(e.target.dataset.slug); }),
      { rootMargin: "-142px 0px -62% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && el.dataset.slug && obs.observe(el));
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

  // Deep link (#coffee) jumps to that section
  React.useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (slug && sectionRefs.current[slug]) {
      const raf = requestAnimationFrame(() => scrollToCat(slug));
      return () => cancelAnimationFrame(raf);
    }
  }, [scrollToCat]);

  return (
    <div style={{ background: "var(--cream-50)", minHeight: "100vh" }}>
      <Header />

      {/* page intro */}
      <div className="menu-intro">
        <span className="menu-intro-kicker">Mi gusto, mi estilo</span>
        <h1 className="menu-intro-title">What we make</h1>
        <p className="menu-intro-lede">
          Self-serve froyo and house tonics that rotate with the season — alongside an espresso bar, NYC-style cookies, and layered cake jars, made fresh in the shop.
        </p>
      </div>

      {/* sticky category nav */}
      <nav className="menu-cats" aria-label="Menu categories">
        <div className="menu-cats-inner">
          {allCats.map((c) => (
            <button key={c.slug} onClick={() => scrollToCat(c.slug)} aria-current={activeCat === c.slug} className={"menu-cat-pill" + (activeCat === c.slug ? " on" : "")}>
              <Icon name={CAT_ICON[c.slug]} size={15} color="currentColor" />
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="menu-main">
        {/* seasonal in-shop features */}
        <FroyoFeature item={froyoItem} refCb={setRef("froyo")} />
        <TonicsFeature item={tonicsItem} refCb={setRef("tonics")} />

        {/* café menu */}
        <div className="menu-cafe">
          {cafeCats.map((c) => {
            const list = byCat(c.slug);
            if (!list.length) return null;
            return (
              <section key={c.slug} data-slug={c.slug} className="reveal mcat" ref={setRef(c.slug)} style={{ scrollMarginTop: 132 }}>
                <div className="mcat-head">
                  <span className="mcat-head-icon"><Icon name={CAT_ICON[c.slug]} size={19} color="var(--cream-50)" /></span>
                  <h2 className="mcat-head-title">{c.name}</h2>
                  <span className="mcat-head-rule" />
                </div>
                <CafeCategory cat={c.slug} list={list} />
              </section>
            );
          })}
        </div>

        <NutritionPanel products={products} categories={cafeCats} />
      </main>
    </div>
  );
}
