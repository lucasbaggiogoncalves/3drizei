import * as React from 'react';

/** Soft-rounded white surface container with warm shadow. */
export interface CardProps {
  /** Lift + deepen shadow on hover. @default false */
  interactive?: boolean;
  /** Inner padding. @default "md" */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export function Card(props: CardProps): JSX.Element;
