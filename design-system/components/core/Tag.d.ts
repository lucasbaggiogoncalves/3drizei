import * as React from 'react';

/** Filter / category chip. Selectable, optionally removable. */
export interface TagProps {
  /** Selected (filled terracotta) state. @default false */
  selected?: boolean;
  /** Show a × remove affordance. @default false */
  removable?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export function Tag(props: TagProps): JSX.Element;
