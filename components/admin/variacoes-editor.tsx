"use client";

import { useMemo, useState } from "react";
import { Plus, Sparkles, Trash2, X } from "lucide-react";
import { calcularPreco, type PricingSettings } from "@/lib/pricing/engine";
import type { Material } from "@/lib/data/pricing";
import type { VariacaoInput } from "@/lib/produto-types";
import { formatBRL } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyInput } from "@/components/admin/currency-input";

export function novaVariacao(): VariacaoInput {
  return {
    nome: "",
    opcoes: {},
    materialId: null,
    gramas: 0,
    tempoImpressaoH: 0,
    tempoPosH: 0,
    pesoG: 0,
    dimX: null,
    dimY: null,
    dimZ: null,
    consumiveisCentavos: 0,
    embalagemCentavos: 0,
    precoVendaCentavos: 0,
    controlaEstoque: false,
    estoque: null,
    sku: "",
    ativo: true,
  };
}

function NumberField({
  label,
  value,
  onChange,
  step = "0.1",
  suffix,
}: {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  step?: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-clay-500">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          min={0}
          step={step}
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? null : Number(e.target.value))
          }
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-clay-400">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function OpcoesEditor({
  value,
  onChange,
}: {
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
}) {
  const [pares, setPares] = useState<{ chave: string; valor: string }[]>(() =>
    Object.entries(value).map(([chave, valor]) => ({ chave, valor })),
  );

  function sync(novos: { chave: string; valor: string }[]) {
    setPares(novos);
    const record: Record<string, string> = {};
    for (const p of novos) {
      if (p.chave.trim()) record[p.chave.trim()] = p.valor;
    }
    onChange(record);
  }

  return (
    <div className="space-y-2">
      {pares.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            placeholder="Atributo (ex: Cor)"
            value={p.chave}
            className="h-9"
            onChange={(e) =>
              sync(pares.map((x, j) => (j === i ? { ...x, chave: e.target.value } : x)))
            }
          />
          <Input
            placeholder="Valor (ex: Vermelho)"
            value={p.valor}
            className="h-9"
            onChange={(e) =>
              sync(pares.map((x, j) => (j === i ? { ...x, valor: e.target.value } : x)))
            }
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-9 shrink-0 rounded-full"
            onClick={() => sync(pares.filter((_, j) => j !== i))}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="rounded-full text-clay-600"
        onClick={() => sync([...pares, { chave: "", valor: "" }])}
      >
        <Plus className="size-3.5" />
        Opção
      </Button>
    </div>
  );
}

function VariacaoCard({
  variacao,
  index,
  materiais,
  settings,
  onChange,
  onRemove,
  podeRemover,
}: {
  variacao: VariacaoInput;
  index: number;
  materiais: Material[];
  settings: PricingSettings;
  onChange: (patch: Partial<VariacaoInput>) => void;
  onRemove: () => void;
  podeRemover: boolean;
}) {
  const breakdown = useMemo(() => {
    const custoKg =
      materiais.find((m) => m.id === variacao.materialId)?.custo_por_kg_centavos ?? 0;
    return calcularPreco(
      {
        gramas: variacao.gramas,
        materialCustoPorKgCentavos: custoKg,
        tempoImpressaoH: variacao.tempoImpressaoH,
        tempoPosH: variacao.tempoPosH,
        consumiveisCentavos: variacao.consumiveisCentavos,
        embalagemCentavos: variacao.embalagemCentavos,
      },
      settings,
    );
  }, [variacao, materiais, settings]);

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-warm-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <Input
            placeholder={`Variação ${index + 1} (ex: Padrão, Vermelho G)`}
            value={variacao.nome}
            onChange={(e) => onChange({ nome: e.target.value })}
            className="max-w-xs font-medium"
          />
          <label className="flex items-center gap-2 text-xs text-clay-500">
            <Switch
              checked={variacao.ativo}
              onCheckedChange={(v) => onChange({ ativo: v })}
            />
            Ativa
          </label>
        </div>
        {podeRemover ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full text-danger-500 hover:bg-danger-50 hover:text-danger-700"
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Material</Label>
            <Select
              value={variacao.materialId ?? ""}
              onValueChange={(v) => onChange({ materialId: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filamento" />
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

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="Material (g)"
              value={variacao.gramas}
              onChange={(v) => onChange({ gramas: v ?? 0 })}
            />
            <NumberField
              label="Peso final"
              value={variacao.pesoG}
              onChange={(v) => onChange({ pesoG: v ?? 0 })}
              suffix="g"
            />
            <NumberField
              label="Impressão"
              value={variacao.tempoImpressaoH}
              onChange={(v) => onChange({ tempoImpressaoH: v ?? 0 })}
              suffix="h"
            />
            <NumberField
              label="Pós-proc."
              value={variacao.tempoPosH}
              onChange={(v) => onChange({ tempoPosH: v ?? 0 })}
              suffix="h"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <NumberField
              label="Larg. (X)"
              value={variacao.dimX}
              onChange={(v) => onChange({ dimX: v })}
              step="1"
              suffix="mm"
            />
            <NumberField
              label="Prof. (Y)"
              value={variacao.dimY}
              onChange={(v) => onChange({ dimY: v })}
              step="1"
              suffix="mm"
            />
            <NumberField
              label="Alt. (Z)"
              value={variacao.dimZ}
              onChange={(v) => onChange({ dimZ: v })}
              step="1"
              suffix="mm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-clay-500">Consumíveis</Label>
              <CurrencyInput
                value={variacao.consumiveisCentavos}
                onChange={(c) => onChange({ consumiveisCentavos: c })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-clay-500">Embalagem</Label>
              <CurrencyInput
                value={variacao.embalagemCentavos}
                onChange={(c) => onChange({ embalagemCentavos: c })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Opções (cor, tamanho...)</Label>
            <OpcoesEditor
              value={variacao.opcoes}
              onChange={(o) => onChange({ opcoes: o })}
            />
          </div>
        </div>

        {/* Lado direito: preço e estoque */}
        <div className="flex flex-col gap-4 rounded-xl bg-clay-50/60 p-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-clay-600">Custo total</span>
              <span className="font-mono text-clay-800">
                {formatBRL(breakdown.custoTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-clay-600">Sugerido (margem + taxas)</span>
              <span className="font-mono font-medium text-terracotta-700">
                {formatBRL(breakdown.precoSugerido)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Preço de venda</Label>
            <div className="flex items-center gap-2">
              <CurrencyInput
                value={variacao.precoVendaCentavos}
                onChange={(c) => onChange({ precoVendaCentavos: c })}
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="rounded-full"
                onClick={() =>
                  onChange({ precoVendaCentavos: breakdown.precoSugerido })
                }
                title="Usar preço sugerido"
              >
                <Sparkles className="size-3.5" />
                Usar
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">SKU (opcional)</Label>
            <Input
              value={variacao.sku}
              onChange={(e) => onChange({ sku: e.target.value })}
            />
          </div>

          <label className="flex items-center justify-between text-sm">
            <span className="text-clay-600">Controlar estoque</span>
            <Switch
              checked={variacao.controlaEstoque}
              onCheckedChange={(v) =>
                onChange({ controlaEstoque: v, estoque: v ? variacao.estoque ?? 0 : null })
              }
            />
          </label>
          {variacao.controlaEstoque ? (
            <NumberField
              label="Quantidade em estoque"
              value={variacao.estoque}
              onChange={(v) => onChange({ estoque: v ?? 0 })}
              step="1"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function VariacoesEditor({
  value,
  onChange,
  materiais,
  settings,
}: {
  value: VariacaoInput[];
  onChange: (v: VariacaoInput[]) => void;
  materiais: Material[];
  settings: PricingSettings;
}) {
  function update(index: number, patch: Partial<VariacaoInput>) {
    onChange(value.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  }

  return (
    <div className="space-y-4">
      {value.map((variacao, i) => (
        <VariacaoCard
          key={variacao.id ?? `nova-${i}`}
          variacao={variacao}
          index={i}
          materiais={materiais}
          settings={settings}
          onChange={(patch) => update(i, patch)}
          onRemove={() => onChange(value.filter((_, j) => j !== i))}
          podeRemover={value.length > 1}
        />
      ))}
      <Button
        type="button"
        variant="secondary"
        className="rounded-full"
        onClick={() => onChange([...value, novaVariacao()])}
      >
        <Plus className="size-4" />
        Adicionar variação
      </Button>
    </div>
  );
}
