import * as React from "react";

/**
 * Selectable filter / topping chip. Selected = wine fill. Optional leading color
 * dot and a removable × button.
 */
export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick"> {
  selected?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  /** Leading dot color (e.g. a flavor swatch). */
  dotColor?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
