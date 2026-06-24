"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Package, PencilRuler, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ProdutoParaPedido } from "@/lib/data/produtos";
import type { PedidoCompleto } from "@/lib/data/pedidos";
import type { PedidoItemInput } from "@/lib/pedido-types";
import { novoItem } from "@/lib/pedido-types";
import { savePedido } from "@/app/admin/(dashboard)/pedidos/actions";
import { PEDIDO_STATUS, type PedidoStatus } from "@/lib/pedido-status";
import type { PersonalizacaoField } from "@/lib/produto-types";
import { formatBRL } from "@/lib/format";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyInput } from "@/components/admin/currency-input";
import { NumericInput } from "@/components/admin/numeric-input";
import { ReferenceUploader } from "@/components/admin/reference-uploader";

function variacaoLabel(v: ProdutoParaPedido["variacoes"][number]): string {
  if (v.nome) return v.nome;
  const opc = Object.entries(v.opcoes)
    .map(([k, val]) => `${k}: ${val}`)
    .join(", ");
  return opc || "Variação";
}

function RespostaField({
  field,
  value,
  onChange,
}: {
  field: PersonalizacaoField;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.tipo === "foto") {
    return (
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-clay-500">
          {field.label}
          {field.obrigatorio ? " *" : ""}
        </Label>
        <ReferenceUploader
          value={Array.isArray(value) ? (value as string[]) : []}
          onChange={(paths) => onChange(paths)}
        />
      </div>
    );
  }

  if (field.tipo === "selecao") {
    return (
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-clay-500">{field.label}</Label>
        <Select
          value={(value as string) ?? ""}
          onValueChange={(v) => onChange(v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {(field.opcoes ?? []).map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-clay-500">
        {field.label}
        {field.obrigatorio ? " *" : ""}
      </Label>
      <Input
        type={field.tipo === "numero" ? "number" : field.tipo === "data" ? "date" : "text"}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function ItemEditor({
  item,
  produtos,
  onChange,
  onRemove,
}: {
  item: PedidoItemInput;
  produtos: ProdutoParaPedido[];
  onChange: (patch: Partial<PedidoItemInput>) => void;
  onRemove: () => void;
}) {
  const produto = produtos.find((p) => p.id === item.produtoId) ?? null;

  function selecionarProduto(produtoId: string) {
    onChange({ produtoId, variacaoId: null, descricao: "", personalizacao: {} });
  }

  function selecionarVariacao(variacaoId: string) {
    const v = produto?.variacoes.find((x) => x.id === variacaoId);
    onChange({
      variacaoId,
      precoUnitCentavos: v?.precoVendaCentavos ?? 0,
      descricao: produto ? `${produto.nome}${v ? ` · ${variacaoLabel(v)}` : ""}` : item.descricao,
    });
  }

  function setResposta(fieldId: string, value: unknown) {
    onChange({ personalizacao: { ...item.personalizacao, [fieldId]: value } });
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-warm-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-clay-700">
          {item.tipo === "catalogo" ? (
            <Package className="size-4 text-terracotta-500" />
          ) : (
            <PencilRuler className="size-4 text-copper-500" />
          )}
          {item.tipo === "catalogo" ? "Item do catálogo" : "Item do zero"}
        </span>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="rounded-full text-danger-500 hover:bg-danger-50 hover:text-danger-700"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      {item.tipo === "catalogo" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Produto</Label>
            <Select value={item.produtoId ?? ""} onValueChange={selecionarProduto}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o produto" />
              </SelectTrigger>
              <SelectContent>
                {produtos.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Variação</Label>
            <Select
              value={item.variacaoId ?? ""}
              onValueChange={selecionarVariacao}
              disabled={!produto}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha a variação" />
              </SelectTrigger>
              <SelectContent>
                {(produto?.variacoes ?? []).map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {variacaoLabel(v)} — {formatBRL(v.precoVendaCentavos)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-clay-500">Descrição</Label>
          <Input
            value={item.descricao}
            onChange={(e) => onChange({ descricao: e.target.value })}
            placeholder="Ex: Topo de bolo personalizado"
          />
        </div>
      )}

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-clay-500">Quantidade</Label>
          <NumericInput
            step="1"
            placeholder="1"
            value={item.quantidade || null}
            onChange={(v) => onChange({ quantidade: Math.max(1, v ?? 1) })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-clay-500">Preço unitário</Label>
          <CurrencyInput
            value={item.precoUnitCentavos}
            onChange={(c) => onChange({ precoUnitCentavos: c })}
          />
        </div>
        {item.tipo === "zero" ? (
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Custo unitário</Label>
            <CurrencyInput
              value={item.custoUnitCentavos}
              onChange={(c) => onChange({ custoUnitCentavos: c })}
            />
          </div>
        ) : null}
      </div>

      {/* Personalização do catálogo */}
      {item.tipo === "catalogo" && produto && produto.personalizacao.length > 0 ? (
        <div className="mt-4 space-y-3 rounded-xl bg-clay-50/60 p-3">
          <p className="eyebrow">Personalização</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {produto.personalizacao.map((field) => (
              <RespostaField
                key={field.id}
                field={field}
                value={item.personalizacao[field.id]}
                onChange={(v) => setResposta(field.id, v)}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* Referências para item do zero */}
      {item.tipo === "zero" ? (
        <div className="mt-4 space-y-2 rounded-xl bg-clay-50/60 p-3">
          <p className="eyebrow">Referências do cliente</p>
          <ReferenceUploader
            value={
              Array.isArray(item.personalizacao.referencias)
                ? (item.personalizacao.referencias as string[])
                : []
            }
            onChange={(paths) => setResposta("referencias", paths)}
          />
        </div>
      ) : null}
    </div>
  );
}

function mapItem(i: PedidoCompleto["itens"][number]): PedidoItemInput {
  return {
    id: i.id,
    tipo: i.variacao_id ? "catalogo" : "zero",
    produtoId: i.produto_id,
    variacaoId: i.variacao_id,
    descricao: i.descricao,
    quantidade: i.quantidade,
    precoUnitCentavos: i.preco_unit_centavos,
    custoUnitCentavos: i.custo_unit_centavos,
    personalizacao: (i.personalizacao_respostas as Record<string, unknown>) ?? {},
  };
}

export function PedidoForm({
  clientes,
  produtos,
  pedido,
}: {
  clientes: { id: string; nome: string }[];
  produtos: ProdutoParaPedido[];
  pedido?: PedidoCompleto;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const editando = Boolean(pedido);

  const [clienteId, setClienteId] = useState<string | null>(
    pedido?.pedido.cliente_id ?? null,
  );
  const [status, setStatus] = useState<PedidoStatus>(
    pedido?.pedido.status ?? "aprovado",
  );
  const [observacoes, setObservacoes] = useState(pedido?.pedido.observacoes ?? "");
  const [itens, setItens] = useState<PedidoItemInput[]>(
    () => pedido?.itens.map(mapItem) ?? [],
  );

  const total = useMemo(
    () => itens.reduce((s, i) => s + i.precoUnitCentavos * i.quantidade, 0),
    [itens],
  );

  function update(index: number, patch: Partial<PedidoItemInput>) {
    setItens((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }

  function submit() {
    if (itens.length === 0) {
      toast.error("Adicione ao menos um item.");
      return;
    }
    start(async () => {
      const res = await savePedido({
        id: pedido?.pedido.id,
        clienteId,
        status,
        observacoes,
        itens,
      });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(editando ? "Pedido atualizado." : "Pedido criado.");
      router.push("/admin/pedidos");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6 pb-24">
      <Card>
        <CardHeader>
          <CardTitle>Dados do pedido</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Cliente</Label>
            <Select
              value={clienteId ?? "none"}
              onValueChange={(v) => setClienteId(v === "none" ? null : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sem cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sem cliente</SelectItem>
                {clientes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Estágio</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as PedidoStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PEDIDO_STATUS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label>Observações</Label>
            <Textarea
              rows={2}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Combinados, prazos especiais..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-clay-900">Itens</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="rounded-full"
              onClick={() => setItens((prev) => [...prev, novoItem("catalogo")])}
            >
              <Plus className="size-4" />
              Catálogo
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="rounded-full"
              onClick={() => setItens((prev) => [...prev, novoItem("zero")])}
            >
              <Plus className="size-4" />
              Do zero
            </Button>
          </div>
        </div>

        {itens.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-clay-50/50 p-8 text-center text-sm text-clay-500">
            Nenhum item. Adicione um item do catálogo ou crie um do zero.
          </p>
        ) : (
          itens.map((item, i) => (
            <ItemEditor
              key={item.id ?? `novo-${i}`}
              item={item}
              produtos={produtos}
              onChange={(patch) => update(i, patch)}
              onRemove={() => setItens((prev) => prev.filter((_, j) => j !== i))}
            />
          ))
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3">
          <div>
            <span className="eyebrow">Total</span>
            <p className="font-heading text-xl font-semibold text-terracotta-700">
              {formatBRL(total)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full"
              onClick={() => router.push("/admin/pedidos")}
            >
              Cancelar
            </Button>
            <Button type="button" className="rounded-full" onClick={submit} disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {editando ? "Salvar pedido" : "Criar pedido"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
