import { createClient } from "@/lib/supabase/server";
import type { PricingSettings } from "@/lib/pricing/engine";
import type { Database } from "@/lib/database.types";

export type Material = Database["public"]["Tables"]["materiais"]["Row"];
export type PricingSettingsRow =
  Database["public"]["Tables"]["pricing_settings"]["Row"];

export async function getMateriais(onlyAtivo = false): Promise<Material[]> {
  const supabase = await createClient();
  let query = supabase.from("materiais").select("*").order("nome");
  if (onlyAtivo) query = query.eq("ativo", true);
  const { data } = await query;
  return data ?? [];
}

export async function getSettingsVigenteRow(): Promise<PricingSettingsRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pricing_settings")
    .select("*")
    .eq("vigente", true)
    .order("versao", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

/** Converte a linha do banco para os parâmetros do motor de precificação. */
export function toPricingSettings(row: PricingSettingsRow): PricingSettings {
  return {
    horaMaquinaCentavos: row.hora_maquina_centavos,
    kwhCentavos: row.kwh_centavos,
    consumoW: row.consumo_w,
    bufferFalhaPct: Number(row.buffer_falha_pct),
    maoObraHoraCentavos: row.mao_obra_hora_centavos,
    margemPct: Number(row.margem_pct),
    taxasPct: Number(row.taxas_pct),
  };
}
