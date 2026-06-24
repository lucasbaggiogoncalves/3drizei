import { createClient } from "@/lib/supabase/server";
import { publicUrl } from "@/lib/storage";
import type { PersonalizacaoField } from "@/lib/produto-types";

export type LojaProduto = {
  id: string;
  slug: string;
  nome: string;
  descricao: string | null;
  /** URL pública pronta da capa, ou null se o produto ainda não tem foto. */
  capa: string | null;
  /** Todas as fotos como URLs públicas. */
  fotos: string[];
  leadTimeDias: number;
  /** Quantos campos o cliente personaliza (0 = sem personalização). */
  personalizacaoCount: number;
  /** Faixa de preço (centavos) entre as variações ativas. */
  precoMin: number | null;
  precoMax: number | null;
};

/**
 * Produtos ativos para a vitrine, lidos das views públicas (sem custo/dados
 * internos). Agrega a faixa de preço a partir das variações ativas.
 */
export async function getHomeProdutos(): Promise<LojaProduto[]> {
  const supabase = await createClient();

  const { data: produtos, error } = await supabase
    .from("loja_produtos")
    .select(
      "id, slug, nome, descricao, fotos, lead_time_dias, personalizacao_schema",
    )
    .order("created_at", { ascending: false });

  if (error || !produtos?.length) return [];

  const ids = produtos.map((p) => p.id).filter((id): id is string => Boolean(id));

  const { data: variacoes } = await supabase
    .from("loja_variacoes")
    .select("produto_id, preco_venda_centavos")
    .in("produto_id", ids);

  const precosPorProduto = new Map<string, number[]>();
  for (const v of variacoes ?? []) {
    if (!v.produto_id || v.preco_venda_centavos == null) continue;
    const list = precosPorProduto.get(v.produto_id) ?? [];
    list.push(v.preco_venda_centavos);
    precosPorProduto.set(v.produto_id, list);
  }

  return produtos
    .filter((p): p is typeof p & { id: string; slug: string; nome: string } =>
      Boolean(p.id && p.slug && p.nome),
    )
    .map((p) => {
      const fotos = (p.fotos ?? []).map((path) => publicUrl("produtos", path));
      const precos = precosPorProduto.get(p.id) ?? [];
      const schema = Array.isArray(p.personalizacao_schema)
        ? (p.personalizacao_schema as unknown as PersonalizacaoField[])
        : [];

      return {
        id: p.id,
        slug: p.slug,
        nome: p.nome,
        descricao: p.descricao,
        capa: fotos[0] ?? null,
        fotos,
        leadTimeDias: p.lead_time_dias ?? 0,
        personalizacaoCount: schema.length,
        precoMin: precos.length ? Math.min(...precos) : null,
        precoMax: precos.length ? Math.max(...precos) : null,
      } satisfies LojaProduto;
    });
}
