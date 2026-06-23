import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type Despesa = Database["public"]["Tables"]["despesas"]["Row"];

export type DespesaListItem = Despesa & {
  pedidoNumero: number | null;
};

export async function getDespesas(): Promise<DespesaListItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("despesas")
    .select("*, pedidos(numero)")
    .order("data", { ascending: false });

  return (data ?? []).map((row) => {
    const { pedidos, ...despesa } = row as Despesa & {
      pedidos: { numero: number } | null;
    };
    return { ...(despesa as Despesa), pedidoNumero: pedidos?.numero ?? null };
  });
}
