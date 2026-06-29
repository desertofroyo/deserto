import {
  Search, ShoppingBag, ArrowRight, ArrowLeft, MapPin, Clock, Phone,
  Instagram, Facebook, Twitter, Plus, IceCreamBowl, CupSoda, Coffee,
  Cookie, Signal, Wifi, BatteryFull, House, Gift, WandSparkles, Trash2,
  ChevronRight, Check, Star, Sparkles, Cake, Info,
} from "lucide-react";

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
  instagram: Instagram,
  facebook: Facebook,
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
  "chevron-right": ChevronRight,
  check: Check,
  star: Star,
  sparkles: Sparkles,
  cake: Cake,
  info: Info,
};

export function Icon({ name, size = 20, color = "currentColor", strokeWidth = 2, style = {} }) {
  const Cmp = ICONS[name];
  return (
    <span style={{ display: "inline-flex", lineHeight: 0, ...style }}>
      {Cmp ? <Cmp size={size} color={color} strokeWidth={strokeWidth} /> : null}
    </span>
  );
}
