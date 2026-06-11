import * as React from "react";

/**
 * Pill-shaped, warm, tactile button. Primary actions use wine; high-energy
 * CTAs use accent (orange). Presses scale down 0.97 with an ease-bounce.
 *
 * @startingPoint section="Actions" subtitle="Primary, accent, secondary, outline & ghost buttons" viewport="700x180"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "accent" | "secondary" | "outline" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
