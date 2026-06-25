import React from "react";

/**
 * Deserto Card — warm surface container. Soft radius, cocoa-tinted shadow.
 * Optional top media, hover lift, and clickable affordance.
 */
export function Card({
  children,
  media = null,
  padding = "var(--space-5)",
  elevation = "sm",
  interactive = false,
  style = {},
  ...rest
}) {
  const shadows = {
    none: "none",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
  };
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: hover ? "var(--shadow-lg)" : shadows[elevation],
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {media && <div style={{ width: "100%", lineHeight: 0 }}>{media}</div>}
      <div style={{ padding }}>{children}</div>
    </div>
  );
}
