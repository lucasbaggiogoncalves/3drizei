/* @ds-bundle: {"format":3,"namespace":"Ds3drizeiDesignSystem_046328","components":[{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"RatingStars","sourcePath":"components/feedback/RatingStars.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/commerce/ProductCard.jsx":"4b805060fb12","components/core/Avatar.jsx":"54d91b158ad5","components/core/Badge.jsx":"0c887e4fd628","components/core/Button.jsx":"5758ec4df42d","components/core/Card.jsx":"569a801e5c5d","components/core/IconButton.jsx":"86ddc8e5e4ae","components/core/Tag.jsx":"6e748f98fa0b","components/feedback/Alert.jsx":"c5d6c738aeec","components/feedback/RatingStars.jsx":"2107de0fb27a","components/forms/Checkbox.jsx":"58df1ec93e3a","components/forms/Input.jsx":"94edfb8958bf","components/forms/QuantityStepper.jsx":"2b226331b958","components/forms/Switch.jsx":"c827ae119462","components/forms/Textarea.jsx":"5c787ca519fe","ui_kits/storefront/data.js":"7503bcb2b3ce","ui_kits/storefront/parts.jsx":"f609308d0b2a","ui_kits/storefront/screens.jsx":"e117489ad7fd"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Ds3drizeiDesignSystem_046328 = window.Ds3drizeiDesignSystem_046328 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — initials or image, circular. Warm clay fallback.
 */
function Avatar({
  src,
  name = '',
  size = 'md',
  style = {},
  ...rest
}) {
  const dims = {
    xs: 24,
    sm: 32,
    md: 44,
    lg: 60,
    xl: 88
  }[size] || 44;
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: dims,
      height: dims,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      background: src ? 'var(--clay-200)' : 'var(--copper-100)',
      color: 'var(--copper-700)',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: Math.round(dims * 0.38),
      overflow: 'hidden',
      flex: 'none',
      border: '2px solid var(--surface-card)',
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '·');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status pill — "Novo", "Personalizável", "Esgotado", etc.
 */
