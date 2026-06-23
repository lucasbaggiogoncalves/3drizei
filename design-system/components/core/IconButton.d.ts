import * as React from 'react';

/** Circular icon-only button. Always pass a `label` for accessibility. */
export interface IconButtonProps {
  /** @default "soft" */
  variant?: 'soft' | 'solid' | 'outline' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (aria-label + title). */
  label: string;
  disabled?: boolean;
  /** The icon node. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function IconButton(props: IconButtonProps): JSX.Element;
