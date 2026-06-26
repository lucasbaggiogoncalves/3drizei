import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
        <Image
          src="/home/capa-hero.jpeg"
          alt="Peças personalizadas em impressão 3D da 3drizei: porta-retrato com foto de casal, plaquinha de nome e chaveiros com mapa em formato de coração"
          width={1024}
          height={568}
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="h-[32rem] w-full object-cover object-center sm:aspect-[1024/568] sm:h-auto"
        />

        {/* scrim discreto — só garante leitura do texto no topo da foto */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, rgba(28,20,16,0.34) 0%, transparent 58%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-12 text-center sm:px-10 sm:pt-16 lg:pt-20">
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.0] font-semibold tracking-tight text-white drop-shadow-md sm:text-7xl lg:text-8xl">
            Presentes que contam{" "}
            <em className="font-medium text-terracotta-100 not-italic sm:italic">
              a sua história
            </em>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/90 drop-shadow-sm sm:text-lg">
            Decoração e presentes personalizados, modelados e impressos um a um.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#produtos"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-clay-950 shadow-warm-lg transition-colors hover:bg-clay-50 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
            >
              Ver produtos
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#depoimentos"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
            >
              Depoimentos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
