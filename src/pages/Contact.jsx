import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";
import { Header } from "../site/Header.jsx";
import { Footer } from "../site/Footer.jsx";
import { Seo } from "../site/Seo.jsx";
import { DeliveryButtons } from "../site/Delivery.jsx";
import { SITE } from "../site/data.js";

// Contact us — a warm, on-brand "say hello" page: a message form on the left,
// the real ways to reach the shop on the right (visit, hours, follow, order).
//
// Submitting posts to Netlify Forms, so the message is delivered without the
// visitor ever leaving the page — no mail app, no backend of our own, no
// third-party form service. Netlify stores each submission and (once the
// notification is configured in the Netlify UI) emails it to the shop.
//
// Netlify discovers forms by parsing the built HTML, and this page is rendered
// by React at runtime — so index.html carries a hidden static twin of this form
// declaring the same field names. If you add a field here, add it there too or
// Netlify will drop it.
// The shop's address is deliberately NOT rendered anywhere on this page, not
// even in a mailto: fallback — a plain-text address in the markup gets harvested
// by scrapers within days. If a send fails we ask the visitor to retry instead.
const FORM_NAME = "contact";

const encode = (data) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

export default function Contact() {
  const { store, social } = SITE;
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  // idle | sending | sent | error
  const [status, setStatus] = React.useState("idle");
  // Honeypot: real people never see this, bots fill it in. Netlify drops those.
  const [botField, setBotField] = React.useState("");

  const onField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": FORM_NAME, "bot-field": botField, ...form }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <Seo
        title="Contact & Visit"
        description="Visit Deserto at 5635 E River Rd, Unit 101, Tucson, AZ. Open daily 10 AM – 10 PM. Get directions, follow along, or order for delivery."
      />
      <Header />

      {/* intro */}
      <div className="contact-intro">
        <span className="eyebrow" style={{ color: "var(--wine-500)" }}>Contact us</span>
        <h1 className="contact-title">Say hello.</h1>
        <p className="contact-sub">
          Questions, catering, a swirl request or just kind words — drop us a note
          and we'll get back to you.
        </p>
      </div>

      <main className="contact-grid">
       <div className="contact-card">
        {/* message form */}
        <div className="contact-card-form">
          {status === "sent" ? (
            <div className="contact-sent" role="status">
              <span className="contact-sent-mark"><Icon name="check" size={26} color="var(--cream-50)" /></span>
              <h2 className="contact-sent-title">Thanks — message sent.</h2>
              <p className="contact-sent-copy">
                It's on its way to us and we'll get back to you soon. Prefer another
                way? Reach us on the right.
              </p>
              <button type="button" className="btn-wine contact-btn"
                onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}>
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate name={FORM_NAME} data-netlify="true" netlify-honeypot="bot-field">
              {/* Netlify needs the form name posted alongside the fields. */}
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p hidden>
                <label>
                  Don't fill this out
                  <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} />
                </label>
              </p>

              <label className="contact-label" htmlFor="c-name">Your name</label>
              <input id="c-name" name="name" className="contact-input" type="text" required autoComplete="name"
                value={form.name} onChange={onField("name")} placeholder="Jane Doe" />

              <label className="contact-label" htmlFor="c-email">Your email</label>
              <input id="c-email" name="email" className="contact-input" type="email" required autoComplete="email"
                value={form.email} onChange={onField("email")} placeholder="you@email.com" />

              <label className="contact-label" htmlFor="c-message">Message</label>
              <textarea id="c-message" name="message" className="contact-input contact-textarea" required rows={5}
                value={form.message} onChange={onField("message")} placeholder="How can we help?" />

              {status === "error" && (
                <p className="contact-error" role="alert">
                  That didn't go through — your message wasn't sent. Please try
                  again in a moment, or reach us on Instagram or by stopping in.
                </p>
              )}

              <button type="submit" className="btn-wine contact-btn" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
                <Icon name="mail" size={17} color="var(--cream-50)" />
              </button>
            </form>
          )}
        </div>

        {/* other ways to reach us — a soft, warm "come see us" side, part of the
            same card so it reads connected rather than as a floating block */}
        <aside className="contact-card-info">
          <div className="contact-photo">
            <img src="/assets/images/story-froyo-caramel.jpg"
              alt="A Deserto frozen yogurt swirl with caramel drizzle, strawberries and blueberries" loading="lazy" />
          </div>
          <span className="eyebrow contact-info-kicker">Come see us</span>
          <div className="contact-block">
            <span className="contact-block-icon"><Icon name="map-pin" size={18} color="var(--olive-600)" /></span>
            <div>
              <div className="contact-block-label">Visit us</div>
              <p className="contact-block-body">{store.addr}<br />{store.city}</p>
              <a href={store.maps} target="_blank" rel="noopener noreferrer" className="contact-link">
                Get directions <Icon name="arrow-right" size={14} color="var(--wine-700)" />
              </a>
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-block-icon"><Icon name="clock" size={18} color="var(--caramel-500)" /></span>
            <div>
              <div className="contact-block-label">Hours</div>
              <p className="contact-block-body">{store.hours}</p>
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-block-icon"><Icon name="instagram" size={18} color="var(--wine-600)" /></span>
            <div>
              <div className="contact-block-label">Follow along</div>
              <div className="contact-socials">
                {social.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="contact-social">
                    <Icon name={s.icon} size={17} color="var(--wine-700)" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-block-icon"><Icon name="cup-soda" size={18} color="var(--olive-600)" /></span>
            <div>
              <div className="contact-block-label">Order delivery</div>
              <DeliveryButtons />
            </div>
          </div>
        </aside>
       </div>
      </main>

      <Footer />
    </div>
  );
}
