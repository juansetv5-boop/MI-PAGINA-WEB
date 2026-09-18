import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Clickshop — Desarrollo Web & UX de Alto Rendimiento",
  description:
    "Diseñamos y desarrollamos experiencias digitales a medida optimizadas para velocidad, precisión y conversión. Sin plantillas. Sin concesiones.",
  keywords: [
    "Clickshop",
    "desarrollo web",
    "sitios web a medida",
    "diseño UX",
    "alto rendimiento",
    "agencia Next.js",
    "Full-Stack",
  ],
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-phosphor-white font-sans">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
