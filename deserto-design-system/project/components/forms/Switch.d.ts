import * as React from "react";

/**
 * Pill toggle switch. On = orange with a springy knob. Controlled via
 * `checked` + `onChange(next: boolean)`. Optional inline label.
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
  /** Inline label rendered to the right of the switch. */
  label?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
