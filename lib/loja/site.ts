/**
 * Configuração estática da loja pública (contato, navegação, social).
 * Centralizado para reuso entre header, footer e botão flutuante.
 */

const WHATSAPP_DIGITS = "5554936184577";

export const loja = {
  nome: "3drizei",
  descritor: "Decoração | Presentes",
  tagline: "Impressão 3D personalizada, feita sob encomenda.",
  whatsapp: {
    /** Número em formato E.164 (só dígitos) para links wa.me. */
    digits: WHATSAPP_DIGITS,
    /** Versão formatada para exibição. */
    display: "+55 54 93618-4577",
    /** Mensagem pré-preenchida ao abrir a conversa. */
    href: `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(
      "Olá! Vim pela loja e gostaria de saber mais sobre as peças personalizadas.",
    )}`,
  },
  instagram: {
    handle: "@3drizei",
    href: "https://instagram.com/3drizei",
  },
} as const;

export const navLinks = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/#produtos" },
  { label: "Sob demanda", href: "/#sob-demanda" },
  { label: "Sobre", href: "/#sobre" },
] as const;
