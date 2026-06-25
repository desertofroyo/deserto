/* @ds-bundle: {"format":3,"namespace":"DesertoDesignSystem_e4c2c1","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"0dadc3a7cbf0","components/actions/IconButton.jsx":"ba537bc40859","components/data-display/Avatar.jsx":"6de062c68248","components/data-display/Badge.jsx":"35cb92e47f62","components/data-display/Card.jsx":"35776122486b","components/data-display/Tag.jsx":"ba59c70cf0bc","components/forms/Input.jsx":"28edb891c8e1","components/forms/Switch.jsx":"134782ed7111","ui_kits/app/app-data.jsx":"eadb8a7731dc","ui_kits/app/app-main.jsx":"69f781d47e98","ui_kits/app/app-parts.jsx":"885fd2f1966f","ui_kits/app/app-screens.jsx":"9c3851d3fe20","ui_kits/website/site-app.jsx":"3135a78c2594","ui_kits/website/site-build.jsx":"1c18ddb7f3b1","ui_kits/website/site-data.jsx":"a9805c6b2764","ui_kits/website/site-hero.jsx":"2b6c22594a00","ui_kits/website/site-order.jsx":"894206749062","ui_kits/website/site-parts.jsx":"6da09d10fc75","ui_kits/website/site-story.jsx":"68891ffa175d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesertoDesignSystem_e4c2c1 = window.DesertoDesignSystem_e4c2c1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Deserto Button — pill-shaped, warm, tactile.
 * Variants: primary (wine), accent (orange), secondary (tinted), ghost, outline.
 */
function Button({
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
    sm: {
      padding: "8px 16px",
      fontSize: "var(--text-sm)",
      gap: "6px"
    },
    md: {
      padding: "12px 22px",
      fontSize: "var(--text-base)",
      gap: "8px"
    },
    lg: {
      padding: "15px 30px",
      fontSize: "var(--text-md)",
      gap: "10px"
    }
  };
  const variants = {
    primary: {
      background: "var(--wine-700)",
      color: "var(--text-on-brand)",
      border: "1px solid transparent",
      "--hover-bg": "var(--wine-800)"
    },
    accent: {
      background: "var(--orange-500)",
      color: "var(--wine-900)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-accent)",
      "--hover-bg": "var(--orange-600)"
    },
    secondary: {
      background: "var(--wine-100)",
      color: "var(--wine-700)",
      border: "1px solid transparent",
      "--hover-bg": "var(--wine-200)"
    },
    outline: {
      background: "transparent",
      color: "var(--wine-700)",
      border: "1.5px solid var(--wine-700)",
      "--hover-bg": "var(--wine-100)"
    },
    ghost: {
      background: "transparent",
      color: "var(--wine-700)",
      border: "1px solid transparent",
      "--hover-bg": "var(--sand-100)"
    }
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
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
      transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-bounce)",
      transform: press && !disabled ? "scale(0.97)" : "scale(1)",
      background: hover && !disabled ? v["--hover-bg"] : v.background,
      color: v.color,
      border: v.border,
      boxShadow: v.boxShadow || "none",
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Deserto IconButton — square/circular button for a single icon.
 * Pass a Lucide (or any) icon node as children.
 */
function IconButton({
  children,
  variant = "ghost",
  size = "md",
  round = true,
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const d = dims[size] || dims.md;
  const variants = {
    primary: {
      background: "var(--wine-700)",
      color: "var(--text-on-brand)",
      "--hover-bg": "var(--wine-800)",
      border: "1px solid transparent"
    },
    accent: {
      background: "var(--orange-500)",
      color: "var(--wine-900)",
      "--hover-bg": "var(--orange-600)",
      border: "1px solid transparent"
    },
    soft: {
      background: "var(--wine-100)",
      color: "var(--wine-700)",
      "--hover-bg": "var(--wine-200)",
      border: "1px solid transparent"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-700)",
      "--hover-bg": "var(--sand-100)",
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--wine-700)",
      "--hover-bg": "var(--wine-100)",
      border: "1px solid var(--border-default)"
    }
  };
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
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
      transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-bounce)",
      transform: press && !disabled ? "scale(0.92)" : "scale(1)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Deserto Avatar — circular, with image or initials fallback on a warm tint.
 */
function Avatar({
  src,
  name = "",
  size = 40,
  tone = "wine",
  style = {},
  ...rest
}) {
  const tones = {
    wine: ["var(--wine-100)", "var(--wine-700)"],
    mauve: ["var(--mauve-100)", "var(--mauve-700)"],
    rose: ["var(--rose-100)", "var(--rose-700)"],
    sage: ["var(--sage-100)", "var(--sage-800)"],
    coffee: ["#EDE0D6", "var(--coffee-700)"]
  };
  tones.orange = tones.rose;
  tones.olive = tones.sage;
  const [bg, fg] = tones[tone] || tones.wine;
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "?");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Deserto Badge — compact status/label pill.
 * Tones map to the brand palette + semantic feedback colors.
 */
function Badge({
  children,
  tone = "wine",
  variant = "soft",
  style = {},
  ...rest
}) {
  const tones = {
    wine: {
      solid: ["var(--wine-700)", "#fff"],
      soft: ["var(--wine-100)", "var(--wine-700)"]
    },
    mauve: {
      solid: ["var(--mauve-600)", "#fff"],
      soft: ["var(--mauve-100)", "var(--mauve-700)"]
    },
    rose: {
      solid: ["var(--rose-500)", "var(--wine-900)"],
      soft: ["var(--rose-100)", "var(--rose-700)"]
    },
    sage: {
      solid: ["var(--sage-700)", "#fff"],
      soft: ["var(--sage-100)", "var(--sage-800)"]
    },
    amber: {
      solid: ["var(--amber-500)", "var(--wine-900)"],
      soft: ["var(--amber-100)", "var(--amber-600)"]
    },
    coffee: {
      solid: ["var(--coffee-600)", "#fff"],
      soft: ["#EDE0D6", "var(--coffee-700)"]
    },
    neutral: {
      solid: ["var(--ink-700)", "#fff"],
      soft: ["var(--sand-100)", "var(--ink-700)"]
    }
  };
  // legacy tone aliases
  tones.orange = tones.rose;
  tones.olive = tones.sage;
  const t = tones[tone] || tones.wine;
  const [bg, fg] = variant === "solid" ? t.solid : t.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Deserto Card — warm surface container. Soft radius, cocoa-tinted shadow.
 * Optional top media, hover lift, and clickable affordance.
 */
function Card({
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
    lg: "var(--shadow-lg)"
  };
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: hover ? "var(--shadow-lg)" : shadows[elevation],
      transform: hover ? "translateY(-3px)" : "translateY(0)",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), media && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      lineHeight: 0
    }
  }, media), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Deserto Tag / Chip — selectable filter or topping chip.
 * Selected = wine fill; optional removable × ; optional leading dot.
 */
function Tag({
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
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, rest), dotColor && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: dotColor,
      flex: "none"
    }
  }), children, removable && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove();
    },
    style: {
      display: "inline-flex",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "inherit",
      opacity: 0.7,
      padding: 0,
      marginRight: -2,
      fontSize: "14px",
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Deserto Input — warm field with soft radius and an orange focus ring.
 * Optional label, helper/error text, and leading/trailing adornments.
 */
function Input({
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
  const pads = {
    sm: "9px 12px",
    md: "12px 14px",
    lg: "15px 16px"
  };
  const fonts = {
    sm: "var(--text-sm)",
    md: "var(--text-base)",
    lg: "var(--text-md)"
  };
  const borderColor = error ? "var(--danger)" : focus ? "var(--orange-500)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: "100%",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--text-sm)",
      color: "var(--ink-700)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "var(--white)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      padding: pads[size] || pads.md,
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
      boxShadow: focus ? "0 0 0 3px rgba(255,148,37,0.18)" : "none"
    }
  }, leading && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-muted)"
    }
  }, leading), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: fonts[size] || fonts.md,
      color: "var(--ink-900)",
      width: "100%",
      minWidth: 0
    }
  })), trailing && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-muted)"
    }
  }, trailing)), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      color: error ? "var(--danger)" : "var(--text-muted)"
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Deserto Switch — pill toggle. On = orange, with a springy knob.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  id,
  style = {}
}) {
  const reactId = React.useId();
  const sid = id || reactId;
  const dims = {
    sm: {
      w: 36,
      h: 20,
      k: 14
    },
    md: {
      w: 46,
      h: 26,
      k: 20
    }
  };
  const d = dims[size] || dims.md;
  const pad = (d.h - d.k) / 2;
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  const sw = /*#__PURE__*/React.createElement("button", {
    id: sid,
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: toggle,
    style: {
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
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: pad,
      left: checked ? d.w - d.k - pad : pad,
      width: d.k,
      height: d.k,
      borderRadius: "50%",
      background: "var(--white)",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--dur-base) var(--ease-bounce)"
    }
  }));
  if (!label) return /*#__PURE__*/React.createElement("span", {
    style: style
  }, sw);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: sid,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, sw, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--ink-700)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app-data.jsx
