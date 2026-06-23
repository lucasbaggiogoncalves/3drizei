"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Endereco } from "@/lib/data/clientes";
import type { Json } from "@/lib/database.types";

export type ClienteInput = {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  cpf_cnpj: string;
  endereco: Endereco;
  notas: string;
};

export type ClienteResult = { error?: string; id?: string };

function enderecoOuNull(e: Endereco): Json | null {
  const algum = Object.values(e).some((v) => v && v.trim());
  return algum ? (e as Json) : null;
}

export async function saveCliente(input: ClienteInput): Promise<ClienteResult> {
  await requireAdmin();
  if (!input.nome.trim()) return { error: "Informe o nome do cliente." };

  const supabase = await createClient();
  const fields = {
    nome: input.nome.trim(),
    email: input.email.trim() || null,
    telefone: input.telefone.trim() || null,
    cpf_cnpj: input.cpf_cnpj.trim() || null,
    endereco: enderecoOuNull(input.endereco),
    notas: input.notas.trim() || null,
  };

  if (input.id) {
    const { error } = await supabase.from("clientes").update(fields).eq("id", input.id);
    if (error) return { error: error.message };
    revalidatePath(`/admin/clientes/${input.id}`);
    revalidatePath("/admin/clientes");
    return { id: input.id };
  }

  const { data, error } = await supabase
    .from("clientes")
    .insert(fields)
    .select("id")
    .single();
  if (error || !data) return { error: error?.message ?? "Falha ao salvar." };

  revalidatePath("/admin/clientes");
  return { id: data.id };
}

export async function deleteCliente(id: string): Promise<{ error?: string }> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("clientes").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/clientes");
  return {};
}
