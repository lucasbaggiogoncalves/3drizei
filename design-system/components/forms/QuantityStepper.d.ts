import * as React from 'react';

/** Quantity stepper for cart / order lines. Controlled or uncontrolled. */
export interface QuantityStepperProps {
  value?: number;
  /** @default 1 */
  defaultValue?: number;
  /** @default 1 */
  min?: number;
  /** @default 99 */
  max?: number;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}

export function QuantityStepper(props: QuantityStepperProps): JSX.Element;
