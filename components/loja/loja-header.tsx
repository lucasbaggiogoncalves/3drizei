"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/loja/site";

export function LojaHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // No topo da home: navbar transparente sobre o hero com conteúdo claro.
  // Após scroll, com menu aberto, ou em outras páginas: fundo branco fosco.
  const onHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-30 transition-all duration-500",
        scrolled || open
          ? "border-b border-clay-200/60 bg-white/92 shadow-warm-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-6 sm:px-8">
        {/* Logo — esquerda */}
        <Link
          href="/"
          aria-label="3drizei — página inicial"
          className="flex-none rounded-full focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo/logo-horizontal-vazado-pequeno.png"
            alt="3drizei"
            width={550}
            height={307}
            priority
            className="h-8 w-auto transition-all duration-500 sm:h-9"
            style={onHero ? { filter: "brightness(0) invert(1)" } : undefined}
          />
        </Link>

        {/* Nav — centro absoluto */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                onHero
                  ? "text-white/85 hover:bg-white/12 hover:text-white"
                  : "text-clay-600 hover:bg-clay-100 hover:text-clay-950",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ações — direita */}
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-0.5 sm:flex">
            <button
              type="button"
              title="Entrar — em breve"
              aria-disabled="true"
              className={cn(
                "h-9 cursor-default rounded-full px-4 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                onHero
                  ? "text-white/85 hover:bg-white/12 hover:text-white"
                  : "text-clay-700 hover:bg-clay-100 hover:text-clay-950",
              )}
            >
              Entrar
            </button>
            <button
              type="button"
              title="Criar conta — em breve"
              aria-disabled="true"
              className={cn(
                "h-9 cursor-default rounded-full px-4 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                onHero
                  ? "border border-white/35 bg-white/10 text-white hover:border-white/50 hover:bg-white/18"
                  : "bg-clay-950 text-clay-50 hover:bg-clay-800",
              )}
            >
              Criar conta
            </button>
          </div>

          <button
            type="button"
            title="Carrinho — em breve"
            aria-label="Carrinho (em breve)"
            aria-disabled="true"
            className={cn(
              "relative ml-1 grid size-9 cursor-default place-items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              onHero
                ? "text-white hover:bg-white/12"
                : "text-clay-700 hover:bg-clay-100",
            )}
          >
            <ShoppingBag className="size-[1.1rem]" />
            <span className="absolute -top-0.5 -right-0.5 grid size-[1.1rem] place-items-center rounded-full bg-terracotta-500 font-mono text-[0.55rem] leading-none text-white ring-2 ring-white">
              0
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className={cn(
              "grid size-9 cursor-pointer place-items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden",
              onHero
                ? "text-white hover:bg-white/12"
                : "text-clay-700 hover:bg-clay-100",
            )}
          >
            {open ? <X className="size-[1.1rem]" /> : <Menu className="size-[1.1rem]" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open ? (
        <div className="border-t border-clay-200/60 bg-white/95 backdrop-blur-xl lg:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-3 sm:px-8"
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
            <p className="px-4 pt-2 pb-3 text-xs leading-relaxed text-clay-500">
              Conta e checkout serão liberados em breve. Por enquanto, o
              carrinho fica apenas como prévia da loja.
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
