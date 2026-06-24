import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminContext = {
  userId: string;
  email: string | null;
  nome: string | null;
};

/**
 * Garante que há uma sessão de admin. Usado no layout do dashboard e em
 * server actions sensíveis (camada 2 de proteção, além do middleware + RLS).
 * Redireciona para o login quando não há sessão ou a conta não é admin.
 */
export async function requireAdmin(): Promise<AdminContext> {
  const supabase = await createClient();

  // getClaims() verifica o JWT localmente (sem rede) com chaves assimétricas,
  // evitando o round-trip do /auth/v1/user a cada carga de página.
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;

  if (!claims?.sub) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, nome")
    .eq("id", claims.sub)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login?erro=sem-acesso");
  }

  return {
    userId: claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    nome: profile.nome,
  };
}
