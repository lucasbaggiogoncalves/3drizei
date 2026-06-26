import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-svh min-h-[36rem] w-full overflow-hidden">
      <Image
        src="/home/capa-hero.jpeg"
        alt="Peças personalizadas em impressão 3D da 3drizei: porta-retrato com foto de casal, plaquinha de nome e chaveiros com mapa em formato de coração"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Scrim — garante legibilidade do texto sobre a foto */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,6,4,0.48) 0%, rgba(10,6,4,0.22) 55%, rgba(10,6,4,0) 80%)",
        }}
      />

      {/* Fade-out na base — integra com o fundo da página */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 left-0 h-52 sm:h-64"
        style={{
          background:
            "linear-gradient(to top, var(--color-background) 0%, transparent 100%)",
        }}
      />

      {/* Conteúdo — centralizado verticalmente descontando o navbar */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-16 pb-36 text-center sm:px-10 sm:pb-48">
        <h1 className="max-w-4xl font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl xl:text-7xl">
          Presentes que contam{" "}
          <em className="font-medium text-terracotta-100 not-italic sm:italic">
            a sua história
          </em>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 drop-shadow-sm sm:text-lg">
          Decoração e presentes personalizados, modelados e impressos um a um.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#produtos"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-clay-950 shadow-warm-lg transition-colors hover:bg-clay-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/60"
          >
            Ver produtos
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#depoimentos"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/45 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/18 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/60"
          >
            Depoimentos
          </Link>
        </div>
      </div>
    </section>
  );
}