function Badge({
  tone = 'brand',
  variant = 'soft',
  children,
  style = {},
  ...rest
}) {
  const tones = {
    brand: {
      soft: ['var(--terracotta-50)', 'var(--terracotta-700)'],
      solid: ['var(--terracotta-500)', '#fff']
    },
    copper: {
      soft: ['var(--copper-50)', 'var(--copper-700)'],
      solid: ['var(--copper-500)', '#fff']
    },
    neutral: {
      soft: ['var(--clay-100)', 'var(--clay-700)'],
      solid: ['var(--clay-700)', 'var(--clay-50)']
    },
    success: {
      soft: ['var(--success-50)', 'var(--success-700)'],
      solid: ['var(--success-500)', '#fff']
    },
    warning: {
      soft: ['var(--warning-50)', 'var(--warning-700)'],
      solid: ['var(--warning-500)', '#fff']
    },
    danger: {
      soft: ['var(--danger-50)', 'var(--danger-700)'],
      solid: ['var(--danger-500)', '#fff']
    }
  };
  const [bg, fg] = (tones[tone] || tones.brand)[variant];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 10px',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-xs)',
      lineHeight: 1.4,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * 3drizei Button — the primary action primitive.
 * Rounded, warm, tactile. Press shrinks slightly; hover deepens + lifts.
 */
function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  type = 'button',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      height: 'var(--control-sm)',
      padding: '0 16px',
      font: 'var(--text-sm)',
      gap: '6px'
    },
    md: {
      height: 'var(--control-md)',
      padding: '0 22px',
      font: 'var(--text-base)',
      gap: '8px'
    },
    lg: {
      height: 'var(--control-lg)',
      padding: '0 30px',
      font: 'var(--text-lg)',
      gap: '10px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--action-bg)',
      color: 'var(--action-fg)',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'var(--copper-500)',
      color: 'var(--text-on-brand)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--terracotta-600)',
      border: '2px solid var(--terracotta-500)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-brand)',
      border: '1px solid transparent'
    },
    inverse: {
      background: 'var(--clay-950)',
      color: 'var(--clay-50)',
      border: '1px solid transparent'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    width: full ? '100%' : 'auto',
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: s.font,
    lineHeight: 1,
    letterSpacing: '0.005em',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-fast) var(--ease-soft), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ...v,
    ...style
  };
  const hoverBg = {
    primary: 'var(--action-bg-hover)',
    secondary: 'var(--copper-600)',
    outline: 'var(--terracotta-50)',
    ghost: 'var(--terracotta-50)',
    inverse: 'var(--clay-800)'
  }[variant];
  const onEnter = e => {
    if (disabled) return;
    e.currentTarget.style.background = hoverBg;
    if (variant === 'primary') e.currentTarget.style.boxShadow = 'var(--shadow-brand)';
    e.currentTarget.style.transform = 'translateY(-1px)';
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'none';
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'scale(0.96)';
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. White, soft-rounded, warm shadow. Optional hover lift.
 */
function Card({
  interactive = false,
  padding = 'md',
  children,
  style = {},
  ...rest
}) {
  const pad = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  }[padding] ?? 'var(--space-6)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-sm)',
      padding: pad,
      transition: 'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    } : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Circular icon-only button. Pass a Lucide icon (or any node) as children.
 */
function IconButton({
  variant = 'soft',
  size = 'md',
  label,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 36,
    md: 44,
    lg: 54
  }[size] || 44;
  const variants = {
    soft: {
      background: 'var(--terracotta-50)',
      color: 'var(--terracotta-600)',
      border: '1px solid transparent'
    },
    solid: {
      background: 'var(--action-bg)',
      color: 'var(--action-fg)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'var(--surface-card)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.soft;
  const hover = {
    soft: 'var(--terracotta-100)',
    solid: 'var(--action-bg-hover)',
    outline: 'var(--clay-50)',
    ghost: 'var(--clay-100)'
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    style: {
      width: dims,
      height: dims,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-soft)',
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = hover;
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.background = v.background;
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.9)';
    },
    onMouseUp: e => {
      if (!disabled) e.currentTarget.style.transform = 'none';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Filter / category chip. Selectable and optionally removable.
 */
function Tag({
  selected = false,
  removable = false,
  onRemove,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 14px',
      background: selected ? 'var(--terracotta-500)' : 'var(--surface-card)',
      color: selected ? 'var(--text-on-brand)' : 'var(--text-body)',
      border: selected ? '1px solid var(--terracotta-500)' : '1px solid var(--border-default)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.2,
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), children, removable && /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Remover",
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove(e);
    },
    style: {
      display: 'inline-flex',
      opacity: 0.7,
      fontSize: '14px',
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inline alert / message banner. */
function Alert({
  tone = 'info',
  title,
  icon,
  onClose,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    info: ['var(--info-50)', 'var(--info-700)', 'var(--info-500)'],
    success: ['var(--success-50)', 'var(--success-700)', 'var(--success-500)'],
    warning: ['var(--warning-50)', 'var(--warning-700)', 'var(--warning-500)'],
    danger: ['var(--danger-50)', 'var(--danger-700)', 'var(--danger-500)'],
    brand: ['var(--terracotta-50)', 'var(--terracotta-700)', 'var(--terracotta-500)']
  };
  const [bg, fg, accent] = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 16px',
      background: bg,
      borderRadius: 'var(--radius-lg)',
      borderLeft: `3px solid ${accent}`,
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      display: 'inline-flex',
      marginTop: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-base)',
      color: fg,
      marginBottom: children ? 2 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      lineHeight: 1.5
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Fechar",
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: fg,
      opacity: 0.6,
      fontSize: 18,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/RatingStars.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Star rating display / input. Copper-gold stars. */
function RatingStars({
  value = 0,
  max = 5,
  size = 18,
  onChange,
  count,
  style = {},
  ...rest
}) {
  const interactive = typeof onChange === 'function';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: '2px'
    }
  }, Array.from({
    length: max
  }).map((_, i) => {
    const filled = i < Math.round(value);
    return /*#__PURE__*/React.createElement("svg", {
      key: i,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: filled ? 'var(--copper-400)' : 'none',
      stroke: filled ? 'var(--copper-400)' : 'var(--clay-300)',
      strokeWidth: "1.8",
      strokeLinejoin: "round",
      style: {
        cursor: interactive ? 'pointer' : 'default'
      },
      onClick: interactive ? () => onChange(i + 1) : undefined
    }, /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    }));
  })), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginLeft: 2
    }
  }, value.toFixed(1), " (", count, ")"));
}
Object.assign(__ds_scope, { RatingStars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/RatingStars.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Product card for the 3drizei storefront. Image, title, price, badges, rating.
 * When no `image` is given, shows a warm clay placeholder with layer-line texture.
 */
function ProductCard({
  title,
  price,
  image,
  badge,
  rating,
  ratingCount,
  liked = false,
  onLike,
  onAdd,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [fav, setFav] = React.useState(liked);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      background: image ? 'var(--clay-100)' : 'var(--clay-100)',
      backgroundImage: image ? `url(${image})` : 'var(--layerlines)',
      backgroundSize: image ? 'cover' : 'auto',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, !image && /*#__PURE__*/React.createElement("svg", {
    width: "56",
    height: "56",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--copper-400)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 12 20 22 4 22 4 12"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
  })), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "brand",
    variant: "solid"
  }, badge)), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Favoritar",
    onClick: e => {
      e.stopPropagation();
      setFav(!fav);
      onLike && onLike(!fav);
    },
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 38,
      height: 38,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: fav ? 'var(--terracotta-500)' : 'none',
    stroke: fav ? 'var(--terracotta-500)' : 'var(--clay-600)',
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)'
    }
  }, rating != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.RatingStars, {
    value: rating,
    count: ratingCount,
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)',
      lineHeight: 1.25,
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-xl)',
      color: 'var(--terracotta-600)'
    }
  }, price), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Adicionar",
    onClick: e => {
      e.stopPropagation();
      onAdd && onAdd();
    },
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      cursor: 'pointer',
      background: 'var(--terracotta-500)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-base) var(--ease-out)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--terracotta-600)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--terracotta-500)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }))))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with label. Terracotta fill when checked. */
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    style: {
      width: 22,
      height: 22,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-xs)',
      background: on ? 'var(--terracotta-500)' : 'var(--surface-card)',
      border: on ? '1px solid var(--terracotta-500)' : '1px solid var(--border-strong)',
      color: '#fff',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional label, leading icon, and hint/error.
 */
