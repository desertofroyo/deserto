import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../site/Header.jsx";
import { Footer } from "../site/Footer.jsx";
import { SITE } from "../site/data.js";

/* ------------------------------------------------------------------
   Legal & info pages — Privacy Policy, Terms of Use, Accessibility.

   These are honest, plain-language documents that describe what this
   site actually does: it is a static marketing site (no accounts, no
   on-site checkout, no server-side database). The contact form opens
   the visitor's own mail app; ordering happens on third-party partners
   (DoorDash / Grubhub). The copy reflects exactly that — nothing here
   claims tracking, analytics, or data collection the site doesn't do.

   Contact for legal matters routes to the /contact page and the shop's
   mailing address on purpose: the owner's personal email is never
   published, and no business inbox has been provided yet.

   Note for the owner: this is a solid starting template written to match
   how the site behaves today, not formal legal advice. If Deserto begins
   collecting data (analytics, a newsletter, online ordering), or before
   relying on these for compliance, have them reviewed by counsel and
   update the "Last updated" date. ------------------------------------- */

const UPDATED = "July 2, 2026";

/* Shared chrome: branded intro + a readable prose column, same warm
   language as the Contact page so the legal pages feel part of the site. */
function LegalPage({ eyebrow, title, intro, children }) {
  return (
    <div style={{ background: "var(--cream-50)", minHeight: "100vh" }}>
      <Header />

      <div className="contact-intro">
        <span className="eyebrow" style={{ color: "var(--wine-500)" }}>{eyebrow}</span>
        <h1 className="contact-title">{title}</h1>
        {intro && <p className="contact-sub">{intro}</p>}
        <p className="legal-updated">Last updated: {UPDATED}</p>
      </div>

      <main className="legal-prose">
        {children}
      </main>

      <Footer />
    </div>
  );
}

/* A small helper for the "reach us" line repeated at the foot of each doc. */
function LegalContact() {
  const { store } = SITE;
  return (
    <p>
      Questions about this page? Reach us through our{" "}
      <Link to="/contact" className="legal-link">contact page</Link>, or by mail at
      Deserto Group LLC, {store.addr}, {store.city}.
    </p>
  );
}

/* ============================ Privacy ============================ */
export function Privacy() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Your privacy."
      intro="How this website handles the little information it touches — in plain language."
    >
      <p>
        This Privacy Policy explains how Deserto Group LLC (&ldquo;Deserto,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us&rdquo;) handles information in connection with
        this website. Deserto Frozen Yogurt &amp; Café is a physical shop in Tucson,
        Arizona; this site exists to share our menu, story, and location — it is not
        an online store.
      </p>

      <h2>The short version</h2>
      <p>
        We built this site to be quiet about your data. It has no user accounts, no
        shopping cart, and no login. We don&rsquo;t sell your information, and we
        don&rsquo;t use it to advertise to you elsewhere.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>What you send us.</strong> If you use our contact form, it opens a
          pre-filled message in your own email app — nothing is submitted to a server
          on this site. When you hit send, your name, email address, and message reach
          us the same way any email would, and we keep it only as long as needed to
          reply and follow up.
        </li>
        <li>
          <strong>Basic technical data.</strong> Like most websites, our hosting
          provider may automatically log standard request information (such as your
          browser type and IP address) to keep the site running and secure. We
          don&rsquo;t use this to identify you or build a profile.
        </li>
        <li>
          <strong>No tracking cookies.</strong> This site doesn&rsquo;t set
          advertising or cross-site tracking cookies of its own.
        </li>
      </ul>

      <h2>Services we link to</h2>
      <p>
        We link out to services that run their own sites and their own privacy
        practices — including our delivery partners (DoorDash and Grubhub), our social
        profiles (Instagram, Facebook, TikTok), and Google Maps for directions. Once
        you follow one of those links, their privacy policies apply, not ours.
      </p>

      <h2>How we use information</h2>
      <p>
        We use the information you send only to respond to you and to run our café —
        for example, to answer a catering question or a message you send us. We
        don&rsquo;t sell or rent your information, and we share it only where needed to
        operate (such as our email provider) or where required by law.
      </p>

      <h2>Your choices</h2>
      <p>
        Because we collect so little, there isn&rsquo;t much to manage — but you can
        always ask us what we hold about you, ask us to correct or delete it, and
        choose not to contact us through the site. Depending on where you live
        (including California), you may have additional rights over your personal
        information; contact us and we&rsquo;ll honor them.
      </p>

      <h2>Children</h2>
      <p>
        This site isn&rsquo;t directed at children under 13, and we don&rsquo;t
        knowingly collect their personal information.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how the site handles information, we&rsquo;ll update this page and
        the date above.
      </p>

      <h2>Contact</h2>
      <LegalContact />
    </LegalPage>
  );
}

