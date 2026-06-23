import * as React from 'react';

/** Multi-line text area, e.g. for personalization notes. */
export interface TextareaProps {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  /** @default 4 */
  rows?: number;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}

export function Textarea(props: TextareaProps): JSX.Element;
