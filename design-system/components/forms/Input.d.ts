import * as React from 'react';

/** Labeled text input with optional leading icon, hint and error. */
export interface InputProps {
  label?: string;
  hint?: string;
  /** Error message — turns the field red and replaces the hint. */
  error?: string;
  leftIcon?: React.ReactNode;
  id?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
