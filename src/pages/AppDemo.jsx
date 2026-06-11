import React from "react";
import { Phone } from "../app/shell.jsx";
import { Welcome, Home, Build, Bag, Rewards, Confirm } from "../app/screens.jsx";
import { TabBar } from "../app/shell.jsx";

/* Deserto mobile ordering app — interactive click-through demo inside a
   390x844 phone frame: welcome → home → build → bag → place order → confirm,
   plus the rewards tab. */
export default function AppDemo() {
  const [screen, setScreen] = React.useState("welcome"); // welcome | main
  const [tab, setTab] = React.useState("home");           // home | rewards | bag
  const [overlay, setOverlay] = React.useState(null);     // null | build | confirm
  const [product, setProduct] = React.useState(null);
  const [bag, setBag] = React.useState([]);

  const openBuild = (p = null) => { setProduct(p); setOverlay("build"); };
  const addItem = (item) => { setBag((b) => [...b, item]); setOverlay(null); setProduct(null); setTab("bag"); };
  const checkout = () => { setOverlay("confirm"); setBag([]); };

  let content;
  if (screen === "welcome") {
    content = <Welcome onContinue={() => setScreen("main")} />;
  } else if (overlay === "build") {
    content = <Build product={product} onBack={() => setOverlay(null)} onAdd={addItem} />;
  } else if (overlay === "confirm") {
    content = <Confirm onDone={() => { setOverlay(null); setTab("home"); }} />;
  } else {
    content = (
      <React.Fragment>
        {tab === "home" && <Home onBuild={() => openBuild(null)} onOpenProduct={(p) => openBuild(p)} />}
        {tab === "rewards" && <Rewards />}
        {tab === "bag" && <Bag items={bag} onRemove={(i) => setBag((b) => b.filter((_, idx) => idx !== i))} onCheckout={checkout} onBrowse={() => setTab("home")} />}
        <TabBar tab={tab} setTab={setTab} bagCount={bag.length} />
      </React.Fragment>
    );
  }

  return <Phone>{content}</Phone>;
}
