import React from "react";
import { Button, Avatar, Badge, Tag, Icon } from "../components/ds";
import { Photo, StatusBar, ISO, ISO_W } from "./shell.jsx";
import { APP } from "./data.js";

const money = (n) => "$" + n.toFixed(2);

/* ---------- Welcome / Login ---------- */
export function Welcome({ onContinue }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--wine-700)", color: "var(--cream-50)" }}>
      <StatusBar dark />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 32px", textAlign: "center", position: "relative" }}>
        <img src={ISO} alt="" style={{ position: "absolute", top: -10, right: -40, height: 320, opacity: 0.08 }} />
        <img src={ISO_W} alt="Deserto" style={{ height: 96 }} />
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, letterSpacing: ".04em", marginTop: 18 }}>DESERTO</div>
        <p style={{ fontFamily: "var(--font-editorial)", fontSize: 17, color: "var(--lime-400)", marginTop: 4 }}>Mi gusto, mi estilo.</p>
      </div>
      <div style={{ padding: "0 24px 40px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "var(--radius-pill)", display: "flex", alignItems: "center", gap: 10, padding: "13px 18px" }}>
          <Icon name="phone" size={18} color="var(--wine-200)" />
          <input placeholder="Phone number" style={{ flex: 1, border: "none", background: "transparent", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontSize: 16, outline: "none" }} />
        </div>
        <Button variant="accent" size="lg" fullWidth onClick={onContinue}>Continue</Button>
        <button onClick={onContinue} style={{ border: "none", background: "transparent", color: "var(--wine-200)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 8 }}>Continue as guest</button>
      </div>
    </div>
  );
}

/* ---------- Home ---------- */
export function Home({ onBuild, onOpenProduct }) {
  const { user, categories, featured } = APP;
  const [cat, setCat] = React.useState(categories[0].key);
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <StatusBar />
      <div style={{ padding: "4px 22px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Hola,</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--ink-900)" }}>{user.name}</div>
          </div>
          <Avatar name={user.name} tone="rose" size={46} />
        </div>

        {/* search */}
        <div style={{ marginTop: 16, background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-pill)", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px" }}>
          <Icon name="search" size={18} color="var(--text-muted)" />
          <span style={{ color: "var(--text-faint)", fontSize: 15 }}>Search froyo, coffee…</span>
        </div>

        {/* loyalty */}
        <div style={{ marginTop: 16, background: "var(--wine-700)", borderRadius: "var(--radius-xl)", padding: 18, color: "var(--cream-50)", position: "relative", overflow: "hidden" }}>
          <img src={ISO} alt="" style={{ position: "absolute", right: -20, bottom: -30, height: 150, opacity: 0.12 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: "var(--lime-400)", letterSpacing: ".02em" }}>Deserto Rewards</span>
            <Badge tone="orange" variant="solid">{user.points} pts</Badge>
          </div>
          <div style={{ marginTop: 12, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19 }}>{user.nextReward - user.points} pts to a free froyo</div>
          <div style={{ marginTop: 10, height: 8, background: "rgba(255,255,255,0.18)", borderRadius: 99 }}>
            <div style={{ width: (user.points / user.nextReward * 100) + "%", height: "100%", background: "var(--lime-500)", borderRadius: 99 }} />
          </div>
        </div>

        {/* categories */}
        <div style={{ display: "flex", gap: 8, marginTop: 18, overflowX: "auto", paddingBottom: 4 }}>
          {categories.map((c) => {
            const on = cat === c.key;
            const t = c.tone;
            return (
              <button key={c.key} onClick={() => setCat(c.key)} style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", border: "none", background: "transparent" }}>
                <span style={{ width: 58, height: 58, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: t.solid, transform: on ? "scale(1.05)" : "none", boxShadow: on ? "0 0 0 3px var(--surface-page), 0 0 0 5px " + t.solid : "var(--shadow-xs)", opacity: on ? 1 : 0.9, transition: "all var(--dur-fast)" }}>
                  <Icon name={c.icon} size={26} color={t.onSolid} strokeWidth={1.9} />
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: on ? t.ink : "var(--text-muted)" }}>{c.key}</span>
              </button>
            );
          })}
        </div>

        {/* featured */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 22 }}>
          <h3 style={{ margin: 0, fontSize: 20 }}>Popular {cat.toLowerCase()}</h3>
          <span style={{ color: "var(--brand-accent-strong)", fontWeight: 700, fontSize: 13 }}>See all</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          {featured.map((p) => (
            <div key={p.id} onClick={() => onOpenProduct(p)} style={{ display: "flex", gap: 14, background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: 12, cursor: "pointer", boxShadow: "var(--shadow-xs)" }}>
              <div style={{ width: 84, height: 84, borderRadius: "var(--radius-md)", overflow: "hidden", flex: "none" }}><Photo src={p.img} pos={p.pos || "center"} /></div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                  <Badge tone={p.tag === "Vegan" ? "olive" : p.tag === "Popular" ? "orange" : "wine"}>{p.tag}</Badge>
                  <Badge tone="neutral">{p.cal} cal</Badge>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-900)" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontWeight: 900, color: "var(--wine-700)" }}>{money(p.price)}</span>
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--rose-500)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="plus" size={18} color="var(--wine-900)" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* build CTA */}
        <div onClick={onBuild} style={{ marginTop: 18, background: "var(--olive-600)", borderRadius: "var(--radius-xl)", padding: 18, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
          <span style={{ width: 48, height: 48, borderRadius: 14, background: "var(--lime-500)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name="wand-sparkles" size={24} color="var(--olive-800)" /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--cream-50)" }}>Build your own froyo</div>
            <div style={{ fontSize: 13, color: "var(--leaf-200)" }}>Pick a base, pile on toppings.</div>
          </div>
          <Icon name="arrow-right" size={22} color="var(--lime-400)" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Build your bowl ---------- */
function Section({ title, accent = "var(--wine-700)", children }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <span style={{ width: 5, height: 18, borderRadius: 99, background: accent, flex: "none" }} />
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 15, color: "var(--ink-900)" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export function Build({ product, onBack, onAdd }) {
  const { bases, toppings, sizes } = APP;
  const [base, setBase] = React.useState(product ? null : bases[0].key);
  const [tops, setTops] = React.useState([]);
  const [size, setSize] = React.useState("Regular");
  const basePrice = product ? product.price : 6.5;
  const sizeAdd = sizes.find((s) => s.key === size).add;
  const total = basePrice + sizeAdd + tops.length * 0.75;
  const toggleTop = (t) => setTops((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ position: "relative", height: 230 }}>
          <Photo src={product ? product.img : "macro-swirl.jpg"} pos={product ? (product.pos || "center") : "center"} iso={0.2} />
          <button onClick={onBack} style={{ position: "absolute", top: 50, left: 18, width: 38, height: 38, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "var(--shadow-sm)" }}><Icon name="arrow-left" size={20} color="var(--ink-900)" /></button>
        </div>
        <div style={{ padding: "20px 22px 12px" }}>
          <h2 style={{ margin: 0, fontSize: 26 }}>{product ? product.name : "Build your froyo"}</h2>
          <p style={{ color: "var(--text-muted)", marginTop: 6, fontSize: 14 }}>Fresh frozen yogurt, made exactly how you like it.</p>

          <Section title="Choose your base" accent="var(--wine-700)">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {bases.map((b) => (<Tag key={b.key} selected={base === b.key} dotColor={b.tint} onClick={() => setBase(b.key)}>{b.key}</Tag>))}
            </div>
          </Section>

          <Section title={"Toppings · " + (tops.length ? tops.length + " added" : "$0.75 each")} accent="var(--orange-500)">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {toppings.map((t) => (<Tag key={t} selected={tops.includes(t)} onClick={() => toggleTop(t)}>{t}</Tag>))}
            </div>
          </Section>

          <Section title="Size" accent="var(--olive-600)">
            <div style={{ display: "flex", gap: 8 }}>
              {sizes.map((s) => (<Tag key={s.key} selected={size === s.key} onClick={() => setSize(s.key)}>{s.key}{s.add ? " +" + money(s.add) : ""}</Tag>))}
            </div>
          </Section>
        </div>
      </div>
      <div style={{ flex: "none", padding: "14px 22px 22px", borderTop: "1px solid var(--border-default)", background: "var(--white)", display: "flex", gap: 14, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Total</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--wine-700)" }}>{money(total)}</div>
        </div>
        <Button variant="accent" size="lg" style={{ flex: 1 }} onClick={() => onAdd({ name: product ? product.name : (base ? base + " froyo" : "Custom froyo"), price: total, img: product ? product.img : "macro-swirl.jpg", pos: product ? product.pos : "center" })}>Add to bag</Button>
      </div>
    </div>
  );
}

/* ---------- Bag ---------- */
function Row({ l, r, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: bold ? 17 : 14, fontWeight: bold ? 800 : 500, color: bold ? "var(--ink-900)" : "var(--text-body)", fontFamily: bold ? "var(--font-display)" : "var(--font-body)" }}>
      <span>{l}</span><span style={{ color: bold ? "var(--wine-700)" : "inherit" }}>{r}</span>
    </div>
  );
}

export function Bag({ items, onRemove, onCheckout, onBrowse }) {
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ padding: "4px 22px 8px" }}>
        <h2 style={{ margin: 0, fontSize: 26 }}>Your bag</h2>
      </div>
      {items.length === 0 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", padding: 30, textAlign: "center" }}>
          <span style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--sand-100)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><Icon name="shopping-bag" size={32} color="var(--ink-400)" /></span>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink-700)" }}>Nothing here yet</div>
          <p style={{ fontSize: 14 }}>Let's build something good.</p>
          <Button variant="primary" onClick={onBrowse}>Browse the menu</Button>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 22px" }}>
            {items.map((it, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <div style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", overflow: "hidden", flex: "none" }}><Photo src={it.img || "froyo-cup-mauve.jpg"} pos={it.pos || "center 35%"} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink-900)" }}>{it.name}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Regular</div>
                </div>
                <div style={{ fontWeight: 800, color: "var(--wine-700)" }}>{money(it.price)}</div>
                <button onClick={() => onRemove(idx)} aria-label="Remove" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--text-faint)" }}><Icon name="trash-2" size={18} color="var(--text-faint)" /></button>
              </div>
            ))}
            <div style={{ marginTop: 16, background: "var(--leaf-200)", borderRadius: "var(--radius-lg)", padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="clock" size={20} color="var(--olive-700)" />
              <div style={{ flex: 1, fontSize: 14, color: "var(--olive-700)", fontWeight: 600 }}>Pickup · River Rd</div>
              <span style={{ fontWeight: 800, color: "var(--olive-700)", fontSize: 14 }}>Ready ~4:25pm</span>
            </div>
          </div>
          <div style={{ flex: "none", padding: "16px 22px 22px", borderTop: "1px solid var(--border-default)", background: "var(--white)" }}>
            <Row l="Subtotal" r={money(subtotal)} />
            <Row l="Tax" r={money(tax)} />
            <Row l="Total" r={money(total)} bold />
            <Button variant="accent" size="lg" fullWidth style={{ marginTop: 12 }} onClick={onCheckout}>Place order · {money(total)}</Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ---------- Rewards ---------- */
export function Rewards() {
  const { user } = APP;
  const pct = Math.round(user.points / user.nextReward * 100);
  const perks = [["Free froyo", "300 pts", "gift"], ["Birthday treat", "Member perk", "cake"], ["Double-point Tuesdays", "Every week", "star"], ["Early seasonal access", "Member perk", "sparkles"]];
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <StatusBar />
      <div style={{ padding: "4px 22px 22px" }}>
        <h2 style={{ margin: 0, fontSize: 26 }}>Rewards</h2>
        <div style={{ marginTop: 14, background: "var(--wine-700)", borderRadius: "var(--radius-xl)", padding: 22, color: "var(--cream-50)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <img src={ISO} alt="" style={{ position: "absolute", left: -30, top: -30, height: 150, opacity: 0.1 }} />
          <div style={{ fontSize: 13, color: "var(--lime-400)", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>Your points</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 64, lineHeight: 1, margin: "6px 0" }}>{user.points}</div>
          <div style={{ height: 10, background: "rgba(255,255,255,0.18)", borderRadius: 99, margin: "14px 0 8px" }}>
            <div style={{ width: pct + "%", height: "100%", background: "var(--lime-500)", borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 14, color: "var(--leaf-200)" }}>{user.nextReward - user.points} points until your next free froyo</div>
        </div>
        <h3 style={{ margin: "22px 0 12px", fontSize: 19 }}>Perks &amp; rewards</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {perks.map(([t, s, ic], i) => {
            const pal = [["var(--olive-100)", "var(--olive-700)"], ["var(--orange-100)", "var(--orange-700)"], ["var(--rose-100)", "var(--rose-600)"], ["var(--caramel-100)", "var(--caramel-600)"]][i % 4];
            return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: 14 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: pal[0], display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Icon name={ic} size={22} color={pal[1]} /></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink-900)" }}>{t}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{s}</div>
              </div>
              <Icon name="chevron-right" size={20} color="var(--text-faint)" />
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Order confirmation ---------- */
export function Confirm({ onDone }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--wine-700)", color: "var(--cream-50)" }}>
      <StatusBar dark />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 34px", textAlign: "center" }}>
        <span style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--orange-500)", display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .4s var(--ease-out-expo)" }}><Icon name="check" size={52} color="var(--wine-900)" strokeWidth={3} /></span>
        <h2 style={{ color: "var(--cream-50)", fontSize: 30, margin: "24px 0 8px" }}>Order placed!</h2>
        <p style={{ fontFamily: "var(--font-editorial)", color: "var(--wine-200)", fontSize: 16 }}>We're on it. Your order will be ready for pickup at <strong style={{ color: "var(--cream-50)" }}>River Rd ~4:25pm</strong>.</p>
        <div style={{ marginTop: 22, background: "rgba(255,255,255,0.1)", borderRadius: "var(--radius-lg)", padding: "12px 22px", fontWeight: 700, letterSpacing: ".05em" }}>Order #DS-2042</div>
      </div>
      <div style={{ padding: "0 24px 40px" }}>
        <Button variant="accent" size="lg" fullWidth onClick={onDone}>Back to home</Button>
      </div>
    </div>
  );
}
