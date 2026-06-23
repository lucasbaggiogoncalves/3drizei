"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { error?: string };

export async function createMaterial(input: {
  nome: string;
  custoCentavos: number;
}): Promise<ActionResult> {
  await requireAdmin();
  if (!input.nome.trim()) return { error: "Informe o nome do material." };

  const supabase = await createClient();
  const { error } = await supabase.from("materiais").insert({
    nome: input.nome.trim(),
    custo_por_kg_centavos: Math.max(0, Math.round(input.custoCentavos)),
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/configuracoes");
  return {};
}

export async function updateMaterial(input: {
  id: string;
  nome: string;
  custoCentavos: number;
  ativo: boolean;
}): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("materiais")
    .update({
      nome: input.nome.trim(),
      custo_por_kg_centavos: Math.max(0, Math.round(input.custoCentavos)),
      ativo: input.ativo,
    })
    .eq("id", input.id);
  if (error) return { error: error.message };

  revalidatePath("/admin/configuracoes");
  return {};
}

export async function deleteMaterial(id: string): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("materiais").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/configuracoes");
  return {};
}

export async function saveSettings(input: {
  horaMaquinaCentavos: number;
  kwhCentavos: number;
  consumoW: number;
  bufferFalhaPct: number;
  maoObraHoraCentavos: number;
  margemPct: number;
  taxasPct: number;
  embalagemPadraoCentavos: number;
}): Promise<ActionResult> {
  await requireAdmin();
  const supabase = await createClient();

  const { data: maxRow } = await supabase
    .from("pricing_settings")
    .select("versao")
    .order("versao", { ascending: false })
    .limit(1)
    .maybeSingle();

  const novaVersao = (maxRow?.versao ?? 0) + 1;

  // Desativa a versão vigente antes de inserir a nova (índice único parcial).
  await supabase
    .from("pricing_settings")
    .update({ vigente: false })
    .eq("vigente", true);

  const { error } = await supabase.from("pricing_settings").insert({
    versao: novaVersao,
    vigente: true,
    hora_maquina_centavos: Math.max(0, Math.round(input.horaMaquinaCentavos)),
    kwh_centavos: Math.max(0, Math.round(input.kwhCentavos)),
    consumo_w: Math.max(0, Math.round(input.consumoW)),
    buffer_falha_pct: Math.max(0, input.bufferFalhaPct),
    mao_obra_hora_centavos: Math.max(0, Math.round(input.maoObraHoraCentavos)),
    margem_pct: Math.max(0, input.margemPct),
    taxas_pct: Math.min(99.9, Math.max(0, input.taxasPct)),
    embalagem_padrao_centavos: Math.max(0, Math.round(input.embalagemPadraoCentavos)),
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/configuracoes");
  revalidatePath("/admin/calculadora");
  return {};
}
