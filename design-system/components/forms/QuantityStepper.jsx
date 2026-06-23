import React from 'react';

/** Quantity stepper for cart / order lines. */
export function QuantityStepper({ value, defaultValue = 1, min = 1, max = 99, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const v = isControlled ? value : internal;

  const set = (next) => {
    const clamped = Math.max(min, Math.min(max, next));
    if (!isControlled) setInternal(clamped);
    onChange && onChange(clamped);
  };

  const btn = {
    width: 38, height: 38, flex: 'none',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'transparent', border: 'none', cursor: 'pointer',
    color: 'var(--terracotta-600)', fontSize: 20, fontFamily: 'var(--font-display)',
    borderRadius: 'var(--radius-pill)',
  };

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-card)', padding: '2px', ...style,
    }} {...rest}>
      <button aria-label="Diminuir" style={{ ...btn, opacity: v <= min ? 0.35 : 1 }} onClick={() => set(v - 1)} disabled={v <= min}>−</button>
      <span style={{
        minWidth: 32, textAlign: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
        fontSize: 'var(--text-base)', color: 'var(--text-strong)',
      }}>{v}</span>
      <button aria-label="Aumentar" style={{ ...btn, opacity: v >= max ? 0.35 : 1 }} onClick={() => set(v + 1)} disabled={v >= max}>+</button>
    </div>
  );
}
