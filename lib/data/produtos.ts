import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import type { PersonalizacaoField } from "@/lib/produto-types";

export type Produto = Database["public"]["Tables"]["produtos"]["Row"];
export type Variacao = Database["public"]["Tables"]["produto_variacoes"]["Row"];

export type ProdutoComVariacoes = Produto & {
  produto_variacoes: Variacao[];
};

export type ProdutoListItem = {
  produto: Produto;
  variacoesCount: number;
  ativas: number;
  precoMin: number | null;
  precoMax: number | null;
};

export async function getProdutos(): Promise<ProdutoListItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select("*, produto_variacoes(preco_venda_centavos, ativo)")
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => {
    const { produto_variacoes, ...produto } = row as Produto & {
      produto_variacoes: { preco_venda_centavos: number; ativo: boolean }[];
    };
    const precos = produto_variacoes.map((v) => v.preco_venda_centavos);
    return {
      produto: produto as Produto,
      variacoesCount: produto_variacoes.length,
      ativas: produto_variacoes.filter((v) => v.ativo).length,
      precoMin: precos.length ? Math.min(...precos) : null,
      precoMax: precos.length ? Math.max(...precos) : null,
    };
  });
}

export type VariacaoParaPedido = {
  id: string;
  nome: string | null;
  opcoes: Record<string, string>;
  precoVendaCentavos: number;
};

export type ProdutoParaPedido = {
  id: string;
  nome: string;
  personalizacao: PersonalizacaoField[];
  variacoes: VariacaoParaPedido[];
};

export async function getProdutosParaPedido(): Promise<ProdutoParaPedido[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select(
      "id, nome, personalizacao_schema, produto_variacoes(id, nome, opcoes, preco_venda_centavos, ativo)",
    )
    .eq("ativo", true)
    .order("nome");

  return (data ?? []).map((p) => {
    const row = p as unknown as {
      id: string;
      nome: string;
      personalizacao_schema: PersonalizacaoField[] | null;
      produto_variacoes: {
        id: string;
        nome: string | null;
        opcoes: Record<string, string> | null;
        preco_venda_centavos: number;
        ativo: boolean;
      }[];
    };
    return {
      id: row.id,
      nome: row.nome,
      personalizacao: row.personalizacao_schema ?? [],
      variacoes: row.produto_variacoes
        .filter((v) => v.ativo)
        .map((v) => ({
          id: v.id,
          nome: v.nome,
          opcoes: v.opcoes ?? {},
          precoVendaCentavos: v.preco_venda_centavos,
        })),
    };
  });
}

export async function getProduto(
  id: string,
): Promise<ProdutoComVariacoes | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select("*, produto_variacoes(*)")
    .eq("id", id)
    .maybeSingle();
  return (data as ProdutoComVariacoes) ?? null;
}
