import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type Cliente = Database["public"]["Tables"]["clientes"]["Row"];
export type Pedido = Database["public"]["Tables"]["pedidos"]["Row"];

export type Endereco = {
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
};

export type ClienteListItem = {
  cliente: Cliente;
  pedidosCount: number;
  totalGasto: number;
};

export async function getClientes(): Promise<ClienteListItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("clientes")
    .select("*, pedidos(total_centavos, status)")
    .order("nome");

  return (data ?? []).map((row) => {
    const { pedidos, ...cliente } = row as Cliente & {
      pedidos: { total_centavos: number; status: string }[];
    };
    const validos = pedidos.filter((p) => p.status !== "cancelado");
    return {
      cliente: cliente as Cliente,
      pedidosCount: pedidos.length,
      totalGasto: validos.reduce((s, p) => s + p.total_centavos, 0),
    };
  });
}

export async function getClientesSimple(): Promise<
  { id: string; nome: string }[]
> {
  const supabase = await createClient();
  const { data } = await supabase.from("clientes").select("id, nome").order("nome");
  return data ?? [];
}

export async function getCliente(
  id: string,
): Promise<{ cliente: Cliente; pedidos: Pedido[] } | null> {
  const supabase = await createClient();
  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!cliente) return null;

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*")
    .eq("cliente_id", id)
    .order("created_at", { ascending: false });

  return { cliente, pedidos: pedidos ?? [] };
}
