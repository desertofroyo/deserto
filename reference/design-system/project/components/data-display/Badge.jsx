import React from "react";

/**
 * Deserto Badge — compact status/label pill.
 * Tones map to the brand palette + semantic feedback colors.
 */
export function Badge({ children, tone = "wine", variant = "soft", style = {}, ...rest }) {
  const tones = {
    wine:   { solid: ["var(--wine-700)", "#fff"],      soft: ["var(--wine-100)", "var(--wine-700)"] },
    mauve:  { solid: ["var(--mauve-600)", "#fff"],     soft: ["var(--mauve-100)", "var(--mauve-700)"] },
    rose:   { solid: ["var(--rose-500)", "var(--wine-900)"], soft: ["var(--rose-100)", "var(--rose-700)"] },
    sage:   { solid: ["var(--sage-700)", "#fff"],      soft: ["var(--sage-100)", "var(--sage-800)"] },
    amber:  { solid: ["var(--amber-500)", "var(--wine-900)"], soft: ["var(--amber-100)", "var(--amber-600)"] },
    coffee: { solid: ["var(--coffee-600)", "#fff"],    soft: ["#EDE0D6", "var(--coffee-700)"] },
    neutral:{ solid: ["var(--ink-700)", "#fff"],       soft: ["var(--sand-100)", "var(--ink-700)"] },
  };
  // legacy tone aliases
  tones.orange = tones.rose;
  tones.olive = tones.sage;
  const t = tones[tone] || tones.wine;
  const [bg, fg] = variant === "solid" ? t.solid : t.soft;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 10px",
        background: bg,
        color: fg,
        fontFamily: "var(--font-body)",
        fontWeight: "var(--fw-bold)",
        fontSize: "var(--text-xs)",
        lineHeight: 1.4,
        letterSpacing: "0.02em",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
