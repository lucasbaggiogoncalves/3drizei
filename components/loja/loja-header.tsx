"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { loja, navLinks } from "@/lib/loja/site";

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
        "sticky top-0 z-30 transition-colors duration-300",
        scrolled || open
          ? "border-b border-clay-200/70 bg-clay-50/85 backdrop-blur supports-[backdrop-filter]:bg-clay-50/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="3drizei — página inicial"
          className="rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-clay-700 transition-colors hover:bg-terracotta-50 hover:text-terracotta-700 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={loja.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-full bg-clay-950 px-4 text-sm font-semibold text-clay-50 transition-colors hover:bg-clay-800 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-flex"
          >
            Fazer pedido
          </a>

          <button
            type="button"
            title="Carrinho — em breve"
            aria-label="Carrinho (em breve)"
            className="relative grid size-10 cursor-pointer place-items-center rounded-full text-clay-700 transition-colors hover:bg-clay-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-terracotta-500 font-mono text-[0.6rem] leading-none text-white">
              0
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid size-10 cursor-pointer place-items-center rounded-full text-clay-700 transition-colors hover:bg-clay-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-clay-200/70 bg-clay-50 md:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-clay-800 transition-colors hover:bg-terracotta-50 hover:text-terracotta-700"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={loja.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-clay-950 px-4 text-base font-semibold text-clay-50 transition-colors hover:bg-clay-800"
            >
              Fazer pedido no WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
