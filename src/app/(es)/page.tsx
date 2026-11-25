import type { Metadata } from "next";
import { HomePage } from "@/pageComponents/HomePage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Molly Yllom | Directora de Arte y Diseñadora de Marca",
  description:
    "Directora de arte y diseñadora de marca con diecisiete años de experiencia. Trabajo con empresas de Estados Unidos desde 2016. Disponible para trabajo remoto en horario del Este de EE.UU.",
  alternates: { canonical: "/", languages: languageAlternates("/") },
  openGraph: {
    type: "website",
    title: "Molly Yllom | Directora de Arte y Diseñadora de Marca",
    description:
      "Directora de arte y diseñadora de marca con diecisiete años de experiencia. Trabajo con empresas de Estados Unidos desde 2016. Disponible para trabajo remoto en horario del Este de EE.UU.",
    url: "/",
    images: [
      {
        url: "https://www.mollyyllom.com/img/my-open-graph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Molly Yllom | Directora de Arte y Diseñadora de Marca",
      },
    ],
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export default function Page() {
  return <HomePage />;
}
