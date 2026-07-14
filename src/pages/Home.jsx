import React from "react";
import { Header } from "../site/Header.jsx";
import { Hero } from "../site/Hero.jsx";
import { Marquee } from "../site/parts.jsx";
import { MenuSection } from "../site/Menu.jsx";
import { Story } from "../site/Story.jsx";
import { Locations } from "../site/Locations.jsx";
import { Footer } from "../site/Footer.jsx";

/* Deserto marketing home — browse the menu here, order via a delivery partner. */
export default function Home() {
  const menuRef = React.useRef(null);

  const scrollTo = (id) => {
    if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 66, behavior: "smooth" });
  };

  // Arriving from another route as /#section — jump to that section once mounted.
  React.useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (id) requestAnimationFrame(() => scrollTo(id));
  }, []);

  // The old #FFF1DE canvas matched the AI hero renders' baked wall; the carousel
  // is framed cards now, and that peach washed out the photography — use the
  // cooler shared page surface instead.
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <Header onNav={scrollTo} />
      <Marquee />
      <Hero onVisit={() => scrollTo("locations")} />
      <MenuSection sectionRef={menuRef} />
      <Story />
      <Locations />
      <Footer />
    </div>
  );
}
