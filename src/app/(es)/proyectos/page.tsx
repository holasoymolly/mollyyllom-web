import type { Metadata } from "next";
import { ProjectsPage } from "@/pageComponents/ProjectsPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Proyectos | MOLLY YLLOM",
  description:
    "Portafolio seleccionado de proyectos de branding, identidad visual y dirección de arte para marcas en distintos sectores.",
  alternates: { canonical: "/proyectos", languages: languageAlternates("/proyectos") },
  openGraph: {
    title: "Proyectos | MOLLY YLLOM",
    description:
      "Portafolio seleccionado de proyectos de branding, identidad visual y dirección de arte.",
    url: "/proyectos",
    locale: "es_ES",
    alternateLocale: "en_US",
  },
};

export default function Page() {
  return <ProjectsPage />;
}
