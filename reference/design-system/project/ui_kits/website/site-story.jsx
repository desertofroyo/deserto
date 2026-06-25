/* Deserto website — story, locations, footer. */
(function () {
  const NS = window.DesertoDesignSystem_e4c2c1;
  const { Icon, Photo, Arch, ISO } = window.Site;
  const LOGO = "../../assets/logos/deserto-logo-full.png";

  /* ============ Story — the dessert + desierto wordplay ============ */
  function Story() {
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

  /* ============ Visit us — the one real store ============ */
  function Locations() {
    const { store } = window.SITE;
    return (
      <section id="locations" style={{ background: "var(--surface-page)" }}>
        <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-9) var(--space-6)" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.1fr 0.9fr", alignItems: "stretch",
            background: "var(--white)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-2xl)",
            boxShadow: "var(--shadow-md)", overflow: "hidden",
          }}>
            <div style={{ minHeight: 380 }}>
              <Photo src={store.img} pos="center" label={store.name} height="100%" />
            </div>
            <div style={{ padding: "var(--space-7)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="eyebrow" style={{ color: "var(--wine-500)" }}>Visit us</span>
              <h2 style={{ fontSize: "var(--text-4xl)", margin: "10px 0 0", color: "var(--wine-700)", lineHeight: 1 }}>River &amp; Craycroft,<br />Tucson</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "var(--space-5)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--text-muted)" }}>
                  <span style={{ flexShrink: 0, marginTop: 2 }}><Icon name="map-pin" size={17} color="var(--olive-600)" /></span>
                  <span style={{ fontSize: "var(--text-md)", lineHeight: 1.45 }}>{store.addr}<br />{store.city}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)" }}>
                  <Icon name="clock" size={17} color="var(--caramel-500)" />
                  <span style={{ fontSize: "var(--text-md)" }}>{store.hours}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)" }}>
                  <Icon name="phone" size={17} color="var(--wine-500)" />
                  <span style={{ fontSize: "var(--text-md)" }}>{store.phone}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: "var(--space-6)", flexWrap: "wrap" }}>
                <a href={store.maps} target="_blank" rel="noopener" className="btn-wine" style={{
                  borderRadius: 999, padding: "14px 26px", background: "var(--wine-700)", color: "var(--cream-50)",
                  fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center", gap: 9,
                }}>
                  Get directions
                  <Icon name="map-pin" size={16} color="var(--cream-50)" />
                </a>
                <a href="order.html" style={{
                  borderRadius: 999, padding: "14px 26px", border: "2px solid var(--wine-700)", color: "var(--wine-700)",
                  fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", display: "inline-flex", alignItems: "center",
                }}>Order pickup</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ============ Footer ============ */
  function Footer() {
    const [email, setEmail] = React.useState("");
    return (
      <footer style={{ background: "var(--coffee-600)", color: "var(--sand-200)" }}>
        <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--space-6)", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr", gap: "var(--space-6)" }}>
          <div>
            <img src={LOGO} alt="Deserto" style={{ height: 46, filter: "brightness(0) invert(1)", opacity: 0.92 }} />
            <p style={{ marginTop: 16, color: "var(--ink-300)", fontSize: "var(--text-sm)", maxWidth: 260, fontFamily: "var(--font-editorial)" }}>Where coffee meets creamy bliss. 5635 E River Rd, Unit 101 — Tucson, Arizona.</p>
          </div>
          {[["Menu", ["Frozen Yogurt", "Tonics", "Coffee", "Pastries"]], ["Deserto", ["Our story", "Visit us", "Order online"]]].map(([h, items]) => (
            <div key={h}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".04em" }}>{h}</div>
              {items.map((i) => (<div key={i} style={{ color: "var(--ink-300)", fontSize: "var(--text-sm)", marginBottom: 9 }}>{i}</div>))}
            </div>
          ))}
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--cream-50)", marginBottom: 14, fontSize: "var(--text-sm)", letterSpacing: ".04em" }}>Get our drops</div>
            <p style={{ color: "var(--ink-300)", fontSize: "var(--text-sm)", marginBottom: 12 }}>Seasonal flavors &amp; rewards, no spam.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={{ flex: 1, minWidth: 0, border: "none", borderRadius: "var(--radius-md)", padding: "11px 13px", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }} />
              <NS.Button variant="accent" size="md">Join</NS.Button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ padding: "16px var(--space-6)", maxWidth: "var(--container-xl)", margin: "0 auto", display: "flex", justifyContent: "space-between", color: "var(--ink-400)", fontSize: "var(--text-xs)" }}>
            <span>© 2026 Deserto Group LLC. All rights reserved.</span>
            <span style={{ display: "flex", gap: 16 }}>
              <Icon name="instagram" size={18} /><Icon name="facebook" size={18} /><Icon name="twitter" size={18} />
            </span>
          </div>
        </div>
      </footer>
    );
  }

  window.Site = Object.assign(window.Site || {}, { Story, Locations, Footer });
})();
