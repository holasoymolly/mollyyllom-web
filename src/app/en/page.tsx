import type { Metadata } from "next";
import { HomePage } from "@/pageComponents/HomePage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Molly Yllom | Art Director and Brand Designer",
  description:
    "Art director and brand designer with seventeen years of experience. Working with US companies since 2016. Available for remote roles on US Eastern hours.",
  alternates: { canonical: "/en", languages: languageAlternates("/") },
  openGraph: {
    type: "website",
    title: "Molly Yllom | Art Director and Brand Designer",
    description:
      "Art director and brand designer with seventeen years of experience. Working with US companies since 2016. Available for remote roles on US Eastern hours.",
    url: "/en",
    images: [
      {
        url: "https://www.mollyyllom.com/img/my-open-graph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Molly Yllom | Art Director and Brand Designer",
      },
    ],
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <HomePage />;
}
