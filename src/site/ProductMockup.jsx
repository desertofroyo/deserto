import React from "react";

/* Deserto — illustrated, on-brand product mockups (SVG/CSS, no photo needed).
   Renders a branded vessel (can / cup / cone / latte) tinted to the flavor,
   with the wordmark, fruit accents, and the brand peach backdrop — the same
   visual language as the "Spring Sips" studio asset, but vector and themeable.

   Usage:
     <ProductMockup kind="can" color="#B16E74" name="Raspberry Tonic" accent="#762F35" fruit="berry" />
*/

const WORDMARK = "DESERTO";

function uid(prefix, id) {
  return `${prefix}-${id}`.replace(/:/g, "");
}

/* --- a small cluster of fruit garnish at the top of a drink --- */
function Fruit({ kind, color }) {
  if (!kind) return null;
  const dots =
    kind === "berry"
      ? [[88, 96], [100, 90], [112, 96], [96, 104], [108, 104]]
      : kind === "citrus"
      ? [[92, 94], [108, 94]]
      : [[90, 96], [110, 96], [100, 90]];
  return (
    <g>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={kind === "citrus" ? 9 : 6.5} fill={color} stroke="rgba(0,0,0,0.08)" />
      ))}
    </g>
  );
}

/* --- a soft-serve swirl (cup & cone share it) --- */
function Swirl({ color, accent }) {
  return (
    <g>
      <ellipse cx="100" cy="150" rx="46" ry="20" fill={color} />
      <ellipse cx="100" cy="132" rx="38" ry="18" fill={color} />
      <ellipse cx="100" cy="116" rx="29" ry="15" fill={color} />
      <ellipse cx="100" cy="103" rx="19" ry="11" fill={color} />
      <ellipse cx="100" cy="94" rx="9" ry="7" fill={color} />
      {/* highlight + topping dot */}
      <ellipse cx="86" cy="120" rx="7" ry="14" fill="#fff" opacity="0.18" />
      <circle cx="100" cy="86" r="6" fill={accent} />
    </g>
  );
}

export function ProductMockup({
  kind = "can",
  color = "var(--rose-500)",
  accent = "var(--wine-700)",
  fruit = null,
  name,
  backdrop = "linear-gradient(160deg, var(--peach-100), var(--orange-100))",
  radius = "var(--radius-xl)",
  style = {},
}) {
  const id = React.useId();
  const sheen = uid("sheen", id);
  const shade = uid("shade", id);

  let vessel;
  if (kind === "can") {
    vessel = (
      <g>
        {/* body */}
        <rect x="46" y="70" width="108" height="208" rx="22" fill={color} />
        <rect x="46" y="70" width="108" height="208" rx="22" fill={`url(#${sheen})`} />
        <rect x="46" y="70" width="108" height="208" rx="22" fill={`url(#${shade})`} />
        {/* lid */}
        <ellipse cx="100" cy="70" rx="54" ry="13" fill="#cfcdca" />
        <ellipse cx="100" cy="68" rx="54" ry="13" fill="#e6e4e1" />
        <ellipse cx="100" cy="68" rx="44" ry="9" fill="#bcbab7" />
        <rect x="92" y="62" width="16" height="6" rx="3" fill="#9b9996" />
        {/* fizz fruit */}
        <Fruit kind={fruit} color={accent} />
        {/* wordmark */}
        <text x="100" y="206" textAnchor="middle" fill={accent} opacity="0.92"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, letterSpacing: "0.12em" }}>
          {WORDMARK}
        </text>
        <text x="100" y="222" textAnchor="middle" fill={accent} opacity="0.6"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 7, letterSpacing: "0.18em" }}>
          FROZEN YOGURT &amp; CAFÉ
        </text>
      </g>
    );
  } else if (kind === "cup") {
    vessel = (
      <g>
        {/* cup body (tapered) */}
        <path d="M58 156 L142 156 L132 286 Q131 294 123 294 L77 294 Q69 294 68 286 Z" fill="#fff" stroke="var(--border-default)" strokeWidth="1.5" />
        <path d="M58 156 L142 156 L139 196 L61 196 Z" fill={accent} opacity="0.92" />
        <text x="100" y="182" textAnchor="middle" fill="#fff"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, letterSpacing: "0.1em" }}>
          {WORDMARK}
        </text>
        <Swirl color={color} accent={accent} />
      </g>
    );
  } else if (kind === "cone") {
    vessel = (
      <g>
        {/* waffle cone */}
        <path d="M72 158 L128 158 L100 300 Z" fill="#d8a25a" />
        <path d="M72 158 L128 158 L100 300 Z" fill={`url(#${shade})`} />
        {/* lattice */}
        <g stroke="#b8823f" strokeWidth="1.4" opacity="0.7">
          {[0, 1, 2, 3, 4].map((i) => <line key={"a" + i} x1={74 + i * 13} y1="160" x2={100} y2={300} />)}
          {[0, 1, 2, 3, 4].map((i) => <line key={"b" + i} x1={126 - i * 13} y1="160" x2={100} y2={300} />)}
        </g>
        <Swirl color={color} accent={accent} />
      </g>
    );
  } else {
    /* latte glass */
    vessel = (
      <g>
        <path d="M64 78 L136 78 L128 286 Q127 294 119 294 L81 294 Q73 294 72 286 Z" fill={color} opacity="0.25" />
        {/* coffee + foam layers */}
        <path d="M66 150 L134 150 L128 286 Q127 294 119 294 L81 294 Q73 294 72 286 Z" fill={color} />
        <path d="M66 150 L134 150 L132 178 L68 178 Z" fill="#f3e6d4" />
        <rect x="64" y="78" width="72" height="216" rx="10" fill={`url(#${sheen})`} />
        {/* ice cubes */}
        <rect x="80" y="158" width="22" height="22" rx="5" fill="#fff" opacity="0.32" transform="rotate(12 91 169)" />
        <rect x="104" y="186" width="20" height="20" rx="5" fill="#fff" opacity="0.28" transform="rotate(-10 114 196)" />
        {/* straw */}
        <rect x="112" y="56" width="7" height="150" rx="3.5" fill={accent} transform="rotate(8 115 130)" />
      </g>
    );
  }

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "1 / 1", borderRadius: radius,
      background: backdrop, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", ...style,
    }}>
      <svg viewBox="0 0 200 340" width="78%" height="78%" role="img" aria-label={name || "Deserto product"}
        style={{ filter: "drop-shadow(0 16px 22px rgba(58,12,20,0.20))" }}>
        <defs>
          <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0.42" />
            <stop offset="0.28" stopColor="#fff" stopOpacity="0.06" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.20" />
          </linearGradient>
        </defs>
        {vessel}
      </svg>
      {name && (
        <span style={{
          position: "absolute", left: 14, bottom: 14, background: accent, color: "var(--cream-50)",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-xs)", letterSpacing: "0.02em",
          padding: "6px 12px", borderRadius: 999, boxShadow: "var(--shadow-sm)", maxWidth: "78%",
        }}>{name}</span>
      )}
    </div>
  );
}
