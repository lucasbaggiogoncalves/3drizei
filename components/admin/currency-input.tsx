"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { parseBRLToCentavos } from "@/lib/format";

function centavosToText(centavos: number): string {
  if (!centavos) return "";
  return (centavos / 100).toFixed(2).replace(".", ",");
}

/**
 * Input monetário: exibe reais (R$) e reporta centavos (integer) via onChange.
 */
export function CurrencyInput({
  value,
  onChange,
  id,
  placeholder = "0,00",
  className,
  disabled,
}: {
  value: number;
  onChange: (centavos: number) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [text, setText] = useState(() => centavosToText(value));
  const [prevValue, setPrevValue] = useState(value);

  // Ressincroniza durante o render quando o valor muda por fora
  // (ex: botão "usar preço sugerido"). Padrão recomendado pelo React,
  // sem useEffect.
  if (value !== prevValue) {
    setPrevValue(value);
    if (parseBRLToCentavos(text) !== value) {
      setText(centavosToText(value));
    }
  }

  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-clay-500">
        R$
      </span>
      <Input
        id={id}
        inputMode="decimal"
        className="pl-9"
        placeholder={placeholder}
        value={text}
        disabled={disabled}
        onChange={(e) => {
          setText(e.target.value);
          onChange(parseBRLToCentavos(e.target.value));
        }}
      />
    </div>
  );
}
