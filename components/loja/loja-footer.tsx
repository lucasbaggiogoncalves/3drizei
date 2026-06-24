import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/loja/icons";
import { Logo } from "@/components/brand/logo";
import { loja, navLinks } from "@/lib/loja/site";

export function LojaFooter() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-clay-200/70 bg-clay-100/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo withDescriptor />
            <p className="max-w-xs text-sm leading-relaxed text-clay-600">
              Peças de decoração e presentes em impressão 3D, personalizados e
              feitos sob encomenda com afeto — uma a uma.
            </p>
          </div>

          <nav aria-label="Rodapé" className="space-y-3">
            <p className="eyebrow">Navegação</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-clay-700 transition-colors hover:text-terracotta-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <p className="eyebrow">Contato</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={loja.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-clay-700 transition-colors hover:text-terracotta-700"
                >
                  <MessageCircle className="size-4 text-clay-500" />
                  {loja.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={loja.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-clay-700 transition-colors hover:text-terracotta-700"
                >
                  <InstagramIcon className="size-4 text-clay-500" />
                  {loja.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-clay-200/70 pt-6 text-xs text-clay-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {ano} 3drizei. Feito sob encomenda, com carinho.</p>
          <p>Pagamento via PIX e cartão · Envio para todo o Brasil</p>
        </div>
      </div>
    </footer>
  );
}
