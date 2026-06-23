"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getKanbanPedidos, type KanbanPedido } from "@/lib/data/pedidos";
import type { PedidoPayload } from "@/lib/pedido-types";
import type { PedidoStatus } from "@/lib/pedido-status";
import type { Database, Json } from "@/lib/database.types";

type ItemRow = Database["public"]["Tables"]["pedido_itens"]["Insert"];

export async function fetchKanban(): Promise<KanbanPedido[]> {
  await requireAdmin();
  return getKanbanPedidos();
}

export async function movePedido(
  id: string,
  status: PedidoStatus,
): Promise<{ error?: string }> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("pedidos").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/pedidos");
  return {};
}

export type SavePedidoResult = { error?: string; id?: string };

export async function savePedido(
  payload: PedidoPayload,
): Promise<SavePedidoResult> {
  await requireAdmin();
  if (payload.itens.length === 0) return { error: "Adicione ao menos um item." };

  const supabase = await createClient();

  // Dados autoritativos das variações de catálogo (preço/custo/breakdown).
  const variacaoIds = payload.itens
    .filter((i) => i.tipo === "catalogo" && i.variacaoId)
    .map((i) => i.variacaoId as string);

  const variacaoMap = new Map<
    string,
    { produtoId: string; preco: number; custo: number; breakdown: Json }
  >();
  if (variacaoIds.length > 0) {
    const { data: variacoes } = await supabase
      .from("produto_variacoes")
      .select("id, produto_id, preco_venda_centavos, breakdown")
      .in("id", variacaoIds);
    for (const v of variacoes ?? []) {
      const bd = (v.breakdown as { custoTotal?: number }) ?? {};
      variacaoMap.set(v.id, {
        produtoId: v.produto_id,
        preco: v.preco_venda_centavos,
        custo: bd.custoTotal ?? 0,
        breakdown: v.breakdown,
      });
    }
  }

  const pedidoFields = {
    cliente_id: payload.clienteId,
    status: payload.status,
    observacoes: payload.observacoes.trim() || null,
  };

  let pedidoId = payload.id;
  if (pedidoId) {
    const { error } = await supabase
      .from("pedidos")
      .update(pedidoFields)
      .eq("id", pedidoId);
    if (error) return { error: error.message };
  } else {
    const { data, error } = await supabase
      .from("pedidos")
      .insert(pedidoFields)
      .select("id")
      .single();
    if (error || !data) return { error: error?.message ?? "Falha ao salvar." };
    pedidoId = data.id;
  }

  // Sincroniza itens.
  const existentesIds = payload.itens
    .map((i) => i.id)
    .filter((id): id is string => Boolean(id));

  if (payload.id) {
    let del = supabase.from("pedido_itens").delete().eq("pedido_id", pedidoId);
    if (existentesIds.length > 0) {
      del = del.not("id", "in", `(${existentesIds.join(",")})`);
    }
    await del;
  }

  for (const item of payload.itens) {
    const variacao =
      item.tipo === "catalogo" && item.variacaoId
        ? variacaoMap.get(item.variacaoId)
        : undefined;

    const precoUnit =
      item.precoUnitCentavos > 0
        ? item.precoUnitCentavos
        : variacao?.preco ?? 0;
    const custoUnit =
      item.tipo === "catalogo" ? variacao?.custo ?? 0 : item.custoUnitCentavos;
    const breakdown: Json =
      item.tipo === "catalogo"
        ? variacao?.breakdown ?? {}
        : ({ custoTotal: custoUnit } as Json);

    const row: ItemRow = {
      pedido_id: pedidoId,
      produto_id: item.produtoId ?? variacao?.produtoId ?? null,
      variacao_id: item.variacaoId,
      descricao: item.descricao.trim() || "Item",
      quantidade: Math.max(1, Math.round(item.quantidade)),
      preco_unit_centavos: precoUnit,
      custo_unit_centavos: custoUnit,
      breakdown_snapshot: breakdown,
      personalizacao_respostas: item.personalizacao as Json,
    };

    if (item.id) {
      const { error } = await supabase
        .from("pedido_itens")
        .update(row)
        .eq("id", item.id);
      if (error) return { error: error.message };
    } else {
      const { error } = await supabase.from("pedido_itens").insert(row);
      if (error) return { error: error.message };
    }
  }

  revalidatePath("/admin/pedidos");
  if (payload.id) revalidatePath(`/admin/pedidos/${pedidoId}`);
  return { id: pedidoId };
}

export async function deletePedido(id: string): Promise<{ error?: string }> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("pedidos").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/pedidos");
  return {};
}
