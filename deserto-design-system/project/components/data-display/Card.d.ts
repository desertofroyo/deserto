import * as React from "react";

/**
 * Warm surface container with soft radius and cocoa-tinted shadow. Optional top
 * media slot, hover lift, and clickable affordance.
 *
 * @startingPoint section="Data display" subtitle="Content card with media, body & hover lift" viewport="360x420"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Media node (img/video) rendered flush at the top, above the padded body. */
  media?: React.ReactNode;
  /** Inner padding for the body. @default "var(--space-5)" */
  padding?: string;
  /** Resting shadow depth. @default "sm" */
  elevation?: "none" | "sm" | "md" | "lg";
  /** Enables hover lift + pointer cursor. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
