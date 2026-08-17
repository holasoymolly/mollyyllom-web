import type { Metadata } from "next";
import { HomePage } from "@/pageComponents/HomePage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "MOLLY YLLOM | Graphic Design Studio",
  description: "Graphic design studio specializing in branding and visual identity.",
  alternates: { canonical: "/en", languages: languageAlternates("/") },
  openGraph: {
    type: "website",
    title: "MOLLY YLLOM | Graphic Design Studio",
    description: "Graphic design studio specializing in branding and visual identity.",
    url: "/en",
    images: [
      {
        url: "https://www.mollyyllom.com/img/my-open-graph-image.jpg",
        width: 1200,
        height: 630,
        alt: "MOLLY YLLOM | Graphic Design Studio",
      },
    ],
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <HomePage />;
}
