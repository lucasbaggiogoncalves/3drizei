"use client";

import { LogOut } from "lucide-react";
import { signOutAction } from "@/app/admin/login/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function UserMenu({ nome, email }: { nome: string | null; email: string | null }) {
  const inicial = (nome ?? email ?? "?").trim().charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto gap-2 rounded-full px-2 py-1.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-terracotta-50 text-sm font-semibold text-terracotta-700">
              {inicial}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">
            {nome ?? email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-medium">{nome ?? "Admin"}</span>
          {email ? (
            <span className="text-xs font-normal text-muted-foreground">{email}</span>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-2"
            >
              <LogOut className="size-4" />
              Sair
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
