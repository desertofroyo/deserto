import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";
import AppDemo from "./pages/AppDemo.jsx";
import Mockups from "./pages/Mockups.jsx";
import { Privacy, Terms, Accessibility } from "./pages/Legal.jsx";

/* Reset scroll on route change (but preserve in-page anchor scrolling). */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        {/* legacy /order links now land on the view-only menu */}
        <Route path="/order" element={<Menu />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/app" element={<AppDemo />} />
        <Route path="/mockups" element={<Mockups />} />
      </Routes>
    </BrowserRouter>
  );
}
