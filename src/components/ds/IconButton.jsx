import React from "react";

/**
 * Deserto IconButton — square/circular button for a single icon.
 * Pass a Lucide (or any) icon node as children.
 */
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  round = true,
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  ...rest
}) {
  const dims = { sm: 32, md: 40, lg: 48 };
  const d = dims[size] || dims.md;

  const variants = {
    primary: { background: "var(--wine-700)", color: "var(--text-on-brand)", "--hover-bg": "var(--wine-800)", border: "1px solid transparent" },
    accent: { background: "var(--orange-500)", color: "var(--wine-900)", "--hover-bg": "var(--orange-600)", border: "1px solid transparent" },
    soft: { background: "var(--wine-100)", color: "var(--wine-700)", "--hover-bg": "var(--wine-200)", border: "1px solid transparent" },
    ghost: { background: "transparent", color: "var(--ink-700)", "--hover-bg": "var(--sand-100)", border: "1px solid transparent" },
    outline: { background: "transparent", color: "var(--wine-700)", "--hover-bg": "var(--wine-100)", border: "1px solid var(--border-default)" },
  };
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: d,
        height: d,
        borderRadius: round ? "var(--radius-pill)" : "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        background: hover && !disabled ? v["--hover-bg"] : v.background,
        color: v.color,
        border: v.border,
        transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out-expo)",
        transform: press && !disabled ? "scale(0.92)" : "scale(1)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
