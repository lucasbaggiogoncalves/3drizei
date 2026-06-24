import { ArrowRight, Lightbulb, PencilRuler, PackageCheck } from "lucide-react";
import { loja } from "@/lib/loja/site";

const passos = [
  {
    icon: Lightbulb,
    titulo: "Conte sua ideia",
    texto:
      "Mande uma referência, um nome, uma data — qualquer coisa que represente o que você imagina.",
  },
  {
    icon: PencilRuler,
    titulo: "Modelamos e aprovamos juntos",
    texto:
      "Criamos o modelo 3D e ajustamos com você até ficar do jeitinho certo, antes de imprimir.",
  },
  {
    icon: PackageCheck,
    titulo: "Produzimos e enviamos",
    texto:
      "Imprimimos com acabamento cuidadoso e enviamos para todo o Brasil com segurança.",
  },
];

export function SobDemanda() {
  return (
    <section id="sob-demanda" className="scroll-mt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-clay-950 px-6 py-14 text-clay-100 sm:px-10 lg:px-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-terracotta-300!">Criado do zero</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-clay-50 sm:text-4xl">
            Tem uma ideia na cabeça? A gente tira do papel.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-clay-300">
            Projetos sob demanda, do conceito à peça pronta. Sem catálogo, sem
            molde — só a sua ideia ganhando forma.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {passos.map((passo, i) => (
            <li key={passo.titulo} className="relative">
              <span className="grid size-11 place-items-center rounded-2xl bg-clay-900 text-terracotta-300 ring-1 ring-white/10">
                <passo.icon className="size-5" />
              </span>
              <p className="mt-4 font-mono text-xs tracking-[0.18em] text-clay-500 uppercase">
                Passo {i + 1}
              </p>
              <h3 className="mt-1 font-heading text-lg font-semibold text-clay-50">
                {passo.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-clay-300">
                {passo.texto}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <a
            href={loja.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta-500 px-6 text-base font-semibold text-primary-foreground shadow-brand transition-colors hover:bg-terracotta-400 focus-visible:ring-3 focus-visible:ring-terracotta-300/50 focus-visible:outline-none"
          >
            Pedir um orçamento
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
