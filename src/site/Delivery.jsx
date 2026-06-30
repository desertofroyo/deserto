import React from "react";
import { Icon } from "../components/ds";
import { SITE } from "./data.js";

/* ---------------- Delivery (DoorDash / Grubhub presentation) ----------------
   Ordering is the money action, so the partners get a first-class, on-brand
   treatment instead of two washed-out pills. One source of truth (SITE.delivery)
   feeds three surfaces: the nav popover, the footer button block, and the mobile
   sheet — all rendered through the same provider row so they stay consistent.

   Each provider carries its own mark + brand colour (data.js: brand/fg). We echo
   the real logos with a simple geometric glyph on a brand-coloured tile — a
   forward chevron for DoorDash, a house for Grubhub — enough identity to read at
   a glance without shipping a trademarked lockup. */

const MARKS = {
  // DoorDash's mark is a fast forward chevron; Grubhub's is a house.
  DoorDash: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden focusable="false">
      <path d="M2.6 8.4h11.1a4 4 0 0 1 3.55 5.83l-.06.11a4 4 0 0 1-3.55 2.16H8.7a1 1 0 0 1 0-2h4.95a2 2 0 0 0 1.78-1.08l.06-.12A2 2 0 0 0 13.7 10.4H2.6a1 1 0 1 1 0-2Z"
        fill="currentColor" />
    </svg>
  ),
  Grubhub: <Icon name="house" size={19} color="currentColor" />,
};

function mark(name) {
  return MARKS[name] || <Icon name="shopping-bag" size={18} color="currentColor" />;
}

/* A single provider as a rich, full-width row — used in the nav popover and the
   mobile sheet. The brand colour rides in on --brand for the tile + hover tint. */
function ProviderRow({ p, onClick }) {
  return (
    <a
      className="dlv-row"
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      style={{ "--brand": p.brand }}
    >
      <span className="dlv-tile" style={{ background: p.brand, color: p.fg }}>
        {mark(p.name)}
      </span>
      <span className="dlv-row-text">
        <span className="dlv-row-name">{p.name}</span>
        <span className="dlv-row-sub">Pickup or delivery</span>
      </span>
      <Icon name="chevron-right" size={18} color="var(--wine-500, var(--wine-700))" />
    </a>
  );
}

/* ---- Nav: "Order delivery" pill + branded popover ----
   The header isn't overflow-clipped, so an absolutely-positioned popover is safe.
   Closes on outside-click and Escape; the disclosure chevron flips while open. */
export function DeliveryMenu() {
  const { delivery } = SITE;
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="dlv-wrap" ref={wrapRef}>
      <button
        type="button"
        className={"dlv-trigger" + (open ? " open" : "")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="shopping-bag" size={17} color="var(--cream-50)" />
        Order delivery
        <Icon name="chevron-right" size={16} color="var(--cream-50)" style={{ transition: "transform .25s var(--ease-out, ease)", transform: open ? "rotate(90deg)" : "rotate(0)" }} />
      </button>

      <div className={"dlv-pop" + (open ? " open" : "")} role="menu" aria-label="Order delivery" hidden={!open}>
        <span className="dlv-pop-eyebrow">Order from</span>
        {delivery.map((p) => (
          <ProviderRow key={p.name} p={p} onClick={() => setOpen(false)} />
        ))}
      </div>
    </div>
  );
}

/* ---- Footer / mobile sheet: the same rows in a plain stacked list ---- */
export function DeliveryList({ onItemClick }) {
  const { delivery } = SITE;
  return (
    <div className="dlv-list">
      {delivery.map((p) => (
        <ProviderRow key={p.name} p={p} onClick={onItemClick} />
      ))}
    </div>
  );
}

/* ---- Footer: branded buttons that hold contrast on the coffee-brown band ---- */
export function DeliveryButtons() {
  const { delivery } = SITE;
  return (
    <div className="dlv-fbtns">
      {delivery.map((p) => (
        <a
          key={p.name}
          className="dlv-fbtn"
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ "--brand": p.brand }}
        >
          <span className="dlv-fbtn-tile" style={{ background: p.brand, color: p.fg }}>
            {mark(p.name)}
          </span>
          {p.name}
        </a>
      ))}
    </div>
  );
}
