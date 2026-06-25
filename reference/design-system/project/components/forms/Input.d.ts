import * as React from "react";

/**
 * Warm text field with soft radius and an orange focus ring. Supports a label,
 * helper/error text, and leading/trailing adornments (e.g. icons).
 *
 * @startingPoint section="Forms" subtitle="Text input with label, helper & adornments" viewport="700x140"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Field label rendered above the input. */
  label?: React.ReactNode;
  /** Muted helper text below the field. */
  helperText?: React.ReactNode;
  /** Error message — turns the border/text to danger and overrides helperText. */
  error?: React.ReactNode;
  /** Node shown inside the field, before the text. */
  leading?: React.ReactNode;
  /** Node shown inside the field, after the text. */
  trailing?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

export function Input(props: InputProps): JSX.Element;
