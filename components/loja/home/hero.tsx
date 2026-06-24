import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { loja } from "@/lib/loja/site";
import type { LojaProduto } from "@/lib/data/loja";

export function Hero({ destaque }: { destaque?: LojaProduto }) {
  return (
    <section className="relative overflow-hidden">
      {/* brilho quente discreto, ancorado atrás da peça em destaque */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-terracotta-100/50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="max-w-xl">
          <p className="eyebrow">Impressão 3D · Feito sob encomenda</p>
          <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-bold tracking-tight text-clay-950 sm:text-5xl lg:text-6xl">
            Presentes que carregam{" "}
            <span className="text-terracotta-500">a sua história</span>.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-clay-600">
            Decoração e presentes personalizados, modelados e impressos um a um.
            Você escolhe, a gente adapta ao seu jeito e produz com cuidado
            artesanal.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#produtos"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta-500 px-6 text-base font-semibold text-primary-foreground shadow-brand transition-colors hover:bg-terracotta-600 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Ver produtos
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={loja.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-clay-300 bg-card px-6 text-base font-semibold text-clay-800 transition-colors hover:border-clay-400 hover:bg-clay-50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Criar do zero
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-clay-600">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-success-500" />
              <dt className="sr-only">Pagamento</dt>
              <dd>Pagamento seguro (PIX e cartão)</dd>
            </div>
            <div className="inline-flex items-center gap-2">
              <Truck className="size-4 text-copper-500" />
              <dt className="sr-only">Envio</dt>
              <dd>Envio para todo o Brasil</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <HeroVisual destaque={destaque} />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ destaque }: { destaque?: LojaProduto }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-clay-200/80 bg-clay-100 shadow-warm-xl">
        {destaque?.capa ? (
          <Image
            src={destaque.capa}
            alt={destaque.nome}
            fill
            priority
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-cover"
          />
        ) : (
          <div
            className="bg-gradient-warm flex h-full w-full flex-col items-center justify-center gap-3"
            aria-hidden
          >
            <span className="font-heading text-7xl font-bold tracking-tight text-white/90">
              3d
            </span>
            <span className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">
              Feito sob encomenda
            </span>
          </div>
        )}
      </div>

      {destaque?.precoMin != null ? (
        <div className="absolute -bottom-5 -left-4 rounded-2xl border border-clay-200/80 bg-card p-4 shadow-warm-lg sm:-left-6">
          <p className="eyebrow">{destaque.nome}</p>
          <p className="mt-0.5 font-mono text-lg font-bold text-clay-950">
            {formatBRL(destaque.precoMin)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
