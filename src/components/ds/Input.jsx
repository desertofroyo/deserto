import React from "react";

/**
 * Deserto Input — warm field with soft radius and an orange focus ring.
 * Optional label, helper/error text, and leading/trailing adornments.
 */
export function Input({
  label,
  helperText,
  error,
  leading = null,
  trailing = null,
  size = "md",
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const inputId = id || reactId;
  const pads = { sm: "9px 12px", md: "12px 14px", lg: "15px 16px" };
  const fonts = { sm: "var(--text-sm)", md: "var(--text-base)", lg: "var(--text-md)" };

  const borderColor = error
    ? "var(--danger)"
    : focus
    ? "var(--orange-500)"
    : "var(--border-default)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--fw-bold)",
            fontSize: "var(--text-sm)",
            color: "var(--ink-700)",
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--white)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          padding: pads[size] || pads.md,
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
          boxShadow: focus ? "0 0 0 3px rgba(255,148,37,0.18)" : "none",
        }}
      >
        {leading && <span style={{ display: "inline-flex", color: "var(--text-muted)" }}>{leading}</span>}
        <input
          id={inputId}
          onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
          {...rest}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-body)",
            fontSize: fonts[size] || fonts.md,
            color: "var(--ink-900)",
            width: "100%",
            minWidth: 0,
          }}
        />
        {trailing && <span style={{ display: "inline-flex", color: "var(--text-muted)" }}>{trailing}</span>}
      </div>
      {(helperText || error) && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: error ? "var(--danger)" : "var(--text-muted)",
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}
