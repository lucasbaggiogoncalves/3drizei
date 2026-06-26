import { getHomeProdutos } from "@/lib/data/loja";
import { Hero } from "@/components/loja/home/hero";
import { Destaques } from "@/components/loja/home/destaques";
import { SobDemanda } from "@/components/loja/home/sob-demanda";
import { Sobre } from "@/components/loja/home/sobre";
import { Confianca } from "@/components/loja/home/confianca";

// Catálogo muda pouco — revalida periodicamente em vez de a cada request.
export const revalidate = 300;

export default async function HomePage() {
  const produtos = await getHomeProdutos();

  return (
    <>
      <Hero />
      <Destaques produtos={produtos} />
      <SobDemanda />
      <Sobre />
      <Confianca />
    </>
  );
}
