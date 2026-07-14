import React from "react";
import { Icon } from "../components/ds";
import { Header } from "../site/Header.jsx";
import { Footer } from "../site/Footer.jsx";
import { SITE } from "../site/data.js";
// Menu items are owner-editable via the CMS (content/menu.json → SITE.products).
// The menu reads like the Dutch Bros menu: a vertical category rail on the
// side and lightly-boxed cards — a transparent product cutout, its name and a
// short line of copy. Clicking a card opens a simple detail modal. Nutrition &
// allergens is not on the page — it's a link to a PDF
// (SITE.store.nutritionUrl), surfaced in the footer and each modal.

/* Per-category icon used for nav tabs, section headers and photoless cards. */
const CAT_ICON = { froyo: "ice-cream-bowl", swirl: "ice-cream-bowl", tonics: "cup-soda", coffee: "coffee", pastries: "cookie" };

/* The in-shop self-serve froyo is a callout, not a tab. The card-bearing
   categories below each get a side tab, in this order: take-home swirl pints,
   tonics, coffee, then pastries. */
const CARD_CATS = ["swirl", "tonics", "coffee", "pastries"];

/* Resolve an item image: absolute/remote paths pass through; bare filenames come
   from the editorial image folder (kept for any legacy CMS entries). */
const IMG_DIR = "/assets/images/";
const srcOf = (s) => (!s ? null : s[0] === "/" || /^https?:\/\//.test(s) ? s : IMG_DIR + s);

/* Shared art: the transparent cutout, or a category-icon coin when no cutout
   exists yet. `size` scales the coin/icon for the card vs. the expanded view. */
function ProductArt({ p, cat, broken, onError, coin = 108, icon = 34 }) {
  const img = srcOf(p.img);
  if (img && !broken) return <img src={img} alt={p.name} loading="lazy" onError={onError} />;
  return (
    <span className="mcard-coin" style={{ background: "var(--caramel-400)", width: coin, height: coin }}>
      <Icon name={CAT_ICON[cat]} size={icon} color="var(--cream-50)" />
    </span>
  );
}

/* ============================================================
   Menu card — Dutch-Bros style. A transparent product cutout that
   overhangs the top of a lightly-boxed card, its name and a short
   description. The whole card is a button: click it for the details.
   ============================================================ */
function MenuCard({ p, cat, catName, i, onSelect }) {
  // Missing/misnamed cutouts degrade to the category coin rather than a blank box.
  const [broken, setBroken] = React.useState(false);
  const open = () => onSelect({ p, cat, catName });
  return (
    <div
      className="mcard stagger-item"
      style={{ "--i": i }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={open}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } }}
    >
      <div className="mcard-art">
        <ProductArt p={p} cat={cat} broken={broken} onError={() => setBroken(true)} />
      </div>
      <h4 className="mcard-name">{p.name}</h4>
      {p.desc && <p className="mcard-desc">{p.desc}</p>}
    </div>
  );
}

/* Each group (Hot / Iced, Cookies / Scones / Cake jars) gets a label + grid. */
function CafeCategory({ cat, catName, list, onSelect }) {
  const groups = [...new Set(list.map((p) => p.group))];
  return (
    <div className="mcat-groups">
      {groups.map((g) => (
        <div key={g} className="mcat-group">
          {g && <div className="mcat-grouplabel">{g}</div>}
          <div className="mgrid">
            {list.filter((p) => p.group === g).map((p, idx) => (
              <MenuCard key={p.id || `${p.name}-${idx}`} p={p} cat={cat} catName={catName} i={idx} onSelect={onSelect} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Product detail — a simple expanded card (not a new page). Opens
   on card click: the cutout, the name, a subtitle, the full line of
   copy, any diet tags, and a link out to the nutrition & allergens
   guide (a PDF).
   ============================================================ */
function ProductModal({ sel, onClose }) {
  const { p, cat, catName } = sel;
  const [broken, setBroken] = React.useState(false);
  const dietTags = (p.tags || []).filter((t) => t === "Vegan" || t === "GF" || t === "DF");

  // Close on Escape; lock body scroll while open.
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="pmodal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name}>
      <div className="pmodal" onClick={(e) => e.stopPropagation()}>
        <button className="pmodal-close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={20} color="var(--ink-700)" />
        </button>
        <div className="pmodal-art">
          <ProductArt p={p} cat={cat} broken={broken} onError={() => setBroken(true)} coin={150} icon={50} />
        </div>
        <div className="pmodal-body">
          <span className="pmodal-sub">{p.group || catName}</span>
          <h3 className="pmodal-title">{p.name}</h3>
          {p.desc && <p className="pmodal-desc">{p.desc}</p>}
          {dietTags.length > 0 && (
            <div className="pmodal-tags">
              {dietTags.map((t) => <span key={t} className="pmodal-tag">{t}</span>)}
            </div>
          )}
          {SITE.store?.nutritionUrl && (
            <a className="pmodal-nutri" href={SITE.store.nutritionUrl} target="_blank" rel="noopener noreferrer">
              Nutrition &amp; allergens (PDF)
              <Icon name="arrow-right" size={15} color="currentColor" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Menu page ---------- */
export default function Menu() {
  const products = SITE.products;
  const allCats = SITE.categories;                                   // froyo, tonics, coffee, pastries, extras
  // Card-bearing categories, in the site's declared order — these are the tabs.
  const cardCats = allCats.filter((c) => CARD_CATS.includes(c.slug) && products.some((p) => p.cat === c.slug));
  const [activeCat, setActiveCat] = React.useState(cardCats[0]?.slug);
  const [selected, setSelected] = React.useState(null);
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

  // Deep link: #coffee/#pastries jump to that section.
  React.useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (slug && sectionRefs.current[slug]) {
      const raf = requestAnimationFrame(() => scrollToCat(slug));
      return () => cancelAnimationFrame(raf);
    }
  }, [scrollToCat]);

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <Header />

      {/* page intro */}
      <div className="menu-intro">
        <h1 className="menu-intro-title">Menu</h1>
      </div>

      {/* two-column layout: sticky side rail + stacked category card grids */}
      <main className="menu-layout">
        <aside className="menu-rail" aria-label="Menu categories">
          <div className="menu-rail-inner">
            {cardCats.map((c) => (
              <button
                key={c.slug}
                onClick={() => scrollToCat(c.slug)}
                aria-current={activeCat === c.slug}
                className={"menu-tab" + (activeCat === c.slug ? " on" : "")}
              >
                <Icon name={CAT_ICON[c.slug]} size={16} color="currentColor" />
                {c.name}
              </button>
            ))}
          </div>
        </aside>

        <div className="menu-cafe">
          {cardCats.map((c) => {
            const list = byCat(c.slug);
            if (!list.length) return null;
            return (
              <section key={c.slug} data-slug={c.slug} className="reveal mcat" ref={setRef(c.slug)} style={{ scrollMarginTop: 132 }}>
                <div className="mcat-head">
                  <span className="mcat-head-icon"><Icon name={CAT_ICON[c.slug]} size={19} color="var(--cream-50)" /></span>
                  <h2 className="mcat-head-title">{c.name}</h2>
                  <span className="mcat-head-rule" />
                </div>
                <CafeCategory cat={c.slug} catName={c.name} list={list} onSelect={setSelected} />
              </section>
            );
          })}
        </div>
      </main>

      {selected && (
        <ProductModal sel={selected} onClose={() => setSelected(null)} />
      )}

      <Footer />
    </div>
  );
}
