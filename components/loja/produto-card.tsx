import Image from "next/image";
import { Clock, Sparkles } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { loja } from "@/lib/loja/site";
import type { LojaProduto } from "@/lib/data/loja";

function faixaPreco(min: number | null, max: number | null): string | null {
  if (min == null) return null;
  if (max == null || max === min) return formatBRL(min);
  return `${formatBRL(min)} – ${formatBRL(max)}`;
}

function whatsappProdutoHref(nome: string): string {
  const msg = `Olá! Tenho interesse no produto "${nome}". Pode me ajudar?`;
  return `https://wa.me/${loja.whatsapp.digits}?text=${encodeURIComponent(msg)}`;
}

export function ProdutoCard({ produto }: { produto: LojaProduto }) {
  const preco = faixaPreco(produto.precoMin, produto.precoMax);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-clay-200/80 bg-card shadow-warm-sm transition-shadow duration-300 hover:shadow-warm-lg">
      <div className="relative aspect-[4/5] overflow-hidden bg-clay-100">
        {produto.capa ? (
          <Image
            src={produto.capa}
            alt={produto.nome}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          <div
            className="bg-gradient-warm flex h-full w-full items-center justify-center"
            aria-hidden
          >
            <span className="font-heading text-5xl font-bold tracking-tight text-white/90">
              3d
            </span>
          </div>
        )}

        {produto.personalizacaoCount > 0 ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-clay-50/90 px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-clay-700 backdrop-blur">
            <Sparkles className="size-3 text-terracotta-500" />
            Personalizável
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-clay-900">
            {produto.nome}
          </h3>
          {produto.descricao ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-clay-600">
              {produto.descricao}
            </p>
          ) : null}
        </div>

        <div className="mt-auto space-y-3 pt-1">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="eyebrow">A partir de</p>
              <p className="font-mono text-base font-bold text-clay-950">
                {preco ?? "Sob consulta"}
              </p>
            </div>
            {produto.leadTimeDias > 0 ? (
              <span className="inline-flex items-center gap-1 text-xs text-clay-500">
                <Clock className="size-3.5" />
                {produto.leadTimeDias} dias
              </span>
            ) : null}
          </div>

          <a
            href={whatsappProdutoHref(produto.nome)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-clay-200 bg-clay-50 px-4 text-sm font-semibold text-clay-900 transition-colors hover:border-terracotta-200 hover:bg-terracotta-50 hover:text-terracotta-700 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Quero este
          </a>
        </div>
      </div>
    </article>
  );
}