/* ============================= Terms ============================= */
export function Terms() {
  return (
    <LegalPage
      eyebrow="Terms of Use"
      title="Terms of use."
      intro="The simple ground rules for using this website."
    >
      <p>
        Welcome. By visiting this website, you agree to these Terms of Use. If you
        don&rsquo;t agree with them, please don&rsquo;t use the site. &ldquo;We&rdquo;
        and &ldquo;us&rdquo; means Deserto Group LLC.
      </p>

      <h2>What this site is for</h2>
      <p>
        This is an informational site for Deserto Frozen Yogurt &amp; Café — our menu,
        our story, and how to visit. You&rsquo;re welcome to browse it for your own
        personal, non-commercial use.
      </p>

      <h2>Menu, prices &amp; availability</h2>
      <p>
        We show our menu here to give you a taste of what we make. Flavors, items, and
        availability change often and may differ from what&rsquo;s in the shop on a
        given day. Prices aren&rsquo;t listed here — the prices and details at the shop
        or with our delivery partners are the ones that apply to any actual order.
      </p>

      <h2>Allergens &amp; nutrition</h2>
      <p>
        Any nutrition or allergen information is provided for general guidance and can
        change. Our kitchen handles common allergens (including milk, nuts, soy, and
        wheat), and we can&rsquo;t guarantee an item is free of any allergen. If you
        have a food allergy or dietary need, please talk to our staff before ordering.
      </p>

      <h2>Ordering happens elsewhere</h2>
      <p>
        You can&rsquo;t place an order or pay on this site. Links to DoorDash, Grubhub,
        and other partners take you to their platforms, which have their own terms and
        policies. We&rsquo;re not responsible for those third-party services.
      </p>

      <h2>Our content</h2>
      <p>
        The name, logo, photography, text, and design on this site belong to Deserto
        Group LLC or are used with permission. Please don&rsquo;t copy, reproduce, or
        reuse them without our written permission.
      </p>

      <h2>The site &ldquo;as is&rdquo;</h2>
      <p>
        We work to keep this site accurate and available, but we provide it
        &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent
        permitted by law, Deserto Group LLC isn&rsquo;t liable for any damages arising
        from your use of — or inability to use — this site.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Arizona, without regard to
        its conflict-of-laws rules.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time; the current version always lives
        on this page, with the date above.
      </p>

      <h2>Contact</h2>
      <LegalContact />
    </LegalPage>
  );
}

/* ========================= Accessibility ========================= */
export function Accessibility() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility."
      intro="We want everyone to feel welcome — online, the same as in the shop."
    >
      <p>
        Deserto is committed to making this website usable and welcoming for as many
        people as possible, including visitors who use assistive technologies such as
        screen readers, keyboard navigation, or screen magnification.
      </p>

      <h2>Our aim</h2>
      <p>
        We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as a
        practical standard for our design and development, and we treat accessibility as
        an ongoing part of how we build and maintain the site.
      </p>

      <h2>What we do</h2>
      <ul>
        <li>Use meaningful text alternatives for images and product photos.</li>
        <li>Keep color contrast readable and never rely on color alone to convey meaning.</li>
        <li>Support keyboard navigation with visible focus outlines on links and controls.</li>
        <li>Respect a visitor&rsquo;s reduced-motion preference for animation.</li>
        <li>Use clear headings and structure so content is easy to scan and navigate.</li>
      </ul>

      <h2>Ongoing work</h2>
      <p>
        Accessibility is never truly finished. Some parts of the site may not yet fully
        meet our goal, and we&rsquo;re continually testing and improving. If something
        gets in your way, we&rsquo;d genuinely like to know.
      </p>

      <h2>Tell us</h2>
      <p>
        If you run into a barrier on this site, or need information in a different
        format, please reach out through our{" "}
        <Link to="/contact" className="legal-link">contact page</Link>. Let us know the
        page and what happened, and we&rsquo;ll do our best to help and to fix it.
      </p>

      <h2>Visiting the shop</h2>
      <p>
        We also want your visit in person to be comfortable. If there&rsquo;s anything
        we can do to make your time at the café easier, just ask a team member when you
        come in.
      </p>

      <h2>Contact</h2>
      <LegalContact />
    </LegalPage>
  );
}
