/* Deserto app — shell parts. Exposes Icon, Photo, Phone, StatusBar, TabBar. */
const NS = window.DesertoDesignSystem_e4c2c1;
const ISO = "../../assets/logos/deserto-isotype.png";
const ISO_W = "../../assets/logos/deserto-isotype-white.png";
const IMG = "../../assets/images/";

function Icon({ name, size = 22, color = "currentColor", strokeWidth = 2 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ attrs: { width: size, height: size, stroke: color, "stroke-width": strokeWidth } });
    }
  }, [name, size, color, strokeWidth]);
  return <span ref={ref} style={{ display: "inline-flex", lineHeight: 0 }} />;
}

function Photo({ src, tint = "var(--peach-100)", label, height = "100%", radius = 0, iso = 0.16, pos = "center", style = {} }) {
  return (
    <div style={{ position: "relative", height, width: "100%", background: tint, borderRadius: radius, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
      {src ? (
        <img src={IMG + src} alt={label || ""} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} />
      ) : (
        <img src={ISO} alt="" style={{ height: "44%", opacity: iso, filter: "saturate(0.6)" }} />
      )}
    </div>
  );
}

function StatusBar({ dark = false }) {
  const c = dark ? "var(--cream-50)" : "var(--ink-900)";
  return (
    <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", flex: "none", color: c }}>
      <span style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-body)" }}>9:41</span>
      <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Icon name="signal" size={16} color={c} /><Icon name="wifi" size={16} color={c} /><Icon name="battery-full" size={18} color={c} />
      </span>
    </div>
  );
}

function TabBar({ tab, setTab, bagCount }) {
  const tabs = [["home", "Home"], ["rewards", "Rewards"], ["bag", "Bag"]];
  const icons = { home: "house", rewards: "gift", bag: "shopping-bag" };
  return (
    <div style={{ flex: "none", display: "flex", borderTop: "1px solid var(--border-default)", background: "var(--white)", padding: "8px 10px 18px" }}>
      {tabs.map(([k, label]) => {
        const on = tab === k;
        return (
          <button key={k} onClick={() => setTab(k)} style={{ flex: 1, border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: on ? "var(--cream-50)" : "var(--ink-400)", position: "relative" }}>
            <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 34, borderRadius: 99, background: on ? "var(--wine-700)" : "transparent", transition: "background var(--dur-fast)" }}>
              <Icon name={icons[k]} size={22} color={on ? "var(--cream-50)" : "var(--ink-400)"} strokeWidth={on ? 2.4 : 2} />
              {k === "bag" && bagCount > 0 && (
                <span style={{ position: "absolute", top: -4, right: 4, minWidth: 16, height: 16, padding: "0 3px", background: "var(--orange-500)", color: "var(--wine-900)", borderRadius: 999, fontSize: 10, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--white)" }}>{bagCount}</span>
              )}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: on ? "var(--wine-700)" : "var(--ink-400)" }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* Phone shell — 390x844, rounded, drop shadow on a warm backdrop. */
function Phone({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(120% 80% at 50% 0%, var(--sand-200), var(--cream-50))", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 390, height: 844, background: "var(--surface-page)", borderRadius: 44, boxShadow: "var(--shadow-xl), 0 0 0 11px #1a1412, 0 0 0 13px #2c2320", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

window.AppKit = Object.assign(window.AppKit || {}, { Icon, Photo, StatusBar, TabBar, Phone, ISO, ISO_W });
