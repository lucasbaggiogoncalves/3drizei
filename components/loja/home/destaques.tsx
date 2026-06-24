import { PackageOpen } from "lucide-react";
import { ProdutoCard } from "@/components/loja/produto-card";
import { loja } from "@/lib/loja/site";
import type { LojaProduto } from "@/lib/data/loja";

export function Destaques({ produtos }: { produtos: LojaProduto[] }) {
  return (
    <section
      id="produtos"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow">Nossa vitrine</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-clay-950 sm:text-4xl">
            Peças prontas para personalizar
          </h2>
          <p className="mt-3 text-clay-600">
            Cada item é produzido sob encomenda — escolha o que combina com você
            e ajustamos os detalhes juntos.
          </p>
        </div>
      </div>

      {produtos.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-clay-300 bg-clay-50/60 px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-terracotta-50 text-terracotta-600">
            <PackageOpen className="size-6" />
          </span>
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-semibold text-clay-900">
              Novidades chegando
            </h3>
            <p className="mx-auto max-w-sm text-sm text-clay-600">
              Estamos preparando a vitrine. Enquanto isso, fale com a gente para
              um pedido personalizado.
            </p>
          </div>
          <a
            href={loja.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-clay-950 px-5 text-sm font-semibold text-clay-50 transition-colors hover:bg-clay-800"
          >
            Falar no WhatsApp
          </a>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </section>
  );
}