try { (() => {
/* Deserto app — sample content. Global: window.APP */
window.APP = {
  user: {
    name: "Ana",
    points: 240,
    nextReward: 300
  },
  categories: [{
    key: "Froyo",
    icon: "ice-cream-bowl",
    tone: {
      soft: "var(--rose-100)",
      solid: "var(--rose-500)",
      ink: "var(--rose-700)",
      onSolid: "var(--cream-50)"
    }
  }, {
    key: "Refreshers",
    icon: "cup-soda",
    tone: {
      soft: "var(--orange-100)",
      solid: "var(--orange-500)",
      ink: "var(--orange-700)",
      onSolid: "var(--wine-900)"
    }
  }, {
    key: "Coffee",
    icon: "coffee",
    tone: {
      soft: "var(--caramel-100)",
      solid: "var(--caramel-500)",
      ink: "var(--caramel-600)",
      onSolid: "var(--cream-50)"
    }
  }, {
    key: "Treats",
    icon: "cookie",
    tone: {
      soft: "var(--olive-100)",
      solid: "var(--olive-600)",
      ink: "var(--olive-700)",
      onSolid: "var(--cream-50)"
    }
  }],
  featured: [{
    id: 1,
    name: "Taro Swirl",
    price: 6.5,
    cal: 240,
    img: "froyo-cup-mauve.jpg",
    pos: "center 35%",
    tag: "Popular"
  }, {
    id: 2,
    name: "Strawberry Refresher",
    price: 5.5,
    cal: 130,
    img: "strawberry-flatlay.jpg",
    pos: "center 35%",
    tag: "Vegan"
  }, {
    id: 3,
    name: "Iced Horchata Latte",
    price: 5.5,
    cal: 180,
    img: "tulips-drinks.jpg",
    pos: "right center",
    tag: "New"
  }],
  bases: [{
    key: "Tart original",
    tint: "var(--olive-500)"
  }, {
    key: "Taro",
    tint: "var(--wine-500)"
  }, {
    key: "Strawberry",
    tint: "var(--rose-500)"
  }, {
    key: "Vanilla bean",
    tint: "var(--orange-400)"
  }],
  toppings: ["Fresh strawberries", "Granola", "Mochi", "Toasted coconut", "Honey drizzle", "Dark chocolate", "Pistachio", "Boba", "Fresh blueberries"],
  sizes: [{
    key: "Regular",
    add: 0
  }, {
    key: "Large",
    add: 1.5
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app-data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app-main.jsx
try { (() => {
/* Deserto app — flow controller & mount. */
(function () {
  const {
    Phone,
    TabBar,
    Welcome,
    Home,
    Build,
    Bag,
    Rewards,
    Confirm
  } = window.AppKit;
  function App() {
    const [screen, setScreen] = React.useState("welcome"); // welcome | main
    const [tab, setTab] = React.useState("home"); // home | rewards | bag
    const [overlay, setOverlay] = React.useState(null); // null | build | confirm
    const [product, setProduct] = React.useState(null);
    const [bag, setBag] = React.useState([]);
    const openBuild = (p = null) => {
      setProduct(p);
      setOverlay("build");
    };
    const addItem = item => {
      setBag(b => [...b, item]);
      setOverlay(null);
      setProduct(null);
      setTab("bag");
    };
    const checkout = () => {
      setOverlay("confirm");
      setBag([]);
    };
    let content;
    if (screen === "welcome") {
      content = /*#__PURE__*/React.createElement(Welcome, {
        onContinue: () => setScreen("main")
      });
    } else if (overlay === "build") {
      content = /*#__PURE__*/React.createElement(Build, {
        product: product,
        onBack: () => setOverlay(null),
        onAdd: addItem
      });
    } else if (overlay === "confirm") {
      content = /*#__PURE__*/React.createElement(Confirm, {
        onDone: () => {
          setOverlay(null);
          setTab("home");
        }
      });
    } else {
      content = /*#__PURE__*/React.createElement(React.Fragment, null, tab === "home" && /*#__PURE__*/React.createElement(Home, {
        onBuild: () => openBuild(null),
        onOpenProduct: p => openBuild(p)
      }), tab === "rewards" && /*#__PURE__*/React.createElement(Rewards, null), tab === "bag" && /*#__PURE__*/React.createElement(Bag, {
        items: bag,
        onRemove: i => setBag(b => b.filter((_, idx) => idx !== i)),
        onCheckout: checkout,
        onBrowse: () => setTab("home")
      }), /*#__PURE__*/React.createElement(TabBar, {
        tab: tab,
        setTab: setTab,
        bagCount: bag.length
      }));
    }
    return /*#__PURE__*/React.createElement(Phone, null, content);
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app-main.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app-parts.jsx
try { (() => {
/* Deserto app — shell parts. Exposes Icon, Photo, Phone, StatusBar, TabBar. */
const NS = window.DesertoDesignSystem_e4c2c1;
const ISO = "../../assets/logos/deserto-isotype.png";
const ISO_W = "../../assets/logos/deserto-isotype-white.png";
const IMG = "../../assets/images/";
function Icon({
  name,
  size = 22,
  color = "currentColor",
  strokeWidth = 2
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          stroke: color,
          "stroke-width": strokeWidth
        }
      });
    }
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      lineHeight: 0
    }
  });
}
function Photo({
  src,
  tint = "var(--peach-100)",
  label,
  height = "100%",
  radius = 0,
  iso = 0.16,
  pos = "center",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      width: "100%",
      background: tint,
      borderRadius: radius,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: IMG + src,
    alt: label || "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: pos
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: ISO,
    alt: "",
    style: {
      height: "44%",
      opacity: iso,
      filter: "saturate(0.6)"
    }
  }));
}
function StatusBar({
  dark = false
}) {
  const c = dark ? "var(--cream-50)" : "var(--ink-900)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 22px",
      flex: "none",
      color: c
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      fontFamily: "var(--font-body)"
    }
  }, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 16,
    color: c
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "wifi",
    size: 16,
    color: c
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "battery-full",
    size: 18,
    color: c
  })));
}
function TabBar({
  tab,
  setTab,
  bagCount
}) {
  const tabs = [["home", "Home"], ["rewards", "Rewards"], ["bag", "Bag"]];
  const icons = {
    home: "house",
    rewards: "gift",
    bag: "shopping-bag"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      borderTop: "1px solid var(--border-default)",
      background: "var(--white)",
      padding: "8px 10px 18px"
    }
  }, tabs.map(([k, label]) => {
    const on = tab === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setTab(k),
      style: {
        flex: 1,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        color: on ? "var(--cream-50)" : "var(--ink-400)",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 34,
        borderRadius: 99,
        background: on ? "var(--wine-700)" : "transparent",
        transition: "background var(--dur-fast)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icons[k],
      size: 22,
      color: on ? "var(--cream-50)" : "var(--ink-400)",
      strokeWidth: on ? 2.4 : 2
    }), k === "bag" && bagCount > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: -4,
        right: 4,
        minWidth: 16,
        height: 16,
        padding: "0 3px",
        background: "var(--orange-500)",
        color: "var(--wine-900)",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid var(--white)"
      }
    }, bagCount)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: on ? "var(--wine-700)" : "var(--ink-400)"
      }
    }, label));
  }));
}

