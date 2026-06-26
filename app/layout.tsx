import type { Metadata } from "next";
import { Fraunces, Nunito_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Serif old-style, com calor artesanal e ar editorial — substitui a antiga
// Fredoka (arredondada/cartoon) sem perder elegância.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3drizei.com.br"),
  title: {
    default: "3drizei · Impressão 3D personalizada, feita sob encomenda",
    template: "%s · 3drizei",
  },
  description:
    "Peças de decoração e presentes em impressão 3D, personalizados e feitos sob encomenda com afeto. Escolha, personalize e acompanhe seu pedido.",
  keywords: [
    "impressão 3D",
    "presentes personalizados",
    "decoração",
    "sob encomenda",
    "3drizei",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "3drizei",
    title: "3drizei · Impressão 3D personalizada, feita sob encomenda",
    description:
      "Peças de decoração e presentes em impressão 3D, personalizados e feitos sob encomenda com afeto.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${nunitoSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
