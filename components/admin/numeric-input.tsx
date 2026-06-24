"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const DECIMAL_PATTERN = /^-?\d*[.,]?\d*$/;
const INTEGER_PATTERN = /^-?\d*$/;

function toDisplay(value: number | null): string {
  if (value === null || value === 0) return "";
  return String(value);
}

function fromDisplay(text: string): number | null {
  if (text === "" || text === "-" || text === "." || text === ",") return null;
  const n = parseFloat(text.replace(",", "."));
  return isNaN(n) ? null : n;
}

/**
 * Numeric input that:
 * - Uses type="text" to avoid browser number-input quirks (leading zeros, etc.)
 * - Selects all content on focus so typing replaces the current value
 * - Restricts keystrokes to valid numeric characters
 * - Normalises on blur (strips trailing decimals, removes leading zeros)
 * - Shows empty when value is 0 (uses placeholder instead)
 * - Syncs when value changes externally (e.g. "use suggested price")
 */
export function NumericInput({
  value,
  onChange,
  step = "0.1",
  suffix,
  placeholder = "0",
  className,
  id,
  disabled,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  step?: string;
  suffix?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}) {
  const isInteger = step === "1";
  const pattern = isInteger ? INTEGER_PATTERN : DECIMAL_PATTERN;

  const [text, setText] = useState(() => toDisplay(value));
  const [prevValue, setPrevValue] = useState(value);

  // Sync on external value changes without useEffect (React recommended pattern)
  if (value !== prevValue) {
    setPrevValue(value);
    if (fromDisplay(text) !== value) {
      setText(toDisplay(value));
    }
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        type="text"
        inputMode={isInteger ? "numeric" : "decimal"}
        placeholder={placeholder}
        value={text}
        disabled={disabled}
        className={cn(suffix && "pr-8")}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "" || pattern.test(raw)) {
            setText(raw);
            const num = fromDisplay(raw);
            if (num !== null) {
              onChange(num);
            } else if (raw === "") {
              onChange(null);
            }
          }
        }}
        onFocus={(e) => e.target.select()}
        onBlur={() => {
          const num = fromDisplay(text);
          if (num === null) {
            setText("");
            onChange(null);
          } else {
            // Normalise: remove trailing decimal separator, clean up
            setText(String(num));
            onChange(num);
          }
        }}
      />
      {suffix ? (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-clay-400">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
