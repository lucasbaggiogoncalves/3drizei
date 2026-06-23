"use client";

import { GripVertical, Plus, Trash2 } from "lucide-react";
import {
  PERSONALIZACAO_TIPOS,
  type PersonalizacaoField,
  type PersonalizacaoTipo,
} from "@/lib/produto-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PersonalizacaoEditor({
  value,
  onChange,
}: {
  value: PersonalizacaoField[];
  onChange: (fields: PersonalizacaoField[]) => void;
}) {
  function update(id: string, patch: Partial<PersonalizacaoField>) {
    onChange(value.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function add() {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        label: "",
        tipo: "texto",
        obrigatorio: false,
      },
    ]);
  }

  function remove(id: string) {
    onChange(value.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-3">
      {value.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-clay-50/50 p-4 text-center text-sm text-clay-500">
          Nenhum campo. Adicione o que o cliente precisa informar (nome, data,
          foto de referência...).
        </p>
      ) : (
        value.map((field) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 rounded-xl border border-border/70 bg-clay-50/40 p-3 sm:flex-row sm:items-end"
          >
            <GripVertical className="hidden size-4 shrink-0 self-center text-clay-300 sm:block" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Label className="text-xs text-clay-500">Rótulo do campo</Label>
              <Input
                placeholder="Ex: Nome para a luminária"
                value={field.label}
                onChange={(e) => update(field.id, { label: e.target.value })}
              />
            </div>
            <div className="flex w-full flex-col gap-1.5 sm:w-44">
              <Label className="text-xs text-clay-500">Tipo</Label>
              <Select
                value={field.tipo}
                onValueChange={(v) =>
                  update(field.id, { tipo: v as PersonalizacaoTipo })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERSONALIZACAO_TIPOS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {field.tipo === "selecao" ? (
              <div className="flex flex-1 flex-col gap-1.5">
                <Label className="text-xs text-clay-500">Opções (vírgula)</Label>
                <Input
                  placeholder="Vermelho, Azul, Verde"
                  value={(field.opcoes ?? []).join(", ")}
                  onChange={(e) =>
                    update(field.id, {
                      opcoes: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            ) : null}
            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:gap-1.5">
              <Label className="text-xs text-clay-500">Obrigatório</Label>
              <Switch
                checked={field.obrigatorio}
                onCheckedChange={(v) => update(field.id, { obrigatorio: v })}
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full text-danger-500 hover:bg-danger-50 hover:text-danger-700"
              onClick={() => remove(field.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))
      )}

      <Button type="button" variant="secondary" className="rounded-full" onClick={add}>
        <Plus className="size-4" />
        Adicionar campo
      </Button>
    </div>
  );
}
