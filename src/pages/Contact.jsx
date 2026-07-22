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
// This is a static site with no backend, so "send" composes a pre-filled draft
// in the visitor's own mail app (mailto:) — no third-party form service, no data
// leaves the browser until they hit send. CONTACT_EMAIL is the business inbox
// the messages land in — the shop's own Microsoft 365 address, never a personal
// one. Clearing it back to "" disables the form's send button by design.
const CONTACT_EMAIL = "hello@desertofroyo.com";

export default function Contact() {
  const { store, social } = SITE;
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [sent, setSent] = React.useState(false);
  const configured = CONTACT_EMAIL.length > 0;

  const onField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!configured) return;
    const subject = `Website message from ${form.name || "a visitor"}`;
    const body =
      `${form.message}\n\n— ${form.name}` + (form.email ? ` (${form.email})` : "");
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
          {sent ? (
            <div className="contact-sent" role="status">
              <span className="contact-sent-mark"><Icon name="check" size={26} color="var(--cream-50)" /></span>
              <h2 className="contact-sent-title">Your message is ready.</h2>
              <p className="contact-sent-copy">
                We've opened a pre-filled email in your mail app — hit send and it's
                on its way to us. Prefer another way? Reach us on the right.
              </p>
              <button type="button" className="btn-wine contact-btn" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <label className="contact-label" htmlFor="c-name">Your name</label>
              <input id="c-name" className="contact-input" type="text" required autoComplete="name"
                value={form.name} onChange={onField("name")} placeholder="Jane Doe" />

              <label className="contact-label" htmlFor="c-email">Your email</label>
              <input id="c-email" className="contact-input" type="email" required autoComplete="email"
                value={form.email} onChange={onField("email")} placeholder="you@email.com" />

              <label className="contact-label" htmlFor="c-message">Message</label>
              <textarea id="c-message" className="contact-input contact-textarea" required rows={5}
                value={form.message} onChange={onField("message")} placeholder="How can we help?" />

              <button type="submit" className="btn-wine contact-btn" disabled={!configured}>
                Send message
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
