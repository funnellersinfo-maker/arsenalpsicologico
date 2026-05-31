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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1794258984886814');
fbq('track', 'PageView');
`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1794258984886814&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
