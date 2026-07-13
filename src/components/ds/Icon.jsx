import {
  Search, ShoppingBag, ArrowRight, ArrowLeft, MapPin, Clock, Phone,
  Instagram, Facebook, Twitter, Plus, IceCreamBowl, CupSoda, Coffee,
  Cookie, Signal, Wifi, BatteryFull, House, Gift, WandSparkles, Trash2,
  ChevronLeft, ChevronRight, Check, Star, Sparkles, Cake, Info, Leaf, Snowflake, Zap,
  Play, Pause, X, Mail,
} from "lucide-react";

/* TikTok isn't in lucide's set — a filled brand glyph, drawn to match the
   size/color API of the lucide icons so it drops into the same wrapper. */
function TikTok({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.43-2.44V9.4a5.66 5.66 0 0 0-.84-.06A5.68 5.68 0 0 0 7.51 20a5.68 5.68 0 0 0 5.85-1.36 5.66 5.66 0 0 0 1.68-4.03V8.31A7.32 7.32 0 0 0 19.31 9.7V6.61a4.28 4.28 0 0 1-2.71-.79z" />
    </svg>
  );
}

/**
 * Deserto Icon — thin wrapper over lucide-react that accepts the brand's
 * kebab-case icon names (e.g. "shopping-bag", "ice-cream-bowl") so the
 * prototype markup ports across unchanged. Only the icons the kits actually
 * use are imported, so the set stays tree-shaken.
 */
const ICONS = {
  search: Search,
  "shopping-bag": ShoppingBag,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "map-pin": MapPin,
  clock: Clock,
  phone: Phone,
  mail: Mail,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTok,
  twitter: Twitter,
  plus: Plus,
  "ice-cream-bowl": IceCreamBowl,
  "cup-soda": CupSoda,
  coffee: Coffee,
  cookie: Cookie,
  signal: Signal,
  wifi: Wifi,
  "battery-full": BatteryFull,
  house: House,
  gift: Gift,
  "wand-sparkles": WandSparkles,
  "trash-2": Trash2,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  check: Check,
  star: Star,
  sparkles: Sparkles,
  cake: Cake,
  info: Info,
  leaf: Leaf,
  snowflake: Snowflake,
  zap: Zap,
  play: Play,
  pause: Pause,
  x: X,
};

export function Icon({ name, size = 20, color = "currentColor", strokeWidth = 2, style = {} }) {
  const Cmp = ICONS[name];
  return (
    <span style={{ display: "inline-flex", lineHeight: 0, ...style }}>
      {Cmp ? <Cmp size={size} color={color} strokeWidth={strokeWidth} /> : null}
    </span>
  );
}
