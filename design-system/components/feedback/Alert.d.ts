import * as React from 'react';

/** Inline alert / message banner with a colored accent edge. */
export interface AlertProps {
  /** @default "info" */
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'brand';
  title?: React.ReactNode;
  icon?: React.ReactNode;
  /** Show a × close button. */
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Alert(props: AlertProps): JSX.Element;
