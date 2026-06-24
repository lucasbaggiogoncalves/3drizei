import { MessageCircle } from "lucide-react";
import { loja } from "@/lib/loja/site";

/**
 * Botão flutuante de WhatsApp — contato humano sempre a um toque,
 * peça central de confiança da loja. Alvo de toque >= 44px.
 */
export function WhatsappFab() {
  return (
    <a
      href={loja.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp (${loja.whatsapp.display})`}
      className="group fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#1f9d4d] pr-0 pl-4 text-white shadow-warm-lg ring-1 ring-black/5 transition-[gap,padding-right] duration-300 hover:gap-2 hover:pr-5 focus-visible:ring-3 focus-visible:ring-[#1f9d4d]/40 focus-visible:outline-none motion-reduce:transition-none sm:right-6 sm:bottom-6"
    >
      <span className="grid size-14 place-items-center">
        <MessageCircle className="size-6" />
      </span>
      <span className="max-w-0 overflow-hidden font-heading text-sm font-semibold whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-300 group-hover:max-w-[10rem] group-hover:opacity-100 motion-reduce:transition-none">
        Fale conosco
      </span>
    </a>
  );
}
