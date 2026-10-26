import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { getAgency } from "@/lib/dunastour/server";
import { agencyInfo } from "@/lib/agency-info";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CartDrawer } from "@/components/checkout/CartDrawer";
import { Analytics } from "@/components/layout/Analytics";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mister K Lençóis — Passeios nos Lençóis Maranhenses",
    template: "%s · Mister K Lençóis",
  },
  description:
    "Passeios 4x4, lagoas, Rio Preguiças, Atins, trekking, transfer e experiências nos Lençóis Maranhenses com guia local. Reserve online.",
  keywords: ["Lençóis Maranhenses", "Barreirinhas", "passeios", "Lagoa Azul", "Lagoa Bonita", "Atins", "Rio Preguiças", "agência local"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    // Imagem do compartilhamento (logo da Mister K): app/opengraph-image.png e twitter-image.png.
  },
  // Ícones: app/icon.png e app/apple-icon.png (logo da Mister K).
};

export const viewport: Viewport = {
  themeColor: "#0a2547",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const info = agencyInfo(await getAgency());
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <Header info={info} />
        <main>{children}</main>
        <Footer info={info} />
        <WhatsAppFab phone={info.phone} />
        {(site.onlineBooking || site.cart) && <CartDrawer phone={info.phone} />}
        <Analytics />
      </body>
    </html>
  );
}
