/* Deserto website — main page app shell & mount.
   Ordering lives on order.html; header shows the persisted bag count. */
(function () {
  const { Header, Hero, Marquee, MenuSection, Story, Locations, Footer, useSeasonState } = window.Site;

  function App() {
    const { season, vars } = useSeasonState();
    const menuRef = React.useRef(null);
    const [bagCount] = React.useState(() => {
      try { return JSON.parse(localStorage.getItem("deserto.bag.v1") || "[]").reduce((a, x) => a + x.qty, 0); }
      catch (e) { return 0; }
    });

    const scrollTo = (id) => {
      if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 66, behavior: "smooth" });
    };

    return (
      <div style={{ background: "var(--peach-100)", minHeight: "100vh", ...vars }}>
        <Header bag={bagCount} onNav={scrollTo} />
        <Hero season={season} onMenu={() => scrollTo("menu")} />
        <Marquee />
        <MenuSection sectionRef={menuRef} />
        <Story />
        <Locations />
        <Footer />
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
