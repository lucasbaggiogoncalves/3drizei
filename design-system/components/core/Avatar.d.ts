import * as React from 'react';

/** Circular avatar — image or initials fallback. */
export interface AvatarProps {
  /** Image URL. Falls back to initials if absent. */
  src?: string;
  /** Full name — initials are derived from it. */
  name?: string;
  /** @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
