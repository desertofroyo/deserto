import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge, Icon } from "../components/ds";
import { Photo, Chip } from "../site/parts.jsx";
import { SITE } from "../site/data.js";
import { loadBag, saveBag } from "../lib/bag.js";

const LOGO = "/assets/logos/deserto-logo-full.png";

/* ---------- Slim order-page header ---------- */
function OrderHeader({ count }) {
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
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginLeft: 10, background: "var(--wine-700)", color: "var(--cream-50)", borderRadius: 999, padding: "7px 14px", fontWeight: 800, fontFamily: "var(--font-body)" }}>
            <Icon name="shopping-bag" size={15} color="var(--cream-50)" />
            {count}
          </span>
        </div>
      </div>
    </header>
  );
}

/* ---------- One orderable row ---------- */
function ItemRow({ p, onAdd }) {
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
      {p.instore ? (
        <span style={{ flexShrink: 0, fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--olive-700)", background: "var(--leaf-100)", borderRadius: 999, padding: "7px 12px", whiteSpace: "nowrap" }}>In store</span>
      ) : (
        <button aria-label={`Add ${p.name}`} onClick={() => onAdd(p)} className="order-add" style={{
          width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer", flexShrink: 0,
          background: "var(--orange-500)", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="plus" size={18} color="var(--wine-900)" />
        </button>
      )}
    </div>
  );
}

/* ---------- Bag panel ---------- */
function BagPanel({ bag, updateQty, notify }) {
  const { store } = SITE;
  const [mode, setMode] = React.useState("pickup");
  const count = bag.reduce((a, x) => a + x.qty, 0);
  const subtotal = bag.reduce((a, x) => a + x.qty * x.price, 0);
  return (
    <aside style={{
      background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)", padding: "var(--space-5)", position: "sticky", top: 90, alignSelf: "start",
      display: "flex", flexDirection: "column", gap: "var(--space-4)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-xl)", color: "var(--wine-700)" }}>Your bag</span>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", color: "var(--ink-400)" }}>{count} item{count === 1 ? "" : "s"}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 3, background: "var(--sand-100)", borderRadius: 999 }}>
        {[["pickup", "Pickup"], ["delivery", "Delivery"]].map(([id, label]) => (
          <button key={id} onClick={() => setMode(id)} style={{
            border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 0",
            fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)",
            background: mode === id ? "var(--wine-700)" : "transparent",
            color: mode === id ? "var(--cream-50)" : "var(--ink-700)", transition: "all .18s ease",
          }}>{label}</button>
        ))}
      </div>
      <div style={{ fontSize: "var(--text-sm)", color: "var(--ink-500)", lineHeight: 1.5 }}>
        {mode === "pickup"
          ? <span><strong style={{ color: "var(--ink-700)" }}>Pickup</strong> at {store.addr} · ready in 15–20 min</span>
          : <span><strong style={{ color: "var(--ink-700)" }}>Delivery</strong> via DoorDash & Grubhub · partner fees apply</span>}
      </div>

      {bag.length === 0 ? (
        <div style={{ textAlign: "center", padding: "var(--space-6) 0", color: "var(--ink-400)" }}>
          <Icon name="shopping-bag" size={28} color="var(--ink-300)" />
          <div style={{ fontFamily: "var(--font-editorial)", fontSize: "var(--text-sm)", marginTop: 8 }}>Your bag is empty — add something delicious.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {bag.map((x) => (
            <div key={x.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: "1px solid var(--border-subtle)" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", color: "var(--ink-900)" }}>{x.name}</div>
                {x.plus && <div style={{ fontSize: "var(--text-xs)", color: "var(--ink-400)" }}>base price — size at checkout</div>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <button aria-label="Less" onClick={() => updateQty(x.id, -1)} className="qty-btn">−</button>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", minWidth: 16, textAlign: "center" }}>{x.qty}</span>
                <button aria-label="More" onClick={() => updateQty(x.id, 1)} className="qty-btn">+</button>
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "var(--text-sm)", color: "var(--wine-700)", minWidth: 52, textAlign: "right" }}>${(x.qty * x.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ borderTop: "2px solid var(--wine-700)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-md)", color: "var(--ink-900)" }}>Subtotal</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-2xl)", color: "var(--wine-700)" }}>${subtotal.toFixed(2)}</span>
      </div>
      <button className="btn-wine" disabled={bag.length === 0} onClick={() => notify("Demo — this would hand off to Toast checkout")} style={{
        border: "none", cursor: bag.length ? "pointer" : "default", borderRadius: 999, padding: "15px 0", width: "100%",
        background: bag.length ? "var(--wine-700)" : "var(--sand-200)", color: bag.length ? "var(--cream-50)" : "var(--ink-400)",
        fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-md)",
      }}>
        {mode === "pickup" ? "Checkout · pickup" : "Checkout · delivery"}
      </button>
      <div style={{ fontSize: "var(--text-xs)", color: "var(--ink-400)", textAlign: "center" }}>Commission-free ordering via Toast. Taxes at checkout.</div>
    </aside>
  );
}

/* ---------- Order page ---------- */
export default function Order() {
  const { categories, products } = SITE;
  const [params] = useSearchParams();
  const tabParam = params.get("tab");
  const [bag, setBag] = React.useState(loadBag);
  const [toast, setToast] = React.useState(null);
  const [activeCat, setActiveCat] = React.useState(categories[0].slug);
  const tRef = React.useRef(null);
  const sectionRefs = React.useRef({});

  React.useEffect(() => { saveBag(bag); }, [bag]);

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

  // Deep link (?tab=coffee) jumps to that category section instead of filtering
  React.useEffect(() => {
    if (tabParam && sectionRefs.current[tabParam]) {
      const raf = requestAnimationFrame(() => scrollToCat(tabParam));
      return () => cancelAnimationFrame(raf);
    }
  }, [tabParam, scrollToCat]);

  const notify = (msg) => {
    setToast(msg);
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setToast(null), 2200);
  };
  const add = (p) => {
    setBag((b) => {
      const i = b.findIndex((x) => x.id === p.id);
      if (i >= 0) { const c = [...b]; c[i] = { ...c[i], qty: c[i].qty + 1 }; return c; }
      return [...b, { id: p.id, name: p.name, price: p.price, plus: !!p.plus, qty: 1 }];
    });
    notify(`${p.name} added to bag`);
  };
  const updateQty = (id, d) => setBag((b) => b.flatMap((x) => x.id === id ? (x.qty + d <= 0 ? [] : [{ ...x, qty: x.qty + d }]) : [x]));

  const count = bag.reduce((a, x) => a + x.qty, 0);

  return (
    <div style={{ background: "var(--peach-100)", minHeight: "100vh" }}>
      <OrderHeader count={count} />
      <main style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-7) var(--space-6) var(--space-9)" }}>
        <div style={{ marginBottom: "var(--space-5)" }}>
          <span className="eyebrow" style={{ color: "var(--wine-500)" }}>Order online · pickup & delivery</span>
          <h1 style={{ fontSize: "var(--text-4xl)", margin: "8px 0 0", color: "var(--wine-700)" }}>Your order, your way</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: "var(--space-6)", alignItems: "start" }}>
          <div>
            {/* sticky jump-nav — the full menu lives below; this only scrolls to a section */}
            <nav style={{ position: "sticky", top: 70, zIndex: 40, background: "var(--peach-100)", margin: "0 0 var(--space-5)", padding: "10px 0", display: "flex", gap: 8, flexWrap: "wrap", borderBottom: "1px solid var(--border-default)" }}>
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
                          {list.filter((p) => p.group === g).map((p) => (<ItemRow key={p.id} p={p} onAdd={add} />))}
                        </div>
                      ))}
                    </div>
                    {c.slug === "froyo" && (
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--ink-500)", margin: "12px 4px 0", fontFamily: "var(--font-editorial)" }}>
                        The full self-serve experience — swirl wall, toppings bar, made your way — happens in the shop. Online, grab a cone or a 32 oz take-home tub.
                      </p>
                    )}
                  </section>
                );
              })}
            </div>
          </div>

          <BagPanel bag={bag} updateQty={updateQty} notify={notify} />
        </div>
      </main>

      {/* toast */}
      <div aria-live="polite" style={{
        position: "fixed", left: "50%", bottom: toast ? 28 : -80, transform: "translateX(-50%)",
        transition: "bottom .3s var(--ease-out-expo, ease)", zIndex: 80,
        background: "var(--wine-700)", color: "var(--cream-50)", borderRadius: 999,
        padding: "13px 22px", display: "flex", alignItems: "center", gap: 10,
        boxShadow: "var(--shadow-lg)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)",
      }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--orange-500)", color: "var(--wine-900)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>✓</span>
        {toast || ""}
      </div>
    </div>
  );
}
