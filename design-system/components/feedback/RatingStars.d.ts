import * as React from 'react';

/** Star rating — display, or input when `onChange` is supplied. Copper-gold stars. */
export interface RatingStarsProps {
  /** Current rating value. @default 0 */
  value?: number;
  /** @default 5 */
  max?: number;
  /** Star pixel size. @default 18 */
  size?: number;
  /** Optional review count — shows "4.9 (128)". */
  count?: number;
  /** Provide to make stars clickable. */
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}

export function RatingStars(props: RatingStarsProps): JSX.Element;
