/* Deserto website — header + reference-style peach hero (bold editorial). */
(function () {
  const NS = window.DesertoDesignSystem_e4c2c1;
  const { Icon, Photo, ISO } = window.Site;
  const LOGO = "../../assets/logos/deserto-logo-full.png";
  const LOGO_ISO = "../../assets/logos/deserto-isotype.png";

  /* ---------------- Header (light / cream) ---------------- */
  function Header({ bag, onNav }) {
    const { nav } = window.SITE;
    return (
      <header style={{
        position: "sticky", top: 0, zIndex: 50, background: "rgba(252,238,228,0.86)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-default)",
      }}>
        <div style={{
          maxWidth: "var(--container-xl)", margin: "0 auto", padding: "0 var(--space-6)", height: 74,
          display: "flex", alignItems: "center", gap: "var(--space-6)",
        }}>
          <a href="#top" onClick={(e) => { e.preventDefault(); onNav("top"); }} style={{ display: "flex", alignItems: "center" }}>
            <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" style={{ height: 48, width: "auto", display: "block" }} />
          </a>
          <nav style={{ display: "flex", gap: "var(--space-5)", marginLeft: "var(--space-4)" }}>
            {nav.map((n) => (
              <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); onNav(n.id); }}
                className="nav-link"
                style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--ink-700)", letterSpacing: ".01em", whiteSpace: "nowrap" }}>{n.en}</a>
            ))}
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <button aria-label="Search" style={{ border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", padding: 6 }}><Icon name="search" color="var(--wine-700)" /></button>
            <a aria-label="Bag" href="order.html" style={{ position: "relative", display: "inline-flex", padding: 6 }}>
              <Icon name="shopping-bag" color="var(--wine-700)" />
              {bag > 0 && (
                <span key={bag} style={{
                  position: "absolute", top: -2, right: -4, minWidth: 18, height: 18, padding: "0 4px",
                  background: "var(--orange-500)", color: "var(--wine-900)", borderRadius: 999,
                  fontSize: 11, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-body)", animation: "popIn .35s var(--ease-bounce)",
                }}>{bag}</span>
              )}
            </a>
            <a href="order.html" className="btn-wine" style={{
              borderRadius: 999, padding: "11px 22px", flexShrink: 0, whiteSpace: "nowrap",
              background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
              fontSize: "var(--text-sm)",
            }}>Order now</a>
          </div>
        </div>
      </header>
    );
  }

  /* ---------------- Hero (peach, bold editorial) ---------------- */
  function Hero({ season, onMenu }) {
    return (
      <section id="top" style={{ background: "var(--peach-100)", position: "relative" }}>
        {/* soft decorative blooms */}
        <div style={{ position: "absolute", top: -120, left: -80, width: 320, height: 320, borderRadius: "50%", background: "var(--peach-200)", opacity: 0.5, filter: "blur(8px)" }} />
        <div style={{
          position: "relative", maxWidth: "var(--container-xl)", margin: "0 auto",
          padding: "var(--space-8) var(--space-6)",
          display: "grid", gridTemplateColumns: "1.06fr 0.94fr", gap: "var(--space-7)", alignItems: "center", paddingTop: "var(--space-10)",
        }}>
          {/* ---- Text column ---- */}
          <div>
            <span style={{
              display: "inline-block", background: "var(--wine-700)", color: "var(--lime-400)",
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".02em",
              padding: "8px 18px", borderRadius: 999,
            }}>Open daily 10–10 · River Rd, Tucson</span>

            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase",
              fontSize: "clamp(56px, 6.4vw, 104px)", lineHeight: 0.9, letterSpacing: "-0.01em",
              margin: "var(--space-5) 0 0", color: "var(--wine-700)",
            }}>
              Where coffee<br />meets creamy<br /><span style={{ color: "var(--orange-500)" }}>bliss.</span>
            </h1>

            <p style={{
              fontFamily: "var(--font-editorial)", fontSize: "var(--text-lg)", color: "var(--ink-700)",
              lineHeight: 1.55, margin: "var(--space-5) 0 0", maxWidth: 460,
            }}>
              Self-serve frozen yogurt with curated toppings, espresso classics, fruity tonics in our signature cans, and fresh-baked pastries — made to fit your taste and your lifestyle.
            </p>

            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
              <a href="order.html" className="btn-wine" style={{
                borderRadius: 999, padding: "16px 30px",
                background: "var(--wine-700)", color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800,
                fontSize: "var(--text-md)", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-md)",
              }}>
                Order now
                <Icon name="arrow-right" size={20} color="var(--cream-50)" />
              </a>
              <button onClick={onMenu} style={{
                cursor: "pointer", borderRadius: 999, padding: "16px 30px", background: "transparent",
                border: "2px solid var(--wine-700)", color: "var(--wine-700)", fontFamily: "var(--font-body)",
                fontWeight: 800, fontSize: "var(--text-md)",
              }}>See the menu</button>
            </div>
          </div>

          {/* ---- Froyo on wine disc — cups burst out of the top ---- */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 580, paddingTop: 100 }}>
            {/* wine disc — froyo lives inside so centering is relative to the disc */}
            <div style={{ position: "relative", width: 400, height: 400, flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--wine-700)", boxShadow: "0 28px 64px -12px rgba(58,12,20,0.55)" }} />
              {/* diet labels */}
              {[
                { label: "Gluten Free", top: 22,  left: -24, rotate: -9 },
                { label: "Dairy Free",  top: 300, left: -30, rotate:  7 },
                { label: "Vegan",       top: 175, left: 348, rotate: -6 },
              ].map(({ label, top, left, rotate }) => (
                <div key={label} style={{
                  position: "absolute", top, left, transform: `rotate(${rotate}deg)`, zIndex: 3,
                  background: "var(--lime-500)", color: "var(--wine-900)", borderRadius: 999,
                  padding: "7px 15px", boxShadow: "var(--shadow-md)", whiteSpace: "nowrap",
                  fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-sm)", letterSpacing: ".01em",
                }}>{label}</div>
              ))}
              {/* froyo cutout — centered on disc, bursts upward */}
              <img src="../../uploads/froyo-cups-cutout.png"
                alt="Taro and Ristachio froyo cups"
                style={{
                  position: "absolute",
                  left: "50%", bottom: 0,
                  transform: "translateX(-50%)",
                  width: 400, height: "auto",
                  filter: "drop-shadow(0 24px 32px rgba(58,12,20,0.45))",
                  zIndex: 2,
                  pointerEvents: "none",
                }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  window.Site = Object.assign(window.Site || {}, { Header, Hero });
})();
