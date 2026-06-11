import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Order from "./pages/Order.jsx";
import AppDemo from "./pages/AppDemo.jsx";
import Mockups from "./pages/Mockups.jsx";

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
        <Route path="/order" element={<Order />} />
        <Route path="/app" element={<AppDemo />} />
        <Route path="/mockups" element={<Mockups />} />
      </Routes>
    </BrowserRouter>
  );
}
