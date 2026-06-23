import React from 'react';

/** Toggle switch. Terracotta track when on. */
export function Switch({ checked, defaultChecked, onChange, label, disabled = false, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };

  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
      userSelect: 'none', ...style,
    }} {...rest}>
      <span
        onClick={toggle}
        style={{
          width: 46, height: 26, flex: 'none', padding: 3, boxSizing: 'border-box',
          borderRadius: 'var(--radius-pill)',
          background: on ? 'var(--terracotta-500)' : 'var(--clay-300)',
          transition: 'background var(--dur-base) var(--ease-out)',
          display: 'inline-flex', alignItems: 'center',
        }}
      >
        <span style={{
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          boxShadow: 'var(--shadow-sm)',
          transform: on ? 'translateX(20px)' : 'translateX(0)',
          transition: 'transform var(--dur-base) var(--ease-soft)',
        }}/>
      </span>
      {label && <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
