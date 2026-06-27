import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import AppDemo from "./pages/AppDemo.jsx";
import Mockups from "./pages/Mockups.jsx";
import Publish from "./pages/Publish.jsx";

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
        {/* legacy /order links now land on the view-only menu */}
        <Route path="/order" element={<Menu />} />
        <Route path="/app" element={<AppDemo />} />
        <Route path="/mockups" element={<Mockups />} />
        {/* owner-only: edit the Google Sheet, then publish it live */}
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </BrowserRouter>
  );
}
