"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { navLinks } from "@/lib/loja/site";

export function LojaHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 bg-transparent px-3 py-3 transition-all duration-300 sm:px-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border px-3 transition-all duration-300 sm:px-4",
          scrolled || open
            ? "border-clay-200/80 bg-white/78 shadow-warm-sm ring-1 ring-white/70 backdrop-blur-xl"
            : "border-clay-200/40 bg-white/38 ring-1 ring-white/45",
        )}
      >
        <Link
          href="/"
          aria-label="3drizei — página inicial"
          className="rounded-full px-1 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-clay-600 transition-colors hover:bg-clay-100 hover:text-clay-950 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-1.5 sm:flex">
            <button
              type="button"
              title="Entrar — em breve"
              aria-disabled="true"
              className="h-10 cursor-default rounded-full px-4 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-100 hover:text-clay-950 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Entrar
            </button>
            <button
              type="button"
              title="Criar conta — em breve"
              aria-disabled="true"
              className="h-10 cursor-default rounded-full bg-clay-950 px-4 text-sm font-semibold text-clay-50 shadow-warm-sm transition-colors hover:bg-clay-800 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Criar conta
            </button>
          </div>

          <button
            type="button"
            title="Carrinho — em breve"
            aria-label="Carrinho (em breve)"
            aria-disabled="true"
            className="relative grid size-10 cursor-default place-items-center rounded-full text-clay-700 transition-colors hover:bg-clay-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-terracotta-500 font-mono text-[0.6rem] leading-none text-white ring-2 ring-white">
              0
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-clay-700 transition-colors hover:bg-clay-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-[1.75rem] border border-clay-200/80 bg-white/90 shadow-warm-lg ring-1 ring-white/70 backdrop-blur-xl lg:hidden">
          <nav
            className="flex flex-col gap-1 px-3 py-3 sm:px-4"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-clay-800 transition-colors hover:bg-clay-100 hover:text-clay-950"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 grid gap-2 border-t border-clay-200/70 pt-3 sm:grid-cols-2">
              <button
                type="button"
                title="Entrar — em breve"
                aria-disabled="true"
                className="h-12 cursor-default rounded-full border border-clay-200 bg-white px-4 text-base font-semibold text-clay-800 transition-colors hover:bg-clay-50"
              >
                Entrar
              </button>
              <button
                type="button"
                title="Criar conta — em breve"
                aria-disabled="true"
                className="h-12 cursor-default rounded-full bg-clay-950 px-4 text-base font-semibold text-clay-50 transition-colors hover:bg-clay-800"
              >
                Criar conta
              </button>
            </div>
            <p className="px-4 pt-2 pb-1 text-xs leading-relaxed text-clay-500">
              Conta e checkout serão liberados em breve. Por enquanto, o carrinho
              fica apenas como prévia da loja.
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
