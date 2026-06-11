import React from "react";

/**
 * Deserto Switch — pill toggle. On = orange, with a springy knob.
 */
export function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  id,
  style = {},
}) {
  const reactId = React.useId();
  const sid = id || reactId;
  const dims = {
    sm: { w: 36, h: 20, k: 14 },
    md: { w: 46, h: 26, k: 20 },
  };
  const d = dims[size] || dims.md;
  const pad = (d.h - d.k) / 2;

  const toggle = () => { if (!disabled && onChange) onChange(!checked); };

  const sw = (
    <button
      id={sid}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      style={{
        position: "relative",
        width: d.w,
        height: d.h,
        flex: "none",
        borderRadius: "var(--radius-pill)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: checked ? "var(--orange-500)" : "var(--ink-300)",
        transition: "background var(--dur-base) var(--ease-out)",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: pad,
          left: checked ? d.w - d.k - pad : pad,
          width: d.k,
          height: d.k,
          borderRadius: "50%",
          background: "var(--white)",
          boxShadow: "var(--shadow-sm)",
          transition: "left var(--dur-base) var(--ease-bounce)",
        }}
      />
    </button>
  );

  if (!label) return <span style={style}>{sw}</span>;
  return (
    <label htmlFor={sid} style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: disabled ? "not-allowed" : "pointer", ...style }}>
      {sw}
      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--ink-700)" }}>{label}</span>
    </label>
  );
}
