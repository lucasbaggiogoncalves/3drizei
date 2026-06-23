"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Material } from "@/lib/data/pricing";
import {
  createMaterial,
  deleteMaterial,
  updateMaterial,
} from "@/app/admin/(dashboard)/configuracoes/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CurrencyInput } from "@/components/admin/currency-input";
import { formatBRL } from "@/lib/format";

function MaterialRow({ material }: { material: Material }) {
  const router = useRouter();
  const [nome, setNome] = useState(material.nome);
  const [custo, setCusto] = useState(material.custo_por_kg_centavos);
  const [ativo, setAtivo] = useState(material.ativo);
  const [pending, start] = useTransition();

  const dirty =
    nome !== material.nome ||
    custo !== material.custo_por_kg_centavos ||
    ativo !== material.ativo;

  function salvar() {
    start(async () => {
      const res = await updateMaterial({ id: material.id, nome, custoCentavos: custo, ativo });
      if (res.error) toast.error(res.error);
      else {
        toast.success("Material atualizado.");
        router.refresh();
      }
    });
  }

  function remover() {
    start(async () => {
      const res = await deleteMaterial(material.id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Material removido.");
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border/70 bg-clay-50/50 p-3">
      <div className="flex min-w-40 flex-1 flex-col gap-1.5">
        <Label className="text-xs text-clay-500">Nome</Label>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div className="flex w-40 flex-col gap-1.5">
        <Label className="text-xs text-clay-500">Custo / kg</Label>
        <CurrencyInput value={custo} onChange={setCusto} />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Label className="text-xs text-clay-500">Ativo</Label>
        <Switch checked={ativo} onCheckedChange={setAtivo} className="mb-2" />
      </div>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="rounded-full"
        disabled={!dirty || pending}
        onClick={salvar}
        title="Salvar"
      >
        <Save className="size-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded-full text-danger-500 hover:bg-danger-50 hover:text-danger-700"
        disabled={pending}
        onClick={remover}
        title="Remover"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

export function MateriaisManager({ materiais }: { materiais: Material[] }) {
  const router = useRouter();
  const [novoNome, setNovoNome] = useState("");
  const [novoCusto, setNovoCusto] = useState(0);
  const [pending, start] = useTransition();

  function adicionar() {
    if (!novoNome.trim()) {
      toast.error("Informe o nome do material.");
      return;
    }
    start(async () => {
      const res = await createMaterial({ nome: novoNome, custoCentavos: novoCusto });
      if (res.error) toast.error(res.error);
      else {
        toast.success("Material adicionado.");
        setNovoNome("");
        setNovoCusto(0);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {materiais.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-clay-50/50 p-6 text-center text-sm text-clay-500">
            Nenhum material ainda. Cadastre seu primeiro filamento abaixo.
          </p>
        ) : (
          materiais.map((m) => <MaterialRow key={m.id} material={m} />)
        )}
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border/70 p-3">
        <div className="flex min-w-40 flex-1 flex-col gap-1.5">
          <Label className="text-xs text-clay-500">Novo material</Label>
          <Input
            placeholder="Ex: PLA Silk"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
        </div>
        <div className="flex w-40 flex-col gap-1.5">
          <Label className="text-xs text-clay-500">Custo / kg</Label>
          <CurrencyInput value={novoCusto} onChange={setNovoCusto} />
        </div>
        <Button
          type="button"
          className="rounded-full"
          onClick={adicionar}
          disabled={pending}
        >
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <p className="text-xs text-clay-500">
        Custo médio atual:{" "}
        {materiais.length
          ? formatBRL(
              Math.round(
                materiais.reduce((s, m) => s + m.custo_por_kg_centavos, 0) /
                  materiais.length,
              ),
            )
          : "—"}{" "}
        por kg
      </p>
    </div>
  );
}
