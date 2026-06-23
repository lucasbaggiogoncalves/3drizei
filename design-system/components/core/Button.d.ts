import * as React from 'react';

/**
 * Primary action button for 3drizei. Rounded pill, warm terracotta default.
 *
 * @startingPoint section="Core" subtitle="Brand action button, 5 variants" viewport="700x140"
 */
export interface ButtonProps {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse';
  /** Control size. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill container width. @default false */
  full?: boolean;
  /** Native button type. @default "button" */
  type?: 'button' | 'submit' | 'reset';
  /** Element rendered before the label (e.g. an icon). */
  iconLeft?: React.ReactNode;
  /** Element rendered after the label. */
  iconRight?: React.ReactNode;
  /** Disabled state. @default false */
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: ButtonProps): JSX.Element;
