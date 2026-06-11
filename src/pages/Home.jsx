import React from "react";
import { Header } from "../site/Header.jsx";
import { Hero } from "../site/Hero.jsx";
import { Marquee } from "../site/parts.jsx";
import { MenuSection } from "../site/Menu.jsx";
import { Story } from "../site/Story.jsx";
import { Locations } from "../site/Locations.jsx";
import { Footer } from "../site/Footer.jsx";
import { readBagCount } from "../lib/bag.js";

/* Deserto marketing home — the bag count is read from the shared
   localStorage bag that the order page writes to. */
export default function Home() {
  const menuRef = React.useRef(null);
  const [bagCount] = React.useState(readBagCount);

  const scrollTo = (id) => {
    if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 66, behavior: "smooth" });
  };

  return (
    <div style={{ background: "var(--peach-100)", minHeight: "100vh" }}>
      <Header bag={bagCount} onNav={scrollTo} />
      <Hero onMenu={() => scrollTo("menu")} />
      <Marquee />
      <MenuSection sectionRef={menuRef} />
      <Story />
      <Locations />
      <Footer />
    </div>
  );
}
