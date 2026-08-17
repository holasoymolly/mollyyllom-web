import type { Metadata } from "next";
import { DownloadsPage } from "@/pageComponents/DownloadsPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Downloads | MOLLY YLLOM",
  description:
    "Free templates and resources to improve your creative process: logo delivery checklists, brand manual contents and Illustrator preferences.",
  alternates: { canonical: "/en/descargas", languages: languageAlternates("/descargas") },
  openGraph: {
    title: "Downloads | MOLLY YLLOM",
    description: "Free templates and resources to improve your creative process.",
    url: "/en/descargas",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <DownloadsPage />;
}