function Input({
  label,
  hint,
  error,
  leftIcon,
  id,
  size = 'md',
  style = {},
  ...rest
}) {
  const heights = {
    sm: 'var(--control-sm)',
    md: 'var(--control-md)',
    lg: 'var(--control-lg)'
  };
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger-500)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, leftIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '14px',
      display: 'inline-flex',
      color: 'var(--text-subtle)',
      pointerEvents: 'none'
    }
  }, leftIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      width: '100%',
      height: heights[size],
      boxSizing: 'border-box',
      padding: leftIcon ? '0 16px 0 42px' : '0 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      background: 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    },
    onFocus: e => {
      e.target.style.borderColor = error ? 'var(--danger-500)' : 'var(--terracotta-500)';
      e.target.style.boxShadow = 'var(--ring)';
    },
    onBlur: e => {
      e.target.style.borderColor = borderColor;
      e.target.style.boxShadow = 'none';
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger-500)' : 'var(--text-subtle)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Quantity stepper for cart / order lines. */
function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const v = isControlled ? value : internal;
  const set = next => {
    const clamped = Math.max(min, Math.min(max, next));
    if (!isControlled) setInternal(clamped);
    onChange && onChange(clamped);
  };
  const btn = {
    width: 38,
    height: 38,
    flex: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--terracotta-600)',
    fontSize: 20,
    fontFamily: 'var(--font-display)',
    borderRadius: 'var(--radius-pill)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-card)',
      padding: '2px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Diminuir",
    style: {
      ...btn,
      opacity: v <= min ? 0.35 : 1
    },
    onClick: () => set(v - 1),
    disabled: v <= min
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 32,
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)'
    }
  }, v), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Aumentar",
    style: {
      ...btn,
      opacity: v >= max ? 0.35 : 1
    },
    onClick: () => set(v + 1),
    disabled: v >= max
  }, "+"));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Terracotta track when on. */
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    style: {
      width: 46,
      height: 26,
      flex: 'none',
      padding: 3,
      boxSizing: 'border-box',
      borderRadius: 'var(--radius-pill)',
      background: on ? 'var(--terracotta-500)' : 'var(--clay-300)',
      transition: 'background var(--dur-base) var(--ease-out)',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transform: on ? 'translateX(20px)' : 'translateX(0)',
      transition: 'transform var(--dur-base) var(--ease-soft)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text area — for personalization notes. */
function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  style = {},
  ...rest
}) {
  const inputId = id || (label ? `ta-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger-500)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    rows: rows,
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px 16px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-body)',
      background: 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    },
    onFocus: e => {
      e.target.style.borderColor = 'var(--terracotta-500)';
      e.target.style.boxShadow = 'var(--ring)';
    },
    onBlur: e => {
      e.target.style.borderColor = borderColor;
      e.target.style.boxShadow = 'none';
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger-500)' : 'var(--text-subtle)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
// 3drizei storefront — demo catalog data.
// Images are intentionally omitted: products render as warm clay placeholders
// with a category icon, so the kit ships honestly without invented photography.
window.STORE_CATEGORIES = ['Todos', 'Presentes', 'Decoração', 'Festas', 'Casa'];
window.STORE_PRODUCTS = [{
  id: 'p1',
  title: 'Luminária Lua personalizada',
  price: 11990,
  cat: 'Decoração',
  icon: 'moon',
  badge: 'Novo',
  rating: 4.9,
  count: 128,
  tint: 'var(--terracotta-50)',
  desc: 'Luminária em PLA translúcido com o nome ou a data que você escolher gravados na base. Luz quente, perfeita para o quarto.'
}, {
  id: 'p2',
  title: 'Vaso geométrico com nome',
  price: 7990,
  cat: 'Decoração',
  rating: 4.8,
  count: 64,
  tint: 'var(--copper-50)',
  desc: 'Vaso decorativo de facetas, com nome em relevo. Para suculentas ou flores secas.'
}, {
  id: 'p3',
  title: 'Topo de bolo personalizado',
  price: 4990,
  cat: 'Festas',
  icon: 'cake',
  badge: 'Sob encomenda',
  rating: 5,
  count: 210,
  tint: 'var(--terracotta-50)',
  desc: 'Topo de bolo com nome e idade. Escolha a fonte e a cor do filamento.'
}, {
  id: 'p4',
  title: 'Chaveiro com nome em relevo',
  price: 2990,
  cat: 'Presentes',
  icon: 'key-round',
  rating: 4.7,
  count: 96,
  tint: 'var(--clay-100)',
  desc: 'Chaveiro resistente, leve, com o nome em alto relevo. Lembrancinha perfeita.'
}, {
  id: 'p5',
  title: 'Porta-retrato litofania 3D',
  price: 8990,
  cat: 'Presentes',
  icon: 'image',
  badge: 'Mais amado',
  rating: 4.9,
  count: 173,
  tint: 'var(--copper-50)',
  desc: 'Sua foto vira uma litofania: na luz, a imagem aparece em detalhes. Emoção que se acende.'
}, {
  id: 'p6',
  title: 'Caneca geométrica decorativa',
  price: 5990,
  cat: 'Casa',
  icon: 'coffee',
  rating: 4.6,
  count: 41,
  tint: 'var(--clay-100)',
  desc: 'Caneca decorativa de facetas para a estante ou a mesa de trabalho.'
}, {
  id: 'p7',
  title: 'Suporte de fone escultural',
  price: 6990,
  cat: 'Casa',
  icon: 'headphones',
  rating: 4.8,
  count: 52,
  tint: 'var(--terracotta-50)',
  desc: 'Suporte de mesa para headset, com base pesada e acabamento fosco.'
}, {
  id: 'p8',
  title: 'Plaquinha de porta personalizada',
  price: 3990,
  cat: 'Decoração',
  icon: 'door-open',
  rating: 4.7,
  count: 88,
  tint: 'var(--copper-50)',
  desc: 'Plaquinha com nome e ícone à sua escolha. Para o quarto das crianças ou o home office.'
}, {
  id: 'p9',
  title: 'Mini busto personalizado',
  price: 14990,
  cat: 'Presentes',
  icon: 'user-round',
  badge: 'Edição especial',
  rating: 4.9,
  count: 37,
  tint: 'var(--terracotta-50)',
  desc: 'A partir de uma foto, modelamos um mini busto seu — ou de quem você ama.'
}];
window.fmtBRL = cents => 'R$\u00A0' + (cents / 100).toFixed(2).replace('.', ',');
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

// ui_kits/storefront/parts.jsx
try { (() => {
/* global React */
// 3drizei storefront — shared UI parts. Exports to window for sibling babel scripts.
const DS = window.Ds3drizeiDesignSystem_046328;
const {
  Badge,
  RatingStars,
  IconButton,
  Button
} = DS;
const Ic = ({
  n,
  s
}) => /*#__PURE__*/React.createElement("i", {
  "data-lucide": n,
  style: s
});
function Logo({
  height = 40,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-badge-512.png",
    alt: "3drizei",
    style: {
      height,
      width: height,
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '-0.01em',
      color: 'var(--clay-950)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--terracotta-500)'
    }
  }, "3d"), "rizei"));
}
function Header({
  cartCount,
  onCart,
  onNav,
  active
}) {
  const links = [['Início', 'home'], ['Loja', 'catalog'], ['Como funciona', 'home'], ['Contato', 'home']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(251,245,239,0.86)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 28px',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    onClick: () => onNav('home')
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      marginLeft: 12
    }
  }, links.map(([label, to], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onNav(to),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px 14px',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 15,
      color: active === to && to !== 'home' ? 'var(--terracotta-600)' : 'var(--text-body)',
      borderRadius: 'var(--radius-pill)'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      position: 'absolute',
      left: 14,
      width: 17,
      height: 17,
      color: 'var(--text-subtle)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar presente\u2026",
    style: {
      height: 42,
      width: 200,
      paddingLeft: 40,
      paddingRight: 14,
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-card)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      outline: 'none'
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Favoritos",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "heart"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Sacola",
    variant: "soft",
    onClick: onCart
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "shopping-bag"
  })), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -2,
      right: -2,
      minWidth: 20,
      height: 20,
      padding: '0 5px',
      background: 'var(--terracotta-500)',
      color: '#fff',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-display)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid var(--surface-page)'
    }
  }, cartCount)))));
}

// Warm clay placeholder with category icon — the consistent product visual.
function ProductImage({
  p,
  ratio = '1 / 1',
  big = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: ratio,
      background: p.tint || 'var(--clay-100)',
      backgroundImage: 'var(--layerlines)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": p.icon || 'gift',
    style: {
      width: big ? 110 : 56,
      height: big ? 110 : 56,
      color: 'var(--copper-400)',
      opacity: 0.62,
      strokeWidth: 1.3
    }
  }));
}
function Tile({
  p,
  onOpen,
  onAdd,
  liked,
  onLike
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(p),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ProductImage, {
    p: p
  }), p.badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    variant: "solid"
  }, p.badge)), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Favoritar",
    onClick: e => {
      e.stopPropagation();
      onLike(p.id);
    },
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 38,
      height: 38,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.92)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "heart",
    style: {
      width: 18,
      height: 18,
      color: liked ? 'var(--terracotta-500)' : 'var(--clay-600)',
      fill: liked ? 'var(--terracotta-500)' : 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(RatingStars, {
    value: p.rating,
    count: p.count,
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 18,
      color: 'var(--text-strong)',
      lineHeight: 1.25,
      marginBottom: 10,
      minHeight: 45
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--terracotta-600)'
    }
  }, window.fmtBRL(p.price)), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Adicionar",
    onClick: e => {
      e.stopPropagation();
      onAdd(p);
    },
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: 'var(--terracotta-500)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--terracotta-600)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--terracotta-500)'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 19,
      height: 19
    }
  })))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--clay-950)',
      color: 'var(--clay-300)',
      marginTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '56px 28px 36px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-badge-512.png",
    alt: "",
    style: {
      height: 44,
      width: 44,
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--terracotta-400)'
    }
  }, "3d"), "rizei")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.7,
      maxWidth: 280,
      color: 'var(--clay-400)'
    }
  }, "Impress\xE3o 3D personalizada. Decora\xE7\xE3o e presentes feitos para guardar mem\xF3ria."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16
    }
  }, ['instagram', 'message-circle', 'mail'].map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": n,
    style: {
      width: 18,
      height: 18,
      color: 'var(--clay-200)'
    }
  }))))), [['Loja', ['Presentes', 'Decoração', 'Festas', 'Casa']], ['Ajuda', ['Como funciona', 'Prazos', 'Trocas', 'Contato']], ['3drizei', ['Sobre', 'Personalização', 'Atacado', 'Blog']]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      color: '#fff',
      marginBottom: 14
    }
  }, h), items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it,
    style: {
      fontSize: 14,
      padding: '5px 0',
      color: 'var(--clay-400)',
      cursor: 'pointer'
    }
  }, it))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '20px 28px',
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.05em',
      color: 'var(--clay-500)'
    }
  }, "@3drizei \xB7 IMPRESS\xC3O 3D PERSONALIZADA \xB7 DECORA\xC7\xC3O | PRESENTES"));
}
Object.assign(window, {
  Logo,
  Header,
  Footer,
  Tile,
  ProductImage,
  Ic
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/screens.jsx
try { (() => {
/* global React */
const _DS = window.Ds3drizeiDesignSystem_046328;
const {
  Button,
  Badge,
  Tag,
  RatingStars,
  Input,
  Textarea,
  Checkbox,
  QuantityStepper,
  Alert,
  Avatar
} = _DS;

/* ---------------- HERO ---------------- */
function Hero({
  onShop
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '52px 28px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Decora\xE7\xE3o \xB7 Presentes"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 56,
      lineHeight: 1.04,
      margin: '16px 0 18px',
      letterSpacing: '-0.02em'
    }
  }, "Presentes que", /*#__PURE__*/React.createElement("br", null), "guardam ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--terracotta-500)'
    }
  }, "mem\xF3ria")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      maxWidth: 460,
      marginBottom: 28
    }
  }, "Voc\xEA conta a hist\xF3ria \u2014 um nome, uma data, um detalhe que importa. A gente modela, imprime em 3D e acaba \xE0 m\xE3o."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    }),
    onClick: onShop
  }, "Ver a loja"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "sparkles"
    })
  }, "Personalizar")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      marginTop: 34
    }
  }, [['4.9', 'avaliação média'], ['+1.2k', 'peças entregues'], ['100%', 'feito sob medida']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 26,
      color: 'var(--clay-950)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      borderRadius: 'var(--radius-2xl)',
      background: 'var(--gradient-cream)',
      backgroundImage: 'var(--layerlines)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-badge-512.png",
    alt: "3drizei",
    style: {
      width: '52%',
      filter: 'drop-shadow(0 16px 30px rgba(45,28,18,0.18))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 18,
      left: 18,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "layers",
    style: {
      width: 20,
      height: 20,
      color: 'var(--copper-500)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--clay-950)'
    }
  }, "Camada por camada"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "impresso e acabado \xE0 m\xE3o"))))));
}

/* ---------------- VALUE STRIP ---------------- */
function ValueStrip() {
  const items = [['palette', 'Você escolhe', 'cor, nome, fonte e acabamento'], ['box', 'Embalado para presentear', 'caixa kraft + cartão escrito à mão'], ['truck', 'Enviamos para todo o Brasil', 'e retirada em Belo Horizonte']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '40px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, items.map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: '50%',
      background: 'var(--terracotta-50)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": ic,
    style: {
      width: 21,
      height: 21,
      color: 'var(--terracotta-600)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 16,
      color: 'var(--clay-950)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, d))))));
}

/* ---------------- HOME ---------------- */
function Home({
  products,
  onOpen,
  onAdd,
  onShop,
  liked,
  onLike
}) {
  const featured = products.slice(0, 4);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    onShop: onShop
  }), /*#__PURE__*/React.createElement(ValueStrip, null), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '12px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Favoritos da casa"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 32,
      margin: '8px 0 0'
    }
  }, "Mais presenteados")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    }),
    onClick: onShop
  }, "Ver tudo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 18
    }
  }, featured.map(p => /*#__PURE__*/React.createElement(window.Tile, {
    key: p.id,
    p: p,
    onOpen: onOpen,
    onAdd: onAdd,
    liked: liked.has(p.id),
    onLike: onLike
  })))));
}

/* ---------------- CATALOG ---------------- */
function Catalog({
  products,
  onOpen,
  onAdd,
  liked,
  onLike
}) {
  const [cat, setCat] = React.useState('Todos');
  const list = cat === 'Todos' ? products : products.filter(p => p.cat === cat);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '40px 28px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Loja 3drizei"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40,
      margin: '10px 0 4px'
    }
  }, "Todos os presentes"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 16,
      marginBottom: 24
    }
  }, "Cada pe\xE7a pode ser personalizada com nome, data ou foto."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 28,
      flexWrap: 'wrap'
    }
  }, window.STORE_CATEGORIES.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: cat === c,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 18
    }
  }, list.map(p => /*#__PURE__*/React.createElement(window.Tile, {
    key: p.id,
    p: p,
    onOpen: onOpen,
    onAdd: onAdd,
    liked: liked.has(p.id),
    onLike: onLike
  }))));
}

/* ---------------- PRODUCT DETAIL ---------------- */
function Product({
  p,
  onBack,
  onAdd
}) {
  const [qty, setQty] = React.useState(1);
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('Terracota');
  const [wrap, setWrap] = React.useState(true);
  const colors = [['Terracota', 'var(--terracotta-500)'], ['Cobre', 'var(--copper-500)'], ['Areia', 'var(--clay-300)'], ['Grafite', 'var(--clay-900)']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '28px 28px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 16,
      height: 16
    }
  }), " Voltar para a loja"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(window.ProductImage, {
    p: p,
    big: true,
    ratio: "1 / 1"
  })), /*#__PURE__*/React.createElement("div", null, p.badge && /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, p.badge), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 34,
      margin: '12px 0 10px',
      lineHeight: 1.1
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(RatingStars, {
    value: p.rating,
    count: p.count,
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 32,
      color: 'var(--terracotta-600)',
      marginBottom: 16
    }
  }, window.fmtBRL(p.price)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      marginBottom: 22
    }
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Texto para gravar",
    placeholder: "Nome, data ou frase curta",
    value: name,
    onChange: e => setName(e.target.value),
    leftIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "type"
    })
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text-strong)',
      marginBottom: 8
    }
  }, "Cor do filamento"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, colors.map(([label, c]) => /*#__PURE__*/React.createElement("button", {
    key: label,
    onClick: () => setColor(label),
    title: label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 12px 7px 8px',
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      background: color === label ? 'var(--terracotta-50)' : 'var(--surface-card)',
      border: color === label ? '1.5px solid var(--terracotta-500)' : '1px solid var(--border-default)',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: c,
      border: '1px solid rgba(0,0,0,0.1)'
    }
  }), label)))), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Embrulhar para presente (+ cart\xE3o escrito \xE0 m\xE3o)",
    checked: wrap,
    onChange: setWrap
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty,
    max: 20
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    full: true,
    iconLeft: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "shopping-bag"
    }),
    onClick: () => onAdd(p, qty)
  }, "Adicionar \u2014 ", window.fmtBRL(p.price * qty))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 4,
      color: 'var(--text-muted)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "clock",
    style: {
      width: 15,
      height: 15
    }
  }), " Produ\xE7\xE3o 5\u20137 dias \xFAteis"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shield-check",
    style: {
      width: 15,
      height: 15
    }
  }), " Garantia 3drizei"))))));
}

/* ---------------- CART DRAWER ---------------- */
function CartDrawer({
  open,
  items,
  onClose,
  onQty,
  onRemove
}) {
  const total = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(27,23,20,0.4)',
      zIndex: 90,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100%',
      width: 420,
      maxWidth: '92vw',
      zIndex: 100,
      background: 'var(--surface-page)',
      boxShadow: 'var(--shadow-xl)',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform var(--dur-slow) var(--ease-soft)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      margin: 0
    }
  }, "Sua sacola"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 22,
      height: 22
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 16
    }
  }, items.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '60px 20px',
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-bag",
    style: {
      width: 40,
      height: 40,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12
    }
  }, "Sua sacola est\xE1 vazia.")), items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    style: {
      display: 'flex',
      gap: 12,
      padding: 12,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: it.p.tint,
      backgroundImage: 'var(--layerlines)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": it.p.icon || 'gift',
    style: {
      width: 26,
      height: 26,
      color: 'var(--copper-400)',
      opacity: 0.7
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-strong)',
      lineHeight: 1.2
    }
  }, it.p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--terracotta-600)',
      fontWeight: 700,
      marginTop: 2
    }
  }, window.fmtBRL(it.p.price)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: it.qty,
    onChange: n => onQty(it.key, n)
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(it.key),
    "aria-label": "Remover",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trash-2",
    style: {
      width: 17,
      height: 17
    }
  }))))))), items.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      color: 'var(--clay-950)'
    }
  }, window.fmtBRL(total))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--text-subtle)',
      margin: '0 0 14px'
    }
  }, "Frete e prazos calculados no checkout."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    full: true,
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right"
    })
  }, "Finalizar pedido"))));
}
Object.assign(window, {
  Home,
  Catalog,
  Product,
  CartDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.RatingStars = __ds_scope.RatingStars;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
