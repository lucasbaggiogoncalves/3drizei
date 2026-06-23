import * as React from 'react';

/** Small status pill for product/order states. */
export interface BadgeProps {
  /** @default "brand" */
  tone?: 'brand' | 'copper' | 'neutral' | 'success' | 'warning' | 'danger';
  /** @default "soft" */
  variant?: 'soft' | 'solid';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
