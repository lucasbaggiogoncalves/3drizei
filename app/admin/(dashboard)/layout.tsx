import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { UserMenu } from "@/components/admin/user-menu";

export const metadata: Metadata = {
  title: "Backoffice",
  description:
    "Backoffice do 3drizei — impressão 3D personalizada, feito com afeto.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-border/70 bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-end">
            <UserMenu nome={admin.nome} email={admin.email} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
