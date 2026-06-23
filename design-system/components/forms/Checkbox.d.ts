import * as React from 'react';

/** Labeled checkbox. Controlled (`checked`) or uncontrolled (`defaultChecked`). */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, e: React.MouseEvent) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
