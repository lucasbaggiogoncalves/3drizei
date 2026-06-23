import * as React from 'react';

/** Toggle switch — terracotta track when on. Controlled or uncontrolled. */
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, e: React.MouseEvent) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
