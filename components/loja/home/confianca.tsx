import { CalendarClock, CreditCard, MessageCircle, Truck } from "lucide-react";
import { InstagramIcon } from "@/components/loja/icons";
import { loja } from "@/lib/loja/site";

const garantias = [
  {
    icon: CalendarClock,
    titulo: "Prazo transparente",
    texto: "Você sabe quando a peça fica pronta antes de fechar.",
  },
  {
    icon: CreditCard,
    titulo: "Pagamento seguro",
    texto: "PIX e cartão, com confirmação a cada etapa.",
  },
  {
    icon: Truck,
    titulo: "Envio para todo o Brasil",
    texto: "Embalagem reforçada e código de rastreio.",
  },
  {
    icon: MessageCircle,
    titulo: "Atendimento humano",
    texto: "Fale direto com quem produz, pelo WhatsApp.",
  },
];

export function Confianca() {
  return (
    <section
      id="contato"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {garantias.map((item) => (
          <div
            key={item.titulo}
            className="rounded-3xl border border-clay-200/80 bg-card p-6 shadow-warm-sm"
          >
            <span className="grid size-11 place-items-center rounded-2xl bg-clay-100 text-clay-700">
              <item.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-heading text-base font-semibold text-clay-900">
              {item.titulo}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-clay-600">
              {item.texto}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 rounded-[2rem] border border-terracotta-100 bg-terracotta-50/60 px-6 py-12 text-center">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-clay-950 sm:text-3xl">
            Vamos criar algo especial?
          </h2>
          <p className="mt-3 text-clay-700">
            Conte o que você precisa e a gente cuida do resto — do primeiro
            esboço à entrega na sua porta.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={loja.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta-500 px-6 text-base font-semibold text-primary-foreground shadow-brand transition-colors hover:bg-terracotta-600 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <MessageCircle className="size-5" />
            Falar no WhatsApp
          </a>
          <a
            href={loja.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-clay-300 bg-card px-6 text-base font-semibold text-clay-800 transition-colors hover:border-clay-400 hover:bg-clay-50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <InstagramIcon className="size-5" />
            {loja.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
