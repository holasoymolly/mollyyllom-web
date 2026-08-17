import type { Metadata } from "next";
import { DownloadsPage } from "@/pageComponents/DownloadsPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Descargas | MOLLY YLLOM",
  description:
    "Plantillas y recursos gratuitos para mejorar tu proceso creativo: checklists de logotipo, manual de marca y preferencias de Illustrator.",
  alternates: { canonical: "/descargas", languages: languageAlternates("/descargas") },
  openGraph: {
    title: "Descargas | MOLLY YLLOM",
    description:
      "Plantillas y recursos gratuitos para mejorar tu proceso creativo.",
    url: "/descargas",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export default function Page() {
  return <DownloadsPage />;
}
