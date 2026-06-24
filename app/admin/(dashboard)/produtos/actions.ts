"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { calcularPreco } from "@/lib/pricing/engine";
import { toPricingSettings } from "@/lib/data/pricing";
import type { ProdutoPayload, VariacaoInput } from "@/lib/produto-types";
import type { Database, Json } from "@/lib/database.types";

type VariacaoRow = Database["public"]["Tables"]["produto_variacoes"]["Insert"];

export type SaveProdutoResult = { error?: string; id?: string };

function buildVariacaoRow(
  v: VariacaoInput,
  produtoId: string,
  settings: ReturnType<typeof toPricingSettings>,
  versao: number,
  custoKgPorMaterial: Map<string, number>,
): VariacaoRow {
  const custoKg = v.materialId ? custoKgPorMaterial.get(v.materialId) ?? 0 : 0;
  const breakdown = calcularPreco(
    {
      gramas: v.gramas,
      materialCustoPorKgCentavos: custoKg,
      tempoImpressaoH: v.tempoImpressaoH,
      tempoPosH: v.tempoPosH,
      consumiveisCentavos: v.consumiveisCentavos,
      embalagemCentavos: v.embalagemCentavos,
    },
    settings,
  );

  return {
    produto_id: produtoId,
    nome: v.nome || null,
    opcoes: v.opcoes as Json,
    material_id: v.materialId,
    gramas: v.gramas,
    tempo_impressao_h: v.tempoImpressaoH,
    tempo_pos_h: v.tempoPosH,
    peso_g: v.pesoG,
    dim_x_mm: v.dimX,
    dim_y_mm: v.dimY,
    dim_z_mm: v.dimZ,
    consumiveis_centavos: v.consumiveisCentavos,
    embalagem_centavos: v.embalagemCentavos,
    preco_venda_centavos: v.precoVendaCentavos,
    breakdown: breakdown as unknown as Json,
    pricing_settings_versao: versao,
    controla_estoque: v.controlaEstoque,
    estoque: v.controlaEstoque ? v.estoque : null,
    sku: v.sku || null,
    ativo: v.ativo,
  };
}

export async function saveProduto(
  payload: ProdutoPayload,
): Promise<SaveProdutoResult> {
  await requireAdmin();

  if (!payload.nome.trim()) return { error: "Informe o nome do produto." };
  if (!payload.slug.trim()) return { error: "Informe o slug do produto." };
  if (payload.variacoes.length === 0)
    return { error: "Adicione ao menos uma variação." };

  const supabase = await createClient();

  // Parâmetros + custo dos materiais para recalcular o breakdown no servidor.
  const { data: settingsRow } = await supabase
    .from("pricing_settings")
    .select("*")
    .eq("vigente", true)
    .order("versao", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!settingsRow) {
    return { error: "Configure os parâmetros de precificação antes." };
  }
  const settings = toPricingSettings(settingsRow);

  const { data: materiais } = await supabase
    .from("materiais")
    .select("id, custo_por_kg_centavos");
  const custoKg = new Map(
    (materiais ?? []).map((m) => [m.id, m.custo_por_kg_centavos]),
  );

  const produtoFields = {
    nome: payload.nome.trim(),
    slug: payload.slug.trim(),
    descricao: payload.descricao.trim() || null,
    fotos: payload.fotos,
    lead_time_dias: payload.leadTimeDias,
    personalizacao_schema: payload.personalizacao as unknown as Json,
    ativo: payload.ativo,
    disponivel_pedidos: payload.disponivelPedidos,
  };

  let produtoId = payload.id;

  if (produtoId) {
    const { error } = await supabase
      .from("produtos")
      .update(produtoFields)
      .eq("id", produtoId);
    if (error) return { error: mapError(error.message) };
  } else {
    const { data, error } = await supabase
      .from("produtos")
      .insert(produtoFields)
      .select("id")
      .single();
    if (error || !data) return { error: mapError(error?.message ?? "Falha ao salvar.") };
    produtoId = data.id;
  }

  // Sincroniza variações: atualiza existentes, insere novas, remove ausentes.
  const existentesIds = payload.variacoes
    .map((v) => v.id)
    .filter((id): id is string => Boolean(id));

  if (payload.id) {
    let del = supabase.from("produto_variacoes").delete().eq("produto_id", produtoId);
    if (existentesIds.length > 0) {
      del = del.not("id", "in", `(${existentesIds.join(",")})`);
    }
    await del;
  }

  for (const v of payload.variacoes) {
    const row = buildVariacaoRow(v, produtoId, settings, settingsRow.versao, custoKg);
    if (v.id) {
      const { error } = await supabase
        .from("produto_variacoes")
        .update(row)
        .eq("id", v.id);
      if (error) return { error: error.message };
    } else {
      const { error } = await supabase.from("produto_variacoes").insert(row);
      if (error) return { error: error.message };
    }
  }

  revalidatePath("/admin/produtos");
  return { id: produtoId };
}

export async function deleteProduto(id: string): Promise<{ error?: string }> {
  await requireAdmin();
  const supabase = await createClient();

  // Remove fotos do bucket (best-effort).
  const { data: produto } = await supabase
    .from("produtos")
    .select("fotos")
    .eq("id", id)
    .maybeSingle();
  if (produto?.fotos?.length) {
    await supabase.storage.from("produtos").remove(produto.fotos);
  }

  const { error } = await supabase.from("produtos").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/produtos");
  return {};
}

function mapError(message: string): string {
  if (message.includes("produtos_slug_key") || message.includes("duplicate key")) {
    return "Já existe um produto com esse slug.";
  }
  return message;
}
