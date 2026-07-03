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
  // Official brand marks, drawn white on each provider's brand-colour tile:
  // DoorDash's forward swoosh and Grubhub's "Gh" monogram (its current
  // lettermark — the house was older Seamless-era branding).
  DoorDash: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden focusable="false">
      <path d="M23.071 8.409a6.09 6.09 0 00-5.396-3.228H.584A.589.589 0 00.17 6.184L3.894 9.93a1.752 1.752 0 001.242.516h12.049a1.554 1.554 0 11.031 3.108H8.91a.589.589 0 00-.415 1.003l3.725 3.747a1.75 1.75 0 001.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413"
        fill="currentColor" />
    </svg>
  ),
  Grubhub: (
    <svg viewBox="-4 -4.4 71.3 71.3" width="22" height="22" aria-hidden focusable="false">
      <path d="M13.79 7.3c-4.267 0-7.86 1.422-10.232 4.03C.95 13.937 0 17.73 0 22.274V42.03c0 4.267.95 8.298 3.556 10.943 2.607 2.607 6.163 4.03 10.232 4.03 4.267 0 7.86-1.422 10.232-4.03 2.607-2.607 3.556-6.4 3.556-10.943V31.125a1.03 1.03 0 0 0-.949-.949H14.5a1.03 1.03 0 0 0-.949.949v8.1a1.03 1.03 0 0 0 .949.949h3.12v1.896c0 1.66-.472 3.122-1.185 4.03-.71.95-1.66 1.185-2.845 1.185-1.07.001-2.094-.425-2.845-1.185-.71-.95-1.185-2.37-1.185-4.03V22.53c0-1.66.472-3.12 1.185-4.03.71-.95 1.66-1.185 2.845-1.185 1.07-.001 2.094.425 2.845 1.185.71.95 1.185 2.37 1.185 4.03v1.896c0 .472.472.71.71.71h8.298c.472 0 .71-.215.71-.71V22.53c0-4.267-.95-8.298-3.556-10.943-2.135-2.884-5.966-4.306-9.996-4.306m49.506.966H54.99c-.472 0-.71.472-.71.71V27.01h-8.298V8.955c0-.472-.472-.71-.71-.71h-8.298c-.472 0-.71.472-.71.71v46.34c0 .472.472.71.71.71h8.298c.472 0 .71-.472.71-.71V36.764h8.298v18.532c0 .472.472.71.71.71h8.298c.472 0 .71-.472.71-.71V8.955c0-.215-.215-.71-.71-.71"
        fill="currentColor" />
    </svg>
  ),
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
   Closes on outside-click and Escape; the disclosure chevron flips while open.

   `compact` renders an icon-only circular trigger (used in the phone header,
   where it balances the hamburger on the right); the popover is identical. */
export function DeliveryMenu({ compact = false }) {
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
    <div className={"dlv-wrap" + (compact ? " dlv-wrap-compact" : "")} ref={wrapRef}>
      {compact ? (
        <button
          type="button"
          className={"dlv-trigger-compact" + (open ? " open" : "")}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Order delivery"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name="shopping-bag" size={18} color="var(--cream-50)" />
        </button>
      ) : (
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
      )}

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
