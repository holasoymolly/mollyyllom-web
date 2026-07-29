import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Amplitude } from "@/amplitude";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mollyyllom.com"),
  title: "MOLLY YLLOM | Estudio de Diseño Gráfico",
  description: "Estudio de Diseño Gráfico especializado en Branding",
  robots: "max-image-preview:large",
  openGraph: {
    type: "website",
    title: "MOLLY YLLOM | Estudio de Diseño Gráfico",
    description: "Estudio de Diseño Gráfico especializado en Branding",
    url: "https://www.mollyyllom.com/",
    images: [
      {
        url: "https://www.mollyyllom.com/img/my-open-graph-image.jpg",
        width: 1200,
        height: 630,
        alt: "MOLLY YLLOM | Estudio de Diseño Gráfico",
      },
    ],
    locale: "es_ES",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="max-image-preview:large" />
      </head>
      <Amplitude />
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-Q3TSX67D2J" />
      </body>
    </html>
  );
}
