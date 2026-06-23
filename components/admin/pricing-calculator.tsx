"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calcularPreco,
  type PricingBreakdown,
  type PricingSettings,
} from "@/lib/pricing/engine";
import type { Material } from "@/lib/data/pricing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyInput } from "@/components/admin/currency-input";
import { BreakdownView } from "@/components/admin/breakdown-view";

export type CalcInputs = {
  materialId: string | null;
  gramas: number;
  tempoImpressaoH: number;
  tempoPosH: number;
  consumiveisCentavos: number;
  embalagemCentavos: number;
};

export type CalcResult = { inputs: CalcInputs; breakdown: PricingBreakdown };

const ZERO: CalcInputs = {
  materialId: null,
  gramas: 0,
  tempoImpressaoH: 0,
  tempoPosH: 0,
  consumiveisCentavos: 0,
  embalagemCentavos: 0,
};

export function PricingCalculator({
  materiais,
  settings,
  initial,
  onResult,
}: {
  materiais: Material[];
  settings: PricingSettings;
  initial?: Partial<CalcInputs>;
  onResult?: (result: CalcResult) => void;
}) {
  const [inputs, setInputs] = useState<CalcInputs>({ ...ZERO, ...initial });

  const breakdown = useMemo(() => {
    const material = materiais.find((m) => m.id === inputs.materialId);
    return calcularPreco(
      {
        gramas: inputs.gramas,
        materialCustoPorKgCentavos: material?.custo_por_kg_centavos ?? 0,
        tempoImpressaoH: inputs.tempoImpressaoH,
        tempoPosH: inputs.tempoPosH,
        consumiveisCentavos: inputs.consumiveisCentavos,
        embalagemCentavos: inputs.embalagemCentavos,
      },
      settings,
    );
  }, [inputs, materiais, settings]);

  useEffect(() => {
    onResult?.({ inputs, breakdown });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, breakdown]);

  function set<K extends keyof CalcInputs>(key: K, value: CalcInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="material">Material</Label>
          <Select
            value={inputs.materialId ?? ""}
            onValueChange={(v) => set("materialId", v)}
          >
            <SelectTrigger id="material">
              <SelectValue placeholder="Selecione o filamento" />
            </SelectTrigger>
            <SelectContent>
              {materiais.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="gramas">Material usado (g)</Label>
          <Input
            id="gramas"
            type="number"
            min={0}
            step="0.1"
            value={inputs.gramas || ""}
            onChange={(e) => set("gramas", Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="tempo">Tempo de impressão (h)</Label>
          <Input
            id="tempo"
            type="number"
            min={0}
            step="0.1"
            value={inputs.tempoImpressaoH || ""}
            onChange={(e) => set("tempoImpressaoH", Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="pos">Pós-processamento (h)</Label>
          <Input
            id="pos"
            type="number"
            min={0}
            step="0.1"
            value={inputs.tempoPosH || ""}
            onChange={(e) => set("tempoPosH", Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="consumiveis">Consumíveis</Label>
          <CurrencyInput
            id="consumiveis"
            value={inputs.consumiveisCentavos}
            onChange={(c) => set("consumiveisCentavos", c)}
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="embalagem">Embalagem</Label>
          <CurrencyInput
            id="embalagem"
            value={inputs.embalagemCentavos}
            onChange={(c) => set("embalagemCentavos", c)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-warm-sm">
        <p className="eyebrow mb-3">Composição do preço</p>
        <BreakdownView breakdown={breakdown} />
      </div>
    </div>
  );
}
