import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type Despesa = Database["public"]["Tables"]["despesas"]["Row"];
export type DespesaCategoria =
  Database["public"]["Tables"]["despesa_categorias"]["Row"];

export type DespesaListItem = Despesa & {
  pedidoNumero: number | null;
  categoriaNome: string;
};

export async function getDespesas(): Promise<DespesaListItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("despesas")
    .select("*, pedidos(numero), despesa_categorias(nome)")
    .order("data", { ascending: false });

  return (data ?? []).map((row) => {
    const { pedidos, despesa_categorias, ...despesa } = row as Despesa & {
      pedidos: { numero: number } | null;
      despesa_categorias: { nome: string } | null;
    };
    return {
      ...(despesa as Despesa),
      pedidoNumero: pedidos?.numero ?? null,
      categoriaNome: despesa_categorias?.nome ?? "—",
    };
  });
}

export type DespesaCategoriaListItem = DespesaCategoria & {
  emUso: number;
};

export async function getDespesaCategorias(): Promise<DespesaCategoriaListItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("despesa_categorias")
    .select("*, despesas(count)")
    .order("nome", { ascending: true });

  return (data ?? []).map((row) => {
    const { despesas, ...categoria } = row as DespesaCategoria & {
      despesas: { count: number }[];
    };
    return { ...(categoria as DespesaCategoria), emUso: despesas?.[0]?.count ?? 0 };
  });
}
