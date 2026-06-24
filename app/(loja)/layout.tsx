import { LojaHeader } from "@/components/loja/loja-header";
import { LojaFooter } from "@/components/loja/loja-footer";
import { WhatsappFab } from "@/components/loja/whatsapp-fab";

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <LojaHeader />
      <main className="flex-1">{children}</main>
      <LojaFooter />
      <WhatsappFab />
    </div>
  );
}
