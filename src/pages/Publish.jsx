import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/ds";

/* ---------------------------------------------------------------------------
   Publish — the owner's private "push my menu live" page.

   Flow: she edits her Google Sheet → comes here → enters her passphrase →
   clicks Publish. That calls the Netlify function (/.netlify/functions/publish),
   which checks the passphrase and triggers a rebuild. ~1 minute later the live
   site shows her changes. The build re-reads the sheet (scripts/build-menu.mjs).

   The sheet link comes from VITE_MENU_SHEET_URL (set in Netlify). Nothing here
   is secret — the build-hook URL lives only in the server-side function.
--------------------------------------------------------------------------- */
const SHEET_URL = import.meta.env.VITE_MENU_SHEET_URL || "";

export default function Publish() {
  const [pass, setPass] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | working | done | error
  const [message, setMessage] = React.useState("");

  async function publish(e) {
    e.preventDefault();
    if (!pass.trim() || status === "working") return;
    setStatus("working");
    setMessage("");
    try {
      const res = await fetch("/.netlify/functions/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: pass.trim() }),
      });
      if (res.status === 401) { setStatus("error"); setMessage("That passphrase didn't match. Double-check it and try again."); return; }
      if (!res.ok) { setStatus("error"); setMessage("Something went wrong reaching the publisher. Please try again in a minute."); return; }
      setStatus("done");
      setMessage("");
      setPass("");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the publisher — check your connection and try again.");
    }
  }

  return (
    <div style={{ background: "var(--peach-100)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid var(--border-default)", background: "var(--white)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 var(--space-6)", height: 70, display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <Link to="/" aria-label="Back to site" className="menu-back" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", color: "var(--ink-400)" }}>
            <Icon name="arrow-left" size={18} color="currentColor" />
          </Link>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-lg)", color: "var(--wine-700)" }}>Menu publisher</span>
        </div>
      </header>

      <main style={{ flex: 1, width: "100%", maxWidth: 620, margin: "0 auto", padding: "var(--space-8) var(--space-6) var(--space-9)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px, 6vw, 44px)", lineHeight: 1.05, color: "var(--wine-700)", margin: 0 }}>
          Update your menu
        </h1>
        <p style={{ fontFamily: "var(--font-editorial)", fontSize: "var(--text-md)", color: "var(--ink-700)", lineHeight: 1.55, margin: "var(--space-4) 0 var(--space-7)", maxWidth: "60ch" }}>
          Edit your menu in Google Sheets anytime — add a flavor, change a description, remove something. Nothing changes on your website until you press <strong>Publish</strong> below.
        </p>

        {/* Step 1 — edit the sheet */}
        <section style={cardStyle}>
          <Step n="1" />
          <div style={{ flex: 1 }}>
            <h2 style={stepHeadStyle}>Edit your menu</h2>
            <p style={stepBodyStyle}>Open your menu sheet, make your changes, and they'll save automatically.</p>
            {SHEET_URL ? (
              <a href={SHEET_URL} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12, borderRadius: 999,
                padding: "11px 20px", background: "var(--white)", border: "2px solid var(--wine-700)",
                color: "var(--wine-700)", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)",
              }}>
                Open my menu sheet
                <Icon name="arrow-right" size={16} color="var(--wine-700)" />
              </a>
            ) : (
              <p style={{ ...stepBodyStyle, color: "var(--ink-400)", marginTop: 10, fontStyle: "italic" }}>
                (Your sheet link will appear here once it's connected.)
              </p>
            )}
          </div>
        </section>

        {/* Step 2 — publish */}
        <section style={{ ...cardStyle, marginTop: "var(--space-5)" }}>
          <Step n="2" />
          <div style={{ flex: 1 }}>
            <h2 style={stepHeadStyle}>Publish it live</h2>
            <p style={stepBodyStyle}>Enter your passphrase and press Publish. Your website updates in about a minute.</p>

            {status === "done" ? (
              <div role="status" style={{
                marginTop: 14, borderRadius: "var(--radius-lg)", padding: "16px 18px",
                background: "var(--leaf-100)", border: "1px solid var(--olive-600)", color: "var(--olive-700)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", fontWeight: 800 }}>
                  <Icon name="check" size={18} color="var(--olive-700)" />
                  Publishing now!
                </div>
                <p style={{ margin: "6px 0 0", fontSize: "var(--text-sm)", lineHeight: 1.5 }}>
                  Give it about a minute, then refresh your menu page to see the changes.
                </p>
                <button onClick={() => setStatus("idle")} style={{
                  marginTop: 12, cursor: "pointer", border: "none", background: "transparent",
                  color: "var(--olive-700)", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)", textDecoration: "underline", padding: 0,
                }}>Publish again</button>
              </div>
            ) : (
              <form onSubmit={publish} style={{ marginTop: 14 }}>
                <label htmlFor="pass" style={{ display: "block", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--ink-700)", marginBottom: 6 }}>
                  Passphrase
                </label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input
                    id="pass" type="password" value={pass} autoComplete="off"
                    onChange={(e) => { setPass(e.target.value); if (status === "error") setStatus("idle"); }}
                    placeholder="Your menu passphrase"
                    style={{
                      flex: "1 1 220px", minWidth: 0, borderRadius: "var(--radius-md)", padding: "12px 14px",
                      border: status === "error" ? "2px solid var(--rose-600)" : "2px solid var(--border-default)",
                      fontFamily: "var(--font-body)", fontSize: "var(--text-md)", color: "var(--ink-900)", background: "var(--white)",
                    }}
                  />
                  <button type="submit" disabled={!pass.trim() || status === "working"} className="btn-wine" style={{
                    cursor: pass.trim() && status !== "working" ? "pointer" : "not-allowed",
                    borderRadius: 999, padding: "12px 26px", border: "none",
                    background: pass.trim() && status !== "working" ? "var(--wine-700)" : "var(--ink-300)",
                    color: "var(--cream-50)", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "var(--text-sm)",
                    display: "inline-flex", alignItems: "center", gap: 9, whiteSpace: "nowrap",
                  }}>
                    {status === "working" ? "Publishing…" : "Publish my menu"}
                    {status !== "working" && <Icon name="arrow-right" size={16} color="var(--cream-50)" />}
                  </button>
                </div>
                {status === "error" && (
                  <p role="alert" style={{ margin: "10px 2px 0", fontSize: "var(--text-sm)", color: "var(--rose-600)", fontWeight: 700 }}>{message}</p>
                )}
              </form>
            )}
          </div>
        </section>

        <p style={{ marginTop: "var(--space-7)", fontSize: "var(--text-sm)", color: "var(--ink-500)", lineHeight: 1.55, textAlign: "center" }}>
          Prices never appear on the website — your menu shows items only.
        </p>
      </main>
    </div>
  );
}

const cardStyle = {
  display: "flex", gap: "var(--space-4)", alignItems: "flex-start",
  background: "var(--white)", border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: "var(--space-5) var(--space-6)",
};
const stepHeadStyle = { margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-xl)", color: "var(--wine-700)" };
const stepBodyStyle = { margin: "4px 0 0", fontFamily: "var(--font-editorial)", fontSize: "var(--text-sm)", color: "var(--ink-700)", lineHeight: 1.5 };

function Step({ n }) {
  return (
    <span aria-hidden style={{
      flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: "var(--wine-700)", color: "var(--lime-400)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-md)",
    }}>{n}</span>
  );
}
