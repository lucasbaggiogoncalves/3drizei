"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { DespesaCategoriaListItem } from "@/lib/data/despesas";
import {
  createCategoria,
  deleteCategoria,
  updateCategoria,
} from "@/app/admin/(dashboard)/despesas/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function CategoriaRow({ categoria }: { categoria: DespesaCategoriaListItem }) {
  const router = useRouter();
  const [nome, setNome] = useState(categoria.nome);
  const [ativo, setAtivo] = useState(categoria.ativo);
  const [pending, start] = useTransition();

  const dirty = nome.trim() !== categoria.nome || ativo !== categoria.ativo;

  function salvar() {
    start(async () => {
      const res = await updateCategoria({ id: categoria.id, nome, ativo });
      if (res.error) toast.error(res.error);
      else {
        toast.success("Categoria atualizada.");
        router.refresh();
      }
    });
  }

  function remover() {
    start(async () => {
      const res = await deleteCategoria(categoria.id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Categoria removida.");
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
      <div className="flex flex-col items-center gap-1.5">
        <Label className="text-xs text-clay-500">Ativa</Label>
        <Switch checked={ativo} onCheckedChange={setAtivo} className="mb-2" />
      </div>
      <span className="mb-2.5 text-xs text-clay-500">
        {categoria.emUso} despesa(s)
      </span>
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
        disabled={pending || categoria.emUso > 0}
        onClick={remover}
        title={categoria.emUso > 0 ? "Em uso — desative em vez de excluir" : "Remover"}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

export function CategoriasManager({
  categorias,
}: {
  categorias: DespesaCategoriaListItem[];
}) {
  const router = useRouter();
  const [novoNome, setNovoNome] = useState("");
  const [pending, start] = useTransition();

  function adicionar() {
    if (!novoNome.trim()) {
      toast.error("Informe o nome da categoria.");
      return;
    }
    start(async () => {
      const res = await createCategoria(novoNome);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Categoria adicionada.");
        setNovoNome("");
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {categorias.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-clay-50/50 p-6 text-center text-sm text-clay-500">
            Nenhuma categoria ainda. Cadastre a primeira abaixo.
          </p>
        ) : (
          categorias.map((c) => <CategoriaRow key={c.id} categoria={c} />)
        )}
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border/70 p-3">
        <div className="flex min-w-40 flex-1 flex-col gap-1.5">
          <Label className="text-xs text-clay-500">Nova categoria</Label>
          <Input
            placeholder="Ex: Filamento, Energia, Refugo/Perda..."
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                adicionar();
              }
            }}
          />
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
    </div>
  );
}
