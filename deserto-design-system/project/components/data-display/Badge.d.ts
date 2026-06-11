import * as React from "react";

/**
 * Compact status/label pill in brand tones.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "wine" */
  tone?: "wine" | "mauve" | "rose" | "sage" | "amber" | "coffee" | "neutral";
  /** Filled vs tinted. @default "soft" */
  variant?: "soft" | "solid";
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