/* Phone shell — 390x844, rounded, drop shadow on a warm backdrop. */
function Phone({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "radial-gradient(120% 80% at 50% 0%, var(--sand-200), var(--cream-50))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      background: "var(--surface-page)",
      borderRadius: 44,
      boxShadow: "var(--shadow-xl), 0 0 0 11px #1a1412, 0 0 0 13px #2c2320",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, children));
}
window.AppKit = Object.assign(window.AppKit || {}, {
  Icon,
  Photo,
  StatusBar,
  TabBar,
  Phone,
  ISO,
  ISO_W
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app-parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app-screens.jsx
try { (() => {
/* Deserto app — screens. Exposes Welcome, Home, Build, Bag, Rewards, Confirm. */
(function () {
  const NS = window.DesertoDesignSystem_e4c2c1;
  const {
    Icon,
    Photo,
    StatusBar,
    TabBar,
    ISO,
    ISO_W
  } = window.AppKit;
  const money = n => "$" + n.toFixed(2);

  /* ---------- Welcome / Login ---------- */
  function Welcome({
    onContinue
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "var(--wine-700)",
        color: "var(--cream-50)"
      }
    }, /*#__PURE__*/React.createElement(StatusBar, {
      dark: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 32px",
        textAlign: "center",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: ISO,
      alt: "",
      style: {
        position: "absolute",
        top: -10,
        right: -40,
        height: 320,
        opacity: 0.08
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: ISO_W,
      alt: "Deserto",
      style: {
        height: 96
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: ".04em",
        marginTop: 18
      }
    }, "DESERTO"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-editorial)",
        fontSize: 17,
        color: "var(--lime-400)",
        marginTop: 4
      }
    }, "Mi gusto, mi estilo.")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 24px 40px",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(255,255,255,0.12)",
        borderRadius: "var(--radius-pill)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 18px"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18,
      color: "var(--wine-200)"
    }), /*#__PURE__*/React.createElement("input", {
      placeholder: "Phone number",
      style: {
        flex: 1,
        border: "none",
        background: "transparent",
        color: "var(--cream-50)",
        fontFamily: "var(--font-body)",
        fontSize: 16,
        outline: "none"
      }
    })), /*#__PURE__*/React.createElement(NS.Button, {
      variant: "accent",
      size: "lg",
      fullWidth: true,
      onClick: onContinue
    }, "Continue"), /*#__PURE__*/React.createElement("button", {
      onClick: onContinue,
      style: {
        border: "none",
        background: "transparent",
        color: "var(--wine-200)",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        padding: 8
      }
    }, "Continue as guest")));
  }

  /* ---------- Home ---------- */
  function Home({
    onBuild,
    onOpenProduct
  }) {
    const {
      user,
      categories,
      featured
    } = window.APP;
    const [cat, setCat] = React.useState(categories[0].key);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "4px 22px 20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "var(--text-muted)",
        fontSize: 14
      }
    }, "Hola,"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 26,
        color: "var(--ink-900)"
      }
    }, user.name)), /*#__PURE__*/React.createElement(NS.Avatar, {
      name: user.name,
      tone: "rose",
      size: 46
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        background: "var(--white)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-pill)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18,
      color: "var(--text-muted)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)",
        fontSize: 15
      }
    }, "Search froyo, coffee\u2026")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        background: "var(--wine-700)",
        borderRadius: "var(--radius-xl)",
        padding: 18,
        color: "var(--cream-50)",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: ISO,
      alt: "",
      style: {
        position: "absolute",
        right: -20,
        bottom: -30,
        height: 150,
        opacity: 0.12
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 14,
        color: "var(--lime-400)",
        letterSpacing: ".02em"
      }
    }, "Deserto Rewards"), /*#__PURE__*/React.createElement(NS.Badge, {
      tone: "orange",
      variant: "solid"
    }, user.points, " pts")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 19
      }
    }, user.nextReward - user.points, " pts to a free froyo"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        height: 8,
        background: "rgba(255,255,255,0.18)",
        borderRadius: 99
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: user.points / user.nextReward * 100 + "%",
        height: "100%",
        background: "var(--lime-500)",
        borderRadius: 99
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 18,
        overflowX: "auto",
        paddingBottom: 4
      }
    }, categories.map(c => {
      const on = cat === c.key;
      const t = c.tone;
      return /*#__PURE__*/React.createElement("button", {
        key: c.key,
        onClick: () => setCat(c.key),
        style: {
          flex: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 7,
          cursor: "pointer",
          border: "none",
          background: "transparent"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 58,
          height: 58,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: t.solid,
          transform: on ? "scale(1.05)" : "none",
          boxShadow: on ? "0 0 0 3px var(--surface-page), 0 0 0 5px " + t.solid : "var(--shadow-xs)",
          opacity: on ? 1 : 0.9,
          transition: "all var(--dur-fast)"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: c.icon,
        size: 26,
        color: t.onSolid,
        strokeWidth: 1.9
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: on ? t.ink : "var(--text-muted)"
        }
      }, c.key));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: 20
      }
    }, "Popular ", cat.toLowerCase()), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--brand-accent-strong)",
        fontWeight: 700,
        fontSize: 13
      }
    }, "See all")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginTop: 12
      }
    }, featured.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.id,
      onClick: () => onOpenProduct(p),
      style: {
        display: "flex",
        gap: 14,
        background: "var(--white)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: 12,
        cursor: "pointer",
        boxShadow: "var(--shadow-xs)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 84,
        height: 84,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Photo, {
      src: p.img,
      pos: p.pos || "center"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement(NS.Badge, {
      tone: p.tag === "Vegan" ? "olive" : p.tag === "Popular" ? "orange" : "wine"
    }, p.tag), /*#__PURE__*/React.createElement(NS.Badge, {
      tone: "neutral"
    }, p.cal, " cal")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--ink-900)"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 900,
        color: "var(--wine-700)"
      }
    }, money(p.price)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "var(--rose-500)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 18,
      color: "var(--wine-900)"
    }))))))), /*#__PURE__*/React.createElement("div", {
      onClick: onBuild,
      style: {
        marginTop: 18,
        background: "var(--olive-600)",
        borderRadius: "var(--radius-xl)",
        padding: 18,
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        boxShadow: "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 14,
        background: "var(--lime-500)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "wand-sparkles",
      size: 24,
      color: "var(--olive-800)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--cream-50)"
      }
    }, "Build your own froyo"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--leaf-200)"
      }
    }, "Pick a base, pile on toppings.")), /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 22,
      color: "var(--lime-400)"
    }))));
  }

  /* ---------- Build your bowl ---------- */
  function Build({
    product,
    onBack,
    onAdd
  }) {
    const {
      bases,
      toppings,
      sizes
    } = window.APP;
    const [base, setBase] = React.useState(product ? null : bases[0].key);
    const [tops, setTops] = React.useState([]);
    const [size, setSize] = React.useState("Regular");
    const basePrice = product ? product.price : 6.5;
    const sizeAdd = sizes.find(s => s.key === size).add;
    const total = basePrice + sizeAdd + tops.length * 0.75;
    const toggleTop = t => setTops(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 230
      }
    }, /*#__PURE__*/React.createElement(Photo, {
      src: product ? product.img : "macro-swirl.jpg",
      pos: product ? product.pos || "center" : "center",
      iso: 0.2
    }), /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        position: "absolute",
        top: 50,
        left: 18,
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "none",
        background: "rgba(255,255,255,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20,
      color: "var(--ink-900)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 22px 12px"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 26
      }
    }, product ? product.name : "Build your froyo"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-muted)",
        marginTop: 6,
        fontSize: 14
      }
    }, "Fresh frozen yogurt, made exactly how you like it."), /*#__PURE__*/React.createElement(Section, {
      title: "Choose your base",
      accent: "var(--wine-700)"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, bases.map(b => /*#__PURE__*/React.createElement(NS.Tag, {
      key: b.key,
      selected: base === b.key,
      dotColor: b.tint,
      onClick: () => setBase(b.key)
    }, b.key)))), /*#__PURE__*/React.createElement(Section, {
      title: "Toppings · " + (tops.length ? tops.length + " added" : "$0.75 each"),
      accent: "var(--orange-500)"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, toppings.map(t => /*#__PURE__*/React.createElement(NS.Tag, {
      key: t,
      selected: tops.includes(t),
      onClick: () => toggleTop(t)
    }, t)))), /*#__PURE__*/React.createElement(Section, {
      title: "Size",
      accent: "var(--olive-600)"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, sizes.map(s => /*#__PURE__*/React.createElement(NS.Tag, {
      key: s.key,
      selected: size === s.key,
      onClick: () => setSize(s.key)
    }, s.key, s.add ? " +" + money(s.add) : "")))))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "none",
        padding: "14px 22px 22px",
        borderTop: "1px solid var(--border-default)",
        background: "var(--white)",
        display: "flex",
        gap: 14,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "Total"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 24,
        color: "var(--wine-700)"
      }
    }, money(total))), /*#__PURE__*/React.createElement(NS.Button, {
      variant: "accent",
      size: "lg",
      style: {
        flex: 1
      },
      onClick: () => onAdd({
        name: product ? product.name : base ? base + " froyo" : "Custom froyo",
        price: total,
        img: product ? product.img : "macro-swirl.jpg",
        pos: product ? product.pos : "center"
      })
    }, "Add to bag")));
  }
  function Section({
    title,
    accent = "var(--wine-700)",
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 9,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 5,
        height: 18,
        borderRadius: 99,
        background: accent,
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: 15,
        color: "var(--ink-900)"
      }
    }, title)), children);
  }

  /* ---------- Bag ---------- */
  function Bag({
    items,
    onRemove,
    onCheckout,
    onBrowse
  }) {
    const subtotal = items.reduce((s, i) => s + i.price, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "4px 22px 8px"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 26
      }
    }, "Your bag")), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
        padding: 30,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 72,
        height: 72,
        borderRadius: "50%",
        background: "var(--sand-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      size: 32,
      color: "var(--ink-400)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 20,
        color: "var(--ink-700)"
      }
    }, "Nothing here yet"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14
      }
    }, "Let's build something good."), /*#__PURE__*/React.createElement(NS.Button, {
      variant: "primary",
      onClick: onBrowse
    }, "Browse the menu")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        padding: "8px 22px"
      }
    }, items.map((it, idx) => /*#__PURE__*/React.createElement("div", {
      key: idx,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Photo, {
      src: it.img || "froyo-cup-mauve.jpg",
      pos: it.pos || "center 35%"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: "var(--ink-900)"
      }
    }, it.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-muted)"
      }
    }, "Regular")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        color: "var(--wine-700)"
      }
    }, money(it.price)), /*#__PURE__*/React.createElement("button", {
      onClick: () => onRemove(idx),
      "aria-label": "Remove",
      style: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: "var(--text-faint)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash-2",
      size: 18,
      color: "var(--text-faint)"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        background: "var(--leaf-200)",
        borderRadius: "var(--radius-lg)",
        padding: 14,
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 20,
      color: "var(--olive-700)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 14,
        color: "var(--olive-700)",
        fontWeight: 600
      }
    }, "Pickup \xB7 Congress St"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        color: "var(--olive-700)",
        fontSize: 14
      }
    }, "Ready ~4:25pm"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "none",
        padding: "16px 22px 22px",
        borderTop: "1px solid var(--border-default)",
        background: "var(--white)"
      }
    }, /*#__PURE__*/React.createElement(Row, {
      l: "Subtotal",
      r: money(subtotal)
    }), /*#__PURE__*/React.createElement(Row, {
      l: "Tax",
      r: money(tax)
    }), /*#__PURE__*/React.createElement(Row, {
      l: "Total",
      r: money(total),
      bold: true
    }), /*#__PURE__*/React.createElement(NS.Button, {
      variant: "accent",
      size: "lg",
      fullWidth: true,
      style: {
        marginTop: 12
      },
      onClick: onCheckout
    }, "Place order \xB7 ", money(total)))));
  }
  function Row({
    l,
    r,
    bold
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "4px 0",
        fontSize: bold ? 17 : 14,
        fontWeight: bold ? 800 : 500,
        color: bold ? "var(--ink-900)" : "var(--text-body)",
        fontFamily: bold ? "var(--font-display)" : "var(--font-body)"
      }
    }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("span", {
      style: {
        color: bold ? "var(--wine-700)" : "inherit"
      }
    }, r));
  }

  /* ---------- Rewards ---------- */
  function Rewards() {
    const {
      user
    } = window.APP;
    const pct = Math.round(user.points / user.nextReward * 100);
    const perks = [["Free froyo", "300 pts", "gift"], ["Birthday treat", "Member perk", "cake"], ["Double-point Tuesdays", "Every week", "star"], ["Early seasonal access", "Member perk", "sparkles"]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto"
      }
    }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "4px 22px 22px"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 26
      }
    }, "Rewards"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        background: "var(--wine-700)",
        borderRadius: "var(--radius-xl)",
        padding: 22,
        color: "var(--cream-50)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: ISO,
      alt: "",
      style: {
        position: "absolute",
        left: -30,
        top: -30,
        height: 150,
        opacity: 0.1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--lime-400)",
        fontWeight: 800,
        letterSpacing: ".08em",
        textTransform: "uppercase"
      }
    }, "Your points"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 64,
        lineHeight: 1,
        margin: "6px 0"
      }
    }, user.points), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 10,
        background: "rgba(255,255,255,0.18)",
        borderRadius: 99,
        margin: "14px 0 8px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + "%",
        height: "100%",
        background: "var(--lime-500)",
        borderRadius: 99
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--leaf-200)"
      }
    }, user.nextReward - user.points, " points until your next free froyo")), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: "22px 0 12px",
        fontSize: 19
      }
    }, "Perks & rewards"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, perks.map(([t, s, ic], i) => {
      const pal = [["var(--olive-100)", "var(--olive-700)"], ["var(--orange-100)", "var(--orange-700)"], ["var(--rose-100)", "var(--rose-600)"], ["var(--caramel-100)", "var(--caramel-600)"]][i % 4];
      return /*#__PURE__*/React.createElement("div", {
        key: t,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "var(--white)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-lg)",
          padding: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 44,
          height: 44,
          borderRadius: 12,
          background: pal[0],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: ic,
        size: 22,
        color: pal[1]
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          fontSize: 15,
          color: "var(--ink-900)"
        }
      }, t), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "var(--text-muted)"
        }
      }, s)), /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 20,
        color: "var(--text-faint)"
      }));
    }))));
  }

  /* ---------- Order confirmation ---------- */
  function Confirm({
    onDone
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "var(--wine-700)",
        color: "var(--cream-50)"
      }
    }, /*#__PURE__*/React.createElement(StatusBar, {
      dark: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 34px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 96,
        height: 96,
        borderRadius: "50%",
        background: "var(--orange-500)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "popIn .4s var(--ease-bounce)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 52,
      color: "var(--wine-900)",
      strokeWidth: 3
    })), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "var(--cream-50)",
        fontSize: 30,
        margin: "24px 0 8px"
      }
    }, "Order placed!"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-editorial)",
        color: "var(--wine-200)",
        fontSize: 16
      }
    }, "We're on it. Your order will be ready for pickup at ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--cream-50)"
      }
    }, "Congress St ~4:25pm"), "."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 22,
        background: "rgba(255,255,255,0.1)",
        borderRadius: "var(--radius-lg)",
        padding: "12px 22px",
        fontWeight: 700,
        letterSpacing: ".05em"
      }
    }, "Order #DS-2042")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 24px 40px"
      }
    }, /*#__PURE__*/React.createElement(NS.Button, {
      variant: "accent",
      size: "lg",
      fullWidth: true,
      onClick: onDone
    }, "Back to home")));
  }
  window.AppKit = Object.assign(window.AppKit || {}, {
    Welcome,
    Home,
    Build,
    Bag,
    Rewards,
    Confirm
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app-screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-app.jsx
try { (() => {
/* Deserto website — main page app shell & mount.
   Ordering lives on order.html; header shows the persisted bag count. */
(function () {
  const {
    Header,
    Hero,
    Marquee,
    MenuSection,
    Story,
    Locations,
    Footer,
    useSeasonState
  } = window.Site;
  function App() {
    const {
      season,
      vars
    } = useSeasonState();
    const menuRef = React.useRef(null);
    const [bagCount] = React.useState(() => {
      try {
        return JSON.parse(localStorage.getItem("deserto.bag.v1") || "[]").reduce((a, x) => a + x.qty, 0);
      } catch (e) {
        return 0;
      }
    });
    const scrollTo = id => {
      if (id === "top") return window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 66,
        behavior: "smooth"
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--peach-100)",
        minHeight: "100vh",
        ...vars
      }
    }, /*#__PURE__*/React.createElement(Header, {
      bag: bagCount,
      onNav: scrollTo
    }), /*#__PURE__*/React.createElement(Hero, {
      season: season,
      onMenu: () => scrollTo("menu")
    }), /*#__PURE__*/React.createElement(Marquee, null), /*#__PURE__*/React.createElement(MenuSection, {
      sectionRef: menuRef
    }), /*#__PURE__*/React.createElement(Story, null), /*#__PURE__*/React.createElement(Locations, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-build.jsx
try { (() => {
/* Deserto website — "What we make" highlights (links to the order page). */
(function () {
  const NS = window.DesertoDesignSystem_e4c2c1;
  const {
    Icon,
    Photo,
    Arch
  } = window.Site;
  function MenuSection({
    sectionRef
  }) {
    const {
      highlights
    } = window.SITE;
    return /*#__PURE__*/React.createElement("section", {
      id: "menu",
      ref: sectionRef,
      style: {
        background: "var(--surface-sunken)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "var(--space-9) var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        color: "var(--wine-500)"
      }
    }, "The menu"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-4xl)",
        margin: "8px 0 0",
        color: "var(--wine-700)"
      }
    }, "What we make")), /*#__PURE__*/React.createElement("a", {
      href: "order.html",
      className: "nav-link",
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        color: "var(--wine-700)",
        display: "inline-flex",
        alignItems: "center",
        gap: 7
      }
    }, "See the full menu & order", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 17,
      color: "var(--wine-700)"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--space-5)",
        marginTop: "var(--space-7)"
      }
    }, highlights.map((h, i) => /*#__PURE__*/React.createElement("a", {
      key: h.slug,
      href: "order.html?tab=" + h.slug,
      className: "season-card",
      style: {
        display: "block",
        background: "var(--white)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border-default)",
        animation: `fadeUp .4s ${i * 0.05}s var(--ease-out, ease) both`
      }
    }, /*#__PURE__*/React.createElement(Arch, {
      style: {
        height: 200
      },
      radius: "50% 50% 0 0 / 30% 30% 0 0"
    }, /*#__PURE__*/React.createElement(Photo, {
      src: h.img,
      pos: h.pos || "center",
      label: h.name,
      height: "100%"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: "var(--text-lg)",
        color: "var(--ink-900)"
      }
    }, h.name), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "6px 0 12px",
        fontSize: "var(--text-sm)",
        color: "var(--text-muted)",
        lineHeight: 1.5
      }
    }, h.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        color: "var(--wine-700)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)"
      }
    }, "Order"), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "var(--orange-500)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16,
      color: "var(--wine-900)"
    })))))))));
  }
  window.Site = Object.assign(window.Site || {}, {
    MenuSection
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-build.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-data.jsx
try { (() => {
/* Deserto website — content model. Global: window.SITE
   SOURCE OF TRUTH: the real store's Toast online-ordering menu (June 2026)
   Deserto Frozen Yogurt & Café · 5635 E River Rd Unit 101, Tucson, AZ 85750 */
window.SITE = {
  store: {
    name: "Deserto Frozen Yogurt & Café",
    addr: "5635 E River Rd, Unit 101",
    city: "Tucson, AZ 85750",
    phone: "(520) 981-1029",
    hours: "Open daily · 10 AM – 10 PM",
    maps: "https://www.google.com/maps/search/?api=1&query=5635%20E%20River%20Rd%20Unit%20101%2C%20Tucson%2C%20AZ%2085750",
    img: "interior-froyo-arches.jpg"
  },
  nav: [{
    en: "Menu",
    id: "menu"
  }, {
    en: "Our Story",
    id: "story"
  }, {
    en: "Visit",
    id: "locations"
  }],
  /* ---- Seasonal hero imagery (rotates by date) ---- */
  seasons: [{
    id: "primavera",
    en: "Spring",
    accent: "var(--lime-500)",
    soft: "var(--leaf-100)",
    hero: "froyo-cup-mauve.jpg",
    heroPos: "center 38%"
  }, {
    id: "verano",
    en: "Summer",
    accent: "var(--orange-500)",
    soft: "var(--orange-100)",
    hero: "strawberry-hand.jpg",
    heroPos: "center 42%"
  }, {
    id: "otono",
    en: "Autumn",
    accent: "var(--caramel-500)",
    soft: "var(--peach-100)",
    hero: "cans-white-arches.jpg",
    heroPos: "center 50%"
  }],
  /* ---- "What we make" highlight cards (main page) ---- */
  highlights: [{
    slug: "froyo",
    name: "Self-Serve Froyo",
    desc: "Six rotating flavors at the swirl wall, with a bar of curated toppings.",
    img: "product-froyo-cup.jpg",
    pos: "center 55%"
  }, {
    slug: "tonics",
    name: "Tonic Drinks",
    desc: "Eight fruity sparklers, served in our signature cans.",
    img: "product-tonic-berry.jpg",
    pos: "center 45%"
  }, {
    slug: "coffee",
    name: "Coffee",
    desc: "Espresso classics — lattes, macchiatos, chai — hot or iced.",
    img: "product-iced-macchiato.jpg",
    pos: "center 45%"
  }, {
    slug: "pastries",
    name: "Pastries & Cake Jars",
    desc: "NYC-style cookies, scones, and layered cake jars.",
    img: "tulips-drinks.jpg",
    pos: "center 78%"
  }],
  /* ---- The real catalog (Toast, June 2026) ---- */
  categories: [{
    slug: "froyo",
    name: "Frozen Yogurt"
  }, {
    slug: "tonics",
    name: "Tonics"
  }, {
    slug: "coffee",
    name: "Coffee"
  }, {
    slug: "pastries",
    name: "Pastries"
  }, {
    slug: "extras",
    name: "Extras"
  }],
  products: [/* --- Frozen Yogurt --- */
  {
    id: "fy-weight",
    cat: "froyo",
    group: "Self-serve · in the shop",
    name: "Self-Serve Frozen Yogurt",
    desc: "Build it at the swirl wall — flavors rotate monthly.",
    price: 0.89,
    instore: true,
    img: "macro-swirl.jpg"
  }, {
    id: "fy-waffle",
    cat: "froyo",
    group: "Cones",
    name: "Froyo with Waffle Cone",
    price: 6.0,
    img: "cone-twotone.jpg",
    pos: "center 30%"
  }, {
    id: "fy-cake",
    cat: "froyo",
    group: "Cones",
    name: "Froyo with Cake Cone",
    price: 4.5,
    tint: "var(--peach-200)"
  }, {
    id: "fy-cone-w",
    cat: "froyo",
    group: "Cones",
    name: "Extra Waffle Cone",
    price: 2.0,
    tint: "var(--caramel-100)"
  }, {
    id: "fy-cone-c",
    cat: "froyo",
    group: "Cones",
    name: "Extra Cake Cone",
    price: 1.5,
    tint: "var(--sand-200)"
  }, {
    id: "th-tarte",
    cat: "froyo",
    group: "Take-home 32 oz",
    name: "Premium Tarte",
    desc: "32 oz of our self-serve original.",
    price: 22.0,
    tags: ["GF"],
    img: "product-froyo-cup.jpg",
    pos: "center 55%"
  }, {
    id: "th-guava",
    cat: "froyo",
    group: "Take-home 32 oz",
    name: "Guava",
    price: 22.0,
    tags: ["Vegan", "GF"],
    tint: "var(--rose-100)"
  }, {
    id: "th-choc",
    cat: "froyo",
    group: "Take-home 32 oz",
    name: "Vegan Double Chocolate",
    price: 22.0,
    tags: ["Vegan", "GF"],
    tint: "var(--caramel-200)"
  }, {
    id: "th-caramel",
    cat: "froyo",
    group: "Take-home 32 oz",
    name: "Salted Caramel",
    price: 22.0,
    tags: ["GF"],
    tint: "var(--caramel-100)"
  }, {
    id: "th-taro",
    cat: "froyo",
    group: "Take-home 32 oz",
    name: "Taro",
    price: 22.0,
    tags: ["GF"],
    img: "macro-swirl.jpg"
  }, {
    id: "th-blue",
    cat: "froyo",
    group: "Take-home 32 oz",
    name: "Blueberry",
    price: 22.0,
    tags: ["Vegan", "GF"],
    tint: "var(--rose-200)"
  }, /* --- Tonics --- */
  {
    id: "t-straw",
    cat: "tonics",
    group: "House tonics",
    name: "Strawberry Tonic",
    price: 5.99,
    plus: true,
    img: "product-tonic-strawberry.jpg",
    pos: "center 60%"
  }, {
    id: "t-peach",
    cat: "tonics",
    group: "House tonics",
    name: "Golden Peach Tonic",
    price: 5.99,
    plus: true,
    tint: "var(--peach-200)"
  }, {
    id: "t-prickly",
    cat: "tonics",
    group: "House tonics",
    name: "Prickly Pear Tonic",
    price: 5.99,
    plus: true,
    img: "strawberry-hand.jpg",
    pos: "center 40%"
  }, {
    id: "t-mango",
    cat: "tonics",
    group: "House tonics",
    name: "Mango Tonic",
    price: 5.99,
    plus: true,
    tint: "var(--orange-100)"
  }, {
    id: "t-blue",
    cat: "tonics",
    group: "House tonics",
    name: "Blueberry Tonic",
    price: 5.99,
    plus: true,
    tint: "var(--rose-200)"
  }, {
    id: "t-kiwi",
    cat: "tonics",
    group: "House tonics",
    name: "Kiwi Tonic",
    price: 5.99,
    plus: true,
    tint: "var(--leaf-100)"
  }, {
    id: "t-rasp",
    cat: "tonics",
    group: "House tonics",
    name: "Raspberry Tonic",
    price: 5.99,
    plus: true,
    img: "product-tonic-berry.jpg",
    pos: "center 45%"
  }, {
    id: "t-pine",
    cat: "tonics",
    group: "House tonics",
    name: "Pineapple Tonic",
    price: 5.99,
    plus: true,
    img: "product-tonic-pineapple.jpg",
    pos: "center 45%"
  }, /* --- Coffee --- */
  {
    id: "c-esp1",
    cat: "coffee",
    group: "Hot",
    name: "Espresso · Single",
    price: 1.0,
    tint: "var(--caramel-100)"
  }, {
    id: "c-esp2",
    cat: "coffee",
    group: "Hot",
    name: "Espresso · Double",
    price: 3.65,
    tint: "var(--caramel-200)"
  }, {
    id: "c-capp",
    cat: "coffee",
    group: "Hot",
    name: "Cappuccino",
    price: 5.75,
    plus: true,
    tint: "var(--peach-100)"
  }, {
    id: "c-latte",
    cat: "coffee",
    group: "Hot",
    name: "Hot Latte",
    price: 5.75,
    plus: true,
    img: "tulips-drinks.jpg",
    pos: "right center"
  }, {
    id: "c-macch",
    cat: "coffee",
    group: "Hot",
    name: "Hot Macchiato",
    price: 5.5,
    plus: true,
    tint: "var(--caramel-100)"
  }, {
    id: "c-chai",
    cat: "coffee",
    group: "Hot",
    name: "Hot Chai Latte",
    price: 4.95,
    plus: true,
    tint: "var(--peach-200)"
  }, {
    id: "c-amer",
    cat: "coffee",
    group: "Hot",
    name: "Americano",
    price: 4.75,
    plus: true,
    tint: "var(--sand-200)"
  }, {
    id: "c-ilatte",
    cat: "coffee",
    group: "Iced",
    name: "Iced Latte",
    price: 5.95,
    plus: true,
    img: "product-iced-macchiato.jpg",
    pos: "center 45%"
  }, {
    id: "c-iamer",
    cat: "coffee",
    group: "Iced",
    name: "Iced Americano",
    price: 5.25,
    plus: true,
    tint: "var(--caramel-100)"
  }, {
    id: "c-imacch",
    cat: "coffee",
    group: "Iced",
    name: "Iced Macchiato",
    price: 5.75,
    plus: true,
    img: "product-can-macchiato.jpg",
    pos: "center 45%"
  }, {
    id: "c-ichai",
    cat: "coffee",
    group: "Iced",
    name: "Iced Chai Latte",
    price: 6.65,
    plus: true,
    tint: "var(--sand-200)"
  }, /* --- Pastries --- */
  {
    id: "p-redv",
    cat: "pastries",
    group: "Cookies NYC",
    name: "Red Velvet & White Chocolate",
    price: 5.99,
    tint: "var(--rose-100)"
  }, {
    id: "p-ccw",
    cat: "pastries",
    group: "Cookies NYC",
    name: "Chocolate Chip & Walnut",
    price: 5.99,
    tint: "var(--caramel-100)"
  }, {
    id: "p-dcw",
    cat: "pastries",
    group: "Cookies NYC",
    name: "Double Chocolate & Walnut",
    price: 5.99,
    tint: "var(--caramel-200)"
  }, {
    id: "p-matcha",
    cat: "pastries",
    group: "Cookies NYC",
    name: "Matcha Chocolate Chip",
    price: 5.99,
    tint: "var(--leaf-100)"
  }, {
    id: "p-macad",
    cat: "pastries",
    group: "Cookies NYC",
    name: "White Chocolate Macadamia",
    price: 5.99,
    tint: "var(--peach-100)"
  }, {
    id: "p-vanilla",
    cat: "pastries",
    group: "Scones",
    name: "Vanilla Almond Scone",
    price: 4.99,
    tint: "var(--sand-200)"
  }, {
    id: "p-bluelem",
    cat: "pastries",
    group: "Scones",
    name: "Blueberry Lemon Scone",
    price: 4.99,
    tint: "var(--rose-200)"
  }, {
    id: "p-nutella",
    cat: "pastries",
    group: "Cake jars",
    name: "Chocolate Nutella Jar",
    price: 6.25,
    tint: "var(--caramel-200)"
  }, {
    id: "p-gansito",
    cat: "pastries",
    group: "Cake jars",
    name: "Gansito Cake Jar",
    price: 6.25,
    tint: "var(--rose-100)"
  }, {
    id: "p-oreo",
    cat: "pastries",
    group: "Cake jars",
    name: "Oreo Cake Jar",
    price: 6.25,
    tint: "var(--sand-200)"
  }, {
    id: "p-dot",
    cat: "pastries",
    group: "Cake jars",
    name: "Dot Cake",
    price: 6.25,
    tint: "var(--peach-200)"
  }, /* --- Extras --- */
  {
    id: "x-fiji",
    cat: "extras",
    group: "Drinks",
    name: "Fiji Water",
    price: 4.5,
    tint: "var(--leaf-100)"
  }, {
    id: "x-cstraw",
    cat: "extras",
    group: "DiLuna candles",
    name: "Strawberry Guava Candle",
    price: 8.5,
    img: "guava-diluna.jpg",
    pos: "center 40%"
  }, {
    id: "x-ccafe",
    cat: "extras",
    group: "DiLuna candles",
    name: "Cafecito Candle",
    price: 8.5,
    tint: "var(--caramel-100)"
  }],
  personality: [["Cálida", "Warm"], ["Innovadora", "Innovative"], ["Creativa", "Creative"]]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-hero.jsx
try { (() => {
/* Deserto website — header + reference-style peach hero (bold editorial). */
(function () {
  const NS = window.DesertoDesignSystem_e4c2c1;
  const {
    Icon,
    Photo,
    ISO
  } = window.Site;
  const LOGO = "../../assets/logos/deserto-logo-full.png";
  const LOGO_ISO = "../../assets/logos/deserto-isotype.png";

  /* ---------------- Header (light / cream) ---------------- */
  function Header({
    bag,
    onNav
  }) {
    const {
      nav
    } = window.SITE;
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(252,238,228,0.86)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-default)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "0 var(--space-6)",
        height: 74,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#top",
      onClick: e => {
        e.preventDefault();
        onNav("top");
      },
      style: {
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: LOGO,
      alt: "Deserto \u2014 Frozen Yogurt & Caf\xE9",
      style: {
        height: 48,
        width: "auto",
        display: "block"
      }
    })), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        gap: "var(--space-5)",
        marginLeft: "var(--space-4)"
      }
    }, nav.map(n => /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: "#" + n.id,
      onClick: e => {
        e.preventDefault();
        onNav(n.id);
      },
      className: "nav-link",
      style: {
        fontWeight: 600,
        fontSize: "var(--text-sm)",
        color: "var(--ink-700)",
        letterSpacing: ".01em",
        whiteSpace: "nowrap"
      }
    }, n.en))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      "aria-label": "Search",
      style: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "inline-flex",
        padding: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      color: "var(--wine-700)"
    })), /*#__PURE__*/React.createElement("a", {
      "aria-label": "Bag",
      href: "order.html",
      style: {
        position: "relative",
        display: "inline-flex",
        padding: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      color: "var(--wine-700)"
    }), bag > 0 && /*#__PURE__*/React.createElement("span", {
      key: bag,
      style: {
        position: "absolute",
        top: -2,
        right: -4,
        minWidth: 18,
        height: 18,
        padding: "0 4px",
        background: "var(--orange-500)",
        color: "var(--wine-900)",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-body)",
        animation: "popIn .35s var(--ease-bounce)"
      }
    }, bag)), /*#__PURE__*/React.createElement("a", {
      href: "order.html",
      className: "btn-wine",
      style: {
        borderRadius: 999,
        padding: "11px 22px",
        flexShrink: 0,
        whiteSpace: "nowrap",
        background: "var(--wine-700)",
        color: "var(--cream-50)",
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)"
      }
    }, "Order now"))));
  }

  /* ---------------- Hero (peach, bold editorial) ---------------- */
  function Hero({
    season,
    onMenu
  }) {
    return /*#__PURE__*/React.createElement("section", {
      id: "top",
      style: {
        background: "var(--peach-100)",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -120,
        left: -80,
        width: 320,
        height: 320,
        borderRadius: "50%",
        background: "var(--peach-200)",
        opacity: 0.5,
        filter: "blur(8px)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "var(--space-8) var(--space-6)",
        display: "grid",
        gridTemplateColumns: "1.06fr 0.94fr",
        gap: "var(--space-7)",
        alignItems: "center",
        paddingTop: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        background: "var(--wine-700)",
        color: "var(--lime-400)",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        letterSpacing: ".02em",
        padding: "8px 18px",
        borderRadius: 999
      }
    }, "Open daily 10\u201310 \xB7 River Rd, Tucson"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        textTransform: "uppercase",
        fontSize: "clamp(56px, 6.4vw, 104px)",
        lineHeight: 0.9,
        letterSpacing: "-0.01em",
        margin: "var(--space-5) 0 0",
        color: "var(--wine-700)"
      }
    }, "Where coffee", /*#__PURE__*/React.createElement("br", null), "meets creamy", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--orange-500)"
      }
    }, "bliss.")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-editorial)",
        fontSize: "var(--text-lg)",
        color: "var(--ink-700)",
        lineHeight: 1.55,
        margin: "var(--space-5) 0 0",
        maxWidth: 460
      }
    }, "Self-serve frozen yogurt with curated toppings, espresso classics, fruity tonics in our signature cans, and fresh-baked pastries \u2014 made to fit your taste and your lifestyle."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-3)",
        marginTop: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "order.html",
      className: "btn-wine",
      style: {
        borderRadius: 999,
        padding: "16px 30px",
        background: "var(--wine-700)",
        color: "var(--cream-50)",
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-md)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "var(--shadow-md)"
      }
    }, "Order now", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 20,
      color: "var(--cream-50)"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: onMenu,
      style: {
        cursor: "pointer",
        borderRadius: 999,
        padding: "16px 30px",
        background: "transparent",
        border: "2px solid var(--wine-700)",
        color: "var(--wine-700)",
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-md)"
      }
    }, "See the menu"))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 580,
        paddingTop: 100
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: 400,
        height: 400,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: "var(--wine-700)",
        boxShadow: "0 28px 64px -12px rgba(58,12,20,0.55)"
      }
    }), [{
      label: "Gluten Free",
      top: 22,
      left: -24,
      rotate: -9
    }, {
      label: "Dairy Free",
      top: 300,
      left: -30,
      rotate: 7
    }, {
      label: "Vegan",
      top: 175,
      left: 348,
      rotate: -6
    }].map(({
      label,
      top,
      left,
      rotate
    }) => /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        position: "absolute",
        top,
        left,
        transform: `rotate(${rotate}deg)`,
        zIndex: 3,
        background: "var(--lime-500)",
        color: "var(--wine-900)",
        borderRadius: 999,
        padding: "7px 15px",
        boxShadow: "var(--shadow-md)",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        letterSpacing: ".01em"
      }
    }, label)), /*#__PURE__*/React.createElement("img", {
      src: "../../uploads/froyo-cups-cutout.png",
      alt: "Taro and Ristachio froyo cups",
      style: {
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        width: 400,
        height: "auto",
        filter: "drop-shadow(0 24px 32px rgba(58,12,20,0.45))",
        zIndex: 2,
        pointerEvents: "none"
      }
    })))));
  }
  window.Site = Object.assign(window.Site || {}, {
    Header,
    Hero
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-order.jsx
try { (() => {
/* Deserto — separate Order page app. Mounts on #order-root (order.html only).
   Real catalog from the store's Toast menu; bag persists in localStorage. */
(function () {
  const root = document.getElementById("order-root");
  if (!root) return; // only runs on order.html
  const NS = window.DesertoDesignSystem_e4c2c1;
  const {
    Icon,
    Photo,
    Chip,
    ISO
  } = window.Site;
  const BAG_KEY = "deserto.bag.v1";
  const loadBag = () => {
    try {
      return JSON.parse(localStorage.getItem(BAG_KEY) || "[]");
    } catch (e) {
      return [];
    }
  };
  const saveBag = b => {
    try {
      localStorage.setItem(BAG_KEY, JSON.stringify(b));
    } catch (e) {}
  };

  /* ---------- Slim order-page header ---------- */
  function OrderHeader({
    count
  }) {
    const {
      store
    } = window.SITE;
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(252,238,228,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-default)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "0 var(--space-6)",
        height: 70,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: ISO,
      alt: "Deserto",
      style: {
        height: 30
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 21,
        color: "var(--wine-700)",
        letterSpacing: ".03em"
      }
    }, "DESERTO")), /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      className: "nav-link",
      style: {
        fontWeight: 700,
        fontSize: "var(--text-sm)",
        color: "var(--ink-700)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 15,
      color: "var(--ink-700)"
    }), "Back to site"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: "var(--text-sm)",
        color: "var(--ink-500)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 15,
      color: "var(--wine-500)"
    }), /*#__PURE__*/React.createElement("span", null, store.addr, " \xB7 ", store.hours), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        marginLeft: 10,
        background: "var(--wine-700)",
        color: "var(--cream-50)",
        borderRadius: 999,
        padding: "7px 14px",
        fontWeight: 800,
        fontFamily: "var(--font-body)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      size: 15,
      color: "var(--cream-50)"
    }), count))));
  }

  /* ---------- One orderable row ---------- */
  function ItemRow({
    p,
    onAdd
  }) {
    const tagTone = {
      Vegan: "olive",
      GF: "caramel",
      New: "orange"
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px var(--space-5)",
        borderTop: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Photo, {
      src: p.img,
      pos: p.pos || "center",
      tint: p.tint || "var(--peach-100)",
      label: p.name,
      height: "100%"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-md)",
        color: "var(--ink-900)"
      }
    }, p.name), (p.tags || []).map(t => /*#__PURE__*/React.createElement(NS.Badge, {
      key: t,
      tone: tagTone[t] || "neutral",
      variant: "soft"
    }, t))), p.desc && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--text-sm)",
        color: "var(--text-muted)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, p.desc)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 900,
        color: "var(--wine-700)",
        whiteSpace: "nowrap"
      }
    }, p.instore ? "By weight" : `$${p.price.toFixed(2)}${p.plus ? "+" : ""}`), p.instore ? /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        fontSize: "var(--text-xs)",
        fontWeight: 800,
        color: "var(--olive-700)",
        background: "var(--leaf-100)",
        borderRadius: 999,
        padding: "7px 12px",
        whiteSpace: "nowrap"
      }
    }, "In store") : /*#__PURE__*/React.createElement("button", {
      "aria-label": `Add ${p.name}`,
      onClick: () => onAdd(p),
      className: "order-add",
      style: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        background: "var(--orange-500)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 18,
      color: "var(--wine-900)"
    })));
  }

  /* ---------- Bag panel ---------- */
  function BagPanel({
    bag,
    updateQty,
    notify
  }) {
    const {
      store
    } = window.SITE;
    const [mode, setMode] = React.useState("pickup");
    const count = bag.reduce((a, x) => a + x.qty, 0);
    const subtotal = bag.reduce((a, x) => a + x.qty * x.price, 0);
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        background: "var(--white)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-md)",
        padding: "var(--space-5)",
        position: "sticky",
        top: 90,
        alignSelf: "start",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-xl)",
        color: "var(--wine-700)"
      }
    }, "Your bag"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        color: "var(--ink-400)"
      }
    }, count, " item", count === 1 ? "" : "s")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        padding: 3,
        background: "var(--sand-100)",
        borderRadius: 999
      }
    }, [["pickup", "Pickup"], ["delivery", "Delivery"]].map(([id, label]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setMode(id),
      style: {
        border: "none",
        cursor: "pointer",
        borderRadius: 999,
        padding: "8px 0",
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        background: mode === id ? "var(--wine-700)" : "transparent",
        color: mode === id ? "var(--cream-50)" : "var(--ink-700)",
        transition: "all .18s ease"
      }
    }, label))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--text-sm)",
        color: "var(--ink-500)",
        lineHeight: 1.5
      }
    }, mode === "pickup" ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--ink-700)"
      }
    }, "Pickup"), " at ", store.addr, " \xB7 ready in 15\u201320 min") : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--ink-700)"
      }
    }, "Delivery"), " via DoorDash & Grubhub \xB7 partner fees apply")), bag.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "var(--space-6) 0",
        color: "var(--ink-400)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shopping-bag",
      size: 28,
      color: "var(--ink-300)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-editorial)",
        fontSize: "var(--text-sm)",
        marginTop: 8
      }
    }, "Your bag is empty \u2014 add something delicious.")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, bag.map(x => /*#__PURE__*/React.createElement("div", {
      key: x.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 0",
        borderTop: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        color: "var(--ink-900)"
      }
    }, x.name), x.plus && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--text-xs)",
        color: "var(--ink-400)"
      }
    }, "base price \u2014 size at checkout")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7
      }
    }, /*#__PURE__*/React.createElement("button", {
      "aria-label": "Less",
      onClick: () => updateQty(x.id, -1),
      className: "qty-btn"
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        minWidth: 16,
        textAlign: "center"
      }
    }, x.qty), /*#__PURE__*/React.createElement("button", {
      "aria-label": "More",
      onClick: () => updateQty(x.id, 1),
      className: "qty-btn"
    }, "+")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 900,
        fontSize: "var(--text-sm)",
        color: "var(--wine-700)",
        minWidth: 52,
        textAlign: "right"
      }
    }, "$", (x.qty * x.price).toFixed(2))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "2px solid var(--wine-700)",
        paddingTop: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-md)",
        color: "var(--ink-900)"
      }
    }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-2xl)",
        color: "var(--wine-700)"
      }
    }, "$", subtotal.toFixed(2))), /*#__PURE__*/React.createElement("button", {
      className: "btn-wine",
      disabled: bag.length === 0,
      onClick: () => notify("Demo — this would hand off to Toast checkout"),
      style: {
        border: "none",
        cursor: bag.length ? "pointer" : "default",
        borderRadius: 999,
        padding: "15px 0",
        width: "100%",
        background: bag.length ? "var(--wine-700)" : "var(--sand-200)",
        color: bag.length ? "var(--cream-50)" : "var(--ink-400)",
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-md)"
      }
    }, mode === "pickup" ? "Checkout · pickup" : "Checkout · delivery"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--text-xs)",
        color: "var(--ink-400)",
        textAlign: "center"
      }
    }, "Commission-free ordering via Toast. Taxes at checkout."));
  }

  /* ---------- Page app ---------- */
  function OrderApp() {
    const {
      categories,
      products,
      store
    } = window.SITE;
    const param = new URLSearchParams(location.search).get("tab");
    const start = categories.find(c => c.slug === param) || categories[0];
    const [cat, setCat] = React.useState(start);
    const [bag, setBag] = React.useState(loadBag);
    const [toast, setToast] = React.useState(null);
    const tRef = React.useRef(null);
    React.useEffect(() => {
      saveBag(bag);
    }, [bag]);
    const notify = msg => {
      setToast(msg);
      clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setToast(null), 2200);
    };
    const add = p => {
      setBag(b => {
        const i = b.findIndex(x => x.id === p.id);
        if (i >= 0) {
          const c = [...b];
          c[i] = {
            ...c[i],
            qty: c[i].qty + 1
          };
          return c;
        }
        return [...b, {
          id: p.id,
          name: p.name,
          price: p.price,
          plus: !!p.plus,
          qty: 1
        }];
      });
      notify(`${p.name} added to bag`);
    };
    const updateQty = (id, d) => setBag(b => b.flatMap(x => x.id === id ? x.qty + d <= 0 ? [] : [{
      ...x,
      qty: x.qty + d
    }] : [x]));
    const list = products.filter(p => p.cat === cat.slug);
    const groups = [...new Set(list.map(p => p.group))];
    const count = bag.reduce((a, x) => a + x.qty, 0);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--peach-100)",
        minHeight: "100vh"
      }
    }, /*#__PURE__*/React.createElement(OrderHeader, {
      count: count
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "var(--space-7) var(--space-6) var(--space-9)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        color: "var(--wine-500)"
      }
    }, "Order online \xB7 pickup & delivery"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: "var(--text-4xl)",
        margin: "8px 0 0",
        color: "var(--wine-700)"
      }
    }, "Your order, your way")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 360px",
        gap: "var(--space-6)",
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: "var(--space-4)"
      }
    }, categories.map(c => /*#__PURE__*/React.createElement(Chip, {
      key: c.slug,
      on: cat.slug === c.slug,
      onClick: () => setCat(c)
    }, c.name))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--white)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        paddingBottom: 6
      }
    }, groups.map(g => /*#__PURE__*/React.createElement("div", {
      key: g
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px var(--space-5) 6px",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        color: "var(--ink-400)",
        textTransform: "uppercase",
        letterSpacing: ".05em"
      }
    }, g), list.filter(p => p.group === g).map(p => /*#__PURE__*/React.createElement(ItemRow, {
      key: p.id,
      p: p,
      onAdd: add
    }))))), cat.slug === "froyo" && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "var(--text-sm)",
        color: "var(--ink-500)",
        margin: "14px 4px 0",
        fontFamily: "var(--font-editorial)"
      }
    }, "The full self-serve experience \u2014 swirl wall, toppings bar, made your way \u2014 happens in the shop. Online, grab a cone or a 32 oz take-home tub.")), /*#__PURE__*/React.createElement(BagPanel, {
      bag: bag,
      updateQty: updateQty,
      notify: notify
    }))), /*#__PURE__*/React.createElement("div", {
      "aria-live": "polite",
      style: {
        position: "fixed",
        left: "50%",
        bottom: toast ? 28 : -80,
        transform: "translateX(-50%)",
        transition: "bottom .3s var(--ease-bounce, ease)",
        zIndex: 80,
        background: "var(--wine-700)",
        color: "var(--cream-50)",
        borderRadius: 999,
        padding: "13px 22px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "var(--shadow-lg)",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: "var(--text-sm)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "var(--orange-500)",
        color: "var(--wine-900)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900
      }
    }, "\u2713"), toast || ""));
  }
  ReactDOM.createRoot(root).render(/*#__PURE__*/React.createElement(OrderApp, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-order.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-parts.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Deserto website — primitives, season theme engine, kinetic marquee.
   Exposes via window.Site: Icon, Photo, Arch, useSeasonState, SeasonBar, Marquee. */
(function () {
  const NS = window.DesertoDesignSystem_e4c2c1;
  const IMG = "../../assets/images/";
  const ISO = "../../assets/logos/deserto-isotype.png";

  /* ---------- Lucide icon wrapper ---------- */
  function Icon({
    name,
    size = 20,
    color = "currentColor",
    strokeWidth = 2
  }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (ref.current && window.lucide) {
        ref.current.innerHTML = "";
        const i = document.createElement("i");
        i.setAttribute("data-lucide", name);
        ref.current.appendChild(i);
        window.lucide.createIcons({
          attrs: {
            width: size,
            height: size,
            stroke: color,
            "stroke-width": strokeWidth
          }
        });
      }
    }, [name, size, color, strokeWidth]);
    return /*#__PURE__*/React.createElement("span", {
      ref: ref,
      style: {
        display: "inline-flex",
        lineHeight: 0
      }
    });
  }

  /* ---------- Photo — real café photography w/ graceful fallback ---------- */
  function Photo({
    src,
    tint = "var(--peach-100)",
    label,
    height = "100%",
    radius = 0,
    pos = "center",
    style = {}
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height,
        width: "100%",
        background: tint,
        borderRadius: radius,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }
    }, src ? /*#__PURE__*/React.createElement("img", {
      src: IMG + src,
      alt: label || "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: pos
      }
    }) : /*#__PURE__*/React.createElement("img", {
      src: ISO,
      alt: "",
      style: {
        height: "38%",
        opacity: 0.14,
        filter: "saturate(0.6)"
      }
    }));
  }

  /* ---------- Arch — the café's signature arched silhouette ---------- */
  function Arch({
    children,
    radius = "50% 50% 0 0 / 38% 38% 0 0",
    style = {},
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        borderRadius: radius,
        overflow: "hidden",
        ...style
      }
    }, rest), children);
  }

  /* ---------- Chip — selectable pill (menu tabs, order page) ---------- */
  function Chip({
    on,
    color,
    children,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        border: on ? "2px solid var(--wine-700)" : "2px solid var(--border-default)",
        background: on ? "var(--wine-700)" : "var(--white)",
        color: on ? "var(--cream-50)" : "var(--ink-700)",
        cursor: "pointer",
        borderRadius: 999,
        padding: "9px 16px",
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: "var(--text-sm)",
        whiteSpace: "nowrap",
        transition: "all .16s var(--ease-out, ease)"
      }
    }, color && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 13,
        height: 13,
        borderRadius: "50%",
        background: color,
        boxShadow: on ? "0 0 0 2px rgba(255,255,255,0.4)" : "none"
      }
    }), children);
  }

  /* ---------- Season state (auto by date) ---------- */
  function useSeasonState() {
    const seasons = window.SITE.seasons;
    /* Auto-pick by current date: Mar–May spring, Jun–Aug summer, else autumn. */
    const m = new Date().getMonth();
    const byDate = m >= 2 && m <= 4 ? 0 : m >= 5 && m <= 7 ? 1 : 2;
    const [idx, setIdx] = React.useState(byDate);
    const season = seasons[idx];
    const setSeason = React.useCallback(i => setIdx(i), []);
    /* expose accent on a wrapper via inline style vars */
    const vars = {
      "--accent": season.accent,
      "--accent-soft": season.soft
    };
    return {
      seasons,
      idx,
      season,
      setSeason,
      vars
    };
  }

  /* ---------- Kinetic sparkle marquee (wine band, lime text) ---------- */
  function Marquee() {
    const items = ["Where coffee meets creamy bliss", "Self-serve froyo", "Tonics in a can", "NYC cookies", "Espresso bar", "Cake jars", "Mi gusto, mi estilo"];
    const Row = ({
      ariaHidden
    }) => /*#__PURE__*/React.createElement("div", {
      "aria-hidden": ariaHidden,
      style: {
        display: "flex",
        alignItems: "center",
        flexShrink: 0
      }
    }, items.map((text, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 30,
        padding: "0 30px",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        textTransform: "uppercase",
        fontSize: "var(--text-md)",
        letterSpacing: ".03em",
        color: "var(--lime-400)"
      }
    }, text), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--orange-500)",
        fontSize: 14,
        lineHeight: 0
      }
    }, "\u2726"))));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: "hidden",
        background: "var(--wine-700)",
        height: 64,
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-marquee",
      style: {
        display: "flex",
        width: "max-content"
      }
    }, /*#__PURE__*/React.createElement(Row, null), /*#__PURE__*/React.createElement(Row, {
      ariaHidden: true
    })));
  }
  window.Site = Object.assign(window.Site || {}, {
    Icon,
    Photo,
    Arch,
    Chip,
    useSeasonState,
    Marquee,
    IMG,
    ISO
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-story.jsx
try { (() => {
/* Deserto website — story, locations, footer. */
(function () {
  const NS = window.DesertoDesignSystem_e4c2c1;
  const {
    Icon,
    Photo,
    Arch,
    ISO
  } = window.Site;
  const LOGO = "../../assets/logos/deserto-logo-full.png";

  /* ============ Story — the dessert + desierto wordplay ============ */
  function Story() {
    return /*#__PURE__*/React.createElement("section", {
      id: "story",
      style: {
        background: "var(--wine-700)",
        color: "var(--cream-50)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "var(--space-9) var(--space-6)",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "var(--space-8)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        color: "var(--lime-400)"
      }
    }, "Our story"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-5xl)",
        margin: "12px 0 0",
        lineHeight: 0.98,
        color: "var(--cream-50)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block"
      }
    }, "Dessert,"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        color: "var(--lime-400)",
        fontStyle: "italic",
        fontFamily: "var(--font-editorial)",
        fontWeight: 800
      }
    }, "meet desierto.")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-editorial)",
        fontSize: "var(--text-lg)",
        lineHeight: 1.62,
        color: "rgba(255,255,255,0.84)",
        maxWidth: 500,
        marginTop: "var(--space-5)"
      }
    }, "One invented name, two languages, two meanings \u2014 ", /*#__PURE__*/React.createElement("em", null, "dessert"), " and ", /*#__PURE__*/React.createElement("em", null, "desierto"), " (desert). It's the promise behind every cup: a warm, softly-lit, arched space where health and indulgence finally sit at the same table \u2014 crafted for the way you eat, move and treat yourself.")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Arch, {
      style: {
        width: 360,
        height: 460,
        boxShadow: "var(--shadow-lg)",
        border: "10px solid rgba(255,255,255,0.10)"
      }
    }, /*#__PURE__*/React.createElement(Photo, {
      src: "interior-froyo-arches.jpg",
      pos: "center",
      label: "Our caf\xE9",
      height: "100%"
    })))));
  }

  /* ============ Visit us — the one real store ============ */
  function Locations() {
    const {
      store
    } = window.SITE;
    return /*#__PURE__*/React.createElement("section", {
      id: "locations",
      style: {
        background: "var(--surface-page)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "var(--space-9) var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        alignItems: "stretch",
        background: "var(--white)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-md)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 380
      }
    }, /*#__PURE__*/React.createElement(Photo, {
      src: store.img,
      pos: "center",
      label: store.name,
      height: "100%"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "var(--space-7)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        color: "var(--wine-500)"
      }
    }, "Visit us"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-4xl)",
        margin: "10px 0 0",
        color: "var(--wine-700)",
        lineHeight: 1
      }
    }, "River & Craycroft,", /*#__PURE__*/React.createElement("br", null), "Tucson"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginTop: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 17,
      color: "var(--olive-600)"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-md)",
        lineHeight: 1.45
      }
    }, store.addr, /*#__PURE__*/React.createElement("br", null), store.city)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 17,
      color: "var(--caramel-500)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-md)"
      }
    }, store.hours)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 17,
      color: "var(--wine-500)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-md)"
      }
    }, store.phone))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginTop: "var(--space-6)",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: store.maps,
      target: "_blank",
      rel: "noopener",
      className: "btn-wine",
      style: {
        borderRadius: 999,
        padding: "14px 26px",
        background: "var(--wine-700)",
        color: "var(--cream-50)",
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        display: "inline-flex",
        alignItems: "center",
        gap: 9
      }
    }, "Get directions", /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 16,
      color: "var(--cream-50)"
    })), /*#__PURE__*/React.createElement("a", {
      href: "order.html",
      style: {
        borderRadius: 999,
        padding: "14px 26px",
        border: "2px solid var(--wine-700)",
        color: "var(--wine-700)",
        fontFamily: "var(--font-body)",
        fontWeight: 800,
        fontSize: "var(--text-sm)",
        display: "inline-flex",
        alignItems: "center"
      }
    }, "Order pickup"))))));
  }

  /* ============ Footer ============ */
  function Footer() {
    const [email, setEmail] = React.useState("");
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: "var(--coffee-600)",
        color: "var(--sand-200)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        padding: "var(--space-8) var(--space-6)",
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: LOGO,
      alt: "Deserto",
      style: {
        height: 46,
        filter: "brightness(0) invert(1)",
        opacity: 0.92
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16,
        color: "var(--ink-300)",
        fontSize: "var(--text-sm)",
        maxWidth: 260,
        fontFamily: "var(--font-editorial)"
      }
    }, "Where coffee meets creamy bliss. 5635 E River Rd, Unit 101 \u2014 Tucson, Arizona.")), [["Menu", ["Frozen Yogurt", "Tonics", "Coffee", "Pastries"]], ["Deserto", ["Our story", "Visit us", "Order online"]]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
      key: h
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        color: "var(--cream-50)",
        marginBottom: 14,
        fontSize: "var(--text-sm)",
        letterSpacing: ".04em"
      }
    }, h), items.map(i => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        color: "var(--ink-300)",
        fontSize: "var(--text-sm)",
        marginBottom: 9
      }
    }, i)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        color: "var(--cream-50)",
        marginBottom: 14,
        fontSize: "var(--text-sm)",
        letterSpacing: ".04em"
      }
    }, "Get our drops"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--ink-300)",
        fontSize: "var(--text-sm)",
        marginBottom: 12
      }
    }, "Seasonal flavors & rewards, no spam."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: email,
      onChange: e => setEmail(e.target.value),
      placeholder: "you@email.com",
      style: {
        flex: 1,
        minWidth: 0,
        border: "none",
        borderRadius: "var(--radius-md)",
        padding: "11px 13px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)"
      }
    }), /*#__PURE__*/React.createElement(NS.Button, {
      variant: "accent",
      size: "md"
    }, "Join")))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid rgba(255,255,255,0.08)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px var(--space-6)",
        maxWidth: "var(--container-xl)",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        color: "var(--ink-400)",
        fontSize: "var(--text-xs)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Deserto Group LLC. All rights reserved."), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "instagram",
      size: 18
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "facebook",
      size: 18
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "twitter",
      size: 18
    })))));
  }
  window.Site = Object.assign(window.Site || {}, {
    Story,
    Locations,
    Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-story.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

})();
