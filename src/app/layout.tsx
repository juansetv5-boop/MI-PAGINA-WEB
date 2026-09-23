import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ================================================================
   FONT CONFIGURATION — Vercel Geist Typography System
   ================================================================ */

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

/* ================================================================
   METADATA & BRAND ASSETS
   ================================================================ */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://clickshop.dev'),
  title: {
    default: 'Clickshop | Diseño Web, UI/UX y Desarrollo de Páginas Web en Pereira, Colombia',
    template: '%s | Clickshop',
  },
  description:
    'Estudio de diseño web, interfaces UI/UX y páginas web a medida en Pereira, Risaralda, Colombia. Creamos sitios rápidos, claros y sin tecnicismos que transmiten tranquilidad y convierten visitas en clientes.',
  keywords: [
    'diseño web pereira',
    'paginas web pereira',
    'desarrollo web colombia',
    'diseño ux',
    'diseño ui',
    'diseño web',
    'landing pages efectivas',
    'paginas web corporativas',
    'sistemas web a medida',
    'estudio diseño web eje cafetero',
    'desarrollo frontend colombia',
    'sitios web rapidos mobile-first',
    'asesoria web 1 a 1',
  ],
  openGraph: {
    title: 'Clickshop | Diseño y Desarrollo Web en Pereira, Colombia',
    description:
      'Te entendemos a ti tanto como a tu página web. Diseño UX/UI y desarrollo de sitios web que transmiten tranquilidad y generan confianza.',
    url: 'https://clickshop.dev',
    siteName: 'Clickshop',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clickshop - Diseño Web y UI/UX en Pereira',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clickshop | Páginas Web y Diseño UX/UI en Pereira',
    description:
      'Diseño web claro, rápido y pensado para la tranquilidad de tu cliente. Desde Pereira, Colombia para el mundo.',
  },
  alternates: {
    canonical: 'https://clickshop.dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Clickshop',
  description:
    'Estudio de diseño web y desarrollo de software especializado en interfaces UI/UX, landing pages y sistemas a medida.',
  url: 'https://clickshop.dev',
  telephone: '+573127930898',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pereira',
    addressRegion: 'Risaralda',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 4.8133,
    longitude: -75.6961,
  },
  areaServed: [
    { '@type': 'City', name: 'Pereira' },
    { '@type': 'AdministrativeArea', name: 'Risaralda' },
    { '@type': 'AdministrativeArea', name: 'Eje Cafetero' },
    { '@type': 'Country', name: 'Colombia' },
  ],
  knowsAbout: [
    'Diseño Web',
    'Diseño UX',
    'Diseño UI',
    'Desarrollo Frontend',
    'Optimización Web',
    'Landing Pages',
    'Páginas Web Corporativas',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Diseño y Desarrollo Web',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Landing Page',
          description:
            'Página web directa y enfocada en presentar una oferta específica y captar clientes.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Página Web Corporativa',
          description:
            'Estructura digital completa para empresas que buscan proyectar confianza, orden y trayectoria.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sistema Web a Medida',
          description:
            'Herramientas y plataformas web personalizadas según la operativa del cliente.',
        },
      },
    ],
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";

/* ================================================================
   ROOT LAYOUT
   ================================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-clip max-w-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-void text-phosphor-white font-sans overflow-x-clip max-w-full relative">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
