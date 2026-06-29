import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";

const LOGO = "/assets/logos/deserto-primary.svg";

/* ---------------- Header (frosted desert-glass nav) ----------------
   Transparent over the hero so the warm photography reads edge-to-edge, then
   settles into a frosted peach-cream bar with a hairline warm border and a
   warm-brown shadow once the page scrolls. The active section/route carries a
   settled orange underline (the hover state, made permanent). One confident
   wine "Order delivery" pill at right; on mobile the nav folds into a sheet.

   Same bar on every route: section links smooth-scroll in place on the home
   page (via onNav); from any other route they navigate home to the #section. */
export function Header({ onNav }) {
  const { nav, store } = SITE;
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  // Frost the bar once the page leaves the very top.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active item: the /menu route lights "Menu"; on home we scroll-spy the
  // sections so the underline tracks whatever fold you're reading. The hero
  // ("top") is observed too but isn't a nav item, so while it owns the spy
  // line nothing is highlighted — landing on the hero shows no active link.
  React.useEffect(() => {
    if (!onHome) { setActiveId(pathname.startsWith("/menu") ? "menu" : ""); return; }
    setActiveId("");
    const ids = ["top", ...nav.map((n) => n.id)];
    const order = new Map(ids.map((id, idx) => [id, idx]));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const visible = new Set();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        // Highlight the topmost visible section; the hero ("top") maps to no
        // nav item, so it (and an empty set) clears the active underline.
        let top = "";
        for (const id of visible) {
          if (top === "" || order.get(id) < order.get(top)) top = id;
        }
        setActiveId(top === "top" ? "" : top);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [onHome, pathname, nav]);

  const handleNav = (id) => {
    setOpen(false);
    if (onHome && onNav) return onNav(id);
    navigate(id === "top" ? "/" : "/#" + id);
  };

  return (
    <header className={"site-header" + (scrolled || open ? " scrolled" : "")}>
      <div className="site-header-inner">
        <a href="#top" aria-label="Deserto — home" className="hdr-logo"
          onClick={(e) => { e.preventDefault(); handleNav("top"); }}>
          <img src={LOGO} alt="Deserto — Frozen Yogurt & Café" />
        </a>

        <nav className="hdr-nav" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.id} href={"#" + n.id} onClick={(e) => { e.preventDefault(); handleNav(n.id); }}
              className={"nav-link" + (activeId === n.id ? " active" : "")}
              aria-current={activeId === n.id ? "true" : undefined}>{n.en}</a>
          ))}
        </nav>

        <div className="hdr-actions">
          <Link to="/menu" className="hdr-cta btn-wine">View menu</Link>
          <button className="hdr-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            onClick={() => setOpen((o) => !o)}>
            <span className={"hb" + (open ? " open" : "")}><span /><span /><span /></span>
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="hdr-mobile-panel">
          {nav.map((n, i) => (
            <a key={n.id} href={"#" + n.id} className="hdr-m-item" style={{ "--d": i }}
              onClick={(e) => { e.preventDefault(); handleNav(n.id); }}>
              {n.en}
              <Icon name="arrow-right" size={17} color="var(--wine-500, var(--wine-700))" />
            </a>
          ))}
          <Link to="/menu" className="hdr-m-cta btn-wine" style={{ "--d": nav.length }} onClick={() => setOpen(false)}>
            View menu
          </Link>
          <p className="hdr-m-meta" style={{ "--d": nav.length + 1 }}>
            <Icon name="map-pin" size={14} color="var(--wine-500, var(--wine-700))" />
            {store.addr} · {store.hours}
          </p>
        </div>
      )}
    </header>
  );
}
