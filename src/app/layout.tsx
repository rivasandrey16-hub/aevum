import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AEVUM — Agencia de Integración de Inteligencia Artificial",
  description:
    "Integramos inteligencia artificial en el corazón de tu negocio. Automatización, agentes IA, análisis predictivo y consultoría estratégica para empresas que quieren escalar.",
  openGraph: {
    title: "AEVUM — Agencia de Integración de Inteligencia Artificial",
    description:
      "Integramos inteligencia artificial en el corazón de tu negocio para que escale sin límites.",
    type: "website",
    locale: "es_ES",
    siteName: "AEVUM",
  },
  icons: {
    icon: "/aevum/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
