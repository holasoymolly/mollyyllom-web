import type { Metadata } from "next";
import { ProjectsPage } from "@/pageComponents/ProjectsPage";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: "Projects | MOLLY YLLOM",
  description:
    "Selected portfolio of branding, visual identity and art direction projects for brands across a range of sectors.",
  alternates: { canonical: "/en/proyectos", languages: languageAlternates("/proyectos") },
  openGraph: {
    title: "Projects | MOLLY YLLOM",
    description:
      "Selected portfolio of branding, visual identity and art direction projects.",
    url: "/en/proyectos",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
};

export default function Page() {
  return <ProjectsPage />;
}
