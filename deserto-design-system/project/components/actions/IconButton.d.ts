import * as React from "react";

/**
 * Square or circular button housing a single icon (pass a Lucide node as children).
 * Always provide an `aria-label`.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "ghost" */
  variant?: "primary" | "accent" | "soft" | "ghost" | "outline";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Pill (circular) when true, rounded-square when false. @default true */
  round?: boolean;
  /** Accessible label — required for icon-only buttons. */
  "aria-label": string;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
