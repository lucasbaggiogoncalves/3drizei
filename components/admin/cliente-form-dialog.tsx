"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import type { Cliente } from "@/lib/data/clientes";
import { ClienteForm } from "@/components/admin/cliente-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ClienteFormDialog({
  cliente,
  trigger,
  goToDetail = false,
}: {
  cliente?: Cliente;
  trigger?: React.ReactNode;
  goToDetail?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="rounded-full">
            <Plus className="size-4" />
            Novo cliente
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{cliente ? "Editar cliente" : "Novo cliente"}</DialogTitle>
          <DialogDescription>
            {cliente
              ? "Atualize os dados de contato e endereço."
              : "Cadastre um cliente manualmente. Pedidos podem ser vinculados depois."}
          </DialogDescription>
        </DialogHeader>
        <ClienteForm
          cliente={cliente}
          onCancel={() => setOpen(false)}
          onSaved={(id) => {
            setOpen(false);
            if (goToDetail) router.push(`/admin/clientes/${id}`);
            else router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
