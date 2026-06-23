"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  SquareKanban,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo, LogoBadge } from "@/components/brand/logo";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };

const GRUPOS: { label: string; items: NavItem[] }[] = [
  {
    label: "Operação",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/pedidos", label: "Pedidos", icon: SquareKanban },
      { href: "/admin/produtos", label: "Produtos", icon: Package },
      { href: "/admin/clientes", label: "Clientes", icon: Users },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { href: "/admin/despesas", label: "Despesas", icon: Receipt },
      { href: "/admin/calculadora", label: "Calculadora", icon: Calculator },
      { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(item: NavItem) {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-3">
          <LogoBadge />
          <div className="group-data-[collapsible=icon]:hidden">
            <Logo />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {GRUPOS.map((grupo) => (
          <SidebarGroup key={grupo.label}>
            <SidebarGroupLabel>{grupo.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {grupo.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item)} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <p className="eyebrow px-2 group-data-[collapsible=icon]:hidden">
          Feito com afeto
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
