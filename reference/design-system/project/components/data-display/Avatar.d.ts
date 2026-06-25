import * as React from "react";

/**
 * Circular avatar with image or initials fallback on a warm tint.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials from `name` when absent. */
  src?: string;
  /** Full name — used for initials and alt text. */
  name?: string;
  /** Diameter in px. @default 40 */
  size?: number;
  /** Fallback tint. @default "wine" */
  tone?: "wine" | "orange" | "olive" | "coffee";
}

export function Avatar(props: AvatarProps): JSX.Element;
