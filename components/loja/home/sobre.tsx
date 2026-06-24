import { Heart, Layers, MessagesSquare } from "lucide-react";

const valores = [
  {
    icon: Heart,
    titulo: "Feito com afeto",
    texto: "Cada peça é produzida sob encomenda, pensada para uma pessoa.",
  },
  {
    icon: Layers,
    titulo: "Acabamento cuidadoso",
    texto: "Materiais resistentes e revisão peça a peça antes do envio.",
  },
  {
    icon: MessagesSquare,
    titulo: "Atendimento próximo",
    texto: "A gente conversa de verdade, do pedido até a entrega.",
  },
];

export function Sobre() {
  return (
    <section
      id="sobre"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-last lg:order-first">
          <div
            className="bg-gradient-cream flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] border border-clay-200/80 shadow-warm-lg"
            aria-hidden
          >
            <div className="text-center">
              <span className="font-heading text-6xl font-bold tracking-tight">
                <span className="text-terracotta-500">3d</span>
                <span className="text-clay-900">rizei</span>
              </span>
              <p className="eyebrow mt-3">Decoração | Presentes</p>
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <p className="eyebrow">Quem faz</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-clay-950 sm:text-4xl">
            Um ateliê digital, com mãos de verdade
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-clay-600">
            A 3drizei nasceu do gosto por transformar ideias em objetos que
            ficam. Trabalhamos com impressão 3D para criar presentes e peças de
            decoração que têm significado — nada de produção em massa.
          </p>

          <ul className="mt-8 space-y-5">
            {valores.map((valor) => (
              <li key={valor.titulo} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-terracotta-50 text-terracotta-600">
                  <valor.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-clay-900">
                    {valor.titulo}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-clay-600">
                    {valor.texto}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
