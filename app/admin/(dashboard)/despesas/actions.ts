"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type DespesaInput = {
  id?: string;
  categoriaId: string;
  tipo: "recorrente" | "variavel";
  valorCentavos: number;
  data: string;
  descricao: string;
  pedidoId: string | null;
};

export type DespesaResult = { error?: string };

export async function saveDespesa(input: DespesaInput): Promise<DespesaResult> {
  await requireAdmin();
  if (!input.categoriaId) return { error: "Selecione a categoria." };
  if (input.valorCentavos <= 0) return { error: "Informe um valor válido." };

  const supabase = await createClient();
  const fields = {
    categoria_id: input.categoriaId,
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

// ── Categorias ───────────────────────────────────────────────

export async function createCategoria(nome: string): Promise<DespesaResult> {
  await requireAdmin();
  if (!nome.trim()) return { error: "Informe o nome da categoria." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("despesa_categorias")
    .insert({ nome: nome.trim() });
  if (error) {
    if (error.code === "23505") return { error: "Já existe uma categoria com esse nome." };
    return { error: error.message };
  }

  revalidatePath("/admin/despesas");
  return {};
}

export async function updateCategoria(input: {
  id: string;
  nome: string;
  ativo: boolean;
}): Promise<DespesaResult> {
  await requireAdmin();
  if (!input.nome.trim()) return { error: "Informe o nome da categoria." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("despesa_categorias")
    .update({ nome: input.nome.trim(), ativo: input.ativo })
    .eq("id", input.id);
  if (error) {
    if (error.code === "23505") return { error: "Já existe uma categoria com esse nome." };
    return { error: error.message };
  }

  revalidatePath("/admin/despesas");
  return {};
}

export async function deleteCategoria(id: string): Promise<DespesaResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("despesa_categorias").delete().eq("id", id);
  if (error) {
    if (error.code === "23503")
      return { error: "Categoria em uso por despesas. Desative-a em vez de excluir." };
    return { error: error.message };
  }

  revalidatePath("/admin/despesas");
  return {};
}
