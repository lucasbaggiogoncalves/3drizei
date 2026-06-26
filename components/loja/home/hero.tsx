import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-svh min-h-[480px] max-h-[860px] w-full overflow-hidden">
      <Image
        src="/home/capa-hero.jpeg"
        alt="Peças personalizadas em impressão 3D da 3drizei: porta-retrato com foto de casal, plaquinha de nome e chaveiros com mapa em formato de coração"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />

      {/* Scrim — concentrado no terço superior onde fica o texto */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,6,4,0.54) 0%, rgba(10,6,4,0.28) 42%, rgba(10,6,4,0) 68%)",
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

      {/* Conteúdo — terço superior do hero, abaixo do navbar */}
      <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-28 text-center sm:px-10 sm:pt-32 lg:pt-36">
        <h1 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-[2.75rem] xl:text-[3.5rem]">
          Presentes que contam{" "}
          <em className="font-medium text-terracotta-100 not-italic sm:italic">
            a sua história
          </em>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 drop-shadow-sm sm:text-lg">
          Decoração e presentes personalizados, modelados e impressos um a um.
        </p>

        <div className="mt-8">
          <Link
            href="#produtos"
            className="group relative overflow-hidden rounded-full px-6 py-2 font-semibold text-white transition-all duration-500 hover:text-clay-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/60"
          >
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-terracotta-500 transition-all duration-500 group-hover:h-full"
            />
            <span className="relative">Ver produtos</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
