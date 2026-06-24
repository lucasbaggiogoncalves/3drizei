import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { getProdutos } from "@/lib/data/produtos";
import { publicUrl } from "@/lib/storage";
import { formatBRL } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { ProdutoActions } from "@/components/admin/produto-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Produtos · 3drizei" };

function faixaPreco(min: number | null, max: number | null) {
  if (min === null) return "Sem variações";
  if (min === max) return formatBRL(min);
  return `${formatBRL(min)} – ${formatBRL(max)}`;
}

export default async function ProdutosPage() {
  const itens = await getProdutos();

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Produtos"
        description="Seus itens sob encomenda, com variações, custos e personalização."
      >
        <Button asChild className="rounded-full">
          <Link href="/admin/produtos/novo">
            <Plus className="size-4" />
            Novo produto
          </Link>
        </Button>
      </PageHeader>

      {itens.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum produto ainda"
          description="Cadastre seu primeiro produto com variações e deixe o custo amarrado ao preço."
        >
          <Button asChild className="rounded-full">
            <Link href="/admin/produtos/novo">
              <Plus className="size-4" />
              Criar produto
            </Link>
          </Button>
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {itens.map(({ produto, variacoesCount, ativas, precoMin, precoMax }) => (
            <div
              key={produto.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-warm-sm transition hover:-translate-y-1 hover:shadow-warm-lg"
            >
              <Link
                href={`/admin/produtos/${produto.id}`}
                className="relative block aspect-[4/3] overflow-hidden bg-clay-100"
              >
                {produto.fotos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={publicUrl("produtos", produto.fotos[0])}
                    alt={produto.nome}
                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid size-full place-items-center text-clay-400">
                    <Package className="size-8" />
                  </div>
                )}
                {(!produto.ativo || !produto.disponivel_pedidos) && (
                  <div className="absolute left-3 top-3 flex flex-col gap-1">
                    {!produto.ativo && (
                      <Badge
                        variant="secondary"
                        className="bg-clay-200 text-clay-700"
                      >
                        Fora da loja
                      </Badge>
                    )}
                    {!produto.disponivel_pedidos && (
                      <Badge
                        variant="secondary"
                        className="bg-danger-50 text-danger-700"
                      >
                        Indisponível p/ pedidos
                      </Badge>
                    )}
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/admin/produtos/${produto.id}`}
                    className="font-heading font-semibold leading-snug text-clay-900 hover:text-terracotta-700"
                  >
                    {produto.nome}
                  </Link>
                  <ProdutoActions id={produto.id} nome={produto.nome} />
                </div>
                <p className="eyebrow">
                  {variacoesCount} {variacoesCount === 1 ? "variação" : "variações"} ·{" "}
                  {ativas} ativa{ativas === 1 ? "" : "s"}
                </p>
                <p className="mt-auto font-medium text-terracotta-700">
                  {faixaPreco(precoMin, precoMax)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
