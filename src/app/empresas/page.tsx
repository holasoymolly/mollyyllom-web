import type { Metadata } from "next";
import { BusinessPage } from "@/pageComponents/BusinessPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Marca y sitio web para empresas | MOLLY YLLOM",
  description:
    "Marca, logo, sistema de identidad y sitio web hechos por la misma persona, para que lo que se aprueba sea lo que queda publicado. Más de diecisiete años de experiencia.",
  alternates: { canonical: "/empresas", languages: languageAlternates("/empresas") },
  openGraph: {
    title: "Marca y sitio web para empresas | MOLLY YLLOM",
    description:
      "Marca, logo, identidad y sitio web hechos por la misma persona. Más de diecisiete años de experiencia.",
    url: "/empresas",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export default function Page() {
  return <BusinessPage />;
}
