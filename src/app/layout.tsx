import type { Metadata } from "next";
import Script from "next/script";
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

// Production only, same rule as Amplitude: NEXT_PUBLIC_GA_ID is set on the
// Vercel Production environment only, so dev and beta traffic never reaches
// the live GA property. No id means the tag is never rendered at all.
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const apolloAppId = process.env.NEXT_PUBLIC_APOLLO_APP_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="max-image-preview:large" />
        {/*
          Apollo website visitor tracker. Apollo requires it to load as early as
          possible on every page, hence `beforeInteractive` rather than the
          `afterInteractive` default. next/script dedupes by `id`, so it runs
          exactly once per page load even across client-side navigations.
        */}
        {apolloAppId && (
          <Script
            id="apollo-website-tracker"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"${apolloAppId}"})},document.head.appendChild(o)}initApollo();`,
            }}
          />
        )}
      </head>
      <Amplitude />
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
        <SpeedInsights />
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
