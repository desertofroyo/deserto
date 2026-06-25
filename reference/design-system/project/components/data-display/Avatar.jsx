import React from "react";

/**
 * Deserto Avatar — circular, with image or initials fallback on a warm tint.
 */
export function Avatar({ src, name = "", size = 40, tone = "wine", style = {}, ...rest }) {
  const tones = {
    wine: ["var(--wine-100)", "var(--wine-700)"],
    mauve: ["var(--mauve-100)", "var(--mauve-700)"],
    rose: ["var(--rose-100)", "var(--rose-700)"],
    sage: ["var(--sage-100)", "var(--sage-800)"],
    coffee: ["#EDE0D6", "var(--coffee-700)"],
  };
  tones.orange = tones.rose;
  tones.olive = tones.sage;
  const [bg, fg] = tones[tone] || tones.wine;
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flex: "none",
        borderRadius: "50%",
        overflow: "hidden",
        background: bg,
        color: fg,
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-bold)",
        fontSize: size * 0.38,
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || "?"
      )}
    </span>
  );
}
