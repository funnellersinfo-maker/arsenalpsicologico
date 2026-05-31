import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arsenal Psicológico — 15 Libros de Psicología Oscura",
  description:
    "Descubre los principios de psicología oscura que usan líderes y negociadores. 15 libros sobre manipulación, seducción y poder. Oferta limitada.",
  keywords: [
    "psicología oscura",
    "manipulación",
    "persuasión",
    "inteligencia social",
    "leer personas",
    "influencia",
    "poder mental",
    "seducción psicológica",
    "negociación",
    "arsenal psicológico",
  ],
  icons: {
    icon: "/cosmic/singularity.png",
  },
  openGraph: {
    title: "Arsenal Psicológico — 15 Libros de Psicología Oscura",
    description:
      "Descubre los principios de psicología oscura que usan líderes y negociadores. 15 libros sobre manipulación, seducción y poder.",
    type: "website",
    images: [{ url: "/cosmic/portadas.png", width: 1200, height: 630, alt: "Arsenal Psicológico" }],
    url: "https://arsenalpsicologico.pages.dev",
    siteName: "Arsenal Psicológico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsenal Psicológico — 15 Libros de Psicología Oscura",
    description:
      "Descubre los principios de psicología oscura. 15 libros sobre manipulación, seducción y poder.",
    images: ["/cosmic/portadas.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
