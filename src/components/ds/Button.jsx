import React from "react";

/**
 * Deserto Button — pill-shaped, warm, tactile.
 * Variants: primary (wine), accent (orange), secondary (tinted), ghost, outline.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "var(--text-sm)", gap: "6px" },
    md: { padding: "12px 22px", fontSize: "var(--text-base)", gap: "8px" },
    lg: { padding: "15px 30px", fontSize: "var(--text-md)", gap: "10px" },
  };

  const variants = {
    primary: {
      background: "var(--wine-700)",
      color: "var(--text-on-brand)",
      border: "1px solid transparent",
      "--hover-bg": "var(--wine-800)",
    },
    accent: {
      background: "var(--orange-500)",
      color: "var(--wine-900)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-accent)",
      "--hover-bg": "var(--orange-600)",
    },
    secondary: {
      background: "var(--wine-100)",
      color: "var(--wine-700)",
      border: "1px solid transparent",
      "--hover-bg": "var(--wine-200)",
    },
    outline: {
      background: "transparent",
      color: "var(--wine-700)",
      border: "1.5px solid var(--wine-700)",
      "--hover-bg": "var(--wine-100)",
    },
    ghost: {
      background: "transparent",
      color: "var(--wine-700)",
      border: "1px solid transparent",
      "--hover-bg": "var(--sand-100)",
    },
  };

  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        width: fullWidth ? "100%" : "auto",
        padding: s.padding,
        fontFamily: "var(--font-body)",
        fontWeight: "var(--fw-bold)",
        fontSize: s.fontSize,
        lineHeight: 1,
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
        borderRadius: "var(--radius-pill)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out-expo)",
        transform: press && !disabled ? "scale(0.97)" : "scale(1)",
        background: hover && !disabled ? v["--hover-bg"] : v.background,
        color: v.color,
        border: v.border,
        boxShadow: v.boxShadow || "none",
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
