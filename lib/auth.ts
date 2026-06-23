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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, nome")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login?erro=sem-acesso");
  }

  return {
    userId: user.id,
    email: user.email ?? null,
    nome: profile.nome,
  };
}
