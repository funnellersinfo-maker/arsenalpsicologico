import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El Umbral — Descubre los Patrones Ocultos de la Mente",
  description:
    "La mayoría de las personas cree que pierde oportunidades por lo que dice. En realidad las pierde por los patrones invisibles que proyecta. Cruza el umbral.",
  keywords: [
    "psicología",
    "percepción",
    "patrones ocultos",
    "mente humana",
    "inteligencia social",
  ],
  icons: {
    icon: "/cosmic/singularity.png",
  },
  openGraph: {
    title: "El Umbral — Descubre los Patrones Ocultos",
    description:
      "Cruza el umbral hacia una dimensión donde los patrones invisibles de la mente se vuelven visibles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
