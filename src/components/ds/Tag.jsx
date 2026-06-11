import React from "react";

/**
 * Deserto Tag / Chip — selectable filter or topping chip.
 * Selected = wine fill; optional removable × ; optional leading dot.
 */
export function Tag({
  children,
  selected = false,
  removable = false,
  onRemove,
  dotColor,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "6px 13px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-body)",
        fontWeight: "var(--fw-bold)",
        fontSize: "var(--text-sm)",
        cursor: onClick ? "pointer" : "default",
        border: `1.5px solid ${selected ? "var(--wine-700)" : "var(--border-default)"}`,
        background: selected ? "var(--wine-700)" : hover && onClick ? "var(--sand-100)" : "var(--white)",
        color: selected ? "var(--text-on-brand)" : "var(--ink-700)",
        transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      {dotColor && (
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, flex: "none" }} />
      )}
      {children}
      {removable && (
        <button
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }}
          style={{
            display: "inline-flex",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "inherit",
            opacity: 0.7,
            padding: 0,
            marginRight: -2,
            fontSize: "14px",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
