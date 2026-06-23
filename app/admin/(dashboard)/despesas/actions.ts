"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type DespesaInput = {
  id?: string;
  categoria: string;
  tipo: "recorrente" | "variavel";
  valorCentavos: number;
  data: string;
  descricao: string;
  pedidoId: string | null;
};

export type DespesaResult = { error?: string };

export async function saveDespesa(input: DespesaInput): Promise<DespesaResult> {
  await requireAdmin();
  if (!input.categoria.trim()) return { error: "Informe a categoria." };
  if (input.valorCentavos <= 0) return { error: "Informe um valor válido." };

  const supabase = await createClient();
  const fields = {
    categoria: input.categoria.trim(),
    tipo: input.tipo,
    valor_centavos: Math.round(input.valorCentavos),
    data: input.data,
    descricao: input.descricao.trim() || null,
    pedido_id: input.pedidoId,
  };

  if (input.id) {
    const { error } = await supabase.from("despesas").update(fields).eq("id", input.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("despesas").insert(fields);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/despesas");
  return {};
}

export async function deleteDespesa(id: string): Promise<DespesaResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("despesas").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/despesas");
  return {};
}
