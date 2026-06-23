import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import type { PedidoStatus } from "@/lib/pedido-status";

export type Pedido = Database["public"]["Tables"]["pedidos"]["Row"];
export type PedidoItem = Database["public"]["Tables"]["pedido_itens"]["Row"];
export type PedidoHistorico =
  Database["public"]["Tables"]["pedido_historico"]["Row"];

export type KanbanPedido = {
  id: string;
  numero: number;
  status: PedidoStatus;
  totalCentavos: number;
  lucroCentavos: number;
  clienteNome: string | null;
  itensCount: number;
  createdAt: string;
};

export async function getKanbanPedidos(): Promise<KanbanPedido[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pedidos")
    .select(
      "id, numero, status, total_centavos, lucro_centavos, created_at, clientes(nome), pedido_itens(id)",
    )
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => {
    const r = row as unknown as {
      id: string;
      numero: number;
      status: PedidoStatus;
      total_centavos: number;
      lucro_centavos: number | null;
      created_at: string;
      clientes: { nome: string } | null;
      pedido_itens: { id: string }[];
    };
    return {
      id: r.id,
      numero: r.numero,
      status: r.status,
      totalCentavos: r.total_centavos,
      lucroCentavos: r.lucro_centavos ?? 0,
      clienteNome: r.clientes?.nome ?? null,
      itensCount: r.pedido_itens.length,
      createdAt: r.created_at,
    };
  });
}

export async function getPedidosSimple(): Promise<
  { id: string; numero: number; clienteNome: string | null }[]
> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pedidos")
    .select("id, numero, clientes(nome)")
    .order("numero", { ascending: false });
  return (data ?? []).map((row) => {
    const r = row as unknown as {
      id: string;
      numero: number;
      clientes: { nome: string } | null;
    };
    return { id: r.id, numero: r.numero, clienteNome: r.clientes?.nome ?? null };
  });
}

export type PedidoCompleto = {
  pedido: Pedido & { clientes: { id: string; nome: string } | null };
  itens: PedidoItem[];
  historico: PedidoHistorico[];
};

export async function getPedido(id: string): Promise<PedidoCompleto | null> {
  const supabase = await createClient();
  const { data: pedido } = await supabase
    .from("pedidos")
    .select("*, clientes(id, nome)")
    .eq("id", id)
    .maybeSingle();
  if (!pedido) return null;

  const [{ data: itens }, { data: historico }] = await Promise.all([
    supabase.from("pedido_itens").select("*").eq("pedido_id", id),
    supabase
      .from("pedido_historico")
      .select("*")
      .eq("pedido_id", id)
      .order("em", { ascending: false }),
  ]);

  return {
    pedido: pedido as PedidoCompleto["pedido"],
    itens: itens ?? [],
    historico: historico ?? [],
  };
}
